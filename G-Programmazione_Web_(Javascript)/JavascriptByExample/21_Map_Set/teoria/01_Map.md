# Map: Concetti e Utilizzo

## Introduzione a Map

La struttura dati `Map` è stata introdotta in JavaScript con ECMAScript 6 (ES6) per fornire una collezione di coppie chiave-valore dove le chiavi possono essere di qualsiasi tipo, a differenza degli oggetti tradizionali che accettano solo stringhe o simboli come chiavi.

## Creazione di una Map

```javascript
// Creazione di una Map vuota
const mappa = new Map();

// Creazione di una Map con valori iniziali
const mappaPopolata = new Map([
  ['chiave1', 'valore1'],
  ['chiave2', 'valore2'],
  [42, 'risposta alla vita, l\'universo e tutto quanto']
]);
```

## Metodi Principali

### Aggiungere e Recuperare Elementi

```javascript
// Aggiungere elementi
mappa.set('nome', 'Mario');
mappa.set('età', 30);
mappa.set(document.body, 'riferimento al body'); // Chiave = oggetto DOM

// Recuperare elementi
console.log(mappa.get('nome')); // 'Mario'
console.log(mappa.get('età')); // 30
console.log(mappa.get(document.body)); // 'riferimento al body'

// Verificare l'esistenza di una chiave
console.log(mappa.has('nome')); // true
console.log(mappa.has('indirizzo')); // false
```

### Rimuovere Elementi

```javascript
// Rimuovere un elemento specifico
mappa.delete('età');

// Rimuovere tutti gli elementi
mappa.clear();
```

### Dimensione e Iterazione

```javascript
// Ottenere il numero di elementi
console.log(mappa.size);

// Iterare su tutti gli elementi
mappa.forEach((valore, chiave) => {
  console.log(`${chiave}: ${valore}`);
});

// Iterare su tutte le chiavi
for (const chiave of mappa.keys()) {
  console.log(chiave);
}

// Iterare su tutti i valori
for (const valore of mappa.values()) {
  console.log(valore);
}

// Iterare su tutte le coppie [chiave, valore]
for (const [chiave, valore] of mappa.entries()) {
  console.log(`${chiave}: ${valore}`);
}

// Forma abbreviata per entries()
for (const [chiave, valore] of mappa) {
  console.log(`${chiave}: ${valore}`);
}
```

## Vantaggi di Map rispetto agli Oggetti

### 1. Chiavi di Qualsiasi Tipo

```javascript
const mappa = new Map();

// Chiavi di diversi tipi
mappa.set('stringa', 'Valore con chiave stringa');
mappa.set(42, 'Valore con chiave numerica');
mappa.set(true, 'Valore con chiave booleana');

const oggetto = { id: 1 };
mappa.set(oggetto, 'Valore associato all\'oggetto');

const funzione = function() {};
mappa.set(funzione, 'Valore associato alla funzione');

// Recupero valori
console.log(mappa.get(oggetto)); // 'Valore associato all'oggetto'
console.log(mappa.get(42)); // 'Valore con chiave numerica'
```

### 2. Ordine di Inserimento Garantito

```javascript
const mappa = new Map();

// L'ordine di inserimento viene mantenuto
mappa.set('primo', 1);
mappa.set('secondo', 2);
mappa.set('terzo', 3);

// Iterazione nell'ordine di inserimento
for (const [chiave, valore] of mappa) {
  console.log(`${chiave}: ${valore}`);
}
// Output:
// primo: 1
// secondo: 2
// terzo: 3
```

### 3. Prestazioni Migliori per Operazioni Frequenti

Le `Map` sono ottimizzate per frequenti aggiunte e rimozioni di coppie chiave-valore, mentre gli oggetti sono ottimizzati per l'accesso alle proprietà.

### 4. Metodi Nativi Utili

```javascript
const mappa = new Map();

// Dimensione
mappa.set('a', 1);
mappa.set('b', 2);
console.log(mappa.size); // 2

// Verifica esistenza
console.log(mappa.has('a')); // true

// Iterazione semplificata
mappa.forEach((valore, chiave) => {
  console.log(`${chiave} => ${valore}`);
});
```

## Casi d'Uso Comuni

