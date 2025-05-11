# Guida 4: Gestione degli Errori e Recupero con EV3

## Introduzione

Nella programmazione di robot, specialmente quelli che interagiscono con il mondo fisico come l'EV3, gli errori e le situazioni impreviste sono inevitabili. I motori possono bloccarsi, i sensori possono dare letture errate o disconnettersi, la batteria può scaricarsi, o la logica del programma potrebbe incontrare condizioni non previste. Una gestione robusta degli errori e strategie di recupero sono cruciali per creare robot affidabili e resilienti.

Questa guida esplora i tipi comuni di errori nella programmazione EV3 e discute tecniche per rilevarli, gestirli e, quando possibile, recuperare da essi.

## Tipi Comuni di Errori con EV3

1.  **Errori Hardware**:
    *   **Motori Bloccati (Stall)**: Un motore non riesce a muoversi a causa di un ostacolo fisico o di un carico eccessivo.
    *   **Sensori Disconnessi o Malfunzionanti**: Un sensore non è collegato correttamente, è danneggiato, o fornisce letture anomale (es. fuori range).
    *   **Batteria Scarica**: Livello di batteria insufficiente per il corretto funzionamento.
    *   **Problemi di Connessione**: Errori nella comunicazione Bluetooth o Wi-Fi (se utilizzata).

2.  **Errori Logici nel Programma**:
    *   **Divisione per Zero**: Tentativo di dividere un numero per zero.
    *   **Accesso a Indici Fuori Limite**: Tentativo di accedere a un elemento di un array con un indice non valido.
    *   **Riferimenti Nulli/Indefiniti**: Tentativo di usare una variabile o una proprietà di un oggetto che non è stata inizializzata.
    *   **Loop Infiniti**: Un ciclo che non termina mai a causa di una condizione errata.
    *   **Condizioni di Gara (Race Conditions)**: In programmi con comportamenti concorrenti (es. usando `control.runInParallel` o più gestori di eventi), l'ordine imprevedibile di esecuzione può portare a stati inconsistenti.

3.  **Errori Ambientali/Interazione**:
    *   **Robot Bloccato Fisicamente**: Il robot si incastra in un angolo o contro un ostacolo.
    *   **Perdita di Tracciamento**: Un robot che segue una linea perde la linea, o un robot che naviga perde la sua posizione stimata.
    *   **Input Imprevisti**: L'utente interagisce in modo inaspettato (es. premendo pulsanti in sequenze non previste).

## Tecniche di Gestione degli Errori in MakeCode/JavaScript

### 1. Controllo Preventivo e Validazione degli Input

Prima di eseguire operazioni critiche, controlla se le condizioni sono valide.

```javascript
let velocita = 0; // Potrebbe venire da un calcolo o input
let divisore = 0; // Idem

// Controllo preventivo per divisione per zero
if (divisore !== 0) {
    let risultato = velocita / divisore;
    brick.showString(`Ris: ${risultato}`, 1);
} else {
    brick.showString("Errore: Divisore zero!", 1);
    // Azione correttiva: usa un valore di default o segnala l'errore
}

// Validazione input sensore (esempio concettuale)
let distanza = sensors.ultrasonic1.distance();
if (distanza < 0 || distanza > 255) { // Valori tipici per sensore ultrasuoni EV3
    brick.showString("Lettura sensore anomala!", 2);
    // Ignora la lettura o usa un valore precedente valido
} else {
    // Procedi con la lettura valida
}
```

### 2. Utilizzo di `try...catch` per Errori di Runtime

