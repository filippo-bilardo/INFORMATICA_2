# Modulo 2: Introduzione a Electron

## Obiettivi di apprendimento
- Comprendere l'architettura di Electron e il suo funzionamento
- Configurare un ambiente di sviluppo per applicazioni Electron
- Creare una prima applicazione Electron funzionante
- Implementare la comunicazione tra processi main e renderer
- Sviluppare un'applicazione desktop di base con funzionalità interattive

## 2.1 Architettura di Electron (processi main e renderer)

### Cos'è Electron?
Electron è un framework open-source che permette di sviluppare applicazioni desktop multi-piattaforma utilizzando tecnologie web come HTML, CSS e JavaScript. Creato da GitHub, Electron combina Chromium (il progetto open-source alla base di Google Chrome) e Node.js in un unico runtime.

### Architettura a processi multipli
Electron utilizza un'architettura a processi multipli, simile a quella di Chromium. Ci sono due tipi principali di processi:

#### Processo Main (Principale)
Il processo main è il punto di ingresso dell'applicazione. È responsabile di:
- Gestire il ciclo di vita dell'applicazione
- Creare e gestire le finestre dell'applicazione (BrowserWindow)
- Gestire gli eventi di sistema
- Accedere alle API native del sistema operativo
- Coordinare i processi renderer

```javascript
// Esempio di processo main (main.js)
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  // Crea una finestra del browser
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Carica il file HTML
  mainWindow.loadFile('index.html');
}

// Quando Electron ha terminato l'inizializzazione
app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', function () {
    // Su macOS è comune ricreare una finestra quando
    // l'icona del dock viene cliccata e non ci sono altre finestre aperte
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Chiudi l'applicazione quando tutte le finestre sono chiuse (Windows e Linux)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
```

#### Processi Renderer (Visualizzazione)
I processi renderer sono responsabili della visualizzazione dell'interfaccia utente. Ogni finestra (BrowserWindow) ha il proprio processo renderer. Questi processi:
- Eseguono il codice HTML, CSS e JavaScript
- Gestiscono l'interazione con l'utente
- Possono comunicare con il processo main tramite IPC (Inter-Process Communication)
- Hanno accesso limitato alle API di sistema per motivi di sicurezza

```html
<!-- Esempio di processo renderer (index.html) -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Hello Electron!</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Hello Electron!</h1>
  <p>Benvenuto nella tua prima applicazione Electron.</p>
  <button id="btn">Clicca qui</button>
  
  <script src="renderer.js"></script>
</body>
</html>
```

```javascript
// renderer.js
document.getElementById('btn').addEventListener('click', () => {
  console.log('Pulsante cliccato!');
  // Qui utilizzeremo l'IPC per comunicare con il processo main
});
```

### Preload Scripts
I preload scripts sono un ponte tra il processo renderer e il processo main. Vengono eseguiti prima che il processo renderer carichi il contenuto web e hanno accesso sia alle API di Node.js che alle API del DOM.

```javascript
// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// Espone funzionalità sicure al processo renderer tramite contextBridge
contextBridge.exposeInMainWorld('electron', {
  // Espone metodi per comunicare con il processo main
  sendMessage: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receiveMessage: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  }
});
```

## 2.2 Setup dell'ambiente di sviluppo

### Requisiti di sistema
- Node.js (versione LTS consigliata)
- npm (incluso con Node.js)
- Un editor di codice (VS Code consigliato)
- Git (opzionale, ma consigliato)

### Inizializzazione di un progetto Electron

1. **Creazione di una nuova directory per il progetto**
```bash
mkdir my-electron-app
cd my-electron-app
```

2. **Inizializzazione del progetto npm**
```bash
npm init -y
```

3. **Installazione di Electron come dipendenza di sviluppo**
```bash
npm install --save-dev electron
```

4. **Modifica del file package.json**
```json
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "description": "La mia prima applicazione Electron",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["electron", "desktop", "application"],
  "author": "Il tuo nome",
  "license": "MIT",
  "devDependencies": {
    "electron": "^XX.0.0" // La versione dipenderà da quando installi Electron
  }
}
```

5. **Creazione dei file di base**

