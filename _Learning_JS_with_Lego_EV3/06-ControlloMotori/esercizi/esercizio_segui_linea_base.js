// Esercizio 3: Segui la Linea (Simulazione Base con Feedback)
// Descrizione: Simulare un comportamento di base per seguire una linea.
// Questo esercizio è più concettuale se non si dispone di un sensore di colore.
// Si concentra sull'uso del feedback motore (immaginario o letto) per aggiustamenti.

brick.showString("Esercizio: Segui Linea", 1);

// Parametri di base (da calibrare o simulare)
var potenzaBase = 40;
var correzionePotenza = 15; // Quanto correggere la potenza di un motore
var sogliaSensoreSinistra = 50; // Valore immaginario: se il sensore di sinistra vede nero
var sogliaSensoreDestra = 50;  // Valore immaginario: se il sensore di destra vede nero

// Funzione per simulare la lettura di un sensore di linea (bianco/nero)
// Restituisce 'sinistra', 'destra', 'centro' o 'perso'
// In un caso reale, qui leggeresti i valori da brick.sensorX.read()
function leggiStatoLinea() {
    // SIMULAZIONE: Alterna lo stato per mostrare le correzioni
    // In un robot reale, questo dipenderebbe dai sensori di colore.
    var randomValue = Math.random();
    if (randomValue < 0.3) {
        brick.showString("Linea a Sinistra", 3);
        return 'sinistra'; // Deve girare a sinistra
    } else if (randomValue < 0.6) {
        brick.showString("Linea a Destra", 3);
        return 'destra'; // Deve girare a destra
    } else {
        brick.showString("Linea al Centro", 3);
        return 'centro'; // Va dritto
    }
    // Potrebbe anche esserci uno stato 'perso' se entrambi i sensori sono su bianco per troppo tempo.
}

brick.showString("Avvio Segui-Linea...", 2);
pause(1000);

var running = true;
var loopCount = 0;
var maxLoops = 50; // Esegui per un numero limitato di cicli per questo esempio

while (running && loopCount < maxLoops) {
    var statoLinea = leggiStatoLinea();

    switch (statoLinea) {
        case 'centro':
            // La linea è al centro, vai dritto
            brick.motorA.run(potenzaBase);
            brick.motorB.run(potenzaBase);
            break;
        case 'sinistra':
            // La linea è a sinistra, gira a sinistra (riduci potenza motore A, aumenta B o viceversa)
            brick.motorA.run(potenzaBase - correzionePotenza);
            brick.motorB.run(potenzaBase + correzionePotenza);
            break;
        case 'destra':
            // La linea è a destra, gira a destra
            brick.motorA.run(potenzaBase + correzionePotenza);
            brick.motorB.run(potenzaBase - correzionePotenza);
            break;
        case 'perso':
            // Linea persa, implementa una strategia di ricerca (es. fermati o gira)
            brick.showString("Linea Persa!", 4);
            brick.stopAllMotors();
            // running = false; // Potrebbe fermarsi o iniziare una manovra di ricerca
            break;
    }

    // Leggi la posizione dei motori (feedback)
    // var posA = brick.motorA.readPosition();
    // var posB = brick.motorB.readPosition();
    // brick.showString("Pos A:" + posA + " B:" + posB, 5); // Troppo veloce per essere letto

    pause(100); // Breve pausa per dare tempo ai motori di reagire e per la simulazione
    loopCount++;
}

brick.stopAllMotors();
brick.showString("Segui-Linea Terminato", 7);
pause(1000);

brick.showString("Fine Esercizio 3", 9);

// Suggerimenti:
// 1. Questo è uno schema molto semplificato. Un vero robot segui-linea usa spesso algoritmi PID.
// 2. Se avessi sensori di colore reali (es. S1, S2), leggeresti i loro valori:
//    var valoreSensoreSx = brick.sensor1.read();
//    var valoreSensoreDx = brick.sensor2.read();
//    E poi confronteresti questi valori con delle soglie calibrate per bianco e nero.
// 3. Il feedback dei motori (posizione) potrebbe essere usato per movimenti più fluidi o per
//    rilevare se il robot è bloccato, ma non è l'input primario per la decisione di sterzata
//    in un segui-linea base, che si affida ai sensori di linea.