# Pattern Matching e Destructuring in JavaScript

Il pattern matching e il destructuring sono tecniche avanzate in JavaScript che permettono di estrarre dati da strutture complesse e di eseguire operazioni condizionali basate sulla forma dei dati. Queste tecniche rendono il codice più conciso, espressivo e manutenibile.

## Destructuring Assignment

Il destructuring assignment è una sintassi che permette di "spacchettare" valori da array o proprietà da oggetti in variabili distinte.

### Destructuring di Array

```javascript
// Sintassi base
let [a, b] = [1, 2];
console.log(a);  // 1
console.log(b);  // 2

// Saltare elementi
let [a, , c] = [1, 2, 3];
console.log(a);  // 1
console.log(c);  // 3

// Rest pattern
let [a, ...resto] = [1, 2, 3, 4];
console.log(a);      // 1
console.log(resto);  // [2, 3, 4]

// Valori predefiniti
let [a, b, c = 3] = [1, 2];
console.log(c);  // 3

// Scambio di variabili
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a);  // 2
console.log(b);  // 1
```

### Destructuring di Oggetti

```javascript
// Sintassi base
let { nome, età } = { nome: "Mario", età: 30, città: "Roma" };
console.log(nome);  // "Mario"
console.log(età);   // 30

// Rinominare variabili
let { nome: n, età: e } = { nome: "Mario", età: 30 };
console.log(n);  // "Mario"
console.log(e);  // 30

// Valori predefiniti
let { nome, età, città = "Sconosciuta" } = { nome: "Mario", età: 30 };
console.log(città);  // "Sconosciuta"

// Combinare rinomina e valori predefiniti
let { nome: n = "Anonimo", ruolo: r = "Utente" } = { nome: "Mario" };
console.log(n);  // "Mario"
console.log(r);  // "Utente"

// Rest pattern
let { nome, ...resto } = { nome: "Mario", età: 30, città: "Roma" };
console.log(nome);   // "Mario"
console.log(resto);  // { età: 30, città: "Roma" }
```

### Destructuring Annidato

```javascript
// Destructuring di strutture annidate
let utente = {
  nome: "Mario",
  età: 30,
  indirizzo: {
    città: "Roma",
    cap: "00100"
  },
  hobby: ["calcio", "lettura", "viaggi"]
};

// Estrarre proprietà annidate
let { nome, indirizzo: { città }, hobby: [primoHobby] } = utente;
console.log(nome);        // "Mario"
console.log(città);       // "Roma"
console.log(primoHobby);  // "calcio"
```

## Destructuring nei Parametri di Funzione

Il destructuring può essere utilizzato nei parametri di funzione per estrarre valori dagli argomenti.

```javascript
// Destructuring di oggetti nei parametri
function saluta({ nome, età }) {
  console.log(`Ciao, ${nome}! Hai ${età} anni.`);
}

saluta({ nome: "Mario", età: 30 });  // "Ciao, Mario! Hai 30 anni."

// Con valori predefiniti
function configura({ tema = "chiaro", lingua = "it", notifiche = true }) {
  console.log(`Tema: ${tema}, Lingua: ${lingua}, Notifiche: ${notifiche}`);
}

configura({ tema: "scuro" });  // "Tema: scuro, Lingua: it, Notifiche: true"
configura({});                  // "Tema: chiaro, Lingua: it, Notifiche: true"

// Parametro opzionale con destructuring
function configura({ tema = "chiaro", lingua = "it" } = {}) {
  console.log(`Tema: ${tema}, Lingua: ${lingua}`);
}

configura();  // "Tema: chiaro, Lingua: it"
```

## Pattern Matching con Destructuring

Il destructuring può essere combinato con istruzioni condizionali per implementare una forma di pattern matching.

### Pattern Matching in Condizioni

```javascript
// Controllo della forma di un oggetto
function processaRisposta(risposta) {
  if (risposta && risposta.stato === "successo" && risposta.dati) {
    // Destructuring solo se la condizione è soddisfatta
    const { dati: { id, nome } } = risposta;
    console.log(`Elaborazione dati: ${id} - ${nome}`);
  } else if (risposta && risposta.stato === "errore" && risposta.errore) {
    const { errore: { codice, messaggio } } = risposta;
    console.log(`Errore ${codice}: ${messaggio}`);
  } else {
    console.log("Formato risposta non riconosciuto");
  }
}

processaRisposta({ 
  stato: "successo", 
  dati: { id: 123, nome: "Prodotto A" } 
});
// Output: "Elaborazione dati: 123 - Prodotto A"

processaRisposta({ 
  stato: "errore", 
  errore: { codice: 404, messaggio: "Risorsa non trovata" } 
});
// Output: "Errore 404: Risorsa non trovata"
```

### Pattern Matching con Try/Catch

