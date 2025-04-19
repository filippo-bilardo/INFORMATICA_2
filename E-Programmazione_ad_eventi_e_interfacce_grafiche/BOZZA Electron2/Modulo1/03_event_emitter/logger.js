// logger.js
// Esempio di utilizzo di EventEmitter per creare un sistema di logging

const EventEmitter = require('events');

// Creazione di una classe Logger che estende EventEmitter
class Logger extends EventEmitter {
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
    // Registra l'informazione
    console.info(`[INFO] ${new Date().toISOString()}: ${message}`);
    
    // Emetti un evento di info
    this.emit('info', { timestamp: new Date(), message });
  }
}

module.exports = Logger;

// Per utilizzare questo modulo, importarlo e creare un'istanza:
// const Logger = require('./logger');
// const logger = new Logger();
// logger.on('log', (data) => { /* gestione evento log */ });
// logger.log('Messaggio di log');