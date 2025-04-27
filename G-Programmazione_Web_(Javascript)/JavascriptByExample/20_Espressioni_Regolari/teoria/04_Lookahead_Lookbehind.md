# Lookahead e Lookbehind nelle Espressioni Regolari

## Introduzione alle Asserzioni

Le asserzioni lookahead e lookbehind sono tecniche avanzate nelle espressioni regolari che permettono di verificare se un pattern è seguito o preceduto da un altro pattern, senza includere quest'ultimo nella corrispondenza effettiva. Sono particolarmente utili per creare condizioni complesse di corrispondenza.

Queste asserzioni sono chiamate anche "asserzioni a larghezza zero" perché non consumano caratteri nella stringa, ma semplicemente verificano una condizione.

## Lookahead (Asserzioni in Avanti)

Le asserzioni lookahead verificano se un pattern è seguito da un altro pattern.

### Lookahead Positivo

Il lookahead positivo utilizza la sintassi `(?=pattern)` e corrisponde a una posizione seguita dal pattern specificato:

```javascript
const regex = /Java(?=Script)/;

console.log(regex.exec("JavaScript")); // ["Java"]
console.log(regex.exec("JavaBeans")); // null
```

In questo esempio, `Java(?=Script)` corrisponde a "Java" solo se è seguito da "Script", ma "Script" non fa parte della corrispondenza.

### Lookahead Negativo

Il lookahead negativo utilizza la sintassi `(?!pattern)` e corrisponde a una posizione non seguita dal pattern specificato:

```javascript
const regex = /Java(?!Script)/;

console.log(regex.exec("JavaScript")); // null
console.log(regex.exec("JavaBeans")); // ["Java"]
```

Qui, `Java(?!Script)` corrisponde a "Java" solo se non è seguito da "Script".

## Lookbehind (Asserzioni all'Indietro)

Le asserzioni lookbehind verificano se un pattern è preceduto da un altro pattern. Sono supportate in JavaScript a partire da ECMAScript 2018.

### Lookbehind Positivo

Il lookbehind positivo utilizza la sintassi `(?<=pattern)` e corrisponde a una posizione preceduta dal pattern specificato:

```javascript
const regex = /(?<=Java)Script/;

console.log(regex.exec("JavaScript")); // ["Script"]
console.log(regex.exec("TypeScript")); // null
```

In questo esempio, `(?<=Java)Script` corrisponde a "Script" solo se è preceduto da "Java", ma "Java" non fa parte della corrispondenza.

### Lookbehind Negativo

Il lookbehind negativo utilizza la sintassi `(?<!pattern)` e corrisponde a una posizione non preceduta dal pattern specificato:

```javascript
const regex = /(?<!Java)Script/;

console.log(regex.exec("JavaScript")); // null
console.log(regex.exec("TypeScript")); // ["Script"]
```

Qui, `(?<!Java)Script` corrisponde a "Script" solo se non è preceduto da "Java".

## Combinare Lookahead e Lookbehind

È possibile combinare più asserzioni per creare condizioni complesse:

```javascript
const regex = /(?<=\$)\d+(?=\.\d{2})/;

console.log(regex.exec("Il prezzo è $24.99")); // ["24"]
console.log(regex.exec("Il prezzo è €24.99")); // null
```

Questo pattern corrisponde a un numero solo se è preceduto dal simbolo del dollaro e seguito da un punto e due cifre decimali.

## Casi d'Uso Pratici

### Validazione di Password Complessa

Verifica che una password contenga almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale:

```javascript
const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

console.log(regexPassword.test("Password123!")); // true
console.log(regexPassword.test("password123")); // false (manca carattere speciale)
console.log(regexPassword.test("PASSWORD123!")); // false (manca minuscola)
```

In questo esempio, utilizziamo quattro lookahead positivi all'inizio della regex per verificare che la password contenga tutti i tipi di caratteri richiesti, indipendentemente dall'ordine.

