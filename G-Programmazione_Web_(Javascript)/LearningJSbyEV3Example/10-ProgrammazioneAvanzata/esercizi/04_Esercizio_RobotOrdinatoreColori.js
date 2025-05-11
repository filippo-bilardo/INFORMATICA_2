// Esercizio 04: Robot Ordinatore (Basato su Colore)
// Obiettivo: Il robot incontra oggetti di diversi colori (simulati o reali se hai oggetti colorati).
// Utilizzando una macchina a stati e il sensore di colore, deve "raccogliere" (simulato)
// e "spostare" gli oggetti in aree designate in base al loro colore.
//
// Concetti da Applicare: Macchine a Stati Finiti, programmazione guidata dagli eventi (sensore di colore),
// OOP (opzionale, per rappresentare gli oggetti o le azioni).
//
// Suggerimenti:
// 1. Definisci gli stati del robot: ESPLORAZIONE, RILEVAMENTO_OGGETTO, RACCOLTA_OGGETTO, TRASPORTO_ROSSO, TRASPORTO_BLU, etc.
// 2. Usa il sensore di colore per identificare il colore di un oggetto.
//    - `sensors.color1.onColor(ColorSensorColor.Red, function() { ... })` potrebbe essere utile.
// 3. Simula la raccolta e il rilascio dell'oggetto (es. con un piccolo movimento o un suono).
// 4. Definisci delle "zone di deposito" per i diversi colori (posizioni fisse o direzioni).
// 5. Il robot esplora finché non trova un oggetto. Poi identifica il colore, lo "raccoglie",
//    lo trasporta alla zona corretta e lo "rilascia". Poi torna a esplorare.
// 6. (Opzionale) Usa una classe `Oggetto` per memorizzare il colore e lo stato di un oggetto rilevato.

brick.showString("Esercizio: Robot Ordinatore", 1);

// Stati della macchina
const STATO_ESPLORAZIONE = "ESPLORAZIONE";
const STATO_AVVICINAMENTO = "AVVICINAMENTO";
const STATO_IDENTIFICAZIONE = "IDENTIFICAZIONE";
const STATO_RACCOLTA = "RACCOLTA"; // Simulata
const STATO_TRASPORTO = "TRASPORTO";
const STATO_DEPOSITO = "DEPOSITO"; // Simulata

let statoCorrente = STATO_ESPLORAZIONE;
let oggettoRilevatoColore = null; // Colore dell'oggetto attualmente gestito
let targetPosizioneDeposito = null; // Coordinata o direzione per il deposito

// Parametri di movimento (da calibrare)
const VELOCITA_ESPLORAZIONE = 30;
const VELOCITA_TRASPORTO = 40;
const DISTANZA_RILEVAMENTO_OGGETTO = 10; // cm, quando iniziare l'avvicinamento

// Aree di deposito simulate (es. angoli o lati dell'area di gioco)
// Potrebbero essere coordinate o semplicemente direzioni/sequenze di movimento
const DEPOSITO_ROSSO = { x: 1, y: 0 }; // Esempio: vai avanti per X e gira
const DEPOSITO_BLU = { x: -1, y: 0 }; // Esempio: vai indietro per X e gira
const DEPOSITO_VERDE = { x: 0, y: 1 };

function cambiaStato(nuovoStato) {
    console.log(`Cambio stato: ${statoCorrente} -> ${nuovoStato}`);
    statoCorrente = nuovoStato;
    brick.showString(statoCorrente, 2);
}

// Funzioni di movimento simulate (molto basilari)
function esplora() {
    brick.showString("Esploro...", 3);
    // Gira lentamente su se stesso o muoviti in pattern casuali
    motors.largeBC.tank(VELOCITA_ESPLORAZIONE / 2, -VELOCITA_ESPLORAZIONE / 2);
    // In un vero scenario, si userebbe il sensore ultrasuoni per evitare ostacoli
    // e il sensore di colore in modalità ambiente per cercare colori specifici.
}

function avvicinatiOggetto() {
    brick.showString("Avvicino...", 3);
    motors.largeBC.run(VELOCITA_ESPLORAZIONE, 0.5, MoveUnit.Rotations); // Avanza un po'
    pause(500);
    motors.largeBC.stop();
    cambiaStato(STATO_IDENTIFICAZIONE);
}

