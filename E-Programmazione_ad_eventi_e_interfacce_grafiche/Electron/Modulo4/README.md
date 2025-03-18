# Modulo 4: Gestione dati e persistenza

## Obiettivi di apprendimento
- Implementare operazioni di lettura e scrittura di file in Electron
- Utilizzare database integrati come SQLite e IndexedDB
- Sviluppare strategie di sincronizzazione dati e cache
- Creare un'applicazione di gestione note con persistenza dati

## 4.1 Lettura e scrittura di file

### Accesso al filesystem in Electron
Electron offre diverse modalità per accedere al filesystem, sia tramite le API di Node.js nel processo main, sia tramite API specifiche nel processo renderer.

#### Accesso al filesystem dal processo main
Nel processo main, è possibile utilizzare il modulo `fs` di Node.js per operazioni di I/O:

```javascript
// main.js - Operazioni su file nel processo main
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

// Gestione richiesta di lettura file
ipcMain.handle('read-file', async (event, filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Gestione richiesta di scrittura file
ipcMain.handle('write-file', async (event, { filePath, content }) => {
  try {
    await fs.promises.writeFile(filePath, content, 'utf8');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Gestione richiesta di selezione file
ipcMain.handle('select-file', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Documenti di testo', extensions: ['txt', 'md'] },
      { name: 'Tutti i file', extensions: ['*'] }
    ]
  });
  
  if (canceled || filePaths.length === 0) {
    return { canceled: true };
  }
  
  return { canceled: false, filePath: filePaths[0] };
});

// Gestione richiesta di salvataggio file
ipcMain.handle('save-file', async (event, { defaultPath, content }) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    defaultPath,
    filters: [
      { name: 'Documenti di testo', extensions: ['txt', 'md'] },
      { name: 'Tutti i file', extensions: ['*'] }
    ]
  });
  
  if (canceled || !filePath) {
    return { canceled: true };
  }
  
  try {
    await fs.promises.writeFile(filePath, content, 'utf8');
    return { canceled: false, filePath };
  } catch (error) {
    return { canceled: false, error: error.message };
  }
});
```

#### Accesso al filesystem dal processo renderer
Nel processo renderer, è necessario utilizzare l'IPC per comunicare con il processo main:

```javascript
// preload.js - Esposizione API filesystem al renderer
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronFS', {
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath, content) => ipcRenderer.invoke('write-file', { filePath, content }),
  selectFile: () => ipcRenderer.invoke('select-file'),
  saveFile: (defaultPath, content) => ipcRenderer.invoke('save-file', { defaultPath, content })
});
```

```javascript
// renderer.js - Utilizzo API filesystem nel renderer
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-file');
  const saveBtn = document.getElementById('save-file');
  const editor = document.getElementById('editor');
  let currentFilePath = null;
  
  // Gestione apertura file
  openBtn.addEventListener('click', async () => {
    const result = await window.electronFS.selectFile();
    
    if (!result.canceled) {
      currentFilePath = result.filePath;
      const fileContent = await window.electronFS.readFile(currentFilePath);
      
      if (fileContent.success) {
        editor.value = fileContent.data;
        document.title = `Editor - ${path.basename(currentFilePath)}`;
      } else {
        alert(`Errore durante la lettura del file: ${fileContent.error}`);
      }
    }
  });
  
  // Gestione salvataggio file
  saveBtn.addEventListener('click', async () => {
    const content = editor.value;
    
    if (!currentFilePath) {
      // Nessun file aperto, richiedi percorso di salvataggio
      const result = await window.electronFS.saveFile('documento.txt', content);
      
      if (!result.canceled) {
        currentFilePath = result.filePath;
        document.title = `Editor - ${path.basename(currentFilePath)}`;
      }
    } else {
      // Salva nel file corrente
      const result = await window.electronFS.writeFile(currentFilePath, content);
      
      if (!result.success) {
        alert(`Errore durante il salvataggio del file: ${result.error}`);
      }
    }
  });
});
```

### Gestione dei percorsi in Electron
Gestire correttamente i percorsi dei file è fondamentale in un'applicazione Electron:

```javascript
// main.js - Gestione percorsi
const { app } = require('electron');
const path = require('path');
const fs = require('fs');

// Percorsi importanti dell'applicazione
const appPaths = {
  // Cartella dati dell'applicazione (persiste tra le versioni)
  userData: app.getPath('userData'),
  // Cartella temporanea
  temp: app.getPath('temp'),
  // Cartella documenti dell'utente
  documents: app.getPath('documents'),
  // Cartella dell'applicazione
  appPath: app.getAppPath()
};

// Assicurati che le cartelle necessarie esistano
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  return dirPath;
}

// Crea una cartella per i dati dell'applicazione
const dataDir = ensureDirectoryExists(path.join(appPaths.userData, 'data'));
const cacheDir = ensureDirectoryExists(path.join(appPaths.userData, 'cache'));

console.log('Cartella dati:', dataDir);
console.log('Cartella cache:', cacheDir);
```

## 4.2 Database integrati (SQLite, IndexedDB)

