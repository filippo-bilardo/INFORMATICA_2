# L'API WebSocket in JavaScript

## Introduzione all'API WebSocket

L'API WebSocket in JavaScript fornisce un'interfaccia semplice ma potente per stabilire connessioni WebSocket dal browser. Questa API è supportata da tutti i browser moderni e consente agli sviluppatori di implementare facilmente comunicazioni bidirezionali in tempo reale nelle loro applicazioni web.

L'interfaccia principale è rappresentata dalla classe `WebSocket`, che gestisce la connessione, l'invio e la ricezione di messaggi, nonché gli eventi associati alla connessione.

## Creazione di una Connessione WebSocket

Per stabilire una connessione WebSocket, è sufficiente creare una nuova istanza dell'oggetto `WebSocket` specificando l'URL del server WebSocket:

```javascript
// Creazione di una connessione WebSocket non sicura (ws://)
const socket = new WebSocket('ws://example.com/socket');

// Creazione di una connessione WebSocket sicura (wss://)
const secureSocket = new WebSocket('wss://example.com/secure-socket');
```

L'URL deve utilizzare il protocollo `ws://` o `wss://` (versione sicura). È possibile anche specificare protocolli applicativi opzionali come secondo parametro:

```javascript
// Specifica di protocolli applicativi
const chatSocket = new WebSocket('wss://example.com/chat', ['chat', 'chat-v2']);
```

Il server può scegliere uno di questi protocolli durante l'handshake. Il protocollo selezionato sarà disponibile tramite la proprietà `protocol` dell'oggetto WebSocket.

## Eventi Principali

L'API WebSocket utilizza un modello basato su eventi per gestire i vari stati della connessione e la ricezione di messaggi. Gli eventi principali sono:

### 1. Evento `open`

Questo evento viene attivato quando la connessione è stata stabilita con successo:

```javascript
socket.addEventListener('open', (event) => {
  console.log('Connessione WebSocket stabilita');
  
  // Ora è possibile inviare messaggi
  socket.send('Ciao dal client!');
});

// Oppure utilizzando la proprietà onopen
socket.onopen = (event) => {
  console.log('Connessione stabilita');
};
```

### 2. Evento `message`

Questo evento viene attivato quando il client riceve un messaggio dal server:

```javascript
socket.addEventListener('message', (event) => {
  console.log('Messaggio ricevuto dal server:', event.data);
  
  // event.data può essere una stringa o un Blob, a seconda del tipo di dati inviati
  if (typeof event.data === 'string') {
    // Elaborazione di dati testuali
    const jsonData = JSON.parse(event.data);
    processMessage(jsonData);
  } else {
    // Elaborazione di dati binari
    processBinaryData(event.data);
  }
});

// Oppure utilizzando la proprietà onmessage
socket.onmessage = (event) => {
  console.log('Messaggio ricevuto:', event.data);
};
```

### 3. Evento `error`

Questo evento viene attivato quando si verifica un errore durante la comunicazione:

```javascript
socket.addEventListener('error', (event) => {
  console.error('Errore nella connessione WebSocket:', event);
});

// Oppure utilizzando la proprietà onerror
socket.onerror = (event) => {
  console.error('Errore:', event);
};
```

### 4. Evento `close`

Questo evento viene attivato quando la connessione viene chiusa, sia dal client che dal server:

```javascript
socket.addEventListener('close', (event) => {
  console.log('Connessione chiusa con codice:', event.code, 'motivo:', event.reason);
  
  // event.code contiene il codice di chiusura (es. 1000 per chiusura normale)
  // event.reason contiene il motivo della chiusura (se fornito)
  // event.wasClean indica se la chiusura è avvenuta in modo pulito
  
  if (event.wasClean) {
    console.log('Chiusura pulita della connessione');
  } else {
    console.log('Connessione interrotta');
    // Implementare logica di riconnessione se necessario
  }
});

// Oppure utilizzando la proprietà onclose
socket.onclose = (event) => {
  console.log('Connessione chiusa:', event.code);
};
```

## Invio e Ricezione di Messaggi

### Invio di Messaggi

L'API WebSocket permette di inviare sia messaggi testuali che binari utilizzando il metodo `send()`:

```javascript
// Invio di una stringa
socket.send('Ciao, server!');

// Invio di dati JSON (prima convertiti in stringa)
const data = { type: 'message', content: 'Ciao', timestamp: Date.now() };
socket.send(JSON.stringify(data));

// Invio di dati binari
const binaryData = new Uint8Array([1, 2, 3, 4]);
socket.send(binaryData);

// Invio di un Blob
const blob = new Blob(['Contenuto del blob'], { type: 'text/plain' });
socket.send(blob);

// Invio di un ArrayBuffer
const buffer = new ArrayBuffer(4);
const view = new Uint8Array(buffer);
view[0] = 10; view[1] = 20; view[2] = 30; view[3] = 40;
socket.send(buffer);
```

### Ricezione di Messaggi

Come visto nell'evento `message`, i dati ricevuti sono disponibili tramite la proprietà `event.data`. Il tipo di dati dipende dal formato inviato dal server:

```javascript
socket.onmessage = (event) => {
  if (typeof event.data === 'string') {
    // Dati testuali
    console.log('Testo ricevuto:', event.data);
    
    // Se i dati sono in formato JSON
    try {
      const jsonData = JSON.parse(event.data);
      handleJsonData(jsonData);
    } catch (e) {
      console.log('Dati non in formato JSON');
    }
  } else if (event.data instanceof Blob) {
    // Dati binari come Blob
    console.log('Blob ricevuto, dimensione:', event.data.size);
    
    // Lettura del Blob
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result;
      // Elaborazione dell'ArrayBuffer
    };
    reader.readAsArrayBuffer(event.data);
  } else if (event.data instanceof ArrayBuffer) {
    // Dati binari come ArrayBuffer
    console.log('ArrayBuffer ricevuto, lunghezza:', event.data.byteLength);
    const view = new Uint8Array(event.data);
    // Elaborazione dei dati binari
  }
};
```

