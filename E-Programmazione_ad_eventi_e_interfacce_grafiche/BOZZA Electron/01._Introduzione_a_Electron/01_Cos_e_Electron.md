# Electron: Framework per Applicazioni Desktop con Tecnologie Web

## Introduzione

Electron è un potente framework open-source che rivoluziona lo sviluppo di applicazioni desktop permettendo l'utilizzo di tecnologie web familiari. Creato originariamente nel 2013 da GitHub (ora parte di Microsoft) come framework per l'editor Atom, Electron ha rapidamente guadagnato popolarità grazie alla sua capacità di unire il meglio di due mondi: la flessibilità e l'accessibilità dello sviluppo web con le funzionalità robuste delle applicazioni desktop native.

### La filosofia di Electron

Il principio fondamentale di Electron è "scrivi una volta, esegui ovunque". Questo approccio permette agli sviluppatori di concentrarsi sulla logica dell'applicazione e sull'esperienza utente senza preoccuparsi delle differenze tra sistemi operativi. La filosofia di Electron si allinea con la tendenza più ampia verso tecnologie cross-platform e contribuisce a ridurre la frammentazione nello sviluppo di software desktop.

### Componenti fondamentali

Electron integra due potenti tecnologie:

1. **Chromium**: Il progetto open-source alla base di Google Chrome, fornisce il motore di rendering per visualizzare contenuti HTML, CSS e JavaScript con supporto completo per le moderne API web.

2. **Node.js**: Runtime JavaScript lato server che consente l'accesso al filesystem, alla rete e ad altre API di sistema direttamente dal codice JavaScript.

Questa combinazione crea un ambiente unico dove gli sviluppatori possono utilizzare le librerie npm, framework frontend moderni e API native di sistema contemporaneamente.

## Architettura Dettagliata

### Processo Principale (Main Process)

Il processo principale funge da colonna vertebrale dell'applicazione Electron e presenta diverse responsabilità critiche:

#### Gestione del ciclo di vita
```javascript
const { app } = require('electron');

// Eventi del ciclo di vita
app.on('ready', createWindow);           // Applicazione pronta
app.on('window-all-closed', handleClose); // Tutte le finestre chiuse
app.on('activate', handleActivate);       // Riattivazione (macOS)
app.on('before-quit', handleBeforeQuit);  // Prima della chiusura
app.on('will-quit', handleWillQuit);      // In fase di chiusura
app.on('quit', handleQuit);               // Chiusura completata
```

#### Creazione e gestione delle finestre
```javascript
const { BrowserWindow } = require('electron');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,        // Migliora la sicurezza
      contextIsolation: true,        // Isola il contesto del renderer
      preload: path.join(__dirname, 'preload.js') // Script precaricato
    },
    backgroundColor: '#f5f5f5',      // Colore durante il caricamento
    show: false                      // Nascondi finché non è pronta
  });
  
  mainWindow.loadFile('index.html');
  // oppure
  mainWindow.loadURL('https://example.com');
  
  // Mostra la finestra quando il contenuto è pronto
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
}
```

#### Accesso alle API native
```javascript
const { dialog, shell, powerMonitor } = require('electron');

// Dialogo file system
async function selectFile() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections']
  });
  
  if (!canceled) {
    return filePaths;
  }
  return null;
}

// Apertura browser esterno
function openExternalLink(url) {
  shell.openExternal(url);
}

// Monitoraggio batteria
powerMonitor.on('on-battery', () => {
  console.log('Il dispositivo è passato all\'alimentazione a batteria');
});
```

#### Comunicazione inter-processo (IPC)
```javascript
const { ipcMain } = require('electron');

// Gestione richieste dal processo renderer
ipcMain.handle('database:query', async (event, query) => {
  try {
    const results = await database.execute(query);
    return { success: true, data: results };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Eventi one-way dal main al renderer
function notifyRenderer(window, eventName, data) {
  window.webContents.send(eventName, data);
}
```

### Processo di Rendering (Renderer Process)

I processi di rendering gestiscono l'interfaccia utente e l'interazione con l'utente:

