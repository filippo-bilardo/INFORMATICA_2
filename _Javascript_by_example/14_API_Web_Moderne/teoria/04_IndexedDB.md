# IndexedDB

IndexedDB è un sistema di database NoSQL integrato nei browser moderni che permette di archiviare grandi quantità di dati strutturati, inclusi file e blob. A differenza di Web Storage (localStorage e sessionStorage), IndexedDB offre capacità di ricerca avanzate, transazioni e supporto per grandi volumi di dati.

## Introduzione a IndexedDB

IndexedDB è progettato per applicazioni web che necessitano di archiviare grandi quantità di dati in modo persistente sul client. Fornisce un'API asincrona basata su eventi (o su Promesse con wrapper moderni) per interagire con il database.

```javascript
// Apertura di un database
const richiesta = indexedDB.open('MioDatabase', 1);

// Gestione degli eventi
richiesta.onerror = (event) => {
  console.error('Errore durante l'apertura del database:', event.target.error);
};

richiesta.onsuccess = (event) => {
  const db = event.target.result;
  console.log('Database aperto con successo');
  // Ora puoi iniziare a utilizzare il database
};

// Configurazione della struttura del database (schema)
richiesta.onupgradeneeded = (event) => {
  const db = event.target.result;
  console.log('Creazione o aggiornamento della struttura del database');
  
  // Creazione di un object store (simile a una tabella)
  const utentiStore = db.createObjectStore('utenti', { keyPath: 'id', autoIncrement: true });
  
  // Creazione di indici per ricerche veloci
  utentiStore.createIndex('per_nome', 'nome', { unique: false });
  utentiStore.createIndex('per_email', 'email', { unique: true });
  
  console.log('Object store e indici creati');
};
```

## Concetti Fondamentali

### Database e Versioni

Ogni database IndexedDB ha un nome e un numero di versione. Quando si apre un database con una versione superiore a quella attuale, viene attivato l'evento `onupgradeneeded` che permette di aggiornare la struttura del database.

### Object Stores

Gli object stores sono l'equivalente delle tabelle nei database relazionali. Ogni object store può contenere record JavaScript (oggetti) e deve avere una chiave unica per identificare ogni record.

### Indici

Gli indici permettono di cercare record in base a proprietà diverse dalla chiave primaria, migliorando le prestazioni delle query.

### Transazioni

Tutte le operazioni in IndexedDB avvengono all'interno di transazioni, che garantiscono l'integrità dei dati anche in caso di errori.

```javascript
function aggiungiUtente(db, utente) {
  // Creazione di una transazione in modalità readwrite
  const transazione = db.transaction(['utenti'], 'readwrite');
  
  // Gestione degli errori della transazione
  transazione.onerror = (event) => {
    console.error('Errore durante la transazione:', event.target.error);
  };
  
  // Accesso all'object store
  const utentiStore = transazione.objectStore('utenti');
  
  // Aggiunta di un record
  const richiesta = utentiStore.add(utente);
  
  richiesta.onsuccess = (event) => {
    console.log('Utente aggiunto con ID:', event.target.result);
  };
  
  richiesta.onerror = (event) => {
    console.error('Errore durante l\'aggiunta dell\'utente:', event.target.error);
  };
}

// Utilizzo
richiesta.onsuccess = (event) => {
  const db = event.target.result;
  
  aggiungiUtente(db, {
    nome: 'Mario Rossi',
    email: 'mario@example.com',
    età: 35
  });
};
```

## Operazioni CRUD

### Create (Creazione)

```javascript
function aggiungiRecord(db, nomeStore, dati) {
  return new Promise((resolve, reject) => {
    const transazione = db.transaction([nomeStore], 'readwrite');
    const store = transazione.objectStore(nomeStore);
    
    const richiesta = store.add(dati);
    
    richiesta.onsuccess = () => resolve(richiesta.result);
    richiesta.onerror = () => reject(richiesta.error);
  });
}

// Utilizzo con Promise
aggiungiRecord(db, 'utenti', {
  nome: 'Luigi Verdi',
  email: 'luigi@example.com',
  età: 28
})
.then(id => console.log('Record aggiunto con ID:', id))
.catch(errore => console.error('Errore:', errore));
```

