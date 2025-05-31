# Esercitazione 4: Gestione degli Errori

**Obiettivo:** Implementare una gestione robusta degli errori per le richieste Fetch, distinguendo tra errori di rete ed errori HTTP, e fornendo feedback appropriato all'utente.

**Teoria Correlata:**
*   [Fetch API](../../teoria/03_Fetch_API.md)
*   [Gestione Risposte](../../teoria/04_Gestione_Risposte.md)
*   [Gestione degli Errori con Fetch](../../teoria/05_Gestione_Errori_Fetch.md)

## Requisiti

1.  **File HTML (`index.html`):**
    *   Crea un file HTML di base.
    *   Includi un titolo (es. `<h1>Test Gestione Errori Fetch</h1>`).
    *   Aggiungi due pulsanti:
        *   Uno per simulare una richiesta a un URL valido che però restituisce un errore HTTP 404 (`<button id="fetch-404">Carica Risorsa Inesistente (404)</button>`).
        *   Uno per simulare una richiesta a un URL non valido/irraggiungibile per causare un errore di rete (`<button id="fetch-network-error">Simula Errore di Rete</button>`).
    *   Aggiungi un elemento contenitore (es. `<div id="message-area"></div>`) dove visualizzare i messaggi di errore o successo.
    *   Collega un file JavaScript (`script.js`).

2.  **File JavaScript (`script.js`):**
    *   Seleziona i pulsanti e il contenitore dei messaggi dal DOM.
    *   Crea una funzione generica `makeFetchRequest(url)` che:
        *   Prenda un URL come argomento.
        *   Pulisca il `message-area` e mostri un messaggio "Richiesta in corso...".
        *   Esegua `fetch(url)`.
        *   Nel primo `.then()`:
            *   Controlli `response.ok`. Se `false`, lanci un `Error` con un messaggio che includa `response.status` e `response.statusText` (es. `throw new Error(`Errore HTTP: ${response.status} ${response.statusText}`);`).
            *   Se `true`, provi a leggere la risposta come testo (`response.text()`) - anche se ci aspettiamo errori, questo simula un tentativo di elaborazione.
        *   Nel secondo `.then()` (che si attiverebbe solo per risposte OK):
            *   Mostri un messaggio di successo (improbabile in questo esercizio, ma per completezza).
        *   Nel blocco `.catch()`:
            *   Logghi l'errore completo in console (`console.error`).
            *   Mostri un messaggio di errore chiaro all'utente nel `message-area`, distinguendo possibilmente tra errori HTTP (se `error.message` inizia con "Errore HTTP:") e altri errori (probabilmente di rete).
        *   Utilizzi `.finally()` per rimuovere il messaggio "Richiesta in corso..." se ancora presente.
    *   Aggiungi event listener ai due pulsanti:
        *   Il listener per `fetch-404` chiama `makeFetchRequest('https://jsonplaceholder.typicode.com/posts/9999')` (un ID che probabilmente non esiste).
        *   Il listener per `fetch-network-error` chiama `makeFetchRequest('https://indirizzo-inesistente-per-test.xyz')` (un dominio chiaramente non valido).

## Passaggi Suggeriti

1.  Crea la struttura HTML con i pulsanti e il contenitore.
2.  Scrivi il codice JS per selezionare gli elementi.
3.  Implementa la funzione `makeFetchRequest` con la logica `fetch`, il controllo `response.ok`, il lancio dell'errore HTTP e il blocco `catch` per gestire tutti i tipi di errore.
4.  Aggiungi la logica nel `catch` per differenziare (se possibile) il messaggio all'utente.
5.  Aggiungi gli event listener ai pulsanti che chiamano `makeFetchRequest` con gli URL appropriati.
6.  Testa entrambi i pulsanti:
    *   Cliccando "Carica Risorsa Inesistente (404)", dovresti vedere un messaggio di errore HTTP 404.
    *   Cliccando "Simula Errore di Rete", dovresti vedere un messaggio relativo a un errore di rete (es. fallimento nel risolvere il DNS o connessione rifiutata).
    *   Controlla la console per vedere gli errori dettagliati.

## Bonus

*   Modifica la gestione nel `.catch()` per tentare di leggere il corpo della risposta *anche* in caso di errore HTTP (usando `response.json().catch(...)` o `response.text().catch(...)` prima di lanciare l'errore principale), nel caso l'API fornisca dettagli sull'errore nel corpo.

---

[Torna all'indice delle esercitazioni](../README.md)