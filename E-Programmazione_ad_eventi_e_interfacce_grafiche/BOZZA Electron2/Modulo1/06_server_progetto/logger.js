// logger.js
// Modulo per il logging con gestione eventi

const EventEmitter = require('events');

class Logger extends EventEmitter {
  constructor() {
    super();
  }

  log(message) {
    // Registra il messaggio
    console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
    
    // Emetti un evento di log
    this.emit('log', { timestamp: new Date(), message });
  }
  
  error(message) {
    // Registra l'errore
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
    
    // Emetti un evento di errore
    this.emit('error', { timestamp: new Date(), message });
  }

  info(message) {
    // Registra informazioni
    console.info(`[INFO] ${new Date().toISOString()}: ${message}`);
    
    // Emetti un evento di info
    this.emit('info', { timestamp: new Date(), message });
  }
}

module.exports = new Logger();