# Guida 1: Panoramica dei Sensori EV3

In questa guida, esploreremo i diversi tipi di sensori disponibili per il robot Lego Mindstorms EV3 e le loro funzionalità principali. Comprendere i sensori è fondamentale per permettere al robot di interagire con l'ambiente.

## Tipi di Sensori EV3

Il kit Lego Mindstorms EV3 include una varietà di sensori, ognuno con uno scopo specifico:

1.  **Sensore di Contatto (Touch Sensor)**:
    *   Rileva quando viene premuto o rilasciato.
    *   Può anche contare il numero di pressioni.
    *   Utile per rilevare ostacoli, attivare azioni al tocco, ecc.

2.  **Sensore di Colore (Color Sensor)**:
    *   Rileva i colori (fino a 7 colori distinti più "nessun colore").
    *   Misura l'intensità della luce riflessa (utile per seguire linee nere su sfondo bianco).
    *   Misura l'intensità della luce ambientale.

3.  **Sensore a Ultrasuoni (Ultrasonic Sensor)**:
    *   Misura la distanza da un oggetto emettendo onde sonore e misurando il tempo di ritorno dell'eco.
    *   Può rilevare la presenza di altri sensori a ultrasuoni attivi (modalità "Listen").
    *   Utile per evitare ostacoli, misurare distanze, ecc.

4.  **Sensore Giroscopio (Gyro Sensor)**:
    *   Misura l'angolo di rotazione e la velocità di rotazione su un singolo asse.
    *   Fondamentale per robot che devono mantenere l'equilibrio, girare di angoli precisi o rilevare l'orientamento.

5.  **Sensore a Infrarossi (Infrared Sensor) e Beacon Telecomandato**:
    *   **Modalità Prossimità**: Misura la distanza da oggetti vicini (fino a circa 70 cm).
    *   **Modalità Beacon**: Rileva la posizione (direzione e distanza approssimativa) del beacon a infrarossi incluso nel kit.
    *   Il beacon ha 4 canali e può inviare segnali che il sensore può ricevere, permettendo un controllo remoto di base.

## Utilizzo dei Sensori in MakeCode

MakeCode per EV3 fornisce blocchi specifici (e le corrispondenti API JavaScript) per leggere i dati da ciascuno di questi sensori. Generalmente, si accede ai valori dei sensori attraverso le porte di input del brick EV3 (Porte 1, 2, 3, 4).

Nelle guide successive di questo modulo, approfondiremo ciascun sensore individualmente, mostrando come leggerne i dati e come utilizzarli in scenari pratici.

## Considerazioni Generali

*   **Porte**: Assicurati che i sensori siano collegati alle porte corrette del brick EV3 e che il programma faccia riferimento alla porta corretta.
*   **Accuratezza**: L'accuratezza dei sensori può essere influenzata da fattori ambientali (luce, tipo di superficie, ecc.).
*   **Polling vs Eventi**: I dati dei sensori possono essere letti ciclicamente (polling) o il programma può reagire a cambiamenti specifici rilevati dai sensori (event-driven).

Questa panoramica dovrebbe darti una buona base per iniziare a esplorare le capacità sensoriali del tuo robot EV3.

---

[Torna all'elenco delle Guide](./README.md)
[Torna al Modulo 07](../README.md)
[Torna alla Home del Corso](../../../README.md)