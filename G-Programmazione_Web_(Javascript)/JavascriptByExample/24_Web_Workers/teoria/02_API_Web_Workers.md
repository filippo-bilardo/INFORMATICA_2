# API Web Workers

L'API Web Workers fornisce un modo per eseguire script JavaScript in background, su thread separati dal thread principale dell'interfaccia utente. In questo capitolo, esploreremo in dettaglio come utilizzare questa API.

## Creazione di un Web Worker

Per creare un Web Worker, si utilizza il costruttore `Worker()` passando il percorso di un file JavaScript esterno:

```javascript
const worker = new Worker('percorso/al/worker.js');
```

Il file specificato verrà caricato ed eseguito in un thread separato. È importante notare che:

- Il percorso deve essere relativo alla posizione del documento corrente
- Il file deve provenire dalla stessa origine (same-origin policy)
- È possibile passare un secondo parametro opzionale con opzioni di configurazione

### Opzioni di Configurazione

```javascript
const worker = new Worker('worker.js', {
  type: 'module', // Utilizza i moduli ES6 nel worker
  credentials: 'same-origin', // Gestione dei cookie e credenziali
  name: 'MioWorker' // Nome del worker per il debugging
});
```

## Comunicazione con i Workers

La comunicazione tra il thread principale e i workers avviene attraverso un sistema di messaggi.

### Invio di Messaggi

Per inviare un messaggio a un worker:

```javascript
// Dal thread principale al worker
worker.postMessage(dati);

// Dal worker al thread principale
postMessage(dati);
```

I `dati` possono essere qualsiasi valore che può essere clonato utilizzando l'algoritmo di [structured clone](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), che include:

- Tipi primitivi (numeri, stringhe, booleani, null, undefined)
- Oggetti e array (clonati ricorsivamente)
- Tipi di dati specializzati come Date, RegExp, Blob, File, ImageData
- Oggetti Map e Set
- ArrayBuffer e TypedArray

### Ricezione di Messaggi

Per ricevere messaggi:

```javascript
// Nel thread principale
worker.onmessage = function(event) {
  const datiRicevuti = event.data;
  console.log('Messaggio ricevuto dal worker:', datiRicevuti);
};

// Nel worker
onmessage = function(event) {
  const datiRicevuti = event.data;
  console.log('Messaggio ricevuto dal thread principale:', datiRicevuti);
};
```

È anche possibile utilizzare `addEventListener` per gestire i messaggi:

```javascript
// Nel thread principale
worker.addEventListener('message', function(event) {
  console.log('Messaggio ricevuto:', event.data);
});

// Nel worker
self.addEventListener('message', function(event) {
  console.log('Messaggio ricevuto:', event.data);
});
```

## Gestione degli Errori

Per gestire gli errori che si verificano all'interno di un worker:

```javascript
// Nel thread principale
worker.onerror = function(event) {
  console.error('Errore nel worker:', event.message);
  console.error('In', event.filename, 'alla riga', event.lineno);
};

// Oppure con addEventListener
worker.addEventListener('error', function(event) {
  console.error('Errore nel worker:', event.message);
});
```

All'interno del worker, è possibile utilizzare `try/catch` per gestire gli errori e comunicarli al thread principale:

```javascript
// Nel worker
try {
  // Codice che potrebbe generare errori
} catch (errore) {
  postMessage({ tipo: 'errore', messaggio: errore.message });
}
```

## Terminazione di un Worker

Per terminare un worker dal thread principale:

```javascript
worker.terminate();
```

Per terminare un worker dall'interno del worker stesso:

```javascript
self.close();
```

Dopo la terminazione, il worker viene immediatamente fermato e tutte le sue risorse vengono liberate.

## L'Oggetto `self` nei Workers

All'interno di un worker, l'oggetto globale è rappresentato da `self` (equivalente a `this` al livello globale). Questo oggetto fornisce metodi e proprietà specifici per i workers:

