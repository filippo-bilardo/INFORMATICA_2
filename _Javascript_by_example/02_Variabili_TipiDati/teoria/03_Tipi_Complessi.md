# Tipi di Dati Complessi in JavaScript

Oltre ai tipi primitivi, JavaScript ha tipi di dati complessi (o di riferimento) che possono contenere collezioni di valori e funzionalità più complesse. A differenza dei tipi primitivi, i tipi complessi sono passati per riferimento, non per valore.

## Object

Gli oggetti sono collezioni di coppie chiave-valore e sono la base di JavaScript. Quasi tutto in JavaScript è un oggetto o può comportarsi come tale.

```javascript
// Creazione di un oggetto con la notazione letterale
let persona = {
  nome: "Mario",
  cognome: "Rossi",
  età: 30,
  indirizzo: {
    via: "Via Roma 123",
    città: "Milano",
    cap: "20100"
  },
  hobby: ["calcio", "lettura", "viaggi"],
  saluta: function() {
    return `Ciao, sono ${this.nome} ${this.cognome}`;
  }
};
```

Accesso alle proprietà di un oggetto:

```javascript
// Notazione punto
console.log(persona.nome); // "Mario"
console.log(persona.indirizzo.città); // "Milano"

// Notazione parentesi quadre (utile per nomi di proprietà dinamici o con caratteri speciali)
console.log(persona["cognome"]); // "Rossi"

let proprietà = "età";
console.log(persona[proprietà]); // 30

// Chiamata di un metodo
console.log(persona.saluta()); // "Ciao, sono Mario Rossi"
```

Modifica e aggiunta di proprietà:

```javascript
persona.età = 31; // Modifica di una proprietà esistente
persona.professione = "Sviluppatore"; // Aggiunta di una nuova proprietà
delete persona.hobby; // Rimozione di una proprietà
```

Iterazione sulle proprietà di un oggetto:

```javascript
// for...in (itera su tutte le proprietà enumerabili)
for (let chiave in persona) {
  console.log(`${chiave}: ${persona[chiave]}`);
}

// Object.keys() (restituisce un array di chiavi)
Object.keys(persona).forEach(chiave => {
  console.log(`${chiave}: ${persona[chiave]}`);
});

// Object.values() (restituisce un array di valori)
console.log(Object.values(persona));

// Object.entries() (restituisce un array di coppie [chiave, valore])
Object.entries(persona).forEach(([chiave, valore]) => {
  console.log(`${chiave}: ${valore}`);
});
```

## Array

Gli array sono oggetti speciali utilizzati per memorizzare sequenze ordinate di valori.

```javascript
// Creazione di un array
let numeri = [1, 2, 3, 4, 5];
let misto = [1, "due", true, null, {chiave: "valore"}];
let vuoto = [];

// Array constructor (meno comune)
let altroArray = new Array(1, 2, 3);
```

Accesso e modifica degli elementi:

```javascript
console.log(numeri[0]); // 1 (gli indici partono da 0)
numeri[2] = 30; // Modifica il terzo elemento
numeri.push(6); // Aggiunge un elemento alla fine
let ultimo = numeri.pop(); // Rimuove e restituisce l'ultimo elemento
```

Proprietà e metodi comuni degli array:

```javascript
console.log(numeri.length); // Numero di elementi

// Iterazione
numeri.forEach((valore, indice) => {
  console.log(`numeri[${indice}] = ${valore}`);
});

// Map (crea un nuovo array trasformando ogni elemento)
let quadrati = numeri.map(numero => numero * numero);

// Filter (crea un nuovo array con elementi che soddisfano una condizione)
let pari = numeri.filter(numero => numero % 2 === 0);

// Reduce (riduce l'array a un singolo valore)
let somma = numeri.reduce((accumulatore, valore) => accumulatore + valore, 0);

// Sort (ordina gli elementi)
numeri.sort((a, b) => a - b); // Ordinamento numerico crescente

// Slice (estrae una porzione dell'array)
let porzione = numeri.slice(1, 3); // Elementi da indice 1 a 2

// Splice (modifica l'array rimuovendo/sostituendo elementi)
numeri.splice(2, 1, 10, 11); // Rimuove 1 elemento dall'indice 2 e inserisce 10 e 11
```

## Function

Le funzioni in JavaScript sono oggetti di prima classe, il che significa che possono essere assegnate a variabili, passate come argomenti e restituite da altre funzioni.

