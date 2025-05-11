// Esercizio 02: Robot Labirinto con OOP e Navigazione Base
// Obiettivo: Creare una classe `RobotNavigatore` che implementi metodi per muoversi 
// in un labirinto semplice (es. "gira a destra se possibile, altrimenti vai dritto, 
// altrimenti gira a sinistra").
//
// Concetti da Applicare: Programmazione Orientata agli Oggetti (OOP), navigazione di base, 
// uso dei sensori per rilevare muri.
//
// Suggerimenti:
// 1. Definisci una classe `RobotNavigatore`.
//    - Il costruttore potrebbe inizializzare i motori e i sensori (es. sensore a ultrasuoni per rilevare muri a destra e davanti).
//    - Metodi utili: `avanzaUnPasso()`, `giraDestra()`, `giraSinistra()`.
//    - Metodi per i sensori: `muroADestra()`, `muroDavanti()`.
// 2. Implementa la logica "destra-mano-sul-muro" (o simile):
//    - Controlla se c'è un muro alla tua destra. Se NON c'è, gira a destra e avanza.
//    - Altrimenti, controlla se puoi andare dritto. Se SÌ, avanza.
//    - Altrimenti (muro a destra e muro davanti), gira a sinistra.
//    - Se sei bloccato (muro a destra, davanti e sinistra), fai un'inversione a U.
// 3. Usa il sensore a ultrasuoni per rilevare la distanza dai muri. Definisci una soglia per considerare "vicino" un muro.
// 4. Visualizza le azioni del robot sul display EV3.

brick.showString("Esercizio: Robot Labirinto OOP", 1);

class RobotNavigatore {
    constructor(motoreSinistro, motoreDestro, sensoreUltrasuoniFronte, sensoreUltrasuoniDestra) {
        this.motoreSinistro = motoreSinistro;
        this.motoreDestro = motoreDestro;
        this.sensoreFronte = sensoreUltrasuoniFronte; // Supponiamo sia configurato sulla porta giusta
        this.sensoreDestra = sensoreUltrasuoniDestra; // Supponiamo sia configurato sulla porta giusta
        this.velocita = 30;
        this.distanzaMuroSoglia = 20; // cm, distanza per considerare un muro
        this.rotazione90gradi = 0.5; // Rotazioni del motore per girare di 90 gradi (da calibrare)
        this.passoAvanti = 1; // Rotazioni del motore per un passo avanti (da calibrare)

        brick.showString("RobotNavigatore Inizializzato", 2);
    }

    avanzaUnPasso() {
        console.log("Avanzo...");
        brick.showString("Avanzo...", 4);
        motors.largeSet(this.motoreSinistro, this.motoreDestro).run(this.velocita, this.passoAvanti, MoveUnit.Rotations);
        pause(this.passoAvanti * 1000 / (this.velocita / 100) + 200); // Stima del tempo, da affinare
        motors.largeSet(this.motoreSinistro, this.motoreDestro).stop();
    }

    giraDestra() {
        console.log("Giro a Destra...");
        brick.showString("Giro Destra", 4);
        motors.tank(this.velocita, -this.velocita, this.rotazione90gradi, MoveUnit.Rotations);
        pause(this.rotazione90gradi * 1000 / (this.velocita / 100) + 200);
        motors.largeSet(this.motoreSinistro, this.motoreDestro).stop();
    }

    giraSinistra() {
        console.log("Giro a Sinistra...");
        brick.showString("Giro Sinistra", 4);
        motors.tank(-this.velocita, this.velocita, this.rotazione90gradi, MoveUnit.Rotations);
        pause(this.rotazione90gradi * 1000 / (this.velocita / 100) + 200);
        motors.largeSet(this.motoreSinistro, this.motoreDestro).stop();
    }

    muroDavanti() {
        let distanza = sensors.ultrasonic4.distance(); // Assumiamo sensore frontale su porta 4
        console.log("Dist Fronte: " + distanza);
        return distanza < this.distanzaMuroSoglia;
    }

    muroADestra() {
        // Per simulare un sensore a destra, potremmo girare il robot, misurare, e tornare indietro
        // Oppure, se si ha un secondo sensore, usarlo direttamente.
        // Qui simuliamo girando leggermente a destra, misurando e tornando.
        // Questo è impreciso e solo dimostrativo. Un vero robot avrebbe un sensore laterale o una torretta.
        console.log("Controllo muro a destra (simulato)");
        motors.tank(this.velocita, -this.velocita, this.rotazione90gradi / 2, MoveUnit.Rotations); // Gira di 45 gradi a destra
        pause(500);
        let distanza = sensors.ultrasonic4.distance(); // Misura con il sensore frontale
        motors.tank(-this.velocita, this.velocita, this.rotazione90gradi / 2, MoveUnit.Rotations); // Torna alla posizione originale
        pause(500);
        console.log("Dist Destra (sim): " + distanza);
        return distanza < this.distanzaMuroSoglia + 10; // Soglia leggermente più alta per la simulazione
    }

    naviga() {
        brick.showString("Navigazione Iniziata", 3);
        if (!this.muroADestra()) {
            this.giraDestra();
            this.avanzaUnPasso();
        } else if (!this.muroDavanti()) {
            this.avanzaUnPasso();
        } else {
            this.giraSinistra();
            // Non avanzare subito dopo aver girato a sinistra, ricontrolla al prossimo ciclo
        }
    }
}

// Configurazione: Assicurati che i motori e i sensori siano collegati correttamente.
// Motori B e C, Sensore Ultrasuoni su porta 4 (per il frontale)
// Per un vero sensore a destra, servirebbe un altro sensore o una meccanica per ruotare quello frontale.
const robot = new RobotNavigatore(Motor.B, Motor.C, Sensor.S4, null); // null per sensore destra, dato che lo simuliamo

// Ciclo di navigazione principale
// Premi un pulsante per avviare/fermare la navigazione
let navigando = false;
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function() {
    navigando = !navigando;
    if (navigando) {
        brick.showString("Navigo...", 1);
        console.log("Navigazione avviata.");
    } else {
        brick.showString("Pausa", 1);
        motors.stopAll();
        console.log("Navigazione in pausa.");
    }
});

loops.forever(function() {
    if (navigando) {
        robot.naviga();
        pause(500); // Pausa tra le decisioni
    }
});

console.log("Pronto. Premi Enter per avviare/fermare la navigazione nel labirinto.");