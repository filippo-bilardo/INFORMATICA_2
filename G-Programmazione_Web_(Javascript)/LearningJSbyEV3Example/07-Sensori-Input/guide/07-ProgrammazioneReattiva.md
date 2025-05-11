# Guida 7: Programmazione Reattiva e Gestione Input

La programmazione reattiva, o guidata dagli eventi (event-driven programming), è un paradigma fondamentale quando si lavora con i robot e i loro sensori. Invece di controllare continuamente lo stato di ogni sensore (polling), il robot reagisce agli eventi specifici generati dai sensori o da altre fonti di input.

## Polling vs. Programmazione Guidata dagli Eventi

1.  **Polling (Sondaggio Continuo)**:
    *   Il programma controlla ripetutamente lo stato di un sensore in un ciclo.
    *   **Esempio (pseudocodice)**:
        ```
        loop forever:
            distanza = leggiSensoreUltrasuoni()
            if distanza < 20:
                fermaMotori()
            pausaBreve()
        ```
    *   **Pro**: Semplice da implementare per compiti basilari.
    *   **Contro**: Può essere inefficiente (spreco di cicli CPU se non ci sono cambiamenti), può mancare eventi brevi se il polling non è abbastanza veloce, e rende il codice più complesso da gestire con molti sensori.

2.  **Programmazione Guidata dagli Eventi (Event-Driven)**:
    *   Il programma definisce delle "funzioni gestore di eventi" (event handler) che vengono eseguite automaticamente quando si verifica un evento specifico.
    *   **Esempio (pseudocodice)**:
        ```
        quando SensoreTocco.Premuto:
            fermaMotori()

        quando SensoreColore.RilevaRosso:
            suonaNota()
        ```
    *   **Pro**: Più efficiente (il codice viene eseguito solo quando necessario), più reattivo a input rapidi, codice più modulare e più facile da gestire con input multipli.
    *   **Contro**: Può richiedere una comprensione più approfondita del flusso del programma e della gestione degli eventi asincroni.

MakeCode per EV3 supporta fortemente la programmazione guidata dagli eventi, fornendo blocchi specifici per registrare gestori di eventi per vari sensori e input del brick.

## Gestione degli Input dei Sensori in MakeCode

MakeCode utilizza un sistema di eventi per molti sensori. Ecco alcuni esempi comuni:

*   **Sensore di Contatto**:
    *   `sensors.touch1.onEvent(SensorEvent.Pressed, function () { ... })`
    *   `sensors.touch1.onEvent(SensorEvent.Released, function () { ... })`
    *   `sensors.touch1.onEvent(SensorEvent.Bumped, function () { ... })`

*   **Sensore di Colore (eventi basati su soglie o cambiamenti specifici)**:
    *   MakeCode potrebbe non avere eventi diretti per "colore rilevato" ma si possono creare logiche reattive monitorando i cambiamenti o usando soglie.
    *   `sensors.color3.onLightDetected(LightCondition.Dark, function () { ... })` (per luce ambientale)

*   **Pulsanti del Brick EV3**:
    *   `brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () { ... })`
    *   `brick.buttonUp.onEvent(ButtonEvent.Clicked, function () { ... })`

*   **Sensore a Infrarossi (per il Beacon)**:
    *   Eventi per la pressione dei pulsanti del beacon.

**Esempio JavaScript con Sensore di Contatto:**

```javascript
// Assumendo sensore di contatto sulla porta 1
brick.showString("Pronto per il tocco!", 1);

sensors.touch1.onEvent(SensorEvent.Pressed, function () {
    brick.showString("Premuto!", 2);
    motors.largeBC.run(50);
});

sensors.touch1.onEvent(SensorEvent.Released, function () {
    brick.showString("Rilasciato!", 3);
    motors.largeBC.stop();
});
```

## Input Multipli e Concorrenza

Con la programmazione guidata dagli eventi, il robot può reagire a più input contemporaneamente (o quasi). Ad esempio, potrebbe muoversi finché non preme un sensore di contatto, ma allo stesso tempo reagire se un pulsante del brick viene premuto per cambiare modalità.

*   **Funzioni Handler Indipendenti**: Ogni gestore di eventi è una funzione separata che viene eseguita quando il suo evento specifico si verifica.
*   **Asincronia**: Gli eventi possono accadere in qualsiasi momento, in modo asincrono rispetto al flusso principale del programma (se presente). MakeCode gestisce questa asincronia.

## Progettare Comportamenti Reattivi

1.  **Identifica gli Eventi Rilevanti**: Quali input dei sensori o azioni dell'utente dovrebbero scatenare una reazione?
2.  **Definisci le Azioni**: Cosa dovrebbe fare il robot in risposta a ciascun evento?
3.  **Scrivi i Gestori di Eventi**: Implementa le funzioni che eseguono le azioni definite.
4.  **Considera gli Stati**: A volte, la reazione a un evento dipende dallo stato attuale del robot (vedi Modulo 10 su Macchine a Stati).

## Vantaggi della Programmazione Reattiva

*   **Efficienza**: Il processore non spreca tempo a controllare sensori che non cambiano.
*   **Reattività**: Il robot può rispondere più rapidamente agli stimoli.
*   **Modularità**: Il codice è organizzato in blocchi logici (i gestori di eventi) più facili da capire e mantenere.
*   **Scalabilità**: È più facile aggiungere la gestione di nuovi sensori o input senza stravolgere la logica esistente.

La programmazione reattiva è un approccio potente e moderno per sviluppare software per robot, rendendoli più intelligenti e interattivi.

---

[Torna all'elenco delle Guide](./README.md)
[Torna al Modulo 07](../README.md)
[Torna alla Home del Corso](../../../README.md)