# Sintassi Import/Export nei Moduli ES

La sintassi di import/export è il cuore del sistema di moduli ES. Questa sintassi permette di definire chiaramente quali parti di un modulo sono accessibili dall'esterno e come altri moduli possono accedervi.

## Esportazione (Export)

L'esportazione permette di rendere disponibili funzioni, oggetti, classi o valori primitivi ad altri moduli. Esistono due tipi principali di esportazioni: named exports (esportazioni con nome) e default exports (esportazioni predefinite).

### Named Exports (Esportazioni con Nome)

Le esportazioni con nome permettono di esportare più elementi da un singolo modulo, ciascuno con un nome specifico.

#### Esportazione Individuale

```javascript
// matematica.js
export function somma(a, b) {
  return a + b;
}

export function sottrazione(a, b) {
  return a - b;
}

export const PI = 3.14159;
```

#### Esportazione Raggruppata

```javascript
// matematica.js
function somma(a, b) {
  return a + b;
}

function sottrazione(a, b) {
  return a - b;
}

const PI = 3.14159;

// Esportazione alla fine del file
export { somma, sottrazione, PI };
```

#### Esportazione con Alias

```javascript
// matematica.js
function somma(a, b) {
  return a + b;
}

function sottrazione(a, b) {
  return a - b;
}

// Esportazione con alias
export { 
  somma as addizione, 
  sottrazione as differenza 
};
```

### Default Export (Esportazione Predefinita)

L'esportazione predefinita permette di esportare un singolo valore come esportazione principale del modulo. Ogni modulo può avere una sola esportazione predefinita.

```javascript
// saluto.js
export default function saluta(nome) {
  return `Ciao, ${nome}!`;
}
```

Oppure:

```javascript
// saluto.js
function saluta(nome) {
  return `Ciao, ${nome}!`;
}

export default saluta;
```

È possibile combinare esportazioni predefinite e con nome nello stesso modulo:

```javascript
// utente.js
export const RUOLI = {
  ADMIN: 'admin',
  UTENTE: 'utente',
  OSPITE: 'ospite'
};

export function validaEmail(email) {
  // Implementazione della validazione
  return email.includes('@');
}

// Esportazione predefinita
export default class Utente {
  constructor(nome, email, ruolo) {
    this.nome = nome;
    this.email = email;
    this.ruolo = ruolo;
  }
  
  verificaAdmin() {
    return this.ruolo === RUOLI.ADMIN;
  }
}
```

## Importazione (Import)

L'importazione permette di utilizzare funzionalità esportate da altri moduli. Esistono diverse sintassi per importare elementi in base al tipo di esportazione.

### Importazione di Named Exports

```javascript
// app.js
import { somma, sottrazione, PI } from './matematica.js';

console.log(somma(5, 3)); // 8
console.log(sottrazione(10, 4)); // 6
console.log(PI); // 3.14159
```

### Importazione con Alias

```javascript
// app.js
import { somma as addizione, sottrazione as differenza } from './matematica.js';

console.log(addizione(5, 3)); // 8
console.log(differenza(10, 4)); // 6
```

### Importazione di Default Export

```javascript
// app.js
import saluta from './saluto.js';

console.log(saluta('Mario')); // Ciao, Mario!
```

### Importazione Combinata (Default + Named)

```javascript
// app.js
import Utente, { RUOLI, validaEmail } from './utente.js';

const admin = new Utente('Admin', 'admin@example.com', RUOLI.ADMIN);
console.log(admin.verificaAdmin()); // true
console.log(validaEmail('test@example.com')); // true
```

### Importazione di Tutti gli Export

```javascript
// app.js
import * as Matematica from './matematica.js';

console.log(Matematica.somma(5, 3)); // 8
console.log(Matematica.PI); // 3.14159
```

## Riesportazione

È possibile importare elementi da un modulo e riesportarli immediatamente, utile per creare moduli aggregatori.

```javascript
// index.js (modulo aggregatore)
export { default as Utente, RUOLI } from './utente.js';
export { somma, sottrazione } from './matematica.js';
export { default as saluta } from './saluto.js';
```

Questo permette di importare tutto da un unico punto:

```javascript
// app.js
import { Utente, RUOLI, somma, sottrazione, saluta } from './index.js';
```

