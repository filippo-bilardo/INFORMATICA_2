# Let e Const

## Dichiarazione di variabili prima di ES6

Prima di ES6, l'unico modo per dichiarare variabili in JavaScript era utilizzare la parola chiave `var`. Sebbene funzionale, `var` presentava alcune caratteristiche che potevano portare a comportamenti inaspettati e bug difficili da individuare:

```javascript
// Esempio di hoisting con var
console.log(variabile); // Output: undefined (non errore!)
var variabile = "valore";

// Esempio di scope di funzione
function esempioVar() {
  var x = 1;
  if (true) {
    var x = 2; // Sovrascrive la x precedente
    console.log(x); // Output: 2
  }
  console.log(x); // Output: 2 (non 1!)
}
```

I principali problemi di `var` includevano:

1. **Hoisting**: Le dichiarazioni `var` vengono "sollevate" all'inizio del loro contesto di esecuzione
2. **Scope di funzione**: Le variabili `var` sono visibili in tutta la funzione, indipendentemente dal blocco in cui sono dichiarate
3. **Ridichiarazione**: È possibile dichiarare più volte la stessa variabile senza errori

## Introduzione di let

ES6 ha introdotto la parola chiave `let` per dichiarare variabili con un comportamento più prevedibile e sicuro:

```javascript
// Esempio di block scope con let
function esempioLet() {
  let x = 1;
  if (true) {
    let x = 2; // Questa è una variabile diversa
    console.log(x); // Output: 2
  }
  console.log(x); // Output: 1
}

// Esempio di temporal dead zone
console.log(y); // Error: Cannot access 'y' before initialization
let y = "valore";
```

Caratteristiche principali di `let`:

1. **Block scope**: Le variabili `let` sono limitate al blocco in cui sono dichiarate (tra parentesi graffe)
2. **Temporal Dead Zone (TDZ)**: Non è possibile accedere alle variabili `let` prima della loro dichiarazione
3. **No ridichiarazione**: Non è possibile dichiarare più volte la stessa variabile nello stesso scope

## Introduzione di const

ES6 ha introdotto anche `const` per dichiarare costanti, ovvero variabili il cui valore non può essere riassegnato:

```javascript
// Dichiarazione di costanti
const PI = 3.14159;
PI = 3.14; // Error: Assignment to constant variable

// Oggetti e array costanti
const persona = { nome: "Mario" };
persona.nome = "Luigi"; // Valido: il contenuto dell'oggetto può cambiare
persona = {}; // Error: Assignment to constant variable

const numeri = [1, 2, 3];
numeri.push(4); // Valido: il contenuto dell'array può cambiare
numeri = []; // Error: Assignment to constant variable
```

Caratteristiche principali di `const`:

1. **Block scope**: Come `let`, le costanti sono limitate al blocco in cui sono dichiarate
2. **Assegnazione obbligatoria**: Le costanti devono essere inizializzate al momento della dichiarazione
3. **No riassegnazione**: Non è possibile riassegnare un nuovo valore a una costante
4. **Mutabilità del contenuto**: Per oggetti e array, il contenuto può essere modificato

## Quando usare var, let e const

In JavaScript moderno, le best practices suggeriscono:

1. **Usa `const` di default**: Per tutte le variabili che non necessitano di riassegnazione
2. **Usa `let` quando necessario**: Quando hai bisogno di riassegnare valori (contatori, accumulatori, ecc.)
3. **Evita `var`**: Nella maggior parte dei casi, `let` e `const` offrono un comportamento più prevedibile

```javascript
// Approccio moderno
const API_URL = "https://api.example.com";
const utente = { nome: "Mario", ruolo: "admin" };

let contatore = 0;
let risultato;

for (let i = 0; i < 10; i++) {
  // i è visibile solo all'interno del ciclo
  contatore += i;
}

// Uso di const in cicli
const numeri = [1, 2, 3, 4, 5];
numeri.forEach((numero) => {
  const quadrato = numero * numero;
  console.log(quadrato);
});
```

## Vantaggi di let e const

L'utilizzo di `let` e `const` offre numerosi vantaggi:

1. **Codice più prevedibile**: Il block scope rende più chiaro dove le variabili sono accessibili
2. **Meno bug**: La TDZ e la prevenzione della ridichiarazione aiutano a evitare errori comuni
3. **Intenzioni più chiare**: `const` comunica chiaramente che un valore non dovrebbe cambiare
4. **Ottimizzazioni del motore JS**: I motori JavaScript possono ottimizzare meglio il codice con `const`

## Differenze tra let, const e var

| Caratteristica | var | let | const |
|---------------|-----|-----|-------|
| Scope | Funzione | Blocco | Blocco |
| Hoisting | Sì, con inizializzazione a `undefined` | Sì, ma in TDZ | Sì, ma in TDZ |
| Ridichiarazione | Permessa | Non permessa | Non permessa |
| Riassegnazione | Permessa | Permessa | Non permessa |
| Inizializzazione | Opzionale | Opzionale | Obbligatoria |

## Esempi pratici

### Cicli e closure

```javascript
// Problema con var in cicli
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Output: 3, 3, 3
}

// Soluzione con let
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100); // Output: 0, 1, 2
}
```

### Costanti e oggetti immutabili

```javascript
// Costante con oggetto mutabile
const configurazione = { debug: true, ambiente: "sviluppo" };
configurazioni.debug = false; // Valido

// Per creare oggetti veramente immutabili
const configurazioneImmutabile = Object.freeze({
  debug: true,
  ambiente: "sviluppo"
});
configurazioneImmutabile.debug = false; // Non ha effetto (in strict mode genera errore)
```

## Conclusione

L'introduzione di `let` e `const` in ES6 ha rappresentato un importante miglioramento nella gestione delle variabili in JavaScript. Utilizzando queste nuove dichiarazioni, è possibile scrivere codice più robusto, leggibile e meno soggetto a errori.

In generale, è consigliabile:

- Utilizzare `const` per default
- Passare a `let` solo quando è necessaria la riassegnazione
- Evitare `var` nel codice nuovo
- Utilizzare strumenti di analisi statica come ESLint per applicare queste best practices

Nella prossima sezione, esploreremo un'altra importante caratteristica di ES6: le arrow functions.