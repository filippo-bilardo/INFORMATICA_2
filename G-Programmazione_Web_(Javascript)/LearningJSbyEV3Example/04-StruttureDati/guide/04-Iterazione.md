# Guida: Iterazione su Array e Oggetti in JavaScript per EV3

Iterare significa scorrere gli elementi di una collezione (come un array) o le proprietà di un oggetto, solitamente per leggerli, modificarli o eseguire un'operazione basata su di essi. JavaScript offre diversi costrutti e metodi per l'iterazione, cruciali per gestire sequenze di comandi, dati dei sensori, o configurazioni del robot EV3.

## Iterazione su Array

### 1. Ciclo `for` tradizionale
Il ciclo `for` è il modo classico per iterare su un array usando un indice.

```javascript
let motorPorts = ["outA", "outB", "outC", "outD"];
let motorSpeeds = [50, 75, 0, 100]; // Velocità per ciascun motore

for (let i = 0; i < motorPorts.length; i++) {
    console.log(`Motore su porta ${motorPorts[i]} ha velocità ${motorSpeeds[i]}.`);
    // Qui potresti inviare un comando all'EV3 per impostare la velocità del motore motorPorts[i]
}
// Output:
// Motore su porta outA ha velocità 50.
// Motore su porta outB ha velocità 75.
// Motore su porta outC ha velocità 0.
// Motore su porta outD ha velocità 100.
```
**Pro**: Controllo completo sull'indice, possibilità di iterare all'indietro, saltare elementi, o uscire dal ciclo (`break`, `continue`).
**Contro**: Più verboso, rischio di errori "off-by-one" con l'indice.

### 2. Metodo `forEach()`
Il metodo `forEach()` esegue una funzione callback fornita una volta per ogni elemento dell'array.

```javascript
let sensorReadings = [25, 30, 28, 35, 32]; // Letture da un sensore di distanza

sensorReadings.forEach(function(reading, index, array) {
    console.log(`Lettura #${index + 1}: ${reading} cm`);
    // 'array' è l'array originale [25, 30, 28, 35, 32]
});
// Output:
// Lettura #1: 25 cm
// Lettura #2: 30 cm
// ...

// Con arrow function (più conciso):
sensorReadings.forEach((reading, index) => {
    console.log(`Sensore (indice ${index}): ${reading}`);
});
```
**Pro**: Più leggibile e conciso per semplici iterazioni. Gestisce lo scope delle variabili in modo più pulito.
**Contro**: Non si può usare `break` o `continue` per uscire dal ciclo o saltare iterazioni (si può simulare con `return` nella callback per saltare l'iterazione corrente, ma non per interrompere `forEach` del tutto). Non restituisce un nuovo array (per quello, vedi `map()`).

### 3. Ciclo `for...of` (ES6)
Il ciclo `for...of` itera direttamente sui valori degli oggetti iterabili (come Array, String, Map, Set, ecc.).

```javascript
let commandSequence = ["forward", "turnLeft", "beep", "stop"];

for (const command of commandSequence) {
    console.log(`Eseguire comando: ${command}`);
    // Inviare 'command' all'EV3
}
// Output:
// Eseguire comando: forward
// Eseguire comando: turnLeft
// Eseguire comando: beep
// Eseguire comando: stop
```
**Pro**: Sintassi molto pulita e diretta per accedere ai valori. Funziona con `break` e `continue`.
**Contro**: Non fornisce direttamente l'indice (se necessario, si può ottenere con `Array.prototype.entries()` o un contatore separato).

```javascript
// Ottenere indice con for...of
for (const [index, command] of commandSequence.entries()) {
    console.log(`Comando ${index}: ${command}`);
}
```

### Altri Metodi Iterativi (che creano nuovi array)
Questi metodi iterano sull'array e restituiscono un *nuovo* array, senza modificare l'originale.
-   **`map()`**: Crea un nuovo array con i risultati della chiamata di una funzione fornita su ogni elemento.
    ```javascript
    let rawSensorValues = [102, 230, 455, 1000]; // Valori da 0 a 1023
    // Normalizza i valori in un range 0-100
    let normalizedValues = rawSensorValues.map(value => Math.round((value / 1023) * 100));
    console.log(normalizedValues); // Esempio: [10, 22, 44, 98]
    ```
-   **`filter()`**: Crea un nuovo array con tutti gli elementi che passano un test (funzione che restituisce `true`).
    ```javascript
    let distances = [5, 15, 20, 8, 30]; // Distanze in cm
    // Filtra solo le distanze "pericolose" (es. < 10 cm)
    let criticalDistances = distances.filter(d => d < 10);
    console.log(criticalDistances); // Output: [5, 8]
    ```
-   **`reduce()`**: Applica una funzione "riduttore" contro un accumulatore e ogni elemento per ridurre l'array a un singolo valore.
    ```javascript
    let motorRotationTimes = [1000, 500, 750, 300]; // Durate in ms
    // Calcola il tempo totale di esecuzione
    let totalTime = motorRotationTimes.reduce((sum, time) => sum + time, 0);
    console.log(totalTime); // Output: 2550
    ```

## Iterazione su Oggetti

### 1. Ciclo `for...in`
Il ciclo `for...in` itera sulle chiavi (nomi delle proprietà) enumerabili di un oggetto.

```javascript
let robotConfig = {
    name: "EV3-Explorer",
    wheelDiameter: 5.6, // cm
    leftMotor: "outB",
    rightMotor: "outC",
    hasColorSensor: true
};

