<<<<<<< HEAD
# Guida 2: Array in JavaScript

## Introduzione agli Array

Un array è una struttura dati fondamentale in JavaScript che permette di memorizzare una collezione ordinata di elementi. Questi elementi possono essere di qualsiasi tipo: numeri, stringhe, booleani, oggetti, o anche altri array. Gli array sono particolarmente utili quando si ha bisogno di gestire liste di dati, come le letture multiple da un sensore dell'EV3, una sequenza di comandi, o le coordinate di un percorso.

## Creazione di Array

Ci sono diversi modi per creare un array in JavaScript:

1.  **Array Literal (Notazione Letterale)**: È il modo più comune e conciso.
    ```javascript
    let lettureSensore = [25, 26, 24, 27, 25]; // Array di numeri
    let comandiMotore = ["avanti", "destra", "avanti", "stop"]; // Array di stringhe
    let datiMisti = ["sensoreA", 100, true]; // Array con tipi misti
    let arrayVuoto = []; // Un array vuoto
=======
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
>>>>>>> 760d5bd66d3e244e5fd0e53c590d3de7a57c93ff
    ```

2.  **Costruttore `Array()`**:
    ```javascript
<<<<<<< HEAD
    let altroArray = new Array(10, 20, 30);
    let arrayConDimensione = new Array(5); // Crea un array vuoto con lunghezza 5
    ```
    Generalmente, la notazione letterale `[]` è preferita per la sua semplicità e leggibilità.

## Accesso agli Elementi

Gli elementi di un array sono accessibili tramite il loro **indice**, che è un numero intero che parte da 0 per il primo elemento.

```javascript
let coloriRilevati = ["rosso", "blu", "verde", "giallo"];

console.log(coloriRilevati[0]); // Output: "rosso" (primo elemento)
console.log(coloriRilevati[2]); // Output: "verde" (terzo elemento)

// Modificare un elemento
coloriRilevati[1] = "ciano";
console.log(coloriRilevati); // Output: ["rosso", "ciano", "verde", "giallo"]
```

La proprietà `length` di un array restituisce il numero di elementi che contiene.

```javascript
console.log(coloriRilevati.length); // Output: 4
```

## Metodi Utili per gli Array (Comuni per EV3)

JavaScript fornisce molti metodi integrati per manipolare gli array. Ecco alcuni dei più utili per la programmazione EV3:

-   **`push()`**: Aggiunge uno o più elementi alla fine dell'array.
    ```javascript
    let sequenzaPassi = ["passo1", "passo2"];
    sequenzaPassi.push("passo3");
    console.log(sequenzaPassi); // Output: ["passo1", "passo2", "passo3"]
=======
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
>>>>>>> 760d5bd66d3e244e5fd0e53c590d3de7a57c93ff
    ```

-   **`pop()`**: Rimuove l'ultimo elemento dall'array e lo restituisce.
    ```javascript
<<<<<<< HEAD
    let ultimoPasso = sequenzaPassi.pop();
    console.log(ultimoPasso);     // Output: "passo3"
    console.log(sequenzaPassi); // Output: ["passo1", "passo2"]
    ```

-   **`shift()`**: Rimuove il primo elemento dall'array e lo restituisce (e sposta gli altri elementi).
    ```javascript
    let primoPasso = sequenzaPassi.shift();
    console.log(primoPasso);      // Output: "passo1"
    console.log(sequenzaPassi); // Output: ["passo2"]
    ```

-   **`unshift()`**: Aggiunge uno o più elementi all'inizio dell'array (e sposta gli altri elementi).
    ```javascript
    sequenzaPassi.unshift("nuovoInizio");
    console.log(sequenzaPassi); // Output: ["nuovoInizio", "passo2"]
    ```

-   **`slice()`**: Restituisce una copia superficiale (shallow copy) di una porzione dell'array in un nuovo array. Non modifica l'array originale.
    ```javascript
    let numeri = [10, 20, 30, 40, 50];
    let sottoArray = numeri.slice(1, 4); // Elementi dall'indice 1 all'indice 3 (4 escluso)
    console.log(sottoArray); // Output: [20, 30, 40]
    ```

