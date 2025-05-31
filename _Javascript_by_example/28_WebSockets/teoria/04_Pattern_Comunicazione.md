# Pattern di Comunicazione con WebSockets

## Introduzione ai Pattern di Comunicazione

I WebSockets forniscono un canale di comunicazione bidirezionale, ma per utilizzarli efficacemente nelle applicazioni reali è necessario implementare pattern di comunicazione strutturati. Questi pattern definiscono come i messaggi vengono scambiati tra client e server, consentendo di organizzare il flusso di dati in modo prevedibile e scalabile.

In questa guida, esploreremo i pattern di comunicazione più comuni utilizzati nelle applicazioni WebSocket, con esempi pratici di implementazione.

## Pattern Publish/Subscribe (Pub/Sub)

Il pattern Publish/Subscribe è uno dei più utilizzati nelle applicazioni WebSocket. In questo modello:

- I client si "iscrivono" (subscribe) a specifici "argomenti" (topics)
- I publisher inviano messaggi relativi a questi argomenti
- Il server distribuisce i messaggi solo ai client iscritti agli argomenti corrispondenti

Questo pattern è particolarmente utile per applicazioni come chat room, feed di notizie, aggiornamenti di mercato e notifiche in tempo reale.

### Implementazione lato client

```javascript
class PubSubClient {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.subscriptions = new Set();
    this.messageHandlers = new Map();
    this.connect();
  }
  
  connect() {
    this.socket = new WebSocket(this.url);
    
    this.socket.onopen = () => {
      console.log('Connessione stabilita');
      // Ripristina le sottoscrizioni dopo la riconnessione
      this.subscriptions.forEach(topic => {
        this.subscribe(topic);
      });
    };
    
    this.socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        
        if (message.topic && this.messageHandlers.has(message.topic)) {
          // Inoltra il messaggio ai gestori registrati per questo topic
          const handlers = this.messageHandlers.get(message.topic);
          handlers.forEach(handler => handler(message.data));
        }
      } catch (error) {
        console.error('Errore nell\'elaborazione del messaggio:', error);
      }
    };
    
    this.socket.onclose = () => {
      console.log('Connessione chiusa, tentativo di riconnessione...');
      setTimeout(() => this.connect(), 3000);
    };
  }
  
  subscribe(topic) {
    if (this.socket.readyState === WebSocket.OPEN) {
      const message = {
        action: 'subscribe',
        topic: topic
      };
      this.socket.send(JSON.stringify(message));
      this.subscriptions.add(topic);
    }
  }
  
  unsubscribe(topic) {
    if (this.socket.readyState === WebSocket.OPEN) {
      const message = {
        action: 'unsubscribe',
        topic: topic
      };
      this.socket.send(JSON.stringify(message));
      this.subscriptions.delete(topic);
      this.messageHandlers.delete(topic);
    }
  }
  
  publish(topic, data) {
    if (this.socket.readyState === WebSocket.OPEN) {
      const message = {
        action: 'publish',
        topic: topic,
        data: data
      };
      this.socket.send(JSON.stringify(message));
    }
  }
  
  on(topic, callback) {
    if (!this.messageHandlers.has(topic)) {
      this.messageHandlers.set(topic, new Set());
    }
    this.messageHandlers.get(topic).add(callback);
    
    // Sottoscrivi automaticamente se non lo sei già
    if (!this.subscriptions.has(topic)) {
      this.subscribe(topic);
    }
  }
  
  off(topic, callback) {
    if (this.messageHandlers.has(topic)) {
      this.messageHandlers.get(topic).delete(callback);
      if (this.messageHandlers.get(topic).size === 0) {
        this.unsubscribe(topic);
      }
    }
  }
}

// Esempio di utilizzo
const client = new PubSubClient('wss://example.com/pubsub');

// Sottoscrizione a un topic
client.on('chat/room1', (data) => {
  console.log('Nuovo messaggio in room1:', data);
});

// Pubblicazione su un topic
client.publish('chat/room1', {
  user: 'Mario',
  message: 'Ciao a tutti!',
  timestamp: Date.now()
});
```

