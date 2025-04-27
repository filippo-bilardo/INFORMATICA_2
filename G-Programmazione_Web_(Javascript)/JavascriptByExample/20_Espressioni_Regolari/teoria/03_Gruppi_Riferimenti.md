# Gruppi e Riferimenti nelle Espressioni Regolari

## Introduzione ai Gruppi di Cattura

I gruppi di cattura sono una funzionalità potente delle espressioni regolari che permettono di isolare e catturare parti specifiche del testo corrispondente. In JavaScript, i gruppi di cattura sono definiti racchiudendo una parte del pattern tra parentesi tonde `( )`.

## Gruppi di Cattura Base

Un gruppo di cattura semplice permette di estrarre una parte specifica del testo corrispondente:

```javascript
const testo = "Il mio numero è 335-1234567";
const regex = /Il mio numero è (\d{3})-(\d{7})/;

const match = testo.match(regex);
if (match) {
  console.log("Testo completo:", match[0]); // "Il mio numero è 335-1234567"
  console.log("Prefisso:", match[1]); // "335"
  console.log("Numero:", match[2]); // "1234567"
}
```

In questo esempio, abbiamo due gruppi di cattura: uno per il prefisso e uno per il numero. Il metodo `match()` restituisce un array dove:
- L'elemento `[0]` contiene l'intera corrispondenza
- Gli elementi successivi contengono i gruppi catturati

## Gruppi Nominati

A partire da ECMAScript 2018, JavaScript supporta i gruppi di cattura nominati, che permettono di assegnare nomi ai gruppi per un accesso più intuitivo:

```javascript
const testo = "Il mio numero è 335-1234567";
const regex = /Il mio numero è (?<prefisso>\d{3})-(?<numero>\d{7})/;

const match = testo.match(regex);
if (match) {
  console.log("Testo completo:", match[0]);
  console.log("Prefisso:", match.groups.prefisso);
  console.log("Numero:", match.groups.numero);
}
```

I gruppi nominati utilizzano la sintassi `(?<nome>pattern)` e sono accessibili tramite la proprietà `groups` dell'oggetto restituito da `match()`.

## Gruppi Non Catturanti

A volte potresti voler utilizzare i gruppi per la struttura del pattern, ma senza catturare il contenuto. In questi casi, puoi utilizzare i gruppi non catturanti con la sintassi `(?:pattern)`:

```javascript
const testo = "Telefono: 335-1234567";
const regexConCattura = /(\d{3})-(\d{7})/;
const regexSenzaCattura = /(?:\d{3})-(\d{7})/;

const match1 = testo.match(regexConCattura);
console.log(match1); // ["335-1234567", "335", "1234567"]

const match2 = testo.match(regexSenzaCattura);
console.log(match2); // ["335-1234567", "1234567"]
```

Nel secondo caso, il prefisso non viene catturato come gruppo separato.

## Riferimenti Indietro (Backreferences)

I riferimenti indietro permettono di fare riferimento a un gruppo di cattura precedente all'interno della stessa espressione regolare. Sono utili per trovare pattern ripetuti o per verificare che due parti del testo siano identiche.

### Riferimenti Numerici

```javascript
const regex = /(\w+)\s+\1/; // Trova parole ripetute

console.log(regex.test("hello hello")); // true
console.log(regex.test("hello world")); // false
```

In questo esempio, `\1` fa riferimento al contenuto del primo gruppo di cattura.

### Riferimenti Nominati

Con i gruppi nominati, puoi utilizzare `\k<nome>` per fare riferimento a un gruppo precedente:

```javascript
const regex = /(?<parola>\w+)\s+\k<parola>/;

console.log(regex.test("hello hello")); // true
console.log(regex.test("hello world")); // false
```

## Utilizzo dei Gruppi nel Metodo replace()

I gruppi di cattura sono particolarmente utili con il metodo `replace()` per riorganizzare o modificare parti del testo:

```javascript
const testo = "Rossi Mario";
const regex = /(\w+)\s+(\w+)/;

// Inverti nome e cognome
const testoModificato = testo.replace(regex, "$2 $1");
console.log(testoModificato); // "Mario Rossi"
```

