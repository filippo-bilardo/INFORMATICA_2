# Metodi di Base degli Array in JavaScript

JavaScript offre numerosi metodi integrati per manipolare gli array. In questa guida, esploreremo i metodi di base che permettono di modificare, combinare e trasformare gli array.

## Metodi per Aggiungere e Rimuovere Elementi

### push() e pop()

I metodi `push()` e `pop()` operano alla fine dell'array:

```javascript
let frutta = ["mela", "banana"];

// push() aggiunge uno o più elementi alla fine dell'array e restituisce la nuova lunghezza
let nuovaLunghezza = frutta.push("arancia", "kiwi");
console.log(frutta); // Output: ["mela", "banana", "arancia", "kiwi"]
console.log(nuovaLunghezza); // Output: 4

// pop() rimuove l'ultimo elemento e lo restituisce
let ultimo = frutta.pop();
console.log(frutta); // Output: ["mela", "banana", "arancia"]
console.log(ultimo); // Output: "kiwi"
```

### unshift() e shift()

I metodi `unshift()` e `shift()` operano all'inizio dell'array:

```javascript
let numeri = [2, 3, 4];

// unshift() aggiunge uno o più elementi all'inizio dell'array e restituisce la nuova lunghezza
let nuovaLunghezza = numeri.unshift(0, 1);
console.log(numeri); // Output: [0, 1, 2, 3, 4]
console.log(nuovaLunghezza); // Output: 5

// shift() rimuove il primo elemento e lo restituisce
let primo = numeri.shift();
console.log(numeri); // Output: [1, 2, 3, 4]
console.log(primo); // Output: 0
```

### splice()

Il metodo `splice()` è molto versatile e permette di aggiungere, rimuovere o sostituire elementi in qualsiasi posizione dell'array:

```javascript
let colori = ["rosso", "verde", "blu", "giallo"];

// Rimozione di elementi
// splice(indiceInizio, numeroElementi)
let rimossi = colori.splice(1, 2);
console.log(colori); // Output: ["rosso", "giallo"]
console.log(rimossi); // Output: ["verde", "blu"]

// Aggiunta di elementi
// splice(indiceInizio, 0, ...elementiDaAggiungere)
colori.splice(1, 0, "viola", "arancione");
console.log(colori); // Output: ["rosso", "viola", "arancione", "giallo"]

// Sostituzione di elementi
// splice(indiceInizio, numeroElementi, ...nuoviElementi)
colori.splice(0, 1, "magenta", "ciano");
console.log(colori); // Output: ["magenta", "ciano", "viola", "arancione", "giallo"]
```

## Metodi per Combinare e Dividere Array

### concat()

Il metodo `concat()` combina due o più array creando un nuovo array:

```javascript
let numeriPrimi = [2, 3, 5, 7];
let numeriPari = [2, 4, 6, 8];

let numeriCombinati = numeriPrimi.concat(numeriPari);
console.log(numeriCombinati); // Output: [2, 3, 5, 7, 2, 4, 6, 8]

// È possibile concatenare più array e valori singoli
let tuttiNumeri = numeriPrimi.concat(numeriPari, [9, 10], 11, 12);
console.log(tuttiNumeri); // Output: [2, 3, 5, 7, 2, 4, 6, 8, 9, 10, 11, 12]
```

### slice()

Il metodo `slice()` estrae una porzione di un array in un nuovo array senza modificare l'originale:

```javascript
let frutta = ["mela", "banana", "arancia", "kiwi", "uva"];

// slice(indiceInizio, indiceFine) - indiceFine non incluso
let porzione = frutta.slice(1, 4);
console.log(porzione); // Output: ["banana", "arancia", "kiwi"]
console.log(frutta); // Output: ["mela", "banana", "arancia", "kiwi", "uva"] (invariato)

// Se si omette indiceFine, estrae fino alla fine
let daIndice2 = frutta.slice(2);
console.log(daIndice2); // Output: ["arancia", "kiwi", "uva"]

// Indici negativi contano dalla fine
let ultimi2 = frutta.slice(-2);
console.log(ultimi2); // Output: ["kiwi", "uva"]
```

### join()

Il metodo `join()` converte tutti gli elementi di un array in una stringa, separandoli con un delimitatore specificato:

```javascript
let frutta = ["mela", "banana", "arancia"];

// join(separatore)
let stringa = frutta.join(", ");
console.log(stringa); // Output: "mela, banana, arancia"

// Se si omette il separatore, viene usata la virgola
let stringaDefault = frutta.join();
console.log(stringaDefault); // Output: "mela,banana,arancia"

// Altri esempi
console.log(frutta.join(" - ")); // Output: "mela - banana - arancia"
console.log(frutta.join("")); // Output: "melabananaarancia"
```

## Metodi per Riordinare Array

### reverse()

Il metodo `reverse()` inverte l'ordine degli elementi di un array modificando l'array originale:

```javascript
let numeri = [1, 2, 3, 4, 5];

numeri.reverse();
console.log(numeri); // Output: [5, 4, 3, 2, 1]
```

### sort()

Il metodo `sort()` ordina gli elementi di un array modificando l'array originale. Per default, ordina gli elementi come stringhe in ordine alfabetico:

```javascript
let frutta = ["banana", "mela", "Kiwi", "arancia"];

frutta.sort();
console.log(frutta); // Output: ["Kiwi", "arancia", "banana", "mela"]

// Attenzione con i numeri!
let numeri = [10, 2, 5, 1, 20];
numeri.sort();
console.log(numeri); // Output: [1, 10, 2, 20, 5] (ordinamento lessicografico)
```

Per ordinare numeri correttamente o implementare ordinamenti personalizzati, si può passare una funzione di confronto:

```javascript
let numeri = [10, 2, 5, 1, 20];

// Ordinamento numerico crescente
numeri.sort((a, b) => a - b);
console.log(numeri); // Output: [1, 2, 5, 10, 20]

// Ordinamento numerico decrescente
numeri.sort((a, b) => b - a);
console.log(numeri); // Output: [20, 10, 5, 2, 1]

// Ordinamento di oggetti
let persone = [
  { nome: "Mario", età: 30 },
  { nome: "Luigi", età: 25 },
  { nome: "Anna", età: 35 }
];

// Ordinamento per età
persone.sort((a, b) => a.età - b.età);
console.log(persone); // Output: [{ nome: "Luigi", età: 25 }, { nome: "Mario", età: 30 }, { nome: "Anna", età: 35 }]

// Ordinamento per nome
persone.sort((a, b) => a.nome.localeCompare(b.nome));
console.log(persone); // Output: [{ nome: "Anna", età: 35 }, { nome: "Luigi", età: 25 }, { nome: "Mario", età: 30 }]
```

## Altri Metodi Utili

### fill()

Il metodo `fill()` riempie tutti gli elementi di un array con un valore statico:

```javascript
let numeri = [1, 2, 3, 4, 5];

// fill(valore, indiceInizio, indiceFine)
numeri.fill(0, 2, 4);
console.log(numeri); // Output: [1, 2, 0, 0, 5]

// Se si omettono gli indici, riempie tutto l'array
numeri.fill(9);
console.log(numeri); // Output: [9, 9, 9, 9, 9]
```

### flat()

Il metodo `flat()` crea un nuovo array con tutti gli elementi di sub-array concatenati ricorsivamente fino alla profondità specificata:

```javascript
let array = [1, 2, [3, 4, [5, 6]]];

// flat(profondità)
let appiattito1 = array.flat(1);
console.log(appiattito1); // Output: [1, 2, 3, 4, [5, 6]]

let appiattito2 = array.flat(2);
console.log(appiattito2); // Output: [1, 2, 3, 4, 5, 6]

// Infinity appiattisce completamente l'array, indipendentemente dalla profondità
let arrayComplesso = [1, [2, [3, [4, [5]]]]];
let appiattitoCmpl = arrayComplesso.flat(Infinity);
console.log(appiattitoCmpl); // Output: [1, 2, 3, 4, 5]
```

### toString() e toLocaleString()

I metodi `toString()` e `toLocaleString()` convertono un array in una stringa:

```javascript
let numeri = [1, 2, 3, 4, 5];

console.log(numeri.toString()); // Output: "1,2,3,4,5"

// toLocaleString() formatta gli elementi in base alle convenzioni locali
let data = new Date();
let array = [1000, data, "testo"];
console.log(array.toLocaleString()); // Output dipende dalla locale, es: "1.000, 01/01/2023, 12:00:00, testo"
```

## Metodi per Copiare Array

### Operatore Spread (...)

L'operatore spread, introdotto in ES6, offre un modo semplice per creare una copia superficiale di un array:

```javascript
let originale = [1, 2, 3];
let copia = [...originale];

copia.push(4);
console.log(originale); // Output: [1, 2, 3]
console.log(copia); // Output: [1, 2, 3, 4]
```

### Array.from()

Il metodo `Array.from()` può essere utilizzato per creare una copia di un array:

```javascript
let originale = [1, 2, 3];
let copia = Array.from(originale);

copia.push(4);
console.log(originale); // Output: [1, 2, 3]
console.log(copia); // Output: [1, 2, 3, 4]
```

## Best Practices

1. **Preferire metodi non mutabili**: Quando possibile, utilizzare metodi che non modificano l'array originale (come `slice()` invece di `splice()`).
2. **Attenzione alle copie superficiali**: Le tecniche di copia mostrate creano copie superficiali. Per array con oggetti nidificati, potrebbe essere necessaria una copia profonda.
3. **Concatenazione di metodi**: Molti metodi degli array restituiscono un array, permettendo la concatenazione di operazioni.
4. **Funzioni di confronto personalizzate**: Quando si utilizza `sort()`, definire funzioni di confronto appropriate per il tipo di dati.
5. **Considerare le prestazioni**: Alcuni metodi (come `splice()` su array molto grandi) possono essere costosi in termini di prestazioni.

## Conclusione

I metodi di base degli array in JavaScript offrono strumenti potenti per manipolare e trasformare i dati. Padroneggiare questi metodi è essenziale per lavorare efficacemente con gli array e scrivere codice JavaScript pulito ed efficiente.

[Torna all'indice](../README.md#contenuti-teorici) | [Vai al precedente: Introduzione agli Array](./01_Introduzione_Array.md) | [Vai al successivo: Metodi di Iterazione](./03_Metodi_Iterazione.md)