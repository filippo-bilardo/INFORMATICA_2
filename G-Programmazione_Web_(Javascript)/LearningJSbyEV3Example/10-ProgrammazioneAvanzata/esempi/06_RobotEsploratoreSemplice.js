// Esempio 10.6: Robot Esploratore Semplice (Concettuale)
// Il robot si muove in un'area cercando di "mappare" gli ostacoli che incontra.
// La mappa è molto semplificata (es. una griglia di celle visitate/occupate).
// Questo è più un esercizio concettuale data la limitata capacità di localizzazione precisa dell'EV3.

brick.showString("Robot Esploratore", 1);

// --- Configurazione della Mappa e del Robot ---
const dimensioneCella = 20; // cm, dimensione di una cella della griglia
const mappaLarghezza = 10; // numero di celle
const mappaAltezza = 10;  // numero di celle
let mappa = []; // Array 2D per la mappa: 0 = sconosciuto, 1 = libero, 2 = ostacolo

// Posizione e orientamento stimati del robot (molto approssimativi)
let robotX = Math.floor(mappaLarghezza / 2);
let robotY = Math.floor(mappaAltezza / 2);
let robotOrientamento = 0; // 0: Nord (avanti), 1: Est (destra), 2: Sud (indietro), 3: Ovest (sinistra)

const velocitaMovimento = 25;
const distanzaRilevamentoOstacolo = 25; // cm

// Inizializzazione mappa
function inizializzaMappa() {
    for (let i = 0; i < mappaAltezza; i++) {
        mappa[i] = [];
        for (let j = 0; j < mappaLarghezza; j++) {
            mappa[i][j] = 0; // Sconosciuto
        }
    }
    // Segna la posizione iniziale come libera
    if (robotX >=0 && robotX < mappaLarghezza && robotY >=0 && robotY < mappaAltezza) {
      mappa[robotY][robotX] = 1; // Libero
    }
    brick.showString("Mappa Inizializzata", 2);
    console.log("Mappa inizializzata. Robot a (" + robotX + "," + robotY + ")");
}

// --- Funzioni di Movimento e Percezione (Approssimative) ---

// Simula l'aggiornamento della posizione dopo un movimento in avanti
function aggiornaPosizioneDopoMovimento() {
    switch (robotOrientamento) {
        case 0: robotY--; break; // Nord (Y decresce)
        case 1: robotX++; break; // Est (X cresce)
        case 2: robotY++; break; // Sud (Y cresce)
        case 3: robotX--; break; // Ovest (X decresce)
    }
    // Mantieni il robot dentro i limiti della mappa (semplificazione)
    robotX = Math.max(0, Math.min(mappaLarghezza - 1, robotX));
    robotY = Math.max(0, Math.min(mappaAltezza - 1, robotY));
    
    mappa[robotY][robotX] = 1; // Segna la nuova cella come visitata/libera
    brick.showString("Pos: " + robotX + "," + robotY, 4);
    console.log("Nuova posizione stimata: (" + robotX + "," + robotY + ")");
}

function giraDestra() {
    motors.mediumB.run(velocitaMovimento, 0.5, MoveUnit.Rotations); // Valori da calibrare
    motors.mediumC.run(-velocitaMovimento, 0.5, MoveUnit.Rotations);
    motors.mediumBC.stop();
    robotOrientamento = (robotOrientamento + 1) % 4;
    brick.showString("Gira Dx. Ori: " + robotOrientamento, 3);
    console.log("Girato a destra. Nuovo orientamento: " + robotOrientamento);
    loops.pause(500);
}

function giraSinistra() {
    motors.mediumB.run(-velocitaMovimento, 0.5, MoveUnit.Rotations); // Valori da calibrare
    motors.mediumC.run(velocitaMovimento, 0.5, MoveUnit.Rotations);
    motors.mediumBC.stop();
    robotOrientamento = (robotOrientamento + 3) % 4; // (orientamento - 1 + 4) % 4
    brick.showString("Gira Sx. Ori: " + robotOrientamento, 3);
    console.log("Girato a sinistra. Nuovo orientamento: " + robotOrientamento);
    loops.pause(500);
}

