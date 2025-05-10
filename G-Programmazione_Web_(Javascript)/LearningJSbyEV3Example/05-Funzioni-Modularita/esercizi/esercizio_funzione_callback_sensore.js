// Esercizio 5: Implementare una Funzione Callback per un Sensore
// Obiettivo: Scrivere un programma che utilizzi una funzione callback per reagire alla pressione di un pulsante del brick EV3.
// Quando il pulsante 'Su' viene premuto, il robot deve emettere un suono e visualizzare un messaggio.

/**
 * Funzione callback da eseguire quando il pulsante 'Su' del brick EV3 viene premuto.
 */
function gestisciPressionePulsanteSu() {
    brick.showString("Pulsante SU premuto!", 4);
    brick.sound(Sound.PlayTone, 880, 300); // Emette un suono (La5 per 300ms)
    
    // Potresti aggiungere altre azioni qui, come muovere i motori, cambiare LED, ecc.
    // Esempio: fai un piccolo scatto in avanti
    brick.motorA.run(40, 200); // Motore A al 40% per 200ms
    brick.motorB.run(40, 200); // Motore B al 40% per 200ms
    // Nota: .run(potenza, durata) è un modo comodo per movimenti brevi.
    // Al termine della durata, i motori si fermano automaticamente.
}

/**
 * Funzione callback da eseguire quando il pulsante 'Giu' del brick EV3 viene premuto.
 */
function gestisciPressionePulsanteGiu() {
    brick.showString("Pulsante GIU premuto!", 5);
    brick.sound(Sound.PlayTone, 220, 300); // Emette un suono (La3 per 300ms)
    brick.setStatusLight(StatusLight.OrangePulse); // Lampeggio arancione
    pause(1000);
    brick.setStatusLight(StatusLight.Green); // Torna a verde
}


// Programma principale
brick.showString("Esercizio Callback Sensore", 1);
brick.showString("Premi i pulsanti Su/Giu", 2);
brick.setStatusLight(StatusLight.Green); // Luce verde all'avvio

// Imposta la callback per l'evento di pressione del pulsante 'Su'
brick.buttonUp.onEvent(ButtonEvent.Pressed, gestisciPressionePulsanteSu);

// Imposta la callback per l'evento di pressione del pulsante 'Giu'
brick.buttonDown.onEvent(ButtonEvent.Pressed, gestisciPressionePulsanteGiu);

// Mantieni il programma attivo per permettere alle callback di essere eseguite
forever(() => {
    // Questo loop 'forever' assicura che il programma non termini,
    // consentendo la gestione degli eventi dei pulsanti.
    pause(100); // Piccola pausa per efficienza
});

// Nota: per testare, carica questo codice sull'EV3 e premi i pulsanti fisici sul brick.