/*
 * Esempio 6: Sistema di Pianificazione Movimento Avanzato
 * 
 * Questo esempio dimostra un sistema completo di pianificazione e controllo movimento
 * che include pathfinding, evitamento ostacoli e controllo adattivo.
 * 
 * Concetti dimostrati:
 * - Pianificazione di traiettorie
 * - Controllo predittivo del movimento
 * - Integrazione sensori-motori
 * - Gestione degli errori in tempo reale
 */

// =======================
// CONFIGURAZIONE SISTEMA
// =======================

const CONFIG = {
    ROBOT: {
        WHEEL_DIAMETER: 5.5,    // cm
        WHEEL_BASE: 18,         // cm distanza tra ruote
        MAX_SPEED: 80,          // %
        MAX_ACCELERATION: 50    // %/s
    },
    PATHFINDING: {
        GRID_SIZE: 10,          // cm
        SAFETY_MARGIN: 15,      // cm da ostacoli
        MAX_ITERATIONS: 1000,
        SMOOTHING_FACTOR: 0.3
    },
    CONTROL: {
        UPDATE_RATE: 50,        // ms
        POSITION_TOLERANCE: 2,  // cm
        ANGLE_TOLERANCE: 3      // gradi
    }
};

// =======================
// CLASSI CORE
// =======================

/**
 * Gestione posizione e orientamento del robot
 */
class Odometry {
    constructor() {
        this.position = { x: 0, y: 0, theta: 0 };
        this.lastEncoderB = 0;
        this.lastEncoderC = 0;
        this.gyroOffset = 0;
        
        this.calibrateGyro();
    }
    
    calibrateGyro() {
        console.log("Calibrando giroscopio...");
        let samples = [];
        
        for (let i = 0; i < 100; i++) {
            samples.push(sensors.gyro2.angle());
            pause(10);
        }
        
        this.gyroOffset = samples.reduce((a, b) => a + b, 0) / samples.length;
        console.log(`Offset giroscopio: ${this.gyroOffset}`);
    }
    
    /**
     * Aggiorna la posizione basandosi sui sensori
     */
    update() {
        // Lettura encoder
        let encoderB = motors.largeB.angle();
        let encoderC = motors.largeC.angle();
        
        // Calcolo distanze percorse
        let deltaB = (encoderB - this.lastEncoderB) * Math.PI * CONFIG.ROBOT.WHEEL_DIAMETER / 360;
        let deltaC = (encoderC - this.lastEncoderC) * Math.PI * CONFIG.ROBOT.WHEEL_DIAMETER / 360;
        
        // Distanza e rotazione
        let deltaDistance = (deltaB + deltaC) / 2;
        let deltaTheta = (deltaC - deltaB) / CONFIG.ROBOT.WHEEL_BASE;
        
        // Aggiornamento posizione
        this.position.x += deltaDistance * Math.cos(this.position.theta + deltaTheta / 2);
        this.position.y += deltaDistance * Math.sin(this.position.theta + deltaTheta / 2);
        this.position.theta += deltaTheta;
        
        // Normalizza angolo
        this.position.theta = this.normalizeAngle(this.position.theta);
        
        // Fusione con giroscopio per maggiore precisione
        if (sensors.gyro2) {
            let gyroAngle = (sensors.gyro2.angle() - this.gyroOffset) * Math.PI / 180;
            this.position.theta = 0.7 * this.position.theta + 0.3 * gyroAngle;
        }
        
        // Aggiorna encoder precedenti
        this.lastEncoderB = encoderB;
        this.lastEncoderC = encoderC;
    }
    
    normalizeAngle(angle) {
        while (angle > Math.PI) angle -= 2 * Math.PI;
        while (angle < -Math.PI) angle += 2 * Math.PI;
        return angle;
    }
    
    setPosition(x, y, theta) {
        this.position.x = x;
        this.position.y = y;
        this.position.theta = theta;
    }
    
    getPosition() {
        return { ...this.position };
    }
    
    distanceTo(target) {
        let dx = target.x - this.position.x;
        let dy = target.y - this.position.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    angleTo(target) {
        let dx = target.x - this.position.x;
        let dy = target.y - this.position.y;
        return Math.atan2(dy, dx);
    }
}

/**
 * Sistema di mappatura e rilevamento ostacoli
 */
class ObstacleMap {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.gridSize = CONFIG.PATHFINDING.GRID_SIZE;
        this.grid = this.createGrid();
        this.obstacles = [];
    }
    
