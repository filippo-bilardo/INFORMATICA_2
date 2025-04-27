# Pattern e Best Practices

In questo capitolo, esploreremo i pattern più comuni e le best practices per l'utilizzo efficace dei Web Workers nelle applicazioni web.

## Pattern di Utilizzo

### 1. Worker Pool

Il pattern Worker Pool consiste nel creare e gestire un gruppo di workers per distribuire il carico di lavoro. Questo approccio è utile quando si hanno molte operazioni da eseguire in parallelo.

```javascript
class WorkerPool {
  constructor(numWorkers, scriptUrl) {
    this.taskQueue = [];
    this.workers = [];
    this.availableWorkers = [];
    
    // Creazione dei workers
    for (let i = 0; i < numWorkers; i++) {
      const worker = new Worker(scriptUrl);
      
      worker.onmessage = (event) => {
        // Gestione del completamento del task
        const callback = worker.currentCallback;
        delete worker.currentCallback;
        
        // Rimetti il worker nella pool di disponibili
        this.availableWorkers.push(worker);
        
        // Processa il prossimo task in coda
        this.processQueue();
        
        // Esegui il callback con il risultato
        if (callback) {
          callback(null, event.data);
        }
      };
      
      worker.onerror = (error) => {
        const callback = worker.currentCallback;
        delete worker.currentCallback;
        
        this.availableWorkers.push(worker);
        this.processQueue();
        
        if (callback) {
          callback(error, null);
        }
      };
      
      this.workers.push(worker);
      this.availableWorkers.push(worker);
    }
  }
  
  processQueue() {
    if (this.taskQueue.length === 0 || this.availableWorkers.length === 0) {
      return;
    }
    
    const worker = this.availableWorkers.pop();
    const task = this.taskQueue.shift();
    
    worker.currentCallback = task.callback;
    worker.postMessage(task.data);
  }
  
  runTask(data, callback) {
    this.taskQueue.push({ data, callback });
    this.processQueue();
  }
  
  terminate() {
    this.workers.forEach(worker => worker.terminate());
    this.workers = [];
    this.availableWorkers = [];
    this.taskQueue = [];
  }
}

// Utilizzo
const pool = new WorkerPool(4, 'worker.js');

for (let i = 0; i < 10; i++) {
  pool.runTask({ id: i, data: [...] }, (error, result) => {
    if (error) {
      console.error(`Task ${i} fallito:`, error);
    } else {
      console.log(`Task ${i} completato:`, result);
    }
  });
}
```

### 2. Master-Worker

Il pattern Master-Worker prevede un worker principale (master) che coordina altri workers (slaves), distribuendo il lavoro e raccogliendo i risultati.

```javascript
// Nel thread principale
const masterWorker = new Worker('master-worker.js');

masterWorker.onmessage = function(event) {
  console.log('Risultato finale:', event.data);
};

masterWorker.postMessage({
  tipo: 'INIZIA',
  numWorkers: 4,
  dati: arrayDiDatiDaElaborare
});

// Nel file master-worker.js
let workers = [];
let risultati = [];
let daCompletare = 0;

onmessage = function(event) {
  const messaggio = event.data;
  
  if (messaggio.tipo === 'INIZIA') {
    const { numWorkers, dati } = messaggio;
    const chunksPerWorker = Math.ceil(dati.length / numWorkers);
    
    // Crea i workers
    for (let i = 0; i < numWorkers; i++) {
      const worker = new Worker('worker.js');
      const inizio = i * chunksPerWorker;
      const fine = Math.min(inizio + chunksPerWorker, dati.length);
      const chunk = dati.slice(inizio, fine);
      
      worker.onmessage = function(e) {
        risultati.push(e.data);
        daCompletare--;
        
        if (daCompletare === 0) {
          // Tutti i workers hanno completato
          const risultatoFinale = combinaRisultati(risultati);
          postMessage(risultatoFinale);
          
          // Termina i workers
          workers.forEach(w => w.terminate());
        }
      };
      
      workers.push(worker);
      worker.postMessage(chunk);
      daCompletare++;
    }
  }
};

function combinaRisultati(risultati) {
  // Logica per combinare i risultati parziali
  // ...
  return risultatiCombinati;
}
```

### 3. Pipeline

