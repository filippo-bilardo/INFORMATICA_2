// Esercizio: Gestire configurazioni multiple per il comportamento del robot EV3

/*
Obiettivo:
Creare un sistema per definire e selezionare diverse configurazioni (profili)
per un robot EV3. Ogni configurazione può alterare parametri come velocità,
sensibilità dei sensori, o comportamenti specifici.

Questo script sarà una simulazione. Le funzioni che "applicano" le configurazioni
stamperanno solo a console.

Struttura Dati Suggerita:
Un oggetto principale che contiene diverse configurazioni, ognuna identificata
da un nome. Ogni configurazione sarà a sua volta un oggetto con vari parametri.

Esempio:
const robotProfiles = {
  "lineFollower": {
    motorSpeed: 40,
    turnSensitivity: 0.8,
    lineColorSensor: "S3",
    kp: 1.2, ki: 0.1, kd: 0.05 // Parametri PID
  },
  "obstacleAvoider": {
    motorSpeed: 60,
    ultrasonicSensor: "S4",
    minDistanceCm: 15,
    searchAngle: 45
  },
  "explorer": {
    motorSpeed: 30,
    exploreRadius: 100, // cm
    useLightSensorForDayNight: true
  }
};
*/

// --- Definizione dei Profili di Configurazione ---
const robotProfiles = {
  "lineFollower": {
    profileName: "Segui-Linea Veloce",
    motorSpeed: 50, // Percentuale
    turnSensitivity: 0.75, // Fattore per la sterzata
    lineColorSensorPort: "S3",
    lineThreshold: 45, // Valore di luce per distinguere linea/sfondo
    pid: { // Parametri per un controllo PID (opzionale, più avanzato)
      kp: 1.5,
      ki: 0.05,
      kd: 0.1
    },
    onDetectAction: () => console.log("ROBOT (Segui-Linea): Rilevata linea, adeguo traiettoria.")
  },
  "obstacleAvoider": {
    profileName: "Evita-Ostacoli Cauto",
    motorSpeed: 30,
    ultrasonicSensorPort: "S4",
    minDistanceCm: 20, // Distanza minima prima di reagire
    turnAngleDegrees: 90, // Angolo di sterzata per evitare
    searchScanSpeed: 20,
    onDetectAction: (distance) => console.log(`ROBOT (Evita-Ostacoli): Ostacolo a ${distance}cm! Cambio direzione.`)
  },
  "sumoWrestler": {
    profileName: "Lottatore di Sumo Aggressivo",
    motorSpeed: 80,
    attackSpeed: 100,
    edgeSensorPort: "S2", // Sensore per rilevare il bordo del ring
    opponentSearchPattern: "circular", // 'circular', 'random_scan'
    pushDurationMs: 2000,
    onDetectAction: () => console.log("ROBOT (Sumo): Avversario rilevato! Attacco!")
  },
  "idle": {
    profileName: "Modalità Riposo",
    motorSpeed: 0,
    ledPattern: "breathing_blue", // Pattern LED per indicare lo stato
    enableSleepMode: true,
    onDetectAction: () => console.log("ROBOT (Riposo): Zzz...")
  }
};

let currentRobotProfile = null;

// --- Funzioni per la Gestione dei Profili ---

/**
 * Seleziona e applica un profilo di configurazione al robot.
 * @param {string} profileName Il nome del profilo da attivare.
 */
function setActiveProfile(profileName) {
  if (robotProfiles.hasOwnProperty(profileName)) {
    currentRobotProfile = robotProfiles[profileName];
    console.log(`
--- PROFILO ATTIVATO: ${currentRobotProfile.profileName} ---`);
    console.log("Configurazione corrente:");
    // Stampa alcune proprietà chiave per dimostrazione
    for (const key in currentRobotProfile) {
      if (typeof currentRobotProfile[key] !== 'function') { // Non stampare le funzioni
        if (typeof currentRobotProfile[key] === 'object' && currentRobotProfile[key] !== null) {
          console.log(`  ${key}: ${JSON.stringify(currentRobotProfile[key])}`);
        } else {
          console.log(`  ${key}: ${currentRobotProfile[key]}`);
        }
      }
    }
    applyCurrentProfileSettings();
  } else {
    console.warn(`Profilo "${profileName}" non trovato.`);
    // Opzionalmente, si potrebbe tornare a un profilo di default o mantenere il precedente.
    if (!currentRobotProfile && robotProfiles["idle"]) {
        console.log("Impostazione profilo di default: Idle");
        setActiveProfile("idle");
    }
  }
}

/**
 * Simula l'applicazione delle impostazioni del profilo corrente al robot.
 * (In un EV3 reale, qui si interagirebbe con motori, sensori, LED, ecc.)
 */
