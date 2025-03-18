# Modulo 1: Fondamenti di Node.js e programmazione ad eventi

## Obiettivi di apprendimento
- Comprendere i concetti fondamentali di Node.js e il suo ecosistema
- Padroneggiare il modello di programmazione asincrona e l'event loop
- Creare e utilizzare moduli personalizzati
- Implementare e gestire eventi con EventEmitter
- Sviluppare un server Node.js con gestione eventi personalizzati

## 1.1 Introduzione a Node.js e al modello event-driven

### Cos'è Node.js?
Node.js è un runtime JavaScript costruito sul motore V8 di Chrome che permette di eseguire codice JavaScript al di fuori del browser. È progettato per costruire applicazioni di rete scalabili grazie al suo modello non bloccante I/O e orientato agli eventi.

```javascript
// Il classico "Hello World" in Node.js
console.log("Hello, Node.js!");
```

### Caratteristiche principali di Node.js
- **Single-threaded**: Utilizza un singolo thread principale per l'esecuzione del codice
- **Non-bloccante**: Operazioni I/O eseguite in modo asincrono
- **Event-driven**: Basato su un modello di programmazione guidato dagli eventi
- **Veloce**: Esecuzione rapida grazie al motore V8 di Google Chrome
- **Leggero**: Consumo di risorse ridotto rispetto ad altre tecnologie server

### Il modello event-driven
La programmazione event-driven è un paradigma in cui il flusso del programma è determinato da eventi come input utente, messaggi da altri programmi o thread. In Node.js, questo modello è implementato attraverso callback, promises e async/await.

```javascript
// Esempio di programmazione event-driven con un server HTTP
const http = require('http');

const server = http.createServer((req, res) => {
  // Questo callback viene eseguito quando si verifica un evento 'request'
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});

server.listen(3000, () => {
  // Questo callback viene eseguito quando il server inizia ad ascoltare
  console.log('Server in ascolto sulla porta 3000');
});
```

## 1.2 L'event loop e gestione asincrona

### Come funziona l'event loop
L'event loop è il meccanismo che permette a Node.js di eseguire operazioni non bloccanti nonostante JavaScript sia single-threaded. Ecco le fasi principali dell'event loop:

1. **Timers**: Esegue i callback programmati da `setTimeout()` e `setInterval()`
2. **Pending callbacks**: Esegue i callback I/O differiti
3. **Idle, prepare**: Usati internamente
4. **Poll**: Recupera nuovi eventi I/O e esegue i relativi callback
5. **Check**: Esegue i callback programmati da `setImmediate()`
6. **Close callbacks**: Esegue i callback di chiusura (es. `socket.on('close', ...)`)

![Event Loop Diagram](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/event-loop-phases.png)

### Programmazione asincrona in Node.js

#### Callbacks
I callback sono funzioni passate come argomenti ad altre funzioni, che vengono eseguite dopo il completamento di un'operazione.

```javascript
// Esempio di callback
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Errore nella lettura del file:', err);
    return;
  }
  console.log('Contenuto del file:', data);
});

console.log('Questa riga viene eseguita prima della lettura del file');
```

#### Promises
Le Promises rappresentano un valore che potrebbe essere disponibile ora, in futuro o mai.

```javascript
// Esempio di Promise
const fs = require('fs').promises;

fs.readFile('file.txt', 'utf8')
  .then(data => {
    console.log('Contenuto del file:', data);
  })
  .catch(err => {
    console.error('Errore nella lettura del file:', err);
  });

console.log('Questa riga viene eseguita prima della lettura del file');
```

#### Async/Await
Async/await è una sintassi che rende il codice asincrono più leggibile, permettendo di scrivere codice asincrono che sembra sincrono.

```javascript
// Esempio di async/await
const fs = require('fs').promises;

async function leggiFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    console.log('Contenuto del file:', data);
  } catch (err) {
    console.error('Errore nella lettura del file:', err);
  }
}

leggiFile();
console.log('Questa riga viene eseguita prima della lettura del file');
```

## 1.3 Creazione e gestione di moduli

### Cos'è un modulo in Node.js?
Un modulo è un file JavaScript che contiene codice riutilizzabile. Node.js utilizza il sistema CommonJS per la gestione dei moduli.

### Tipi di moduli
- **Moduli core**: Forniti da Node.js (es. `fs`, `http`, `path`)
- **Moduli locali**: Creati dallo sviluppatore
- **Moduli di terze parti**: Installati tramite npm

### Creazione di un modulo

```javascript
// utils.js - Un modulo personalizzato
function somma(a, b) {
  return a + b;
}

function sottrazione(a, b) {
  return a - b;
}

// Esportazione di funzioni specifiche
module.exports = {
  somma,
  sottrazione
};

// Oppure esportazione di una singola funzione/oggetto
// module.exports = somma;
```

### Importazione di un modulo

```javascript
// app.js - Utilizzo del modulo
const utils = require('./utils');
// oppure con destructuring
// const { somma, sottrazione } = require('./utils');

console.log(utils.somma(5, 3)); // Output: 8
console.log(utils.sottrazione(5, 3)); // Output: 2
```

### ES Modules in Node.js
Dalle versioni recenti, Node.js supporta anche i moduli ES (ECMAScript).

