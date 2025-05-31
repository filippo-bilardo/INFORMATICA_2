/**
 * File: 03_ScopeVariabili.js
 * Descrizione: Esempi di scope e visibilità delle variabili in JavaScript per EV3
 * Corso: Learning JavaScript by Lego EV3 Example
 */

// ==========================================
// ESEMPIO 1: Variabili Globali vs Locali
// ==========================================

// Variabile globale
let velocitaDefault = 50;
let distanzaSicurezza = 20;

// Funzione che utilizza la variabile globale
function muoviConVelocitaGlobale() {
    brick.showString("Uso variabile globale", 1);
    brick.showValue("Velocità globale", velocitaDefault, 2);
    
    motors.largeAB.steer(0, velocitaDefault);
    pause(2000);
    motors.largeAB.stop();
}

// Funzione con variabile locale che ha lo stesso nome della globale
function muoviConVelocitaLocale() {
    // Variabile locale che nasconde quella globale
    let velocitaDefault = 30;
    
    brick.showString("Uso variabile locale", 1);
    brick.showValue("Velocità locale", velocitaDefault, 2);
    brick.showValue("Velocità globale", window.velocitaDefault, 3);
    
    motors.largeAB.steer(0, velocitaDefault);
    pause(2000);
    motors.largeAB.stop();
}

// Funzione che modifica una variabile globale
function aumentaVelocitaGlobale() {
    velocitaDefault += 10;
    brick.showString("Aumento velocità globale", 1);
    brick.showValue("Nuova velocità", velocitaDefault, 2);
}

// ==========================================
// ESEMPIO 2: Scope di Funzione
// ==========================================

function esempioScopeFunzione() {
    // Variabile locale alla funzione
    let contatore = 0;
    
    // Funzione interna che accede alla variabile della funzione contenitore
    function incrementa() {
        contatore++;
        brick.showValue("Contatore", contatore, 2);
        
        if (contatore >= 5) {
            brick.showString("Contatore >= 5", 3);
        }
    }
    
    // Utilizzo della funzione interna
    brick.showString("Scope di funzione", 1);
    
    for (let i = 0; i < 10; i++) {
        incrementa();
        pause(500);
    }
    
    // La variabile contatore rimane accessibile qui
    brick.showValue("Contatore finale", contatore, 4);
}

// ==========================================
// ESEMPIO 3: Scope di Blocco (let e const)
// ==========================================

function esempioScopeLetConst() {
    brick.showString("Scope con let/const", 1);
    
    // Scope di blocco con let
    for (let i = 0; i < 3; i++) {
        brick.showValue("i nel ciclo", i, 2);
        
        // Variabile con scope limitato al ciclo
        let messaggioIterazione = `Iterazione ${i}`;
        brick.showString(messaggioIterazione, 3);
        
        pause(1000);
    }
    
    // Qui le variabili i e messaggioIterazione non sono più accessibili
    // Questo causerebbe un errore: brick.showValue("i dopo ciclo", i, 2);
    
    // Costante con scope di funzione
    const VELOCITA_MAX = 100;
    brick.showValue("Velocità max", VELOCITA_MAX, 4);
    
    if (true) {
        // Costante con scope limitato all'if
        const FATTORE = 0.5;
        let velocitaLimitata = VELOCITA_MAX * FATTORE;
        brick.showValue("Velocità limitata", velocitaLimitata, 5);
    }
    
    // FATTORE non è più accessibile qui
    // Questo causerebbe un errore: brick.showValue("Fattore", FATTORE, 5);
}

// ==========================================
// ESEMPIO 4: let vs var
// ==========================================

function esempioLetVsVar() {
    brick.showString("let vs var", 1);
    
    // Esempio con var (scope di funzione)
    function esempioVar() {
        for (var i = 0; i < 3; i++) {
            brick.showValue("i (var)", i, 2);
            pause(500);
        }
        
        // i è ancora accessibile qui perché è stata dichiarata con var
        brick.showValue("i dopo ciclo", i, 3);  // Mostrerà 3
    }
    
    // Esempio con let (scope di blocco)
    function esempioLet() {
        for (let j = 0; j < 3; j++) {
            brick.showValue("j (let)", j, 2);
            pause(500);
        }
        
        // j non è accessibile qui perché è stata dichiarata con let
        // Questo causerebbe un errore: brick.showValue("j dopo ciclo", j, 3);
        brick.showString("j non accessibile", 3);
    }
    
    esempioVar();
    pause(2000);
    brick.clearScreen();
    brick.showString("let vs var", 1);
    esempioLet();
}

// ==========================================
// ESEMPIO 5: Chiusure (Closures)
// ==========================================

