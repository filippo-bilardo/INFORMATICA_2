# Esercitazione 3: Invio Dati con POST

**Obiettivo:** Creare un semplice form HTML e utilizzare la Fetch API per inviare i dati inseriti dall'utente a un endpoint pubblico (JSONPlaceholder) tramite una richiesta POST.

**Teoria Correlata:**
*   [Fetch API (Opzioni di Richiesta)](../../teoria/03_Fetch_API.md)
*   [Gestione Risposte](../../teoria/04_Gestione_Risposte.md)
*   [Gestione Errori](../../teoria/05_Gestione_Errori_Fetch.md)

## Requisiti

1.  **File HTML (`index.html`):**
    *   Crea un file HTML di base.
    *   Includi un titolo (es. `<h1>Crea Nuovo Post</h1>`).
    *   Crea un form (`<form id="new-post-form">`) con i seguenti campi:
        *   Un input di testo per il titolo (`<input type="text" id="post-title" name="title" required>`) con una label associata.
        *   Una textarea per il corpo del post (`<textarea id="post-body" name="body" required></textarea>`) con una label associata.
        *   Un input (opzionale, puoi preimpostarlo nel JS) per l'ID utente (`<input type="number" id="user-id" name="userId" value="1" required>`) con una label associata.
        *   Un pulsante di submit (`<button type="submit">Invia Post</button>`).
    *   Aggiungi un elemento contenitore (es. `<div id="response-message"></div>`) dove visualizzare i messaggi di successo o errore.
    *   Collega un file JavaScript (`script.js`).

2.  **File JavaScript (`script.js`):**
    *   Seleziona il form e il contenitore dei messaggi dal DOM.
    *   Aggiungi un event listener al form per l'evento `submit`.
    *   All'interno della funzione dell'event listener:
        *   **Previeni il comportamento predefinito del form** (ricaricamento della pagina) usando `event.preventDefault()`.
        *   Recupera i valori inseriti dall'utente nei campi del form (titolo, corpo, userId).
        *   Crea un oggetto JavaScript con questi dati.
        *   Utilizza `fetch()` per effettuare una richiesta POST all'endpoint `https://jsonplaceholder.typicode.com/posts`.
        *   Configura l'oggetto delle opzioni di `fetch`:
            *   `method: 'POST'`
            *   `headers: { 'Content-Type': 'application/json; charset=UTF-8' }`
            *   `body: JSON.stringify(datiOggetto)` (converte l'oggetto JS in una stringa JSON).
        *   Gestisci la risposta:
            *   Controlla `response.ok` o `response.status`. JSONPlaceholder di solito risponde con `201 Created` per un POST riuscito. Se non è OK, lancia un errore.
            *   Se la risposta è OK, usa `response.json()` per leggere la risposta del server (che di solito contiene il post creato con un nuovo ID).
        *   Gestisci i dati ricevuti (il post creato):
            *   Mostra un messaggio di successo nel contenitore (`response-message`), includendo magari l'ID del nuovo post creato (es. `Post creato con successo! ID: ${createdPost.id}`).
            *   Pulisci i campi del form (opzionale).
        *   Gestisci eventuali errori (di rete, HTTP, parsing) usando `.catch()` e mostra un messaggio di errore appropriato nel contenitore (`response-message`).

## Passaggi Suggeriti

1.  Crea la struttura HTML con il form.
2.  Scrivi il codice JS per selezionare gli elementi e aggiungere l'event listener al `submit` del form.
3.  Implementa `event.preventDefault()`.
4.  Recupera i valori dal form.
5.  Crea l'oggetto dati.
6.  Implementa la chiamata `fetch()` con le opzioni corrette per il metodo POST, gli header e il body.
7.  Aggiungi la gestione della risposta (`response.ok`, `response.json()`).
8.  Implementa la logica per visualizzare il messaggio di successo.
9.  Aggiungi il blocco `.catch()` per la gestione degli errori e la visualizzazione dei messaggi di errore.
10. Testa il funzionamento compilando il form e inviando i dati. Controlla la console del browser e il messaggio visualizzato sulla pagina.

## Bonus

*   Aggiungi una validazione di base lato client (es. assicurati che i campi non siano vuoti prima di inviare la richiesta).
*   Disabilita il pulsante di submit mentre la richiesta è in corso per prevenire invii multipli.

---

[Torna all'indice delle esercitazioni](../README.md)