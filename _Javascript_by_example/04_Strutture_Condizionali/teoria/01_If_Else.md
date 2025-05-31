# If, Else, Else If in JavaScript

Le istruzioni condizionali `if`, `else` e `else if` sono fondamentali in JavaScript e permettono di eseguire blocchi di codice diversi in base a condizioni specifiche. Queste strutture sono alla base del controllo del flusso in qualsiasi programma.

## L'istruzione If

L'istruzione `if` esegue un blocco di codice se una condizione specificata è vera.

### Sintassi

```javascript
if (condizione) {
  // Codice da eseguire se la condizione è vera
}
```

La condizione viene valutata come un valore booleano. Se il risultato è `true`, il blocco di codice all'interno delle parentesi graffe viene eseguito. Se è `false`, il blocco viene ignorato.

### Esempio

```javascript
let temperatura = 25;

if (temperatura > 20) {
  console.log("È una giornata calda!");
}
```

## L'istruzione If...Else

L'istruzione `if...else` estende l'istruzione `if` aggiungendo un blocco di codice alternativo da eseguire quando la condizione è falsa.

### Sintassi

```javascript
if (condizione) {
  // Codice da eseguire se la condizione è vera
} else {
  // Codice da eseguire se la condizione è falsa
}
```

### Esempio

```javascript
let ora = 20;

if (ora < 18) {
  console.log("Buongiorno!");
} else {
  console.log("Buonasera!");
}
```

## L'istruzione If...Else If...Else

L'istruzione `if...else if...else` permette di testare più condizioni in sequenza e di eseguire blocchi di codice diversi in base al risultato.

### Sintassi

```javascript
if (condizione1) {
  // Codice da eseguire se condizione1 è vera
} else if (condizione2) {
  // Codice da eseguire se condizione1 è falsa e condizione2 è vera
} else if (condizione3) {
  // Codice da eseguire se condizione1 e condizione2 sono false e condizione3 è vera
} else {
  // Codice da eseguire se tutte le condizioni precedenti sono false
}
```

### Esempio

```javascript
let punteggio = 85;

if (punteggio >= 90) {
  console.log("Ottimo lavoro! Hai preso una A");
} else if (punteggio >= 80) {
  console.log("Buon lavoro! Hai preso una B");
} else if (punteggio >= 70) {
  console.log("Hai preso una C");
} else if (punteggio >= 60) {
  console.log("Hai preso una D");
} else {
  console.log("Mi dispiace, hai preso una F");
}
```

## If annidati

È possibile annidare istruzioni `if` all'interno di altre istruzioni `if` per creare logiche più complesse.

### Esempio

```javascript
let età = 25;
let haPatente = true;

if (età >= 18) {
  if (haPatente) {
    console.log("Puoi guidare");
  } else {
    console.log("Devi prima ottenere la patente");
  }
} else {
  console.log("Sei troppo giovane per guidare");
}
```

## Valutazione delle condizioni

In JavaScript, le condizioni vengono valutate come valori booleani. I seguenti valori sono considerati `false` (falsy):

- `false`
- `0`
- `""` (stringa vuota)
- `null`
- `undefined`
- `NaN`

Tutti gli altri valori sono considerati `true` (truthy), inclusi oggetti vuoti `{}` e array vuoti `[]`.

### Esempio

```javascript
let username = "";

if (username) {
  console.log(`Benvenuto, ${username}!`);
} else {
  console.log("Per favore, inserisci un nome utente");
}
```

## Operatori logici nelle condizioni

È possibile combinare più condizioni utilizzando gli operatori logici `&&` (AND), `||` (OR) e `!` (NOT).

### Esempio con AND (&&)

```javascript
let età = 25;
let haPatente = true;

if (età >= 18 && haPatente) {
  console.log("Puoi guidare");
} else {
  console.log("Non puoi guidare");
}
```

### Esempio con OR (||)

```javascript
let èFestivo = false;
let èWeekend = true;

if (èFestivo || èWeekend) {
  console.log("Oggi non si lavora!");
} else {
  console.log("È un giorno lavorativo");
}
```

### Esempio con NOT (!)

```javascript
let èConnesso = false;

if (!èConnesso) {
  console.log("Utente disconnesso");
} else {
  console.log("Utente connesso");
}
```

## Best Practices

1. **Usa sempre le parentesi graffe**: Anche se il blocco di codice contiene una sola istruzione, è buona pratica utilizzare sempre le parentesi graffe per migliorare la leggibilità e prevenire errori.

```javascript
// Non consigliato
if (condizione) console.log("Condizione vera");

// Consigliato
if (condizione) {
  console.log("Condizione vera");
}
```

2. **Evita condizioni complesse**: Se una condizione diventa troppo complessa, considera di suddividerla in più condizioni o di assegnare parti della condizione a variabili con nomi significativi.

```javascript
// Difficile da leggere
if (età >= 18 && (haPatente || haPermessoSpeciale) && !èSospeso) {
  // Codice
}

// Più leggibile
let èMaggiorenne = età >= 18;
let puòGuidare = haPatente || haPermessoSpeciale;
let nonHaSospensioni = !èSospeso;

if (èMaggiorenne && puòGuidare && nonHaSospensioni) {
  // Codice
}
```

3. **Attenzione agli errori comuni**: Fai attenzione a non confondere l'operatore di assegnazione `=` con l'operatore di uguaglianza `==` o `===` nelle condizioni.

```javascript
// Errore: assegna 5 a x e poi valuta x come booleano
if (x = 5) {
  // Questo blocco verrà sempre eseguito perché 5 è truthy
}

// Corretto: confronta x con 5
if (x === 5) {
  // Questo blocco viene eseguito solo se x è uguale a 5
}
```

4. **Preferisci `===` a `==`**: L'operatore di uguaglianza stretta `===` confronta sia il valore che il tipo, evitando conversioni di tipo implicite che possono portare a comportamenti inaspettati.

```javascript
// Può dare risultati inaspettati a causa della conversione di tipo
if ("5" == 5) {  // true
  // Questo blocco viene eseguito
}

// Più sicuro, confronta valore e tipo
if ("5" === 5) {  // false
  // Questo blocco non viene eseguito
}
```

[Torna all'indice](../README.md#contenuti-teorici) | [Vai al successivo: Switch](./02_Switch.md)