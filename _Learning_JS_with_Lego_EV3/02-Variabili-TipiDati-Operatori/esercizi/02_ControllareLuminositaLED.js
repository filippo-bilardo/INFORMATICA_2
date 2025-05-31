// Esercizio 2: Controllare la Luminosità di un LED
// Definisci una variabile per l'intensità luminosa (es. un numero da 0 a 100).
// Usa questa variabile per impostare la luminosità del LED del brick EV3 (es. luce rossa).
// Prova a cambiare il valore della variabile e osserva l'effetto.

let intensitaLuminosa = 75 // Valore da 0 a 100

// Imposta il colore del LED a rosso con l'intensità specificata
brick.setLedPattern(Leds.Red, LedPattern.User, intensitaLuminosa, 0)