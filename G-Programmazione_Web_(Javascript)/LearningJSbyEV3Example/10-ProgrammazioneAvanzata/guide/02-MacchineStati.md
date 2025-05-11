# Guida 2: Macchine a Stati Finiti (FSM) con EV3

## Introduzione

Una Macchina a Stati Finiti (Finite State Machine - FSM) è un modello matematico di calcolo utilizzato per progettare sistemi che possono trovarsi in un numero finito di stati. Il sistema può passare da uno stato all'altro in risposta a input o eventi esterni. Le FSM sono estremamente utili nella programmazione di robot perché permettono di gestire comportamenti complessi in modo strutturato e comprensibile.

Invece di avere un unico grande blocco di codice con molti `if-else` nidificati, una FSM scompone il comportamento del robot in stati distinti, ognuno con la propria logica e le proprie transizioni verso altri stati.

## Concetti Chiave di una FSM

1.  **Stati (States)**: Condizioni o situazioni distinte in cui il sistema (il robot) può trovarsi. Ad esempio, `IN_ATTESA`, `SEGUI_LINEA`, `EVITA_OSTACOLO`, `COMPITO_COMPLETATO`.
2.  **Transizioni (Transitions)**: Regole che definiscono come il sistema passa da uno stato all'altro. Una transizione è solitamente innescata da un evento o da una condizione che diventa vera.
3.  **Azioni (Actions)**: Operazioni eseguite quando il sistema si trova in un certo stato (azioni di stato) o quando avviene una transizione (azioni di transizione).
    *   **Azioni di Ingresso (Entry Actions)**: Eseguite quando si entra in uno stato.
    *   **Azioni di Uscita (Exit Actions)**: Eseguite quando si esce da uno stato.
    *   **Azioni Durante lo Stato (During/Do Actions)**: Eseguite continuamente o periodicamente mentre si è in uno stato.
4.  **Stato Iniziale (Initial State)**: Lo stato in cui la FSM inizia la sua esecuzione.
5.  **Stati Finali (Final States - opzionale)**: Stati che indicano il completamento di un compito.

## Implementare una FSM in MakeCode/JavaScript per EV3

Non esiste un blocco "FSM" diretto in MakeCode, ma possiamo implementare facilmente una FSM utilizzando variabili per tenere traccia dello stato corrente e strutture `if-else if` o `switch` per gestire la logica di ogni stato e le transizioni.

### Struttura di Base

```javascript
// Definizione degli stati (possiamo usare numeri o stringhe)
const STATO_IN_ATTESA = 0;
const STATO_AVANZAMENTO = 1;
const STATO_ROTATION = 2;
const STATO_EMERGENZA = 3;

// Variabile per lo stato corrente
let statoCorrente = STATO_IN_ATTESA;

// Funzione principale della FSM (da chiamare in un loop)
function eseguiFSM() {
    switch (statoCorrente) {
        case STATO_IN_ATTESA:
            // Azioni dello stato IN_ATTESA
            brick.showString("STATO: Attesa", 2);
            motors.largeBC.stop();

            // Condizioni di transizione
            if (brick.buttonEnter.isPressed()) {
                statoCorrente = STATO_AVANZAMENTO; // Transizione
                brick.showString("Entro Avanzamento", 3);
            }
            break;

        case STATO_AVANZAMENTO:
            // Azioni dello stato AVANZAMENTO
            brick.showString("STATO: Avanzamento", 2);
            motors.largeBC.run(50);

            // Condizioni di transizione
            if (sensors.ultrasonic1.distance() < 15) {
                statoCorrente = STATO_ROTATION; // Transizione
                brick.showString("Entro Rotazione", 3);
                // Azione di ingresso per STATO_ROTATION (opzionale qui, meglio nello stato stesso)
                motors.largeB.run(30, 360, MoveUnit.Degrees); // Gira a destra
                motors.largeC.run(-30, 360, MoveUnit.Degrees);
            }
            if (brick.buttonLeft.isPressed()){
                statoCorrente = STATO_EMERGENZA;
            }
            break;

        case STATO_ROTATION:
            brick.showString("STATO: Rotazione", 2);
            // Qui potremmo attendere il completamento della rotazione
            // o basarci su un timer/sensore per la prossima transizione.
            // Per semplicità, torniamo ad avanzare dopo una pausa.
            if (!motors.largeB.isRunning()) { // Supponendo che la rotazione sia finita
                 statoCorrente = STATO_AVANZAMENTO;
                 brick.showString("Torno ad Avanzamento", 3);
            }
            break;

        case STATO_EMERGENZA:
            brick.showString("STATO: Emergenza!", 2);
            motors.largeBC.stop();
            brick.sound(Sound.PoliceSiren);
            // Potrebbe rimanere qui o avere una transizione per resettare
            if (brick.buttonRight.isPressed()){
                statoCorrente = STATO_IN_ATTESA;
                brick.sound(Sound.Stop);
            }
            break;

        default:
            // Stato sconosciuto, resetta o gestisci l'errore
            brick.showString("Errore FSM!", 2);
            statoCorrente = STATO_IN_ATTESA;
            break;
    }
}

// Esegui la FSM continuamente
loops.forever(function () {
    eseguiFSM();
    pause(20); // Piccola pausa per non sovraccaricare la CPU
});

// Stato iniziale
brick.showString("FSM Pronta", 1);
```