### Read (Lettura)

```javascript
// Lettura di un singolo record per chiave
function leggiRecord(db, nomeStore, chiave) {
  return new Promise((resolve, reject) => {
    const transazione = db.transaction([nomeStore], 'readonly');
    const store = transazione.objectStore(nomeStore);
    
    const richiesta = store.get(chiave);
    
    richiesta.onsuccess = () => resolve(richiesta.result);
    richiesta.onerror = () => reject(richiesta.error);
  });
}

// Lettura di tutti i record
function leggiTuttiRecord(db, nomeStore) {
  return new Promise((resolve, reject) => {
    const transazione = db.transaction([nomeStore], 'readonly');
    const store = transazione.objectStore(nomeStore);
    
    const richiesta = store.getAll();
    
    richiesta.onsuccess = () => resolve(richiesta.result);
    richiesta.onerror = () => reject(richiesta.error);
  });
}

// Utilizzo
leggiRecord(db, 'utenti', 1)
  .then(utente => {
    if (utente) {
      console.log('Utente trovato:', utente);
    } else {
      console.log('Utente non trovato');
    }
  })
  .catch(errore => console.error('Errore:', errore));

leggiTuttiRecord(db, 'utenti')
  .then(utenti => console.log('Tutti gli utenti:', utenti))
  .catch(errore => console.error('Errore:', errore));
```

### Update (Aggiornamento)

```javascript
function aggiornaRecord(db, nomeStore, dati) {
  return new Promise((resolve, reject) => {
    const transazione = db.transaction([nomeStore], 'readwrite');
    const store = transazione.objectStore(nomeStore);
    
    const richiesta = store.put(dati); // put sostituisce o aggiunge
    
    richiesta.onsuccess = () => resolve(richiesta.result);
    richiesta.onerror = () => reject(richiesta.error);
  });
}

// Utilizzo
leggiRecord(db, 'utenti', 1)
  .then(utente => {
    if (utente) {
      // Modifica dei dati
      utente.età = 36;
      return aggiornaRecord(db, 'utenti', utente);
    }
  })
  .then(() => console.log('Utente aggiornato'))
  .catch(errore => console.error('Errore:', errore));
```

### Delete (Eliminazione)

```javascript
// Eliminazione di un singolo record
function eliminaRecord(db, nomeStore, chiave) {
  return new Promise((resolve, reject) => {
    const transazione = db.transaction([nomeStore], 'readwrite');
    const store = transazione.objectStore(nomeStore);
    
    const richiesta = store.delete(chiave);
    
    richiesta.onsuccess = () => resolve();
    richiesta.onerror = () => reject(richiesta.error);
  });
}

// Eliminazione di tutti i record
function svuotaStore(db, nomeStore) {
  return new Promise((resolve, reject) => {
    const transazione = db.transaction([nomeStore], 'readwrite');
    const store = transazione.objectStore(nomeStore);
    
    const richiesta = store.clear();
    
    richiesta.onsuccess = () => resolve();
    richiesta.onerror = () => reject(richiesta.error);
  });
}

// Utilizzo
eliminaRecord(db, 'utenti', 1)
  .then(() => console.log('Utente eliminato'))
  .catch(errore => console.error('Errore:', errore));
```

## Query Avanzate con Indici e Cursori

IndexedDB supporta query avanzate tramite indici e cursori, che permettono di iterare sui risultati in modo efficiente.

