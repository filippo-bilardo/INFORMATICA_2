/**
 * File: 05_SistemaNavigazioneAvanzato.js
 * Descrizione: Sistema completo di navigazione con controllo di precisione, odometria e pathfinding
 * Corso: Learning JavaScript by Lego EV3 Example
 */

// ==========================================
// CONFIGURAZIONE SISTEMA
// ==========================================

const NavigationConfig = {
    // Parametri fisici robot
    physics: {
        wheelDiameter: 5.6,           // cm
        wheelCircumference: 17.59,    // cm
        trackWidth: 11.8,             // cm
        distanceCorrection: 1.02,     // fattore correzione empirico
        angleCorrection: 0.98         // fattore correzione rotazioni
    },
    
    // Parametri controllo
    control: {
        defaultSpeed: 40,
        turnSpeed: 25,
        precision: 1.5,               // cm - tolleranza posizionamento
        anglePrecision: 3,            // gradi - tolleranza angolare
        maxSpeed: 80,
        minSpeed: 15
    },
    
    // Parametri PID
    pid: {
        position: { kp: 0.8, ki: 0.1, kd: 0.2 },
        angle: { kp: 1.2, ki: 0.05, kd: 0.3 },
        line: { kp: 0.6, ki: 0.08, kd: 0.25 }
    }
};

// ==========================================
// SISTEMA ODOMETRIA AVANZATO
// ==========================================

const Odometry = (function() {
    let state = {
        position: { x: 0, y: 0, angle: 0 },  // posizione in cm e radianti
        velocity: { linear: 0, angular: 0 },  // velocità cm/s e rad/s
        lastUpdate: Date.now(),
        encoders: { left: 0, right: 0, lastLeft: 0, lastRight: 0 },
        trajectory: []  // storia delle posizioni
    };
    
    // Funzioni di conversione
    function degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }
    
    function radiansToDegrees(radians) {
        return radians * 180 / Math.PI;
    }
    
    function encoderToDistance(encoderDelta) {
        return (encoderDelta / 360) * NavigationConfig.physics.wheelCircumference;
    }
    
    // Aggiornamento odometria
    function updateOdometry() {
        const currentTime = Date.now();
        const deltaTime = (currentTime - state.lastUpdate) / 1000; // secondi
        
        // Lettura encoder (simulata)
        state.encoders.left = motors.largeB.angle();
        state.encoders.right = motors.largeC.angle();
        
        // Calcolo spostamenti
        const deltaLeft = state.encoders.left - state.encoders.lastLeft;
        const deltaRight = state.encoders.right - state.encoders.lastRight;
        
        const leftDistance = encoderToDistance(deltaLeft) * NavigationConfig.physics.distanceCorrection;
        const rightDistance = encoderToDistance(deltaRight) * NavigationConfig.physics.distanceCorrection;
        
        // Calcolo movimento robot
        const deltaDistance = (leftDistance + rightDistance) / 2;
        const deltaAngle = (rightDistance - leftDistance) / NavigationConfig.physics.trackWidth;
        
        // Aggiornamento posizione (modello cinematico differenziale)
        if (Math.abs(deltaAngle) < 0.001) {
            // Movimento rettilineo
            state.position.x += deltaDistance * Math.cos(state.position.angle);
            state.position.y += deltaDistance * Math.sin(state.position.angle);
        } else {
            // Movimento curvilineo
            const radius = deltaDistance / deltaAngle;
            const centerX = state.position.x - radius * Math.sin(state.position.angle);
            const centerY = state.position.y + radius * Math.cos(state.position.angle);
            
            state.position.angle += deltaAngle;
            state.position.x = centerX + radius * Math.sin(state.position.angle);
            state.position.y = centerY - radius * Math.cos(state.position.angle);
        }
        
        // Normalizzazione angolo
        while (state.position.angle > Math.PI) state.position.angle -= 2 * Math.PI;
        while (state.position.angle < -Math.PI) state.position.angle += 2 * Math.PI;
        
        // Calcolo velocità
        if (deltaTime > 0) {
            state.velocity.linear = deltaDistance / deltaTime;
            state.velocity.angular = deltaAngle / deltaTime;
        }
        
        // Aggiorna timestamp e encoder
        state.lastUpdate = currentTime;
        state.encoders.lastLeft = state.encoders.left;
        state.encoders.lastRight = state.encoders.right;
        
        // Salva in trajectory (ogni 100ms)
        if (state.trajectory.length === 0 || currentTime - state.trajectory[state.trajectory.length - 1].time > 100) {
            state.trajectory.push({
                x: state.position.x,
                y: state.position.y,
                angle: state.position.angle,
                time: currentTime
            });
            
            // Mantieni solo ultimi 1000 punti
            if (state.trajectory.length > 1000) {
                state.trajectory.shift();
            }
        }
    }
    
    // Interfaccia pubblica
    return {
        update: updateOdometry,
        
        getPosition: function() {
            updateOdometry();
            return {
                x: Math.round(state.position.x * 10) / 10,
                y: Math.round(state.position.y * 10) / 10,
                angle: Math.round(radiansToDegrees(state.position.angle) * 10) / 10
            };
        },
        
        getVelocity: function() {
            return {
                linear: Math.round(state.velocity.linear * 10) / 10,
                angular: Math.round(radiansToDegrees(state.velocity.angular) * 10) / 10
            };
        },
        
        reset: function(x = 0, y = 0, angle = 0) {
            state.position = { x: x, y: y, angle: degreesToRadians(angle) };
            state.velocity = { linear: 0, angular: 0 };
            state.encoders.lastLeft = motors.largeB.angle();
            state.encoders.lastRight = motors.largeC.angle();
            state.lastUpdate = Date.now();
            state.trajectory = [];
        },
        
        distanceTo: function(targetX, targetY) {
            updateOdometry();
            const dx = targetX - state.position.x;
            const dy = targetY - state.position.y;
            return Math.sqrt(dx * dx + dy * dy);
        },
        
        angleTo: function(targetX, targetY) {
            updateOdometry();
            const dx = targetX - state.position.x;
            const dy = targetY - state.position.y;
            let targetAngle = Math.atan2(dy, dx);
            let angleDiff = targetAngle - state.position.angle;
            
            // Normalizza a [-π, π]
            while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
            while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
            
            return radiansToDegrees(angleDiff);
        },
        
        getTrajectory: function() {
            return state.trajectory.slice(); // copia
        },
        
        getTotalDistance: function() {
            let total = 0;
            for (let i = 1; i < state.trajectory.length; i++) {
                const prev = state.trajectory[i - 1];
                const curr = state.trajectory[i];
                const dx = curr.x - prev.x;
                const dy = curr.y - prev.y;
                total += Math.sqrt(dx * dx + dy * dy);
            }
            return Math.round(total * 10) / 10;
        }
    };
})();

