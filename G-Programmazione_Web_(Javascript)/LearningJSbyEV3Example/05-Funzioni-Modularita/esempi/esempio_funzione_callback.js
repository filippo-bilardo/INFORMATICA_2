// Esempio 5: Funzioni Callback per Eventi EV3
// Questo esempio dimostra come utilizzare le funzioni callback per gestire eventi dei sensori EV3.

/**
 * Funzione callback che viene eseguita quando il sensore a ultrasuoni rileva un oggetto vicino.
 * @param distanza La distanza rilevata dal sensore in cm.
 */
function oggettoRilevatoCallback(distanza: number) {
    brick.showString("Oggetto a: " + distanza + " cm", 4);
    brick.sound(Sound.PlayTone, 440, 200); // Emette un suono (La a 440Hz per 200ms)
    
    // Ferma i motori se l'oggetto è troppo vicino
    if (distanza < 10) {
        brick.motorA.stop();
        brick.motorB.stop();
        brick.showString("STOP! Oggetto vicino!", 5);
    }
}

/**
 * Funzione callback che viene eseguita quando il pulsante centrale del brick EV3 viene premuto.
 */
function pulsantePremutoCallback() {
    brick.showString("Pulsante Centrale Premuto!", 6);
    // Fa muovere il robot indietro per un breve periodo
    brick.motorA.run(-30);
    brick.motorB.run(-30);
    pause(500);
    brick.motorA.stop();
    brick.motorB.stop();
}

// Programma principale
brick.showString("Esempio Funzioni Callback", 1);
brick.showString("Avvicina un oggetto al sensore", 2);
brick.showString("o premi il pulsante centrale", 3);

// Imposta la callback per il sensore a ultrasuoni (porta 4)
// La callback 'oggettoRilevatoCallback' sarà chiamata quando la distanza è inferiore a 20 cm.
sensors.ultrasonic4.onEvent(UltrasonicSensorEvent.ObjectDetected, 20, oggettoRilevatoCallback);

// Imposta la callback per il pulsante centrale del brick EV3
brick.buttonEnter.onEvent(ButtonEvent.Pressed, pulsantePremutoCallback);

// Il programma principale può continuare a fare altre cose o semplicemente attendere gli eventi
// In questo caso, mettiamo un ciclo infinito per mantenere il programma attivo e reattivo agli eventi.
forever(() => {
    // Questo blocco 'forever' assicura che il programma non termini immediatamente,
    // permettendo alle callback degli eventi di essere attivate.
    pause(100); // Piccola pausa per non sovraccaricare il processore
});