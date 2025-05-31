# Teoria 4: Lanciare Errori Personalizzati (throw)

Oltre a gestire gli errori generati automaticamente dal motore JavaScript, è spesso necessario segnalare condizioni di errore specifiche della logica della nostra applicazione. L'istruzione `throw` permette di "lanciare" (o "sollevare") un'eccezione.

Quando un'eccezione viene lanciata con `throw`, l'esecuzione della funzione corrente si interrompe immediatamente (proprio come accadrebbe con un errore di sistema) e il controllo passa al primo blocco `catch` disponibile nella catena di chiamate (call stack).

## Sintassi

La sintassi è semplice:

```javascript
throw espressione;
```

L'`espressione` può essere un valore di qualsiasi tipo, ma è **fortemente raccomandato** lanciare un oggetto `Error` o una sua sottoclasse. Questo perché:

1.  **Standardizzazione**: Gli oggetti `Error` forniscono proprietà standard come `name` e `message`, che gli strumenti di debugging e i blocchi `catch` si aspettano.
2.  **Stack Trace**: Lanciare un oggetto `Error` include automaticamente la traccia dello stack (`stack`), informazione cruciale per identificare l'origine dell'errore.
3.  **Chiarezza**: Rende esplicito che si sta segnalando una condizione di errore.

## Esempi

**Lanciare un oggetto `Error` generico:**

```javascript
function dividi(a, b) {
  if (b === 0) {
    throw new Error("Divisione per zero non consentita");
  }
  return a / b;
}

try {
  let risultato = dividi(10, 0);
  console.log(risultato);
} catch (e) {
  console.error("Errore catturato:", e.message); // Output: Errore catturato: Divisione per zero non consentita
  // console.log(e.stack); // Mostra anche lo stack trace
}
```

**Lanciare un tipo di errore specifico:**

È buona pratica usare i tipi di errore predefiniti quando appropriato, o creare tipi di errore personalizzati.

```javascript
function accediProprieta(obj, prop) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError("Il primo argomento deve essere un oggetto.");
  }
  if (!(prop in obj)) {
    throw new ReferenceError(`La proprietà '${prop}' non esiste nell'oggetto.`);
  }
  return obj[prop];
}

try {
  let valore = accediProprieta({ nome: "Alice" }, "età");
} catch (e) {
  if (e instanceof TypeError) {
    console.error("Errore di tipo:", e.message);
  } else if (e instanceof ReferenceError) {
    console.error("Errore di riferimento:", e.message); // Output: Errore di riferimento: La proprietà 'età' non esiste nell'oggetto.
  } else {
    console.error("Altro errore:", e.message);
  }
}
```

**Creare e lanciare errori personalizzati (Avanzato):**

Per errori specifici del dominio dell'applicazione, si possono creare classi di errore personalizzate ereditando da `Error`.

```javascript
class ErroreValidazione extends Error {
  constructor(messaggio) {
    super(messaggio);
    this.name = "ErroreValidazione";
  }
}

function validaUtente(utente) {
  if (!utente.nome) {
    throw new ErroreValidazione("Il nome utente è obbligatorio.");
  }
  if (utente.eta < 18) {
    throw new ErroreValidazione("L'utente deve essere maggiorenne.");
  }
  console.log("Utente valido:", utente.nome);
}

try {
  validaUtente({ nome: "Bob", eta: 17 });
} catch (e) {
  if (e instanceof ErroreValidazione) {
    console.error("Errore di validazione:", e.message); // Output: Errore di validazione: L'utente deve essere maggiorenne.
  } else {
    console.error("Errore imprevisto:", e);
  }
}
```

## Rilanciare Errori (`re-throwing`)

Un blocco `catch` può decidere di gestire solo certi tipi di errori e rilanciare gli altri che non sa come gestire. Questo permette a blocchi `catch` più in alto nella catena di chiamate di intercettarli.

```javascript
try {
  // ... codice che potrebbe lanciare diversi errori ...
} catch (e) {
  if (e instanceof ErroreValidazione) {
    // Gestisco specificamente questo errore
    console.warn("Problema di validazione:", e.message);
  } else {
    // Non so come gestire altri tipi di errore, li rilancio
    console.error("Errore non gestito qui, rilancio...");
    throw e; // Rilancia l'errore originale
  }
}
```

L'uso corretto di `throw` è fondamentale per segnalare problemi nella logica applicativa e per creare API robuste che comunicano chiaramente le condizioni di fallimento.