# Tecniche Avanzate con gli Array in JavaScript

In questa guida esploreremo tecniche avanzate per lavorare con gli array in JavaScript, inclusi pattern comuni, ottimizzazioni e approcci moderni che possono migliorare significativamente la qualità e l'efficienza del codice.

## Destructuring degli Array

Il destructuring è una sintassi introdotta in ES6 che permette di estrarre valori da array e oggetti in modo conciso:

```javascript
// Destructuring di base
let colori = ["rosso", "verde", "blu"];
let [primo, secondo, terzo] = colori;

console.log(primo);  // Output: "rosso"
console.log(secondo); // Output: "verde"
console.log(terzo);  // Output: "blu"

// Saltare elementi
let [a, , c] = colori;
console.log(a, c); // Output: "rosso" "blu"

// Utilizzare il rest operator (...)
let numeri = [1, 2, 3, 4, 5];
let [primo, ...resto] = numeri;
console.log(primo); // Output: 1
console.log(resto); // Output: [2, 3, 4, 5]

// Valori predefiniti
let [x = 0, y = 0, z = 0] = [1, 2];
console.log(x, y, z); // Output: 1 2 0
```

## Spread Operator

L'operatore spread (`...`) permette di espandere un array nei suoi elementi individuali:

```javascript
// Combinare array
let numeriPari = [2, 4, 6];
let numeriDispari = [1, 3, 5];
let tuttiNumeri = [...numeriPari, ...numeriDispari];
console.log(tuttiNumeri); // Output: [2, 4, 6, 1, 3, 5]

// Copiare array
let originale = [1, 2, 3];
let copia = [...originale];
console.log(copia); // Output: [1, 2, 3]

// Utilizzare spread con funzioni
let numeri = [1, 2, 3];
console.log(Math.max(...numeri)); // Output: 3

// Convertire una stringa in array di caratteri
let str = "ciao";
let caratteri = [...str];
console.log(caratteri); // Output: ["c", "i", "a", "o"]
```

## Array Multidimensionali

Gli array multidimensionali sono array che contengono altri array:

```javascript
// Array bidimensionale (matrice)
let matrice = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Accesso agli elementi
console.log(matrice[1][2]); // Output: 6 (riga 1, colonna 2)

// Iterazione su una matrice
for (let i = 0; i < matrice.length; i++) {
  for (let j = 0; j < matrice[i].length; j++) {
    console.log(`Elemento [${i}][${j}]: ${matrice[i][j]}`);
  }
}

// Utilizzando forEach
matrice.forEach((riga, i) => {
  riga.forEach((elemento, j) => {
    console.log(`Elemento [${i}][${j}]: ${elemento}`);
  });
});
```

## Metodi di Array Avanzati

### flat() e flatMap()

I metodi `flat()` e `flatMap()` sono stati introdotti in ES2019 per lavorare con array nidificati:

```javascript
// flat() appiattisce array nidificati
let nidificato = [1, 2, [3, 4, [5, 6]]];
console.log(nidificato.flat());     // Output: [1, 2, 3, 4, [5, 6]]
console.log(nidificato.flat(2));    // Output: [1, 2, 3, 4, 5, 6]
console.log(nidificato.flat(Infinity)); // Output: [1, 2, 3, 4, 5, 6]

// flatMap() combina map() e flat()
let frasi = ["Hello world", "JavaScript is fun"];
let parole = frasi.flatMap(frase => frase.split(" "));
console.log(parole); // Output: ["Hello", "world", "JavaScript", "is", "fun"]
```

### Array.from() con Mapping

`Array.from()` può accettare una funzione di mapping come secondo argomento:

```javascript
// Creare un array di quadrati
let quadrati = Array.from({length: 5}, (_, i) => (i + 1) ** 2);
console.log(quadrati); // Output: [1, 4, 9, 16, 25]

// Convertire NodeList in array con mapping
// Esempio con elementi DOM
// const links = document.querySelectorAll('a');
// const hrefs = Array.from(links, link => link.href);
```

## Tecniche di Elaborazione Funzionale

### Composizione di Metodi

Combinare metodi di array per operazioni complesse in modo leggibile:

```javascript
let studenti = [
  { nome: "Mario", voti: [8, 7, 9] },
  { nome: "Luigi", voti: [6, 5, 7] },
  { nome: "Giovanna", voti: [9, 9, 10] }
];

// Calcolare la media dei voti per ogni studente e filtrare quelli con media >= 8
let studentiEccellenti = studenti
  .map(studente => {
    // Calcola la media dei voti
    const mediaVoti = studente.voti.reduce((acc, voto) => acc + voto, 0) / studente.voti.length;
    // Restituisce un nuovo oggetto con la media calcolata
    return { nome: studente.nome, media: mediaVoti };
  })
  .filter(studente => studente.media >= 8)
  .sort((a, b) => b.media - a.media);

console.log(studentiEccellenti);
// Output: [{ nome: "Giovanna", media: 9.33... }, { nome: "Mario", media: 8 }]
```

### Riduzione Avanzata con reduce()