Il pattern Pipeline consiste nel creare una catena di workers, dove ogni worker esegue una fase specifica dell'elaborazione e passa il risultato al worker successivo.

```javascript
// Nel thread principale
const numWorkers = 3;
const workers = [];

// Crea i workers della pipeline
for (let i = 0; i < numWorkers; i++) {
  workers[i] = new Worker(`worker-${i}.js`);
  
  // Collega i workers tra loro
  if (i > 0) {
    workers[i-1].onmessage = function(event) {
      workers[i].postMessage(event.data);
    };
  }
}

// Gestisci il risultato finale dall'ultimo worker
workers[numWorkers-1].onmessage = function(event) {
  console.log('Risultato finale:', event.data);
};

// Invia i dati iniziali al primo worker
workers[0].postMessage(datiIniziali);
```

### 4. Modulo Asincrono

Questo pattern incapsula la logica del worker in un modulo che espone un'API asincrona basata su Promise.

```javascript
class AsyncWorkerModule {
  constructor(scriptUrl) {
    this.worker = new Worker(scriptUrl);
    this.counter = 0;
    this.callbacks = {};
    
    this.worker.onmessage = (event) => {
      const { id, risultato, errore } = event.data;
      
      if (this.callbacks[id]) {
        if (errore) {
          this.callbacks[id].reject(new Error(errore));
        } else {
          this.callbacks[id].resolve(risultato);
        }
        
        delete this.callbacks[id];
      }
    };
  }
  
  eseguiOperazione(tipo, dati) {
    return new Promise((resolve, reject) => {
      const id = this.counter++;
      
      this.callbacks[id] = { resolve, reject };
      
      this.worker.postMessage({
        id,
        tipo,
        dati
      });
    });
  }
  
  terminate() {
    this.worker.terminate();
    this.callbacks = {};
  }
}

// Utilizzo
const modulo = new AsyncWorkerModule('worker.js');

modulo.eseguiOperazione('CALCOLA', { a: 10, b: 20 })
  .then(risultato => {
    console.log('Risultato:', risultato);
  })
  .catch(errore => {
    console.error('Errore:', errore);
  });
```

## Best Practices

### 1. Trasferimento vs Clonazione

Quando si inviano grandi quantità di dati a un worker, è preferibile utilizzare il trasferimento di proprietà anziché la clonazione per migliorare le prestazioni.

```javascript
// Trasferimento di un ArrayBuffer
const buffer = new ArrayBuffer(1024 * 1024 * 32); // 32MB
worker.postMessage({ buffer }, [buffer]);
```

### 2. Granularità dei Messaggi

Trovare il giusto equilibrio nella frequenza e dimensione dei messaggi:

- **Messaggi troppo frequenti**: Overhead di comunicazione elevato
- **Messaggi troppo grandi**: Latenza elevata e possibili problemi di memoria
- **Approccio ottimale**: Raggruppare operazioni correlate in un singolo messaggio

### 3. Inizializzazione Lazy

Creare i workers solo quando necessario per risparmiare risorse:

```javascript
let worker = null;

function getWorker() {
  if (!worker) {
    worker = new Worker('worker.js');
    // Configurazione del worker
  }
  return worker;
}

function eseguiOperazioneIntensiva(dati) {
  const worker = getWorker();
  return new Promise((resolve, reject) => {
    worker.onmessage = e => resolve(e.data);
    worker.onerror = e => reject(e);
    worker.postMessage(dati);
  });
}
```

### 4. Gestione degli Errori

Implementare una robusta gestione degli errori sia nel thread principale che nei workers:

```javascript
// Nel thread principale
worker.onerror = function(event) {
  console.error(
    `Errore in ${event.filename}, linea ${event.lineno}: ${event.message}`
  );
  // Gestione dell'errore (es. riavvio del worker, notifica all'utente)
};

// Nel worker
try {
  // Codice potenzialmente problematico
} catch (errore) {
  postMessage({
    tipo: 'ERRORE',
    messaggio: errore.message,
    stack: errore.stack
  });
}
```

### 5. Monitoraggio delle Prestazioni

Misurare e ottimizzare le prestazioni dei workers:

