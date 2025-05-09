/**
 * Esempio di utilizzo combinato di sensori per rilevare ostacoli
 * 
 * Questo programma mostra come utilizzare più sensori EV3 insieme
 * per creare un sistema avanzato di rilevamento ostacoli.
 */

// Configurazione dei sensori
const ultrasonicSensor = sensors.ultrasonic1; // Sensore ultrasuoni sulla porta 1
const touchSensor = sensors.touch2;          // Sensore touch sulla porta 2
const colorSensor = sensors.color3;          // Sensore colore sulla porta 3
const irSensor = sensors.infrared4;          // Sensore infrarossi sulla porta 4

// Costanti per le soglie di rilevamento
const DISTANZA_PERICOLO = 15;      // Distanza in cm per considerare un ostacolo pericoloso
const DISTANZA_ATTENZIONE = 30;    // Distanza in cm per entrare in modalità attenzione
const INTENSITA_LINEA_NERA = 20;   // Valore di intensità per rilevare una linea nera

// Variabili di stato
let modalita = 0;  // 0: normale, 1: attenzione, 2: pericolo, 3: emergenza
let velocita = 50; // Velocità base del robot

// Funzione per visualizzare lo stato del robot
function visualizzaStato() {
    brick.clearScreen();
    brick.showString("Rilevatore Ostacoli", 0);
    
    // Visualizza la modalità corrente
    switch (modalita) {
        case 0:
            brick.showString("Modalità: Normale", 1);
            brick.setStatusLight(StatusLight.Green);
            break;
        case 1:
            brick.showString("Modalità: Attenzione", 1);
            brick.setStatusLight(StatusLight.Orange);
            break;
        case 2:
            brick.showString("Modalità: Pericolo", 1);
            brick.setStatusLight(StatusLight.RedFlash);
            break;
        case 3:
            brick.showString("Modalità: EMERGENZA", 1);
            brick.setStatusLight(StatusLight.Red);
            break;
    }
}

// Funzione per aggiornare la modalità in base ai sensori
function aggiornaModalita() {
    // Lettura dei sensori
    let distanzaUltrasuoni = ultrasonicSensor.distance();
    let touchPremuto = touchSensor.isPressed();
    let intensitaLuce = colorSensor.reflectedLight();
    let distanzaIR = irSensor.proximity();
    
    // Visualizza i valori dei sensori
    brick.showValue("Ultrasuoni", distanzaUltrasuoni, 2);
    brick.showValue("Touch", touchPremuto ? 1 : 0, 3);
    brick.showValue("Colore", intensitaLuce, 4);
    brick.showValue("IR", distanzaIR, 5);
    
    // Determina la modalità in base ai sensori (priorità decrescente)
    if (touchPremuto) {
        // Il sensore touch ha la massima priorità: emergenza
        modalita = 3;
        return;
    }
    
    if (distanzaUltrasuoni < DISTANZA_PERICOLO || distanzaIR < 30) {
        // Ostacolo molto vicino: pericolo
        modalita = 2;
        return;
    }
    
    if (distanzaUltrasuoni < DISTANZA_ATTENZIONE || intensitaLuce < INTENSITA_LINEA_NERA) {
        // Ostacolo vicino o linea nera: attenzione
        modalita = 1;
        return;
    }
    
    // Nessun ostacolo rilevato: modalità normale
    modalita = 0;
}

// Funzione per controllare il movimento in base alla modalità
function controllaMovimento() {
    switch (modalita) {
        case 0: // Modalità normale
            // Movimento in avanti a velocità normale
            motors.largeBC.run(velocita);
            break;
            
        case 1: // Modalità attenzione
            // Rallenta e procedi con cautela
            motors.largeBC.run(velocita * 0.5);
            break;
            
        case 2: // Modalità pericolo
            // Ferma, poi ruota per evitare l'ostacolo
            motors.largeBC.stop();
            pause(200);
            
            // Determina la direzione di rotazione in base ai sensori
            let distanzaSinistra = ultrasonicSensor.distance();
            motors.largeB.run(30);
            motors.largeC.run(-30);
            pause(500); // Ruota un po' per misurare a destra
            let distanzaDestra = ultrasonicSensor.distance();
            
            // Scegli la direzione con più spazio
            if (distanzaDestra > distanzaSinistra) {
                // Più spazio a destra: continua a ruotare a destra
                motors.largeB.run(40);
                motors.largeC.run(-40);
                pause(800);
            } else {
                // Più spazio a sinistra: ruota a sinistra
                motors.largeB.run(-40);
                motors.largeC.run(40);
                pause(1300); // Ruota più a lungo per compensare
            }
            
            // Emetti un suono di avviso
            music.playTone(440, 200);
            break;
            
        case 3: // Modalità emergenza
            // Stop completo e segnalazione
            motors.largeBC.stop();
            music.playTone(220, 1000);
            
            // Retromarcia
            motors.largeBC.run(-30);
            pause(1000);
            motors.largeBC.stop();
            
            // Rotazione ampia
            motors.largeB.run(50);
            motors.largeC.run(-50);
            pause(1500);
            motors.largeBC.stop();
            
            // Ripristina la modalità normale dopo l'emergenza
            modalita = 0;
            break;
    }
}

// Funzione principale che viene eseguita continuamente
forever(function() {
    // Aggiorna lo stato in base ai sensori
    aggiornaModalita();
    
    // Visualizza lo stato corrente
    visualizzaStato();
    
    // Controlla il movimento in base alla modalità
    controllaMovimento();
    
    // Breve pausa per non sovraccaricare il sistema
    pause(100);
});