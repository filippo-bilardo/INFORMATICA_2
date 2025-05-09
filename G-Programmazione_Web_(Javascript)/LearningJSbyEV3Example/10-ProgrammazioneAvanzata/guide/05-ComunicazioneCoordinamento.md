# Guida 5: Comunicazione e Coordinamento (Concetti)

## Introduzione

La capacità di comunicare e coordinare azioni tra più robot, o tra un robot e un sistema esterno (come un computer), apre la porta a comportamenti collaborativi e soluzioni a problemi complessi che un singolo robot non potrebbe affrontare. Sebbene MakeCode per EV3 non offra funzionalità di comunicazione di rete diretta (come Wi-Fi o Bluetooth per lo scambio di dati arbitrari tra brick), possiamo esplorare i concetti e simulare alcune forme di comunicazione.

Questa guida si concentra sugli aspetti concettuali della comunicazione e del coordinamento, con accenni a come si potrebbero simulare o implementare forme base con gli strumenti disponibili.

## Contenuti della Guida

1.  **Perché la Comunicazione è Importante?**
    *   Collaborazione tra robot (swarm robotics)
    *   Condivisione di informazioni sensoriali
    *   Divisione di compiti complessi
    *   Controllo remoto e teleoperazione
    *   Reporting di stato a un sistema centrale
2.  **Tipi di Comunicazione**
    *   **Diretta vs. Indiretta**:
        *   Diretta: Invio esplicito di messaggi (es. radio, infrarossi).
        *   Indiretta: Modifica dell'ambiente che può essere percepita da altri (es. lasciare un oggetto, stigmergia).
    *   **Sincrona vs. Asincrona**:
        *   Sincrona: Il mittente attende una risposta prima di procedere.
        *   Asincrona: Il mittente invia il messaggio e continua senza attendere.
    *   **Broadcast, Multicast, Unicast**:
        *   Broadcast: A tutti i destinatari possibili.
        *   Multicast: A un gruppo specifico di destinatari.
        *   Unicast: A un singolo destinatario.
3.  **Protocolli di Comunicazione (Concetti Generali)**
    *   Formato dei messaggi
    *   Indirizzamento
    *   Gestione degli errori (conferme, ritrasmissioni)
    *   Controllo di flusso
4.  **Sfide nella Comunicazione Robotica**
    *   Affidabilità del canale (perdita di messaggi, interferenze)
    *   Latenza
    *   Sicurezza
    *   Sincronizzazione temporale
5.  **Coordinamento tra Robot**
    *   **Centralizzato**: Un robot "leader" o un computer centrale prende decisioni e le comunica agli altri.
    *   **Decentralizzato/Distribuito**: Ogni robot prende decisioni basate su informazioni locali e messaggi dai vicini.
    *   Strategie comuni: Asta (task allocation), basate su regole, basate su consenso.
6.  **Simulazione della Comunicazione in MakeCode EV3**
    *   **Comunicazione via Infrarossi (Limitata)**: L'EV3 può inviare e ricevere segnali infrarossi dal telecomando. Questo può essere usato per comandi semplici tra due brick se uno simula il telecomando (difficile da generalizzare).
    *   **Variabili Globali (per un singolo script)**: Non una vera comunicazione, ma utile per coordinare diverse parti di un programma complesso sullo stesso brick.
    *   **Display e Sensore di Colore**: Un robot potrebbe mostrare un colore/pattern sul display, e un altro robot potrebbe leggerlo con il sensore di colore. Molto limitato e soggetto a errori.
    *   **File su Scheda SD**: Un robot scrive dati su un file, un altro robot (dopo un cambio manuale o se si accede alla stessa scheda) potrebbe leggerli. Non in tempo reale.
    *   **Interazione Fisica**: Un robot tocca un altro, o sposta un oggetto in una posizione specifica.
7.  **Esempio Concettuale: Robot A informa Robot B**
    *   Robot A rileva un ostacolo e vuole informare Robot B.
    *   **Simulazione con Display/Sensore**: Robot A mostra un pattern rosso sul display. Robot B, se vede il pattern rosso con il suo sensore di colore puntato verso A, sa dell'ostacolo.
    *   **Limiti**: Richiede linea di vista, condizioni di luce stabili, programmazione complessa per l'allineamento.

## Considerazioni per l'EV3 e MakeCode

*   **Focus sui Concetti**: Data la mancanza di API di comunicazione avanzate in MakeCode, l'obiettivo è comprendere i *principi* della comunicazione e del coordinamento.
*   **Creatività nelle Simulazioni**: Incoraggiare gli studenti a pensare a modi creativi per simulare interazioni, anche se semplici.
*   **Passaggio a Piattaforme più Avanzate**: Per una vera comunicazione di rete, si dovrebbero considerare altre piattaforme di programmazione per EV3 (es. ev3dev con Python o C++) o altri sistemi robotici.

## Conclusione

La comunicazione e il coordinamento sono fondamentali per sbloccare il potenziale dei sistemi multi-robot e per interazioni complesse con l'ambiente o sistemi esterni. Anche se MakeCode per EV3 ha limitazioni in questo ambito, comprendere i concetti di base è un passo importante per chiunque sia interessato alla robotica avanzata. Questi concetti possono poi essere applicati e implementati più a fondo con strumenti e piattaforme più potenti.

---

[Torna al README del Modulo 10](../README.md)

[Torna all'indice del corso](../../README.md)