- `main.js` (processo main)
- `preload.js` (script di precaricamento)
- `index.html` (interfaccia utente)
- `renderer.js` (logica dell'interfaccia utente)
- `styles.css` (stili dell'interfaccia utente)

### Strumenti di sviluppo utili

- **Electron Forge**: Strumento completo per creare, pacchettizzare e distribuire applicazioni Electron
```bash
npm install --save-dev @electron-forge/cli
npx electron-forge import
```

- **Electron Reload**: Per il ricaricamento automatico durante lo sviluppo
```bash
npm install --save-dev electron-reload
```

- **DevTools Extension**: Per utilizzare le estensioni di Chrome DevTools
```javascript
// Nel processo main
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

app.whenReady().then(() => {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension: ${name}`));
});
```

## 2.3 Creazione della prima applicazione

### Struttura del progetto
```
my-electron-app/
├── node_modules/
├── main.js
├── preload.js
├── index.html
├── renderer.js
├── styles.css
└── package.json
```

### Implementazione del processo main

```javascript
// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Mantieni un riferimento globale all'oggetto window
let mainWindow;

function createWindow() {
  // Crea la finestra del browser
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Carica il file HTML dell'applicazione
  mainWindow.loadFile('index.html');

  // Apri il DevTools (opzionale)
  // mainWindow.webContents.openDevTools();

  // Emesso quando la finestra viene chiusa
  mainWindow.on('closed', function () {
    // Dereferenzia l'oggetto window
    mainWindow = null;
  });
}

// Questo metodo viene chiamato quando Electron ha terminato
// l'inizializzazione ed è pronto a creare le finestre del browser.
app.whenReady().then(createWindow);

// Esci quando tutte le finestre sono chiuse, eccetto su macOS
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // Su macOS è comune ricreare una finestra quando
  // l'icona del dock viene cliccata e non ci sono altre finestre aperte
  if (mainWindow === null) createWindow();
});

// Gestione dei messaggi IPC dal renderer
ipcMain.on('saluta', (event, nome) => {
  console.log(`Saluto ricevuto da: ${nome}`);
  // Invia una risposta al renderer
  mainWindow.webContents.send('risposta-saluto', `Ciao ${nome}, benvenuto in Electron!`);
});
```

### Implementazione del preload script

```javascript
// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// Espone API sicure al renderer
contextBridge.exposeInMainWorld('api', {
  // Invia un messaggio al processo main
  saluta: (nome) => ipcRenderer.send('saluta', nome),
  
  // Ricevi messaggi dal processo main
  onSalutoRisposta: (callback) => {
    ipcRenderer.on('risposta-saluto', (event, ...args) => callback(...args));
  }
});
```

### Implementazione dell'interfaccia utente

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>La mia prima app Electron</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Benvenuto in Electron!</h1>
    <p>Questa è la tua prima applicazione desktop con Electron.</p>
    
    <div class="form-group">
      <label for="nome">Il tuo nome:</label>
      <input type="text" id="nome" placeholder="Inserisci il tuo nome">
      <button id="btn-saluta">Saluta</button>
    </div>
    
    <div id="risposta" class="risposta"></div>
  </div>
  
  <script src="renderer.js"></script>
</body>
</html>
```

### Implementazione della logica del renderer

```javascript
// renderer.js
document.addEventListener('DOMContentLoaded', () => {
  const btnSaluta = document.getElementById('btn-saluta');
  const inputNome = document.getElementById('nome');
  const divRisposta = document.getElementById('risposta');
  
  // Gestione del click sul pulsante
  btnSaluta.addEventListener('click', () => {
    const nome = inputNome.value.trim();
    if (nome) {
      // Invia il nome al processo main
      window.api.saluta(nome);
    } else {
      divRisposta.textContent = 'Per favore, inserisci il tuo nome.';
    }
  });
  
  // Ascolta le risposte dal processo main
  window.api.onSalutoRisposta((messaggio) => {
    divRisposta.textContent = messaggio;
  });
});
```

### Stili CSS

