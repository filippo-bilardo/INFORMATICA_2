<!-- filepath: /home/git-projects/INFORMATICA_2/G-Programmazione_Web_(Javascript)/LearningJSbyEV3Example/00-Setup_e_Installazione/esempi/03_TestSensori.js -->
// TestSensori.js
// Questo script verifica il funzionamento dei principali sensori del robot EV3

// Pulisci lo schermo e mostra un messaggio iniziale
brick.clearScreen();
brick.showString("Test Sensori", 1);
brick.showString("Inizio tra 3s...", 2);
pause(3000);

// IMPORTANTE: Questo test assume che i sensori siano collegati come segue:
// - Sensore di tocco: porta 1
// - Sensore di colore: porta 3
// - Sensore a ultrasuoni: porta 4
// Se hai una configurazione diversa, modifica il codice di conseguenza

// Impostazioni generali
let testInCorso = true;  // Flag per controllare il ciclo principale
let sensoreCorrente = 0; // 0: tocco, 1: colore, 2: ultrasuoni

// Funzione per mostrare i dati del sensore di tocco
function mostraDatiTocco() {
    brick.clearScreen();
    brick.showString("Test Sensore Tocco", 1);
    brick.showString("Porta: 1", 2);
    
    let statoTocco = sensors.touch1.isPressed();
    if (statoTocco) {
        brick.showString("Stato: PREMUTO", 3);
        brick.setStatusLight(StatusLight.Green);
    } else {
        brick.showString("Stato: rilasciato", 3);
        brick.setStatusLight(StatusLight.Orange);
    }
    
    brick.showString("Premi pulsante per", 5);
    brick.showString("cambiare sensore", 6);
}

// Funzione per mostrare i dati del sensore di colore
function mostraDatiColore() {
    brick.clearScreen();
    brick.showString("Test Sensore Colore", 1);
    brick.showString("Porta: 3", 2);
    
    let colore = sensors.color3.color();
    let nomeColore = "";
    
    // Converti il codice colore in nome
    switch (colore) {
        case 0: nomeColore = "Nessuno"; break;
        case 1: nomeColore = "Nero"; break;
        case 2: nomeColore = "Blu"; break;
        case 3: nomeColore = "Verde"; break;
        case 4: nomeColore = "Giallo"; break;
        case 5: nomeColore = "Rosso"; break;
        case 6: nomeColore = "Bianco"; break;
        case 7: nomeColore = "Marrone"; break;
        default: nomeColore = "Sconosciuto";
    }
    
    brick.showString("Colore: " + nomeColore, 3);
    brick.showString("Valore: " + colore, 4);
    
    // Imposta il LED in base al colore rilevato
    if (colore === 5) { // Rosso
        brick.setStatusLight(StatusLight.Red);
    } else if (colore === 3) { // Verde
        brick.setStatusLight(StatusLight.Green);
    } else if (colore === 4) { // Giallo
        brick.setStatusLight(StatusLight.Orange);
    } else {
        brick.setStatusLight(StatusLight.Off);
    }
    
    brick.showString("Premi pulsante per", 5);
    brick.showString("cambiare sensore", 6);
}

// Funzione per mostrare i dati del sensore a ultrasuoni
function mostraDatiUltrasuoni() {
    brick.clearScreen();
    brick.showString("Test Sensore US", 1);
    brick.showString("Porta: 4", 2);
    
    let distanza = sensors.ultrasonic4.distance();
    brick.showString("Distanza: " + distanza + " cm", 3);
    
    // Imposta il LED in base alla distanza
    if (distanza < 10) {
        brick.setStatusLight(StatusLight.Red); // Oggetto vicino
    } else if (distanza < 30) {
        brick.setStatusLight(StatusLight.Orange); // Distanza media
    } else {
        brick.setStatusLight(StatusLight.Green); // Oggetto lontano o nessun oggetto
    }
    
    brick.showString("Premi pulsante per", 5);
    brick.showString("cambiare sensore", 6);
}

// Funzione per gestire la pressione dei pulsanti
input.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
    // Cambia il sensore corrente
    sensoreCorrente = (sensoreCorrente + 1) % 3;
    music.playTone(880, 200); // Feedback sonoro
});

input.buttonEsc.onEvent(ButtonEvent.Pressed, function () {
    // Termina il test
    testInCorso = false;
    music.playSoundEffect(SoundEffect.Stop);
});

// Ciclo principale del test
while (testInCorso) {
    if (sensoreCorrente === 0) {
        mostraDatiTocco();
    } else if (sensoreCorrente === 1) {
        mostraDatiColore();
    } else {
        mostraDatiUltrasuoni();
    }
    pause(200); // Aggiorna ogni 200ms
}

// Test completato
brick.clearScreen();
brick.showString("Test Sensori", 1);
brick.showString("Completato!", 2);
music.playSoundEffect(SoundEffect.Success);
brick.setStatusLight(StatusLight.Off);
pause(2000);

// Pulizia finale
brick.clearScreen();
