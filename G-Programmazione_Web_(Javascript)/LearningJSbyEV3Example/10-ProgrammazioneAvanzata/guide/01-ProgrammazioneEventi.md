# Guida 1: Programmazione Guidata dagli Eventi con EV3

## Introduzione

La programmazione guidata dagli eventi è un paradigma di programmazione in cui il flusso del programma è determinato da eventi esterni (input dell'utente, messaggi da altri programmi, letture dei sensori, ecc.). Invece di seguire una sequenza lineare di istruzioni, il programma attende che si verifichino determinati eventi e risponde di conseguenza eseguendo specifiche porzioni di codice (gestori di eventi o *event handler*).

Questo approccio è particolarmente utile nella robotica, dove i robot devono reagire in tempo reale a un ambiente dinamico e imprevedibile.

## Concetti Chiave

1.  **Evento**: Un'azione o un'occorrenza rilevata dal programma, come la pressione di un pulsante, la ricezione di un messaggio, il superamento di una soglia da parte di un sensore, o lo scadere di un timer.
2.  **Gestore di Eventi (Event Handler)**: Una funzione o un blocco di codice che viene eseguito quando si verifica un evento specifico. È anche chiamato *callback*.
3.  **Ciclo degli Eventi (Event Loop)**: Un meccanismo che attende continuamente il verificarsi di eventi e li smista ai gestori di eventi appropriati.
4.  **Registrazione degli Eventi**: Il processo mediante il quale si associa un gestore di eventi a un particolare tipo di evento.

## Programmazione Guidata dagli Eventi in MakeCode per EV3

MakeCode per EV3 semplifica notevolmente la programmazione guidata dagli eventi attraverso blocchi specifici che rappresentano eventi e i loro gestori.

### Esempi di Blocchi Evento Comuni:

*   **`brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {})`**: Esegue il codice quando il pulsante "Invio" (Enter) del mattoncino EV3 viene premuto.
*   **`sensors.color1.onEvent(ColorSensorEvent.Reflection, function () {})`**: Esegue il codice quando il sensore di colore rileva un cambiamento nella riflessione della luce (ad esempio, passando su una linea nera).
*   **`motors.largeA.onEvent(MotorEvent.Stalled, function () {})`**: Esegue il codice quando il motore grande A si blocca.
*   **`messages.onReceived("messaggio", function () {})`**: Esegue il codice quando viene ricevuto un messaggio specifico tramite Bluetooth o Wi-Fi.
*   **`loops.forever(function () {})`**: Anche se non strettamente un gestore di eventi, il blocco `forever` (per sempre) esegue continuamente il codice al suo interno, permettendo di controllare costantemente le condizioni o di eseguire azioni periodiche. Può essere visto come un semplice ciclo di eventi.

### Esempio Pratico: Reagire alla Pressione di un Pulsante

Supponiamo di voler far emettere un suono al robot EV3 quando il pulsante "Su" (Up) del mattoncino viene premuto.

```javascript
// Registra un gestore per l'evento di pressione del pulsante 'Up'
brick.buttonUp.onEvent(ButtonEvent.Pressed, function () {
    // Azione da eseguire quando il pulsante 'Up' viene premuto
    brick.sound(Sound.InformationBeep);
    brick.showString("Pulsante SU premuto!", 1);
});

// Il programma principale può continuare a fare altre cose
// o semplicemente attendere gli eventi.
brick.showString("Pronto a ricevere eventi...", 3);
```

**Spiegazione:**

1.  `brick.buttonUp.onEvent(ButtonEvent.Pressed, ...)`: Questo registra una funzione (il gestore dell'evento) che sarà chiamata ogni volta che l'evento `ButtonEvent.Pressed` (pressione del pulsante) si verifica per `brick.buttonUp` (il pulsante "Su").
2.  La funzione anonima `function () { ... }` contiene il codice che verrà eseguito: emettere un suono di "beep" e mostrare un messaggio sullo schermo dell'EV3.
3.  Il programma non si ferma dopo la registrazione; continua l'esecuzione (in questo caso, mostrando "Pronto a ricevere eventi...") e il ciclo degli eventi di MakeCode monitorerà in background la pressione dei pulsanti.

## Vantaggi della Programmazione Guidata dagli Eventi

*   **Reattività**: I programmi possono rispondere rapidamente agli stimoli esterni.
*   **Efficienza**: Il processore non spreca cicli controllando continuamente le condizioni se non è necessario; agisce solo quando un evento si verifica.
*   **Modularità**: Il codice è organizzato in gestori di eventi, rendendolo più facile da capire, mantenere e modificare.
*   **Parallelismo apparente**: Anche se JavaScript è single-threaded, la programmazione guidata dagli eventi può dare l'illusione di compiti che vengono eseguiti contemporaneamente, poiché il programma può passare rapidamente da un gestore di eventi all'altro.

## Sfide e Considerazioni

*   **Complessità del Flusso di Controllo**: Il flusso del programma può diventare difficile da seguire se ci sono molti eventi e gestori interdipendenti (noto come "callback hell" in alcuni contesti, anche se MakeCode mitiga questo con la sua struttura a blocchi).
*   **Condizioni di Gara (Race Conditions)**: Se più eventi possono verificarsi contemporaneamente e modificare dati condivisi, è necessario gestire attentamente l'accesso a tali dati per evitare risultati imprevisti.
*   **Debugging**: Il debugging può essere più complesso perché l'ordine di esecuzione non è sempre prevedibile.

## Applicazioni con EV3

*   **Robot che seguono una linea**: L'evento è il sensore di colore che rileva la linea o il bordo della linea.
*   **Robot che evitano ostacoli**: L'evento è il sensore a ultrasuoni o a infrarossi che rileva un ostacolo entro una certa distanza.
*   **Interazione con l'utente**: Rispondere alla pressione dei pulsanti sull'EV3 o a comandi inviati tramite Bluetooth.
*   **Sistemi di allarme**: Attivare un'azione (es. suono, movimento) quando un sensore (es. tattile) viene attivato.

## Conclusione

La programmazione guidata dagli eventi è fondamentale per creare robot EV3 interattivi e reattivi. Comprendere come registrare e gestire gli eventi permette di costruire comportamenti complessi e intelligenti per il tuo robot. MakeCode fornisce un ambiente intuitivo per implementare questo paradigma, rendendolo accessibile anche ai principianti.

Nelle prossime guide e esempi, esploreremo ulteriormente come utilizzare diversi tipi di eventi e sensori per controllare il comportamento del robot EV3.

---

[Torna all'elenco delle Guide](./README.md)

[Torna al Modulo 10](../README.md)

[Torna alla Home del Corso](../../README.md)