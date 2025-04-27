// Worker secondario per l'esempio 3

// Variabili di stato
let isProcessing = false;
let workerId = 0;
let startIndex = 0;
let endIndex = 0;

// Funzione per inviare messaggi di log al worker principale
function sendLog(text) {
    postMessage({
        type: 'log',
        text: text
    });
}

// Funzione per aggiornare lo stato del worker
function updateStatus(status, text) {
    postMessage({
        type: 'status',
        status: status,
        text: text
    });
}

// Funzione per aggiornare il progresso
function updateProgress(percent) {
    postMessage({
        type: 'progress',
        percent: Math.round(percent)
    });
}

// Funzione per elaborare un intervallo di numeri
function processRange(start, end) {
    sendLog(`Inizio elaborazione intervallo [${start}, ${end}]`);
    updateStatus('working', 'Elaborazione in corso');
    
    const startTime = performance.now();
    let result = 0;
    const total = end - start;
    
    // Simulazione di un'operazione intensiva
    for (let i = start; i < end; i++) {
        // Calcolo fittizio: somma dei quadrati dei numeri
        result += Math.sqrt(i) * Math.sin(i);
        
        // Aggiorna il progresso ogni 1000 iterazioni
        if (i % 1000 === 0) {
            const progress = ((i - start) / total) * 100;
            updateProgress(progress);
        }
        
        // Simulazione di un'operazione più intensiva
        if (i % 10000 === 0) {
            // Operazione fittizia per rallentare l'elaborazione
            let dummy = 0;
            for (let j = 0; j < 10000; j++) {
                dummy += Math.tan(j) * Math.cos(j);
            }
        }
    }
    
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    
    sendLog(`Elaborazione completata in ${elapsedTime.toFixed(2)}ms`);
    updateStatus('idle', 'Elaborazione completata');
    updateProgress(100);
    
    return result;
}

// Gestione dei messaggi dal worker principale
onmessage = function(event) {
    const message = event.data;
    
    switch (message.type) {
        case 'process':
            if (isProcessing) {
                sendLog('Elaborazione già in corso');
                return;
            }
            
            isProcessing = true;
            workerId = message.workerId;
            startIndex = message.start;
            endIndex = message.end;
            
            sendLog(`Ricevuto task: elaborazione elementi da ${startIndex} a ${endIndex - 1}`);
            updateStatus('working', 'Avvio elaborazione');
            
            try {
                // Esegui l'elaborazione
                const result = processRange(startIndex, endIndex);
                
                // Invia il risultato al worker principale
                postMessage({
                    type: 'result',
                    data: result
                });
                
                isProcessing = false;
            } catch (error) {
                sendLog(`Errore durante l'elaborazione: ${error.message}`);
                updateStatus('error', 'Errore');
                
                postMessage({
                    type: 'error',
                    text: error.message
                });
                
                isProcessing = false;
            }
            break;
    }
};

// Gestione degli errori
onerror = function(error) {
    sendLog(`Errore nel worker: ${error.message}`);
    updateStatus('error', 'Errore');
    
    postMessage({
        type: 'error',
        text: error.message
    });
};

sendLog('Worker secondario inizializzato e pronto');
updateStatus('idle', 'In attesa');