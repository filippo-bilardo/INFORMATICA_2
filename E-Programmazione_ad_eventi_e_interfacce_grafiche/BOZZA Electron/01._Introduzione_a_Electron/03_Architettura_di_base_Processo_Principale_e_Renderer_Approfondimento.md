# Approfondimento: Architettura di Electron e Comunicazione tra Processi

## Architettura Multi-Processo in Dettaglio

### Diagramma dell'Architettura
```svg
<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
  <!-- Main Process -->
  <rect x="50" y="50" width="200" height="300" fill="#e6f3ff" stroke="#0066cc" stroke-width="2"/>
  <text x="150" y="80" text-anchor="middle" font-weight="bold">Main Process</text>
  
  <!-- Main Process Components -->
  <rect x="70" y="100" width="160" height="40" fill="#ffffff" stroke="#0066cc"/>
  <text x="150" y="125" text-anchor="middle" font-size="12">Node.js Runtime</text>
  
  <rect x="70" y="150" width="160" height="40" fill="#ffffff" stroke="#0066cc"/>
  <text x="150" y="175" text-anchor="middle" font-size="12">System APIs</text>
  
  <rect x="70" y="200" width="160" height="40" fill="#ffffff" stroke="#0066cc"/>
  <text x="150" y="225" text-anchor="middle" font-size="12">Window Management</text>
  
  <!-- Renderer Process -->
  <rect x="550" y="50" width="200" height="300" fill="#f3ffe6" stroke="#66cc00" stroke-width="2"/>
  <text x="650" y="80" text-anchor="middle" font-weight="bold">Renderer Process</text>
  
  <!-- Renderer Components -->
  <rect x="570" y="100" width="160" height="40" fill="#ffffff" stroke="#66cc00"/>
  <text x="650" y="125" text-anchor="middle" font-size="12">Chromium</text>
  
  <rect x="570" y="150" width="160" height="40" fill="#ffffff" stroke="#66cc00"/>
  <text x="650" y="175" text-anchor="middle" font-size="12">Web APIs</text>
  
  <rect x="570" y="200" width="160" height="40" fill="#ffffff" stroke="#66cc00"/>
  <text x="650" y="225" text-anchor="middle" font-size="12">UI Components</text>
  
  <!-- IPC Communication -->
  <path d="M 250 170 L 550 170" stroke="#ff6600" stroke-width="2" stroke-dasharray="5,5"/>
  <text x="400" y="150" text-anchor="middle" fill="#ff6600">IPC Communication</text>
</svg>
```

## Comunicazione IPC in Dettaglio

### 1. Comunicazione dal Main al Renderer
```javascript
// main.js
const { app, BrowserWindow, ipcMain } = require('electron')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // Invia un messaggio al renderer
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('main-message', 'Hello from main!')
  })
}

// Gestisce i messaggi dal renderer
ipcMain.on('renderer-message', (event, message) => {
  console.log('Messaggio dal renderer:', message)
  // Risponde al renderer
  event.reply('main-reply', 'Messaggio ricevuto!')
})
```

### 2. Preload Script per Context Bridge
```javascript
// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // Metodi per inviare messaggi al main process
  sendToMain: (message) => ipcRenderer.send('renderer-message', message),
  
  // Metodi per ricevere messaggi dal main process
  onMainMessage: (callback) => {
    ipcRenderer.on('main-message', (event, message) => callback(message))
  },
  
  onMainReply: (callback) => {
    ipcRenderer.on('main-reply', (event, message) => callback(message))
  }
})
```

### 3. Renderer Process con Pattern Observer
```javascript
// renderer.js
class MessageHandler {
  constructor() {
    this.observers = []
    this.initializeListeners()
  }

  addObserver(observer) {
    this.observers.push(observer)
  }

  notifyObservers(message) {
    this.observers.forEach(observer => observer(message))
  }

  initializeListeners() {
    // Ascolta messaggi dal main process
    window.electronAPI.onMainMessage((message) => {
      this.notifyObservers(message)
    })

    window.electronAPI.onMainReply((reply) => {
      this.notifyObservers(reply)
    })
  }

  sendMessage(message) {
    window.electronAPI.sendToMain(message)
  }
}

// Utilizzo
const messageHandler = new MessageHandler()

// Aggiungi observer per i messaggi
messageHandler.addObserver((message) => {
  console.log('Nuovo messaggio:', message)
  // Aggiorna UI
  document.getElementById('messages').textContent = message
})

// Invia un messaggio al main process
document.getElementById('sendBtn').addEventListener('click', () => {
  messageHandler.sendMessage('Hello from renderer!')
})
```

## Best Practices per la Comunicazione IPC

### 1. Sicurezza
- Utilizzare sempre `contextIsolation: true`
- Implementare validazione dei messaggi
- Limitare l'esposizione delle API attraverso preload

### 2. Performance
- Minimizzare la frequenza dei messaggi
- Utilizzare eventi per comunicazioni asincrone
- Implementare debouncing per eventi frequenti

### 3. Manutenibilità
- Organizzare i canali IPC in moduli
- Documentare tutti i canali di comunicazione
- Implementare gestione errori robusta

## Esempi di Pattern Comuni

### 1. Request-Response Pattern
```javascript
// main.js
ipcMain.handle('database-query', async (event, query) => {
  try {
    const result = await database.execute(query)
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

// renderer.js
async function queryDatabase(query) {
  try {
    const result = await window.electronAPI.invokeQuery(query)
    if (result.success) {
      return result.data
    } else {
      throw new Error(result.error)
    }
  } catch (error) {
    console.error('Query failed:', error)
    throw error
  }
}
```

### 2. Pub/Sub Pattern
```javascript
// main.js
class EventManager {
  constructor() {
    this.windows = new Set()
  }

  addWindow(window) {
    this.windows.add(window)
  }

  removeWindow(window) {
    this.windows.delete(window)
  }

  broadcast(channel, data) {
    for (const window of this.windows) {
      if (!window.isDestroyed()) {
        window.webContents.send(channel, data)
      }
    }
  }
}

const eventManager = new EventManager()

// Esempio di broadcast
setInterval(() => {
  eventManager.broadcast('system-status', {
    memory: process.memoryUsage(),
    cpu: process.cpuUsage()
  })
}, 5000)
```

## Gestione degli Errori e Debugging

### 1. Error Handling
```javascript
// preload.js
contextBridge.exposeInMainWorld('electronAPI', {
  async invokeOperation(data) {
    try {
      const result = await ipcRenderer.invoke('operation', data)
      return result
    } catch (error) {
      console.error('Operation failed:', error)
      throw new Error(`Operation failed: ${error.message}`)
    }
  }
})

// main.js
ipcMain.handle('operation', async (event, data) => {
  try {
    // Validazione input
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid input data')
    }
    
    // Esegui operazione
    const result = await performOperation(data)
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: error.message }
  }
})
```

### 2. Debugging
```javascript
// main.js
function setupDebugListeners() {
  if (process.env.NODE_ENV === 'development') {
    ipcMain.on('debug-log', (event, data) => {
      console.log('[Debug]', data)
    })

    // Monitor IPC traffic
    const originalSend = BrowserWindow.prototype.webContents.send
    BrowserWindow.prototype.webContents.send = function(...args) {
      console.log('[IPC Send]', args)
      return originalSend.apply(this, args)
    }
  }
}
```