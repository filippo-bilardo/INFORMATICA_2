# Moduli Named vs Default in JavaScript

## Panoramica

JavaScript ES6 offre due principali modalità di esportazione dai moduli: **named exports** e **default exports**. Comprendere le differenze tra questi due approcci è fondamentale per utilizzare efficacemente il sistema di moduli.

## Named Exports

I named exports permettono di esportare più valori da un singolo modulo, ciascuno identificato da un nome specifico.

### Caratteristiche dei Named Exports

- **Esportazioni multiple**: Un modulo può avere un numero illimitato di named exports
- **Corrispondenza dei nomi**: L'importazione deve utilizzare lo stesso nome dell'esportazione (a meno che non si utilizzi un alias)
- **Importazione selettiva**: È possibile importare solo ciò che serve, facilitando il tree-shaking
- **Auto-documentazione**: I nomi delle esportazioni rendono chiaro cosa viene importato

### Esempio di Named Exports

```javascript
// utils.js
export function formattaData(data) {
  return data.toLocaleDateString();
}

export function formattaValuta(valore) {
  return `€${valore.toFixed(2)}`;
}

export const IVA = 0.22;
```

```javascript
// app.js
import { formattaData, formattaValuta, IVA } from './utils.js';

const oggi = new Date();
const prezzo = 100;

console.log(formattaData(oggi));
console.log(formattaValuta(prezzo));
console.log(`IVA: ${IVA * 100}%`);
```

## Default Exports

Un default export rappresenta il valore principale esportato da un modulo. Ogni modulo può avere un solo default export.

### Caratteristiche dei Default Exports

- **Esportazione singola**: Un modulo può avere un solo default export
- **Flessibilità di denominazione**: L'importatore può scegliere qualsiasi nome per il valore importato
- **Sintassi semplificata**: Non richiede parentesi graffe durante l'importazione
- **Ideale per classi/funzioni principali**: Perfetto quando un modulo ha un'esportazione "principale"

### Esempio di Default Export

```javascript
// Utente.js
class Utente {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }
  
  saluta() {
    return `Ciao, sono ${this.nome}!`;
  }
}

export default Utente;
```

```javascript
// app.js
import Utente from './Utente.js';
// oppure con un nome diverso
// import ClasseUtente from './Utente.js';

const utente = new Utente('Mario', 'mario@esempio.it');
console.log(utente.saluta());
```

## Combinazione di Named e Default Exports

È possibile combinare entrambi i tipi di esportazione nello stesso modulo:

```javascript
// database.js
export const VERSIONE_DB = '1.0.0';

export function connetti() {
  console.log('Connessione al database...');
}

export default class Database {
  constructor(nome) {
    this.nome = nome;
  }
  
  query(sql) {
    console.log(`Esecuzione query su ${this.nome}: ${sql}`);
  }
}
```

```javascript
// app.js
import DB, { VERSIONE_DB, connetti } from './database.js';

console.log(`Versione DB: ${VERSIONE_DB}`);
connetti();
const db = new DB('Prodotti');
db.query('SELECT * FROM prodotti');
```

## Quando Usare Named vs Default Exports

### Usa Named Exports quando:

- Il modulo esporta più funzionalità correlate
- Vuoi rendere esplicito cosa viene importato
- Desideri facilitare il tree-shaking
- Stai creando una libreria di utilità

### Usa Default Export quando:

- Il modulo ha un'unica responsabilità principale
- Stai esportando una classe o un componente
- Vuoi semplificare l'importazione
- Il modulo rappresenta un'entità specifica (es. un componente React)

## Best Practices

1. **Coerenza**: Scegli un approccio e mantienilo coerente nel progetto
2. **Nomi significativi**: Usa nomi descrittivi per le esportazioni
3. **Un file, una responsabilità**: Idealmente, ogni file dovrebbe avere una responsabilità chiara
4. **Evita l'import ***: Preferisci importazioni esplicite per migliorare la leggibilità e il tree-shaking
5. **Convenzioni di denominazione**:
   - Per i default exports, usa PascalCase per le classi e camelCase per le funzioni
   - Per i named exports, usa camelCase per funzioni e variabili, UPPER_CASE per costanti

## Considerazioni sulla Compatibilità

Alcuni strumenti di build e ambienti potrebbero trattare i named e default exports in modo diverso. Ad esempio:

- CommonJS (Node.js) ha una sintassi diversa per gestire i default exports
- Alcuni bundler potrebbero avere ottimizzazioni specifiche per i named exports

```javascript
// Equivalente CommonJS di un default export
module.exports = Utente;

// Equivalente CommonJS di named exports
module.exports.formattaData = formattaData;
module.exports.formattaValuta = formattaValuta;
```

Nella prossima sezione, esploreremo il dynamic import, una potente funzionalità per caricare moduli in modo asincrono.