### Sostituzione Condizionale

Sostituisci solo le parole che non fanno parte di un URL:

```javascript
const testo = "Visita example.com o http://example.org per maggiori informazioni.";
const regex = /\b(?<!https?:\/\/|www\.)\w+\b/g;

const testoModificato = testo.replace(regex, parola => parola.toUpperCase());
console.log(testoModificato);
// Output: "VISITA example.com O http://example.org PER MAGGIORI INFORMAZIONI."
```

Questo pattern corrisponde a parole intere che non sono precedute da "http://", "https://" o "www.".

### Estrazione di Valori Numerici

Estrai numeri solo se sono seguiti da unità di misura specifiche:

```javascript
const testo = "Il prodotto misura 150cm di lunghezza, 80cm di larghezza e pesa 5kg.";
const regex = /\d+(?=cm|kg)/g;

const misure = testo.match(regex);
console.log(misure); // ["150", "80"]
```

Questo pattern corrisponde a numeri solo se sono seguiti da "cm" o "kg".

### Parsing di Stringhe Formattate

Estrai valori da una stringa formattata in modo specifico:

```javascript
const testo = "nome: Mario, età: 30, città: Roma";
const regex = /(?<=nome: )[^,]+|(?<=età: )\d+|(?<=città: )[^,]+/g;

const valori = testo.match(regex);
console.log(valori); // ["Mario", "30", "Roma"]
```

Questo pattern utilizza lookbehind positivi per estrarre i valori dopo etichette specifiche.

## Limitazioni e Considerazioni

1. **Compatibilità**: Le asserzioni lookbehind sono supportate solo nelle versioni più recenti di JavaScript (ES2018+)
2. **Prestazioni**: L'uso eccessivo di asserzioni può influire sulle prestazioni
3. **Complessità**: Pattern con molte asserzioni possono diventare difficili da leggere e mantenere
4. **Lunghezza variabile**: In alcune implementazioni, i lookbehind non supportano pattern di lunghezza variabile

## Esempi Avanzati

### Validazione di Numeri di Carta di Credito

```javascript
const testo = "Le carte accettate sono: 4111-1111-1111-1111, 5500-0000-0000-0004 e 3400-0000-0000-009.";

// Trova numeri Visa (iniziano con 4) e MasterCard (iniziano con 5)
// ma non American Express (iniziano con 3)
const regex = /(?<!3\d{3}[- ])\d{4}[- ]\d{4}[- ]\d{4}[- ]\d{4}/g;

const carteAccettate = testo.match(regex);
console.log(carteAccettate);
// Output: ["4111-1111-1111-1111", "5500-0000-0000-0004"]
```

### Sostituzione di Tag HTML

```javascript
const html = "<p>Paragrafo</p><div>Contenuto</div><p>Altro paragrafo</p>";

// Sostituisci solo i tag <p> ma mantieni il contenuto
const regex = /<p>(?=.*?<\/p>)|(?<=<p>.*?)<\/p>/g;

const testoModificato = html.replace(regex, tag => {
  return tag === "<p>" ? "<h2>" : "</h2>";
});

console.log(testoModificato);
// Output: "<h2>Paragrafo</h2><div>Contenuto</div><h2>Altro paragrafo</h2>"
```

## Conclusione

Le asserzioni lookahead e lookbehind sono strumenti potenti che permettono di creare pattern di corrispondenza sofisticati basati sul contesto. Sebbene possano aumentare la complessità delle espressioni regolari, offrono una flessibilità che sarebbe difficile ottenere in altro modo.

Nel prossimo capitolo, esploreremo le tecniche di ottimizzazione e le best practices per scrivere espressioni regolari efficienti e manutenibili.

## Navigazione

- [Torna all'indice](../README.md)
- [Argomento precedente: Gruppi e Riferimenti](./03_Gruppi_Riferimenti.md)
- [Prossimo argomento: Ottimizzazione e Best Practices](./05_Ottimizzazione.md)