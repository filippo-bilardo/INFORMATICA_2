# Memorizzazione Dati in JavaScript per EV3

## Introduzione alla Memorizzazione Dati

La capacità di memorizzare dati in modo persistente è fondamentale per molte applicazioni robotiche. Nel contesto del robot LEGO EV3 programmato con JavaScript, la memorizzazione dei dati permette di salvare configurazioni, registrare dati dei sensori, mantenere lo stato tra diverse esecuzioni del programma e molto altro.

In questo capitolo esploreremo le diverse tecniche disponibili per memorizzare dati sul brick EV3 utilizzando JavaScript.

## Memorizzazione Locale sul Brick EV3

Il brick EV3 offre la possibilità di memorizzare dati in modo persistente attraverso l'API di storage di MakeCode.

### API di Storage in MakeCode

MakeCode per EV3 fornisce un'API di storage semplice ma potente:

```javascript
// Memorizzazione di un valore
storage.setNumber("velocitàBase", 50);
storage.setString("nomeRobot", "Explorer-1");
storage.setBoolean("seguiLinea", true);

// Lettura di un valore
let velocità = storage.getNumber("velocitàBase");
let nome = storage.getString("nomeRobot");
let seguiLinea = storage.getBoolean("seguiLinea");

// Verifica dell'esistenza di una chiave
if (storage.exists("velocitàBase")) {
    // La chiave esiste
}

// Rimozione di un valore
storage.remove("velocitàBase");

// Rimozione di tutti i valori
storage.clear();
```

### Limitazioni dello Storage

È importante essere consapevoli delle limitazioni dello storage sul brick EV3:

- Spazio limitato disponibile
- Supporto solo per tipi di dati semplici (numeri, stringhe, booleani)
- Nessun supporto diretto per strutture dati complesse

## Memorizzazione di Strutture Dati Complesse

Per memorizzare strutture dati più complesse come array e oggetti, è necessario convertirle in stringhe JSON:

```javascript
// Memorizzazione di un array
let configurazioni = ["config1", "config2", "config3"];
storage.setString("configurazioni", JSON.stringify(configurazioni));

// Lettura di un array
let configSalvate = JSON.parse(storage.getString("configurazioni") || "[]");

// Memorizzazione di un oggetto
let robotConfig = {
    motori: { sinistro: "B", destro: "C" },
    sensori: { distanza: 1, colore: 2 }
};
storage.setString("robotConfig", JSON.stringify(robotConfig));

// Lettura di un oggetto
let configSalvata = JSON.parse(storage.getString("robotConfig") || "{}");
```

Nota l'uso dell'operatore `||` per fornire un valore predefinito nel caso in cui la chiave non esista.

## Gestione delle Configurazioni

Un caso d'uso comune è la memorizzazione e il caricamento di configurazioni del robot:

```javascript
// Classe per gestire le configurazioni
class ConfigManager {
    constructor() {
        this.configCorrente = "default";
        this.configurazioni = {};
        this.caricaConfigurazioni();
    }
    
    caricaConfigurazioni() {
        // Carica tutte le configurazioni salvate
        let configSalvate = storage.getString("configurazioni");
        if (configSalvate) {
            this.configurazioni = JSON.parse(configSalvate);
        } else {
            // Configurazione predefinita
            this.configurazioni = {
                "default": {
                    velocità: 50,
                    precisione: "media",
                    comportamenti: { seguiLinea: true, evitaOstacoli: true }
                }
            };
            this.salvaConfigurazioni();
        }
    }
    
    salvaConfigurazioni() {
        storage.setString("configurazioni", JSON.stringify(this.configurazioni));
    }
    
    getConfig(nome = null) {
        nome = nome || this.configCorrente;
        return this.configurazioni[nome] || this.configurazioni["default"];
    }
    
    setConfig(nome, config) {
        this.configurazioni[nome] = config;
        this.salvaConfigurazioni();
    }
    
    cambiaConfigCorrente(nome) {
        if (nome in this.configurazioni) {
            this.configCorrente = nome;
            return true;
        }
        return false;
    }
}

// Utilizzo
let configManager = new ConfigManager();
let configAttuale = configManager.getConfig();

// Creazione di una nuova configurazione
configManager.setConfig("veloce", {
    velocità: 80,
    precisione: "bassa",
    comportamenti: { seguiLinea: false, evitaOstacoli: true }
});

// Cambio configurazione
configManager.cambiaConfigCorrente("veloce");
```