### 1. Cache di Dati

```javascript
const cache = new Map();

function getDatiUtente(id) {
  // Verifica se i dati sono già in cache
  if (cache.has(id)) {
    console.log('Dati recuperati dalla cache');
    return cache.get(id);
  }
  
  // Simula una chiamata API
  console.log('Recupero dati dal server...');
  const dati = { id, nome: `Utente ${id}`, ruolo: 'Utente' };
  
  // Memorizza in cache per usi futuri
  cache.set(id, dati);
  
  return dati;
}

// Prima chiamata: recupera dal server
console.log(getDatiUtente(123));

// Seconda chiamata: recupera dalla cache
console.log(getDatiUtente(123));
```

### 2. Conteggio Occorrenze

```javascript
function contaOccorrenze(array) {
  const conteggio = new Map();
  
  for (const elemento of array) {
    const count = conteggio.get(elemento) || 0;
    conteggio.set(elemento, count + 1);
  }
  
  return conteggio;
}

const frutta = ['mela', 'banana', 'mela', 'arancia', 'banana', 'mela'];
const conteggio = contaOccorrenze(frutta);

console.log(conteggio.get('mela')); // 3
console.log(conteggio.get('banana')); // 2
console.log(conteggio.get('arancia')); // 1
```

### 3. Gestione di Relazioni tra Oggetti

```javascript
const relazioni = new Map();

class Persona {
  constructor(nome) {
    this.nome = nome;
  }
}

const mario = new Persona('Mario');
const luigi = new Persona('Luigi');
const giovanni = new Persona('Giovanni');

// Definizione delle relazioni
relazioni.set(mario, { fratello: luigi, amico: giovanni });
relazioni.set(luigi, { fratello: mario, amico: giovanni });
relazioni.set(giovanni, { amici: [mario, luigi] });

// Accesso alle relazioni
console.log(relazioni.get(mario).fratello.nome); // 'Luigi'
console.log(relazioni.get(luigi).fratello.nome); // 'Mario'
console.log(relazioni.get(giovanni).amici[0].nome); // 'Mario'
```

## Conversione tra Map e Oggetti/Array

### Da Array a Map

```javascript
const array = [
  ['chiave1', 'valore1'],
  ['chiave2', 'valore2']
];

const mappa = new Map(array);
console.log(mappa.get('chiave1')); // 'valore1'
```

### Da Map ad Array

```javascript
const mappa = new Map();
mappa.set('chiave1', 'valore1');
mappa.set('chiave2', 'valore2');

// Convertire in array di coppie [chiave, valore]
const array = Array.from(mappa);
// oppure
const array2 = [...mappa];

console.log(array); // [['chiave1', 'valore1'], ['chiave2', 'valore2']]

// Solo le chiavi
const chiavi = [...mappa.keys()];

// Solo i valori
const valori = [...mappa.values()];
```

### Da Oggetto a Map

```javascript
const oggetto = {
  chiave1: 'valore1',
  chiave2: 'valore2'
};

const mappa = new Map(Object.entries(oggetto));
console.log(mappa.get('chiave1')); // 'valore1'
```

### Da Map a Oggetto

```javascript
const mappa = new Map();
mappa.set('chiave1', 'valore1');
mappa.set('chiave2', 'valore2');

const oggetto = Object.fromEntries(mappa);
console.log(oggetto); // { chiave1: 'valore1', chiave2: 'valore2' }
```

## Limitazioni di Map

- Le chiavi sono confrontate per identità (===), quindi `5` e `'5'` sono chiavi diverse
- Non c'è supporto nativo per la serializzazione (JSON.stringify non funziona direttamente con Map)
- Le chiavi oggetto non vengono garbage collected (per questo esiste WeakMap)

## Conclusione

La struttura dati `Map` offre un'alternativa potente e flessibile agli oggetti tradizionali in JavaScript, specialmente quando hai bisogno di utilizzare chiavi non di tipo stringa o quando l'ordine di inserimento è importante. Nei prossimi capitoli, esploreremo altre strutture dati moderne come `Set`, `WeakMap` e `WeakSet`.

## Navigazione

- [Torna all'indice](../README.md)
- [Prossimo: Set: Concetti e Utilizzo](./02_Set.md)