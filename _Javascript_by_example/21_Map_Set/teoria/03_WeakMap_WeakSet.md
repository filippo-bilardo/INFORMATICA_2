# WeakMap e WeakSet

## Introduzione

Le strutture dati `WeakMap` e `WeakSet` sono varianti "deboli" di `Map` e `Set` introdotte in ECMAScript 6 (ES6). La principale differenza è che mantengono riferimenti "deboli" agli oggetti utilizzati come chiavi (WeakMap) o valori (WeakSet), permettendo al garbage collector di rimuoverli quando non ci sono altri riferimenti ad essi nel programma.

## WeakMap

### Concetti Fondamentali

Un `WeakMap` è una collezione di coppie chiave-valore dove:

- Le chiavi devono essere oggetti (non sono ammessi valori primitivi)
- I riferimenti alle chiavi sono "deboli", quindi non impediscono la garbage collection
- Non è possibile iterare su un WeakMap o ottenerne la dimensione

### Creazione e Utilizzo di WeakMap

```javascript
// Creazione di un WeakMap vuoto
const weakMap = new WeakMap();

// Creazione con valori iniziali
const obj1 = {};
const obj2 = {};

const weakMapPopolata = new WeakMap([
  [obj1, 'valore1'],
  [obj2, 'valore2']
]);
```

### Metodi Disponibili

```javascript
const weakMap = new WeakMap();
const oggetto = {};

// Aggiungere una coppia chiave-valore
weakMap.set(oggetto, 'dati associati');

// Recuperare un valore
console.log(weakMap.get(oggetto)); // 'dati associati'

// Verificare l'esistenza di una chiave
console.log(weakMap.has(oggetto)); // true

// Rimuovere una coppia chiave-valore
weakMap.delete(oggetto);
console.log(weakMap.has(oggetto)); // false
```

### Limitazioni di WeakMap

- Le chiavi devono essere oggetti (non stringhe, numeri, ecc.)
- Non è possibile ottenere un elenco di tutte le chiavi o valori
- Non è possibile ottenere la dimensione (proprietà `size`)
- Non è possibile iterare su un WeakMap
- Non è possibile svuotare un WeakMap con `clear()`

## WeakSet

### Concetti Fondamentali

Un `WeakSet` è una collezione di oggetti unici dove:

- I valori devono essere oggetti (non sono ammessi valori primitivi)
- I riferimenti ai valori sono "deboli", quindi non impediscono la garbage collection
- Non è possibile iterare su un WeakSet o ottenerne la dimensione

### Creazione e Utilizzo di WeakSet

```javascript
// Creazione di un WeakSet vuoto
const weakSet = new WeakSet();

// Creazione con valori iniziali
const obj1 = {};
const obj2 = {};

const weakSetPopolato = new WeakSet([obj1, obj2]);
```

### Metodi Disponibili

```javascript
const weakSet = new WeakSet();
const oggetto = {};

// Aggiungere un valore
weakSet.add(oggetto);

// Verificare l'esistenza di un valore
console.log(weakSet.has(oggetto)); // true

// Rimuovere un valore
weakSet.delete(oggetto);
console.log(weakSet.has(oggetto)); // false
```

### Limitazioni di WeakSet

- I valori devono essere oggetti (non stringhe, numeri, ecc.)
- Non è possibile ottenere un elenco di tutti i valori
- Non è possibile ottenere la dimensione (proprietà `size`)
- Non è possibile iterare su un WeakSet
- Non è possibile svuotare un WeakSet con `clear()`

## Garbage Collection e Riferimenti Deboli

Il concetto chiave di WeakMap e WeakSet è che non impediscono la garbage collection degli oggetti utilizzati come chiavi o valori.

```javascript
// Esempio con Map
let oggetto = { nome: 'Esempio' };
const mappa = new Map();

mappa.set(oggetto, 'dati');

// Rimuoviamo il riferimento all'oggetto
oggetto = null;

// L'oggetto è ancora referenziato dalla Map e non verrà garbage collected
console.log(mappa.size); // 1

// Esempio con WeakMap
let oggetto2 = { nome: 'Esempio2' };
const weakMap = new WeakMap();

weakMap.set(oggetto2, 'dati');

// Rimuoviamo il riferimento all'oggetto
oggetto2 = null;

// L'oggetto non ha più riferimenti forti e verrà garbage collected
// Non possiamo verificarlo direttamente perché non possiamo accedere alla size
```

## Casi d'Uso

