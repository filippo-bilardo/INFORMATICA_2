# Metodi di Ricerca e Filtro degli Array in JavaScript

JavaScript offre diversi metodi potenti per cercare e filtrare elementi all'interno degli array. Questi metodi sono fondamentali per manipolare e analizzare i dati in modo efficiente. In questa guida, esploreremo i principali metodi di ricerca e filtro degli array.

## Metodi di Filtro

### filter()

Il metodo `filter()` crea un nuovo array contenente tutti gli elementi che soddisfano una condizione specificata in una funzione di callback:

```javascript
let numeri = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filtrare i numeri pari
let pari = numeri.filter(function(numero) {
  return numero % 2 === 0;
});

console.log(pari); // Output: [2, 4, 6, 8, 10]

// Utilizzando arrow function
let maggioriDiCinque = numeri.filter(numero => numero > 5);
console.log(maggioriDiCinque); // Output: [6, 7, 8, 9, 10]
```

Esempio con array di oggetti:

```javascript
let persone = [
  { nome: "Mario", età: 25 },
  { nome: "Luigi", età: 17 },
  { nome: "Giovanna", età: 30 },
  { nome: "Anna", età: 16 }
];

// Filtrare le persone maggiorenni
let maggiorenni = persone.filter(persona => persona.età >= 18);
console.log(maggiorenni);
// Output: [{ nome: "Mario", età: 25 }, { nome: "Giovanna", età: 30 }]
```

Caratteristiche principali:
- Restituisce un nuovo array senza modificare l'originale
- Se nessun elemento soddisfa la condizione, restituisce un array vuoto
- La funzione di callback riceve elemento, indice e array completo come parametri

## Metodi di Ricerca

### find()

Il metodo `find()` restituisce il primo elemento dell'array che soddisfa una condizione specificata:

```javascript
let numeri = [5, 12, 8, 130, 44];

let trovato = numeri.find(elemento => elemento > 10);
console.log(trovato); // Output: 12

// Se nessun elemento soddisfa la condizione, restituisce undefined
let nonTrovato = numeri.find(elemento => elemento > 200);
console.log(nonTrovato); // Output: undefined
```

Esempio con array di oggetti:

```javascript
let utenti = [
  { id: 1, nome: "Alice" },
  { id: 2, nome: "Bob" },
  { id: 3, nome: "Carlo" }
];

let utente = utenti.find(u => u.id === 2);
console.log(utente); // Output: { id: 2, nome: "Bob" }
```

### findIndex()

Il metodo `findIndex()` funziona come `find()`, ma restituisce l'indice del primo elemento che soddisfa la condizione anziché l'elemento stesso:

```javascript
let numeri = [5, 12, 8, 130, 44];

let indice = numeri.findIndex(elemento => elemento > 10);
console.log(indice); // Output: 1 (indice dell'elemento 12)

// Se nessun elemento soddisfa la condizione, restituisce -1
let nonTrovato = numeri.findIndex(elemento => elemento > 200);
console.log(nonTrovato); // Output: -1
```

### indexOf() e lastIndexOf()

I metodi `indexOf()` e `lastIndexOf()` cercano un elemento specifico nell'array e restituiscono il suo indice:

```javascript
let frutta = ["mela", "banana", "arancia", "mela", "kiwi"];

// indexOf() trova la prima occorrenza
let primaOccorrenza = frutta.indexOf("mela");
console.log(primaOccorrenza); // Output: 0

// lastIndexOf() trova l'ultima occorrenza
let ultimaOccorrenza = frutta.lastIndexOf("mela");
console.log(ultimaOccorrenza); // Output: 3

// Se l'elemento non è presente, entrambi restituiscono -1
let nonPresente = frutta.indexOf("ananas");
console.log(nonPresente); // Output: -1

// È possibile specificare un indice di partenza per la ricerca
let daIndice = frutta.indexOf("mela", 1);
console.log(daIndice); // Output: 3 (salta la prima "mela" all'indice 0)
```

Differenze principali:
- `indexOf()` e `lastIndexOf()` utilizzano confronto di uguaglianza stretta (`===`)
- `find()` e `findIndex()` utilizzano una funzione di callback per definire la condizione

