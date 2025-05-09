# Guida 4: Gestione Avanzata degli Errori e Recovery

## Introduzione

Nella programmazione di robot, specialmente quelli che operano in ambienti imprevedibili come il LEGO EV3, la capacità di gestire errori e tentare un recupero è cruciale. Un programma robusto non solo esegue i compiti previsti in condizioni ideali, ma sa anche come reagire a situazioni anomale, guasti dei sensori, o errori logici.

Questa guida esplora tecniche avanzate per la gestione degli errori e strategie di recovery in JavaScript per l'EV3, utilizzando MakeCode.

## Contenuti della Guida

1.  **Identificazione dei Potenziali Punti di Fallimento**
    *   Errori dei sensori (valori fuori range, nessuna lettura)
    *   Errori degli attuatori (motori bloccati, movimenti imprecisi)
    *   Errori logici nel programma
    *   Condizioni ambientali impreviste
2.  **Blocchi `try...catch...finally` in JavaScript**
    *   Sintassi e utilizzo
    *   Catturare eccezioni specifiche
    *   Codice di cleanup nel blocco `finally`
3.  **Strategie di Validazione dell'Input dei Sensori**
    *   Controllo dei valori nulli o indefiniti
    *   Verifica dei range attesi
    *   Medie mobili o filtraggio per ridurre il rumore
4.  **Meccanismi di Timeout**
    *   Impostare timeout per operazioni lunghe (es. attesa di un input)
    *   Gestire il fallimento di un'operazione se il timeout scade
5.  **Strategie di Recovery**
    *   **Ritentare l'operazione**: Provare nuovamente un'azione fallita (con un limite di tentativi).
    *   **Stato di Fallback**: Passare a un comportamento alternativo o più sicuro.
    *   **Notifica Utente**: Segnalare l'errore tramite display, suoni o LED.
    *   **Reset Parziale**: Riportare una parte del sistema a uno stato noto.
    *   **Registrazione dell'Errore (Logging)**: Salvare informazioni sull'errore per debug futuro.
6.  **Esempi Pratici per EV3**
    *   Gestire un sensore di contatto che non viene premuto entro un certo tempo.
    *   Validare le letture del sensore di colore per evitare valori anomali.
    *   Implementare un meccanismo di "emergenza stop" se un motore si blocca.

## Esempio: Gestione Lettura Sensore con Timeout e Retry

```javascript
// Funzione per leggere un sensore con timeout e tentativi
function leggiSensoreConAffidabilita(sensore, tentativiMassimi, timeoutSingoloLettura) {
    for (let i = 0; i < tentativiMassimi; i++) {
        let valore = null;
        let tempoInizio = control.millis();

        // Tenta di leggere il sensore
        try {
            // Simula una potenziale operazione di lettura che potrebbe fallire o richiedere tempo
            // In MakeCode, la lettura diretta di un sensore è solitamente sincrona e veloce
            // Questo è un esempio più concettuale per illustrare il try-catch e timeout
            valore = sensors.ultrasonic4.distance(); // Esempio con sensore ultrasuoni

            if (valore === null || valore < 0 || valore > 255) { // Valori non validi per ultrasuoni in cm
                throw new Error("Lettura sensore non valida: " + valore);
            }
            
            // Se la lettura è valida, esci dalla funzione
            brick.showString("Lettura OK: " + valore, 1);
            return valore;

        } catch (e) {
            brick.showString("Errore lettura: " + e.message, 2 + i);
            console.log("Tentativo " + (i + 1) + ": Errore lettura sensore - " + e.message);
        }

        // Attendi un po' prima del prossimo tentativo, rispettando il timeout
        let tempoTrascorso = control.millis() - tempoInizio;
        if (tempoTrascorso < timeoutSingoloLettura) {
            loops.pause(timeoutSingoloLettura - tempoTrascorso);
        } else if (i < tentativiMassimi -1) {
            // Se il timeout è scaduto ma ci sono ancora tentativi, loggalo
            console.log("Tentativo " + (i + 1) + ": Timeout lettura sensore.");
        }
    }
    brick.showString("Lettura fallita!", 5);
    console.log("Lettura sensore fallita dopo " + tentativiMassimi + " tentativi.");
    return null; // Valore di default o indicazione di fallimento
}

// Utilizzo della funzione
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
    brick.clearScreen();
    let distanza = leggiSensoreConAffidabilita(sensors.ultrasonic4, 3, 1000); // 3 tentativi, 1 sec timeout per tentativo
    if (distanza !== null) {
        brick.showString("Distanza finale: " + distanza + " cm", 6);
    } else {
        brick.showString("Impossibile leggere la distanza.", 6);
    }
});

```

## Considerazioni per MakeCode EV3

*   **Errori Hardware vs. Software**: MakeCode gestisce implicitamente molti errori hardware di basso livello. La tua attenzione dovrebbe concentrarsi sulla logica del programma e sulla validazione dei dati dei sensori.
*   **Semplicità**: Mantieni la gestione degli errori il più semplice possibile, data la natura dell'ambiente MakeCode. Complessità eccessiva può introdurre nuovi bug.
*   **Feedback Utente**: Fornisci un feedback chiaro all'utente (tramite display, suoni, LED) quando si verifica un errore e quando il robot tenta un recupero.

## Conclusione

Una solida gestione degli errori e strategie di recovery rendono i tuoi programmi per EV3 più affidabili e capaci di affrontare l'imprevedibilità del mondo reale. Implementare `try...catch`, validare gli input e pianificare azioni di fallback sono passaggi fondamentali per creare robot più intelligenti e autonomi.

---

[Torna al README del Modulo 10](../README.md)

[Torna all'indice del corso](../../README.md)