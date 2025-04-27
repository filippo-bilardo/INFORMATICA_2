/**
 * esempio1.js - Registrazione e installazione di un Service Worker di base
 * 
 * Questo esempio mostra come registrare un Service Worker di base e gestire
 * gli eventi di installazione e attivazione.
 */

// Verifica se il browser supporta i Service Workers
if ('serviceWorker' in navigator) {
  // Registra il Service Worker quando la pagina è completamente caricata
  window.addEventListener('load', () => {
    // Il percorso del file Service Worker è relativo alla root del dominio
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registrato con successo con scope:', registration.scope);
      })
      .catch(error => {
        console.error('Errore durante la registrazione del Service Worker:', error);
      });
  });
}

/**
 * sw.js - File del Service Worker
 * 
 * Questo file dovrebbe essere salvato come 'sw.js' nella root del tuo sito.
 * Di seguito è riportato il codice che dovrebbe essere incluso in questo file.
 */

/*
// Evento 'install' - si attiva quando il Service Worker viene installato
self.addEventListener('install', event => {
  console.log('Service Worker: Installazione in corso');
  
  // Forza l'attivazione immediata del Service Worker senza attendere la chiusura di tutte le schede
  event.waitUntil(
    self.skipWaiting()
  );
  
  console.log('Service Worker: Installato');
});

// Evento 'activate' - si attiva quando il Service Worker viene attivato
self.addEventListener('activate', event => {
  console.log('Service Worker: Attivazione in corso');
  
  // Richiedi di diventare il Service Worker attivo per tutti i client
  event.waitUntil(
    self.clients.claim()
  );
  
  console.log('Service Worker: Attivato');
});

// Evento 'fetch' - si attiva quando il browser effettua una richiesta di rete
self.addEventListener('fetch', event => {
  // Per ora, lasciamo che il browser gestisca normalmente le richieste
  // Nei prossimi esempi, implementeremo strategie di caching
  console.log('Service Worker: Richiesta intercettata per', event.request.url);
});
*/

/**
 * Nota: Il codice sopra è commentato perché questo file è solo un esempio.
 * In un'applicazione reale, dovresti creare un file separato chiamato 'sw.js'
 * nella root del tuo sito e includervi il codice non commentato.
 */

/**
 * HTML di esempio per utilizzare questo Service Worker:
 * 
 * <!DOCTYPE html>
 * <html lang="it">
 * <head>
 *   <meta charset="UTF-8">
 *   <meta name="viewport" content="width=device-width, initial-scale=1.0">
 *   <title>Service Worker Demo</title>
 *   <script src="esempio1.js"></script>
 * </head>
 * <body>
 *   <h1>Service Worker Demo</h1>
 *   <p>Apri la console degli strumenti di sviluppo per vedere i messaggi del Service Worker.</p>
 * </body>
 * </html>
 */