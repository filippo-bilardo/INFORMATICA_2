/**
 * esempio5.js - Implementazione di notifiche push
 * 
 * Questo esempio mostra come implementare le notifiche push utilizzando i Service Workers,
 * permettendo di inviare messaggi agli utenti anche quando non stanno attivamente utilizzando l'applicazione.
 */

// Verifica se il browser supporta i Service Workers e le API Push
function checkPushSupport() {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Workers non supportati');
    return false;
  }
  
  if (!('PushManager' in window)) {
    console.log('Push API non supportate');
    return false;
  }
  
  return true;
}

// Registra il Service Worker
function registerServiceWorker() {
  return navigator.serviceWorker.register('/sw-push.js')
    .then(registration => {
      console.log('Service Worker registrato con successo con scope:', registration.scope);
      return registration;
    })
    .catch(error => {
      console.error('Errore durante la registrazione del Service Worker:', error);
      throw error;
    });
}

// Richiedi il permesso per le notifiche
function requestNotificationPermission() {
  return Notification.requestPermission()
    .then(permission => {
      if (permission === 'granted') {
        console.log('Permesso per le notifiche concesso!');
        return true;
      } else {
        console.log('Permesso per le notifiche negato.');
        return false;
      }
    });
}

// Converti una stringa base64 in un array Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Sottoscrivi l'utente alle notifiche push
function subscribeUserToPush(registration) {
  // Questa chiave pubblica dovrebbe essere generata sul server
  // Vedi: https://web-push-codelab.glitch.me/
  const applicationServerKey = urlBase64ToUint8Array(
    'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'
  );
  
  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(subscription => {
    console.log('Utente sottoscritto:', JSON.stringify(subscription));
    // In un'applicazione reale, dovresti inviare questa sottoscrizione al server
    return sendSubscriptionToServer(subscription);
  })
  .catch(error => {
    console.error('Errore durante la sottoscrizione:', error);
    throw error;
  });
}

// Invia la sottoscrizione al server
function sendSubscriptionToServer(subscription) {
  // In un'applicazione reale, dovresti inviare la sottoscrizione al tuo server
  // utilizzando una richiesta fetch o XMLHttpRequest
  console.log('Invio della sottoscrizione al server:', subscription);
  
  // Esempio di invio al server (commentato perché non c'è un server reale)
  /*
  return fetch('/api/push-subscriptions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscription)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Errore nell\'invio della sottoscrizione al server');
    }
    return response.json();
  });
  */
  
  // Per questo esempio, restituiamo semplicemente una promessa risolta
  return Promise.resolve(subscription);
}

// Inizializza le notifiche push
function initializePushNotifications() {
  if (!checkPushSupport()) {
    console.log('Le notifiche push non sono supportate in questo browser.');
    return Promise.reject(new Error('Push non supportato'));
  }
  
  let serviceWorkerRegistration = null;
  
  return registerServiceWorker()
    .then(registration => {
      serviceWorkerRegistration = registration;
      return requestNotificationPermission();
    })
    .then(permissionGranted => {
      if (!permissionGranted) {
        throw new Error('Permesso per le notifiche negato');
      }
      return subscribeUserToPush(serviceWorkerRegistration);
    })
    .then(() => {
      console.log('Notifiche push inizializzate con successo!');
      // Aggiorna l'interfaccia utente per mostrare che le notifiche sono abilitate
      document.getElementById('push-status').textContent = 'Notifiche push abilitate';
      document.getElementById('push-status').className = 'enabled';
    })
    .catch(error => {
      console.error('Errore nell\'inizializzazione delle notifiche push:', error);
      // Aggiorna l'interfaccia utente per mostrare l'errore
      document.getElementById('push-status').textContent = 'Notifiche push non disponibili';
      document.getElementById('push-status').className = 'disabled';
    });
}

