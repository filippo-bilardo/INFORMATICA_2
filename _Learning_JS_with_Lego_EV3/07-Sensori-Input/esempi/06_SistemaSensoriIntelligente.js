/**
 * File: 06_SistemaSensoriIntelligente.js
 * Descrizione: Sistema avanzato di gestione sensori con AI, fusione dati e predizioni
 * Corso: Learning JavaScript by Lego EV3 Example
 */

// ==========================================
// CONFIGURAZIONE SISTEMA SENSORI
// ==========================================

const SensorConfig = {
    // Configurazioni sensori
    ultrasonic: {
        port: 4,
        maxRange: 255,
        minRange: 1,
        precision: 1,
        samplingRate: 20,    // Hz
        filterStrength: 0.3
    },
    
    color: {
        port: 3,
        calibration: {
            black: 8,
            white: 85,
            ambient: 45
        },
        colorMap: ['None', 'Nero', 'Blu', 'Verde', 'Giallo', 'Rosso', 'Bianco', 'Marrone']
    },
    
    touch: {
        port: 1,
        debounceTime: 50,    // ms
        longPressTime: 1000  // ms
    },
    
    // Configurazioni fusione sensori
    fusion: {
        confidence: {
            ultrasonic: 0.8,
            color: 0.9,
            touch: 1.0
        },
        updateRate: 50,      // ms
        historySize: 100
    }
};

// ==========================================
// SISTEMA FILTRI AVANZATI
// ==========================================

const SensorFilters = {
    // Filtro passa-basso per dati rumorosi
    lowPass: function(newValue, oldValue, alpha = 0.3) {
        return oldValue + alpha * (newValue - oldValue);
    },
    
    // Filtro mediano per eliminare outlier
    median: function(values) {
        const sorted = values.slice().sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    },
    
    // Filtro Kalman semplificato
    kalman: function(measurement, estimate, uncertainty, measurementUncertainty) {
        const kalmanGain = uncertainty / (uncertainty + measurementUncertainty);
        const newEstimate = estimate + kalmanGain * (measurement - estimate);
        const newUncertainty = (1 - kalmanGain) * uncertainty;
        
        return {
            estimate: newEstimate,
            uncertainty: newUncertainty
        };
    },
    
    // Rilevatore di outlier
    outlierDetector: function(value, history, threshold = 2.0) {
        if (history.length < 3) return false;
        
        const mean = history.reduce((a, b) => a + b, 0) / history.length;
        const variance = history.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / history.length;
        const stdDev = Math.sqrt(variance);
        
        return Math.abs(value - mean) > threshold * stdDev;
    }
};

// ==========================================
// MANAGER SENSORI AVANZATO
// ==========================================

