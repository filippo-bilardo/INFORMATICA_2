# Comunicazione con i Workers

Uno degli aspetti fondamentali dei Web Workers è la comunicazione tra il thread principale e i workers. In questo capitolo, esploreremo in dettaglio i meccanismi di comunicazione e le best practices.

## Il Modello di Comunicazione

La comunicazione tra il thread principale e i workers avviene attraverso un sistema di messaggi asincroni. Questo modello è basato sul pattern di messaggistica, dove:

1. I messaggi vengono inviati utilizzando il metodo `postMessage()`
2. I messaggi vengono ricevuti attraverso l'evento `message`
3. I dati vengono trasferiti tramite copia (clonazione strutturale) o trasferimento

Questo approccio garantisce che non ci siano risorse condivise tra i thread, prevenendo così problemi di concorrenza come race conditions e deadlock.

## Invio di Messaggi Semplici

Ecco un esempio di base di comunicazione bidirezionale:

```javascript
// Nel thread principale
const worker = new Worker('worker.js');

// Invio di un messaggio al worker
worker.postMessage('Ciao Worker!');

// Ricezione di messaggi dal worker
worker.onmessage = function(event) {
  console.log('Worker dice:', event.data);
};

// Nel file worker.js
onmessage = function(event) {
  console.log('Thread principale dice:', event.data);
  
  // Risposta al thread principale
  postMessage('Ciao Thread Principale!');
};
```

## Trasferimento di Dati Complessi

### Clonazione Strutturale

Quando si invia un messaggio con `postMessage()`, i dati vengono clonati utilizzando l'algoritmo di clonazione strutturale. Questo significa che il worker riceve una copia completa dei dati, non un riferimento.

```javascript
// Nel thread principale
const datiComplessi = {
  numeri: [1, 2, 3, 4],
  oggetto: { nome: 'Test', attivo: true },
  data: new Date()
};

worker.postMessage(datiComplessi);
```

L'algoritmo di clonazione strutturale supporta molti tipi di dati JavaScript, inclusi:

- Tipi primitivi (numeri, stringhe, booleani, null, undefined)
- Oggetti e array (clonati ricorsivamente)
- Date, RegExp, Blob, File, FileList
- ArrayBuffer, TypedArray (Int8Array, Float32Array, ecc.)
- Map, Set
- ImageData

Tuttavia, alcuni tipi non possono essere clonati:

- Funzioni
- Oggetti DOM
- Oggetti con riferimenti circolari
- Oggetti Error

### Trasferimento di Proprietà

Per dati di grandi dimensioni come ArrayBuffer, la clonazione può essere inefficiente. In questi casi, è possibile utilizzare il trasferimento di proprietà, che sposta i dati invece di copiarli:

```javascript
// Nel thread principale
const buffer = new ArrayBuffer(1024 * 1024 * 32); // 32MB buffer

// Riempiamo il buffer con alcuni dati
const view = new Uint8Array(buffer);
for (let i = 0; i < view.length; i++) {
  view[i] = i % 256;
}

// Trasferimento del buffer al worker
worker.postMessage({ buffer: buffer }, [buffer]);

// Dopo il trasferimento, buffer è neutered (svuotato)
console.log(buffer.byteLength); // 0
```

Il secondo parametro di `postMessage()` è un array di oggetti trasferibili. Dopo il trasferimento, l'oggetto originale diventa inutilizzabile nel thread di origine.

## Comunicazione Strutturata

Per applicazioni complesse, è utile strutturare la comunicazione utilizzando oggetti con un campo tipo:

```javascript
// Nel thread principale
worker.postMessage({
  tipo: 'INIZIALIZZA',
  config: { maxIterazioni: 1000, precisione: 0.001 }
});

worker.postMessage({
  tipo: 'CALCOLA',
  dati: [1, 2, 3, 4, 5]
});

// Nel worker
onmessage = function(event) {
  const messaggio = event.data;
  
  switch(messaggio.tipo) {
    case 'INIZIALIZZA':
      inizializza(messaggio.config);
      break;
    case 'CALCOLA':
      const risultato = eseguiCalcolo(messaggio.dati);
      postMessage({
        tipo: 'RISULTATO',
        dati: risultato
      });
      break;
    default:
      postMessage({
        tipo: 'ERRORE',
        messaggio: 'Tipo di messaggio sconosciuto: ' + messaggio.tipo
      });
  }
};
```

## Gestione degli Errori nella Comunicazione

È importante gestire gli errori che possono verificarsi durante la comunicazione:

```javascript
// Nel thread principale
worker.onerror = function(event) {
  console.error('Errore nel worker:', event.message);
  console.error('In', event.filename, 'alla riga', event.lineno);
};

// Gestione di errori specifici nei messaggi
worker.onmessage = function(event) {
  if (event.data.tipo === 'ERRORE') {
    console.error('Errore segnalato dal worker:', event.data.messaggio);
    // Gestione dell'errore
  } else {
    // Elaborazione normale dei messaggi
  }
};

// Nel worker
try {
  // Codice che potrebbe generare errori
  const risultato = operazioneRischiosa();
  postMessage({
    tipo: 'RISULTATO',
    dati: risultato
  });
} catch (errore) {
  postMessage({
    tipo: 'ERRORE',
    messaggio: errore.message
  });
}
```

## Comunicazione con Promise

Per semplificare la gestione della comunicazione asincrona, è possibile creare un wrapper basato su Promise:

```javascript
class WorkerWrapper {
  constructor(scriptUrl) {
    this.worker = new Worker(scriptUrl);
    this.messageId = 0;
    this.pendingPromises = new Map();
    
    this.worker.onmessage = (event) => {
      const { id, risultato, errore } = event.data;
      
      if (this.pendingPromises.has(id)) {
        const { resolve, reject } = this.pendingPromises.get(id);
        this.pendingPromises.delete(id);
        
        if (errore) {
          reject(new Error(errore));
        } else {
          resolve(risultato);
        }
      }
    };
  }
  
  sendMessage(tipo, dati) {
    return new Promise((resolve, reject) => {
      const id = this.messageId++;
      
      this.pendingPromises.set(id, { resolve, reject });
      
      this.worker.postMessage({
        id,
        tipo,
        dati
      });
    });
  }
  
  terminate() {
    this.worker.terminate();
    this.pendingPromises.clear();
  }
}

// Utilizzo
const worker = new WorkerWrapper('worker.js');

worker.sendMessage('CALCOLA', [1, 2, 3, 4, 5])
  .then(risultato => {
    console.log('Risultato:', risultato);
  })
  .catch(errore => {
    console.error('Errore:', errore);
  });
```

## Navigazione tra i Capitoli

- [Precedente: API Web Workers](./02_API_Web_Workers.md)
- [Successivo: Tipi di Workers](./04_Tipi_Workers.md)
- [Torna all'indice](../README.md)