```javascript
// Ricerca per indice
function cercaPerIndice(db, nomeStore, nomeIndice, valore) {
  return new Promise((resolve, reject) => {
    const transazione = db.transaction([nomeStore], 'readonly');
    const store = transazione.objectStore(nomeStore);
    const indice = store.index(nomeIndice);
    
    const richiesta = indice.getAll(valore);
    
    richiesta.onsuccess = () => resolve(richiesta.result);
    richiesta.onerror = () => reject(richiesta.error);
  });
}

// Utilizzo di cursori per iterare sui risultati
function iteraConCursore(db, nomeStore, callback) {
  return new Promise((resolve, reject) => {
    const transazione = db.transaction([nomeStore], 'readonly');
    const store = transazione.objectStore(nomeStore);
    
    const richiesta = store.openCursor();
    const risultati = [];
    
    richiesta.onsuccess = (event) => {
      const cursore = event.target.result;
      
      if (cursore) {
        // Processa il record corrente
        callback(cursore.value);
        risultati.push(cursore.value);
        
        // Passa al record successivo
        cursore.continue();
      } else {
        // Nessun altro record
        resolve(risultati);
      }
    };
    
    richiesta.onerror = () => reject(richiesta.error);
  });
}

// Utilizzo
cercaPerIndice(db, 'utenti', 'per_nome', 'Mario')
  .then(utenti => console.log('Utenti con nome Mario:', utenti))
  .catch(errore => console.error('Errore:', errore));

iteraConCursore(db, 'utenti', utente => {
  console.log('Elaborazione utente:', utente.nome);
})
.then(tutti => console.log('Elaborazione completata, totale:', tutti.length))
.catch(errore => console.error('Errore:', errore));
```

## Range di Valori e Filtri

IndexedDB supporta query con range di valori tramite l'oggetto `IDBKeyRange`:

```javascript
function cercaConRange(db, nomeStore, nomeIndice, rangeConfig) {
  return new Promise((resolve, reject) => {
    const transazione = db.transaction([nomeStore], 'readonly');
    const store = transazione.objectStore(nomeStore);
    const indice = nomeIndice ? store.index(nomeIndice) : store;
    
    // Creazione del range
    let range;
    if (rangeConfig.tipo === 'only') {
      range = IDBKeyRange.only(rangeConfig.valore);
    } else if (rangeConfig.tipo === 'lowerBound') {
      range = IDBKeyRange.lowerBound(rangeConfig.valore, rangeConfig.esclusivo);
    } else if (rangeConfig.tipo === 'upperBound') {
      range = IDBKeyRange.upperBound(rangeConfig.valore, rangeConfig.esclusivo);
    } else if (rangeConfig.tipo === 'bound') {
      range = IDBKeyRange.bound(
        rangeConfig.lower, 
        rangeConfig.upper, 
        rangeConfig.lowerEsclusivo, 
        rangeConfig.upperEsclusivo
      );
    }
    
    const richiesta = indice.getAll(range);
    
    richiesta.onsuccess = () => resolve(richiesta.result);
    richiesta.onerror = () => reject(richiesta.error);
  });
}

// Esempi di utilizzo

// Utenti con età maggiore o uguale a 30
cercaConRange(db, 'utenti', 'per_età', {
  tipo: 'lowerBound',
  valore: 30,
  esclusivo: false
})
.then(utenti => console.log('Utenti con età ≥ 30:', utenti));

// Utenti con età tra 25 e 35 (inclusi)
cercaConRange(db, 'utenti', 'per_età', {
  tipo: 'bound',
  lower: 25,
  upper: 35,
  lowerEsclusivo: false,
  upperEsclusivo: false
})
.then(utenti => console.log('Utenti con età tra 25 e 35:', utenti));
```

## Gestione di Dati Binari

IndexedDB può archiviare dati binari come Blob, File e ArrayBuffer:

```javascript
// Salvataggio di un'immagine
function salvaImmagine(db, file) {
  return new Promise((resolve, reject) => {
    const transazione = db.transaction(['immagini'], 'readwrite');
    const store = transazione.objectStore('immagini');
    
    const immagine = {
      nome: file.name,
      tipo: file.type,
      dimensione: file.size,
      data: file, // Il Blob/File viene archiviato direttamente
      dataCaricamento: new Date().toISOString()
    };
    
    const richiesta = store.add(immagine);
    
    richiesta.onsuccess = () => resolve(richiesta.result);
    richiesta.onerror = () => reject(richiesta.error);
  });
}

// Recupero e visualizzazione di un'immagine
function mostraImmagine(db, id) {
  return leggiRecord(db, 'immagini', id)
    .then(record => {
      if (record) {
        const url = URL.createObjectURL(record.data);
        const img = document.createElement('img');
        img.src = url;
        document.body.appendChild(img);
        
        // Pulizia quando l'immagine non serve più
        return url; // Restituisci l'URL per poterlo revocare in seguito
      }
    });
}

// Utilizzo con input file
document.getElementById('fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    salvaImmagine(db, file)
      .then(id => console.log('Immagine salvata con ID:', id))
      .catch(errore => console.error('Errore:', errore));
  }
});
```