## Proprietà dell'Oggetto WebSocket

L'oggetto WebSocket fornisce diverse proprietà utili:

1. **readyState**: Indica lo stato attuale della connessione:
   - `WebSocket.CONNECTING` (0): La connessione non è ancora stabilita
   - `WebSocket.OPEN` (1): La connessione è stabilita e la comunicazione è possibile
   - `WebSocket.CLOSING` (2): La connessione sta per essere chiusa
   - `WebSocket.CLOSED` (3): La connessione è chiusa o non è stato possibile stabilirla

2. **bufferedAmount**: Indica la quantità di dati in byte che sono stati messi in coda utilizzando `send()` ma non ancora trasmessi al server.

3. **protocol**: Indica il protocollo selezionato dal server durante l'handshake.

4. **url**: L'URL del WebSocket a cui è connesso il client.

5. **binaryType**: Specifica il tipo di dati binari che il client riceverà. Può essere `'blob'` (predefinito) o `'arraybuffer'`.

## Chiusura della Connessione

Per chiudere una connessione WebSocket, si utilizza il metodo `close()`, che accetta opzionalmente un codice di stato e un motivo:

```javascript
// Chiusura semplice
socket.close();

// Chiusura con codice e motivo
socket.close(1000, 'Operazione completata');
```

I codici di stato più comuni sono:

- 1000: Chiusura normale
- 1001: Endpoint che va via (browser che naviga via dalla pagina)
- 1002: Chiusura del protocollo per errore
- 1003: Tipo di dati non accettabile
- 1008: Messaggio che viola la policy
- 1011: Errore interno del server

## Gestione degli Errori e Riconnessione

Una buona implementazione WebSocket dovrebbe gestire gli errori e implementare strategie di riconnessione:

```javascript
let socket;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;
const reconnectInterval = 3000; // 3 secondi

function connectWebSocket() {
  socket = new WebSocket('wss://example.com/socket');
  
  socket.onopen = (event) => {
    console.log('Connessione stabilita');
    reconnectAttempts = 0; // Reset del contatore dei tentativi
  };
  
  socket.onmessage = (event) => {
    console.log('Messaggio ricevuto:', event.data);
  };
  
  socket.onerror = (event) => {
    console.error('Errore WebSocket:', event);
  };
  
  socket.onclose = (event) => {
    console.log('Connessione chiusa:', event.code);
    
    if (!event.wasClean && reconnectAttempts < maxReconnectAttempts) {
      // Tentativo di riconnessione con backoff esponenziale
      const delay = reconnectInterval * Math.pow(1.5, reconnectAttempts);
      console.log(`Tentativo di riconnessione in ${delay}ms...`);
      
      setTimeout(() => {
        reconnectAttempts++;
        connectWebSocket();
      }, delay);
    }
  };
}

// Avvio della connessione iniziale
connectWebSocket();
```

## Esempio Completo: Chat Semplice

Ecco un esempio completo di una semplice applicazione di chat utilizzando WebSocket:

```javascript
// HTML:
// <div id="chat-container">
//   <div id="messages"></div>
//   <input type="text" id="message-input" placeholder="Scrivi un messaggio...">
//   <button id="send-button">Invia</button>
// </div>

const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
let socket;

// Funzione per aggiungere un messaggio alla chat
function addMessage(message, isSent = false) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(isSent ? 'sent' : 'received');
  messageElement.textContent = message;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Funzione per connettersi al server WebSocket
function connectToChat() {
  socket = new WebSocket('wss://example.com/chat');
  
  socket.onopen = () => {
    addMessage('Connesso alla chat', false);
    messageInput.disabled = false;
    sendButton.disabled = false;
  };
  
  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
        addMessage(`${data.username}: ${data.content}`, false);
      }
    } catch (e) {
      addMessage(event.data, false);
    }
  };
  
  socket.onerror = (error) => {
    addMessage('Errore di connessione', false);
    console.error('WebSocket Error:', error);
  };
  
  socket.onclose = (event) => {
    messageInput.disabled = true;
    sendButton.disabled = true;
    addMessage('Disconnesso dalla chat', false);
    
    // Tentativo di riconnessione dopo 5 secondi
    setTimeout(connectToChat, 5000);
  };
}

// Funzione per inviare un messaggio
function sendMessage() {
  const message = messageInput.value.trim();
  if (message && socket.readyState === WebSocket.OPEN) {
    const data = {
      type: 'message',
      content: message
    };
    
    socket.send(JSON.stringify(data));
    addMessage(`Tu: ${message}`, true);
    messageInput.value = '';
  }
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

// Connessione iniziale
connectToChat();
```

## Conclusione

L'API WebSocket in JavaScript offre un modo semplice ma potente per implementare comunicazioni bidirezionali in tempo reale nelle applicazioni web. Comprendere gli eventi principali, i metodi per l'invio e la ricezione di messaggi, e le strategie per la gestione degli errori e la riconnessione è fondamentale per creare applicazioni WebSocket robuste.

Nella prossima sezione, esploreremo i pattern di comunicazione comuni utilizzati nelle applicazioni WebSocket, come publish/subscribe, request/response e broadcasting.