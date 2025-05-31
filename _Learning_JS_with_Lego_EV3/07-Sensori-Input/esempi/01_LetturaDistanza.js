/**
 * Esempio di utilizzo del sensore a ultrasuoni per misurare la distanza
 * 
 * Questo programma mostra come utilizzare il sensore a ultrasuoni EV3 per
 * misurare continuamente la distanza dagli oggetti e reagire in base ad essa.
 */

// Configurazione del sensore a ultrasuoni sulla porta 1
const ultrasonicSensor = sensors.ultrasonic1;

// Funzione principale che viene eseguita continuamente
forever(function() {
    // Lettura della distanza in centimetri
    let distanza = ultrasonicSensor.distance();
    
    // Visualizzazione della distanza sul display EV3
    brick.clearScreen();
    brick.showString("Sensore Ultrasuoni", 1);
    brick.showValue("Distanza (cm)", distanza, 2);
    
    // Reazione in base alla distanza misurata
    if (distanza < 10) {
        // Oggetto molto vicino: allarme
        brick.showString("ATTENZIONE!", 4);
        brick.setStatusLight(StatusLight.RedFlash);
        music.playTone(880, 200);
    } else if (distanza < 30) {
        // Oggetto vicino: avviso
        brick.showString("Oggetto vicino", 4);
        brick.setStatusLight(StatusLight.OrangeFlash);
    } else {
        // Nessun oggetto nelle vicinanze
        brick.showString("Via libera", 4);
        brick.setStatusLight(StatusLight.Green);
    }
    
    // Emetti un suono la cui frequenza dipende dalla distanza
    // (più acuto quando l'oggetto è vicino)
    if (distanza < 100) {
        let frequenza = 200 + (100 - distanza) * 8;
        music.playTone(frequenza, 10);
    }
    
    // Breve pausa per non sovraccaricare il sistema
    pause(100);
});