# Web Storage

Web Storage è un'API che fornisce meccanismi attraverso i quali i browser possono memorizzare coppie chiave/valore in modo molto più intuitivo rispetto all'utilizzo dei cookie. Web Storage offre due interfacce di archiviazione: localStorage e sessionStorage.

## Introduzione al Web Storage

Web Storage è stato progettato per offrire un'alternativa più semplice e potente ai cookie per l'archiviazione di dati nel browser. Rispetto ai cookie, Web Storage offre maggiore capacità di archiviazione (tipicamente 5-10 MB contro i 4 KB dei cookie) e un'API più intuitiva.

```javascript
// Salvataggio di un dato in localStorage
localStorage.setItem('nome', 'Mario');

// Recupero di un dato da localStorage
const nome = localStorage.getItem('nome');
console.log('Nome salvato:', nome); // Output: Nome salvato: Mario

// Salvataggio di un dato in sessionStorage
sessionStorage.setItem('sessione_id', '12345');

// Recupero di un dato da sessionStorage
const sessioneId = sessionStorage.getItem('sessione_id');
console.log('ID Sessione:', sessioneId); // Output: ID Sessione: 12345
```

## localStorage vs sessionStorage

Web Storage offre due meccanismi di archiviazione che differiscono principalmente per la durata di conservazione dei dati:

### localStorage

- I dati persistono anche dopo la chiusura del browser
- I dati sono condivisi tra tutte le schede e finestre dello stesso dominio
- Non ha una data di scadenza; i dati rimangono fino a quando non vengono esplicitamente rimossi

### sessionStorage

- I dati persistono solo per la durata della sessione della pagina
- I dati sono disponibili solo nella finestra/scheda in cui sono stati creati
- I dati vengono cancellati quando la finestra/scheda viene chiusa

## API Web Storage

Entrambi localStorage e sessionStorage implementano la stessa API:

### Metodi Principali

```javascript
// Salvataggio di un dato
storage.setItem('chiave', 'valore');

// Recupero di un dato
const valore = storage.getItem('chiave');

// Rimozione di un dato
storage.removeItem('chiave');

// Pulizia completa dello storage
storage.clear();

// Numero di elementi nello storage
const numeroElementi = storage.length;

// Accesso a una chiave per indice
const chiave = storage.key(indice);
```

### Accesso come Oggetto

È anche possibile accedere ai dati utilizzando la notazione a punto o a parentesi, come se fosse un oggetto JavaScript:

```javascript
// Salvataggio
localStorage.preferenzaColore = 'blu';
// oppure
localStorage['preferenzaColore'] = 'blu';

// Recupero
const colore = localStorage.preferenzaColore;
// oppure
const colore = localStorage['preferenzaColore'];

// Rimozione
delete localStorage.preferenzaColore;
// oppure (metodo consigliato)
localStorage.removeItem('preferenzaColore');
```

Tuttavia, è generalmente consigliato utilizzare i metodi `setItem()`, `getItem()` e `removeItem()` per maggiore chiarezza e compatibilità.

## Archiviazione di Dati Complessi

Web Storage può memorizzare solo stringhe. Per archiviare oggetti o array, è necessario convertirli in formato JSON:

```javascript
// Salvataggio di un oggetto
const utente = {
  id: 1,
  nome: 'Mario Rossi',
  email: 'mario@example.com',
  preferenze: {
    tema: 'scuro',
    notifiche: true
  }
};

localStorage.setItem('utente', JSON.stringify(utente));

// Recupero e parsing di un oggetto
const utenteRecuperato = JSON.parse(localStorage.getItem('utente'));
console.log('Utente recuperato:', utenteRecuperato);
console.log('Tema preferito:', utenteRecuperato.preferenze.tema);

// Salvataggio di un array
const listaAttività = [
  { id: 1, testo: 'Completare il progetto', completata: false },
  { id: 2, testo: 'Fare la spesa', completata: true },
  { id: 3, testo: 'Chiamare il cliente', completata: false }
];

localStorage.setItem('attività', JSON.stringify(listaAttività));

// Recupero e parsing di un array
const attivitàRecuperate = JSON.parse(localStorage.getItem('attività'));
console.log('Attività recuperate:', attivitàRecuperate);

// Filtraggio delle attività non completate
const attivitàDaCompletare = attivitàRecuperate.filter(attività => !attività.completata);
console.log('Attività da completare:', attivitàDaCompletare);
```

## Gestione degli Errori

È importante gestire i potenziali errori durante l'utilizzo di Web Storage:

```javascript
function salvaInStorage(chiave, valore) {
  try {
    localStorage.setItem(chiave, JSON.stringify(valore));
    return true;
  } catch (errore) {
    console.error('Errore durante il salvataggio in localStorage:', errore);
    
    // Verifica se l'errore è dovuto a storage pieno
    if (isQuotaExceededError(errore)) {
      alert('Spazio di archiviazione esaurito. Impossibile salvare i dati.');
      // Qui potresti implementare una strategia di pulizia
    }
    
    return false;
  }
}

function recuperaDaStorage(chiave, valoreDefault = null) {
  try {
    const valore = localStorage.getItem(chiave);
    return valore ? JSON.parse(valore) : valoreDefault;
  } catch (errore) {
    console.error('Errore durante il recupero da localStorage:', errore);
    return valoreDefault;
  }
}

// Funzione helper per verificare se l'errore è dovuto a quota superata
function isQuotaExceededError(errore) {
  return (
    errore instanceof DOMException &&
    // I codici di errore per quota superata possono variare tra i browser
    (errore.code === 22 || // Chrome
     errore.code === 1014 || // Firefox
     errore.name === 'QuotaExceededError' || // Firefox
     errore.name === 'NS_ERROR_DOM_QUOTA_REACHED') // Firefox
  );
}
```

## Rilevamento del Supporto

Prima di utilizzare Web Storage, è buona pratica verificare se è supportato dal browser:

```javascript
function isWebStorageSupported() {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

if (isWebStorageSupported()) {
  console.log('Web Storage è supportato!');
  // Utilizza Web Storage
} else {
  console.warn('Web Storage non è supportato. Utilizzo di un fallback...');
  // Implementa un meccanismo di fallback (es. cookie o variabili in memoria)
}
```

## Wrapper per Web Storage

Per semplificare l'utilizzo di Web Storage e aggiungere funzionalità come la scadenza dei dati, è comune creare un wrapper:

```javascript
class StorageManager {
  constructor(storage = localStorage) {
    this.storage = storage;
  }
  
  /**
   * Salva un valore nello storage con una scadenza opzionale
   * @param {string} chiave - La chiave per il valore
   * @param {any} valore - Il valore da salvare
   * @param {number} [scadenzaMs] - Tempo di scadenza in millisecondi (opzionale)
   */
  set(chiave, valore, scadenzaMs = null) {
    const item = {
      valore: valore,
      timestamp: Date.now()
    };
    
    if (scadenzaMs) {
      item.scadenza = Date.now() + scadenzaMs;
    }
    
    try {
      this.storage.setItem(chiave, JSON.stringify(item));
      return true;
    } catch (errore) {
      console.error('Errore durante il salvataggio:', errore);
      return false;
    }
  }
  
  /**
   * Recupera un valore dallo storage
   * @param {string} chiave - La chiave del valore da recuperare
   * @param {any} [valoreDefault=null] - Valore di default se la chiave non esiste o è scaduta
   * @returns {any} Il valore recuperato o il valore di default
   */
  get(chiave, valoreDefault = null) {
    try {
      const itemJSON = this.storage.getItem(chiave);
      
      if (!itemJSON) {
        return valoreDefault;
      }
      
      const item = JSON.parse(itemJSON);
      
      // Verifica se il valore è scaduto
      if (item.scadenza && Date.now() > item.scadenza) {
        this.remove(chiave);
        return valoreDefault;
      }
      
      return item.valore;
    } catch (errore) {
      console.error('Errore durante il recupero:', errore);
      return valoreDefault;
    }
  }
  
  /**
   * Rimuove un valore dallo storage
   * @param {string} chiave - La chiave del valore da rimuovere
   */
  remove(chiave) {
    this.storage.removeItem(chiave);
  }
  
  /**
   * Pulisce tutti i valori scaduti nello storage
   * @returns {number} Il numero di elementi rimossi
   */
  pulisciScaduti() {
    let contatore = 0;
    const ora = Date.now();
    
    for (let i = 0; i < this.storage.length; i++) {
      const chiave = this.storage.key(i);
      
      try {
        const itemJSON = this.storage.getItem(chiave);
        if (!itemJSON) continue;
        
        const item = JSON.parse(itemJSON);
        
        if (item.scadenza && ora > item.scadenza) {
          this.storage.removeItem(chiave);
          contatore++;
          i--; // Aggiusta l'indice dopo la rimozione
        }
      } catch (e) {
        // Ignora gli errori di parsing
      }
    }
    
    return contatore;
  }
  
  /**
   * Pulisce tutto lo storage
   */
  clear() {
    this.storage.clear();
  }
  
  /**
   * Ottiene tutte le chiavi nello storage
   * @returns {string[]} Array di chiavi
   */
  keys() {
    const chiavi = [];
    for (let i = 0; i < this.storage.length; i++) {
      chiavi.push(this.storage.key(i));
    }
    return chiavi;
  }
  
  /**
   * Ottiene tutti i valori non scaduti come oggetto
   * @returns {Object} Oggetto con coppie chiave-valore
   */
  getAll() {
    const risultato = {};
    const ora = Date.now();
    
    this.keys().forEach(chiave => {
      try {
        const itemJSON = this.storage.getItem(chiave);
        if (!itemJSON) return;
        
        const item = JSON.parse(itemJSON);
        
        if (!item.scadenza || ora <= item.scadenza) {
          risultato[chiave] = item.valore;
        }
      } catch (e) {
        // Ignora gli errori di parsing
      }
    });
    
    return risultato;
  }
}

// Utilizzo
const storage = new StorageManager(localStorage);

// Salvataggio con scadenza (10 minuti)
storage.set('token', 'abc123xyz', 10 * 60 * 1000);

// Salvataggio senza scadenza
storage.set('preferenze', { tema: 'chiaro', fontSize: 16 });

// Recupero
const token = storage.get('token');
console.log('Token:', token);

const preferenze = storage.get('preferenze');
console.log('Preferenze:', preferenze);

// Pulizia degli elementi scaduti
setInterval(() => {
  const rimossi = storage.pulisciScaduti();
  if (rimossi > 0) {
    console.log(`Rimossi ${rimossi} elementi scaduti`);
  }
}, 60 * 1000); // Controlla ogni minuto
```