const SensorManager = (function() {
    let sensors = {
        ultrasonic: {
            raw: 0,
            filtered: 0,
            history: [],
            kalman: { estimate: 0, uncertainty: 1 },
            trend: 'stable',
            confidence: 1.0,
            lastUpdate: 0
        },
        
        color: {
            raw: { color: 0, light: 0, rgb: [0, 0, 0] },
            processed: { color: 0, light: 0, normalized: 0 },
            history: [],
            dominantColor: 'None',
            confidence: 1.0,
            lastUpdate: 0
        },
        
        touch: {
            raw: false,
            processed: { pressed: false, longPress: false, clicks: 0 },
            history: [],
            pressStartTime: 0,
            lastReleaseTime: 0,
            clickCount: 0,
            confidence: 1.0
        }
    };
    
    let fusedData = {
        environmentType: 'unknown',
        obstacles: [],
        surfaceType: 'unknown',
        robotState: 'idle',
        confidence: 0.0
    };
    
    let isRunning = false;
    
    // Lettura sensore ultrasuoni con filtri avanzati
    function readUltrasonic() {
        const raw = sensors.ultrasonic4.distance();
        const sensorData = sensors.ultrasonic;
        
        // Controllo validità
        if (raw < SensorConfig.ultrasonic.minRange || raw > SensorConfig.ultrasonic.maxRange) {
            sensorData.confidence = 0.1;
            return sensorData.filtered; // Ritorna ultimo valore valido
        }
        
        // Rilevamento outlier
        if (SensorFilters.outlierDetector(raw, sensorData.history.slice(-10))) {
            sensorData.confidence = 0.5;
            return sensorData.filtered; // Ignora outlier
        }
        
        // Filtro Kalman
        const kalmanResult = SensorFilters.kalman(
            raw, 
            sensorData.kalman.estimate, 
            sensorData.kalman.uncertainty, 
            2.0
        );
        sensorData.kalman = kalmanResult;
        
        // Filtro passa-basso
        sensorData.filtered = SensorFilters.lowPass(
            kalmanResult.estimate, 
            sensorData.filtered, 
            SensorConfig.ultrasonic.filterStrength
        );
        
        // Aggiorna storia
        sensorData.history.push(raw);
        if (sensorData.history.length > SensorConfig.fusion.historySize) {
            sensorData.history.shift();
        }
        
        // Calcola trend
        if (sensorData.history.length >= 5) {
            const recent = sensorData.history.slice(-5);
            const oldValue = recent[0];
            const newValue = recent[recent.length - 1];
            const diff = newValue - oldValue;
            
            if (Math.abs(diff) < 2) sensorData.trend = 'stable';
            else if (diff > 0) sensorData.trend = 'increasing';
            else sensorData.trend = 'decreasing';
        }
        
        sensorData.raw = raw;
        sensorData.confidence = 0.9;
        sensorData.lastUpdate = Date.now();
        
        return sensorData.filtered;
    }
    
    // Lettura sensore colore con analisi avanzata
    function readColor() {
        const sensorData = sensors.color;
        
        // Letture multiple per stabilità
        const readings = [];
        for (let i = 0; i < 3; i++) {
            readings.push({
                color: sensors.color3.color(),
                light: sensors.color3.light()
            });
            pause(10);
        }
        
        // Usa valore mediano
        const colors = readings.map(r => r.color);
        const lights = readings.map(r => r.light);
        
        sensorData.raw = {
            color: SensorFilters.median(colors),
            light: SensorFilters.median(lights)
        };
        
        // Normalizzazione luce (0-100)
        const lightNormalized = Math.max(0, Math.min(100, 
            (sensorData.raw.light - SensorConfig.color.calibration.black) / 
            (SensorConfig.color.calibration.white - SensorConfig.color.calibration.black) * 100
        ));
        
        sensorData.processed = {
            color: sensorData.raw.color,
            light: sensorData.raw.light,
            normalized: lightNormalized
        };
        
        // Analisi colore dominante con confidenza
        const colorName = SensorConfig.color.colorMap[sensorData.raw.color] || 'Sconosciuto';
        
        // Calcola confidenza basata su stabilità
        sensorData.history.push(sensorData.raw.color);
        if (sensorData.history.length > 10) {
            sensorData.history.shift();
        }
        
        if (sensorData.history.length >= 5) {
            const recentColors = sensorData.history.slice(-5);
            const stability = recentColors.filter(c => c === sensorData.raw.color).length / 5;
            sensorData.confidence = stability;
        } else {
            sensorData.confidence = 0.5;
        }
        
        sensorData.dominantColor = colorName;
        sensorData.lastUpdate = Date.now();
        
        return sensorData.processed;
    }
    
    // Lettura sensore touch con gestione eventi
    function readTouch() {
        const raw = sensors.touch1.isPressed();
        const sensorData = sensors.touch;
        const currentTime = Date.now();
        
        sensorData.raw = raw;
        
        // Gestione pressione
        if (raw && !sensorData.processed.pressed) {
            // Inizio pressione
            sensorData.pressStartTime = currentTime;
            sensorData.processed.pressed = true;
            
        } else if (!raw && sensorData.processed.pressed) {
            // Fine pressione
            const pressDuration = currentTime - sensorData.pressStartTime;
            sensorData.processed.pressed = false;
            sensorData.lastReleaseTime = currentTime;
            
            // Classifica tipo di pressione
            if (pressDuration >= SensorConfig.touch.longPressTime) {
                sensorData.processed.longPress = true;
                setTimeout(() => { sensorData.processed.longPress = false; }, 100);
            } else {
                // Click normale - conta click multipli
                if (currentTime - sensorData.lastReleaseTime < 500) {
                    sensorData.clickCount++;
                } else {
                    sensorData.clickCount = 1;
                }
                
                sensorData.processed.clicks = sensorData.clickCount;
                
                // Reset contatore dopo 1 secondo
                setTimeout(() => { 
                    sensorData.processed.clicks = 0;
                    sensorData.clickCount = 0;
                }, 1000);
            }
        }
        
        sensorData.confidence = 1.0; // Touch è sempre affidabile
        return sensorData.processed;
    }
    
    // Fusione dati sensori per analisi ambientale
    function fuseSensorData() {
        const ultrasonicData = readUltrasonic();
        const colorData = readColor();
        const touchData = readTouch();
        
        // Analisi tipo ambiente
        let environmentType = 'open';
        let confidence = 0;
        
        // Rilevamento ostacoli
        fusedData.obstacles = [];
        if (ultrasonicData < 30) {
            fusedData.obstacles.push({
                distance: ultrasonicData,
                confidence: sensors.ultrasonic.confidence,
                type: 'close'
            });
            environmentType = 'cluttered';
            confidence += 0.3;
        }
        
        // Analisi superficie
        let surfaceType = 'unknown';
        if (colorData.normalized < 20) {
            surfaceType = 'dark';
            confidence += 0.2;
        } else if (colorData.normalized > 70) {
            surfaceType = 'light';
            confidence += 0.2;
        } else {
            surfaceType = 'medium';
            confidence += 0.1;
        }
        
        // Stato robot basato su sensori
        let robotState = 'idle';
        if (touchData.pressed) {
            robotState = 'user_interaction';
            confidence += 0.4;
        } else if (fusedData.obstacles.length > 0) {
            robotState = 'obstacle_detected';
            confidence += 0.3;
        } else {
            robotState = 'free_space';
            confidence += 0.2;
        }
        
        // Aggiorna dati fusi
        fusedData.environmentType = environmentType;
        fusedData.surfaceType = surfaceType;
        fusedData.robotState = robotState;
        fusedData.confidence = Math.min(1.0, confidence);
        
        return fusedData;
    }
    
    // Predizioni basate su trend
    function predictSensorValues(horizon = 1000) { // ms nel futuro
        const predictions = {};
        
        // Predizione ultrasuoni basata su trend
        if (sensors.ultrasonic.history.length >= 3) {
            const recent = sensors.ultrasonic.history.slice(-3);
            const trend = (recent[2] - recent[0]) / 2; // variazione media
            predictions.ultrasonic = {
                value: sensors.ultrasonic.filtered + trend * (horizon / 1000),
                confidence: sensors.ultrasonic.confidence * 0.8 // ridotta per predizione
            };
        }
        
        // Predizione colore (più stabile, meno predittivo)
        predictions.color = {
            value: sensors.color.processed,
            confidence: sensors.color.confidence * 0.9
        };
        
        return predictions;
    }
    
    // Interfaccia pubblica
    return {
        start: function() {
            isRunning = true;
            brick.showString("Sensori attivi", 1);
            
            // Loop principale sensori
            control.runInParallel(function() {
                while (isRunning) {
                    fuseSensorData();
                    pause(SensorConfig.fusion.updateRate);
                }
            });
        },
        
        stop: function() {
            isRunning = false;
            brick.showString("Sensori fermati", 1);
        },
        
        // Getters per dati elaborati
        getUltrasonic: function() {
            return {
                distance: Math.round(sensors.ultrasonic.filtered * 10) / 10,
                trend: sensors.ultrasonic.trend,
                confidence: sensors.ultrasonic.confidence
            };
        },
        
        getColor: function() {
            return {
                color: sensors.color.dominantColor,
                light: sensors.color.processed.light,
                normalized: Math.round(sensors.color.processed.normalized),
                confidence: sensors.color.confidence
            };
        },
        
        getTouch: function() {
            return sensors.touch.processed;
        },
        
        getFusedData: function() {
            return { ...fusedData };
        },
        
        // Funzioni di analisi
        isObstacleDetected: function(threshold = 20) {
            const data = this.getUltrasonic();
            return data.distance < threshold && data.confidence > 0.7;
        },
        
        isOnLine: function(threshold = 30) {
            const data = this.getColor();
            return data.normalized < threshold && data.confidence > 0.8;
        },
        
        getEnvironmentAssessment: function() {
            const assessment = {
                safety: 'safe',
                navigation: 'clear',
                interaction: 'none'
            };
            
            if (fusedData.obstacles.length > 0) {
                assessment.safety = 'caution';
                assessment.navigation = 'blocked';
            }
            
            if (sensors.touch.processed.pressed) {
                assessment.interaction = 'active';
            }
            
            assessment.confidence = fusedData.confidence;
            return assessment;
        },
        
        // Predizioni
        predict: predictSensorValues,
        
        // Calibrazione
        calibrateColorSensor: function() {
            brick.showString("Calibra colore", 1);
            
            // Calibra nero
            brick.showString("Posiziona su NERO", 2);
            brick.showString("Premi ENTER", 3);
            while (!sensors.touch1.isPressed()) pause(100);
            while (sensors.touch1.isPressed()) pause(100);
            
            const blackValue = sensors.color3.light();
            SensorConfig.color.calibration.black = blackValue;
            brick.showValue("Nero", blackValue, 4);
            pause(1000);
            
            // Calibra bianco
            brick.showString("Posiziona su BIANCO", 2);
            brick.showString("Premi ENTER", 3);
            while (!sensors.touch1.isPressed()) pause(100);
            while (sensors.touch1.isPressed()) pause(100);
            
            const whiteValue = sensors.color3.light();
            SensorConfig.color.calibration.white = whiteValue;
            brick.showValue("Bianco", whiteValue, 5);
            
            brick.showString("Calibrazione OK", 1);
            pause(2000);
        },
        
        // Diagnostica
        runDiagnostics: function() {
            brick.clearScreen();
            brick.showString("=== DIAGNOSTICA ===", 1);
            
            // Test ultrasuoni
            const ultraTest = [];
            for (let i = 0; i < 10; i++) {
                ultraTest.push(sensors.ultrasonic4.distance());
                pause(100);
            }
            
            const ultraVariance = ultraTest.reduce((acc, val) => {
                const mean = ultraTest.reduce((a, b) => a + b) / ultraTest.length;
                return acc + Math.pow(val - mean, 2);
            }, 0) / ultraTest.length;
            
            brick.showValue("Ultra Var", Math.round(ultraVariance), 2);
            
            // Test colore
            const colorTest = [];
            for (let i = 0; i < 10; i++) {
                colorTest.push(sensors.color3.light());
                pause(100);
            }
            
            const colorVariance = colorTest.reduce((acc, val) => {
                const mean = colorTest.reduce((a, b) => a + b) / colorTest.length;
                return acc + Math.pow(val - mean, 2);
            }, 0) / colorTest.length;
            
            brick.showValue("Color Var", Math.round(colorVariance), 3);
            
            // Risultato
            const overallHealth = (ultraVariance < 10 && colorVariance < 10) ? "OK" : "WARN";
            brick.showString("Stato: " + overallHealth, 5);
            
            pause(3000);
        },
        
        // Display real-time
        displayLiveData: function() {
            if (!isRunning) return;
            
            const ultra = this.getUltrasonic();
            const color = this.getColor();
            const touch = this.getTouch();
            const fused = this.getFusedData();
            
            brick.clearScreen();
            brick.showValue("Dist", ultra.distance, 1);
            brick.showValue("Luce", color.light, 2);
            brick.showString("Col: " + color.color.substring(0, 8), 3);
            brick.showString("Touch: " + (touch.pressed ? "SI" : "NO"), 4);
            brick.showString("Amb: " + fused.environmentType, 5);
            brick.showValue("Conf", Math.round(fused.confidence * 100), 6);
        }
    };
})();

