/**
 * Esercizio 1: Robot che evita ostacoli
 * 
 * Questo programma implementa un robot che si muove autonomamente evitando gli ostacoli
 * utilizzando il sensore a ultrasuoni.
 */

// Configurazione dei motori e del sensore
let motoreSinistro = motors.largeA;
let motoreDestro = motors.largeB;
let sensoreUltrasuoni = sensors.ultrasonic4;

// Parametri di configurazione
let velocitaAvanti = 50;      // Velocità di avanzamento
let velocitaRotazione = 30;   // Velocità di rotazione
let distanzaSicurezza = 20;   // Distanza minima dagli ostacoli (in cm)
let tempoRotazione = 1000;    // Tempo di rotazione base (in ms)

// Array per memorizzare le ultime direzioni scelte
let ultimeRotazioni = [];
let maxMemoriaRotazioni = 5;  // Numero massimo di rotazioni da memorizzare

// Funzione per muoversi in avanti
function muoviAvanti() {
    motoreSinistro.run(velocitaAvanti);
    motoreDestro.run(velocitaAvanti);
    brick.showString("Avanti", 1);
}

// Funzione per fermarsi
function fermati() {
    motoreSinistro.stop();
    motoreDestro.stop();
    brick.showString("Stop", 1);
}

// Funzione per ruotare (direzione: 1 = destra, -1 = sinistra)
function ruota(direzione) {
    // Memorizza la direzione scelta
    ultimeRotazioni.push(direzione);
    if (ultimeRotazioni.length > maxMemoriaRotazioni) {
        ultimeRotazioni.shift();  // Rimuove la rotazione più vecchia
    }
    
    // Calcola il tempo di rotazione (variabile per evitare schemi ripetitivi)
    let tempoEffettivo = tempoRotazione + Math.randomRange(0, 500);
    
    // Ruota nella direzione specificata
    if (direzione > 0) {
        brick.showString("Rotazione destra", 1);
        motoreSinistro.run(velocitaRotazione);
        motoreDestro.run(-velocitaRotazione);
    } else {
        brick.showString("Rotazione sinistra", 1);
        motoreSinistro.run(-velocitaRotazione);
        motoreDestro.run(velocitaRotazione);
    }
    
    // Attendi il tempo di rotazione
    pause(tempoEffettivo);
}

// Funzione per scegliere la direzione di rotazione
function scegliDirezione() {
    // Conta quante volte abbiamo ruotato a destra e a sinistra recentemente
    let conteggioRotazioni = ultimeRotazioni.reduce((acc, val) => acc + val, 0);
    
    // Se abbiamo ruotato troppo in una direzione, forza la direzione opposta
    if (conteggioRotazioni >= 3) {
        return -1;  // Forza rotazione a sinistra
    } else if (conteggioRotazioni <= -3) {
        return 1;   // Forza rotazione a destra
    } else {
        // Altrimenti scegli casualmente
        return Math.randomRange(0, 1) * 2 - 1;  // Restituisce 1 o -1
    }
}

// Funzione per controllare se c'è un ostacolo
function controllaOstacolo() {
    let distanza = sensoreUltrasuoni.distance();
    brick.showString(`Distanza: ${distanza} cm`, 2);
    
    return distanza < distanzaSicurezza;
}

// Programma principale
brick.showString("Robot Evita Ostacoli", 0);
brick.showString("Premi per iniziare", 4);

// Attendi la pressione del pulsante
while (!brick.buttonEnter.wasPressed()) {
    pause(50);
}

brick.clearScreen();
brick.showString("Robot Evita Ostacoli", 0);

// Loop principale
while (true) {
    // Controlla se c'è un ostacolo
    if (controllaOstacolo()) {
        // Se c'è un ostacolo, fermati e ruota
        fermati();
        pause(500);  // Breve pausa
        
        // Scegli la direzione di rotazione
        let direzione = scegliDirezione();
        ruota(direzione);
    } else {
        // Se non ci sono ostacoli, vai avanti
        muoviAvanti();
    }
    
    // Controlla se il pulsante di uscita è stato premuto
    if (brick.buttonExit.wasPressed()) {
        break;
    }
    
    pause(100);  // Piccola pausa per non sovraccaricare il processore
}

// Ferma i motori quando il programma termina
fermati();
brick.showString("Programma terminato", 1);