// Esercizio: Implementare la memorizzazione e riproduzione di percorsi per l'EV3

/*
Obiettivo:
Scrivere un programma JavaScript che permetta di:
1. Memorizzare una sequenza di comandi di movimento (es. "avanti per X cm", "gira a destra di Y gradi").
2. Riprodurre la sequenza di movimenti memorizzata.
3. (Opzionale) Salvare e caricare il percorso da/in una struttura JSON.

Questo script sarà una simulazione. Le funzioni `moveForwardCm`, `turnDegrees`, ecc.,
stamperanno solo a console ciò che il robot farebbe.

Struttura Dati Suggerita:
Un array di oggetti, dove ogni oggetto rappresenta un passo del percorso.
Esempio:
[
  { command: "forward", value: 20 }, // avanti di 20 cm
  { command: "turn", value: 90 },    // gira di 90 gradi (positivo = destra, negativo = sinistra)
  { command: "beep" }
]
*/

let recordedPath = [];

// --- Funzioni di Movimento Simulate ---
function moveForwardCm(distance) {
  console.log(`ROBOT: Muove avanti di ${distance} cm.`);
  // In un EV3 reale: calcolare rotazioni motore basate su 'distance' e diametro ruota, poi avviare motori.
}

function turnDegrees(angle) {
  const direction = angle > 0 ? "destra" : "sinistra";
  console.log(`ROBOT: Gira a ${direction} di ${Math.abs(angle)} gradi.`);
  // In un EV3 reale: calcolare rotazioni differenziali per la sterzata.
}

function beep() {
  console.log("ROBOT: Beep!");
  // In un EV3 reale: ev3.soundBeep();
}

// --- Funzioni per la Gestione del Percorso ---

/**
 * Aggiunge un comando di movimento al percorso registrato.
 * @param {string} command Il tipo di comando (es. "forward", "turn", "beep").
 * @param {number} [value] Il valore associato al comando (es. distanza, angolo).
 */
function recordStep(command, value) {
  const step = { command };
  if (value !== undefined) {
    step.value = value;
  }
  recordedPath.push(step);
  console.log(`REGISTRATO: ${command}${value !== undefined ? ' (' + value + ')' : ''}`);
}

/**
 * Riproduce il percorso registrato.
 */
function playbackPath() {
  if (recordedPath.length === 0) {
    console.log("Nessun percorso registrato da riprodurre.");
    return;
  }
  console.log("
--- INIZIO RIPRODUZIONE PERCORSO ---");
  recordedPath.forEach((step, index) => {
    console.log(`Passo ${index + 1}/${recordedPath.length}: Comando ${step.command}`);
    switch (step.command) {
      case "forward":
        moveForwardCm(step.value);
        break;
      case "turn":
        turnDegrees(step.value);
        break;
      case "beep":
        beep();
        break;
      default:
        console.warn(`Comando sconosciuto nel percorso: ${step.command}`);
    }
    // Simula un po' di tempo per l'esecuzione del comando
    // In un sistema reale, aspetteresti il completamento del movimento.
    // Per la simulazione, possiamo aggiungere un piccolo delay o semplicemente continuare.
  });
  console.log("--- FINE RIPRODUZIONE PERCORSO ---
");
}

/**
 * Resetta il percorso registrato.
 */
function clearPath() {
  recordedPath = [];
  console.log("Percorso cancellato.");
}

// --- (Opzionale) Funzioni per Salvare/Caricare JSON ---

/**
 * Converte il percorso registrato in una stringa JSON.
 * @returns {string} Il percorso come stringa JSON.
 */
function savePathToJson() {
  if (recordedPath.length === 0) {
    console.warn("Nessun percorso da salvare.");
    return null;
  }
  const jsonPath = JSON.stringify(recordedPath, null, 2); // null, 2 per pretty print
  console.log("Percorso convertito in JSON:");
  console.log(jsonPath);
  return jsonPath;
  // In un EV3 reale, potresti scrivere questa stringa in un file:
  // fs.writeFileSync("percorso_salvato.json", jsonPath);
}

/**
 * Carica un percorso da una stringa JSON.
 * @param {string} jsonPath La stringa JSON rappresentante il percorso.
 */
function loadPathFromJson(jsonPath) {
  try {
    const parsedPath = JSON.parse(jsonPath);
    if (Array.isArray(parsedPath)) {
      recordedPath = parsedPath;
      console.log("Percorso caricato da JSON con successo.");
      playbackPath(); // Opzionale: riproduci subito dopo il caricamento
    } else {
      console.error("Errore: Il JSON fornito non è un array di percorso valido.");
    }
  } catch (error) {
    console.error("Errore durante il parsing del JSON del percorso:", error);
  }
}


// --- Esecuzione dell'Esercizio ---

console.log("--- REGISTRAZIONE NUOVO PERCORSO ---");
recordStep("forward", 30); // Avanti di 30 cm
recordStep("turn", 90);    // Gira a destra di 90 gradi
recordStep("forward", 15); // Avanti di 15 cm
recordStep("beep");
recordStep("turn", -45);   // Gira a sinistra di 45 gradi
recordStep("forward", 20);

// Mostra il percorso registrato (struttura dati)
console.log("
Percorso Registrato Attualmente:");
console.log(recordedPath);

// Riproduci il percorso
playbackPath();

// Salva il percorso in JSON (simulazione)
const savedJson = savePathToJson();

// Cancella il percorso corrente
clearPath();
playbackPath(); // Dovrebbe dire che non c'è nulla

// Carica il percorso dal JSON salvato (simulazione)
if (savedJson) {
  console.log("
--- CARICAMENTO PERCORSO DA JSON ---");
  loadPathFromJson(savedJson);
}

// Esempio di un percorso JSON "cattivo" per testare il caricamento
const badJson = '{"not": "a path array"}';
console.log("
--- TENTATIVO CARICAMENTO JSON NON VALIDO ---");
loadPathFromJson(badJson);

const anotherBadJson = '[{"command": "jump", "height": 100}]'; // Comando non gestito
console.log("
--- TENTATIVO CARICAMENTO JSON CON COMANDI SCONOSCIUTI ---");
loadPathFromJson(anotherBadJson);


/*
Suggerimenti per l'espansione (se vuoi andare oltre):
- Aggiungere comandi più complessi (es. "driveToXY", "setMotorSpeed").
- Implementare una semplice interfaccia utente (es. prompt da console) per registrare i passi.
- Per un EV3 reale:
    - Usare le API del linguaggio EV3 (es. ev3dev-lang-js, o quello che usi) per i movimenti.
    - Gestire l'attesa del completamento di ogni movimento prima di passare al successivo.
    - Leggere/scrivere file JSON dal filesystem dell'EV3.
*/
