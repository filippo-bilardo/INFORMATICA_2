// cache.js
// Sistema di cache con gestione eventi

const EventEmitter = require('events');

class Cache extends EventEmitter {
  constructor() {
    super();
    this.cache = {};
    this.ttl = {}; // Time to live per ogni elemento
    this.defaultTTL = 60 * 1000; // 60 secondi di default
    
    // Pulizia periodica della cache
    setInterval(() => this.cleanup(), 5 * 60 * 1000); // Ogni 5 minuti
  }

  // Ottiene un elemento dalla cache
  get(key) {
    if (this.has(key)) {
      this.emit('cache-hit', { key });
      return this.cache[key];
    }
    
    this.emit('cache-miss', { key });
    return null;
  }

  // Verifica se un elemento è presente in cache e non è scaduto
  has(key) {
    if (!(key in this.cache)) return false;
    
    // Verifica se l'elemento è scaduto
    if (this.ttl[key] && this.ttl[key] < Date.now()) {
      this.delete(key);
      return false;
    }
    
    return true;
  }

  // Aggiunge o aggiorna un elemento in cache
  set(key, value, ttl = this.defaultTTL) {
    this.cache[key] = value;
    
    // Imposta il tempo di scadenza
    if (ttl > 0) {
      this.ttl[key] = Date.now() + ttl;
    }
    
    this.emit('cache-set', { key });
    return true;
  }

  // Rimuove un elemento dalla cache
  delete(key) {
    if (key in this.cache) {
      delete this.cache[key];
      delete this.ttl[key];
      this.emit('cache-delete', { key });
      return true;
    }
    return false;
  }

  // Pulisce gli elementi scaduti dalla cache
  cleanup() {
    const now = Date.now();
    let deletedCount = 0;
    
    Object.keys(this.ttl).forEach(key => {
      if (this.ttl[key] < now) {
        delete this.cache[key];
        delete this.ttl[key];
        deletedCount++;
      }
    });
    
    if (deletedCount > 0) {
      this.emit('cache-cleanup', { deletedCount });
    }
    
    return deletedCount;
  }
}

module.exports = new Cache();