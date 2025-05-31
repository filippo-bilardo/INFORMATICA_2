# Esercitazione 1: Richiesta GET Semplice

**Obiettivo:** Effettuare una richiesta GET a un'API pubblica (JSONPlaceholder) utilizzando la Fetch API e visualizzare i dati ricevuti sulla pagina HTML.

**Teoria Correlata:**
*   [Fetch API](../../teoria/03_Fetch_API.md)
*   [Gestione Risposte (JSON)](../../teoria/04_Gestione_Risposte.md)

## Requisiti

1.  **File HTML (`index.html`):**
    *   Crea un file HTML di base.
    *   Includi un titolo (es. `<h1>Dati Utenti</h1>`).
    *   Aggiungi un elemento contenitore (es. `<div id="user-list"></div>`) dove verranno visualizzati i dati.
    *   Includi un pulsante (es. `<button id="load-users">Carica Utenti</button>`).
    *   Collega un file JavaScript (`script.js`).

2.  **File JavaScript (`script.js`):**
    *   Seleziona il pulsante e il contenitore dal DOM.
    *   Aggiungi un event listener al pulsante per l'evento `click`.
    *   All'interno della funzione dell'event listener:
        *   Utilizza `fetch()` per effettuare una richiesta GET all'endpoint `https://jsonplaceholder.typicode.com/users`.
        *   Gestisci la risposta:
            *   Controlla se la risposta è `ok` (`response.ok`). Se non lo è, logga un errore in console e mostra un messaggio all'utente nel contenitore.
            *   Se la risposta è `ok`, usa `response.json()` per estrarre i dati JSON.
        *   Gestisci i dati ricevuti:
            *   Pulisci il contenuto precedente del contenitore (`user-list`).
            *   Itera sull'array di utenti ricevuto.
            *   Per ogni utente, crea un nuovo elemento HTML (es. un `<div>` o un `<li>`) che mostri almeno il nome (`user.name`) e l'email (`user.email`) dell'utente.
            *   Aggiungi l'elemento creato al contenitore (`user-list`).
        *   Gestisci eventuali errori (di rete o di parsing) utilizzando `.catch()` e logga l'errore in console, mostrando un messaggio appropriato all'utente nel contenitore.

## Passaggi Suggeriti

1.  Crea la struttura HTML base.
2.  Scrivi il codice JavaScript per selezionare gli elementi e aggiungere l'event listener al pulsante.
3.  Implementa la chiamata `fetch()` all'interno dell'event listener.
4.  Aggiungi la logica per controllare `response.ok`.
5.  Aggiungi la logica per parsare il JSON con `response.json()`.
6.  Implementa il ciclo per visualizzare i dati nel contenitore.
7.  Aggiungi il blocco `.catch()` per la gestione degli errori.
8.  Testa il funzionamento cliccando il pulsante e verificando che i dati vengano caricati e visualizzati correttamente. Testa anche scenari di errore (es. simulando offline nel browser).

## Bonus

*   Aggiungi un indicatore di caricamento (es. un messaggio "Caricamento..." o uno spinner) che viene mostrato mentre la richiesta è in corso e nascosto al termine (sia in caso di successo che di errore).
*   Migliora la visualizzazione dei dati utente (es. usando una lista `<ul>` o una tabella `<table>`).

---

[Torna all'indice delle esercitazioni](../README.md)