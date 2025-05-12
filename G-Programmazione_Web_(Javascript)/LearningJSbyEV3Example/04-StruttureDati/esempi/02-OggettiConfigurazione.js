// Esempio: Uso di oggetti per configurare parametri del robot EV3

// Questo script simula come gli oggetti possono essere usati per definire
// e applicare configurazioni al robot.

// 1. Oggetto per la configurazione di base del robot
const robotBaseConfig = {
    robotName: "EV3-Explorer",
    firmwareVersion: "1.10E",
    wheelDiameterCm: 5.6,    // Diametro ruota in cm
    trackWidthCm: 12.0,      // Distanza tra i centri delle ruote motrici in cm
    batteryMinVoltage: 6.8,  // Volt
    debugMode: true
};

console.log("--- Configurazione Base del Robot ---");
console.log("Nome Robot:", robotBaseConfig.robotName);
console.log("Diametro Ruote:", robotBaseConfig.wheelDiameterCm, "cm");
if (robotBaseConfig.debugMode) {
    console.log("Modalità Debug: ATTIVA");
}
console.log("
");


// 2. Oggetto per la configurazione dei motori
const motorConfig = {
    leftMotor: {
        port: "outB",
        maxSpeed: 1050, // RPM
        inverted: false,
        defaultSpeedPercent: 50
    },
    rightMotor: {
        port: "outC",
        maxSpeed: 1050,
        inverted: false,
        defaultSpeedPercent: 50
    },
    mediumMotor: { // Ad esempio, per un braccio o un accessorio
        port: "outA",
        maxSpeed: 1500, // RPM (tipico per motori medi)
        inverted: true,
        defaultSpeedPercent: 70
    }
};

console.log("--- Configurazione Motori ---");
console.log("Motore Sinistro:");
console.log("  Porta:", motorConfig.leftMotor.port);
console.log("  Velocità Default:", motorConfig.leftMotor.defaultSpeedPercent, "%");

console.log("Motore Medio:");
console.log("  Porta:", motorConfig.mediumMotor.port);
console.log("  Invertito:", motorConfig.mediumMotor.inverted);
console.log("
");

// Funzione simulata per applicare la configurazione di un motore
function applyMotorSettings(motorName, settings) {
    console.log(`Applico impostazioni per ${motorName} su porta ${settings.port}:`);
    console.log(`  - Velocità default: ${settings.defaultSpeedPercent}%`);
    console.log(`  - Inversione: ${settings.inverted}`);
    // In EV3:
    // ev3.motorSetStopAction(settings.port, 'coast');
    // ev3.motorSetSpeedRegulation(settings.port, true); // Abilita regolazione velocità
    // ... altre impostazioni ...
}

applyMotorSettings("Motore Destro", motorConfig.rightMotor);
console.log("
");


// 3. Oggetto per la configurazione dei sensori
const sensorConfig = {
    touchSensor1: {
        port: "in1",
        type: "EV3-Touch",
        mode: "TOUCH", // Modalità standard
        isEnabled: true
    },
    colorSensor1: {
        port: "in3",
        type: "EV3-Color",
        mode: "COL-COLOR", // Rileva colore (0-7)
        isEnabled: true,
        calibration: { // Oggetto annidato per dati di calibrazione
            black: 10,
            white: 85,
            threshold: 45
        }
    },
    ultrasonicSensor1: {
        port: "in4",
        type: "EV3-Ultrasonic",
        mode: "US-DIST-CM", // Distanza in cm
        isEnabled: false // Questo sensore è disabilitato per ora
    }
};

console.log("--- Configurazione Sensori ---");
function checkAndReportSensor(sensorName, config) {
    if (config.isEnabled) {
        console.log(`${sensorName} (${config.type} su ${config.port}) è abilitato.`);
        console.log(`  Modalità: ${config.mode}`);
        if (config.calibration) {
            console.log(`  Calibrazione Bianco: ${config.calibration.white}`);
        }
    } else {
        console.log(`${sensorName} (${config.type} su ${config.port}) è DISABILITATO.`);
    }
}

checkAndReportSensor("Sensore Tattile", sensorConfig.touchSensor1);
checkAndReportSensor("Sensore Colore", sensorConfig.colorSensor1);
checkAndReportSensor("Sensore Ultrasuoni", sensorConfig.ultrasonicSensor1);
console.log("
");


// 4. Combinare configurazioni in un unico oggetto "stato" o "profilo" del robot
const robotProfile = {
    profileName: "LineFollowerBasic",
    general: robotBaseConfig, // Riferimento all'oggetto base
    motors: motorConfig,      // Riferimento alla configurazione motori
    sensors: {                // Selezioniamo solo i sensori attivi per questo profilo
        colorSensor: sensorConfig.colorSensor1,
        touchSensor: sensorConfig.touchSensor1
    },
    behaviorParameters: {
        baseSpeed: 30,
        turnAggressiveness: 0.65,
        stopOnTouch: true
    }
};

console.log("--- Profilo Robot: LineFollowerBasic ---");
console.log("Nome Profilo:", robotProfile.profileName);
console.log("Velocità Base Comportamento:", robotProfile.behaviorParameters.baseSpeed);
console.log("Porta Sensore Colore Attivo:", robotProfile.sensors.colorSensor.port);
console.log("Diametro Ruote (dal gen.):", robotProfile.general.wheelDiameterCm);

// Modificare una configurazione e vedere l'impatto
robotProfile.behaviorParameters.baseSpeed = 35;
console.log("Nuova Velocità Base Comportamento:", robotProfile.behaviorParameters.baseSpeed);
console.log("
");

/*
Applicazioni EV3:
- Definire diverse "personalità" o modalità per il robot (es. esploratore, lottatore di sumo,
  seguilinea), ognuna con il proprio set di parametri motore/sensore.
- Memorizzare i dati di calibrazione dei sensori.
- Impostare i parametri per algoritmi complessi (es. coefficienti PID per un seguilinea).
- Facilitare il caricamento/salvataggio di configurazioni da/su file (spesso usando JSON).
*/

// Esempio di come una funzione potrebbe usare tale configurazione
function startLineFollowing(profile) {
    console.log(`Avvio seguilinea con profilo "${profile.profileName}"`);
    console.log(`  Velocità: ${profile.behaviorParameters.baseSpeed}`);
    console.log(`  Sensore colore su: ${profile.sensors.colorSensor.port}`);
    console.log(`  Valore di bianco calibrato: ${profile.sensors.colorSensor.calibration.white}`);
    // Logica per avviare i motori e leggere il sensore colore usando i parametri del profilo
    // ev3.motorRun(profile.motors.leftMotor.port, profile.behaviorParameters.baseSpeed);
    // ev3.motorRun(profile.motors.rightMotor.port, profile.behaviorParameters.baseSpeed);
    // ...
}

startLineFollowing(robotProfile);