## Wrapper Promesse per IndexedDB

Poiché l'API nativa di IndexedDB è basata su eventi, è comune creare wrapper basati su Promesse per semplificare l'utilizzo:

```javascript
class IndexedDBHelper {
  constructor(nomeDB, versione) {
    this.nomeDB = nomeDB;
    this.versione = versione;
    this.db = null;
  }
  
  apri(callback) {
    return new Promise((resolve, reject) => {
      const richiesta = indexedDB.open(this.nomeDB, this.versione);
      
      richiesta.onerror = () => reject(richiesta.error);
      
      richiesta.onsuccess = () => {
        this.db = richiesta.result;
        resolve(this.db);
      };
      
      richiesta.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (callback) {
          callback(db, event.oldVersion, event.newVersion);
        }
      };
    });
  }
  
  chiudi() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
  
  elimina() {
    this.chiudi();
    return new Promise((resolve, reject) => {
      const richiesta = indexedDB.deleteDatabase(this.nomeDB);
      richiesta.onsuccess = () => resolve();
      richiesta.onerror = () => reject(richiesta.error);
    });
  }
  
  transazione(nomiStore, tipo = 'readonly') {
    if (!this.db) throw new Error('Database non aperto');
    return this.db.transaction(nomiStore, tipo);
  }
  
  aggiungi(nomeStore, dati) {
    return new Promise((resolve, reject) => {
      const transazione = this.transazione([nomeStore], 'readwrite');
      const store = transazione.objectStore(nomeStore);
      const richiesta = store.add(dati);
      
      richiesta.onsuccess = () => resolve(richiesta.result);
      richiesta.onerror = () => reject(richiesta.error);
    });
  }
  
  ottieni(nomeStore, chiave) {
    return new Promise((resolve, reject) => {
      const transazione = this.transazione([nomeStore]);
      const store = transazione.objectStore(nomeStore);
      const richiesta = store.get(chiave);
      
      richiesta.onsuccess = () => resolve(richiesta.result);
      richiesta.onerror = () => reject(richiesta.error);
    });
  }
  
  otteniTutti(nomeStore) {
    return new Promise((resolve, reject) => {
      const transazione = this.transazione([nomeStore]);
      const store = transazione.objectStore(nomeStore);
      const richiesta = store.getAll();
      
      richiesta.onsuccess = () => resolve(richiesta.result);
      richiesta.onerror = () => reject(richiesta.error);
    });
  }
  
  aggiorna(nomeStore, dati) {
    return new Promise((resolve, reject) => {
      const transazione = this.transazione([nomeStore], 'readwrite');
      const store = transazione.objectStore(nomeStore);
      const richiesta = store.put(dati);
      
      richiesta.onsuccess = () => resolve(richiesta.result);
      richiesta.onerror = () => reject(richiesta.error);
    });
  }
  
  elimina(nomeStore, chiave) {
    return new Promise((resolve, reject) => {
      const transazione = this.transazione([nomeStore], 'readwrite');
      const store = transazione.objectStore(nomeStore);
      const richiesta = store.delete(chiave);
      
      richiesta.onsuccess = () => resolve();
      richiesta.onerror = () => reject(richiesta.error);
    });
  }
  
  cercaPerIndice(nomeStore, nomeIndice, valore) {
    return new Promise((resolve, reject) => {
      const transazione = this.transazione([nomeStore]);
      const store = transazione.objectStore(nomeStore);
      const indice = store.index(nomeIndice);
      const richiesta = indice.getAll(valore);
      
      richiesta.onsuccess = () => resolve(richiesta.result);
      richiesta.onerror = () => reject(richiesta.error);
    });
  }
}

// Utilizzo della classe helper
const dbHelper = new IndexedDBHelper('AppDatabase', 1);

// Apertura e configurazione del database
dbHelper.apri((db, oldVersion, newVersion) => {
  // Configurazione dello schema durante l'upgrade
  if (oldVersion < 1) {
    const utentiStore = db.createObjectStore('utenti', { keyPath: 'id', autoIncrement: true });
    utentiStore.createIndex('per_nome', 'nome');
    utentiStore.createIndex('per_email', 'email', { unique: true });
    
    const immaginiStore = db.createObjectStore('immagini', { keyPath: 'id', autoIncrement: true });
    immaginiStore.createIndex('per_nome', 'nome');
    immaginiStore.createIndex('per_tipo', 'tipo');
  }
})
.then(() => {
  console.log('Database aperto e configurato');
  
  // Ora puoi utilizzare i metodi helper
  return dbHelper.aggiungi('utenti', {
    nome: 'Mario Rossi',
    email: 'mario@example.com',
    età: 35
  });
})
.then(id => {
  console.log('Utente aggiunto con ID:', id);
  return dbHelper.otteniTutti('utenti');
})
.then(utenti => {
  console.log('Tutti gli utenti:', utenti);
})
.catch(errore => {
  console.error('Errore:', errore);
});
```

