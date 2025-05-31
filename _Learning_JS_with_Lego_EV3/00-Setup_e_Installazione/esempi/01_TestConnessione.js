<!-- filepath: /home/git-projects/INFORMATICA_2/G-Programmazione_Web_(Javascript)/LearningJSbyEV3Example/00-Setup_e_Installazione/esempi/01_TestConnessione.js -->
// TestConnessione.js
// Questo script verifica che la connessione con il robot EV3 funzioni correttamente

// Pulisci lo schermo
brick.clearScreen();

// Visualizza un messaggio di benvenuto
brick.showString("Test di", 1);
brick.showString("Connessione", 2);
pause(1000);

// Ciclo di test del display e del LED
for (let i = 3; i > 0; i--) {
    // Mostra il conto alla rovescia
    brick.clearScreen();
    brick.showString("Test tra...", 1);
    brick.showString("" + i, 2);
    
    // Cambia il colore del LED in base al conteggio
    if (i === 3) {
        brick.setStatusLight(StatusLight.Red);
    } else if (i === 2) {
        brick.setStatusLight(StatusLight.Orange);
    } else {
        brick.setStatusLight(StatusLight.Green);
    }
    
    // Riproduci un suono di "beep"
    music.playTone(440, 200);
    pause(800);
}

// Test completato con successo
brick.clearScreen();
brick.showString("Connessione", 1);
brick.showString("OK!", 2);
music.playSoundEffect(SoundEffect.Success);
brick.setStatusLight(StatusLight.Green);

// Pausa per visualizzare il messaggio
pause(3000);

// Spegni il LED e pulisci lo schermo alla fine
brick.setStatusLight(StatusLight.Off);
brick.clearScreen();
brick.showString("Fine test", 1);
