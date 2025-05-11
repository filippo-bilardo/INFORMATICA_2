# Guida 4: Il Sensore Giroscopio

Il sensore giroscopio (Gyro Sensor) dell'EV3 è un componente cruciale per misurare la rotazione e l'orientamento del robot. A differenza di una bussola che rileva il nord magnetico, il giroscopio rileva il cambiamento nell'angolo di rotazione attorno a un asse specifico e la velocità di tale rotazione.

## Funzionamento di Base

*   **Rilevamento del Movimento Angolare**: Il sensore misura la velocità angolare. Integrando questa velocità nel tempo, può calcolare l'angolo di rotazione accumulato.
*   **Un Asse di Rilevamento**: Il giroscopio standard dell'EV3 rileva la rotazione attorno a un singolo asse, solitamente indicato da frecce sul corpo del sensore. È importante montare il sensore correttamente in base all'asse di rotazione che si desidera misurare (es. rotazione del robot su se stesso, inclinazione).
*   **Unità di Misura**: L'angolo è tipicamente misurato in gradi, e la velocità angolare in gradi al secondo.

## Modalità del Sensore Giroscopio

Il sensore giroscopio EV3 ha principalmente due modalità di lettura:

1.  **Modalità Angolo (Angle Mode)**:
    *   Restituisce l'angolo di rotazione accumulato dall'ultimo reset del sensore o dall'inizio del programma.
    *   L'angolo può essere positivo o negativo a seconda della direzione di rotazione.
    *   È fondamentale per far girare il robot di un angolo preciso o per mantenere un orientamento specifico.
    *   **Reset dell'Angolo**: È possibile resettare il conteggio dell'angolo a zero in qualsiasi momento. Questo è utile per definire una nuova posizione di riferimento "zero".

2.  **Modalità Velocità Angolare (Rate Mode)**:
    *   Restituisce la velocità attuale di rotazione in gradi al secondo.
    *   Utile per rilevare se il robot sta girando e quanto velocemente, o per implementare controlli più fluidi basati sulla velocità di rotazione.

## Utilizzo in MakeCode (JavaScript)

MakeCode permette di accedere facilmente ai dati del giroscopio.

**Esempio base per leggere l'angolo:**

```javascript
// Assumendo che il sensore giroscopio sia collegato alla porta 2
let angoloAttuale = sensors.gyro2.angle();
brick.showString("Angolo: " + angoloAttuale + " deg", 1);

// Per resettare l'angolo
// sensors.gyro2.reset(); // Attenzione: il reset potrebbe richiedere un breve istante per stabilizzarsi
```

**Esempio per leggere la velocità angolare:**

```javascript
// Assumendo che il sensore giroscopio sia collegato alla porta 2
let velocitaRotazione = sensors.gyro2.rate();
brick.showString("Rate: " + velocitaRotazione + " dps", 2);
```

## Deriva del Giroscopio (Gyro Drift)

Un problema comune con i sensori giroscopio MEMS (come quello dell'EV3) è la **deriva (drift)**. Con il tempo, anche se il sensore è fermo, il valore dell'angolo potrebbe lentamente cambiare. Questo è dovuto a piccole imperfezioni nel sensore e a fattori ambientali.

**Mitigazione della Deriva**:
*   **Calibrazione/Reset Iniziale**: All'inizio del programma, assicurati che il robot sia completamente fermo per alcuni secondi prima di iniziare a usare le letture del giroscopio o prima di resettarlo. Alcuni ambienti di programmazione eseguono una calibrazione automatica se il sensore è immobile all'avvio.
*   **Reset Periodici**: Se l'applicazione lo permette, resettare l'angolo del giroscopio quando si sa che il robot è in uno stato di riferimento noto (es. fermo e allineato).
*   **Filtri Software**: Tecniche più avanzate (come filtri di Kalman) possono essere usate per combinare dati da più sensori (es. accelerometro) per ridurre la deriva, ma questo è generalmente oltre lo scopo di MakeCode base.
*   **Non Muovere Durante il Reset**: È cruciale che il sensore sia immobile durante la fase di reset o calibrazione iniziale.

## Considerazioni Pratiche

*   **Montaggio**: Montare il sensore in modo sicuro e allineato con l'asse di rotazione desiderato. Vibrazioni eccessive possono influenzare le letture.
*   **Tempo di Stabilizzazione**: Dopo un reset o all'accensione, il giroscopio potrebbe richiedere un breve istante (fino a un paio di secondi) per stabilizzare le sue letture.
*   **Limiti dell'Angolo**: L'angolo accumulato può diventare molto grande (positivo o negativo) se il robot ruota molte volte. Considera l'uso dell'operatore modulo (`% 360`) se ti interessa solo l'angolo all'interno di un giro completo.

## Applicazioni Comuni

*   **Svolte Precise**: Far girare il robot di un numero esatto di gradi (es. 90 gradi, 180 gradi).
*   **Mantenimento dell'Equilibrio**: Per robot autobilancianti (più complessi, spesso richiedono anche accelerometri).
*   **Navigazione**: Mantenere una direzione o seguire un percorso basato su angoli.
*   **Rilevamento di Cadute o Inclinazioni**: Determinare se il robot si è inclinato o è caduto.

Il sensore giroscopio è essenziale per dare al tuo robot EV3 un senso di orientamento e per controllare i suoi movimenti rotazionali con precisione.

---

[Torna all'elenco delle Guide](./README.md)
[Torna al Modulo 07](../README.md)
[Torna alla Home del Corso](../../../README.md)