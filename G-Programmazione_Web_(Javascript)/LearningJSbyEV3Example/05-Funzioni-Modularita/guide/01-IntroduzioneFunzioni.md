# Guida: Introduzione alle Funzioni in JavaScript

Le funzioni sono uno dei blocchi costitutivi fondamentali in JavaScript. Una funzione è una procedura JavaScript — un insieme di istruzioni che esegue un compito o calcola un valore. Per usare una funzione, devi definirla da qualche parte nello scope da cui vuoi chiamarla.

## Definizione di una Funzione

Ci sono diversi modi per definire le funzioni in JavaScript:

### 1. Dichiarazione di Funzione (Function Declaration)
Questo è il modo più comune per definire una funzione. Utilizza la keyword `function`, seguita dal nome della funzione, una lista di parametri tra parentesi `()` (separati da virgole), e un blocco di codice `{}` che contiene le istruzioni.

```javascript
function saluta(nome) {
  console.log("Ciao, " + nome + "!");
}

// Chiamata della funzione
saluta("Mondo"); // Output: Ciao, Mondo!
```

### 2. Espressione di Funzione (Function Expression)
Una funzione può anche essere definita come parte di un'espressione. In questo caso, la funzione è solitamente anonima (non ha un nome) e viene assegnata a una variabile.

```javascript
const mioSaluto = function(nome) {
  console.log("Ciao, " + nome + "!");
};

// Chiamata della funzione
mioSaluto("Alice"); // Output: Ciao, Alice!
```

Le espressioni di funzione sono utili quando si passano funzioni come argomenti ad altre funzioni (callback) o quando si creano funzioni che vengono invocate immediatamente (IIFE - Immediately Invoked Function Expression).

### 3. Arrow Function (Funzioni Freccia)
Introdotte in ES6, le arrow function offrono una sintassi più concisa per scrivere funzioni. Sono particolarmente utili per funzioni anonime e per preservare il valore di `this` dal contesto lessicale circostante.

```javascript
const aggiungi = (a, b) => {
  return a + b;
};

// Forma ancora più concisa per un singolo statement di ritorno
const moltiplica = (a, b) => a * b;

console.log(aggiungi(5, 3));      // Output: 8
console.log(moltiplica(5, 3)); // Output: 15
```

## Chiamata di una Funzione

Una volta definita una funzione, puoi "chiamarla" o "invocarla" per eseguire il codice al suo interno. Questo si fa usando il nome della funzione seguito da parentesi `()`.
Se la funzione accetta parametri, devi passare i valori (argomenti) all'interno delle parentesi.

```javascript
function mostraMessaggio() {
  console.log("Questa è una funzione!");
}

mostraMessaggio(); // Chiama la funzione, Output: Questa è una funzione!

function somma(num1, num2) {
  return num1 + num2;
}

let risultato = somma(10, 20);
console.log(risultato); // Output: 30
```

## Vantaggi dell'Uso delle Funzioni

- **Riusabilità del Codice**: Scrivi il codice una volta e usalo più volte.
- **Modularità**: Suddividi un programma complesso in parti più piccole e gestibili.
- **Astrazione**: Nascondi i dettagli di implementazione e fornisci un'interfaccia semplice per utilizzare una funzionalità.
- **Leggibilità**: Rendi il codice più facile da leggere e comprendere.
- **Manutenibilità**: Modifiche o correzioni di bug in una funzione si riflettono ovunque essa sia utilizzata.

## Funzioni nel Contesto EV3 con MakeCode

In MakeCode per EV3, le funzioni sono estremamente utili per organizzare i comandi del robot. Ad esempio, potresti creare funzioni per:
- Far avanzare il robot per una certa distanza.
- Far girare il robot di un certo angolo.
- Leggere un valore da un sensore e reagire di conseguenza.
- Eseguire una sequenza di azioni complesse (es. "prendi oggetto").

```javascript
// Esempio di funzione per EV3 (concettuale, la sintassi MakeCode potrebbe variare)
function muoviAvanti(velocita, durataMs) {
  motors.largeBC.run(velocita);
  pause(durataMs);
  motors.largeBC.stop();
}

// Utilizzo della funzione
muoviAvanti(50, 2000); // Muove il robot avanti al 50% della velocità per 2 secondi
```

Comprendere e utilizzare efficacemente le funzioni è un passo cruciale per diventare un programmatore JavaScript competente e per creare progetti EV3 sofisticati e ben organizzati.

---

[⬅️ Torna alle Guide del Modulo 05](./README.md)
[🏡 Torna all'Indice del Corso](../../../README.md)