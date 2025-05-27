/**
 * File: 06_LibreriaModulareCompleta.js
 * Descrizione: Libreria modulare completa per robot EV3 con sistema di plugin
 * Corso: Learning JavaScript by Lego EV3 Example
 */

// ==========================================
// CONFIGURAZIONE GLOBALE
// ==========================================

const RobotConfig = {
    // Configurazioni motori
    motors: {
        defaultSpeed: 50,
        turnSpeed: 30,
        fastSpeed: 80,
        slowSpeed: 20,
        wheelDiameter: 5.5, // cm
        trackWidth: 12.0    // cm (distanza tra ruote)
    },
    
    // Configurazioni sensori
    sensors: {
        obstacleThreshold: 20,
        lineThreshold: 50,
        colorThreshold: 30,
        samplingRate: 100
    },
    
    // Configurazioni temporali
    timing: {
        defaultPause: 100,
        turnPause: 500,
        sensorDelay: 50
    }
};

// ==========================================
// MODULO CONTROLLO MOTORI
// ==========================================

const MotorController = (function() {
    let isMoving = false;
    let currentDirection = 'stopped';
    
    // Funzioni private per calcoli
    function degreesToRotations(degrees) {
        return degrees / 360;
    }
    
    function cmToRotations(distance) {
        return distance / (Math.PI * RobotConfig.motors.wheelDiameter);
    }
    
    function updateStatus(direction, speed) {
        currentDirection = direction;
        isMoving = speed > 0;
        brick.showValue("Stato", direction, 1);
        brick.showValue("Velocità", speed, 2);
    }
    
    // Interfaccia pubblica
    return {
        // Movimento in avanti con distanza specifica
        moveForward: function(distance, speed = RobotConfig.motors.defaultSpeed) {
            const rotations = cmToRotations(distance);
            updateStatus('avanti', speed);
            motors.largeBC.steer(0, speed, rotations, MoveUnit.Rotations);
            updateStatus('fermo', 0);
        },
        
        // Movimento indietro con distanza specifica
        moveBackward: function(distance, speed = RobotConfig.motors.defaultSpeed) {
            const rotations = cmToRotations(distance);
            updateStatus('indietro', speed);
            motors.largeBC.steer(0, -speed, rotations, MoveUnit.Rotations);
            updateStatus('fermo', 0);
        },
        
        // Rotazione precisa in gradi
        turnRight: function(degrees, speed = RobotConfig.motors.turnSpeed) {
            const rotations = degreesToRotations(degrees);
            updateStatus('destra', speed);
            motors.largeBC.steer(100, speed, rotations, MoveUnit.Rotations);
            updateStatus('fermo', 0);
        },
        
        turnLeft: function(degrees, speed = RobotConfig.motors.turnSpeed) {
            const rotations = degreesToRotations(degrees);
            updateStatus('sinistra', speed);
            motors.largeBC.steer(-100, speed, rotations, MoveUnit.Rotations);
            updateStatus('fermo', 0);
        },
        
        // Movimento continuo (senza durata fissa)
        startMoving: function(steer = 0, speed = RobotConfig.motors.defaultSpeed) {
            updateStatus('continuo', speed);
            motors.largeBC.steer(steer, speed);
        },
        
        // Fermata di emergenza
        emergencyStop: function() {
            motors.largeBC.stop();
            motors.mediumA.stop();
            updateStatus('stop', 0);
            music.playTone(200, 200);
        },
        
        // Getters per stato
        getStatus: function() {
            return {
                moving: isMoving,
                direction: currentDirection
            };
        },
        
        // Calibrazione
        calibrate: function() {
            brick.showString("Calibrazione...", 1);
            // Test movimento 10cm
            this.moveForward(10, 30);
            pause(1000);
            this.turnRight(90, 20);
            pause(1000);
            this.turnLeft(90, 20);
            brick.showString("Calibrazione OK", 1);
        }
    };
})();

// ==========================================
// MODULO GESTIONE SENSORI
// ==========================================

