```javascript
module.exports = new RequestHandler();
```

#### index.js
```javascript
const http = require('http');
const RequestHandler = require('./requestHandler');
const logger = require('./logger');
const cache = require('./cache');

// Creazione del server HTTP
const server = http.createServer((req, res) => {
  RequestHandler.handleRequest(req, res);
});

// Porta su cui il server ascolterà
const PORT = process.env.PORT || 3000;

// Avvio del server
server.listen(PORT, () => {
  logger.log(`Server in ascolto sulla porta ${PORT}`);
});

// Gestione degli eventi del RequestHandler
RequestHandler.on('route-registered', ({ method, path }) => {
  logger.log(`Evento: Rotta ${method} ${path} registrata`);
});

RequestHandler.on('request-received', ({ method, path }) => {
  logger.log(`Evento: Richiesta ${method} ${path} ricevuta`);
});

RequestHandler.on('data-served-from-cache', ({ query }) => {
  logger.log(`Evento: Dati serviti dalla cache per la query ${JSON.stringify(query)}`);
});

RequestHandler.on('data-served', ({ query }) => {
  logger.log(`Evento: Dati serviti per la query ${JSON.stringify(query)}`);
});

RequestHandler.on('data-processed', ({ data }) => {
  logger.log(`Evento: Dati elaborati con successo: ${JSON.stringify(data)}`);
});

RequestHandler.on('data-processing-error', ({ error }) => {
  logger.error(`Evento: Errore nell'elaborazione dei dati: ${error}`);
});

RequestHandler.on('not-found', ({ path, method }) => {
  logger.error(`Evento: Risorsa non trovata: ${method} ${path}`);
});

// Gestione degli eventi della cache
cache.on('cache-hit', ({ key }) => {
  logger.log(`Evento: Cache hit per la chiave ${key}`);
});

cache.on('cache-miss', ({ key }) => {
  logger.log(`Evento: Cache miss per la chiave ${key}`);
});

cache.on('cache-set', ({ key }) => {
  logger.log(`Evento: Elemento aggiunto alla cache con chiave ${key}`);
});

cache.on('cache-expired', ({ key }) => {
  logger.log(`Evento: Elemento scaduto nella cache con chiave ${key}`);
});

cache.on('cache-delete', ({ key }) => {
  logger.log(`Evento: Elemento eliminato dalla cache con chiave ${key}`);
});

cache.on('cache-cleanup', ({ deletedCount }) => {
  logger.log(`Evento: Pulizia della cache completata, ${deletedCount} elementi eliminati`);
});

// Gestione degli eventi del logger
logger.on('log', ({ timestamp, message }) => {
  // Qui potresti salvare i log su un file o inviarli a un servizio esterno
  console.log(`[${timestamp.toISOString()}] LOG: ${message}`);
});

logger.on('error', ({ timestamp, message }) => {
  // Qui potresti salvare gli errori su un file separato o inviarli a un servizio di monitoraggio
  console.error(`[${timestamp.toISOString()}] ERROR: ${message}`);
});

// Gestione della chiusura del server
process.on('SIGINT', () => {
  logger.log('Server in fase di arresto...');
  server.close(() => {
    logger.log('Server arrestato');
    process.exit(0);
  });
});
```

### Diagramma di flusso

```
+----------------+     +----------------+     +----------------+
|                |     |                |     |                |
|  HTTP Request  +---->+  RequestHandler+---->+  Route Handler |
|                |     |                |     |                |
+----------------+     +-------+--------+     +-------+--------+
                               |                      |
                               v                      v
                       +-------+--------+     +------+---------+
                       |                |     |                |
                       |  Event Emitter |     |  Cache System  |
                       |                |     |                |
                       +-------+--------+     +----------------+
                               |
                               v
                       +-------+--------+
                       |                |
                       |  Logger System |
                       |                |
                       +----------------+
