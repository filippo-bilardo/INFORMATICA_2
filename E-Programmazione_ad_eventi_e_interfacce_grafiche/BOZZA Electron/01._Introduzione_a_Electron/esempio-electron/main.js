const { app, BrowserWindow, ipcMain, Notification, Menu, MenuItem, dialog } = require('electron');
const path = require('path');
const Store = require('electron-store');

// Configurazione dello store per la persistenza dei dati
const store = new Store({
  schema: {
    notes: {
      type: 'string',
      default: ''
    },
    windowBounds: {
      type: 'object',
      properties: {
        width: { type: 'number', minimum: 400 },
        height: { type: 'number', minimum: 300 }
      },
      default: { width: 800, height: 600 }
    }
  }
});

let mainWindow;

function createWindow() {
  // Recupera le dimensioni della finestra salvate
  const bounds = store.get('windowBounds');
  
  // Crea la finestra del browser
  mainWindow = new BrowserWindow({
    width: bounds.width,
    height: bounds.height,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    backgroundColor: '#f5f5f5',
    show: false
  });

  // Carica il file HTML dell'applicazione
  mainWindow.loadFile('index.html');

  // Mostra la finestra quando il contenuto è pronto
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Salva le dimensioni della finestra quando viene ridimensionata
  mainWindow.on('resize', () => {
    store.set('windowBounds', mainWindow.getBounds());
  });

  // Crea menu contestuale
  mainWindow.webContents.on('context-menu', (_, params) => {
    const menu = new Menu();
    
    if (params.selectionText) {
      menu.append(new MenuItem({
        label: 'Cerca su Google',
        click: () => {
          const query = encodeURIComponent(params.selectionText);
          require('electron').shell.openExternal(`https://www.google.com/search?q=${query}`);
        }
      }));
    }
    
    menu.append(new MenuItem({
      label: 'Cancella tutto',
      click: () => {
        mainWindow.webContents.send('action:clear');
      }
    }));
    
    menu.popup();
  });
}

// Crea la finestra quando l'app è pronta
app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', function () {
    // Su macOS è comune ricreare una finestra nell'app quando
    // l'icona del dock viene cliccata e non ci sono altre finestre aperte
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Chiudi l'app quando tutte le finestre sono chiuse (eccetto su macOS)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Gestione IPC per salvare le note
ipcMain.handle('notes:save', (_, content) => {
  store.set('notes', content);
  return true;
});

// Gestione IPC per caricare le note
ipcMain.handle('notes:load', () => {
  return store.get('notes');
});

// Gestione IPC per mostrare notifiche
ipcMain.handle('notification:show', (_, options) => {
  const notification = new Notification({
    title: options.title,
    body: options.body,
    silent: false
  });
  
  notification.show();
  return true;
});

// Gestione IPC per mostrare dialogo di salvataggio
ipcMain.handle('dialog:saveAs', async () => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'Salva Note',
    defaultPath: path.join(app.getPath('documents'), 'note.txt'),
    filters: [{ name: 'Text Files', extensions: ['txt'] }]
  });
  
  if (!canceled && filePath) {
    const fs = require('fs');
    fs.writeFileSync(filePath, store.get('notes'), 'utf-8');
    return true;
  }
  return false;
});