// ==========================================
// CONTROLLER PID AVANZATO
// ==========================================

function AdvancedPIDController(kp, ki, kd, options = {}) {
    this.kp = kp;
    this.ki = ki;
    this.kd = kd;
    
    // Opzioni avanzate
    this.outputMin = options.outputMin || -100;
    this.outputMax = options.outputMax || 100;
    this.integralMax = options.integralMax || 1000;
    this.deadband = options.deadband || 0;
    this.sampleTime = options.sampleTime || 50; // ms
    
    // Stato interno
    this.reset();
}

AdvancedPIDController.prototype = {
    reset: function() {
        this.previousError = 0;
        this.integral = 0;
        this.lastTime = 0;
        this.derivative = 0;
    },
    
    calculate: function(setpoint, measured) {
        const currentTime = Date.now();
        const deltaTime = currentTime - this.lastTime;
        
        // Controllo tempo campionamento
        if (deltaTime < this.sampleTime) {
            return this.lastOutput || 0;
        }
        
        const deltaTimeSeconds = deltaTime / 1000;
        const error = setpoint - measured;
        
        // Deadband - ignora errori piccoli
        if (Math.abs(error) < this.deadband) {
            this.lastTime = currentTime;
            return 0;
        }
        
        // Termine proporzionale
        const proportional = this.kp * error;
        
        // Termine integrale con anti-windup
        this.integral += error * deltaTimeSeconds;
        this.integral = Math.max(-this.integralMax, Math.min(this.integralMax, this.integral));
        const integral = this.ki * this.integral;
        
        // Termine derivativo con filtro
        this.derivative = 0.8 * this.derivative + 0.2 * (error - this.previousError) / deltaTimeSeconds;
        const derivative = this.kd * this.derivative;
        
        // Output totale
        let output = proportional + integral + derivative;
        output = Math.max(this.outputMin, Math.min(this.outputMax, output));
        
        // Aggiorna stato
        this.previousError = error;
        this.lastTime = currentTime;
        this.lastOutput = output;
        
        return output;
    },
    
    tune: function(kp, ki, kd) {
        this.kp = kp;
        this.ki = ki;
        this.kd = kd;
        this.reset();
    },
    
    getStats: function() {
        return {
            kp: this.kp,
            ki: this.ki,
            kd: this.kd,
            error: this.previousError,
            integral: this.integral,
            derivative: this.derivative
        };
    }
};

