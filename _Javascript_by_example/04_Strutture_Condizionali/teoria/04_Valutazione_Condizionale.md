# Valutazione Condizionale in JavaScript

La valutazione condizionale in JavaScript va oltre le strutture di controllo di base come `if...else` e `switch`. JavaScript offre diversi meccanismi per valutare condizioni in modo conciso ed efficace, sfruttando caratteristiche come i valori truthy/falsy e gli operatori di cortocircuito.

## Valori Truthy e Falsy

In JavaScript, quando un valore viene utilizzato in un contesto booleano (come in una condizione `if`), viene automaticamente convertito in un valore booleano. I valori che si convertono in `false` sono detti "falsy", mentre quelli che si convertono in `true` sono detti "truthy".

### Valori Falsy

In JavaScript, solo sei valori sono considerati falsy:

- `false`
- `0` (zero numerico)
- `""` (stringa vuota)
- `null`
- `undefined`
- `NaN` (Not a Number)

### Valori Truthy

Tutti gli altri valori sono considerati truthy, inclusi:

- Qualsiasi numero diverso da 0 (inclusi numeri negativi e infinito)
- Qualsiasi stringa non vuota, incluso `"0"` e `"false"`
- Tutti gli oggetti, inclusi array vuoti `[]` e oggetti vuoti `{}`
- Tutte le funzioni
- Il valore booleano `true`

### Esempi

```javascript
// Valori falsy in condizioni
if (false)       { /* non eseguito */ }
if (0)           { /* non eseguito */ }
if ("")          { /* non eseguito */ }
if (null)        { /* non eseguito */ }
if (undefined)   { /* non eseguito */ }
if (NaN)         { /* non eseguito */ }

// Valori truthy in condizioni
if (true)        { /* eseguito */ }
if (1)           { /* eseguito */ }
if ("hello")     { /* eseguito */ }
if ([])          { /* eseguito */ }
if ({})          { /* eseguito */ }
if (function(){}) { /* eseguito */ }
```

## Operatori di Cortocircuito

Gli operatori logici `&&` (AND) e `||` (OR) in JavaScript utilizzano la valutazione di cortocircuito, il che significa che possono restituire il valore di uno degli operandi, non necessariamente un valore booleano.

### Operatore OR (||)

L'operatore `||` restituisce il primo valore truthy che incontra o l'ultimo valore se tutti sono falsy.

```javascript
let a = 0 || "" || null || undefined || "valore predefinito" || 42;
console.log(a);  // Output: "valore predefinito"

let b = "primo" || "secondo" || "terzo";
console.log(b);  // Output: "primo"

let c = 0 || "" || null || undefined || false;
console.log(c);  // Output: false (l'ultimo valore, poiché tutti sono falsy)
```

#### Caso d'uso: Valori Predefiniti

```javascript
function saluta(nome) {
  // Se nome è undefined, null, o stringa vuota, usa "Ospite"
  nome = nome || "Ospite";
  return `Ciao, ${nome}!`;
}

console.log(saluta("Mario"));  // Output: "Ciao, Mario!"
console.log(saluta(""));       // Output: "Ciao, Ospite!"
console.log(saluta());         // Output: "Ciao, Ospite!"
```

### Operatore AND (&&)

L'operatore `&&` restituisce il primo valore falsy che incontra o l'ultimo valore se tutti sono truthy.

```javascript
let a = "primo" && "secondo" && "terzo" && "quarto";
console.log(a);  // Output: "quarto"

let b = "primo" && 0 && "terzo";
console.log(b);  // Output: 0

let c = null && "secondo";
console.log(c);  // Output: null
```

#### Caso d'uso: Esecuzione Condizionale

```javascript
let utente = { nome: "Mario", ruolo: "admin" };

// Esegue la funzione solo se utente esiste e il ruolo è "admin"
utente && utente.ruolo === "admin" && mostraControlliAdmin();

// Equivalente a:
if (utente && utente.ruolo === "admin") {
  mostraControlliAdmin();
}
```

## Operatore di Coalescenza Nulla (??)

Introdotto in ES2020, l'operatore di coalescenza nulla (`??`) restituisce l'operando di destra solo se l'operando di sinistra è `null` o `undefined`, altrimenti restituisce l'operando di sinistra.

```javascript
let a = null ?? "valore predefinito";
console.log(a);  // Output: "valore predefinito"

let b = undefined ?? "valore predefinito";
console.log(b);  // Output: "valore predefinito"

let c = 0 ?? "valore predefinito";
console.log(c);  // Output: 0 (a differenza di ||, 0 non è considerato "mancante")

let d = "" ?? "valore predefinito";
console.log(d);  // Output: "" (a differenza di ||, "" non è considerato "mancante")
```

### Differenza tra ?? e ||

La principale differenza è che `||` restituisce il valore di destra se il valore di sinistra è qualsiasi valore falsy, mentre `??` lo fa solo se il valore di sinistra è `null` o `undefined`.

```javascript
// Con ||
let conteggio = 0;
let risultato = conteggio || "Nessun conteggio";
console.log(risultato);  // Output: "Nessun conteggio" (0 è falsy)

// Con ??
let conteggio = 0;
let risultato = conteggio ?? "Nessun conteggio";
console.log(risultato);  // Output: 0 (0 non è null o undefined)
```

