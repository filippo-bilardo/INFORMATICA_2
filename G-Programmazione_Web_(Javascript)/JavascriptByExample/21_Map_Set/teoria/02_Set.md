# Set: Concetti e Utilizzo

## Introduzione a Set

La struttura dati `Set` è stata introdotta in JavaScript con ECMAScript 6 (ES6) per fornire una collezione di valori unici. A differenza degli array, un `Set` garantisce che ogni valore possa apparire una sola volta, rendendo questa struttura ideale per eliminare duplicati e gestire insiemi di dati unici.

## Creazione di un Set

```javascript
// Creazione di un Set vuoto
const insieme = new Set();

// Creazione di un Set con valori iniziali
const insiemePopolato = new Set([1, 2, 3, 4, 5]);

// I duplicati vengono automaticamente ignorati
const insiemeConDuplicati = new Set([1, 1, 2, 2, 3, 3]);
console.log([...insiemeConDuplicati]); // [1, 2, 3]
```

## Metodi Principali

### Aggiungere e Verificare Elementi

```javascript
// Aggiungere elementi
insieme.add('mela');
insieme.add('banana');
insieme.add('mela'); // Ignorato perché 'mela' è già presente

// Verificare l'esistenza di un elemento
console.log(insieme.has('mela')); // true
console.log(insieme.has('arancia')); // false
```

### Rimuovere Elementi

```javascript
// Rimuovere un elemento specifico
insieme.delete('banana');

// Rimuovere tutti gli elementi
insieme.clear();
```

### Dimensione e Iterazione

```javascript
// Ottenere il numero di elementi
console.log(insieme.size);

// Iterare su tutti gli elementi
insieme.forEach(valore => {
  console.log(valore);
});

// Iterare con for...of
for (const valore of insieme) {
  console.log(valore);
}

// Iterare su tutti i valori (equivalente a for...of)
for (const valore of insieme.values()) {
  console.log(valore);
}

// Iterare su tutte le coppie [valore, valore]
// (per compatibilità con Map)
for (const [valore1, valore2] of insieme.entries()) {
  console.log(valore1, valore2); // Sono identici
}
```

## Vantaggi di Set rispetto agli Array

### 1. Valori Unici Garantiti

```javascript
// Con array, dobbiamo filtrare manualmente i duplicati
const arrayConDuplicati = [1, 2, 2, 3, 4, 4, 5];
const arraySenzaDuplicati = arrayConDuplicati.filter(
  (valore, indice, self) => self.indexOf(valore) === indice
);

// Con Set, è automatico
const setSenzaDuplicati = new Set(arrayConDuplicati);
const nuovoArray = [...setSenzaDuplicati];

console.log(nuovoArray); // [1, 2, 3, 4, 5]
```

### 2. Ricerca Più Efficiente

```javascript
const array = [1, 2, 3, 4, 5];
const set = new Set(array);

// Verifica esistenza in un array: O(n)
console.log(array.includes(3)); // true

// Verifica esistenza in un Set: O(1)
console.log(set.has(3)); // true
```

### 3. Eliminazione Più Efficiente

```javascript
const array = [1, 2, 3, 4, 5];
const set = new Set(array);

// Rimozione da un array
const indice = array.indexOf(3);
if (indice !== -1) {
  array.splice(indice, 1);
}

// Rimozione da un Set
set.delete(3);
```

## Operazioni su Insiemi

JavaScript non fornisce metodi nativi per operazioni su insiemi come unione, intersezione e differenza, ma possiamo implementarli facilmente:

### Unione di Set

```javascript
function unione(setA, setB) {
  return new Set([...setA, ...setB]);
}

const setA = new Set([1, 2, 3]);
const setB = new Set([3, 4, 5]);

const unioneAB = unione(setA, setB);
console.log([...unioneAB]); // [1, 2, 3, 4, 5]
```

### Intersezione di Set

