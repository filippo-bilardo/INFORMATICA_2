# Gestione degli Errori con Fetch

Una corretta gestione degli errori è fondamentale quando si lavora con richieste di rete asincrone come quelle effettuate tramite la Fetch API. Gli errori possono verificarsi a diversi livelli: problemi di rete che impediscono la connessione, errori HTTP restituiti dal server (come 404 Not Found o 500 Internal Server Error), o problemi durante l'elaborazione della risposta (come JSON malformato).

## Distinzione Chiave: Errori di Rete vs. Errori HTTP

La Fetch API gestisce questi tipi di errori in modo diverso, ed è cruciale comprenderne la differenza:

1.  **Errori di Rete:** Si verificano quando la richiesta non può essere completata a causa di problemi di connettività (es. DNS non risolto, server irraggiungibile, nessuna connessione internet, problemi CORS). In questi casi, la `Promise` restituita da `fetch()` viene **rifiutata**, e l'errore può essere catturato nel blocco `.catch()`.

2.  **Errori HTTP:** Si verificano quando il server risponde, ma con un codice di stato che indica un errore (es. `404 Not Found`, `500 Internal Server Error`, `401 Unauthorized`, `403 Forbidden`). In questi casi, la `Promise` restituita da `fetch()` viene **risolta** con successo, perché tecnicamente la comunicazione HTTP è avvenuta. La `Promise` *non* viene rifiutata automaticamente per questi errori.

## Catturare Errori di Rete

Gli errori di rete vengono gestiti direttamente dal blocco `.catch()` concatenato alla chiamata `fetch()`.

```javascript
fetch('https://indirizzo-inesistente.esempio')
  .then(response => {
    // Questo blocco non verrà eseguito se c'è un errore di rete
    console.log('Risposta ricevuta:', response);
    return response.json();
  })
  .then(data => {
    // Anche questo blocco non verrà eseguito
    console.log('Dati:', data);
  })
  .catch(error => {
    // Qui viene catturato l'errore di rete
    console.error('Errore di rete durante la richiesta fetch:', error);
    // Esempio di errore: TypeError: Failed to fetch
    // Puoi mostrare un messaggio all'utente qui
    displayErrorMessage('Impossibile connettersi al server. Controlla la tua connessione.');
  });

function displayErrorMessage(message) {
  // Logica per mostrare il messaggio di errore all'utente
  console.log(`UI Error: ${message}`);
}
```

## Gestire Errori HTTP

Poiché `fetch()` non rifiuta la Promise per errori HTTP, dobbiamo controllarli manualmente nel primo blocco `.then()` esaminando l'oggetto `Response`.

La proprietà `response.ok` è un modo comodo per verificare se lo stato HTTP rientra nell'intervallo di successo (200-299). Se `response.ok` è `false`, significa che c'è stato un errore HTTP.

```javascript
fetch('https://api.example.com/risorsa-non-trovata') // Supponiamo restituisca 404
  .then(response => {
    console.log('Stato:', response.status); // Es. 404
    console.log('OK?', response.ok);     // false

    // Controlla se la risposta HTTP è andata a buon fine
    if (!response.ok) {
      // Se non è OK, lancia un errore per farlo catturare dal .catch()
      // È utile includere lo status nel messaggio di errore
      throw new Error(`Errore HTTP! Stato: ${response.status} ${response.statusText}`);
    }

    // Se è OK, procedi a leggere il corpo
    return response.json(); // O .text(), .blob(), etc.
  })
  .then(data => {
    // Questo blocco viene eseguito solo se response.ok era true
    console.log('Dati ricevuti con successo:', data);
  })
  .catch(error => {
    // Cattura sia gli errori di rete sia gli errori lanciati manualmente (Errori HTTP)
    console.error('Errore durante il recupero dei dati:', error);

    // Puoi differenziare il messaggio all'utente in base al tipo di errore se necessario
    if (error.message.startsWith('Errore HTTP!')) {
      displayErrorMessage(`Errore dal server: ${error.message}`);
    } else {
      displayErrorMessage('Errore di connessione o elaborazione.');
    }
  });

function displayErrorMessage(message) {
  console.log(`UI Error: ${message}`);
}
```

### Leggere il Corpo della Risposta in Caso di Errore HTTP

Talvolta, anche le risposte di errore (es. 4xx, 5xx) possono contenere un corpo con informazioni utili (es. un messaggio di errore specifico in formato JSON). Potresti voler leggere questo corpo prima di lanciare l'errore.