#### Ambiente sicuro con preload script
```javascript
// preload.js - Espone API sicure al renderer
const { contextBridge, ipcRenderer } = require('electron');

// Esposizione API sicure
contextBridge.exposeInMainWorld('electronAPI', {
  queryDatabase: (query) => ipcRenderer.invoke('database:query', query),
  onUpdateAvailable: (callback) => {
    ipcRenderer.on('update:available', (_, info) => callback(info));
  },
  openFile: () => ipcRenderer.invoke('dialog:openFile')
});
```

#### Comunicazione con il processo principale
```javascript
// Nel processo renderer (script.js)
document.getElementById('query-btn').addEventListener('click', async () => {
  const query = document.getElementById('query-input').value;
  
  try {
    const result = await window.electronAPI.queryDatabase(query);
    if (result.success) {
      displayResults(result.data);
    } else {
      showError(result.error);
    }
  } catch (error) {
    showError('Errore di comunicazione');
  }
});

// Ricezione eventi dal processo principale
window.electronAPI.onUpdateAvailable((info) => {
  showUpdateNotification(info.version, info.releaseNotes);
});
```

#### Integrazione con framework moderni
```javascript
// Con React
import React, { useState, useEffect } from 'react';

function App() {
  const [files, setFiles] = useState([]);
  
  async function handleOpenFiles() {
    const selectedFiles = await window.electronAPI.openFile();
    if (selectedFiles) {
      setFiles(selectedFiles);
    }
  }
  
  useEffect(() => {
    // Ascolta notifiche dal processo principale
    const removeListener = window.electronAPI.onFileChange((newFiles) => {
      setFiles(newFiles);
    });
    
    return () => removeListener();
  }, []);
  
  return (
    <div>
      <button onClick={handleOpenFiles}>Apri File</button>
      <ul>
        {files.map(file => <li key={file}>{file}</li>)}
      </ul>
    </div>
  );
}
```

## Funzionalità Avanzate

### 1. Notifiche Native

Le notifiche native permettono all'applicazione di comunicare con l'utente anche quando non è in primo piano:

```javascript
// Nel processo principale
const { Notification } = require('electron');

function showNotification(title, body, iconPath) {
  const notification = new Notification({
    title,
    body,
    icon: iconPath,
    silent: false
  });
  
  notification.on('click', () => {
    // Azione quando l'utente clicca sulla notifica
    mainWindow.focus();
  });
  
  notification.show();
}

// Esposizione al renderer
ipcMain.handle('notification:show', (event, options) => {
  showNotification(options.title, options.body, options.icon);
});
```

### 2. Menu Contestuali

I menu contestuali personalizzati migliorano l'usabilità dell'applicazione:

```javascript
const { Menu, MenuItem } = require('electron');

function createContextMenu(window, options = {}) {
  return (params) => {
    const menu = new Menu();
    
    // Menu contestuale basato sul contenuto
    if (params.linkURL) {
      menu.append(new MenuItem({
        label: 'Apri link in browser',
        click: () => shell.openExternal(params.linkURL)
      }));
    }
    
    if (params.selectionText) {
      menu.append(new MenuItem({
        label: 'Cerca su Google',
        click: () => {
          const query = encodeURIComponent(params.selectionText);
          shell.openExternal(`https://www.google.com/search?q=${query}`);
        }
      }));
    }
    
    // Aggiungi opzioni personalizzate
    if (options.customItems) {
      options.customItems.forEach(item => menu.append(new MenuItem(item)));
    }
    
    menu.popup();
  };
}

// Implementazione
mainWindow.webContents.on('context-menu', createContextMenu(mainWindow, {
  customItems: [
    {
      label: 'Voce personalizzata',
      click: () => console.log('Azione personalizzata')
    }
  ]
}));
```

### 3. Persistenza dei Dati

La gestione dello stato dell'applicazione attraverso la persistenza dei dati:

```javascript
const Store = require('electron-store');

