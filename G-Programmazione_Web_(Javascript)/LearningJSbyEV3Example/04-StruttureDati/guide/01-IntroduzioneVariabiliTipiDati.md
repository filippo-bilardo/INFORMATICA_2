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
```

## Tipi di Dati Primitivi

JavaScript ha diversi tipi di dati primitivi:

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
    ```

5.  **Null**: Rappresenta l'assenza intenzionale di un valore oggetto. È diverso da `undefined`.
    ```javascript
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