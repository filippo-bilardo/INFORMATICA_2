/**
 * Server WebSocket per l'applicazione Dashboard Dati Live
 * Questo server simula l'invio di dati di sensori (temperatura, umidità, pressione)
 * a intervalli regolari per visualizzarli in tempo reale sul client.
 */

// Importa il modulo WebSocket
const WebSocket = require('ws');

// Crea un nuovo server WebSocket sulla porta 8081
const wss = new WebSocket.Server({ port: 8081 });

// Array per tenere traccia dei client connessi
const clients = [];

// Intervallo di aggiornamento dei dati (in millisecondi)
const UPDATE_INTERVAL = 2000; // 2 secondi

console.log('Server WebSocket per Dashboard Dati Live avviato sulla porta 8081');

// Gestione delle connessioni WebSocket
wss.on('connection', (ws) => {
    console.log('Nuovo client connesso');
    
    // Aggiungi il client all'array dei client connessi
    clients.push(ws);
    
    // Invia immediatamente un set completo di dati iniziali
    sendInitialData(ws);
    
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
 * Funzione per inviare dati iniziali a un client appena connesso
 * @param {WebSocket} client - Il client WebSocket
 */
function sendInitialData(client) {
    // Crea un set di dati iniziali con tutti i sensori
    const initialData = {
        type: 'all',
        temperature: generateRandomValue(18, 25),  // Temperatura tra 18 e 25°C
        humidity: generateRandomValue(40, 60),     // Umidità tra 40 e 60%
        pressure: generateRandomValue(1000, 1020), // Pressione tra 1000 e 1020 hPa
        timestamp: Date.now()
    };
    
    // Invia i dati iniziali
    if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(initialData));
    }
}

/**
 * Funzione per generare un valore casuale in un intervallo
 * @param {number} min - Valore minimo
 * @param {number} max - Valore massimo
 * @returns {number} - Valore casuale nell'intervallo
 */
function generateRandomValue(min, max) {
    return min + Math.random() * (max - min);
}

/**
 * Funzione per generare dati simulati dei sensori
 * @returns {Object} - Oggetto con i dati dei sensori
 */
function generateSensorData() {
    // Determina quale tipo di aggiornamento inviare
    const updateType = Math.random();
    
    if (updateType < 0.7) {
        // 70% delle volte, invia un aggiornamento di un singolo sensore
        const sensorType = Math.floor(Math.random() * 3);
        
        switch (sensorType) {
            case 0:
                return {
                    type: 'temperature',
                    value: generateRandomValue(15, 30), // Temperatura tra 15 e 30°C
                    timestamp: Date.now()
                };
            case 1:
                return {
                    type: 'humidity',
                    value: generateRandomValue(30, 70), // Umidità tra 30 e 70%
                    timestamp: Date.now()
                };
            case 2:
                return {
                    type: 'pressure',
                    value: generateRandomValue(990, 1030), // Pressione tra 990 e 1030 hPa
                    timestamp: Date.now()
                };
        }
    } else {
        // 30% delle volte, invia un aggiornamento di tutti i sensori
        return {
            type: 'all',
            temperature: generateRandomValue(15, 30),
            humidity: generateRandomValue(30, 70),
            pressure: generateRandomValue(990, 1030),
            timestamp: Date.now()
        };
    }
}

/**
 * Funzione per inviare dati a tutti i client connessi
 * @param {Object} data - I dati da inviare
 */
function broadcastData(data) {
    const dataString = JSON.stringify(data);
    
    clients.forEach((client) => {
        // Verifica che il client sia ancora connesso
        if (client.readyState === WebSocket.OPEN) {
            client.send(dataString);
        }
    });
}

// Avvia l'invio periodico di dati simulati
setInterval(() => {
    // Se ci sono client connessi, genera e invia dati
    if (clients.length > 0) {
        const data = generateSensorData();
        console.log(`Invio dati: ${JSON.stringify(data)}`);
        broadcastData(data);
    }
}, UPDATE_INTERVAL);

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
 * 3. Avvia il server con: node esempio2.js
 * 4. Apri esempio2.html nel browser per visualizzare la dashboard
 */