    createGrid() {
        let rows = Math.ceil(this.height / this.gridSize);
        let cols = Math.ceil(this.width / this.gridSize);
        
        return Array(rows).fill().map(() => Array(cols).fill(0));
    }
    
    /**
     * Scansione ambiente con ultrasuoni
     */
    scanEnvironment(odometry) {
        let currentPos = odometry.getPosition();
        
        // Scansione a 360 gradi
        for (let angle = 0; angle < 360; angle += 30) {
            let targetAngle = angle * Math.PI / 180;
            
            // Ruota verso l'angolo di scansione
            this.turnTo(odometry, targetAngle);
            
            // Misura distanza
            let distance = sensors.ultrasonic4.distance();
            
            if (distance < 200) { // Ostacolo rilevato
                let obstacleX = currentPos.x + distance * Math.cos(targetAngle);
                let obstacleY = currentPos.y + distance * Math.sin(targetAngle);
                
                this.addObstacle(obstacleX, obstacleY);
            }
        }
        
        this.updateGrid();
    }
    
    turnTo(odometry, targetAngle) {
        let currentAngle = odometry.getPosition().theta;
        let angleDiff = this.normalizeAngle(targetAngle - currentAngle);
        
        if (Math.abs(angleDiff) > 0.1) {
            let turnSpeed = Math.sign(angleDiff) * 30;
            motors.largeBC.steer(turnSpeed > 0 ? 100 : -100, Math.abs(turnSpeed));
            
            while (Math.abs(odometry.getPosition().theta - targetAngle) > 0.05) {
                odometry.update();
                pause(20);
            }
            
            motors.largeBC.stop();
        }
    }
    
    normalizeAngle(angle) {
        while (angle > Math.PI) angle -= 2 * Math.PI;
        while (angle < -Math.PI) angle += 2 * Math.PI;
        return angle;
    }
    
    addObstacle(x, y) {
        // Aggiungi con margine di sicurezza
        let margin = CONFIG.PATHFINDING.SAFETY_MARGIN;
        
        this.obstacles.push({
            x: x,
            y: y,
            radius: margin
        });
    }
    
    updateGrid() {
        // Reset grid
        for (let row of this.grid) {
            row.fill(0);
        }
        
        // Marca celle occupate
        for (let obstacle of this.obstacles) {
            let gridX = Math.floor(obstacle.x / this.gridSize);
            let gridY = Math.floor(obstacle.y / this.gridSize);
            let radius = Math.ceil(obstacle.radius / this.gridSize);
            
            for (let dy = -radius; dy <= radius; dy++) {
                for (let dx = -radius; dx <= radius; dx++) {
                    let gx = gridX + dx;
                    let gy = gridY + dy;
                    
                    if (gx >= 0 && gx < this.grid[0].length && 
                        gy >= 0 && gy < this.grid.length) {
                        if (dx * dx + dy * dy <= radius * radius) {
                            this.grid[gy][gx] = 1; // Occupato
                        }
                    }
                }
            }
        }
    }
    
    isObstacle(x, y) {
        let gridX = Math.floor(x / this.gridSize);
        let gridY = Math.floor(y / this.gridSize);
        
        if (gridX < 0 || gridX >= this.grid[0].length || 
            gridY < 0 || gridY >= this.grid.length) {
            return true; // Fuori mappa = ostacolo
        }
        
        return this.grid[gridY][gridX] === 1;
    }
}

/**
 * Algoritmo A* per pathfinding
 */
class Pathfinder {
    constructor(obstacleMap) {
        this.map = obstacleMap;
    }
    