```javascript
function intersezione(setA, setB) {
  return new Set([...setA].filter(elemento => setB.has(elemento)));
}

const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);

const intersezioneAB = intersezione(setA, setB);
console.log([...intersezioneAB]); // [2, 3]
```

### Differenza di Set

```javascript
function differenza(setA, setB) {
  return new Set([...setA].filter(elemento => !setB.has(elemento)));
}

const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);

const differenzaAB = differenza(setA, setB);
console.log([...differenzaAB]); // [1]
```

### Differenza Simmetrica

```javascript
function differenzaSimmetrica(setA, setB) {
  return new Set(
    [...setA].filter(elemento => !setB.has(elemento)).concat(
      [...setB].filter(elemento => !setA.has(elemento))
    )
  );
}

const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);

const diffSimmetricaAB = differenzaSimmetrica(setA, setB);
console.log([...diffSimmetricaAB]); // [1, 4]
```

### Sottoinsieme

```javascript
function èSottoinsieme(setA, setB) {
  for (const elemento of setA) {
    if (!setB.has(elemento)) {
      return false;
    }
  }
  return true;
}

const setA = new Set([1, 2]);
const setB = new Set([1, 2, 3, 4]);

console.log(èSottoinsieme(setA, setB)); // true
console.log(èSottoinsieme(setB, setA)); // false
```

## Casi d'Uso Comuni

### 1. Eliminazione di Duplicati

```javascript
function rimuoviDuplicati(array) {
  return [...new Set(array)];
}

const arrayConDuplicati = [1, 2, 2, 3, 4, 4, 5];
console.log(rimuoviDuplicati(arrayConDuplicati)); // [1, 2, 3, 4, 5]
```

### 2. Conteggio di Valori Unici

```javascript
function contaValoriUnici(array) {
  return new Set(array).size;
}

const array = [1, 2, 2, 3, 3, 3, 4, 5, 5];
console.log(contaValoriUnici(array)); // 5
```

### 3. Filtraggio di Valori Unici

```javascript
function filtraUnici(array) {
  const conteggio = {};
  
  // Conta le occorrenze
  for (const elemento of array) {
    conteggio[elemento] = (conteggio[elemento] || 0) + 1;
  }
  
  // Filtra solo gli elementi che appaiono una volta
  return array.filter(elemento => conteggio[elemento] === 1);
}

const array = [1, 2, 2, 3, 3, 4, 5, 5, 6];
console.log(filtraUnici(array)); // [1, 4, 6]
```

### 4. Verifica di Caratteri Unici

```javascript
function haCaratteriUnici(stringa) {
  return new Set(stringa).size === stringa.length;
}

console.log(haCaratteriUnici('abcde')); // true
console.log(haCaratteriUnici('abcda')); // false
```

## Conversione tra Set e Array

### Da Array a Set

```javascript
const array = [1, 2, 3, 4, 5];
const set = new Set(array);
```

### Da Set ad Array

```javascript
const set = new Set([1, 2, 3, 4, 5]);

// Metodo 1: Spread operator
const array1 = [...set];

// Metodo 2: Array.from
const array2 = Array.from(set);
```

## Limitazioni di Set

- Non è possibile accedere direttamente agli elementi per indice (come in un array)
- Non esiste un metodo nativo per ottenere un elemento in una posizione specifica
- Non ci sono metodi nativi per operazioni su insiemi (unione, intersezione, ecc.)
- I valori sono confrontati per identità (===), quindi `5` e `'5'` sono valori diversi

## Conclusione

La struttura dati `Set` offre un modo efficiente per gestire collezioni di valori unici in JavaScript. È particolarmente utile per eliminare duplicati, verificare l'appartenenza di elementi e implementare operazioni su insiemi. Nel prossimo capitolo, esploreremo le versioni "deboli" di queste strutture dati: `WeakMap` e `WeakSet`.

## Navigazione

- [Torna all'indice](../README.md)
- [Precedente: Map: Concetti e Utilizzo](./01_Map.md)
- [Prossimo: WeakMap e WeakSet](./03_WeakMap_WeakSet.md)