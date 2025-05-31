# Dichiarazione di Variabili in JavaScript

In JavaScript, le variabili sono contenitori per memorizzare valori di dati. Esistono tre modi principali per dichiarare variabili, ciascuno con le proprie caratteristiche e casi d'uso.

## var

`var` è il modo più antico per dichiarare variabili in JavaScript.

```javascript
var nome = "Mario";
var età = 30;
var attivo = true;
```

Caratteristiche di `var`:

- **Hoisting**: Le dichiarazioni `var` vengono "sollevate" (hoisted) all'inizio del loro contesto di esecuzione (funzione o globale).
- **Scope di funzione**: Le variabili `var` hanno uno scope di funzione, non di blocco.
- **Ridichiarazione**: È possibile ridichiarare la stessa variabile più volte senza errori.

```javascript
function esempio() {
  console.log(x); // undefined (non errore)
  var x = 10;
  console.log(x); // 10
  
  if (true) {
    var x = 20; // Stessa variabile, non una nuova
    console.log(x); // 20
  }
  
  console.log(x); // 20, non 10
}
```

## let

Introdotto in ES6 (2015), `let` offre un comportamento più prevedibile rispetto a `var`.

```javascript
let nome = "Mario";
let età = 30;
let attivo = true;
```

Caratteristiche di `let`:

- **Scope di blocco**: Le variabili `let` sono limitate al blocco in cui sono dichiarate (tra `{}`).
- **No hoisting** (in pratica): Sebbene tecnicamente subiscano hoisting, non possono essere utilizzate prima della dichiarazione (Temporal Dead Zone).
- **No ridichiarazione**: Non è possibile ridichiarare la stessa variabile nello stesso scope.

```javascript
function esempio() {
  // console.log(x); // Errore: Cannot access 'x' before initialization
  let x = 10;
  console.log(x); // 10
  
  if (true) {
    let x = 20; // Nuova variabile, diversa dalla x esterna
    console.log(x); // 20
  }
  
  console.log(x); // 10, non 20
}
```

## const

Anch'esso introdotto in ES6, `const` è utilizzato per dichiarare costanti.

```javascript
const PI = 3.14159;
const GIORNI_SETTIMANA = 7;
const UTENTE = { nome: "Mario", età: 30 };
```

Caratteristiche di `const`:

- **Scope di blocco**: Come `let`, le costanti hanno scope di blocco.
- **Assegnazione obbligatoria**: Una costante deve essere inizializzata al momento della dichiarazione.
- **No riassegnazione**: Non è possibile riassegnare un nuovo valore a una costante.
- **Mutabilità dei valori complessi**: Se il valore è un oggetto o un array, le sue proprietà o elementi possono essere modificati.

```javascript
const PI = 3.14;
// PI = 3.14159; // Errore: Assignment to constant variable

const persona = { nome: "Mario" };
persona.nome = "Luigi"; // OK, stiamo modificando una proprietà, non riassegnando la costante
console.log(persona); // { nome: "Luigi" }

// persona = {}; // Errore: Assignment to constant variable
```

## Quale usare?

Le best practice moderne suggeriscono:

- Usa `const` come default per tutte le variabili che non necessitano di essere riassegnate.
- Usa `let` quando hai bisogno di riassegnare valori.
- Evita `var` nei nuovi progetti, a meno che non ci siano requisiti specifici di compatibilità.

Questo approccio aiuta a prevenire errori e rende il codice più prevedibile e manutenibile.

## Convenzioni di nomenclatura

- Usa nomi descrittivi che spiegano lo scopo della variabile.
- Usa camelCase per variabili e funzioni (es. `nomeUtente`, `calcolaImposta`).
- Usa PascalCase per classi e costruttori (es. `Persona`, `ContoBancario`).
- Usa SNAKE_CASE_MAIUSCOLO per costanti "vere" (es. `MAX_TENTATIVI`, `COLORI_BASE`).

```javascript
// Buono
const MAX_TENTATIVI = 3;
let nomeUtente = "mario_rossi";
let èAttivo = true;

// Da evitare
let x = "mario_rossi";
let flag = true;
```

[Torna all'indice](../README.md#indice-degli-argomenti-teorici) | [Vai al prossimo: Tipi di dati primitivi](./02_Tipi_Primitivi.md)