// ==========================================
// SISTEMA COMPORTAMENTI REATTIVI
// ==========================================

const ReactiveBehaviors = {
    // Comportamento: Evita ostacoli intelligente
    intelligentObstacleAvoidance: function() {
        SensorManager.start();
        
        while (!sensors.touch1.isPressed()) {
            const environment = SensorManager.getEnvironmentAssessment();
            const ultrasonic = SensorManager.getUltrasonic();
            const predictions = SensorManager.predict(500);
            
            if (environment.navigation === 'blocked') {
                // Strategia di evasione basata su predizioni
                if (predictions.ultrasonic && predictions.ultrasonic.value < 15) {
                    // Ostacolo si avvicina rapidamente
                    motors.largeBC.steer(100, 40); // Svolta rapida
                    pause(300);
                } else {
                    // Ostacolo statico o lento
                    motors.largeBC.steer(60, 25); // Svolta graduale
                    pause(200);
                }
            } else {
                // Strada libera
                motors.largeBC.steer(0, 50);
            }
            
            SensorManager.displayLiveData();
            pause(100);
        }
        
        motors.largeBC.stop();
        SensorManager.stop();
    },
    
    // Comportamento: Segui linea adattivo
    adaptiveLineFollowing: function() {
        SensorManager.start();
        
        // Calibrazione automatica durante movimento
        let lineThreshold = 30;
        let adaptationCounter = 0;
        
        while (!sensors.touch1.isPressed()) {
            const color = SensorManager.getColor();
            
            // Adattamento soglia ogni 100 iterazioni
            if (adaptationCounter % 100 === 0 && color.confidence > 0.8) {
                // Aggiusta soglia basata su condizioni
                if (color.normalized < 10) {
                    lineThreshold = Math.max(15, lineThreshold - 2);
                } else if (color.normalized > 50) {
                    lineThreshold = Math.min(50, lineThreshold + 2);
                }
            }
            
            // Controllo linea con PID adattivo
            const onLine = color.normalized < lineThreshold;
            const error = lineThreshold - color.normalized;
            
            if (onLine) {
                motors.largeBC.steer(0, 40); // Dritto
            } else {
                const correction = Math.min(80, Math.abs(error) * 2);
                motors.largeBC.steer(correction, 30); // Correggi
            }
            
            // Display info
            brick.showValue("Soglia", lineThreshold, 1);
            brick.showValue("Valore", color.normalized, 2);
            brick.showString("Linea: " + (onLine ? "SI" : "NO"), 3);
            brick.showValue("Conf", Math.round(color.confidence * 100), 4);
            
            adaptationCounter++;
            pause(50);
        }
        
        motors.largeBC.stop();
        SensorManager.stop();
    },
    
    // Comportamento: Esplorazione intelligente
    intelligentExploration: function() {
        SensorManager.start();
        
        let explorationState = 'forward';
        let stateTimer = Date.now();
        const exploreTime = 30000; // 30 secondi
        
        while (Date.now() - stateTimer < exploreTime && !sensors.touch1.isPressed()) {
            const environment = SensorManager.getEnvironmentAssessment();
            const fused = SensorManager.getFusedData();
            
            switch (explorationState) {
                case 'forward':
                    if (environment.navigation === 'blocked') {
                        explorationState = 'turn';
                    } else {
                        motors.largeBC.steer(0, 45);
                    }
                    break;
                    
                case 'turn':
                    motors.largeBC.steer(80, 30);
                    pause(500);
                    if (environment.navigation === 'clear') {
                        explorationState = 'forward';
                    }
                    break;
            }
            
            // Display stato esplorazione
            brick.showString("Stato: " + explorationState, 1);
            brick.showString("Amb: " + fused.environmentType, 2);
            brick.showString("Sup: " + fused.surfaceType, 3);
            brick.showValue("Conf", Math.round(fused.confidence * 100), 4);
            
            const elapsed = Math.round((Date.now() - stateTimer) / 1000);
            brick.showValue("Tempo", elapsed, 5);
            
            pause(100);
        }
        
        motors.largeBC.stop();
        SensorManager.stop();
        brick.showString("Esplorazione completata", 1);
    }
};

