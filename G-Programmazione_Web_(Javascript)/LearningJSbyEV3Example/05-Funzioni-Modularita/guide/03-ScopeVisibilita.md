# Guida: Scope e Visibilità delle Variabili in JavaScript

Lo scope (o ambito di validità) determina la visibilità e l'accessibilità delle variabili e delle funzioni in diverse parti del codice. Comprendere lo scope è fondamentale per scrivere codice JavaScript corretto e privo di bug.

## Tipi di Scope

In JavaScript, esistono principalmente tre tipi di scope:

1.  **Scope Globale (Global Scope)**: Le variabili dichiarate al di fuori di qualsiasi funzione o blocco hanno scope globale. Sono accessibili da qualsiasi punto del codice.
2.  **Scope Locale o di Funzione (Function Scope)**: Le variabili dichiarate all'interno di una funzione (usando `var`, `let`, o `const`) sono locali a quella funzione. Sono accessibili solo dall'interno della funzione stessa.
3.  **Scope di Blocco (Block Scope)** (introdotto con ES6): Le variabili dichiarate con `let` e `const` all'interno di un blocco di codice delimitato da parentesi graffe `{}` (ad esempio, in un `if`, `for`, o semplicemente un blocco) sono accessibili solo all'interno di quel blocco.

## Scope Globale

Le variabili definite nello scope globale sono accessibili ovunque nel tuo script JavaScript.

```javascript
// Variabile globale
let messaggioGlobale = "Ciao dal mondo globale!";

function mostraMessaggio() {
  console.log(messaggioGlobale); // Accessibile qui
}

mostraMessaggio(); // Output: Ciao dal mondo globale!
console.log(messaggioGlobale); // Accessibile anche qui

if (true) {
  console.log(messaggioGlobale); // Accessibile anche all'interno di un blocco
}
```

È buona pratica minimizzare l'uso di variabili globali per evitare conflitti di nomi e rendere il codice più manutenibile.

## Scope Locale (o di Funzione)

Le variabili dichiarate all'interno di una funzione sono locali a quella funzione.

```javascript
function calcola() {
  let risultatoLocale = 100; // Variabile locale
  var vecchiaVariabileLocale = 50; // Variabile locale (function-scoped)
  console.log("Dentro la funzione, risultatoLocale è: " + risultatoLocale);
}

calcola();
// console.log(risultatoLocale); // Errore: risultatoLocale is not defined
// console.log(vecchiaVariabileLocale); // Errore: vecchiaVariabileLocale is not defined
```

Ogni chiamata a una funzione crea un nuovo scope per quella chiamata.

## Scope di Blocco (`let` e `const`)

Con l'introduzione di `let` e `const` in ES6, JavaScript ha ottenuto lo scope di blocco. Questo significa che una variabile dichiarata con `let` o `const` all'interno di un blocco (`{...}`) è accessibile solo all'interno di quel blocco.

```javascript
function testBlocco() {
  let a = 1;
  const b = 2;

  if (true) {
    let c = 3; // c è block-scoped
    const d = 4; // d è block-scoped
    var e = 5;   // e è function-scoped (NON block-scoped)

    console.log(a); // 1 (accessibile dalla funzione esterna)
    console.log(c); // 3
    console.log(e); // 5
  }

  // console.log(c); // Errore: c is not defined (fuori dal suo blocco)
  console.log(e); // 5 (var non ha block scope, ma function scope)
}

testBlocco();
```

L'uso di `let` e `const` è generalmente preferito rispetto a `var` per evitare comportamenti inaspettati legati allo scope.

## `var` vs `let`/`const`

