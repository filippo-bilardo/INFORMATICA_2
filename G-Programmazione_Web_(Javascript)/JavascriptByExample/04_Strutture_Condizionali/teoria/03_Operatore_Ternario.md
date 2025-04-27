# L'Operatore Ternario in JavaScript

L'operatore ternario, noto anche come operatore condizionale, è un'alternativa concisa all'istruzione `if...else`. È l'unico operatore in JavaScript che accetta tre operandi, da cui deriva il nome "ternario".

## Sintassi

```javascript
condizione ? espressione1 : espressione2
```

L'operatore ternario valuta la `condizione` e, se è vera, restituisce il valore di `espressione1`; altrimenti, restituisce il valore di `espressione2`.

## Funzionamento Base

```javascript
let età = 20;
let stato = età >= 18 ? "adulto" : "minorenne";

console.log(stato);  // Output: "adulto"
```

Questo esempio è equivalente al seguente codice con `if...else`:

```javascript
let età = 20;
let stato;

if (età >= 18) {
  stato = "adulto";
} else {
  stato = "minorenne";
}

console.log(stato);  // Output: "adulto"
```

## Vantaggi dell'Operatore Ternario

1. **Concisione**: Permette di scrivere condizioni semplici in una sola riga.
2. **Espressività**: È un'espressione che restituisce un valore, quindi può essere utilizzata direttamente in assegnazioni o come argomento di funzioni.
3. **Leggibilità**: Per condizioni semplici, può rendere il codice più leggibile rispetto a un blocco `if...else`.

## Casi d'Uso Comuni

### Assegnazione Condizionale

```javascript
// Assegnare un valore predefinito se una variabile è undefined o null
let nome = inputUtente || "Ospite";

// Scegliere tra due valori in base a una condizione
let prezzo = èMembro ? 9.99 : 19.99;
```

### Restituzione Condizionale in Funzioni

```javascript
function saluta(nome, èFormale) {
  return èFormale ? `Buongiorno, ${nome}` : `Ciao, ${nome}!`;
}

console.log(saluta("Mario", true));   // Output: "Buongiorno, Mario"
console.log(saluta("Luigi", false));  // Output: "Ciao, Luigi!"
```

### Rendering Condizionale in JSX (React)

```jsx
function Saluto({ utente }) {
  return (
    <div>
      {utente ? `Benvenuto, ${utente.nome}!` : "Per favore, accedi"}
    </div>
  );
}
```

## Operatori Ternari Annidati

È possibile annidare operatori ternari per gestire più condizioni, ma questo può rendere il codice difficile da leggere.

```javascript
let punteggio = 85;
let voto = punteggio >= 90 ? "A" : 
           punteggio >= 80 ? "B" : 
           punteggio >= 70 ? "C" : 
           punteggio >= 60 ? "D" : "F";

console.log(voto);  // Output: "B"
```

Per migliorare la leggibilità, è possibile utilizzare parentesi per chiarire la struttura:

```javascript
let punteggio = 85;
let voto = punteggio >= 90 ? "A" : 
          (punteggio >= 80 ? "B" : 
          (punteggio >= 70 ? "C" : 
          (punteggio >= 60 ? "D" : "F")));

console.log(voto);  // Output: "B"
```

## Operatore Ternario con Più Istruzioni

Se hai bisogno di eseguire più istruzioni in base a una condizione, l'operatore ternario non è la scelta migliore. In questi casi, è preferibile utilizzare `if...else`.

```javascript
// Non ideale: operatore ternario con più istruzioni
èLoggato ? (aggiornaUI(), mostraMessaggio(), logActivity()) : mostraLogin();

// Meglio: if...else per più istruzioni
if (èLoggato) {
  aggiornaUI();
  mostraMessaggio();
  logActivity();
} else {
  mostraLogin();
}
```

## Confronto con Operatori Logici

In alcuni casi, gli operatori logici `&&` e `||` possono essere utilizzati come alternative più concise all'operatore ternario.

### Operatore AND (&&) per Esecuzione Condizionale

```javascript
// Usando l'operatore ternario
èAdmin ? mostraControlliAdmin() : null;

// Equivalente più conciso con &&
èAdmin && mostraControlliAdmin();
```

### Operatore OR (||) per Valori Predefiniti

```javascript
// Usando l'operatore ternario
let nome = inputUtente !== undefined && inputUtente !== null ? inputUtente : "Ospite";

// Equivalente più conciso con ||
let nome = inputUtente || "Ospite";
```

## Best Practices

1. **Usa l'operatore ternario per assegnazioni semplici**: È ideale per assegnare uno di due valori a una variabile in base a una condizione.

```javascript
let messaggio = età >= 18 ? "Benvenuto" : "Accesso negato";
```

2. **Evita ternari troppo complessi o annidati**: Se la logica diventa complessa, preferisci `if...else` o `switch` per maggiore chiarezza.

```javascript
// Evita questo
let risultato = a > b ? x > y ? "A" : "B" : z > w ? "C" : "D";

// Preferisci questo
let risultato;
if (a > b) {
  risultato = x > y ? "A" : "B";
} else {
  risultato = z > w ? "C" : "D";
}
```

3. **Usa parentesi per chiarire la precedenza**: Quando combini l'operatore ternario con altre operazioni, usa le parentesi per rendere chiara la precedenza.

```javascript
let risultato = (a > b) ? c + d : e * f;
```

4. **Formatta il codice per la leggibilità**: Quando usi operatori ternari su più righe, formatta il codice in modo coerente.

```javascript
// Formattazione su più righe
let messaggio = èLoggato
  ? "Benvenuto di nuovo!"
  : "Per favore, accedi";
```

5. **Considera alternative per logiche complesse**: Per logiche condizionali complesse, considera l'uso di oggetti di mappatura o funzioni dedicate.

```javascript
// Invece di ternari annidati per mappare valori
const mappaVoti = {
  A: "Eccellente",
  B: "Buono",
  C: "Sufficiente",
  D: "Insufficiente",
  F: "Gravemente insufficiente"
};

let descrizioneVoto = mappaVoti[voto] || "Voto non valido";
```

[Torna all'indice](../README.md#contenuti-teorici) | [Vai al precedente: Switch](./02_Switch.md) | [Vai al successivo: Valutazione Condizionale](./04_Valutazione_Condizionale.md)