// ==========================================
// SISTEMA NAVIGAZIONE
// ==========================================

const NavigationSystem = (function() {
    let controllers = {
        position: new AdvancedPIDController(
            NavigationConfig.pid.position.kp,
            NavigationConfig.pid.position.ki,
            NavigationConfig.pid.position.kd,
            { outputMin: -50, outputMax: 50, deadband: 0.5 }
        ),
        angle: new AdvancedPIDController(
            NavigationConfig.pid.angle.kp,
            NavigationConfig.pid.angle.ki,
            NavigationConfig.pid.angle.kd,
            { outputMin: -100, outputMax: 100, deadband: 1 }
        )
    };
    
    let navigationState = {
        mode: 'idle', // 'idle', 'moving', 'turning', 'following'
        target: { x: 0, y: 0, angle: 0 },
        path: [],
        currentWaypoint: 0,
        isActive: false
    };
    
    // Funzioni di movimento base
    function moveToPoint(targetX, targetY, speed = NavigationConfig.control.defaultSpeed) {
        navigationState.mode = 'moving';
        navigationState.target = { x: targetX, y: targetY };
        
        const tolerance = NavigationConfig.control.precision;
        
        while (Odometry.distanceTo(targetX, targetY) > tolerance && navigationState.isActive) {
            const currentPos = Odometry.getPosition();
            const distance = Odometry.distanceTo(targetX, targetY);
            const angleError = Odometry.angleTo(targetX, targetY);
            
            // Prima orienta verso il target se necessario
            if (Math.abs(angleError) > NavigationConfig.control.anglePrecision) {
                const steerCorrection = controllers.angle.calculate(0, angleError);
                motors.largeBC.steer(steerCorrection, NavigationConfig.control.turnSpeed);
            } else {
                // Movimento verso target con controllo velocità
                const speedAdjustment = Math.min(speed, distance * 8); // rallenta vicino al target
                const finalSpeed = Math.max(NavigationConfig.control.minSpeed, speedAdjustment);
                
                motors.largeBC.steer(0, finalSpeed);
            }
            
            // Aggiorna display
            updateNavigationDisplay(distance, angleError, currentPos);
            
            pause(50);
        }
        
        motors.largeBC.stop();
        navigationState.mode = 'idle';
        return true;
    }
    
    function turnToAngle(targetAngle, speed = NavigationConfig.control.turnSpeed) {
        navigationState.mode = 'turning';
        navigationState.target.angle = targetAngle;
        
        const tolerance = NavigationConfig.control.anglePrecision;
        
        while (navigationState.isActive) {
            const currentPos = Odometry.getPosition();
            let angleError = targetAngle - currentPos.angle;
            
            // Normalizza errore angolare
            while (angleError > 180) angleError -= 360;
            while (angleError < -180) angleError += 360;
            
            if (Math.abs(angleError) < tolerance) break;
            
            const steerCorrection = controllers.angle.calculate(0, angleError);
            const turnSpeed = Math.min(speed, Math.abs(angleError) * 2);
            
            motors.largeBC.steer(steerCorrection, turnSpeed);
            
            brick.showValue("Target", Math.round(targetAngle), 1);
            brick.showValue("Current", Math.round(currentPos.angle), 2);
            brick.showValue("Error", Math.round(angleError), 3);
            
            pause(50);
        }
        
        motors.largeBC.stop();
        navigationState.mode = 'idle';
        return true;
    }
    
    function followPath(waypoints, speed = NavigationConfig.control.defaultSpeed) {
        navigationState.mode = 'following';
        navigationState.path = waypoints.slice();
        navigationState.currentWaypoint = 0;
        
        for (let i = 0; i < waypoints.length && navigationState.isActive; i++) {
            const waypoint = waypoints[i];
            navigationState.currentWaypoint = i;
            
            brick.showString(`Waypoint ${i + 1}/${waypoints.length}`, 1);
            brick.showValue("Target X", waypoint.x, 2);
            brick.showValue("Target Y", waypoint.y, 3);
            
            // Movimento al waypoint
            const success = moveToPoint(waypoint.x, waypoint.y, speed);
            if (!success) break;
            
            // Rotazione opzionale
            if (waypoint.angle !== undefined) {
                turnToAngle(waypoint.angle);
            }
            
            // Pausa opzionale al waypoint
            if (waypoint.pause) {
                pause(waypoint.pause);
            }
            
            pause(200);
        }
        
        navigationState.mode = 'idle';
        brick.showString("Percorso completato", 1);
        return true;
    }
    
    function updateNavigationDisplay(distance, angleError, position) {
        brick.showValue("Dist", Math.round(distance * 10) / 10, 1);
        brick.showValue("Angle", Math.round(angleError), 2);
        brick.showValue("X", Math.round(position.x), 3);
        brick.showValue("Y", Math.round(position.y), 4);
        brick.showValue("Mode", navigationState.mode, 5);
    }
    
    // Interfaccia pubblica
    return {
        start: function() {
            navigationState.isActive = true;
            Odometry.reset();
            brick.showString("Sistema navigazione ON", 1);
        },
        
        stop: function() {
            navigationState.isActive = false;
            motors.largeBC.stop();
            navigationState.mode = 'idle';
            brick.showString("Sistema navigazione OFF", 1);
        },
        
        goTo: moveToPoint,
        turnTo: turnToAngle,
        followPath: followPath,
        
        // Funzioni di configurazione
        setSpeed: function(speed) {
            NavigationConfig.control.defaultSpeed = Math.max(10, Math.min(80, speed));
        },
        
        setPrecision: function(distance, angle) {
            NavigationConfig.control.precision = distance;
            NavigationConfig.control.anglePrecision = angle;
        },
        
        tunePID: function(controller, kp, ki, kd) {
            if (controllers[controller]) {
                controllers[controller].tune(kp, ki, kd);
            }
        },
        
        // Funzioni di stato
        getState: function() {
            return {
                mode: navigationState.mode,
                target: navigationState.target,
                active: navigationState.isActive,
                position: Odometry.getPosition(),
                velocity: Odometry.getVelocity()
            };
        },
        
        getStats: function() {
            return {
                totalDistance: Odometry.getTotalDistance(),
                trajectory: Odometry.getTrajectory(),
                pidStats: {
                    position: controllers.position.getStats(),
                    angle: controllers.angle.getStats()
                }
            };
        },
        
        // Calibrazione
        calibrate: function() {
            brick.showString("Calibrazione sistema", 1);
            
            // Test movimento rettilineo
            brick.showString("Test 50cm avanti", 2);
            Odometry.reset();
            this.goTo(50, 0);
            pause(2000);
            
            // Test rotazione
            brick.showString("Test rotazione 90°", 2);
            this.turnTo(90);
            pause(2000);
            
            // Ritorno origine
            brick.showString("Ritorno origine", 2);
            this.goTo(0, 0);
            this.turnTo(0);
            
            const finalPos = Odometry.getPosition();
            brick.showString("Calibrazione completata", 1);
            brick.showValue("Errore X", Math.round(finalPos.x * 10) / 10, 2);
            brick.showValue("Errore Y", Math.round(finalPos.y * 10) / 10, 3);
            brick.showValue("Errore Ang", Math.round(finalPos.angle), 4);
        }
    };
})();