### Implementazione lato server (Node.js con ws)

```javascript
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

// Gestione delle sottoscrizioni
const subscriptions = new Map(); // Map<topic, Set<WebSocket>>

server.on('connection', (socket) => {
  console.log('Nuovo client connesso');
  
  socket.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      switch (data.action) {
        case 'subscribe':
          handleSubscribe(socket, data.topic);
          break;
        case 'unsubscribe':
          handleUnsubscribe(socket, data.topic);
          break;
        case 'publish':
          handlePublish(data.topic, data.data);
          break;
      }
    } catch (error) {
      console.error('Errore nell\'elaborazione del messaggio:', error);
    }
  });
  
  socket.on('close', () => {
    // Rimuovi tutte le sottoscrizioni quando il client si disconnette
    subscriptions.forEach((clients, topic) => {
      clients.delete(socket);
      if (clients.size === 0) {
        subscriptions.delete(topic);
      }
    });
  });
});

function handleSubscribe(socket, topic) {
  if (!subscriptions.has(topic)) {
    subscriptions.set(topic, new Set());
  }
  subscriptions.get(topic).add(socket);
  console.log(`Client sottoscritto al topic: ${topic}`);
}

function handleUnsubscribe(socket, topic) {
  if (subscriptions.has(topic)) {
    subscriptions.get(topic).delete(socket);
    if (subscriptions.get(topic).size === 0) {
      subscriptions.delete(topic);
    }
    console.log(`Client rimosso dal topic: ${topic}`);
  }
}

function handlePublish(topic, data) {
  if (subscriptions.has(topic)) {
    const message = JSON.stringify({
      topic: topic,
      data: data
    });
    
    subscriptions.get(topic).forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
    
    console.log(`Messaggio pubblicato sul topic ${topic} a ${subscriptions.get(topic).size} client`);
  }
}
```

## Pattern Request/Response

Il pattern Request/Response emula il tradizionale modello HTTP in cui un client invia una richiesta e attende una risposta specifica. Questo pattern è utile quando è necessario ottenere dati specifici o eseguire operazioni sul server.

A differenza di HTTP, con WebSocket entrambe le parti possono iniziare una richiesta, quindi sia il client che il server possono agire come richiedenti o rispondenti.

### Implementazione con ID di correlazione

```javascript
class RequestResponseClient {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.requestMap = new Map(); // Map<requestId, {resolve, reject, timeout}>
    this.requestIdCounter = 1;
    this.connect();
  }
  
  connect() {
    this.socket = new WebSocket(this.url);
    
    this.socket.onopen = () => {
      console.log('Connessione stabilita');
    };
    
    this.socket.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        
        // Verifica se è una risposta a una richiesta
        if (response.requestId && this.requestMap.has(response.requestId)) {
          const { resolve, reject, timeout } = this.requestMap.get(response.requestId);
          
          // Cancella il timeout
          clearTimeout(timeout);
          
          // Risolvi o rifiuta la promessa in base allo stato della risposta
          if (response.error) {
            reject(new Error(response.error));
          } else {
            resolve(response.data);
          }
          
          // Rimuovi la richiesta dalla mappa
          this.requestMap.delete(response.requestId);
        }
      } catch (error) {
        console.error('Errore nell\'elaborazione della risposta:', error);
      }
    };
    
    this.socket.onclose = () => {
      console.log('Connessione chiusa, tentativo di riconnessione...');
      
      // Rifiuta tutte le richieste in sospeso
      this.requestMap.forEach(({ reject, timeout }) => {
        clearTimeout(timeout);
        reject(new Error('Connessione chiusa'));
      });
      this.requestMap.clear();
      
      setTimeout(() => this.connect(), 3000);
    };
  }
  
  request(action, data, timeoutMs = 10000) {
    return new Promise((resolve, reject) => {
      if (this.socket.readyState !== WebSocket.OPEN) {
        return reject(new Error('WebSocket non connesso'));
      }
      
      const requestId = this.requestIdCounter++;
      
      // Imposta un timeout per la richiesta
      const timeout = setTimeout(() => {
        if (this.requestMap.has(requestId)) {
          this.requestMap.delete(requestId);
          reject(new Error('Timeout della richiesta'));
        }
      }, timeoutMs);
      
      // Memorizza la promessa e il timeout
      this.requestMap.set(requestId, { resolve, reject, timeout });
      
      // Invia la richiesta
      const request = {
        requestId,
        action,
        data
      };
      
      this.socket.send(JSON.stringify(request));
    });
  }
}

// Esempio di utilizzo
const client = new RequestResponseClient('wss://example.com/api');

// Effettua una richiesta
client.request('getUserData', { userId: 123 })
  .then(userData => {
    console.log('Dati utente ricevuti:', userData);
  })
  .catch(error => {
    console.error('Errore nella richiesta:', error);
  });
```

