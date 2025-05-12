# Guida: JSON (JavaScript Object Notation) per EV3

JSON (JavaScript Object Notation) è un formato leggero per lo scambio di dati. È facile da leggere e scrivere per gli umani, e facile da analizzare e generare per le macchine. Sebbene derivi da JavaScript, è un formato di dati indipendente dal linguaggio, ampiamente utilizzato in applicazioni web, file di configurazione e molto altro. Nella programmazione EV3, JSON può essere utile per memorizzare configurazioni, sequenze di missioni, o per scambiare dati con un'applicazione esterna.

## Cos'è JSON?

JSON rappresenta i dati in due strutture principali:

1.  **Una collezione di coppie nome/valore**: In vari linguaggi, questo è realizzato come un *oggetto*, record, struct, dizionario, hash table, lista di chiavi, o array associativo.
2.  **Una lista ordinata di valori**: In molti linguaggi, questo è realizzato come un *array*, vettore, lista, o sequenza.

## Sintassi JSON

-   I dati sono in coppie nome/valore (simili alle proprietà degli oggetti JavaScript).
-   I dati sono separati da virgole.
-   Le parentesi graffe `{}` contengono oggetti.
-   Le parentesi quadre `[]` contengono array.
-   **Nomi (chiavi)**: Devono essere stringhe racchiuse tra doppi apici (`"`).
-   **Valori**: Possono essere:
    -   Una stringa (in doppi apici).
    -   Un numero (intero o decimale).
    -   Un oggetto JSON (annidato).
    -   Un array JSON (annidato).
    -   Un booleano (`true` o `false`).
    -   Il valore `null`.

**Importante**: JSON è più restrittivo della sintassi letterale degli oggetti JavaScript:
-   Le chiavi devono essere stringhe tra doppi apici. `{'key': "value"}` non è JSON valido, deve essere `{"key": "value"}`.
-   Le stringhe devono usare doppi apici. `'stringa'` non è JSON valido, deve essere `"stringa"`.
-   Non sono ammessi commenti.
-   Non sono ammesse virgole finali (trailing commas) dopo l'ultimo elemento di un oggetto o array.

## Esempio di JSON

```json
{
  "robotName": "EV3-Bot",
  "version": "1.2",
  "isActive": true,
  "maxSpeed": 100,
  "ports": {
    "motorLeft": "outB",
    "motorRight": "outC",
    "colorSensor": "in3",
    "touchSensor": null
  },
  "missionSteps": [
    {
      "step": 1,
      "action": "driveForward",
      "durationSeconds": 5,
      "speedPercent": 75
    },
    {
      "step": 2,
      "action": "turnLeft",
      "degrees": 90,
      "speedPercent": 50
    },
    {
      "step": 3,
      "action": "playSound",
      "fileName": "mission_complete.rsf"
    }
  ]
}
```

## Utilizzo di JSON in JavaScript

JavaScript fornisce metodi integrati nell'oggetto globale `JSON` per lavorare con dati in formato JSON:

### 1. `JSON.parse()`: Da stringa JSON a Oggetto JavaScript
Il metodo `JSON.parse()` analizza una stringa JSON, costruendo il valore o l'oggetto JavaScript descritto dalla stringa.

```javascript
const jsonString = `{
  "robotName": "EV3-Explorer",
  "motorPorts": ["outA", "outB"],
  "configuration": {
    "speed": 60,
    "obstacleDetection": true
  }
}`;

try {
    const robotData = JSON.parse(jsonString);

    console.log(robotData.robotName); // Output: EV3-Explorer
    console.log(robotData.motorPorts[0]); // Output: outA
    console.log(robotData.configuration.speed); // Output: 60
    console.log(robotData.configuration.obstacleDetection); // Output: true
} catch (error) {
    console.error("Errore durante il parsing del JSON:", error);
}
```
Se la stringa non è JSON valido, `JSON.parse()` lancerà un'eccezione `SyntaxError`.

### 2. `JSON.stringify()`: Da Oggetto JavaScript a Stringa JSON
Il metodo `JSON.stringify()` converte un valore o un oggetto JavaScript in una stringa JSON.

```javascript
const robotConfig = {
    robotModel: "EV3-Tank",
    firmware: "1.10E",
    sensors: [
        { type: "Touch", port: "S1", enabled: true },
        { type: "Color", port: "S3", mode: "RGB-Raw" }
    ],
    activeMission: null,
    calibrationValues: undefined // Le proprietà con valore 'undefined', funzioni e simboli vengono omesse
};

const jsonOutput = JSON.stringify(robotConfig);
console.log(jsonOutput);
/* Output (stringa JSON, formattazione compatta):
{"robotModel":"EV3-Tank","firmware":"1.10E","sensors":[{"type":"Touch","port":"S1","enabled":true},{"type":"Color","port":"S3","mode":"RGB-Raw"}],"activeMission":null}
*/

// JSON.stringify() con indentazione per leggibilità
const prettyJsonOutput = JSON.stringify(robotConfig, null, 2); // 2 spazi per indentazione
console.log(prettyJsonOutput);
/* Output (stringa JSON, formattata):
{
  "robotModel": "EV3-Tank",
  "firmware": "1.10E",
  "sensors": [
    {
      "type": "Touch",
      "port": "S1",
      "enabled": true
    },
    {
      "type": "Color",
      "port": "S3",
      "mode": "RGB-Raw"
    }
  ],
  "activeMission": null
}
*/
```

