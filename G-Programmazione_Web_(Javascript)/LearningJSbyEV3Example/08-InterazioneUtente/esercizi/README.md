# Esercizi: Interazione Utente e Interfacce

Questi esercizi ti aiuteranno a mettere in pratica la creazione di interfacce utente e modalità di interazione con il tuo robot EV3.

## Elenco Esercizi

1.  **Esercizio 1: Quiz Interattivo**
    *   **Obiettivo**: Sviluppare un quiz interattivo dove l'EV3 pone domande e l'utente risponde tramite i pulsanti.
    *   **Dettagli**:
        *   Visualizzare domande sul display dell'EV3.
        *   Utilizzare i pulsanti per selezionare le risposte (es. Vero/Falso, A/B/C).
        *   Fornire feedback immediato (corretto/errato) e tenere traccia del punteggio.
    *   **Concetti da Applicare**: Gestione del display, gestione eventi dei pulsanti, logica condizionale, variabili.
    *   **File**: [`01_QuizInterattivo.js`](./01_QuizInterattivo.js)

2.  **Esercizio 2: Robot Telecomandato**
    *   **Obiettivo**: Programmare l'EV3 per essere controllato a distanza tramite i pulsanti del brick.
    *   **Dettagli**:
        *   Pulsante Su: Movimento in avanti.
        *   Pulsante Giù: Movimento all'indietro.
        *   Pulsante Sinistra: Rotazione a sinistra.
        *   Pulsante Destra: Rotazione a destra.
        *   Pulsante Centrale (Enter): Arresto del robot.
        *   Visualizzare lo stato del movimento sul display.
    *   **Concetti da Applicare**: Controllo dei motori, gestione eventi dei pulsanti, feedback sul display.
    *   **File**: [`02_RobotTelecomandato.js`](./02_RobotTelecomandato.js)

3.  **Esercizio 3: Menu di Navigazione Avanzato**
    *   **Obiettivo**: Creare un menu più complesso sul display EV3, navigabile con i pulsanti, che permetta di selezionare diverse modalità di funzionamento del robot (es. "Modalità Esplorazione", "Modalità Segui Linea", "Modalità Danza").
    *   **Dettagli**:
        *   Il menu deve mostrare più opzioni, magari scorribili se non entrano tutte nel display.
        *   Usa i pulsanti Su/Giù per navigare tra le opzioni e il pulsante Enter per selezionare.
        *   Una volta selezionata un'opzione, il robot dovrebbe entrare nella modalità corrispondente (puoi simulare le modalità con semplici azioni o messaggi sul display per ora).
        *   Prevedi un'opzione "Indietro" o "Esci" per tornare al menu principale o uscire.
    *   **Concetti da Applicare**: Gestione avanzata del display, gestione eventi pulsanti, logica di menu, (opzionale) macchine a stati per le modalità.
    *   **File**: [`03_MenuNavigazioneAvanzato.js`](./03_MenuNavigazioneAvanzato.js)

4.  **Esercizio 4: Feedback Multimodale Complesso**
    *   **Obiettivo**: Fornire un feedback visivo (LED, display) e sonoro chiaro sullo stato e sulle azioni del robot.
    *   **Dettagli**:
        *   Quando il robot si muove in avanti, accendi i LED del brick di verde e visualizza "AVANTI".
        *   Quando il robot gira, fai lampeggiare i LED del lato verso cui sta girando e visualizza "GIRA SINISTRA/DESTRA".
        *   Quando il robot è fermo, i LED sono spenti o di un colore neutro (es. arancione) e visualizza "FERMO".
        *   In caso di eventi specifici (es. ostacolo rilevato), fornire feedback sonoro e visivo appropriato.
    *   **Concetti da Applicare**: Controllo motori, controllo LED, display, suoni, (opzionale) gestione sensori, sincronizzazione feedback.
    *   **File**: [`04_FeedbackMultimodaleComplesso.js`](./04_FeedbackMultimodaleComplesso.js)

5.  **Esercizio 5: Progetto Allarme Domestico Semplice**
    *   **Obiettivo**: Implementare la logica per un semplice sistema di allarme domestico utilizzando l'EV3.
    *   **Dettagli**:
        *   L'allarme si attiva/disattiva tramite un codice inserito con i pulsanti.
        *   Un "sensore" (es. pulsante Enter o un sensore reale) fa scattare l'allarme se attivo.
        *   All'attivazione dell'allarme: suono, luci rosse lampeggianti, messaggio "INTRUSIONE!" sul display.
    *   **Concetti da Applicare**: Gestione input utente, logica di stato (allarme attivo/disattivo), gestione eventi, feedback multimodale (suoni, luci, display).
    *   **File**: [`05_ProgettoAllarmeDomestico.js`](./05_ProgettoAllarmeDomestico.js)

## Come Svolgere gli Esercizi

1.  Scegli un esercizio dall'elenco.
2.  Apri il file `.js` corrispondente in MakeCode o crea un nuovo progetto se preferisci partire da zero basandoti sulla descrizione.
3.  Pianifica l'interfaccia utente e la logica di interazione.
4.  Implementa e testa frequentemente sul tuo robot EV3.

Sperimenta con diverse combinazioni di input e output per creare interazioni utente intuitive e utili!

---

[Torna al Modulo 08](../README.md)

[Torna alla Home del Corso](../../README.md)