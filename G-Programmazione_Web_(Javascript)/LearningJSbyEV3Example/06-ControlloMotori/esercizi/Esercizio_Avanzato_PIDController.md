# Esercizio Avanzato: Implementazione PID Controller

## Obiettivo
Implementare un sistema di controllo PID (Proportional-Integral-Derivative) per il controllo preciso della velocità e posizione dei motori EV3.

## Concetti Coinvolti
- Algoritmi di controllo PID
- Retroazione (feedback) in tempo reale
- Calibrazione automatica
- Gestione errori e stabilità
- Matematica applicata (derivate e integrali discreti)

## Descrizione del Problema
Crea un sistema che mantiene il robot su una linea retta perfetta anche in presenza di disturbi esterni (superfici irregolari, differenze tra motori, ecc.) utilizzando un controller PID.

## Specifiche Tecniche

### Parametri PID
- **Kp (Proportional)**: Guadagno proporzionale (0.1 - 2.0)
- **Ki (Integral)**: Guadagno integrale (0.01 - 0.5)
- **Kd (Derivative)**: Guadagno derivativo (0.001 - 0.1)

### Sistema di Feedback
- Sensore giroscopico per rilevare deviazioni di direzione
- Encoder motori per controllo posizione
- Controllo velocità differenziale

## Implementazione Base

```javascript
/**
 * Sistema PID Controller per EV3
 * Mantiene il robot su una traiettoria dritta
 */

// Configurazione PID
const PID_CONFIG = {
    kp: 1.5,        // Guadagno proporzionale
    ki: 0.1,        // Guadagno integrale  
    kd: 0.05,       // Guadagno derivativo
    maxOutput: 30,  // Massima correzione
    targetAngle: 0  // Angolo target (0° = dritto)
};

// Variabili di stato PID
let previousError = 0;
let integral = 0;
let lastTime = control.millis();

/**
 * Calcola l'output del controller PID
 * @param {number} currentAngle - Angolo attuale del robot
 * @param {number} targetAngle - Angolo desiderato
 * @returns {number} Correzione da applicare
 */
function calculatePID(currentAngle, targetAngle) {
    const currentTime = control.millis();
    const deltaTime = (currentTime - lastTime) / 1000; // Converti in secondi
    
    // Calcola l'errore
    const error = targetAngle - currentAngle;
    
    // Termine proporzionale
    const proportional = PID_CONFIG.kp * error;
    
    // Termine integrale
    integral += error * deltaTime;
    const integralTerm = PID_CONFIG.ki * integral;
    
    // Termine derivativo
    const derivative = (error - previousError) / deltaTime;
    const derivativeTerm = PID_CONFIG.kd * derivative;
    
    // Output finale
    let output = proportional + integralTerm + derivativeTerm;
    
    // Limita l'output
    output = Math.max(-PID_CONFIG.maxOutput, Math.min(PID_CONFIG.maxOutput, output));
    
    // Aggiorna variabili per prossima iterazione
    previousError = error;
    lastTime = currentTime;
    
    return output;
}

/**
 * Sistema di movimento con controllo PID
 */
function moveWithPIDControl() {
    const baseSpeed = 50;
    let running = true;
    
    // Reset sistema PID
    previousError = 0;
    integral = 0;
    lastTime = control.millis();
    
    // Reset giroscopio
    sensors.gyro2.reset();
    
    brick.showString("PID Control Active", 1);
    brick.showString("Press DOWN to stop", 2);
    
    while (running) {
        // Leggi angolo attuale
        const currentAngle = sensors.gyro2.angle();
        
        // Calcola correzione PID
        const correction = calculatePID(currentAngle, PID_CONFIG.targetAngle);
        
        // Applica correzione ai motori
        const leftSpeed = baseSpeed + correction;
        const rightSpeed = baseSpeed - correction;
        
        // Muovi motori con velocità corrette
        motors.largeBC.tank(leftSpeed, rightSpeed);
        
        // Mostra informazioni debug
        brick.showNumber(currentAngle, 3);
        brick.showNumber(correction, 4);
        
        // Controlla pulsante stop
        if (brick.buttonDown.wasPressed()) {
            running = false;
        }
        
        pause(20); // Frequenza di controllo: 50Hz
    }
    
    motors.stopAll();
    brick.showString("PID Stopped", 5);
}
```

## Funzionalità Avanzate da Implementare

