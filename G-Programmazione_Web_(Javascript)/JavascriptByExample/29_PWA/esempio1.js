// Aggiorna l'ora corrente
function updateCurrentTime() {
  const now = new Date();
  document.getElementById('current-time').textContent = now.toLocaleString();
}

// Aggiorna lo stato della connessione
function updateConnectionStatus() {
  const statusElement = document.getElementById('connection-status');
  if (navigator.onLine) {
    statusElement.textContent = 'Sei online';
    statusElement.className = 'status online';
  } else {
    statusElement.textContent = 'Sei offline - Contenuto servito dalla cache';
    statusElement.className = 'status offline';
  }
}

// Registra il Service Worker
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(registration => {
          console.log('Service Worker registrato con successo:', registration.scope);
        })
        .catch(error => {
          console.error('Errore durante la registrazione del Service Worker:', error);
        });
    });
  }
}

// Gestisce l'installazione della PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Impedisce la visualizzazione automatica del prompt
  e.preventDefault();
  
  // Salva l'evento per mostrarlo in seguito
  deferredPrompt = e;
  
  // Mostra il pulsante di installazione
  const installButton = document.getElementById('install-button');
  installButton.style.display = 'block';
});

document.getElementById('install-button').addEventListener('click', async () => {
  if (!deferredPrompt) {
    return;
  }
  
  // Mostra il prompt di installazione
  deferredPrompt.prompt();
  
  // Attende la scelta dell'utente
  const { outcome } = await deferredPrompt.userChoice;
  
  // Registra il risultato
  console.log(`Risultato installazione: ${outcome}`);
  
  // Resetta la variabile deferredPrompt
  deferredPrompt = null;
  
  // Nascondi il pulsante di installazione
  document.getElementById('install-button').style.display = 'none';
});

// Rileva quando l'app è stata installata
window.addEventListener('appinstalled', (event) => {
  console.log('PWA installata con successo');
  document.getElementById('install-button').style.display = 'none';
});

// Gestisce gli eventi online/offline
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
  updateCurrentTime();
  updateConnectionStatus();
  registerServiceWorker();
});