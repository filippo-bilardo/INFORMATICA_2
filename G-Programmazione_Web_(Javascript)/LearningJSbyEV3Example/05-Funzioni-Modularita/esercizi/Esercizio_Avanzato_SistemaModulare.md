# Esercizio Avanzato: Sistema Robot Modulare

## Obiettivo
Creare un sistema robotico modulare completo che dimostri l'uso avanzato di funzioni, modularità e organizzazione del codice in JavaScript per EV3.

## Descrizione del Progetto
Svilupperai un sistema che permette al robot di eseguire diverse missioni attraverso un'architettura modulare ben strutturata.

## Requisiti Tecnici

### 1. Architettura Modulare
- **Modulo Configurazione**: Centralizza tutte le impostazioni
- **Modulo Motori**: Gestisce movimenti e navigazione
- **Modulo Sensori**: Legge e interpreta dati ambientali
- **Modulo Comportamenti**: Implementa diverse strategie operative
- **Modulo Interfaccia**: Gestisce interazione con l'utente

### 2. Funzionalità Richieste

#### Sistema di Configurazione
```javascript
// Implementa un sistema di configurazione flessibile
const RobotConfig = {
    // Configurazioni hardware
    hardware: {
        motorPorts: ['B', 'C'],
        sensorPorts: {
            ultrasonic: 4,
            color: 3,
            touch: 1
        }
    },
    
    // Parametri operativi
    navigation: {
        defaultSpeed: 50,
        turnSpeed: 30,
        precisionMode: false
    },
    
    // Soglie sensori
    thresholds: {
        obstacle: 20,
        line: 50,
        wall: 10
    }
};
```

#### Modulo Motori Avanzato
Implementa le seguenti funzioni:
- `moveDistance(cm, speed)` - Movimento preciso in centimetri
- `turnAngle(degrees, direction)` - Rotazione precisa in gradi
- `followWall(side, distance)` - Segue una parete mantenendo distanza
- `spiralSearch(radius, increment)` - Movimento a spirale per ricerca
- `emergencyStop()` - Arresto immediato con feedback

#### Modulo Sensori Intelligenti
Implementa:
- `getEnvironmentScan()` - Scansione completa dell'ambiente
- `detectObjects()` - Rilevamento e classificazione oggetti
- `trackMovement()` - Tracciamento del movimento del robot
- `calibrateSensors()` - Calibrazione automatica
- `predictCollision()` - Predizione collisioni basata su velocità

#### Sistema Comportamenti
Crea almeno 4 comportamenti:

1. **Esplorazione Sistematica**
   - Mappa metodicamente un'area
   - Evita ostacoli con strategia intelligente
   - Torna al punto di partenza

2. **Seguimento Linea Avanzato**
   - Segue linee con curve strette
   - Gestisce interruzioni nella linea
   - Adatta velocità alle curve

3. **Ricerca e Recupero**
   - Cerca oggetti specifici (per colore)
   - Li sposta in una zona designata
   - Ottimizza il percorso

4. **Pattugliamento**
   - Percorre un perimetro definito
   - Rileva intrusioni
   - Invia allarmi

### 3. Interfaccia Utente Avanzata

#### Menu Gerarchico
```javascript
const MenuSystem = {
    mainMenu: [
        'Configurazione',
        'Comportamenti',
        'Test Hardware',
        'Diagnostica',
        'Missioni'
    ],
    
    behaviorMenu: [
        'Esplorazione',
        'Segui Linea',
        'Ricerca Oggetti',
        'Pattugliamento'
    ]
};
```

#### Sistema di Feedback
- Display progressi missione
- Indicatori di stato in tempo reale
- Alert sonori per eventi importanti
- Log delle attività

## Specifiche di Implementazione

### 1. Struttura File
```
esercizio-sistema-modulare/
├── config/
│   └── robot-config.js
├── modules/
│   ├── motor-controller.js
│   ├── sensor-manager.js
│   ├── behavior-system.js
│   └── interface-manager.js
├── behaviors/
│   ├── exploration.js
│   ├── line-following.js
│   ├── object-search.js
│   └── patrol.js
├── utils/
│   ├── math-utils.js
│   ├── error-handler.js
│   └── logger.js
└── main.js
```

### 2. Pattern di Progettazione da Utilizzare

#### Module Pattern
```javascript
const MotorController = (function() {
    // Variabili private
    let isMoving = false;
    let currentPosition = {x: 0, y: 0, angle: 0};
    
    // Metodi privati
    function updatePosition(distance, angle) {
        // Calcola nuova posizione
    }
    
    // Interfaccia pubblica
    return {
        move: function(distance, speed) {
            // Implementazione
        },
        getPosition: function() {
            return {...currentPosition};
        }
    };
})();
```

#### Observer Pattern per Eventi
```javascript
const EventSystem = {
    events: {},
    
    on: function(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    },
    
    emit: function(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
};
```

#### Strategy Pattern per Comportamenti
```javascript
function BehaviorStrategy(name) {
    this.name = name;
}

BehaviorStrategy.prototype = {
    execute: function() {
        throw new Error("Metodo execute deve essere implementato");
    },
    stop: function() {
        // Implementazione di base
    }
};
```

