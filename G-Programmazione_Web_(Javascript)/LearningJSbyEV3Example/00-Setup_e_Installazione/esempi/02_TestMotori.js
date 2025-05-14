<!-- filepath: /home/git-projects/INFORMATICA_2/G-Programmazione_Web_(Javascript)/LearningJSbyEV3Example/00-Setup_e_Installazione/esempi/02_TestMotori.js -->
// TestMotori.js
// Questo script verifica il funzionamento dei motori del robot EV3

// Pulisci lo schermo e mostra un messaggio iniziale
brick.clearScreen();
brick.showString("Test Motori", 1);
brick.showString("Inizio tra 3s...", 2);
pause(3000);

// IMPORTANTE: Questo test assume che i motori grandi siano collegati alle porte B e C
// Se hai una configurazione diversa, modifica il codice di conseguenza

// Funzione per mostrare lo stato corrente del test
function mostraStato(operazione, dettagli) {
    brick.clearScreen();
    brick.showString("Test: " + operazione, 1);
    brick.showString(dettagli, 2);
}

// 1. Test del motore B
mostraStato("Motore B", "Rotazione oraria");
motors.largeB.setSpeed(50);  // Velocità al 50%
motors.largeB.run();         // Avvia il motore
pause(2000);                 // Lascia girare per 2 secondi
motors.largeB.stop();        // Ferma il motore
pause(1000);                 // Pausa di 1 secondo

// Rotazione in senso antiorario
mostraStato("Motore B", "Rotazione antioraria");
motors.largeB.setSpeed(-50); // Velocità negativa per inversione
motors.largeB.run();         // Avvia il motore
pause(2000);                 // Lascia girare per 2 secondi
motors.largeB.stop();        // Ferma il motore
pause(1000);                 // Pausa di 1 secondo

// 2. Test del motore C
mostraStato("Motore C", "Rotazione oraria");
motors.largeC.setSpeed(50);  // Velocità al 50%
motors.largeC.run();         // Avvia il motore
pause(2000);                 // Lascia girare per 2 secondi
motors.largeC.stop();        // Ferma il motore
pause(1000);                 // Pausa di 1 secondo

// Rotazione in senso antiorario
mostraStato("Motore C", "Rotazione antioraria");
motors.largeC.setSpeed(-50); // Velocità negativa per inversione
motors.largeC.run();         // Avvia il motore
pause(2000);                 // Lascia girare per 2 secondi
motors.largeC.stop();        // Ferma il motore
pause(1000);                 // Pausa di 1 secondo

// 3. Test dei motori sincronizzati (B+C insieme)
mostraStato("Motori B+C", "Avanti");
motors.largeBC.setSpeed(50); // Velocità al 50%
motors.largeBC.run();        // Avvia entrambi i motori
pause(2000);                 // Lascia girare per 2 secondi
motors.largeBC.stop();       // Ferma i motori
pause(1000);                 // Pausa di 1 secondo

// Indietro
mostraStato("Motori B+C", "Indietro");
motors.largeBC.setSpeed(-50); // Velocità negativa per inversione
motors.largeBC.run();         // Avvia entrambi i motori
pause(2000);                  // Lascia girare per 2 secondi
motors.largeBC.stop();        // Ferma i motori
pause(1000);                  // Pausa di 1 secondo

// 4. Test di rotazione a destra (B avanti, C indietro)
mostraStato("Rotazione", "Destra");
motors.largeB.setSpeed(50);   // B avanti
motors.largeC.setSpeed(-50);  // C indietro
motors.largeB.run();
motors.largeC.run();
pause(2000);                  // Ruota per 2 secondi
motors.largeBC.stop();        // Ferma entrambi i motori
pause(1000);                  // Pausa di 1 secondo

// 5. Test di rotazione a sinistra (B indietro, C avanti)
mostraStato("Rotazione", "Sinistra");
motors.largeB.setSpeed(-50);  // B indietro
motors.largeC.setSpeed(50);   // C avanti
motors.largeB.run();
motors.largeC.run();
pause(2000);                  // Ruota per 2 secondi
motors.largeBC.stop();        // Ferma entrambi i motori

// Test completato
brick.clearScreen();
brick.showString("Test Motori", 1);
brick.showString("Completato!", 2);
music.playSoundEffect(SoundEffect.Success);
pause(3000);

// Pulizia finale
brick.clearScreen();
