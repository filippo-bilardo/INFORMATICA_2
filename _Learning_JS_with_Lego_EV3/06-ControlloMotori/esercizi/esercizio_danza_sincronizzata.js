// Esercizio 2: Danza Sincronizzata
// Descrizione: Creare una breve sequenza di movimenti sincronizzati per due motori (A e B),
// simulando una "danza".

brick.showString("Esercizio: Danza Sync", 1);

// Definizione delle mosse della danza
// Ogni mossa può essere una funzione o una serie di comandi diretti.

function mossaAvantiIndietro() {
    brick.showString("Avanti e Indietro", 3);
    // Avanti
    brick.motorA.run(60);
    brick.motorB.run(60);
    pause(1000);
    brick.stopAllMotors();
    pause(200);
    // Indietro
    brick.motorA.run(-60);
    brick.motorB.run(-60);
    pause(1000);
    brick.stopAllMotors();
    pause(200);
}

function mossaGiraAlternato() {
    brick.showString("Gira Alternato", 4);
    // Gira a destra
    brick.motorA.run(50);
    brick.motorB.run(-50);
    pause(700);
    brick.stopAllMotors();
    pause(200);
    // Gira a sinistra
    brick.motorA.run(-50);
    brick.motorB.run(50);
    pause(700);
    brick.stopAllMotors();
    pause(200);
}

function mossaCerchioPiccolo() {
    brick.showString("Cerchio Piccolo", 5);
    // Curva stretta (es. un motore più veloce dell'altro, o steering)
    brick.steer(50, 75); // Velocità 50%, sterzata 75 (curva stretta)
    pause(2000); // Durata per un piccolo cerchio (da calibrare)
    brick.stopAllMotors();
    pause(200);
}

// Sequenza della danza
brick.showString("Inizio Danza!", 2);
pause(500);

mossaAvantiIndietro();
mossaGiraAlternato();
mossaCerchioPiccolo();
mossaAvantiIndietro(); // Ripeti una mossa

brick.showString("Danza completata!", 7);
pause(1000);

brick.showString("Fine Esercizio 2", 9);

// Suggerimenti:
// 1. Sperimentare con diverse velocità, durate e sequenze.
// 2. Utilizzare `brick.steer(potenza, sterzata)` per curve più fluide.
// 3. Per movimenti più complessi, considerare l'uso di `brick.motorX.move()` con gradi o rotazioni.
// 4. La calibrazione dei tempi e delle potenze è fondamentale per un buon risultato.