# Introduzione ai Moduli in JavaScript

I moduli sono un meccanismo fondamentale per organizzare il codice JavaScript in unità separate e riutilizzabili. Questo approccio permette di suddividere applicazioni complesse in componenti più piccoli e gestibili, migliorando la manutenibilità e la scalabilità del codice.

## Evoluzione della Modularità in JavaScript

JavaScript è nato come un linguaggio semplice per aggiungere interattività alle pagine web. Inizialmente, non aveva un sistema di moduli integrato, il che portava a diversi problemi:

### Problemi del JavaScript Tradizionale

1. **Inquinamento dello Scope Globale**: Tutte le variabili e funzioni dichiarate finivano nello scope globale, causando potenziali conflitti di nomi.

```javascript
// script1.js
var nome = "Mario";
function saluta() {
  console.log("Ciao " + nome);
}

// script2.js
var nome = "Luigi"; // Sovrascrive la variabile precedente!
function mostraMessaggio() {
  console.log("Benvenuto " + nome);
}
```

2. **Dipendenze Implicite**: Non c'era un modo standard per dichiarare le dipendenze tra file, rendendo difficile capire l'ordine corretto di caricamento.

3. **Mancanza di Incapsulamento**: Era difficile nascondere i dettagli implementativi e esporre solo un'API pubblica.

### Soluzioni Pre-ES Modules

Prima dell'introduzione dei moduli ES, gli sviluppatori hanno creato diversi pattern e sistemi per simulare la modularità:

#### Pattern Module (IIFE)

Utilizzo di Immediately Invoked Function Expressions (IIFE) per creare scope isolati:

```javascript
var Contatore = (function() {
  // Variabili private
  var conteggio = 0;
  
  // Funzioni private
  function incrementaInterno() {
    conteggio++;
  }
  
  // API pubblica
  return {
    incrementa: function() {
      incrementaInterno();
      return conteggio;
    },
    decrementa: function() {
      conteggio--;
      return conteggio;
    },
    valore: function() {
      return conteggio;
    }
  };
})();

console.log(Contatore.valore()); // 0
console.log(Contatore.incrementa()); // 1
console.log(Contatore.incrementa()); // 2
console.log(Contatore.decrementa()); // 1
```

#### CommonJS

Utilizzato principalmente in Node.js, CommonJS ha introdotto i concetti di `require()` e `module.exports`:

```javascript
// matematica.js
function somma(a, b) {
  return a + b;
}

function sottrazione(a, b) {
  return a - b;
}

module.exports = {
  somma: somma,
  sottrazione: sottrazione
};

// app.js
const matematica = require('./matematica');
console.log(matematica.somma(5, 3)); // 8
```

#### AMD (Asynchronous Module Definition)

Utilizzato principalmente nel browser con librerie come RequireJS, ottimizzato per il caricamento asincrono:

```javascript
// matematica.js
define([], function() {
  return {
    somma: function(a, b) {
      return a + b;
    },
    sottrazione: function(a, b) {
      return a - b;
    }
  };
});

// app.js
require(['matematica'], function(matematica) {
  console.log(matematica.somma(5, 3)); // 8
});
```

## ES Modules: Il Sistema di Moduli Nativo

Con ECMAScript 2015 (ES6), JavaScript ha finalmente introdotto un sistema di moduli nativo, chiamato ES Modules. Questo sistema è ora supportato da tutti i browser moderni e da Node.js.

### Caratteristiche Principali

1. **Sintassi Dichiarativa**: Utilizzo di `import` e `export` per gestire le dipendenze.
2. **Analisi Statica**: Le importazioni e le esportazioni sono analizzate staticamente, permettendo ottimizzazioni come tree-shaking.
3. **Scope Isolato**: Ogni modulo ha il proprio scope, evitando l'inquinamento globale.
4. **Importazioni Asincrone**: Supporto per il caricamento asincrono dei moduli con `import()`.
5. **Singleton**: I moduli sono singleton, vengono valutati una sola volta indipendentemente da quante volte vengono importati.

### Esempio Base

```javascript
// matematica.js
export function somma(a, b) {
  return a + b;
}

export function sottrazione(a, b) {
  return a - b;
}

// app.js
import { somma, sottrazione } from './matematica.js';

console.log(somma(5, 3)); // 8
console.log(sottrazione(10, 4)); // 6
```

## Vantaggi dei Moduli ES

### 1. Organizzazione del Codice

I moduli permettono di suddividere il codice in unità logiche separate, facilitando la manutenzione e la comprensione:

```
project/
├── src/
│   ├── app.js             # Punto di ingresso dell'applicazione
│   ├── utils/
│   │   ├── formatters.js  # Funzioni di formattazione
│   │   └── validators.js  # Funzioni di validazione
│   ├── components/
│   │   ├── header.js      # Componente header
│   │   └── footer.js      # Componente footer
│   └── services/
│       ├── api.js         # Servizio per le chiamate API
│       └── auth.js        # Servizio di autenticazione
```

