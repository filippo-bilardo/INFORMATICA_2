# Guida 2: Macchine a Stati Finiti (FSM) per Comportamenti Complessi con EV3

## Introduzione alle Macchine a Stati Finiti (FSM)

Una Macchina a Stati Finiti (Finite State Machine - FSM) è un modello matematico di calcolo utilizzato per progettare sistemi che possono trovarsi in un numero finito di stati. Una FSM può essere in un solo stato alla volta (lo stato corrente) e può transitare da uno stato all'altro in risposta a input o eventi esterni. Le FSM sono estremamente utili per gestire comportamenti complessi in robot e altri sistemi autonomi.

## Componenti Chiave di una FSM

1.  **Stati (States)**: Condizioni o situazioni distinte in cui il sistema può trovarsi. Ogni stato rappresenta un comportamento specifico o una fase di un processo.
    *   Esempio: `IN_ATTESA`, `AVANZAMENTO`, `EVITAMENTO_OSTACOLO`, `COMPITO_COMPLETATO`.

2.  **Transizioni (Transitions)**: Regole che definiscono come il sistema passa da uno stato all'altro. Una transizione è solitamente innescata da una condizione o un evento.
    *   Esempio: Se nello stato `AVANZAMENTO` e `sensore_ultrasuoni.distanza() < 10cm`, transita allo stato `EVITAMENTO_OSTACOLO`.

3.  **Azioni (Actions)**: Operazioni eseguite quando si entra in uno stato (entry action), si esce da uno stato (exit action), o durante una transizione.
    *   Esempio: Entrando nello stato `AVANZAMENTO`, `motori.avanti(50)`.

4.  **Stato Iniziale (Initial State)**: Lo stato in cui la FSM si trova all'avvio.

5.  **Stati Finali (Final States - opzionale)**: Stati che indicano il completamento del compito della FSM.

## Perché Usare le FSM con EV3?

*   **Organizzazione del Codice**: Suddivide la logica complessa in parti più piccole e gestibili (gli stati).
*   **Chiarezza del Comportamento**: Rende esplicito come il robot dovrebbe comportarsi in diverse situazioni e come passa da un comportamento all'altro.
*   **Facilità di Debug e Modifica**: È più semplice isolare problemi o aggiungere nuove funzionalità modificando stati o transizioni specifiche.
*   **Gestione di Comportamenti Sequenziali e Reattivi**: Adatte sia per compiti che seguono una sequenza definita sia per reazioni a eventi imprevisti.

## Implementare una FSM in MakeCode/JavaScript

Un modo comune per implementare una FSM in JavaScript è usare una variabile per tenere traccia dello stato corrente e una struttura `switch` (o una serie di `if-else if`) per eseguire la logica associata a ciascuno stato.

### Esempio: Robot Semplice che Evita Ostacoli

Immaginiamo un robot che ha i seguenti comportamenti:
1.  **`FERMO`**: Il robot è fermo. Attende un comando per iniziare.
2.  **`AVANTI`**: Il robot si muove in avanti.
3.  **`OSTACOLO_RILEVATO`**: Il robot ha rilevato un ostacolo e deve decidere cosa fare (es. girare).
4.  **`GIRA`**: Il robot sta girando per evitare l'ostacolo.

```javascript
// Definizione degli stati (usando costanti o un enum se disponibile/preferito)
const STATO_FERMO = 0;
const STATO_AVANTI = 1;
const STATO_OSTACOLO_RILEVATO = 2;
const STATO_GIRA = 3;

let statoCorrente = STATO_FERMO; // Stato iniziale

const DISTANZA_SICUREZZA_CM = 15;
let timerRotazione = 0;
const DURATA_ROTAZIONE_MS = 1000; // Gira per 1 secondo

brick.showString("FSM Pronta", 1);

// Evento per avviare il robot
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function() {
    if (statoCorrente === STATO_FERMO) {
        brick.showString("Avvio...", 2);
        statoCorrente = STATO_AVANTI;
    }
});

// Evento per fermare il robot (emergenza)
brick.buttonBack.onEvent(ButtonEvent.Pressed, function() {
    brick.showString("Stop Emergenza!", 2);
    motors.stopAll();
    statoCorrente = STATO_FERMO;
});

// Loop principale della FSM
loops.forever(function() {
    // Mostra lo stato corrente per debug
    // brick.showString("Stato: " + statoCorrente, 8);

    switch (statoCorrente) {
        case STATO_FERMO:
            // Azione di ingresso (opzionale, potrebbe essere fatta una sola volta)
            motors.stopAll();
            brick.setLedPattern(LedPattern.Red);
            // Transizioni da FERMO:
            // - (gestita dall'evento buttonEnter)
            break;

        case STATO_AVANTI:
            brick.setLedPattern(LedPattern.Green);
            motors.largeBC.run(50); // Vai avanti
            brick.showString("AVANTI", 3);

            // Transizioni da AVANTI:
            if (sensors.ultrasonic1.distance() < DISTANZA_SICUREZZA_CM) {
                statoCorrente = STATO_OSTACOLO_RILEVATO;
            }
            break;

        case STATO_OSTACOLO_RILEVATO:
            brick.setLedPattern(LedPattern.Orange);
            motors.stopAll(); // Fermati prima di girare
            brick.showString("OSTACOLO!", 3);
            brick.sound(Sound.PlayWarning);
            // Transizione immediata a GIRA (o potrebbe avere logica più complessa)
            statoCorrente = STATO_GIRA;
            timerRotazione = control.millis(); // Inizia il timer per la rotazione
            break;

        case STATO_GIRA:
            brick.setLedPattern(LedPattern.OrangeFlash);
            motors.largeB.run(40);  // Gira (es. motore B avanti, motore C indietro)
            motors.largeC.run(-40);
            brick.showString("GIRO...", 3);

            // Transizioni da GIRA:
            // Dopo un certo tempo, torna ad AVANTI
            if (control.millis() - timerRotazione > DURATA_ROTAZIONE_MS) {
                statoCorrente = STATO_AVANTI;
            }
            break;

        default:
            // Stato sconosciuto, torna a FERMO per sicurezza
            brick.showString("Stato Sconosciuto!", 3);
            statoCorrente = STATO_FERMO;
            break;
    }
    pause(50); // Breve pausa per non sovraccaricare la CPU e dare tempo alle azioni
});

```

