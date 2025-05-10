// Esercizio 3: Utilizzare Valori di Ritorno per Decisioni
// Obiettivo: Scrivere una funzione che controlli la distanza da un ostacolo utilizzando il sensore a ultrasuoni
// e restituisca true se un ostacolo è vicino (es. < 15 cm), false altrimenti.
// Il programma principale dovrà usare questo valore di ritorno per decidere se muoversi avanti o fermarsi.

/**
 * Controlla se c'è un ostacolo vicino.
 * @param sogliaDistanza La distanza (in cm) sotto la quale un ostacolo è considerato vicino.
 * @returns true se un ostacolo è più vicino della sogliaDistanza, false altrimenti.
 */
function ostacoloVicino(sogliaDistanza: number): boolean {
    let distanzaAttuale = sensors.ultrasonic4.distance(); // Legge la distanza dal sensore (porta 4)
    brick.showString("Distanza: " + distanzaAttuale + " cm", 3);

    if (distanzaAttuale < sogliaDistanza) {
        brick.showString("Ostacolo VICINO!", 4);
        return true;
    } else {
        brick.showString("Via libera", 4);
        return false;
    }
}

// Programma principale
brick.showString("Esercizio Funzione Ritorno", 1);
let distanzaSicurezza = 15; // cm

// Loop principale del robot
forever(() => {
    brick.showString("Controllo ostacoli...", 2);
    pause(500);

    if (ostacoloVicino(distanzaSicurezza)) {
        // Ostacolo rilevato, fermati!
        brick.motorA.stop();
        brick.motorB.stop();
        brick.sound(Sound.PlayTone, 262, 300); // Suono di avviso (Do)
        brick.showString("FERMO! Ostacolo rilevato.", 5);
    } else {
        // Nessun ostacolo, muoviti avanti lentamente
        brick.motorA.run(30);
        brick.motorB.run(30);
        brick.showString("AVANTI piano...", 5);
    }
    pause(1000); // Attendi un po' prima del prossimo controllo
});

// Nota: Il blocco 'forever' eseguirà continuamente il controllo.
// Per terminare il programma su EV3, di solito si usa il pulsante 'back'.