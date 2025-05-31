// Esercizio 02: Robot Telecomandato
// Scopo: Controllare i movimenti del robot EV3 utilizzando i pulsanti del brick.

brick.showString("Robot Telecomandato", 1);
brick.showString("Up: Avanti", 3);
brick.showString("Down: Indietro", 4);
brick.showString("Left: Sinistra", 5);
brick.showString("Right: Destra", 6);
brick.showString("Enter: Stop", 7);

let velocita = 50;

// Funzione per fermare i motori
function stopMotori() {
    motors.largeBC.stop();
}

// Evento pulsante SU: vai avanti
control.onEvent(DAL.DEVICE_ID_BUTTON_UP, DAL.DEVICE_BUTTON_EVT_CLICK, function () {
    brick.showString("Avanti...", 9);
    motors.largeBC.run(velocita);
});

// Evento pulsante GIU: vai indietro
control.onEvent(DAL.DEVICE_ID_BUTTON_DOWN, DAL.DEVICE_BUTTON_EVT_CLICK, function () {
    brick.showString("Indietro...", 9);
    motors.largeBC.run(-velocita);
});

// Evento pulsante SINISTRA: gira a sinistra
control.onEvent(DAL.DEVICE_ID_BUTTON_LEFT, DAL.DEVICE_BUTTON_EVT_CLICK, function () {
    brick.showString("Sinistra...", 9);
    motors.largeB.run(velocita);
    motors.largeC.run(-velocita);
    pause(500); // Gira per un breve periodo
    stopMotori();
    brick.clearScreen();
    brick.showString("Robot Telecomandato", 1);
    brick.showString("Up: Avanti", 3);
    brick.showString("Down: Indietro", 4);
    brick.showString("Left: Sinistra", 5);
    brick.showString("Right: Destra", 6);
    brick.showString("Enter: Stop", 7);
});

// Evento pulsante DESTRA: gira a destra
control.onEvent(DAL.DEVICE_ID_BUTTON_RIGHT, DAL.DEVICE_BUTTON_EVT_CLICK, function () {
    brick.showString("Destra...", 9);
    motors.largeB.run(-velocita);
    motors.largeC.run(velocita);
    pause(500); // Gira per un breve periodo
    stopMotori();
    brick.clearScreen();
    brick.showString("Robot Telecomandato", 1);
    brick.showString("Up: Avanti", 3);
    brick.showString("Down: Indietro", 4);
    brick.showString("Left: Sinistra", 5);
    brick.showString("Right: Destra", 6);
    brick.showString("Enter: Stop", 7);
});

// Evento pulsante ENTER: ferma i motori
control.onEvent(DAL.DEVICE_ID_BUTTON_ENTER, DAL.DEVICE_BUTTON_EVT_CLICK, function () {
    brick.showString("Stop!", 9);
    stopMotori();
});

// Loop principale per mantenere il programma attivo
forever(function () {
    pause(100);
});