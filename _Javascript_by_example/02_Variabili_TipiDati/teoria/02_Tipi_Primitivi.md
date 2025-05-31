# Tipi di Dati Primitivi in JavaScript

JavaScript ha sette tipi di dati primitivi. I tipi primitivi sono immutabili (non possono essere modificati) e sono passati per valore, non per riferimento.

## String

Il tipo `String` rappresenta una sequenza di caratteri e viene utilizzato per memorizzare testo.

```javascript
// Tre modi per creare stringhe
let stringa1 = "Ciao mondo"; // Doppi apici
let stringa2 = 'Hello world'; // Apici singoli
let stringa3 = `Buongiorno mondo`; // Template literals (ES6)

// Template literals permettono interpolazione e stringhe multilinea
let nome = "Mario";
let saluto = `Ciao ${nome}!`; // Interpolazione
console.log(saluto); // "Ciao Mario!"

let testoMultilinea = `Questa è una stringa
su più righe`;
```

Le stringhe hanno molti metodi utili:

```javascript
let testo = "JavaScript è fantastico";

console.log(testo.length); // 24 (lunghezza)
console.log(testo.toUpperCase()); // "JAVASCRIPT È FANTASTICO"
console.log(testo.toLowerCase()); // "javascript è fantastico"
console.log(testo.indexOf("è")); // 11 (posizione)
console.log(testo.slice(0, 10)); // "JavaScript"
console.log(testo.replace("fantastico", "incredibile")); // "JavaScript è incredibile"
```

## Number

Il tipo `Number` rappresenta sia numeri interi che decimali. JavaScript utilizza il formato IEEE 754 a 64 bit (double precision).

```javascript
let intero = 42;
let decimale = 3.14;
let esponenziale = 2.998e8; // 2.998 × 10^8
let binario = 0b1010; // 10 in decimale
let ottale = 0o744; // 484 in decimale
let esadecimale = 0xFF; // 255 in decimale
```

Valori speciali di Number:

```javascript
let infinito = Infinity; // Rappresenta l'infinito matematico
let negativoInfinito = -Infinity;
let nonNumero = NaN; // Not a Number, risultato di operazioni matematiche non valide

console.log(1 / 0); // Infinity
console.log(-1 / 0); // -Infinity
console.log("ciao" / 2); // NaN
```

Limiti dei numeri in JavaScript:

```javascript
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991 (2^53 - 1)
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
```

## Boolean

Il tipo `Boolean` rappresenta un valore logico: vero (`true`) o falso (`false`).

```javascript
let vero = true;
let falso = false;

// Spesso risultato di espressioni di confronto
let maggioreDi = 10 > 5; // true
let uguaglianza = 10 === "10"; // false
```

Operatori logici con booleani:

```javascript
console.log(true && true); // true (AND logico)
console.log(true && false); // false
console.log(true || false); // true (OR logico)
console.log(!true); // false (NOT logico)
```

## Undefined

`undefined` rappresenta una variabile che è stata dichiarata ma non ha ancora un valore assegnato.

```javascript
let variabile;
console.log(variabile); // undefined

function esempio() {
  // Nessun return esplicito
}
console.log(esempio()); // undefined
```

## Null

`null` rappresenta l'assenza intenzionale di qualsiasi valore o oggetto.

```javascript
let vuoto = null;

// Differenza tra null e undefined
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (questo è considerato un bug storico di JavaScript)
console.log(null === undefined); // false
console.log(null == undefined); // true (con conversione di tipo)
```

## Symbol (ES6)

Introdotto in ES6, `Symbol` crea identificatori unici e immutabili, spesso utilizzati come chiavi di proprietà di oggetti.

```javascript
let simbolo1 = Symbol();
let simbolo2 = Symbol("descrizione"); // La descrizione è solo per debugging
let simbolo3 = Symbol("descrizione");

console.log(simbolo2 === simbolo3); // false, ogni simbolo è unico anche con la stessa descrizione

// Uso comune come chiavi di proprietà
let oggetto = {};
oggetto[simbolo1] = "Valore associato al simbolo";
```

## BigInt (ES2020)

Introdotto in ES2020, `BigInt` permette di rappresentare numeri interi di dimensioni arbitrarie, superando i limiti di `Number`.

```javascript
let numeroDavveroGrande = 9007199254740991n; // La 'n' alla fine indica un BigInt
let altroBigInt = BigInt(9007199254740991);

console.log(numeroDavveroGrande + 1n); // 9007199254740992n

// Non si possono mischiare BigInt e Number nelle operazioni
// console.log(numeroDavveroGrande + 1); // TypeError
console.log(numeroDavveroGrande + BigInt(1)); // Corretto
```

## Controllo del tipo

Per verificare il tipo di un valore, si utilizza l'operatore `typeof`:

```javascript
console.log(typeof "ciao"); // "string"
console.log(typeof 42); // "number"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (bug storico)
console.log(typeof Symbol()); // "symbol"
console.log(typeof 42n); // "bigint"
```

[Torna all'indice](../README.md#indice-degli-argomenti-teorici) | [Vai al precedente: Dichiarazione di variabili](./01_Dichiarazione_Variabili.md) | [Vai al prossimo: Tipi di dati complessi](./03_Tipi_Complessi.md)