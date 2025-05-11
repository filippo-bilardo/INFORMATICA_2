// Esercizio 04: Feedback Multimodale Complesso
// TODO: Implementare la logica per un sistema di feedback multimodale complesso

brick.showString("Feedback Multimodale", 1);

// Esempio: combina suoni, luci e display per un feedback
function feedbackPositivo() {
    brick.showString("Successo!", 3);
    brick.setLedPattern(LEDLighting.GREEN_FLASH);
    sound.playSound(files.mediaSound(SoundMedia.CONFIRM), 100);
    pause(2000); // Mantieni il feedback per 2 secondi
    brick.setLedPattern(LEDLighting.OFF);
    brick.clearScreen();
}

function feedbackNegativo() {
    brick.showString("Errore!", 3);
    brick.setLedPattern(LEDLighting.RED_FLASH);
    sound.playSound(files.mediaSound(SoundMedia.ERROR_ALARM), 100);
    pause(2000);
    brick.setLedPattern(LEDLighting.OFF);
    brick.clearScreen();
}

// Simula un'azione che potrebbe avere successo o fallire
let azioneRiuscita = Math.random() > 0.5;

if (azioneRiuscita) {
    feedbackPositivo();
} else {
    feedbackNegativo();
}

// TODO: Integrare questo tipo di feedback in un'applicazione più complessa,
// ad esempio, un robot che naviga un labirinto e fornisce feedback 
// basato sul successo o fallimento nel trovare l'uscita.