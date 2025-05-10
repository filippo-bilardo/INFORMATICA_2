// Esercizio 1: Creare una Funzione per un Movimento Specifico
// Obiettivo: Scrivere una funzione che faccia eseguire al robot EV3 una sequenza di movimenti (es. avanti, gira a destra, avanti).

/**
 * Funzione per eseguire una sequenza di movimenti:
 * 1. Muovi avanti per 1 secondo.
 * 2. Gira a destra per 0.5 secondi.
 * 3. Muovi avanti per 1 secondo.
 */
function eseguiManovraSpecifica() {
    brick.showString("Eseguo manovra...", 2);

    // 1. Muovi avanti
    brick.motorA.run(50);
    brick.motorB.run(50);
    pause(1000);
    brick.motorA.stop();
    brick.motorB.stop();
    brick.showString("Avanti completato", 3);
    pause(500);

    // 2. Gira a destra (motore A avanti, motore B indietro o fermo/più lento)
    brick.motorA.run(50);
    brick.motorB.run(-50); // O brick.motorB.stop(); o brick.motorB.run(20);
    pause(500); // Durata della rotazione
    brick.motorA.stop();
    brick.motorB.stop();
    brick.showString("Girato a destra", 4);
    pause(500);

    // 3. Muovi avanti
    brick.motorA.run(50);
    brick.motorB.run(50);
    pause(1000);
    brick.motorA.stop();
    brick.motorB.stop();
    brick.showString("Secondo avanti completato", 5);
    pause(500);

    brick.showString("Manovra completata!", 7);
}

// Programma principale
brick.showString("Esercizio Funzione Movimento", 1);
pause(1000);

// Chiamata alla funzione per eseguire la manovra
eseguiManovraSpecifica();

brick.showString("Esercizio terminato.", 9);