# Modulo 1: Fondamenti di Node.js e programmazione ad eventi

[← Torna al corso principale](../README.md)

## Obiettivi di apprendimento
- Comprendere i concetti fondamentali di Node.js e il suo ecosistema
- Padroneggiare il modello di programmazione asincrona e l'event loop
- Creare e utilizzare moduli personalizzati
- Implementare e gestire eventi con EventEmitter
- Sviluppare un server Node.js con gestione eventi personalizzati

## Contenuti
- [1.1 Introduzione a Node.js e al modello event-driven](#11-introduzione-a-nodejs-e-al-modello-event-driven)
- [1.2 L'event loop e gestione asincrona](#12-levent-loop-e-gestione-asincrona)
- [1.3 Creazione e gestione di moduli](#13-creazione-e-gestione-di-moduli)
- [1.4 Event emitters e gestione degli eventi](#14-event-emitters-e-gestione-degli-eventi)
- [Progetto: Creazione di un semplice server con gestione eventi personalizzati](#progetto-creazione-di-un-semplice-server-con-gestione-eventi-personalizzati)
- [1.5 Debugging in Node.js](#15-debugging-in-nodejs)
- [1.6 Gestione dei pacchetti con npm](#16-gestione-dei-pacchetti-con-npm)
- [1.7 Testing e qualità del codice](#17-testing-e-qualità-del-codice)

## 1.1 Introduzione a Node.js e al modello event-driven

### Cos'è Node.js?
Node.js è un runtime JavaScript costruito sul motore V8 di Chrome che permette di eseguire codice JavaScript al di fuori del browser. È progettato per costruire applicazioni di rete scalabili grazie al suo modello non bloccante I/O e orientato agli eventi.

```javascript
// Il classico "Hello World" in Node.js
console.log("Hello, Node.js!");
```

#### Perché scegliere Node.js?
Node.js è particolarmente adatto per:
- Applicazioni in tempo reale come chat, giochi multiplayer e dashboard.
- API RESTful grazie alla sua capacità di gestire molte richieste simultaneamente.
- Applicazioni basate su microservizi per la sua leggerezza e modularità.

### Caratteristiche principali di Node.js
- **Single-threaded**: Utilizza un singolo thread principale per l'esecuzione del codice, ma sfrutta un pool di thread per operazioni I/O.
- **Non-bloccante**: Operazioni I/O eseguite in modo asincrono, migliorando la scalabilità.
- **Event-driven**: Basato su un modello di programmazione guidato dagli eventi, ideale per applicazioni in tempo reale.
- **Veloce**: Esecuzione rapida grazie al motore V8 di Google Chrome, che compila JavaScript in codice macchina.
- **Leggero**: Consumo di risorse ridotto rispetto ad altre tecnologie server.

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

#### Vantaggi del modello event-driven
- **Alta scalabilità**: Ideale per applicazioni con molte connessioni simultanee.
- **Efficienza**: Riduce il tempo di attesa per operazioni I/O.
- **Flessibilità**: Facilita la gestione di eventi complessi.

---

## 1.2 L'event loop e gestione asincrona

### Come funziona l'event loop
L'event loop è il meccanismo che permette a Node.js di eseguire operazioni non bloccanti nonostante JavaScript sia single-threaded. Ecco le fasi principali dell'event loop:

1. **Timers**: Esegue i callback programmati da `setTimeout()` e `setInterval()`.
2. **Pending callbacks**: Esegue i callback I/O differiti.
3. **Idle, prepare**: Usati internamente da Node.js.
4. **Poll**: Recupera nuovi eventi I/O e esegue i relativi callback.
5. **Check**: Esegue i callback programmati da `setImmediate()`.
6. **Close callbacks**: Esegue i callback di chiusura (es. `socket.on('close', ...)`).

#### Differenza tra `setTimeout` e `setImmediate`
- `setTimeout`: Esegue il callback dopo un intervallo minimo specificato.
- `setImmediate`: Esegue il callback immediatamente dopo la fase di polling.

```javascript
setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));

// L'output può variare, ma generalmente 'setImmediate' viene eseguito prima.
```

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

---

## 1.3 Creazione e gestione di moduli

### Cos'è un modulo in Node.js?
Un modulo è un file JavaScript che contiene codice riutilizzabile. Node.js utilizza il sistema CommonJS per la gestione dei moduli.

### Tipi di moduli
- **Moduli core**: Forniti da Node.js (es. `fs`, `http`, `path`).
- **Moduli locali**: Creati dallo sviluppatore.
- **Moduli di terze parti**: Installati tramite npm.

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
```

### Importazione di un modulo

```javascript
// app.js - Utilizzo del modulo
const utils = require('./utils');

console.log(utils.somma(5, 3)); // Output: 8
console.log(utils.sottrazione(5, 3)); // Output: 2
```

---

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

#### Vantaggi di EventEmitter
- **Modularità**: Facilita la separazione delle responsabilità.
- **Flessibilità**: Permette di gestire eventi personalizzati.

---

## Progetto: Creazione di un semplice server con gestione eventi personalizzati

### Descrizione
In questo progetto, creeremo un server HTTP che utilizza EventEmitter per gestire eventi personalizzati. Il server risponderà a diverse richieste e emetterà eventi per registrare l'attività e gestire le risorse.

### Requisiti funzionali
- Server HTTP che risponde a richieste GET e POST.
- Sistema di logging basato su eventi.
- Gestione delle risorse con eventi personalizzati.
- Implementazione di un semplice sistema di cache.

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
Consulta i file di esempio per i dettagli sull'implementazione.

---

## 1.5 Debugging in Node.js

### Strumenti di debugging
Node.js offre diversi strumenti per il debugging:
- **Console**: Utilizzo di `console.log()` per stampare variabili e messaggi.
- **Debugger integrato**: Avviare Node.js con il flag `--inspect` per utilizzare strumenti di debugging come Chrome DevTools.
- **Moduli di terze parti**: Librerie come `debug` per una gestione avanzata del logging.

```javascript
// Esempio di utilizzo del debugger
function somma(a, b) {
  debugger; // Punto di interruzione
  return a + b;
}

console.log(somma(2, 3));
```

---

## 1.6 Gestione dei pacchetti con npm

### Cos'è npm?
npm (Node Package Manager) è il gestore di pacchetti predefinito per Node.js. Permette di installare, aggiornare e gestire librerie e dipendenze.

### Comandi principali
- **Inizializzare un progetto**: `npm init` o `npm init -y`
- **Installare un pacchetto**: `npm install <nome-pacchetto>`
- **Installare un pacchetto globalmente**: `npm install -g <nome-pacchetto>`
- **Aggiornare un pacchetto**: `npm update <nome-pacchetto>`
- **Rimuovere un pacchetto**: `npm uninstall <nome-pacchetto>`

```bash
# Esempio: Installazione di Express
npm install express
```

---

## 1.7 Testing e qualità del codice

### Importanza del testing
Il testing è fondamentale per garantire che il codice funzioni come previsto e per prevenire regressioni.

### Tipi di test
- **Unit test**: Testano singole unità di codice (es. funzioni o metodi).
- **Integration test**: Verificano l'interazione tra più componenti.
- **End-to-end test**: Simulano il comportamento dell'utente finale.

### Strumenti di testing
- **Mocha**: Framework di testing per Node.js.
- **Chai**: Libreria di asserzioni per Mocha.
- **Jest**: Framework completo per il testing.

```javascript
// Esempio di unit test con Mocha e Chai
const { expect } = require('chai');
const { somma } = require('./utils');

describe('Funzione somma', () => {
  it('dovrebbe restituire la somma di due numeri', () => {
    expect(somma(2, 3)).to.equal(5);
  });
});
```

### Linter e formattatori
- **ESLint**: Analizza il codice per trovare problemi di stile e potenziali bug.
- **Prettier**: Formatta il codice in modo uniforme.

```bash
# Installazione di ESLint
npm install eslint --save-dev
npx eslint --init
```

---