### Implementazione lato server (Node.js con ws)

```javascript
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log('Nuovo client connesso');
  
  socket.on('message', async (message) => {
    try {
      const request = JSON.parse(message);
      
      // Verifica se è una richiesta valida
      if (request.requestId && request.action) {
        try {
          // Elabora la richiesta in base all'azione
          let responseData;
          
          switch (request.action) {
            case 'getUserData':
              responseData = await getUserData(request.data.userId);
              break;
            case 'updateProfile':
              responseData = await updateProfile(request.data);
              break;
            default:
              throw new Error(`Azione non supportata: ${request.action}`);
          }
          
          // Invia la risposta
          const response = {
            requestId: request.requestId,
            data: responseData
          };
          
          socket.send(JSON.stringify(response));
        } catch (error) {
          // Invia risposta di errore
          const errorResponse = {
            requestId: request.requestId,
            error: error.message
          };
          
          socket.send(JSON.stringify(errorResponse));
        }
      }
    } catch (error) {
      console.error('Errore nell\'elaborazione del messaggio:', error);
    }
  });
});

// Funzioni di esempio per gestire le richieste
async function getUserData(userId) {
  // Simulazione di recupero dati dal database
  return {
    id: userId,
    name: 'Mario Rossi',
    email: 'mario@example.com'
  };
}

async function updateProfile(profileData) {
  // Simulazione di aggiornamento dati nel database
  return {
    success: true,
    updatedAt: new Date().toISOString()
  };
}
```

## Broadcast e Messaggi Mirati

Il broadcasting è un pattern in cui i messaggi vengono inviati a tutti i client connessi, mentre i messaggi mirati vengono inviati solo a client specifici.

### Implementazione lato server (Node.js con ws)

