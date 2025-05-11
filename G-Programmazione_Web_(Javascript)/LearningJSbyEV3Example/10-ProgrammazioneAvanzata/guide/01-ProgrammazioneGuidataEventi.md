# Guida 1: Programmazione Guidata dagli Eventi (Event-Driven Programming) con EV3

## Introduzione alla Programmazione Guidata dagli Eventi

La Programmazione Guidata dagli Eventi (Event-Driven Programming - EDP) è un paradigma di programmazione in cui il flusso del programma è determinato da eventi esterni o interni. Invece di seguire una sequenza lineare di istruzioni, un programma guidato dagli eventi attende che accada qualcosa (un evento) e poi reagisce eseguendo una porzione di codice specifica (un gestore di eventi o event handler).

Questo modello è particolarmente adatto per sistemi interattivi come i robot, che devono rispondere a stimoli dall'ambiente (sensori), input dell'utente (pulsanti), o messaggi da altri sistemi.

## Concetti Chiave dell'EDP

1.  **Evento (Event)**: Un'azione o un'occorrenza rilevata dal sistema. Esempi:
    *   Pressione di un pulsante.
    *   Rilevamento di un ostacolo da parte di un sensore.
    *   Scadenza di un timer.
    *   Ricezione di un messaggio.
    *   Un motore che si blocca.

2.  **Sorgente dell'Evento (Event Source)**: L'oggetto o il componente che genera l'evento (es. un sensore, un pulsante del brick EV3, un motore).

3.  **Gestore dell'Evento (Event Handler / Listener / Callback)**: Una funzione o un blocco di codice che viene eseguito in risposta a un evento specifico. Il programma "registra" i gestori di eventi con le sorgenti di eventi per specificare come reagire.

4.  **Ciclo degli Eventi (Event Loop)**: Un meccanismo sottostante che attende continuamente gli eventi e, quando ne rileva uno, invoca il gestore di eventi associato.

## EDP in MakeCode per EV3

MakeCode per EV3 abbraccia pienamente il paradigma della programmazione guidata dagli eventi. Molti blocchi e API JavaScript sono progettati per reagire agli eventi generati dall'hardware EV3.

### Eventi Comuni e Loro Gestione

1.  **Eventi dei Pulsanti del Brick**:
    *   `brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () { ... })`
    *   Altri pulsanti: `buttonUp`, `buttonDown`, `buttonLeft`, `buttonRight`, `buttonBack`.
    *   Tipi di evento: `Pressed`, `Released`, `Bumped` (premuto e rilasciato).

    ```javascript
    // Esempio: Mostra un messaggio quando il pulsante Enter viene premuto
    brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
        brick.showString("Enter Premuto!", 1);
        brick.sound(Sound.PlayBoing);
    });

    // Esempio: Ferma i motori quando il pulsante Back viene premuto
    brick.buttonBack.onEvent(ButtonEvent.Pressed, function() {
        motors.stopAll();
        brick.showString("Motori Fermi!", 2);
    });
    ```

2.  **Eventi dei Sensori**:
    *   **Sensore di Tocco**: `sensors.touch1.onEvent(ButtonEvent.Pressed, function () { ... })`
        *   Simile agli eventi dei pulsanti del brick.
    *   **Sensore di Colore (Cambiamento di Colore Rilevato)**: `sensors.color1.onEvent(ColorSensorEvent.ColorChanged, function () { ... })`
        *   Utile per reagire quando il sensore passa sopra un colore diverso.
    *   **Sensore a Ultrasuoni (Oggetto Rilevato/Perso)**: `sensors.ultrasonic1.onEvent(UltrasonicSensorEvent.ObjectDetected, function (distance) { ... })`
        *   Permette di reagire quando un oggetto entra o esce da un certo range (configurabile).

    ```javascript
    // Esempio: Reagisci alla pressione del sensore di tocco sulla porta 1
    sensors.touch1.onEvent(ButtonEvent.Pressed, function () {
        brick.showString("Sensore Tocco 1 Premuto!", 3);
        motors.largeA.run(50, 360, MoveUnit.Degrees); // Muovi un motore
    });

    // Esempio: Suona una nota quando il sensore di colore rileva il Rosso
    // Questo richiede un controllo periodico o un evento di cambio colore più generico
    // L'evento ColorChanged è più generale, qui un esempio di controllo:
    let colorePrecedente = -1;
    loops.forever(function() {
        let coloreAttuale = sensors.color1.color();
        if (coloreAttuale !== colorePrecedente) {
            colorePrecedente = coloreAttuale;
            brick.showString("Colore: " + coloreAttuale, 4);
            if (coloreAttuale === Color.Red) {
                brick.sound(Sound.PlayPiano);
            }
        }
        pause(100);
    });
    ```

