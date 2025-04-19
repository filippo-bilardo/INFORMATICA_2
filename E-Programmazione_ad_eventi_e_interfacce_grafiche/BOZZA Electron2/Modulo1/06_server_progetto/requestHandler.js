// requestHandler.js
// Gestione delle richieste HTTP con routing ed eventi

const url = require('url');
const EventEmitter = require('events');
const logger = require('./logger');
const cache = require('./cache');

class RequestHandler extends EventEmitter {
  constructor() {
    super();
    this.routes = {
      GET: {},
      POST: {},
      PUT: {},
      DELETE: {}
    };
    
    // Registrazione degli handler predefiniti
    this.registerRoute('GET', 'api/data', this.getData.bind(this));
    this.registerRoute('POST', 'api/data', this.postData.bind(this));
  }

  // Registra una nuova rotta
  registerRoute(method, path, handler) {
    this.routes[method][path] = handler;
    this.emit('route-registered', { method, path });
  }

  // Gestisce una richiesta HTTP
  handleRequest(req, res, method, path, queryParams) {
    this.emit('request-received', { method, path });
    
    // Verifica se esiste un handler per la rotta richiesta
    if (this.routes[method] && this.routes[method][path]) {
      // Esegue l'handler della rotta
      this.routes[method][path](req, res, queryParams);
    } else {
      // Rotta non trovata
      this.handleNotFound(res, method, path);
    }
  }

  // Handler per rotte non trovate
  handleNotFound(res, method, path) {
    this.emit('not-found', { method, path });
    
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Not Found',
      message: `La rotta ${method} ${path} non esiste`
    }));
  }

  // Handler per GET /api/data
  getData(req, res, queryParams) {
    const cacheKey = `data_${JSON.stringify(queryParams)}`;
    
    // Verifica se i dati sono in cache
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      this.emit('data-served-from-cache', { query: queryParams });
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(cachedData));
      return;
    }
    
    // Simula il recupero dei dati
    const data = {
      timestamp: new Date().toISOString(),
      query: queryParams,
      results: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
      ]
    };
    
    try {
      // Salva i dati in cache
      cache.set(cacheKey, data);
      
      this.emit('data-served', { query: queryParams });
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } catch (error) {
      this.emit('data-processing-error', { error: error.message });
      
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Internal Server Error',
        message: error.message
      }));
    }
  }

  // Handler per POST /api/data
  postData(req, res, queryParams) {
    let body = '';
    
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        
        // Elabora i dati
        const processedData = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          ...data
        };
        
        this.emit('data-processed', { data: processedData });
        
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(processedData));
      } catch (error) {
        this.emit('data-processing-error', { error: error.message });
        
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: 'Bad Request',
          message: error.message
        }));
      }
    });
  }
}

module.exports = new RequestHandler();