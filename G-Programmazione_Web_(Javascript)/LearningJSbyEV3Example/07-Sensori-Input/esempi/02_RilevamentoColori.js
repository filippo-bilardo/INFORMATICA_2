/**
 * Esempio di utilizzo del sensore di colore per rilevare colori e intensità luminosa
 * 
 * Questo programma mostra come utilizzare il sensore di colore EV3 per
 * identificare colori e misurare l'intensità della luce riflessa e ambientale.
 */

// Configurazione del sensore di colore sulla porta 3
const colorSensor = sensors.color3;

// Funzione per ottenere il nome del colore in italiano
function getNomeColore(colore) {
    switch (colore) {
        case ColorSensorColor.Black:
            return "Nero";
        case ColorSensorColor.Blue:
            return "Blu";
        case ColorSensorColor.Green:
            return "Verde";
        case ColorSensorColor.Yellow:
            return "Giallo";
        case ColorSensorColor.Red:
            return "Rosso";
        case ColorSensorColor.White:
            return "Bianco";
        case ColorSensorColor.Brown:
            return "Marrone";
        default:
            return "Sconosciuto";
    }
}

// Variabile per tenere traccia della modalità corrente
let modalita = 0; // 0: colore, 1: luce riflessa, 2: luce ambientale

// Funzione principale che viene eseguita continuamente
forever(function() {
    // Verifica se il pulsante centrale è stato premuto per cambiare modalità
    if (brick.buttonEnter.wasPressed()) {
        modalita = (modalita + 1) % 3;
        brick.clearScreen();
        pause(200); // Piccola pausa per evitare pressioni multiple
    }
    
    // Comportamento in base alla modalità selezionata
    switch (modalita) {
        case 0: // Modalità rilevamento colore
            // Lettura del colore
            let colore = colorSensor.color();
            let nomeColore = getNomeColore(colore);
            
            // Visualizzazione sul display
            brick.showString("Modalità: Colore", 1);
            brick.showString("Colore: " + nomeColore, 3);
            
            // Feedback in base al colore rilevato
            switch (colore) {
                case ColorSensorColor.Red:
                    brick.setStatusLight(StatusLight.Red);
                    break;
                case ColorSensorColor.Green:
                    brick.setStatusLight(StatusLight.Green);
                    break;
                case ColorSensorColor.Blue:
                    brick.setStatusLight(StatusLight.Orange); // Non c'è blu, usiamo arancione
                    break;
                default:
                    brick.setStatusLight(StatusLight.Off);
            }
            break;
            
        case 1: // Modalità luce riflessa
            // Lettura dell'intensità della luce riflessa
            let luceRiflessa = colorSensor.reflectedLight();
            
            // Visualizzazione sul display
            brick.showString("Modalità: Riflessa", 1);
            brick.showValue("Intensità", luceRiflessa, 3);
            
            // Visualizzazione grafica dell'intensità
            let barLength = Math.floor(luceRiflessa / 10); // Scala 0-100 a 0-10
            let bar = "";
            for (let i = 0; i < barLength; i++) {
                bar += "█";
            }
            brick.showString(bar, 4);
            break;
            
        case 2: // Modalità luce ambientale
            // Lettura dell'intensità della luce ambientale
            let luceAmbiente = colorSensor.ambientLight();
            
            // Visualizzazione sul display
            brick.showString("Modalità: Ambiente", 1);
            brick.showValue("Intensità", luceAmbiente, 3);
            
            // Feedback sonoro in base all'intensità della luce
            if (luceAmbiente > 5) {
                let frequenza = 200 + luceAmbiente * 5;
                music.playTone(frequenza, 10);
            }
            break;
    }
    
    // Istruzioni per l'utente
    brick.showString("Premi ENTER per cambiare", 7);
    
    // Breve pausa
    pause(100);
});