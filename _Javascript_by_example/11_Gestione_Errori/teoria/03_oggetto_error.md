# Teoria 3: L'Oggetto Error

Quando si verifica un errore in JavaScript (sia esso generato dal motore JavaScript stesso o lanciato manualmente tramite `throw`), viene creato un oggetto che rappresenta quell'errore. La classe base per questi oggetti è `Error`. Esistono anche diverse classi di errore predefinite che ereditano da `Error`, ognuna rappresentante un tipo specifico di errore.

## Proprietà Standard dell'Oggetto `Error`

Gli oggetti `Error` (e le loro sottoclassi) hanno tipicamente le seguenti proprietà standard:

1.  **`name`**: Una stringa che indica il tipo o la classe dell'errore. Per un oggetto `Error` generico, il valore è `"Error"`. Per le sottoclassi, sarà il nome della sottoclasse (es. `"ReferenceError"`, `"TypeError"`).
2.  **`message`**: Una stringa leggibile dall'uomo che descrive l'errore specifico che si è verificato. Questo è il messaggio che di solito viene passato al costruttore dell'errore.

```javascript
try {
  throw new Error("Qualcosa è andato storto!");
} catch (e) {
  console.log(e.name);    // Output: Error
  console.log(e.message); // Output: Qualcosa è andato storto!
}
```

## Proprietà Non Standard Comuni

Oltre alle proprietà standard, molti ambienti JavaScript (come i browser moderni e Node.js) aggiungono proprietà non standard ma estremamente utili:

*   **`stack`**: Una stringa che contiene la traccia dello stack (stack trace) al momento della creazione dell'errore. Mostra la sequenza di chiamate di funzione che hanno portato al punto in cui l'errore è stato generato. È fondamentale per il debugging.

```javascript
function funzioneA() {
  funzioneB();
}

function funzioneB() {
  try {
    throw new Error("Errore in funzione B");
  } catch (e) {
    console.log(e.stack);
    /* Output (esempio, può variare leggermente):
       Error: Errore in funzione B
           at funzioneB (file:///path/to/script.js:10:11)
           at funzioneA (file:///path/to/script.js:6:3)
           at file:///path/to/script.js:14:1
    */
  }
}

funzioneA();
```

## Tipi di Errore Predefiniti

JavaScript definisce diverse classi di errore integrate che ereditano da `Error`. Utilizzare il tipo di errore appropriato rende il codice più chiaro e facilita la gestione specifica degli errori:

*   **`SyntaxError`**: Errore nella sintassi del codice che impedisce al motore JavaScript di interpretarlo correttamente (es. parentesi mancante, parola chiave errata).
*   **`ReferenceError`**: Si verifica quando si tenta di accedere a una variabile che non è stata dichiarata.
    ```javascript
    try { let x = y; } catch (e) { console.log(e.name); } // ReferenceError
    ```
*   **`TypeError`**: Si verifica quando un valore non è del tipo atteso per un'operazione (es. chiamare come funzione qualcosa che non è una funzione, accedere a proprietà di `null` o `undefined`).
    ```javascript
    try { null.f(); } catch (e) { console.log(e.name); } // TypeError
    ```
*   **`RangeError`**: Si verifica quando un valore numerico è al di fuori dell'intervallo consentito (es. dimensione non valida per un Array).
    ```javascript
    try { new Array(-1); } catch (e) { console.log(e.name); } // RangeError
    ```
*   **`URIError`**: Si verifica quando si utilizzano in modo errato le funzioni globali di gestione degli URI (es. `decodeURIComponent()`).
*   **`EvalError`**: (Raramente usato nel codice moderno) Errore relativo alla funzione globale `eval()`.
*   **`InternalError`**: (Non standard, specifico di alcuni motori come Firefox) Indica un errore interno nel motore JavaScript (es. stack overflow per troppa ricorsione).

È possibile controllare il tipo di errore nel blocco `catch` usando l'operatore `instanceof`:

```javascript
try {
  // ... codice ...
} catch (e) {
  if (e instanceof TypeError) {
    console.error("Errore di tipo:", e.message);
  } else if (e instanceof ReferenceError) {
    console.error("Errore di riferimento:", e.message);
  } else {
    console.error("Errore generico:", e.message);
  }
}
```

Comprendere l'oggetto `Error` e i suoi sottotipi è fondamentale per analizzare e gestire efficacemente gli errori nelle applicazioni JavaScript.