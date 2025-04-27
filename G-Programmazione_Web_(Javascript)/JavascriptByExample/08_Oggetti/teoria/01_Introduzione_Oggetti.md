# Introduzione agli Oggetti in JavaScript

Gli oggetti sono una delle caratteristiche più potenti e fondamentali di JavaScript. A differenza di molti altri linguaggi di programmazione, JavaScript è basato quasi interamente sugli oggetti: quasi tutto in JavaScript è un oggetto o può essere trattato come tale.

## Cos'è un Oggetto?

Un oggetto in JavaScript è una collezione di coppie chiave-valore, dove ogni chiave (o proprietà) è associata a un valore. Questi valori possono essere dati primitivi (numeri, stringhe, booleani), funzioni (chiamate metodi quando sono all'interno di un oggetto) o altri oggetti.

Gli oggetti in JavaScript sono estremamente versatili e possono essere utilizzati per rappresentare praticamente qualsiasi cosa, da semplici strutture dati a entità complesse del mondo reale.

## Creazione di Oggetti

In JavaScript, esistono diversi modi per creare oggetti:

### 1. Notazione Letterale (Object Literal)

Il modo più comune e semplice per creare un oggetto è utilizzare la notazione letterale con le parentesi graffe `{}`:

```javascript
let persona = {
  nome: "Mario",
  cognome: "Rossi",
  età: 30,
  indirizzo: {
    via: "Via Roma",
    città: "Milano",
    cap: "20100"
  },
  saluta: function() {
    return `Ciao, sono ${this.nome} ${this.cognome}`;
  }
};

console.log(persona.nome); // Output: "Mario"
console.log(persona.saluta()); // Output: "Ciao, sono Mario Rossi"
```

### 2. Costruttore Object()

È possibile utilizzare il costruttore `Object()` per creare un nuovo oggetto vuoto e poi aggiungere proprietà:

```javascript
let persona = new Object();
persona.nome = "Mario";
persona.cognome = "Rossi";
persona.età = 30;
persona.saluta = function() {
  return `Ciao, sono ${this.nome} ${this.cognome}`;
};

console.log(persona.nome); // Output: "Mario"
```

### 3. Funzioni Costruttore

Le funzioni costruttore permettono di creare più oggetti con la stessa struttura:

```javascript
function Persona(nome, cognome, età) {
  this.nome = nome;
  this.cognome = cognome;
  this.età = età;
  this.saluta = function() {
    return `Ciao, sono ${this.nome} ${this.cognome}`;
  };
}

let persona1 = new Persona("Mario", "Rossi", 30);
let persona2 = new Persona("Luigi", "Verdi", 25);

console.log(persona1.saluta()); // Output: "Ciao, sono Mario Rossi"
console.log(persona2.saluta()); // Output: "Ciao, sono Luigi Verdi"
```

### 4. Object.create()

Il metodo `Object.create()` crea un nuovo oggetto utilizzando un oggetto esistente come prototipo:

```javascript
let personaProto = {
  saluta: function() {
    return `Ciao, sono ${this.nome} ${this.cognome}`;
  }
};

let persona = Object.create(personaProto);
persona.nome = "Mario";
persona.cognome = "Rossi";
persona.età = 30;

console.log(persona.saluta()); // Output: "Ciao, sono Mario Rossi"
```

### 5. Classi (ES6+)

A partire da ES6, JavaScript ha introdotto la sintassi delle classi, che è un modo più familiare per creare oggetti per chi proviene da linguaggi orientati agli oggetti:

```javascript
class Persona {
  constructor(nome, cognome, età) {
    this.nome = nome;
    this.cognome = cognome;
    this.età = età;
  }
  
  saluta() {
    return `Ciao, sono ${this.nome} ${this.cognome}`;
  }
}

let persona = new Persona("Mario", "Rossi", 30);
console.log(persona.saluta()); // Output: "Ciao, sono Mario Rossi"
```

## Accesso alle Proprietà degli Oggetti

Esistono due modi principali per accedere alle proprietà di un oggetto:

### 1. Notazione con Punto

```javascript
let persona = { nome: "Mario", cognome: "Rossi" };

console.log(persona.nome); // Output: "Mario"
persona.età = 30; // Aggiunge una nuova proprietà
```

### 2. Notazione con Parentesi Quadre

```javascript
let persona = { nome: "Mario", cognome: "Rossi" };

console.log(persona["nome"]); // Output: "Mario"

// Utile quando il nome della proprietà è memorizzato in una variabile
let proprietà = "cognome";
console.log(persona[proprietà]); // Output: "Rossi"

// O quando il nome della proprietà contiene caratteri speciali o spazi
persona["data di nascita"] = "01/01/1990";
```

## Verifica dell'Esistenza di Proprietà

Per verificare se un oggetto ha una determinata proprietà, è possibile utilizzare diversi approcci:

```javascript
let persona = { nome: "Mario", cognome: "Rossi", età: 30 };

// 1. Operatore in
console.log("nome" in persona); // Output: true
console.log("indirizzo" in persona); // Output: false

// 2. Metodo hasOwnProperty()
console.log(persona.hasOwnProperty("nome")); // Output: true
console.log(persona.hasOwnProperty("toString")); // Output: false (ereditata)

// 3. Confronto con undefined
console.log(persona.nome !== undefined); // Output: true
console.log(persona.indirizzo !== undefined); // Output: false
```

## Iterazione sulle Proprietà di un Oggetto

Per iterare sulle proprietà di un oggetto, è possibile utilizzare diversi metodi:

```javascript
let persona = {
  nome: "Mario",
  cognome: "Rossi",
  età: 30,
  professione: "Sviluppatore"
};

// 1. for...in (itera su tutte le proprietà enumerabili, incluse quelle ereditate)
for (let chiave in persona) {
  console.log(`${chiave}: ${persona[chiave]}`);
}

// 2. Object.keys() (restituisce un array con le chiavi proprie ed enumerabili)
Object.keys(persona).forEach(chiave => {
  console.log(`${chiave}: ${persona[chiave]}`);
});

// 3. Object.values() (restituisce un array con i valori propri ed enumerabili)
Object.values(persona).forEach(valore => {
  console.log(valore);
});

// 4. Object.entries() (restituisce un array di coppie [chiave, valore])
Object.entries(persona).forEach(([chiave, valore]) => {
  console.log(`${chiave}: ${valore}`);
});
```

## Oggetti e Riferimenti

Un aspetto importante da comprendere è che gli oggetti in JavaScript sono passati per riferimento, non per valore:

```javascript
let persona1 = { nome: "Mario" };
let persona2 = persona1; // persona2 è un riferimento a persona1, non una copia

persona2.nome = "Luigi";
console.log(persona1.nome); // Output: "Luigi" (anche persona1 è cambiato)

// Per creare una copia indipendente (shallow copy):
let persona3 = { ...persona1 }; // Utilizzando lo spread operator (ES6+)
let persona4 = Object.assign({}, persona1); // Utilizzando Object.assign()

persona3.nome = "Giovanni";
console.log(persona1.nome); // Output: "Luigi" (persona1 non è cambiato)
```

## Oggetti Immutabili

Per creare oggetti immutabili (che non possono essere modificati), è possibile utilizzare `Object.freeze()`:

```javascript
let persona = Object.freeze({
  nome: "Mario",
  cognome: "Rossi"
});

// Tentativo di modifica (non avrà effetto in strict mode)
persona.nome = "Luigi";
console.log(persona.nome); // Output: "Mario" (l'oggetto non è stato modificato)

// Verifica se un oggetto è congelato
console.log(Object.isFrozen(persona)); // Output: true
```

## Conclusione

Gli oggetti sono il cuore di JavaScript e comprendere come crearli, manipolarli e utilizzarli è fondamentale per padroneggiare il linguaggio. Questa introduzione copre i concetti di base, ma gli oggetti in JavaScript hanno molte altre caratteristiche avanzate che esploreremo nelle prossime guide.

[Torna all'indice](../README.md) | [Successivo: Proprietà e Metodi](./02_Proprietà_Metodi.md)