## Eventi di Storage

Web Storage emette un evento `storage` quando i dati vengono modificati. Questo evento viene attivato in tutte le altre finestre/schede aperte dello stesso dominio, ma non nella finestra che ha effettuato la modifica:

```javascript
// Ascolto delle modifiche in altre schede/finestre
window.addEventListener('storage', (event) => {
  console.log('Modifiche rilevate in un'altra scheda/finestra:');
  console.log('Chiave modificata:', event.key);
  console.log('Vecchio valore:', event.oldValue);
  console.log('Nuovo valore:', event.newValue);
  console.log('URL della pagina che ha effettuato la modifica:', event.url);
  console.log('Area di storage modificata:', event.storageArea === localStorage ? 'localStorage' : 'sessionStorage');
  
  // Aggiorna l'interfaccia utente in base alle modifiche
  if (event.key === 'tema') {
    applicaTema(JSON.parse(event.newValue));
  }
});

// Funzione di esempio per applicare un tema
function applicaTema(tema) {
  document.body.className = tema;
  console.log('Tema applicato:', tema);
}
```

Questo meccanismo è utile per sincronizzare lo stato dell'applicazione tra diverse schede o finestre.

## Casi d'Uso Comuni

### Persistenza delle Preferenze Utente

```javascript
// Salvataggio delle preferenze
function salvaPrefUtente(preferenze) {
  localStorage.setItem('preferenzeUtente', JSON.stringify(preferenze));
}

// Recupero delle preferenze
function getPrefUtente() {
  const prefDefault = {
    tema: 'chiaro',
    fontSize: 16,
    notifiche: true
  };
  
  try {
    const prefSalvate = localStorage.getItem('preferenzeUtente');
    return prefSalvate ? JSON.parse(prefSalvate) : prefDefault;
  } catch (e) {
    return prefDefault;
  }
}

// Applicazione delle preferenze
function applicaPrefUtente() {
  const pref = getPrefUtente();
  document.body.classList.add(`tema-${pref.tema}`);
  document.body.style.fontSize = `${pref.fontSize}px`;
  // Altre applicazioni...
}

// Utilizzo
applicaPrefUtente();

// Gestione dei cambiamenti nelle preferenze
document.getElementById('temaSelect').addEventListener('change', (e) => {
  const pref = getPrefUtente();
  pref.tema = e.target.value;
  salvaPrefUtente(pref);
  applicaPrefUtente();
});
```

### Salvataggio Automatico di Form

```javascript
// Salvataggio automatico dei dati del form
function setupAutoSave(formId, storageKey) {
  const form = document.getElementById(formId);
  if (!form) return;
  
  // Carica i dati salvati
  const datiSalvati = sessionStorage.getItem(storageKey);
  if (datiSalvati) {
    const dati = JSON.parse(datiSalvati);
    
    // Popola il form con i dati salvati
    Array.from(form.elements).forEach(elemento => {
      if (elemento.name && dati[elemento.name] !== undefined) {
        if (elemento.type === 'checkbox') {
          elemento.checked = dati[elemento.name];
        } else if (elemento.type === 'radio') {
          elemento.checked = (elemento.value === dati[elemento.name]);
        } else {
          elemento.value = dati[elemento.name];
        }
      }
    });
  }
  
  // Configura il salvataggio automatico
  form.addEventListener('input', () => {
    const dati = {};
    
    Array.from(form.elements).forEach(elemento => {
      if (elemento.name) {
        if (elemento.type === 'checkbox') {
          dati[elemento.name] = elemento.checked;
        } else if (elemento.type === 'radio') {
          if (elemento.checked) {
            dati[elemento.name] = elemento.value;
          }
        } else {
          dati[elemento.name] = elemento.value;
        }
      }
    });
    
    sessionStorage.setItem(storageKey, JSON.stringify(dati));
  });
  
  // Pulisci i dati salvati quando il form viene inviato
  form.addEventListener('submit', () => {
    sessionStorage.removeItem(storageKey);
  });
}

// Utilizzo
document.addEventListener('DOMContentLoaded', () => {
  setupAutoSave('registrationForm', 'registrationFormData');
});
```