for (let key in robotConfig) {
    console.log(`Proprietà: ${key}, Valore: ${robotConfig[key]}`);
}
// Output (l'ordine non è garantito, ma spesso è quello di inserimento):
// Proprietà: name, Valore: EV3-Explorer
// Proprietà: wheelDiameter, Valore: 5.6
// Proprietà: leftMotor, Valore: outB
// Proprietà: rightMotor, Valore: outC
// Proprietà: hasColorSensor, Valore: true
```
**Attenzione**: `for...in` itera anche sulle proprietà ereditate dalla catena dei prototipi. Per considerare solo le proprietà proprie dell'oggetto, usa `hasOwnProperty()`:
```javascript
for (let key in robotConfig) {
    if (robotConfig.hasOwnProperty(key)) {
        console.log(`Propria: ${key} = ${robotConfig[key]}`);
    }
}
```

### 2. `Object.keys()`, `Object.values()`, `Object.entries()` (ES6+)
Questi metodi restituiscono array, sui quali si può poi iterare usando i metodi per array (es. `forEach`, `for...of`).

-   **`Object.keys(obj)`**: Restituisce un array delle chiavi (stringhe) enumerabili proprie dell'oggetto.
    ```javascript
    let sensorStatus = {
        touchS1: "pressed",
        colorS3: "blue",
        ultrasonicS4: 15.5 // cm
    };

    let sensorPorts = Object.keys(sensorStatus); // ["touchS1", "colorS3", "ultrasonicS4"]
    sensorPorts.forEach(port => {
        console.log(`Sensore ${port} ha stato/valore: ${sensorStatus[port]}`);
    });
    ```

-   **`Object.values(obj)`**: Restituisce un array dei valori delle proprietà enumerabili proprie dell'oggetto.
    ```javascript
    let motorTargets = { motorA: 90, motorB: -90, motorC: 180 };
    let targets = Object.values(motorTargets); // [90, -90, 180]
    for (const target of targets) {
        console.log(`Raggiungere target: ${target} gradi`);
    }
    ```

-   **`Object.entries(obj)`**: Restituisce un array di array, dove ogni sotto-array è una coppia `[chiave, valore]` delle proprietà enumerabili proprie dell'oggetto.
    ```javascript
    let ev3Info = {
        model: "Lego Mindstorms EV3",
        cpu: "ARM9",
        memory: "64MB RAM"
    };

    for (const [key, value] of Object.entries(ev3Info)) {
        console.log(`${key.toUpperCase()}: ${value}`);
    }
    // Output:
    // MODEL: Lego Mindstorms EV3
    // CPU: ARM9
    // MEMORY: 64MB RAM
    ```
    Questo è spesso il modo più moderno e conveniente per iterare su chiavi e valori contemporaneamente.

## Applicazioni per EV3

-   **Esecuzione di Sequenze di Comandi**: Iterare su un array di comandi o oggetti di configurazione per far muovere il robot, emettere suoni, ecc.
    ```javascript
    const missionSteps = [
        { action: "drive", speed: 50, duration: 2000 },
        { action: "turn", degrees: 90, speed: 30 },
        { action: "speak", message: "Mission step complete" }
    ];

    missionSteps.forEach(step => {
        console.log(`Eseguo: ${step.action}`);
        // Qui ci sarebbe la logica per inviare il comando all'EV3
        // Esempio: if (step.action === "drive") ev3.drive(step.speed, step.duration);
    });
    ```

-   **Elaborazione Dati dei Sensori**: Iterare su un array di letture per calcolare medie, trovare massimi/minimi, o rilevare pattern.
    ```javascript
    let lightReadings = [45, 48, 43, 50, 46];
    let sum = lightReadings.reduce((acc, val) => acc + val, 0);
    let average = sum / lightReadings.length;
    console.log(`Luminosità media: ${average}`); // 46.4
    ```

-   **Configurazione Dinamica**: Iterare sulle proprietà di un oggetto di configurazione per impostare parametri del robot.
    ```javascript
    const motorSettings = {
        motorA: { speed: 60, stopAction: 'brake' },
        motorB: { speed: 80, stopAction: 'hold' }
    };

    for (const motorPort in motorSettings) {
        if (motorSettings.hasOwnProperty(motorPort)) {
            const settings = motorSettings[motorPort];
            console.log(`Configuro motore ${motorPort}: velocità ${settings.speed}, stop ${settings.stopAction}`);
            // ev3.configureMotor(motorPort, settings.speed, settings.stopAction);
        }
    }
    ```

-   **Debug e Logging**: Iterare su oggetti di stato o array di log per stamparli o inviarli a una console.

Scegliere il metodo di iterazione giusto dipende dal contesto: la struttura dei dati (array o oggetto), se hai bisogno dell'indice/chiave, se hai bisogno di `break`/`continue`, e la leggibilità del codice. La pratica ti aiuterà a familiarizzare con le opzioni disponibili.