JavaScript supporta i blocchi `try...catch` per gestire eccezioni (errori che si verificano durante l'esecuzione).

```javascript
function operazioneRischiosa(param) {
    if (param === null || param === undefined) {
        throw new Error("Parametro nullo o indefinito!");
    }
    // ... altre operazioni che potrebbero fallire
    let risultato = param.qualcosa(); // Potrebbe fallire se 'param' non ha 'qualcosa'
    return risultato;
}

// Chiamata alla funzione con gestione dell'errore
try {
    let valore = null;
    let esito = operazioneRischiosa(valore);
    brick.showString(`Esito: ${esito}`, 3);
} catch (e) {
    brick.showString("ERRORE CATTURATO!", 3);
    brick.showString(e.message, 4); // Mostra il messaggio dell'errore
    // e.name per il tipo di errore (es. 'Error', 'TypeError')
    // e.stack per la traccia dello stack (potrebbe non essere molto utile su EV3)
    
    // Logica di recupero o terminazione controllata
    motors.stopAll();
    brick.sound(Sound.PlayError);
}
```
**Nota**: Non tutti gli errori hardware dell'EV3 (come un motore bloccato) generano automaticamente eccezioni JavaScript che possono essere catturate da `try...catch`. Spesso richiedono un monitoraggio attivo.

### 3. Monitoraggio Attivo dello Stato Hardware

Per errori specifici dell'hardware EV3, è necessario monitorare attivamente lo stato dei componenti.

*   **Motori Bloccati**: MakeCode fornisce eventi per questo.
    ```javascript
    motors.largeA.onEvent(MotorEvent.Stalled, function () {
        brick.showString("Motore A BLOCCATO!", 5);
        motors.largeA.stop();
        // Logica di recupero: prova a muovere indietro, attendi, riprova, o segnala
        brick.sound(Sound.PlayWarning);
        // Potrebbe essere necessario entrare in uno stato di errore della FSM
    });
    
    // Avvia il motore e fai qualcosa che potrebbe bloccarlo
    motors.largeA.run(100, 10000, MoveUnit.Degrees); // Prova a girare per molto tempo
    ```

*   **Controllo Regolare dei Sensori**: Verifica periodicamente se i sensori sono connessi o se le letture sono ragionevoli.
    ```javascript
    // In un loop o in control.runInParallel
    function controllaSensori() {
        if (!sensors.touch1.isConnected()) {
            brick.showString("Sensore Tocco 1 Scollegato!", 6);
            // Strategia: fermare il robot, emettere un suono, attendere riconnessione
        }
        // ... controlli simili per altri sensori
    }
    // loops.forever(controllaSensori); // Esempio di chiamata
    ```

### 4. Timeout per Operazioni Lunghe

Se un'operazione dovrebbe completarsi entro un certo tempo, usa un timer per rilevare se si blocca.

```javascript
let tempoInizioOperazione = control.millis();
let timeoutOperazioneMs = 5000; // 5 secondi
let operazioneCompletata = false;

// ... avvia l'operazione ...

// In un loop di controllo
// while (!operazioneCompletata && (control.millis() - tempoInizioOperazione < timeoutOperazioneMs)) {
//     // ... attendi o controlla lo stato dell'operazione ...
//     pause(100);
// }

// if (!operazioneCompletata) {
//     brick.showString("Timeout operazione!", 7);
//     // Logica di gestione del timeout: annulla operazione, recupera
// }
```
Questo è più complesso da implementare correttamente senza bloccare altri processi. Le FSM con stati di timeout sono un buon approccio (vedi Guida 2).

### 5. Feedback all'Utente

Quando si verifica un errore, informa l'utente:
*   **Display EV3**: Mostra messaggi chiari.
*   **Suoni**: Usa suoni diversi per tipi di errore o avvisi.
*   **LED del Brick**: Cambia colore o pattern di lampeggio.

```javascript
function segnalaErroreCritico(messaggio) {
    motors.stopAll();
    brick.setLedPattern(LedPattern.RedFlash);
    brick.showString("ERRORE CRITICO:", 1);
    brick.showString(messaggio, 2);
    brick.sound(Sound.PlayError, true); // Suono bloccante
    // Il programma potrebbe dover terminare o attendere un reset manuale
}

// Esempio di utilizzo
// if (livelloBatteria < 10) {
//     segnalaErroreCritico("Batteria scarica!");
// }
```

## Strategie di Recupero

Una volta rilevato un errore, cosa fare?

1.  **Riprova (Retry)**: Per errori transitori (es. un picco di rumore su un sensore), attendere un breve periodo e riprovare l'operazione. Limita il numero di tentativi per evitare loop infiniti.

    ```javascript
    let tentativi = 0;
    const MAX_TENTATIVI = 3;
    let successo = false;

    while (!successo && tentativi < MAX_TENTATIVI) {
        try {
            // ... tenta l'operazione ...
            // operazioneChePuoFallire();
            successo = true;
        } catch (e) {
            tentativi++;
            brick.showString(`Tentativo ${tentativi} fallito`, 8);
            pause(500); // Attendi prima di riprovare
        }
    }
    if (!successo) {
        brick.showString("Operazione fallita dopo max tentativi!", 8);
        // Gestione fallimento definitivo
    }
    ```

2.  **Degradazione Controllata (Graceful Degradation)**: Se una funzionalità non è disponibile (es. un sensore rotto), il robot potrebbe continuare a operare con funzionalità ridotte, se possibile, invece di fermarsi completamente.
    *   Esempio: Se il sensore di distanza per l'evitamento ostacoli smette di funzionare, il robot potrebbe muoversi a velocità molto ridotta o fermarsi e attendere istruzioni.

3.  **Stato Sicuro (Fail-Safe State)**: Se si verifica un errore critico, porta il robot in uno stato sicuro (es. fermare tutti i motori, abbassare eventuali bracci).

4.  **Richiesta di Intervento Umano**: Se il robot non può recuperare autonomamente, segnala chiaramente che è necessario un intervento.

5.  **Logging degli Errori**: Per il debug post-mortem, registra informazioni sugli errori (tipo, ora, stato del robot) su file (se possibile e supportato) o visualizzale. MakeCode per EV3 ha capacità di logging limitate direttamente sul brick, ma si possono inviare dati via Bluetooth a un computer se si sviluppa un'applicazione ricevente.

## Gestione degli Errori in una FSM

Le Macchine a Stati Finiti (FSM) sono un ottimo modo per incorporare la gestione degli errori:
*   **Stato di Errore Dedicato**: Aggiungi uno o più stati `ERRORE_QUALCOSA` alla tua FSM.
*   **Transizioni verso Stati di Errore**: Da qualsiasi stato, se viene rilevato un errore pertinente, transita allo stato di errore appropriato.
*   **Logica nello Stato di Errore**: Nello stato di errore, esegui azioni di recupero, segnalazione, o attendi un reset.

```javascript
// All'interno di uno stato della FSM (vedi Guida 2)
// case STATO_AVANZAMENTO:
//     if (sensors.ultrasonic1.distance() < 5 && motors.largeBC.isRunning()) {
//         // Rilevato ostacolo troppo vicino mentre si suppone di avanzare (possibile errore)
//         statoCorrente = STATO_ERRORE_COLLISIONE_IMMINENTE;
//         azioneIngressoErroreCollisione();
//     }
//     break;
```

## Prevenzione degli Errori

*   **Buona Progettazione del Codice**: Codice chiaro, modulare e ben commentato è più facile da debuggare e meno prono a errori logici.
*   **Test Approfonditi**: Testa il tuo robot in varie condizioni, inclusi scenari limite e di errore.
*   **Progettazione Fisica Robusta**: Assicurati che il robot sia costruito solidamente, i cavi siano fissati e i sensori posizionati correttamente.

## Conclusione

La gestione degli errori e il recupero sono aspetti essenziali della programmazione robotica. Anticipare i potenziali problemi, implementare controlli e meccanismi di gestione, e fornire feedback chiari può fare la differenza tra un robot frustrante e uno che funziona in modo affidabile. In MakeCode per EV3, questo implica una combinazione di controlli preventivi, gestione degli eventi hardware (come `MotorEvent.Stalled`), uso giudizioso di `try...catch` per errori JavaScript, e una logica di stato ben pensata (spesso tramite FSM) per gestire le strategie di recupero.

---

[Torna all'elenco delle Guide](./README.md)

[Torna al Modulo 10](../README.md)

[Torna alla Home del Corso](../../README.md)