// ==========================================
// INTERFACCIA UTENTE SENSORI
// ==========================================

const SensorUI = {
    showMainMenu: function() {
        brick.clearScreen();
        brick.showString("=== SENSORI AI ===", 1);
        brick.showString("UP: Live Data", 2);
        brick.showString("DOWN: Evita Ostacoli", 3);
        brick.showString("LEFT: Segui Linea", 4);
        brick.showString("RIGHT: Esplorazione", 5);
        brick.showString("ENTER: Calibrazione", 6);
        brick.showString("ESC: Diagnostica", 7);
    },
    
    liveDataMode: function() {
        SensorManager.start();
        
        brick.showString("DATI LIVE", 1);
        brick.showString("Touch per uscire", 8);
        
        while (!sensors.touch1.isPressed()) {
            SensorManager.displayLiveData();
            pause(200);
        }
        
        SensorManager.stop();
    }
};

// ==========================================
// PROGRAMMA PRINCIPALE
// ==========================================

function initSensorSystem() {
    brick.showString("Init Sensori AI...", 1);
    
    // Setup eventi
    brick.buttonUp.onEvent(ButtonEvent.Pressed, function() {
        SensorUI.liveDataMode();
        SensorUI.showMainMenu();
    });
    
    brick.buttonDown.onEvent(ButtonEvent.Pressed, function() {
        ReactiveBehaviors.intelligentObstacleAvoidance();
        SensorUI.showMainMenu();
    });
    
    brick.buttonLeft.onEvent(ButtonEvent.Pressed, function() {
        ReactiveBehaviors.adaptiveLineFollowing();
        SensorUI.showMainMenu();
    });
    
    brick.buttonRight.onEvent(ButtonEvent.Pressed, function() {
        ReactiveBehaviors.intelligentExploration();
        SensorUI.showMainMenu();
    });
    
    brick.buttonEnter.onEvent(ButtonEvent.Pressed, function() {
        SensorManager.calibrateColorSensor();
        SensorUI.showMainMenu();
    });
    
    brick.buttonEscape.onEvent(ButtonEvent.Pressed, function() {
        SensorManager.runDiagnostics();
        SensorUI.showMainMenu();
    });
    
    // Test iniziale
    brick.showString("Test sensori...", 2);
    pause(500);
    
    brick.showString("Sistema pronto!", 1);
    music.playTone(523, 150); // Do
    pause(150);
    music.playTone(659, 150); // Mi
    pause(150);
    music.playTone(784, 150); // Sol
    
    SensorUI.showMainMenu();
}

// Avvia il sistema
initSensorSystem();