// ==========================================
// PATHFINDING SEMPLICE
// ==========================================

const SimplePathfinder = {
    // Crea un percorso a spirale
    createSpiralPath: function(centerX, centerY, radius, turns) {
        const points = [];
        const pointsPerTurn = 12;
        
        for (let i = 0; i <= turns * pointsPerTurn; i++) {
            const angle = (i / pointsPerTurn) * 2 * Math.PI;
            const currentRadius = (i / (turns * pointsPerTurn)) * radius;
            
            points.push({
                x: centerX + currentRadius * Math.cos(angle),
                y: centerY + currentRadius * Math.sin(angle)
            });
        }
        
        return points;
    },
    
    // Crea un percorso rettangolare
    createRectanglePath: function(x1, y1, x2, y2) {
        return [
            { x: x1, y: y1 },
            { x: x2, y: y1 },
            { x: x2, y: y2 },
            { x: x1, y: y2 },
            { x: x1, y: y1 }
        ];
    },
    
    // Crea un percorso a zigzag
    createZigzagPath: function(startX, startY, width, height, steps) {
        const points = [];
        const stepHeight = height / steps;
        
        for (let i = 0; i <= steps; i++) {
            const y = startY + i * stepHeight;
            const x = (i % 2 === 0) ? startX : startX + width;
            points.push({ x: x, y: y });
        }
        
        return points;
    },
    
    // Ottimizza un percorso rimuovendo punti ridondanti
    optimizePath: function(points, tolerance = 2.0) {
        if (points.length <= 2) return points;
        
        const optimized = [points[0]];
        
        for (let i = 1; i < points.length - 1; i++) {
            const prev = optimized[optimized.length - 1];
            const curr = points[i];
            const next = points[i + 1];
            
            // Calcola se il punto è necessario (non collineare)
            const d1 = Math.sqrt((curr.x - prev.x) ** 2 + (curr.y - prev.y) ** 2);
            const d2 = Math.sqrt((next.x - curr.x) ** 2 + (next.y - curr.y) ** 2);
            const d3 = Math.sqrt((next.x - prev.x) ** 2 + (next.y - prev.y) ** 2);
            
            // Se la distanza diretta è troppo diversa, mantieni il punto
            if (Math.abs(d1 + d2 - d3) > tolerance) {
                optimized.push(curr);
            }
        }
        
        optimized.push(points[points.length - 1]);
        return optimized;
    }
};

