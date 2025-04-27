# Template Literals

## Introduzione

I Template Literals (letterali template) sono una caratteristica introdotta in ES6 che offre un modo più potente e flessibile per lavorare con le stringhe in JavaScript. Consentono di incorporare espressioni all'interno di stringhe, creare stringhe multilinea e definire template tag personalizzati.

## Sintassi di base

I template literals utilizzano i backtick (\`) invece delle virgolette singole o doppie:

```javascript
// Stringa tradizionale
const messaggio1 = 'Ciao, mondo!';

// Template literal
const messaggio2 = `Ciao, mondo!`;
```

## Caratteristiche principali

### 1. Interpolazione di espressioni

Una delle caratteristiche più utili dei template literals è la possibilità di incorporare espressioni JavaScript direttamente nella stringa:

```javascript
const nome = 'Mario';
const età = 30;

// Con concatenazione tradizionale
const messaggio1 = 'Ciao, mi chiamo ' + nome + ' e ho ' + età + ' anni.';

// Con template literals
const messaggio2 = `Ciao, mi chiamo ${nome} e ho ${età} anni.`;

console.log(messaggio2); // Ciao, mi chiamo Mario e ho 30 anni.
```

All'interno dei placeholder `${}` è possibile inserire qualsiasi espressione JavaScript valida:

```javascript
const a = 5;
const b = 10;

console.log(`La somma è ${a + b} e il prodotto è ${a * b}.`); // La somma è 15 e il prodotto è 50.

const persona = { nome: 'Luigi', età: 25 };
console.log(`${persona.nome} ha ${persona.età} anni.`); // Luigi ha 25 anni.

console.log(`${nome.toUpperCase()} ha ${età > 18 ? 'più' : 'meno'} di 18 anni.`); // MARIO ha più di 18 anni.
```

### 2. Stringhe multilinea

I template literals consentono di creare stringhe su più righe senza dover utilizzare caratteri di escape o concatenazione:

```javascript
// Stringa multilinea tradizionale
const poesia1 = 'Riga 1\n' +
               'Riga 2\n' +
               'Riga 3';

// Stringa multilinea con template literals
const poesia2 = `Riga 1
Riga 2
Riga 3`;

console.log(poesia2);
// Output:
// Riga 1
// Riga 2
// Riga 3
```

È importante notare che gli spazi e le tabulazioni all'interno del template literal vengono preservati:

```javascript
const html = `
  <div>
    <h1>Titolo</h1>
    <p>Paragrafo</p>
  </div>
`;

console.log(html);
// Output:
// 
//   <div>
//     <h1>Titolo</h1>
//     <p>Paragrafo</p>
//   </div>
// 
```

### 3. Tagged Templates

I template literals possono essere "taggati" con una funzione, che elabora il template literal e restituisce un valore:

```javascript
function evidenzia(strings, ...valori) {
  let risultato = '';
  
  // Alterna tra parti di stringa e valori
  strings.forEach((stringa, i) => {
    risultato += stringa;
    if (i < valori.length) {
      risultato += `<strong>${valori[i]}</strong>`;
    }
  });
  
  return risultato;
}

const nome = 'Mario';
const età = 30;
const messaggio = evidenzia`Ciao, mi chiamo ${nome} e ho ${età} anni.`;

console.log(messaggio); // Ciao, mi chiamo <strong>Mario</strong> e ho <strong>30</strong> anni.
```

In questo esempio, la funzione `evidenzia` riceve:
- Un array di stringhe (`strings`): le parti di testo tra i placeholder
- I valori delle espressioni nei placeholder come argomenti separati

I tagged templates sono molto potenti e vengono utilizzati in librerie come styled-components per CSS-in-JS e in altre applicazioni avanzate.

## Casi d'uso comuni

### 1. Generazione di HTML

```javascript
const titolo = 'Il mio sito';
const utente = { nome: 'Mario', ruolo: 'Admin' };

const header = `
  <header>
    <h1>${titolo}</h1>
    <div class="user-info">
      <span>Benvenuto, ${utente.nome}</span>
      <span>Ruolo: ${utente.ruolo}</span>
    </div>
  </header>
`;

document.body.innerHTML = header;
```

### 2. Formattazione di dati

```javascript
const prodotto = {
  nome: 'Laptop',
  prezzo: 999.99,
  disponibile: true
};

const infoFormattate = `
Prodotto: ${prodotto.nome}
Prezzo: €${prodotto.prezzo.toFixed(2)}
Disponibilità: ${prodotto.disponibile ? 'In magazzino' : 'Esaurito'}
`;

console.log(infoFormattate);
```

### 3. Costruzione di query SQL o URL

```javascript
const tabella = 'utenti';
const condizione = 'età > 18';
const query = `SELECT * FROM ${tabella} WHERE ${condizione}`;

const baseUrl = 'https://api.esempio.com';
const endpoint = 'prodotti';
const parametri = 'categoria=elettronica&ordinamento=prezzo';
const url = `${baseUrl}/${endpoint}?${parametri}`;
```

## Vantaggi rispetto alla concatenazione tradizionale

1. **Leggibilità**: Il codice è più leggibile e intuitivo, specialmente con stringhe complesse.
2. **Manutenibilità**: È più facile modificare e aggiornare il testo.
3. **Espressività**: L'interpolazione di espressioni è più diretta e chiara.
4. **Multilinea**: Supporto nativo per stringhe su più righe.
5. **Funzionalità avanzate**: Possibilità di utilizzare tagged templates per elaborazioni personalizzate.

## Conclusione

I template literals rappresentano un significativo miglioramento nella gestione delle stringhe in JavaScript. Offrono una sintassi più pulita e potente per creare stringhe complesse, incorporare espressioni e lavorare con testo multilinea. Sono particolarmente utili nella generazione di HTML, nella formattazione di dati e in qualsiasi situazione che richieda la costruzione di stringhe dinamiche.

L'uso dei template literals è ormai una pratica standard nel JavaScript moderno e ha contribuito a rendere il codice più leggibile e manutenibile.