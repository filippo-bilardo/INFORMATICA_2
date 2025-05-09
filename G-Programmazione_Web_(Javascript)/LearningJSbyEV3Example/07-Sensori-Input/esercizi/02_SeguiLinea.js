/**
 * Esercizio 2: Segui-linea con il sensore di colore
 * 
 * Questo programma implementa un robot che segue una linea nera su sfondo bianco
 * utilizzando il sensore di colore e un algoritmo di controllo proporzionale.
 */

// Configurazione dei motori e del sensore
let motoreSinistro = motors.largeA;
let motoreDestro = motors.largeB;
let sensoreColore = sensors.color3;

// Parametri per l'algoritmo di inseguimento linea
let velocitaBase = 25;         // Velocità di base del robot
let guadagnoProporzionale = 1.2;  // Fattore di correzione (da regolare in base al robot)
let valoreBianco = 85;         // Valore di riferimento per il bianco (da calibrare)
let valoreNero = 10;           // Valore di riferimento per il nero (da calibrare)
let valoreBordo = 40;          // Valore target (bordo della linea, da calibrare)

// Variabili per la calibrazione
let calibrazioneCompletata = false;

// Funzione per calibrare il sensore
function calibraSensore() {
    // Mostra istruzioni sul display
    brick.clearScreen();
    brick.showString("CALIBRAZIONE", 0);
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
    brick.showString("CALIBRAZIONE", 0);
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
    brick.showString("CALIBRAZIONE", 0);
    brick.showString(`Bianco: ${valoreBianco}`, 1);
    brick.showString(`Nero: ${valoreNero}`, 2);
    brick.showString(`Bordo: ${valoreBordo}`, 3);
    brick.showString("Premi per iniziare", 4);
    
    while (!brick.buttonEnter.wasPressed()) {
        pause(50);
    }
    
    calibrazioneCompletata = true;
    brick.clearScreen();
}

// Funzione per seguire la linea con controllo proporzionale
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
    brick.showString("SEGUI LINEA", 0);
    brick.showString(`Luce: ${valoreAttuale}`, 1);
    brick.showString(`Errore: ${errore.toFixed(1)}`, 2);
    brick.showString(`Vel SX: ${velocitaSinistra.toFixed(0)}", 3);
    brick.showString(`Vel DX: ${velocitaDestra.toFixed(0)}", 4);
}

// Funzione per fermare i motori
function fermati() {
    motoreSinistro.stop();
    motoreDestro.stop();
}

// Programma principale
brick.showString("Robot Segui Linea", 0);
brick.showString("Premi per calibrare", 4);

// Attendi la pressione del pulsante
while (!brick.buttonEnter.wasPressed()) {
    pause(50);
}

// Esegui la calibrazione
calibraSensore();

// Loop principale
while (true) {
    // Segui la linea
    seguiLinea();
    
    // Controlla se il pulsante di uscita è stato premuto
    if (brick.buttonExit.wasPressed()) {
        break;
    }
    
    pause(10);  // Piccola pausa per non sovraccaricare il processore
}

// Ferma i motori quando il programma termina
fermati();
brick.clearScreen();
brick.showString("Programma terminato", 1);