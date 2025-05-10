// Esercizio 2: Funzione con Parametri per Controllare la Velocità
// Obiettivo: Scrivere una funzione che accetti la velocità come parametro e faccia muovere il robot EV3 in avanti a quella velocità per 2 secondi.

/**
 * Funzione per far muovere il robot in avanti con una velocità specificata.
 * @param velocitaMotori Percentuale di potenza per i motori (0-100).
 */
function muoviAvantiConVelocita(velocitaMotori: number) {
    brick.showString("Avanti con V:" + velocitaMotori + "%", 2);
    
    // Assicurati che la velocità sia nel range consentito (MakeCode potrebbe farlo automaticamente)
    let velocitaEffettiva = Math.max(0, Math.min(100, velocitaMotori));

    brick.motorA.run(velocitaEffettiva);
    brick.motorB.run(velocitaEffettiva);
    pause(2000); // Muovi per 2 secondi
    brick.motorA.stop();
    brick.motorB.stop();
    
    brick.showString("Movimento completato", 4);
}

// Programma principale
brick.showString("Esercizio Funzione Velocita", 1);
pause(1000);

// Chiama la funzione con diverse velocità
brick.showString("Test con velocita 30%", 3);
pause(500);
muoviAvantiConVelocita(30);
pause(1000);

brick.clearScreen();
brick.showString("Test con velocita 75%", 3);
pause(500);
muoviAvantiConVelocita(75);
pause(1000);

brick.clearScreen();
brick.showString("Test con velocita 100%", 3);
pause(500);
muoviAvantiConVelocita(100);
pause(1000);

brick.showString("Esercizio terminato.", 6);