```javascript
self.postMessage(dati); // Invia un messaggio al thread principale
self.onmessage = callback; // Gestisce i messaggi in arrivo
self.onerror = callback; // Gestisce gli errori
self.close(); // Termina il worker
```

## Importazione di Script nei Workers

All'interno di un worker, è possibile importare script aggiuntivi utilizzando `importScripts()`:

```javascript
// Importa uno o più script
importScripts('script1.js', 'script2.js');
```

Gli script importati vengono eseguiti in ordine e condividono lo stesso ambito globale del worker.

## Workers come Moduli ES6

A partire da browser moderni, è possibile utilizzare i moduli ES6 nei workers:

```javascript
// Creazione di un worker modulo
const worker = new Worker('worker.js', { type: 'module' });
```

All'interno di un worker modulo, è possibile utilizzare `import` e `export`:

```javascript
// worker.js (come modulo)
import { funzioneUtile } from './utils.js';

self.onmessage = function(event) {
  const risultato = funzioneUtile(event.data);
  postMessage(risultato);
};
```

## Limitazioni dei Web Workers

I Web Workers hanno alcune limitazioni importanti da considerare:

1. **Nessun accesso al DOM**: I workers non possono accedere direttamente a `document`, `window` o altri oggetti dell'interfaccia utente

2. **API limitate**: Alcune API del browser non sono disponibili nei workers

3. **Same-origin policy**: I workers devono essere caricati dalla stessa origine del documento principale

4. **Overhead di memoria**: Ogni worker ha il proprio ambiente JavaScript separato, che consuma memoria aggiuntiva

5. **Costo di comunicazione**: La serializzazione e deserializzazione dei dati tra thread può essere costosa per grandi quantità di dati

## API Disponibili nei Workers

Nonostante le limitazioni, i workers hanno accesso a molte API utili:

- `setTimeout()`, `setInterval()`, `clearTimeout()`, `clearInterval()`
- `fetch()`, `XMLHttpRequest`
- `WebSockets`
- `IndexedDB`
- `Cache API`
- `Crypto API`
- `Console API`
- `Location` (in sola lettura)
- `Navigator` (parziale)

## Esempio Completo

```javascript
// main.js (thread principale)
const worker = new Worker('worker.js');

worker.onmessage = function(event) {
  document.getElementById('risultato').textContent = event.data.risultato;
  console.log('Tempo di elaborazione:', event.data.tempo, 'ms');
};

worker.onerror = function(event) {
  console.error('Errore nel worker:', event.message);
  event.preventDefault(); // Previene la propagazione dell'errore alla console
};

document.getElementById('btnAvvia').addEventListener('click', function() {
  const numero = parseInt(document.getElementById('numero').value);
  worker.postMessage({ azione: 'calcola', numero: numero });
});

document.getElementById('btnTermina').addEventListener('click', function() {
  worker.terminate();
  console.log('Worker terminato');
});
```

```javascript
// worker.js (thread separato)
// Importa librerie utili
importScripts('utils.js');

self.onmessage = function(event) {
  const dati = event.data;
  
  if (dati.azione === 'calcola') {
    try {
      const inizio = performance.now();
      
      // Simulazione di un calcolo intensivo
      let risultato = 0;
      for (let i = 0; i < dati.numero; i++) {
        risultato += Math.sqrt(i);
      }
      
      const fine = performance.now();
      const tempo = fine - inizio;
      
      // Invia il risultato al thread principale
      postMessage({
        risultato: risultato,
        tempo: tempo
      });
    } catch (errore) {
      postMessage({
        errore: true,
        messaggio: errore.message
      });
    }
  }
};
```

## Conclusione

L'API Web Workers fornisce un potente strumento per eseguire operazioni intensive in background, migliorando significativamente le prestazioni e la reattività delle applicazioni web. Nel prossimo capitolo, esploreremo tecniche avanzate di comunicazione tra workers e il thread principale.