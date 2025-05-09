# Array e Collezioni in JavaScript

## Introduzione agli Array

Gli array sono strutture dati fondamentali in JavaScript che permettono di memorizzare e manipolare collezioni ordinate di elementi. Nel contesto della programmazione del robot LEGO EV3, gli array sono particolarmente utili per gestire serie di dati come letture di sensori, sequenze di movimenti o configurazioni.

## Creazione e Inizializzazione di Array

### Sintassi di Base

```javascript
// Creazione di un array vuoto
let lettureSensore = [];

// Creazione di un array con valori iniziali
let sequenzaMovimenti = ["avanti", "destra", "avanti", "sinistra"];

// Array di valori numerici
let velocitàMotori = [50, 75, 100, 25];

// Array misto (sconsigliato ma possibile)
let datiMisti = ["sensore1", 42, true, [1, 2, 3]];
```

## Accesso agli Elementi

Gli elementi di un array sono indicizzati a partire da 0:

```javascript
let colori = ["rosso", "verde", "blu"];

// Accesso al primo elemento (indice 0)
let primoColore = colori[0];  // "rosso"

// Accesso all'ultimo elemento
let ultimoColore = colori[colori.length - 1];  // "blu"
```

## Proprietà e Metodi Principali

### Proprietà `length`

La proprietà `length` restituisce il numero di elementi in un array:

```javascript
let numElementi = colori.length;  // 3
```

### Metodi per Aggiungere/Rimuovere Elementi

```javascript
// Aggiungere elementi alla fine dell'array
colori.push("giallo");  // ora colori = ["rosso", "verde", "blu", "giallo"]

// Rimuovere l'ultimo elemento
let ultimoRimosso = colori.pop();  // rimuove "giallo" e lo restituisce

// Aggiungere elementi all'inizio dell'array
colori.unshift("nero");  // ora colori = ["nero", "rosso", "verde", "blu"]

// Rimuovere il primo elemento
let primoRimosso = colori.shift();  // rimuove "nero" e lo restituisce
```

### Metodi per Modificare Array

```javascript
// Estrarre una porzione dell'array (non modifica l'originale)
let porzione = colori.slice(1, 3);  // ["verde", "blu"]

// Rimuovere/sostituire elementi
colori.splice(1, 1, "magenta");  // rimuove 1 elemento dalla posizione 1 e inserisce "magenta"
                                // ora colori = ["rosso", "magenta", "blu"]
```

## Iterazione sugli Array

Esistono diversi modi per iterare sugli elementi di un array:

```javascript
// Ciclo for tradizionale
for (let i = 0; i < colori.length; i++) {
    console.log(`Colore ${i+1}: ${colori[i]}`);
}

// Ciclo for...of (ES6)
for (let colore of colori) {
    console.log(`Colore: ${colore}`);
}

// Metodo forEach
colori.forEach((colore, indice) => {
    console.log(`Colore ${indice+1}: ${colore}`);
});
```

## Metodi di Elaborazione degli Array

JavaScript offre potenti metodi per elaborare gli array:

```javascript
// Filtrare elementi
let numeri = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let pari = numeri.filter(num => num % 2 === 0);  // [2, 4, 6, 8, 10]

// Trasformare elementi
let quadrati = numeri.map(num => num * num);  // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

// Ridurre a un singolo valore
let somma = numeri.reduce((acc, num) => acc + num, 0);  // 55
```

## Array Bidimensionali

Gli array possono contenere altri array, creando strutture multidimensionali:

```javascript
// Griglia 3x3 (utile per mappature)
let griglia = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Accesso agli elementi
let elemento = griglia[1][2];  // 6 (riga 1, colonna 2)
```

## Esempi Pratici con EV3

### Registrazione di Letture del Sensore

```javascript
// Registrare le ultime 10 letture di un sensore di distanza
let lettureDistanza = [];

function registraLettura() {
    let distanza = sensors.ultrasonic1.distance();
    
    // Aggiungi la nuova lettura
    lettureDistanza.push(distanza);
    
    // Mantieni solo le ultime 10 letture
    if (lettureDistanza.length > 10) {
        lettureDistanza.shift();  // rimuovi la lettura più vecchia
    }
}
```

### Sequenza di Movimenti

```javascript
// Definire una sequenza di movimenti
let sequenza = [
    { direzione: "avanti", durata: 2000, velocità: 50 },
    { direzione: "destra", durata: 1000, velocità: 30 },
    { direzione: "avanti", durata: 1500, velocità: 50 },
    { direzione: "sinistra", durata: 1000, velocità: 30 }
];

// Eseguire la sequenza
async function eseguiSequenza() {
    for (let movimento of sequenza) {
        switch (movimento.direzione) {
            case "avanti":
                motors.largeAB.run(movimento.velocità);
                break;
            case "destra":
                motors.largeA.run(movimento.velocità);
                motors.largeB.run(-movimento.velocità);
                break;
            case "sinistra":
                motors.largeA.run(-movimento.velocità);
                motors.largeB.run(movimento.velocità);
                break;
        }
        
        await pause(movimento.durata);
        motors.largeAB.stop();
    }
}
```

## Considerazioni sulle Prestazioni

Quando si lavora con array sul brick EV3, è importante considerare le limitazioni di memoria e prestazioni:

- Evita array troppo grandi che potrebbero esaurire la memoria disponibile
- Preferisci operazioni in-place che modificano l'array esistente anziché crearne di nuovi
- Considera l'uso di strutture dati più efficienti per casi specifici

## Esercizi Pratici

1. Crea un array per memorizzare le ultime 20 letture di un sensore di luce e calcola la media delle letture
2. Implementa una "coda di comandi" usando un array, dove il robot esegue i comandi in sequenza
3. Crea una griglia 2D per mappare un ambiente semplice, dove ogni cella contiene informazioni sul terreno

---

**Prossima Guida**: [Oggetti e Proprietà](02-OggettiProprietà.md)

**Modulo**: [Gestione Dati e Strutture Dati](README.md)

[Torna all'indice del corso](../README.md)