### Spiegazione dell'Esempio:

1.  **Definizione degli Stati**: Usiamo costanti numeriche per rappresentare gli stati. Le stringhe sono più leggibili ma leggermente meno efficienti.
2.  **`statoCorrente`**: Una variabile globale che tiene traccia dello stato attuale del robot.
3.  **`eseguiFSM()`**: Questa funzione contiene la logica principale della FSM.
    *   Un blocco `switch` seleziona il codice da eseguire in base a `statoCorrente`.
    *   Ogni `case` corrisponde a uno stato.
    *   All'interno di ogni stato:
        *   Si eseguono le **azioni di stato** (es. muovere motori, mostrare messaggi).
        *   Si controllano le **condizioni di transizione** (es. pressione di un pulsante, lettura di un sensore).
        *   Se una condizione di transizione è vera, si aggiorna `statoCorrente` al nuovo stato.
4.  **`loops.forever()`**: Chiama `eseguiFSM()` ripetutamente, permettendo alla FSM di operare continuamente.

## Vantaggi dell'Uso delle FSM

*   **Chiarezza**: Il comportamento del robot è suddiviso in parti gestibili e ben definite.
*   **Manutenibilità**: È più facile modificare o aggiungere comportamenti modificando stati specifici o aggiungendo nuove transizioni, senza impattare l'intera logica.
*   **Debugging**: Si può facilmente tracciare in quale stato si trova il robot e perché è avvenuta una certa transizione.
*   **Scalabilità**: Le FSM possono essere gerarchiche (stati che contengono altre FSM), permettendo di gestire comportamenti molto complessi.

## Considerazioni Avanzate

*   **Azioni di Ingresso/Uscita**: Per logiche più pulite, si possono definire funzioni separate per le azioni da eseguire quando si entra o si esce da uno stato. Queste verrebbero chiamate immediatamente prima o dopo aver cambiato `statoCorrente`.
*   **FSM Basate su Eventi**: Invece di controllare le condizioni in un loop, le transizioni possono essere innescate direttamente da gestori di eventi (come visto nella guida sulla Programmazione Guidata dagli Eventi). Questo può rendere la FSM più reattiva ed efficiente.

    ```javascript
    // Esempio di transizione guidata da evento
    brick.buttonEnter.onEvent(ButtonEvent.Pressed, function() {
        if (statoCorrente === STATO_IN_ATTESA) {
            statoCorrente = STATO_AVANZAMENTO;
            // Esegui azioni di ingresso per STATO_AVANZAMENTO
        }
    });
    ```
    In questo caso, la funzione `eseguiFSM` si concentrerebbe solo sulle azioni *durante* lo stato, mentre le transizioni sarebbero gestite dagli `onEvent`.

*   **Timer per Transizioni**: Alcune transizioni potrebbero dipendere dal tempo trascorso in uno stato.

## Esempio Pratico: Robot Semplice che Pattuglia

Immaginiamo un robot che:
1.  **STATO_AVANTI**: Va avanti finché non incontra un ostacolo.
2.  **STATO_GIRA**: Se incontra un ostacolo, gira a destra per un certo tempo/angolo.
3.  Poi torna a **STATO_AVANTI**.

```javascript
const STATO_AVANTI = 1;
const STATO_GIRA = 2;

let statoCorrente = STATO_AVANTI;
let tempoInizioGiro = 0;
const DURATA_GIRO_MS = 1500; // Gira per 1.5 secondi

function robotPattugliaFSM() {
    switch (statoCorrente) {
        case STATO_AVANTI:
            brick.showString("Avanti", 2);
            motors.largeBC.run(60);
            if (sensors.ultrasonic1.distance() < 20) {
                statoCorrente = STATO_GIRA;
                motors.largeBC.stop(); // Ferma prima di girare
                brick.showString("Gira ->", 3);
                motors.largeB.run(40);  // Gira a destra
                motors.largeC.run(-40);
                tempoInizioGiro = control.millis(); // Registra tempo inizio giro
            }
            break;

        case STATO_GIRA:
            brick.showString("Gira...", 2);
            // L'azione di girare è già stata avviata all'ingresso dello stato
            if (control.millis() - tempoInizioGiro > DURATA_GIRO_MS) {
                statoCorrente = STATO_AVANTI;
                motors.largeBC.stop(); // Ferma la rotazione
                brick.showString("Avanti ->", 3);
            }
            break;
    }
}

loops.forever(function() {
    robotPattugliaFSM();
    pause(50);
});

brick.showString("Pattuglia FSM", 1);
```

## Conclusione

Le Macchine a Stati Finiti offrono un modo robusto e organizzato per programmare comportamenti complessi nei robot EV3. Separando la logica in stati e transizioni, si ottengono programmi più facili da progettare, comprendere e mantenere. Man mano che i tuoi progetti diventano più ambiziosi, l'approccio FSM diventerà uno strumento prezioso nel tuo arsenale di programmazione.

---

[Torna all'elenco delle Guide](./README.md)

[Torna al Modulo 10](../README.md)

[Torna alla Home del Corso](../../README.md)