### 3. Gestione Errori Avanzata

Implementa un sistema di gestione errori robusto:

```javascript
const ErrorManager = {
    errorTypes: {
        SENSOR_FAILURE: 'sensor',
        MOTOR_STALL: 'motor',
        TIMEOUT: 'timeout',
        USER_ABORT: 'user'
    },
    
    handle: function(error, context) {
        // Log dell'errore
        this.log(error, context);
        
        // Strategia di recupero
        this.recover(error.type);
        
        // Notifica utente se necessario
        this.notify(error);
    },
    
    recover: function(errorType) {
        switch(errorType) {
            case this.errorTypes.MOTOR_STALL:
                // Tentativo di sblocco motori
                break;
            case this.errorTypes.SENSOR_FAILURE:
                // Modalità degradata senza sensore
                break;
        }
    }
};
```

## Fasi di Sviluppo

### Fase 1: Architettura Base (2-3 ore)
1. Crea la struttura modulare base
2. Implementa sistema di configurazione
3. Sviluppa moduli motori e sensori basilari
4. Test delle funzionalità base

### Fase 2: Comportamenti (3-4 ore)
1. Implementa i 4 comportamenti richiesti
2. Sistema di switching tra comportamenti
3. Test individuali di ogni comportamento
4. Integrazione e test sistema completo

### Fase 3: Interfaccia e Ottimizzazione (2-3 ore)
1. Sviluppa sistema menu avanzato
2. Implementa feedback e logging
3. Ottimizzazione prestazioni
4. Test di usabilità

### Fase 4: Funzionalità Avanzate (2-3 ore)
1. Sistema di mapping rudimentale
2. Apprendimento parametri ottimali
3. Modalità demo automatica
4. Documentazione del sistema

## Criteri di Valutazione

### Funzionalità (40%)
- Tutti i comportamenti funzionano correttamente
- Sistema di navigazione preciso
- Gestione sensori affidabile
- Interfaccia utente intuitiva

### Architettura Software (30%)
- Modularità ben implementata
- Separazione responsabilità chiara
- Riutilizzabilità del codice
- Pattern di design appropriati

### Robustezza (20%)
- Gestione errori completa
- Recupero da situazioni critiche
- Performance stabili
- Testing accurato

### Innovazione (10%)
- Funzionalità creative aggiuntive
- Ottimizzazioni intelligenti
- Interfaccia utente avanzata
- Documentazione eccellente

## Bonus Challenges

### Challenge 1: Sistema di Mapping
Implementa un sistema che crea una mappa rudimentale dell'ambiente usando solo i sensori disponibili.

### Challenge 2: Machine Learning Basilare
Crea un sistema che "impara" i parametri ottimali per diversi tipi di superficie o ambienti.

### Challenge 3: Comunicazione Multi-Robot
Simula un sistema di comunicazione tra più robot usando suoni o LED.

### Challenge 4: Modalità Salvataggio Energia
Implementa algoritmi per ottimizzare il consumo energetico durante le missioni.

## Risorse e Suggerimenti

### Algoritmi Utili
- **A-Star**: Per pathfinding ottimale
- **PID Controller**: Per movimenti fluidi
- **Kalman Filter**: Per filtraggio dati sensori
- **State Machine**: Per gestione comportamenti

### Testing
Crea test per ogni modulo:
```javascript
const TestSuite = {
    testMotorController: function() {
        // Test movimento preciso
        // Test rotazioni
        // Test calibrazione
    },
    
    testSensorManager: function() {
        // Test lettura sensori
        // Test calibrazione
        // Test filtraggio dati
    }
};
```

### Debugging
Implementa strumenti di debug:
- Visualizzazione stato in tempo reale
- Log dettagliati delle operazioni
- Modalità step-by-step per debugging
- Simulazione eventi per testing

## Deliverables

1. **Codice Sorgente Completo**
   - Tutti i file organizzati secondo la struttura richiesta
   - Commenti dettagliati in italiano
   - Esempi di utilizzo per ogni modulo

2. **Documentazione Tecnica**
   - Architettura del sistema
   - API reference per ogni modulo
   - Guida all'installazione e utilizzo

3. **Video Dimostrativo**
   - Demo di tutti i comportamenti
   - Navigazione dell'interfaccia
   - Gestione di situazioni di errore

4. **Report di Progetto**
   - Decisioni di design prese
   - Sfide incontrate e soluzioni
   - Possibili miglioramenti futuri

## Valutazione Finale

Il progetto sarà valutato su:
- **Completezza**: Tutte le funzionalità richieste implementate
- **Qualità del Codice**: Pulizia, organizzazione, documentazione
- **Funzionalità**: Performance e affidabilità del sistema
- **Innovazione**: Creatività nelle soluzioni e funzionalità extra

Tempo stimato: **10-12 ore** di lavoro intensivo

Buona programmazione! 🤖

---
[⬅️ Torna agli Esercizi](./README.md) | [🏠 Torna al Modulo](../README.md)