const SensorController = (function() {
    let sensorData = {
        ultrasonic: 0,
        color: 0,
        light: 0,
        touch: false,
        history: []
    };
    
    // Funzioni private
    function addToHistory(data) {
        sensorData.history.push({
            timestamp: Date.now(),
            ...data
        });
        
        // Mantieni solo gli ultimi 100 valori
        if (sensorData.history.length > 100) {
            sensorData.history.shift();
        }
    }
    
    function smoothValue(newValue, oldValue, smoothing = 0.3) {
        return oldValue * (1 - smoothing) + newValue * smoothing;
    }
    
    // Interfaccia pubblica
    return {
        // Lettura sensori con smoothing
        readAll: function() {
            const ultrasonic = sensors.ultrasonic4.distance();
            const color = sensors.color3.color();
            const light = sensors.color3.light();
            const touch = sensors.touch1.isPressed();
            
            // Applica smoothing ai valori numerici
            sensorData.ultrasonic = smoothValue(ultrasonic, sensorData.ultrasonic);
            sensorData.light = smoothValue(light, sensorData.light);
            sensorData.color = color;
            sensorData.touch = touch;
            
            addToHistory({
                ultrasonic: sensorData.ultrasonic,
                color: sensorData.color,
                light: sensorData.light,
                touch: sensorData.touch
            });
            
            return { ...sensorData };
        },
        
        // Metodi specifici con condizioni intelligenti
        isObstacleDetected: function(threshold = RobotConfig.sensors.obstacleThreshold) {
            this.readAll();
            return sensorData.ultrasonic < threshold;
        },
        
        isOnLine: function(threshold = RobotConfig.sensors.lineThreshold) {
            this.readAll();
            return sensorData.light < threshold;
        },
        
        getColorName: function() {
            this.readAll();
            const colorNames = ['None', 'Nero', 'Blu', 'Verde', 'Giallo', 'Rosso', 'Bianco', 'Marrone'];
            return colorNames[sensorData.color] || 'Sconosciuto';
        },
        
        // Analisi trend
        getTrend: function(sensor, samples = 10) {
            const recentData = sensorData.history.slice(-samples);
            if (recentData.length < 2) return 'stabile';
            
            const first = recentData[0][sensor];
            const last = recentData[recentData.length - 1][sensor];
            const diff = last - first;
            
            if (Math.abs(diff) < 2) return 'stabile';
            return diff > 0 ? 'crescente' : 'decrescente';
        },
        
        // Statistiche
        getStats: function(sensor) {
            const values = sensorData.history.map(d => d[sensor]).filter(v => typeof v === 'number');
            if (values.length === 0) return null;
            
            const min = Math.min(...values);
            const max = Math.max(...values);
            const avg = values.reduce((a, b) => a + b, 0) / values.length;
            
            return { min, max, avg: Math.round(avg) };
        },
        
        // Display informazioni sensori
        displayInfo: function() {
            const data = this.readAll();
            brick.clearScreen();
            brick.showValue("Distanza", Math.round(data.ultrasonic), 1);
            brick.showValue("Luce", Math.round(data.light), 2);
            brick.showString("Colore: " + this.getColorName(), 3);
            brick.showString("Touch: " + (data.touch ? "SI" : "NO"), 4);
        }
    };
})();

// ==========================================
// SISTEMA COMPORTAMENTI AVANZATO
// ==========================================

