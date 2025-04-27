# WebSockets

I WebSockets rappresentano una tecnologia avanzata che permette la comunicazione bidirezionale in tempo reale tra client e server su una singola connessione persistente. A differenza del tradizionale modello HTTP request-response, i WebSockets mantengono una connessione aperta, consentendo lo scambio di dati in entrambe le direzioni senza la necessità di iniziare nuove richieste.

## Introduzione ai WebSockets

I WebSockets sono stati sviluppati per risolvere le limitazioni delle tecniche di comunicazione in tempo reale basate su HTTP, come il polling e il long polling. Forniscono un canale di comunicazione full-duplex che opera attraverso una singola connessione TCP.

```javascript
// Creazione di una connessione WebSocket
const socket = new WebSocket('ws://example.com/socket');

// Gestione degli eventi
socket.onopen = (event) => {
  console.log('Connessione WebSocket stabilita');
  socket.send('Ciao dal client!');
};

socket.onmessage = (event) => {
  console.log('Messaggio ricevuto dal server:', event.data);
};

socket.onclose = (event) => {
  console.log('Connessione WebSocket chiusa:', event.code, event.reason);
};

socket.onerror = (error) => {
  console.error('Errore WebSocket:', error);
};
```

## Protocollo WebSocket

Il protocollo WebSocket (WSS/WS) è un protocollo di comunicazione indipendente che opera su TCP. Utilizza il prefisso `ws://` per connessioni non sicure e `wss://` per connessioni sicure (WebSocket over TLS/SSL).

La connessione inizia con una "stretta di mano" (handshake) HTTP, che poi viene aggiornata a una connessione WebSocket. Questo permette ai WebSockets di funzionare anche in ambienti con proxy e firewall configurati per HTTP.

## Caratteristiche Principali

### Comunicazione Bidirezionale

I WebSockets permettono la comunicazione in entrambe le direzioni contemporaneamente, consentendo sia al client che al server di inviare dati in qualsiasi momento senza attendere richieste.

```javascript
// Invio di dati al server
socket.send('Messaggio di testo');

// Invio di dati binari
const buffer = new ArrayBuffer(8);
const view = new DataView(buffer);
view.setFloat64(0, 3.14159);
socket.send(buffer);

// Invio di Blob
const blob = new Blob(['Contenuto del blob'], { type: 'text/plain' });
socket.send(blob);
```

### Connessione Persistente

Una volta stabilita, la connessione WebSocket rimane aperta fino a quando non viene esplicitamente chiusa da una delle parti o si verifica un errore di rete.

```javascript
// Chiusura della connessione dal client
socket.close(1000, 'Chiusura normale'); // 1000 è il codice per una chiusura normale
```

### Efficienza

I WebSockets sono molto più efficienti rispetto alle tecniche basate su HTTP per la comunicazione in tempo reale:

- Overhead ridotto: dopo l'handshake iniziale, i frame WebSocket hanno un overhead minimo (appena 2-14 byte)
- Nessun polling: eliminano la necessità di polling continuo, riducendo il traffico di rete
- Latenza ridotta: i messaggi vengono inviati non appena sono disponibili

## Eventi WebSocket

L'API WebSocket fornisce diversi eventi per gestire il ciclo di vita della connessione:

- `open`: si verifica quando la connessione è stabilita
- `message`: si verifica quando viene ricevuto un messaggio
- `error`: si verifica quando si verifica un errore
- `close`: si verifica quando la connessione viene chiusa

```javascript
// Utilizzo di addEventListener invece degli handler on*
socket.addEventListener('open', (event) => {
  console.log('Connessione aperta');
});

socket.addEventListener('message', (event) => {
  console.log('Dati ricevuti:', event.data);
});

socket.addEventListener('error', (event) => {
  console.error('Errore WebSocket:', event);
});

socket.addEventListener('close', (event) => {
  console.log('Connessione chiusa:', event.code, event.reason);
});
```

## Invio e Ricezione di Dati

I WebSockets supportano l'invio di diversi tipi di dati:

- Stringhe di testo
- ArrayBuffer (dati binari)
- Blob

```javascript
// Invio di dati in formato JSON
const dati = { tipo: 'messaggio', contenuto: 'Ciao!', timestamp: Date.now() };
socket.send(JSON.stringify(dati));

// Ricezione e parsing di dati JSON
socket.onmessage = (event) => {
  try {
    const dati = JSON.parse(event.data);
    console.log('Messaggio ricevuto:', dati);
    
    // Gestione in base al tipo di messaggio
    switch (dati.tipo) {
      case 'notifica':
        mostraNotifica(dati.contenuto);
        break;
      case 'aggiornamento':
        aggiornaInterfaccia(dati.contenuto);
        break;
      // Altri tipi di messaggi...
    }
  } catch (error) {
    console.error('Errore nel parsing JSON:', error);
  }
};
```

## Gestione degli Errori e Riconnessione

È importante implementare una strategia di riconnessione per gestire disconnessioni impreviste:

```javascript
class WebSocketClient {
  constructor(url, opzioni = {}) {
    this.url = url;
    this.opzioni = opzioni;
    this.socket = null;
    this.tentativi = 0;
    this.maxTentativi = opzioni.maxTentativi || 5;
    this.tempoBase = opzioni.tempoBase || 1000;
    this.tempoMax = opzioni.tempoMax || 30000;
    this.handlers = { message: [], open: [], close: [], error: [] };
    
    this.connetti();
  }
  
  connetti() {
    this.socket = new WebSocket(this.url);
    
    this.socket.onopen = (event) => {
      console.log('WebSocket connesso');
      this.tentativi = 0;
      this.trigger('open', event);
    };
    
    this.socket.onmessage = (event) => {
      this.trigger('message', event);
    };
    
    this.socket.onclose = (event) => {
      this.trigger('close', event);
      
      // Riconnessione solo se non è stata una chiusura normale
      if (event.code !== 1000 && event.code !== 1001) {
        this.riconnetti();
      }
    };
    
    this.socket.onerror = (event) => {
      this.trigger('error', event);
    };
  }
  
  riconnetti() {
    if (this.tentativi >= this.maxTentativi) {
      console.error('Numero massimo di tentativi di riconnessione raggiunto');
      return;
    }
    
    this.tentativi++;
    
    // Calcolo del tempo di attesa con backoff esponenziale
    const tempoAttesa = Math.min(
      Math.pow(2, this.tentativi) * this.tempoBase,
      this.tempoMax
    );
    
    console.log(`Tentativo di riconnessione in ${tempoAttesa}ms...`);
    
    setTimeout(() => this.connetti(), tempoAttesa);
  }
  
  send(data) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(typeof data === 'object' ? JSON.stringify(data) : data);
      return true;
    }
    return false;
  }
  
  on(evento, callback) {
    if (this.handlers[evento]) {
      this.handlers[evento].push(callback);
    }
    return this;
  }
  
  trigger(evento, data) {
    if (this.handlers[evento]) {
      this.handlers[evento].forEach(callback => callback(data));
    }
  }
  
  chiudi(codice = 1000, motivo = 'Chiusura normale') {
    if (this.socket) {
      this.socket.close(codice, motivo);
    }
  }
}

// Utilizzo
const client = new WebSocketClient('wss://echo.websocket.org');

client.on('open', () => {
  console.log('Connessione stabilita');
  client.send({ tipo: 'saluto', messaggio: 'Ciao server!' });
});

client.on('message', (event) => {
  console.log('Messaggio ricevuto:', event.data);
});

client.on('close', () => {
  console.log('Connessione chiusa');
});
```

## Casi d'Uso Comuni

I WebSockets sono particolarmente utili per:

### Chat in Tempo Reale

```javascript
const chatSocket = new WebSocket('wss://chat.example.com');

// Invio di un messaggio
function inviaMessaggio(testo) {
  chatSocket.send(JSON.stringify({
    tipo: 'messaggio',
    testo: testo,
    utente: nomeUtente,
    timestamp: Date.now()
  }));
}

// Ricezione di messaggi
chatSocket.onmessage = (event) => {
  const messaggio = JSON.parse(event.data);
  aggiungiMessaggioAllaChat(messaggio);
};
```

### Aggiornamenti in Tempo Reale

```javascript
const dashboardSocket = new WebSocket('wss://dashboard.example.com/updates');

dashboardSocket.onmessage = (event) => {
  const aggiornamento = JSON.parse(event.data);
  
  switch (aggiornamento.tipo) {
    case 'prezzo':
      aggiornaGraficoPrezzi(aggiornamento.dati);
      break;
    case 'statistica':
      aggiornaStatistiche(aggiornamento.dati);
      break;
    case 'notifica':
      mostraNotifica(aggiornamento.dati);
      break;
  }
};
```

### Giochi Multiplayer

```javascript
const gameSocket = new WebSocket('wss://game.example.com/session/123');

// Invio delle azioni del giocatore
function inviaAzione(azione) {
  gameSocket.send(JSON.stringify({
    tipo: 'azione',
    azione: azione,
    giocatore: idGiocatore,
    timestamp: Date.now()
  }));
}

// Ricezione degli aggiornamenti di stato del gioco
gameSocket.onmessage = (event) => {
  const statoGioco = JSON.parse(event.data);
  aggiornaStatoGioco(statoGioco);
};
```

## Limitazioni e Considerazioni

- **Supporto del Browser**: I WebSockets sono supportati da tutti i browser moderni, ma potrebbero non essere disponibili in browser molto vecchi.
- **Firewall e Proxy**: Alcuni firewall e proxy potrebbero bloccare le connessioni WebSocket, specialmente quelle non sicure (ws://).
- **Scalabilità**: Le connessioni WebSocket persistenti richiedono risorse sul server. Per applicazioni con molti utenti, è necessario considerare soluzioni di bilanciamento del carico.
- **Fallback**: È consigliabile implementare un fallback (come long polling) per i client che non supportano WebSockets.

## Librerie e Framework

Esistono diverse librerie che semplificano l'utilizzo dei WebSockets:

- **Socket.IO**: Fornisce un'astrazione sui WebSockets con fallback automatico e funzionalità aggiuntive
- **ws**: Una libreria WebSocket leggera per Node.js
- **SockJS**: Fornisce un'API WebSocket-like con vari meccanismi di trasporto di fallback

## Conclusione

I WebSockets rappresentano una tecnologia potente per la comunicazione in tempo reale nelle applicazioni web. Offrono prestazioni elevate, bassa latenza e un'API relativamente semplice da utilizzare. Quando combinati con altre tecnologie moderne come le Promesse e async/await, i WebSockets permettono di creare esperienze utente ricche e reattive.

[Torna all'indice](../README.md) | [Prossimo argomento: Service Workers](./03_Service_Workers.md)