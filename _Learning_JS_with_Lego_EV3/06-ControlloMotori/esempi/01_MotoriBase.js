/**
 * File: 01_MotoriBase.js
 * Descrizione: Esempi di utilizzo base dei motori per il robot LEGO EV3
 * Corso: Learning JavaScript by Lego EV3 Example
 */

// ============= ESEMPI DI BASE DEI MOTORI =============

/**
 * Esempio 1: Controllo base di un singolo motore
 * Dimostra come avviare, controllare e fermare un singolo motore
 */
function controlloMotoreSingolo() {
    brick.showString("Motore singolo", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Avvia il motore A a metà potenza
    brick.showString("Avvio motore A", 1);
    motors.largeA.run(50);
    pause(2000);  // Lascia il motore girare per 2 secondi
    
    // Aumenta la potenza
    brick.showString("Aumento potenza", 1);
    motors.largeA.run(80);
    pause(2000);
    
    // Cambia direzione (potenza negativa)
    brick.showString("Cambio direzione", 1);
    motors.largeA.run(-50);
    pause(2000);
    
    // Ferma il motore
    brick.showString("Stop", 1);
    motors.largeA.stop();
    
    brick.showString("Esempio completato", 2);
    pause(2000);
}

/**
 * Esempio 2: Movimento in avanti e all'indietro
 * Dimostra il controllo base di un robot a due motori per movimenti lineari
 */
function movimentoAvantiIndietro() {
    brick.showString("Avanti/Indietro", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Movimento in avanti
    brick.showString("Avanti per 3 sec", 1);
    motors.largeAB.steer(0, 50, 3, MoveUnit.Seconds);
    
    // Breve pausa
    pause(1000);
    
    // Movimento all'indietro
    brick.showString("Indietro per 3 sec", 1);
    motors.largeAB.steer(0, -50, 3, MoveUnit.Seconds);
    
    // Ferma i motori
    motors.largeAB.stop();
    
    brick.showString("Esempio completato", 2);
    pause(2000);
}

/**
 * Esempio 3: Curve e Rotazioni
 * Dimostra come far girare il robot con diversi angoli e raggi di curvatura
 */
function curveERotazioni() {
    brick.showString("Curve e Rotazioni", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Curva leggera a destra
    brick.showString("Curva leggera", 1);
    motors.largeAB.steer(30, 50, 2, MoveUnit.Seconds);
    pause(500);
    
    // Curva stretta a sinistra
    brick.showString("Curva stretta", 1);
    motors.largeAB.steer(-70, 50, 2, MoveUnit.Seconds);
    pause(500);
    
    // Rotazione sul posto a destra
    brick.showString("Rotazione sul posto", 1);
    motors.largeAB.steer(100, 40, 1, MoveUnit.Seconds);
    pause(500);
    
    // Rotazione sul posto a sinistra (usando tank per variare)
    brick.showString("Rotazione tank", 1);
    motors.largeAB.tank(-40, 40, 1, MoveUnit.Seconds);
    
    motors.largeAB.stop();
    
    brick.showString("Esempio completato", 2);
    pause(2000);
}

/**
 * Esempio 4: Controllo a durata vs controllo a rotazioni
 * Dimostra la differenza tra il controllo basato sul tempo
 * e quello basato sulle rotazioni del motore
 */
function controlloTempoVsRotazioni() {
    brick.showString("Tempo vs Rotazioni", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Movimento basato sul tempo
    brick.showString("Movimento 2 sec", 1);
    motors.largeAB.steer(0, 50, 2, MoveUnit.Seconds);
    pause(1000);
    
    // Movimento basato sulle rotazioni
    brick.showString("Movimento 2 rotazioni", 1);
    motors.largeAB.steer(0, 50, 2, MoveUnit.Rotations);
    pause(1000);
    
    // Movimento basato sui gradi
    brick.showString("Movimento 180 gradi", 1);
    motors.largeAB.steer(0, 50, 180, MoveUnit.Degrees);
    
    motors.largeAB.stop();
    
    brick.showString("Esempio completato", 2);
    pause(2000);
}

/**
 * Esempio 5: Percorso a forma di quadrato
 * Dimostra come combinare movimenti lineari e rotazioni
 * per creare un percorso geometrico
 */
function percorsoQuadrato() {
    brick.showString("Percorso Quadrato", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Ripeti 4 volte per completare il quadrato
    for (let i = 0; i < 4; i++) {
        // Mostra il lato corrente
        brick.showString("Lato " + (i + 1), 1);
        
        // Avanza in linea retta
        motors.largeAB.steer(0, 50, 2, MoveUnit.Seconds);
        motors.largeAB.stop();
        pause(500);
        
        // Ruota di 90 gradi
        brick.showString("Rotazione " + (i + 1), 1);
        motors.largeAB.tank(-40, 40, 0.85, MoveUnit.Seconds); // Approssimazione di 90 gradi
        motors.largeAB.stop();
        pause(500);
    }
    
    brick.showString("Quadrato completato", 2);
    pause(2000);
}

/**
 * Funzione principale che permette all'utente di selezionare quale esempio eseguire
 */
function main() {
    let selezione = false;
    
    while (!selezione) {
        brick.clearScreen();
        brick.showString("CONTROLLO MOTORI BASE", 1);
        brick.showString("Seleziona esempio:", 2);
        brick.showString("1: Motore singolo", 3);
        brick.showString("2: Avanti/Indietro", 4);
        brick.showString("3: Curve/Rotazioni", 5);
        brick.showString("4: Tempo vs Rotazioni", 6);
        brick.showString("5: Percorso quadrato", 7);
        
        // Attendi che l'utente prema un pulsante
        pause(100);
        
        if (brick.buttonLeft.isPressed()) {
            controlloMotoreSingolo();
            selezione = true;
        } else if (brick.buttonUp.isPressed()) {
            movimentoAvantiIndietro();
            selezione = true;
        } else if (brick.buttonRight.isPressed()) {
            curveERotazioni();
            selezione = true;
        } else if (brick.buttonDown.isPressed()) {
            controlloTempoVsRotazioni();
            selezione = true;
        } else if (brick.buttonEnter.isPressed()) {
            percorsoQuadrato();
            selezione = true;
        }
    }
    
    brick.clearScreen();
    brick.showString("Demo completata", 1);
    brick.showString("Premi per ricominciare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    
    // Riavvia il menu principale
    main();
}

// Avvia il programma principale
main();