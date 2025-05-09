// Esempio 05: Sistema di Logging Avanzato per Debug e Analisi

brick.showString("Esempio Logging Avanzato", 1);

// In applicazioni complesse, un buon sistema di logging è cruciale.
// MakeCode EV3 non ha un sistema di logging su file persistente come in altri ambienti,
// ma possiamo simulare un logger che scrive sul display o invia dati via Bluetooth (se configurato).
// Questo esempio si concentrerà sulla visualizzazione e sulla strutturazione dei log.

// === Livelli di Logging ===
// Definiamo dei livelli di logging per poter filtrare i messaggi.
const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  NONE: 4 // Per disabilitare tutti i log
};

// Imposta il livello di logging corrente (es. mostra solo INFO e superiori)
let currentLogLevel = LogLevel.INFO;

// Buffer per i messaggi di log da visualizzare (limitato per il display EV3)
let logBuffer = [];
const MAX_LOG_LINES_DISPLAY = 5; // Numero massimo di righe di log sul display
const LOG_START_ROW = 3; // Riga del display da cui iniziare a mostrare i log

// Funzione di logging principale
function log(level, message) {
  if (level < currentLogLevel) {
    return; // Non loggare messaggi sotto il livello corrente
  }

  let levelStr = "";
  switch (level) {
    case LogLevel.DEBUG: levelStr = "DBG"; break;
    case LogLevel.INFO:  levelStr = "INF"; break;
    case LogLevel.WARN:  levelStr = "WRN"; break;
    case LogLevel.ERROR: levelStr = "ERR"; break;
    default: levelStr = "LOG"; break;
  }

  // Aggiungi timestamp (semplificato, tempo dall'avvio del programma)
  let timestamp = control.millis() / 1000; // Secondi
  let logMessage = timestamp.toFixed(1) + "s [" + levelStr + "]: " + message;

  // Aggiungi al buffer
  logBuffer.push(logMessage);
  if (logBuffer.length > MAX_LOG_LINES_DISPLAY) {
    logBuffer.shift(); // Rimuovi il messaggio più vecchio se il buffer è pieno
  }

  // Aggiorna il display
  updateLogDisplay();
}

// Funzione per aggiornare il display con i log
function updateLogDisplay() {
  // Pulisce le righe precedenti dei log
  for (let i = 0; i < MAX_LOG_LINES_DISPLAY; i++) {
    brick.showString("                    ", LOG_START_ROW + i); // Stringa vuota per pulire
  }

  // Mostra i log più recenti
  for (let i = 0; i < logBuffer.length; i++) {
    brick.showString(logBuffer[i].substring(0, 20), LOG_START_ROW + i); // Limita lunghezza per display
  }
}

// === Esempi di Utilizzo del Logger ===

log(LogLevel.INFO, "Inizio programma.");
pause(1000);

// Esempio di operazione con log di debug
let sensorValue = sensors.ultrasonic1.distance();
log(LogLevel.DEBUG, "Lettura sensore: " + sensorValue);
pause(500);

if (sensorValue < 20) {
  log(LogLevel.WARN, "Ostacolo vicino: " + sensorValue + "cm");
  motors.largeBC.stop();
} else {
  log(LogLevel.INFO, "Percorso libero.");
  motors.largeBC.run(50);
}
pause(1500);
motors.largeBC.stop();

// Cambia il livello di logging per mostrare anche i messaggi di DEBUG
brick.showString("Log Level: DEBUG", 2);
currentLogLevel = LogLevel.DEBUG;
pause(1000);

log(LogLevel.DEBUG, "Debug mode attivato.");
pause(1000);

let complexObject = {
  id: 123,
  status: "PROCESSING",
  dataPoints: [10, 12, 9]
};

// Per loggare oggetti, potremmo aver bisogno di una forma di serializzazione
// Semplifichiamo mostrando solo una parte o un riassunto
log(LogLevel.DEBUG, "Oggetto: id=" + complexObject.id + " status=" + complexObject.status);
pause(1000);

// Esempio di errore
function riskyOperation(value) {
  if (value === 0) {
    log(LogLevel.ERROR, "Divisione per zero tentata!");
    return null;
  }
  return 100 / value;
}

riskyOperation(5);
riskyOperation(0); // Questo causerà un log di ERRORE
pause(2000);

log(LogLevel.INFO, "Fine programma.");

// Considerazioni aggiuntive per un logging avanzato (oltre la visualizzazione su display):
// 1. Logging su File (non direttamente supportato da MakeCode EV3 in modo semplice):
//    In ambienti più potenti, i log verrebbero scritti su file di testo.
//    Su EV3, si potrebbe pensare di usare 'storage' per log molto brevi e critici,
//    ma è estremamente limitato.

// 2. Logging via Bluetooth o USB:
//    È possibile inviare stringhe di log a un computer connesso via Bluetooth o USB.
//    Questo richiede un'applicazione ricevente sul computer.
//    Esempio concettuale (richiede setup specifico):
//    bluetooth.uartWriteString(logMessage + "\n");

// 3. Formato Strutturato (es. JSON):
//    Per analisi automatizzata, i log possono essere formattati in JSON.
//    let jsonLog = JSON.stringify({ timestamp: control.millis(), level: levelStr, message: message });
//    (Verificare supporto JSON.stringify in MakeCode)

// 4. Rotazione dei Log / Buffer Circolare:
//    Il nostro `logBuffer` implementa una forma semplice di buffer circolare per il display.

// Questo esempio fornisce una base per un logging più informativo sul display dell'EV3.
// Adattalo e espandilo secondo le necessità del tuo progetto.

brick.showString("Fine Esempio Logging", 1);