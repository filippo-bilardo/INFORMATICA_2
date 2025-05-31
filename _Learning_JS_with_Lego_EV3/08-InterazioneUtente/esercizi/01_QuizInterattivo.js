// Esercizio 01: Quiz Interattivo
// Scopo: Creare un semplice quiz a cui l'utente può rispondere utilizzando i pulsanti del brick EV3.

// Funzione per mostrare una domanda e attendere una risposta
function faiDomanda(domanda, opzioneSu, opzioneGiu, opzioneEnter, rispostaCorretta) {
    brick.showString(domanda, 1);
    brick.showString("Up: " + opzioneSu, 3);
    brick.showString("Down: " + opzioneGiu, 4);
    brick.showString("Enter: " + opzioneEnter, 5);

    let rispostaUtente = "";
    let dataReady = false;

    control.onEvent(DAL.DEVICE_ID_BUTTON_UP, DAL.DEVICE_BUTTON_EVT_CLICK, function () {
        rispostaUtente = "UP";
        dataReady = true;
    });

    control.onEvent(DAL.DEVICE_ID_BUTTON_DOWN, DAL.DEVICE_BUTTON_EVT_CLICK, function () {
        rispostaUtente = "DOWN";
        dataReady = true;
    });

    control.onEvent(DAL.DEVICE_ID_BUTTON_ENTER, DAL.DEVICE_BUTTON_EVT_CLICK, function () {
        rispostaUtente = "ENTER";
        dataReady = true;
    });

    // Attendi una risposta
    while (!dataReady) {
        pause(100);
    }

    brick.clearScreen();
    if (rispostaUtente === rispostaCorretta) {
        brick.showString("Corretto!", 6);
        brick.sound(Note.G4, 200);
    } else {
        brick.showString("Sbagliato.", 6);
        brick.sound(Note.C4, 200);
    }
    pause(2000);
    brick.clearScreen();
    return rispostaUtente === rispostaCorretta;
}

// Inizio del quiz
brick.showString("Benvenuto al Quiz EV3!", 1);
pause(2000);
brick.clearScreen();

let punteggio = 0;

// Domanda 1
if (faiDomanda("Quale sensore rileva i colori?", "Touch", "Colore", "Ultrasuoni", "DOWN")) {
    punteggio++;
}

// Domanda 2
if (faiDomanda("Quale pulsante e' al centro?", "Su", "Giu'", "Enter", "ENTER")) {
    punteggio++;
}

// Domanda 3
if (faiDomanda("EV3 sta per...?", "Evolution 3", "Mindstorms EV3", "Nessuno dei due", "UP")) { // Risposta fittizia per esempio
    punteggio++;
}

brick.showString("Quiz Terminato!", 1);
brick.showString("Punteggio: " + punteggio + "/3", 3);
pause(5000);