    /**
     * Trova il percorso ottimale da start a goal
     */
    findPath(start, goal) {
        let startNode = this.worldToGrid(start);
        let goalNode = this.worldToGrid(goal);
        
        let openSet = [startNode];
        let closedSet = [];
        let cameFrom = new Map();
        
        let gScore = new Map();
        let fScore = new Map();
        
        gScore.set(this.nodeKey(startNode), 0);
        fScore.set(this.nodeKey(startNode), this.heuristic(startNode, goalNode));
        
        while (openSet.length > 0) {
            // Trova nodo con f-score minimo
            let current = openSet.reduce((min, node) => {
                let currentF = fScore.get(this.nodeKey(node)) || Infinity;
                let minF = fScore.get(this.nodeKey(min)) || Infinity;
                return currentF < minF ? node : min;
            });
            
            if (this.nodesEqual(current, goalNode)) {
                // Percorso trovato
                return this.reconstructPath(cameFrom, current);
            }
            
            // Rimuovi current da openSet
            openSet = openSet.filter(node => !this.nodesEqual(node, current));
            closedSet.push(current);
            
            // Esplora vicini
            for (let neighbor of this.getNeighbors(current)) {
                if (closedSet.some(node => this.nodesEqual(node, neighbor))) {
                    continue;
                }
                
                if (this.map.isObstacle(neighbor.x * this.map.gridSize, 
                                       neighbor.y * this.map.gridSize)) {
                    continue;
                }
                
                let tentativeGScore = (gScore.get(this.nodeKey(current)) || Infinity) + 1;
                
                if (!openSet.some(node => this.nodesEqual(node, neighbor))) {
                    openSet.push(neighbor);
                } else if (tentativeGScore >= (gScore.get(this.nodeKey(neighbor)) || Infinity)) {
                    continue;
                }
                
                cameFrom.set(this.nodeKey(neighbor), current);
                gScore.set(this.nodeKey(neighbor), tentativeGScore);
                fScore.set(this.nodeKey(neighbor), 
                          tentativeGScore + this.heuristic(neighbor, goalNode));
            }
        }
        
        return null; // Nessun percorso trovato
    }
    
    worldToGrid(worldPos) {
        return {
            x: Math.floor(worldPos.x / this.map.gridSize),
            y: Math.floor(worldPos.y / this.map.gridSize)
        };
    }
    
    gridToWorld(gridPos) {
        return {
            x: gridPos.x * this.map.gridSize + this.map.gridSize / 2,
            y: gridPos.y * this.map.gridSize + this.map.gridSize / 2
        };
    }
    
    nodeKey(node) {
        return `${node.x},${node.y}`;
    }
    
    nodesEqual(a, b) {
        return a.x === b.x && a.y === b.y;
    }
    
    heuristic(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }
    
    getNeighbors(node) {
        return [
            { x: node.x + 1, y: node.y },
            { x: node.x - 1, y: node.y },
            { x: node.x, y: node.y + 1 },
            { x: node.x, y: node.y - 1 }
        ];
    }
    
    reconstructPath(cameFrom, current) {
        let path = [this.gridToWorld(current)];
        
        while (cameFrom.has(this.nodeKey(current))) {
            current = cameFrom.get(this.nodeKey(current));
            path.unshift(this.gridToWorld(current));
        }
        
        return this.smoothPath(path);
    }
    
    /**
     * Liscia il percorso per movimenti più fluidi
     */
    smoothPath(path) {
        if (path.length <= 2) return path;
        
        let smoothed = [path[0]];
        
        for (let i = 1; i < path.length - 1; i++) {
            let prev = smoothed[smoothed.length - 1];
            let current = path[i];
            let next = path[i + 1];
            
            // Applica smoothing
            let smoothedPoint = {
                x: current.x + CONFIG.PATHFINDING.SMOOTHING_FACTOR * 
                   (prev.x + next.x - 2 * current.x),
                y: current.y + CONFIG.PATHFINDING.SMOOTHING_FACTOR * 
                   (prev.y + next.y - 2 * current.y)
            };
            
            smoothed.push(smoothedPoint);
        }
        
        smoothed.push(path[path.length - 1]);
        return smoothed;
    }
}

/**
 * Controllore di movimento avanzato
 */
class MotionController {
    constructor(odometry) {
        this.odometry = odometry;
        this.currentPath = [];
        this.currentWaypoint = 0;
        this.isMoving = false;
        
        // Parametri PID per controllo posizione
        this.pidLinear = { kP: 2.0, kI: 0.1, kD: 0.5, integral: 0, lastError: 0 };
        this.pidAngular = { kP: 3.0, kI: 0.2, kD: 0.8, integral: 0, lastError: 0 };
    }
    
    /**
     * Segue un percorso pianificato
     */
    followPath(path) {
        this.currentPath = path;
        this.currentWaypoint = 0;
        this.isMoving = true;
        
        console.log(`Iniziando percorso con ${path.length} waypoints`);
        
        while (this.isMoving && this.currentWaypoint < this.currentPath.length) {
            this.odometry.update();
            this.updateMovement();
            pause(CONFIG.CONTROL.UPDATE_RATE);
        }
        
        motors.largeBC.stop();
        console.log("Percorso completato");
    }
    
