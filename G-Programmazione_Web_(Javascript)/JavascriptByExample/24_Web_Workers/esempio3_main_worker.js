// Worker principale (coordinatore) per l'esempio 3

// Array per memorizzare i worker secondari
let workers = [];

// Variabili di stato
let isProcessing = false;
let isCancelled = false;
let arraySize = 0;
let numWorkers = 0;
let completedTasks = 0;
let startTime = 0;

// Array dei risultati
let results = [];

// Funzione per inviare messaggi di log al thread principale
function sendLog(text) {
    postMessage({
        type: 'log',
        text: text
    });
}

// Funzione per aggiornare lo stato del worker principale
function updateStatus(status, text) {
    postMessage({
        type: 'main_status',
        status: status,
        text: text
    });
}

// Funzione per aggiornare lo stato di un worker secondario
function updateWorkerStatus(workerId, status, text) {
    postMessage({
        type: 'worker_status',
        workerId: workerId,
        status: status,
        text: text
    });
}

// Funzione per aggiornare la barra di progresso
function updateProgress(percent) {
    postMessage({
        type: 'progress',
        percent: Math.round(percent)
    });
}

// Funzione per inizializzare i worker secondari
function initWorkers(num) {
    // Termina eventuali worker esistenti
    terminateWorkers();
    
    workers = [];
    results = [];
    completedTasks = 0;
    
    sendLog(`Inizializzazione di ${num} worker secondari`);
    
    for (let i = 0; i < num; i++) {
        const workerId = i + 1;
        
        try {
            // Crea un nuovo worker
            const worker = new Worker('esempio3_worker.js');
            
            // Configura la gestione dei messaggi
            worker.onmessage = function(event) {
                handleWorkerMessage(workerId, event.data);
            };
            
            // Configura la gestione degli errori
            worker.onerror = function(error) {
                handleWorkerError(workerId, error);
            };
            
            // Memorizza il worker
            workers.push(worker);
            
            // Aggiorna lo stato del worker
            updateWorkerStatus(workerId, 'idle', 'Inizializzato');
            
            sendLog(`Worker ${workerId} inizializzato`);
        } catch (error) {
            sendLog(`Errore nell'inizializzazione del worker ${workerId}: ${error.message}`);
            postMessage({
                type: 'error',
                text: `Impossibile inizializzare i worker: ${error.message}`
            });
            return false;
        }
    }
    
    return true;
}

// Funzione per terminare tutti i worker
function terminateWorkers() {
    if (workers.length > 0) {
        sendLog(`Terminazione di ${workers.length} worker`);
        
        workers.forEach((worker, index) => {
            try {
                worker.terminate();
                updateWorkerStatus(index + 1, 'idle', 'Terminato');
            } catch (error) {
                sendLog(`Errore nella terminazione del worker ${index + 1}: ${error.message}`);
            }
        });
        
        workers = [];
    }
}

// Funzione per gestire i messaggi dai worker secondari
function handleWorkerMessage(workerId, message) {
    if (isCancelled) return;
    
    switch (message.type) {
        case 'log':
            // Inoltra il messaggio di log al thread principale
            postMessage({
                type: 'worker_log',
                workerId: workerId,
                text: message.text
            });
            break;
            
        case 'status':
            // Aggiorna lo stato del worker
            updateWorkerStatus(workerId, message.status, message.text);
            break;
            
        case 'progress':
            // Aggiorna il progresso del task specifico
            // Calcola il progresso complessivo considerando tutti i worker
            const taskProgress = message.percent;
            const overallProgress = calculateOverallProgress(workerId - 1, taskProgress);
            updateProgress(overallProgress);
            break;
            
        case 'result':
            // Memorizza il risultato parziale
            results[workerId - 1] = message.data;
            
            // Aggiorna lo stato del worker
            updateWorkerStatus(workerId, 'idle', 'Task completato');
            
            // Incrementa il contatore dei task completati
            completedTasks++;
            
            sendLog(`Worker ${workerId} ha completato il task (${completedTasks}/${numWorkers})`);
            
            // Verifica se tutti i task sono stati completati
            if (completedTasks === numWorkers) {
                finalizeResults();
            }
            break;
            
        case 'error':
            // Gestisce l'errore del worker
            handleWorkerError(workerId, { message: message.text });
            break;
    }
}

