# Guida: Oggetti in JavaScript per EV3

Gli oggetti in JavaScript sono collezioni dinamiche di coppie chiave-valore, dove le chiavi sono stringhe (o Simboli) e i valori possono essere di qualsiasi tipo, inclusi altri oggetti o funzioni (metodi). Sono fondamentali per rappresentare entità complesse e strutturare i dati in modo significativo, specialmente nella programmazione di robot come l'EV3.

## Cosa sono gli Oggetti?

Pensa a un oggetto come a un contenitore per proprietà correlate. Ad esempio, un robot EV3 potrebbe essere rappresentato da un oggetto con proprietà come `colore`, `velocitaMassima`, `sensoriConnessi`, e metodi come `avanza()` o `rilevaOstacolo()`.

**Caratteristiche principali:**
-   **Non ordinati**: A differenza degli array, le proprietà di un oggetto non hanno un ordine garantito (anche se le implementazioni moderne tendono a mantenere l'ordine di inserimento per le chiavi non numeriche).
-   **Accesso tramite chiave**: Si accede ai valori tramite le loro chiavi.
-   **Dinamici**: Si possono aggiungere, modificare o rimuovere proprietà e metodi in qualsiasi momento.

## Creazione di Oggetti

1.  **Literal dell'Oggetto**: Il modo più comune e leggibile.
    ```javascript
    // Un oggetto vuoto
    let emptyObject = {};

    // Oggetto che rappresenta la configurazione di un motore EV3
    let motorA_config = {
        port: "outA",
        speed: 0,
        maxSpeed: 1050, // RPM per motori grandi EV3
        isRunning: false,
        targetAngle: null
    };

    // Oggetto che rappresenta lo stato del robot
    let robotStatus = {
        batteryLevel: 85, // Percentuale
        currentMode: "idle",
        connectedSensors: ["touchS1", "colorS3", "ultrasonicS4"],
        position: { // Oggetto annidato
            x: 0,
            y: 0,
            orientation: 90 // Gradi
        }
    };
    ```

2.  **Costruttore `Object()`**:
    ```javascript
    let anotherObject = new Object(); // Oggetto vuoto, equivalente a {}
    anotherObject.property1 = "value1";
    ```

3.  **`Object.create()`**: Crea un nuovo oggetto con un prototipo specificato.
    ```javascript
    const baseRobot = {
        hasWheels: true,
        powerOn: function() { console.log("Robot acceso!"); }
    };
    let myEV3 = Object.create(baseRobot);
    myEV3.model = "EV3";
    console.log(myEV3.hasWheels); // true (ereditato)
    myEV3.powerOn(); // Robot acceso!
    ```

## Accesso alle Proprietà

Si può accedere alle proprietà di un oggetto in due modi:

1.  **Dot Notation (`.`)**: Usata quando il nome della proprietà è un identificatore valido e conosciuto.
    ```javascript
    console.log(motorA_config.port);       // Output: "outA"
    console.log(robotStatus.batteryLevel); // Output: 85
    console.log(robotStatus.position.x);   // Output: 0 (accesso a proprietà di oggetto annidato)

    // Modificare una proprietà
    motorA_config.speed = 50;
    console.log(motorA_config.speed);      // Output: 50
    ```

2.  **Bracket Notation (`[]`)**: Usata quando il nome della proprietà è dinamico (memorizzato in una variabile), contiene caratteri speciali, o è un numero. La chiave deve essere una stringa o un simbolo.
    ```javascript
    console.log(motorA_config["port"]); // Output: "outA"

    let propertyName = "speed";
    console.log(motorA_config[propertyName]); // Output: 50 (se speed è 50)

    let sensorKey = "connectedSensors";
    console.log(robotStatus[sensorKey]); // Output: ["touchS1", "colorS3", "ultrasonicS4"]

    // Proprietà con spazi o caratteri speciali (meno comune, ma possibile)
    let specialObject = {
        "my-property with spaces": "hello"
    };
    console.log(specialObject["my-property with spaces"]); // Output: "hello"
    ```

## Aggiungere e Modificare Proprietà

Puoi aggiungere nuove proprietà o modificare quelle esistenti semplicemente assegnando un valore.

```javascript
let ev3Brick = {
    model: "EV3",
    firmwareVersion: "1.09H"
};

// Aggiungere una nuova proprietà
ev3Brick.color = "Grigio/Rosso";
ev3Brick["serialNumber"] = "001653XXXXXX";

// Modificare una proprietà esistente
ev3Brick.firmwareVersion = "1.10E";

console.log(ev3Brick);
/*
Output:
{
  model: "EV3",
  firmwareVersion: "1.10E",
  color: "Grigio/Rosso",
  serialNumber: "001653XXXXXX"
}
*/
```

## Rimuovere Proprietà

L'operatore `delete` rimuove una proprietà da un oggetto.

```javascript
delete ev3Brick.serialNumber;
console.log(ev3Brick.serialNumber); // Output: undefined
console.log(ev3Brick);
/*
Output:
{
  model: "EV3",
  firmwareVersion: "1.10E",
  color: "Grigio/Rosso"
}
*/
```

## Metodi negli Oggetti

Quando una proprietà di un oggetto è una funzione, viene chiamata **metodo**. I metodi definiscono il comportamento di un oggetto.

```javascript
let simpleRobot = {
    name: "Roby",
    energy: 100,
    greet: function() {
        // 'this' si riferisce all'oggetto 'simpleRobot'
        console.log(`Ciao, sono ${this.name}! Energia: ${this.energy}%`);
    },
    move: function(distance) {
        if (this.energy >= distance / 10) {
            this.energy -= distance / 10;
            console.log(`${this.name} si muove di ${distance} unità.`);
        } else {
            console.log(`${this.name} non ha abbastanza energia per muoversi.`);
        }
    }
};

simpleRobot.greet(); // Output: Ciao, sono Roby! Energia: 100%
simpleRobot.move(50);  // Output: Roby si muove di 50 unità.
console.log(simpleRobot.energy); // Output: 95
simpleRobot.move(1000); // Output: Roby non ha abbastanza energia per muoversi.
```

**Sintassi abbreviata per i metodi (ES6):**
```javascript
let advancedRobot = {
    name: "EVA",
    chargeLevel: 75,
    status() { // Sintassi abbreviata
        console.log(`${this.name} ha ${this.chargeLevel}% di carica.`);
    }
};
advancedRobot.status(); // Output: EVA ha 75% di carica.
```

## Iterare sulle Proprietà di un Oggetto

Ci sono diversi modi per iterare sulle proprietà di un oggetto. Questi saranno trattati in dettaglio nella guida sull'iterazione, ma ecco un'anteprima:

-   **Ciclo `for...in`**: Itera su tutte le proprietà enumerabili di un oggetto (incluse quelle ereditate dal prototipo).
    ```javascript
    let sensorData = {
        type: "Ultrasonic",
        port: "S4",
        valueCm: 25.5,
        unit: "cm"
    };
    for (let key in sensorData) {
        // È buona pratica verificare se la proprietà appartiene direttamente all'oggetto
        if (sensorData.hasOwnProperty(key)) {
            console.log(`${key}: ${sensorData[key]}`);
        }
    }
    ```

-   **`Object.keys(obj)`**: Restituisce un array delle chiavi enumerabili proprie di un oggetto.
    ```javascript
    let keys = Object.keys(sensorData); // ["type", "port", "valueCm", "unit"]
    keys.forEach(key => {
        console.log(`${key} -> ${sensorData[key]}`);
    });
    ```

-   **`Object.values(obj)`**: Restituisce un array dei valori delle proprietà enumerabili proprie di un oggetto.
    ```javascript
    let values = Object.values(sensorData); // ["Ultrasonic", "S4", 25.5, "cm"]
    values.forEach(value => {
        console.log(value);
    });
    ```

-   **`Object.entries(obj)`**: Restituisce un array di coppie `[chiave, valore]` delle proprietà enumerabili proprie di un oggetto.
    ```javascript
    let entries = Object.entries(sensorData);
    // [["type", "Ultrasonic"], ["port", "S4"], ["valueCm", 25.5], ["unit", "cm"]]
    for (const [key, value] of entries) {
        console.log(`La proprietà ${key} ha valore ${value}`);
    }
    ```

## Oggetti Annidati e Array di Oggetti

Gli oggetti possono contenere altri oggetti o array, permettendo strutture dati complesse.

```javascript
let ev3Program = {
    name: "LineFollower",
    version: "1.0",
    author: "Student",
    settings: { // Oggetto annidato
        lineColor: "black",
        speed: 30,
        kp: 0.5, // Coefficiente proporzionale per PID
        ki: 0.1,
        kd: 0.2
    },
    steps: [ // Array di oggetti
        { action: "startMotor", motor: "B", speed: "settings.speed" },
        { action: "loop", condition: "colorSensor.isBlack()",
            subSteps: [
                { action: "adjustSteering", direction: "left" }
            ]
        },
        { action: "stopMotor", motor: "all" }
    ]
};

console.log(ev3Program.settings.speed); // Output: 30
console.log(ev3Program.steps[0].action); // Output: "startMotor"
console.log(ev3Program.steps[1].subSteps[0].direction); // Output: "left"
```

## Applicazioni per EV3

-   **Configurazione del Robot**: Memorizzare le impostazioni dei motori, dei sensori, le costanti del programma.
    ```javascript
    const robotConfig = {
        wheelDiameterCm: 5.6,
        trackWidthCm: 12.0,
        leftMotorPort: "outB",
        rightMotorPort: "outC",
        colorSensorPort: "in3",
        ultrasonicSensorPort: "in4"
    };
    ```
-   **Stato del Robot**: Tenere traccia dello stato attuale (es. `robotState.isMoving`, `robotState.obstacleDetected`).
-   **Dati dei Sensori**: Rappresentare i dati di un sensore con le sue unità e timestamp.
    ```javascript
    let ultrasonicReading = {
        value: 15.7,
        unit: "cm",
        timestamp: Date.now()
    };
    ```
-   **Definizione di Comportamenti Complessi**: Un oggetto può raggruppare dati e funzioni per un comportamento specifico (es. un oggetto `lineFollower` con i suoi parametri e la logica di controllo).
-   **Messaggi di Comunicazione**: Strutturare dati da inviare o ricevere (es. via Bluetooth o Wi-Fi), spesso in formato JSON (che si basa sulla sintassi degli oggetti JavaScript).

Gli oggetti sono incredibilmente potenti per organizzare il codice e i dati. Insieme agli array, formano la spina dorsale della gestione dei dati nella maggior parte dei programmi JavaScript, inclusi quelli per l'EV3.
