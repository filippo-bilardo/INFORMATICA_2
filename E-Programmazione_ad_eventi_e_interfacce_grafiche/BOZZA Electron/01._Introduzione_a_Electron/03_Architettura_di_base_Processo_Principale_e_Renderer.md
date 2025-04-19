# Architettura di base: Processo Principale e Processo Renderer

Electron utilizza un'architettura multi-processo ispirata ai browser moderni, suddividendo l'applicazione in due tipi principali di processi: il Processo Principale (Main Process) e i Processi Renderer. Questa architettura garantisce sicurezza, stabilità e modularità, permettendo una chiara separazione delle responsabilità e una gestione efficiente delle risorse.

## Panoramica dell'Architettura

### Modello Multi-Processo
- Un singolo processo principale
- Multipli processi renderer (uno per ogni finestra)
- Isolamento per sicurezza e stabilità
- Comunicazione attraverso IPC (Inter-Process Communication)

## Processo Principale (Main Process)

### Responsabilità del Processo Principale
- Gestione del ciclo di vita dell'applicazione (avvio, chiusura, aggiornamenti)
- Creazione e controllo delle finestre dell'applicazione
- Accesso alle API native del sistema operativo
- Gestione degli eventi di sistema e delle notifiche
- Coordinamento della comunicazione tra processi
- Gestione del menu dell'applicazione e dei menu contestuali
- Accesso al filesystem e alle risorse di sistema
- Gestione degli aggiornamenti automatici

### Esempio di main.js
```javascript
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

## Processo Renderer (Renderer Process)

### Caratteristiche e Responsabilità
- Rendering dell'interfaccia utente usando HTML, CSS e JavaScript
- Esecuzione del codice dell'applicazione in un ambiente sandbox
- Gestione degli eventi dell'interfaccia utente
- Comunicazione con il processo principale tramite IPC
- Accesso limitato alle API di sistema per motivi di sicurezza

### Esempio di Processo Renderer (index.html)
```html
<!DOCTYPE html>
<html>
<head>
    <title>Applicazione Electron</title>
</head>
<body>
    <h1>Hello Electron!</h1>
    <button id="sendMessage">Invia Messaggio</button>
    <script src="renderer.js"></script>
</body>
</html>
```

### Esempio di renderer.js
```javascript
const sendMessageBtn = document.getElementById('sendMessage')

sendMessageBtn.addEventListener('click', () => {
    // Utilizzo delle API esposte tramite contextBridge
    window.electronAPI.sendMessage('Hello from Renderer!')
})

// Ricezione messaggi dal processo principale
window.electronAPI.receiveMessage((message) => {
    console.log('Messaggio ricevuto:', message)
})
```

## Comunicazione tra Processi (IPC)

### Preload Script
```javascript
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    sendMessage: (message) => ipcRenderer.send('message-to-main', message),
    receiveMessage: (callback) => ipcRenderer.on('message-from-main', (event, message) => callback(message))
})
```

### Gestione IPC nel Processo Principale
```javascript
const { ipcMain } = require('electron')

ipcMain.on('message-to-main', (event, message) => {
    console.log('Messaggio dal renderer:', message)
    // Risposta al renderer
    event.reply('message-from-main', 'Messaggio ricevuto!')
})
```

## Sicurezza e Best Practices

### Context Isolation
- Separazione tra il contesto del processo renderer e Node.js
- Prevenzione di attacchi XSS e injection
- Utilizzo di `contextBridge` per esporre API in modo sicuro

### Sandbox
- Limitazione dell'accesso alle API di sistema
- Protezione da codice malevolo
- Gestione sicura delle risorse

### Comunicazione Sicura
- Validazione dei messaggi IPC
- Controllo degli accessi alle API native
- Gestione degli errori e delle eccezioni
- Esecuzione in sandbox per sicurezza
- Rendering dell'interfaccia utente
- Gestione degli eventi utente
- Comunicazione con il processo principale via IPC

### Esempio di index.html
```html
<!DOCTYPE html>
<html>
<head>
  <title>App Electron</title>
</head>
<body>
  <h1>Benvenuto nell'app Electron</h1>
  <button id="sendMessage">Invia messaggio</button>
  <script src="./renderer.js"></script>
</body>
</html>
```

## Comunicazione tra processi (IPC)

### 1. Preload Script (preload.js)
```javascript
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message) => ipcRenderer.send('send-message', message),
  onResponse: (callback) => ipcRenderer.on('response', callback)
})
```

### 2. Renderer Process (renderer.js)
```javascript
document.getElementById('sendMessage').addEventListener('click', () => {
  window.electronAPI.sendMessage('Ciao dal renderer!')
})

window.electronAPI.onResponse((event, response) => {
  console.log('Risposta ricevuta:', response)
})
```

### 3. Main Process (main.js)
```javascript
ipcMain.on('send-message', (event, message) => {
  console.log('Messaggio ricevuto:', message)
  event.reply('response', 'Messaggio ricevuto con successo!')
})
```

## Best Practices

### 1. Sicurezza
- Abilitare sempre `contextIsolation`
- Utilizzare `preload` scripts per esporre API sicure
- Validare tutti i messaggi IPC
- Implementare Content Security Policy

### 2. Performance
- Minimizzare la comunicazione IPC
- Evitare operazioni pesanti nel renderer
- Utilizzare Web Workers per calcoli intensivi
- Implementare la gestione efficiente della memoria

### 3. Architettura
- Separare chiaramente la logica tra processi
- Utilizzare pattern di comunicazione appropriati
- Mantenere una struttura modulare
- Documentare le interfacce IPC

## Risorse utili
- [Documentazione ufficiale sull'architettura](https://www.electronjs.org/docs/tutorial/process-model)
- [Guida alla sicurezza](https://www.electronjs.org/docs/tutorial/security)
- [Best practices IPC](https://www.electronjs.org/docs/api/ipc-main)
- [Esempi di applicazioni](https://www.electronjs.org/apps)