// Quando il documento è pronto, aggiungi gli event listener
document.addEventListener('DOMContentLoaded', () => {
  // Aggiungi event listener al pulsante di attivazione delle notifiche
  const enablePushButton = document.getElementById('enable-push');
  if (enablePushButton) {
    enablePushButton.addEventListener('click', () => {
      enablePushButton.disabled = true;
      initializePushNotifications()
        .finally(() => {
          enablePushButton.disabled = false;
        });
    });
  }
  
  // Aggiungi event listener al pulsante di test delle notifiche
  const testPushButton = document.getElementById('test-push');
  if (testPushButton) {
    testPushButton.addEventListener('click', () => {
      // In un'applicazione reale, questa richiesta andrebbe al server
      // che poi invierebbe una notifica push tramite il servizio di push
      console.log('Richiesta di test notifica push inviata');
      
      // Per questo esempio, simuliamo una notifica locale
      if ('serviceWorker' in navigator && 'Notification' in window && Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification('Notifica di Test', {
            body: 'Questa è una notifica di test locale, non una vera notifica push.',
            icon: '/images/icon-192x192.png',
            badge: '/images/badge-72x72.png',
            vibrate: [100, 50, 100],
            data: {
              url: window.location.href
            },
            actions: [
              {
                action: 'explore',
                title: 'Visualizza',
                icon: '/images/checkmark.png'
              },
              {
                action: 'close',
                title: 'Chiudi',
                icon: '/images/xmark.png'
              }
            ]
          });
        });
      }
    });
  }
});

/**
 * sw-push.js - File del Service Worker per le notifiche push
 * 
 * Questo file dovrebbe essere salvato come 'sw-push.js' nella root del tuo sito.
 * Di seguito è riportato il codice che dovrebbe essere incluso in questo file.
 */

/*
// Evento 'push' - si attiva quando il Service Worker riceve una notifica push
self.addEventListener('push', event => {
  console.log('Evento push ricevuto:', event);

  // Estrai i dati dal payload, se presenti
  let notificationData = {};
  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (e) {
      // Se il payload non è in formato JSON, usa il testo come corpo della notifica
      notificationData = {
        title: 'Nuova notifica',
        body: event.data.text()
      };
    }
  }

  // Imposta le opzioni di notifica
  const options = {
    body: notificationData.body || 'Hai ricevuto una nuova notifica!',
    icon: notificationData.icon || '/images/icon-192x192.png',
    badge: '/images/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: notificationData.url || '/'
    },
    actions: [
      {
        action: 'explore',
        title: 'Visualizza',
        icon: '/images/checkmark.png'
      },
      {
        action: 'close',
        title: 'Chiudi',
        icon: '/images/xmark.png'
      }
    ]
  };

  // Mostra la notifica
  event.waitUntil(
    self.registration.showNotification(
      notificationData.title || 'Notifica dall\'App',
      options
    )
  );
});

// Evento 'notificationclick' - si attiva quando l'utente clicca sulla notifica
self.addEventListener('notificationclick', event => {
  console.log('Notifica cliccata:', event);

  // Chiudi la notifica
  event.notification.close();

  // Gestisci le azioni
  if (event.action === 'explore') {
    // Azione specifica per 'Visualizza'
    console.log('Utente ha cliccato su "Visualizza"');
  } else if (event.action === 'close') {
    // Azione specifica per 'Chiudi'
    console.log('Utente ha cliccato su "Chiudi"');
    return; // Non aprire nessuna finestra
  }

  // Apri o focalizza una finestra esistente
  event.waitUntil(
    clients.matchAll({type: 'window'}).then(windowClients => {
      // Controlla se c'è già una finestra aperta e focalizzala
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Altrimenti apri una nuova finestra
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});

// Evento 'notificationclose' - si attiva quando l'utente chiude la notifica
self.addEventListener('notificationclose', event => {
  console.log('Notifica chiusa dall\'utente:', event);
});
*/

