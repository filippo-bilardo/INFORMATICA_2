# Gestione degli errori in JSON

## Errori comuni nel parsing JSON

Lavorare con JSON può portare a diversi tipi di errori, specialmente durante il parsing di stringhe JSON. Ecco i più comuni:

1. **Errori di sintassi**: La stringa JSON non è formattata correttamente
2. **Tipi di dati non validi**: Tentativo di convertire in JSON tipi di dati non supportati
3. **Riferimenti circolari**: Oggetti che contengono riferimenti a se stessi
4. **Dati mancanti o malformati**: Dati JSON incompleti o danneggiati

## Gestione degli errori con try-catch

Il modo più comune per gestire gli errori durante il parsing JSON è utilizzare un blocco try-catch:

```javascript
// Esempio di gestione errori con try-catch
try {
  // Tentativo di parsing di una stringa JSON
  const dati = JSON.parse(stringaJSON);
  console.log("Parsing completato con successo:", dati);
} catch (errore) {
  console.error("Errore durante il parsing JSON:", errore.message);
  // Gestione dell'errore (es. mostrare un messaggio all'utente, usare valori predefiniti, ecc.)
}
```

## Errori comuni con JSON.parse()

### Sintassi JSON non valida

```javascript
try {
  // Stringa JSON con sintassi non valida (virgola in eccesso)
  const jsonNonValido = '{"nome":"Mario","età":30,}';
  const dati = JSON.parse(jsonNonValido);
} catch (errore) {
  console.error(errore.message);
  // Output: "Unexpected token } in JSON at position 23"
}

try {
  // Stringa JSON con virgolette singole (non valide in JSON)
  const jsonNonValido = "{'nome':'Mario'}";
  const dati = JSON.parse(jsonNonValido);
} catch (errore) {
  console.error(errore.message);
  // Output: "Unexpected token ' in JSON at position 1"
}
```

### Input non valido

```javascript
try {
  // Tentativo di parsing di un valore undefined
  const dati = JSON.parse(undefined);
} catch (errore) {
  console.error(errore.message);
  // Output: "Unexpected token u in JSON at position 0"
}

try {
  // Tentativo di parsing di un valore null
  const dati = JSON.parse(null);
} catch (errore) {
  console.error(errore.message);
  // Output: "Unexpected token u in JSON at position 0" o simile
}
```

## Errori comuni con JSON.stringify()

### Riferimenti circolari

```javascript
try {
  // Creazione di un oggetto con riferimento circolare
  const oggetto = { nome: "Oggetto" };
  oggetto.riferimento = oggetto; // Riferimento a se stesso
  
  // Tentativo di stringifica
  const jsonString = JSON.stringify(oggetto);
} catch (errore) {
  console.error(errore.message);
  // Output: "Converting circular structure to JSON"
}
```

### Valori non serializzabili

```javascript
// Alcuni valori vengono gestiti in modo speciale o ignorati
const dati = {
  funzione: function() { return "Ciao"; },
  simbolo: Symbol("simbolo"),
  undefined: undefined,
  regExp: /pattern/g,
  normale: "Questo è un valore normale"
};

const jsonString = JSON.stringify(dati);
console.log(jsonString);
// Output: '{"normale":"Questo è un valore normale","regExp":{}}'
// Nota: funzione, simbolo e undefined sono stati omessi
```

## Strategie di gestione degli errori

### Validazione preventiva

Validare i dati prima di tentare il parsing può prevenire molti errori:

```javascript
function parseJSONSicuro(stringa) {
  // Verifica che l'input sia una stringa non vuota
  if (typeof stringa !== 'string' || stringa.trim() === '') {
    return null; // o un valore predefinito
  }
  
  try {
    return JSON.parse(stringa);
  } catch (errore) {
    console.error("Errore di parsing JSON:", errore.message);
    return null; // o un valore predefinito
  }
}

// Utilizzo
const dati = parseJSONSicuro(inputUtente);
if (dati) {
  // Procedi con i dati validi
} else {
  // Gestisci il caso di dati non validi
}
```

### Gestione di riferimenti circolari

Per gestire riferimenti circolari durante la stringifica, è possibile utilizzare un approccio personalizzato:

```javascript
function stringifyConRiferimenti(obj) {
  const cache = new Set();
  
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      // Verifica se l'oggetto è già stato incontrato
      if (cache.has(value)) {
        return '[Riferimento Circolare]';
      }
      cache.add(value);
    }
    return value;
  });
}

// Utilizzo
const oggetto = { nome: "Oggetto" };
oggetto.riferimento = oggetto;

const jsonString = stringifyConRiferimenti(oggetto);
console.log(jsonString);
// Output: '{"nome":"Oggetto","riferimento":"[Riferimento Circolare]"}';
```

### Gestione di tipi di dati personalizzati

Per gestire tipi di dati non supportati nativamente da JSON, come Date o Set:

```javascript
// Stringifica con supporto per Date e Set
function stringifyAvanzato(obj) {
  return JSON.stringify(obj, (key, value) => {
    // Gestione delle date
    if (value instanceof Date) {
      return { __tipo: 'Data', valore: value.toISOString() };
    }
    // Gestione dei Set
    if (value instanceof Set) {
      return { __tipo: 'Set', valore: Array.from(value) };
    }
    return value;
  });
}

// Parsing con supporto per Date e Set
function parseAvanzato(jsonString) {
  return JSON.parse(jsonString, (key, value) => {
    // Ricostruzione delle date
    if (value && value.__tipo === 'Data') {
      return new Date(value.valore);
    }
    // Ricostruzione dei Set
    if (value && value.__tipo === 'Set') {
      return new Set(value.valore);
    }
    return value;
  });
}

// Utilizzo
const dati = {
  nome: "Evento",
  data: new Date(),
  partecipanti: new Set(["Mario", "Laura", "Giovanni"])
};

const jsonString = stringifyAvanzato(dati);
console.log(jsonString);

const datiRecuperati = parseAvanzato(jsonString);
console.log(datiRecuperati.data instanceof Date); // true
console.log(datiRecuperati.partecipanti instanceof Set); // true
```

## Best practices per la gestione degli errori

1. **Usa sempre try-catch**: Racchiudi sempre le operazioni JSON.parse() in blocchi try-catch

2. **Valida l'input**: Verifica che l'input sia una stringa valida prima di tentare il parsing

3. **Fornisci valori predefiniti**: In caso di errore, utilizza valori predefiniti o strutture dati vuote

4. **Registra gli errori**: Registra gli errori per il debugging, ma evita di esporre dettagli tecnici agli utenti

5. **Implementa strategie di retry**: Per le operazioni di rete, implementa strategie di retry con backoff esponenziale

6. **Usa librerie specializzate**: Per casi complessi, considera l'utilizzo di librerie come `json-bigint` per numeri grandi o `flatted` per riferimenti circolari

Una corretta gestione degli errori è fondamentale quando si lavora con JSON, specialmente in applicazioni che interagiscono con API esterne o elaborano dati forniti dagli utenti. Nella prossima sezione, confronteremo JSON con XML e discuteremo i vantaggi e gli svantaggi di ciascun formato.