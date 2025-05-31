/**
 * Server WebSocket con Autenticazione
 * Questo server implementa un sistema di autenticazione per le connessioni WebSocket
 * utilizzando username/password e token JWT.
 */

// Importa i moduli necessari
const WebSocket = require('ws');
const crypto = require('crypto');

// Crea un nuovo server WebSocket sulla porta 8084
const wss = new WebSocket.Server({ port: 8084 });

// Database utenti simulato (in un'applicazione reale, usare un database vero)
const users = [
    { username: 'utente1', password: 'password1', role: 'user' },
    { username: 'utente2', password: 'password2', role: 'user' },
    { username: 'admin', password: 'admin123', role: 'admin' }
];

// Mappa per tenere traccia delle sessioni attive
const sessions = new Map();

// Chiave segreta per la firma dei token (in un'applicazione reale, usare una chiave più sicura)
const SECRET_KEY = 'chiave_segreta_per_jwt_websocket_esempio';

console.log('Server WebSocket con Autenticazione avviato sulla porta 8084');

// Gestione delle connessioni WebSocket
wss.on('connection', (ws) => {
    console.log('Nuovo client connesso');
    
    // Flag per tenere traccia dello stato di autenticazione
    ws.isAuthenticated = false;
    
    // Gestione dei messaggi ricevuti dal client
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log(`Messaggio ricevuto: ${JSON.stringify(data)}`);
            
            // Gestione dei diversi tipi di messaggi
            switch (data.type) {
                case 'login':
                    handleLogin(ws, data.username, data.password);
                    break;
                    
                case 'auth':
                    handleTokenAuth(ws, data.token);
                    break;
                    
                case 'message':
                    handleMessage(ws, data.message);
                    break;
                    
                case 'logout':
                    handleLogout(ws);
                    break;
                    
                default:
                    // Messaggio non riconosciuto
                    sendToClient(ws, {
                        type: 'system',
                        message: 'Comando non riconosciuto.'
                    });
            }
        } catch (error) {
            console.error('Errore nel parsing del messaggio:', error);
        }
    });
    
    // Gestione della chiusura della connessione
    ws.on('close', () => {
        console.log('Client disconnesso');
        
        // Rimuovi la sessione se il client era autenticato
        if (ws.isAuthenticated && ws.username) {
            sessions.delete(ws.username);
        }
    });
    
    // Gestione degli errori
    ws.on('error', (error) => {
        console.error('Errore WebSocket:', error);
    });
});

/**
 * Gestisce il tentativo di login con username e password
 * @param {WebSocket} ws - La connessione WebSocket
 * @param {string} username - Il nome utente
 * @param {string} password - La password
 */
function handleLogin(ws, username, password) {
    // Cerca l'utente nel database
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Genera un token JWT
        const token = generateToken(user);
        
        // Salva la sessione
        sessions.set(username, { ws, token });
        
        // Imposta i dati dell'utente nella connessione WebSocket
        ws.isAuthenticated = true;
        ws.username = username;
        ws.userRole = user.role;
        
        // Invia il token al client
        sendToClient(ws, {
            type: 'auth_success',
            token: token,
            username: username
        });
        
        console.log(`Utente ${username} autenticato con successo`);
        
        // Invia un messaggio di benvenuto
        broadcastSystemMessage(`${username} si è connesso.`);
    } else {
        // Autenticazione fallita
        sendToClient(ws, {
            type: 'auth_error',
            message: 'Nome utente o password non validi.'
        });
        
        console.log(`Tentativo di login fallito per l'utente ${username}`);
    }
}

/**
 * Gestisce l'autenticazione con token
 * @param {WebSocket} ws - La connessione WebSocket
 * @param {string} token - Il token JWT
 */
function handleTokenAuth(ws, token) {
    try {
        // Verifica il token
        const payload = verifyToken(token);
        
        if (payload && payload.username) {
            // Trova l'utente nel database
            const user = users.find(u => u.username === payload.username);
            
            if (user) {
                // Aggiorna la sessione
                sessions.set(payload.username, { ws, token });
                
                // Imposta i dati dell'utente nella connessione WebSocket
                ws.isAuthenticated = true;
                ws.username = payload.username;
                ws.userRole = user.role;
                
                // Invia conferma al client
                sendToClient(ws, {
                    type: 'auth_success',
                    token: token,
                    username: payload.username
                });
                
                console.log(`Utente ${payload.username} autenticato con token`);
                
                // Invia un messaggio di benvenuto
                broadcastSystemMessage(`${payload.username} si è connesso.`);
            } else {
                sendAuthError(ws, 'Utente non trovato.');
            }
        } else {
            sendAuthError(ws, 'Token non valido.');
        }
    } catch (error) {
        console.error('Errore nella verifica del token:', error);
        sendAuthError(ws, 'Token non valido o scaduto.');
    }
}

