# Teoria 5: Errori Comuni e Best Practice nella Gestione degli Errori

Una gestione efficace degli errori va oltre la semplice sintassi `try...catch`. Richiede attenzione ai dettagli e l'adozione di buone pratiche per rendere il codice più robusto, manutenibile e facile da debuggare.

## Errori Comuni da Evitare

1.  **Ignorare gli Errori (Blocco `catch` Vuoto)**:
    ```javascript
    try {
      // ... codice ...
    } catch (e) {
      // NON FARE QUESTO! L'errore viene soppresso silenziosamente.
    }
    ```
    Questo nasconde i problemi e rende il debugging quasi impossibile. Se un errore viene catturato, deve essere almeno loggato o gestito in qualche modo.

2.  **Catturare Errori Troppo Generici**: Catturare `Error` al livello più alto dell'applicazione può mascherare errori specifici che dovrebbero essere gestiti più vicino alla loro origine.

3.  **Gestire Errori di Programmazione con `try...catch`**: Errori come `TypeError` o `ReferenceError` spesso indicano bug nel codice. Anche se `try...catch` può impedire il crash, la soluzione corretta è *correggere il bug*, non semplicemente catturare l'errore. `try...catch` è più indicato per errori operazionali (es. fallimento di una chiamata API, input utente non valido).

4.  **Modificare l'Oggetto Errore Originale**: Evitare di modificare le proprietà dell'oggetto errore catturato (`e.message = ...`), specialmente se si intende rilanciarlo. È meglio creare un nuovo errore se necessario.

5.  **Dimenticare `await` con Funzioni Asincrone nel `try`**: Se una funzione asincrona (che ritorna una Promise) viene chiamata senza `await` dentro un `try`, eventuali errori nella Promise non verranno catturati dal `catch` sincrono.
    ```javascript
    // SBAGLIATO
    try {
      funzioneAsyncChePuoFallire(); // Errore non catturato qui
    } catch (e) {
      // Questo catch non verrà eseguito per errori nella Promise
    }

    // CORRETTO (con async/await)
    try {
      await funzioneAsyncChePuoFallire();
    } catch (e) {
      // Errore catturato correttamente
    }

    // CORRETTO (con .catch() sulla Promise)
    funzioneAsyncChePuoFallire().catch(e => {
      // Errore catturato
    });
    ```

## Best Practice

1.  **Sii Specifico**: Cattura i tipi di errore che ti aspetti e sai come gestire. Lascia che gli errori imprevisti si propaghino a un gestore di errori globale o causino un fallimento controllato.

2.  **Logga Sempre gli Errori**: Registra informazioni dettagliate sugli errori (messaggio, tipo, stack trace) per facilitare il debugging. Usa `console.error()` o un sistema di logging più avanzato.

3.  **Usa `finally` per la Pulizia**: Garantisci che le risorse (connessioni, file, listener) vengano rilasciate usando `finally`, indipendentemente dal successo o fallimento dell'operazione nel `try`.

4.  **Lancia Errori Significativi**: Quando usi `throw`, lancia oggetti `Error` (o sottoclassi) con messaggi chiari e descrittivi. Considera la creazione di classi di errore personalizzate per la tua applicazione.

5.  **Non Nascondere l'Errore Originale**: Se catturi un errore e ne lanci uno nuovo (magari più specifico per l'applicazione), includi l'errore originale come causa (se l'ambiente lo supporta, o nel messaggio) per non perdere informazioni di contesto.
    ```javascript
    // Esempio concettuale (la proprietà 'cause' è più recente)
    try {
      await operazioneEsterna();
    } catch (erroreOriginale) {
      throw new ErroreApplicazione("Impossibile completare l'operazione X", { cause: erroreOriginale });
    }
    ```

6.  **Gestione Centralizzata degli Errori**: Implementa un gestore di errori globale (es. middleware in Express, listener `window.onerror` / `window.onunhandledrejection` nel browser) per catturare errori non gestiti, loggarli e, se necessario, informare l'utente in modo appropriato senza mostrare dettagli tecnici sensibili.

7.  **Validazione dell'Input**: Molti errori possono essere prevenuti validando l'input (parametri di funzione, dati utente, risposte API) prima di utilizzarlo.

Adottare queste pratiche migliora significativamente la qualità e l'affidabilità del codice JavaScript.