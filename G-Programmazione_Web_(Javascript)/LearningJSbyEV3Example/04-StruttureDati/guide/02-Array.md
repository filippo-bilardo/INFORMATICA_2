# Guida: Array in JavaScript per EV3

Gli array sono una delle strutture dati più fondamentali e versatili in JavaScript. Permettono di memorizzare una collezione ordinata di valori, che possono essere di qualsiasi tipo (numeri, stringhe, booleani, oggetti, altri array, ecc.). Questa guida esplora come creare, accedere e manipolare array, con esempi rilevanti per la programmazione dell'EV3.

## Cosa sono gli Array?

Un array è un oggetto speciale che rappresenta una lista di elementi. Ogni elemento in un array ha un indice numerico (a partire da 0) che ne indica la posizione.

**Caratteristiche principali:**
-   **Ordinati**: Gli elementi mantengono l'ordine in cui sono stati inseriti.
-   **Indicizzati**: Si accede agli elementi tramite il loro indice.
-   **Dinamici**: La dimensione di un array può cambiare; si possono aggiungere o rimuovere elementi.
-   **Eterogenei**: Possono contenere elementi di tipi diversi (anche se spesso si usano per collezioni omogenee).

## Creazione di Array

Ci sono diversi modi per creare un array:

1.  **Literal dell'Array**: Il modo più comune e conciso.
    ```javascript
    // Un array vuoto
    let emptyArray = [];

    // Un array di numeri (es. velocità dei motori per una sequenza)
    let motorSpeeds = [50, 75, 100, 75, 50];

    // Un array di stringhe (es. nomi dei file audio da riprodurre)
    let soundFiles = ["hello.wav", "turn_left.wav", "obstacle.wav"];

    // Un array misto (meno comune per dati strutturati, ma possibile)
    let mixedData = ["EV3", 3, true, null];
    ```

2.  **Costruttore `Array()`**:
    ```javascript
    let anArray = new Array(); // Array vuoto
    let anotherArray = new Array(10, 20, 30); // [10, 20, 30]

    // Attenzione: se si passa un solo numero, crea un array con quella lunghezza e elementi vuoti
    let sizedArray = new Array(5); // Crea un array di lunghezza 5, con 5 elementi vuoti (undefined)
    console.log(sizedArray.length); // 5
    console.log(sizedArray[0]);     // undefined
    ```

## Accesso agli Elementi

Si accede agli elementi di un array usando la notazione a parentesi quadre `[]` con l'indice dell'elemento. Ricorda che gli indici partono da 0.

```javascript
let sensorReadings = [25, 30, 28, 35, 32]; // Letture da un sensore di distanza

console.log(sensorReadings[0]); // Output: 25 (il primo elemento)
console.log(sensorReadings[2]); // Output: 28 (il terzo elemento)

// Modificare un elemento
sensorReadings[1] = 31;
console.log(sensorReadings); // Output: [25, 31, 28, 35, 32]

// Accedere a un indice non esistente restituisce undefined
console.log(sensorReadings[10]); // Output: undefined
```

## Proprietà e Metodi Utili degli Array

### `length`
La proprietà `length` restituisce il numero di elementi in un array.

```javascript
let commands = ["forward", "left", "forward", "stop"];
console.log(commands.length); // Output: 4
```
La proprietà `length` è anche scrivibile e può essere usata per troncare o estendere un array (anche se estendere in questo modo aggiunge elementi `undefined`).

### Metodi per Aggiungere/Rimuovere Elementi

-   **`push()`**: Aggiunge uno o più elementi alla fine dell'array. Restituisce la nuova lunghezza.
    ```javascript
    let actions = ["move"];
    actions.push("turn");
    console.log(actions); // Output: ["move", "turn"]
    actions.push("speak", "wait");
    console.log(actions); // Output: ["move", "turn", "speak", "wait"]
    ```

-   **`pop()`**: Rimuove l'ultimo elemento dall'array e lo restituisce.
    ```javascript
    let tasks = ["measure_distance", "rotate_motor", "play_sound"];
    let lastTask = tasks.pop();
    console.log(lastTask); // Output: "play_sound"
    console.log(tasks);    // Output: ["measure_distance", "rotate_motor"]
    ```

