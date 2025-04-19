# Scrittura del Processo Principale (main.js)

Il file main.js è il cuore dell'applicazione Electron:

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

Spiegazione delle componenti principali:
1. Importazione dei moduli Electron
2. Creazione finestra con BrowserWindow
3. Gestione ciclo di vita dell'app
4. Gestione eventi di sistema