## Librerie di Terze Parti

Esistono diverse librerie che semplificano l'utilizzo di IndexedDB:

- **Dexie.js**: Una libreria minimale che fornisce un'API basata su Promesse
- **localForage**: Fornisce un'API simile a localStorage ma utilizza IndexedDB come storage
- **PouchDB**: Database NoSQL ispirato a CouchDB che può sincronizzarsi con server remoti

Esempio con Dexie.js:

```javascript
// Installazione: npm install dexie

import Dexie from 'dexie';

// Definizione del database
const db = new Dexie('AppDatabase');

// Definizione dello schema
db.version(1).stores({
  utenti: '++id, nome, email, età',
  immagini: '++id, nome, tipo'
});

// Operazioni CRUD
async function esempioDexie() {
  try {
    // Aggiunta di un utente
    const id = await db.utenti.add({
      nome: 'Mario Rossi',
      email: 'mario@example.com',
      età: 35
    });
    console.log('Utente aggiunto con ID:', id);
    
    // Lettura di un utente
    const utente = await db.utenti.get(id);
    console.log('Utente recuperato:', utente);
    
    // Aggiornamento di un utente
    await db.utenti.update(id, { età: 36 });
    console.log('Utente aggiornato');
    
    // Query con filtri
    const utentiAdulti = await db.utenti
      .where('età')
      .above(30)
      .toArray();
    console.log('Utenti con età > 30:', utentiAdulti);
    
    // Eliminazione di un utente
    await db.utenti.delete(id);
    console.log('Utente eliminato');
  } catch (errore) {
    console.error('Errore:', errore);
  }
}

esempioDexie();
```

## Limitazioni e Considerazioni

- **Spazio di Archiviazione**: Ogni browser ha limiti diversi per lo spazio di archiviazione disponibile
- **Prestazioni**: Le operazioni su grandi quantità di dati possono influire sulle prestazioni dell'applicazione
- **Compatibilità**: Sebbene supportato da tutti i browser moderni, ci sono differenze di implementazione
- **Debugging**: Il debugging può essere complesso; utilizzare gli strumenti per sviluppatori del browser

## Best Practices

1. **Gestione delle Versioni**: Pianifica attentamente gli aggiornamenti dello schema
2. **Transazioni**: Utilizza transazioni per garantire l'integrità dei dati
3. **Indici**: Crea indici per le proprietà utilizzate frequentemente nelle query
4. **Gestione degli Errori**: Implementa una robusta gestione degli errori
5. **Backup**: Fornisci funzionalità per esportare e importare i dati

## Conclusione

IndexedDB è una potente API per l'archiviazione di dati strutturati nel browser. Sebbene abbia una curva di apprendimento più ripida rispetto a localStorage, offre capacità significativamente maggiori in termini di volume di dati, struttura e prestazioni di query. È particolarmente utile per applicazioni web che necessitano di funzionare offline o che gestiscono grandi quantità di dati sul client.

[Torna all'indice](../README.md) | [Prossimo argomento: Web Storage](./05_Web_Storage.md)