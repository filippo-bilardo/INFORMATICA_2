// Esempio: Uso di array per memorizzare sequenze di movimenti per l'EV3

// Questo script simula la definizione e l'esecuzione di una sequenza di movimenti.
// In un ambiente EV3 reale, i comandi "esegui..." verrebbero tradotti
// in chiamate API specifiche per controllare i motori del robot.

// 1. Definire una sequenza di movimenti semplici
// Ogni elemento può rappresentare un comando o un parametro.
// Qui usiamo un approccio semplice: [comando, valore, comando, valore, ...]
const simpleMoveSequence = [
    "forward", 1000, // Avanti per 1000 ms (o unità di distanza)
    "turnLeft", 90,  // Gira a sinistra di 90 gradi
    "forward", 500,
    "turnRight", 90,
    "beep", null     // Beep (nessun valore specifico necessario)
];

console.log("--- Sequenza Semplice ---");
function executeSimpleSequence(sequence) {
    for (let i = 0; i < sequence.length; i += 2) {
        const command = sequence[i];
        const value = sequence[i + 1];

        switch (command) {
            case "forward":
                console.log(`Esegui: Muovi avanti per ${value}`);
                // In EV3: motor.drive(speed, value);
                break;
            case "backward":
                console.log(`Esegui: Muovi indietro per ${value}`);
                // In EV3: motor.drive(-speed, value);
                break;
            case "turnLeft":
                console.log(`Esegui: Gira a sinistra di ${value} gradi`);
                // In EV3: motor.steer(turnRatioLeft, speed, value);
                break;
            case "turnRight":
                console.log(`Esegui: Gira a destra di ${value} gradi`);
                // In EV3: motor.steer(turnRatioRight, speed, value);
                break;
            case "beep":
                console.log("Esegui: Beep!");
                // In EV3: sound.beep();
                break;
            default:
                console.warn(`Comando sconosciuto: ${command}`);
        }
    }
}

executeSimpleSequence(simpleMoveSequence);
console.log("Sequenza semplice completata.
");


// 2. Definire una sequenza di movimenti usando un array di oggetti
// Ogni oggetto rappresenta un'azione con i suoi parametri.
// Questo approccio è più strutturato e flessibile.
const structuredMoveSequence = [
    { action: "drive", direction: "forward", durationMs: 1500, speed: 50 },
    { action: "turn", direction: "left", degrees: 45, speed: 30 },
    { action: "playSound", file: "hello.rsf" },
    { action: "drive", direction: "forward", durationMs: 1000, speed: 60 },
    { action: "wait", durationMs: 500 }, // Attendi per 500 ms
    { action: "stopMotors" }
];

console.log("--- Sequenza Strutturata (Array di Oggetti) ---");
function executeStructuredSequence(sequence) {
    sequence.forEach((step, index) => {
        console.log(`Passo ${index + 1}: Azione = ${step.action}`);
        switch (step.action) {
            case "drive":
                console.log(`  -> Direzione: ${step.direction}, Durata: ${step.durationMs}ms, Velocità: ${step.speed}%`);
                // In EV3: ev3.motorRunTimed(ports, step.speed, step.durationMs, step.direction === "backward" ? -1 : 1);
                break;
            case "turn":
                console.log(`  -> Direzione: ${step.direction}, Gradi: ${step.degrees}, Velocità: ${step.speed}%`);
                // In EV3: ev3.motorSteer(ports, turnRatio, step.speed, step.degrees);
                break;
            case "playSound":
                console.log(`  -> File: ${step.file}`);
                // In EV3: ev3.soundPlayFile(step.file);
                break;
            case "wait":
                console.log(`  -> Durata: ${step.durationMs}ms`);
                // In EV3: ev3.pause(step.durationMs);
                break;
            case "stopMotors":
                console.log("  -> Ferma tutti i motori.");
                // In EV3: ev3.motorStopAll('brake');
                break;
            default:
                console.warn(`  -> Azione sconosciuta: ${step.action}`);
        }
    });
}

executeStructuredSequence(structuredMoveSequence);
console.log("Sequenza strutturata completata.
");


// 3. Array per memorizzare letture da un sensore
const maxReadings = 5;
let distanceReadings = []; // Memorizza le ultime N letture

function recordDistance(distance) {
    distanceReadings.push(distance);
    if (distanceReadings.length > maxReadings) {
        distanceReadings.shift(); // Rimuove la lettura più vecchia per mantenere la dimensione
    }
    console.log(`Letture distanza: [${distanceReadings.join(", ")}] cm`);
}

console.log("--- Memorizzazione Letture Sensore ---");
recordDistance(50);
recordDistance(45);
recordDistance(48);
recordDistance(42);
recordDistance(46);
recordDistance(43); // Questa aggiunta farà rimuovere il 50

// Calcolare la media delle letture
function getAverageDistance() {
    if (distanceReadings.length === 0) return 0;
    const sum = distanceReadings.reduce((acc, val) => acc + val, 0);
    return sum / distanceReadings.length;
}
console.log(`Distanza media: ${getAverageDistance().toFixed(2)} cm`);
console.log("Esempio letture sensore completato.
");

/*
Applicazioni EV3:
- Pianificazione di percorsi: Un array di coordinate [x, y] o di comandi di movimento.
- Registrazione dati: Collezionare letture da sensori di luce, colore, ultrasuoni, giroscopio
  per analisi successive (es. trovare una linea, rilevare un ostacolo, calibrare).
- Sequenze di suoni o luci: Un array di nomi di file audio o pattern di LED.
- Menu su schermo: Un array di stringhe per le opzioni di un menu da visualizzare
  sullo schermo dell'EV3.
*/