const BehaviorSystem = (function() {
    let behaviors = new Map();
    let activeBehavior = null;
    let isRunning = false;
    
    // Classe base per i comportamenti
    function BaseBehavior(name, config = {}) {
        this.name = name;
        this.config = { ...RobotConfig, ...config };
        this.isActive = false;
        this.priority = config.priority || 1;
        this.startTime = 0;
    }
    
    BaseBehavior.prototype = {
        start: function() {
            this.isActive = true;
            this.startTime = Date.now();
            brick.showString(`Avvio: ${this.name}`, 1);
        },
        
        stop: function() {
            this.isActive = false;
            MotorController.emergencyStop();
            brick.showString(`Stop: ${this.name}`, 1);
        },
        
        execute: function() {
            throw new Error("Metodo execute deve essere implementato");
        },
        
        shouldContinue: function() {
            return this.isActive;
        }
    };
    
    // Interfaccia pubblica
    return {
        // Registra un nuovo comportamento
        register: function(name, behaviorClass, config = {}) {
            const behavior = new behaviorClass(name, config);
            behaviors.set(name, behavior);
            brick.showString(`Registrato: ${name}`, 3);
            return behavior;
        },
        
        // Avvia un comportamento
        start: function(behaviorName) {
            if (!behaviors.has(behaviorName)) {
                throw new Error(`Comportamento ${behaviorName} non trovato`);
            }
            
            this.stop(); // Ferma comportamento attuale
            
            activeBehavior = behaviors.get(behaviorName);
            activeBehavior.start();
            isRunning = true;
            
            // Loop di esecuzione
            while (activeBehavior && activeBehavior.shouldContinue() && isRunning) {
                try {
                    activeBehavior.execute();
                    pause(RobotConfig.timing.defaultPause);
                } catch (error) {
                    ErrorHandler.handle(error, `Comportamento ${behaviorName}`);
                    break;
                }
            }
            
            if (activeBehavior) {
                activeBehavior.stop();
            }
            isRunning = false;
        },
        
        // Ferma il comportamento attuale
        stop: function() {
            if (activeBehavior && activeBehavior.isActive) {
                activeBehavior.stop();
            }
            isRunning = false;
            activeBehavior = null;
        },
        
        // Lista comportamenti disponibili
        list: function() {
            return Array.from(behaviors.keys());
        },
        
        // Ottieni stato attuale
        getStatus: function() {
            return {
                running: isRunning,
                active: activeBehavior ? activeBehavior.name : null,
                available: this.list()
            };
        }
    };
})();

// ==========================================
// COMPORTAMENTI IMPLEMENTATI
// ==========================================

// Comportamento: Esplorazione
function ExplorationBehavior(name, config) {
    BaseBehavior.call(this, name, config);
    this.timeout = config.timeout || 30000; // 30 secondi default
}

ExplorationBehavior.prototype = Object.create(BaseBehavior.prototype);
ExplorationBehavior.prototype.execute = function() {
    const sensorData = SensorController.readAll();
    
    if (sensorData.touch) {
        // Touch premuto - ferma
        this.stop();
        return;
    }
    
    if (SensorController.isObstacleDetected(15)) {
        // Ostacolo vicino - gira
        MotorController.turnRight(45, 40);
        pause(300);
    } else {
        // Strada libera - avanza
        MotorController.startMoving(0, 40);
    }
};

ExplorationBehavior.prototype.shouldContinue = function() {
    const elapsed = Date.now() - this.startTime;
    return this.isActive && elapsed < this.timeout;
};

// Comportamento: Segui linea
function LineFollowBehavior(name, config) {
    BaseBehavior.call(this, name, config);
    this.threshold = config.lineThreshold || 50;
    this.speed = config.speed || 40;
}

LineFollowBehavior.prototype = Object.create(BaseBehavior.prototype);
LineFollowBehavior.prototype.execute = function() {
    const sensorData = SensorController.readAll();
    
    if (sensorData.touch) {
        this.stop();
        return;
    }
    
    if (SensorController.isOnLine(this.threshold)) {
        // Sulla linea - vai dritto
        MotorController.startMoving(0, this.speed);
    } else {
        // Fuori linea - correggi
        MotorController.startMoving(30, this.speed * 0.7);
    }
};

// ==========================================
// GESTIONE ERRORI E LOGGING
// ==========================================

const ErrorHandler = {
    errors: [],
    maxErrors: 50,
    
    handle: function(error, context = 'Unknown') {
        const errorInfo = {
            message: error.message || error.toString(),
            context: context,
            timestamp: Date.now(),
            stack: error.stack || 'No stack trace'
        };
        
        this.errors.push(errorInfo);
        
        // Mantieni solo gli ultimi N errori
        if (this.errors.length > this.maxErrors) {
            this.errors.shift();
        }
        
        this.display(errorInfo);
        this.logToConsole(errorInfo);
    },
    
    display: function(errorInfo) {
        brick.clearScreen();
        brick.showString("ERRORE!", 1);
        brick.showString(errorInfo.context.substring(0, 16), 2);
        brick.showString(errorInfo.message.substring(0, 16), 3);
        brick.showString("Touch per continuare", 5);
        
        // Suono di errore
        music.playTone(200, 300);
        pause(300);
        music.playTone(150, 300);
        
        // Aspetta input utente
        while (!sensors.touch1.isPressed()) {
            pause(100);
        }
        while (sensors.touch1.isPressed()) {
            pause(100);
        }
    },
    
    logToConsole: function(errorInfo) {
        console.log(`[ERROR ${new Date(errorInfo.timestamp).toISOString()}] ${errorInfo.context}: ${errorInfo.message}`);
    },
    
    getRecentErrors: function(count = 10) {
        return this.errors.slice(-count);
    },
    
    clearErrors: function() {
        this.errors = [];
        brick.showString("Log errori pulito", 1);
    }
};