### Carrello della Spesa

```javascript
class Carrello {
  constructor() {
    this.chiave = 'carrello_spesa';
    this.items = this.carica();
  }
  
  carica() {
    const dati = localStorage.getItem(this.chiave);
    return dati ? JSON.parse(dati) : [];
  }
  
  salva() {
    localStorage.setItem(this.chiave, JSON.stringify(this.items));
  }
  
  aggiungi(prodotto, quantità = 1) {
    const itemEsistente = this.items.find(item => item.id === prodotto.id);
    
    if (itemEsistente) {
      itemEsistente.quantità += quantità;
    } else {
      this.items.push({
        ...prodotto,
        quantità
      });
    }
    
    this.salva();
  }
  
  rimuovi(prodottoId) {
    this.items = this.items.filter(item => item.id !== prodottoId);
    this.salva();
  }
  
  aggiorna(prodottoId, quantità) {
    const item = this.items.find(item => item.id === prodottoId);
    if (item) {
      item.quantità = quantità;
      if (item.quantità <= 0) {
        this.rimuovi(prodottoId);
      } else {
        this.salva();
      }
    }
  }
  
  svuota() {
    this.items = [];
    this.salva();
  }
  
  
  getTotale() {
    return this.items.reduce((totale, item) => {
      return totale + (item.prezzo * item.quantità);
    }, 0);
  }
  
  getNumeroItems() {
    return this.items.reduce((totale, item) => {
      return totale + item.quantità;
    }, 0);
  }
}

// Utilizzo
const carrello = new Carrello();

// Aggiunta di prodotti
carrello.aggiungi({
  id: 'prod123',
  nome: 'Smartphone XYZ',
  prezzo: 499.99
});

// Aggiornamento quantità
carrello.aggiorna('prod123', 2);

// Visualizzazione del carrello
console.log('Numero prodotti:', carrello.getNumeroItems());
console.log('Totale:', carrello.getTotale().toFixed(2), '€');
```

## Limitazioni e Considerazioni

### Limitazioni di Spazio

Lo spazio disponibile per Web Storage varia tra i browser, ma generalmente è limitato a 5-10 MB per dominio. È importante gestire questo limite implementando strategie di pulizia quando necessario.

### Sicurezza

I dati in Web Storage sono accessibili a qualsiasi script eseguito dallo stesso dominio. Non memorizzare mai informazioni sensibili come password o token di autenticazione non crittografati.

```javascript
// Esempio di memorizzazione sicura di un token
function memorizzaToken(token) {
  // In un'applicazione reale, considera di crittografare il token
  const tokenCrittografato = token; // Qui dovresti applicare la crittografia
  
  // Memorizza con una scadenza
  const storage = new StorageManager();
  storage.set('auth_token', tokenCrittografato, 24 * 60 * 60 * 1000); // 24 ore
}
```

### Sincronizzazione

Web Storage è sincrono, il che significa che le operazioni di lettura e scrittura bloccano il thread principale. Per operazioni su grandi quantità di dati, considera l'utilizzo di IndexedDB che è asincrono.

### Modalità Privata/Incognito

In modalità di navigazione privata, alcuni browser potrebbero non supportare la persistenza dei dati o avere limiti più restrittivi.

## Alternative a Web Storage

- **Cookies**: Utili per piccole quantità di dati che devono essere inviati al server
- **IndexedDB**: Per grandi quantità di dati strutturati e query complesse
- **Cache API**: Per memorizzare risposte HTTP e asset per applicazioni offline
- **File System Access API**: Per accedere direttamente al file system (con permessi utente)

## Conclusione

Web Storage offre un modo semplice e potente per memorizzare dati nel browser. È particolarmente utile per migliorare l'esperienza utente memorizzando preferenze, stato dell'applicazione e dati temporanei. Sebbene abbia alcune limitazioni, la sua semplicità d'uso e l'ampio supporto dei browser lo rendono una scelta eccellente per molti casi d'uso comuni.

[Torna all'indice](../README.md) | [Prossimo modulo: ES Modules](../../15_ES_Modules/README.md)