3.  **Eventi dei Motori**:
    *   **Motore Bloccato (Stall)**: `motors.largeA.onEvent(MotorEvent.Stalled, function () { ... })`
        *   Cruciale per rilevare se un motore è sovraccarico o bloccato fisicamente.

    ```javascript
    // Esempio: Ferma il motore e suona un allarme se si blocca
    motors.largeA.onEvent(MotorEvent.Stalled, function () {
        motors.largeA.stop();
        brick.showString("Motore A BLOCCATO!", 5);
        brick.setLedPattern(LedPattern.RedFlash);
        brick.sound(Sound.PlaySiren);
    });

    // Per testare, avvia il motore e poi bloccalo manualmente
    // motors.largeA.run(80);
    ```

4.  **Eventi di Messaggistica (Bluetooth)**:
    *   `messages.onReceived("nome_messaggio", function (valore) { ... })`
    *   Permette al robot di reagire a messaggi ricevuti via Bluetooth da un altro EV3 o da un computer/app.

    ```javascript
    // Esempio: Esegui un'azione quando ricevi il messaggio "start"
    messages.onReceived("comando", function (valore) {
        if (valore === "start") {
            brick.showString("Ricevuto START!", 6);
            // ... inizia un'attività ...
        } else if (valore === "stop") {
            brick.showString("Ricevuto STOP!", 6);
            // ... ferma un'attività ...
        }
    });
    ```

5.  **Timer e Loop Paralleli**:
    *   `loops.pause(millis)`: Mette in pausa il flusso corrente.
    *   `control.millis()`: Restituisce il tempo trascorso dall'avvio del programma (in millisecondi), utile per implementare timeout o azioni temporizzate.
    *   `control.runInParallel(function () { ... })`: Esegue una funzione in un "thread" separato, permettendo a più blocchi di codice di funzionare apparentemente contemporaneamente. Questo è fondamentale per la gestione di più eventi o attività parallele.

    ```javascript
    // Esempio: Lampeggia un LED ogni secondo in parallelo
    control.runInParallel(function () {
        let ledAcceso = false;
        while (true) {
            if (ledAcceso) {
                brick.setLedPattern(LedPattern.Orange);
            } else {
                brick.setLedPattern(LedPattern.Off);
            }
            ledAcceso = !ledAcceso;
            pause(1000);
        }
    });

    brick.showString("Programma principale attivo...", 7);
    // Il programma principale può continuare a fare altro mentre il LED lampeggia
    ```

## Vantaggi della Programmazione Guidata dagli Eventi

*   **Reattività**: I programmi rispondono rapidamente agli stimoli esterni.
*   **Efficienza**: Il processore non spreca tempo controllando continuamente (polling) se qualcosa è accaduto; reagisce solo quando necessario.
*   **Modularità**: Il codice può essere organizzato in gestori di eventi indipendenti, rendendolo più facile da capire, modificare e debuggare.
*   **Semplicità per Comportamenti Complessi**: Facilita la gestione di interazioni multiple e concorrenti.

## Considerazioni

*   **Complessità del Flusso**: In programmi con molti eventi, il flusso di controllo può diventare meno ovvio rispetto a un programma sequenziale.
*   **Race Conditions**: Se più gestori di eventi modificano dati condivisi, è necessario prestare attenzione per evitare condizioni di gara (race conditions), dove il risultato dipende dall'ordine imprevedibile di esecuzione degli eventi. L'uso di `control.runInParallel` accentua questa necessità.
*   **Debugging**: Il debugging può essere più complesso perché l'ordine di esecuzione dei gestori di eventi non è sempre predicibile.

## Conclusione

La programmazione guidata dagli eventi è un paradigma potente e naturale per la robotica con EV3. Sfruttando gli eventi generati da sensori, motori e pulsanti, e utilizzando i gestori di eventi forniti da MakeCode, è possibile creare robot interattivi e reattivi in modo efficiente e modulare. Comprendere come registrare e gestire gli eventi è fondamentale per sbloccare il pieno potenziale del tuo robot EV3.

---

[Torna all'elenco delle Guide](./README.md)

[Torna al Modulo 10](../README.md)

[Torna alla Home del Corso](../../README.md)