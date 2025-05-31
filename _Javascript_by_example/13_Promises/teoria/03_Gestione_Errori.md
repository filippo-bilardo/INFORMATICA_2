# Gestione degli Errori con le Promesse in JavaScript

La gestione efficace degli errori è un aspetto fondamentale della programmazione asincrona. Questo capitolo esplora le tecniche e i pattern per gestire gli errori quando si lavora con le Promesse in JavaScript.

## Importanza della Gestione degli Errori

Una corretta gestione degli errori è essenziale per:

1. **Robustezza dell'applicazione**: Prevenire crash e comportamenti imprevisti
2. **Esperienza utente**: Fornire feedback appropriati quando qualcosa va storto
3. **Debugging**: Facilitare l'identificazione e la risoluzione dei problemi
4. **Manutenibilità**: Rendere il codice più comprensibile e gestibile

## Meccanismi di Base per la Gestione degli Errori

### Il Metodo `.catch()`

Il metodo `.catch()` è il principale strumento per gestire gli errori nelle Promesse:

```javascript
fetch('https://api.example.com/dati')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(dati => {
    console.log('Dati ricevuti:', dati);
  })
  .catch(errore => {
    console.error('Si è verificato un errore:', errore.message);
    // Gestione dell'errore (mostrare un messaggio, tentare un'alternativa, ecc.)
  });
```

### Propagazione degli Errori

Gli errori si propagano automaticamente lungo la catena di promesse fino al primo `.catch()` disponibile:

```javascript
fetch('https://api.example.com/utente')
  .then(response => response.json())
  .then(utente => {
    // Se questa riga genera un errore (es. utente è null)
    return fetch(`https://api.example.com/utenti/${utente.id}/ordini`);
  })
  .then(response => response.json())
  .then(ordini => {
    console.log('Ordini:', ordini);
  })
  .catch(errore => {
    // Questo catch gestisce errori da qualsiasi punto precedente della catena
    console.error('Errore durante il recupero dei dati:', errore);
  });
```

## Pattern Avanzati di Gestione degli Errori

### Gestione Differenziata degli Errori

È possibile gestire diversi tipi di errori in modi diversi:

```javascript
fetch('https://api.example.com/dati')
  .then(response => response.json())
  .then(dati => {
    console.log('Dati:', dati);
  })
  .catch(errore => {
    if (errore instanceof TypeError) {
      // Errore di rete o CORS
      console.error('Problema di connessione:', errore.message);
      mostraMessaggioOffline();
    } else if (errore.name === 'AbortError') {
      // La richiesta è stata annullata (timeout)
      console.error('La richiesta è scaduta');
      mostraMessaggioTimeout();
    } else if (errore.message.includes('HTTP')) {
      // Errore HTTP
      console.error('Errore del server:', errore.message);
      mostraMessaggioErroreServer();
    } else {
      // Altri errori
      console.error('Errore imprevisto:', errore);
      mostraMessaggioErroreGenerico();
    }
  });
```

### Errori Personalizzati

Creare classi di errori personalizzate può migliorare la gestione degli errori specifici dell'applicazione:

```javascript
// Definizione di errori personalizzati
class APIError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

class ValidationError extends Error {
  constructor(message, campi = []) {
    super(message);
    this.name = 'ValidationError';
    this.campi = campi;
  }
}

// Utilizzo
async function recuperaDati(endpoint) {
  const response = await fetch(`https://api.example.com/${endpoint}`);
  
  if (!response.ok) {
    const datiErrore = await response.json().catch(() => ({}));
    throw new APIError(
      `Errore API: ${response.statusText}`,
      response.status,
      datiErrore
    );
  }
  
  return response.json();
}

// Gestione
recuperaDati('utenti')
  .then(dati => {
    console.log('Dati utenti:', dati);
  })
  .catch(errore => {
    if (errore instanceof APIError) {
      console.error(`Errore API (${errore.status}):`, errore.message);
      if (errore.status === 401) {
        reindirizzaAlLogin();
      } else if (errore.status === 403) {
        mostraMessaggioAccessoNegato();
      }
    } else if (errore instanceof ValidationError) {
      console.error('Errore di validazione:', errore.message);
      evidenziaCampiConErrori(errore.campi);
    } else {
      console.error('Errore imprevisto:', errore);
    }
  });