-   **`unshift()`**: Aggiunge uno o più elementi all'inizio dell'array. Restituisce la nuova lunghezza.
    ```javascript
    let sequence = [2, 3, 4];
    sequence.unshift(1);
    console.log(sequence); // Output: [1, 2, 3, 4]
    sequence.unshift(-1, 0);
    console.log(sequence); // Output: [-1, 0, 1, 2, 3, 4]
    ```

-   **`shift()`**: Rimuove il primo elemento dall'array e lo restituisce.
    ```javascript
    let sensorPorts = ["S1", "S2", "S3"];
    let firstPort = sensorPorts.shift();
    console.log(firstPort);   // Output: "S1"
    console.log(sensorPorts); // Output: ["S2", "S3"]
    ```

### Iterare sugli Array
Ci sono molti modi per iterare (ciclare) sugli elementi di un array. Questi saranno trattati in dettaglio nella guida sull'iterazione, ma ecco un'anteprima:

-   **Ciclo `for`**:
    ```javascript
    let angles = [0, 90, 180, 270];
    for (let i = 0; i < angles.length; i++) {
        console.log(`Ruota di ${angles[i]} gradi`);
    }
    ```

-   **`forEach()`**: Esegue una funzione per ogni elemento.
    ```javascript
    let colorCodes = ["red", "green", "blue"];
    colorCodes.forEach(function(color, index) {
        console.log(`Colore ${index + 1}: ${color}`);
    });
    ```

-   **Ciclo `for...of`**: Itera sui valori dell'array.
    ```javascript
    let motorTargets = [100, -100, 50, -50];
    for (const target of motorTargets) {
        console.log(`Muovi motore a target: ${target}`);
    }
    ```

### Altri Metodi Utili

-   **`slice(start, end)`**: Restituisce una *nuova* array contenente una copia superficiale di una porzione dell'array originale. `end` è escluso. Non modifica l'array originale.
    ```javascript
    let numbers = [10, 20, 30, 40, 50];
    let subArray = numbers.slice(1, 4); // Elementi dall'indice 1 all'indice 3
    console.log(subArray); // Output: [20, 30, 40]
    console.log(numbers);  // Output: [10, 20, 30, 40, 50] (invariato)
    ```

-   **`splice(start, deleteCount, ...itemsToAdd)`**: Modifica l'array originale rimuovendo, sostituendo o aggiungendo elementi. Restituisce un array degli elementi eliminati.
    ```javascript
    let letters = ["a", "b", "c", "d", "e"];
    // Rimuove 2 elementi a partire dall'indice 1 ("b", "c")
    let removed = letters.splice(1, 2);
    console.log(letters);  // Output: ["a", "d", "e"]
    console.log(removed);  // Output: ["b", "c"]

    // Rimuove 1 elemento all'indice 2 ("e") e inserisce "X", "Y"
    letters.splice(2, 1, "X", "Y");
    console.log(letters);  // Output: ["a", "d", "X", "Y"]
    ```

-   **`concat(...arraysOrValues)`**: Restituisce un *nuovo* array che è la concatenazione dell'array originale con altri array e/o valori.
    ```javascript
    let arr1 = [1, 2];
    let arr2 = [3, 4];
    let arr3 = arr1.concat(arr2, 5, [6, 7]);
    console.log(arr3); // Output: [1, 2, 3, 4, 5, 6, 7]
    ```

-   **`indexOf(item, fromIndex)`**: Restituisce il primo indice a cui un dato elemento può essere trovato nell'array, o -1 se non è presente.
    ```javascript
    let modes = ["idle", "patrol", "attack", "idle"];
    console.log(modes.indexOf("patrol")); // Output: 1
    console.log(modes.indexOf("idle"));   // Output: 0 (trova la prima occorrenza)
    console.log(modes.indexOf("idle", 1)); // Output: 3 (inizia la ricerca dall'indice 1)
    console.log(modes.indexOf("search")); // Output: -1
    ```

