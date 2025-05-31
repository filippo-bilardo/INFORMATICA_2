/**
 * esempio4.js - Creazione di un'esperienza offline completa
 * 
 * Questo esempio mostra come implementare un'esperienza offline completa utilizzando
 * Service Workers, Cache API e IndexedDB per gestire sia risorse statiche che dati dinamici.
 */

// Verifica se il browser supporta i Service Workers
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw-offline.js')
      .then(registration => {
        console.log('Service Worker registrato con successo con scope:', registration.scope);
      })
      .catch(error => {
        console.error('Errore durante la registrazione del Service Worker:', error);
      });
  });
}

/**
 * sw-offline.js - File del Service Worker per funzionalità offline complete
 * 
 * Questo file dovrebbe essere salvato come 'sw-offline.js' nella root del tuo sito.
 * Di seguito è riportato il codice che dovrebbe essere incluso in questo file.
 */

/*
// Nomi delle cache
const CACHE_STATIC = 'offline-static-v1';
const CACHE_DYNAMIC = 'offline-dynamic-v1';

// Risorse da precaricare per l'esperienza offline
const OFFLINE_RESOURCES = [
  '/',
  '/index.html',
  '/offline.html',
  '/styles/main.css',
  '/scripts/main.js',
  '/scripts/idb.js', // Libreria IndexedDB Promise-based
  '/scripts/database.js', // Script per gestire IndexedDB
  '/images/logo.png',
  '/images/offline-image.png',
  '/manifest.json',
  '/favicon.ico'
];

// Evento 'install' - precaricare le risorse per l'esperienza offline
self.addEventListener('install', event => {
  console.log('Service Worker: Installazione in corso');
  
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache => {
        console.log('Service Worker: Precaricamento risorse offline');
        return cache.addAll(OFFLINE_RESOURCES);
      })
      .then(() => self.skipWaiting())
  );
});

// Evento 'activate' - pulire le cache obsolete
self.addEventListener('activate', event => {
  console.log('Service Worker: Attivazione in corso');
  
  const currentCaches = [CACHE_STATIC, CACHE_DYNAMIC];
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!currentCaches.includes(cacheName)) {
              console.log('Service Worker: Eliminazione cache obsoleta:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Funzione per salvare i dati in IndexedDB
function saveToIndexedDB(data) {
  // Questa funzione dovrebbe essere implementata nel file database.js
  // e importata nel Service Worker
  return idbHelper.saveData(data);
}

// Funzione per recuperare i dati da IndexedDB
function getFromIndexedDB(key) {
  // Questa funzione dovrebbe essere implementata nel file database.js
  // e importata nel Service Worker
  return idbHelper.getData(key);
}

// Evento 'fetch' - gestione delle richieste di rete con fallback offline
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Gestione delle richieste API
  if (url.pathname.startsWith('/api/')) {
    // Strategia per le API: Network First con fallback a IndexedDB
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clona la risposta per salvarla
          const clonedResponse = response.clone();
          
          // Salva i dati in IndexedDB per l'accesso offline
          clonedResponse.json()
            .then(data => {
              saveToIndexedDB({
                url: request.url,
                data: data,
                timestamp: Date.now()
              });
            });
          
          return response;
        })
        .catch(() => {
          console.log('Service Worker: Errore di rete, recupero dati da IndexedDB');
          
          // Recupera i dati da IndexedDB
          return getFromIndexedDB(request.url)
            .then(data => {
              if (data) {
                // Crea una risposta con i dati di IndexedDB
                return new Response(JSON.stringify(data.data), {
                  headers: { 'Content-Type': 'application/json' },
                  status: 200
                });
              } else {
                // Se non ci sono dati in IndexedDB, restituisci una risposta di errore
                return new Response(JSON.stringify({
                  error: 'Dati non disponibili offline'
                }), {
                  headers: { 'Content-Type': 'application/json' },
                  status: 503
                });
              }
            });
        })
    );
    return;
  }
  
  // Gestione delle richieste di pagine HTML
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() => {
          console.log('Service Worker: Errore di rete, servendo la pagina offline');
          return caches.match('/offline.html');
        })
    );
    return;
  }
  
  // Gestione di tutte le altre richieste (CSS, JS, immagini, ecc.)
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        // Se la risorsa è nella cache, restituiscila
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Altrimenti, effettua una richiesta di rete
        return fetch(request)
          .then(networkResponse => {
            // Memorizza nella cache dinamica
            return caches.open(CACHE_DYNAMIC)
              .then(cache => {
                cache.put(request, networkResponse.clone());
                return networkResponse;
              });
          })
          .catch(() => {
            // Gestione fallback per diversi tipi di risorse
            if (request.destination === 'image') {
              return caches.match('/images/offline-image.png');
            }
            
            // Per altri tipi di risorse, potresti voler restituire un fallback specifico
            // o semplicemente lasciare che la richiesta fallisca
          });
      })
  );
});

// Evento 'sync' - sincronizzazione in background
self.addEventListener('sync', event => {
  console.log('Service Worker: Evento di sincronizzazione', event.tag);
  
  if (event.tag === 'sync-new-posts') {
    event.waitUntil(
      // Recupera i post non sincronizzati da IndexedDB
      idbHelper.getUnsyncedPosts()
        .then(unsyncedPosts => {
          return Promise.all(
            unsyncedPosts.map(post => {
              // Invia ogni post al server
              return fetch('/api/posts', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
              })
              .then(response => {
                if (response.ok) {
                  // Se l'invio ha successo, marca il post come sincronizzato
                  return idbHelper.markPostAsSynced(post.id);
                }
              });
            })
          );
        })
    );
  }
});
*/

