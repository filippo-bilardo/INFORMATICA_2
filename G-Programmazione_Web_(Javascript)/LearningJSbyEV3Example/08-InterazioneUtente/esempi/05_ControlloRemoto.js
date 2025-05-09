/**
 * Esempio di interfaccia per controllo remoto del robot EV3
 * Questo esempio mostra come implementare un'interfaccia di controllo
 * che permette di guidare il robot utilizzando i pulsanti del brick
 */

// Configurazione motori
let motoreSinistro = motors.largeA;
let motoreDestro = motors.largeB;
let motoreBraccio = motors.mediumC;

// Configurazione parametri
let configurazione = {
    velocitaBase: 50,      // Velocità di base (0-100)
    velocitaRotazione: 30, // Velocità durante le rotazioni (0-100)
    velocitaBraccio: 20,   // Velocità del braccio (0-100)
    modalitaGuida: "Standard", // Standard, Precisa, Veloce
    mostraInfo: true       // Mostra informazioni aggiuntive
};

// Stato del robot
let statoRobot = {
    inMovimento: false,
    direzione: "Fermo",    // Fermo, Avanti, Indietro, Sinistra, Destra
    velocitaAttuale: 0,
    distanzaPercorsa: 0,   // Simulata
    braccioAttivo: false
};

// Funzione per mostrare l'interfaccia principale
function mostraInterfaccia() {
    brick.clearScreen();
    
    // Intestazione
    brick.showString("Controllo Remoto", 0);
    
    // Stato attuale
    brick.showString("Stato: " + statoRobot.direzione, 1);
    brick.showString("Velocità: " + statoRobot.velocitaAttuale + "%", 2);
    
    // Informazioni aggiuntive (opzionali)
    if (configurazione.mostraInfo) {
        brick.showString("Modalità: " + configurazione.modalitaGuida, 3);
        brick.showString("Distanza: " + statoRobot.distanzaPercorsa + " cm", 4);
    }
    
    // Istruzioni
    brick.showString("^ Avanti | v Indietro", 5);
    brick.showString("< Sinistra | Destra >", 6);
    brick.showString("ENTER: Menu | EXIT: Stop", 7);
    
    // Feedback LED in base allo stato
    if (statoRobot.inMovimento) {
        if (statoRobot.direzione === "Avanti") {
            brick.setStatusLight(StatusLight.Green);
        } else if (statoRobot.direzione === "Indietro") {
            brick.setStatusLight(StatusLight.Orange);
        } else {
            brick.setStatusLight(StatusLight.GreenFlash);
        }
    } else {
        brick.setStatusLight(StatusLight.Green);
    }
}

// Funzione per controllare i motori
function controllaMotori(comando) {
    // Calcola la velocità in base alla modalità
    let velocita = configurazione.velocitaBase;
    let velocitaRotazione = configurazione.velocitaRotazione;
    
    if (configurazione.modalitaGuida === "Precisa") {
        velocita = Math.floor(configurazione.velocitaBase * 0.7);
        velocitaRotazione = Math.floor(configurazione.velocitaRotazione * 0.7);
    } else if (configurazione.modalitaGuida === "Veloce") {
        velocita = Math.floor(configurazione.velocitaBase * 1.3);
        velocitaRotazione = Math.floor(configurazione.velocitaRotazione * 1.3);
    }
    
    // Esegui il comando
    switch (comando) {
        case "avanti":
            motoreSinistro.run(velocita);
            motoreDestro.run(velocita);
            statoRobot.direzione = "Avanti";
            statoRobot.velocitaAttuale = velocita;
            statoRobot.inMovimento = true;
            break;
            
        case "indietro":
            motoreSinistro.run(-velocita);
            motoreDestro.run(-velocita);
            statoRobot.direzione = "Indietro";
            statoRobot.velocitaAttuale = velocita;
            statoRobot.inMovimento = true;
            break;
            
        case "sinistra":
            motoreSinistro.run(-velocitaRotazione);
            motoreDestro.run(velocitaRotazione);
            statoRobot.direzione = "Sinistra";
            statoRobot.velocitaAttuale = velocitaRotazione;
            statoRobot.inMovimento = true;
            break;
            
        case "destra":
            motoreSinistro.run(velocitaRotazione);
            motoreDestro.run(-velocitaRotazione);
            statoRobot.direzione = "Destra";
            statoRobot.velocitaAttuale = velocitaRotazione;
            statoRobot.inMovimento = true;
            break;
            
        case "stop":
            motoreSinistro.stop();
            motoreDestro.stop();
            statoRobot.direzione = "Fermo";
            statoRobot.velocitaAttuale = 0;
            statoRobot.inMovimento = false;
            break;
            
        case "braccio_su":
            motoreBraccio.run(configurazione.velocitaBraccio);
            statoRobot.braccioAttivo = true;
            break;
            
        case "braccio_giu":
            motoreBraccio.run(-configurazione.velocitaBraccio);
            statoRobot.braccioAttivo = true;
            break;
            
        case "braccio_stop":
            motoreBraccio.stop();
            statoRobot.braccioAttivo = false;
            break;
    }
    
    // Aggiorna l'interfaccia
    mostraInterfaccia();
    
    // Feedback sonoro
    if (comando === "stop") {
        music.playTone(440, 100);
    } else if (comando === "avanti" || comando === "indietro") {
        music.playTone(660, 50);
    } else if (comando === "sinistra" || comando === "destra") {
        music.playTone(880, 50);
    }
}