### SQLite in Electron
SQLite è un database SQL leggero che funziona bene con Electron per lo storage locale:

```javascript
// main.js - Integrazione SQLite
const { app, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Percorso del database
const dbPath = path.join(app.getPath('userData'), 'database.sqlite');

// Inizializzazione del database
let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Errore durante la connessione al database:', err.message);
  } else {
    console.log('Connesso al database SQLite');
    
    // Creazione tabella note
    db.run(`CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// Chiusura del database quando l'app si chiude
app.on('will-quit', () => {
  db.close((err) => {
    if (err) {
      console.error('Errore durante la chiusura del database:', err.message);
    } else {
      console.log('Database chiuso');
    }
  });
});

// API per il processo renderer
ipcMain.handle('db-get-all-notes', async () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM notes ORDER BY updated_at DESC', (err, rows) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(rows);
      }
    });
  });
});

ipcMain.handle('db-get-note', async (event, id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM notes WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(row);
      }
    });
  });
});

ipcMain.handle('db-create-note', async (event, { title, content }) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)');
    stmt.run(title, content, function(err) {
      if (err) {
        reject(err.message);
      } else {
        resolve({ id: this.lastID });
      }
    });
  });
});

ipcMain.handle('db-update-note', async (event, { id, title, content }) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(
      'UPDATE notes SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    );
    stmt.run(title, content, id, function(err) {
      if (err) {
        reject(err.message);
      } else {
        resolve({ changes: this.changes });
      }
    });
  });
});

ipcMain.handle('db-delete-note', async (event, id) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('DELETE FROM notes WHERE id = ?');
    stmt.run(id, function(err) {
      if (err) {
        reject(err.message);
      } else {
        resolve({ changes: this.changes });
      }
    });
  });
});
```

### IndexedDB in Electron
IndexedDB è un database NoSQL integrato nei browser, utilizzabile nel processo renderer:

```javascript
// renderer.js - Utilizzo di IndexedDB
document.addEventListener('DOMContentLoaded', () => {
  // Inizializzazione del database
  let db;
  const request = indexedDB.open('NotesDB', 1);
  
  request.onerror = (event) => {
    console.error('Errore apertura database:', event.target.error);
  };
  
  request.onupgradeneeded = (event) => {
    db = event.target.result;
    
    // Creazione object store
    if (!db.objectStoreNames.contains('notes')) {
      const notesStore = db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
      notesStore.createIndex('title', 'title', { unique: false });
      notesStore.createIndex('created', 'created', { unique: false });
    }
  };
  
  request.onsuccess = (event) => {
    db = event.target.result;
    console.log('Database aperto con successo');
    loadNotes();
  };
  
  // Funzioni per gestire le note
  function loadNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';
    
    const transaction = db.transaction(['notes'], 'readonly');
    const notesStore = transaction.objectStore('notes');
    const request = notesStore.getAll();
    
    request.onsuccess = (event) => {
      const notes = event.target.result;
      
      notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note-item';
        noteElement.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.content.substring(0, 50)}${note.content.length > 50 ? '...' : ''}</p>
          <div class="note-actions">
            <button class="edit-note" data-id="${note.id}">Modifica</button>
            <button class="delete-note" data-id="${note.id}">Elimina</button>
          </div>
        `;
        
        notesList.appendChild(noteElement);
      });
      
      // Aggiungi event listener ai pulsanti
      document.querySelectorAll('.edit-note').forEach(button => {
        button.addEventListener('click', (e) => {
          const noteId = parseInt(e.target.getAttribute('data-id'));
          editNote(noteId);
        });
      });
      
      document.querySelectorAll('.delete-note').forEach(button => {
        button.addEventListener('click', (e) => {
          const noteId = parseInt(e.target.getAttribute('data-id'));
          deleteNote(noteId);
        });
      });
    };
  }
  
  function saveNote(note) {
    const transaction = db.transaction(['notes'], 'readwrite');
    const notesStore = transaction.objectStore('notes');
    const request = notesStore.put(note);

    request.onsuccess = () => {
      console.log('Note salvata con successo');
      loadNotes();
    };

    request.onerror = (event) => {
      console.error('Errore durante il salvataggio della nota:', event.target.error);
    };
  }

  // Funzione per eliminare una nota
  function deleteNote(id) {
    const transaction = db.transaction(['notes'], 'readwrite');
    const notesStore = transaction.objectStore('notes');
    const request = notesStore.delete(id);

    request.onsuccess = () => {
      console.log('Nota eliminata con successo');
      loadNotes();
    };

    request.onerror = (event) => {
      console.error('Errore durante l'eliminazione della nota:', event.target.error);
    };
  }

  // Funzione per modificare una nota
  function editNote(id) {
    const transaction = db.transaction(['notes'], 'readonly');
    const notesStore = transaction.objectStore('notes');
    const request = notesStore.get(id);

    request.onsuccess = (event) => {
      const note = event.target.result;
      // Mostra l'editor con la nota selezionata
      showEditor(note);
    };

    request.onerror = (event) => {
      console.error('Errore durante il recupero della nota:', event.target.error);
    };
  }
    const transaction = db.transaction(['notes