-   **`splice()`**: Modifica il contenuto di un array rimuovendo o sostituendo elementi esistenti e/o aggiungendo nuovi elementi *in place* (modifica l'array originale).
    ```javascript
    let lettere = ['a', 'b', 'c', 'd', 'e'];
    // Rimuove 2 elementi a partire dall'indice 1 e inserisce 'x' e 'y'
    lettere.splice(1, 2, 'x', 'y');
    console.log(lettere); // Output: ['a', 'x', 'y', 'd', 'e']
    ```

-   **`includes()`**: Determina se un array include un certo valore tra i suoi elementi, restituendo `true` o `false`.
    ```javascript
    let sensoriAttivi = ["ultrasuoni", "colore", "tocco"];
    console.log(sensoriAttivi.includes("colore")); // Output: true
    console.log(sensoriAttivi.includes("giroscopio")); // Output: false
    ```

-   **`indexOf()`**: Restituisce il primo indice al quale un dato elemento può essere trovato nell'array, o -1 se non è presente.
    ```javascript
    console.log(sensoriAttivi.indexOf("tocco")); // Output: 2
    ```

-   **`map()`**: Crea un nuovo array popolato con i risultati della chiamata di una funzione fornita su ogni elemento dell'array chiamante. Molto utile per trasformare dati.
    ```javascript
    let lettureRawSensoreLuce = [300, 350, 400, 450, 500]; // Valori grezzi da 0 a 1000
    // Convertiamo i valori in percentuali (supponendo che 500 sia il 100% per questo esempio)
    let letturePercentuali = lettureRawSensoreLuce.map(function(valore) {
        return (valore / 5) + "%"; // Semplice conversione
    });
    console.log(letturePercentuali); // Output: ["60%", "70%", "80%", "90%", "100%"]
    ```

-   **`filter()`**: Crea un nuovo array con tutti gli elementi che superano il test implementato dalla funzione fornita.
    ```javascript
    let distanzeRilevate = [15, 25, 8, 40, 12]; // Distanze in cm
    // Filtriamo solo le distanze considerate "vicine" (es. < 20cm)
    let ostacoliVicini = distanzeRilevate.filter(function(distanza) {
        return distanza < 20;
    });
    console.log(ostacoliVicini); // Output: [15, 8, 12]
    ```

-   **`reduce()`**: Applica una funzione contro un accumulatore e ogni elemento dell'array (da sinistra a destra) per ridurlo a un singolo valore.
    ```javascript
    let tempiGiro = [10.2, 10.5, 10.1, 10.3]; // Secondi
    // Calcoliamo il tempo totale
    let tempoTotale = tempiGiro.reduce(function(accumulatore, tempoCorrente) {
        return accumulatore + tempoCorrente;
    }, 0); // 0 è il valore iniziale dell'accumulatore
    console.log(tempoTotale.toFixed(2)); // Output: "41.10"

    // Calcolare la media delle letture di un sensore
    let lettureSensore = [22, 23, 21, 24, 22];
    let mediaLetture = lettureSensore.reduce((acc, val, index, arr) => {
        acc += val;
        return index === arr.length - 1 ? acc / arr.length : acc;
    }, 0);
    console.log(mediaLetture); // Output: 22.4
    ```

## Iterazione su Array

Esistono diversi modi per scorrere gli elementi di un array. Questi saranno trattati in dettaglio nella guida sull'iterazione, ma ecco un'anteprima:

-   Ciclo `for`:
    ```javascript
    let angoliMotore = [90, 180, -90, 360];
    for (let i = 0; i < angoliMotore.length; i++) {
        console.log(`Ruota motore di: ${angoliMotore[i]} gradi`);
    }
    ```

-   Ciclo `for...of` (ES6+):
    ```javascript
    for (const angolo of angoliMotore) {
        console.log(`Ruota motore di: ${angolo} gradi`);
    }
    ```

-   Metodo `forEach()`:
    ```javascript
    angoliMotore.forEach(function(angolo, indice) {
        console.log(`Movimento ${indice + 1}: ${angolo} gradi`);
    });
    ```

## Array Multidimensionali

Un array può contenere altri array, creando strutture dati multidimensionali. Ad esempio, una griglia o una matrice, molto utili per rappresentare l'ambiente del robot o dati tabulari.

```javascript
// Esempio: una mappa semplice per il robot (0 = libero, 1 = ostacolo, 2 = obiettivo)
let mappaPercorso = [
    [0, 0, 1, 0],
    [0, 1, 2, 0], // L'obiettivo è in mappaPercorso[1][2]
    [0, 0, 0, 1]
];

console.log(mappaPercorso[0][2]); // Output: 1 (ostacolo alla riga 0, colonna 2)
console.log(mappaPercorso[1][1]); // Output: 1 (ostacolo)
mappaPercorso[0][0] = 5; // Il robot è qui
```

**Altro esempio: Dati di calibrazione per più sensori**
Supponiamo di avere due sensori di colore e per ognuno vogliamo memorizzare tre letture di calibrazione per il colore nero e tre per il bianco.

```javascript
// Ogni sotto-array: [lettureNero, lettureBianco]
// Ogni lettura: un array di valori
let datiCalibrazione = [
    // Sensore 1
    {
        idSensore: "Colore_SX",
        nero: [50, 52, 51],
        bianco: [450, 455, 452]
    },
    // Sensore 2
    {
        idSensore: "Colore_DX",
        nero: [55, 56, 54],
        bianco: [460, 461, 458]
    }
];

// Accedere alla seconda lettura del nero per il sensore 1
console.log(datiCalibrazione[0].nero[1]); // Output: 52
// Accedere alla media delle letture del bianco per il sensore 2
let mediaBiancoS2 = datiCalibrazione[1].bianco.reduce((a, b) => a + b, 0) / datiCalibrazione[1].bianco.length;
console.log(mediaBiancoS2); // Output: circa 459.67
```

## Applicazioni con EV3

Gli array sono fondamentali per una vasta gamma di task nella programmazione EV3:

-   **Sequenze di Movimento**: Memorizzare una serie di comandi per il robot. Questi possono essere semplici stringhe o oggetti più complessi che specificano parametri come velocità, durata o porta del motore.
    ```javascript
    let sequenzaComplessa = [
        { comando: "motore", target: "A", azione: "avanti", valore: 500, unita: "ms", velocita: 75 },
        { comando: "attendi", valore: 500, unita: "ms" },
        { comando: "motore", target: "B", azione: "gira", valore: 90, unita: "gradi", velocita: 30 },
        { comando: "suono", nome: "conferma.rsf" }
    ];
    // Il programma può iterare su questo array ed eseguire ogni comando.
    ```

-   **Registrazione Dati (Logging)**: Salvare letture multiple da sensori (es. temperature, distanze, valori di luce) per analisi successive, per prendere decisioni basate su una serie storica di dati, o per debug.
    ```javascript
    let logDistanze = [];
    // ... in un loop o evento del sensore ...
    // let nuovaLettura = sensoreUltrasuoni.getDistance();
    // logDistanze.push({ timestamp: Date.now(), distanza: nuovaLettura });
    // if (logDistanze.length > 100) logDistanze.shift(); // Mantiene solo le ultime 100 letture
    ```

-   **Percorsi e Waypoint**: Definire una serie di coordinate (x, y) o waypoint che il robot deve seguire.
    ```javascript
    let percorsoRobot = [
        { x: 0, y: 0, azione: "partenza" },
        { x: 50, y: 0, azione: "avanza" },
        { x: 50, y: 30, azione: "giraEAvanza" },
        { x: 0, y: 30, azione: "ritornaParallelo" },
        { x: 0, y: 0, azione: "arrivo" }
    ];
    ```

-   **Gestione di Ostacoli**: Memorizzare le posizioni degli ostacoli rilevati, ad esempio, in un array di oggetti con coordinate.
    ```javascript
    let ostacoliMappati = [
        { x: 10, y: 5, tipo: "muro" },
        { x: 25, y: 15, tipo: "oggetto" }
    ];
    ```

-   **Code di Comandi (Queues)**: Utilizzare array con `push()` (per aggiungere) e `shift()` (per rimuovere ed elaborare) per creare una coda FIFO (First-In, First-Out) di comandi da eseguire. Utile per gestire comandi ricevuti esternamente o generati dinamicamente.
    ```javascript
    let codaComandiEV3 = [];
    // Aggiungere comandi:
    // codaComandiEV3.push({ task: "ruotaMotore", porta: "A", gradi: 90 });
    // codaComandiEV3.push({ task: "leggiSensore", porta: "S1" });

    // Processare comandi:
    // if (codaComandiEV3.length > 0) {
    //    let comandoCorrente = codaComandiEV3.shift();
    //    // ...esegui comandoCorrente...
    // }
    ```

-   **Stack di Comandi**: Utilizzare array con `push()` (per aggiungere) e `pop()` (per rimuovere ed elaborare) per creare uno stack LIFO (Last-In, First-Out). Utile per implementare funzionalità come "annulla l'ultima azione".

-   **Stati Multipli**: Gestire una lista di possibili stati o configurazioni per il robot, ad esempio, per una macchina a stati.
    ```javascript
    const STATI_ROBOT = ["IN_ATTESA", "ESPLORAZIONE", "RILEVAMENTO_OSTACOLO", "RITORNO_BASE"];
    let statoCorrente = STATI_ROBOT[0];
    ```

## Best Practices e Suggerimenti per EV3

Quando si utilizzano array nella programmazione EV3, tenere a mente alcuni suggerimenti può migliorare l'efficienza e la leggibilità del codice:

1.  **Scegliere il Metodo Giusto**:
    *   Per aggiungere/rimuovere elementi alla fine (comportamento LIFO, stack): usa `push()` e `pop()`.
    *   Per aggiungere/rimuovere elementi all'inizio (comportamento FIFO se `push()` è usato per aggiungere alla fine, o per code a doppia estremità): usa `unshift()` e `shift()`. Questi possono essere meno performanti su array molto grandi perché richiedono la reindicizzazione degli elementi.
    *   Per trasformare dati senza modificare l'originale: `map()`.
    *   Per selezionare sottoinsiemi di dati senza modificare l'originale: `filter()`.
    *   Per aggregare dati: `reduce()`.
    *   Per copie o porzioni: `slice()`. Per modifiche in loco complesse: `splice()`.

2.  **Preferire Metodi Non Mutanti**: Quando possibile, e se l'array originale deve essere preservato, preferisci metodi come `map()`, `filter()`, `slice()` che restituiscono un nuovo array, invece di metodi che modificano l'array originale (es. `splice()`, `sort()` in alcuni casi se non si fa una copia prima). Questo aiuta a prevenire effetti collaterali imprevisti.

3.  **Attenzione alle Prestazioni con Array Grandi**: Anche se JavaScript è efficiente, operazioni su array estremamente grandi (migliaia di elementi) che comportano la reindicizzazione (come `shift()`, `unshift()`, `splice()` all'inizio) possono avere un impatto sulle prestazioni, specialmente su piattaforme con risorse limitate come l'EV3. Se si gestiscono grandi flussi di dati, considerare strutture dati o strategie più ottimizzate se le prestazioni diventano un problema.

4.  **Leggibilità del Codice**:
    *   Usa nomi di variabili descrittivi per gli array (es. `lettureSensoreColore` invece di `arr1`).
    *   Quando si itera, dare nomi significativi alle variabili che rappresentano i singoli elementi (es. `for (const lettura of lettureSensoreColore)`).

5.  **Comprendere le Shallow Copies**: Metodi come `slice()` o l'operatore spread (`...`) creano copie superficiali (shallow copies). Se l'array contiene oggetti, la copia conterrà riferimenti agli stessi oggetti originali. Modificare un oggetto nell'array copiato modificherà anche l'oggetto nell'array originale. Per copie profonde (deep copies) di array di oggetti, sono necessarie tecniche aggiuntive (es. `JSON.parse(JSON.stringify(array))` per oggetti semplici, o librerie).

    ```javascript
    let arrayOriginale = [{ valore: 10 }, { valore: 20 }];
    let copiaSuperficiale = arrayOriginale.slice();

    copiaSuperficiale[0].valore = 100;
    console.log(arrayOriginale[0].valore); // Output: 100 (anche l'originale è modificato)

    // Deep copy semplice per array di oggetti JSON-compatibili
    let arrayOriginale2 = [{ valore: 10 }, { valore: 20 }];
    let copiaProfonda = JSON.parse(JSON.stringify(arrayOriginale2));
    copiaProfonda[0].valore = 500;
    console.log(arrayOriginale2[0].valore); // Output: 10 (l'originale non è modificato)
    ```

6.  **Utilizzare `const` per Array che non devono essere Riassegnati**: Se un array non verrà mai riassegnato a un nuovo array (anche se il suo contenuto può cambiare), dichiaralo con `const` per chiarezza e per prevenire riassegnazioni accidentali.
    ```javascript
    const comandiPermanenti = ["start", "stop", "reset"];
    // comandiPermanenti.push("pausa"); // OK: modifica il contenuto
    // comandiPermanenti = ["nuovoComando"]; // Errore: non si può riassegnare una costante
    ```

## Conclusione

Gli array sono uno strumento versatile e potente in JavaScript. La loro capacità di memorizzare e organizzare collezioni di dati li rende indispensabili per sviluppare programmi complessi e interattivi per il LEGO EV3. Padroneggiare l'uso degli array e dei loro metodi ti permetterà di scrivere codice più efficiente e flessibile.

---

[⬅️ Torna all'elenco delle Guide](./README.md) | [➡️ Vai alla Guida Successiva: Oggetti](./03-Oggetti.md)
=======
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
>>>>>>> 760d5bd66d3e244e5fd0e53c590d3de7a57c93ff