// Menu di configurazione
function mostraMenuConfigurazione() {
    let opzioni = [
        "Velocità: " + configurazione.velocitaBase,
        "Modalità: " + configurazione.modalitaGuida,
        "Info Extra: " + (configurazione.mostraInfo ? "ON" : "OFF"),
        "Torna al controllo"
    ];
    let selezioneAttuale = 0;
    
    while (true) {
        // Visualizza il menu
        brick.clearScreen();
        brick.showString("Configurazione", 0);
        
        for (let i = 0; i < opzioni.length; i++) {
            if (i === selezioneAttuale) {
                brick.showString("> " + opzioni[i], i + 1);
            } else {
                brick.showString("  " + opzioni[i], i + 1);
            }
        }
        
        brick.showString("^ Su | v Giù | > Modifica", 7);
        
        // Attendi input utente
        while (!brick.buttonUp.wasPressed() &&
               !brick.buttonDown.wasPressed() &&
               !brick.buttonRight.wasPressed() &&
               !brick.buttonLeft.wasPressed() &&
               !brick.buttonEnter.wasPressed() &&
               !brick.buttonExit.wasPressed()) {
            pause(50);
        }
        
        // Gestisci navigazione
        if (brick.buttonUp.wasPressed() && selezioneAttuale > 0) {
            selezioneAttuale--;
            music.playTone(440, 50);
        } else if (brick.buttonDown.wasPressed() && selezioneAttuale < opzioni.length - 1) {
            selezioneAttuale++;
            music.playTone(440, 50);
        } else if (brick.buttonRight.wasPressed() || brick.buttonEnter.wasPressed()) {
            // Modifica l'opzione selezionata
            if (selezioneAttuale === 0) {
                // Modifica velocità
                modificaVelocita();
                opzioni[0] = "Velocità: " + configurazione.velocitaBase;
            } else if (selezioneAttuale === 1) {
                // Cambia modalità
                cambiaModalita();
                opzioni[1] = "Modalità: " + configurazione.modalitaGuida;
            } else if (selezioneAttuale === 2) {
                // Toggle info extra
                configurazione.mostraInfo = !configurazione.mostraInfo;
                opzioni[2] = "Info Extra: " + (configurazione.mostraInfo ? "ON" : "OFF");
                music.playTone(configurazione.mostraInfo ? 880 : 440, 100);
            } else if (selezioneAttuale === 3) {
                // Torna al controllo
                return;
            }
        } else if (brick.buttonExit.wasPressed()) {
            // Torna al controllo
            return;
        }
    }
}

// Funzione per modificare la velocità
function modificaVelocita() {
    brick.clearScreen();
    brick.showString("Imposta Velocità", 0);
    brick.showString("Valore: " + configurazione.velocitaBase, 2);
    brick.showString("< Diminuisci | Aumenta >", 7);
    
    // Disegna barra velocità
    aggiornaBarraVelocita();
    
    while (true) {
        if (brick.buttonRight.wasPressed() && configurazione.velocitaBase < 100) {
            configurazione.velocitaBase += 5;
            aggiornaBarraVelocita();
            music.playTone(440 + configurazione.velocitaBase, 50);
        }
        
        if (brick.buttonLeft.wasPressed() && configurazione.velocitaBase > 10) {
            configurazione.velocitaBase -= 5;
            aggiornaBarraVelocita();
            music.playTone(440 + configurazione.velocitaBase, 50);
        }
        
        if (brick.buttonEnter.wasPressed() || brick.buttonExit.wasPressed()) {
            music.playTone(880, 100);
            return;
        }
        
        pause(50);
    }
}

// Funzione per aggiornare la barra della velocità
function aggiornaBarraVelocita() {
    brick.showString("Valore: " + configurazione.velocitaBase + "% ", 2);
    
    // Disegna la barra
    brick.fillRect(0, 30, 178, 20, 0); // Pulisci l'area
    brick.drawRect(10, 30, 100, 15);
    brick.fillRect(10, 30, configurazione.velocitaBase, 15);
}