// ==========================================
// INTERFACCIA UTENTE NAVIGAZIONE
// ==========================================

const NavigationUI = {
    currentMode: 'manual',
    
    showMainMenu: function() {
        brick.clearScreen();
        brick.showString("=== NAVIGAZIONE ===", 1);
        brick.showString("UP: Punto singolo", 2);
        brick.showString("DOWN: Percorso", 3);
        brick.showString("LEFT: Calibrazione", 4);
        brick.showString("RIGHT: Statistiche", 5);
        brick.showString("ENTER: Avvia sistema", 6);
        brick.showString("ESC: Stop", 7);
    },
    
    pointToPointMode: function() {
        brick.clearScreen();
        brick.showString("PUNTO A PUNTO", 1);
        brick.showString("Target: 50, 30", 2);
        brick.showString("Premi ENTER", 3);
        
        while (!sensors.touch1.isPressed()) pause(100);
        while (sensors.touch1.isPressed()) pause(100);
        
        NavigationSystem.start();
        NavigationSystem.goTo(50, 30);
        pause(2000);
        NavigationSystem.goTo(0, 0);
        NavigationSystem.stop();
    },
    
    pathFollowingMode: function() {
        brick.clearScreen();
        brick.showString("SEGUI PERCORSO", 1);
        brick.showString("Spirale 40cm", 2);
        brick.showString("Premi ENTER", 3);
        
        while (!sensors.touch1.isPressed()) pause(100);
        while (sensors.touch1.isPressed()) pause(100);
        
        const spiralPath = SimplePathfinder.createSpiralPath(0, 0, 40, 2);
        const optimizedPath = SimplePathfinder.optimizePath(spiralPath, 3);
        
        NavigationSystem.start();
        NavigationSystem.followPath(optimizedPath, 35);
        NavigationSystem.stop();
    },
    
    showStatistics: function() {
        const stats = NavigationSystem.getStats();
        brick.clearScreen();
        brick.showString("=== STATISTICHE ===", 1);
        brick.showValue("Distanza tot", Math.round(stats.totalDistance), 2);
        brick.showValue("Punti traiett", stats.trajectory.length, 3);
        brick.showValue("PID Pos Err", Math.round(stats.pidStats.position.error * 10) / 10, 4);
        brick.showValue("PID Ang Err", Math.round(stats.pidStats.angle.error), 5);
        
        pause(3000);
    }
};

// ==========================================
// PROGRAMMA PRINCIPALE
// ==========================================

function initNavigationSystem() {
    brick.showString("Inizializzazione...", 1);
    
    // Setup eventi
    brick.buttonUp.onEvent(ButtonEvent.Pressed, function() {
        NavigationUI.pointToPointMode();
        NavigationUI.showMainMenu();
    });
    
    brick.buttonDown.onEvent(ButtonEvent.Pressed, function() {
        NavigationUI.pathFollowingMode();
        NavigationUI.showMainMenu();
    });
    
    brick.buttonLeft.onEvent(ButtonEvent.Pressed, function() {
        NavigationSystem.calibrate();
        NavigationUI.showMainMenu();
    });
    
    brick.buttonRight.onEvent(ButtonEvent.Pressed, function() {
        NavigationUI.showStatistics();
        NavigationUI.showMainMenu();
    });
    
    brick.buttonEnter.onEvent(ButtonEvent.Pressed, function() {
        NavigationSystem.start();
    });
    
    brick.buttonEscape.onEvent(ButtonEvent.Pressed, function() {
        NavigationSystem.stop();
    });
    
    // Test iniziale sistema
    brick.showString("Test sistema...", 2);
    Odometry.reset();
    pause(500);
    
    const pos = Odometry.getPosition();
    brick.showString("Sistema pronto!", 1);
    music.playTone(440, 200);
    
    NavigationUI.showMainMenu();
}

// Avvia il sistema
initNavigationSystem();