```javascript
// utils.mjs
export function somma(a, b) {
  return a + b;
}

export function sottrazione(a, b) {
  return a - b;
}
```

```javascript
// app.mjs
import { somma, sottrazione } from './utils.mjs';

console.log(somma(5, 3)); // Output: 8
console.log(sottrazione(5, 3)); // Output: 2
```

## 1.4 Event emitters e gestione degli eventi

### La classe EventEmitter
La classe `EventEmitter` è il cuore del modello event-driven di Node.js. Permette di emettere eventi e registrare listener per questi eventi.

```javascript
const EventEmitter = require('events');

// Creazione di un emitter
const myEmitter = new EventEmitter();

// Registrazione di un listener per l'evento 'evento'
myEmitter.on('evento', (arg1, arg2) => {
  console.log('Evento scatenato con argomenti:', arg1, arg2);
});

// Emissione dell'evento
myEmitter.emit('evento', 'primo', 'secondo');
```

### Creazione di una classe basata su EventEmitter

```javascript
const EventEmitter = require('events');

class MiaClasse extends EventEmitter {
  constructor() {
    super();
  }
  
  elabora(dati) {
    // Elaborazione dei dati
    console.log('Elaborazione in corso...');
    
    // Emissione di un evento al termine dell'elaborazione
    this.emit('elaborazione-completata', dati);
  }
}

const istanza = new MiaClasse();

// Registrazione di un listener
istanza.on('elaborazione-completata', (dati) => {
  console.log('Elaborazione completata per:', dati);
});

// Avvio dell'elaborazione
istanza.elabora('dati di esempio');
```

### Gestione degli errori con EventEmitter

```javascript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Gestione dell'evento 'error'
myEmitter.on('error', (err) => {
  console.error('Si è verificato un errore:', err.message);
});

// Emissione di un errore
myEmitter.emit('error', new Error('Qualcosa è andato storto'));
```

## Progetto: Creazione di un semplice server con gestione eventi personalizzati

### Descrizione
In questo progetto, creeremo un server HTTP che utilizza EventEmitter per gestire eventi personalizzati. Il server risponderà a diverse richieste e emetterà eventi per registrare l'attività e gestire le risorse.

### Requisiti funzionali
- Server HTTP che risponde a richieste GET e POST
- Sistema di logging basato su eventi
- Gestione delle risorse con eventi personalizzati
- Implementazione di un semplice sistema di cache

### Struttura dei file
```
server-project/
├── index.js         # File principale del server
├── logger.js        # Modulo per il logging
├── requestHandler.js # Gestione delle richieste
├── cache.js         # Sistema di cache
└── package.json     # Configurazione del progetto
```

### Implementazione

#### package.json
```json
{
  "name": "event-driven-server",
  "version": "1.0.0",
  "description": "Un server event-driven con Node.js",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["node", "event-driven", "server"],
  "author": "Il tuo nome",
  "license": "MIT"
}
```

#### logger.js
```javascript
const EventEmitter = require('events');

class Logger extends EventEmitter {
  log(message) {
    // Registra il messaggio
    console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
    
    // Emetti un evento di log
    this.emit('log', { timestamp: new Date(), message });
  }
  
  error(message) {
    // Registra l'errore
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
    
    // Emetti un evento di errore
    this.emit('error', { timestamp: new Date(), message });
  }
}

module.exports = new Logger();
```

#### cache.js
```javascript
const EventEmitter = require('events');

class Cache extends EventEmitter {
  constructor() {
    super();
    this.cache = {};
    this.ttl = 60000; // Time to live: 60 secondi
    
    // Pulizia automatica della cache ogni minuto
    setInterval(() => this.cleanup(), this.ttl);
  }
  
  set(key, value) {
    const item = {
      value,
      expiry: Date.now() + this.ttl
    };
    
    this.cache[key] = item;
    this.emit('cache-set', { key, value });
    return value;
  }
  
  get(key) {
    const item = this.cache[key];
    
    if (!item) {
      this.emit('cache-miss', { key });
      return null;
    }
    
    // Verifica se l'elemento è scaduto
    if (Date.now() > item.expiry) {
      this.delete(key);
      this.emit('cache-expired', { key });
      return null;
    }
    
    this.emit('cache-hit', { key, value: item.value });
    return item.value;
  }
  
  delete(key) {
    if (key in this.cache) {
      delete this.cache[key];
      this.emit('cache-delete', { key });
    }
  }
  
  cleanup() {
    const now = Date.now();
    let deletedCount = 0;
    
    Object.keys(this.cache).forEach(key => {
      if (now > this.cache[key].expiry) {
        this.delete(key);
        deletedCount++;
      }
    });
    
    if (deletedCount > 0) {
      this.emit('cache-cleanup', { deletedCount });
    }
  }
}

module.exports = new Cache();
```

#### requestHandler.js
```javascript
const url = require('url');
const logger = require('./logger');
const cache = require('./cache');
const EventEmitter = require('events');

class RequestHandler extends EventEmitter {
  constructor() {
    super();
    this.routes = {
      GET: {},
      POST: {}
    };
    
    // Registrazione degli handler predefiniti
    this.registerRoute('GET', '/api/data', this.getData.bind(this));
    this.registerRoute('POST', '/api/data', this.postData.bind(this));