-   **`includes(item, fromIndex)`**: Determina se un array include un certo valore tra i suoi elementi, restituendo `true` o `false`.
    ```javascript
    let sensorData = [10, 20, NaN, 40];
    console.log(sensorData.includes(20));    // Output: true
    console.log(sensorData.includes(30));    // Output: false
    console.log(sensorData.includes(NaN));   // Output: true (a differenza di indexOf)
    ```

-   **`join(separator)`**: Unisce tutti gli elementi di un array in una stringa. Il separatore di default è la virgola.
    ```javascript
    let path = ["usr", "local", "bin"];
    console.log(path.join("/"));  // Output: "usr/local/bin"
    console.log(path.join(" - ")); // Output: "usr - local - bin"
    ```

-   **`map(callbackFn)`**: Crea un *nuovo* array popolato con i risultati della chiamata di una funzione fornita su ogni elemento dell'array chiamante.
    ```javascript
    let sensorValues = [10, 22, 35, 41]; // Valori grezzi del sensore
    // Converti i valori, ad esempio, in cm
    let valuesInCm = sensorValues.map(value => value / 10);
    console.log(valuesInCm); // Output: [1, 2.2, 3.5, 4.1]
    ```

-   **`filter(callbackFn)`**: Crea un *nuovo* array con tutti gli elementi che passano il test implementato dalla funzione fornita.
    ```javascript
    let distances = [15, 7, 22, 5, 30]; // Distanze rilevate
    // Filtra solo le distanze "pericolosamente vicine" (es. < 10 cm)
    let closeObjects = distances.filter(distance => distance < 10);
    console.log(closeObjects); // Output: [7, 5]
    ```

-   **`reduce(callbackFn, initialValue)`**: Applica una funzione "riduttore" contro un accumulatore e ogni elemento dell'array (da sinistra a destra) per ridurlo a un singolo valore.
    ```javascript
    let motorRotations = [90, 180, -90, 360]; // Rotazioni in gradi
    // Calcola la rotazione totale
    let totalRotation = motorRotations.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(totalRotation); // Output: 540
    ```

## Array Multidimensionali (Array di Array)

Puoi creare array che contengono altri array. Questo è utile per rappresentare griglie, matrici, o sequenze di coordinate.

```javascript
// Esempio: un percorso per l'EV3 come lista di coordinate [x, y]
let pathCoordinates = [
    [0, 0],   // Punto di partenza
    [0, 100], // Muovi avanti
    [50, 100], // Muovi a destra
    [50, 0],  // Muovi indietro
    [0, 0]    // Torna al punto di partenza
];

console.log(pathCoordinates[1]);    // Output: [0, 100] (la seconda coordinata)
console.log(pathCoordinates[1][1]); // Output: 100 (la componente y della seconda coordinata)

// Iterare su un array multidimensionale
pathCoordinates.forEach(coord => {
    console.log(`Muovi a X: ${coord[0]}, Y: ${coord[1]}`);
});
```

## Applicazioni per EV3

-   **Sequenze di Movimenti**: Memorizzare una serie di comandi (es. `["forward", 1000, "turn_left", 500]`) o parametri (velocità, durata).
    ```javascript
    let movementSequence = [
        { action: "drive", speed: 50, duration: 2000 }, // Guida per 2s a velocità 50
        { action: "turn", degrees: 90, speed: 30 },    // Gira di 90 gradi a velocità 30
        { action: "beep" }
    ];
    ```
-   **Letture dei Sensori**: Collezionare multiple letture da un sensore per calcolare medie, massimi, minimi, o per rilevare pattern.
    ```javascript
    let lightSensorHistory = [];
    const MAX_HISTORY = 10;

    function recordLightValue(value) {
        lightSensorHistory.push(value);
        if (lightSensorHistory.length > MAX_HISTORY) {
            lightSensorHistory.shift(); // Mantieni solo le ultime N letture
        }
    }
    recordLightValue(45);
    recordLightValue(48);
    console.log(lightSensorHistory);
    ```
-   **Mappatura**: Memorizzare una semplice mappa dell'ambiente come una griglia.
-   **Configurazioni**: Una lista di configurazioni per diverse modalità del robot.

Gli array sono uno strumento potente. Combinati con gli oggetti (trattati nella prossima guida), permettono di strutturare dati complessi in modo efficace per la programmazione del tuo robot EV3.