### 1. Auto-Tuning PID
```javascript
/**
 * Sistema di auto-calibrazione dei parametri PID
 */
function autoTunePID() {
    brick.showString("Auto-tuning PID...", 1);
    
    const testConfigs = [
        {kp: 0.5, ki: 0.05, kd: 0.01},
        {kp: 1.0, ki: 0.1, kd: 0.03},
        {kp: 1.5, ki: 0.15, kd: 0.05},
        {kp: 2.0, ki: 0.2, kd: 0.07}
    ];
    
    let bestConfig = null;
    let bestScore = Infinity;
    
    for (let config of testConfigs) {
        const score = testPIDConfiguration(config);
        if (score < bestScore) {
            bestScore = score;
            bestConfig = config;
        }
    }
    
    // Applica la migliore configurazione
    PID_CONFIG.kp = bestConfig.kp;
    PID_CONFIG.ki = bestConfig.ki;
    PID_CONFIG.kd = bestConfig.kd;
    
    brick.showString("Tuning complete!", 2);
    brick.showValue("Best Kp", bestConfig.kp);
}
```

### 2. PID per Controllo Posizione
```javascript
/**
 * PID Controller per controllo preciso della posizione
 */
function moveToPosition(targetDistance) {
    motors.largeBC.resetPosition();
    
    const PID_POSITION = {kp: 2.0, ki: 0.1, kd: 0.1};
    let previousError = 0;
    let integral = 0;
    
    while (true) {
        const currentPosition = motors.largeBC.position();
        const error = targetDistance - currentPosition;
        
        if (Math.abs(error) < 5) break; // Precisione ±5 gradi
        
        // Calcolo PID
        const output = calculatePositionPID(error, PID_POSITION);
        
        // Applica velocità calcolata
        motors.largeBC.tank(output, output);
        
        pause(20);
    }
    
    motors.stopAll();
}
```

### 3. Sistema di Monitoraggio e Logging
```javascript
/**
 * Sistema di logging per analisi performance PID
 */
class PIDLogger {
    constructor() {
        this.data = [];
        this.startTime = control.millis();
    }
    
    log(angle, error, output, correction) {
        const timestamp = control.millis() - this.startTime;
        this.data.push({
            time: timestamp,
            angle: angle,
            error: error,
            output: output,
            correction: correction
        });
    }
    
    showStats() {
        const avgError = this.data.reduce((sum, d) => sum + Math.abs(d.error), 0) / this.data.length;
        const maxError = Math.max(...this.data.map(d => Math.abs(d.error)));
        
        brick.showString("PID Statistics:", 1);
        brick.showValue("Avg Error", avgError);
        brick.showValue("Max Error", maxError);
        brick.showValue("Samples", this.data.length);
    }
}
```

## Esercizi Progressivi

### Livello 1: PID Base
1. Implementa il PID controller base per mantenere direzione dritta
2. Testa con diversi valori di Kp, Ki, Kd
3. Analizza la risposta del sistema

### Livello 2: PID Avanzato
1. Aggiungi auto-tuning dei parametri
2. Implementa controllo di posizione
3. Crea sistema di logging performance

### Livello 3: PID Multi-Variabile
1. Controlla simultaneamente velocità e direzione
2. Integra multiple fonti di feedback (gyro + encoder)
3. Gestisci situazioni di emergenza

## Sfide Aggiuntive

### Sfida 1: Inseguimento Linea con PID
Utilizza il PID per seguire una linea nera con massima precisione e velocità.

### Sfida 2: Bilanciamento Robot
Implementa un robot auto-bilanciante usando PID (richiede configurazione speciale).

### Sfida 3: Controllo Formazione
Coordina più robot usando PID per mantenere formazione precisa.

## Criteri di Valutazione

### Precisione (40%)
- Deviazione media dalla traiettoria target
- Tempo di stabilizzazione
- Overshoot e oscillazioni

### Robustezza (30%)
- Gestione disturbi esterni
- Recupero da errori
- Stabilità a lungo termine

### Implementazione (30%)
- Qualità del codice
- Commenti e documentazione
- Gestione errori

## Risorse Aggiuntive

### Teoria PID
- [Controlli automatici base](https://it.wikipedia.org/wiki/Controllore_PID)
- [Tuning PID controllers](https://en.wikipedia.org/wiki/PID_controller#Loop_tuning)

### Applicazioni Pratiche
- Sistemi di navigazione autonoma
- Controllo industriale
- Robotica avanzata

---

**Tempo stimato**: 3-4 ore per implementazione completa
**Difficoltà**: ⭐⭐⭐⭐⭐ (Avanzato)
**Prerequisiti**: Conoscenza di matematica base, concetti di feedback control

[Torna agli Esercizi](./README.md) | [Torna al Modulo](../README.md)