### Spiegazione dell'Esempio:

1.  **Definizione degli Stati**: Le costanti `STATO_FERMO`, `STATO_AVANTI`, ecc., rendono il codice più leggibile.
2.  **`statoCorrente`**: Variabile che tiene traccia dello stato attuale della FSM.
3.  **`loops.forever`**: Il cuore della FSM, dove la logica di stato viene eseguita ripetutamente.
4.  **`switch (statoCorrente)`**: Seleziona il blocco di codice da eseguire in base allo stato corrente.
5.  **Azioni di Stato**: All'interno di ogni `case`, vengono eseguite le azioni specifiche per quello stato (es. muovere i motori, cambiare LED).
6.  **Condizioni di Transizione**: Alla fine di ogni `case` (o all'interno, se più appropriato), si controllano le condizioni che potrebbero far cambiare lo stato (es. lettura del sensore a ultrasuoni, scadenza di un timer).
7.  **Eventi Esterni**: Gli eventi dei pulsanti (`brick.buttonEnter.onEvent`) possono anche causare transizioni di stato, modificando `statoCorrente` dall'esterno del loop principale della FSM.
8.  **`pause(50)`**: Importante per dare respiro al processore EV3 e permettere ad altre attività (come i gestori di eventi) di essere processate.

## Miglioramenti e Complessità Aggiuntive

*   **Azioni di Ingresso/Uscita (Entry/Exit Actions)**: Per logica più pulita, si possono definire funzioni separate che vengono chiamate una sola volta quando si entra o si esce da uno stato. Questo evita di ripetere codice nel loop principale se l'azione deve avvenire solo al momento della transizione.

    ```javascript
    // ... (definizione stati e variabili) ...
    let statoPrecedente = -1; // Per rilevare cambio di stato

    function onEnterStatoAvanti() {
        brick.showString("Entro AVANTI", 4);
        motors.largeBC.run(50);
        brick.setLedPattern(LedPattern.Green);
    }

    function onExitStatoAvanti() {
        brick.showString("Esco AVANTI", 4);
        // motors.stopAll(); // Se necessario
    }

    // Nel loops.forever
    // if (statoCorrente !== statoPrecedente) {
    //     // Esegui azioni di uscita per statoPrecedente
    //     if (statoPrecedente === STATO_AVANTI) onExitStatoAvanti();
    //     // ... altri stati

    //     // Esegui azioni di ingresso per statoCorrente
    //     if (statoCorrente === STATO_AVANTI) onEnterStatoAvanti();
    //     // ... altri stati
    //     statoPrecedente = statoCorrente;
    // }

    // // Poi lo switch case con solo la logica continua e le transizioni
    // switch (statoCorrente) {
    //     case STATO_AVANTI:
    //         // Logica continua (se c'è)
    //         if (sensors.ultrasonic1.distance() < DISTANZA_SICUREZZA_CM) {
    //             statoCorrente = STATO_OSTACOLO_RILEVATO;
    //         }
    //         break;
    //     // ...
    // }
    ```

*   **FSM Gerarchiche (Hierarchical FSMs)**: Per sistemi molto complessi, uno stato può a sua volta contenere una sotto-FSM.
*   **FSM Parallele**: Più FSM possono operare contemporaneamente per controllare diversi aspetti del robot.

## Conclusione

Le Macchine a Stati Finiti sono uno strumento potente e versatile per progettare comportamenti robotici strutturati e robusti sull'EV3. Organizzando la logica del robot in stati e transizioni ben definiti, si può gestire la complessità in modo efficace, rendendo il codice più facile da capire, sviluppare e mantenere. L'esempio fornito è una base; sperimentando con più stati, transizioni complesse e azioni dettagliate, si possono creare robot EV3 con comportamenti sofisticati e intelligenti.

---

[Torna all'elenco delle Guide](./README.md)

[Torna al Modulo 10](../README.md)

[Torna alla Home del Corso](../../README.md)