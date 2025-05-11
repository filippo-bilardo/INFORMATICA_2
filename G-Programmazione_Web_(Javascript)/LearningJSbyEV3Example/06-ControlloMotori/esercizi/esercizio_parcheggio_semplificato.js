// Esercizio 4: Parcheggio Autonomo Semplificato
// Descrizione: Programmare il robot per avanzare per una certa distanza,
// girare di 90 gradi e poi fare retromarcia per "parcheggiare".

brick.showString("Esercizio: Parcheggio", 1);

// Parametri (da calibrare)
var potenzaMovimento = 50;
var distanzaAvanzamentoGradi = 1080; // Es. 3 rotazioni per avanzare
var gradiRotazione90 = 360;         // Gradi che un motore deve fare per girare il robot di 90 gradi (dipende dalla larghezza del robot)
var distanzaRetromarciaGradi = 720; // Es. 2 rotazioni per la retromarcia

// Funzione per muovere dritto (avanti o indietro) per gradi specifici
// Usa motori A e B
function muoviDritto(potenza, gradi) {
    brick.showString("Movimento...", 3);
    brick.motorA.move(potenza, gradi);
    brick.motorB.move(potenza, gradi);
    script.waitMotorStops('A');
    script.waitMotorStops('B');
    pause(200); // Pausa tra le azioni
}

// Funzione per girare a destra sul posto di circa 90 gradi
// Motore A avanti, Motore B indietro (o viceversa per sinistra)
function giraDestra90(potenza, gradiMotore) {
    brick.showString("Gira Dx 90...", 4);
    brick.motorA.move(potenza, gradiMotore);
    brick.motorB.move(-potenza, gradiMotore); // Stessi gradi ma direzione opposta
    script.waitMotorStops('A');
    script.waitMotorStops('B');
    pause(200);
}

// Sequenza di parcheggio
brick.showString("Inizio Parcheggio", 2);
pause(500);

// 1. Avanza
brick.showString("Avanzo...", 5);
muoviDritto(potenzaMovimento, distanzaAvanzamentoGradi);

// 2. Gira di 90 gradi (es. a destra)
brick.showString("Giro...", 5);
giraDestra90(potenzaMovimento, gradiRotazione90);

// 3. Fai retromarcia per parcheggiare
brick.showString("Retromarcia...", 5);
muoviDritto(-potenzaMovimento, distanzaRetromarciaGradi); // Potenza negativa per retromarcia

brick.showString("Parcheggio Completato!", 7);
pause(1000);

brick.showString("Fine Esercizio 4", 9);

// Suggerimenti:
// 1. La calibrazione di `distanzaAvanzamentoGradi`, `gradiRotazione90`, e `distanzaRetromarciaGradi`
//    è cruciale. Misura le distanze e gli angoli reali ottenuti e aggiusta i valori.
// 2. `gradiRotazione90` è particolarmente sensibile alla distanza tra le ruote (passo del robot)
//    e al diametro delle ruote. Potrebbe richiedere diversi tentativi per essere preciso.
// 3. Considera di usare `brick.steer()` per le curve se preferisci, ma per una rotazione precisa
//    sul posto, controllare i motori individualmente con `move()` è spesso più accurato.
// 4. Per una maggiore precisione, potresti voler resettare i contatori dei motori
//    (`brick.motorX.resetCounts()`) prima di ogni movimento significativo, sebbene `move()`
//    generalmente operi in modo relativo alla posizione al momento della chiamata.