```javascript
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

// Mappa per tenere traccia dei client con identificatori
const clients = new Map(); // Map<clientId, WebSocket>

server.on('connection', (socket) => {
  // Genera un ID univoco per il client
  const clientId = generateUniqueId();
  
  // Memorizza il socket con il suo ID
  clients.set(clientId, socket);
  
  console.log(`Nuovo client connesso: ${clientId}`);
  
  // Invia l'ID al client
  socket.send(JSON.stringify({
    type: 'connection',
    clientId: clientId
  }));
  
  socket.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      switch (data.type) {
        case 'broadcast':
          // Invia a tutti i client
          broadcast(data.message);
          break;
        case 'direct':
          // Invia a un client specifico
          sendToClient(data.targetId, data.message);
          break;
        case 'group':
          // Invia a un gruppo di client
          sendToGroup(data.targetIds, data.message);
          break;
      }
    } catch (error) {
      console.error('Errore nell\'elaborazione del messaggio:', error);
    }
  });
  
  socket.on('close', () => {
    console.log(`Client disconnesso: ${clientId}`);
    clients.delete(clientId);
    
    // Notifica gli altri client della disconnessione
    broadcast({
      type: 'system',
      event: 'clientDisconnected',
      clientId: clientId
    });
  });
});

function broadcast(message) {
  const messageStr = JSON.stringify(message);
  
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messageStr);
    }
  });
  
  console.log(`Messaggio broadcast inviato a ${server.clients.size} client`);
}

function sendToClient(clientId, message) {
  if (clients.has(clientId)) {
    const client = clients.get(clientId);
    
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
      console.log(`Messaggio diretto inviato al client ${clientId}`);
    }
  } else {
    console.log(`Client ${clientId} non trovato`);
  }
}

function sendToGroup(clientIds, message) {
  const messageStr = JSON.stringify(message);
  let sentCount = 0;
  
  clientIds.forEach((clientId) => {
    if (clients.has(clientId)) {
      const client = clients.get(clientId);
      
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageStr);
        sentCount++;
      }
    }
  });
  
  console.log(`Messaggio di gruppo inviato a ${sentCount}/${clientIds.length} client`);
}

function generateUniqueId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
```

## Heartbeat e Riconnessione Automatica

Il pattern Heartbeat è utilizzato per mantenere attive le connessioni e rilevare disconnessioni. La riconnessione automatica consente di ripristinare la connessione in caso di interruzioni.

### Implementazione lato client

```javascript
class RobustWebSocket {
  constructor(url, options = {}) {
    this.url = url;
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = options.maxReconnectAttempts || 10;
    this.reconnectInterval = options.reconnectInterval || 3000;
    this.heartbeatInterval = options.heartbeatInterval || 30000;
    this.heartbeatTimer = null;
    this.reconnectTimer = null;
    
    // Event handlers
    this.onOpenCallbacks = [];
    this.onMessageCallbacks = [];
    this.onCloseCallbacks = [];
    this.onErrorCallbacks = [];
    
    this.connect();
  }
  
  connect() {
    if (this.socket && (this.socket.readyState === WebSocket.CONNECTING || this.socket.readyState === WebSocket.OPEN)) {
      return;
    }
    
    this.socket = new WebSocket(this.url);
    
    this.socket.onopen = (event) => {
      console.log('Connessione WebSocket stabilita');
      this.isConnected = true;
      this.reconnectAttempts = 0;
      
      // Avvia il heartbeat
      this.startHeartbeat();
      
      // Notifica i listener
      this.onOpenCallbacks.forEach(callback => callback(event));
    };
    
    this.socket.onmessage = (event) => {
      // Gestione speciale per i messaggi di heartbeat
      if (event.data === 'pong') {
        return;
      }
      
      // Notifica i listener per altri messaggi
      this.onMessageCallbacks.forEach(callback => callback(event));
    };
    
    this.socket.onclose = (event) => {
      console.log(`Connessione WebSocket chiusa: ${event.code} ${event.reason}`);
      this.isConnected = false;
      this.stopHeartbeat();
      
      // Notifica i listener
      this.onCloseCallbacks.forEach(callback => callback(event));
      
      // Tenta la riconnessione se non è stata una chiusura volontaria
      if (!event.wasClean) {
        this.scheduleReconnect();
      }
    };
    
    this.socket.onerror = (event) => {
      console.error('Errore WebSocket:', event);
      
      // Notifica i listener
      this.onErrorCallbacks.forEach(callback => callback(event));
    };
  }
  
  scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Numero massimo di tentativi di riconnessione raggiunto');
      return;
    }
    
    this.reconnectAttempts++;
    
    // Calcola il ritardo con backoff esponenziale
    const delay = this.reconnectInterval * Math.pow(1.5, this.reconnectAttempts - 1);
    console.log(`Tentativo di riconnessione ${this.reconnectAttempts}/${this.maxReconnectAttempts} tra ${delay}ms`);
    
    clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, delay);
  }
  
  startHeartbeat() {
    this.stopHeartbeat();
    
    this.heartbeatTimer = setInterval(() => {
      if (this.socket.readyState === WebSocket.OPEN) {
        console.log('Invio heartbeat (ping)');
        this.socket.send('ping');
      }
    }, this.heartbeatInterval);
  }
  
  stopHeartbeat() {
    clearInterval(this.heartbeatTimer);
  }
  
  send(data) {
    if (!this.isConnected) {
      throw new Error('WebSocket non connesso');
    }
    
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }
    
    this.socket.send(data);
  }
  
  close(code = 1000, reason = '') {
    this.stopHeartbeat();
    clearTimeout(this.reconnectTimer);
    
    if (this.socket) {
      this.socket.close(code, reason);
    }
  }
  
  // Event listener methods
  onOpen(callback) {
    this.onOpenCallbacks.push(callback);
  }
  
  onMessage(callback) {
    this.onMessageCallbacks.push(callback);
  }
  
  onClose(callback) {
    this.onCloseCallbacks.push(callback);
  }
  
  onError(callback) {
    this.onErrorCallbacks.push(callback);
  }
}

// Esempio di utilizzo
const socket = new RobustWebSocket('wss://example.com/socket', {
  heartbeatInterval: 15000,
  reconnectInterval: 2000,
  maxReconnectAttempts: 5
});

socket.onOpen(() => {
  console.log('Connesso!');
  socket.send({ type: 'auth', token: 'user-token' });
});

socket.onMessage((event) => {
  console.log('Messaggio ricevuto:', event.data);
});

socket.onClose((event) => {
  console.log('Connessione chiusa:', event.code);
});
```

