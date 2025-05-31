# Esercitazione 2: Variabili e Tipi di Dati

## Descrizione

Benvenuti alla seconda esercitazione del nostro corso di JavaScript! In questa lezione, esploreremo le variabili e i tipi di dati in JavaScript, elementi fondamentali per qualsiasi programma. Comprenderemo come dichiarare variabili, quali tipi di dati sono disponibili in JavaScript e come utilizzarli efficacemente.

JavaScript è un linguaggio a tipizzazione dinamica, il che significa che non è necessario dichiarare il tipo di una variabile quando la si crea. Questo offre grande flessibilità, ma richiede anche una buona comprensione di come JavaScript gestisce i diversi tipi di dati.

## Obiettivi dell'esercitazione

- Comprendere i diversi modi per dichiarare variabili in JavaScript
- Esplorare i tipi di dati primitivi e complessi
- Imparare la conversione tra tipi di dati
- Comprendere lo scope delle variabili
- Utilizzare le costanti in modo appropriato

## Indice degli argomenti teorici

1. [Dichiarazione di variabili](./teoria/01_Dichiarazione_Variabili.md)
2. [Tipi di dati primitivi](./teoria/02_Tipi_Primitivi.md)
3. [Tipi di dati complessi](./teoria/03_Tipi_Complessi.md)
4. [Conversione tra tipi](./teoria/04_Conversione_Tipi.md)
5. [Scope e Hoisting](./teoria/05_Scope_Hoisting.md)

## Esercizi pratici

### Esercizio 2.1: Dichiarazione e assegnazione di variabili
Crea variabili utilizzando `var`, `let` e `const` e osserva le differenze di comportamento.

```javascript
// Dichiarazione con var
var nome = "Mario";
var età = 30;

// Dichiarazione con let
let città = "Roma";
let occupato = true;

// Dichiarazione con const
const PI = 3.14;
const GIORNI_SETTIMANA = 7;

// Prova a riassegnare le variabili
nome = "Luigi";      // Funziona
città = "Milano";    // Funziona
// PI = 3.14159;     // Errore: non puoi riassegnare una costante

// Scope di blocco
{
  var variabileVar = "Visibile fuori dal blocco";
  let variabileLet = "Visibile solo nel blocco";
}

console.log(variabileVar);    // Funziona
// console.log(variabileLet); // Errore: variabileLet non è definita
```

### Esercizio 2.2: Tipi di dati primitivi
Esplora i tipi di dati primitivi di JavaScript.

```javascript
// String
let stringa = "Questo è un testo";
let stringa2 = 'Anche questo è un testo';
let stringaTemplate = `La somma di 2 + 2 è ${2 + 2}`;

// Number
let intero = 42;
let decimale = 3.14;
let esponenziale = 2.998e8;
let infinito = Infinity;
let nonNumero = NaN;

// Boolean
let vero = true;
let falso = false;

// Undefined
let variabileNonDefinita;
console.log(variabileNonDefinita); // undefined

// Null
let valoreNullo = null;

// Symbol (ES6)
let simbolo = Symbol("descrizione");
let altroSimbolo = Symbol("descrizione");
console.log(simbolo === altroSimbolo); // false, ogni simbolo è unico

// BigInt (ES2020)
let numeroDavveroGrande = 9007199254740991n;
```

### Esercizio 2.3: Tipi di dati complessi
Esplora i tipi di dati complessi (riferimento) di JavaScript.

```javascript
// Object
let persona = {
  nome: "Mario",
  età: 30,
  città: "Roma",
  hobby: ["calcio", "lettura", "viaggi"]
};

console.log(persona.nome);      // Accesso con notazione punto
console.log(persona["età"]);   // Accesso con notazione parentesi quadre

// Array
let numeri = [1, 2, 3, 4, 5];
let misto = [1, "due", true, null, {chiave: "valore"}];

console.log(numeri[0]);         // Accesso al primo elemento
console.log(misto.length);      // Lunghezza dell'array

// Function
function saluta(nome) {
  return `Ciao, ${nome}!`;
}

let saluto = saluta("Mario");
console.log(saluto);

// Date
let oggi = new Date();
console.log(oggi.toLocaleDateString());
```

### Esercizio 2.4: Conversione tra tipi di dati
Esplora come convertire tra diversi tipi di dati in JavaScript.

```javascript
// Conversione a String
let num = 42;
let strNum = String(num);       // Esplicita
let strNum2 = num.toString();   // Metodo
let strNum3 = num + "";         // Implicita

// Conversione a Number
let str = "42";
let numStr = Number(str);       // Esplicita
let numStr2 = parseInt(str);    // Funzione (intero)
let numStr3 = parseFloat(str);  // Funzione (decimale)
let numStr4 = +str;             // Operatore unario +

// Conversione a Boolean
let val = 1;
let boolVal = Boolean(val);     // Esplicita
let boolVal2 = !!val;           // Doppia negazione

// Valori falsy in JavaScript
console.log(Boolean(0));        // false
console.log(Boolean(""));       // false
console.log(Boolean(null));     // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));      // false
```

[Torna all'indice principale](../README.md) | [Vai alla precedente esercitazione](../01_Introduzione_JavaScript/) | [Vai alla prossima esercitazione](../03_Operatori/)