/**
 * Gestisce l'invio di un messaggio
 * @param {WebSocket} ws - La connessione WebSocket
 * @param {string} message - Il messaggio da inviare
 */
function handleMessage(ws, message) {
    // Verifica che il client sia autenticato
    if (!ws.isAuthenticated) {
        sendAuthError(ws, 'Devi essere autenticato per inviare messaggi.');
        return;
    }
    
    console.log(`Messaggio da ${ws.username}: ${message}`);
    
    // Invia il messaggio a tutti i client autenticati
    for (const session of sessions.values()) {
        if (session.ws.readyState === WebSocket.OPEN) {
            sendToClient(session.ws, {
                type: 'message',
                sender: ws.username,
                message: message
            });
        }
    }
}

/**
 * Gestisce il logout di un utente
 * @param {WebSocket} ws - La connessione WebSocket
 */
function handleLogout(ws) {
    if (ws.isAuthenticated && ws.username) {
        const username = ws.username;
        
        // Rimuovi la sessione
        sessions.delete(username);
        
        // Resetta lo stato dell'utente
        ws.isAuthenticated = false;
        ws.username = null;
        ws.userRole = null;
        
        console.log(`Utente ${username} disconnesso`);
        
        // Invia un messaggio di sistema
        broadcastSystemMessage(`${username} si è disconnesso.`);
    }
}

/**
 * Invia un errore di autenticazione al client
 * @param {WebSocket} ws - La connessione WebSocket
 * @param {string} message - Il messaggio di errore
 */
function sendAuthError(ws, message) {
    sendToClient(ws, {
        type: 'auth_error',
        message: message
    });
}

/**
 * Invia un messaggio di sistema a tutti i client autenticati
 * @param {string} message - Il messaggio di sistema
 */
function broadcastSystemMessage(message) {
    for (const session of sessions.values()) {
        if (session.ws.readyState === WebSocket.OPEN) {
            sendToClient(session.ws, {
                type: 'system',
                message: message
            });
        }
    }
}

/**
 * Invia un messaggio a un client specifico
 * @param {WebSocket} client - Il client WebSocket
 * @param {Object} message - Il messaggio da inviare
 */
function sendToClient(client, message) {
    if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
    }
}

/**
 * Genera un token JWT
 * @param {Object} user - L'utente per cui generare il token
 * @returns {string} - Il token JWT
 */
function generateToken(user) {
    // In un'applicazione reale, usare una libreria JWT come jsonwebtoken
    // Qui implementiamo una versione semplificata per scopi didattici
    
    const header = {
        alg: 'HS256',
        typ: 'JWT'
    };
    
    const payload = {
        username: user.username,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // Scade tra 1 ora
    };
    
    const headerBase64 = Buffer.from(JSON.stringify(header)).toString('base64');
    const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64');
    
    const signature = crypto
        .createHmac('sha256', SECRET_KEY)
        .update(`${headerBase64}.${payloadBase64}`)
        .digest('base64');
    
    return `${headerBase64}.${payloadBase64}.${signature}`;
}

/**
 * Verifica un token JWT
 * @param {string} token - Il token JWT da verificare
 * @returns {Object|null} - Il payload del token se valido, altrimenti null
 */
function verifyToken(token) {
    try {
        const [headerBase64, payloadBase64, signature] = token.split('.');
        
        // Verifica la firma
        const expectedSignature = crypto
            .createHmac('sha256', SECRET_KEY)
            .update(`${headerBase64}.${payloadBase64}`)
            .digest('base64');
        
        if (signature !== expectedSignature) {
            return null;
        }
        
        // Decodifica il payload
        const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());
        
        // Verifica la scadenza
        if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
            return null; // Token scaduto
        }
        
        return payload;
    } catch (error) {
        console.error('Errore nella verifica del token:', error);
        return null;
    }
}

/**
 * Gestione della chiusura del server
 */
process.on('SIGINT', () => {
    console.log('Chiusura del server WebSocket...');
    
    // Chiudi tutte le connessioni client
    wss.clients.forEach((client) => {
        client.close();
    });
    
    // Chiudi il server
    wss.close(() => {
        console.log('Server WebSocket chiuso');
        process.exit(0);
    });
});

/**
 * Note per l'esecuzione:
 * 1. Assicurati di avere Node.js installato
 * 2. Installa il modulo ws con: npm install ws
 * 3. Avvia il server con: node esempio5.js
 * 4. Apri esempio5.html nel browser per connetterti al server
 * 5. Credenziali di test:
 *    - Username: utente1, Password: password1
 *    - Username: utente2, Password: password2
 *    - Username: admin, Password: admin123
 */