### Implementazione lato server (Node.js con ws)

```javascript
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

// Intervallo per verificare le connessioni attive
const HEARTBEAT_INTERVAL = 30000;

server.on('connection', (socket) => {
  console.log('Nuovo client connesso');
  
  // Imposta la proprietà isAlive
  socket.isAlive = true;
  
  // Gestione dei ping dal client
  socket.on('message', (message) => {
    if (message === 'ping') {
      console.log('Ping ricevuto, invio pong');
      socket.send('pong');
      return;
    }
    
    // Gestione di altri messaggi
    try {
      const data = JSON.parse(message);
      // Elaborazione del messaggio
    } catch (error) {
      console.error('Errore nell\'elaborazione del messaggio:', error);
    }
  });
  
  // Resetta isAlive quando riceve un pong
  socket.on('pong', () => {
    socket.isAlive = true;
  });
  
  socket.on('close', () => {
    console.log('Client disconnesso');
  });
});

// Verifica periodica delle connessioni
setInterval(() => {
  server.clients.forEach((socket) => {
    if (socket.isAlive === false) {
      console.log('Terminazione di una connessione inattiva');
      return socket.terminate();
    }
    
    socket.isAlive = false;
    socket.ping();
  });
}, HEARTBEAT_INTERVAL);
```

## Conclusione

I pattern di comunicazione sono fondamentali per creare applicazioni WebSocket robuste e scalabili. La scelta del pattern dipende dalle esigenze specifiche dell'applicazione:

- **Publish/Subscribe**: Ideale per distribuire aggiornamenti a gruppi di client interessati a specifici argomenti
- **Request/Response**: Utile per operazioni che richiedono una risposta specifica
- **Broadcast e Messaggi Mirati**: Essenziali per applicazioni multi-utente come chat e giochi
- **Heartbeat e Riconnessione**: Cruciali per mantenere connessioni stabili e gestire interruzioni di rete

In molte applicazioni reali, questi pattern vengono combinati per creare sistemi di comunicazione complessi e affidabili.

Nella prossima sezione, esploreremo le implementazioni server-side dei WebSocket in diversi ambienti e linguaggi di programmazione.