function esempioChiusure() {
    brick.showString("Closures", 1);
    
    // Funzione che crea un contatore con stato interno
    function creaContatore(valoreIniziale) {
        let valore = valoreIniziale || 0;
        
        // Restituisce una funzione che "ricorda" la variabile valore
        return function() {
            valore++;
            return valore;
        };
    }
    
    // Crea due contatori indipendenti
    let contatore1 = creaContatore(10);
    let contatore2 = creaContatore(50);
    
    // Utilizza i contatori
    for (let i = 0; i < 5; i++) {
        let valoreContatore1 = contatore1();
        let valoreContatore2 = contatore2();
        
        brick.showValue("Contatore1", valoreContatore1, 2);
        brick.showValue("Contatore2", valoreContatore2, 3);
        
        pause(1000);
    }
}

// ==========================================
// ESEMPIO 6: Applicazione Robotica - Controller di Stato
// ==========================================

function creaControllerRobot() {
    brick.showString("Controller con closure", 1);
    
    // Stato interno del controller, protetto dalla closure
    let velocitaCorrente = 0;
    let direzioneCorrente = 0;  // 0 = dritto, -1 = sinistra, 1 = destra
    let modalitaGuida = "manuale";  // manuale o automatica
    
    // Oggetto controller con metodi per manipolare lo stato
    let controller = {
        // Getter per lo stato corrente
        getStato: function() {
            return {
                velocita: velocitaCorrente,
                direzione: direzioneCorrente,
                modalita: modalitaGuida
            };
        },
        
        // Metodi per modificare lo stato
        accelera: function(incremento) {
            // Limita la velocità a un range ragionevole
            velocitaCorrente = Math.min(100, Math.max(-100, velocitaCorrente + incremento));
            brick.showValue("Velocità", velocitaCorrente, 2);
            motors.largeAB.steer(direzioneCorrente * 50, velocitaCorrente);
        },
        
        sterza: function(nuovaDirezione) {
            direzioneCorrente = nuovaDirezione;
            brick.showValue("Direzione", direzioneCorrente, 3);
            motors.largeAB.steer(direzioneCorrente * 50, velocitaCorrente);
        },
        
        cambiaModo: function() {
            modalitaGuida = modalitaGuida === "manuale" ? "automatica" : "manuale";
            brick.showString(`Modalità: ${modalitaGuida}`, 4);
        },
        
        ferma: function() {
            velocitaCorrente = 0;
            brick.showValue("Velocità", velocitaCorrente, 2);
            motors.largeAB.stop();
        }
    };
    
    return controller;
}

// ==========================================
// FUNZIONE PRINCIPALE
// ==========================================

function main() {
    brick.showString("Demo scope variabili", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Demo 1: Variabili globali vs locali
    brick.showString("Demo 1: Globali vs Locali", 1);
    muoviConVelocitaGlobale();
    pause(1000);
    
    muoviConVelocitaLocale();
    pause(1000);
    
    aumentaVelocitaGlobale();
    muoviConVelocitaGlobale();  // Usa la velocità globale aumentata
    pause(1000);
    
    // Demo 2: Scope di funzione
    brick.showString("Demo 2: Scope funzione", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    esempioScopeFunzione();
    pause(2000);
    
    // Demo 3: Scope di blocco (let e const)
    brick.showString("Demo 3: Scope blocco", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    esempioScopeLetConst();
    pause(2000);
    
    // Demo 4: let vs var
    brick.showString("Demo 4: let vs var", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    esempioLetVsVar();
    pause(2000);
    
    // Demo 5: Chiusure
    brick.showString("Demo 5: Closures", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    esempioChiusure();
    pause(2000);
    
    // Demo 6: Controller Robot
    brick.showString("Demo 6: Controller Robot", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    let robotController = creaControllerRobot();
    
    // Simula alcune operazioni di controllo
    robotController.accelera(30);
    pause(2000);
    
    robotController.sterza(1);  // Sterza a destra
    pause(2000);
    
    robotController.accelera(20);  // Aumenta velocità
    pause(2000);
    
    robotController.sterza(0);  // Torna dritto
    pause(2000);
    
    robotController.cambiaModo();  // Cambia modalità
    pause(2000);
    
    robotController.ferma();  // Ferma il robot
    
    // Mostra lo stato finale
    let statoFinale = robotController.getStato();
    brick.showString("Stato finale:", 5);
    brick.showValue("Velocità", statoFinale.velocita, 6);
    brick.showValue("Direzione", statoFinale.direzione, 7);
    brick.showString(`Modalità: ${statoFinale.modalita}`, 8);
    
    pause(3000);
    brick.clearScreen();
    brick.showString("Demo completata!", 1);
}

// Avvia il programma principale
main();