```css
/* styles.css */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  color: #333;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-top: 50px;
}

h1 {
  color: #2c3e50;
  text-align: center;
}

.form-group {
  margin: 20px 0;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

.risposta {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-left: 4px solid #3498db;
  border-radius: 4px;
  min-height: 20px;
}
```

### Esecuzione dell'applicazione

Per avviare l'applicazione, esegui il seguente comando nella directory del progetto:

```bash
npm start
```

Questo comando avvierà Electron e caricherà la tua applicazione. Dovresti vedere una finestra con l'interfaccia utente che hai creato.

## 2.4 Comunicazione tra processi

La comunicazione tra i processi main e renderer è un aspetto fondamentale di Electron. Questa comunicazione avviene tramite il modulo IPC (Inter-Process Communication).

### IPC (Inter-Process Communication)

Electron fornisce due moduli per la comunicazione IPC:
- `ipcMain`: Utilizzato nel processo main per ricevere messaggi dai processi renderer e inviare risposte
- `ipcRenderer`: Utilizzato nei processi renderer per inviare messaggi al processo main e ricevere risposte

### Pattern di comunicazione

#### 1. Renderer a Main (one-way)

```javascript
// Nel processo renderer (tramite preload)
window.api.send('canale', dati);

// Nel processo main
ipcMain.on('canale', (event, dati) => {
  console.log('Dati ricevuti:', dati);
});
```

#### 2. Renderer a Main con risposta (request-response)

```javascript
// Nel processo renderer (tramite preload)
const risposta = await window.api.invoke('canale', dati);
console.log('Risposta ricevuta:', risposta);

// Nel processo main
ipcMain.handle('canale', async (event, dati) => {
  // Elaborazione dei dati
  return risultato;
});
```

#### 3. Main a Renderer

```javascript
// Nel processo main
mainWindow.webContents.send('canale', dati);

// Nel processo renderer (tramite preload)
window.api.receive('canale', (dati) => {
  console.log('Dati ricevuti dal main:', dati);
});
```

### Esempio completo di comunicazione IPC

#### Preload script avanzato

```javascript
// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Invia un messaggio al processo main (one-way)
  send: (channel, data) => {
    // Whitelist dei canali consentiti
    const validChannels = ['saluta', 'log-event'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  
  // Invia un messaggio al processo main e attende una risposta
  invoke: async (channel, data) => {
    const validChannels = ['get-data', 'save-data'];
    if (validChannels.includes(channel)) {
      return await ipcRenderer.invoke(channel, data);
    }
  },
  
  // Riceve messaggi dal processo main
  receive: (channel, func) => {
    const validChannels = ['risposta-saluto', 'update-available', 'error'];
    if (validChannels.includes(channel)) {
      // Rimuovi i vecchi listener per evitare duplicati
      ipcRenderer.removeAllListeners(channel);
      // Aggiungi il nuovo listener
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});
```

#### Processo main con gestione IPC avanzata

```javascript
// Parte del main.js relativa all'IPC
const { ipcMain } = require('electron');
const fs = require('fs').promises;
const path = require('path');

// Gestione dei messaggi one-way
ipcMain.on('saluta', (event, nome) => {
  console.log(`Saluto ricevuto da: ${nome}`);
  mainWindow.webContents.send('risposta-saluto', `Ciao ${nome}, benvenuto in Electron!`);
});

ipcMain.on('log-event', (event, dati) => {
  console.log('Evento registrato:', dati);
  // Qui potresti salvare i log su un file
});

// Gestione dei messaggi request-response
ipcMain.handle('get-data', async (event, query) => {
  try {
    // Simulazione di recupero dati
    const dataPath = path.join(__dirname, 'data.json');
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
    return { error: 'Impossibile recuperare i dati' };
  }
});

ipcMain.handle('save-data', async (event, data) => {
  try {
    // Simulazione di salvataggio dati
    const dataPath = path.join(__dirname, 'data.json');
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    return { success: true, message: 'Dati salvati con successo' };
  } catch (error) {
    console.error('Errore nel salvataggio dei dati:', error);
    return { success: false, error: 'Impossibile salvare i dati' };
  }
});

// Invio di messaggi dal main al renderer
function notifyRenderer(message) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('update-available', message);
  }
}
```

