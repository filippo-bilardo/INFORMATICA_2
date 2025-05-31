// Variabili globali
let currentStrategy = 'cache-first';
let deferredPrompt;

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
      navigator.serviceWorker.register('sw2.js')
        .then(registration => {
          console.log('Service Worker registrato con successo:', registration.scope);
          // Invia un messaggio al Service Worker con la strategia iniziale
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
              type: 'SET_STRATEGY',
              strategy: currentStrategy
            });
          }
        })
        .catch(error => {
          console.error('Errore durante la registrazione del Service Worker:', error);
        });
    });
  }
}

// Gestisce l'installazione della PWA
function setupInstallBanner() {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Impedisce la visualizzazione automatica del prompt
    e.preventDefault();
    
    // Salva l'evento per mostrarlo in seguito
    deferredPrompt = e;
    
    // Mostra il banner di installazione
    document.getElementById('install-banner').style.display = 'block';
  });

  // Gestisce il click sul pulsante di installazione
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
    
    // Nascondi il banner di installazione
    document.getElementById('install-banner').style.display = 'none';
  });

  // Gestisce il click sul pulsante "Non ora"
  document.getElementById('dismiss-button').addEventListener('click', () => {
    document.getElementById('install-banner').style.display = 'none';
  });

  // Rileva quando l'app è stata installata
  window.addEventListener('appinstalled', (event) => {
    console.log('PWA installata con successo');
    document.getElementById('install-banner').style.display = 'none';
  });
}

// Cambia la strategia di caching
function changeStrategy(strategy) {
  currentStrategy = strategy;
  
  // Aggiorna le informazioni sulla strategia
  const strategyInfo = document.getElementById('strategy-info');
  
  switch (strategy) {
    case 'cache-first':
      strategyInfo.textContent = 'Cache First: Controlla prima la cache e, solo se la risorsa non è presente, la recupera dalla rete. Ottima per risorse statiche e funzionamento offline.';
      break;
    case 'network-first':
      strategyInfo.textContent = 'Network First: Tenta prima di recuperare la risorsa dalla rete e, in caso di fallimento, utilizza la versione in cache. Ideale per contenuti che cambiano frequentemente.';
      break;
    case 'stale-while-revalidate':
      strategyInfo.textContent = 'Stale While Revalidate: Restituisce immediatamente la versione in cache mentre aggiorna la cache con la risposta di rete più recente. Buon equilibrio tra prestazioni e freschezza dei contenuti.';
      break;
  }
  
  // Invia un messaggio al Service Worker con la nuova strategia
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'SET_STRATEGY',
      strategy: strategy
    });
  }
}

// Effettua una richiesta di dati
async function fetchData() {
  const dataContainer = document.getElementById('data-container');
  dataContainer.textContent = 'Caricamento...';
  
  try {
    // Utilizziamo un timestamp per evitare la cache del browser
    const timestamp = new Date().getTime();
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/1?t=${timestamp}`);
    const data = await response.json();
    
    dataContainer.innerHTML = `
      <p><strong>Titolo:</strong> ${data.title}</p>
      <p><strong>Completato:</strong> ${data.completed ? 'Sì' : 'No'}</p>
      <p><strong>ID:</strong> ${data.id}</p>
      <p><strong>Timestamp:</strong> ${new Date().toLocaleTimeString()}</p>
    `;
  } catch (error) {
    dataContainer.textContent = `Errore: ${error.message}. Se sei offline, la risposta dipenderà dalla strategia di caching.`;
  }
}

// Svuota la cache
async function clearCache() {
  const cacheStatus = document.getElementById('cache-status');
  
  try {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
    
    cacheStatus.textContent = 'Cache svuotata con successo!';
    cacheStatus.className = 'status online';
    
    setTimeout(() => {
      cacheStatus.textContent = '';
      cacheStatus.className = 'status';
    }, 3000);
  } catch (error) {
    cacheStatus.textContent = `Errore durante lo svuotamento della cache: ${error.message}`;
    cacheStatus.className = 'status offline';
  }
}

// Aggiorna la cache
async function updateCache() {
  const cacheStatus = document.getElementById('cache-status');
  
  try {
    // Invia un messaggio al Service Worker per aggiornare la cache
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'UPDATE_CACHE'
      });
      
      cacheStatus.textContent = 'Richiesta di aggiornamento cache inviata!';
      cacheStatus.className = 'status online';
      
      setTimeout(() => {
        cacheStatus.textContent = '';
        cacheStatus.className = 'status';
      }, 3000);
    } else {
      throw new Error('Service Worker non attivo');
    }
  } catch (error) {
    cacheStatus.textContent = `Errore durante l'aggiornamento della cache: ${error.message}`;
    cacheStatus.className = 'status offline';
  }
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
  // Aggiorna lo stato della connessione
  updateConnectionStatus();
  
  // Registra il Service Worker
  registerServiceWorker();
  
  // Configura il banner di installazione
  setupInstallBanner();
  
  // Gestisce gli eventi online/offline
  window.addEventListener('online', updateConnectionStatus);
  window.addEventListener('offline', updateConnectionStatus);
  
  // Configura i pulsanti delle strategie di caching
  document.getElementById('cache-first').addEventListener('click', () => {
    changeStrategy('cache-first');
    fetchData();
  });
  
  document.getElementById('network-first').addEventListener('click', () => {
    changeStrategy('network-first');
    fetchData();
  });
  
  document.getElementById('stale-while-revalidate').addEventListener('click', () => {
    changeStrategy('stale-while-revalidate');
    fetchData();
  });
  
  // Configura i pulsanti di gestione della cache
  document.getElementById('clear-cache').addEventListener('click', clearCache);
  document.getElementById('update-cache').addEventListener('click', updateCache);
  
  // Imposta la strategia iniziale
  changeStrategy('cache-first');
});