```javascript
// Nel thread principale
console.time('operazione');
worker.postMessage(dati);
worker.onmessage = function(event) {
  console.timeEnd('operazione');
  console.log('Tempo di elaborazione worker:', event.data.tempoElaborazione);
};

// Nel worker
onmessage = function(event) {
  const inizioElaborazione = performance.now();
  
  // Esegui l'operazione
  const risultato = elaboraDati(event.data);
  
  const fineElaborazione = performance.now();
  const tempoElaborazione = fineElaborazione - inizioElaborazione;
  
  postMessage({
    risultato,
    tempoElaborazione
  });
};
```

### 6. Riutilizzo dei Workers

Riutilizzare i workers invece di crearli e terminarli frequentemente:

```javascript
class WorkerManager {
  constructor(scriptUrl, poolSize = 4) {
    this.scriptUrl = scriptUrl;
    this.poolSize = poolSize;
    this.workers = [];
    this.taskQueue = [];
    this.initialize();
  }
  
  initialize() {
    for (let i = 0; i < this.poolSize; i++) {
      this.createWorker();
    }
  }
  
  createWorker() {
    const worker = new Worker(this.scriptUrl);
    worker.busy = false;
    
    worker.onmessage = (event) => {
      const callback = worker.currentCallback;
      worker.busy = false;
      worker.currentCallback = null;
      
      if (callback) {
        callback(null, event.data);
      }
      
      this.processQueue();
    };
    
    worker.onerror = (error) => {
      const callback = worker.currentCallback;
      worker.busy = false;
      worker.currentCallback = null;
      
      if (callback) {
        callback(error, null);
      }
      
      this.processQueue();
    };
    
    this.workers.push(worker);
    return worker;
  }
  
  getIdleWorker() {
    return this.workers.find(worker => !worker.busy);
  }
  
  processQueue() {
    if (this.taskQueue.length === 0) return;
    
    const worker = this.getIdleWorker();
    if (!worker) return;
    
    const task = this.taskQueue.shift();
    worker.busy = true;
    worker.currentCallback = task.callback;
    worker.postMessage(task.data);
  }
  
  runTask(data, callback) {
    this.taskQueue.push({ data, callback });
    this.processQueue();
  }
  
  terminate() {
    this.workers.forEach(worker => worker.terminate());
    this.workers = [];
    this.taskQueue = [];
  }
}
```

### 7. Feature Detection

Verificare sempre il supporto dei Web Workers prima di utilizzarli:

```javascript
if (typeof Worker !== 'undefined') {
  // I Web Workers sono supportati
  const worker = new Worker('worker.js');
  // ...
} else {
  // Fallback per browser che non supportano i Web Workers
  console.warn('Web Workers non supportati. Utilizzo fallback sincrono.');
  // Implementazione alternativa
}
```

### 8. Debugging

Utilizzare gli strumenti di sviluppo del browser per il debugging dei workers:

- Chrome DevTools: Scheda "Sources" > selezionare il worker nel pannello "Threads"
- Firefox DevTools: Debugger > selezionare il worker nel pannello "Sources"

Aggiungere informazioni di debug nei messaggi:

```javascript
postMessage({
  tipo: 'DEBUG',
  fase: 'elaborazione',
  progresso: 45,
  memoria: performance.memory ? performance.memory.usedJSHeapSize : 'non disponibile',
  timestamp: Date.now()
});
```

## Considerazioni di Sicurezza

### 1. Same-Origin Policy

I Web Workers sono soggetti alla Same-Origin Policy. Il file del worker deve provenire dalla stessa origine del documento principale.

### 2. Content Security Policy (CSP)

Assicurarsi che la CSP del sito consenta l'esecuzione di workers:

```html
<meta http-equiv="Content-Security-Policy" content="worker-src 'self' https://trusted-domain.com;">
```

### 3. Validazione dei Dati

Validare sempre i dati ricevuti dai workers, specialmente se elaborano input esterni:

```javascript
// Nel worker
onmessage = function(event) {
  const dati = event.data;
  
  // Validazione dei dati
  if (!dati || typeof dati !== 'object' || !Array.isArray(dati.input)) {
    postMessage({
      tipo: 'ERRORE',
      messaggio: 'Formato dati non valido'
    });
    return;
  }
  
  // Elaborazione dei dati validati
  // ...
};
```

## Navigazione tra i Capitoli

- [Precedente: Tipi di Workers](./04_Tipi_Workers.md)
- [Torna all'indice](../README.md)