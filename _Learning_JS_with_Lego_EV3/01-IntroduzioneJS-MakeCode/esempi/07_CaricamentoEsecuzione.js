// Esempio di caricamento ed esecuzione di un programma su EV3
// Questo script dimostra le funzioni di base per comunicare con il mattoncino EV3

// Configurazione iniziale del EV3
// Questo codice verifica la connessione prima di procedere
brick.showString("Connessione al PC...", 1);

// Simulazione di una funzione che controlla la connessione
function controllaConnessione() {
    // In un ambiente reale, MakeCode gestisce automaticamente la connessione
    // Questo è solo un esempio didattico
    brick.showString("Connessione stabilita!", 2);
    pause(1000);
    brick.sound(Sound.GoodJob, 100);
    return true;
}

// Avvia la sequenza di caricamento solo se la connessione è stabilita
if (controllaConnessione()) {
    // Mostra una barra di avanzamento simulata
    brick.showString("Caricamento programma...", 3);
    
    // Simula il progresso del caricamento
    for (let i = 0; i < 5; i++) {
        brick.showString(".", 4 + i);
        pause(500);
    }
    
    // Programma caricato con successo
    brick.clearScreen();
    brick.showString("Programma caricato!", 1);
    brick.showString("Premere ENTER per eseguire", 2);
    
    // Attendi il pulsante per eseguire
    brick.buttonEnter.onEvent(ButtonEvent.Pressed, function() {
        brick.showString("Esecuzione...", 3);
        motors.largeB.run(30, 2, MoveUnit.Rotations);
        brick.sound(Sound.FanfareFinish, 100);
    });
}
