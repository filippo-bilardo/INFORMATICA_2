// Esempio 5: Feedback dai Motori
// Descrizione: Come leggere informazioni dai motori, come la posizione attuale o la velocità.

brick.showString("Esempio Feedback Motori", 1);

// Assicurarsi che i motori A e B siano collegati.

// --- Leggere la Posizione del Motore A ---
brick.showString("Motore A: Leggi Posizione", 3);
brick.motorA.resetCounts(); // Resetta il conteggio della posizione a 0
pause(500);

brick.motorA.run(50); // Avvia il motore A
pause(1000);          // Lascialo girare per 1 secondo
var posizioneA = brick.motorA.readPosition(); // Leggi la posizione in gradi
brick.motorA.stop();
brick.showString("Posizione A: " + posizioneA + " gr", 4);
pause(2000);

// --- Leggere la Velocità del Motore B ---
// La lettura della velocità potrebbe non essere direttamente supportata o precisa
// in tutte le implementazioni EV3 JavaScript. Spesso si calcola.
// Qui simuliamo una lettura o mostriamo come potrebbe essere.
brick.showString("Motore B: Leggi Velocita'", 5);
brick.motorB.run(75);
pause(1000);
// Idealmente: var velocitaB = brick.motorB.readSpeed();
// Ma `readSpeed()` potrebbe non esistere. In alternativa, si può osservare il comportamento.
// Per questo esempio, mostriamo solo che il motore è in funzione.
brick.showString("Motore B in movimento", 6);
pause(1000);
brick.motorB.stop();
pause(500);

// --- Utilizzare il feedback per un movimento controllato ---
// Muovi il motore A fino a raggiungere una certa posizione.
brick.showString("Motore A: a 180 gradi", 7);
brick.motorA.resetCounts();
brick.motorA.setPower(40);
brick.motorA.start();

while(brick.motorA.readPosition() < 180) {
    // Attendi finché la posizione non è >= 180 gradi
    script.wait(20); // Breve pausa per non sovraccaricare la CPU
}
brick.motorA.stop();
brick.showString("Motore A: Raggiunto 180gr", 8);
pause(2000);

brick.showString("Esecuzione completata.", 10);

// Nota:
// - `brick.motorX.readPosition()` restituisce la posizione del motore in gradi dal suo ultimo reset.
// - `brick.motorX.resetCounts()` azzera il contatore di posizione del motore.
// - La lettura diretta della velocità (`readSpeed()`) potrebbe non essere sempre disponibile o affidabile.
//   Spesso si deduce la velocità dalla potenza impostata o si calcola misurando la variazione di posizione nel tempo.
// - Il feedback è cruciale per sistemi a ciclo chiuso (closed-loop control).