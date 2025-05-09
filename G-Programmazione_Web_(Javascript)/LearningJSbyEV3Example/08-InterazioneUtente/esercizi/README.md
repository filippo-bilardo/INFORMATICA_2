# Esercizi: Interazione Utente e Interfacce

Questi esercizi ti aiuteranno a mettere in pratica la creazione di interfacce utente e modalità di interazione con il tuo robot EV3.

## Elenco Esercizi

1.  **Esercizio 1: Semaforo Controllato da Pulsanti**
    *   **Obiettivo**: Simulare un semaforo utilizzando i LED del brick EV3 (o luci esterne se disponibili) e controllarlo tramite i pulsanti.
    *   **Dettagli**:
        *   Usa i pulsanti Su, Giù, Sinistra, Destra per rappresentare diversi stati o comandi.
        *   Pulsante Su: Attiva la luce Verde.
        *   Pulsante Giù: Attiva la luce Rossa.
        *   Pulsante Sinistra: Attiva la luce Gialla.
        *   Pulsante Destra: Ciclo automatico (Rosso -> Giallo -> Verde -> Giallo -> Rosso).
        *   Visualizza lo stato corrente del semaforo sul display EV3.
    *   **Concetti da Applicare**: Gestione eventi dei pulsanti, controllo LED, display, logica condizionale.
    *   **File Suggerito**: `Esercizio_SemaforoPulsanti.js`

2.  **Esercizio 2: Robot Parlante Semplice**
    *   **Obiettivo**: Far "parlare" il robot EV3 emettendo diverse sequenze di suoni o toni in risposta a input dai sensori o pulsanti.
    *   **Dettagli**:
        *   Definisci diverse "frasi" o "emozioni" come sequenze di toni (es. un suono allegro, un suono triste, un suono di conferma).
        *   Associa queste "frasi" a eventi specifici:
            *   Pressione del sensore di contatto: Suono di "Ahi!".
            *   Rilevamento di un oggetto vicino (sensore ultrasuoni): Suono di "Attenzione!".
            *   Pressione di un pulsante del brick: Suono di "Ciao!".
        *   Visualizza un messaggio corrispondente sul display.
    *   **Concetti da Applicare**: Controllo suoni, gestione eventi (pulsanti, sensori), display.
    *   **File Suggerito**: `Esercizio_RobotParlante.js`

3.  **Esercizio 3: Menu di Navigazione Avanzato**
    *   **Obiettivo**: Creare un menu più complesso sul display EV3, navigabile con i pulsanti, che permetta di selezionare diverse modalità di funzionamento del robot (es. "Modalità Esplorazione", "Modalità Segui Linea", "Modalità Danza").
    *   **Dettagli**:
        *   Il menu deve mostrare più opzioni, magari scorribili se non entrano tutte nel display.
        *   Usa i pulsanti Su/Giù per navigare tra le opzioni e il pulsante Enter per selezionare.
        *   Una volta selezionata un'opzione, il robot dovrebbe entrare nella modalità corrispondente (puoi simulare le modalità con semplici azioni o messaggi sul display per ora).
        *   Prevedi un'opzione "Indietro" o "Esci" per tornare al menu principale o uscire.
    *   **Concetti da Applicare**: Gestione avanzata del display, gestione eventi pulsanti, logica di menu, (opzionale) macchine a stati per le modalità.
    *   **File Suggerito**: `Esercizio_MenuAvanzato.js`

4.  **Esercizio 4: Feedback Visivo con LED e Display per Movimenti**
    *   **Obiettivo**: Fornire un feedback visivo chiaro sullo stato e sulle azioni del robot durante il movimento.
    *   **Dettagli**:
        *   Quando il robot si muove in avanti, accendi i LED del brick di verde.
        *   Quando il robot gira, fai lampeggiare i LED del lato verso cui sta girando (es. LED sinistro per girare a sinistra).
        *   Quando il robot è fermo, i LED sono spenti o di un colore neutro (es. arancione).
        *   Visualizza sul display la direzione corrente del movimento (es. "AVANTI", "DESTRA", "FERMO").
    *   **Concetti da Applicare**: Controllo motori, controllo LED, display, sincronizzazione feedback con azioni.
    *   **File Suggerito**: `Esercizio_FeedbackMovimento.js`

## Come Svolgere gli Esercizi

1.  Crea un nuovo file `.js` per ogni esercizio in MakeCode.
2.  Pianifica l'interfaccia utente e la logica di interazione.
3.  Implementa e testa frequentemente sul tuo robot EV3.

Sperimenta con diverse combinazioni di input e output per creare interazioni utente intuitive e utili!

---

[Torna al Modulo 08](../README.md)

[Torna alla Home del Corso](../../README.md)