Utilizzare `reduce()` per operazioni complesse oltre la semplice somma:

```javascript
let prodotti = [
  { categoria: "Elettronica", nome: "Laptop", prezzo: 1200 },
  { categoria: "Abbigliamento", nome: "Giacca", prezzo: 150 },
  { categoria: "Elettronica", nome: "Smartphone", prezzo: 800 },
  { categoria: "Abbigliamento", nome: "Scarpe", prezzo: 100 }
];

// Raggruppare prodotti per categoria
let perCategoria = prodotti.reduce((acc, prodotto) => {
  // Se la categoria non esiste ancora, crea un array vuoto
  if (!acc[prodotto.categoria]) {
    acc[prodotto.categoria] = [];
  }
  // Aggiungi il prodotto all'array della sua categoria
  acc[prodotto.categoria].push(prodotto);
  return acc;
}, {});

console.log(perCategoria);
/* Output:
{
  "Elettronica": [
    { categoria: "Elettronica", nome: "Laptop", prezzo: 1200 },
    { categoria: "Elettronica", nome: "Smartphone", prezzo: 800 }
  ],
  "Abbigliamento": [
    { categoria: "Abbigliamento", nome: "Giacca", prezzo: 150 },
    { categoria: "Abbigliamento", nome: "Scarpe", prezzo: 100 }
  ]
}
*/

// Calcolare statistiche in un'unica passata
let statistiche = prodotti.reduce((stats, prodotto) => {
  stats.totale += prodotto.prezzo;
  stats.conteggio++;
  stats.media = stats.totale / stats.conteggio;
  stats.min = Math.min(stats.min, prodotto.prezzo);
  stats.max = Math.max(stats.max, prodotto.prezzo);
  return stats;
}, { totale: 0, conteggio: 0, media: 0, min: Infinity, max: -Infinity });

console.log(statistiche);
// Output: { totale: 2250, conteggio: 4, media: 562.5, min: 100, max: 1200 }
```

## Ottimizzazione delle Prestazioni

### Preallocazione di Array

Preallocare array di dimensioni note può migliorare le prestazioni:

```javascript
// Preallocazione di un array di dimensione nota
let n = 1000000;

// Approccio inefficiente (ridimensiona l'array ad ogni iterazione)
let array1 = [];
console.time('non-preallocato');
for (let i = 0; i < n; i++) {
  array1.push(i);
}
console.timeEnd('non-preallocato');

// Approccio ottimizzato (dimensione preallocata)
let array2 = new Array(n);
console.time('preallocato');
for (let i = 0; i < n; i++) {
  array2[i] = i;
}
console.timeEnd('preallocato');
```

### Evitare Modifiche durante l'Iterazione

Modificare un array mentre lo si itera può causare comportamenti imprevisti:

```javascript
// Approccio problematico
let numeri = [1, 2, 3, 4, 5];
for (let i = 0; i < numeri.length; i++) {
  if (numeri[i] % 2 === 0) {
    numeri.splice(i, 1); // Rimuove l'elemento corrente
    // PROBLEMA: l'indice non viene aggiustato e si salta un elemento
    // dopo ogni rimozione
  }
}
console.log(numeri); // Output: [1, 3, 5] (funziona per caso)

// Approccio corretto: iterare all'indietro
let numeri2 = [1, 2, 3, 4, 5];
for (let i = numeri2.length - 1; i >= 0; i--) {
  if (numeri2[i] % 2 === 0) {
    numeri2.splice(i, 1);
  }
}
console.log(numeri2); // Output: [1, 3, 5]

// Approccio alternativo: creare un nuovo array
let numeri3 = [1, 2, 3, 4, 5];
let risultato = numeri3.filter(n => n % 2 !== 0);
console.log(risultato); // Output: [1, 3, 5]
```

## Array Tipizzati

Gli array tipizzati sono strutture dati specializzate per lavorare con dati binari:

```javascript
// Creare un array tipizzato di 32-bit integer
let int32Array = new Int32Array(5);
int32Array[0] = 42;
int32Array[1] = 100;
console.log(int32Array); // Output: Int32Array(5) [42, 100, 0, 0, 0]

// Altri tipi di array tipizzati
let uint8Array = new Uint8Array([1, 2, 3]);
let float64Array = new Float64Array(3);

// Conversione tra array tipizzati e array normali
let normalArray = Array.from(int32Array);
console.log(normalArray); // Output: [42, 100, 0, 0, 0]
```

Gli array tipizzati sono utili per:
- Elaborazione di dati binari
- Operazioni su canvas e WebGL
- Elaborazione audio e video
- Comunicazione con API di basso livello

## Conclusione

Le tecniche avanzate per lavorare con gli array in JavaScript offrono potenti strumenti per scrivere codice più pulito, efficiente e manutenibile. Padroneggiare queste tecniche permette di affrontare problemi complessi con soluzioni eleganti e performanti.

[Torna all'indice](../README.md) | [Precedente: Metodi di Ricerca e Filtro](./04_Metodi_Ricerca_Filtro.md)