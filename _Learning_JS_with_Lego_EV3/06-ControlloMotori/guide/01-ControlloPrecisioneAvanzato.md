# Guida: Controllo di Precisione Avanzato per Motori EV3

## Introduzione
Il controllo di precisione è fondamentale per applicazioni robotiche che richiedono movimenti accurati. Questa guida esplora tecniche avanzate per ottenere il massimo controllo sui motori EV3.

## Principi del Controllo di Precisione

### 1. Comprensione della Meccanica
Prima di implementare controlli precisi, è essenziale comprendere le caratteristiche fisiche del sistema:

```javascript
// Configurazione parametri fisici del robot
const RobotPhysics = {
    // Dimensioni ruote e robot
    wheelDiameter: 5.6,     // cm - diametro ruote standard EV3
    wheelCircumference: 17.59, // cm - circonferenza ruota
    trackWidth: 12.0,        // cm - distanza tra ruote
    
    // Caratteristiche motori
    motorDegreePerRotation: 360,
    gearRatio: 1.0,          // rapporto ingranaggi (se presenti)
    
    // Fattori di correzione (da calibrare)
    distanceCorrection: 1.02, // correzione empirica distanza
    angleCorrection: 0.98,    // correzione empirica angoli
    
    // Inerzia e attrito
    stopDistance: 2.0,        // cm - distanza frenata
    accelerationTime: 200,    // ms - tempo accelerazione
    decelerationTime: 300     // ms - tempo decelerazione
};

// Funzioni di conversione precise
const Conversions = {
    cmToRotations: function(distance) {
        return (distance * RobotPhysics.distanceCorrection) / RobotPhysics.wheelCircumference;
    },
    
    rotationsToCm: function(rotations) {
        return (rotations * RobotPhysics.wheelCircumference) / RobotPhysics.distanceCorrection;
    },
    
    degreesToRotations: function(degrees) {
        const circumference = Math.PI * RobotPhysics.trackWidth;
        const wheelRotations = (degrees / 360) * (circumference / RobotPhysics.wheelCircumference);
        return wheelRotations * RobotPhysics.angleCorrection;
    },
    
    rotationsToDegrees: function(rotations) {
        const circumference = Math.PI * RobotPhysics.trackWidth;
        const robotCircumference = rotations * RobotPhysics.wheelCircumference;
        return (robotCircumference / circumference) * 360 / RobotPhysics.angleCorrection;
    }
};
```

### 2. Sistema di Controllo PID
Il controllo PID (Proportional-Integral-Derivative) è essenziale per movimenti precisi:

```javascript
// Controller PID per movimenti precisi
function PIDController(kp, ki, kd) {
    this.kp = kp || 0.5;  // Guadagno proporzionale
    this.ki = ki || 0.1;  // Guadagno integrale  
    this.kd = kd || 0.2;  // Guadagno derivativo
    
    this.previousError = 0;
    this.integral = 0;
    this.lastTime = 0;
}

PIDController.prototype = {
    calculate: function(setpoint, measured) {
        const currentTime = Date.now();
        const deltaTime = (currentTime - this.lastTime) / 1000; // secondi
        
        if (deltaTime === 0) return 0;
        
        const error = setpoint - measured;
        
        // Termine proporzionale
        const proportional = this.kp * error;
        
        // Termine integrale
        this.integral += error * deltaTime;
        const integral = this.ki * this.integral;
        
        // Termine derivativo
        const derivative = this.kd * (error - this.previousError) / deltaTime;
        
        // Output PID
        const output = proportional + integral + derivative;
        
        // Aggiorna valori per prossima iterazione
        this.previousError = error;
        this.lastTime = currentTime;
        
        // Limita output (-100 a 100)
        return Math.max(-100, Math.min(100, output));
    },
    
    reset: function() {
        this.previousError = 0;
        this.integral = 0;
        this.lastTime = Date.now();
    }
};

// Esempio uso PID per seguire linea
const lineFollowPID = new PIDController(0.8, 0.1, 0.3);

function followLineWithPID() {
    const targetLight = 50; // Valore target sensore luce
    const baseSpeed = 40;
    
    while (!sensors.touch1.isPressed()) {
        const currentLight = sensors.color3.light();
        const correction = lineFollowPID.calculate(targetLight, currentLight);
        
        // Applica correzione ai motori
        const leftSpeed = baseSpeed + correction;
        const rightSpeed = baseSpeed - correction;
        
        motors.largeB.run(leftSpeed);
        motors.largeC.run(rightSpeed);
        
        pause(50); // Frequenza controllo 20Hz
    }
    
    motors.largeBC.stop();
}
```

### 3. Profili di Movimento
I profili di movimento permettono accelerazioni e decelerazioni graduali:

```javascript
// Generatore profili di movimento
const MotionProfile = {
    // Profilo trapezoidale per movimento fluido
    trapezoidal: function(distance, maxSpeed, accelerationTime, decelerationTime) {
        const accelerationDistance = 0.3 * distance;
        const decelerationDistance = 0.3 * distance;
        const constantDistance = distance - accelerationDistance - decelerationDistance;
        
        return {
            phases: [
                {
                    type: 'acceleration',
                    distance: accelerationDistance,
                    startSpeed: 0,
                    endSpeed: maxSpeed,
                    duration: accelerationTime
                },
                {
                    type: 'constant',
                    distance: constantDistance,
                    startSpeed: maxSpeed,
                    endSpeed: maxSpeed,
                    duration: constantDistance / maxSpeed * 1000
                },
                {
                    type: 'deceleration',
                    distance: decelerationDistance,
                    startSpeed: maxSpeed,
                    endSpeed: 0,
                    duration: decelerationTime
                }
            ]
        };
    },
    
    // Profilo S-curve per movimento molto fluido
    sCurve: function(distance, maxSpeed) {
        const jerkTime = 200; // ms - tempo per raggiungere max accelerazione
        const totalTime = (distance / maxSpeed) * 2000; // tempo totale stimato
        
        return {
            totalTime: totalTime,
            jerkTime: jerkTime,
            maxSpeed: maxSpeed,
            
            getSpeedAtTime: function(t) {
                const ratio = t / this.totalTime;
                if (ratio < 0.25) {
                    // Accelerazione crescente
                    return this.maxSpeed * 4 * ratio * ratio;
                } else if (ratio < 0.5) {
                    // Accelerazione decrescente
                    return this.maxSpeed * (1 - 4 * (0.5 - ratio) * (0.5 - ratio));
                } else if (ratio < 0.75) {
                    // Decelerazione crescente
                    return this.maxSpeed * (1 - 4 * (ratio - 0.5) * (ratio - 0.5));
                } else {
                    // Decelerazione decrescente
                    return this.maxSpeed * 4 * (1 - ratio) * (1 - ratio);
                }
            }
        };
    }
};

// Implementazione movimento con profilo
function moveWithProfile(distance, maxSpeed, profileType = 'trapezoidal') {
    let profile;
    
    if (profileType === 'trapezoidal') {
        profile = MotionProfile.trapezoidal(distance, maxSpeed, 300, 400);
        executeTrapezoidal(profile);
    } else if (profileType === 'scurve') {
        profile = MotionProfile.sCurve(distance, maxSpeed);
        executeSCurve(profile);
    }
}

function executeTrapezoidal(profile) {
    for (let phase of profile.phases) {
        const steps = 20; // numero di step per fase
        const stepTime = phase.duration / steps;
        const stepDistance = phase.distance / steps;
        
        for (let i = 0; i < steps; i++) {
            const progress = i / steps;
            let currentSpeed;
            
            if (phase.type === 'acceleration') {
                currentSpeed = phase.startSpeed + (phase.endSpeed - phase.startSpeed) * progress;
            } else if (phase.type === 'constant') {
                currentSpeed = phase.startSpeed;
            } else { // deceleration
                currentSpeed = phase.startSpeed - (phase.startSpeed - phase.endSpeed) * progress;
            }
            
            const rotations = Conversions.cmToRotations(stepDistance);
            motors.largeBC.steer(0, currentSpeed, rotations, MoveUnit.Rotations);
            pause(stepTime);
        }
    }
}
```

### 4. Controllo di Posizione Assoluta
Sistema per tracciare e controllare la posizione assoluta del robot:

