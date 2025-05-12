<<<<<<< HEAD
# Guida 1: Introduzione alle Variabili e Tipi di Dati in JavaScript

## Introduzione

Prima di addentrarci nelle strutture dati complesse, è fondamentale avere una solida comprensione delle variabili e dei tipi di dati primitivi in JavaScript. Questi sono i mattoni fondamentali su cui costruiremo logiche più elaborate per controllare il nostro robot EV3.

## Variabili

Una variabile è un contenitore nominato per memorizzare dati. In JavaScript, si dichiarano variabili usando `let`, `const`, o `var` (sebbene `let` e `const` siano preferiti nelle versioni moderne di JavaScript).

-   `let`: Dichiara una variabile il cui valore può essere riassegnato.
-   `const`: Dichiara una costante, il cui valore non può essere riassegnato dopo l'inizializzazione.

```javascript
// Esempio con EV3
let velocitaMotore = 50; // Variabile per la velocità del motore
const PIN_SENSORE_COLORE = "in1"; // Costante per la porta del sensore

velocitaMotore = 75; // Valido
// PIN_SENSORE_COLORE = "in2"; // Errore! Non si può riassegnare una costante
=======
# Guida: Introduzione alle Variabili e Tipi di Dati in JavaScript

Questo documento fornisce una revisione dei tipi di dati primitivi in JavaScript, essenziale per comprendere come manipolare i dati, specialmente quando si programma l'EV3.

## Variabili

In JavaScript, una variabile è un contenitore nominato per memorizzare dati. Si dichiara una variabile usando `var`, `let`, o `const`.

-   `let`: permette di dichiarare variabili il cui valore può essere riassegnato. Hanno uno scope di blocco.
-   `const`: permette di dichiarare variabili il cui valore non può essere riassegnato dopo l'inizializzazione. Hanno uno scope di blocco.
-   `var`: il modo più vecchio per dichiarare variabili. Hanno uno scope di funzione o globale, e possono portare a comportamenti inaspettati (hoisting). Generalmente, si preferisce `let` e `const`.

**Esempio:**

```javascript
let motorSpeed = 100;
const sensorPort = "S1";
var oldStyleVar = "Hello EV3";

motorSpeed = 50; // Valido
// sensorPort = "S2"; // Errore: non si può riassegnare una const

console.log(motorSpeed);
console.log(sensorPort);
>>>>>>> 760d5bd66d3e244e5fd0e53c590d3de7a57c93ff
```

## Tipi di Dati Primitivi

JavaScript ha diversi tipi di dati primitivi:

<<<<<<< HEAD
1.  **Number**: Rappresenta sia numeri interi che a virgola mobile.
    ```javascript
    let distanzaCm = 25.5;
    let numeroRotazioni = 3;
    ```

2.  **String**: Rappresenta una sequenza di caratteri, usata per testo.
    ```javascript
    let messaggioDisplay = "Avvio sequenza...";
    let nomeRobot = 'EV3-Alpha';
    ```

3.  **Boolean**: Rappresenta un valore logico, `true` o `false`.
    ```javascript
    let ostacoloRilevato = false;
    let batteriaCarica = true;
    ```

4.  **Undefined**: Una variabile dichiarata ma non inizializzata ha il valore `undefined`.
    ```javascript
    let valoreSensore;
    console.log(valoreSensore); // Output: undefined
=======
1.  **String**: Usato per testo. Può essere racchiuso tra apici singoli (`'...'`), doppi apici (`"..."`), o backtick (`` `...` ``) per i template literal.
    ```javascript
    let message = "Avviare motori";
    let robotName = 'EV3Bot';
    let status = `Il robot ${robotName} è pronto.`;
    console.log(status); // Output: Il robot EV3Bot è pronto.
    ```

2.  **Number**: Usato per numeri interi o decimali.
    ```javascript
    let distance = 25.5; // cm
    let rotationAngle = 90; // gradi
    let batteryLevel = 100; // percentuale
    console.log(distance + rotationAngle); // Output: 115.5
    ```
    Include anche valori speciali come `Infinity`, `-Infinity`, e `NaN` (Not a Number).

3.  **Boolean**: Rappresenta un valore logico, `true` or `false`. Spesso usato nelle strutture di controllo.
    ```javascript
    let isObstacleDetected = true;
    let motorsRunning = false;

    if (isObstacleDetected) {
        console.log("Ostacolo rilevato!");
    } else {
        console.log("Nessun ostacolo.");
    }
    ```

