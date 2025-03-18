// index.js
// File principale del server con gestione eventi personalizzati

const http = require('http');
const url = require('url');
const logger = require('./logger');
const requestHandler = require('./requestHandler');
const cache = require('./cache');

// Porta del server
const PORT = 3000;

// Creazione del server HTTP
const server = http.createServer((req, res) => {
  // Parsing dell'URL
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  const method = req.method.toUpperCase();
  const queryParams = parsedUrl.query;
  
  // Log della richiesta
  logger.log(`Richiesta ricevuta: ${method} ${path}`);
  
  // Gestione della richiesta tramite il RequestHandler
  requestHandler.handleRequest(req, res, method, trimmedPath, queryParams);
});

// Avvio del server
server.listen(PORT, () => {
  logger.log(`Server in ascolto sulla porta ${PORT}`);
});

// Gestione degli eventi del server
server.on('error', (err) => {
  logger.error(`Errore del server: ${err.message}`);
});

server.on('close', () => {
  logger.log('Server chiuso');
});

// Gestione degli eventi di cache
cache.on('cache-hit', (data) => {
  logger.info(`Cache hit per la chiave: ${data.key}`);
});

cache.on('cache-miss', (data) => {
  logger.info(`Cache miss per la chiave: ${data.key}`);
});

cache.on('cache-set', (data) => {
  logger.info(`Nuovo elemento aggiunto in cache con chiave: ${data.key}`);
});

cache.on('cache-delete', (data) => {
  logger.info(`Elemento rimosso dalla cache con chiave: ${data.key}`);
});

cache.on('cache-cleanup', (data) => {
  logger.info(`Pulizia cache completata: ${data.deletedCount} elementi rimossi`);
});

// Gestione degli eventi di log
logger.on('log', (data) => {
  // Qui si potrebbe implementare la scrittura su file o l'invio a un servizio esterno
  console.log(`[LOG HANDLER] ${data.timestamp.toISOString()}: ${data.message}`);
});

logger.on('error', (data) => {
  // Qui si potrebbe implementare la notifica degli errori
  console.error(`[ERROR HANDLER] ${data.timestamp.toISOString()}: ${data.message}`);
});

// Per eseguire: node index.js
// Nota: assicurarsi di essere nella directory 06_server_progetto