```

### Catene di Recupero

Un pattern utile è fornire valori di fallback quando si verifica un errore:

```javascript
fetch('https://api-primaria.example.com/dati')
  .then(response => {
    if (!response.ok) {
      // Se la prima API fallisce, prova con un'API di backup
      console.warn('API primaria non disponibile, utilizzo backup');
      return fetch('https://api-backup.example.com/dati');
    }
    return response;
  })
  .then(response => {
    if (!response.ok) {
      // Se anche l'API di backup fallisce, usa dati in cache
      console.warn('Anche API backup non disponibile, utilizzo cache');
      return recuperaDatiDaCache();
    }
    return response.json();
  })
  .then(dati => {
    if (!dati) {
      // Se non ci sono dati dalla cache, usa dati predefiniti
      console.warn('Nessun dato in cache, utilizzo predefiniti');
      return datiPredefiniti();
    }
    return dati;
  })
  .then(datiFinali => {
    console.log('Dati finali:', datiFinali);
    visualizzaDati(datiFinali);
  })
  .catch(errore => {
    // Questo catch gestisce solo errori non gestiti nei .then() precedenti
    console.error('Errore catastrofico:', errore);
    mostraMessaggioErroreCritico();
  });
```

## Gestione degli Errori con Promise.all

Quando si utilizzano più promesse in parallelo con `Promise.all()`, è importante considerare come gestire gli errori:

```javascript
// Se una qualsiasi promessa viene rifiutata, Promise.all si rifiuta immediatamente
Promise.all([
  fetch('https://api.example.com/utenti').then(r => r.json()),
  fetch('https://api.example.com/prodotti').then(r => r.json()),
  fetch('https://api.example.com/ordini').then(r => r.json())
])
  .then(([utenti, prodotti, ordini]) => {
    console.log('Tutti i dati recuperati con successo');
  })
  .catch(errore => {
    console.error('Almeno una richiesta è fallita:', errore);
  });
```

Un approccio alternativo è utilizzare `Promise.allSettled()` che attende il completamento di tutte le promesse, indipendentemente dal loro esito:

```javascript
Promise.allSettled([
  fetch('https://api.example.com/utenti').then(r => r.json()),
  fetch('https://api.example.com/prodotti').then(r => r.json()),
  fetch('https://api.example.com/ordini').then(r => r.json())
])
  .then(risultati => {
    // Elabora i risultati, che possono essere sia successi che fallimenti
    const successi = risultati.filter(r => r.status === 'fulfilled');
    const fallimenti = risultati.filter(r => r.status === 'rejected');
    
    console.log(`${successi.length} richieste completate, ${fallimenti.length} fallite`);
    
    if (fallimenti.length > 0) {
      console.warn('Alcune richieste sono fallite:', fallimenti.map(f => f.reason));
    }
    
    // Utilizza i dati disponibili
    const datiDisponibili = successi.map(s => s.value);
    elaboraDatiParziali(datiDisponibili);
  });
```

## Gestione Timeout nelle Promesse

Le promesse in JavaScript non hanno un meccanismo di timeout integrato. È possibile implementarlo manualmente:

```javascript
function promiseWithTimeout(promessa, tempoMs) {
  // Crea una promessa che si rifiuta dopo il timeout
  const timeoutPromise = new Promise((_, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject(new Error(`Timeout dopo ${tempoMs}ms`));
    }, tempoMs);
  });

  // Restituisce la prima promessa che si risolve/rifiuta tra le due
  return Promise.race([promessa, timeoutPromise]);
}

// Utilizzo
promiseWithTimeout(fetch('https://api.example.com/dati-lenti'), 5000)
  .then(response => response.json())
  .then(dati => {
    console.log('Dati ricevuti:', dati);
  })
  .catch(errore => {
    if (errore.message.includes('Timeout')) {
      console.error('La richiesta ha impiegato troppo tempo');
      mostraMessaggioTimeout();
    } else {
      console.error('Errore durante la richiesta:', errore);
    }
  });
```

Con l'API Fetch moderna, è possibile utilizzare l'oggetto `AbortController`:

```javascript
async function fetchConTimeout(url, opzioni = {}, tempoMs = 5000) {
  const controller = new AbortController();
  const { signal } = controller;
  
  // Imposta il timeout
  const timeoutId = setTimeout(() => controller.abort(), tempoMs);
  
  try {
    // Aggiungi il signal alle opzioni
    const response = await fetch(url, { ...opzioni, signal });
    clearTimeout(timeoutId); // Cancella il timeout se la richiesta ha successo
    return response;
  } catch (errore) {
    clearTimeout(timeoutId); // Assicurati di cancellare il timeout
    
    if (errore.name === 'AbortError') {
      throw new Error(`La richiesta a ${url} è scaduta dopo ${tempoMs}ms`);
    }
    
    throw errore; // Rilancia altri errori
  }
}
```

## Gestione Centralizzata degli Errori

Per applicazioni di grandi dimensioni, è utile implementare un sistema centralizzato di gestione degli errori:

```javascript
class ErrorHandler {
  constructor() {
    this.errorListeners = [];
  }
  