4.  **Undefined**: Una variabile che è stata dichiarata ma non ancora inizializzata ha il valore `undefined`.
    ```javascript
    let sensorValue;
    console.log(sensorValue); // Output: undefined
>>>>>>> 760d5bd66d3e244e5fd0e53c590d3de7a57c93ff
    ```

5.  **Null**: Rappresenta l'assenza intenzionale di un valore oggetto. È diverso da `undefined`.
    ```javascript
<<<<<<< HEAD
    let oggettoBersaglio = null; // Nessun bersaglio specifico al momento
    ```

6.  **Symbol** (ES6+): Un tipo di dato i cui valori sono unici e immutabili. Usato meno frequentemente in scenari EV3 base.

7.  **BigInt** (ES2020+): Per numeri interi arbitrariamente grandi. Usato meno frequentemente in scenari EV3 base.

## Verifica del Tipo di Dato (`typeof`)

L'operatore `typeof` restituisce una stringa che indica il tipo di un operando.

```javascript
let velocita = 50;
let nome = "EV3";
let attivo = true;

console.log(typeof velocita); // "number"
console.log(typeof nome);     // "string"
console.log(typeof attivo);   // "boolean"
```

## Importanza per EV3

Comprendere i tipi di dati è cruciale quando si programmazione l'EV3:

-   **Sensori**: I dati letti dai sensori (es. distanza, colore, luce) saranno tipicamente numeri.
-   **Motori**: I comandi ai motori (es. velocità, gradi di rotazione) richiedono numeri.
-   **Display**: Mostrare messaggi sul display dell'EV3 coinvolge stringhe.
-   **Logica Condizionale**: Le decisioni (es. se un sensore rileva un ostacolo) si basano su valori booleani.

Una gestione accurata dei tipi di dati previene errori e rende il comportamento del robot prevedibile.

## Conclusione

Questa revisione dei tipi di dati primitivi e delle variabili pone le basi per comprendere come JavaScript gestisce le informazioni. Nel prossimo capitolo, esploreremo gli **Array**, una struttura dati fondamentale per gestire collezioni di dati.

---

[⬅️ Torna all'elenco delle Guide](./README.md) | [➡️ Vai alla Guida Successiva: Array](./02-Array.md)
=======
    let currentTask = null; // Il robot non ha un compito assegnato
    console.log(currentTask); // Output: null
    ```

6.  **Symbol** (introdotto in ES6): Un tipo di dato i cui valori sono unici e immutabili. Utile per creare identificatori unici per le proprietà degli oggetti.
    ```javascript
    const id = Symbol('robotId');
    let robot = {
        [id]: 12345
    };
    console.log(robot[id]); // Output: 12345
    ```

7.  **BigInt** (introdotto in ES2020): Usato per rappresentare numeri interi arbitrariamente grandi, oltre il limite di `Number`.
    ```javascript
    const veryLargeNumber = 1234567890123456789012345678901234567890n;
    console.log(veryLargeNumber);
    ```

## Controllo del Tipo (`typeof`)

L'operatore `typeof` può essere usato per determinare il tipo di una variabile.

```javascript
console.log(typeof "Ciao EV3");   // "string"
console.log(typeof 100);          // "number"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof null);         // "object" (questo è un bug storico di JavaScript)
console.log(typeof Symbol('id')); // "symbol"
console.log(typeof 9007199254740991n); // "bigint"

let myVariable;
console.log(typeof myVariable);   // "undefined"
```

## Applicazione all'EV3

Nella programmazione EV3 con JavaScript:
-   Le **stringhe** possono essere usate per nomi di file audio, messaggi da visualizzare sullo schermo, o porte dei sensori/motori.
-   I **numeri** sono fondamentali per controllare la velocità dei motori, gli angoli di rotazione, le letture dei sensori (distanza, luce, colore), e i tempi di attesa.
-   I **booleani** sono cruciali per la logica decisionale, come verificare se un sensore tattile è premuto o se un colore specifico è stato rilevato.
-   `null` o `undefined` possono indicare che un sensore non è connesso o non ha ancora fornito una lettura valida.

Comprendere questi tipi di dati è il primo passo per poter poi costruire strutture dati più complesse come array e oggetti, che saranno trattati nelle prossime guide.
>>>>>>> 760d5bd66d3e244e5fd0e53c590d3de7a57c93ff
