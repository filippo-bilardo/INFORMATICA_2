# Introduzione agli Array in JavaScript

Gli array sono strutture dati fondamentali in JavaScript che permettono di memorizzare e organizzare collezioni ordinate di elementi. Sono estremamente versatili e rappresentano uno strumento essenziale per qualsiasi sviluppatore JavaScript.

## Cos'è un Array?

Un array è una struttura dati che contiene una collezione ordinata di elementi. In JavaScript, a differenza di altri linguaggi di programmazione, gli array possono contenere elementi di diversi tipi di dati (numeri, stringhe, oggetti, altri array, ecc.) all'interno dello stesso array.

## Creazione di un Array

In JavaScript, esistono diversi modi per creare un array:

### 1. Notazione Letterale (Array Literal)

Il modo più comune per creare un array è utilizzare la notazione letterale con le parentesi quadre `[]`:

```javascript
let numeri = [1, 2, 3, 4, 5];
let frutta = ["mela", "banana", "arancia"];
let misto = [1, "due", true, {nome: "Mario"}, [5, 6]];
```

### 2. Costruttore Array

È possibile utilizzare il costruttore `Array()` per creare un array:

```javascript
let numeri = new Array(1, 2, 3, 4, 5);
let frutta = new Array("mela", "banana", "arancia");
```

Attenzione: se si passa un solo argomento numerico al costruttore `Array()`, questo crea un array vuoto con la lunghezza specificata:

```javascript
let arr = new Array(5); // Crea un array vuoto con lunghezza 5
console.log(arr.length); // Output: 5
console.log(arr); // Output: [empty × 5]
```

### 3. Array.of() e Array.from()

I metodi `Array.of()` e `Array.from()` sono stati introdotti in ES6 per facilitare la creazione di array:

```javascript
// Array.of() crea un array con gli elementi specificati
let numeri = Array.of(1, 2, 3, 4, 5);

// Array.from() crea un array da un oggetto iterabile o array-like
let caratteri = Array.from("ciao"); // ['c', 'i', 'a', 'o']
let numeriDoppi = Array.from([1, 2, 3], x => x * 2); // [2, 4, 6]
```

## Accesso agli Elementi di un Array

Gli elementi di un array sono indicizzati a partire da 0. Si può accedere a un elemento specifico utilizzando la notazione con parentesi quadre:

```javascript
let frutta = ["mela", "banana", "arancia", "kiwi"];

console.log(frutta[0]); // Output: "mela"
console.log(frutta[2]); // Output: "arancia"
```

Si può anche accedere agli elementi partendo dalla fine dell'array utilizzando indici negativi (con il metodo `at()` introdotto in ES2022):

```javascript
console.log(frutta.at(-1)); // Output: "kiwi" (ultimo elemento)
console.log(frutta.at(-2)); // Output: "arancia" (penultimo elemento)
```

## Proprietà e Caratteristiche degli Array

### Lunghezza (length)

La proprietà `length` restituisce il numero di elementi in un array:

```javascript
let frutta = ["mela", "banana", "arancia"];
console.log(frutta.length); // Output: 3
```

La proprietà `length` è scrivibile, quindi può essere modificata per troncare o estendere un array:

```javascript
frutta.length = 2; // Tronca l'array
console.log(frutta); // Output: ["mela", "banana"]

frutta.length = 4; // Estende l'array con elementi vuoti
console.log(frutta); // Output: ["mela", "banana", empty × 2]
```

### Array Sparsi

Gli array in JavaScript possono essere "sparsi", ovvero possono avere "buchi" (elementi non definiti):

```javascript
let sparso = [1, , 3];
console.log(sparso); // Output: [1, empty, 3]
console.log(sparso.length); // Output: 3
```

### Array Multidimensionali

In JavaScript, gli array multidimensionali sono implementati come array di array:

```javascript
let matrice = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log(matrice[1][2]); // Output: 6 (elemento nella riga 1, colonna 2)
```

## Modifica degli Array

Gli array in JavaScript sono mutabili, il che significa che possono essere modificati dopo la creazione.

### Aggiunta di Elementi

```javascript
let frutta = ["mela", "banana"];

// Aggiunta alla fine
frutta.push("arancia");
console.log(frutta); // Output: ["mela", "banana", "arancia"]

// Aggiunta all'inizio
frutta.unshift("kiwi");
console.log(frutta); // Output: ["kiwi", "mela", "banana", "arancia"]

// Aggiunta in una posizione specifica
frutta[4] = "uva";
console.log(frutta); // Output: ["kiwi", "mela", "banana", "arancia", "uva"]
```

### Rimozione di Elementi

```javascript
let numeri = [1, 2, 3, 4, 5];

// Rimozione dall'ultimo
let ultimo = numeri.pop();
console.log(numeri); // Output: [1, 2, 3, 4]
console.log(ultimo); // Output: 5

// Rimozione dal primo
let primo = numeri.shift();
console.log(numeri); // Output: [2, 3, 4]
console.log(primo); // Output: 1

// Rimozione di elementi specifici
delete numeri[1]; // Crea un "buco" nell'array
console.log(numeri); // Output: [2, empty, 4]
```

### Sostituzione di Elementi

```javascript
let frutta = ["mela", "banana", "arancia"];
frutta[1] = "kiwi";
console.log(frutta); // Output: ["mela", "kiwi", "arancia"]
```

## Array vs Oggetti

Gli array in JavaScript sono un tipo speciale di oggetto. La principale differenza è che gli array utilizzano indici numerici, mentre gli oggetti utilizzano chiavi stringa:

```javascript
// Array
let arr = ["mela", "banana"];
console.log(arr[0]); // Output: "mela"

// Oggetto
let obj = {0: "mela", 1: "banana"};
console.log(obj[0]); // Output: "mela"
```

Tuttavia, gli array hanno comportamenti speciali e metodi dedicati che li rendono più adatti per gestire collezioni ordinate di dati.

## Controllo se una Variabile è un Array

Per verificare se una variabile è un array, si può utilizzare il metodo `Array.isArray()`:

```javascript
console.log(Array.isArray([1, 2, 3])); // Output: true
console.log(Array.isArray({0: 1, 1: 2})); // Output: false
```

## Best Practices

1. **Preferire la notazione letterale**: Usa `[]` invece di `new Array()` per creare array.
2. **Evitare array sparsi**: Gli array con "buchi" possono causare confusione e problemi di prestazioni.
3. **Attenzione alla coerenza dei tipi**: Anche se JavaScript permette array con elementi di tipi diversi, è spesso più chiaro e gestibile mantenere lo stesso tipo di dati in un array.
4. **Utilizzare i metodi degli array**: JavaScript offre numerosi metodi integrati per manipolare gli array in modo efficiente.
5. **Considerare l'immutabilità**: In molti casi, è preferibile creare nuovi array invece di modificare quelli esistenti, specialmente in applicazioni complesse.

## Conclusione

Gli array sono uno strumento potente e versatile in JavaScript. Comprendere come crearli, accedervi e modificarli è fondamentale per qualsiasi sviluppatore JavaScript. Nei prossimi capitoli, esploreremo i numerosi metodi che JavaScript offre per manipolare e lavorare con gli array in modo efficiente.

[Torna all'indice](../README.md#contenuti-teorici) | [Vai al successivo: Metodi di Base degli Array](./02_Metodi_Base.md)