/**
 * Nota: Il codice sopra è commentato perché questo file è solo un esempio.
 * In un'applicazione reale, dovresti creare un file separato chiamato 'sw-offline.js'
 * nella root del tuo sito e includervi il codice non commentato.
 */

/**
 * database.js - Helper per IndexedDB
 * 
 * Questo file dovrebbe essere salvato come 'scripts/database.js' nel tuo sito.
 * Di seguito è riportato il codice che dovrebbe essere incluso in questo file.
 */

/*
// Importa la libreria idb.js (https://github.com/jakearchibald/idb)
// <script src="/scripts/idb.js"></script> deve essere incluso prima di questo script

const idbHelper = (() => {
  let db;
  
  // Inizializza il database
  function initDB() {
    if (db) {
      return Promise.resolve(db);
    }
    
    return idb.openDB('offline-app-db', 1, {
      upgrade(db) {
        // Crea object store per i dati API
        if (!db.objectStoreNames.contains('api-cache')) {
          const apiStore = db.createObjectStore('api-cache', { keyPath: 'url' });
          apiStore.createIndex('timestamp', 'timestamp');
        }
        
        // Crea object store per i post non sincronizzati
        if (!db.objectStoreNames.contains('unsync-posts')) {
          const postsStore = db.createObjectStore('unsync-posts', { keyPath: 'id', autoIncrement: true });
          postsStore.createIndex('synced', 'synced');
        }
      }
    })
    .then(database => {
      db = database;
      return db;
    });
  }
  
  // Salva i dati API nella cache
  function saveData(item) {
    return initDB()
      .then(db => {
        const tx = db.transaction('api-cache', 'readwrite');
        tx.objectStore('api-cache').put(item);
        return tx.complete;
      });
  }
  
  // Recupera i dati API dalla cache
  function getData(url) {
    return initDB()
      .then(db => {
        return db.transaction('api-cache', 'readonly')
          .objectStore('api-cache')
          .get(url);
      });
  }
  
  // Salva un post non sincronizzato
  function saveUnsyncedPost(post) {
    return initDB()
      .then(db => {
        const tx = db.transaction('unsync-posts', 'readwrite');
        tx.objectStore('unsync-posts').put({
          ...post,
          synced: false,
          createdAt: Date.now()
        });
        return tx.complete;
      });
  }
  
  // Recupera tutti i post non sincronizzati
  function getUnsyncedPosts() {
    return initDB()
      .then(db => {
        return db.transaction('unsync-posts', 'readonly')
          .objectStore('unsync-posts')
          .index('synced')
          .getAll(IDBKeyRange.only(false));
      });
  }
  
  // Marca un post come sincronizzato
  function markPostAsSynced(id) {
    return initDB()
      .then(db => {
        const tx = db.transaction('unsync-posts', 'readwrite');
        const store = tx.objectStore('unsync-posts');
        return store.get(id)
          .then(post => {
            if (post) {
              post.synced = true;
              store.put(post);
            }
            return tx.complete;
          });
      });
  }
  
  return {
    initDB,
    saveData,
    getData,
    saveUnsyncedPost,
    getUnsyncedPosts,
    markPostAsSynced
  };
})();
*/