```javascript
// Sistema di odometria per tracking posizione
const Odometry = (function() {
    let position = { x: 0, y: 0, angle: 0 };
    let lastEncoderValues = { left: 0, right: 0 };
    
    function updatePosition() {
        // Leggi encoder (simulato con contatori rotazioni)
        const currentLeft = motors.largeB.angle();
        const currentRight = motors.largeC.angle();
        
        // Calcola differenza dalle ultime letture
        const deltaLeft = currentLeft - lastEncoderValues.left;
        const deltaRight = currentRight - lastEncoderValues.right;
        
        // Converti in distanze
        const leftDistance = (deltaLeft / 360) * RobotPhysics.wheelCircumference;
        const rightDistance = (deltaRight / 360) * RobotPhysics.wheelCircumference;
        
        // Calcola movimento del centro robot
        const deltaDistance = (leftDistance + rightDistance) / 2;
        const deltaAngle = (rightDistance - leftDistance) / RobotPhysics.trackWidth;
        
        // Aggiorna posizione
        position.x += deltaDistance * Math.cos(position.angle + deltaAngle / 2);
        position.y += deltaDistance * Math.sin(position.angle + deltaAngle / 2);
        position.angle += deltaAngle;
        
        // Normalizza angolo
        position.angle = position.angle % (2 * Math.PI);
        
        // Aggiorna valori encoder
        lastEncoderValues.left = currentLeft;
        lastEncoderValues.right = currentRight;
    }
    
    return {
        getPosition: function() {
            updatePosition();
            return {
                x: position.x,
                y: position.y,
                angle: position.angle * 180 / Math.PI // ritorna in gradi
            };
        },
        
        reset: function(x = 0, y = 0, angle = 0) {
            position = { x: x, y: y, angle: angle * Math.PI / 180 };
            lastEncoderValues = {
                left: motors.largeB.angle(),
                right: motors.largeC.angle()
            };
        },
        
        distanceTo: function(targetX, targetY) {
            updatePosition();
            const dx = targetX - position.x;
            const dy = targetY - position.y;
            return Math.sqrt(dx * dx + dy * dy);
        },
        
        angleTo: function(targetX, targetY) {
            updatePosition();
            const dx = targetX - position.x;
            const dy = targetY - position.y;
            let targetAngle = Math.atan2(dy, dx) * 180 / Math.PI;
            let angleDiff = targetAngle - position.angle * 180 / Math.PI;
            
            // Normalizza differenza angolo (-180 a 180)
            while (angleDiff > 180) angleDiff -= 360;
            while (angleDiff < -180) angleDiff += 360;
            
            return angleDiff;
        }
    };
})();

// Navigazione punto-a-punto con controllo posizione
function goToPoint(targetX, targetY, tolerance = 2.0) {
    const positionPID = new PIDController(0.8, 0.1, 0.2);
    const anglePID = new PIDController(1.0, 0.05, 0.3);
    
    while (Odometry.distanceTo(targetX, targetY) > tolerance) {
        const currentPos = Odometry.getPosition();
        const distance = Odometry.distanceTo(targetX, targetY);
        const angleError = Odometry.angleTo(targetX, targetY);
        
        // Controllo angolo prima del movimento
        if (Math.abs(angleError) > 5) {
            const angleCorrection = anglePID.calculate(0, angleError);
            motors.largeBC.steer(angleCorrection, 20);
        } else {
            // Movimento verso target
            const speedCorrection = positionPID.calculate(0, distance);
            const baseSpeed = Math.min(50, distance * 3); // velocità proporzionale
            
            motors.largeBC.steer(0, baseSpeed);
        }
        
        // Display informazioni
        brick.showValue("Dist", Math.round(distance), 1);
        brick.showValue("Angle", Math.round(angleError), 2);
        brick.showValue("X", Math.round(currentPos.x), 3);
        brick.showValue("Y", Math.round(currentPos.y), 4);
        
        pause(100);
    }
    
    motors.largeBC.stop();
    brick.showString("Target raggiunto!", 5);
}
```

### 5. Calibrazione Automatica
Sistema automatico per calibrare i parametri del robot:

```javascript
// Sistema di calibrazione automatica
const Calibration = {
    // Calibra fattore di correzione distanza
    calibrateDistance: function(targetDistance = 100) {
        brick.showString("Calibrazione distanza", 1);
        brick.showString(`Target: ${targetDistance}cm`, 2);
        brick.showString("Premi ENTER", 3);
        
        // Aspetta conferma
        while (!sensors.touch1.isPressed()) pause(100);
        while (sensors.touch1.isPressed()) pause(100);
        
        // Esegui movimento
        Odometry.reset();
        const rotations = Conversions.cmToRotations(targetDistance);
        motors.largeBC.steer(0, 30, rotations, MoveUnit.Rotations);
        
        // Chiedi misurazione reale
        brick.clearScreen();
        brick.showString("Misura distanza reale", 1);
        brick.showString("UP: +1cm DOWN: -1cm", 2);
        brick.showString("ENTER: conferma", 3);
        
        let measuredDistance = targetDistance;
        brick.showValue("Misurato", measuredDistance, 4);
        
        // Input utente per misurazione
        brick.buttonUp.onEvent(ButtonEvent.Pressed, function() {
            measuredDistance++;
            brick.showValue("Misurato", measuredDistance, 4);
        });
        
        brick.buttonDown.onEvent(ButtonEvent.Pressed, function() {
            measuredDistance--;
            brick.showValue("Misurato", measuredDistance, 4);
        });
        
        while (!sensors.touch1.isPressed()) pause(100);
        
        // Calcola fattore correzione
        const correctionFactor = targetDistance / measuredDistance;
        RobotPhysics.distanceCorrection = correctionFactor;
        
        brick.showString("Calibrazione completata", 1);
        brick.showValue("Fattore", Math.round(correctionFactor * 100) / 100, 2);
        
        return correctionFactor;
    },
    
    // Calibra rotazioni
    calibrateRotation: function(targetAngle = 360) {
        brick.showString("Calibrazione rotazione", 1);
        brick.showString(`Target: ${targetAngle}°`, 2);
        
        while (!sensors.touch1.isPressed()) pause(100);
        while (sensors.touch1.isPressed()) pause(100);
        
        // Esegui rotazione
        const rotations = Conversions.degreesToRotations(targetAngle);
        motors.largeBC.steer(100, 30, rotations, MoveUnit.Rotations);
        
        // Input misurazione (simile a calibrateDistance)
        // ... implementazione analoga ...
        
        return RobotPhysics.angleCorrection;
    },
    
    // Test precisione dopo calibrazione
    testPrecision: function() {
        brick.showString("Test precisione", 1);
        
        const tests = [
            { type: 'forward', distance: 50 },
            { type: 'backward', distance: 30 },
            { type: 'turn', angle: 90 },
            { type: 'turn', angle: -90 }
        ];
        
        for (let i = 0; i < tests.length; i++) {
            const test = tests[i];
            brick.showString(`Test ${i + 1}/${tests.length}`, 2);
            
            if (test.type === 'forward') {
                const rotations = Conversions.cmToRotations(test.distance);
                motors.largeBC.steer(0, 30, rotations, MoveUnit.Rotations);
            } else if (test.type === 'backward') {
                const rotations = Conversions.cmToRotations(test.distance);
                motors.largeBC.steer(0, -30, rotations, MoveUnit.Rotations);
            } else if (test.type === 'turn') {
                const rotations = Conversions.degreesToRotations(Math.abs(test.angle));
                const steer = test.angle > 0 ? 100 : -100;
                motors.largeBC.steer(steer, 30, rotations, MoveUnit.Rotations);
            }
            
            pause(1000);
        }
        
        brick.showString("Test completato", 1);
    }
};
```

