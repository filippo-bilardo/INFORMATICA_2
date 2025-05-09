# Guida 2: Macchine a Stati Finite (FSM)

## Introduzione

Una Macchina a Stati Finita (Finite State Machine - FSM), o automa a stati finiti, è un modello matematico di calcolo utilizzato per progettare sistemi digitali e programmi per computer. Una FSM è un sistema che può trovarsi in uno di un numero finito di stati in un dato momento. Il sistema può passare da uno stato all'altro in risposta a determinati input o eventi esterni; questa transizione è chiamata, appunto, transizione.

Nella programmazione robotica, le FSM sono estremamente utili per gestire comportamenti complessi e sequenziali. Permettono di definire chiaramente i diversi modi operativi del robot (stati) e le condizioni che causano il passaggio da un modo all'altro (transizioni).

## Componenti di una FSM

Una FSM è tipicamente definita da:

1.  **Stati (States):** Un insieme finito di condizioni in cui il sistema può trovarsi. Ogni stato rappresenta una fase specifica del comportamento del robot.
    *   Esempio: `IN_ATTESA`, `ESPLORAZIONE`, `SEGUI_LINEA`, `EVITA_OSTACOLO`, `RITORNO_ALLA_BASE`.

2.  **Stato Iniziale (Initial State):** Lo stato in cui la FSM si trova all'avvio.

3.  **Stato Finale (Final State(s)) (opzionale):** Uno o più stati che indicano il completamento dell'operazione della FSM.

4.  **Input/Eventi (Inputs/Events):** Gli stimoli esterni o le condizioni interne che possono causare una transizione di stato.
    *   Esempio: `SENSORE_TOCCO_PREMUTO`, `DISTANZA_MINIMA_RAGGIUNTA`, `LINEA_PERSA`, `BATTERIA_SCARICA`.

5.  **Transizioni (Transitions):** Regole che definiscono da quale stato a quale altro stato la macchina si sposta, dato lo stato corrente e un input/evento.
    *   Esempio: Se nello stato `SEGUI_LINEA` e l'evento è `OSTACOLO_RILEVATO`, transita allo stato `EVITA_OSTACOLO`.

6.  **Azioni (Actions):** Operazioni che vengono eseguite quando:
    *   **Si entra in uno stato (Entry Action):** Eseguita quando la FSM transita *in* un nuovo stato.
    *   **Si esce da uno stato (Exit Action):** Eseguita quando la FSM transita *fuori* da uno stato.
    *   **Durante una transizione (Transition Action):** Eseguita quando avviene una specifica transizione.
    *   **All'interno di uno stato (State Action/Activity):** Eseguita continuamente o periodicamente mentre la FSM è *in* un determinato stato.

## Vantaggi dell'Uso delle FSM

*   **Chiarezza e Organizzazione:** Scompongono comportamenti complessi in parti gestibili (stati e transizioni).
*   **Manutenibilità:** È più facile modificare o estendere il comportamento del robot aggiungendo o modificando stati e transizioni.
*   **Prevedibilità:** Il comportamento del sistema è ben definito e più facile da analizzare e debuggare.
*   **Riusabilità:** Gli stati e le logiche di transizione possono essere riutilizzati in diversi contesti.

## Implementazione di una FSM in JavaScript per EV3

Ci sono diversi modi per implementare una FSM in JavaScript. Un approccio comune utilizza una variabile per tenere traccia dello stato corrente e una struttura `switch` (o `if-else if`) per gestire la logica di ogni stato e le transizioni.

### Struttura di Base

