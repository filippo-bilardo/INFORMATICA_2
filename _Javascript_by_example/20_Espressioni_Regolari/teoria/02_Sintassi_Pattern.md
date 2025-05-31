# Sintassi e Pattern delle Espressioni Regolari

## Sintassi Avanzata delle Regex

Dopo aver esplorato i concetti fondamentali, approfondiamo la sintassi delle espressioni regolari e i pattern più comuni utilizzati in JavaScript.

## Alternanza

L'alternanza permette di specificare alternative in un pattern utilizzando il carattere pipe (`|`):

```javascript
const regex = /gatto|cane|pesce/;

console.log(regex.test("Ho un gatto")); // true
console.log(regex.test("Ho un cane")); // true
console.log(regex.test("Ho un pesce")); // true
console.log(regex.test("Ho un uccello")); // false
```

L'alternanza può essere combinata con i gruppi per creare pattern più complessi:

```javascript
const regex = /ho (un|una|dei) (gatto|cane|pesce)/i;

console.log(regex.test("Ho un gatto")); // true
console.log(regex.test("Ho una cane")); // true
console.log(regex.test("Ho dei pesci")); // true
```

## Classi di Caratteri Predefinite

Oltre alle classi di caratteri personalizzate (`[abc]`), JavaScript offre classi predefinite per pattern comuni:

| Classe | Descrizione | Equivalente |
|--------|-------------|-------------|
| `\d` | Cifra | `[0-9]` |
| `\D` | Non cifra | `[^0-9]` |
| `\w` | Carattere di parola | `[A-Za-z0-9_]` |
| `\W` | Non carattere di parola | `[^A-Za-z0-9_]` |
| `\s` | Spazio bianco | `[ \t\n\r\f\v]` |
| `\S` | Non spazio bianco | `[^ \t\n\r\f\v]` |

## Intervalli di Caratteri

All'interno delle classi di caratteri, puoi specificare intervalli utilizzando il trattino (`-`):

```javascript
const regexLettere = /[a-z]/; // Corrisponde a qualsiasi lettera minuscola
const regexAlfanumerico = /[a-zA-Z0-9]/; // Corrisponde a qualsiasi lettera o cifra
const regexEsadecimale = /[0-9a-fA-F]/; // Corrisponde a qualsiasi cifra esadecimale
```

## Quantificatori Avidi vs Pigri

Per impostazione predefinita, i quantificatori sono "avidi" e cercano di corrispondere al maggior numero possibile di caratteri:

```javascript
const testo = "<div>Contenuto</div><div>Altro contenuto</div>";
const regexAvido = /<div>.*<\/div>/; // Quantificatore avido

console.log(testo.match(regexAvido)[0]); 
// Output: "<div>Contenuto</div><div>Altro contenuto</div>"
// Corrisponde a tutto, dalla prima apertura all'ultima chiusura
```

I quantificatori "pigri" (o non avidi) cercano di corrispondere al minor numero possibile di caratteri, aggiungendo `?` dopo il quantificatore:

```javascript
const testo = "<div>Contenuto</div><div>Altro contenuto</div>";
const regexPigro = /<div>.*?<\/div>/g; // Quantificatore pigro

console.log(testo.match(regexPigro)); 
// Output: ["<div>Contenuto</div>", "<div>Altro contenuto</div>"]
// Corrisponde a ciascun tag separatamente
```

## Asserzioni

Le asserzioni nelle regex sono condizioni speciali che non consumano caratteri:

### Asserzioni di Confine

- `^` - Inizio della stringa (o inizio riga in modalità multilinea)
- `$` - Fine della stringa (o fine riga in modalità multilinea)
- `\b` - Confine di parola
- `\B` - Non confine di parola

```javascript
const regex1 = /^Ciao/; // Corrisponde a "Ciao" solo all'inizio della stringa
const regex2 = /fine$/; // Corrisponde a "fine" solo alla fine della stringa
const regex3 = /\bparola\b/; // Corrisponde a "parola" come parola intera

console.log(regex3.test("Questa è una parola importante")); // true
console.log(regex3.test("Questa è una parolaccia")); // false
```