function identificaOggetto() {
    brick.showString("Identifico...", 3);
    // Simula la lettura del sensore di colore. In MakeCode, useresti:
    // let coloreRilevato = sensors.color1.color();
    // Per questo esempio, simuliamo la rilevazione dopo un po'
    pause(1000);
    let coloriPossibili = [ColorSensorColor.Red, ColorSensorColor.Blue, ColorSensorColor.Green];
    oggettoRilevatoColore = coloriPossibili[Math.randomRange(0, coloriPossibili.length - 1)];
    
    brick.showString("Colore: " + oggettoRilevatoColore, 4);
    console.log("Oggetto identificato: " + oggettoRilevatoColore);
    
    if (oggettoRilevatoColore !== null) {
        cambiaStato(STATO_RACCOLTA);
    } else {
        cambiaStato(STATO_ESPLORAZIONE); // Non ha trovato un colore valido
    }
}

function raccogliOggetto() {
    brick.showString("Raccolgo...", 3);
    music.playTone(Note.E4, 200);
    pause(500); // Simula azione di raccolta
    music.playTone(Note.G4, 200);
    console.log("Oggetto raccolto (simulato).");
    cambiaStato(STATO_TRASPORTO);
}

function trasportaOggetto() {
    brick.showString("Trasporto...", 3);
    // Determina la destinazione in base al colore
    switch (oggettoRilevatoColore) {
        case ColorSensorColor.Red:
            targetPosizioneDeposito = DEPOSITO_ROSSO;
            brick.showString("Verso Dep. ROSSO", 4);
            break;
        case ColorSensorColor.Blue:
            targetPosizioneDeposito = DEPOSITO_BLU;
            brick.showString("Verso Dep. BLU", 4);
            break;
        case ColorSensorColor.Green:
            targetPosizioneDeposito = DEPOSITO_VERDE;
            brick.showString("Verso Dep. VERDE", 4);
            break;
        default:
            console.log("Colore non gestito per deposito, torno a esplorare.");
            cambiaStato(STATO_ESPLORAZIONE);
            return;
    }
    console.log("Trasporto a: " + JSON.stringify(targetPosizioneDeposito));
    // Simula movimento verso la zona di deposito
    // Esempio: gira verso la direzione e avanza
    motors.largeBC.run(VELOCITA_TRASPORTO, 2, MoveUnit.Rotations); // Avanza per una distanza fissa
    pause(2000 / (VELOCITA_TRASPORTO / 100) + 200);
    motors.largeBC.stop();
    cambiaStato(STATO_DEPOSITO);
}

function depositaOggetto() {
    brick.showString("Deposito...", 3);
    music.playTone(Note.G4, 200);
    pause(500); // Simula azione di deposito
    music.playTone(Note.E4, 200);
    console.log("Oggetto depositato (simulato) a " + JSON.stringify(targetPosizioneDeposito));
    oggettoRilevatoColore = null;
    targetPosizioneDeposito = null;
    cambiaStato(STATO_ESPLORAZIONE);
}

// Evento per simulare il rilevamento di un oggetto con il sensore a ultrasuoni
// In un'implementazione reale, questo sarebbe `sensors.ultrasonic1.onEvent(...)`
// o un controllo continuo nel ciclo di esplorazione.
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function() {
    if (statoCorrente === STATO_ESPLORAZIONE) {
        console.log("Simulazione: Oggetto rilevato vicino!");
        brick.showString("Oggetto Vicino!", 3);
        motors.largeBC.stop(); // Ferma l'esplorazione
        cambiaStato(STATO_AVVICINAMENTO);
    }
});

// Macchina a stati principale
loops.forever(function() {
    switch (statoCorrente) {
        case STATO_ESPLORAZIONE:
            esplora();
            // Qui si potrebbe usare il sensore di colore in modalità 'reflected light' o 'ambient light'
            // per cercare attivamente oggetti, o il sensore ultrasuoni per navigare.
            // Per semplicità, usiamo il pulsante Enter per simulare il rilevamento.
            pause(100); // Breve pausa per non sovraccaricare
            break;
        case STATO_AVVICINAMENTO:
            avvicinatiOggetto();
            break;
        case STATO_IDENTIFICAZIONE:
            identificaOggetto();
            break;
        case STATO_RACCOLTA:
            raccogliOggetto();
            break;
        case STATO_TRASPORTO:
            trasportaOggetto();
            break;
        case STATO_DEPOSITO:
            depositaOggetto();
            break;
    }
    // Non mettere pause lunghe qui, le pause sono gestite nelle singole funzioni di stato se necessario.
});

cambiaStato(STATO_ESPLORAZIONE);
console.log("Robot Ordinatore avviato. Premi Enter per simulare il rilevamento di un oggetto.");
// Assicurati che il sensore di colore sia su S3 (o la porta che usi)
// sensors.color3.mode = ColorSensorMode.Color;