## Best Practices per il Controllo di Precisione

### 1. Gestione dell'Inerzia
```javascript
// Compensazione inerzia nei movimenti
function moveWithInertiaCompensation(distance, speed) {
    const stopDistance = RobotPhysics.stopDistance;
    
    if (distance > stopDistance * 2) {
        // Movimento normale con compensazione
        const adjustedDistance = distance - stopDistance;
        const rotations = Conversions.cmToRotations(adjustedDistance);
        motors.largeBC.steer(0, speed, rotations, MoveUnit.Rotations);
    } else {
        // Movimento corto con velocità ridotta
        const adjustedSpeed = speed * (distance / (stopDistance * 2));
        const rotations = Conversions.cmToRotations(distance);
        motors.largeBC.steer(0, adjustedSpeed, rotations, MoveUnit.Rotations);
    }
}
```

### 2. Controllo Temperatura Motori
```javascript
// Monitoraggio temperature motori (se disponibile)
function checkMotorHealth() {
    // Simulazione controllo salute motori
    const motorLoad = {
        left: Math.random() * 100,
        right: Math.random() * 100
    };
    
    if (motorLoad.left > 80 || motorLoad.right > 80) {
        brick.showString("ATTENZIONE: Carico alto", 1);
        music.playTone(200, 500);
        return false;
    }
    
    return true;
}
```

### 3. Adaptive Control
```javascript
// Controllo adattivo basato su condizioni
const AdaptiveControl = {
    surfaceType: 'normal', // 'slippery', 'rough', 'normal'
    
    adjustParametersForSurface: function(surface) {
        this.surfaceType = surface;
        
        switch(surface) {
            case 'slippery':
                RobotPhysics.distanceCorrection *= 0.95;
                RobotPhysics.angleCorrection *= 0.93;
                break;
            case 'rough':
                RobotPhysics.distanceCorrection *= 1.05;
                RobotPhysics.angleCorrection *= 1.07;
                break;
            default:
                // parametri normali
                break;
        }
    },
    
    detectSurface: function() {
        // Algoritmo semplice di rilevamento superficie
        const testDistance = 10;
        const expectedTime = 1000;
        
        const startTime = Date.now();
        const rotations = Conversions.cmToRotations(testDistance);
        motors.largeBC.steer(0, 30, rotations, MoveUnit.Rotations);
        const actualTime = Date.now() - startTime;
        
        if (actualTime > expectedTime * 1.2) {
            return 'rough';
        } else if (actualTime < expectedTime * 0.8) {
            return 'slippery';
        } else {
            return 'normal';
        }
    }
};
```

## Conclusioni
Il controllo di precisione richiede:
- Comprensione della fisica del sistema
- Implementazione di algoritmi di controllo appropriati
- Calibrazione accurata dei parametri
- Monitoraggio continuo delle prestazioni
- Adattamento alle condizioni operative

L'investimento in un sistema di controllo preciso ripaga enormemente in termini di affidabilità e prestazioni del robot.

---
[⬅️ Torna alle Guide](./README.md) | [🏠 Torna al Modulo](../README.md)
