/**
 * Server WebSocket per l'applicazione di Notifiche in Tempo Reale
 * Questo server gestisce le connessioni WebSocket, invia notifiche periodiche
 * e risponde alle richieste di test dei client.
 */

// Importa il modulo WebSocket
const WebSocket = require('ws');

// Crea un nuovo server WebSocket sulla porta 8082
const wss = new WebSocket.Server({ port: 8082 });

// Array per tenere traccia dei client connessi
const clients = [];

// Intervallo per l'invio di notifiche automatiche (in millisecondi)
const NOTIFICATION_INTERVAL = 30000; // 30 secondi

console.log('Server WebSocket per Notifiche in Tempo Reale avviato sulla porta 8082');

// Gestione delle connessioni WebSocket
wss.on('connection', (ws) => {
    console.log('Nuovo client connesso');
    
    // Aggiungi il client all'array dei client connessi
    clients.push(ws);
    
    // Invia una notifica di benvenuto
    sendNotification(ws, {
        type: 'success',
        title: 'Benvenuto!',
        message: 'Ti sei connesso con successo al server di notifiche.',
        timestamp: new Date().toISOString()
    });
    
    // Gestione dei messaggi ricevuti dal client
    ws.on('message', (message) => {
        try {
            const parsedMessage = JSON.parse(message);
            console.log(`Messaggio ricevuto: ${JSON.stringify(parsedMessage)}`);
            
            // Gestione delle richieste di test
            if (parsedMessage.action === 'test') {
                handleTestRequest(ws, parsedMessage.type);
            }
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
 * Funzione per gestire le richieste di test
 * @param {WebSocket} client - Il client WebSocket
 * @param {string} type - Il tipo di notifica richiesta
 */
function handleTestRequest(client, type) {
    let notification;
    
    switch (type) {
        case 'info':
            notification = {
                type: 'info',
                title: 'Informazione',
                message: 'Questa è una notifica informativa di test.',
                timestamp: new Date().toISOString()
            };
            break;
        case 'success':
            notification = {
                type: 'success',
                title: 'Successo',
                message: 'Operazione completata con successo!',
                timestamp: new Date().toISOString()
            };
            break;
        case 'warning':
            notification = {
                type: 'warning',
                title: 'Avviso',
                message: 'Attenzione: questa è una notifica di avviso.',
                timestamp: new Date().toISOString()
            };
            break;
        case 'error':
            notification = {
                type: 'error',
                title: 'Errore',
                message: 'Si è verificato un errore durante l\'operazione.',
                timestamp: new Date().toISOString()
            };
            break;
        default:
            notification = {
                type: 'info',
                title: 'Notifica',
                message: 'Notifica di test generica.',
                timestamp: new Date().toISOString()
            };
    }
    
    // Invia la notifica a tutti i client (simulando un broadcast)
    broadcastNotification(notification);
}

/**
 * Funzione per inviare una notifica a un client specifico
 * @param {WebSocket} client - Il client WebSocket
 * @param {Object} notification - La notifica da inviare
 */
function sendNotification(client, notification) {
    if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(notification));
    }
}

/**
 * Funzione per inviare una notifica a tutti i client connessi
 * @param {Object} notification - La notifica da inviare
 */
function broadcastNotification(notification) {
    const notificationString = JSON.stringify(notification);
    
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(notificationString);
        }
    });
}

/**
 * Funzione per generare notifiche automatiche periodiche
 */
function generateRandomNotification() {
    const types = ['info', 'success', 'warning', 'error'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    const titles = {
        info: ['Aggiornamento', 'Novità', 'Informazione'],
        success: ['Completato', 'Successo', 'Ottimo lavoro'],
        warning: ['Attenzione', 'Avviso', 'Nota importante'],
        error: ['Errore', 'Problema', 'Attenzione']
    };
    
    const messages = {
        info: [
            'Nuovi contenuti disponibili.',
            'Il sistema è stato aggiornato.',
            'Ci sono nuove funzionalità disponibili.'
        ],
        success: [
            'Il processo è stato completato con successo.',
            'I dati sono stati salvati correttamente.',
            'Operazione eseguita con successo.'
        ],
        warning: [
            'La tua sessione scadrà tra poco.',
            'Spazio di archiviazione quasi esaurito.',
            'Aggiornamento importante in arrivo.'
        ],
        error: [
            'Si è verificato un errore durante l\'elaborazione.',
            'Impossibile completare l\'operazione richiesta.',
            'Errore di connessione al database.'
        ]
    };
    
    const title = titles[type][Math.floor(Math.random() * titles[type].length)];
    const message = messages[type][Math.floor(Math.random() * messages[type].length)];
    
    return {
        type,
        title,
        message,
        timestamp: new Date().toISOString()
    };
}

// Imposta un intervallo per l'invio di notifiche automatiche
setInterval(() => {
    // Verifica se ci sono client connessi
    if (clients.length > 0) {
        // Genera una notifica casuale
        const notification = generateRandomNotification();
        console.log('Invio notifica automatica:', notification);
        
        // Invia la notifica a tutti i client
        broadcastNotification(notification);
    }
}, NOTIFICATION_INTERVAL);

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
 * 3. Avvia il server con: node esempio3.js
 * 4. Apri esempio3.html nel browser per connetterti al server
 */