```

### Esercizi guidati

1. **Aggiungere un nuovo endpoint**
   Estendi il server aggiungendo un endpoint `/api/stats` che restituisce statistiche sul server (numero di richieste, hit/miss della cache, ecc.).

2. **Implementare un sistema di autenticazione**
   Crea un middleware di autenticazione che verifica un token JWT nelle richieste e emette eventi appropriati.

3. **Aggiungere supporto per WebSocket**
   Integra il modulo `ws` per aggiungere supporto WebSocket al server e implementa un sistema di notifiche in tempo reale.

### Quiz di autovalutazione

1. Quale delle seguenti affermazioni sull'event loop di Node.js è corretta?
   - a) L'event loop esegue operazioni I/O in modo sincrono
   - b) L'event loop permette a Node.js di eseguire operazioni I/O non bloccanti
   - c) L'event loop è multi-threaded
   - d) L'event loop è disponibile solo nelle versioni più recenti di Node.js

2. Quale metodo della classe EventEmitter viene utilizzato per registrare un listener per un evento?
   - a) `addEventListener`
   - b) `on`
   - c) `register`
   - d) `listen`

3. Quale delle seguenti è una caratteristica del modello event-driven?
   - a) Esecuzione sequenziale del codice
   - b) Flusso del programma determinato da eventi
   - c) Operazioni I/O sempre bloccanti
   - d) Utilizzo esclusivo di programmazione sincrona

4. In Node.js, quale dei seguenti è un esempio di operazione asincrona?
   - a) `console.log()`
   - b) `fs.readFileSync()`
   - c) `fs.readFile()`
   - d) `process.exit()`

5. Quale dei seguenti NON è un tipo di modulo in Node.js?
   - a) Moduli core
   - b) Moduli locali
   - c) Moduli di terze parti
   - d) Moduli virtuali

### Best practices

1. **Gestione degli errori**
   - Utilizza sempre try/catch per gestire le eccezioni nelle operazioni sincrone
   - Gestisci sempre gli errori nei callback e nelle promise
   - Emetti eventi di errore per notificare i problemi

2. **Organizzazione del codice**
   - Separa la logica in moduli distinti con responsabilità ben definite
   - Utilizza classi che estendono EventEmitter per componenti che emettono eventi
   - Mantieni i file di piccole dimensioni e con una singola responsabilità

3. **Performance**
   - Evita operazioni bloccanti nel thread principale
   - Utilizza la cache per dati frequentemente acceduti
   - Implementa meccanismi di throttling per operazioni intensive

4. **Sicurezza**
   - Valida sempre gli input degli utenti
   - Utilizza HTTPS per le comunicazioni
   - Implementa meccanismi di rate limiting

### Consigli e trucchi

1. **Debugging**
   - Utilizza `console.log()` strategicamente per tracciare il flusso del programma
   - Sfrutta il modulo `debug` per log condizionali
   - Usa strumenti come Node Inspector per il debugging avanzato

2. **Gestione della memoria**
   - Fai attenzione alle closure che possono causare memory leak
   - Utilizza WeakMap e WeakSet per riferimenti che non impediscono il garbage collection
   - Monitora l'utilizzo della memoria con strumenti come `process.memoryUsage()`

3. **Ottimizzazione**
   - Utilizza `setImmediate()` invece di `setTimeout(0)` per eseguire operazioni nel prossimo tick dell'event loop
   - Sfrutta il modulo `cluster` per sfruttare tutti i core della CPU
   - Implementa strategie di backoff esponenziale per le operazioni di retry

## Risorse supplementari

### Documentazione ufficiale
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [EventEmitter API](https://nodejs.org/api/events.html)
- [HTTP Module](https://nodejs.org/api/http.html)

### Articoli e tutorial
- [Understanding the Node.js Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [Node.js Event-Driven Architecture](https://www.freecodecamp.org/news/understanding-node-js-event-driven-architecture/)
- [Creating a RESTful API with Node.js](https://www.toptal.com/nodejs/secure-rest-api-in-nodejs)

### Video
- [Node.js Crash Course](https://www.youtube.com/watch?v=