## Importazioni Side-Effect

A volte, potrebbe essere necessario caricare un modulo solo per i suoi effetti collaterali (ad esempio, per registrare un servizio globale), senza importare alcun valore specifico:

```javascript
// app.js
import './config.js'; // Carica il modulo per i suoi effetti collaterali
```

## Importazioni Cicliche

I moduli ES supportano le importazioni cicliche, dove due o più moduli dipendono l'uno dall'altro. Tuttavia, è importante gestirle con attenzione per evitare problemi:

```javascript
// modulo-a.js
import { funzioneB } from './modulo-b.js';

export function funzioneA() {
  console.log('Funzione A');
  funzioneB();
}

// modulo-b.js
import { funzioneA } from './modulo-a.js';

export function funzioneB() {
  console.log('Funzione B');
  // Attenzione: chiamare funzioneA qui creerebbe un ciclo infinito
}
```

## Best Practices

### 1. Preferire Named Exports per Librerie

Per le librerie con più funzionalità, è generalmente meglio utilizzare named exports, in modo che gli utenti possano importare solo ciò di cui hanno bisogno:

```javascript
// libreria-utility.js
export function formattaData(data) { /* ... */ }
export function formattaValuta(valore) { /* ... */ }
export function validaEmail(email) { /* ... */ }
```

### 2. Utilizzare Default Export per Componenti o Classi Principali

Per moduli che rappresentano principalmente un singolo componente o classe, l'export default è appropriato:

```javascript
// Componente.js
export default class Componente {
  // Implementazione...
}
```

### 3. Evitare Side Effects nei Moduli

I moduli dovrebbero idealmente essere puri, senza effetti collaterali al momento dell'importazione:

```javascript
// Evitare questo
console.log('Modulo caricato'); // Effetto collaterale all'importazione

export function miaFunzione() { /* ... */ }

// Preferire questo
export function miaFunzione() { /* ... */ }
export function inizializza() {
  console.log('Modulo inizializzato');
  // Altri effetti collaterali...
}
```

### 4. Utilizzare Percorsi Relativi Chiari

Utilizzare percorsi relativi chiari e coerenti per le importazioni:

```javascript
// Buono: percorso relativo chiaro
import { miaFunzione } from '../utils/helpers.js';

// Evitare percorsi troppo profondi o complessi
import { miaFunzione } from '../../../../utils/helpers.js';
```

### 5. Organizzare le Importazioni

Organizzare le importazioni in gruppi logici, separati da una riga vuota:

```javascript
// Librerie esterne
import React from 'react';
import { useState, useEffect } from 'react';

// Componenti interni
import Header from './components/Header.js';
import Footer from './components/Footer.js';

// Utility e helpers
import { formattaData, validaForm } from './utils/helpers.js';
```

## Compatibilità e Considerazioni

### Browser

I moduli ES sono supportati nativamente nei browser moderni, ma richiedono l'attributo `type="module"` nei tag script:

```html
<script type="module" src="app.js"></script>
```

Per supportare browser più vecchi, è necessario utilizzare un bundler come Webpack, Rollup o Parcel.

### Node.js

In Node.js, i moduli ES sono supportati utilizzando l'estensione `.mjs` o impostando `"type": "module"` nel `package.json`.

Differenze rispetto a CommonJS:

```javascript
// CommonJS (Node.js tradizionale)
const modulo = require('./modulo');
module.exports = { miaFunzione };

// ES Modules in Node.js
import modulo from './modulo.js';
export { miaFunzione };
```

## Conclusione

La sintassi di import/export dei moduli ES offre un sistema potente e flessibile per organizzare il codice JavaScript. Permette di creare applicazioni modulari con dipendenze chiare e un buon incapsulamento, migliorando la manutenibilità e la riusabilità del codice.

Nei prossimi capitoli, esploreremo i moduli dinamici, che permettono di caricare codice in modo asincrono e condizionale, migliorando ulteriormente le prestazioni delle applicazioni.

[Torna all'indice](../README.md) | [Argomento precedente: Introduzione ai Moduli](./01_Introduzione_Moduli.md) | [Prossimo argomento: Moduli Dinamici](./03_Moduli_Dinamici.md)