function applyCurrentProfileSettings() {
  if (!currentRobotProfile) {
    console.log("Nessun profilo attivo da applicare.");
    return;
  }

  console.log(`
APPLICO IMPOSTAZIONI PER: ${currentRobotProfile.profileName}`);
  console.log(`  Velocità motori impostata a: ${currentRobotProfile.motorSpeed || 0}%`);
  // Esempio: configurazione LED se presente
  if (currentRobotProfile.ledPattern) {
    console.log(`  Pattern LED: ${currentRobotProfile.ledPattern}`);
    // In EV3: ev3.ledSetPattern(currentRobotProfile.ledPattern);
  }
  // Esempio: configurazione sensori se presenti
  if (currentRobotProfile.lineColorSensorPort) {
    console.log(`  Sensore colore per linea su porta: ${currentRobotProfile.lineColorSensorPort}`);
    console.log(`  Soglia linea: ${currentRobotProfile.lineThreshold}`);
    // In EV3: ev3.sensorConfigure(currentRobotProfile.lineColorSensorPort, 'COL-REFLECT');
  }
  if (currentRobotProfile.ultrasonicSensorPort) {
    console.log(`  Sensore ultrasuoni su porta: ${currentRobotProfile.ultrasonicSensorPort}`);
    console.log(`  Distanza minima: ${currentRobotProfile.minDistanceCm} cm`);
    // In EV3: ev3.sensorConfigure(currentRobotProfile.ultrasonicSensorPort, 'US-DIST-CM');
  }

  // Esegui l'azione di default del profilo, se definita
  if (typeof currentRobotProfile.onDetectAction === 'function') {
    // Per la simulazione, chiamiamola subito. In un caso reale, sarebbe legata a un evento.
    // currentRobotProfile.onDetectAction(); // Potrebbe richiedere argomenti specifici
  }
  console.log("Impostazioni applicate (simulazione).");
}

/**
 * Simula un evento rilevato dal robot (es. sensore attivato).
 * L'azione eseguita dipenderà dal profilo attivo.
 */
function simulateRobotEvent(eventData) {
  if (currentRobotProfile && typeof currentRobotProfile.onDetectAction === 'function') {
    console.log(`
EVENTO RILEVATO (Profilo: ${currentRobotProfile.profileName}):`);
    currentRobotProfile.onDetectAction(eventData); // Passa eventData se l'azione lo usa
  } else {
    console.log("
EVENTO RILEVATO: Nessuna azione specifica definita per il profilo corrente o nessun profilo attivo.");
  }
}

/**
 * Aggiunge un nuovo profilo al sistema o aggiorna uno esistente.
 * @param {string} name Nome del profilo.
 * @param {object} config Oggetto di configurazione del profilo.
 */
function addOrUpdateProfile(name, config) {
    if (!config.profileName) {
        config.profileName = name; // Assicura che profileName sia presente
    }
    robotProfiles[name] = config;
    console.log(`Profilo "${name}" aggiunto/aggiornato.`);
    // Se il profilo aggiornato è quello corrente, riapplicalo
    if (currentRobotProfile && currentRobotProfile.profileName === config.profileName) {
        console.log("Il profilo attivo è stato aggiornato. Riapplicazione delle impostazioni.");
        setActiveProfile(name);
    }
}

// --- Esecuzione dell'Esercizio ---

// 1. Attiva un profilo e vedi le impostazioni
setActiveProfile("lineFollower");

// 2. Simula un evento per il profilo lineFollower
simulateRobotEvent(); // Non passa dati specifici, l'azione di lineFollower non li richiede

// 3. Cambia profilo
setActiveProfile("obstacleAvoider");

// 4. Simula un evento per il profilo obstacleAvoider, passando dati rilevanti
simulateRobotEvent(18); // Simula rilevamento ostacolo a 18 cm

// 5. Prova ad attivare un profilo non esistente
setActiveProfile("nonExistentProfile");

// 6. Attiva il profilo di default "idle" (se non già fatto dal fallback)
if (!currentRobotProfile) setActiveProfile("idle");
simulateRobotEvent();

// 7. Aggiungere un nuovo profilo dinamicamente
const newExplorerProfile = {
    profileName: "Esploratore Cauto",
    motorSpeed: 25,
    exploreAreaWidth: 200, // cm
    exploreAreaHeight: 150, // cm
    useBumperForObstacles: true,
    bumperSensorPort: "S1",
    onDetectAction: (obstacleType) => console.log(`ROBOT (Esploratore): Trovato ${obstacleType || 'ostacolo generico'}. Manovra evasiva.`)
};
addOrUpdateProfile("explorerV2", newExplorerProfile);
setActiveProfile("explorerV2");
simulateRobotEvent("muro");


// 8. Modificare un profilo esistente e riattivarlo
const updatedLineFollower = {
    ...robotProfiles.lineFollower, // Copia il vecchio profilo
    profileName: "Segui-Linea Preciso",
    motorSpeed: 35, // Riduci velocità per precisione
    pid: { ...robotProfiles.lineFollower.pid, kp: 1.8 } // Aumenta Kp
};
addOrUpdateProfile("lineFollower", updatedLineFollower); // Sovrascrive il vecchio "lineFollower"

// Se lineFollower era attivo, dovrebbe riapplicarsi. Altrimenti, attivalo per vedere le modifiche.
// setActiveProfile("lineFollower");


/*
Suggerimenti per l'espansione:
- Salvare e caricare i profili da/in un file JSON.
- Creare un'interfaccia (es. comandi da console, o pulsanti sull'EV3) per cambiare profilo.
- Rendere le funzioni `onDetectAction` più complesse e interattive.
- Per un EV3 reale:
    - Integrare con le API EV3 per controllare motori, leggere sensori, cambiare LED.
    - Gestire loop di controllo specifici per ogni profilo (es. un loop per seguire la linea,
      un altro per evitare ostacoli).
*/

console.log("
--- Profili disponibili ---");
for(const profileKey in robotProfiles) {
    console.log(`- ${profileKey} (${robotProfiles[profileKey].profileName})`);
}