// Funzione per cambiare modalità
function cambiaModalita() {
    let modalita = ["Standard", "Precisa", "Veloce"];
    let indiceAttuale = modalita.indexOf(configurazione.modalitaGuida);
    
    indiceAttuale = (indiceAttuale + 1) % modalita.length;
    configurazione.modalitaGuida = modalita[indiceAttuale];
    
    brick.clearScreen();
    brick.showString("Modalità Guida", 0);
    brick.showString("Impostata a:", 2);
    brick.showString(configurazione.modalitaGuida, 3);
    
    // Descrizione modalità
    if (configurazione.modalitaGuida === "Standard") {
        brick.showString("Bilanciata", 5);
    } else if (configurazione.modalitaGuida === "Precisa") {
        brick.showString("Movimenti lenti", 5);
        brick.showString("e precisi", 6);
    } else if (configurazione.modalitaGuida === "Veloce") {
        brick.showString("Movimenti rapidi", 5);
    }
    
    music.playTone(660, 100);
    pause(1500);
}

// Funzione per simulare la lettura dei sensori
function aggiornaSensori() {
    // Simula l'aggiornamento della distanza percorsa
    if (statoRobot.inMovimento && statoRobot.direzione === "Avanti") {
        statoRobot.distanzaPercorsa += 0.5;
    } else if (statoRobot.inMovimento && statoRobot.direzione === "Indietro") {
        statoRobot.distanzaPercorsa -= 0.5;
        if (statoRobot.distanzaPercorsa < 0) {
            statoRobot.distanzaPercorsa = 0;
        }
    }
}

// Funzione per mostrare la schermata di aiuto
function mostraAiuto() {
    brick.clearScreen();
    brick.showString("Guida Controllo", 0);
    brick.showString("Pulsanti direzionali:", 1);
    brick.showString("^ = Avanti", 2);
    brick.showString("v = Indietro", 3);
    brick.showString("< = Ruota a sinistra", 4);
    brick.showString("> = Ruota a destra", 5);
    brick.showString("ENTER = Menu config.", 6);
    brick.showString("EXIT = Stop/Esci", 7);
    
    // Attendi che l'utente prema un pulsante
    waitAnyButton();
}

// Funzione per mostrare la schermata di benvenuto
function mostraBenvenuto() {
    brick.clearScreen();
    brick.showString("Controllo Remoto", 0);
    brick.showString("EV3", 1);
    
    // Disegna un piccolo robot stilizzato
    brick.drawRect(60, 30, 50, 30);
    brick.drawCircle(70, 65, 10);
    brick.drawCircle(100, 65, 10);
    
    brick.showString("Premi ENTER per", 5);
    brick.showString("iniziare", 6);
    
    // Attendi che l'utente prema ENTER
    while (!brick.buttonEnter.wasPressed()) {
        pause(50);
    }
    
    // Feedback sonoro
    music.playTone(440, 100);
    pause(50);
    music.playTone(880, 200);
}

// Funzioni di utilità
function waitAnyButton() {
    while (!anyButtonPressed()) {
        pause(50);
    }
    // Attendi il rilascio del pulsante
    while (anyButtonPressed()) {
        pause(50);
    }
}

function anyButtonPressed() {
    return brick.buttonEnter.isPressed() ||
           brick.buttonExit.isPressed() ||
           brick.buttonLeft.isPressed() ||
           brick.buttonRight.isPressed() ||
           brick.buttonUp.isPressed() ||
           brick.buttonDown.isPressed();
}

// Programma principale
mostraBenvenuto();
mostraAiuto();

// Loop principale
mostraInterfaccia();

while (true) {
    // Aggiorna i dati dei sensori
    aggiornaSensori();
    
    // Controlla input utente
    if (brick.buttonUp.isPressed()) {
        // Avanti
        controllaMotori("avanti");
    } else if (brick.buttonDown.isPressed()) {
        // Indietro
        controllaMotori("indietro");
    } else if (brick.buttonLeft.isPressed()) {
        // Sinistra
        controllaMotori("sinistra");
    } else if (brick.buttonRight.isPressed()) {
        // Destra
        controllaMotori("destra");
    } else if (statoRobot.inMovimento) {
        // Ferma i motori se nessun pulsante direzionale è premuto
        controllaMotori("stop");
    }
    
    // Menu configurazione
    if (brick.buttonEnter.wasPressed()) {
        // Ferma i motori prima di entrare nel menu
        controllaMotori("stop");
        mostraMenuConfigurazione();
        mostraInterfaccia();
    }
    
    // Uscita
    if (brick.buttonExit.wasPressed() && !statoRobot.inMovimento) {
        brick.clearScreen();
        brick.showString("Terminazione...", 3);
        
        // Ferma tutti i motori
        motoreSinistro.stop();
        motoreDestro.stop();
        motoreBraccio.stop();
        
        // Feedback sonoro
        music.playTone(880, 100);
        pause(50);
        music.playTone(660, 100);
        pause(50);
        music.playTone(440, 200);
        
        pause(1000);
        brick.clearScreen();
        brick.showString("Controllo remoto", 2);
        brick.showString("terminato", 3);
        break;
    }
    
    // Aggiorna l'interfaccia ogni secondo
    if (control.millis() % 1000 < 50) {
        mostraInterfaccia();
    }
    
    pause(50);
}