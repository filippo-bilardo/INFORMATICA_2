# Esercizi: Programmazione Avanzata

In questa sezione troverai esercizi progettati per aiutarti a mettere in pratica i concetti di programmazione avanzata discussi nel Modulo 10.

## Elenco Esercizi

1.  **Esercizio 1: Robot Sentinella con Macchina a Stati**
    *   **Obiettivo**: Implementare un robot che pattuglia un'area e reagisce a un "intruso" (rilevato dal sensore a ultrasuoni) cambiando stato.
    *   **Stati Suggeriti**:
        *   `PATTUGLIAMENTO`: Il robot si muove avanti e indietro o in un percorso definito.
        *   `ALLARME`: Se rileva un oggetto troppo vicino, il robot si ferma, emette un suono e accende i LED del brick.
        *   `ATTESA`: Dopo l'allarme, attende un breve periodo prima di tornare a `PATTUGLIAMENTO`.
    *   **Concetti da Applicare**: Macchine a Stati Finite (FSM), programmazione guidata dagli eventi (per il sensore), controllo motori, feedback utente (suoni, luci).
    *   **File Suggerito**: `Esercizio_RobotSentinella.js`

2.  **Esercizio 2: Classe `RobotComponent` (OOP)**
    *   **Obiettivo**: Creare una classe base `RobotComponent` in JavaScript e poi derivare classi specifiche per i sensori (es. `UltrasonicSensor`, `ColorSensor`) e i motori (es. `MotorPair`).
    *   **Funzionalità della Classe Base**: Potrebbe includere proprietà come `port` e metodi generici come `getStatus()`.
    *   **Funzionalità delle Classi Derivate**:
        *   `UltrasonicSensor`: Metodo `getDistanceCm()`.
        *   `ColorSensor`: Metodo `getColor()`.
        *   `MotorPair`: Metodi `drive(speed, steering)`, `stop()`.
    *   **Scopo**: Sperimentare con l'organizzazione del codice tramite OOP, anche se MakeCode non supporta pienamente le classi come in altri ambienti JS.
    *   **File Suggerito**: `Esercizio_OOPComponents.js`

3.  **Esercizio 3: Navigatore Semplice con Gestione Errori**
    *   **Obiettivo**: Programmare il robot per seguire un percorso predefinito (es. muoversi in un quadrato) e implementare una gestione base degli errori se un sensore (es. di contatto) rileva un ostacolo imprevisto.
    *   **Comportamento**: Il robot tenta di seguire il percorso. Se tocca un ostacolo, si ferma, fa un piccolo passo indietro, si gira leggermente e tenta di riprendere il percorso o segnala l'impossibilità di proseguire.
    *   **Concetti da Applicare**: Controllo motori di precisione, gestione eventi (sensore di contatto), gestione errori (try-catch concettuale o logica if-else per gestire l'ostacolo).
    *   **File Suggerito**: `Esercizio_NavigatoreErrori.js`

## Come Svolgere gli Esercizi

1.  Leggi attentamente la descrizione di ciascun esercizio.
2.  Pianifica la logica del tuo programma prima di iniziare a scrivere codice.
3.  Crea un nuovo file JavaScript in MakeCode per ogni esercizio.
4.  Implementa la soluzione, testandola frequentemente sul tuo robot EV3.
5.  Non aver paura di sperimentare e di consultare le guide e gli esempi del modulo se necessario.

Buon lavoro!

---

[Torna al Modulo 10](../README.md)

[Torna alla Home del Corso](../../README.md)