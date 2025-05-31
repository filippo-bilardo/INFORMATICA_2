# Introduzione agli Iteratori

## Cos'è un Iteratore?

Un iteratore in JavaScript è un oggetto che fornisce un modo standardizzato per accedere sequenzialmente agli elementi di una collezione, uno alla volta, senza esporre la struttura sottostante della collezione stessa.

In termini più tecnici, un iteratore è un oggetto che implementa il **protocollo di iterazione** attraverso un metodo `next()` che restituisce un oggetto con due proprietà:

- `value`: il valore corrente dell'iterazione
- `done`: un booleano che indica se l'iterazione è terminata

## Il Protocollo di Iterazione

JavaScript definisce due protocolli correlati:

1. **Il protocollo iterabile** (Iterable protocol): permette agli oggetti JavaScript di definire o personalizzare il proprio comportamento di iterazione.
   - Un oggetto è iterabile se implementa il metodo `Symbol.iterator`.
   - Questo metodo deve restituire un oggetto iteratore.

2. **Il protocollo iteratore** (Iterator protocol): definisce un modo standard per produrre una sequenza di valori.
   - Un oggetto è un iteratore quando implementa un metodo `next()` che restituisce un oggetto con le proprietà `value` e `done`.

## Esempio Base di Iteratore

```javascript
// Un semplice iteratore che conta da 1 a 3
const sempliceIteratore = {
  indiceCorrente: 0,
  next() {
    this.indiceCorrente += 1;
    
    if (this.indiceCorrente <= 3) {
      return { value: this.indiceCorrente, done: false };
    }
    
    return { value: undefined, done: true };
  }
};

console.log(sempliceIteratore.next()); // { value: 1, done: false }
console.log(sempliceIteratore.next()); // { value: 2, done: false }
console.log(sempliceIteratore.next()); // { value: 3, done: false }
console.log(sempliceIteratore.next()); // { value: undefined, done: true }
```

## Oggetti Iterabili Integrati

Molti oggetti in JavaScript sono nativamente iterabili:

- Array
- String
- Map
- Set
- arguments (oggetto disponibile all'interno delle funzioni)
- NodeList (risultato di metodi come `document.querySelectorAll()`)

Ecco un esempio di come funziona l'iterazione su un array:

```javascript
const array = ['a', 'b', 'c'];

// Utilizzo del ciclo for...of (funziona con qualsiasi iterabile)
for (const elemento of array) {
  console.log(elemento); // 'a', 'b', 'c'
}

// Utilizzo manuale dell'iteratore
const iteratore = array[Symbol.iterator]();

console.log(iteratore.next()); // { value: 'a', done: false }
console.log(iteratore.next()); // { value: 'b', done: false }
console.log(iteratore.next()); // { value: 'c', done: false }
console.log(iteratore.next()); // { value: undefined, done: true }
```

## Vantaggi degli Iteratori

Gli iteratori offrono diversi vantaggi:

1. **Interfaccia unificata**: forniscono un modo standard per iterare su diverse strutture dati.
2. **Lazy evaluation**: i valori vengono calcolati solo quando richiesti, consentendo di lavorare con sequenze potenzialmente infinite.
3. **Stato interno**: mantengono il loro stato interno, ricordando la posizione corrente nell'iterazione.
4. **Separazione delle responsabilità**: separano l'algoritmo di iterazione dalla struttura dati sottostante.

## Costrutti che Utilizzano gli Iterabili

In JavaScript, diversi costrutti utilizzano automaticamente gli oggetti iterabili:

- Il ciclo `for...of`
- L'operatore spread (`...`)
- La destrutturazione di array
- I costruttori di `Array`, `Map` e `Set`
- I metodi `Promise.all()`, `Promise.race()`
- L'operatore `yield*` nei generatori

```javascript
// Esempi di utilizzo degli iterabili
const str = "ciao";

// Ciclo for...of
for (const char of str) {
  console.log(char); // 'c', 'i', 'a', 'o'
}

// Operatore spread
const caratteri = [...str]; // ['c', 'i', 'a', 'o']

// Destrutturazione
const [primo, ...resto] = str; // primo = 'c', resto = ['i', 'a', 'o']
```

## Conclusione

Gli iteratori sono un potente meccanismo che standardizza il modo in cui iteriamo sulle collezioni in JavaScript. Comprendere il protocollo di iterazione è fondamentale per sfruttare appieno le funzionalità moderne di JavaScript e per creare codice più elegante ed efficiente.

Nella prossima sezione, vedremo come creare iteratori personalizzati per le nostre strutture dati.

## Navigazione

- [Indice dell'Esercitazione](../README.md)
- Successivo: [Creazione di Iteratori Personalizzati](./02_Iteratori_Personalizzati.md)