### includes()

Il metodo `includes()` verifica se un array contiene un determinato elemento e restituisce `true` o `false`:

```javascript
let numeri = [1, 2, 3, 4, 5];

console.log(numeri.includes(3)); // Output: true
console.log(numeri.includes(6)); // Output: false

// È possibile specificare un indice di partenza per la ricerca
console.log(numeri.includes(1, 1)); // Output: false (cerca a partire dall'indice 1)
```

## Metodi di Verifica

### some() e every()

I metodi `some()` e `every()` verificano se alcuni o tutti gli elementi dell'array soddisfano una condizione:

```javascript
let numeri = [1, 2, 3, 4, 5];

// some() verifica se almeno un elemento soddisfa la condizione
let almeno = numeri.some(numero => numero > 3);
console.log(almeno); // Output: true (4 e 5 sono maggiori di 3)

// every() verifica se tutti gli elementi soddisfano la condizione
let tutti = numeri.every(numero => numero > 0);
console.log(tutti); // Output: true (tutti sono maggiori di 0)

let tuttiMaggioriDiTre = numeri.every(numero => numero > 3);
console.log(tuttiMaggioriDiTre); // Output: false (non tutti sono maggiori di 3)
```

Esempio con array di oggetti:

```javascript
let studenti = [
  { nome: "Mario", promosso: true },
  { nome: "Luigi", promosso: true },
  { nome: "Giovanna", promosso: false }
];

// Verificare se tutti gli studenti sono promossi
let tuttiPromossi = studenti.every(studente => studente.promosso);
console.log(tuttiPromossi); // Output: false

// Verificare se almeno uno studente è promosso
let almeno = studenti.some(studente => studente.promosso);
console.log(almeno); // Output: true
```

## Combinare Metodi di Ricerca e Filtro

È possibile combinare diversi metodi per operazioni più complesse:

```javascript
let prodotti = [
  { id: 1, nome: "Laptop", prezzo: 1200, disponibile: true },
  { id: 2, nome: "Smartphone", prezzo: 800, disponibile: false },
  { id: 3, nome: "Tablet", prezzo: 500, disponibile: true },
  { id: 4, nome: "Monitor", prezzo: 300, disponibile: true }
];

// Filtrare i prodotti disponibili e mapparli per ottenere solo i nomi
let nomiDisponibili = prodotti
  .filter(prodotto => prodotto.disponibile)
  .map(prodotto => prodotto.nome);

console.log(nomiDisponibili); // Output: ["Laptop", "Tablet", "Monitor"]

// Trovare il primo prodotto disponibile con prezzo inferiore a 600€
let economico = prodotti.find(p => p.disponibile && p.prezzo < 600);
console.log(economico); // Output: { id: 3, nome: "Tablet", prezzo: 500, disponibile: true }
```

## Best Practices

1. **Preferire metodi di array a cicli manuali**: I metodi di array sono più leggibili e meno soggetti a errori rispetto ai cicli manuali.

2. **Utilizzare il metodo più appropriato**: Scegliere il metodo giusto in base all'obiettivo:
   - `find()` quando serve solo il primo elemento che soddisfa una condizione
   - `filter()` quando servono tutti gli elementi che soddisfano una condizione
   - `some()`/`every()` quando serve solo verificare una condizione senza ottenere gli elementi

3. **Attenzione alle prestazioni**: Per array molto grandi, considera che:
   - `find()` e `some()` si fermano al primo elemento che soddisfa la condizione
   - `filter()` ed `every()` esaminano sempre tutti gli elementi

4. **Utilizzare arrow function** per rendere il codice più conciso e leggibile.

## Conclusione

I metodi di ricerca e filtro degli array sono strumenti potenti che semplificano notevolmente la manipolazione dei dati in JavaScript. Padroneggiare questi metodi è essenziale per scrivere codice più pulito, efficiente e manutenibile.

[Torna all'indice](../README.md) | [Precedente: Metodi di Iterazione](./03_Metodi_Iterazione.md) | [Successivo: Tecniche Avanzate con gli Array](./05_Tecniche_Avanzate.md)