## Progetto: Creazione di un'applicazione desktop di base

### Descrizione
In questo progetto, creeremo un'applicazione desktop per prendere note con funzionalità di salvataggio e caricamento. L'applicazione utilizzerà Electron per creare un'interfaccia utente nativa e il file system per la persistenza dei dati.

### Requisiti funzionali
- Interfaccia utente per creare, modificare e salvare note
- Salvataggio delle note su file
- Caricamento delle note salvate
- Funzionalità di ricerca nelle note

### Struttura dei file
```
note-app/
├── node_modules/
├── main.js
├── preload.js
├── renderer.js
├── index.html
├── styles.css
├── data/
│   └── notes.json
└── package.json
```

### Implementazione

#### package.json
```json
{
  "name": "electron-note-app",
  "version": "1.0.0",
  "description": "Un'applicazione per prendere note con Electron",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder"
  },
  "keywords": ["electron", "notes", "desktop"],
  "author": "Il tuo nome",
  "license": "MIT",
  "devDependencies": {
    "electron": "^13.0.0",
    "electron-builder": "^22.11.7"
  }
}
```

#### main.js
```javascript
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;

let mainWindow;
const dataDir = path.join(app.getPath('userData'), 'data');
const notesFile = path.join(dataDir, 'notes.json');

// Assicurati che la directory dei dati esista
async function ensureDataDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    console.error('Errore nella creazione della directory dei dati:', error);
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile('index.html');

  // Apri DevTools in modalità sviluppo
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(async () => {
  await ensureDataDir();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Gestione IPC per le note
ipcMain.handle('get-notes', async () => {
  try {
    const data = await fs.readFile(notesFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Se il file non esiste, restituisci un array vuoto
    return [];
  }
});

ipcMain.handle('save-note', async (event, note) => {
  try {
    let notes = [];
    
    try {
      const data = await fs.readFile(notesFile, 'utf8');
      notes = JSON.parse(data);
    } catch (error) {
      // Se il file non esiste, usa un array vuoto
    }
    
    // Se la nota ha un id, aggiornala, altrimenti aggiungila
    if (note.id) {
      const index = notes.findIndex(n => n.id === note.id);
      if (index !== -1) {
        notes[index] = note;
      } else {
        notes.push(note);
      }
    } else {
      // Crea un nuovo id per la nota
      note.id = Date.now().toString();
      notes.push(note);
    }
    
    await fs.writeFile(notesFile, JSON.stringify(notes, null, 2));
    return { success: true, note };
  } catch (error) {
    console.error('Errore nel salvataggio della nota:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('delete-note', async (event, noteId) => {
  try {
    const data = await fs.readFile(notesFile, 'utf8');
    let notes = JSON.parse(data);
    
    notes = notes.filter(note => note.id !== noteId);
    
    await fs.writeFile(notesFile, JSON.stringify(notes, null, 2));
    return { success: true };
  } catch (error) {
    console.error('Errore nell\'eliminazione della nota:', error);
    return { success: false, error: error.message };
  }
});
```

#### preload.js
```javascript
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Ottieni tutte le note
  getNotes: async () => {
    return await ipcRenderer.invoke('get-notes');
  },
  
  // Salva una nota
  saveNote: async (note) => {
    return await ipcRenderer.invoke('save-note', note);
  },
  
  // Elimina una nota
  deleteNote: async (noteId) => {
    return await ipcRenderer.invoke('delete-note', noteId);
  }
});
```

#### index.html
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Note App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>Le mie note</h2>
        <button id="new-note">Nuova nota</button>
      </div>
      <div class="search-box">
        <input type="text" id="search" placeholder="Cerca nelle note...">
      </div>
      <ul id="notes-list" class="notes-list"></ul>
    </div>
    
    <div class="editor">
      <div class="editor-header">
        <input type="text" id="note-title" placeholder="Titolo della nota">
        <div class="editor-actions">
          <button id="save-note">Salva</button>
          <button id="delete-note">Elimina</button>
        </div>
      </div>
      <textarea id="note-content" placeholder="Scrivi qui la tua nota..."></textarea>
    </div>
  </div>
  
  <script src="renderer.js"></script>
