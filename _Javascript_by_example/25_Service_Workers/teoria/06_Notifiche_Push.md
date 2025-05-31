# Notifiche Push con Service Workers

Le notifiche push rappresentano una delle funzionalità più potenti offerte dai Service Workers, permettendo alle applicazioni web di inviare messaggi agli utenti anche quando non stanno attivamente utilizzando l'applicazione. In questo capitolo, esploreremo come implementare le notifiche push utilizzando i Service Workers.

## Introduzione alle Notifiche Push

Le notifiche push sono messaggi che vengono inviati dal server all'applicazione web dell'utente, anche quando l'applicazione non è attiva nel browser. Questo è possibile grazie ai Service Workers, che possono ricevere questi messaggi e mostrarli all'utente come notifiche del sistema operativo.

Il processo di notifica push coinvolge tre componenti principali:

1. **Il server dell'applicazione**: Invia i messaggi push
2. **Il servizio di messaggistica push del browser**: Riceve i messaggi e li consegna al dispositivo dell'utente
3. **Il Service Worker**: Riceve i messaggi dal servizio di messaggistica e li mostra come notifiche

## Richiesta di Permesso per le Notifiche

Prima di poter inviare notifiche, è necessario richiedere il permesso all'utente:

```javascript
function requestNotificationPermission() {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Permesso per le notifiche concesso!');
      // Procedi con la sottoscrizione alle notifiche push
      subscribeUserToPush();
    } else {
      console.log('Permesso per le notifiche negato.');
    }
  });
}
```

## Sottoscrizione alle Notifiche Push

Dopo aver ottenuto il permesso, è necessario sottoscrivere l'utente al servizio di notifiche push:

```javascript
function subscribeUserToPush() {
  const applicationServerKey = urlBase64ToUint8Array(
    'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'
  );
  
  navigator.serviceWorker.ready
    .then(registration => {
      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      });
    })
    .then(subscription => {
      console.log('Utente sottoscritto:', JSON.stringify(subscription));
      // Invia la sottoscrizione al server
      return sendSubscriptionToServer(subscription);
    })
    .catch(error => {
      console.error('Errore durante la sottoscrizione:', error);
    });
}

// Funzione di utilità per convertire la chiave pubblica
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
```

## Gestione degli Eventi Push nel Service Worker

Nel file del Service Worker, è necessario aggiungere un gestore per l'evento 'push':

```javascript
self.addEventListener('push', event => {
  console.log('Evento push ricevuto:', event);

  // Estrai i dati dal payload, se presenti
  let notificationData = {};
  if (event.data) {
    notificationData = event.data.json();
  }

  // Imposta le opzioni di notifica
  const options = {
    body: notificationData.body || 'Nuova notifica!',
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
```

## Gestione del Click sulle Notifiche

È importante gestire anche l'interazione dell'utente con le notifiche:

```javascript
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
```

## Implementazione Lato Server

Per inviare notifiche push dal server, è necessario utilizzare il Web Push Protocol. Ecco un esempio di implementazione utilizzando Node.js e la libreria `web-push`:

```javascript
const webpush = require('web-push');

// Configura le VAPID keys
const vapidKeys = {
  publicKey: 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U',
  privateKey: 'Xt4Z-2uOmRt2EtLvQYwWFtWgOKuIVhJtl0Vo5nQJ3Tc'
};

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Funzione per inviare una notifica push
function sendPushNotification(subscription, payload) {
  return webpush.sendNotification(subscription, JSON.stringify(payload))
    .catch(error => {
      console.error('Errore nell\'invio della notifica push:', error);
    });
}

// Esempio di utilizzo
const subscription = {
  // Dati di sottoscrizione ricevuti dal client
};

const payload = {
  title: 'Nuova notifica',
  body: 'Questo è il contenuto della notifica',
  icon: '/images/icon-192x192.png',
  url: '/pagina-dettaglio'
};

sendPushNotification(subscription, payload);
```

## Best Practices per le Notifiche Push

1. **Richiedi il permesso al momento giusto**: Non richiedere il permesso per le notifiche immediatamente al caricamento della pagina, ma aspetta che l'utente compia un'azione significativa.

2. **Invia notifiche rilevanti**: Assicurati che le notifiche siano utili e pertinenti per l'utente.

3. **Personalizza le notifiche**: Utilizza titoli, icone e contenuti personalizzati per rendere le notifiche più efficaci.

4. **Gestisci correttamente le interazioni**: Assicurati che il click sulla notifica porti l'utente alla pagina pertinente.

5. **Rispetta la privacy**: Non inviare informazioni sensibili attraverso le notifiche push.

6. **Offri opzioni di controllo**: Permetti agli utenti di gestire le preferenze di notifica all'interno dell'applicazione.

## Compatibilità e Fallback

Le notifiche push non sono supportate da tutti i browser. È importante implementare un sistema di fallback per i browser che non supportano questa funzionalità:

```javascript
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

// Utilizzo
if (checkPushSupport()) {
  // Procedi con l'implementazione delle notifiche push
  requestNotificationPermission();
} else {
  // Implementa un fallback, ad esempio notifiche in-app
  setupInAppNotifications();
}
```

## Conclusione

Le notifiche push rappresentano uno strumento potente per migliorare il coinvolgimento degli utenti nelle applicazioni web. Grazie ai Service Workers, è possibile implementare questa funzionalità in modo efficace, offrendo un'esperienza simile a quella delle applicazioni native.

È importante utilizzare le notifiche push con responsabilità, rispettando le preferenze degli utenti e inviando solo contenuti rilevanti e utili.

[Torna all'indice](../README.md) | [Capitolo precedente: Funzionalità Offline](./05_Funzionalita_Offline.md)