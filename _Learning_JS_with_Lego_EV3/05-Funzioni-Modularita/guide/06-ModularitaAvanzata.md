# Guida: Modularità Avanzata e Organizzazione del Codice

## Introduzione
La modularità è un principio fondamentale nella programmazione che consiste nell'organizzare il codice in moduli separati e riutilizzabili. Questa guida esplora tecniche avanzate per strutturare il codice JavaScript per robot EV3.

## Principi della Modularità

### 1. Separazione delle Responsabilità
Ogni modulo dovrebbe avere una responsabilità specifica e ben definita.

```javascript
// Modulo per la gestione dei motori
const MotorController = {
    // Funzioni per il controllo dei motori
    moveForward: function(speed, duration) {
        motors.largeBC.steer(0, speed);
        pause(duration);
        motors.largeBC.stop();
    },
    
    turnRight: function(angle) {
        const rotations = angle / 360;
        motors.largeBC.steer(100, 30, rotations, MoveUnit.Rotations);
    },
    
    turnLeft: function(angle) {
        const rotations = angle / 360;
        motors.largeBC.steer(-100, 30, rotations, MoveUnit.Rotations);
    }
};

// Modulo per la gestione dei sensori
const SensorController = {
    readUltrasonic: function() {
        return sensors.ultrasonic4.distance();
    },
    
    readColor: function() {
        return sensors.color3.color();
    },
    
    isObstacleDetected: function(threshold = 20) {
        return this.readUltrasonic() < threshold;
    }
};
```

### 2. Interfacce Chiare
Definisci interfacce chiare per i tuoi moduli.

```javascript
// Interfaccia per un comportamento del robot
const BehaviorInterface = {
    // Metodo principale per eseguire il comportamento
    execute: function() {
        throw new Error("Metodo execute deve essere implementato");
    },
    
    // Metodo per fermare il comportamento
    stop: function() {
        throw new Error("Metodo stop deve essere implementato");
    },
    
    // Metodo per verificare se il comportamento è attivo
    isActive: function() {
        throw new Error("Metodo isActive deve essere implementato");
    }
};

// Implementazione di un comportamento specifico
const AvoidObstacle = Object.create(BehaviorInterface);
AvoidObstacle.execute = function() {
    if (SensorController.isObstacleDetected()) {
        MotorController.turnRight(90);
        MotorController.moveForward(50, 1000);
        MotorController.turnLeft(90);
    }
};
```

### 3. Configurazione Centralizzata
Mantieni le configurazioni in un posto centrale.

```javascript
// Modulo di configurazione
const Config = {
    // Configurazioni motori
    motors: {
        defaultSpeed: 50,
        turnSpeed: 30,
        fastSpeed: 80
    },
    
    // Configurazioni sensori
    sensors: {
        obstacleThreshold: 20,
        lineThreshold: 50,
        samplingRate: 100
    },
    
    // Configurazioni comportamenti
    behaviors: {
        searchTimeout: 5000,
        followLineTimeout: 10000
    }
};
```

## Patterns di Organizzazione

### 1. Module Pattern
Crea moduli auto-contenuti usando closures.

```javascript
const RobotModule = (function() {
    // Variabili private
    let isMoving = false;
    let currentSpeed = 0;
    
    // Funzioni private
    function updateStatus() {
        brick.showValue("Velocità", currentSpeed, 1);
        brick.showValue("In movimento", isMoving ? 1 : 0, 2);
    }
    
    // Interfaccia pubblica
    return {
        start: function(speed) {
            currentSpeed = speed || Config.motors.defaultSpeed;
            isMoving = true;
            motors.largeBC.steer(0, currentSpeed);
            updateStatus();
        },
        
        stop: function() {
            motors.largeBC.stop();
            isMoving = false;
            currentSpeed = 0;
            updateStatus();
        },
        
        getStatus: function() {
            return {
                moving: isMoving,
                speed: currentSpeed
            };
        }
    };
})();
```

### 2. Factory Pattern
Crea oggetti usando factory functions.

```javascript
// Factory per creare comportamenti del robot
function createBehavior(type, config) {
    const behavior = {
        type: type,
        config: config || {},
        isActive: false,
        
        start: function() {
            this.isActive = true;
            brick.showString(`Avvio: ${this.type}`, 1);
        },
        
        stop: function() {
            this.isActive = false;
            motors.largeBC.stop();
            brick.showString(`Stop: ${this.type}`, 1);
        }
    };
    
    // Aggiungi metodi specifici in base al tipo
    switch(type) {
        case 'follow-line':
            behavior.execute = function() {
                const lightValue = sensors.color3.light();
                if (lightValue < this.config.threshold) {
                    motors.largeBC.steer(0, this.config.speed);
                } else {
                    motors.largeBC.steer(50, this.config.speed * 0.7);
                }
            };
            break;
            
        case 'avoid-obstacle':
            behavior.execute = function() {
                const distance = sensors.ultrasonic4.distance();
                if (distance < this.config.threshold) {
                    motors.largeBC.steer(100, this.config.speed);
                } else {
                    motors.largeBC.steer(0, this.config.speed);
                }
            };
            break;
    }
    
    return behavior;
}

// Uso del factory
const lineFollower = createBehavior('follow-line', {
    threshold: 50,
    speed: 40
});

const obstacleAvoider = createBehavior('avoid-obstacle', {
    threshold: 20,
    speed: 30
});
```

