# Esercizi: Gestione Dati e Strutture Dati

Questi esercizi ti aiuteranno a mettere in pratica la gestione di array, oggetti e altre strutture dati in JavaScript, applicati alla programmazione del robot EV3.

## Elenco Esercizi

1.  **Esercizio 1: Registro dei Movimenti del Robot**
    *   **Obiettivo**: Creare un programma che registra una sequenza di movimenti del robot (es. avanti, gira a destra, avanti, gira a sinistra) in un array. Successivamente, il robot deve rieseguire la sequenza registrata.
    *   **Dettagli**:
        *   Usa i pulsanti del brick EV3 per registrare i comandi (es. Su = Avanti, Destra = Gira a Destra, Sinistra = Gira a Sinistra, Giù = Termina Registrazione ed Esegui).
        *   Ogni comando può essere un oggetto con proprietà come `{ azione: "avanti", durata: 1000 }` o `{ azione: "gira", direzione: "destra", angolo: 90 }`.
        *   Memorizza questi oggetti in un array.
        *   Una volta terminata la registrazione, itera sull'array ed esegui i comandi.
    *   **Concetti da Applicare**: Array, oggetti, gestione eventi dei pulsanti, cicli, controllo motori.
    *   **File Suggerito**: `Esercizio_RegistroMovimenti.js`

2.  **Esercizio 2: Configurazione del Robot Tramite Oggetto**
    *   **Obiettivo**: Definire un oggetto JavaScript che contenga i parametri di configurazione del robot (es. velocità di movimento, velocità di rotazione, porta del sensore di colore). Utilizzare questo oggetto per controllare il comportamento del robot.
    *   **Dettagli**:
        *   Crea un oggetto `configRobot` con proprietà come `velocitaMovimento: 50`, `velocitaRotazione: 30`, `portaSensoreColore: sensors.color1`.
        *   Scrivi funzioni che prendono questo oggetto di configurazione (o sue parti) come parametro per eseguire azioni (es. `muoviAvanti(config, durata)`).
        *   Permetti all'utente di modificare alcuni parametri di configurazione tramite i pulsanti del brick (es. aumentare/diminuire la velocità) e aggiorna l'oggetto `configRobot` di conseguenza.
    *   **Concetti da Applicare**: Oggetti, passaggio di parametri, modifica di proprietà degli oggetti.
    *   **File Suggerito**: `Esercizio_ConfigRobot.js`

3.  **Esercizio 3: Mappatura Semplice dell'Ambiente**
    *   **Obiettivo**: Il robot esplora un'area limitata e tenta di "mappare" la posizione degli ostacoli rilevati con il sensore a ultrasuoni. La mappa può essere un semplice array di array (griglia) o un array di coordinate.
    *   **Dettagli**:
        *   Il robot si muove in una direzione. Quando rileva un ostacolo, registra la sua posizione approssimativa (puoi semplificare usando un sistema di coordinate relativo al punto di partenza del robot).
        *   La "mappa" può essere un array di oggetti, dove ogni oggetto rappresenta un ostacolo con le sue coordinate `{x: valore, y: valore}`.
        *   Visualizza le coordinate degli ostacoli rilevati sulla console di MakeCode.
    *   **Concetti da Applicare**: Array, oggetti, gestione dati da sensori, logica di movimento, (opzionale) calcoli geometrici semplici.
    *   **Sfida Aggiuntiva**: Prova a far sì che il robot eviti gli ostacoli già mappati se li incontra di nuovo.
    *   **File Suggerito**: `Esercizio_MappaturaSemplice.js`

4.  **Esercizio 4: Media Mobile delle Letture del Sensore**
    *   **Obiettivo**: Implementare un filtro a media mobile per "smussare" le letture di un sensore (es. sensore di colore o ultrasuoni). Questo è utile per ridurre il rumore e ottenere valori più stabili.
    *   **Dettagli**:
        *   Mantieni un array (una "finestra") delle ultime N letture del sensore.
        *   Ad ogni nuova lettura, aggiungila all'array e, se l'array supera la dimensione N, rimuovi la lettura più vecchia.
        *   Calcola la media dei valori nell'array e usa questa media come valore "filtrato" del sensore.
        *   Visualizza sia la lettura grezza che quella filtrata sulla console o sul display dell'EV3.
    *   **Concetti da Applicare**: Array (come coda/buffer circolare), calcoli numerici, gestione dati da sensori.
    *   **File Suggerito**: `Esercizio_MediaMobileSensore.js`

## Come Svolgere gli Esercizi

1.  Crea un nuovo file `.js` per ogni esercizio in MakeCode.
2.  Leggi attentamente i requisiti.
3.  Pianifica la struttura dei tuoi dati e la logica del programma.
4.  Testa il tuo codice frequentemente sul robot EV3.

Buon divertimento con la gestione dei dati!

---

[Torna al Modulo 09](../README.md)

[Torna alla Home del Corso](../../README.md)