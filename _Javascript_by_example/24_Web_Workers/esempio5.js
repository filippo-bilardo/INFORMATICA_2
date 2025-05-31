// Web Workers in JavaScript - Esempio 5: Worker Pool per elaborazione parallela

/**
 * Questo esempio mostra come implementare un pool di worker
 * per distribuire il carico di lavoro tra più thread paralleli.
 */

// Classe per gestire un pool di Web Workers
class WorkerPool {
  constructor(scriptUrl, numWorkers = navigator.hardwareConcurrency || 4) {
    this.workers = [];
    this.freeWorkers = [];
    this.tasks = [];
    this.scriptUrl = scriptUrl;
    
    // Inizializza il pool di worker
    for (let i = 0; i < numWorkers; i++) {
      this.addWorker();
    }
  }
  
  // Aggiunge un nuovo worker al pool
  addWorker() {
    const worker = new Worker(this.scriptUrl);
    const workerInfo = {
      worker: worker,
      id: this.workers.length
    };
    
    // Gestisce i messaggi dal worker
    worker.onmessage = (event) => {
      // Ottiene il riferimento alla promessa associata al task
      const taskInfo = event.data.taskId !== undefined ? 
        this.tasks.find(t => t.taskId === event.data.taskId) : null;
      
      if (taskInfo) {
        // Risolve la promessa con il risultato
        taskInfo.resolve(event.data.result);
        
        // Rimuove il task completato
        this.tasks = this.tasks.filter(t => t.taskId !== event.data.taskId);
      }
      
      // Rimette il worker nel pool dei disponibili
      this.freeWorkers.push(workerInfo);
      this.processQueue();
    };
    
    // Gestisce gli errori
    worker.onerror = (error) => {
      console.error(`Errore nel worker ${workerInfo.id}:`, error);
      
      // Trova tutti i task assegnati a questo worker e li rifiuta
      const failedTasks = this.tasks.filter(t => t.workerId === workerInfo.id);
      for (const task of failedTasks) {
        task.reject(new Error(`Worker ${workerInfo.id} ha generato un errore: ${error.message}`));
      }
      
      // Rimuove i task falliti
      this.tasks = this.tasks.filter(t => t.workerId !== workerInfo.id);
      
      // Sostituisce il worker
      this.workers = this.workers.filter(w => w.id !== workerInfo.id);
      this.freeWorkers = this.freeWorkers.filter(w => w.id !== workerInfo.id);
      this.addWorker();
    };
    
    this.workers.push(workerInfo);
    this.freeWorkers.push(workerInfo);
  }
  
  // Esegue un task utilizzando un worker dal pool
  exec(data) {
    return new Promise((resolve, reject) => {
      // Crea un ID univoco per il task
      const taskId = Date.now() + Math.random();
      
      // Aggiunge il task alla coda
      this.tasks.push({
        taskId,
        data,
        resolve,
        reject,
        workerId: null
      });
      
      // Processa la coda se ci sono worker disponibili
      this.processQueue();
    });
  }
  
  // Processa la coda dei task
  processQueue() {
    // Se non ci sono worker liberi o task in attesa, esce
    if (this.freeWorkers.length === 0 || this.tasks.length === 0) {
      return;
    }
    
    // Trova i task che non sono ancora stati assegnati
    const pendingTasks = this.tasks.filter(t => t.workerId === null);
    
    // Assegna i task ai worker disponibili
    while (this.freeWorkers.length > 0 && pendingTasks.length > 0) {
      const workerInfo = this.freeWorkers.shift();
      const taskInfo = pendingTasks.shift();
      
      // Aggiorna il task con l'ID del worker assegnato
      taskInfo.workerId = workerInfo.id;
      
      // Invia il task al worker
      workerInfo.worker.postMessage({
        taskId: taskInfo.taskId,
        data: taskInfo.data
      });
    }
  }
  
  // Termina tutti i worker
  terminate() {
    for (const workerInfo of this.workers) {
      workerInfo.worker.terminate();
    }
    
    this.workers = [];
    this.freeWorkers = [];
    
    // Rifiuta tutti i task in sospeso
    for (const task of this.tasks) {
      task.reject(new Error('Worker pool terminato'));
    }
    
    this.tasks = [];
  }
}

// Funzione per inizializzare l'esempio quando il documento è pronto
function inizializzaEsempio() {
  const logElement = document.getElementById('log');
  const startButton = document.getElementById('startButton');
  const terminateButton = document.getElementById('terminateButton');
  
  // Funzione per aggiungere messaggi al log
  function log(message) {
    const item = document.createElement('div');
    item.textContent = message;
    logElement.appendChild(item);
    logElement.scrollTop = logElement.scrollHeight;
  }
  
  // Crea un pool di worker
  const workerPool = new WorkerPool('esempio5_worker.js');
  log(`Pool di worker creato con ${workerPool.workers.length} worker`);
  
  // Funzione per generare un array di numeri casuali
  function generaArrayCasuale(lunghezza) {
    return Array.from({ length: lunghezza }, () => Math.floor(Math.random() * 1000));
  }
  
  // Gestisce il click sul pulsante di avvio
  startButton.addEventListener('click', async () => {
    log('Avvio elaborazione parallela...');
    startButton.disabled = true;
    
    const numTasks = 10;
    const startTime = performance.now();
    
    try {
      // Crea un array di promesse per tutti i task
      const promises = [];
      
      for (let i = 0; i < numTasks; i++) {
        // Genera un array casuale da ordinare
        const data = {
          operazione: 'ordina',
          array: generaArrayCasuale(50000)
        };
        
        log(`Invio task ${i + 1}/${numTasks}: ordinamento array di ${data.array.length} elementi`);
        
        // Aggiunge la promessa all'array
        promises.push(
          workerPool.exec(data)
            .then(result => {
              log(`Task ${i + 1} completato: array ordinato di ${result.length} elementi`);
              return result;
            })
        );
      }
      
      // Attende il completamento di tutti i task
      await Promise.all(promises);
      
      const endTime = performance.now();
      log(`Tutti i task completati in ${(endTime - startTime).toFixed(2)}ms`);
    } catch (error) {
      log(`Errore durante l'elaborazione: ${error.message}`);
    } finally {
      startButton.disabled = false;
    }
  });
  
  // Gestisce il click sul pulsante di terminazione
  terminateButton.addEventListener('click', () => {
    workerPool.terminate();
    log('Pool di worker terminato');
    startButton.disabled = true;
    terminateButton.disabled = true;
  });
}

// Inizializza l'esempio quando il documento è pronto
document.addEventListener('DOMContentLoaded', inizializzaEsempio);