# Funzioni Avanzate in JavaScript

In questa sezione esploreremo concetti avanzati relativi alle funzioni in JavaScript, che permettono di sfruttare appieno la potenza e la flessibilità di questo linguaggio di programmazione.

## Funzioni Ricorsive

Le funzioni ricorsive sono funzioni che chiamano se stesse durante la loro esecuzione. Sono particolarmente utili per risolvere problemi che possono essere suddivisi in sottoproblemi simili.

### Esempio: Calcolo del Fattoriale

```javascript
function fattoriale(n) {
  // Caso base
  if (n <= 1) {
    return 1;
  }
  // Chiamata ricorsiva
  return n * fattoriale(n - 1);
}

console.log(fattoriale(5)); // Output: 120 (5 * 4 * 3 * 2 * 1)
```

### Esempio: Sequenza di Fibonacci

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6)); // Output: 8 (sequenza: 0, 1, 1, 2, 3, 5, 8)
```

### Ottimizzazione: Memoizzazione

La ricorsione può diventare inefficiente per calcoli ripetuti. La memoizzazione è una tecnica che memorizza i risultati di chiamate di funzione costose:

```javascript
function fibonacciMemoizzato() {
  const memo = {};
  
  function fib(n) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fib(n - 1) + fib(n - 2);
    return memo[n];
  }
  
  return fib;
}

const fibonacci = fibonacciMemoizzato();
console.log(fibonacci(50)); // Calcolo rapido anche per numeri grandi
```

## Funzioni di Ordine Superiore

Le funzioni di ordine superiore sono funzioni che accettano altre funzioni come argomenti o restituiscono funzioni come risultato.

### Funzioni che Accettano Funzioni

```javascript
function eseguiOperazione(a, b, operazione) {
  return operazione(a, b);
}

const somma = (a, b) => a + b;
const sottrazione = (a, b) => a - b;
const moltiplicazione = (a, b) => a * b;

console.log(eseguiOperazione(5, 3, somma)); // Output: 8
console.log(eseguiOperazione(5, 3, sottrazione)); // Output: 2
console.log(eseguiOperazione(5, 3, moltiplicazione)); // Output: 15
```

### Funzioni che Restituiscono Funzioni

```javascript
function creaIncrementatore(incremento) {
  return function(numero) {
    return numero + incremento;
  };
}

const incrementaDi5 = creaIncrementatore(5);
const incrementaDi10 = creaIncrementatore(10);

console.log(incrementaDi5(3)); // Output: 8
console.log(incrementaDi10(3)); // Output: 13
```

## Currying

Il currying è una tecnica che trasforma una funzione con più argomenti in una sequenza di funzioni, ciascuna con un singolo argomento.

```javascript
// Funzione normale
function somma(a, b, c) {
  return a + b + c;
}

