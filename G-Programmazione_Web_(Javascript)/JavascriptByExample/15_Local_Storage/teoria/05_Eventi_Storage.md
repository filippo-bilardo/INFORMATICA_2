# Eventi di Storage

## Sincronizzazione tra schede e finestre

Una delle caratteristiche più potenti dell'API Web Storage è la capacità di sincronizzare dati tra diverse schede o finestre del browser attraverso l'evento `storage`. Questo evento viene attivato quando i dati nel localStorage vengono modificati, ma solo nelle altre schede o finestre aperte dello stesso dominio, non nella scheda che ha effettuato la modifica.

## L'evento storage

L'evento `storage` viene attivato quando:

- Viene chiamato `localStorage.setItem()`
- Viene chiamato `localStorage.removeItem()`
- Viene chiamato `localStorage.clear()`

L'evento non viene attivato quando si utilizza la notazione ad oggetto (`localStorage.chiave = valore`) o quando si legge dal localStorage.

## Ascolto dell'evento storage

Per ascoltare le modifiche al localStorage in altre schede o finestre, è possibile aggiungere un listener all'evento `storage` sull'oggetto `window`:

```javascript
window.addEventListener('storage', (event) => {
  console.log('Modifiche al localStorage rilevate in un'altra scheda/finestra');
  console.log('Chiave modificata:', event.key);
  console.log('Vecchio valore:', event.oldValue);
  console.log('Nuovo valore:', event.newValue);
  console.log('URL della pagina che ha effettuato la modifica:', event.url);
  console.log('Area di storage modificata:', event.storageArea); // localStorage o sessionStorage
});
```

## Proprietà dell'evento storage

L'oggetto evento passato al listener contiene diverse proprietà utili:

- `key`: il nome della chiave che è stata modificata (null per clear())
- `oldValue`: il valore precedente della chiave (null per nuove chiavi)
- `newValue`: il nuovo valore della chiave (null per removeItem())
- `url`: l'URL della pagina che ha attivato l'evento
- `storageArea`: riferimento all'oggetto storage che è stato modificato (localStorage o sessionStorage)

## Esempio pratico: chat tra schede

Ecco un esempio di come utilizzare l'evento storage per implementare una semplice chat tra diverse schede del browser:

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <title>Chat tra schede</title>
  <style>
    #messages {
      height: 300px;
      overflow-y: auto;
      border: 1px solid #ccc;
      margin-bottom: 10px;
      padding: 10px;
    }
    .message {
      margin-bottom: 5px;
      padding: 5px;
      border-radius: 5px;
    }
    .sent {
      background-color: #e3f2fd;
      text-align: right;
    }
    .received {
      background-color: #f5f5f5;
    }
  </style>
</head>
<body>
  <h1>Chat tra schede</h1>
  <p>Apri questa pagina in più schede per vedere la chat in azione</p>
  
  <div id="messages"></div>
  
  <div>
    <input type="text" id="messageInput" placeholder="Scrivi un messaggio...">
    <button id="sendButton">Invia</button>
  </div>
  
  <script>
    // Genera un ID univoco per questa scheda
    const tabId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    // Elementi DOM
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    
    // Funzione per aggiungere un messaggio alla chat
    function addMessage(message, isSent) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      messageElement.classList.add(isSent ? 'sent' : 'received');
      messageElement.textContent = message.text;
      messagesContainer.appendChild(messageElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Funzione per inviare un messaggio
    function sendMessage() {
      const text = messageInput.value.trim();
      if (!text) return;
      
      const message = {
        id: Date.now(),
        tabId: tabId,
        text: text,
        timestamp: new Date().toISOString()
      };
      
      // Salva il messaggio nel localStorage
      localStorage.setItem('chat_message', JSON.stringify(message));
      
      // Aggiungi il messaggio alla chat come inviato
      addMessage(message, true);
      
      // Pulisci l'input
      messageInput.value = '';
      messageInput.focus();
    }
    
    // Ascolta l'evento storage per ricevere messaggi da altre schede
    window.addEventListener('storage', (event) => {
      if (event.key === 'chat_message' && event.newValue) {
        const message = JSON.parse(event.newValue);
        
        // Verifica che il messaggio non sia stato inviato da questa scheda
        if (message.tabId !== tabId) {
          addMessage(message, false);
        }
      }
    });
    
    // Aggiungi event listener
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        sendMessage();
      }
    });
  </script>
</body>
</html>
```

## Casi d'uso comuni

L'evento storage è particolarmente utile per:

1. **Sincronizzazione dello stato dell'applicazione**: mantenere sincronizzato lo stato dell'applicazione tra diverse schede o finestre.

2. **Notifiche tra schede**: inviare notifiche o messaggi da una scheda all'altra.

3. **Logout globale**: implementare un sistema di logout che chiude la sessione in tutte le schede quando l'utente effettua il logout in una di esse.

4. **Aggiornamento dei dati in tempo reale**: aggiornare i dati visualizzati in tutte le schede quando vengono modificati in una di esse.

## Limitazioni

È importante tenere presente alcune limitazioni dell'evento storage:

1. **Non viene attivato nella stessa scheda**: l'evento viene attivato solo nelle altre schede o finestre, non in quella che ha effettuato la modifica.

2. **Latenza**: può esserci un leggero ritardo nella propagazione dell'evento tra le schede.

3. **Dimensione dei dati**: il localStorage ha un limite di dimensione (generalmente 5MB), quindi è importante non sovraccaricare il sistema con dati troppo grandi.

4. **Compatibilità**: sebbene l'evento storage sia supportato da tutti i browser moderni, potrebbero esserci differenze di comportamento tra di essi.

Nel prossimo capitolo, esploreremo le limitazioni e le considerazioni di sicurezza da tenere presenti quando si utilizza il localStorage nelle applicazioni web.