```javascript
// Definizione degli stati (usando un oggetto per enumerarli)
const StatiRobot = {
  INATTIVO: 0,
  IN_ATTESA_COMANDO: 1,
  MOVIMENTO_AVANTI: 2,
  EVITAMENTO_OSTACOLO: 3,
  ERRORE: 4
};

// Variabile per lo stato corrente
let statoCorrente = StatiRobot.INATTIVO;

// Funzione principale del ciclo della FSM (da chiamare ripetutamente o in un loop)
function cicloFSM() {
  // Logica specifica per ogni stato
  switch (statoCorrente) {
    case StatiRobot.INATTIVO:
      azioneStatoInattivo();
      // Controlla transizioni dallo stato INATTIVO
      if (brick.buttonEnter.wasPressed()) {
        transizioneA(StatiRobot.IN_ATTESA_COMANDO);
      }
      break;

    case StatiRobot.IN_ATTESA_COMANDO:
      azioneStatoAttesaComando();
      // Controlla transizioni
      if (sensors.touch1.isPressed()) {
        transizioneA(StatiRobot.MOVIMENTO_AVANTI);
      } else if (/* condizione di errore */ false) {
        transizioneA(StatiRobot.ERRORE);
      }
      break;

    case StatiRobot.MOVIMENTO_AVANTI:
      azioneStatoMovimentoAvanti();
      if (sensors.ultrasonic1.distance() < 15) { // Ostacolo rilevato
        transizioneA(StatiRobot.EVITAMENTO_OSTACOLO);
      }
      break;

    case StatiRobot.EVITAMENTO_OSTACOLO:
      azioneStatoEvitamentoOstacolo();
      // Esempio: dopo aver evitato, torna in attesa
      if (/* ostacolo evitato */ true && control.millis() % 5000 < 100) { // Simula completamento dopo un po'
         transizioneA(StatiRobot.IN_ATTESA_COMANDO);
      }
      break;

    case StatiRobot.ERRORE:
      azioneStatoErrore();
      // Potrebbe rimanere in errore o permettere un reset
      break;
  }
  brick.showString("Stato: " + statoCorrente, 10); // Mostra lo stato corrente
}

// Funzione per gestire le transizioni (con azioni di uscita/entrata)
function transizioneA(nuovoStato) {
  brick.showString("Trans: " + statoCorrente + " -> " + nuovoStato, 1);
  
  // Azioni di Uscita (opzionali)
  switch (statoCorrente) {
    case StatiRobot.MOVIMENTO_AVANTI:
      motors.largeBC.stop(); // Ferma i motori uscendo da MOVIMENTO_AVANTI
      break;
    // ... altre azioni di uscita
  }

  statoCorrente = nuovoStato;

  // Azioni di Entrata (opzionali)
  switch (statoCorrente) {
    case StatiRobot.INATTIVO:
      brick.clearScreen();
      brick.showString("Robot Inattivo", 5);
      break;
    case StatiRobot.IN_ATTESA_COMANDO:
      brick.showString("Attendo comando...", 5);
      sound.playTone(300, 100);
      break;
    case StatiRobot.MOVIMENTO_AVANTI:
      brick.showString("Movimento Avanti!", 5);
      motors.largeBC.run(50);
      break;
    case StatiRobot.EVITAMENTO_OSTACOLO:
      brick.showString("Evito Ostacolo!", 5);
      // Logica di evitamento (es. gira)
      motors.largeB.run(-30);
      motors.largeC.run(30);
      pause(500); // Breve manovra
      motors.largeBC.stop();
      break;
    case StatiRobot.ERRORE:
      brick.showString("ERRORE!", 5);
      sound.beep();
      motors.stopAll();
      break;
  }
}

// Azioni specifiche per ogni stato (da definire)
function azioneStatoInattivo() { /* es. non fare nulla, display spento */ }
function azioneStatoAttesaComando() { /* es. lampeggia un LED */ }
function azioneStatoMovimentoAvanti() { /* es. controlla velocità, monitora sensori per affinamenti */ }
function azioneStatoEvitamentoOstacolo() { /* es. completa manovra di evitamento */ }
function azioneStatoErrore() { /* es. logga errore, attendi reset */ }

// Avvio della FSM
transizioneA(StatiRobot.INATTIVO); // Imposta lo stato iniziale ed esegue azioni di entrata

// Ciclo principale del programma
forever(function () {
  cicloFSM();
  pause(50); // Breve pausa per non sovraccaricare la CPU e permettere ad altri eventi di essere processati
});

```

### Spiegazione dell'Esempio:

1.  **`StatiRobot`**: Un oggetto enumera gli stati possibili per migliorare la leggibilità.
2.  **`statoCorrente`**: Memorizza lo stato attuale della FSM.
3.  **`cicloFSM()`**: Questa è la funzione principale che viene chiamata ripetutamente. Al suo interno, uno `switch` gestisce la logica per lo `statoCorrente`.
    *   **Azioni di Stato:** Chiama una funzione specifica (es. `azioneStatoMovimentoAvanti()`) che contiene la logica da eseguire mentre si è in quello stato.
    *   **Controllo Transizioni:** Verifica le condizioni (basate su input dei sensori, timer, ecc.) per passare a un nuovo stato. Se una condizione è vera, chiama `transizioneA()`.
4.  **`transizioneA(nuovoStato)`**: Questa funzione gestisce il cambio di stato.
    *   **Azioni di Uscita:** Prima di cambiare `statoCorrente`, può eseguire azioni specifiche per lo stato che si sta lasciando (es. fermare i motori).
    *   **Cambio Stato:** Aggiorna `statoCorrente` al `nuovoStato`.
    *   **Azioni di Entrata:** Dopo aver cambiato stato, esegue azioni specifiche per il nuovo stato in cui si è entrati (es. avviare motori, mostrare un messaggio).
5.  **`azioneStato...()`**: Funzioni separate per la logica di ciascuno stato. Questo mantiene il `cicloFSM()` più pulito.
6.  **Avvio:** La FSM viene inizializzata chiamando `transizioneA()` con lo stato iniziale.
7.  **Loop Principale:** `forever` (o un `while(true)` con `pause`) chiama `cicloFSM()` continuamente.

## Considerazioni per Robot EV3

*   **Polling vs. Eventi:** L'esempio sopra usa un approccio basato sul polling all'interno di ogni stato per verificare le condizioni di transizione. In alcuni casi, si potrebbe integrare con la programmazione guidata dagli eventi di MakeCode. Ad esempio, un evento di un sensore potrebbe direttamente chiamare `transizioneA()` se le condizioni sono soddisfatte, invece di aspettare il controllo nel `cicloFSM()`.
*   **Complessità:** Per FSM molto complesse, con molti stati e transizioni, la struttura `switch` può diventare grande. Si potrebbero esplorare pattern più avanzati (come il pattern State) se necessario, ma per la maggior parte dei progetti EV3, l'approccio `switch` è sufficiente.
*   **Debug:** Visualizzare lo stato corrente sul display dell'EV3 (come nell'esempio `brick.showString("Stato: " + statoCorrente, 10);`) è molto utile per il debug.
*   **Timer e Timeout:** Spesso le transizioni dipendono dal tempo. Si possono usare `control.millis()` o `pause()` per implementare logiche basate sul tempo.

## Esempio Pratico: Robot che Cerca e Raccoglie un Oggetto

Immagina un robot con i seguenti stati:
1.  `RICERCA`: Il robot si muove esplorando l'area.
2.  `AVVICINAMENTO`: Il robot ha rilevato un oggetto (es. con sensore ultrasuoni) e si avvicina.
3.  `RACCOLTA`: Il robot tenta di raccogliere l'oggetto (es. chiudendo una pinza motorizzata).
4.  `RITORNO`: Il robot torna alla base con l'oggetto.
5.  `DEPOSITO`: Il robot deposita l'oggetto.

Ogni stato avrebbe le sue azioni e le sue transizioni:
*   Da `RICERCA`, se oggetto rilevato -> `AVVICINAMENTO`.
*   Da `AVVICINAMENTO`, se abbastanza vicino -> `RACCOLTA`.
*   Da `RACCOLTA`, se oggetto raccolto -> `RITORNO`. Se fallisce -> `RICERCA` o `ERRORE_RACCOLTA`.
*   ...

## Conclusione

Le Macchine a Stati Finite sono uno strumento potente per strutturare il comportamento dei robot. Definendo chiaramente stati, transizioni e azioni, puoi creare programmi EV3 più robusti, comprensibili e facili da modificare. L'approccio basato su una variabile di stato e uno `switch` centrale è un modo efficace per implementare FSM in JavaScript su MakeCode per EV3.

---

[Torna al README del Modulo 10](../README.md)

[Torna all'indice del corso](../../README.md)