// Configurazione dello store
const store = new Store({
  schema: {
    theme: {
      type: 'string',
      enum: ['light', 'dark', 'system'],
      default: 'system'
    },
    windowBounds: {
      type: 'object',
      properties: {
        width: { type: 'number', minimum: 400 },
        height: { type: 'number', minimum: 300 }
      },
      default: { width: 800, height: 600 }
    }
  },
  migrations: {
    '1.0.0': (store) => {
      // Logica di migrazione dati
    }
  },
  clearInvalidConfig: true
});

// Utilizzo nel main process
function restoreWindowState(window) {
  const bounds = store.get('windowBounds');
  if (bounds) {
    window.setBounds(bounds);
  }
  
  window.on('resize', () => {
    store.set('windowBounds', window.getBounds());
  });
}
```

### 4. Aggiornamenti Automatici

Implementazione di un sistema di aggiornamenti automatici:

```javascript
const { autoUpdater } = require('electron-updater');

function setupAutoUpdater() {
  autoUpdater.logger = require('electron-log');
  autoUpdater.logger.transports.file.level = 'info';
  
  // Controlla aggiornamenti all'avvio
  autoUpdater.checkForUpdatesAndNotify();
  
  // Controlla periodicamente
  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 1000 * 60 * 60); // Ogni ora
  
  // Eventi dell'updater
  autoUpdater.on('update-available', (info) => {
    mainWindow.webContents.send('update:available', info);
  });
  
  autoUpdater.on('update-downloaded', (info) => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Aggiornamento pronto',
      message: `La versione ${info.version} è pronta per essere installata`,
      buttons: ['Installa ora', 'Installa più tardi']
    }).then(({ response }) => {
      if (response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
  });
}
```

## Ottimizzazione delle Performance

### 1. Gestione della memoria

La gestione efficiente della memoria è cruciale per applicazioni Electron:

```javascript
// Nel processo principale
function monitorMemoryUsage() {
  const memoryInfo = process.getProcessMemoryInfo();
  console.log(`Memoria utilizzata: ${memoryInfo.residentSet / 1024 / 1024} MB`);
  
  // Monitora l'uso di memoria dei renderer
  const webContents = BrowserWindow.getAllWindows()
    .map(win => win.webContents);
  
  Promise.all(webContents.map(wc => wc.getProcessMemoryInfo()))
    .then(results => {
      results.forEach((info, i) => {
        console.log(`Finestra ${i}: ${info.residentSet / 1024 / 1024} MB`);
      });
    });
}

// Svuota cache
function clearCache() {
  const session = mainWindow.webContents.session;
  return session.clearCache();
}

// Gestione leak di memoria
function handleMemoryPressure() {
  app.on('render-process-gone', (event, webContents, details) => {
    console.error('Processo renderer terminato:', details.reason);
    // Logica di recovery
  });
}
```

### 2. Caricamento lazy e code splitting

Migliorare i tempi di avvio dell'applicazione:

```javascript
// Nel processo principale
let splashScreen = null;
let mainWindow = null;

app.on('ready', async () => {
  // Mostra splash screen
  splashScreen = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    transparent: true,
    alwaysOnTop: true
  });
  
  splashScreen.loadFile('splash.html');
  
  // Carica risorse in background
  await preloadResources();
  
  // Inizializza main window
  mainWindow = new BrowserWindow({/* configurazione */});
  await mainWindow.loadFile('index.html');
  
  // Chiudi splash e mostra main
  splashScreen.close();
  mainWindow.show();
});

// Nel renderer con webpack
// webpack.config.js
module.exports = {
  output: {
    chunkFilename: '[name].bundle.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};

// Utilizzo dinamico
import('./heavy-module.js').then(module => {
  // Utilizzo del modulo caricato on-demand
});
```

## Sicurezza Avanzata

### 1. Content Security Policy (CSP)

Protezione contro attacchi XSS e iniezione di codice:

```html
<!-- Nel file HTML -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://api.example.com">
```

```javascript
// Nel processo principale
function setSecurityHeaders(window) {
  window.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; " +
          "script-src 'self'; " +
          "style-src 'self' 'unsafe-inline'; " +
          "img-src 'self' data:; " +
          "connect-src 'self' https://api.example.com"
        ]
      }
    });
  });
}
```

### 2. Validazione avanzata degli input

Protezione contro attacchi di iniezione:

```javascript
// Nel renderer
import { z } from 'zod';

