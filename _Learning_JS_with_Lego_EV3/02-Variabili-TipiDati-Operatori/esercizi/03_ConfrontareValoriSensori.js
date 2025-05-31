// Esercizio 3: Confrontare i Valori dei Sensori
// Leggi i valori da due sensori diversi (es. sensore tattile e sensore a ultrasuoni).
// Memorizza i valori in variabili.
// Confronta i valori utilizzando operatori di confronto (es. >, <, ===).
// Mostra un messaggio sul display dell'EV3 basato sul risultato del confronto.

let valoreSensoreTattile = sensors.touch1.isPressed()
let valoreSensoreUltrasuoni = sensors.ultrasonic1.distance()

let messaggio = ""

if (valoreSensoreTattile) {
    messaggio = "Tattile premuto!"
} else {
    messaggio = "Tattile non premuto."
}

if (valoreSensoreUltrasuoni < 20) {
    messaggio += " Oggetto vicino!"
} else {
    messaggio += " Nessun oggetto vicino."
}

brick.showString(messaggio, 1)