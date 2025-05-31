/**
 * Server WebSocket per l'applicazione di chat in tempo reale
 * Questo server gestisce le connessioni WebSocket, riceve e distribuisce i messaggi
 * tra tutti i client connessi.
 */

// Importa il modulo WebSocket
const WebSocket = require('ws');

// Crea un nuovo server WebSocket sulla porta 8080
const wss = new WebSocket.Server({ port: 8080 });

// Array per tenere traccia dei client connessi
const clients = [];

console.log('Server WebSocket avviato sulla porta 8080');

// Gestione delle connessioni WebSocket
wss.on('connection', (ws) => {
    console.log('Nuovo client connesso');
    
    // Aggiungi il client all'array dei client connessi
    clients.push(ws);
    
    // Gestione dei messaggi ricevuti dal client
    ws.on('message', (message) => {
        try {
            // Converti il messaggio da buffer/string a oggetto JSON
            const parsedMessage = JSON.parse(message);
            console.log(`Messaggio ricevuto: ${JSON.stringify(parsedMessage)}`);
            
            // Distribuisci il messaggio a tutti i client connessi
            broadcastMessage(parsedMessage);
        } catch (error) {
            console.error('Errore nel parsing del messaggio:', error);
        }
    });
    
    // Gestione della chiusura della connessione
    ws.on('close', () => {
        console.log('Client disconnesso');
        
        // Rimuovi il client dall'array dei client connessi
        const index = clients.indexOf(ws);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    });
    
    // Gestione degli errori
    ws.on('error', (error) => {
        console.error('Errore WebSocket:', error);
    });
});

/**
 * Funzione per inviare un messaggio a tutti i client connessi
 * @param {Object} message - Il messaggio da inviare
 */
function broadcastMessage(message) {
    const messageString = JSON.stringify(message);
    
    clients.forEach((client) => {
        // Verifica che il client sia ancora connesso
        if (client.readyState === WebSocket.OPEN) {
            client.send(messageString);
        }
    });
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
 * 3. Avvia il server con: node esempio1.js
 * 4. Apri esempio1.html nel browser per connetterti al server
 */