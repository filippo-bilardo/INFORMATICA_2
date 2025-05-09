# Guida 1: Programmazione Guidata dagli Eventi

## Introduzione

La programmazione guidata dagli eventi (Event-Driven Programming - EDP) è un paradigma di programmazione in cui il flusso del programma è determinato da eventi, come input dell'utente (pressione di un pulsante, tocco di un sensore), messaggi da altri programmi o thread, o letture di sensori che superano una certa soglia.

Nell'ambito della robotica con LEGO EV3 e MakeCode, la programmazione guidata dagli eventi è fondamentale per creare robot reattivi che possono rispondere dinamicamente a un ambiente mutevole e agli input dei sensori senza dover continuamente interrogare (poll) lo stato di ogni componente.

## Concetti Chiave

1.  **Evento (Event):** Un'azione o un'occorrenza significativa rilevata dal sistema. Esempi:
    *   Pressione del sensore di tocco.
    *   Rilevamento di un colore specifico da parte del sensore di colore.
    *   Superamento di una soglia di distanza da parte del sensore a ultrasuoni.
    *   Ricezione di un messaggio Bluetooth (se applicabile).
    *   Scadenza di un timer.

2.  **Gestore di Eventi (Event Handler) o Listener:** Una routine di callback (una funzione) che viene eseguita quando si verifica un evento specifico. Il gestore contiene la logica per rispondere all'evento.

3.  **Ciclo degli Eventi (Event Loop):** Un meccanismo che attende continuamente il verificarsi di eventi e, quando un evento si verifica, invia (dispatches) l'evento al gestore appropriato.

MakeCode per EV3 gestisce internamente il ciclo degli eventi e fornisce blocchi (o costrutti JavaScript) per registrare gestori di eventi per vari sensori e input.

## Vantaggi della Programmazione Guidata dagli Eventi

*   **Reattività:** Il robot può rispondere rapidamente agli stimoli esterni.
*   **Efficienza:** Il processore non spreca cicli controllando continuamente lo stato dei sensori (polling). Il codice viene eseguito solo quando necessario.
*   **Modularità:** Il codice può essere organizzato in gestori di eventi distinti, rendendolo più facile da capire e mantenere.
*   **Gestione della Complessità:** Semplifica la gestione di più input e attività concorrenti (o pseudo-concorrenti).

## Programmazione Guidata dagli Eventi in MakeCode/JavaScript per EV3

MakeCode fornisce blocchi specifici che si traducono in costrutti JavaScript per la gestione degli eventi. I più comuni sono:

*   `sensors.touch1.onEvent(ButtonEvent.Pressed, function () { ... })`
*   `sensors.color1.onEvent(ColorSensorEvent.ColorChanged, function () { ... })`
*   `brick.buttonEnter.onEvent(ButtonEvent.Clicked, function () { ... })`
*   `control.onEvent(DAL.DEVICE_ID_BUTTON_A, DAL.DEVICE_BUTTON_EVT_CLICK, function () { ... })` (per eventi più generici)

### Esempio 1: Risposta alla Pressione del Sensore di Tocco

```javascript
// Registra un gestore per l'evento 'Pressed' del sensore di tocco sulla porta 1
sensors.touch1.onEvent(ButtonEvent.Pressed, function () {
  brick.showString("Sensore Tocco Premuto!", 2);
  motors.largeA.run(50);
});

// Registra un gestore per l'evento 'Released' del sensore di tocco
sensors.touch1.onEvent(ButtonEvent.Released, function () {
  brick.showString("Sensore Tocco Rilasciato!", 3);
  motors.largeA.stop();
});

brick.showString("Pronto per eventi...", 1);
// Il programma principale può continuare a fare altro o semplicemente attendere gli eventi.
```
In questo esempio, il motore A si avvia quando il sensore di tocco viene premuto e si ferma quando viene rilasciato. Il codice non è bloccato in un ciclo di polling; attende passivamente gli eventi.

### Esempio 2: Reazione a Diversi Colori

