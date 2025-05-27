// Esempio: Sistema di monitoraggio ambientale con array

// Array per memorizzare letture multiple
let lettureUltrasuoni = [];
let lettureColore = [];
let lettureTouch = [];

// Configurazione robot
motors.largeBC.setBrake(true);

// Funzione per raccogliere dati
function raccogliDatiAmbientali() {
    console.log("Inizio raccolta dati ambientali...");
    
    for (let campione = 0; campione < 20; campione++) {
        // Lettura sensori
        let distanza = sensors.ultrasonic4.distance();
        let luce = sensors.color3.light();
        let tocco = sensors.touch1.isPressed();
        
        // Memorizzazione in array
        lettureUltrasuoni.push(distanza);
        lettureColore.push(luce);
        lettureTouch.push(tocco);
        
        // Movimento per campionamento
        motors.largeBC.steer(0, 30);
        pause(300);
        motors.largeBC.stop();
        pause(200);
        
        // Feedback visivo
        brick.showValue("Campione", campione + 1, 1);
        brick.showValue("Distanza", distanza, 2);
        brick.showValue("Luce", luce, 3);
    }
    
    motors.largeBC.stop();
    analizzaDati();
}

// Funzione per analisi statistica
function analizzaDati() {
    console.log("Analisi dati raccolti:");
    
    // Calcolo medie
    let mediaDistanza = calcolaMedia(lettureUltrasuoni);
    let mediaLuce = calcolaMedia(lettureColore);
    
    // Calcolo valori min/max
    let minDistanza = Math.min(...lettureUltrasuoni);
    let maxDistanza = Math.max(...lettureUltrasuoni);
    
    // Conteggio pressioni touch
    let pressioniTouch = lettureTouch.filter(val => val === true).length;
    
    // Visualizzazione risultati
    brick.clearScreen();
    brick.showValue("Media Dist", Math.round(mediaDistanza), 1);
    brick.showValue("Min Dist", minDistanza, 2);
    brick.showValue("Max Dist", maxDistanza, 3);
    brick.showValue("Media Luce", Math.round(mediaLuce), 4);
    brick.showValue("Touch Press", pressioniTouch, 5);
    
    console.log("Distanza media: " + mediaDistanza);
    console.log("Range distanza: " + minDistanza + " - " + maxDistanza);
    console.log("Pressioni touch: " + pressioniTouch);
}

// Funzione utilitaria per calcolo media
function calcolaMedia(array) {
    if (array.length === 0) return 0;
    let somma = array.reduce((acc, val) => acc + val, 0);
    return somma / array.length;
}

// Avvio programma
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function() {
    raccogliDatiAmbientali();
});

brick.showString("Premi ENTER per iniziare", 1);
brick.showString("raccolta dati", 2);