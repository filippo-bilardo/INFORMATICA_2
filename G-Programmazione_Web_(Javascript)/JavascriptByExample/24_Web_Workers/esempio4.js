// Shared Worker per l'esempio 4

// Variabili condivise tra tutte le connessioni
const connections = [];
let counter = 0;

// Funzione per inviare un messaggio a tutte le connessioni
function broadcast(message) {
    connections.forEach(connection => {
        connection.postMessage(message);
    });
}

// Funzione per aggiornare il contatore e notificare tutte le connessioni
function updateCounter(value) {
    counter = value;
    broadcast({
        type: 'counter_update',
        value: counter
    });
}

// Gestione dell'evento di connessione
onconnect = function(e) {
    const port = e.ports[0];
    
    // Aggiungi questa connessione all'array delle connessioni
    connections.push(port);
    
    console.log(`Nuova connessione stabilita. Connessioni attive: ${connections.length}`);
    
    // Avvia la porta per la comunicazione
    port.start();
    
    // Invia un messaggio di benvenuto
    port.postMessage({
        type: 'welcome',
        text: `Sei la connessione #${connections.length}`
    });
    
    // Invia lo stato attuale del contatore
    port.postMessage({
        type: 'counter_update',
        value: counter
    });
    
    // Notifica tutte le connessioni del nuovo numero di connessioni
    broadcast({
        type: 'connection_count',
        count: connections.length
    });
    
    // Gestione dei messaggi ricevuti da questa connessione
    port.onmessage = function(event) {
        const message = event.data;
        
        switch (message.type) {
            case 'chat':
                // Inoltra il messaggio di chat a tutte le connessioni
                broadcast({
                    type: 'chat',
                    text: message.text,
                    sender: message.sender
                });
                break;
                
            case 'counter':
                // Gestisci le operazioni sul contatore
                switch (message.action) {
                    case 'increment':
                        updateCounter(counter + 1);
                        break;
                        
                    case 'decrement':
                        updateCounter(counter - 1);
                        break;
                        
                    case 'reset':
                        updateCounter(0);
                        break;
                }
                break;
                
            case 'register':
                console.log(`Scheda ${message.tabId} registrata`);
                break;
                
            case 'unregister':
                console.log(`Scheda ${message.tabId} sta per chiudersi`);
                break;
        }
    };
    
    // Gestione della disconnessione
    port.addEventListener('messageerror', function() {
        removeConnection(port);
    });
};

// Funzione per rimuovere una connessione dall'array
function removeConnection(port) {
    const index = connections.indexOf(port);
    if (index !== -1) {
        connections.splice(index, 1);
        console.log(`Connessione chiusa. Connessioni attive: ${connections.length}`);
        
        // Notifica tutte le connessioni rimanenti
        broadcast({
            type: 'connection_count',
            count: connections.length
        });
    }
}

console.log('Shared Worker inizializzato');