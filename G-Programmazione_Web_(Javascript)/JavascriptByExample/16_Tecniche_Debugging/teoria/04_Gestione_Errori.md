# Gestione degli Errori

## Introduzione

La gestione degli errori è una parte fondamentale dello sviluppo JavaScript. Un'efficace strategia di gestione degli errori migliora la robustezza dell'applicazione, facilita il debugging e garantisce una migliore esperienza utente.

## Tipi di Errori in JavaScript

### Errori di Sintassi

Si verificano quando il codice viola le regole grammaticali di JavaScript:

```javascript
// Errore di sintassi: manca la parentesi di chiusura
function somma(a, b {
  return a + b;
}
```

### Errori di Runtime

Si verificano durante l'esecuzione del codice:

```javascript
// ReferenceError: variabile non definita
console.log(variabileNonDefinita);

// TypeError: operazione non valida
const numero = 42;
numero.toUpperCase(); // I numeri non hanno il metodo toUpperCase()

// RangeError: valore fuori intervallo
const arr = new Array(-1); // La dimensione dell'array non può essere negativa
```

### Errori Logici

Il codice viene eseguito senza errori, ma non produce il risultato atteso:

```javascript
// Errore logico: la funzione restituisce sempre 0
function differenza(a, b) {
  return a - a; // Dovrebbe essere a - b
}
```

## Cattura e Gestione degli Errori

### Try...Catch

Il blocco try...catch permette di catturare e gestire gli errori di runtime:

```javascript
try {
  // Codice che potrebbe generare un errore
  const risultato = 10 / 0;
  console.log(risultato);
  
  // Questo codice non verrà eseguito se si verifica un errore sopra
  console.log('Operazione completata');
} catch (errore) {
  // Gestione dell'errore
  console.error('Si è verificato un errore:', errore.message);
} finally {
  // Questo blocco viene sempre eseguito, indipendentemente dagli errori
  console.log('Pulizia risorse...');
}
```

### Proprietà dell'Oggetto Error

L'oggetto `Error` contiene informazioni utili per il debugging:

```javascript
try {
  throw new Error('Errore personalizzato');
} catch (errore) {
  console.error('Messaggio:', errore.message); // Messaggio dell'errore
  console.error('Nome:', errore.name); // Tipo di errore (es. Error, TypeError)
  console.error('Stack:', errore.stack); // Stack trace completo
}
```

### Tipi di Errori Predefiniti

JavaScript fornisce diversi tipi di errori predefiniti:

```javascript
// Errori specifici
try {
  throw new SyntaxError('Errore di sintassi');
  throw new TypeError('Errore di tipo');
  throw new ReferenceError('Riferimento non valido');
  throw new RangeError('Valore fuori intervallo');
  throw new URIError('URI non valido');
  throw new EvalError('Errore in eval()');
} catch (errore) {
  console.error(`${errore.name}: ${errore.message}`);
}
```

### Errori Personalizzati

È possibile creare classi di errori personalizzati:

```javascript
// Definizione di un errore personalizzato
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

// Utilizzo dell'errore personalizzato
function validaUtente(utente) {
  if (!utente.nome) {
    throw new ValidationError('Campo obbligatorio mancante', 'nome');
  }
  if (!utente.email) {
    throw new ValidationError('Campo obbligatorio mancante', 'email');
  }
  return true;
}

try {
  validaUtente({ nome: 'Mario' }); // Manca l'email
} catch (errore) {
  if (errore instanceof ValidationError) {
    console.error(`Errore di validazione nel campo '${errore.field}': ${errore.message}`);
  } else {
    console.error('Errore generico:', errore.message);
  }
}
```

## Gestione degli Errori Asincroni

### Promise e Catch

```javascript
function fetchDati(url) {
  return fetch(url)
    .then(risposta => {
      if (!risposta.ok) {
        throw new Error(`Errore HTTP: ${risposta.status}`);
      }
      return risposta.json();
    })
    .then(dati => {
      console.log('Dati ricevuti:', dati);
      return dati;
    })
    .catch(errore => {
      console.error('Errore durante il fetch:', errore.message);
      // Gestione dell'errore (es. valore di fallback, retry, ecc.)
      return { error: true, message: errore.message };
    });
}
```

### Async/Await con Try...Catch

```javascript
async function caricaDati() {
  try {
    const risposta = await fetch('/api/dati');
    
    if (!risposta.ok) {
      throw new Error(`Errore HTTP: ${risposta.status}`);
    }
    
    const dati = await risposta.json();
    return dati;
  } catch (errore) {
    console.error('Errore durante il caricamento dei dati:', errore.message);
    // Gestione dell'errore
    return null;
  }
}
```

## Strategie di Gestione degli Errori

### Logging degli Errori

Implementare un sistema di logging degli errori:

```javascript
function logError(errore, contesto = {}) {
  // Informazioni di base
  const errorInfo = {
    message: errore.message,
    name: errore.name,
    stack: errore.stack,
    timestamp: new Date().toISOString(),
    context: contesto
  };
  
  // Log locale
  console.error('ERRORE:', errorInfo);
  
  // In un'applicazione reale, potresti inviare l'errore a un servizio di logging
  // sendToErrorService(errorInfo);
}

try {
  // Codice che potrebbe generare un errore
  throw new Error('Qualcosa è andato storto');
} catch (errore) {
  logError(errore, { 
    pagina: 'homepage', 
    utente: 'utente_123', 
    azione: 'click_bottone' 
  });
}
```

### Gestione Globale degli Errori

```javascript
// Cattura errori non gestiti
window.addEventListener('error', (evento) => {
  console.error('Errore non gestito:', evento.error);
  // Mostra un messaggio all'utente o invia l'errore a un servizio di logging
  evento.preventDefault(); // Impedisce l'azione predefinita del browser
});

// Cattura promise non gestite
window.addEventListener('unhandledrejection', (evento) => {
  console.error('Promise non gestita:', evento.reason);
  evento.preventDefault();
});
```

### Degradazione Graduale

Implementare strategie di fallback per garantire che l'applicazione continui a funzionare anche in caso di errori:

```javascript
function caricaDatiUtente(id) {
  return fetch(`/api/utenti/${id}`)
    .then(risposta => risposta.json())
    .catch(errore => {
      console.error('Impossibile caricare i dati dal server:', errore.message);
      // Fallback: carica dati dalla cache locale
      return caricaDatiDaCache(id) || { id, nome: 'Utente', datiParziali: true };
    });
}
```

## Consigli Pratici

1. **Non ignorare mai gli errori** - Ogni errore dovrebbe essere gestito o registrato
2. **Usa try...catch solo quando necessario** - Non avvolgere tutto il codice in blocchi try...catch
3. **Fornisci messaggi di errore chiari** - Aiuta gli sviluppatori e gli utenti a capire cosa è andato storto
4. **Implementa una strategia di logging** - Registra gli errori in modo strutturato
5. **Considera l'esperienza utente** - Mostra messaggi di errore appropriati all'utente

## Esercizio Pratico

Implementa un sistema di gestione degli errori per una funzione che carica dati da un'API:

1. Gestisci diversi tipi di errori (rete, autenticazione, validazione)
2. Implementa strategie di retry per errori temporanei
3. Fornisci feedback appropriato all'utente
4. Registra gli errori in modo strutturato

## Navigazione

- [Indice del Modulo](../README.md)
- Lezione Precedente: [Breakpoints e Step Debugging](./03_Breakpoints.md)
- Prossima Lezione: [Performance Profiling](./05_Performance_Profiling.md)