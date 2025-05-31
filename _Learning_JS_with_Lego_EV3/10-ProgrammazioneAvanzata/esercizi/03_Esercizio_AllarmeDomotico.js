// Esercizio 03: Sistema di Allarme Domotico Semplice
// Obiettivo: Il robot monitora un'area. Se il sensore a ultrasuoni rileva un "intruso" 
// (oggetto vicino) o il sensore tattile viene premuto (es. "finestra aperta"), 
// il robot emette un suono di allarme e invia un messaggio (simulato sulla console).
//
// Concetti da Applicare: Programmazione guidata dagli eventi, gestione degli errori 
// (es. falso allarme), comunicazione (simulata).
//
// Suggerimenti:
// 1. Usa `sensors.ultrasonic1.onEvent(UltrasonicSensorEvent.ObjectNear, ...)` per rilevare intrusi.
// 2. Usa `sensors.touch1.onEvent(SensorEvent.Pressed, ...)` per simulare l'apertura di una finestra/porta.
// 3. Quando un evento di allarme si verifica:
//    - Riproduci un suono di allarme (es. `music.playTone(Note.A5, 500)` ripetutamente o un suono predefinito).
//    - Mostra un messaggio di allarme sul display EV3.
//    - Stampa un messaggio di allarme sulla console (`console.log`).
// 4. Considera una logica per "disattivare" l'allarme (es. premendo un altro pulsante).
// 5. (Opzionale) Aggiungi una logica per evitare falsi allarmi, ad esempio, l'allarme si attiva solo se l'intruso rimane per un certo periodo.

brick.showString("Esercizio: Allarme Domotico", 1);

let allarmeAttivo = false;
const DISTANZA_INTRUSO = 25; // cm

// Funzione per attivare l'allarme
function attivaAllarme(messaggio) {
    if (!allarmeAttivo) {
        allarmeAttivo = true;
        brick.showString("ALLARME!", 3);
        brick.showString(messaggio, 4);
        console.log("ALLARME: " + messaggio);
        // Suono di allarme continuo (esempio)
        loops.forever(function() {
            if (allarmeAttivo) {
                music.playTone(Note.C5, 100);
                pause(100);
                music.playTone(Note.G5, 100);
                pause(100);
            } else {
                // Esci dal loop forever se l'allarme è disattivato
                // Questo non è il modo più pulito in MakeCode, ma per semplicità...
                // Idealmente, si userebbe una variabile di controllo per un loop esterno.
                control.breakLoop(); 
            }
        });
    }
}

// Funzione per disattivare l'allarme
function disattivaAllarme() {
    if (allarmeAttivo) {
        allarmeAttivo = false;
        brick.showString("Allarme Disattivato", 3);
        brick.showString("Sistema Sicuro", 4);
        console.log("Allarme disattivato.");
        music.stopAllSounds(); // Ferma i suoni dell'allarme
        // Potrebbe essere necessario fermare il loop `forever` in modo più esplicito se `control.breakLoop()` non è disponibile
        // o se il loop è in un altro contesto. Per questo esempio, assumiamo che `music.stopAllSounds()` sia sufficiente
        // a fermare il suono e il loop `forever` smetterà di fare rumore.
        // In una implementazione reale, si gestirebbe meglio lo stato del loop di allarme.
    }
}

// Evento: Sensore a ultrasuoni rileva un oggetto vicino (intruso)
// Assicurati che il sensore ultrasuoni sia collegato alla porta corretta (es. S4)
sensors.ultrasonic4.onEvent(UltrasonicSensorEvent.ObjectNear, DISTANZA_INTRUSO, function () {
    brick.showString("Intruso Rilevato!", 2);
    attivaAllarme("Intruso rilevato dal sensore US!");
});

// Evento: Sensore tattile premuto (es. finestra aperta)
// Assicurati che il sensore tattile sia collegato alla porta corretta (es. S1)
sensors.touch1.onEvent(SensorEvent.Pressed, function () {
    brick.showString("Sensore Tattile Premuto!", 2);
    attivaAllarme("Sensore tattile attivato!");
});

// Evento: Pulsante 'Down' per disattivare l'allarme
brick.buttonDown.onEvent(ButtonEvent.Pressed, function () {
    brick.showString("Disattivazione...", 2);
    disattivaAllarme();
});

brick.showString("Sistema di Allarme Pronto", 2);
console.log("Sistema di allarme avviato.");
console.log("Sensore US su S4, Tattile su S1.");
console.log("Premi GIU per disattivare l'allarme.");

// Logica opzionale per falsi allarmi (esempio base)
// Potrebbe essere integrata negli handler degli eventi
// let conteggioRilevazioni = 0;
// const SOGLIA_FALSO_ALLARME = 3; // Numero di rilevazioni consecutive prima di attivare l'allarme
// let ultimoTimestampRilevazione = 0;
// const TEMPO_RESET_FALSO_ALLARME = 2000; // ms

// Nell'evento del sensore:
// let oraCorrente = control.millis();
// if (oraCorrente - ultimoTimestampRilevazione > TEMPO_RESET_FALSO_ALLARME) {
// conteggioRilevazioni = 0; // Resetta se è passato troppo tempo dall'ultima rilevazione
// }
// conteggioRilevazioni++;
// ultimoTimestampRilevazione = oraCorrente;
// if (conteggioRilevazioni >= SOGLIA_FALSO_ALLARME) {
// attivaAllarme("Intruso confermato!");
// conteggioRilevazioni = 0; // Resetta dopo l'allarme
// }