    updateMovement() {
        if (this.currentWaypoint >= this.currentPath.length) {
            this.isMoving = false;
            return;
        }
        
        let target = this.currentPath[this.currentWaypoint];
        let current = this.odometry.getPosition();
        
        // Calcola errori
        let distanceError = this.odometry.distanceTo(target);
        let angleError = this.normalizeAngle(this.odometry.angleTo(target) - current.theta);
        
        // Controlla se abbiamo raggiunto il waypoint
        if (distanceError < CONFIG.CONTROL.POSITION_TOLERANCE) {
            this.currentWaypoint++;
            console.log(`Waypoint ${this.currentWaypoint} raggiunto`);
            return;
        }
        
        // Controllo PID
        let linearVelocity = this.pidControl(this.pidLinear, distanceError);
        let angularVelocity = this.pidControl(this.pidAngular, angleError);
        
        // Limita le velocità
        linearVelocity = Math.max(-CONFIG.ROBOT.MAX_SPEED, 
                                 Math.min(CONFIG.ROBOT.MAX_SPEED, linearVelocity));
        angularVelocity = Math.max(-100, Math.min(100, angularVelocity));
        
        // Applica controllo differenziale
        this.applyDifferentialControl(linearVelocity, angularVelocity);
    }
    
    pidControl(pid, error) {
        pid.integral += error;
        let derivative = error - pid.lastError;
        
        let output = pid.kP * error + pid.kI * pid.integral + pid.kD * derivative;
        
        pid.lastError = error;
        
        return output;
    }
    
    applyDifferentialControl(linear, angular) {
        // Converte velocità lineare e angolare in velocità delle ruote
        let leftSpeed = linear - angular;
        let rightSpeed = linear + angular;
        
        // Normalizza se necessario
        let maxSpeed = Math.max(Math.abs(leftSpeed), Math.abs(rightSpeed));
        if (maxSpeed > CONFIG.ROBOT.MAX_SPEED) {
            leftSpeed = leftSpeed * CONFIG.ROBOT.MAX_SPEED / maxSpeed;
            rightSpeed = rightSpeed * CONFIG.ROBOT.MAX_SPEED / maxSpeed;
        }
        
        motors.largeB.setSpeed(leftSpeed);
        motors.largeC.setSpeed(rightSpeed);
    }
    
    normalizeAngle(angle) {
        while (angle > Math.PI) angle -= 2 * Math.PI;
        while (angle < -Math.PI) angle += 2 * Math.PI;
        return angle;
    }
    
    /**
     * Ferma il movimento immediatamente
     */
    stop() {
        this.isMoving = false;
        motors.largeBC.stop();
    }
    
    /**
     * Movimento di emergenza per evitare ostacoli
     */
    emergencyAvoidance() {
        console.log("Manovra di emergenza!");
        
        motors.largeBC.stop();
        pause(500);
        
        // Indietreggia
        motors.largeBC.steer(0, -30, 500, MoveUnit.MilliSeconds);
        pause(100);
        
        // Gira a destra
        motors.largeBC.steer(100, 40, 300, MoveUnit.MilliSeconds);
        
        this.stop();
    }
}

/**
 * Sistema principale di navigazione
 */
class AdvancedNavigationSystem {
    constructor() {
        this.odometry = new Odometry();
        this.obstacleMap = new ObstacleMap(200, 200); // 2m x 2m
        this.pathfinder = new Pathfinder(this.obstacleMap);
        this.controller = new MotionController(this.odometry);
        
        this.isNavigating = false;
        this.emergencyStopDistance = 20; // cm
    }
    
    /**
     * Naviga verso una destinazione
     */
    async navigateTo(targetX, targetY) {
        console.log(`Navigando verso (${targetX}, ${targetY})`);
        
        brick.setStatusLight(StatusLight.Orange);
        this.isNavigating = true;
        
        try {
            // Scansiona ambiente
            console.log("Scansionando ambiente...");
            this.obstacleMap.scanEnvironment(this.odometry);
            
            // Pianifica percorso
            console.log("Pianificando percorso...");
            let currentPos = this.odometry.getPosition();
            let path = this.pathfinder.findPath(currentPos, { x: targetX, y: targetY });
            
            if (!path) {
                console.log("Nessun percorso trovato!");
                brick.setStatusLight(StatusLight.Red);
                return false;
            }
            
            console.log(`Percorso pianificato con ${path.length} waypoints`);
            
            // Esegui movimento con monitoraggio continuo
            this.executePathWithMonitoring(path);
            
            brick.setStatusLight(StatusLight.Green);
            console.log("Navigazione completata con successo");
            return true;
            
        } catch (error) {
            console.log(`Errore durante navigazione: ${error}`);
            brick.setStatusLight(StatusLight.Red);
            this.controller.stop();
            return false;
        } finally {
            this.isNavigating = false;
        }
    }
    
