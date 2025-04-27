# Generatori Avanzati

## Passaggio di Valori ai Generatori

Come abbiamo visto nella sezione precedente, i generatori possono ricevere valori attraverso il metodo `next()`. Questa caratteristica permette una comunicazione bidirezionale tra il generatore e il codice che lo utilizza.

```javascript
function* generatoreInterattivo() {
  const x = yield 'Inserisci il primo numero';
  const y = yield 'Inserisci il secondo numero';
  return x * y; // Restituisce il prodotto dei due numeri
}

const gen = generatoreInterattivo();

console.log(gen.next().value);      // 'Inserisci il primo numero'
console.log(gen.next(10).value);    // 'Inserisci il secondo numero' (e memorizza 10 come x)
console.log(gen.next(5).value);     // 50 (il prodotto di 10 e 5)
```

Questo meccanismo è particolarmente utile per implementare macchine a stati, parser o sistemi di dialogo interattivi.

## Delega con yield*

L'operatore `yield*` consente di delegare a un altro generatore o iterabile. Questo permette di comporre generatori e riutilizzare la logica di generazione.

```javascript
function* generatoreA() {
  yield 1;
  yield 2;
}

function* generatoreB() {
  yield 3;
  yield 4;
}

function* generatoreCombinato() {
  yield* generatoreA(); // Delega al generatoreA
  yield* generatoreB(); // Delega al generatoreB
  yield 5;              // Yield diretto
}

const gen = generatoreCombinato();

console.log([...gen]); // [1, 2, 3, 4, 5]
```

L'operatore `yield*` può essere utilizzato con qualsiasi oggetto iterabile, non solo con generatori:

```javascript
function* generatoreConArray() {
  yield* [1, 2, 3];     // Delega a un array
  yield* "ciao";        // Delega a una stringa
  yield* new Set([4, 5]); // Delega a un Set
}

const gen = generatoreConArray();

console.log([...gen]); // [1, 2, 3, 'c', 'i', 'a', 'o', 4, 5]
```

## Gestione degli Errori nei Generatori

I generatori supportano la gestione degli errori attraverso il metodo `throw()` e i blocchi `try/catch`.

### Il Metodo throw()

Il metodo `throw()` permette di iniettare un'eccezione all'interno del generatore, che può essere catturata con un blocco `try/catch` all'interno del generatore stesso:

```javascript
function* generatoreConErrore() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } catch (e) {
    console.log('Errore catturato:', e);
    yield 'Errore gestito';
  }
  
  yield 4; // L'esecuzione continua dopo il catch
}

const gen = generatoreConErrore();

console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.throw('Errore personalizzato').value); // Stampa 'Errore catturato: Errore personalizzato' e restituisce 'Errore gestito'
console.log(gen.next().value); // 4
```

### Propagazione degli Errori

Se un generatore non gestisce un'eccezione lanciata con `throw()`, l'eccezione viene propagata al chiamante:

```javascript
function* generatoreSenzaGestioneErrori() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generatoreSenzaGestioneErrori();

console.log(gen.next().value); // 1

try {
  gen.throw(new Error('Errore non gestito'));
} catch (e) {
  console.log('Errore catturato dal chiamante:', e.message);
}
// Stampa: 'Errore catturato dal chiamante: Errore non gestito'
```

## Il Metodo return()

Il metodo `return()` permette di terminare prematuramente un generatore, restituendo un valore finale:

```javascript
function* generatore() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generatore();

console.log(gen.next().value);     // 1
console.log(gen.return(42).value);  // 42
console.log(gen.next().value);     // undefined (il generatore è già terminato)
```

Questo è utile per liberare risorse o terminare cicli di elaborazione quando non sono più necessari.

## Generatori Ricorsivi

I generatori possono essere utilizzati in modo ricorsivo, il che è particolarmente utile per attraversare strutture dati annidate come alberi:

```javascript
class Nodo {
  constructor(valore, figli = []) {
    this.valore = valore;
    this.figli = figli;
  }
}

// Attraversamento in profondità (DFS) con generatori
function* attraversaAlbero(nodo) {
  yield nodo.valore;
  
  for (const figlio of nodo.figli) {
    yield* attraversaAlbero(figlio); // Delega ricorsiva
  }
}

// Creazione di un albero di esempio
const albero = new Nodo('A', [
  new Nodo('B', [
    new Nodo('D'),
    new Nodo('E')
  ]),
  new Nodo('C', [
    new Nodo('F')
  ])
]);

// Attraversamento dell'albero
for (const valore of attraversaAlbero(albero)) {
  console.log(valore); // 'A', 'B', 'D', 'E', 'C', 'F'
}
```

## Generatori e Oggetti

I generatori possono essere utilizzati come metodi all'interno di oggetti e classi:

```javascript
class RangeIterabile {
  constructor(inizio, fine) {
    this.inizio = inizio;
    this.fine = fine;
  }
  
  // Metodo generatore come implementazione di Symbol.iterator
  *[Symbol.iterator]() {
    for (let i = this.inizio; i <= this.fine; i++) {
      yield i;
    }
  }
  
  // Altri metodi generatori
  *pari() {
    for (let i = this.inizio; i <= this.fine; i++) {
      if (i % 2 === 0) yield i;
    }
  }
  
  *dispari() {
    for (let i = this.inizio; i <= this.fine; i++) {
      if (i % 2 !== 0) yield i;
    }
  }
}

const range = new RangeIterabile(1, 10);

console.log([...range]);        // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log([...range.pari()]);  // [2, 4, 6, 8, 10]
console.log([...range.dispari()]); // [1, 3, 5, 7, 9]
```

## Generatori e Lazy Evaluation

Una delle caratteristiche più potenti dei generatori è la valutazione pigra (lazy evaluation). I valori vengono calcolati solo quando richiesti, il che può portare a significativi miglioramenti delle prestazioni quando si lavora con grandi set di dati o calcoli costosi.

```javascript
// Funzione che verifica se un numero è primo (costosa per numeri grandi)
function isPrimo(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  
  return true;
}

// Generatore di numeri primi
function* generaPrimi() {
  let num = 2;
  
  while (true) {
    if (isPrimo(num)) yield num;
    num++;
  }
}

// Ottieni i primi 10 numeri primi
const primi = generaPrimi();
const primiDieci = [];

for (let i = 0; i < 10; i++) {
  primiDieci.push(primi.next().value);
}

console.log(primiDieci); // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

In questo esempio, i numeri primi vengono calcolati uno alla volta, solo quando richiesti, invece di generare in anticipo un grande array di numeri primi.

## Conclusione

I generatori avanzati offrono potenti strumenti per gestire flussi di dati complessi, implementare pattern di comunicazione bidirezionale e lavorare con strutture dati annidate. La loro capacità di sospendere e riprendere l'esecuzione, combinata con funzionalità come `yield*`, `throw()` e `return()`, li rende estremamente versatili per una vasta gamma di applicazioni.

Nella prossima sezione, esploreremo casi d'uso pratici di iteratori e generatori, concentrandoci su come possono essere applicati per risolvere problemi reali.

## Navigazione

- [Indice dell'Esercitazione](../README.md)
- Precedente: [Introduzione ai Generatori](./03_Introduzione_Generatori.md)
- Successivo: [Casi d'Uso Pratici](./05_Casi_Uso_Pratici.md)