-   **`var`**: Ha scope di funzione (o globale se dichiarata fuori da funzioni). Le dichiarazioni `var` sono soggette a *hoisting* (vengono "sollevate" all'inizio del loro scope di funzione durante la compilazione).
-   **`let`**: Ha scope di blocco. Non è soggetta a hoisting nello stesso modo di `var` (entra nella "temporal dead zone" prima della dichiarazione).
-   **`const`**: Ha scope di blocco, come `let`. Deve essere inizializzata al momento della dichiarazione e il suo valore non può essere riassegnato (ma se è un oggetto o un array, il suo contenuto può essere modificato).

```javascript
function esempioHoistingVar() {
  console.log(miaVar); // Output: undefined (hoisted, ma non ancora inizializzata)
  var miaVar = "Sono stata hoistata!";
  console.log(miaVar); // Output: Sono stata hoistata!
}
esempioHoistingVar();

function esempioTDZLet() {
  // console.log(miaLet); // Errore: Cannot access 'miaLet' before initialization (Temporal Dead Zone)
  let miaLet = "Sono in TDZ prima di qui";
  console.log(miaLet);
}
// esempioTDZLet();
```

## Scope Chain (Catena degli Scope)

Quando JavaScript cerca una variabile, inizia dallo scope corrente. Se non la trova, risale allo scope esterno (contenitore), e così via, fino a raggiungere lo scope globale. Questa è la catena degli scope.

```javascript
let x = 10; // Globale

function esterna() {
  let y = 20; // Locale a 'esterna'

  function interna() {
    let z = 30; // Locale a 'interna'
    console.log(x + y + z); // Accede a x (globale), y (da 'esterna'), z (locale)
  }

  interna();
}

esterna(); // Output: 60
```

## Closures

Una closure è una funzione che "ricorda" lo scope in cui è stata creata, anche se viene eseguita in uno scope diverso. Questo significa che una funzione interna ha sempre accesso alle variabili della sua funzione esterna, anche dopo che la funzione esterna ha terminato l'esecuzione.

```javascript
function creaContatore() {
  let conteggio = 0;
  return function() {
    conteggio++;
    return conteggio;
  };
}

const contatore1 = creaContatore();
console.log(contatore1()); // Output: 1
console.log(contatore1()); // Output: 2

const contatore2 = creaContatore(); // Crea una nuova closure con il suo 'conteggio'
console.log(contatore2()); // Output: 1
```
Le closures sono un concetto potente e ampiamente utilizzato in JavaScript, ad esempio per creare variabili private o in programmazione funzionale.

## Applicazione nel Contesto EV3 con MakeCode

Comprendere lo scope è importante anche quando si programmano robot EV3:

-   **Variabili Globali per Stato del Robot**: Potresti usare variabili globali (con cautela) per mantenere informazioni sullo stato generale del robot (es. `let robotInMovimento = false;`).
-   **Variabili Locali nelle Funzioni di Comportamento**: Quando crei funzioni per specifici comportamenti (es. `function evitaOstacolo()`), le variabili usate per i calcoli o le decisioni interne dovrebbero essere locali per evitare interferenze.

    ```javascript
    // Esempio concettuale per EV3
    let velocitaGlobale = 50;

    function muoviAvantiPerSecondi(secondi) {
      let tempoMs = secondi * 1000; // 'tempoMs' è locale a questa funzione
      motors.largeBC.run(velocitaGlobale);
      pause(tempoMs);
      motors.largeBC.stop();
    }

    function controllaSensore() {
      let distanza = sensors.ultrasonic4.distance(); // 'distanza' è locale
      if (distanza < 20) {
        // Logica di reazione locale
        let messaggioDisplay = "Ostacolo!"; // 'messaggioDisplay' è locale al blocco if
        brick.showString(messaggioDisplay, 1);
      }
    }

    muoviAvantiPerSecondi(2);
    controllaSensore();
    ```

Una corretta gestione dello scope aiuta a creare codice EV3 più robusto, prevedibile e facile da debuggare, specialmente quando i programmi diventano più complessi.

---

[⬅️ Torna alle Guide del Modulo 05](./README.md)
[🏡 Torna all'Indice del Corso](../../../README.md)