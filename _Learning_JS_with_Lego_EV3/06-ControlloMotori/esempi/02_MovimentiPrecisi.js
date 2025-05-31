/**
 * File: 02_MovimentiPrecisi.js
 * Descrizione: Esempi di controllo preciso dei motori per il robot LEGO EV3
 * Corso: Learning JavaScript by Lego EV3 Example
 */

// ============= CONTROLLO DI PRECISIONE DEI MOTORI =============

/**
 * Esempio 1: Controllo preciso della distanza
 * Dimostra come usare le rotazioni per muovere il robot di una distanza precisa
 */
function controlloPrecisoDiDistanza() {
    brick.showString("Controllo distanza", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Assumendo ruote con diametro di 5.6 cm
    // 1 rotazione = 5.6 * π cm ≈ 17.6 cm di movimento lineare
    const CENTIMETRI_PER_ROTAZIONE = 17.6;
    
    // Calcola quante rotazioni sono necessarie per percorrere una certa distanza
    function rotazioniPerDistanza(centimetri) {
        return centimetri / CENTIMETRI_PER_ROTAZIONE;
    }
    
    // Movimento preciso di 10 cm
    brick.showString("Movimento 10 cm", 1);
    motors.largeAB.steer(0, 40, rotazioniPerDistanza(10), MoveUnit.Rotations);
    pause(1000);
    
    // Movimento preciso di 25 cm
    brick.showString("Movimento 25 cm", 1);
    motors.largeAB.steer(0, 40, rotazioniPerDistanza(25), MoveUnit.Rotations);
    pause(1000);
    
    // Movimento preciso di 5 cm all'indietro
    brick.showString("Indietro 5 cm", 1);
    motors.largeAB.steer(0, -40, rotazioniPerDistanza(5), MoveUnit.Rotations);
    
    brick.showString("Esempio completato", 2);
    pause(2000);
}

/**
 * Esempio 2: Controllo preciso dell'angolo di rotazione
 * Dimostra come ruotare il robot di angoli specifici
 */
function controlloPrecisoAngolo() {
    brick.showString("Controllo angolo", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // La relazione tra rotazioni delle ruote e angolo di rotazione del robot
    // dipende dalla distanza tra le ruote e dal diametro delle stesse
    // Questi valori devono essere calibrati per il tuo specifico robot
    
    // Funzione che calcola quanto girare le ruote per ruotare il robot di un certo angolo
    function rotazioniPerAngolo(gradi) {
        // Questo è un valore approssimativo da calibrare sul tuo robot
        // Esempio: 1 rotazione completa delle ruote in direzioni opposte = 180 gradi di rotazione del robot
        return gradi / 180 * 0.5;
    }
    
    // Rotazione di 90 gradi in senso orario
    brick.showString("Rotazione 90°", 1);
    motors.largeAB.tank(40, -40, rotazioniPerAngolo(90), MoveUnit.Rotations);
    pause(1000);
    
    // Rotazione di 45 gradi in senso antiorario
    brick.showString("Rotazione 45°", 1);
    motors.largeAB.tank(-40, 40, rotazioniPerAngolo(45), MoveUnit.Rotations);
    pause(1000);
    
    // Rotazione di 180 gradi in senso orario
    brick.showString("Rotazione 180°", 1);
    motors.largeAB.tank(40, -40, rotazioniPerAngolo(180), MoveUnit.Rotations);
    
    brick.showString("Esempio completato", 2);
    pause(2000);
}

/**
 * Esempio 3: Controllo della velocità con rampe
 * Dimostra come creare movimenti fluidi con accelerazione e decelerazione graduali
 */
function controlloVelocitaRampe() {
    brick.showString("Controllo velocità", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Rampa di accelerazione
    brick.showString("Accelerazione", 1);
    for (let potenza = 0; potenza <= 70; potenza += 5) {
        motors.largeAB.steer(0, potenza);
        brick.showValue("Potenza", potenza, 2);
        pause(100);
    }
    
    // Mantieni velocità costante
    brick.showString("Velocità costante", 1);
    pause(2000);
    
    // Rampa di decelerazione
    brick.showString("Decelerazione", 1);
    for (let potenza = 70; potenza >= 0; potenza -= 5) {
        motors.largeAB.steer(0, potenza);
        brick.showValue("Potenza", potenza, 2);
        pause(100);
    }
    
    motors.largeAB.stop();
    
    brick.showString("Esempio completato", 2);
    pause(2000);
}

/**
 * Esempio 4: Movimenti precisi del terzo motore
 * Dimostra come utilizzare un terzo motore (es. per un braccio o pinza)
 * con controllo preciso dell'angolo
 */
function controlloTerzoMotore() {
    brick.showString("Controllo terzo motore", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Movimento preciso di un braccio (assumendo motore C)
    // Primo, portiamo il braccio a una posizione di partenza nota
    brick.showString("Reset posizione", 1);
    // Usa una potenza bassa per il reset per evitare danni meccanici
    motors.largeC.run(-20, 1, MoveUnit.Seconds);
    motors.largeC.stop();
    pause(500);
    
    // Ora muoviamo il braccio di angoli precisi
    brick.showString("Solleva 45°", 1);
    motors.largeC.run(30, 45, MoveUnit.Degrees);
    pause(1000);
    
    brick.showString("Solleva altri 45°", 1);
    motors.largeC.run(30, 45, MoveUnit.Degrees);
    pause(1000);
    
    brick.showString("Abbassa 90°", 1);
    motors.largeC.run(-30, 90, MoveUnit.Degrees);
    
    brick.showString("Esempio completato", 2);
    pause(2000);
}

/**
 * Esempio 5: Percorso geometrico preciso
 * Dimostra come combinare movimenti precisi per creare un percorso complesso
 */
function percorsoTriangolo() {
    brick.showString("Percorso Triangolo", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Parametri del triangolo
    const LATO_CM = 30;  // Lunghezza del lato in cm
    const CENTIMETRI_PER_ROTAZIONE = 17.6;  // Calibra in base al tuo robot
    const ROTAZIONI_PER_ANGOLO_120 = 0.33;  // Calibra in base al tuo robot
    
    // Funzione per convertire cm in rotazioni
    function rotazioniPerDistanza(cm) {
        return cm / CENTIMETRI_PER_ROTAZIONE;
    }
    
    // Disegna un triangolo equilatero
    for (let i = 0; i < 3; i++) {
        // Mostra il lato corrente
        brick.showString("Lato " + (i + 1), 1);
        
        // Muovi in avanti di un lato
        motors.largeAB.steer(0, 50, rotazioniPerDistanza(LATO_CM), MoveUnit.Rotations);
        motors.largeAB.stop();
        pause(500);
        
        // Ruota di 120 gradi (angolo esterno di un triangolo equilatero)
        brick.showString("Rotazione " + (i + 1), 1);
        motors.largeAB.tank(-40, 40, ROTAZIONI_PER_ANGOLO_120, MoveUnit.Rotations);
        motors.largeAB.stop();
        pause(500);
    }
    
    brick.showString("Triangolo completato", 2);
    pause(2000);
}

/**
 * Funzione principale che permette all'utente di selezionare quale esempio eseguire
 */
function main() {
    let selezione = false;
    
    while (!selezione) {
        brick.clearScreen();
        brick.showString("MOVIMENTI PRECISI", 1);
        brick.showString("Seleziona esempio:", 2);
        brick.showString("1: Controllo distanza", 3);
        brick.showString("2: Controllo angolo", 4);
        brick.showString("3: Rampe velocità", 5);
        brick.showString("4: Terzo motore", 6);
        brick.showString("5: Percorso triangolo", 7);
        
        // Attendi che l'utente prema un pulsante
        pause(100);
        
        if (brick.buttonLeft.isPressed()) {
            controlloPrecisoDiDistanza();
            selezione = true;
        } else if (brick.buttonUp.isPressed()) {
            controlloPrecisoAngolo();
            selezione = true;
        } else if (brick.buttonRight.isPressed()) {
            controlloVelocitaRampe();
            selezione = true;
        } else if (brick.buttonDown.isPressed()) {
            controlloTerzoMotore();
            selezione = true;
        } else if (brick.buttonEnter.isPressed()) {
            percorsoTriangolo();
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