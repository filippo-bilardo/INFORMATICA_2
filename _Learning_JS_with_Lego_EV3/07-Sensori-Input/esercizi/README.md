# Esercizi: Sensori e Input

Questi esercizi sono progettati per aiutarti a familiarizzare con l'uso dei diversi sensori del Lego EV3 e la gestione degli input in JavaScript.

## Elenco Esercizi

1.  **Esercizio 1: Robot Evita-Ostacoli Intelligente** (`01_RobotEvitaOstacoli.js`)
    *   **Obiettivo**: Programmare il robot per muoversi in un'area evitando gli ostacoli rilevati dal sensore a ultrasuoni. Quando un ostacolo è vicino, il robot dovrebbe fermarsi, indietreggiare leggermente, girarsi di un angolo casuale (o fisso) e poi riprendere il movimento.
    *   **Sensori**: Sensore a ultrasuoni, motori.
    *   **Concetti da Applicare**: Lettura sensore ultrasuoni, controllo motori, logica condizionale, (opzionale) generazione numeri casuali per la rotazione.

2.  **Esercizio 2: Segui-Linea Semplice** (`02_SeguiLinea.js`)
    *   **Obiettivo**: Implementare un algoritmo base per far seguire al robot una linea nera su una superficie bianca (o viceversa) utilizzando il sensore di colore in modalità luce riflessa.
    *   **Sensori**: Sensore di colore (modalità luce riflessa), motori.
    *   **Concetti da Applicare**: Lettura sensore di colore, logica proporzionale semplice (se la linea è a sinistra, gira a sinistra; se è a destra, gira a destra), controllo motori differenziale.

3.  **Esercizio 3: Robot Controllato da Telecomando IR**
    *   **Obiettivo**: Utilizzare il sensore a infrarossi e il beacon IR per controllare i movimenti base del robot (avanti, indietro, gira a sinistra, gira a destra).
    *   **Sensori**: Sensore a infrarossi (modalità beacon), motori.
    *   **Concetti da Applicare**: Lettura dei canali del beacon IR, associazione dei comandi del beacon ai movimenti del robot.
    *   **File Suggerito**: `Esercizio_ControlloRemotoIR.js`

4.  **Esercizio 4: Allarme Intrusione con Sensore di Contatto**
    *   **Obiettivo**: Creare un semplice sistema di allarme. Se il sensore di contatto viene premuto (simulando l'apertura di una porta o un intruso), il robot emette un suono di allarme e accende i LED del brick.
    *   **Sensori**: Sensore di contatto.
    *   **Concetti da Applicare**: Gestione eventi del sensore di contatto, feedback sonoro e visivo.
    *   **File Suggerito**: `Esercizio_AllarmeContatto.js`

5.  **Esercizio 5: Equilibrista con Giroscopio (Concettuale)**
    *   **Obiettivo**: (Più avanzato e concettuale, la piena implementazione è complessa) Utilizzare il sensore giroscopio per tentare di mantenere il robot in equilibrio su due ruote (se la costruzione lo permette) o per reagire a inclinazioni.
    *   **Sensori**: Sensore giroscopio, motori.
    *   **Concetti da Applicare**: Lettura dell'angolo dal giroscopio, logica di controllo per correggere l'inclinazione (es. muovendo i motori avanti/indietro).
    *   **File Suggerito**: `Esercizio_EquilibristaGiro.js`

## Come Svolgere gli Esercizi

1.  Per ogni esercizio, crea un nuovo file JavaScript in MakeCode.
2.  Leggi attentamente l'obiettivo e i concetti da applicare.
3.  Scrivi il codice, testandolo progressivamente sul tuo robot EV3.
4.  Non esitare a consultare le guide teoriche e gli esempi del modulo.

Buon divertimento con i sensori!

---

[Torna al Modulo 07](../README.md)

[Torna alla Home del Corso](../../README.md)