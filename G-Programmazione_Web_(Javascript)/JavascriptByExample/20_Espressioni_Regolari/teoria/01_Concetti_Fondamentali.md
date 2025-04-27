# Concetti Fondamentali delle Espressioni Regolari

## Cosa Sono le Espressioni Regolari?

Le espressioni regolari (o regex) sono sequenze di caratteri che definiscono un pattern di ricerca. In JavaScript, sono oggetti che rappresentano pattern utilizzati per abbinare combinazioni di caratteri in stringhe di testo.

Le espressioni regolari sono particolarmente utili per:

- Validare formati (email, numeri di telefono, codici postali, ecc.)
- Estrarre informazioni da stringhe di testo
- Sostituire parti di testo con altre
- Dividere stringhe in base a pattern specifici

## Creazione di Espressioni Regolari in JavaScript

In JavaScript, puoi creare un'espressione regolare in due modi:

### 1. Notazione Letterale

```javascript
const regex = /pattern/modificatori;
```

Esempio:

```javascript
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
```

### 2. Costruttore RegExp

```javascript
const regex = new RegExp('pattern', 'modificatori');
```

Esempio:

```javascript
const regexEmail = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$');
```

> **Nota**: Quando si utilizza il costruttore `RegExp`, è necessario fare l'escape dei caratteri backslash (`\`), poiché la stringa viene analizzata due volte: una volta come stringa JavaScript e una volta come espressione regolare.

## Modificatori (Flags)

I modificatori cambiano il comportamento dell'espressione regolare:

- `g` (global): Trova tutte le corrispondenze anziché fermarsi alla prima
- `i` (insensitive): Rende la ricerca case-insensitive
- `m` (multiline): Tratta i caratteri di inizio (`^`) e fine (`$`) come operanti all'inizio e alla fine di ogni riga
- `s` (dotAll): Fa sì che il punto (`.`) corrisponda anche ai caratteri di nuova riga
- `u` (unicode): Tratta il pattern come una sequenza di code point Unicode
- `y` (sticky): Cerca solo dalla posizione indicata dall'indice `lastIndex`

Esempio:

```javascript
const regex = /pattern/gi; // Globale e case-insensitive
```

## Metodi per Utilizzare le Regex in JavaScript

JavaScript offre diversi metodi per lavorare con le espressioni regolari:

### Metodi dell'Oggetto RegExp

- `test()`: Verifica se il pattern corrisponde alla stringa e restituisce `true` o `false`
- `exec()`: Cerca una corrispondenza e restituisce un array con i dettagli o `null`

```javascript
const testo = "La mia email è mario.rossi@example.com";
const regex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/;

console.log(regex.test(testo)); // Output: true

const risultato = regex.exec(testo);
console.log(risultato[0]); // Output: mario.rossi@example.com
```

### Metodi delle Stringhe

- `match()`: Restituisce un array di corrispondenze o `null`
- `search()`: Restituisce l'indice della prima corrispondenza o `-1`
- `replace()`: Sostituisce le corrispondenze con una nuova stringa
- `split()`: Divide una stringa in un array utilizzando un pattern come separatore

```javascript
const testo = "La mia email è mario.rossi@example.com";
const regex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/;

console.log(testo.match(regex)); // Output: ["mario.rossi@example.com"]
console.log(testo.search(regex)); // Output: 13 (indice dove inizia l'email)

const testoModificato = testo.replace(regex, "INDIRIZZO_EMAIL");
console.log(testoModificato); // Output: "La mia email è INDIRIZZO_EMAIL"

const parole = "mela,pera,banana".split(/,/);
console.log(parole); // Output: ["mela", "pera", "banana"]
```

## Caratteri Speciali nelle Regex

Le espressioni regolari utilizzano caratteri speciali per definire pattern complessi:

| Carattere | Descrizione |
|-----------|-------------|
| `.` | Corrisponde a qualsiasi carattere tranne newline |
| `\d` | Corrisponde a una cifra (equivalente a `[0-9]`) |
| `\D` | Corrisponde a qualsiasi carattere che non sia una cifra |
| `\w` | Corrisponde a un carattere alfanumerico o underscore (equivalente a `[A-Za-z0-9_]`) |
| `\W` | Corrisponde a qualsiasi carattere che non sia alfanumerico o underscore |
| `\s` | Corrisponde a uno spazio bianco (spazio, tab, newline, ecc.) |
| `\S` | Corrisponde a qualsiasi carattere che non sia uno spazio bianco |
| `\b` | Corrisponde a un limite di parola |
| `\B` | Corrisponde a una posizione che non sia un limite di parola |
| `^` | Corrisponde all'inizio della stringa |
| `$` | Corrisponde alla fine della stringa |

## Quantificatori

I quantificatori specificano quante volte un carattere o un gruppo deve apparire:

| Quantificatore | Descrizione |
|----------------|-------------|
| `*` | 0 o più volte |
| `+` | 1 o più volte |
| `?` | 0 o 1 volta (opzionale) |
| `{n}` | Esattamente n volte |
| `{n,}` | Almeno n volte |
| `{n,m}` | Da n a m volte |

Esempio:

```javascript
const regex = /\d{2,4}/; // Corrisponde a numeri con 2-4 cifre
console.log(regex.test("123")); // Output: true
console.log(regex.test("1")); // Output: false (troppo corto)
console.log(regex.test("12345")); // Output: true (ma corrisponde solo alle prime 4 cifre)
```

## Classi di Caratteri

Le classi di caratteri permettono di specificare un insieme di caratteri tra cui cercare una corrispondenza:

```javascript
const regex = /[aeiou]/; // Corrisponde a qualsiasi vocale minuscola
const regexNegato = /[^aeiou]/; // Corrisponde a qualsiasi carattere che NON sia una vocale minuscola
```

## Esempi Pratici

### Validazione di un Numero di Telefono Italiano

```javascript
const regexTelefono = /^(\+39)?[ ]?3\d{2}[ ]?\d{6,7}$/;

console.log(regexTelefono.test("+39 347 1234567")); // true
console.log(regexTelefono.test("347 1234567")); // true
console.log(regexTelefono.test("3471234567")); // true
console.log(regexTelefono.test("347 123456")); // true
console.log(regexTelefono.test("247 1234567")); // false (non inizia con 3)
```

### Estrazione di Hashtag da un Testo

```javascript
const testo = "Mi piace #javascript e #programmazione! #webdev";
const regexHashtag = /#[\w]+/g;

const hashtags = testo.match(regexHashtag);
console.log(hashtags); // Output: ["#javascript", "#programmazione", "#webdev"]
```

## Conclusione

Le espressioni regolari sono uno strumento potente per la manipolazione delle stringhe in JavaScript. Sebbene possano sembrare complesse all'inizio, la pratica e la comprensione dei concetti fondamentali ti permetteranno di sfruttare appieno il loro potenziale.

Nei prossimi capitoli, approfondiremo la sintassi delle regex, i pattern comuni, i gruppi di cattura e le tecniche avanzate.

## Navigazione

- [Torna all'indice](../README.md)
- [Prossimo argomento: Sintassi e Pattern](./02_Sintassi_Pattern.md)