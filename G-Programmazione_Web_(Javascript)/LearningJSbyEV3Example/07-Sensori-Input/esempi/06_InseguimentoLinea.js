/**
 * 06_InseguimentoLinea.js
 * 
 * Questo esempio mostra come utilizzare il sensore di colore per seguire una linea nera su sfondo bianco.
 * Il robot utilizza un algoritmo di controllo proporzionale per mantenere il sensore sul bordo della linea,
 * permettendo movimenti fluidi e precisi.
 */

// Configurazione dei motori e del sensore
let motoreSinistro = motors.largeA;
let motoreDestro = motors.largeB;
let sensoreColore = sensors.color3;

// Parametri per l'algoritmo di inseguimento linea
let velocitaBase = 30;       // Velocità di base del robot
let guadagnoProporzionale = 0.8;  // Fattore di correzione (da regolare in base al robot)
let valoreBianco = 85;       // Valore di riferimento per il bianco (da calibrare)
let valoreNero = 10;         // Valore di riferimento per il nero (da calibrare)
let valoreBordo = (valoreBianco + valoreNero) / 2;  // Valore target (bordo della linea)

// Funzione per calibrare il sensore
function calibraSensore() {
    // Mostra istruzioni sul display
    brick.showString("Posiziona il sensore", 1);
    brick.showString("sul BIANCO e premi", 2);
    brick.showString("il pulsante centrale", 3);
    
    // Attendi la pressione del pulsante
    while (!brick.buttonEnter.wasPressed()) {
        pause(50);
    }
    
    // Leggi il valore del bianco
    valoreBianco = sensoreColore.reflectedLight();
    brick.showString(`Bianco: ${valoreBianco}`, 4);
    pause(1000);
    
    // Ripeti per il nero
    brick.clearScreen();
    brick.showString("Posiziona il sensore", 1);
    brick.showString("sul NERO e premi", 2);
    brick.showString("il pulsante centrale", 3);
    
    while (!brick.buttonEnter.wasPressed()) {
        pause(50);
    }
    
    // Leggi il valore del nero
    valoreNero = sensoreColore.reflectedLight();
    brick.showString(`Nero: ${valoreNero}`, 4);
    pause(1000);
    
    // Calcola il valore del bordo
    valoreBordo = (valoreBianco + valoreNero) / 2;
    brick.clearScreen();
    brick.showString(`Valore bordo: ${valoreBordo}`, 1);
    brick.showString("Premi per iniziare", 2);
    
    while (!brick.buttonEnter.wasPressed()) {
        pause(50);
    }
    
    brick.clearScreen();
}

// Funzione principale per l'inseguimento della linea
function seguiLinea() {
    // Leggi il valore attuale di luce riflessa
    let valoreAttuale = sensoreColore.reflectedLight();
    
    // Calcola l'errore (differenza dal valore target)
    let errore = valoreAttuale - valoreBordo;
    
    // Calcola la correzione proporzionale
    let correzione = errore * guadagnoProporzionale;
    
    // Applica la correzione alle velocità dei motori
    let velocitaSinistra = velocitaBase - correzione;
    let velocitaDestra = velocitaBase + correzione;
    
    // Limita le velocità a valori ragionevoli
    velocitaSinistra = Math.max(-100, Math.min(100, velocitaSinistra));
    velocitaDestra = Math.max(-100, Math.min(100, velocitaDestra));
    
    // Applica le velocità ai motori
    motoreSinistro.run(velocitaSinistra);
    motoreDestro.run(velocitaDestra);
    
    // Visualizza informazioni sul display
    brick.showString(`Luce: ${valoreAttuale}`, 1);
    brick.showString(`Errore: ${errore.toFixed(1)}`, 2);
    brick.showString(`Corr: ${correzione.toFixed(1)}`, 3);
}

// Programma principale
calibra = true;  // Imposta a false per saltare la calibrazione

if (calibra) {
    calibraSensore();
}

// Loop principale
while (true) {
    seguiLinea();
    
    // Controlla se il pulsante di uscita è stato premuto
    if (brick.buttonExit.wasPressed()) {
        break;
    }
    
    pause(10);  // Piccola pausa per non sovraccaricare il processore
}

// Ferma i motori quando il programma termina
motoreSinistro.stop();
motoreDestro.stop();
brick.showString("Programma terminato", 1);