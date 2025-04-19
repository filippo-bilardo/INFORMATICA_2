// app.js
// Esempio di utilizzo della classe Logger basata su EventEmitter

const Logger = require('./logger');

// Creazione di un'istanza del logger
const logger = new Logger();

// Registrazione dei listener per gli eventi
logger.on('log', (data) => {
  console.log(`LISTENER LOG: Ricevuto messaggio di log: "${data.message}" alle ${data.timestamp.toLocaleTimeString()}`);
});

logger.on('error', (data) => {
  console.log(`LISTENER ERROR: Attenzione! Errore: "${data.message}" alle ${data.timestamp.toLocaleTimeString()}`);
});

logger.on('info', (data) => {
  console.log(`LISTENER INFO: Informazione: "${data.message}" alle ${data.timestamp.toLocaleTimeString()}`);
});

// Utilizzo del logger per generare eventi
console.log('\nInizio test del logger:');
logger.log('Applicazione avviata');
logger.info('Sistema operativo: ' + process.platform);

// Simulazione di un errore
try {
  const x = 10;
  const y = 0;
  if (y === 0) throw new Error('Divisione per zero');
  const result = x / y;
} catch (err) {
  logger.error(err.message);
}

logger.info('Versione Node.js: ' + process.version);
logger.log('Applicazione terminata');

// Per eseguire: node app.js
// Nota: assicurarsi di essere nella directory 03_event_emitter