// ==========================================
// SISTEMA MENU PRINCIPALE
// ==========================================

const MainMenu = {
    options: [
        { name: 'Esplorazione', action: () => this.startExploration() },
        { name: 'Segui Linea', action: () => this.startLineFollow() },
        { name: 'Test Sensori', action: () => this.testSensors() },
        { name: 'Calibrazione', action: () => this.calibrateRobot() },
        { name: 'Stato Sistema', action: () => this.showSystemStatus() }
    ],
    
    currentOption: 0,
    
    show: function() {
        brick.clearScreen();
        brick.showString("=== MENU ROBOT ===", 1);
        
        for (let i = 0; i < this.options.length; i++) {
            const prefix = (i === this.currentOption) ? "> " : "  ";
            const line = prefix + this.options[i].name;
            brick.showString(line, i + 2);
        }
        
        brick.showString("UP/DOWN: naviga", 7);
        brick.showString("ENTER: seleziona", 8);
    },
    
    navigate: function(direction) {
        if (direction === 'up') {
            this.currentOption = (this.currentOption - 1 + this.options.length) % this.options.length;
        } else if (direction === 'down') {
            this.currentOption = (this.currentOption + 1) % this.options.length;
        }
        this.show();
    },
    
    select: function() {
        const selected = this.options[this.currentOption];
        try {
            selected.action();
        } catch (error) {
            ErrorHandler.handle(error, `Menu: ${selected.name}`);
        }
        pause(1000);
        this.show();
    },
    
    // Azioni del menu
    startExploration: function() {
        BehaviorSystem.start('exploration');
    },
    
    startLineFollow: function() {
        BehaviorSystem.start('linefollow');
    },
    
    testSensors: function() {
        brick.showString("Test sensori...", 1);
        for (let i = 0; i < 50; i++) {
            SensorController.displayInfo();
            pause(200);
            if (sensors.touch1.isPressed()) break;
        }
    },
    
    calibrateRobot: function() {
        MotorController.calibrate();
    },
    
    showSystemStatus: function() {
        brick.clearScreen();
        const behaviorStatus = BehaviorSystem.getStatus();
        const motorStatus = MotorController.getStatus();
        
        brick.showString("=== STATO ===", 1);
        brick.showString(`Comportamento: ${behaviorStatus.active || 'Nessuno'}`, 2);
        brick.showString(`Motori: ${motorStatus.direction}`, 3);
        brick.showString(`Errori: ${ErrorHandler.errors.length}`, 4);
        
        pause(3000);
    }
};

// ==========================================
// INIZIALIZZAZIONE E AVVIO
// ==========================================

function initializeRobot() {
    brick.showString("Inizializzazione...", 1);
    
    // Registra comportamenti
    BehaviorSystem.register('exploration', ExplorationBehavior, { timeout: 30000 });
    BehaviorSystem.register('linefollow', LineFollowBehavior, { speed: 40, lineThreshold: 50 });
    
    // Configura gestori eventi
    brick.buttonUp.onEvent(ButtonEvent.Pressed, function() {
        MainMenu.navigate('up');
    });
    
    brick.buttonDown.onEvent(ButtonEvent.Pressed, function() {
        MainMenu.navigate('down');
    });
    
    brick.buttonEnter.onEvent(ButtonEvent.Pressed, function() {
        MainMenu.select();
    });
    
    brick.buttonEscape.onEvent(ButtonEvent.Pressed, function() {
        BehaviorSystem.stop();
        MainMenu.show();
    });
    
    // Test iniziale
    brick.showString("Test sistema...", 2);
    SensorController.readAll();
    
    brick.showString("Robot pronto!", 1);
    music.playTone(440, 200);
    pause(300);
    music.playTone(554, 200);
    
    // Mostra menu principale
    MainMenu.show();
}

// Avvia il sistema
initializeRobot();
