# Metodi di Iterazione degli Array in JavaScript

JavaScript offre numerosi metodi per iterare sugli elementi di un array. Questi metodi semplificano notevolmente le operazioni comuni come l'esecuzione di una funzione su ogni elemento, la trasformazione di dati e il filtraggio di elementi. In questa guida, esploreremo i principali metodi di iterazione degli array.

## forEach()

Il metodo `forEach()` esegue una funzione su ogni elemento dell'array, senza restituire un nuovo array:

```javascript
let numeri = [1, 2, 3, 4, 5];

numeri.forEach(function(elemento, indice, array) {
  console.log(`Elemento: ${elemento}, Indice: ${indice}`);
});

// Utilizzando arrow function (più conciso)
numeri.forEach((elemento) => console.log(elemento * 2));
// Output: 2, 4, 6, 8, 10
```

Caratteristiche principali:
- Non restituisce un valore (o meglio, restituisce `undefined`)
- Non può essere interrotto (non si può usare `break` o `return`)
- Modifica l'array originale solo se la funzione di callback lo modifica esplicitamente

## map()

Il metodo `map()` crea un nuovo array con i risultati della chiamata di una funzione su ogni elemento dell'array originale:

```javascript
let numeri = [1, 2, 3, 4, 5];

let quadrati = numeri.map(function(elemento) {
  return elemento * elemento;
});

console.log(quadrati); // Output: [1, 4, 9, 16, 25]
console.log(numeri);   // Output: [1, 2, 3, 4, 5] (invariato)

// Utilizzando arrow function
let doppi = numeri.map(elemento => elemento * 2);
console.log(doppi);    // Output: [2, 4, 6, 8, 10]
```

Esempio con oggetti:

```javascript
let persone = [
  { nome: "Mario", cognome: "Rossi" },
  { nome: "Luigi", cognome: "Verdi" },
  { nome: "Anna", cognome: "Bianchi" }
];

let nomiCompleti = persone.map(persona => `${persona.nome} ${persona.cognome}`);
console.log(nomiCompleti); // Output: ["Mario Rossi", "Luigi Verdi", "Anna Bianchi"]
```

Caratteristiche principali:
- Restituisce un nuovo array della stessa lunghezza dell'originale
- Non modifica l'array originale
- Utile per trasformare dati

## filter()

Il metodo `filter()` crea un nuovo array con tutti gli elementi che soddisfano una condizione implementata dalla funzione fornita:

```javascript
let numeri = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let pari = numeri.filter(function(elemento) {
  return elemento % 2 === 0;
});

console.log(pari); // Output: [2, 4, 6, 8, 10]

// Utilizzando arrow function
let maggioriDi5 = numeri.filter(elemento => elemento > 5);
console.log(maggioriDi5); // Output: [6, 7, 8, 9, 10]
```

Esempio con oggetti:

```javascript
let persone = [
  { nome: "Mario", età: 30 },
  { nome: "Luigi", età: 25 },
  { nome: "Anna", età: 35 },
  { nome: "Giovanni", età: 17 }
];

let adulti = persone.filter(persona => persona.età >= 18);
console.log(adulti); // Output: [{ nome: "Mario", età: 30 }, { nome: "Luigi", età: 25 }, { nome: "Anna", età: 35 }]
```

Caratteristiche principali:
- Restituisce un nuovo array che può avere una lunghezza diversa dall'originale
- Non modifica l'array originale
- Utile per selezionare elementi che soddisfano criteri specifici

## reduce()

Il metodo `reduce()` esegue una funzione riduttore su ogni elemento dell'array, risultando in un singolo valore di output:

```javascript
let numeri = [1, 2, 3, 4, 5];

let somma = numeri.reduce(function(accumulatore, elemento) {
  return accumulatore + elemento;
}, 0);

console.log(somma); // Output: 15 (1+2+3+4+5)

// Utilizzando arrow function
let prodotto = numeri.reduce((acc, val) => acc * val, 1);
console.log(prodotto); // Output: 120 (1*2*3*4*5)
```

Il secondo parametro (0 e 1 negli esempi) è il valore iniziale dell'accumulatore. Se omesso, il primo elemento dell'array viene usato come valore iniziale.

Esempi più complessi:

```javascript
// Conteggio delle occorrenze
let frutta = ["mela", "banana", "mela", "arancia", "banana", "mela"];

let conteggio = frutta.reduce((acc, val) => {
  acc[val] = (acc[val] || 0) + 1;
  return acc;
}, {});

console.log(conteggio); // Output: { mela: 3, banana: 2, arancia: 1 }

// Appiattimento di array nidificati
let arrayNidificato = [[1, 2], [3, 4], [5, 6]];
let appiattito = arrayNidificato.reduce((acc, val) => acc.concat(val), []);
console.log(appiattito); // Output: [1, 2, 3, 4, 5, 6]
```

Caratteristiche principali:
- Restituisce un singolo valore (che può essere di qualsiasi tipo)
- Estremamente versatile per calcoli cumulativi e trasformazioni complesse
- Può sostituire molte combinazioni di `map` e `filter`

## reduceRight()

Il metodo `reduceRight()` funziona come `reduce()`, ma procede da destra a sinistra:

```javascript
let numeri = [1, 2, 3, 4, 5];

let risultato = numeri.reduceRight((acc, val) => acc - val);
console.log(risultato); // Output: -5 (5-4-3-2-1)

// Confronto con reduce
let risultatoReduce = numeri.reduce((acc, val) => acc - val);
console.log(risultatoReduce); // Output: -13 (1-2-3-4-5)
```

## some() e every()

I metodi `some()` e `every()` testano se almeno un elemento o tutti gli elementi soddisfano una condizione:

```javascript
let numeri = [1, 2, 3, 4, 5];

// some() verifica se almeno un elemento soddisfa la condizione
let hasMaggioriDi3 = numeri.some(elemento => elemento > 3);
console.log(hasMaggioriDi3); // Output: true

let hasMaggioriDi10 = numeri.some(elemento => elemento > 10);
console.log(hasMaggioriDi10); // Output: false

// every() verifica se tutti gli elementi soddisfano la condizione
let tuttiMaggioriDi0 = numeri.every(elemento => elemento > 0);
console.log(tuttiMaggioriDi0); // Output: true

let tuttiMaggioriDi2 = numeri.every(elemento => elemento > 2);
console.log(tuttiMaggioriDi2); // Output: false
```

Caratteristiche principali:
- Entrambi restituiscono un valore booleano
- `some()` restituisce `true` se almeno un elemento soddisfa la condizione
- `every()` restituisce `true` solo se tutti gli elementi soddisfano la condizione
- Entrambi possono terminare in anticipo (short-circuit)

## find() e findIndex()

I metodi `find()` e `findIndex()` cercano un elemento che soddisfa una condizione:

```javascript
let numeri = [5, 12, 8, 130, 44];

// find() restituisce il primo elemento che soddisfa la condizione
let trovato = numeri.find(elemento => elemento > 10);
console.log(trovato); // Output: 12

// findIndex() restituisce l'indice del primo elemento che soddisfa la condizione
let indice = numeri.findIndex(elemento => elemento > 10);
console.log(indice); // Output: 1

// Se nessun elemento soddisfa la condizione
let nonTrovato = numeri.find(elemento => elemento > 200);
console.log(nonTrovato); // Output: undefined

let indiceNonTrovato = numeri.findIndex(elemento => elemento > 200);
console.log(indiceNonTrovato); // Output: -1
```

Esempio con oggetti:

```javascript
let persone = [
  { id: 1, nome: "Mario" },
  { id: 2, nome: "Luigi" },
  { id: 3, nome: "Anna" }
];

let persona = persone.find(p => p.id === 2);
console.log(persona); // Output: { id: 2, nome: "Luigi" }
```

Caratteristiche principali:
- `find()` restituisce il primo elemento che soddisfa la condizione o `undefined`
- `findIndex()` restituisce l'indice del primo elemento che soddisfa la condizione o `-1`
- Entrambi terminano non appena trovano un elemento che soddisfa la condizione

## flatMap()

Il metodo `flatMap()` combina le funzionalità di `map()` e `flat()` in un unico metodo:

```javascript
let frasi = ["Hello world", "JavaScript is fun"];

// Dividi ogni frase in parole e appiattisci il risultato
let parole = frasi.flatMap(frase => frase.split(" "));
console.log(parole); // Output: ["Hello", "world", "JavaScript", "is", "fun"]

// Equivalente a:
let paroleSeparate = frasi.map(frase => frase.split(" ")).flat();
console.log(paroleSeparate); // Output: ["Hello", "world", "JavaScript", "is", "fun"]
```

Caratteristiche principali:
- Combina `map()` e `flat()` in un'unica operazione
- Più efficiente rispetto all'uso separato di `map()` e `flat()`
- Utile per trasformazioni che generano array nidificati

## Concatenazione di Metodi

Uno dei vantaggi dei metodi di iterazione è che possono essere concatenati per creare pipeline di elaborazione dati:

```javascript
let numeri = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let sommaQuadratiPari = numeri
  .filter(n => n % 2 === 0)     // Filtra i numeri pari: [2, 4, 6, 8, 10]
  .map(n => n * n)              // Calcola i quadrati: [4, 16, 36, 64, 100]
  .reduce((acc, val) => acc + val, 0); // Somma i risultati: 220

console.log(sommaQuadratiPari); // Output: 220
```

## Best Practices

1. **Preferire metodi di array a cicli tradizionali**: I metodi di iterazione rendono il codice più leggibile e dichiarativo.
2. **Scegliere il metodo appropriato**: Ogni metodo ha uno scopo specifico; scegliere quello più adatto all'operazione da eseguire.
3. **Utilizzare arrow functions**: Rendono il codice più conciso, specialmente per operazioni semplici.
4. **Evitare effetti collaterali**: Le funzioni di callback dovrebbero idealmente essere pure, senza modificare variabili esterne.
5. **Concatenare con moderazione**: Troppe operazioni concatenate possono rendere il codice difficile da leggere e debuggare.

## Conclusione

I metodi di iterazione degli array in JavaScript offrono un modo potente e flessibile per lavorare con collezioni di dati. Padroneggiare questi metodi permette di scrivere codice più pulito, più espressivo e spesso più efficiente rispetto ai cicli tradizionali.

[Torna all'indice](../README.md#contenuti-teorici) | [Vai al precedente: Metodi di Base degli Array](./02_Metodi_Base.md) | [Vai al successivo: Metodi di Ricerca e Filtro](./04_Metodi_Ricerca_Filtro.md)