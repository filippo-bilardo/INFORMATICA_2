// Esempio 10.3: Controllo Robot con Approccio OOP (Principi)
// Introduciamo una classe base 'RobotComponent' e classi specifiche per 'Motore' e 'Sensore'.
// Questo è un esempio concettuale per illustrare l'organizzazione OOP in JavaScript.
// MakeCode non ha un supporto completo per classi come in altri linguaggi JS, ma i prototipi possono essere usati.

brick.showString("Robot OOP Demo", 1);

// --- Definizione delle Classi (usando funzioni costruttore e prototipi) ---

// Classe base per componenti del robot
function RobotComponent(nome) {
    this.nome = nome;
}

RobotComponent.prototype.getStatus = function () {
    return this.nome + " pronto.";
};

// Classe Motore (eredita da RobotComponent, anche se qui non mostrato per semplicità)
function Motore(porta, nome) {
    this.porta = porta; // es. motors.mediumA, motors.largeBC
    this.nome = nome || "Motore";
    // In MakeCode, l'oggetto motore reale è globale (es. motors.mediumA)
    // Qui 'porta' è più un riferimento concettuale o un wrapper.
}

Motore.prototype.avvia = function (velocita) {
    brick.showString(this.nome + ": Avvio (" + velocita + "%)", 3);
    // Esempio: se this.porta fosse un riferimento diretto come motors.mediumA
    // this.porta.run(velocita);
    // Per questo esempio, simuliamo con motori specifici
    if (this.nome === "MotoreSinistro") {
        motors.mediumB.run(velocita);
    } else if (this.nome === "MotoreDestro") {
        motors.mediumC.run(velocita);
    }
    console.log(this.nome + " avviato alla velocità " + velocita);
};

Motore.prototype.ferma = function () {
    brick.showString(this.nome + ": Stop", 4);
    if (this.nome === "MotoreSinistro") {
        motors.mediumB.stop();
    } else if (this.nome === "MotoreDestro") {
        motors.mediumC.stop();
    }
    console.log(this.nome + " fermato.");
};

Motore.prototype.ruotaGradi = function (velocita, gradi) {
    brick.showString(this.nome + ": Ruota " + gradi + "°", 3);
    if (this.nome === "MotoreSinistro") {
        motors.mediumB.run(velocita, gradi, MoveUnit.Degrees);
    } else if (this.nome === "MotoreDestro") {
        motors.mediumC.run(velocita, gradi, MoveUnit.Degrees);
    }
    console.log(this.nome + " ruotato di " + gradi + " gradi.");
};

// Classe Sensore (eredita da RobotComponent)
function Sensore(tipo, portaHardware, nome) {
    this.tipo = tipo; // es. "ultrasuoni", "colore"
    this.portaHardware = portaHardware; // es. sensors.ultrasonic4
    this.nome = nome || "Sensore";
}

Sensore.prototype.leggiValore = function () {
    let valore;
    // In MakeCode, l'oggetto sensore reale è globale (es. sensors.ultrasonic4)
    // this.portaHardware qui si riferisce direttamente a quello.
    if (this.tipo === "ultrasuoni") {
        valore = this.portaHardware.distance();
    } else if (this.tipo === "colore") {
        valore = this.portaHardware.color(); // Restituisce un numero per il colore
    } else if (this.tipo === "contatto") {
        valore = this.portaHardware.isPressed();
    }
    brick.showString(this.nome + " (" + this.tipo + "): " + valore, 5);
    console.log(this.nome + " (" + this.tipo + ") letto valore: " + valore);
    return valore;
};

// Classe Robot che aggrega i componenti
function MioRobot() {
    this.motoreSinistro = new Motore(motors.mediumB, "MotoreSinistro");
    this.motoreDestro = new Motore(motors.mediumC, "MotoreDestro");
    this.sensoreDistanza = new Sensore("ultrasuoni", sensors.ultrasonic4, "SonarFrontale");
    this.sensoreContatto = new Sensore("contatto", sensors.touch1, "Bumper");

    brick.showString("Robot Inizializzato", 2);
}

MioRobot.prototype.avanza = function (velocita) {
    this.motoreSinistro.avvia(velocita);
    this.motoreDestro.avvia(velocita);
    brick.showString("Robot: Avanza", 6);
};

MioRobot.prototype.indietreggia = function (velocita) {
    this.motoreSinistro.avvia(-velocita);
    this.motoreDestro.avvia(-velocita);
    brick.showString("Robot: Indietreggia", 6);
};

MioRobot.prototype.giraDestra = function (velocita) {
    this.motoreSinistro.avvia(velocita);
    this.motoreDestro.avvia(-velocita);
    brick.showString("Robot: Gira Destra", 6);
};

MioRobot.prototype.giraSinistra = function (velocita) {
    this.motoreSinistro.avvia(-velocita);
    this.motoreDestro.avvia(velocita);
    brick.showString("Robot: Gira Sinistra", 6);
};

MioRobot.prototype.fermati = function () {
    this.motoreSinistro.ferma();
    this.motoreDestro.ferma();
    brick.showString("Robot: Fermo", 6);
};

// --- Utilizzo del Robot OOP ---

let robot = new MioRobot();

// Esempio di comportamento: avanza finché non incontra un ostacolo
loops.forever(function() {
    if (robot.sensoreContatto.leggiValore()) {
        robot.indietreggia(30);
        loops.pause(1000);
        robot.giraDestra(30);
        loops.pause(500);
    } else {
        let distanza = robot.sensoreDistanza.leggiValore();
        if (distanza !== null && distanza < 15) {
            robot.fermati();
            robot.indietreggia(30);
            loops.pause(1000);
            robot.giraSinistra(30);
            loops.pause(500);
        } else {
            robot.avanza(40);
        }
    }
    loops.pause(100);
});


brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
    robot.fermati();
    brick.clearScreen();
    brick.showString("Programma Terminato", 6);
    brick.sound(Sound.Goodbye);
    control.programStop();
});

// Note per MakeCode:
// 1. Incolla questo codice nella vista JavaScript.
// 2. Assicurati che i motori (B, C) e i sensori (ultrasuoni su porta 4, contatto su porta 1)
//    siano configurati correttamente.
// 3. Questo esempio usa funzioni costruttore e prototipi per simulare classi.
//    MakeCode ha un supporto più nativo per classi in versioni recenti, che potrebbe semplificare la sintassi.
// 4. L'ereditarietà completa (es. Motore che estende RobotComponent) non è mostrata per brevità,
//    ma potrebbe essere implementata usando `Object.setPrototypeOf` o `__proto__` (con cautela).