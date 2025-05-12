<<<<<<< HEAD
# Guida 5: JSON (JavaScript Object Notation)

## Introduzione a JSON

JSON, acronimo di JavaScript Object Notation, è un formato leggero per lo scambio di dati. È facile da leggere e scrivere per gli umani e facile da analizzare e generare per le macchine. Nonostante il nome, JSON è un formato di dati indipendente dal linguaggio, anche se usa convenzioni familiari ai programmatori della famiglia di linguaggi C (inclusi C, C++, C#, Java, JavaScript, Perl, Python, e molti altri).

JSON è diventato uno standard de facto per la trasmissione di dati tra un server e un'applicazione web (AJAX), ma è anche ampiamente utilizzato per file di configurazione, memorizzazione di dati e in molte altre situazioni in cui i dati devono essere strutturati e scambiati.

Per la programmazione EV3, JSON può essere utile per:

-   Salvare e caricare configurazioni del robot.
-   Memorizzare sequenze di comandi o percorsi.
-   Scambiare dati con un computer o un altro dispositivo (se l'ambiente EV3 lo supporta).

## Sintassi di Base di JSON

JSON si basa su due strutture:

1.  **Una collezione di coppie nome/valore (oggetti)**: In vari linguaggi, questa è realizzata come un oggetto, record, struct, dizionario, hash table, lista di chiavi, o array associativo.
2.  **Una lista ordinata di valori (array)**: In molti linguaggi, questa è realizzata come un array, vettore, lista, o sequenza.

### Oggetti JSON

Un oggetto JSON è una collezione non ordinata di coppie chiave/valore. Un oggetto inizia con `{` (parentesi graffa sinistra) e finisce con `}` (parentesi graffa destra). Ogni chiave è seguita da `:` (due punti) e le coppie chiave/valore sono separate da `,` (virgola).

-   **Chiavi**: Devono essere stringhe, racchiuse tra doppie virgolette (`"`).
-   **Valori**: Possono essere stringhe (in doppie virgolette), numeri, booleani (`true` o `false`), array, oggetti, o il valore `null`.

```json
{
    "nomeRobot": "EV3-Bot",
    "versione": 1.2,
    "attivo": true,
    "motori": {
        "sinistro": "outA",
        "destro": "outB"
    },
    "sensoriConnessi": ["colore", "ultrasuoni"],
    "ultimaCalibrazione": null
}
```

### Array JSON

Un array JSON è una collezione ordinata di valori. Un array inizia con `[` (parentesi quadra sinistra) e finisce con `]` (parentesi quadra destra). I valori sono separati da `,` (virgola).

```json
[
    "rosso",
    "verde",
    "blu",
    {
        "tipo": "configurazione",
        "valore": 100
    },
    null
]
```

## Tipi di Dati in JSON

-   **Stringa**: Una sequenza di zero o più caratteri Unicode, racchiusa tra doppie virgolette, con escape tramite backslash per caratteri speciali (es. `\"`, `\\`, `\/`, `\b`, `\f`, `\n`, `\r`, `\t`, `\uXXXX`).
    `"Ciao Mondo"`, `"Porta: \"in1\""`
-   **Numero**: Un numero decimale (intero o a virgola mobile). Non sono ammessi ottali o esadecimali, né `NaN` o `Infinity`.
    `100`, `-2.5`, `3.14159e2`
-   **Booleano**: `true` o `false` (senza virgolette).
-   **Array**: Una lista ordinata di valori JSON, racchiusa tra parentesi quadre.
-   **Oggetto**: Una collezione non ordinata di coppie chiave/valore, racchiusa tra parentesi graffe.
-   **`null`**: Rappresenta un valore nullo (senza virgolette).

**Importante**: JSON non supporta commenti, funzioni, date (devono essere serializzate come stringhe, es. formato ISO 8601), o `undefined`.

## Utilizzo di JSON in JavaScript

JavaScript fornisce metodi integrati per lavorare con JSON:

-   **`JSON.stringify()`**: Converte un oggetto o valore JavaScript in una stringa JSON.
    ```javascript
    let configurazioneEV3 = {
        nome: "RoboEsploratore",
        velocitaMax: 75,
        sensori: ["tocco", "colore"],
        pronto: true
    };

    let jsonString = JSON.stringify(configurazioneEV3);
    console.log(jsonString);
    // Output (stringa):
    // {"nome":"RoboEsploratore","velocitaMax":75,"sensori":["tocco","colore"],"pronto":true}

    // Con formattazione (indentazione)
    let jsonStringFormattato = JSON.stringify(configurazioneEV3, null, 2); // 2 spazi di indentazione
    console.log(jsonStringFormattato);
    /* Output (stringa formattata):
    {
      "nome": "RoboEsploratore",
      "velocitaMax": 75,
      "sensori": [
        "tocco",
        "colore"
      ],
      "pronto": true
    }
    */
    ```

-   **`JSON.parse()`**: Converte una stringa JSON (che deve essere valida) in un oggetto o valore JavaScript.
    ```javascript
    let datiRobotString = '{"nome":"EV3-Alpha","missioniCompletate":5,"componentiAttivi":["motoreA","sensore1"]}';

    let datiRobotOggetto = JSON.parse(datiRobotString);

    console.log(datiRobotOggetto.nome); // Output: EV3-Alpha
    console.log(datiRobotOggetto.missioniCompletate); // Output: 5
    console.log(datiRobotOggetto.componentiAttivi[0]); // Output: motoreA
    ```
    Se la stringa JSON non è valida, `JSON.parse()` lancerà un errore `SyntaxError`.

## Applicazioni Pratiche con EV3

1.  **File di Configurazione**: Si potrebbe avere un file `config.json` sul brick EV3 (se il sistema operativo lo permette) o su un computer collegato, contenente le impostazioni del robot.
    ```json
    // config_robot.json
    {
        "nomeRobot": "LineFollower_01",
        "velocitaBase": 40,
        "sensoreLucePorta": "in2",
        "guadagnoKp": 0.8,
        "guadagnoKi": 0.1,
        "guadagnoKd": 0.05
    }
    ```
    Il programma JavaScript sull'EV3 potrebbe leggere questo file (se possibile) e usare `JSON.parse()` per caricare la configurazione.

2.  **Salvataggio dello Stato o dei Dati**: Se il robot raccoglie dati (es. una mappa dell'ambiente, una serie di letture), questi potrebbero essere strutturati come un oggetto JavaScript e poi convertiti in una stringa JSON con `JSON.stringify()` per essere salvati su file o trasmessi.
    ```javascript
    let datiSessione = {
        timestampInizio: new Date().toISOString(),
        percorsoSeguito: [
            {x:0, y:0}, {x:10, y:0}, {x:10, y:5}
        ],
        ostacoliRilevati: 3
    };
    let datiJson = JSON.stringify(datiSessione);
    // Qui si potrebbe scrivere 'datiJson' su un file o inviarlo via rete.
    // Ad esempio, se l'ambiente EV3 permette di scrivere su file:
    // fs.writeFileSync('session_log.json', datiJson);
    ```

3.  **Definizione di Sequenze di Azioni**: Una sequenza complessa di azioni per l'EV3 potrebbe essere definita in un file JSON.
    ```json
    // sequenza_danza.json
    [
        { "azione": "muoviAvanti", "distanza": 50, "velocita": 60 },
        { "azione": "ruotaDestra", "angolo": 90, "velocita": 30 },
        { "azione": "suono", "nomeFile": "robot_sound1.rsf" },
        { "azione": "muoviIndietro", "distanza": 30, "velocita": 40 }
    ]
    ```
    Il programma EV3 leggerebbe questo JSON, lo parserebbe, e poi itererebbe sull'array di azioni per eseguirle.
    // Esempio di caricamento e utilizzo (ipotetico, dipende dall'ambiente EV3):
    /*
    const fs = require('fs'); // Modulo per file system (se disponibile)
    try {
        const jsonSequenza = fs.readFileSync('sequenza_danza.json', 'utf8');
        const azioniDanza = JSON.parse(jsonSequenza);

        azioniDanza.forEach(azione => {
            console.log(`Eseguo: ${azione.azione} con valore ${azione.valore || azione.nomeFile}`);
            // Qui logica per eseguire l'azione specifica sull'EV3
            // Esempio: if (azione.azione === "muoviAvanti") { ... }
        });
    } catch (err) {
        console.error("Errore nel caricare o processare la sequenza di danza:", err);
    }
    */

## Vantaggi di JSON

-   **Leggibilità**: Facile da leggere e scrivere per gli umani.
-   **Semplicità**: La sintassi è minimale e facile da imparare.
-   **Supporto Diffuso**: Praticamente tutti i linguaggi di programmazione moderni hanno librerie per gestire JSON.
-   **Leggerezza**: Meno verboso di XML, il che lo rende efficiente per la trasmissione di dati.

## Limitazioni

-   Nessun supporto per commenti.
-   Tipi di dati limitati (es. nessuna data nativa, nessun `undefined`).
-   Le chiavi degli oggetti devono essere stringhe.
-   Nessuna gestione degli schemi o validazione intrinseca (anche se esistono librerie esterne per questo).

## Best Practices e Suggerimenti per EV3

1.  **Validazione dell'Input JSON**: Quando si riceve JSON da una fonte esterna (es. file, rete), è buona pratica validare la sua struttura prima di utilizzarlo. `JSON.parse()` lancerà un errore per JSON malformato, ma potrebbe essere necessario controllare che tutte le proprietà attese siano presenti e del tipo corretto.
    ```javascript
    let jsonConfig = '{"velocita": 70, "portaMotore": "outA"}'; // Potrebbe mancare una proprietà attesa
    try {
        let config = JSON.parse(jsonConfig);
        if (typeof config.velocita !== 'number' || typeof config.portaMotore !== 'string') {
            throw new Error("Configurazione JSON non valida: tipi di dati errati.");
        }
        if (!config.hasOwnProperty('modalitaOperativa')) {
            console.warn("Attenzione: 'modalitaOperativa' non specificata, uso default.");
            config.modalitaOperativa = "standard";
        }
        // Usa config...
    } catch (e) {
        console.error(`Errore nella gestione della configurazione JSON: ${e.message}`);
        // Gestisci l'errore, usa valori di default o interrompi
    }
    ```

2.  **Gestione degli Errori con `JSON.parse()`**: Racchiudi sempre le chiamate a `JSON.parse()` in un blocco `try...catch` perché può lanciare un `SyntaxError` se la stringa JSON non è valida.

3.  **Formattazione per Leggibilità (`JSON.stringify()`):** Quando salvi JSON in file che potrebbero essere letti da umani (es. file di configurazione), usa il terzo argomento di `JSON.stringify()` per indentare l'output, rendendolo più leggibile.
    `JSON.stringify(oggetto, null, 2); // Indentazione con 2 spazi`
    `JSON.stringify(oggetto, null, '\t'); // Indentazione con tabulazioni`

4.  **Dimensioni dei Dati**: Su sistemi con risorse limitate come l'EV3, sii consapevole della dimensione delle stringhe JSON, specialmente se vengono memorizzate in memoria o trasmesse frequentemente. Mantieni le strutture dati concise e pertinenti.

5.  **Serializzazione di Tipi Non Supportati**: JSON non supporta direttamente tipi come `Date`, `Map`, `Set`, o funzioni. Se devi serializzare questi tipi:
    *   **Date**: Convertile in stringhe (es. formato ISO 8601: `new Date().toISOString()`) prima di `stringify` e riconvertile in oggetti `Date` dopo `parse`.
        ```javascript
        let evento = { nome: "Inizio Missione", timestamp: new Date() };
        let jsonEvento = JSON.stringify(evento, (key, value) => {
            if (key === 'timestamp' && value instanceof Date) {
                return value.toISOString();
            }
            return value;
        });
        // Per il parsing, dovrai riconvertire la stringa in Date manualmente.
        let eventoParsato = JSON.parse(jsonEvento, (key, value) => {
            if (key === 'timestamp') return new Date(value);
            return value;
        });
        ```
    *   **Funzioni e `undefined`**: Vengono omesse da `JSON.stringify()` (se sono valori di proprietà) o convertite in `null` (se sono in un array). Non possono essere serializzate direttamente.
    *   **`Map` e `Set`**: Convertili in array o oggetti prima della serializzazione.

6.  **Utilizzo per la Comunicazione Inter-Processo o con PC**: Se il tuo programma EV3 deve comunicare con un programma su un PC o un altro dispositivo, JSON è una scelta eccellente per il formato dei messaggi grazie alla sua interoperabilità.

7.  **File di Log**: JSON (o JSON Lines, dove ogni riga è un oggetto JSON valido) può essere un formato utile per i file di log, poiché i log possono essere facilmente parsati e analizzati da altri strumenti.
    ```javascript
    // Esempio di log in formato JSON Lines
    // {"timestamp":"2023-10-27T10:00:00Z","livello":"INFO","messaggio":"Robot avviato"}
    // {"timestamp":"2023-10-27T10:00:05Z","livello":"DEBUG","sensore":"colore","valore":55}
    ```

## Conclusione

JSON è un formato di dati estremamente utile e versatile. Per la programmazione EV3, offre un modo standardizzato e semplice per rappresentare configurazioni, stati, sequenze di comandi e altri dati strutturati. La capacità di JavaScript di manipolare facilmente JSON tramite `JSON.stringify()` e `JSON.parse()`, insieme alla sua ampia adozione, lo rende uno strumento prezioso per sviluppare applicazioni robotiche più complesse, configurabili e interoperabili.

---

[⬅️ Torna all'elenco delle Guide](./README.md)
=======
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
>>>>>>> 760d5bd66d3e244e5fd0e53c590d3de7a57c93ff
