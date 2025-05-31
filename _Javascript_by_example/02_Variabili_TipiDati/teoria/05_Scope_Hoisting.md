# Scope e Hoisting in JavaScript

Lo scope e l'hoisting sono concetti fondamentali in JavaScript che determinano la visibilità e l'accessibilità delle variabili e delle funzioni nel codice.

## Scope

Lo scope si riferisce alla porzione di codice in cui una variabile o una funzione è accessibile. JavaScript ha diversi tipi di scope.

### Scope Globale

Le variabili dichiarate fuori da qualsiasi funzione o blocco hanno scope globale e sono accessibili da qualsiasi parte del programma.

```javascript
// Variabile globale
var globale = "Sono accessibile ovunque";
let globale2 = "Anch'io sono globale";

function esempio() {
  console.log(globale); // Accessibile
}

if (true) {
  console.log(globale2); // Accessibile
}
```

### Scope di Funzione

Le variabili dichiarate all'interno di una funzione sono accessibili solo all'interno di quella funzione e delle funzioni annidate.

```javascript
function funzioneEsterna() {
  var interna = "Sono visibile solo dentro funzioneEsterna";
  let interna2 = "Anch'io sono visibile solo qui";
  
  console.log(interna); // Accessibile
  
  function funzioneInterna() {
    console.log(interna); // Accessibile anche qui (closure)
  }
  
  funzioneInterna();
}

funzioneEsterna();
// console.log(interna); // Errore: interna non è definita
```

### Scope di Blocco

Introdotto in ES6 con `let` e `const`, lo scope di blocco limita la visibilità delle variabili al blocco in cui sono dichiarate (un blocco è delimitato da `{}`).

```javascript
if (true) {
  var x = 10; // Scope di funzione (o globale se fuori da una funzione)
  let y = 20; // Scope di blocco
  const z = 30; // Scope di blocco
  
  console.log(x); // 10
  console.log(y); // 20
  console.log(z); // 30
}

console.log(x); // 10 (accessibile fuori dal blocco)
// console.log(y); // Errore: y non è definita
// console.log(z); // Errore: z non è definita
```

### Scope Lessicale e Closure

JavaScript utilizza lo scope lessicale (o statico), il che significa che la visibilità delle variabili è determinata dalla posizione delle dichiarazioni nel codice sorgente, non dall'esecuzione.

```javascript
function esterna() {
  let variabile = "Sono nella funzione esterna";
  
  function interna() {
    console.log(variabile); // Accede alla variabile della funzione esterna
  }
  
  return interna; // Restituisce la funzione interna
}

let chiusura = esterna(); // chiusura è ora la funzione interna
chiusura(); // Stampa "Sono nella funzione esterna"
```

Questo è un esempio di closure: la funzione interna "ricorda" l'ambiente in cui è stata creata, anche quando viene eseguita altrove.

## Hoisting

L'hoisting è un comportamento di JavaScript in cui le dichiarazioni di variabili e funzioni vengono "sollevate" all'inizio del loro contesto di esecuzione durante la fase di compilazione.

### Hoisting delle Variabili

```javascript
console.log(x); // undefined (non errore)
var x = 10;
console.log(x); // 10

// Il codice sopra viene interpretato come:
// var x;
// console.log(x);
// x = 10;
// console.log(x);
```

Con `let` e `const`, le dichiarazioni vengono comunque sollevate, ma non vengono inizializzate, creando una "Temporal Dead Zone":

```javascript
// console.log(y); // Errore: Cannot access 'y' before initialization
let y = 20;

// console.log(z); // Errore: Cannot access 'z' before initialization
const z = 30;
```

### Hoisting delle Funzioni

Le dichiarazioni di funzioni vengono completamente sollevate, inclusa la loro definizione:

```javascript
saluta("Mario"); // "Ciao, Mario!" (funziona)

function saluta(nome) {
  return console.log(`Ciao, ${nome}!`);
}
```

Le espressioni di funzione, invece, si comportano come le variabili:

```javascript
// saluta2("Luigi"); // Errore: saluta2 is not a function

var saluta2 = function(nome) {
  return console.log(`Ciao, ${nome}!`);
};

saluta2("Luigi"); // "Ciao, Luigi!" (funziona)
```

## Best Practices

1. **Dichiarare le variabili all'inizio del loro scope**: Anche se JavaScript solleva le dichiarazioni, è una buona pratica dichiararle all'inizio per migliorare la leggibilità.

2. **Preferire `let` e `const` a `var`**: Offrono un comportamento più prevedibile con lo scope di blocco.

3. **Minimizzare l'uso di variabili globali**: Possono causare conflitti di nomi e rendere il codice difficile da mantenere.

4. **Utilizzare IIFE per isolare lo scope**: Le Immediately Invoked Function Expressions creano uno scope isolato.

```javascript
(function() {
  // Variabili locali a questa funzione
  var privata = "Non accessibile dall'esterno";
  
  // Codice...
})();

// console.log(privata); // Errore: privata non è definita
```

5. **Comprendere le closure**: Sono potenti ma possono causare perdite di memoria se non utilizzate correttamente.

```javascript
function creaContatore() {
  let conteggio = 0;
  
  return {
    incrementa: function() {
      conteggio++;
      return conteggio;
    },
    decrementa: function() {
      conteggio--;
      return conteggio;
    },
    valore: function() {
      return conteggio;
    }
  };
}

let contatore = creaContatore();
console.log(contatore.incrementa()); // 1
console.log(contatore.incrementa()); // 2
console.log(contatore.decrementa()); // 1
```

## Strict Mode

Il "strict mode" è una modalità di JavaScript che impone regole più rigorose e previene alcuni comportamenti problematici. Si attiva aggiungendo `"use strict";` all'inizio di uno script o di una funzione.

```javascript
"use strict";

// Errore in strict mode, OK in modalità normale
// x = 10; // Errore: x is not defined (variabili non dichiarate)

function esempio() {
  "use strict";
  // Codice in strict mode...
}
```

Vantaggi del strict mode:

- Previene la creazione accidentale di variabili globali
- Genera errori per assegnazioni che fallirebbero silenziosamente
- Previene l'uso di caratteristiche problematiche (come `with`)
- Semplifica l'uso di `eval`
- Previene l'uso di parole riservate per future versioni di JavaScript

[Torna all'indice](../README.md#indice-degli-argomenti-teorici) | [Vai al precedente: Conversione tra tipi](./04_Conversione_Tipi.md)