// Schema di validazione
const UserInputSchema = z.object({
  username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  age: z.number().int().positive().lte(120)
});

// Validazione input
function validateAndProcessForm(formData) {
  try {
    const validData = UserInputSchema.parse({
      username: formData.username,
      email: formData.email,
      age: parseInt(formData.age, 10)
    });
    
    // Procedi con i dati validati
    window.electronAPI.submitForm(validData);
  } catch (error) {
    // Mostra errori di validazione
    displayValidationErrors(error.errors);
  }
}
```

### 3. Isolation completa
```javascript
// Nel processo principale
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,         // Disabilita Node.js nel renderer
    contextIsolation: true,         // Isola il contesto globale
    sandbox: true,                  // Abilita sandbox per il renderer
    webSecurity: true,              // Abilita Same-Origin Policy
    allowRunningInsecureContent: false, // Blocca contenuto misto HTTP/HTTPS
    preload: path.join(__dirname, 'preload.js')
  }
});

// Restrizione navigazione
mainWindow.webContents.on('will-navigate', (event, url) => {
  const allowedDomains = ['localhost', 'example.com'];
  const parsedUrl = new URL(url);
  
  if (!allowedDomains.includes(parsedUrl.hostname)) {
    event.preventDefault();
    // Redirectione a browser esterno
    shell.openExternal(url);
  }
});
```

## Internazionalizzazione (i18n)

Supporto multilingua per applicazioni globali:

```javascript
// Nel main process
const fs = require('fs');
const path = require('path');

// Caricamento traduzioni
function loadTranslations() {
  const localesDir = path.join(__dirname, 'locales');
  const translations = {};
  
  fs.readdirSync(localesDir).forEach(file => {
    const locale = path.basename(file, '.json');
    translations[locale] = require(path.join(localesDir, file));
  });
  
  return translations;
}

const translations = loadTranslations();

// Configurazione locale nel preload
contextBridge.exposeInMainWorld('i18n', {
  setLocale: (locale) => ipcRenderer.invoke('i18n:setLocale', locale),
  getTranslation: (key) => ipcRenderer.invoke('i18n:getTranslation', key)
});

// Gestione IPC
let currentLocale = app.getLocale() || 'en';

ipcMain.handle('i18n:setLocale', (event, locale) => {
  if (translations[locale]) {
    currentLocale = locale;
    return true;
  }
  return false;
});

ipcMain.handle('i18n:getTranslation', (event, key) => {
  const keys = key.split('.');
  let translation = translations[currentLocale];
  
  for (const k of keys) {
    if (translation && translation[k]) {
      translation = translation[k];
    } else {
      return key; // Fallback
    }
  }
  
  return translation;
});
```

## Automazione dei Test

Framework per il testing di applicazioni Electron:

```javascript
// Test con Spectron
const { Application } = require('spectron');
const assert = require('assert');
const path = require('path');