## Logging e Registrazione Dati

Un altro caso d'uso importante è la registrazione di dati per analisi successive:

```javascript
class DataLogger {
    constructor(nomeFile, dimensioneMax = 100) {
        this.nomeFile = nomeFile;
        this.dimensioneMax = dimensioneMax;
        this.dati = this.caricaDati();
    }
    
    caricaDati() {
        let datiSalvati = storage.getString(this.nomeFile);
        return datiSalvati ? JSON.parse(datiSalvati) : [];
    }
    
    salvaDati() {
        storage.setString(this.nomeFile, JSON.stringify(this.dati));
    }
    
    aggiungiDato(dato) {
        // Aggiungi timestamp se non presente
        if (!dato.timestamp) {
            dato.timestamp = control.millis();
        }
        
        this.dati.push(dato);
        
        // Limita la dimensione dell'array
        if (this.dati.length > this.dimensioneMax) {
            this.dati.shift();  // Rimuovi il dato più vecchio
        }
        
        this.salvaDati();
    }
    
    getDati() {
        return this.dati;
    }
    
    cancellaDati() {
        this.dati = [];
        this.salvaDati();
    }
}

// Utilizzo per registrare letture dei sensori
let sensorLogger = new DataLogger("sensori_log", 200);

function registraLettureSensori() {
    sensorLogger.aggiungiDato({
        distanza: sensors.ultrasonic1.distance(),
        colore: sensors.color1.color(),
        batteria: control.batteryLevel()
    });
}

// Registra ogni secondo
loops.everyInterval(1000, registraLettureSensori);
```

## Esportazione e Importazione Dati

Per analisi più avanzate, potrebbe essere necessario esportare i dati dal brick EV3 a un computer:

### Esportazione via Console

```javascript
function esportaDati() {
    let dati = sensorLogger.getDati();
    console.log("INIZIO_DATI");
    console.log(JSON.stringify(dati));
    console.log("FINE_DATI");
}

// Esporta quando viene premuto un pulsante
input.buttonEnter.onEvent(ButtonEvent.Pressed, esportaDati);
```

I dati possono essere copiati dalla console di MakeCode e salvati su un file sul computer.

### Importazione da Stringa JSON

```javascript
function importaDati(jsonString) {
    try {
        let dati = JSON.parse(jsonString);
        sensorLogger.dati = dati;
        sensorLogger.salvaDati();
        return true;
    } catch (e) {
        return false;
    }
}
```

## Considerazioni sulle Prestazioni e Affidabilità

Quando si lavora con la memorizzazione dati sul brick EV3:

- **Frequenza di scrittura**: Limita la frequenza con cui scrivi dati persistenti per evitare usura e rallentamenti
- **Dimensione dei dati**: Monitora la quantità di dati memorizzati per evitare di esaurire lo spazio disponibile
- **Gestione degli errori**: Implementa controlli per gestire situazioni in cui i dati non possono essere letti o scritti
- **Backup**: Considera l'implementazione di meccanismi di backup per dati critici

## Esempi Pratici

### Sistema di Configurazione Multimodale

