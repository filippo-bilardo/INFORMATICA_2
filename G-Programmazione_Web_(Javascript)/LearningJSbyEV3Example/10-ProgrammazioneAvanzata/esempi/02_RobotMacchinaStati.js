// Esempio 10.2: Robot con Macchina a Stati
// Il robot alterna tra stati: ESPLORAZIONE, EVITAMENTO_OSTACOLO, RITORNO_BASE (semplificato)

let statoCorrente = "ESPLORAZIONE";

// Parametri
const velocitaEsplorazione = 30;
const velocitaEvitamento = 20;
const distanzaOstacolo = 20; // cm
let tempoInizioEsplorazione = 0;
const durataMassimaEsplorazione = 15000; // 15 secondi

brick.showString("Macchina a Stati", 1);
brick.showString("Stato: " + statoCorrente, 3);

// Funzioni di azione per ogni stato
function eseguiEsplorazione() {
    motors.mediumBC.run(velocitaEsplorazione);
    // Controlla se un ostacolo è vicino
    if (sensors.ultrasonic4.distance() < distanzaOstacolo) {
        cambiaStato("EVITAMENTO_OSTACOLO");
    }
    // Controlla se il tempo di esplorazione è scaduto (semplificazione per ritorno)
    if (control.millis() - tempoInizioEsplorazione > durataMassimaEsplorazione) {
        cambiaStato("RITORNO_BASE");
    }
}

function eseguiEvitamentoOstacolo() {
    motors.mediumBC.stop();
    brick.sound(Sound.Warning);
    // Semplice manovra di evitamento: indietreggia e gira
    motors.mediumBC.run(-velocitaEvitamento, 0.5, MoveUnit.Rotations);
    motors.mediumB.run(velocitaEvitamento, 0.8, MoveUnit.Rotations); // Gira
    motors.mediumC.run(-velocitaEvitamento, 0.8, MoveUnit.Rotations);
    motors.mediumBC.stop();
    // Dopo l'evitamento, torna a esplorare
    cambiaStato("ESPLORAZIONE");
}

function eseguiRitornoBase() {
    motors.mediumBC.stop();
    brick.sound(Sound.Information);
    brick.showString("Ritorno alla base...", 5);
    // Azione semplificata: si ferma e segnala
    // In un caso reale, qui ci sarebbe la logica per tornare al punto di partenza
    for (let i = 0; i < 3; i++) {
        brick.sound(Sound.Blip, 500);
        loops.pause(500);
    }
    cambiaStato("FERMO"); // Stato finale o di attesa
}

function eseguiFermo() {
    motors.stopAll();
    brick.showString("Robot Fermo.", 7);
    // Il robot rimane fermo finché non riceve un nuovo comando (es. pressione pulsante)
}

// Funzione per cambiare stato e aggiornare il display
function cambiaStato(nuovoStato) {
    statoCorrente = nuovoStato;
    brick.showString("Stato: " + statoCorrente, 3);
    console.log("Nuovo stato: " + statoCorrente);

    if (statoCorrente === "ESPLORAZIONE") {
        tempoInizioEsplorazione = control.millis();
    }
}

// Loop principale della macchina a stati
loops.forever(function () {
    switch (statoCorrente) {
        case "ESPLORAZIONE":
            eseguiEsplorazione();
            break;
        case "EVITAMENTO_OSTACOLO":
            eseguiEvitamentoOstacolo();
            break;
        case "RITORNO_BASE":
            eseguiRitornoBase();
            break;
        case "FERMO":
            eseguiFermo();
            break;
    }
    loops.pause(100); // Breve pausa per non sovraccaricare la CPU
});

// Inizializzazione
tempoInizioEsplorazione = control.millis();

// Pulsante per terminare il programma
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
    cambiaStato("FERMO");
    motors.stopAll();
    brick.clearScreen();
    brick.showString("Programma Terminato", 6);
    brick.sound(Sound.Goodbye);
    control.programStop();
});

// Nota: Per testare questo codice in MakeCode:
// 1. Crea un nuovo progetto.
// 2. Passa alla visualizzazione JavaScript.
// 3. Incolla questo codice.
// 4. Assicurati che il sensore a ultrasuoni (porta 4) e i motori (B, C) siano configurati.
// 5. Il "RITORNO_BASE" è semplificato. Una vera implementazione richiederebbe odometria o altri sensori.