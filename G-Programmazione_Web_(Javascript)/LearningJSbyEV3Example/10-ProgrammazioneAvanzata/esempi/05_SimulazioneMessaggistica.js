// Esempio 10.5: Simulazione di Messaggistica tra Parti del Programma
// In MakeCode EV3, la comunicazione diretta tra brick non è supportata nativamente.
// Questo esempio simula una forma di messaggistica interna o una semplice interazione
// che potrebbe essere usata se due robot potessero scambiarsi dati semplici (es. via display/sensore colore).

brick.showString("Simulazione Messaggi", 1);

// --- Sistema di Messaggistica Semplificato ---

// Una "casella di posta" globale per i messaggi
let casellaPostale = {
    messaggio: null,
    mittente: null,
    letto: true
};

/**
 * Funzione per "inviare" un messaggio.
 * In questa simulazione, semplicemente aggiorna la casella postale globale.
 * @param {string} msg Il contenuto del messaggio.
 * @param {string} from L'identificativo del mittente.
 */
function inviaMessaggio(msg, from) {
    if (!casellaPostale.letto) {
        brick.showString("Posta piena!", 8);
        console.log("AVVISO: Casella postale piena. Messaggio precedente non letto.");
        // In un sistema reale, si potrebbe accodare o gestire l'overflow
    }
    casellaPostale.messaggio = msg;
    casellaPostale.mittente = from;
    casellaPostale.letto = false;
    brick.showString("Msg inviato da " + from, 2);
    brick.sound(Sound.Clicked);
    console.log("Messaggio da " + from + ": '" + msg + "' depositato.");
}

/**
 * Funzione per "ricevere" un messaggio.
 * Controlla la casella postale e, se c'è un nuovo messaggio, lo elabora.
 * @param {string} ricevente L'identificativo del ricevente (per log).
 * @returns {object | null} L'oggetto messaggio {messaggio, mittente} o null se non ci sono nuovi messaggi.
 */
function riceviMessaggio(ricevente) {
    if (!casellaPostale.letto && casellaPostale.messaggio !== null) {
        let msgRicevuto = {
            messaggio: casellaPostale.messaggio,
            mittente: casellaPostale.mittente
        };
        casellaPostale.letto = true; // Segna come letto
        // casellaPostale.messaggio = null; // Opzionale: pulisci dopo la lettura
        // casellaPostale.mittente = null;
        brick.showString("Msg per " + ricevente, 4);
        brick.showString(msgRicevuto.mittente + ": " + msgRicevuto.messaggio, 5);
        brick.sound(Sound.Confirm);
        console.log(ricevente + " ha ricevuto: '" + msgRicevuto.messaggio + "' da " + msgRicevuto.mittente);
        return msgRicevuto;
    }
    return null;
}

// --- Componenti Simulati del Robot ---

// Componente A: Invia un messaggio quando viene premuto il pulsante Sinistro
brick.buttonLeft.onEvent(ButtonEvent.Pressed, function () {
    brick.clearScreen();
    brick.showString("Simulazione Messaggi", 1);
    inviaMessaggio("Ostacolo rilevato!", "SensoreA");
});

// Componente B: Invia un messaggio quando viene premuto il pulsante Destro
brick.buttonRight.onEvent(ButtonEvent.Pressed, function () {
    brick.clearScreen();
    brick.showString("Simulazione Messaggi", 1);
    inviaMessaggio("Batteria scarica!", "SistemaB");
});

// Componente C (Ricevitore): Controlla periodicamente i messaggi
loops.forever(function () {
    let messaggio = riceviMessaggio("LogicaPrincipaleC");
    if (messaggio) {
        // Elabora il messaggio
        if (messaggio.mittente === "SensoreA" && messaggio.messaggio === "Ostacolo rilevato!") {
            brick.showString("Azione: Evita ostacolo", 7);
            // Simula azione
            motors.mediumBC.run(-30, 0.5, MoveUnit.Rotations);
            motors.mediumB.run(30, 0.5, MoveUnit.Rotations);
        } else if (messaggio.mittente === "SistemaB" && messaggio.messaggio === "Batteria scarica!") {
            brick.showString("Azione: Ritorna alla base", 7);
            motors.stopAll();
            brick.setLedPattern(LedPattern.OrangeFlash);
        }
    }
    // Pausa per non controllare troppo frequentemente
    loops.pause(1000);
});

// Pulsante per terminare
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
    motors.stopAll();
    brick.setLedPattern(LedPattern.Off);
    brick.clearScreen();
    brick.showString("Programma Terminato", 6);
    brick.sound(Sound.Goodbye);
    control.programStop();
});

// Note per MakeCode:
// 1. Incolla questo codice nella vista JavaScript.
// 2. Premi i pulsanti Sinistro o Destro sull'EV3 (o nel simulatore) per "inviare" messaggi.
// 3. Osserva il display e la console per vedere i messaggi inviati e ricevuti.
// 4. Questo è un modello molto semplificato. Sistemi di messaggistica reali sono più complessi
//    (code di messaggi, acknowledgement, gestione di più riceventi, ecc.).
// 5. Per una comunicazione reale tra due brick EV3, si dovrebbero usare piattaforme come ev3dev
//    con Python/C++ e moduli Bluetooth/Wi-Fi, oppure tecniche molto rudimentali come
//    display/sensore colore se i robot sono vicini e in linea di vista.