/**
 * Nota: Il codice sopra è commentato perché questo file è solo un esempio.
 * In un'applicazione reale, dovresti creare un file separato chiamato 'sw-push.js'
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
 *   <title>Notifiche Push Demo</title>
 *   <style>
 *     body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
 *     .container { border: 1px solid #ddd; padding: 20px; border-radius: 5px; }
 *     .status { padding: 10px; border-radius: 5px; margin: 10px 0; }
 *     .enabled { background-color: #d4edda; color: #155724; }
 *     .disabled { background-color: #f8d7da; color: #721c24; }
 *     button { padding: 10px 15px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; }
 *     button:disabled { background-color: #cccccc; cursor: not-allowed; }
 *     .notification-example { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 20px; }
 *   </style>
 * </head>
 * <body>
 *   <h1>Notifiche Push Demo</h1>
 *   
 *   <div class="container">
 *     <h2>Stato Notifiche Push</h2>
 *     <div id="push-status" class="status disabled">Notifiche push non inizializzate</div>
 *     
 *     <button id="enable-push">Abilita Notifiche Push</button>
 *     <button id="test-push">Testa Notifica</button>
 *     
 *     <div class="notification-example">
 *       <h3>Esempio di Notifica</h3>
 *       <p><strong>Titolo:</strong> Notifica dall'App</p>
 *       <p><strong>Corpo:</strong> Hai ricevuto una nuova notifica!</p>
 *       <p><strong>Azioni:</strong> Visualizza, Chiudi</p>
 *     </div>
 *   </div>
 *   
 *   <div class="container" style="margin-top: 20px;">
 *     <h2>Come Funzionano le Notifiche Push</h2>
 *     <ol>
 *       <li>L'utente concede il permesso per le notifiche</li>
 *       <li>Il browser genera una sottoscrizione push unica per l'utente</li>
 *       <li>La sottoscrizione viene inviata al server</li>
 *       <li>Il server può inviare notifiche push anche quando l'utente non è sul sito</li>
 *       <li>Il Service Worker riceve la notifica e la mostra all'utente</li>
 *     </ol>
 *   </div>
 *   
 *   <script src="esempio5.js"></script>
 * </body>
 * </html>
 */

/**
 * Implementazione lato server (Node.js con web-push)
 * 
 * // server.js
 * const express = require('express');
 * const webpush = require('web-push');
 * const bodyParser = require('body-parser');
 * 
 * const app = express();
 * app.use(bodyParser.json());
 * 
 * // Genera le VAPID keys con: ./node_modules/.bin/web-push generate-vapid-keys
 * const vapidKeys = {
 *   publicKey: 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U',
 *   privateKey: 'Xt4Z-2uOmRt2EtLvQYwWFtWgOKuIVhJtl0Vo5nQJ3Tc'
 * };
 * 
 * webpush.setVapidDetails(
 *   'mailto:example@yourdomain.org',
 *   vapidKeys.publicKey,
 *   vapidKeys.privateKey
 * );
 * 
 * // Memorizza le sottoscrizioni (in un'app reale, usare un database)
 * const subscriptions = [];
 * 
 * // Endpoint per salvare le sottoscrizioni
 * app.post('/api/push-subscriptions', (req, res) => {
 *   const subscription = req.body;
 *   
 *   // Memorizza la sottoscrizione
 *   subscriptions.push(subscription);
 *   
 *   res.status(201).json({ message: 'Sottoscrizione salvata con successo' });
 * });
 * 
 * // Endpoint per inviare notifiche push a tutti gli utenti sottoscritti
 * app.post('/api/send-notification', (req, res) => {
 *   const notification = req.body;
 *   
 *   const parallelSendNotifications = subscriptions.map(subscription => {
 *     return webpush.sendNotification(subscription, JSON.stringify(notification))
 *       .catch(error => {
 *         if (error.statusCode === 410) {
 *           // La sottoscrizione non è più valida, rimuovila
 *           const index = subscriptions.indexOf(subscription);
 *           if (index !== -1) subscriptions.splice(index, 1);
 *         } else {
 *           console.error('Errore nell\'invio della notifica:', error);
 *         }
 *       });
 *   });
 *   
 *   Promise.all(parallelSendNotifications)
 *     .then(() => {
 *       res.status(200).json({ message: 'Notifiche inviate con successo' });
 *     })
 *     .catch(error => {
 *       res.status(500).json({ error: 'Errore nell\'invio delle notifiche' });
 *     });
 * });
 * 
 * app.listen(3000, () => {
 *   console.log('Server in ascolto sulla porta 3000');
 * });
 */