  // Registra un listener per gli errori
  addListener(listener) {
    this.errorListeners.push(listener);
    return this; // Per concatenamento
  }
  
  // Gestisci un errore
  handleError(errore, contesto = {}) {
    console.error('Errore applicazione:', errore, contesto);
    
    // Notifica tutti i listener
    this.errorListeners.forEach(listener => {
      try {
        listener(errore, contesto);
      } catch (e) {
        console.error('Errore nel listener:', e);
      }
    });
    
    // Gestione specifica in base al tipo di errore
    if (errore instanceof APIError) {
      this.handleAPIError(errore);
    } else if (errore instanceof ValidationError) {
      this.handleValidationError(errore);
    } else if (errore.name === 'NetworkError' || errore.message.includes('network')) {
      this.handleNetworkError(errore);
    }
    
    return errore; // Per concatenamento
  }
  
  handleAPIError(errore) {
    // Logica specifica per errori API
    if (errore.status === 401 || errore.status === 403) {
      // Problemi di autenticazione/autorizzazione
      mostraMessaggioAutenticazione();
    } else if (errore.status >= 500) {
      // Errori server
      mostraMessaggioErroreServer();
    }
  }
  
  handleValidationError(errore) {
    // Logica per errori di validazione
    mostraErroriValidazione(errore.campi);
  }
  
  handleNetworkError(errore) {
    // Logica per errori di rete
    mostraMessaggioOffline();
  }
}

// Utilizzo
const errorHandler = new ErrorHandler();

// Aggiungi listener per analytics
errorHandler.addListener((errore, contesto) => {
  inviaErroreAnalytics(errore, contesto);
});

// Aggiungi listener per logging
errorHandler.addListener((errore, contesto) => {
  logErroreSuServer(errore, contesto);
});

// Wrapper per le chiamate API
async function chiamaAPI(url, opzioni) {
  try {
    const response = await fetch(url, opzioni);
    
    if (!response.ok) {
      const datiErrore = await response.json().catch(() => ({}));
      throw new APIError(
        `Errore HTTP: ${response.status} ${response.statusText}`,
        response.status,
        datiErrore
      );
    }
    
    return await response.json();
  } catch (errore) {
    // Passa l'errore al gestore centralizzato
    errorHandler.handleError(errore, { url, opzioni });
    throw errore; // Rilancia per gestione locale se necessario
  }
}
```

## Best Practices per la Gestione degli Errori

1. **Non ignorare mai gli errori**: Ogni promessa dovrebbe avere almeno un gestore `.catch()`.

2. **Sii specifico**: Gestisci diversi tipi di errori in modo appropriato.

3. **Fornisci contesto**: Includi informazioni utili nei messaggi di errore.

4. **Crea errori personalizzati**: Definisci classi di errori specifiche per la tua applicazione.

5. **Centralizza la gestione**: Implementa un sistema centralizzato per la gestione degli errori.

6. **Registra gli errori**: Mantieni log degli errori per il debugging.

7. **Fornisci feedback all'utente**: Mostra messaggi di errore comprensibili.

8. **Implementa strategie di recupero**: Prevedi alternative quando un'operazione fallisce.

9. **Testa gli scenari di errore**: Verifica che la tua applicazione gestisca correttamente gli errori.

10. **Non esporre dettagli sensibili**: Evita di mostrare stack trace o dettagli tecnici agli utenti finali.

## Conclusione

Una gestione efficace degli errori è fondamentale per creare applicazioni JavaScript robuste e user-friendly. Le Promesse offrono meccanismi potenti per gestire gli errori in modo elegante e flessibile, consentendo di implementare strategie sofisticate per diversi scenari di errore.

Nel prossimo capitolo, esploreremo la sintassi `async/await`, che semplifica ulteriormente la scrittura e la gestione del codice asincrono.

[Torna all'indice](../README.md) | [Argomento precedente: Catene di Promesse](./02_Catene_Promesse.md) | [Prossimo argomento: Async/Await](./04_Async_Await.md)