Con i gruppi nominati:

```javascript
const testo = "Rossi Mario";
const regex = /(?<cognome>\w+)\s+(?<nome>\w+)/;

const testoModificato = testo.replace(regex, "$<nome> $<cognome>");
console.log(testoModificato); // "Mario Rossi"
```

## Funzioni di Sostituzione

Il metodo `replace()` può anche accettare una funzione come secondo argomento, permettendo sostituzioni più complesse:

```javascript
const testo = "La temperatura è 25°C oggi e 28°C domani.";
const regex = /(\d+)°C/g;

// Converti da Celsius a Fahrenheit
const testoModificato = testo.replace(regex, (match, gradi) => {
  const fahrenheit = (gradi * 9/5) + 32;
  return `${gradi}°C (${fahrenheit.toFixed(1)}°F)`;
});

console.log(testoModificato);
// Output: "La temperatura è 25°C (77.0°F) oggi e 28°C (82.4°F) domani."
```

## Esempi Pratici

### Parsing di URL

```javascript
const url = "https://www.example.com:8080/path/to/resource?query=value#fragment";
const regexURL = /^(?<protocol>https?:\/\/)?(?<host>[\w.-]+)(?::(?<port>\d+))?(?<path>\/[\w\/.-]*)?(?:\?(?<query>[^#]*))?(?:#(?<fragment>.*))?$/;

const match = url.match(regexURL);
if (match && match.groups) {
  const { protocol, host, port, path, query, fragment } = match.groups;
  console.log("Protocollo:", protocol);
  console.log("Host:", host);
  console.log("Porta:", port || "(predefinita)");
  console.log("Percorso:", path || "/");
  console.log("Query:", query || "(nessuna)");
  console.log("Fragment:", fragment || "(nessuno)");
}
```

### Formattazione di Numeri di Telefono

```javascript
const numeri = [
  "3471234567",
  "347-1234567",
  "347 1234567"
];

const regex = /^(\+39)?[\s-]?(3\d{2})[\s-]?(\d{6,7})$/;

numeri.forEach(numero => {
  const formattato = numero.replace(regex, "$1 $2 $3").trim();
  console.log(`${numero} → ${formattato}`);
});

// Output:
// "3471234567 → 347 1234567"
// "347-1234567 → 347 1234567"
// "347 1234567 → 347 1234567"
```

### Estrazione di Tag HTML

```javascript
const html = "<div class='container'><p>Paragrafo 1</p><p>Paragrafo 2</p></div>";
const regexTag = /<(?<tag>\w+)(?<attrs>[^>]*)>(?<content>.*?)<\/\k<tag>>/g;

let match;
while ((match = regexTag.exec(html)) !== null) {
  const { tag, attrs, content } = match.groups;
  console.log(`Tag: ${tag}`);
  console.log(`Attributi: ${attrs.trim() || "(nessuno)"}`); 
  console.log(`Contenuto: ${content}`);
  console.log("---");
}
```

## Limitazioni e Considerazioni

1. **Prestazioni**: L'uso eccessivo di gruppi di cattura può influire sulle prestazioni, specialmente con testi lunghi
2. **Compatibilità**: I gruppi nominati sono supportati solo nelle versioni più recenti di JavaScript
3. **Complessità**: Pattern complessi con molti gruppi possono diventare difficili da leggere e mantenere

## Conclusione

I gruppi di cattura e i riferimenti sono strumenti potenti che estendono notevolmente le capacità delle espressioni regolari. Permettono di estrarre, riorganizzare e manipolare parti specifiche del testo in modo flessibile ed efficiente.

Nel prossimo capitolo, esploreremo le asserzioni lookahead e lookbehind, che permettono di creare pattern ancora più sofisticati.

## Navigazione

- [Torna all'indice](../README.md)
- [Argomento precedente: Sintassi e Pattern](./02_Sintassi_Pattern.md)
- [Prossimo argomento: Lookahead e Lookbehind](./04_Lookahead_Lookbehind.md)