describe('Application Test', function() {
  this.timeout(10000);
  
  let app;
  
  beforeEach(async () => {
    app = new Application({
      path: electron,
      args: [path.join(__dirname, '..')],
      webdriverOptions: {
        deprecationWarnings: false
      }
    });
    
    await app.start();
  });
  
  afterEach(async () => {
    if (app && app.isRunning()) {
      await app.stop();
    }
  });
  
  it('shows main window', async () => {
    const windowCount = await app.client.getWindowCount();
    assert.strictEqual(windowCount, 1);
  });
  
  it('has the correct title', async () => {
    const title = await app.client.getTitle();
    assert.strictEqual(title, 'La mia App Electron');
  });
  
  it('performs login', async () => {
    await app.client.$('#username').setValue('testuser');
    await app.client.$('#password').setValue('password');
    await app.client.$('#login-btn').click();
    
    // Verifica login riuscito
    const welcomeText = await app.client.$('#welcome-message').getText();
    assert.strictEqual(welcomeText, 'Benvenuto, testuser!');
  });
});
```

## Packaging e Distribuzione

### 1. Configurazione avanzata con electron-builder

```javascript
// package.json
"build": {
  "appId": "com.example.app",
  "productName": "MyElectronApp",
  "copyright": "Copyright © 2023 Company",
  "asar": true,
  "asarUnpack": [
    "node_modules/ffmpeg-binary/**/*"
  ],
  "directories": {
    "output": "dist",
    "buildResources": "build"
  },
  "files": [
    "dist/**/*",
    "!**/*.map"
  ],
  "extraResources": [
    {
      "from": "resources",
      "to": "resources"
    }
  ],
  "win": {
    "target": [
      {
        "target": "nsis",
        "arch": ["x64", "ia32"]
      },
      {
        "target": "portable"
      }
    ],
    "icon": "build/icon.ico",
    "publisherName": "Your Company"
  },
  "mac": {
    "target": ["dmg", "zip"],
    "icon": "build/icon.icns",
    "category": "public.app-category.developer-tools",
    "hardenedRuntime": true,
    "entitlements": "build/entitlements.mac.plist"
  },
  "linux": {
    "target": ["AppImage", "deb", "rpm"],
    "icon": "build/icons",
    "desktop": {
      "StartupWMClass": "MyElectronApp"
    },
    "category": "Development"
  },
  "publish": {
    "provider": "github",
    "owner": "username",
    "repo": "repository"
  }
}
```

### 2. Script di rilascio automatizzato
```javascript
// scripts/release.js
const builder = require('electron-builder');
const { execSync } = require('child_process');
const semver = require('semver');
const fs = require('fs');

async function release() {
  // Ottieni versione corrente
  const pkg = require('../package.json');
  const currentVersion = pkg.version;
  
  // Incrementa versione (patch)
  const newVersion = semver.inc(currentVersion, 'patch');
  pkg.version = newVersion;
  
  // Aggiorna package.json
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
  
  // Aggiorna CHANGELOG
  execSync(`echo "## ${newVersion} (${new Date().toISOString().split('T')[0]})\n\n* Feature X\n* Bug fix Y\n\n$(cat CHANGELOG.md)" > CHANGELOG.md`);
  
  // Commit modifiche
  execSync('git add package.json CHANGELOG.md');
  execSync(`git commit -m "Release v${newVersion}"`);
  execSync(`git tag v${newVersion}`);
  
  // Build per piattaforme
  await builder.build({
    targets: builder.Platform.ALL.createTarget(),
    config: {
      // Configurazioni aggiuntive
    }
  });
  
  // Push a remote
  execSync('git push');
  execSync('git push --tags');
  
  console.log(`Released v${newVersion} successfully!`);
}

