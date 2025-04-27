# Scope e Closure in JavaScript

Lo scope e le closure sono concetti fondamentali in JavaScript che influenzano la visibilità e l'accessibilità delle variabili nel codice. Comprendere questi concetti è essenziale per scrivere codice JavaScript efficace e privo di bug.

## Scope (Ambito di Visibilità)

Lo scope determina la visibilità e l'accessibilità delle variabili, funzioni e oggetti in una particolare parte del codice durante l'esecuzione.

### Tipi di Scope

#### 1. Global Scope

Le variabili dichiarate fuori da qualsiasi funzione o blocco hanno scope globale e sono accessibili da qualsiasi parte del codice:

```javascript
let messaggio = "Ciao, mondo!"; // Variabile globale

function mostraMessaggio() {
  console.log(messaggio); // Accesso a variabile globale
}

mostraMessaggio(); // Output: "Ciao, mondo!"
```

#### 2. Function Scope

Le variabili dichiarate all'interno di una funzione sono accessibili solo all'interno di quella funzione:

```javascript
function test() {
  let variabileLocale = "Sono locale";
  console.log(variabileLocale); // Output: "Sono locale"
}

test();
// console.log(variabileLocale); // Errore: variabileLocale is not defined
```

#### 3. Block Scope

Introdotto con ES6, le variabili dichiarate con `let` e `const` hanno scope di blocco, limitato al blocco in cui sono definite (tra parentesi graffe):

```javascript
if (true) {
  let x = 10; // x ha scope di blocco
  const y = 20; // y ha scope di blocco
  var z = 30; // z ha scope di funzione (o globale se fuori da una funzione)
  
  console.log(x, y, z); // Output: 10 20 30
}

// console.log(x, y); // Errore: x e y non sono definite
console.log(z); // Output: 30 (var non rispetta lo scope di blocco)
```

### Catena di Scope (Scope Chain)

Quando si cerca di accedere a una variabile, JavaScript cerca prima nello scope corrente, poi risale la catena di scope fino a trovare la variabile o raggiungere lo scope globale:

```javascript
let globale = "Sono globale";

function esterna() {
  let variabileEsterna = "Sono esterna";
  
  function interna() {
    let variabileInterna = "Sono interna";
    console.log(variabileInterna); // Trova in scope locale
    console.log(variabileEsterna); // Trova in scope esterno
    console.log(globale); // Trova in scope globale
  }
  
  interna();
}

esterna();
```

## Closure

Una closure è una funzione che ha accesso alle variabili del suo scope esterno anche dopo che la funzione esterna ha terminato l'esecuzione.

### Esempio Base di Closure

```javascript
function creaContatore() {
  let conteggio = 0; // Variabile locale a creaContatore
  
  return function() {
    conteggio++; // Accesso alla variabile dello scope esterno
    return conteggio;
  };
}

let contatore = creaContatore();
console.log(contatore()); // Output: 1
console.log(contatore()); // Output: 2
console.log(contatore()); // Output: 3
```

In questo esempio, la funzione restituita da `creaContatore` mantiene l'accesso alla variabile `conteggio` anche dopo che `creaContatore` ha terminato l'esecuzione.

### Utilizzi Pratici delle Closure

#### 1. Incapsulamento e Dati Privati

```javascript
function creaPersona(nome, età) {
  // Dati "privati"
  let _nome = nome;
  let _età = età;
  
  // Interfaccia pubblica
  return {
    getNome: function() { return _nome; },
    getEtà: function() { return _età; },
    setEtà: function(nuovaEtà) {
      if (nuovaEtà > 0) _età = nuovaEtà;
    },
    compleanno: function() { _età++; }
  };
}

let persona = creaPersona("Mario", 30);
console.log(persona.getNome()); // Output: "Mario"
persona.compleanno();
console.log(persona.getEtà()); // Output: 31
```

#### 2. Factory Functions

```javascript
function creaCalcolatrice(operazione) {
  return function(a, b) {
    switch(operazione) {
      case 'somma': return a + b;
      case 'sottrazione': return a - b;
      case 'moltiplicazione': return a * b;
      case 'divisione': return a / b;
      default: return NaN;
    }
  };
}

let somma = creaCalcolatrice('somma');
let sottrazione = creaCalcolatrice('sottrazione');

console.log(somma(5, 3)); // Output: 8
console.log(sottrazione(5, 3)); // Output: 2
```

#### 3. Gestione di Eventi e Callback

```javascript
function creaGestoreEventi(elemento, evento) {
  let conteggio = 0;
  
  elemento.addEventListener(evento, function() {
    conteggio++;
    console.log(`Evento ${evento} attivato ${conteggio} volte`);
  });
}

// Esempio di utilizzo:
// creaGestoreEventi(document.getElementById('mioBottone'), 'click');
```

## Problemi Comuni e Best Practices

### 1. Variabili Globali

Evita di utilizzare variabili globali quando possibile, poiché possono causare conflitti di nomi e rendere il codice difficile da mantenere.

### 2. Loop e Closure

Fai attenzione quando crei closure all'interno di loop:

```javascript
// Problema
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Output: 3, 3, 3
  }, 100);
}

// Soluzione con IIFE
for (var i = 0; i < 3; i++) {
  (function(indice) {
    setTimeout(function() {
      console.log(indice); // Output: 0, 1, 2
    }, 100);
  })(i);
}

// Soluzione moderna con let
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Output: 0, 1, 2
  }, 100);
}
```

### 3. Memory Leaks

Le closure possono causare memory leak se non gestite correttamente, specialmente quando si mantengono riferimenti a elementi DOM o oggetti di grandi dimensioni.

## Conclusione

Lo scope e le closure sono concetti potenti in JavaScript che permettono di controllare la visibilità delle variabili e creare pattern di programmazione avanzati. Comprendere questi concetti è fondamentale per scrivere codice JavaScript efficiente e manutenibile.

[Torna all'indice](../README.md#contenuti-teorici) | [Vai al precedente: Parametri e Valori di Ritorno](./02_Parametri_Valori_Ritorno.md) | [Vai al successivo: Funzioni Freccia](./04_Funzioni_Freccia.md)