## Sistema di Plugin

### Creazione di un sistema estensibile
```javascript
// Sistema di gestione plugin
const PluginSystem = {
    plugins: [],
    
    register: function(plugin) {
        if (this.validate(plugin)) {
            this.plugins.push(plugin);
            brick.showString(`Plugin ${plugin.name} registrato`, 1);
            return true;
        }
        return false;
    },
    
    validate: function(plugin) {
        return plugin.name && 
               typeof plugin.execute === 'function' &&
               typeof plugin.stop === 'function';
    },
    
    execute: function(pluginName, ...args) {
        const plugin = this.plugins.find(p => p.name === pluginName);
        if (plugin) {
            return plugin.execute(...args);
        }
        throw new Error(`Plugin ${pluginName} non trovato`);
    },
    
    list: function() {
        return this.plugins.map(p => p.name);
    }
};

// Esempio di plugin
const ExplorationPlugin = {
    name: 'exploration',
    
    execute: function(duration = 5000) {
        const startTime = Date.now();
        while (Date.now() - startTime < duration) {
            if (SensorController.isObstacleDetected()) {
                MotorController.turnRight(90);
            } else {
                MotorController.moveForward(50, 500);
            }
            pause(100);
        }
    },
    
    stop: function() {
        motors.largeBC.stop();
    }
};

// Registrazione e uso
PluginSystem.register(ExplorationPlugin);
PluginSystem.execute('exploration', 10000);
```

## Gestione degli Errori Modulare

```javascript
// Modulo per la gestione degli errori
const ErrorHandler = {
    errors: [],
    
    handle: function(error, context) {
        const errorInfo = {
            message: error.message || error,
            context: context,
            timestamp: Date.now()
        };
        
        this.errors.push(errorInfo);
        this.display(errorInfo);
        this.log(errorInfo);
    },
    
    display: function(errorInfo) {
        brick.clearScreen();
        brick.showString("ERRORE!", 1);
        brick.showString(errorInfo.context, 2);
        brick.showString(errorInfo.message.substring(0, 20), 3);
        music.playTone(200, 1000); // Suono di errore
    },
    
    log: function(errorInfo) {
        console.log(`[${errorInfo.timestamp}] ${errorInfo.context}: ${errorInfo.message}`);
    },
    
    getLastErrors: function(count = 5) {
        return this.errors.slice(-count);
    }
};

// Wrapper per esecuzione sicura
function safeExecute(fn, context, ...args) {
    try {
        return fn(...args);
    } catch (error) {
        ErrorHandler.handle(error, context);
        return null;
    }
}

// Uso
safeExecute(MotorController.moveForward, "Movimento robot", 50, 2000);
```

## Best Practices per la Modularità

### 1. Nomenclatura Consistente
- Usa nomi descriptivi per moduli e funzioni
- Mantieni convenzioni di naming coerenti
- Usa prefissi per raggruppare funzioni correlate

### 2. Documentazione
- Documenta l'interfaccia pubblica di ogni modulo
- Includi esempi d'uso
- Specifica dipendenze e prerequisiti

### 3. Testing Modulare
```javascript
// Framework di test semplice
const TestRunner = {
    tests: [],
    
    addTest: function(name, testFn) {
        this.tests.push({ name, testFn });
    },
    
    run: function() {
        let passed = 0;
        let failed = 0;
        
        for (let test of this.tests) {
            try {
                test.testFn();
                brick.showString(`✓ ${test.name}`, passed + failed + 1);
                passed++;
            } catch (error) {
                brick.showString(`✗ ${test.name}`, passed + failed + 1);
                failed++;
            }
            pause(1000);
        }
        
        brick.showString(`Risultati: ${passed}/${this.tests.length}`, 8);
    }
};

// Test per i moduli
TestRunner.addTest("MotorController.moveForward", function() {
    // Test che la funzione non genera errori
    MotorController.moveForward(50, 100);
});

TestRunner.addTest("SensorController.readUltrasonic", function() {
    const distance = SensorController.readUltrasonic();
    if (distance < 0 || distance > 255) {
        throw new Error("Valore sensore non valido");
    }
});
```

## Conclusioni
La modularità ben progettata rende il codice:
- Più facile da capire e mantenere
- Riutilizzabile in diversi contesti
- Testabile in modo indipendente
- Scalabile per progetti complessi

Applica questi principi gradualmente, iniziando con moduli semplici e aumentando la complessità man mano che acquisisci esperienza.

## Esercizi Pratici
1. Crea un sistema modulare per la navigazione del robot
2. Implementa un sistema di plugin per comportamenti personalizzabili
3. Sviluppa un framework di testing per i tuoi moduli

---
[⬅️ Torna alle Guide](./README.md) | [🏠 Torna al Modulo](../README.md)
