<<<<<<< HEAD
# Guida 4: Iterazione in JavaScript (Cicli)

## Introduzione all'Iterazione

L'iterazione, o ciclare, è il processo di ripetere un blocco di codice più volte. In JavaScript, come in molti altri linguaggi di programmazione, i cicli sono fondamentali per eseguire compiti ripetitivi, come elaborare tutti gli elementi di un array, leggere dati da un sensore finché non si verifica una condizione, o eseguire una sequenza di azioni un numero determinato di volte. Per la programmazione dell'EV3, i cicli sono essenziali per creare comportamenti complessi e reattivi.

## Tipi Comuni di Cicli

### 1. Ciclo `for`

Il ciclo `for` è ideale quando si conosce in anticipo il numero di iterazioni da eseguire.

**Sintassi:**
```javascript
for (inizializzazione; condizione; incremento) {
    // Blocco di codice da eseguire
}
```
-   `inizializzazione`: Eseguita una sola volta prima dell'inizio del ciclo (es. `let i = 0`).
-   `condizione`: Valutata prima di ogni iterazione. Se `true`, il blocco di codice viene eseguito. Se `false`, il ciclo termina.
-   `incremento`: Eseguito alla fine di ogni iterazione (es. `i++`).

**Esempio con EV3:** Far lampeggiare un LED 5 volte (concettuale, l'EV3 non ha LED utente diretti, ma si può usare il suono o il display).
```javascript
// Supponiamo di avere una funzione brick.sound(freq, duration)
for (let i = 0; i < 5; i++) {
    brick.sound(440, 200); // Emette un suono
    control.pause(300);     // Pausa
    console.log(`Lampeggio (suono) numero: ${i + 1}`);
}
```

**Iterare su Array con `for`:**
```javascript
let lettureDistanza = [30, 25, 35, 28, 40];
for (let i = 0; i < lettureDistanza.length; i++) {
    console.log(`Lettura ${i}: ${lettureDistanza[i]} cm`);
    // Qui potresti fare qualcosa con ogni lettura, es. controllare se è < soglia
}
```

### 2. Ciclo `while`

Il ciclo `while` esegue un blocco di codice finché una condizione specificata è `true`.

**Sintassi:**
```javascript
while (condizione) {
    // Blocco di codice da eseguire
}
```
La condizione viene valutata *prima* di ogni iterazione.

**Esempio con EV3:** Muovere il robot in avanti finché il sensore di distanza rileva un ostacolo a meno di 20 cm.
```javascript
let distanza = sensors.ultrasonic1.distance(); // Legge la distanza iniziale

while (distanza > 20) {
    motors.largeA.run(50); // Muovi motore A (es. ruota sinistra)
    motors.largeB.run(50); // Muovi motore B (es. ruota destra)
    control.pause(100); // Piccola pausa per permettere il movimento e nuova lettura
    distanza = sensors.ultrasonic1.distance(); // Aggiorna la lettura della distanza
    console.log(`Distanza attuale: ${distanza} cm`);
}
motors.stopAll(); // Ferma i motori quando l'ostacolo è vicino
console.log("Ostacolo rilevato! Robot fermo.");
```
**Attenzione:** È cruciale che la condizione del `while` possa diventare `false` all'interno del ciclo, altrimenti si crea un ciclo infinito.

### 3. Ciclo `do...while`

Simile al `while`, ma il blocco di codice viene eseguito almeno una volta, perché la condizione viene valutata *dopo* l'esecuzione del blocco.

**Sintassi:**
```javascript
do {
    // Blocco di codice da eseguire
} while (condizione);
```

**Esempio con EV3:** Chiedere all'utente di premere un pulsante per avviare un'azione, e continuare a controllare finché non viene premuto.
```javascript
let pulsantePremuto = false;
do {
    console.log("Premi il pulsante centrale per continuare...");
    // In un ambiente EV3 reale, qui si controllerebbe lo stato del pulsante.
    // Simuliamo che dopo un po' venga premuto:
    // pulsantePremuto = brick.buttonEnter.isPressed(); // Esempio API EV3
    control.pause(500);
    // Per questo esempio, lo impostiamo a true dopo un paio di iterazioni simulate
    if (Math.random() < 0.3) { // Simula la pressione casuale per l'esempio
        pulsantePremuto = true;
    }
} while (!pulsantePremuto);

console.log("Pulsante premuto! Avvio azione...");
```

### 4. Ciclo `for...of` (per iterare su oggetti iterabili come Array, String, Map, Set)

Introdotto in ES6, il ciclo `for...of` fornisce un modo più semplice per iterare sugli elementi di collezioni iterabili.

**Sintassi:**
```javascript
for (const elemento of collezione) {
    // Blocco di codice da eseguire con 'elemento'
}
```

**Esempio con EV3 (Array):** Eseguire una sequenza di rotazioni del motore.
```javascript
let sequenzaAngoli = [90, -90, 180, 45];
for (const angolo of sequenzaAngoli) {
    motors.mediumC.run(30, angolo, "degrees"); // Ruota il motore C dell'angolo specificato
    control.pauseUntilIdle(motors.mediumC); // Attendi che il motore completi il movimento
    console.log(`Motore ruotato di ${angolo} gradi.`);
}
console.log("Sequenza di rotazioni completata.");
```

### 5. Ciclo `for...in` (per iterare sulle proprietà enumerabili di un oggetto)

Il ciclo `for...in` itera sulle chiavi (nomi delle proprietà) di un oggetto.

**Sintassi:**
```javascript
for (const chiave in oggetto) {
    // Blocco di codice da eseguire con 'chiave'
    // Per accedere al valore: oggetto[chiave]
}
```

**Esempio con EV3:** Visualizzare la configurazione di un sensore.
```javascript
let configurazioneSensoreColore = {
    porta: "in1",
    modalita: "ColoreRiflesso",
    valoreMinimo: 5,
    valoreMassimo: 95
};

console.log("Configurazione Sensore Colore:");
for (const proprieta in configurazioneSensoreColore) {
    if (configurazioneSensoreColore.hasOwnProperty(proprieta)) { // Buona pratica!
        console.log(`- ${proprieta}: ${configurazioneSensoreColore[proprieta]}`);
    }
}
/* Output:
Configurazione Sensore Colore:
- porta: in1
- modalita: ColoreRiflesso
- valoreMinimo: 5
- valoreMassimo: 95
*/
```
**Nota:** `hasOwnProperty(proprieta)` è usato per assicurarsi che si stia iterando solo sulle proprietà dirette dell'oggetto, e non su quelle ereditate dalla sua catena di prototipi.

## Controllo del Flusso dei Cicli

-   **`break`**: Termina immediatamente il ciclo corrente (o `switch`).
    ```javascript
    let numeri = [1, 5, 10, 15, -2, 20];
    for (const num of numeri) {
        if (num < 0) {
            console.log("Trovato numero negativo, interrompo.");
            break; // Esce dal ciclo for...of
        }
        console.log(num);
    }
    ```

-   **`continue`**: Salta l'iterazione corrente e passa alla successiva.
    ```javascript
    let datiSensore = [10, 12, 0, 15, 8, 0, 11]; // 0 potrebbe essere una lettura non valida
    for (const lettura of datiSensore) {
        if (lettura === 0) {
            console.log("Lettura non valida (0), la salto.");
            continue; // Salta il resto del blocco e va alla prossima lettura
        }
        console.log(`Processo la lettura: ${lettura}`);
    }
    ```

## Scegliere il Ciclo Giusto

-   Usa `for` quando sai quante volte devi iterare.
-   Usa `while` quando l'iterazione dipende da una condizione che può cambiare durante l'esecuzione e non sai quante iterazioni serviranno.
-   Usa `do...while` quando vuoi che il blocco di codice sia eseguito almeno una volta.
-   Usa `for...of` per iterare facilmente sugli elementi di array e altre collezioni iterabili.
-   Usa `for...in` per iterare sulle proprietà di oggetti.

## Conclusione

I cicli sono strumenti potenti per controllare il flusso di esecuzione dei tuoi programmi EV3. Permettono di automatizzare compiti ripetitivi, rispondere a input continui dai sensori e creare sequenze complesse di azioni. Una buona comprensione dei diversi tipi di cicli e di come controllarli ti aiuterà a scrivere codice JavaScript più efficiente ed efficace per il tuo robot.

---

[⬅️ Torna all'elenco delle Guide](./README.md) | [➡️ Vai alla Guida Successiva: JSON](./05-JSON.md)
=======
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
>>>>>>> 760d5bd66d3e244e5fd0e53c590d3de7a57c93ff
