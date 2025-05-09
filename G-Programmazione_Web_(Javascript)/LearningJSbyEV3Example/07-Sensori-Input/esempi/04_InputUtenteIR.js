/**
 * Esempio di utilizzo del sensore infrarossi per ricevere input dall'utente
 * 
 * Questo programma mostra come utilizzare il sensore infrarossi EV3 per
 * ricevere comandi dal telecomando e controllare il robot a distanza.
 */

// Configurazione del sensore infrarossi sulla porta 1
const irSensor = sensors.infrared1;

// Canale del telecomando (1-4)
const canale = 1;

// Variabili per tenere traccia della velocità e della modalità
let velocita = 50;
let modalita = 0; // 0: normale, 1: precisione

// Funzione per visualizzare lo stato corrente
function visualizzaStato() {
    brick.clearScreen();
    brick.showString("Controllo Remoto IR", 0);
    brick.showString("Canale: " + canale, 1);
    
    // Visualizza la modalità corrente
    if (modalita === 0) {
        brick.showString("Modalità: Normale", 2);
    } else {
        brick.showString("Modalità: Precisione", 2);
    }
    
    // Visualizza la velocità corrente
    brick.showValue("Velocità", velocita, 3);
    
    // Visualizza le istruzioni
    brick.showString("Rosso: avanti", 5);
    brick.showString("Blu: indietro", 6);
    brick.showString("Sx/Dx: rotazione", 7);
}

// Funzione principale che viene eseguita continuamente
forever(function() {
    // Lettura del comando dal telecomando
    let comando = irSensor.remoteCommand(canale);
    
    // Visualizza lo stato corrente
    visualizzaStato();
    
    // Gestione dei comandi speciali (combinazioni di pulsanti)
    if (comando === RemoteButtonCode.TopLeftTopRight) {
        // Aumenta la velocità (max 100)
        velocita = Math.min(100, velocita + 10);
        music.playTone(880, 100);
        pause(200); // Evita incrementi troppo rapidi
    } else if (comando === RemoteButtonCode.BottomLeftBottomRight) {
        // Diminuisci la velocità (min 10)
        velocita = Math.max(10, velocita - 10);
        music.playTone(440, 100);
        pause(200); // Evita decrementi troppo rapidi
    } else if (comando === RemoteButtonCode.TopLeftBottomLeft) {
        // Cambia modalità
        modalita = (modalita + 1) % 2;
        music.playTone(660, 200);
        pause(500); // Evita cambi troppo rapidi
    }
    
    // Calcola la velocità effettiva in base alla modalità
    let velocitaEffettiva = velocita;
    if (modalita === 1) { // Modalità precisione
        velocitaEffettiva = Math.floor(velocita / 2); // Dimezza la velocità
    }
    
    // Gestione dei comandi di movimento
    switch (comando) {
        case RemoteButtonCode.TopLeft:
            // Avanti a sinistra
            motors.largeB.run(velocitaEffettiva * 0.5);
            motors.largeC.run(velocitaEffettiva);
            brick.showString("Avanti sinistra", 4);
            break;
            
        case RemoteButtonCode.TopRight:
            // Avanti a destra
            motors.largeB.run(velocitaEffettiva);
            motors.largeC.run(velocitaEffettiva * 0.5);
            brick.showString("Avanti destra", 4);
            break;
            
        case RemoteButtonCode.BottomLeft:
            // Indietro a sinistra
            motors.largeB.run(-velocitaEffettiva * 0.5);
            motors.largeC.run(-velocitaEffettiva);
            brick.showString("Indietro sinistra", 4);
            break;
            
        case RemoteButtonCode.BottomRight:
            // Indietro a destra
            motors.largeB.run(-velocitaEffettiva);
            motors.largeC.run(-velocitaEffettiva * 0.5);
            brick.showString("Indietro destra", 4);
            break;
            
        case RemoteButtonCode.TopRightBottomRight:
            // Rotazione a destra sul posto
            motors.largeB.run(velocitaEffettiva);
            motors.largeC.run(-velocitaEffettiva);
            brick.showString("Rotazione destra", 4);
            break;
            
        case RemoteButtonCode.TopLeftBottomRight:
            // Stop di emergenza
            motors.largeBC.stop();
            brick.showString("STOP EMERGENZA", 4);
            music.playTone(220, 500);
            break;
            
        default:
            // Se non ci sono comandi specifici o combinazioni già gestite
            if (comando === 0) {
                // Nessun pulsante premuto: ferma i motori
                motors.largeBC.stop();
                brick.showString("In attesa...", 4);
            }
    }
    
    // Breve pausa
    pause(50);
});