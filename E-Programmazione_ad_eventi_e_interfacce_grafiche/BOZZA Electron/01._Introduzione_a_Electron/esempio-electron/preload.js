const { contextBridge, ipcRenderer } = require('electron');

// Espone API sicure al renderer
contextBridge.exposeInMainWorld('electronAPI', {
  // Funzioni per le note
  saveNotes: (content) => ipcRenderer.invoke('notes:save', content),
  loadNotes: () => ipcRenderer.invoke('notes:load'),
  
  // Funzione per mostrare notifiche
  showNotification: (options) => ipcRenderer.invoke('notification:show', options),
  
  // Funzione per salvare file
  saveAs: () => ipcRenderer.invoke('dialog:saveAs'),
  
  // Listener per eventi dal main process
  onClearAction: (callback) => {
    ipcRenderer.on('action:clear', () => callback());
    return () => ipcRenderer.removeListener('action:clear', callback);
  }
});