    executePathWithMonitoring(path) {
        // Avvia movimento in background
        let movementPromise = this.startMovement(path);
        
        // Monitoraggio continuo
        while (this.controller.isMoving) {
            this.odometry.update();
            
            // Controllo ostacoli dinamici
            if (this.checkDynamicObstacles()) {
                console.log("Ostacolo dinamico rilevato!");
                this.controller.emergencyAvoidance();
                
                // Ripianifica percorso
                let currentPos = this.odometry.getPosition();
                let remaining = path.slice(this.controller.currentWaypoint);
                
                if (remaining.length > 0) {
                    let newPath = this.pathfinder.findPath(currentPos, remaining[remaining.length - 1]);
                    if (newPath) {
                        path = newPath;
                        this.controller.followPath(path);
                    }
                }
            }
            
            // Aggiorna display
            this.updateDisplay();
            
            pause(CONFIG.CONTROL.UPDATE_RATE);
        }
    }
    
    startMovement(path) {
        // Simula movimento asincrono
        control.runInParallel(() => {
            this.controller.followPath(path);
        });
    }
    
    checkDynamicObstacles() {
        if (!sensors.ultrasonic4) return false;
        
        let distance = sensors.ultrasonic4.distance();
        return distance < this.emergencyStopDistance;
    }
    
    updateDisplay() {
        let pos = this.odometry.getPosition();
        
        brick.clearScreen();
        brick.showString(`X: ${pos.x.toFixed(1)}`, 1);
        brick.showString(`Y: ${pos.y.toFixed(1)}`, 2);
        brick.showString(`θ: ${(pos.theta * 180 / Math.PI).toFixed(1)}°`, 3);
        brick.showString(`WP: ${this.controller.currentWaypoint}`, 4);
    }
    
    /**
     * Modalità esplorazione autonoma
     */
    exploreAutonomously(duration = 60000) {
        console.log("Iniziando esplorazione autonoma...");
        
        let startTime = control.millis();
        
        while (control.millis() - startTime < duration) {
            // Genera target casuale
            let targetX = Math.random() * 150 + 25;
            let targetY = Math.random() * 150 + 25;
            
            console.log(`Esplorando punto (${targetX.toFixed(1)}, ${targetY.toFixed(1)})`);
            
            // Naviga verso il target
            this.navigateTo(targetX, targetY);
            
            // Pausa tra esplorazioni
            pause(2000);
        }
        
        console.log("Esplorazione completata");
    }
    
    /**
     * Ritorna alla posizione di partenza
     */
    returnHome() {
        console.log("Tornando alla base...");
        return this.navigateTo(0, 0);
    }
    
    /**
     * Reset completo del sistema
     */
    reset() {
        this.controller.stop();
        this.odometry.setPosition(0, 0, 0);
        this.obstacleMap = new ObstacleMap(200, 200);
        this.pathfinder = new Pathfinder(this.obstacleMap);
        
        console.log("Sistema reset completato");
    }
}

// =======================
// FUNZIONE PRINCIPALE
// =======================

/**
 * Programma principale
 */
function main() {
    console.log("=== Sistema di Navigazione Avanzato EV3 ===");
    
    // Inizializza sistema
    let navigator = new AdvancedNavigationSystem();
    
    // Menu interattivo
    while (true) {
        brick.clearScreen();
        brick.showString("Nav Avanzata", 1);
        brick.showString("1:Naviga 2:Esplora", 2);
        brick.showString("3:Home 4:Reset", 3);
        brick.showString("5:Exit", 4);
        
        let button = brick.buttonPressed();
        
        switch (button) {
            case Button.Up:
                // Navigazione manuale
                brick.showString("Target X:", 1);
                let targetX = 100; // Semplificato
                brick.showString("Target Y:", 1);
                let targetY = 50;  // Semplificato
                
                navigator.navigateTo(targetX, targetY);
                break;
                
            case Button.Right:
                // Esplorazione autonoma
                navigator.exploreAutonomously(30000); // 30 secondi
                break;
                
            case Button.Down:
                // Ritorna home
                navigator.returnHome();
                break;
                
            case Button.Left:
                // Reset sistema
                navigator.reset();
                brick.showString("Sistema reset!", 2);
                pause(1000);
                break;
                
            case Button.Enter:
                // Exit
                console.log("Programma terminato");
                return;
        }
        
        pause(100);
    }
}

// Avvia il programma principale
main();
