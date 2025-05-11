// Esempio 3: Movimenti Sincronizzati (Tank Drive)
// Descrizione: Come controllare una coppia di motori (es. A e B) per far muovere il robot in modo coordinato.

brick.showString("Esempio Mov Sincronizzati", 1);

// --- Muovere Avanti ---
brick.showString("Avanti (A+B a 50%)", 3);
brick.motorA.run(50);
brick.motorB.run(50);
pause(2000); // Muovi per 2 secondi
brick.stopAllMotors();
pause(500);

// --- Muovere Indietro ---
brick.showString("Indietro (A+B a -50%)", 4);
brick.motorA.run(-50);
brick.motorB.run(-50);
pause(2000);
brick.stopAllMotors();
pause(500);

// --- Girare a Destra sul Posto ---
// Motore A avanti, Motore B indietro
brick.showString("Gira Destra (A:50, B:-50)", 5);
brick.motorA.run(50);
brick.motorB.run(-50);
pause(1000); // Gira per 1 secondo (da calibrare per 90 gradi)
brick.stopAllMotors();
pause(500);

// --- Girare a Sinistra sul Posto ---
// Motore A indietro, Motore B avanti
brick.showString("Gira Sinistra (A:-50, B:50)", 6);
brick.motorA.run(-50);
brick.motorB.run(50);
pause(1000); // Gira per 1 secondo (da calibrare per 90 gradi)
brick.stopAllMotors();
pause(500);

// --- Curva Ampia a Destra ---
// Motore A più veloce del Motore B (entrambi in avanti)
brick.showString("Curva Dx (A:60, B:30)", 7);
brick.motorA.run(60);
brick.motorB.run(30);
pause(2000);
brick.stopAllMotors();
pause(500);

// --- Curva Ampia a Sinistra ---
// Motore B più veloce del Motore A (entrambi in avanti)
brick.showString("Curva Sx (A:30, B:60)", 8);
brick.motorA.run(30);
brick.motorB.run(60);
pause(2000);
brick.stopAllMotors();

brick.showString("Esecuzione completata.", 10);