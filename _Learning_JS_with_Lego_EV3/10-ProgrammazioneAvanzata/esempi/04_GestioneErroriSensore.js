// Esempio 10.4: Gestione degli Errori di un Sensore
// Il robot tenta di leggere un sensore e gestisce situazioni in cui la lettura
// potrebbe essere anomala (es. null, fuori range) o il sensore potrebbe non rispondere.

brick.showString("Gestione Errori Sensore", 1);

// Configurazione
const SOGLIA_DISTANZA_MINIMA = 5;  // cm
const SOGLIA_DISTANZA_MASSIMA = 100; // cm
const TENTATIVI_MASSIMI_LETTURA = 3;
const PAUSA_TRA_TENTATIVI = 500; // ms

/**
 * Funzione per leggere il sensore a ultrasuoni (porta 4) con gestione degli errori.
 * @returns {number | null} La distanza letta in cm, o null se la lettura fallisce dopo vari tentativi.
 */
function leggiDistanzaConControllo() {
    let distanza = null;
    for (let i = 0; i < TENTATIVI_MASSIMI_LETTURA; i++) {
        try {
            brick.showString("Tentativo " + (i + 1) + "...", 3);
            distanza = sensors.ultrasonic4.distance();

            // Controllo 1: La lettura è null? (potrebbe indicare un sensore disconnesso o malfunzionante)
            if (distanza === null) {
                throw new Error("Lettura nulla dal sensore.");
            }

            // Controllo 2: La lettura è fuori da un range plausibile?
            // (il sensore EV3 ultrasuoni di solito ha un range di circa 3-250 cm)
            if (distanza < 0 || distanza > 255) { // Range fisico del sensore
                throw new Error("Valore irrealistico: " + distanza + " cm");
            }

            // Controllo 3: La lettura è fuori dal range operativo atteso per l'applicazione?
            if (distanza < SOGLIA_DISTANZA_MINIMA || distanza > SOGLIA_DISTANZA_MASSIMA) {
                console.log("Avviso: Distanza fuori range operativo: " + distanza + " cm");
                // Potremmo decidere di trattarlo come un errore o solo come un avviso
                // throw new Error("Distanza fuori range operativo: " + distanza + " cm");
            }
            
            brick.showString("Distanza: " + distanza + " cm", 5);
            return distanza; // Lettura valida, esce dalla funzione

        } catch (e) {
            brick.showString("Errore: " + e.message, 4);
            brick.sound(Sound.Error);
            console.log("Errore lettura sensore (tentativo " + (i + 1) + "): " + e.message);
            if (i < TENTATIVI_MASSIMI_LETTURA - 1) {
                loops.pause(PAUSA_TRA_TENTATIVI);
            } else {
                brick.showString("Lettura fallita!", 6);
                return null; // Fallimento dopo tutti i tentativi
            }
        }
    }
    return null; // Non dovrebbe arrivare qui, ma per sicurezza
}

// Logica principale del robot
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
    brick.clearScreen();
    brick.showString("Avvio lettura...", 1);
    let distanzaAffidabile = leggiDistanzaConControllo();

    if (distanzaAffidabile !== null) {
        brick.showString("OK: " + distanzaAffidabile + " cm", 7);
        brick.sound(Sound.Confirm);
        // Qui il robot potrebbe usare il valore 'distanzaAffidabile' per le sue decisioni
        if (distanzaAffidabile < 10) {
            motors.mediumBC.run(-30, 1, MoveUnit.Rotations);
        } else {
            motors.mediumBC.run(30, 1, MoveUnit.Rotations);
        }
    } else {
        brick.showString("FALLITO. Azione alternativa?", 7);
        brick.sound(Sound.ErrorSignal);
        // Azione di fallback: es. fermarsi, emettere un segnale di errore più lungo
        motors.stopAll();
        for(let k=0; k<3; k++){
            brick.setLedPattern(LedPattern.RedFlash);
            loops.pause(300);
            brick.setLedPattern(LedPattern.Off);
            loops.pause(300);
        }
    }
});

brick.buttonRight.onEvent(ButtonEvent.Pressed, function() {
    // Simula un sensore che restituisce un valore anomalo (es. staccandolo)
    // Per testare, stacca il sensore ultrasuoni e premi Enter
    brick.showString("Test con sensore staccato?", 2);
});

brick.buttonDown.onEvent(ButtonEvent.Pressed, function () {
    motors.stopAll();
    brick.clearScreen();
    brick.setLedPattern(LedPattern.Off);
    brick.showString("Programma Terminato", 6);
    brick.sound(Sound.Goodbye);
    control.programStop();
});

// Note per MakeCode:
// 1. Incolla questo codice nella vista JavaScript.
// 2. Assicurati che il sensore a ultrasuoni sia collegato alla porta 4.
// 3. Per testare lo scenario di errore "Lettura nulla", puoi provare a staccare
//    il sensore a ultrasuoni prima di premere il pulsante Enter.
// 4. Modifica le costanti SOGLIA_DISTANZA_MINIMA e SOGLIA_DISTANZA_MASSIMA
//    per adattarle al tuo scenario specifico.