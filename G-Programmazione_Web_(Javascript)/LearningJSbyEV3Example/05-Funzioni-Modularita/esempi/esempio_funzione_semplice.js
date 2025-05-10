// Esempio 1: Definizione e Chiamata di Funzioni Semplici
// In questo esempio, definiamo una funzione semplice che fa muovere il robot EV3 in avanti e poi la chiamiamo.

/**
 * Funzione per far muovere il robot in avanti per 1 secondo.
 */
function muoviAvanti() {
    brick.motorA.run(50); // Avvia il motore A al 50% della potenza
    brick.motorB.run(50); // Avvia il motore B al 50% della potenza
    pause(1000);          // Pausa per 1 secondo
    brick.motorA.stop();  // Ferma il motore A
    brick.motorB.stop();  // Ferma il motore B
    brick.showString("Robot mosso in avanti!", 4);
}

// Programma principale
brick.showString("Esempio Funzione Semplice", 2);

// Chiamata alla funzione per muovere il robot
muoviAvanti();

brick.showString("Esecuzione completata.", 6);