### 2. Riutilizzo del Codice

I moduli facilitano il riutilizzo del codice tra progetti diversi:

```javascript
// utils/date-formatter.js
export function formatDate(date, format = 'DD/MM/YYYY') {
  // Implementazione della formattazione
}

export function getRelativeTime(date) {
  // Implementazione del tempo relativo (es. "2 ore fa")
}

// Può essere importato in qualsiasi parte dell'applicazione
import { formatDate } from '../utils/date-formatter.js';
```

### 3. Gestione Esplicita delle Dipendenze

Le dipendenze sono dichiarate esplicitamente, rendendo chiaro quali moduli dipendono da altri:

```javascript
// user-service.js
import { apiGet, apiPost } from './api-service.js';
import { validateEmail } from '../utils/validators.js';

export async function getUser(id) {
  return apiGet(`/users/${id}`);
}

export async function createUser(userData) {
  if (!validateEmail(userData.email)) {
    throw new Error('Email non valida');
  }
  return apiPost('/users', userData);
}
```

### 4. Incapsulamento

I moduli permettono di nascondere i dettagli implementativi, esponendo solo ciò che è necessario:

```javascript
// database.js

// Variabili private (non esportate)
const dbUrl = 'mongodb://localhost:27017';
let connection = null;

// Funzione privata
function createConnection() {
  console.log(`Connessione a ${dbUrl}...`);
  connection = { status: 'connected' };
  return connection;
}

// API pubblica
export function connect() {
  if (!connection) {
    return createConnection();
  }
  return connection;
}

export function query(sql) {
  const conn = connect();
  console.log(`Esecuzione query: ${sql}`);
  // Implementazione...
}

// dbUrl e createConnection non sono accessibili dall'esterno
```

### 5. Lazy Loading

I moduli possono essere caricati dinamicamente quando necessario, migliorando le prestazioni iniziali:

```javascript
// Caricamento di un modulo pesante solo quando necessario
document.getElementById('btnReport').addEventListener('click', async () => {
  try {
    // Il modulo viene caricato solo quando l'utente clicca sul pulsante
    const { generateReport } = await import('./reports/pdf-generator.js');
    const report = await generateReport();
    downloadFile(report);
  } catch (error) {
    console.error('Errore nel caricamento del generatore di report:', error);
  }
});
```

## Utilizzo nei Browser

Per utilizzare i moduli ES nei browser, è necessario specificare `type="module"` nel tag script:

```html
<!DOCTYPE html>
<html>
<head>
  <title>App con ES Modules</title>
</head>
<body>
  <h1>La mia app</h1>
  
  <!-- Caricamento di un modulo -->
  <script type="module" src="app.js"></script>
  
  <!-- Modulo inline -->
  <script type="module">
    import { saluta } from './utils/greeter.js';
    saluta('Mondo');
  </script>
</body>
</html>
```

### Considerazioni Importanti

1. **CORS**: I moduli ES sono soggetti alle restrizioni CORS. Non funzioneranno se caricati tramite `file://`.
2. **Strict Mode**: I moduli ES operano sempre in strict mode, anche senza la direttiva `'use strict'`.
3. **Estensioni dei File**: Nei browser, le importazioni richiedono generalmente l'estensione del file (`.js`).
4. **Defer Implicito**: Gli script di tipo `module` hanno un comportamento `defer` implicito.

## Utilizzo in Node.js

Node.js supporta i moduli ES a partire dalla versione 13.2.0, ma per utilizzarli è necessario:

1. Utilizzare l'estensione `.mjs` per i file, oppure
2. Impostare `"type": "module"` nel `package.json`

```javascript
// matematica.mjs
export function somma(a, b) {
  return a + b;
}

// app.mjs
import { somma } from './matematica.mjs';
console.log(somma(5, 3)); // 8
```

Oppure con `package.json`:

```json
{
  "name": "mia-app",
  "version": "1.0.0",
  "type": "module"
}
```

```javascript
// matematica.js
export function somma(a, b) {
  return a + b;
}

// app.js
import { somma } from './matematica.js';
console.log(somma(5, 3)); // 8
```

## Conclusione

I moduli ES rappresentano un importante passo avanti per JavaScript, fornendo un sistema di modularità standardizzato e potente. Permettono di scrivere codice più organizzato, manutenibile e riutilizzabile, facilitando lo sviluppo di applicazioni complesse.

Nei prossimi capitoli, esploreremo in dettaglio la sintassi di import/export, i moduli dinamici e i pattern di progettazione basati sui moduli.

[Torna all'indice](../README.md) | [Prossimo argomento: Sintassi Import/Export](./02_Import_Export.md)