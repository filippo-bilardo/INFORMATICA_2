# L'istruzione Switch in JavaScript

L'istruzione `switch` è una struttura di controllo che valuta un'espressione e confronta il suo valore con vari casi. Quando trova una corrispondenza, esegue il blocco di codice associato a quel caso. È particolarmente utile quando si hanno molte condizioni alternative basate sullo stesso valore.

## Sintassi Base

```javascript
switch (espressione) {
  case valore1:
    // Codice da eseguire se espressione === valore1
    break;
  case valore2:
    // Codice da eseguire se espressione === valore2
    break;
  case valore3:
    // Codice da eseguire se espressione === valore3
    break;
  default:
    // Codice da eseguire se nessun caso corrisponde
}
```

L'istruzione `switch` valuta l'espressione una sola volta e confronta il risultato con i valori di ciascun caso. Se trova una corrispondenza, esegue il blocco di codice associato fino a incontrare un'istruzione `break` o fino alla fine dello `switch`.

## Esempio Base

```javascript
let giorno = 3;
let nomeGiorno;

switch (giorno) {
  case 1:
    nomeGiorno = "Lunedì";
    break;
  case 2:
    nomeGiorno = "Martedì";
    break;
  case 3:
    nomeGiorno = "Mercoledì";
    break;
  case 4:
    nomeGiorno = "Giovedì";
    break;
  case 5:
    nomeGiorno = "Venerdì";
    break;
  case 6:
    nomeGiorno = "Sabato";
    break;
  case 0:
    nomeGiorno = "Domenica";
    break;
  default:
    nomeGiorno = "Giorno non valido";
}

console.log(`Oggi è ${nomeGiorno}`);
```

## L'istruzione break

L'istruzione `break` è cruciale in uno `switch`. Quando JavaScript incontra un `break`, esce dallo `switch` e continua l'esecuzione con l'istruzione successiva. Se ometti il `break`, l'esecuzione "cade" (fall-through) nel caso successivo, indipendentemente dal fatto che la condizione sia soddisfatta o meno.

### Esempio di Fall-Through (senza break)

```javascript
let livello = 2;
let messaggio = "Il tuo livello di accesso include: ";

switch (livello) {
  case 3:
    messaggio += "Modifica di configurazioni di sistema, ";
    // Nota: nessun break qui, quindi l'esecuzione continua nel caso 2
  case 2:
    messaggio += "Creazione di nuovi utenti, ";
    // Nota: nessun break qui, quindi l'esecuzione continua nel caso 1
  case 1:
    messaggio += "Lettura dei dati";
    break;
  default:
    messaggio = "Nessun accesso";
}

console.log(messaggio);
// Output per livello = 2: "Il tuo livello di accesso include: Creazione di nuovi utenti, Lettura dei dati"
```

In questo esempio, il fall-through è intenzionale e utile: un utente di livello 3 ha tutti i privilegi dei livelli inferiori, un utente di livello 2 ha i privilegi del livello 1, e così via.

## Casi Multipli con lo Stesso Codice

È possibile gestire più casi con lo stesso blocco di codice raggruppandoli.

```javascript
let giorno = new Date().getDay();
let tipoDiGiorno;

switch (giorno) {
  case 0:
  case 6:
    tipoDiGiorno = "Weekend";
    break;
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
    tipoDiGiorno = "Giorno lavorativo";
    break;
  default:
    tipoDiGiorno = "Giorno non valido";
}

console.log(`Oggi è un ${tipoDiGiorno}`);
```

## L'istruzione default

Il caso `default` è opzionale e viene eseguito se nessun altro caso corrisponde all'espressione. È simile all'istruzione `else` in una struttura `if...else`.

```javascript
let frutto = "Banana";
let messaggio;

switch (frutto) {
  case "Mela":
    messaggio = "Le mele costano €1 al kg";
    break;
  case "Banana":
    messaggio = "Le banane costano €1.5 al kg";
    break;
  case "Arancia":
    messaggio = "Le arance costano €0.8 al kg";
    break;
  default:
    messaggio = `Non abbiamo ${frutto} in magazzino`;
}

console.log(messaggio);
```

## Switch vs If...Else

Lo `switch` è spesso più leggibile dell'equivalente struttura `if...else if...else` quando si hanno molte condizioni basate sullo stesso valore.

### Esempio con Switch

```javascript
let codiceErrore = 404;
let messaggioErrore;

switch (codiceErrore) {
  case 400:
    messaggioErrore = "Bad Request";
    break;
  case 401:
    messaggioErrore = "Unauthorized";
    break;
  case 403:
    messaggioErrore = "Forbidden";
    break;
  case 404:
    messaggioErrore = "Not Found";
    break;
  default:
    messaggioErrore = "Unknown Error";
}
```

### Equivalente con If...Else

```javascript
let codiceErrore = 404;
let messaggioErrore;

if (codiceErrore === 400) {
  messaggioErrore = "Bad Request";
} else if (codiceErrore === 401) {
  messaggioErrore = "Unauthorized";
} else if (codiceErrore === 403) {
  messaggioErrore = "Forbidden";
} else if (codiceErrore === 404) {
  messaggioErrore = "Not Found";
} else {
  messaggioErrore = "Unknown Error";
}
```

## Limitazioni dello Switch

1. **Confronto di uguaglianza stretta**: Lo `switch` utilizza il confronto di uguaglianza stretta (`===`), quindi i tipi devono corrispondere.

2. **Espressioni semplici**: I casi devono essere valori costanti o espressioni che possono essere valutate a tempo di compilazione, non possono essere espressioni complesse o variabili.

3. **Nessuna condizione di intervallo**: Non è possibile utilizzare direttamente condizioni di intervallo come `case x > 10:`. Per questi casi, è meglio utilizzare `if...else`.

## Best Practices

1. **Usa sempre break**: A meno che non stai intenzionalmente utilizzando il fall-through, includi sempre un'istruzione `break` alla fine di ogni caso per evitare comportamenti inaspettati.

2. **Commenta i fall-through intenzionali**: Se ometti intenzionalmente un `break` per sfruttare il fall-through, commentalo per chiarire che non è un errore.

```javascript
switch (livello) {
  case 3:
    privilegiAdmin();
    // fall-through intenzionale
  case 2:
    privilegiEditor();
    // fall-through intenzionale
  case 1:
    privilegiBase();
    break;
}
```

3. **Considera alternative per condizioni complesse**: Se hai bisogno di condizioni più complesse o intervalli di valori, considera l'uso di `if...else` o di un oggetto di mappatura.

```javascript
// Usando un oggetto di mappatura invece di switch
const messaggiErrore = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found"
};

let messaggioErrore = messaggiErrore[codiceErrore] || "Unknown Error";
```

4. **Posiziona il caso default alla fine**: Per convenzione e leggibilità, posiziona sempre il caso `default` come ultimo caso nello `switch`.

[Torna all'indice](../README.md#contenuti-teorici) | [Vai al precedente: If, Else, Else If](./01_If_Else.md) | [Vai al successivo: Operatore Ternario](./03_Operatore_Ternario.md)