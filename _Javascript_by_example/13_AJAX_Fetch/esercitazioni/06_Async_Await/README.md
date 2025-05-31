# Esercizio 6: Utilizzo di Async/Await con Fetch

**Obiettivo:** Riscrivere l'esercizio 1 (Richiesta GET Semplice) utilizzando la sintassi `async/await` per gestire la richiesta Fetch e la risposta.

**Teoria Correlata:**
*   [Fetch API](../teoria/03_Fetch_API.md)
*   [Gestione Risposte](../teoria/04_Gestione_Risposte.md)
*   [Gestione Errori Fetch (sezione async/await)](../teoria/05_Gestione_Errori_Fetch.md)

**Requisiti:**

1.  **Struttura HTML:**
    *   Crea un file `index.html`.
    *   Includi un pulsante (es. con id `loadDataBtn`) che avvierà la richiesta.
    *   Includi un elemento (es. un `div` con id `output`) dove verranno visualizzati i dati recuperati o i messaggi di errore.
    *   Collega un file `script.js`.

2.  **Logica JavaScript (`script.js`):**
    *   Utilizza `async/await` per gestire l'intera logica della richiesta Fetch.
    *   Aggiungi un event listener al pulsante `loadDataBtn`.
    *   All'interno della funzione asincrona associata all'evento:
        *   Effettua una richiesta GET all'API pubblica: `https://jsonplaceholder.typicode.com/posts/1`.
        *   Utilizza un blocco `try...catch` per gestire potenziali errori (sia di rete che nella risposta).
        *   **Dentro `try`:**
            *   Attendi (`await`) la risposta dalla `fetch`.
            *   Controlla se la risposta è andata a buon fine (`response.ok`). Se non lo è, lancia un errore con un messaggio appropriato (es. `throw new Error(`Errore HTTP: ${response.status}`);`).
            *   Attendi (`await`) la conversione della risposta in JSON (`response.json()`).
            *   Visualizza i dati ottenuti (es. il titolo e il corpo del post) nell'elemento `output` sulla pagina HTML.
        *   **Dentro `catch`:**
            *   Visualizza il messaggio di errore nell'elemento `output`.

**API da utilizzare:**
`https://jsonplaceholder.typicode.com/posts/1` (restituisce un singolo post in formato JSON).

**Verifica:**

*   Cliccando il pulsante, i dati del post (titolo e corpo) dovrebbero apparire nella pagina.
*   Simula un errore (es. modificando l'URL in uno non valido) e verifica che il messaggio di errore venga correttamente visualizzato.

[Torna all'elenco degli esercizi](../README.md)