## Operatore di Assegnazione con Coalescenza Nulla (??=)

Introdotto in ES2021, l'operatore `??=` assegna il valore di destra alla variabile di sinistra solo se quest'ultima è `null` o `undefined`.

```javascript
let a = null;
a ??= "valore predefinito";
console.log(a);  // Output: "valore predefinito"

let b = "valore esistente";
b ??= "valore predefinito";
console.log(b);  // Output: "valore esistente"
```

## Operatore di Concatenazione Opzionale (?.) 

Introdotto in ES2020, l'operatore di concatenazione opzionale (`?.`) permette di leggere il valore di una proprietà situata in profondità all'interno di una catena di oggetti senza dover verificare esplicitamente che ogni riferimento nella catena sia valido.

```javascript
let utente = {
  nome: "Mario",
  indirizzo: {
    città: "Roma",
    cap: "00100"
  }
};

// Accesso sicuro a proprietà annidate
let città = utente?.indirizzo?.città;
console.log(città);  // Output: "Roma"

// Se un riferimento è null o undefined, l'espressione restituisce undefined
let paese = utente?.indirizzo?.paese;
console.log(paese);  // Output: undefined

// Funziona anche con metodi
utente.saluta?.();  // Non genera errore se saluta non esiste

// E con accesso agli elementi di array
let primoHobby = utente.hobby?.[0];  // undefined se hobby non esiste
```

### Combinazione con l'Operatore di Coalescenza Nulla

```javascript
let utente = { nome: "Mario" };

// Accesso sicuro con valore predefinito
let città = utente?.indirizzo?.città ?? "Sconosciuta";
console.log(città);  // Output: "Sconosciuta"
```

## Pattern di Valutazione Condizionale

### Assegnazione Condizionale

```javascript
// Assegnazione basata su una condizione
let stato = età >= 18 ? "adulto" : "minorenne";

// Assegnazione con valore predefinito
let nome = inputUtente || "Ospite";

// Assegnazione solo se null o undefined
let username = inputUsername ?? "user_" + Math.random().toString(36).substr(2, 9);
```

### Esecuzione Condizionale

```javascript
// Esecuzione se la condizione è vera
èAdmin && mostraControlliAdmin();

// Esecuzione se la condizione è falsa
èLoggato || mostraFormLogin();

// Esecuzione con accesso sicuro
utente?.metodi?.inizializza?.();
```

### Selezione tra Alternative

```javascript
// Selezione tra più alternative
let messaggio = 
  èErrore ? "Si è verificato un errore" :
  èAvviso ? "Attenzione!" :
  èSuccesso ? "Operazione completata con successo" :
  "Stato sconosciuto";

// Alternativa con oggetto di mappatura
const messaggi = {
  errore: "Si è verificato un errore",
  avviso: "Attenzione!",
  successo: "Operazione completata con successo",
  default: "Stato sconosciuto"
};

let messaggio = messaggi[stato] || messaggi.default;
```

## Best Practices

1. **Usa l'operatore di coalescenza nulla per valori predefiniti**: Quando vuoi un valore predefinito solo per `null` o `undefined`, usa `??` invece di `||`.

```javascript
// Meglio di || per valori numerici che potrebbero essere 0
let quantità = inputQuantità ?? 1;
```

2. **Usa l'operatore di concatenazione opzionale per accessi sicuri**: Quando accedi a proprietà annidate che potrebbero non esistere, usa `?.` per evitare errori.

```javascript
// Più conciso e sicuro di controlli annidati
let città = utente?.indirizzo?.città;
```

3. **Combina operatori per pattern potenti**: La combinazione di operatori come `?.` e `??` può creare pattern di accesso sicuro con valori predefiniti.

```javascript
let città = utente?.indirizzo?.città ?? "Sconosciuta";
```

4. **Attenzione alla leggibilità**: Sebbene questi operatori possano rendere il codice più conciso, un uso eccessivo può ridurne la leggibilità. Bilancia concisione e chiarezza.

```javascript
// Potrebbe essere difficile da leggere
let risultato = a?.b?.c?.d || e?.f?.g || h?.i?.j ?? "predefinito";

// Più leggibile
let risultatoABCD = a?.b?.c?.d;
let risultatoEFG = e?.f?.g;
let risultatoHIJ = h?.i?.j;
let risultato = risultatoABCD || risultatoEFG || risultatoHIJ ?? "predefinito";
```

5. **Usa commenti per spiegare logiche complesse**: Se utilizzi pattern di valutazione condizionale complessi, aggiungi commenti per spiegare l'intento.

```javascript
// Seleziona il primo valore disponibile nell'ordine: locale, sessione, predefinito
let preferenza = 
  localStorage.getItem("preferenza") || // Prima scelta: preferenza locale
  sessionStorage.getItem("preferenza") || // Seconda scelta: preferenza di sessione
  impostazioniPredefinite.preferenza; // Ultima risorsa: predefinito
```

[Torna all'indice](../README.md#contenuti-teorici) | [Vai al precedente: Operatore Ternario](./03_Operatore_Ternario.md) | [Vai al successivo: Pattern Matching e Destructuring](./05_Pattern_Matching.md)