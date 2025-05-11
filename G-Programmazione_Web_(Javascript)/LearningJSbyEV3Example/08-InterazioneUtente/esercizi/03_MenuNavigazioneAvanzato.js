// Esercizio 03: Menu di Navigazione Avanzato
// TODO: Implementare la logica per un menu di navigazione avanzato sull'EV3

brick.showString("Menu Navigazione Avanzato", 1)

// Esempio: Mostra opzioni e attendi input
let opzioneSelezionata = 0;
const opzioni = ["Opzione A", "Opzione B", "Opzione C"];

function mostraMenu() {
    brick.clearScreen();
    for (let i = 0; i < opzioni.length; i++) {
        if (i === opzioneSelezionata) {
            brick.showString("> " + opzioni[i], i + 2);
        } else {
            brick.showString("  " + opzioni[i], i + 2);
        }
    }
}

mostraMenu();

control.onEvent(DAL.KEY_UP, DAL.KEY_PRESSED, function() {
    opzioneSelezionata = (opzioneSelezionata - 1 + opzioni.length) % opzioni.length;
    mostraMenu();
});

control.onEvent(DAL.KEY_DOWN, DAL.KEY_PRESSED, function() {
    opzioneSelezionata = (opzioneSelezionata + 1) % opzioni.length;
    mostraMenu();
});

control.onEvent(DAL.KEY_ENTER, DAL.KEY_PRESSED, function() {
    brick.showString("Selezionato: " + opzioni[opzioneSelezionata], 8);
    // TODO: Aggiungere azioni specifiche per ogni opzione
});