**Comportamento di `JSON.stringify()`:**
-   Le proprietà con valore `undefined`, le funzioni, e i simboli vengono omesse (se sono in un oggetto) o convertite a `null` (se sono in un array).
-   Le date (`Date` objects) vengono convertite in stringhe nel formato ISO 8601.
-   `NaN` e `Infinity` diventano `null`.

#### Argomenti `replacer` e `space` di `JSON.stringify()`

-   **`replacer`**: Può essere una funzione o un array di stringhe/numeri.
    -   Se è una funzione `(key, value) => newValue`, viene chiamata per ogni coppia chiave/valore. Può trasformare i valori o escluderli (restituendo `undefined`).
    -   Se è un array, solo le proprietà i cui nomi sono nell'array vengono incluse nella stringa JSON.
-   **`space`**: Controlla l'indentazione nella stringa JSON di output per renderla più leggibile. Può essere un numero (spazi) o una stringa (usata per l'indentazione).

```javascript
const data = {
    name: "EV3 Project",
    version: 3,
    secretKey: "dont-serialize-me",
    modules: ["motor", "sensor", "display"],
    lastUpdate: new Date()
};

// Usare un array come replacer
const partialJson = JSON.stringify(data, ["name", "modules"], 2);
console.log(partialJson);
/*
{
  "name": "EV3 Project",
  "modules": [
    "motor",
    "sensor",
    "display"
  ]
}
*/

// Usare una funzione come replacer
function customReplacer(key, value) {
    if (key === "secretKey") {
        return undefined; // Esclude questa chiave
    }
    if (value instanceof Date) {
        return value.toUTCString(); // Formatta la data diversamente
    }
    return value; // Mantiene gli altri valori
}
const customJson = JSON.stringify(data, customReplacer, '	'); // Usa tab per indentare
console.log(customJson);
/*
{
	"name": "EV3 Project",
	"version": 3,
	"modules": [
		"motor",
		"sensor",
		"display"
	],
	"lastUpdate": "Tue, 12 May 2025 10:00:00 GMT" // Esempio, dipende dalla data corrente
}
*/
```

## Applicazioni per EV3

1.  **File di Configurazione**:
    Salvare e caricare le impostazioni del robot (es. velocità dei motori, porte dei sensori, parametri PID) da/in un file `.json` sulla brick EV3 o su un computer.
    *Esempio `config.json` per un robot che segue una linea:*
    ```json
    {
      "motorSpeed": 30,
      "turnRatio": 0.5,
      "lineSensorPort": "S3",
      "targetLightValue": 45
    }
    ```
    In JavaScript (ipotizzando una funzione `readFile` e `writeFile`):
    ```javascript
    // Caricare configurazione
    // const configFileContent = readFile("config.json");
    // const config = JSON.parse(configFileContent);
    // console.log(config.motorSpeed);

    // Salvare configurazione
    // config.motorSpeed = 40;
    // writeFile("config.json", JSON.stringify(config, null, 2));
    ```

2.  **Definizione di Missioni/Sequenze**:
    Descrivere sequenze complesse di azioni per il robot in un formato strutturato.
    *Esempio `mission.json`:*
    ```json
    {
      "missionName": "Maze Runner",
      "steps": [
        { "command": "forward", "distanceCm": 50 },
        { "command": "turnRight", "angle": 90 },
        { "command": "waitForTouch" },
        { "command": "say", "text": "Obstacle!" }
      ]
    }
    ```
    Il programma EV3 può caricare questo file, analizzare il JSON, e poi iterare sull'array `steps` per eseguire ogni comando.

3.  **Scambio Dati con Applicazioni Esterne**:
    Se l'EV3 comunica con un'applicazione desktop, mobile, o un server web (es. tramite Bluetooth, Wi-Fi), JSON è un formato ideale per inviare comandi o ricevere dati telemetrici.
    *Esempio: EV3 invia dati dei sensori a un server:*
    ```javascript
    let sensorData = {
        timestamp: Date.now(),
        ultrasonic: getUltrasonicValue(), // Funzione ipotetica
        color: getColorValue()           // Funzione ipotetica
    };
    let jsonDataToSend = JSON.stringify(sensorData);
    // sendToServer(jsonDataToSend); // Funzione ipotetica per inviare i dati
    ```

4.  **Logging Strutturato**:
    Invece di log testuali semplici, si possono registrare eventi o stati in formato JSON per una più facile analisi successiva.

JSON è uno strumento versatile e potente per la gestione dei dati. La sua semplicità e l'ampio supporto lo rendono una scelta eccellente per molte esigenze di serializzazione e scambio di dati nella programmazione EV3.
