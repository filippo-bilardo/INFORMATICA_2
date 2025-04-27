# Implementazioni Server-Side dei WebSockets

## Introduzione alle Implementazioni Server

Mentre l'API WebSocket lato client è standardizzata e relativamente semplice, le implementazioni server-side variano notevolmente in base al linguaggio di programmazione e al framework utilizzato. In questa guida, esploreremo le principali librerie server per WebSocket, con particolare attenzione a Node.js, e discuteremo considerazioni importanti per la scalabilità e le prestazioni.

Le implementazioni server devono gestire efficacemente connessioni multiple, garantire la sicurezza, implementare il protocollo WebSocket correttamente e fornire meccanismi per la distribuzione dei messaggi.

## Node.js con ws

La libreria `ws` è un'implementazione WebSocket pura, leggera e veloce per Node.js. È una delle librerie WebSocket più popolari nell'ecosistema Node.js grazie alla sua semplicità ed efficienza.

### Installazione

```bash
npm install ws
```

### Server WebSocket di base

```javascript
const WebSocket = require('ws');

// Creazione di un server WebSocket sulla porta 8080
const wss = new WebSocket.Server({ port: 8080 });

// Gestione delle connessioni
wss.on('connection', (ws) => {
  console.log('Nuovo client connesso');
  
  // Invio di un messaggio di benvenuto
  ws.send('Benvenuto nel server WebSocket!');
  
  // Gestione dei messaggi in arrivo
  ws.on('message', (message) => {
    console.log('Messaggio ricevuto:', message.toString());
    
    // Echo: rispedisce il messaggio al client
    ws.send(`Hai inviato: ${message}`);
  });
  
  // Gestione della chiusura della connessione
  ws.on('close', () => {
    console.log('Client disconnesso');
  });
});

console.log('Server WebSocket in ascolto sulla porta 8080');
```

### Integrazione con server HTTP esistente

```javascript
const http = require('http');
const WebSocket = require('ws');

// Creazione di un server HTTP
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server HTTP funzionante');
});

// Creazione di un server WebSocket che utilizza il server HTTP
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Nuovo client connesso');
  
  ws.on('message', (message) => {
    console.log('Messaggio ricevuto:', message.toString());
    ws.send(`Eco: ${message}`);
  });
});

// Avvio del server sulla porta 8080
server.listen(8080, () => {
  console.log('Server in ascolto sulla porta 8080');
});
```

### Broadcast a tutti i client

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Nuovo client connesso');
  
  ws.on('message', (message) => {
    console.log('Messaggio ricevuto:', message.toString());
    
    // Broadcast del messaggio a tutti i client
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Broadcast: ${message}`);
      }
    });
  });
});
```

### Gestione dello stato della connessione

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

function heartbeat() {
  this.isAlive = true;
}

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', heartbeat);
  
  ws.on('message', (message) => {
    // Gestione dei messaggi
  });
});

// Verifica periodica delle connessioni
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) return ws.terminate();
    
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', () => {
  clearInterval(interval);
});
```

## Socket.io

Socket.io è una libreria che fornisce comunicazione bidirezionale in tempo reale basata su eventi. Utilizza WebSocket come trasporto principale, ma può fallback su altre tecniche (polling lungo, ecc.) quando WebSocket non è disponibile.

### Caratteristiche principali di Socket.io

1. **Fallback automatico**: Se WebSocket non è supportato, Socket.io utilizza automaticamente altri metodi di trasporto
2. **Riconnessione automatica**: Gestisce automaticamente la riconnessione in caso di interruzioni
3. **Supporto per stanze e namespace**: Permette di organizzare le connessioni in gruppi logici
4. **Broadcast selettivo**: Facilita l'invio di messaggi a sottoinsiemi di client
5. **Middleware**: Supporta middleware per autenticazione e altre funzionalità

### Installazione

```bash
npm install socket.io
```

### Server Socket.io di base

```javascript
const http = require('http');
const { Server } = require('socket.io');

// Creazione del server HTTP
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server HTTP funzionante');
});

// Inizializzazione di Socket.io
const io = new Server(server);

// Gestione delle connessioni
io.on('connection', (socket) => {
  console.log('Nuovo client connesso:', socket.id);
  
  // Invio di un evento di benvenuto
  socket.emit('welcome', { message: 'Benvenuto in Socket.io!' });
  
  // Gestione di un evento personalizzato
  socket.on('chat message', (msg) => {
    console.log('Messaggio ricevuto:', msg);
    
    // Broadcast a tutti i client eccetto il mittente
    socket.broadcast.emit('chat message', msg);
    
    // Risposta al mittente
    socket.emit('message received', { status: 'ok' });
  });
  
  // Gestione della disconnessione
  socket.on('disconnect', () => {
    console.log('Client disconnesso:', socket.id);
  });
});

// Avvio del server
server.listen(3000, () => {
  console.log('Server in ascolto sulla porta 3000');
});
```

### Stanze e Namespace

```javascript
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server);