</body>
</html>
```

#### renderer.js
```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Elementi DOM
  const notesList = document.getElementById('notes-list');
  const newNoteBtn = document.getElementById('new-note');
  const saveNoteBtn = document.getElementById('save-note');
  const deleteNoteBtn = document.getElementById('delete-note');
  const noteTitleInput = document.getElementById('note-title');
  const noteContentInput = document.getElementById('note-content');
  const searchInput = document.getElementById('search');
  
  // Stato dell'applicazione
  let notes = [];
  let currentNoteId = null;
  
  // Carica le note all'avvio
  loadNotes();
  
  // Event listeners
  newNoteBtn.addEventListener('click', createNewNote);
  saveNoteBtn.addEventListener('click', saveCurrentNote);
  deleteNoteBtn.addEventListener('click', deleteCurrentNote);
  searchInput.addEventListener('input', filterNotes);
  
  // Funzioni
  async function loadNotes() {
    try {
      notes = await window.api.getNotes();
      renderNotesList();
    } catch (error) {
      console.error('Errore nel caricamento delle note:', error);
    }
  }
  
  function renderNotesList(filteredNotes = null) {
    // Svuota la lista
    notesList.innerHTML = '';
    
    // Usa le note filtrate se disponibili, altrimenti usa tutte le note
    const notesToRender = filteredNotes || notes;
    
    if (notesToRender.length === 0) {
      const emptyItem = document.createElement('li');
      emptyItem.textContent = 'Nessuna nota trovata';
      emptyItem.className = 'empty-note';
      notesList.appendChild(emptyItem);
      return;
    }
    
    // Crea un elemento della lista per ogni nota
    notesToRender.forEach(note => {
      const listItem = document.createElement('li');
      listItem.className = 'note-item';
      if (note.id === currentNoteId) {
        listItem.classList.add('selected');
      }
      
      const title = document.createElement('div');
      title.className = 'note-title';
      title.textContent = note.title || 'Senza titolo';
      
      const preview = document.createElement('div');
      preview.className = 'note-preview';
      preview.textContent = note.content.substring(0, 50) + (note.content.length > 50 ? '...' : '');
      
      listItem.appendChild(title);
      listItem.appendChild(preview);
      
      listItem.addEventListener('click', () => selectNote(note));
      
      notesList.appendChild(listItem);
    });
  }
  
  function selectNote(note) {
    currentNoteId = note.id;
    noteTitleInput.value = note.title || '';
    noteContentInput.value = note.content || '';
    
    // Aggiorna la selezione visiva
    document.querySelectorAll('.note-item').forEach(item => {
      item.classList.remove('selected');
    });
    
    const selectedItem = Array.from(document.querySelectorAll('.note-item')).find(
      item => item.querySelector('.note-title').textContent === (note.title || 'Senza titolo')
    );
    
    if (selectedItem) {
      selectedItem.classList.add('selected');
    }
  }
  
  function createNewNote() {
    currentNoteId = null;
    noteTitleInput.value = '';
    noteContentInput.value = '';
    
    // Rimuovi la selezione visiva
    document.querySelectorAll('.note-item').forEach(item => {
      item.classList.remove('selected');
    });
  }
  
  async function saveCurrentNote() {
    const title = noteTitleInput.value.trim();
    const content = noteContentInput.value.trim();
    
    if (!content) {
      alert('Il contenuto della nota non può essere vuoto');
      return;
    }
    
    const note = {
      id: currentNoteId,
      title: title || 'Senza titolo',
      content,
      updatedAt: new Date().toISOString()
    };
    
    try {
      const result = await window.api.saveNote(note);
      
      if (result.success) {
        currentNoteId = result.note.id;
        await loadNotes();
      } else {
        alert(`Errore nel salvataggio della nota: ${result.error}`);
      }
    } catch (error) {
      console.error('Errore nel salvataggio della nota:', error);
      alert('Si è verificato un errore nel salvataggio della nota');
    }
  }
  
  async function deleteCurrentNote() {
    if (!currentNoteId) {
      alert('Nessuna nota selezionata');
      return;
    }
    
    if (!confirm('Sei sicuro di voler eliminare questa nota?')) {
      return;
    }
    
    try {
      const result = await window.api.deleteNote(currentNoteId);
      
      if (result.success) {
        createNewNote();
        await loadNotes();
      } else {
        alert(`Errore nell'eliminazione della nota: ${result.error}`);
      }
    } catch (error) {
      console.error('Errore nell\'eliminazione della nota:', error);
      alert('Si è verificato un errore nell\'eliminazione della nota');
    }
  }
  
  function filterNotes() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (!searchTerm) {
      renderNotesList();
      return;
    }
    
    const filtered = notes.filter(note => {
      return (
        (note.title && note.title.toLowerCase().includes(searchTerm)) ||
        (note.content && note.content.toLowerCase().includes(searchTerm))
      );
    });
    
    renderNotesList(filtered);
  }
});
```

#### styles.css
```css
/* Stili generali */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  color: #333;
  height: 100vh;
  overflow: hidden;
}

