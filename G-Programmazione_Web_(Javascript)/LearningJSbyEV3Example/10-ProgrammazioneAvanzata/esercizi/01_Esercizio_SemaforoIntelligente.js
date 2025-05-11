// Esercizio 01: Semaforo Intelligente con Eventi e Stati
// Obiettivo: Simulare un semaforo per il robot che cambia stato (Rosso, Giallo, Verde)
// in base al tempo e a un input esterno (es. pressione di un pulsante per "chiamata pedonale").
//
// Concetti da Applicare: Programmazione guidata dagli eventi, macchine a stati finiti (FSM), gestione del tempo.
//
// Suggerimenti:
// 1. Definisci gli stati del semaforo (es. ROSSO, GIALLO_VERDE, VERDE, GIALLO_ROSSO).
// 2. Usa variabili per tenere traccia dello stato corrente e del tempo trascorso in quello stato.
// 3. Usa `loops.pause()` o `control.millis()` per gestire le durate degli stati.
// 4. Implementa un gestore eventi per il pulsante (es. `brick.buttonEnter.onEvent`) per la "chiamata pedonale".
// 5. Quando il pulsante viene premuto, il semaforo dovrebbe passare a GIALLO_ROSSO e poi a ROSSO più rapidamente,
//    o gestire una logica specifica per il pedone.
// 6. Visualizza lo stato corrente del semaforo sul display del brick EV3 (es. con luci o stringhe).

brick.showString("Esercizio: Semaforo", 1);

// Definisci gli stati del semaforo come stringhe o numeri
const STATO_ROSSO = "ROSSO";
const STATO_GIALLO_VERDE = "GIALLO_VERDE"; // Giallo prima di diventare verde
const STATO_VERDE = "VERDE";
const STATO_GIALLO_ROSSO = "GIALLO_ROSSO"; // Giallo prima di diventare rosso

let statoCorrente = STATO_ROSSO;
let tempoNelloStato = 0;
let richiestaPedonale = false;

// Durate per ogni stato (in millisecondi)
const DURATA_ROSSO = 5000;
const DURATA_GIALLO = 2000;
const DURATA_VERDE = 5000;

// Funzione per cambiare lo stato e visualizzarlo
function cambiaStato(nuovoStato) {
    statoCorrente = nuovoStato;
    tempoNelloStato = 0;
    brick.showString("Stato: " + statoCorrente, 3);
    console.log("Nuovo stato: " + statoCorrente);

    // Logica visiva per il semaforo (es. usando le luci del brick o suoni)
    switch (statoCorrente) {
        case STATO_ROSSO:
            brick.setStatusLight(StatusLight.Red);
            // motors.stopAll(); // Esempio: ferma il robot se il semaforo è rosso
            break;
        case STATO_GIALLO_VERDE:
        case STATO_GIALLO_ROSSO:
            brick.setStatusLight(StatusLight.Orange);
            break;
        case STATO_VERDE:
            brick.setStatusLight(StatusLight.Green);
            // motors.largeBC.run(50); // Esempio: il robot si muove se verde
            break;
    }
}

// Gestore per la chiamata pedonale
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
    brick.showString("Chiamata Pedonale!", 5);
    console.log("Chiamata pedonale ricevuta");
    richiestaPedonale = true;
});

// Inizializza il semaforo
cambiaStato(STATO_ROSSO);

// Ciclo principale della macchina a stati
loops.forever(function () {
    loops.pause(100); // Controlla lo stato ogni 100ms
    tempoNelloStato += 100;

    switch (statoCorrente) {
        case STATO_ROSSO:
            if (tempoNelloStato >= DURATA_ROSSO) {
                cambiaStato(STATO_GIALLO_VERDE);
            }
            break;
        case STATO_GIALLO_VERDE:
            if (tempoNelloStato >= DURATA_GIALLO) {
                cambiaStato(STATO_VERDE);
                richiestaPedonale = false; // Resetta la richiesta pedonale dopo il verde
            }
            break;
        case STATO_VERDE:
            // Se c'è una richiesta pedonale e il verde è durato abbastanza,
            // o se il tempo normale del verde è scaduto.
            if ((richiestaPedonale && tempoNelloStato >= DURATA_GIALLO) || tempoNelloStato >= DURATA_VERDE) {
                cambiaStato(STATO_GIALLO_ROSSO);
            }
            break;
        case STATO_GIALLO_ROSSO:
            if (tempoNelloStato >= DURATA_GIALLO) {
                cambiaStato(STATO_ROSSO);
            }
            break;
    }
});

console.log("Sistema semaforico avviato.");
console.log("Premi Enter per la chiamata pedonale.");