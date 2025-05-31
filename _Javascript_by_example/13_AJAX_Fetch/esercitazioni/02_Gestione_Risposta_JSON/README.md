# Esercitazione 2: Gestione Risposta JSON

**Obiettivo:** Effettuare una richiesta GET a un'API pubblica (JSONPlaceholder), estrarre dati specifici dalla risposta JSON e visualizzarli in modo strutturato sulla pagina.

**Teoria Correlata:**
*   [Fetch API](../../teoria/03_Fetch_API.md)
*   [Gestione Risposte (JSON)](../../teoria/04_Gestione_Risposte.md)

## Requisiti

1.  **File HTML (`index.html`):**
    *   Crea un file HTML di base.
    *   Includi un titolo (es. `<h1>Dettagli Post</h1>`).
    *   Aggiungi un elemento contenitore (es. `<div id="post-details"></div>`) dove verranno visualizzati i dettagli del post.
    *   Includi un pulsante (es. `<button id="load-post">Carica Post Casuale</button>`).
    *   Collega un file JavaScript (`script.js`).

2.  **File JavaScript (`script.js`):**
    *   Seleziona il pulsante e il contenitore dal DOM.
    *   Aggiungi un event listener al pulsante per l'evento `click`.
    *   All'interno della funzione dell'event listener:
        *   Genera un ID di post casuale tra 1 e 100 (JSONPlaceholder ha 100 post).
        *   Utilizza `fetch()` per effettuare una richiesta GET all'endpoint `https://jsonplaceholder.typicode.com/posts/{ID_POST_CASUALE}` (sostituisci `{ID_POST_CASUALE}` con l'ID generato).
        *   Gestisci la risposta:
            *   Controlla `response.ok`. Se non è `ok`, mostra un messaggio di errore nel contenitore.
            *   Se `ok`, usa `response.json()` per estrarre l'oggetto JSON del post.
        *   Gestisci i dati ricevuti (l'oggetto post):
            *   Pulisci il contenuto precedente del contenitore (`post-details`).
            *   Crea elementi HTML per visualizzare le seguenti proprietà del post:
                *   Titolo (`post.title`) in un `<h2>`.
                *   Corpo (`post.body`) in un `<p>`.
                *   ID Utente (`post.userId`) in un altro `<p>` (es. "Scritto da Utente ID: X").
                *   ID Post (`post.id`) in un altro `<p>` (es. "Post ID: Y").
            *   Aggiungi questi elementi al contenitore (`post-details`).
        *   Gestisci eventuali errori (di rete, HTTP, parsing JSON) usando `.catch()` e mostra un messaggio di errore appropriato nel contenitore.

## Passaggi Suggeriti

1.  Crea la struttura HTML.
2.  Scrivi il codice JS per selezionare gli elementi e aggiungere l'event listener.
3.  Implementa la generazione dell'ID casuale.
4.  Costruisci l'URL dinamico per `fetch()`.
5.  Implementa la chiamata `fetch()` con la gestione di `response.ok` e `response.json()`.
6.  Implementa la logica per estrarre i dati dall'oggetto post e creare gli elementi HTML corrispondenti.
7.  Aggiungi la gestione degli errori con `.catch()`.
8.  Testa il funzionamento cliccando ripetutamente il pulsante per caricare post diversi. Verifica la corretta visualizzazione dei dettagli e la gestione degli errori.

## Bonus

*   Dopo aver caricato i dettagli del post, effettua una seconda richiesta `fetch` a `https://jsonplaceholder.typicode.com/users/{ID_UTENTE}` (usando `post.userId`) per ottenere il nome dell'autore del post. Visualizza il nome dell'autore invece dell'ID utente (es. "Scritto da: Nome Autore"). Assicurati di gestire correttamente la catena di Promise o usa `async/await`.

---

[Torna all'indice delle esercitazioni](../README.md)