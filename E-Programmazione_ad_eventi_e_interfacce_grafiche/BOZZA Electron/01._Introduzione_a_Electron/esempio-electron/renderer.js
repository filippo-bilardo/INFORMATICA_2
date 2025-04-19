// Elementi DOM
const notepad = document.getElementById('notepad');
const saveBtn = document.getElementById('save-btn');
const saveAsBtn = document.getElementById('save-as-btn');
const notifyBtn = document.getElementById('notify-btn');
const statusEl = document.getElementById('status');

// Timer per il salvataggio automatico
let saveTimer = null;

// Carica le note salvate all'avvio
async function loadSavedNotes() {
  try {
    const savedContent = await window.electronAPI.loadNotes();
    if (savedContent) {
      notepad.value = savedContent;
      updateStatus('Note caricate');
    }
  } catch (error) {
    console.error('Errore nel caricamento delle note:', error);
    updateStatus('Errore nel caricamento delle note');
  }
}

// Salva le note
async function saveNotes() {
  try {
    await window.electronAPI.saveNotes(notepad.value);
    updateStatus('Note salvate ' + new Date().toLocaleTimeString());
    return true;
  } catch (error) {
    console.error('Errore nel salvataggio delle note:', error);
    updateStatus('Errore nel salvataggio');
    return false;
  }
}

// Salvataggio automatico quando l'utente smette di scrivere
function setupAutoSave() {
  notepad.addEventListener('input', () => {
    // Cancella il timer precedente
    if (saveTimer) clearTimeout(saveTimer);
    
    // Imposta un nuovo timer
    saveTimer = setTimeout(async () => {
      await saveNotes();
    }, 2000); // Salva dopo 2 secondi di inattività
  });
}

// Aggiorna lo stato visualizzato
function updateStatus(message) {
  statusEl.textContent = message;
}

// Gestione del pulsante di salvataggio
saveBtn.addEventListener('click', async () => {
  const success = await saveNotes();
  if (success) {
    // Mostra notifica
    window.electronAPI.showNotification({
      title: 'Note Salvate',
      body: 'Le tue note sono state salvate con successo!'
    });
  }
});

// Gestione del pulsante "Salva come..."
saveAsBtn.addEventListener('click', async () => {
  const success = await window.electronAPI.saveAs();
  if (success) {
    updateStatus('File salvato con successo');
  } else {
    updateStatus('Salvataggio file annullato');
  }
});

// Gestione del pulsante di notifica
notifyBtn.addEventListener('click', () => {
  window.electronAPI.showNotification({
    title: 'Notifica di Test',
    body: 'Questa è una notifica di test dell\'applicazione Electron!'
  });
});

// Ascolta eventi dal processo principale
window.electronAPI.onClearAction(() => {
  if (confirm('Sei sicuro di voler cancellare tutte le note?')) {
    notepad.value = '';
    saveNotes();
  }
});

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
  loadSavedNotes();
  setupAutoSave();
});