/**
 * HTML di esempio per utilizzare questo Service Worker:
 * 
 * <!DOCTYPE html>
 * <html lang="it">
 * <head>
 *   <meta charset="UTF-8">
 *   <meta name="viewport" content="width=device-width, initial-scale=1.0">
 *   <meta name="theme-color" content="#4285f4">
 *   <link rel="manifest" href="/manifest.json">
 *   <link rel="stylesheet" href="/styles/main.css">
 *   <title>Esperienza Offline Completa</title>
 *   <script src="/scripts/idb.js"></script>
 *   <script src="/scripts/database.js"></script>
 *   <script src="/esempio4.js"></script>
 * </head>
 * <body>
 *   <header>
 *     <h1>Esperienza Offline Completa</h1>
 *     <div id="online-status">Online</div>
 *   </header>
 *   
 *   <main>
 *     <section class="posts-container">
 *       <h2>Post Recenti</h2>
 *       <div id="posts-list"></div>
 *     </section>
 *     
 *     <section class="new-post">
 *       <h2>Crea Nuovo Post</h2>
 *       <form id="post-form">
 *         <div class="form-group">
 *           <label for="post-title">Titolo</label>
 *           <input type="text" id="post-title" required>
 *         </div>
 *         <div class="form-group">
 *           <label for="post-content">Contenuto</label>
 *           <textarea id="post-content" required></textarea>
 *         </div>
 *         <button type="submit">Pubblica</button>
 *       </form>
 *     </section>
 *   </main>
 *   
 *   <script>
 *     // Gestione dello stato online/offline
 *     function updateOnlineStatus() {
 *       const statusElement = document.getElementById('online-status');
 *       if (navigator.onLine) {
 *         statusElement.textContent = 'Online';
 *         statusElement.className = 'online';
 *       } else {
 *         statusElement.textContent = 'Offline';
 *         statusElement.className = 'offline';
 *       }
 *     }
 *     
 *     window.addEventListener('online', updateOnlineStatus);
 *     window.addEventListener('offline', updateOnlineStatus);
 *     updateOnlineStatus();
 *     
 *     // Caricamento dei post
 *     function loadPosts() {
 *       fetch('/api/posts')
 *         .then(response => response.json())
 *         .then(posts => {
 *           const postsListElement = document.getElementById('posts-list');
 *           postsListElement.innerHTML = '';
 *           
 *           posts.forEach(post => {
 *             const postElement = document.createElement('div');
 *             postElement.className = 'post';
 *             postElement.innerHTML = `
 *               <h3>${post.title}</h3>
 *               <p>${post.content}</p>
 *               <div class="post-meta">Pubblicato il ${new Date(post.createdAt).toLocaleString()}</div>
 *             `;
 *             postsListElement.appendChild(postElement);
 *           });
 *         })
 *         .catch(error => {
 *           console.error('Errore nel caricamento dei post:', error);
 *           document.getElementById('posts-list').innerHTML = '<p>Impossibile caricare i post. Potresti essere offline.</p>';
 *         });
 *     }
 *     
 *     // Gestione del form per nuovi post
 *     document.getElementById('post-form').addEventListener('submit', event => {
 *       event.preventDefault();
 *       
 *       const titleInput = document.getElementById('post-title');
 *       const contentInput = document.getElementById('post-content');
 *       
 *       const newPost = {
 *         title: titleInput.value,
 *         content: contentInput.value,
 *         createdAt: Date.now()
 *       };
 *       
 *       if (navigator.onLine) {
 *         // Se online, invia direttamente al server
 *         fetch('/api/posts', {
 *           method: 'POST',
 *           headers: {
 *             'Content-Type': 'application/json'
 *           },
 *           body: JSON.stringify(newPost)
 *         })
 *         .then(response => {
 *           if (response.ok) {
 *             titleInput.value = '';
 *             contentInput.value = '';
 *             loadPosts(); // Ricarica i post
 *           }
 *         })
 *         .catch(error => {
 *           console.error('Errore nell\'invio del post:', error);
 *           // In caso di errore, salva localmente
 *           idbHelper.saveUnsyncedPost(newPost)
 *             .then(() => {
 *               alert('Non è stato possibile inviare il post al server. Verrà sincronizzato quando sarai online.');
 *             });
 *         });
 *       } else {
 *         // Se offline, salva localmente e sincronizza in seguito
 *         idbHelper.saveUnsyncedPost(newPost)
 *           .then(() => {
 *             alert('Sei offline. Il post verrà sincronizzato quando sarai online.');
 *             titleInput.value = '';
 *             contentInput.value = '';
 *             
 *             // Registra una sincronizzazione in background
 *             if ('serviceWorker' in navigator && 'SyncManager' in window) {
 *               navigator.serviceWorker.ready
 *                 .then(registration => {
 *                   return registration.sync.register('sync-new-posts');
 *                 })
 *                 .catch(error => {
 *                   console.error('Errore nella registrazione della sincronizzazione:', error);
 *                 });
 *             }
 *           });
 *       }
 *     });
 *     
 *     // Carica i post all'avvio
 *     loadPosts();
 *   </script>
 * </body>
 * </html>
 */

/**
 * manifest.json - Manifest per PWA
 * 
 * {
 *   "name": "Offline App Demo",
 *   "short_name": "OfflineApp",
 *   "start_url": "/index.html",
 *   "display": "standalone",
 *   "background_color": "#ffffff",
 *   "theme_color": "#4285f4",
 *   "icons": [
 *     {
 *       "src": "/images/icon-192x192.png",
 *       "sizes": "192x192",
 *       "type": "image/png"
 *     },
 *     {
 *       "src": "/images/icon-512x512.png",
 *       "sizes": "512x512",
 *       "type": "image/png"
 *     }
 *   ]
 * }
 */