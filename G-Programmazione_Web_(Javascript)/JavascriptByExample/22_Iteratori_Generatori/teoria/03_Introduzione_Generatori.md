# Introduzione ai Generatori

## Cos'è un Generatore?

Un generatore è una funzione speciale in JavaScript che può essere interrotta e ripresa, consentendo di generare una sequenza di valori nel tempo, invece di restituire un singolo valore e terminare come le funzioni tradizionali.

I generatori rappresentano un modo elegante e potente per creare iteratori. Mentre gli iteratori richiedono la creazione manuale di un oggetto con un metodo `next()`, i generatori semplificano notevolmente questo processo utilizzando una sintassi più intuitiva.

## Sintassi della Funzione Generatore

Una funzione generatore si dichiara utilizzando l'asterisco (`*`) dopo la parola chiave `function` o prima del nome della funzione:

```javascript
// Sintassi 1
function* nomeGeneratore() {
  // corpo del generatore
}

// Sintassi 2
function *nomeGeneratore() {
  // corpo del generatore
}

// Come metodo in un oggetto
const oggetto = {
  *nomeGeneratore() {
    // corpo del generatore
  }
};

// Come metodo in una classe
class MiaClasse {
  *nomeGeneratore() {
    // corpo del generatore
  }
}
```

## L'Operatore yield

L'operatore `yield` è il cuore dei generatori. Esso consente di:

1. Produrre un valore da restituire
2. Sospendere l'esecuzione della funzione generatore
3. Salvare lo stato corrente della funzione

Quando un generatore viene ripreso (chiamando `next()`), l'esecuzione continua dalla riga successiva all'ultimo `yield` eseguito.

```javascript
function* contatoreGeneratore() {
  yield 1;
  yield 2;
  yield 3;
}

const generatore = contatoreGeneratore();

console.log(generatore.next()); // { value: 1, done: false }
console.log(generatore.next()); // { value: 2, done: false }
console.log(generatore.next()); // { value: 3, done: false }
console.log(generatore.next()); // { value: undefined, done: true }
```

## Generatori come Iteratori

I generatori implementano automaticamente sia il protocollo iterabile che il protocollo iteratore. Ciò significa che possiamo utilizzarli in tutti i costrutti che accettano iterabili:

```javascript
function* numeriPari(limite) {
  for (let i = 0; i <= limite; i += 2) {
    yield i;
  }
}

// Utilizzo con for...of
for (const num of numeriPari(10)) {
  console.log(num); // 0, 2, 4, 6, 8, 10
}

// Utilizzo con operatore spread
const array = [...numeriPari(6)]; // [0, 2, 4, 6]

// Utilizzo con destrutturazione
const [primo, secondo, ...resto] = numeriPari(10);
console.log(primo);  // 0
console.log(secondo); // 2
console.log(resto);   // [4, 6, 8, 10]
```

## Generatori con Cicli

I generatori sono particolarmente utili quando combinati con cicli, poiché possono produrre sequenze di valori in modo efficiente:

```javascript
function* iteraArray(array) {
  for (let i = 0; i < array.length; i++) {
    yield array[i];
  }
}

const lettere = iteraArray(['a', 'b', 'c']);

console.log(lettere.next().value); // 'a'
console.log(lettere.next().value); // 'b'
console.log(lettere.next().value); // 'c'
console.log(lettere.next().value); // undefined
```

## Generatori Infiniti

Come gli iteratori, i generatori possono rappresentare sequenze potenzialmente infinite:

```javascript
function* sequenzaInfinita() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const numeri = sequenzaInfinita();

console.log(numeri.next().value); // 0
console.log(numeri.next().value); // 1
console.log(numeri.next().value); // 2
// Può continuare all'infinito...
```

## Passaggio di Valori ai Generatori

Una caratteristica potente dei generatori è la possibilità di passare valori al generatore attraverso il metodo `next()`:

```javascript
function* generatoreBidirezionale() {
  const a = yield 'Prima domanda?';
  console.log('Hai risposto:', a);
  
  const b = yield 'Seconda domanda?';
  console.log('Hai risposto:', b);
  
  return 'Fine del generatore';
}

const conversazione = generatoreBidirezionale();

// Il primo next() avvia il generatore fino al primo yield
console.log(conversazione.next().value); // 'Prima domanda?'

// Il valore passato a next() diventa il valore restituito dall'espressione yield
console.log(conversazione.next('42').value); // Stampa 'Hai risposto: 42' e restituisce 'Seconda domanda?'

// Passiamo un altro valore e raggiungiamo la fine del generatore
console.log(conversazione.next('Ciao').value); // Stampa 'Hai risposto: Ciao' e restituisce 'Fine del generatore'
```

È importante notare che il primo `next()` è speciale: qualsiasi valore passato ad esso viene ignorato. Questo perché non c'è ancora un'espressione `yield` in attesa di ricevere un valore.

## Vantaggi dei Generatori rispetto agli Iteratori Manuali

I generatori offrono diversi vantaggi rispetto all'implementazione manuale degli iteratori:

1. **Sintassi più semplice**: non è necessario creare manualmente oggetti iteratori con metodi `next()`.

2. **Stato automatico**: lo stato viene mantenuto automaticamente tra le chiamate a `next()`.

3. **Leggibilità**: il codice è più lineare e segue un flusso naturale.

4. **Composizione**: i generatori possono essere facilmente composti e combinati.

5. **Gestione degli errori**: supportano la propagazione degli errori con `try/catch`.

## Esempio Pratico: Generazione di Numeri di Fibonacci

```javascript
function* fibonacci() {
  let [prev, curr] = [0, 1];
  
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const fib = fibonacci();

// Ottieni i primi 10 numeri di Fibonacci
for (let i = 0; i < 10; i++) {
  console.log(fib.next().value);
}
// Output: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55
```

## Conclusione

I generatori rappresentano un potente strumento nel toolkit di JavaScript, offrendo un modo elegante per creare iteratori e gestire sequenze di valori. La loro capacità di sospendere e riprendere l'esecuzione li rende particolarmente utili per scenari come l'elaborazione di grandi set di dati, la generazione di sequenze e la gestione di operazioni asincrone.

Nella prossima sezione, esploreremo funzionalità più avanzate dei generatori, come la delega con `yield*` e la gestione degli errori.

## Navigazione

- [Indice dell'Esercitazione](../README.md)
- Precedente: [Creazione di Iteratori Personalizzati](./02_Iteratori_Personalizzati.md)
- Successivo: [Generatori Avanzati](./04_Generatori_Avanzati.md)