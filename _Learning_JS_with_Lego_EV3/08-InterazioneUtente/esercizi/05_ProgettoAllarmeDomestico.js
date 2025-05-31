// Esercizio 05: Progetto Allarme Domestico Semplice
// TODO: Implementare la logica per un semplice sistema di allarme domestico

brick.showString("Allarme Domestico", 1);

let allarmeAttivo = false;
let codiceSegreto = "1234";
let inputCodice = "";

// Sensore (simulato con un pulsante)
// In un progetto reale, si userebbe un sensore di movimento o contatto
control.onEvent(DAL.KEY_ENTER, DAL.KEY_PRESSED, function() {
    if (allarmeAttivo) {
        brick.showString("INTRUSIONE!", 3);
        brick.setLedPattern(LEDLighting.RED_PULSE);
        sound.playSound(files.mediaSound(SoundMedia.ALARM_1), 100);
        // TODO: Aggiungere altre azioni, come inviare una notifica (se possibile con EV3 e MakeCode)
    } else {
        brick.showString("Allarme disattivato", 3);
    }
});

// Interfaccia per attivare/disattivare l'allarme
brick.showString("UP: Attiva/Disattiva", 5);
brick.showString("LEFT/RIGHT: Inserisci codice", 6);

control.onEvent(DAL.KEY_UP, DAL.KEY_PRESSED, function() {
    if (inputCodice === codiceSegreto) {
        allarmeAttivo = !allarmeAttivo;
        if (allarmeAttivo) {
            brick.showString("Allarme ATTIVATO", 2);
            brick.setLedPattern(LEDLighting.GREEN);
        } else {
            brick.showString("Allarme DISATTIVATO", 2);
            brick.setLedPattern(LEDLighting.OFF);
        }
        inputCodice = ""; // Resetta il codice inserito
    } else {
        brick.showString("Codice errato!", 2);
        sound.playSound(files.mediaSound(SoundMedia.ERROR), 100);
    }
    brick.showString("Codice: " + inputCodice, 7);
});

// Semplice input codice (solo per dimostrazione, molto limitato)
// Per un input più robusto, si potrebbe usare un menu o una sequenza di pressioni
control.onEvent(DAL.KEY_LEFT, DAL.KEY_PRESSED, function() {
    inputCodice += "1"; // Simula l'inserimento di una cifra
    brick.showString("Codice: " + inputCodice, 7);
});

control.onEvent(DAL.KEY_RIGHT, DAL.KEY_PRESSED, function() {
    inputCodice += "2"; // Simula l'inserimento di un'altra cifra
    brick.showString("Codice: " + inputCodice, 7);
});

// TODO: Migliorare l'inserimento del codice
// TODO: Aggiungere un timer per l'attivazione ritardata dell'allarme
// TODO: Salvare lo stato dell'allarme (se possibile)