release().catch(err => {
  console.error('Release failed:', err);
  process.exit(1);
});
```

## Esercizi Pratici

### Esercizio 1: Creazione di una semplice applicazione Todo
**Obiettivo**: Creare un'applicazione per gestire liste di attività con persistenza dei dati.

**Requisiti**:
1. Interfaccia con campi per aggiungere nuovi task
2. Lista di task con opzione di completamento
3. Persistenza dei dati anche dopo il riavvio
4. Notifica desktop quando un task ha una scadenza imminente

**Suggerimenti**:
- Utilizzare electron-store per la persistenza
- Implementare notifiche native
- Creare un'interfaccia responsive

### Esercizio 2: Editor di testi markdown
**Obiettivo**: Realizzare un semplice editor markdown con anteprima in tempo reale.

**Requisiti**:
1. Area di editing con evidenziazione della sintassi
2. Pannello di anteprima che si aggiorna in tempo reale
3. Funzionalità di salvataggio/apertura file
4. Menu contestuale con formattazione rapida

**Suggerimenti**:
- Utilizzare CodeMirror o Monaco Editor per l'editor
- Implementare marked.js per il rendering markdown
- Gestire il filesystem con le API di Node.js

### Esercizio 3: Sistema di aggiornamenti automatici
**Obiettivo**: Implementare un sistema completo di aggiornamenti automatici.

**Requisiti**:
1. Verifica di nuovi aggiornamenti all'avvio
2. Download in background
3. Interfaccia per mostrare lo stato di avanzamento
4. Installazione automatica o manuale

**Suggerimenti**:
- Utilizzare electron-updater
- Implementare un server di aggiornamenti di test
- Gestire errori di connessione/download

## Domande di Autovalutazione

1. Qual è la differenza principale tra il processo principale e il processo di rendering in Electron?
   a) Il processo principale gestisce l'interfaccia grafica mentre il processo di rendering gestisce le API di sistema
   b) Il processo principale ha accesso diretto alle API di sistema mentre il processo di rendering gestisce l'interfaccia utente
   c) Non c'è differenza, sono termini intercambiabili
   d) Il processo principale gestisce solo la comunicazione di rete, mentre il processo di rendering gestisce tutto il resto

2. Quale tecnologia NON è parte del core di Electron?
   a) Node.js
   b) Chromium
   c) React
   d) V8

3. Qual è il metodo corretto per comunicare tra il processo principale e il processo di rendering?
   a) Condivisione di memoria
   b) Socket TCP
   c) IPC (Inter-Process Communication)
   d) Local Storage

4. Qual è una best practice di sicurezza per le applicazioni Electron?
   a) Abilitare sempre nodeIntegration
   b) Disabilitare contextIsolation
   c) Utilizzare Content Security Policy (CSP)
   d) Consentire la navigazione a qualsiasi URL

5. Come si può ottimizzare il tempo di avvio di un'applicazione Electron?
   a) Aumentare la dimensione dell'eseguibile
   b) Implementare il caricamento lazy di moduli e risorse
   c) Disabilitare l'asar packaging
   d) Aumentare il numero di processi di rendering

## Risposte alle Domande di Autovalutazione

1. Risposta: b) Il processo principale ha accesso diretto alle API di sistema mentre il processo di rendering gestisce l'interfaccia utente.
   Il processo principale in Electron è responsabile della gestione del ciclo di vita dell'applicazione e dell'accesso alle API native, mentre i processi di rendering si occupano della visualizzazione dell'interfaccia utente e dell'esecuzione del codice JavaScript relativo alla UI.

2. Risposta: c) React
   React è un framework UI popolare che può essere utilizzato con Electron, ma non fa parte del core di Electron. I componenti fondamentali di Electron sono Node.js e Chromium.

3. Risposta: c) IPC (Inter-Process Communication)
   Electron utilizza IPC per la comunicazione tra il processo principale e i processi di rendering, fornendo metodi come ipcMain.handle() e ipcRenderer.invoke() per implementare un pattern request-response sicuro.

4. Risposta: c) Utilizzare Content Security Policy (CSP)
   L'implementazione di CSP è una best practice di sicurezza che previene attacchi di tipo XSS limitando le origini da cui possono essere caricati script, stili e altre risorse.

5. Risposta: b) Implementare il caricamento lazy di moduli e risorse
   Il caricamento lazy permette di caricare solo le risorse essenziali all'avvio e differire il caricamento di moduli o componenti pesanti fino a quando non sono effettivamente necessari, migliorando significativamente i tempi di avvio.

## Risorse e Strumenti Avanzati

### 1. Librerie specializzate per Electron

- **electron-log**: Sistema di logging avanzato per applicazioni desktop
- **electron-devtools-installer**: Installazione automatica di estensioni DevTools
- **electron-context-menu**: Creazione semplificata di menu contestuali
- **electron-reload**: Hot-reload durante lo sviluppo

### 2. Strumenti di sviluppo

- **electron-fiddle**: Ambiente sandbox per esperimenti rapidi
- **electron-webpack**: Configurazione webpack ottimizzata per Electron
- **electron-react-boilerplate**: Template completo per applicazioni React+Electron
- **spectron**: Framework di test end-to-end per applicazioni Electron

### 3. Comunità e supporto

- **Forums elettron**: [https://discuss.atom.io/c/electron](https://discuss.atom.io/c/electron)
- **Discord Electron**: Canale di comunicazione per supporto in tempo reale
- **Awesome Electron**: Repository di risorse, tutorial e librerie curate