### 1. Memorizzazione di Dati Privati

```javascript
// Utilizzo di WeakMap per memorizzare dati privati
const datiPrivati = new WeakMap();

class Utente {
  constructor(nome, email) {
    this.nome = nome;
    
    // Memorizza l'email come dato privato
    datiPrivati.set(this, { email });
  }
  
  getEmail() {
    return datiPrivati.get(this).email;
  }
  
  setEmail(nuovaEmail) {
    datiPrivati.get(this).email = nuovaEmail;
  }
}

const utente = new Utente('Mario', 'mario@example.com');
console.log(utente.getEmail()); // 'mario@example.com'

// L'email non è accessibile direttamente
console.log(utente.email); // undefined
```

### 2. Memorizzazione di Metadati

```javascript
const metadati = new WeakMap();

function aggiungiMetadati(oggetto, chiave, valore) {
  if (!metadati.has(oggetto)) {
    metadati.set(oggetto, {});
  }
  
  metadati.get(oggetto)[chiave] = valore;
}

function ottieniMetadati(oggetto, chiave) {
  return metadati.has(oggetto) ? metadati.get(oggetto)[chiave] : undefined;
}

const mioOggetto = {};
aggiungiMetadati(mioOggetto, 'descrizione', 'Un oggetto di esempio');
aggiungiMetadati(mioOggetto, 'creato', new Date());

console.log(ottieniMetadati(mioOggetto, 'descrizione')); // 'Un oggetto di esempio'
```

### 3. Tracciamento di Oggetti DOM

```javascript
const elementiVisitati = new WeakSet();

function segnaVisitato(elemento) {
  elementiVisitati.add(elemento);
}

function èStatoVisitato(elemento) {
  return elementiVisitati.has(elemento);
}

// Esempio di utilizzo con elementi DOM
document.querySelectorAll('div').forEach(div => {
  div.addEventListener('click', function() {
    if (!èStatoVisitato(this)) {
      console.log('Prima visita a questo elemento!');
      segnaVisitato(this);
    } else {
      console.log('Hai già visitato questo elemento.');
    }
  });
});
```

### 4. Cache con Pulizia Automatica

```javascript
const cache = new WeakMap();

function elaboraDati(oggetto) {
  if (cache.has(oggetto)) {
    console.log('Risultato recuperato dalla cache');
    return cache.get(oggetto);
  }
  
  console.log('Calcolo del risultato...');
  const risultato = /* calcolo costoso basato sull'oggetto */;
  
  // Memorizza il risultato in cache
  cache.set(oggetto, risultato);
  
  return risultato;
}

// Quando l'oggetto non è più utilizzato, la sua voce nella cache
// verrà automaticamente rimossa dal garbage collector
```

## Confronto tra Map/Set e WeakMap/WeakSet

| Caratteristica | Map | WeakMap | Set | WeakSet |
|----------------|-----|---------|-----|--------|
| Tipi di chiavi/valori | Qualsiasi | Solo oggetti | Qualsiasi | Solo oggetti |
| Riferimenti | Forti | Deboli | Forti | Deboli |
| Iterazione | Sì | No | Sì | No |
| Proprietà `size` | Sì | No | Sì | No |
| Metodo `clear()` | Sì | No | Sì | No |
| Garbage collection | Impedita | Permessa | Impedita | Permessa |

## Quando Usare WeakMap e WeakSet

- **Usa WeakMap quando:**
  - Hai bisogno di associare dati a oggetti senza impedirne la garbage collection
  - Vuoi implementare dati privati per classi o oggetti
  - Hai bisogno di una cache che si pulisca automaticamente

- **Usa WeakSet quando:**
  - Hai bisogno di tenere traccia di oggetti senza impedirne la garbage collection
  - Vuoi marcare oggetti come "visitati" o "processati"
  - Non hai bisogno di iterare sulla collezione

## Conclusione

Le strutture dati `WeakMap` e `WeakSet` offrono un modo per associare dati a oggetti senza impedirne la garbage collection. Sebbene abbiano limitazioni significative rispetto a `Map` e `Set` (impossibilità di iterare, ottenere la dimensione, ecc.), sono strumenti potenti per casi d'uso specifici come la memorizzazione di dati privati, metadati e cache con pulizia automatica.

## Navigazione

- [Torna all'indice](../README.md)
- [Precedente: Set: Concetti e Utilizzo](./02_Set.md)
- [Prossimo: Confronto con Oggetti e Array](./04_Confronto_Strutture.md)