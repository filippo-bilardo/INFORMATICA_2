// Esercizio 4: Scomporre un Compito Complesso in Funzioni
// Obiettivo: Scrivere un programma che faccia seguire al robot un percorso quadrato, scomponendo il compito in funzioni più piccole.
// Ad esempio: una funzione per muovere avanti per una certa distanza, una funzione per girare di 90 gradi.

/**
 * Muove il robot in avanti per una durata specificata.
 * @param durataMS Millisecondi per cui muoversi avanti.
 * @param velocita Percentuale di potenza dei motori (default 50).
 */
function muoviAvantiPer(durataMS: number, velocita: number = 50) {
    brick.showString("Avanti per " + durataMS + "ms", 3);
    brick.motorA.run(velocita);
    brick.motorB.run(velocita);
    pause(durataMS);
    brick.motorA.stop();
    brick.motorB.stop();
    pause(200); // Piccola pausa dopo il movimento
}

/**
 * Fa girare il robot a destra di circa 90 gradi.
 * @param durataRotazioneMS Millisecondi per la rotazione (da calibrare).
 * @param velocitaRotazione Percentuale di potenza dei motori per la rotazione (default 40).
 */
function giraADestra90(durataRotazioneMS: number = 550, velocitaRotazione: number = 40) { // Valore di durataRotazioneMS da calibrare
    brick.showString("Giro a destra...", 4);
    brick.motorA.run(velocitaRotazione);
    brick.motorB.run(-velocitaRotazione); // Motori in direzioni opposte per girare sul posto
    pause(durataRotazioneMS);
    brick.motorA.stop();
    brick.motorB.stop();
    pause(200); // Piccola pausa dopo la rotazione
}

/**
 * Fa seguire al robot un percorso quadrato.
 */
function disegnaQuadrato() {
    let latoDurata = 1500; // Durata per percorrere un lato del quadrato (in ms)
    let velocitaLato = 60;
    // Valore di durataRotazioneMS per giraADestra90 va calibrato per il proprio robot e superficie
    // Potrebbe essere necessario un valore diverso da 550ms.
    let durataGiro = 550; 

    brick.showString("Inizio quadrato!", 2);
    for (let i = 0; i < 4; i++) {
        brick.showString("Lato " + (i + 1), 5);
        muoviAvantiPer(latoDurata, velocitaLato);
        giraADestra90(durataGiro);
    }
    brick.showString("Quadrato completato!", 6);
}

// Programma principale
brick.showString("Esercizio Scomposizione", 1);
pause(1000);

// Chiama la funzione per disegnare il quadrato
disegnaQuadrato();

brick.showString("Esercizio terminato.", 8);