```javascript
// Configura il sensore di colore per rilevare i colori
sensors.color1.setMode(ColorSensorMode.Color);

// Gestore per quando il sensore di colore rileva il ROSSO
control.onEvent(sensors.color1.id(), ColorSensorEvent.ColorChanged, function () {
    if (sensors.color1.color() === Color.Red) {
        brick.showString("Colore ROSSO rilevato!", 2);
        sound.playTone(262, 200); // Do
    }
});

// Gestore per quando il sensore di colore rileva il BLU
// Nota: MakeCode potrebbe richiedere un approccio diverso per gestire più colori specifici
// all'interno dello stesso evento ColorChanged, o si potrebbero usare if/else nel gestore.
// L'esempio sopra mostra un modo per reagire a un cambio generico e poi controllare il colore.

// Un approccio più comune è avere un unico gestore per ColorChanged
// e poi usare una struttura switch o if-else if per gestire i diversi colori.

control.onEvent(sensors.color1.id(), ColorSensorEvent.ColorChanged, function () {
    let detectedColor = sensors.color1.color();
    let colorName = "Nessuno";

    switch (detectedColor) {
        case Color.Red:
            colorName = "ROSSO";
            motors.largeA.run(30);
            motors.largeD.run(-30);
            break;
        case Color.Blue:
            colorName = "BLU";
            motors.largeA.run(-30);
            motors.largeD.run(30);
            break;
        case Color.Green:
            colorName = "VERDE";
            motors.largeAD.run(50);
            break;
        default:
            colorName = "Altro (" + detectedColor + ")";
            motors.largeAD.stop();
            break;
    }
    brick.showString("Colore: " + colorName, 4);
});

brick.showString("Mostra colori al sensore...", 1);
```

## Gestione di Eventi Multipli e Concorrenza

Un robot spesso deve rispondere a più eventi contemporaneamente. Ad esempio, potrebbe dover evitare ostacoli (sensore a ultrasuoni) mentre segue una linea (sensore di colore) e risponde ai comandi dei pulsanti del brick.

La programmazione guidata dagli eventi gestisce questo in modo naturale. Ogni evento ha il suo gestore, e il sistema si occupa di chiamare il gestore appropriato quando l'evento si verifica. È importante notare che JavaScript in MakeCode EV3 è single-threaded, il che significa che i gestori di eventi non vengono eseguiti veramente in parallelo, ma vengono accodati e è eseguiti uno alla volta. Se un gestore di eventi impiega molto tempo per completarsi, può ritardare l'elaborazione di altri eventi.

**Considerazioni:**
*   **Gestori Brevi:** Mantieni i gestori di eventi il più brevi e veloci possibile. Se un'azione richiede molto tempo, considera di avviarla e permettere al gestore di terminare (ad esempio, avviare un motore e uscire, invece di attendere che il motore completi un lungo movimento all'interno del gestore).
*   **Stato Condiviso:** Se più gestori di eventi modificano dati condivisi (variabili globali), fai attenzione alle race condition o a stati incoerenti. Questo è meno problematico in un ambiente single-threaded rispetto al multithreading preemptive, ma la logica deve comunque essere corretta.

## `control.runInParallel(function () { ... })`

MakeCode offre `control.runInParallel` che permette di eseguire una funzione "in background". Non è un vero parallelismo a livello di thread del sistema operativo, ma piuttosto una forma di multitasking cooperativo gestito dal runtime di MakeCode. Il codice all'interno di `runInParallel` viene eseguito periodicamente, cedendo il controllo per permettere ad altri gestori di eventi o blocchi `runInParallel` di eseguirsi.

```javascript
brick.showString("Test Parallelo", 1);

// Attività 1: Lampeggia un LED (simulato con messaggi)
control.runInParallel(function () {
    let on = true;
    while (true) { // Loop infinito per questa attività parallela
        if (on) {
            brick.showString("LED ON ", 2);
        } else {
            brick.showString("LED OFF", 2);
        }
        on = !on;
        pause(500); // Pausa, cedendo il controllo
    }
});

// Attività 2: Controlla un sensore
control.runInParallel(function () {
    while (true) {
        let distance = sensors.ultrasonic1.distance();
        brick.showString("Dist: " + distance.toFixed(1) + " cm", 3);
        if (distance < 15) {
            sound.playTone(440, 100);
        }
        pause(200); // Pausa, cedendo il controllo
    }
});

// Il programma principale può terminare qui, ma i blocchi paralleli continuano a girare.
```
`runInParallel` è utile per compiti che devono essere eseguiti continuamente, come il monitoraggio di sensori o l'aggiornamento di display, senza bloccare il flusso principale o altri gestori di eventi.

## Conclusione

La programmazione guidata dagli eventi è un paradigma potente e flessibile, particolarmente adatto per la robotica. Comprendere come registrare e gestire gli eventi in MakeCode/JavaScript ti permetterà di creare programmi EV3 più interattivi, efficienti e capaci di gestire compiti complessi. Ricorda di mantenere i gestori di eventi concisi e di considerare l'uso di `control.runInParallel` per attività di background continue.

---

[Torna al README del Modulo 10](../README.md)

[Torna all'indice del corso](../../README.md)