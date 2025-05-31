// Esempio 10.1: Risposta a Eventi Multipli
// Il robot reagisce alla pressione di un pulsante, al rilevamento di un ostacolo
// e a un suono forte contemporaneamente.

brick.showString("Pronto per eventi...", 1);

// Evento: Pressione del pulsante Enter
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
    brick.showString("Pulsante Premuto!", 3);
    brick.sound(Sound.Information);
    motors.mediumA.run(100, 1, MoveUnit.Rotations);
    motors.mediumA.run(-100, 1, MoveUnit.Rotations);
    brick.showString("Azione pulsante OK", 3);
});

// Evento: Sensore a ultrasuoni rileva un ostacolo vicino
// Assicurati che il sensore a ultrasuoni sia collegato alla porta 4
loops.forever(function () {
    let distanza = sensors.ultrasonic4.distance();
    if (distanza < 15) { // Se l'ostacolo è a meno di 15 cm
        brick.showString("Ostacolo: " + distanza + "cm", 5);
        brick.sound(Sound.Warning);
        // Azione: si ferma e indietreggia un po'
        motors.mediumBC.stop();
        motors.mediumBC.run(-30, 0.5, MoveUnit.Rotations);
        motors.mediumBC.stop();
        brick.showString("Ostacolo evitato", 5);
        // Attende un po' per non reagire continuamente allo stesso ostacolo
        loops.pause(2000);
    } else {
        // Se non ci sono ostacoli vicini, potrebbe andare avanti
        // motors.mediumBC.run(50);
    }
});

// Evento: Sensore sonoro rileva un suono forte
// Assicurati che il sensore sonoro sia collegato alla porta 2
// Nota: la sensibilità del sensore sonoro può variare.
// Potrebbe essere necessario MakeCode per calibrare o usare blocchi specifici per il suono.
// Questo è un esempio concettuale, poiché la gestione diretta del livello sonoro in JS puro
// potrebbe essere meno immediata che con i blocchi MakeCode.

// Simuliamo un controllo periodico del livello sonoro (se disponibile)
// In MakeCode, useresti un blocco "on loud sound".
// Qui, per semplicità, lo leghiamo a un altro pulsante (es. Up) per simulare un evento sonoro.
brick.buttonUp.onEvent(ButtonEvent.Pressed, function () {
    brick.showString("Suono Forte Rilevato!", 7);
    brick.sound(Sound.Fanfare);
    // Azione: gira su se stesso
    motors.mediumB.run(50, 1, MoveUnit.Rotations);
    motors.mediumC.run(-50, 1, MoveUnit.Rotations);
    brick.showString("Reazione suono OK", 7);
});

brick.showString("Vai avanti...", 9);
// Il robot potrebbe avere un comportamento di default, come muoversi in avanti
// motors.mediumBC.run(30);

// Per fermare il robot e il programma
brick.buttonDown.onEvent(ButtonEvent.Pressed, function () {
    motors.stopAll();
    brick.sound(Sound.Goodbye);
    brick.clearScreen();
    brick.showString("Programma Terminato", 6);
    control.programStop();
});

// Nota: Per testare questo codice in MakeCode:
// 1. Crea un nuovo progetto.
// 2. Passa alla visualizzazione JavaScript.
// 3. Incolla questo codice.
// 4. Assicurati che i sensori (ultrasuoni su porta 4, sonoro su porta 2 se lo usi direttamente)
//    e i motori (A, B, C) siano configurati correttamente nel simulatore o sull'EV3 fisico.
// 5. Il sensore sonoro in MakeCode è spesso gestito con blocchi evento specifici ("on loud sound").
//    L'esempio qui usa il pulsante 'Up' per simulare l'evento sonoro per semplicità di test in JS puro.