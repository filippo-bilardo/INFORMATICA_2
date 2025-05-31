// Esercizio 5: Braccio Robotico Semplice (con Motore Medio)
// Descrizione: Se si dispone di un motore medio (es. Motore M), programmarlo per
// alzare e abbassare un braccio collegato, muovendolo a posizioni specifiche (es. 0 gradi, 90 gradi).

brick.showString("Esercizio: Braccio Robot", 1);

// Assicurarsi che un motore medio sia collegato alla porta M (o altra porta per motori medi se diversa).
var motoreBraccio = brick.motorM; // Assumiamo motore M per il braccio

if (!motoreBraccio) {
    brick.showString("Motore M non trovato!", 3);
    brick.showString("Collega un motore medio.", 4);
    script.wait(3000);
} else {
    brick.showString("Braccio Robotico Pronto", 2);
    pause(1000);

    // Parametri del movimento del braccio
    var potenzaBraccio = 30; // Potenza moderata per il braccio
    var posizioneAltaGradi = 90; // Posizione "alta" del braccio (es. 90 gradi dalla partenza)
    var posizioneBassaGradi = 0;   // Posizione "bassa" del braccio (posizione di reset)

    // Funzione per muovere il braccio a una posizione specifica (in gradi)
    function muoviBraccioA(gradiTarget) {
        // Resettare il contatore può essere utile per movimenti assoluti, ma move() è relativo.
        // Per un controllo più preciso della posizione assoluta, si potrebbe usare un loop con readPosition().
        // Qui usiamo move() per semplicità, assumendo che partiamo da una posizione nota o la resettiamo.
        
        var posizioneCorrente = motoreBraccio.readPosition();
        var gradiDaMuovere = gradiTarget - posizioneCorrente;

        brick.showString("Muovo a: " + gradiTarget + "gr", 4);
        if (gradiDaMuovere !== 0) {
            motoreBraccio.move(potenzaBraccio, gradiDaMuovere, 'degrees');
            script.waitMotorStops(motoreBraccio.name()); // Attendi la fine del movimento
        }    
        brick.showString("Pos: " + motoreBraccio.readPosition() + "gr", 5);
        pause(500);
    }

    // Sequenza di movimenti del braccio
    brick.showString("Reset braccio...", 3);
    motoreBraccio.resetCounts(); // Azzera la posizione iniziale del braccio
    pause(500);

    // Alza il braccio
    muoviBraccioA(posizioneAltaGradi);
    pause(1000);

    // Abbassa il braccio
    muoviBraccioA(posizioneBassaGradi);
    pause(1000);

    // Alza di nuovo a metà
    muoviBraccioA(posizioneAltaGradi / 2);
    pause(1000);

    // Torna in basso
    muoviBraccioA(posizioneBassaGradi);

    brick.showString("Movimento braccio OK!", 7);
    pause(1000);
}

brick.showString("Fine Esercizio 5", 9);

// Suggerimenti:
// 1. Calibrare `posizioneAltaGradi` e `posizioneBassaGradi` in base alla costruzione del braccio.
// 2. Il motore medio è generalmente meno potente di quelli grandi, quindi usare `potenzaBraccio` adeguata.
// 3. `motoreBraccio.resetCounts()` è importante per definire lo "zero" del braccio.
// 4. Per movimenti più fluidi o per mantenere una posizione sotto carico, potrebbero essere necessarie tecniche più avanzate
//    (non trattate qui), come un controllo PID semplice (Proporzionale-Integrale-Derivativo).
// 5. Assicurarsi che il motore medio sia effettivamente collegato alla porta 'M'. Alcuni brick potrebbero
//    permettere di usare motori medi su porte A, B, C, D, ma 'M' è la designazione standard.