```javascript
function processaDati(dati) {
  try {
    // Tenta di fare destructuring, genera errore se la struttura non corrisponde
    const { utenti: [{ id, nome }] } = dati;
    return `Utente trovato: ${nome} (ID: ${id})`;
  } catch (error) {
    return "Struttura dati non valida";
  }
}

console.log(processaDati({ utenti: [{ id: 1, nome: "Mario" }] }));
// Output: "Utente trovato: Mario (ID: 1)"

console.log(processaDati({ altriDati: [] }));
// Output: "Struttura dati non valida"
```

## Simulazione di Pattern Matching con Oggetti

JavaScript non ha un vero e proprio pattern matching come altri linguaggi (ad esempio Rust o Haskell), ma è possibile simularlo usando oggetti e funzioni.

```javascript
// Simulazione di pattern matching con oggetti
function gestisciEvento(evento) {
  const handlers = {
    "click": ({ target, x, y }) => {
      console.log(`Click su ${target} alle coordinate (${x}, ${y})`);
    },
    "keypress": ({ key, ctrlKey, shiftKey }) => {
      console.log(`Tasto ${key} premuto${ctrlKey ? " con Ctrl" : ""}${shiftKey ? " con Shift" : ""}`);
    },
    "load": ({ timestamp }) => {
      console.log(`Caricamento completato alle ${new Date(timestamp).toLocaleTimeString()}`);
    },
    "default": () => {
      console.log("Evento non gestito");
    }
  };

  // Seleziona l'handler appropriato o usa quello predefinito
  const handler = handlers[evento.tipo] || handlers.default;
  handler(evento);
}

gestisciEvento({ tipo: "click", target: "button", x: 100, y: 200 });
// Output: "Click su button alle coordinate (100, 200)"

gestisciEvento({ tipo: "keypress", key: "Enter", ctrlKey: true, shiftKey: false });
// Output: "Tasto Enter premuto con Ctrl"

gestisciEvento({ tipo: "sconosciuto" });
// Output: "Evento non gestito"
```

## Destructuring con Validazione

È possibile combinare destructuring e validazione per garantire che i dati abbiano la struttura attesa.

```javascript
function elaboraOrdine(ordine) {
  // Destructuring con validazione
  const { 
    id, 
    cliente: { nome, email }, 
    prodotti, 
    totale 
  } = ordine;

  // Validazione post-destructuring
  if (!id || typeof id !== "number") {
    throw new Error("ID ordine non valido");
  }

  if (!nome || !email || !email.includes("@")) {
    throw new Error("Dati cliente non validi");
  }

  if (!Array.isArray(prodotti) || prodotti.length === 0) {
    throw new Error("Elenco prodotti non valido");
  }

  if (typeof totale !== "number" || totale <= 0) {
    throw new Error("Totale non valido");
  }

  // Procedi con l'elaborazione
  console.log(`Ordine ${id} di ${nome} elaborato. Totale: €${totale}`);
}

try {
  elaboraOrdine({
    id: 12345,
    cliente: { nome: "Mario Rossi", email: "mario@example.com" },
    prodotti: [{ id: 1, nome: "Prodotto A", prezzo: 29.99 }],
    totale: 29.99
  });
  // Output: "Ordine 12345 di Mario Rossi elaborato. Totale: €29.99"
} catch (error) {
  console.error(error.message);
}
```

## Best Practices

1. **Usa il destructuring per estrarre proprietà comuni**: Il destructuring rende il codice più conciso quando devi accedere a più proprietà di un oggetto.

```javascript
// Invece di
const nome = utente.nome;
const email = utente.email;
const ruolo = utente.ruolo;

// Usa
const { nome, email, ruolo } = utente;
```

2. **Fornisci valori predefiniti**: Usa valori predefiniti nel destructuring per gestire proprietà mancanti.

```javascript
const { nome, ruolo = "utente" } = persona;
```

3. **Usa il rest pattern per proprietà dinamiche**: Quando non conosci tutte le proprietà in anticipo, usa il rest pattern per raccogliere quelle rimanenti.

```javascript
const { id, ...altreProprietà } = oggetto;
```

4. **Combina destructuring e validazione**: Usa il destructuring per estrarre i dati e poi validali per garantire che abbiano la struttura attesa.

```javascript
const { id, nome } = dati;
if (!id || !nome) {
  throw new Error("Dati incompleti");
}
```

5. **Evita destructuring troppo profondo**: Il destructuring annidato può rendere il codice difficile da leggere. Considera di suddividerlo in più passaggi per strutture molto complesse.

```javascript
// Invece di
const { a: { b: { c: { d } } } } = oggetto;

// Usa
const { a } = oggetto;
const { b } = a;
const { c } = b;
const { d } = c;
```

6. **Usa il destructuring nei parametri di funzione**: Rende le API più chiare, specialmente per funzioni con molti parametri opzionali.

```javascript
// Invece di
function creaUtente(nome, email, età, ruolo) {
  // ...
}

// Usa
function creaUtente({ nome, email, età, ruolo = "utente" }) {
  // ...
}
```

[Torna all'indice](../README.md#contenuti-teorici) | [Vai al precedente: Valutazione Condizionale](./04_Valutazione_Condizionale.md)