# Sintassi di Import ed Export nei Moduli JavaScript

## Esportazione (Export)

L'esportazione permette di rendere disponibili funzioni, oggetti, variabili o classi da un modulo affinché possano essere utilizzati in altri moduli. Esistono due tipi principali di esportazioni: named exports e default exports.

### Named Exports

I named exports permettono di esportare più elementi da un singolo modulo, ciascuno con un nome specifico.

#### Esportazione in linea

```javascript
// matematica.js
export const PI = 3.14159;
export function somma(a, b) {
  return a + b;
}
export function sottrazione(a, b) {
  return a - b;
}
```

#### Esportazione alla fine del file

```javascript
// matematica.js
const PI = 3.14159;
function somma(a, b) {
  return a + b;
}
function sottrazione(a, b) {
  return a - b;
}

export { PI, somma, sottrazione };
```

#### Esportazione con alias

```javascript
// matematica.js
function somma(a, b) {
  return a + b;
}

export { somma as addizione };
```

### Default Export

Ogni modulo può avere un solo export default, che rappresenta il valore principale esportato dal modulo.

```javascript
// calcolatrice.js
function Calcolatrice() {
  this.somma = function(a, b) {
    return a + b;
  };
  this.sottrazione = function(a, b) {
    return a - b;
  };
}

export default Calcolatrice;
```

È anche possibile combinare default export e named exports nello stesso modulo:

```javascript
// matematica.js
export const PI = 3.14159;

function somma(a, b) {
  return a + b;
}

export { somma };

export default function(a, b) {
  return a * b;
}
```

## Importazione (Import)

L'importazione permette di utilizzare funzionalità esportate da altri moduli.

### Importazione di Named Exports

```javascript
// app.js
import { PI, somma, sottrazione } from './matematica.js';

console.log(PI); // 3.14159
console.log(somma(5, 3)); // 8
```

#### Importazione con alias

```javascript
// app.js
import { somma as addizione, sottrazione as diminuzione } from './matematica.js';

console.log(addizione(5, 3)); // 8
```

#### Importazione di tutti i named exports

```javascript
// app.js
import * as matematica from './matematica.js';

console.log(matematica.PI); // 3.14159
console.log(matematica.somma(5, 3)); // 8
```

### Importazione di Default Export

```javascript
// app.js
import Calcolatrice from './calcolatrice.js';

const calc = new Calcolatrice();
console.log(calc.somma(5, 3)); // 8
```

### Importazione combinata (default + named)

```javascript
// app.js
import moltiplicazione, { PI, somma } from './matematica.js';

console.log(PI); // 3.14159
console.log(somma(5, 3)); // 8
console.log(moltiplicazione(5, 3)); // 15
```

## Importazione senza assegnazione

A volte potresti voler importare un modulo solo per i suoi effetti collaterali (side effects), senza importare alcun valore specifico:

```javascript
// app.js
import './inizializzazione.js';
```

Questo è utile per moduli che configurano qualcosa o aggiungono funzionalità globali.

## Re-esportazione

È possibile importare e ri-esportare moduli in un unico passaggio, utile per creare moduli "barrel" che aggregano più moduli:

```javascript
// index.js
export { default as Calcolatrice } from './calcolatrice.js';
export { PI, somma, sottrazione } from './matematica.js';
```

Ora altri moduli possono importare tutto da un unico punto:

```javascript
// app.js
import { Calcolatrice, PI, somma } from './index.js';
```

## Percorsi di Importazione

Esistono diversi tipi di percorsi che puoi utilizzare nelle istruzioni di importazione:

### Percorsi relativi

```javascript
import { somma } from './matematica.js'; // Stesso livello
import { Utente } from '../modelli/utente.js'; // Livello superiore
import { config } from './config/index.js'; // Sottocartella
```

### Percorsi assoluti (in ambiente browser)

```javascript
import { API } from '/js/api.js'; // Dalla radice del server
```

### Moduli da node_modules (in ambiente Node.js o con bundler)

```javascript
import express from 'express'; // Cerca in node_modules
```

### URL complete (in ambiente browser)

```javascript
import { Component } from 'https://unpkg.com/libreria/component.js';
```

## Considerazioni sulla Compatibilità

- I moduli ES6 sono supportati nativamente nei browser moderni, ma potrebbero richiedere transpilazione (con Babel o simili) per browser più vecchi
- In Node.js, i moduli ES6 sono supportati nativamente a partire dalla versione 13.2.0 (con estensione .mjs o impostando "type": "module" nel package.json)
- Per progetti complessi, è consigliabile utilizzare un bundler come Webpack, Rollup o Parcel per gestire i moduli

Nella prossima sezione, approfondiremo le differenze tra moduli named e default e le best practices per il loro utilizzo.