// Esempio di conversione da blocchi MakeCode a JavaScript
// Questo esempio mostra come un programma a blocchi viene tradotto in JavaScript

// Equivalente ai blocchi "Al premere il pulsante play"
// Nel MakeCode interface questo è rappresentato da un blocco di evento
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
    // Mostra testo sul display del EV3
    brick.showString("Ciao da JavaScript!", 1);
    
    // Breve pausa di 2 secondi
    pause(2000);
    
    // Attiva il suono del mattoncino
    brick.sound(Sound.BeepBeep, 100);
    
    // Fai girare il motore sulla porta A per 3 rotazioni a velocità media
    motors.largeA.run(50, 3, MoveUnit.Rotations);
});

// Nota: Questo codice è creato automaticamente quando si passa dalla vista a blocchi
// alla vista JavaScript nell'editor MakeCode. Puoi modificare il codice direttamente
// e vedere i blocchi corrispondenti aggiornati.