## Pattern Comuni

Vediamo alcuni pattern comuni utilizzati nelle applicazioni JavaScript:

### Validazione Email

```javascript
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

console.log(regexEmail.test("utente@example.com")); // true
console.log(regexEmail.test("utente.nome@sub.example.it")); // true
console.log(regexEmail.test("utente@.com")); // false
```

### Validazione Password

Una password che richiede almeno 8 caratteri, una lettera maiuscola, una minuscola e un numero:

```javascript
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

console.log(regexPassword.test("Password123")); // true
console.log(regexPassword.test("password123")); // false (manca maiuscola)
console.log(regexPassword.test("PASSWORD123")); // false (manca minuscola)
console.log(regexPassword.test("Passw123")); // false (troppo corta)
```

### Validazione Codice Fiscale Italiano

```javascript
const regexCodiceFiscale = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i;

console.log(regexCodiceFiscale.test("RSSMRA80A01H501W")); // true
console.log(regexCodiceFiscale.test("RSSMRA80A0")); // false (troppo corto)
```

### Validazione URL

```javascript
const regexURL = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

console.log(regexURL.test("https://www.example.com")); // true
console.log(regexURL.test("http://sub.example.it/pagina")); // true
console.log(regexURL.test("example.com")); // true
console.log(regexURL.test("https://example")); // false
```

### Estrazione di Date

```javascript
const testo = "Appuntamento il 15/04/2023 e riunione il 20-05-2023";
const regexDate = /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/g;

const date = testo.match(regexDate);
console.log(date); // Output: ["15/04/2023", "20-05-2023"]
```

## Escape di Caratteri Speciali

Per utilizzare caratteri speciali come caratteri letterali, è necessario fare l'escape con una barra rovesciata (`\`):

```javascript
const regex = /\d+\.\d+/; // Corrisponde a numeri decimali come "3.14"

console.log(regex.test("3.14")); // true
console.log(regex.test("3,14")); // false
```

I caratteri che richiedono l'escape se usati letteralmente sono: `^ $ \ . * + ? ( ) [ ] { } |`

## Ottimizzazione dei Pattern

Alcuni suggerimenti per ottimizzare i pattern regex:

1. **Sii specifico**: Più specifico è il pattern, più efficiente sarà l'esecuzione
2. **Evita l'uso eccessivo di `.*`**: I quantificatori avidi possono causare backtracking eccessivo
3. **Usa le asserzioni di confine**: `^`, `$`, `\b` aiutano a limitare l'ambito della ricerca
4. **Preferisci classi di caratteri predefinite**: `\d` è più leggibile di `[0-9]`

## Esempi Pratici

### Parsing di un Log

```javascript
const logEntry = "[2023-05-15 14:30:45] ERROR: Impossibile connettersi al database";
const regexLog = /\[(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})\] (\w+): (.+)/;

const match = logEntry.match(regexLog);
if (match) {
  const [, data, ora, livello, messaggio] = match;
  console.log("Data:", data);
  console.log("Ora:", ora);
  console.log("Livello:", livello);
  console.log("Messaggio:", messaggio);
}
```

### Sostituzione di Formattazione

```javascript
const markdown = "Questo è un **testo in grassetto** e questo è in *corsivo*.";
const htmlFormattato = markdown
  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  .replace(/\*(.*?)\*/g, '<em>$1</em>');

console.log(htmlFormattato);
// Output: "Questo è un <strong>testo in grassetto</strong> e questo è in <em>corsivo</em>."
```

## Conclusione

La sintassi delle espressioni regolari offre strumenti potenti per la manipolazione delle stringhe. Conoscere i pattern comuni e le tecniche di ottimizzazione ti permetterà di scrivere regex efficaci ed efficienti.

Nel prossimo capitolo, esploreremo i gruppi di cattura e i riferimenti, che permettono di estrarre e riutilizzare parti del testo corrispondente.

## Navigazione

- [Torna all'indice](../README.md)
- [Argomento precedente: Concetti Fondamentali](./01_Concetti_Fondamentali.md)
- [Prossimo argomento: Gruppi e Riferimenti](./03_Gruppi_Riferimenti.md)