// Namespace principale
io.on('connection', (socket) => {
  console.log('Connessione al namespace principale:', socket.id);
  
  // Gestione dell'ingresso in una stanza
  socket.on('join room', (roomName) => {
    socket.join(roomName);
    console.log(`${socket.id} è entrato nella stanza: ${roomName}`);
    
    // Notifica a tutti nella stanza
    io.to(roomName).emit('room notification', `${socket.id} è entrato nella stanza`);
  });
  
  // Invio di un messaggio a una stanza specifica
  socket.on('room message', (data) => {
    io.to(data.room).emit('room message', {
      sender: socket.id,
      message: data.message
    });
  });
});

// Namespace personalizzato per l'amministrazione
const adminNamespace = io.of('/admin');

adminNamespace.on('connection', (socket) => {
  console.log('Connessione al namespace admin:', socket.id);
  
  // Eventi specifici per gli amministratori
  socket.on('system command', (command) => {
    console.log('Comando di sistema ricevuto:', command);
    adminNamespace.emit('system update', { status: 'Comando eseguito' });
  });
});

server.listen(3000);
```

### Middleware per l'autenticazione

```javascript
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server);

// Middleware di autenticazione
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  
  if (isValidToken(token)) {
    // Memorizza informazioni sull'utente nel socket
    socket.user = getUserFromToken(token);
    next();
  } else {
    next(new Error('Autenticazione fallita'));
  }
});

// Funzioni di esempio per la verifica del token
function isValidToken(token) {
  // Implementazione della verifica del token
  return token === 'valid-token';
}

function getUserFromToken(token) {
  // Estrazione delle informazioni dell'utente dal token
  return { id: 123, username: 'utente_esempio' };
}

io.on('connection', (socket) => {
  console.log(`Utente autenticato: ${socket.user.username}`);
  
  // Ora puoi utilizzare socket.user nelle tue logiche
  socket.on('profile request', () => {
    socket.emit('profile data', socket.user);
  });
});

server.listen(3000);
```

## Implementazioni in Altri Linguaggi

Oltre a Node.js, esistono numerose implementazioni WebSocket per altri linguaggi di programmazione. Ecco alcune delle più popolari:

### Java

**Java WebSocket API (JSR 356)**

Parte della specifica Java EE 7, fornisce un'API standard per WebSocket in Java.

```java
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/websocket")
public class WebSocketServer {

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("Nuova connessione: " + session.getId());
    }

    @OnMessage
    public String onMessage(String message, Session session) {
        System.out.println("Messaggio ricevuto: " + message);
        return "Eco: " + message;
    }

    @OnClose
    public void onClose(Session session, CloseReason closeReason) {
        System.out.println("Connessione chiusa: " + closeReason);
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        System.out.println("Errore: " + throwable.getMessage());
    }
}
```

### Python

**websockets**

Una libreria asincrona per Python basata su asyncio.

```python
import asyncio
import websockets

async def echo(websocket, path):
    async for message in websocket:
        print(f"Messaggio ricevuto: {message}")
        await websocket.send(f"Eco: {message}")

start_server = websockets.serve(echo, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
```

**Flask-SocketIO**

Integrazione di Socket.io per il framework Flask.

```python
from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@socketio.on('connect')
def test_connect():
    print('Client connesso')

@socketio.on('message')
def handle_message(message):
    print('Messaggio ricevuto:', message)
    emit('response', {'data': f'Hai inviato: {message}'})

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
```

### C#/.NET

**SignalR**

Una libreria Microsoft che semplifica l'aggiunta di funzionalità in tempo reale alle applicazioni .NET.

```csharp
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
    
    public override async Task OnConnectedAsync()
    {
        await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
        await base.OnConnectedAsync();
    }
    
    public override async Task OnDisconnectedAsync(Exception exception)
    {
        await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
        await base.OnDisconnectedAsync(exception);
    }
}
```

## Scalabilità e Considerazioni di Performance

Le applicazioni WebSocket possono affrontare sfide significative di scalabilità quando il numero di connessioni simultanee aumenta. Ecco alcune considerazioni importanti:

### 1. Limiti di Connessioni Simultanee

Ogni connessione WebSocket mantiene uno stato e consuma risorse sul server:

- **Memoria**: Ogni connessione richiede memoria per mantenere lo stato
- **File descriptor**: I sistemi operativi hanno limiti sul numero di file descriptor aperti
- **Thread/processi**: A seconda dell'implementazione, potrebbero essere necessari thread o processi aggiuntivi

### 2. Architetture Scalabili

#### Modello Single-Process Event-Loop (Node.js)

Node.js utilizza un modello a singolo thread con event loop, che è efficiente per operazioni I/O non bloccanti come WebSocket:

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Monitoraggio delle connessioni
setInterval(() => {
  console.log(`Connessioni attive: ${wss.clients.size}`);
}, 10000);
```

Questo modello può gestire migliaia di connessioni su un singolo processo, ma è limitato a un singolo core CPU.

#### Cluster di Processi

Per sfruttare più core CPU, è possibile utilizzare il modulo cluster di Node.js:

```javascript
const cluster = require('cluster');
const http = require('http');
const { Server } = require('socket.io');
const numCPUs = require('os').cpus().length;
const { setupMaster, setupWorker } = require('@socket.io/sticky');
const { createAdapter, setupPrimary } = require('@socket.io/cluster-adapter');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} è in esecuzione`);
  
  // Creazione del server HTTP
  const httpServer = http.createServer();
  
  // Configurazione per sticky sessions
  setupMaster(httpServer, {
    loadBalancingMethod: 'least-connection'
  });
  
  // Configurazione dell'adapter per la comunicazione tra worker
  setupPrimary();
  
  // Avvio del server
  httpServer.listen(3000);
  
  // Fork dei worker
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} morto`);
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} avviato`);
  
  // Creazione del server HTTP per il worker
  const httpServer = http.createServer();
  const io = new Server(httpServer);
  
  // Configurazione per sticky sessions
  setupWorker(io);
  
  // Configurazione dell'adapter per la comunicazione tra worker
  io.adapter(createAdapter());
  
  // Gestione delle connessioni
  io.on('connection', (socket) => {
    console.log(`Nuova connessione: ${socket.id} su worker ${process.pid}`);
    
    socket.on('message', (data) => {
      // Il messaggio verrà distribuito a tutti i client, anche quelli connessi ad altri worker
      io.emit('broadcast', data);
    });
  });
}
```

### 3. Distribuzione Orizzontale

Per scalare oltre un singolo server, è necessario implementare una distribuzione orizzontale con un sistema di messaggistica per sincronizzare i server:

#### Socket.io con Redis Adapter

```javascript
const http = require('http');
const { Server } = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');

async function main() {
  // Creazione del server HTTP
  const httpServer = http.createServer();
  const io = new Server(httpServer);
  
  // Creazione dei client Redis
  const pubClient = createClient({ url: 'redis://localhost:6379' });
  const subClient = pubClient.duplicate();
  
  await Promise.all([pubClient.connect(), subClient.connect()]);
  
  // Configurazione dell'adapter Redis
  io.adapter(createAdapter(pubClient, subClient));
  
  // Gestione delle connessioni
  io.on('connection', (socket) => {
    console.log('Nuovo client connesso');
    
    socket.on('join-room', (room) => {
      socket.join(room);
      console.log(`Client ${socket.id} è entrato nella stanza ${room}`);
    });
    
    socket.on('message', (data) => {
      // Il messaggio verrà distribuito a tutti i client connessi a qualsiasi istanza del server
      io.to(data.room).emit('message', data.content);
    });
  });
  
  // Avvio del server
  httpServer.listen(3000);
  console.log('Server in ascolto sulla porta 3000');
}

main().catch(console.error);
```

### 4. Ottimizzazione delle Prestazioni

#### Minimizzare la Frequenza e la Dimensione dei Messaggi

- **Batching**: Raggruppare più aggiornamenti in un singolo messaggio
- **Compressione**: Utilizzare formati compatti come MessagePack invece di JSON
- **Throttling**: Limitare la frequenza di invio dei messaggi

```javascript
// Esempio di batching
let pendingUpdates = [];
const BATCH_INTERVAL = 100; // ms

function queueUpdate(update) {
  pendingUpdates.push(update);
}

setInterval(() => {
  if (pendingUpdates.length > 0) {
    io.emit('batch-update', pendingUpdates);
    pendingUpdates = [];
  }
}, BATCH_INTERVAL);
```

#### Monitoraggio e Diagnostica

È importante monitorare le prestazioni delle applicazioni WebSocket:

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Statistiche di base
let stats = {
  connections: 0,
  messagesReceived: 0,
  messagesSent: 0
};

wss.on('connection', (ws) => {
  stats.connections++;
  
  ws.on('message', () => {
    stats.messagesReceived++;
  });
  
  // Monkey patch per tracciare i messaggi inviati
  const originalSend = ws.send;
  ws.send = function() {
    stats.messagesSent++;
    originalSend.apply(ws, arguments);
  };
  
  ws.on('close', () => {
    stats.connections--;
  });
});

// Esponi le statistiche tramite HTTP
const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(stats));
}).listen(8081);
```

## Conclusione

Le implementazioni server-side dei WebSocket offrono diverse opzioni per creare applicazioni in tempo reale scalabili e performanti. La scelta dell'implementazione dipende dalle esigenze specifiche del progetto, dal linguaggio di programmazione preferito e dai requisiti di scalabilità.

Per applicazioni JavaScript, Node.js con `ws` o Socket.io rappresenta spesso la scelta migliore, con Socket.io che offre funzionalità aggiuntive come fallback automatico e gestione delle stanze. Per progetti in altri linguaggi, esistono implementazioni mature come SignalR per .NET, websockets per Python e JSR 356 per Java.

Indipendentemente dall'implementazione scelta, è importante considerare attentamente la scalabilità e le prestazioni, specialmente per applicazioni con un numero elevato di connessioni simultanee.

Nella prossima sezione, esploreremo casi d'uso reali dei WebSocket e vedremo come implementare applicazioni pratiche come chat in tempo reale, dashboard di dati live e giochi multiplayer.