.container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* Sidebar */
.sidebar {
  width: 300px;
  background-color: #f0f0f0;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-header {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.search-box {
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
}

.search-box input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.notes-list {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  flex-grow: 1;
}

.note-item {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.2s;
}

.note-item:hover {
  background-color: #e8e8e8;
}

.note-item.selected {
  background-color: #e0e0e0;
  border-left: 4px solid #3498db;
}

.note-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.note-preview {
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.empty-note {
  padding: 15px;
  color: #999;
  font-style: italic;
  text-align: center;
}

/* Editor */
.editor {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.editor-header {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#note-title {
  font-size: 18px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex-grow: 1;
  margin-right: 15px;
}

.editor-actions button {
  margin-left: 10px;
}

#note-content {
  flex-grow: 1;
  padding: 15px;
  border: none;
  resize: none;
  font-size: 16px;
  line-height: 1.5;
}

#note-content:focus, #note-title:focus {
  outline: none;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

#delete-note {
  background-color: #e74c3c;
}

#delete-note:hover {
  background-color: #c0392b;
}
```

### Esecuzione e test dell'applicazione

Per eseguire l'applicazione, usa il comando:

```bash
npm start
```

L'applicazione dovrebbe avviarsi e mostrare l'interfaccia per la gestione delle note. Puoi testare le seguenti funzionalità:

1. Creazione di una nuova nota
2. Modifica del titolo e del contenuto
3. Salvataggio della nota
4. Caricamento delle note salvate
5. Eliminazione di una nota
6. Ricerca nelle note

## Esercizi guidati

1. **Aggiungere la funzionalità di esportazione**
   Implementa la possibilità di esportare una nota come file di testo (.txt) utilizzando il modulo `dialog` di Electron per selezionare la posizione di salvataggio.

2. **Implementare la formattazione del testo**
   Aggiungi funzionalità di formattazione di base (grassetto, corsivo, elenchi) utilizzando un editor di testo ricco come TinyMCE o Quill.

3. **Aggiungere categorie alle note**
   Estendi l'applicazione per supportare l'organizzazione delle note in categorie o tag, con la possibilità di filtrare le note per categoria.

## Quiz di autovalutazione

1. Quali sono i due tipi principali di processi in Electron?
   - a) Frontend e Backend
   - b) Main e Renderer
   - c) UI e Logic
   - d) Client e Server

2. Quale modulo è utilizzato per la comunicazione tra i processi main e renderer in Electron?
   - a) EventEmitter
   - b) WebSockets
   - c) IPC (Inter-Process Communication)
   - d) HTTP

3. Quale delle seguenti affermazioni sui preload scripts è corretta?
   - a) Vengono eseguiti solo nel processo main
   - b) Hanno accesso sia alle API di Node.js che alle API del DOM
   - c) Non possono comunicare con il processo main
   - d) Sostituiscono completamente il processo renderer

4. Quale proprietà di BrowserWindow è consigliata per motivi di sicurezza nelle applicazioni Electron moderne?
   - a) `nodeIntegration: true`
   - b) `contextIsolation: false`
   - c) `contextIsolation: true`
   - d) `sandbox: false`

5. Quale metodo è utilizzato per inviare un messaggio dal processo main a un processo renderer?
   - a) `ipcMain.send()`
   - b) `mainWindow.webContents.send()`
   - c) `ipcRenderer.sendToMain()`
   - d) `app.send()`

## Best practices

1. **Sicurezza**
   - Utilizza sempre `contextIsolation: true` e `nodeIntegration: false`
   - Implementa una whitelist per i canali IPC nel preload script
   - Valida sempre gli input dell'utente prima di elaborarli
   - Utilizza Content Security Policy (CSP) per prevenire attacchi XSS

2. **Struttura del codice**
   - Separa chiaramente la logica del processo main da quella del renderer
   - Utilizza il pattern MVC (Model-View-Controller) per organizzare il codice
   - Crea moduli riutilizzabili per funzionalità comuni
   - Mantieni il preload script il più leggero possibile

3. **Performance**
   - Evita operazioni pesanti nel thread UI del renderer
   - Utilizza Web Workers per operazioni CPU-intensive
   - Implementa la lazy-loading per le risorse
   - Ottimizza l'uso della memoria con la garbage collection esplicita

4. **Esperienza utente**
   - Fornisci feedback visivi per le operazioni lunghe
   - Implementa scorciatoie da tastiera per le operazioni comuni
   - Salva automaticamente i dati dell'utente per evitare perdite
   - Gestisci correttamente gli errori con messaggi utente-friendly

## Consigli e trucchi

1. **Debugging**
   - Utilizza `mainWindow.webContents.openDevTools()` per aprire gli strumenti di sviluppo
   - Aggiungi `console.log()` strategici nel processo main e renderer
   - Usa il flag `--inspect` per il debugging del processo main
   - Implementa un sistema di logging per tracciare gli eventi dell'applicazione

2. **Gestione degli errori**
   - Implementa un gestore globale degli errori non catturati
   - Utilizza try/catch per le operazioni che potrebbero fallire
   - Registra gli errori in un file di log per il debugging
   - Fornisci opzioni di ripristino quando possibile

3. **Ottimizzazione**
   - Utilizza la compressione delle immagini e delle risorse
   - Minimizza il numero di finestre BrowserWindow attive
   - Implementa la memorizzazione nella cache per i dati frequentemente acceduti
   - Utilizza la lazy-loading per i componenti dell'interfaccia utente

## Risorse supplementari

### Documentazione ufficiale
- [Electron Documentation](https://www.electronjs.org/docs)
- [Electron API Demos](https://github.com/electron/electron-api-demos)
- [Electron Fiddle](https://www.electronjs.org/fiddle)

### Articoli e tutorial
- [Electron Security Checklist](https://www.electronjs.org/docs/tutorial/security)
- [Building a Desktop App with Electron](https://www.smashingmagazine.com/2017/03/beyond-browser-building-desktop-apps-electron/)
- [IPC Communication in Electron](https://www.electronjs.org/docs/latest/tutorial/ipc)

### Librerie e framework utili
- [Electron Builder](https://www.electron.build/) - Per pacchettizzare e distribuire applicazioni
- [Electron Store](https://github.com/sindresorhus/electron-store) - Per la persistenza dei dati
- [Electron Reload](https://github.com/yan-foto/electron-reload) - Per il ricaricamento automatico durante lo sviluppo

### Repository di esempio
- [Electron Quick Start](https://github.com/electron/electron-quick-start)
- [Simple Electron Notepad](https://github.com/electron/simple-samples/tree/master/activity-monitor)
- [Electron API Demos](https://github.com/electron/electron-api-demos)

### Common pitfalls e come evitarli
- **Problema**: Memory leaks dovuti a listener non rimossi
  **Soluzione**: Rimuovi sempre i listener quando non sono più necessari

- **Problema**: Sicurezza compromessa con `nodeIntegration: true`
  **Soluzione**: Usa `contextIsolation: true` e preload scripts

- **Problema**: Applicazione lenta all'avvio
  **Soluzione**: Implementa il lazy-loading e ottimizza il processo di inizializzazione

- **Problema**: Crash dell'applicazione durante l'accesso al file system
  **Soluzione**: Gestisci correttamente gli errori e verifica i permessi
```