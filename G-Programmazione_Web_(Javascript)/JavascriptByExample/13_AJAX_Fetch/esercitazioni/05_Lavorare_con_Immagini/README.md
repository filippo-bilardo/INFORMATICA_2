# Esercitazione 5: Lavorare con Immagini (Blob)

**Obiettivo:** Utilizzare la Fetch API per scaricare un'immagine da un URL, gestirla come un oggetto `Blob` e visualizzarla dinamicamente sulla pagina HTML utilizzando un Object URL.

**Teoria Correlata:**
*   [Fetch API](../../teoria/03_Fetch_API.md)
*   [Gestione Risposte (Blob)](../../teoria/04_Gestione_Risposte.md)
*   [Gestione Errori](../../teoria/05_Gestione_Errori_Fetch.md)

## Requisiti

1.  **File HTML (`index.html`):**
    *   Crea un file HTML di base.
    *   Includi un titolo (es. `<h1>Visualizza Immagine Casuale</h1>`).
    *   Aggiungi un pulsante (`<button id="load-image">Carica Immagine</button>`).
    *   Aggiungi un elemento contenitore (es. `<div id="image-container"></div>`) dove verrà visualizzata l'immagine.
    *   Aggiungi un elemento per i messaggi (es. `<div id="message-area"></div>`).
    *   Collega un file JavaScript (`script.js`).

2.  **File JavaScript (`script.js`):**
    *   Seleziona il pulsante, il contenitore dell'immagine e l'area messaggi dal DOM.
    *   Aggiungi un event listener al pulsante per l'evento `click`.
    *   All'interno della funzione dell'event listener:
        *   Pulisci il contenitore dell'immagine e l'area messaggi. Mostra un messaggio "Caricamento immagine...".
        *   Utilizza un servizio che fornisce immagini casuali, ad esempio `https://picsum.photos/`. Costruisci un URL per un'immagine di dimensioni moderate (es. `https://picsum.photos/400/300`).
        *   Utilizza `fetch()` per effettuare una richiesta GET all'URL dell'immagine.
        *   Gestisci la risposta:
            *   Controlla `response.ok`. Se non è OK, lancia un errore.
            *   Se OK, usa `response.blob()` per ottenere i dati dell'immagine come oggetto `Blob`.
        *   Gestisci il `Blob` ricevuto:
            *   Crea un Object URL dal Blob usando `URL.createObjectURL(imageBlob)`.
            *   Crea un elemento `<img>`.
            *   Imposta l'attributo `src` dell'elemento `<img>` all'Object URL creato.
            *   **Importante:** Aggiungi un event listener `onload` all'elemento `<img>`. Solo quando l'immagine è stata effettivamente caricata nel tag `img`, aggiungi l'elemento `<img>` al contenitore (`image-container`) e rimuovi il messaggio di caricamento.
            *   **Altrettanto Importante:** Aggiungi un event listener `onerror` all'elemento `<img>` per gestire eventuali problemi nel caricamento dell'immagine dal Blob/Object URL.
            *   **Pulizia:** Quando l'immagine non è più necessaria (o prima di caricarne una nuova), è buona pratica revocare l'Object URL per liberare memoria, usando `URL.revokeObjectURL(imageObjectURL)`. Puoi farlo nell'`onload` dell'immagine *successiva* o in un meccanismo di pulizia separato.
        *   Gestisci eventuali errori (di rete, HTTP, lettura Blob) usando `.catch()` e mostra un messaggio di errore appropriato nell'`message-area`.
        *   Usa `.finally()` per assicurarti che il messaggio di caricamento venga rimosso se non è stato gestito altrove.

## Passaggi Suggeriti

1.  Crea la struttura HTML.
2.  Scrivi il codice JS per selezionare gli elementi e aggiungere l'event listener.
3.  Implementa la chiamata `fetch()` all'URL dell'immagine.
4.  Aggiungi la gestione della risposta con `response.ok` e `response.blob()`.
5.  Implementa la creazione dell'Object URL e dell'elemento `<img>`.
6.  Aggiungi gli event listener `onload` e `onerror` all'elemento `<img>` per gestire la visualizzazione e gli errori specifici del caricamento immagine.
7.  Implementa la logica per aggiungere l'immagine al DOM solo dopo l'`onload`.
8.  Aggiungi il blocco `.catch()` per la gestione generale degli errori Fetch.
9.  Considera dove e come revocare l'Object URL (`URL.revokeObjectURL`).
10. Testa il funzionamento cliccando il pulsante più volte. Verifica che le immagini vengano caricate e visualizzate e che gli errori siano gestiti.

## Bonus

*   Prima di caricare una nuova immagine, controlla se esiste già un Object URL precedente e revocalo usando `URL.revokeObjectURL()`.
*   Mostra le dimensioni e il tipo MIME del Blob ricevuto nella console o sulla pagina.

---

[Torna all'indice delle esercitazioni](../README.md)