// Versione curried
function sommaCurried(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

// Utilizzo
console.log(somma(1, 2, 3)); // Output: 6
console.log(sommaCurried(1)(2)(3)); // Output: 6

// Versione con arrow function
const sommaCurriedArrow = a => b => c => a + b + c;
console.log(sommaCurriedArrow(1)(2)(3)); // Output: 6
```

### Vantaggi del Currying

1. **Riutilizzo del codice**: Permette di creare funzioni specializzate a partire da funzioni più generiche.
2. **Composizione di funzioni**: Facilita la composizione di funzioni complesse a partire da funzioni più semplici.
3. **Applicazione parziale**: Consente di applicare solo alcuni argomenti e ottenere una nuova funzione.

```javascript
const sommaCon10 = sommaCurried(10);
console.log(sommaCon10(5)(3)); // Output: 18
```

## Composizione di Funzioni

La composizione di funzioni permette di combinare più funzioni per crearne una nuova.

```javascript
function componi(...funzioni) {
  return function(x) {
    return funzioni.reduceRight((valore, funzione) => funzione(valore), x);
  };
}

const doppio = x => x * 2;
const incrementa = x => x + 1;
const quadrato = x => x * x;

const elabora = componi(quadrato, incrementa, doppio);
// Equivalente a: quadrato(incrementa(doppio(5)))

console.log(elabora(5)); // Output: 121 ((5*2+1)^2)
```

## Funzioni Pure

Una funzione pura è una funzione che:
1. Dato lo stesso input, restituisce sempre lo stesso output.
2. Non ha effetti collaterali (non modifica variabili esterne, non effettua I/O, ecc.).

```javascript
// Funzione pura
function somma(a, b) {
  return a + b;
}

// Funzione impura (dipende da stato esterno)
let totale = 0;
function aggiungiAlTotale(valore) {
  totale += valore; // Modifica stato esterno
  return totale;
}
```

### Vantaggi delle Funzioni Pure

1. **Prevedibilità**: Comportamento deterministico e facile da testare.
2. **Manutenibilità**: Più facili da comprendere e modificare.
3. **Parallelizzazione**: Possono essere eseguite in parallelo senza rischi di race condition.
4. **Memorizzazione**: I risultati possono essere memorizzati (cached) per input identici.

## Funzioni Generatrici

Introdotte in ES6, le funzioni generatrici possono essere interrotte e riprese, producendo una sequenza di valori.

```javascript
function* generatoreNumeri() {
  yield 1;
  yield 2;
  yield 3;
}

const generatore = generatoreNumeri();
console.log(generatore.next().value); // Output: 1
console.log(generatore.next().value); // Output: 2
console.log(generatore.next().value); // Output: 3
console.log(generatore.next().value); // Output: undefined
```

### Generatori Infiniti

```javascript
function* sequenzaInfinita() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const sequenza = sequenzaInfinita();
console.log(sequenza.next().value); // Output: 0
console.log(sequenza.next().value); // Output: 1
// ...
```

### Delega di Generatori

```javascript
function* generatoreA() {
  yield 'A1';
  yield 'A2';
}

function* generatoreB() {
  yield 'B1';
  yield* generatoreA(); // Delega a generatoreA
  yield 'B2';
}

const gen = generatoreB();
console.log([...gen]); // Output: ['B1', 'A1', 'A2', 'B2']
```

## Funzioni Asincrone

Le funzioni asincrone (introdotte in ES2017) semplificano la gestione di operazioni asincrone utilizzando la sintassi `async/await`.

```javascript
async function recuperaDati() {
  try {
    const risposta = await fetch('https://api.example.com/data');
    const dati = await risposta.json();
    return dati;
  } catch (errore) {
    console.error('Errore:', errore);
  }
}

// Utilizzo
recuperaDati().then(dati => {
  console.log('Dati ricevuti:', dati);
});
```

### Gestione di Più Operazioni Asincrone

```javascript
async function recuperaMultipliDati() {
  try {
    // Esecuzione parallela
    const [dati1, dati2] = await Promise.all([
      fetch('https://api.example.com/data1').then(r => r.json()),
      fetch('https://api.example.com/data2').then(r => r.json())
    ]);
    
    return { dati1, dati2 };
  } catch (errore) {
    console.error('Errore:', errore);
  }
}
```

## Best Practices

1. **Funzioni Piccole e Focalizzate**: Ogni funzione dovrebbe fare una cosa sola e farla bene.
2. **Nomi Descrittivi**: Usa nomi che descrivono chiaramente lo scopo della funzione.
3. **Immutabilità**: Preferisci funzioni pure che non modificano lo stato esterno.
4. **Gestione degli Errori**: Implementa una robusta gestione degli errori nelle tue funzioni.
5. **Documentazione**: Documenta chiaramente il comportamento atteso, i parametri e i valori di ritorno.
6. **Testing**: Scrivi test unitari per verificare il comportamento delle tue funzioni.

## Conclusione

Le funzioni avanzate in JavaScript offrono potenti strumenti per scrivere codice più elegante, modulare e manutenibile. Padroneggiare questi concetti ti permetterà di sfruttare appieno la natura funzionale di JavaScript e di affrontare problemi complessi con soluzioni eleganti.

[Torna all'indice](../README.md#contenuti-teorici) | [Vai al precedente: Funzioni Freccia](./04_Funzioni_Freccia.md)