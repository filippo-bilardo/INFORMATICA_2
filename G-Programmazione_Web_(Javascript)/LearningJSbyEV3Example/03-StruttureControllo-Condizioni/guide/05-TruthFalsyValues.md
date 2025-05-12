# Guida: Valori Truthy e Falsy in JavaScript

In JavaScript, le condizioni non si limitano a valutare i valori booleani `true` e `false`. Molti altri tipi di valori possono essere implicitamente convertiti in un contesto booleano. Comprendere quali valori sono considerati "truthy" (equivalenti a `true`) e quali sono "falsy" (equivalenti a `false`) è fondamentale per scrivere codice condizionale corretto ed efficiente.

## Valori Falsy

Ci sono un numero limitato di valori in JavaScript che vengono considerati "falsy". Quando incontrati in un contesto booleano (come in un'istruzione `if`, un operatore ternario, o come operandi di operatori logici `&&` e `||`), questi valori si comportano come `false`.

I valori falsy in JavaScript sono:

1.  **`false`**: Il valore booleano `false` stesso.
2.  **`0`**: Il numero zero (sia intero `0` che a virgola mobile `0.0`).
3.  **`-0`**: Il numero zero negativo.
4.  **`""`** o **`''`**: La stringa vuota.
5.  **`null`**: Un valore speciale che rappresenta l'assenza intenzionale di un valore oggetto.
6.  **`undefined`**: Un valore che indica che una variabile non è stata assegnata o una proprietà non esiste.
7.  **`NaN`**: Acronimo di "Not a Number", un valore numerico speciale che rappresenta un risultato indefinito o non rappresentabile di un'operazione aritmetica.
8.  **`document.all`**: Un oggetto legacy specifico del browser (principalmente per compatibilità con vecchie versioni di Internet Explorer). È generalmente sconsigliato fare affidamento su questo comportamento in codice moderno.

**Esempio:**
```javascript
if (0) {
  // Questo blocco non verrà eseguito perché 0 è falsy
  console.log("0 è truthy");
} else {
  console.log("0 è falsy"); // Output: 0 è falsy
}

let nomeUtente = "";
if (nomeUtente) {
  // Questo blocco non verrà eseguito perché "" è falsy
  console.log("Nome utente fornito: " + nomeUtente);
} else {
  console.log("Nome utente non fornito."); // Output: Nome utente non fornito.
}

let valoreMancante = null;
if (valoreMancante) {
  // Non eseguito
} else {
  console.log("Valore mancante è falsy"); // Output: Valore mancante è falsy
}
```

## Valori Truthy

Tutti gli altri valori in JavaScript che non sono nella lista dei falsy sono considerati "truthy". Questo include:

1.  **`true`**: Il valore booleano `true` stesso.
2.  **Numeri diversi da zero**: Qualsiasi numero positivo o negativo (es. `1`, `-10`, `3.14`).
3.  **Stringhe non vuote**: Qualsiasi stringa che contenga almeno un carattere (es. `"hello"`, `"0"`, `"false"` - sì, la stringa `"false"` è truthy!).
4.  **Oggetti**: Tutti gli oggetti, inclusi array e funzioni (anche se vuoti, es. `{}`, `[]`, `function(){}`).
5.  **Simboli**: Valori di tipo `Symbol`.

**Esempio:**
```javascript
if (1) {
  console.log("1 è truthy"); // Output: 1 è truthy
}

if ("testo") {
  console.log("La stringa 'testo' è truthy"); // Output: La stringa 'testo' è truthy
}

if ("false") { // Attenzione: la stringa "false" è truthy!
    console.log("La stringa 'false' è truthy!"); // Output: La stringa 'false' è truthy!
}

if ([]) { // Un array vuoto è truthy
    console.log("Un array vuoto è truthy"); // Output: Un array vuoto è truthy
}

if ({}) { // Un oggetto vuoto è truthy
    console.log("Un oggetto vuoto è truthy"); // Output: Un oggetto vuoto è truthy
}

function miaFunzione() {}
if (miaFunzione) { // Una funzione è truthy
    console.log("Una funzione è truthy"); // Output: Una funzione è truthy
}
```

## Implicazioni con EV3

Comprendere truthy e falsy è importante quando si lavora con gli input dei sensori EV3 o si gestiscono variabili che potrebbero non avere sempre un valore definito.

**Esempio con EV3:**

```javascript
// Supponiamo di leggere un valore da un sensore che potrebbe essere 0
let letturaSensore = sensors.generic.readPercentage(); // Potrebbe restituire 0

if (letturaSensore) { // Se letturaSensore è 0 (falsy), questo blocco non viene eseguito
  brick.showString("Lettura sensore: " + letturaSensore, 1);
  // Esegui azioni basate su una lettura valida (non zero)
  motors.largeA.run(letturaSensore); // Se 0, il motore non si muove o si ferma
} else {
  brick.showString("Lettura sensore nulla o zero.", 1);
  motors.largeA.stop();
}

// Controllo di una stringa di comando
let comandoRicevuto = getComandoEsterno(); // Funzione fittizia che potrebbe restituire "" o null

if (comandoRicevuto) { // Se comandoRicevuto è "" (falsy) o null (falsy)
  brick.showString("Comando: " + comandoRicevuto, 2);
  // Processa il comando
} else {
  brick.showString("Nessun comando ricevuto.", 2);
}
```

## Utilizzo con Operatori Logici

I valori truthy e falsy sono particolarmente rilevanti con gli operatori logici `&&` (AND) e `||` (OR).

-   **`espressione1 && espressione2`**: Se `espressione1` è falsy, restituisce `espressione1` senza valutare `espressione2`. Altrimenti, restituisce `espressione2`.
-   **`espressione1 || espressione2`**: Se `espressione1` è truthy, restituisce `espressione1` senza valutare `espressione2`. Altrimenti, restituisce `espressione2`.

Questo comportamento è utile per fornire valori predefiniti:

```javascript
let nomeConfigurato = null;
let nomeDefault = "Utente EV3";

let nomeDaUsare = nomeConfigurato || nomeDefault;
console.log(nomeDaUsare); // Output: Utente EV3 (perché nomeConfigurato è null, falsy)

let velocitaInput = 0; // Falsy
let velocitaMinima = 10;

// Attenzione qui: se velocitaInput è 0 (valido ma falsy), userà velocitaMinima
let velocitaEffettiva = velocitaInput || velocitaMinima;
console.log(velocitaEffettiva); // Output: 10

// Per gestire 0 come valore valido, si può usare l'operatore nullish coalescing (??) (ES2020+)
// o un controllo esplicito:
let velocitaEffettivaCorretta = (velocitaInput !== null && velocitaInput !== undefined) ? velocitaInput : velocitaMinima;
// Oppure, se si sa che 0 è un input possibile e valido:
if (typeof velocitaInput === 'number') {
    velocitaEffettivaCorretta = velocitaInput;
} else {
    velocitaEffettivaCorretta = velocitaMinima;
}
console.log(velocitaEffettivaCorretta); // Se velocitaInput è 0, output: 0
```

## Conclusione

La distinzione tra valori truthy e falsy è un concetto chiave in JavaScript. Permette di scrivere codice condizionale più flessibile e conciso. Tuttavia, è importante essere consapevoli di quali valori sono falsy per evitare bug, specialmente quando si gestiscono input che potrebbero essere `0`, stringhe vuote, `null` o `undefined`.

---

[⬅️ Torna alle Guide del Modulo 03](./README.md) | [🔙 Torna al Modulo 03](../README.md) | [🏠 Torna alla Home del Corso](../../README.md)