```javascript
// Sistema che permette di cambiare tra diverse configurazioni del robot
class RobotModeManager {
    constructor() {
        this.modes = this.loadModes();
        this.currentMode = storage.getString("currentMode") || "normal";
        
        // Assicurati che la modalità corrente esista
        if (!(this.currentMode in this.modes)) {
            this.currentMode = "normal";
            storage.setString("currentMode", this.currentMode);
        }
    }
    
    loadModes() {
        let savedModes = storage.getString("robotModes");
        if (savedModes) {
            return JSON.parse(savedModes);
        } else {
            // Modalità predefinite
            let defaultModes = {
                "normal": {
                    speed: 50,
                    turnRate: 50,
                    behaviors: { lineFollow: true, obstacleAvoid: true }
                },
                "fast": {
                    speed: 90,
                    turnRate: 70,
                    behaviors: { lineFollow: false, obstacleAvoid: true }
                },
                "precise": {
                    speed: 30,
                    turnRate: 40,
                    behaviors: { lineFollow: true, obstacleAvoid: true }
                }
            };
            storage.setString("robotModes", JSON.stringify(defaultModes));
            return defaultModes;
        }
    }
    
    saveModes() {
        storage.setString("robotModes", JSON.stringify(this.modes));
    }
    
    getCurrentMode() {
        return {
            name: this.currentMode,
            ...this.modes[this.currentMode]
        };
    }
    
    setMode(modeName) {
        if (modeName in this.modes) {
            this.currentMode = modeName;
            storage.setString("currentMode", modeName);
            return true;
        }
        return false;
    }
    
    addMode(modeName, settings) {
        this.modes[modeName] = settings;
        this.saveModes();
    }
    
    deleteMode(modeName) {
        if (modeName !== "normal" && modeName in this.modes) {
            delete this.modes[modeName];
            this.saveModes();
            
            // Se la modalità corrente è stata eliminata, torna a "normal"
            if (this.currentMode === modeName) {
                this.currentMode = "normal";
                storage.setString("currentMode", "normal");
            }
            
            return true;
        }
        return false;
    }
}
```

### Sistema di Registrazione Missioni

```javascript
// Sistema per registrare i dettagli delle missioni del robot
class MissionLogger {
    constructor() {
        this.missions = this.loadMissions();
        this.currentMission = null;
    }
    
    loadMissions() {
        let saved = storage.getString("missions");
        return saved ? JSON.parse(saved) : [];
    }
    
    saveMissions() {
        storage.setString("missions", JSON.stringify(this.missions));
    }
    
    startMission(name) {
        this.currentMission = {
            name: name,
            startTime: control.millis(),
            endTime: null,
            events: [],
            sensorReadings: [],
            completed: false
        };
    }
    
    logEvent(eventType, details) {
        if (!this.currentMission) return false;
        
        this.currentMission.events.push({
            time: control.millis() - this.currentMission.startTime,
            type: eventType,
            details: details
        });
        
        return true;
    }
    
    logSensorReading(readings) {
        if (!this.currentMission) return false;
        
        this.currentMission.sensorReadings.push({
            time: control.millis() - this.currentMission.startTime,
            ...readings
        });
        
        return true;
    }
    
    endMission(success) {
        if (!this.currentMission) return false;
        
        this.currentMission.endTime = control.millis();
        this.currentMission.duration = this.currentMission.endTime - this.currentMission.startTime;
        this.currentMission.completed = success;
        
        this.missions.push(this.currentMission);
        this.saveMissions();
        
        this.currentMission = null;
        return true;
    }
    
    getMissionSummary() {
        return this.missions.map(m => ({
            name: m.name,
            duration: m.duration,
            completed: m.completed,
            eventCount: m.events.length
        }));
    }
    
    clearMissions() {
        this.missions = [];
        this.saveMissions();
    }
}
```

## Esercizi Pratici

1. Implementa un sistema di configurazione che permetta di salvare e caricare diverse configurazioni del robot
2. Crea un data logger che registri le letture dei sensori durante l'esecuzione di un programma
3. Sviluppa un sistema di "missioni" che registri i dettagli di diverse esecuzioni del robot
4. Implementa un meccanismo per esportare i dati registrati per l'analisi su un computer

---

**Prossima Guida**: [Elaborazione Dati Sensori](04-ElaborazioneDatiSensori.md)

**Guida Precedente**: [Oggetti e Proprietà](02-OggettiProprietà.md)

**Modulo**: [Gestione Dati e Strutture Dati](README.md)

[Torna all'indice del corso](../README.md)