```javascript
fetch('https://api.example.com/errore-con-dettagli') // Supponiamo restituisca 400 con JSON nel corpo
  .then(response => {
    if (!response.ok) {
      // Prova a leggere il corpo come JSON per ottenere dettagli sull'errore
      return response.json().then(errorData => {
        // Lancia un errore personalizzato includendo i dettagli dal server
        throw new Error(`Errore HTTP ${response.status}: ${errorData.message || response.statusText}`);
      }).catch(parsingError => {
        // Se il corpo non è JSON o c'è un altro errore nel leggerlo,
        // lancia un errore generico con lo status
        throw new Error(`Errore HTTP! Stato: ${response.status} ${response.statusText}`);
      });
    }
    return response.json();
  })
  .then(data => {
    console.log('Dati ricevuti:', data);
  })
  .catch(error => {
    console.error('Errore:', error);
    displayErrorMessage(error.message);
  });
```

## Gestire Errori nel Parsing della Risposta

Se chiami `response.json()` ma il corpo della risposta non è JSON valido, la `Promise` restituita da `response.json()` verrà rifiutata. Questo errore verrà catturato dal blocco `.catch()`.

```javascript
fetch('https://api.example.com/testo-invece-di-json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Errore HTTP! Stato: ${response.status}`);
    }
    return response.json(); // Questo fallirà se la risposta non è JSON valido
  })
  .then(data => {
    console.log('Dati:', data);
  })
  .catch(error => {
    console.error('Errore nel fetch o nel parsing:', error);
    // L'errore potrebbe essere SyntaxError se il JSON non è valido
    if (error instanceof SyntaxError) {
      displayErrorMessage('Formato della risposta non valido.');
    } else {
      displayErrorMessage(error.message);
    }
  });
```

## Utilizzo di `async/await` per la Gestione degli Errori

La sintassi `async/await` può rendere la gestione degli errori più simile al codice sincrono, utilizzando i blocchi `try...catch`.

```javascript
async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Gestione errore HTTP
      let errorMessage = `Errore HTTP! Stato: ${response.status} ${response.statusText}`;
      try {
        // Prova a leggere dettagli dell'errore dal corpo
        const errorData = await response.json();
        errorMessage = `Errore HTTP ${response.status}: ${errorData.message || response.statusText}`;
      } catch (e) {
        // Ignora errori nel parsing del corpo dell'errore, usa il messaggio generico
      }
      throw new Error(errorMessage);
    }

    // Gestione parsing della risposta (es. JSON)
    const data = await response.json(); // Può lanciare SyntaxError
    console.log('Dati ricevuti:', data);
    return data;

  } catch (error) {
    // Cattura errori di rete, errori HTTP lanciati, e errori di parsing
    console.error('Errore durante il fetch:', error);
    displayErrorMessage(error.message);
    // Puoi rilanciare l'errore o restituire un valore di default
    throw error; // O return null;
  }
}

// Esempio di utilizzo
fetchData('https://api.example.com/users')
  .then(users => {
    if (users) {
      console.log('Utenti caricati:', users);
    }
  })
  .catch(e => {
    console.log('Fetch fallito (gestito esternamente se necessario)');
  });

fetchData('https://indirizzo-inesistente.esempio'); // Gestirà l'errore di rete
fetchData('https://api.example.com/risorsa-non-trovata'); // Gestirà l'errore 404
```

## Conclusione

Una gestione robusta degli errori con Fetch richiede di:

1.  Usare `.catch()` (o `try...catch` con `async/await`) per catturare errori di rete e altri errori imprevisti.
2.  Controllare esplicitamente `response.ok` o `response.status` per identificare e gestire gli errori HTTP.
3.  Lanciare errori manualmente per gli stati HTTP non OK, in modo che vengano gestiti dalla logica di cattura degli errori.
4.  Gestire potenziali errori durante la lettura e il parsing del corpo della risposta (es. `SyntaxError` per `response.json()`).

Implementando queste pratiche, puoi creare applicazioni più resilienti e fornire feedback migliori agli utenti quando qualcosa va storto.

[Torna all'indice](../README.md) | [Argomento precedente: Gestione delle Risposte](./04_Gestione_Risposte.md) | [Prossimo argomento: Esercitazioni Pratiche](../esercitazioni/README.md)