```javascript
// Dichiarazione di funzione
function somma(a, b) {
  return a + b;
}

// Espressione di funzione
const moltiplica = function(a, b) {
  return a * b;
};

// Arrow function (ES6)
const dividi = (a, b) => a / b;

// Funzione con parametri di default (ES6)
function saluta(nome = "Ospite") {
  return `Ciao, ${nome}!`;
}

// Funzione con numero variabile di argomenti
function sommaNumeri(...numeri) {
  return numeri.reduce((totale, numero) => totale + numero, 0);
}

console.log(sommaNumeri(1, 2, 3, 4)); // 10
```

Funzioni come costruttori:

```javascript
function Persona(nome, età) {
  this.nome = nome;
  this.età = età;
  this.saluta = function() {
    return `Ciao, sono ${this.nome}`;
  };
}

let mario = new Persona("Mario", 30);
console.log(mario.saluta()); // "Ciao, sono Mario"
```

## Date

L'oggetto `Date` è utilizzato per lavorare con date e orari.

```javascript
// Data corrente
let oggi = new Date();

// Data specifica (anno, mese (0-11), giorno, ora, minuti, secondi, millisecondi)
let compleanno = new Date(1990, 0, 15); // 15 gennaio 1990

// Da stringa
let evento = new Date("2023-12-25T10:30:00");

// Da timestamp (millisecondi dal 1° gennaio 1970)
let timestamp = new Date(1640995200000);
```

Metodi comuni per lavorare con le date:

```javascript
console.log(oggi.getFullYear()); // Anno (es. 2023)
console.log(oggi.getMonth()); // Mese (0-11)
console.log(oggi.getDate()); // Giorno del mese (1-31)
console.log(oggi.getDay()); // Giorno della settimana (0-6, dove 0 è domenica)
console.log(oggi.getHours()); // Ora (0-23)
console.log(oggi.getMinutes()); // Minuti (0-59)

// Formattazione
console.log(oggi.toLocaleDateString()); // Data locale (es. "25/12/2023")
console.log(oggi.toLocaleTimeString()); // Ora locale (es. "10:30:00")
console.log(oggi.toISOString()); // Formato ISO (es. "2023-12-25T10:30:00.000Z")
```

## RegExp

Le espressioni regolari sono utilizzate per la ricerca e manipolazione di pattern di testo.

```javascript
// Creazione di un'espressione regolare
let regex1 = /pattern/; // Notazione letterale
let regex2 = new RegExp("pattern"); // Constructor

// Con flag
let regexInsensitive = /pattern/i; // i: case-insensitive
let regexGlobal = /pattern/g; // g: global match

// Esempi di utilizzo
let testo = "JavaScript è un linguaggio di programmazione potente.";
let risultato = testo.match(/javascript/i); // Trova "JavaScript" (case-insensitive)
let tutteLeOccorrenze = testo.match(/a/gi); // Trova tutte le "a" e "A"
let sostituzione = testo.replace(/linguaggio/, "linguaggio di scripting");

// Test
console.log(/^J/.test(testo)); // true (inizia con J)
```

## Map e Set (ES6)

`Map` è una collezione di coppie chiave-valore dove le chiavi possono essere di qualsiasi tipo.

```javascript
let mappa = new Map();
mappa.set("chiave1", "valore1");
mappa.set(42, "valore2");
mappa.set({id: 1}, "valore3");

console.log(mappa.get("chiave1")); // "valore1"
console.log(mappa.has(42)); // true
mappa.delete(42);
console.log(mappa.size); // 2

// Iterazione
mappa.forEach((valore, chiave) => {
  console.log(`${chiave} => ${valore}`);
});

// Conversione da/a array
let array = Array.from(mappa);
let nuovaMappa = new Map([['a', 1], ['b', 2]]);
```

`Set` è una collezione di valori unici.

```javascript
let set = new Set();
set.add(1);
set.add(2);
set.add(1); // Ignorato perché 1 è già presente

console.log(set.has(1)); // true
console.log(set.size); // 2
set.delete(1);

// Iterazione
set.forEach(valore => {
  console.log(valore);
});

// Uso comune: rimozione di duplicati da un array
let arrayConDuplicati = [1, 2, 3, 1, 2, 4];
let arrayUnico = [...new Set(arrayConDuplicati)]; // [1, 2, 3, 4]
```

[Torna all'indice](../README.md#indice-degli-argomenti-teorici) | [Vai al precedente: Tipi di dati primitivi](./02_Tipi_Primitivi.md) | [Vai al prossimo: Conversione tra tipi](./04_Conversione_Tipi.md)