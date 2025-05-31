# Guida 5: Comunicazione e Coordinamento (Concetti) con EV3

## Introduzione

Quando si lavora con sistemi robotici complessi o con più robot che devono collaborare, la comunicazione e il coordinamento diventano aspetti fondamentali. Anche un singolo robot EV3 può beneficiare di una comunicazione interna ben strutturata tra diverse parti del suo programma (ad esempio, tra diverse "attività" logiche o FSM).

Questa guida introduce i concetti di base della comunicazione e del coordinamento, applicabili sia alla comunicazione intra-robot (all'interno dello stesso programma EV3) sia, a livello concettuale, alla comunicazione inter-robot (tra più EV3), sebbene MakeCode per EV3 abbia funzionalità limitate per la comunicazione diretta tra brick.

## Tipi di Comunicazione

1.  **Comunicazione Intra-Processo (all'interno dello stesso programma EV3)**:
    *   **Variabili Condivise**: Il modo più semplice per diverse parti di un programma di condividere informazioni. Richiede attenzione per evitare race conditions se le variabili sono modificate da più "thread" logici (es. `control.runInParallel` o gestori di eventi).
    *   **Messaggistica/Eventi Personalizzati**: Un sistema in cui una parte del programma può inviare un "messaggio" o scatenare un "evento" che un'altra parte può ascoltare e a cui può reagire. MakeCode ha blocchi per inviare e ricevere messaggi (stringhe) che possono essere usati per questo scopo, anche se sono pensati principalmente per la comunicazione Bluetooth.
    *   **Chiamate di Funzione Dirette**: Se una parte del codice necessita di un'informazione o di un'azione da un'altra, può chiamare direttamente una funzione esposta da quell'altra parte (tipico in OOP o codice modulare).

2.  **Comunicazione Inter-Processo/Inter-Robot (tra diversi EV3 o tra EV3 e un computer)**:
    *   **Bluetooth**: L'EV3 supporta la comunicazione Bluetooth. MakeCode fornisce blocchi per inviare e ricevere messaggi (stringhe e numeri) via Bluetooth. Questo è il metodo principale per la comunicazione tra EV3 o tra un EV3 e un altro dispositivo (es. un computer o uno smartphone con un'apposita applicazione).
    *   **Wi-Fi (con Dongle)**: Se l'EV3 è equipaggiato con un dongle Wi-Fi compatibile, è possibile (al di fuori di MakeCode standard, o con estensioni specifiche) implementare protocolli di rete come TCP/IP o HTTP per comunicazioni più complesse.
    *   **Comunicazione Indiretta**: I robot possono comunicare indirettamente modificando l'ambiente (es. lasciando un oggetto in un punto specifico) o tramite segnali visivi/sonori che un altro robot può percepire con i suoi sensori (molto più complesso da implementare in modo affidabile).

## Concetti Chiave nel Coordinamento

Il coordinamento si riferisce a come più agenti (parti di un programma o robot distinti) lavorano insieme per raggiungere un obiettivo comune o per evitare conflitti.

1.  **Sincronizzazione**: Assicurare che le azioni avvengano in un ordine corretto o in momenti specifici. Ad esempio, un robot non dovrebbe iniziare a muoversi finché un altro non ha completato un'operazione.
    *   **Segnali/Flag**: Variabili usate per indicare che un'azione è completata o che è sicuro procedere.
    *   **Attesa Attiva (Busy Waiting)**: Un ciclo che controlla continuamente un flag. Da usare con cautela per non sprecare CPU.
    *   **Eventi**: Usare eventi per segnalare il completamento di un'attività.

2.  **Condivisione di Risorse**: Se più parti del programma o più robot necessitano di accedere a una risorsa limitata (es. un'area specifica, un oggetto da manipolare, una porta di comunicazione), è necessario un meccanismo per gestire l'accesso ed evitare conflitti.
    *   **Mutua Esclusione (Mutex)**: Un meccanismo che assicura che solo un agente alla volta possa accedere a una risorsa critica. Implementabile con flag o semafori (concettualmente).
    *   **Token Passing**: Un "token" viene passato tra gli agenti, e solo l'agente che possiede il token può accedere alla risorsa.

3.  **Allocazione di Compiti (Task Allocation)**: Decidere quale agente (o parte del programma) è responsabile per quale compito. Può essere statico (definito a priori) o dinamico (deciso durante l'esecuzione in base alla situazione).

4.  **Formazione (Formation Control - per più robot)**: Mantenere una specifica disposizione spaziale tra i robot mentre si muovono.

5.  **Consenso (Consensus - per più robot)**: Raggiungere un accordo su un valore o una decisione comune basata su informazioni distribuite.

## Comunicazione in MakeCode per EV3

MakeCode si concentra principalmente sulla programmazione di un singolo brick EV3. Le funzionalità di comunicazione sono orientate a:

*   **Comunicazione interna tramite variabili e chiamate di funzione.**
*   **Comunicazione Bluetooth per inviare/ricevere dati semplici (stringhe, numeri) con altri dispositivi EV3 o computer/smartphone.**

### Blocchi di Messaggistica Bluetooth

MakeCode fornisce blocchi nella categoria "Radio" (che in realtà usa Bluetooth sull'EV3) o "Messages":

*   **`messages.sendString("nome_messaggio", "valore_messaggio")`**: Invia una stringa con un'etichetta (nome).
*   **`messages.sendNumber("nome_messaggio", valore_numerico)`**: Invia un numero con un'etichetta.
*   **`messages.onReceived("nome_messaggio", function (valore) {})`**: Registra un gestore di eventi che viene eseguito quando un messaggio con il "nome_messaggio" specificato viene ricevuto. Il `valore` può essere una stringa o un numero a seconda di come è stato inviato.

**Esempio: Due EV3 che si scambiano un segnale**

**Robot 1 (Mittente):**
```javascript
// Quando il pulsante Enter viene premuto, invia un messaggio "start_task"
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
    brick.showString("Invio: start_task", 1);
    messages.sendString("comando", "start_task");
    brick.sound(Sound.CommunicationOutgoing);
});

// Riceve un messaggio di conferma "task_done"
messages.onReceived("risposta", function (valore) {
    if (valore === "task_done") {
        brick.showString("Robot 2 ha finito!", 2);
        brick.sound(Sound.CommunicationIncoming);
    }
});
```

**Robot 2 (Ricevente):**
```javascript
// Attende il messaggio "start_task"
messages.onReceived("comando", function (valore) {
    if (valore === "start_task") {
        brick.showString("Ricevuto: start_task", 1);
        brick.sound(Sound.CommunicationIncoming);
        
        // Esegui il compito...
        brick.showString("Eseguo compito...", 2);
        motors.largeA.run(50, 720, MoveUnit.Degrees); // Fai qualcosa
        pause(2000); // Simula durata compito
        motors.largeA.stop();
        
        // Invia conferma
        brick.showString("Invio: task_done", 3);
        messages.sendString("risposta", "task_done");
        brick.sound(Sound.CommunicationOutgoing);
    }
});

brick.showString("Pronto a ricevere...", 5);
```

**Note sull'esempio Bluetooth:**
*   Entrambi gli EV3 devono essere accoppiati (paired) via Bluetooth prima di eseguire i programmi.
*   La comunicazione è asincrona. Non c'è garanzia immediata di consegna o di ordine se si inviano molti messaggi rapidamente.
*   I "nomi dei messaggi" (`comando`, `risposta` nell'esempio) sono usati per distinguere i tipi di messaggi.

### Comunicazione Interna (Intra-Robot)

Per la comunicazione all'interno dello stesso programma EV3, si usano principalmente:

*   **Variabili Globali**: Semplici ma richiedono cautela.
    ```javascript
    let compitoCompletato = false;

    // Parte 1 del programma (es. in runInParallel)
    control.runInParallel(function() {
        // ...esegue un compito...
        pause(5000);
        compitoCompletato = true;
        brick.showString("Compito A Fatto", 1);
    });

    // Parte 2 del programma (es. nel loop principale o altro runInParallel)
    loops.forever(function() {
        if (compitoCompletato) {
            brick.showString("Compito A rilevato come fatto!", 2);
            // ...fai qualcos'altro...
            compitoCompletato = false; // Resetta per la prossima volta, se necessario
            pause(1000); // Evita di rieseguire subito
        }
        pause(100);
    });
    ```

*   **Eventi Personalizzati (Simulati)**: Si possono usare i blocchi di messaggistica anche per la comunicazione interna, anche se è un po' un abuso del loro scopo primario. Un approccio più pulito potrebbe essere usare funzioni callback o una semplice implementazione di un pattern Observer.

    ```javascript
    // Semplice sistema di eventi personalizzati (concettuale)
    let gestoriEventi: { [key: string]: (() => void)[] } = {};

    function registraGestore(nomeEvento: string, gestore: () => void) {
        if (!gestoriEventi[nomeEvento]) {
            gestoriEventi[nomeEvento] = [];
        }
        gestoriEventi[nomeEvento].push(gestore);
    }

    function scatenaEvento(nomeEvento: string) {
        if (gestoriEventi[nomeEvento]) {
            gestoriEventi[nomeEvento].forEach(gestore => gestore());
        }
    }

    // Utilizzo
    registraGestore("mio_evento_speciale", function() {
        brick.showString("Mio evento speciale accaduto!", 3);
    });

    // In un'altra parte del codice
    // if (qualcosaDiImportanteAccade) {
    //     scatenaEvento("mio_evento_speciale");
    // }
    ```
    *Nota: L'esempio sopra usa TypeScript per la tipizzazione, comune in MakeCode. In JavaScript puro, si ometterebbero i tipi.*
## Sfide nel Coordinamento

*   **Latenza di Comunicazione**: I messaggi (specialmente via Bluetooth) non sono istantanei.
*   **Affidabilità della Comunicazione**: I messaggi possono andare persi o essere corrotti (meno comune con Bluetooth a corto raggio, ma possibile).
*   **Deadlock**: Due o più agenti si aspettano a vicenda per rilasciare una risorsa o inviare un segnale, bloccandosi indefinitamente.
*   **Stato Incoerente**: Se la comunicazione fallisce o è ritardata, gli agenti potrebbero avere una visione diversa dello stato del sistema.

## Strategie di Coordinamento Semplici per EV3

1.  **Leader-Follower**: Un EV3 (leader) prende decisioni e invia comandi agli altri (followers).
2.  **Sequenziale**: I robot eseguono compiti in una sequenza predefinita, usando segnali per passare il testimone.
3.  **Basato su FSM**: Ogni robot ha una FSM, e le transizioni di stato possono essere influenzate da messaggi ricevuti da altri robot o da variabili condivise (per coordinamento interno).

## Conclusione

La comunicazione e il coordinamento sono essenziali per comportamenti robotici avanzati. Anche se MakeCode per EV3 offre strumenti di base, comprendere i concetti sottostanti permette di progettare interazioni più efficaci, sia all'interno di un singolo programma EV3 (usando variabili, funzioni, o simulando eventi) sia tra più EV3 (principalmente tramite messaggistica Bluetooth).

Per progetti complessi, è importante pensare attentamente a come le diverse parti del sistema (o diversi robot) condivideranno informazioni, sincronizzeranno le loro azioni e gestiranno le risorse per raggiungere gli obiettivi desiderati in modo collaborativo.

---

[Torna all'elenco delle Guide](./README.md)

[Torna al Modulo 10](../README.md)

[Torna alla Home del Corso](../../README.md)