function avanzaUnaCella() {
    // Muovi il robot per una distanza approssimativa di una cella
    // Questo è molto impreciso e necessita calibrazione!
    // Distanza = circonferenza ruota * (gradi / 360)
    // Per una cella di 'dimensioneCella' cm.
    // Assumiamo che 1 rotazione = X cm (da calibrare)
    const rotazioniPerCella = 1.5; // VALORE DA CALIBRARE!
    motors.mediumBC.run(velocitaMovimento, rotazioniPerCella, MoveUnit.Rotations);
    motors.mediumBC.stop();
    aggiornaPosizioneDopoMovimento();
    loops.pause(500);
}

// Controlla ostacoli e aggiorna la mappa
function controllaEAggiornaMappa() {
    let distanza = sensors.ultrasonic4.distance();
    brick.showString("Dist: " + (distanza !== null ? distanza.toString() : "N/A"), 5);

    if (distanza !== null && distanza < distanzaRilevamentoOstacolo) {
        brick.sound(Sound.Warning);
        // Ostacolo rilevato di fronte. Calcola la cella dell'ostacolo
        let ox = robotX, oy = robotY;
        switch (robotOrientamento) {
            case 0: oy--; break;
            case 1: ox++; break;
            case 2: oy++; break;
            case 3: ox--; break;
        }
        if (ox >= 0 && ox < mappaLarghezza && oy >= 0 && oy < mappaAltezza) {
            mappa[oy][ox] = 2; // Segna come ostacolo
            console.log("Ostacolo mappato a: (" + ox + "," + oy + ")");
            brick.showString("Ostacolo! "+ ox + "," + oy, 6);
        }
        return true; // Ostacolo trovato
    }
    return false; // Nessun ostacolo
}

// --- Logica di Esplorazione Semplice ---
let passiEsplorazione = 0;
const maxPassiEsplorazione = 30;

function esplora() {
    if (passiEsplorazione >= maxPassiEsplorazione) {
        brick.showString("Esplorazione Finita", 7);
        motors.stopAll();
        // Stampa la mappa sulla console (molto basilare)
        console.log("Mappa finale:");
        for (let i = 0; i < mappaAltezza; i++) {
            console.log(mappa[i].join(' '));
        }
        control.programStop();
        return;
    }

    if (controllaEAggiornaMappa()) {
        // Ostacolo di fronte, gira (es. a destra)
        giraDestra();
    } else {
        // Nessun ostacolo, prova ad avanzare
        // Decisione semplice: se la cella di fronte è sconosciuta o libera, avanza.
        // Altrimenti, gira per cercare un nuovo percorso.
        let nx = robotX, ny = robotY;
        switch (robotOrientamento) {
            case 0: ny--; break;
            case 1: nx++; break;
            case 2: ny++; break;
            case 3: nx--; break;
        }

        if (nx >= 0 && nx < mappaLarghezza && ny >= 0 && ny < mappaAltezza && mappa[ny][nx] !== 2) {
            avanzaUnaCella();
        } else {
            // Cella di fronte è un ostacolo già mappato o fuori mappa, gira
            giraSinistra(); 
        }
    }
    passiEsplorazione++;
}

// --- Avvio ---
inizializzaMappa();

// Pulsante per iniziare l'esplorazione
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
    brick.showString("Inizio Esplorazione", 1);
    loops.forever(function() {
        esplora();
        loops.pause(200); // Pausa tra le azioni
    });
});

brick.buttonDown.onEvent(ButtonEvent.Pressed, function () {
    motors.stopAll();
    brick.clearScreen();
    brick.showString("Programma Terminato", 6);
    brick.sound(Sound.Goodbye);
    control.programStop();
});

// Note per MakeCode:
// 1. Incolla nella vista JavaScript.
// 2. Configura sensore ultrasuoni (porta 4) e motori (B, C).
// 3. Questo è un esempio ALTAMENTE CONCETTUALE. La localizzazione e la mappatura precise
//    con EV3 e MakeCode sono molto difficili a causa della mancanza di sensori di 
//    posizionamento accurati (come encoder con feedback preciso o GPS indoor).
// 4. La CALIBRAZIONE di `rotazioniPerCella` e degli angoli di sterzata è FONDAMENTALE
//    e dipenderà dalla costruzione specifica del robot e dalla superficie.
// 5. La mappa è una semplice griglia e non gestisce ostacoli di forma complessa.
// 6. L'esplorazione è basata su una logica molto semplice (es. "gira a destra se ostacolo").
//    Algoritmi più sofisticati (es. frontier-based exploration) sono oltre lo scopo.