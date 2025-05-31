// Esempio 4: Controllo della Sterzata (Steering)
// Descrizione: Utilizzare il parametro `steering` per controllare la direzione di un robot con due motori (A e B).
// Il parametro `steering` va da -100 (gira bruscamente a sinistra) a 100 (gira bruscamente a destra).
// 0 significa movimento dritto.

brick.showString("Esempio Controllo Sterzata", 1);

// Motori A e B sono considerati i motori di trazione.
// Assicurarsi che siano collegati correttamente.

// --- Muovere Dritto ---
brick.showString("Avanti Dritto (Steer:0)", 3);
// brick.tank(velocitaSinistra, velocitaDestra) è un modo, ma per steering si usa:
// brick.steer(velocitaPercentuale, sterzataPercentuale)
// Ad esempio, per muovere dritto al 50% della potenza:
brick.steer(50, 0); // Velocità 50%, Sterzata 0 (dritto)
pause(2000);
brick.stopAllMotors();
pause(500);

// --- Curva Leggera a Destra ---
brick.showString("Curva Dx Leggera (Steer:25)", 4);
brick.steer(50, 25); // Velocità 50%, Sterzata 25 (leggera a destra)
pause(2000);
brick.stopAllMotors();
pause(500);

// --- Curva Stretta a Sinistra ---
brick.showString("Curva Sx Stretta (Steer:-50)", 5);
brick.steer(50, -50); // Velocità 50%, Sterzata -50 (stretta a sinistra)
pause(2000);
brick.stopAllMotors();
pause(500);

// --- Girare sul Posto a Destra (simulato con steering) ---
// Per girare sul posto, uno dei motori va indietro. `brick.steer` potrebbe non essere ideale
// per una rotazione perfetta sul posto, `brick.tank` è più indicato.
// Tuttavia, con steering a 100, un motore andrà molto più veloce dell'altro o uno potrebbe fermarsi/invertirsi.
brick.showString("Gira Dx (Steer:100)", 6);
brick.steer(40, 100); // Velocità 40%, Sterzata 100 (massima a destra)
pause(1500); // Calibrare durata per 90 gradi
brick.stopAllMotors();
pause(500);

// --- Girare sul Posto a Sinistra (simulato con steering) ---
brick.showString("Gira Sx (Steer:-100)", 7);
brick.steer(40, -100); // Velocità 40%, Sterzata -100 (massima a sinistra)
pause(1500); // Calibrare durata per 90 gradi
brick.stopAllMotors();

brick.showString("Esecuzione completata.", 9);

// Nota: l'effettivo comportamento di `brick.steer(power, turnRatio)`
// distribuisce la potenza ai motori. Ad esempio:
// turnRatio = 0: motorA = power, motorB = power
// turnRatio = 100: motorA = power, motorB = power * (1 - 2 * (100/100)) = -power (gira a destra)
// turnRatio = -100: motorA = power * (1 - 2 * (100/100)) = -power, motorB = power (gira a sinistra)
// Questo significa che con +/-100, i motori vanno in direzioni opposte alla stessa velocità `power`.
// Per valori intermedi, la velocità di un motore viene ridotta.