// Funzione per gestire gli errori dei worker secondari
function handleWorkerError(workerId, error) {
    if (isCancelled) return;
    
    sendLog(`Errore nel worker ${workerId}: ${error.message}`);
    updateWorkerStatus(workerId, 'error', 'Errore');
    
    // Notifica l'errore al thread principale
    postMessage({
        type: 'error',
        text: `Errore nel worker ${workerId}: ${error.message}`
    });
    
    // Annulla l'elaborazione
    cancelProcessing();
}

// Funzione per calcolare il progresso complessivo
function calculateOverallProgress(workerIndex, taskProgress) {
    // Ogni worker contribuisce in modo proporzionale al progresso complessivo
    const workerContribution = 100 / numWorkers;
    
    // Calcola il progresso complessivo
    let overallProgress = 0;
    
    for (let i = 0; i < numWorkers; i++) {
        if (i === workerIndex) {
            // Usa il progresso aggiornato per questo worker
            overallProgress += (taskProgress / 100) * workerContribution;
        } else if (i < completedTasks) {
            // Worker che hanno già completato
            overallProgress += workerContribution;
        }
        // I worker che non hanno ancora completato non contribuiscono
    }
    
    return overallProgress;
}

// Funzione per finalizzare i risultati
function finalizeResults() {
    if (isCancelled) return;
    
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    
    sendLog('Tutti i worker hanno completato i loro task');
    sendLog(`Combinazione dei risultati da ${numWorkers} worker`);
    
    // Combina i risultati (in questo esempio, somma i valori)
    let combinedResult = 0;
    for (let i = 0; i < results.length; i++) {
        combinedResult += results[i];
    }
    
    sendLog(`Risultato finale: ${combinedResult}`);
    
    // Notifica il completamento al thread principale
    postMessage({
        type: 'complete',
        time: elapsedTime.toFixed(2),
        result: combinedResult
    });
    
    // Resetta lo stato
    isProcessing = false;
    updateStatus('idle', 'Elaborazione completata');
    updateProgress(100);
}

// Funzione per avviare l'elaborazione
function startProcessing(size, workers) {
    if (isProcessing) {
        sendLog('Elaborazione già in corso');
        return;
    }
    
    arraySize = size;
    numWorkers = workers;
    isProcessing = true;
    isCancelled = false;
    completedTasks = 0;
    results = new Array(numWorkers).fill(0);
    
    sendLog(`Avvio elaborazione con array di ${arraySize} elementi e ${numWorkers} worker`);
    updateStatus('working', 'Elaborazione in corso');
    
    // Inizializza i worker
    if (!initWorkers(numWorkers)) {
        return;
    }
    
    startTime = performance.now();
    
    // Calcola la dimensione di ciascun chunk
    const chunkSize = Math.ceil(arraySize / numWorkers);
    
    sendLog(`Dimensione chunk per worker: ${chunkSize}`);
    
    // Distribuisci il lavoro ai worker
    for (let i = 0; i < numWorkers; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, arraySize);
        
        sendLog(`Assegnazione al worker ${i + 1}: elementi da ${start} a ${end - 1}`);
        updateWorkerStatus(i + 1, 'working', 'Elaborazione in corso');
        
        // Invia il messaggio di avvio al worker
        workers[i].postMessage({
            type: 'process',
            start: start,
            end: end,
            workerId: i + 1
        });
    }
}

// Funzione per annullare l'elaborazione
function cancelProcessing() {
    if (!isProcessing) return;
    
    isCancelled = true;
    isProcessing = false;
    
    sendLog('Annullamento elaborazione');
    updateStatus('idle', 'Elaborazione annullata');
    
    // Termina tutti i worker
    terminateWorkers();
    
    // Notifica l'annullamento al thread principale
    postMessage({
        type: 'complete',
        time: 0,
        cancelled: true
    });
}

// Gestione dei messaggi dal thread principale
onmessage = function(event) {
    const message = event.data;
    
    switch (message.type) {
        case 'start':
            startProcessing(message.arraySize, message.numWorkers);
            break;
            
        case 'cancel':
            cancelProcessing();
            break;
    }
};

// Gestione degli errori
onerror = function(error) {
    sendLog(`Errore nel worker principale: ${error.message}`);
    updateStatus('error', 'Errore');
    
    postMessage({
        type: 'error',
        text: `Errore nel worker principale: ${error.message}`
    });
};

sendLog('Worker principale inizializzato e pronto');
updateStatus('idle', 'Inattivo');