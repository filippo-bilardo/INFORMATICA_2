# Guida 6: Navigazione e Mappatura di Base con EV3

## Introduzione

La navigazione è una capacità fondamentale per qualsiasi robot mobile. Permette al robot di muoversi in modo autonomo o semi-autonomo da un punto all'altro nel suo ambiente. La mappatura è il processo di costruzione di una rappresentazione dell'ambiente, che può poi essere utilizzata per la navigazione.

Questa guida introduce i concetti di base della navigazione e della mappatura per robot EV3, concentrandosi su tecniche semplici che possono essere implementate con MakeCode/JavaScript e i sensori standard dell'EV3.

## Concetti Chiave della Navigazione Robotica

1.  **Localizzazione (Localization)**: Determinare la posizione e l'orientamento attuali del robot nell'ambiente. "Dove sono?"
2.  **Pianificazione del Percorso (Path Planning)**: Trovare un percorso da una posizione di partenza a una di destinazione, evitando ostacoli.
3.  **Seguimento del Percorso (Path Following)**: Controllare i motori del robot per seguire il percorso pianificato.
4.  **Evitamento Ostacoli (Obstacle Avoidance)**: Rilevare e reagire agli ostacoli imprevisti lungo il percorso.

## Tecniche di Navigazione Semplici per EV3

### 1. Odometria (Dead Reckoning)

L'odometria è il processo di stima della posizione del robot basandosi sul movimento delle sue ruote. I motori EV3 hanno encoder di rotazione integrati che misurano quanto ogni motore ha girato.

*   **Come Funziona**: Misurando la rotazione delle ruote, e conoscendo il diametro delle ruote e la distanza tra di esse (interasse), si può calcolare lo spostamento e la rotazione del robot.
*   **Implementazione in MakeCode**:
    *   `motors.largeA.angle()` restituisce l'angolo totale di rotazione del motore dalla sua ultima reimpostazione (in gradi).
    *   `motors.resetAll()` o `motors.largeA.reset()` reimposta il conteggio dell'angolo.

```javascript
// Assumiamo un robot a due ruote motrici (B e C)
const DIAMETRO_RUOTA_CM = 5.6; // Esempio, misura le tue ruote!
const CIRCONFERENZA_RUOTA_CM = Math.PI * DIAMETRO_RUOTA_CM;
const INTERASSE_CM = 12.0; // Distanza tra i centri delle due ruote motrici

let xPosCm = 0; // Posizione X del robot
let yPosCm = 0; // Posizione Y del robot
let angoloRobotGradi = 0; // Orientamento del robot (0 = asse X positivo)

let angoloPrecedenteB = 0;
let angoloPrecedenteC = 0;

function aggiornaOdometria() {
    let angoloAttualeB = motors.largeB.angle();
    let angoloAttualeC = motors.largeC.angle();

    let deltaAngoloB = angoloAttualeB - angoloPrecedenteB;
    let deltaAngoloC = angoloAttualeC - angoloPrecedenteC;

    angoloPrecedenteB = angoloAttualeB;
    angoloPrecedenteC = angoloAttualeC;

    let distanzaPercorsaB = (deltaAngoloB / 360) * CIRCONFERENZA_RUOTA_CM;
    let distanzaPercorsaC = (deltaAngoloC / 360) * CIRCONFERENZA_RUOTA_CM;

    let distanzaMedia = (distanzaPercorsaB + distanzaPercorsaC) / 2;

    // Calcolo cambiamento di orientamento (in radianti per Math.atan2)
    let deltaAngoloRobotRad = (distanzaPercorsaC - distanzaPercorsaB) / INTERASSE_CM;
    let deltaAngoloRobotGradi = deltaAngoloRobotRad * (180 / Math.PI);

    angoloRobotGradi = (angoloRobotGradi + deltaAngoloRobotGradi) % 360;
    if (angoloRobotGradi < 0) angoloRobotGradi += 360;

    // Calcolo cambiamento di posizione
    // Converti l'angolo del robot in radianti per le funzioni trigonometriche
    let angoloRobotRad = angoloRobotGradi * (Math.PI / 180);
    xPosCm += distanzaMedia * Math.cos(angoloRobotRad);
    yPosCm += distanzaMedia * Math.sin(angoloRobotRad);

    // Mostra i dati (opzionale)
    // brick.showString(`X:${xPosCm.toFixed(1)} Y:${yPosCm.toFixed(1)} A:${angoloRobotGradi.toFixed(0)}`, 1);
}

// Inizializzazione
motors.largeB.reset();
motors.largeC.reset();

// Esempio di utilizzo in un loop
/*
loops.forever(function() {
    // ... comanda i motori ...
    motors.largeBC.run(50);
    pause(100);
    aggiornaOdometria();
    brick.showString(`X:${xPosCm.toFixed(1)} Y:${yPosCm.toFixed(1)} A:${angoloRobotGradi.toFixed(0)}deg`, 1);
});
*/
```

*   **Limiti dell'Odometria**:
    *   **Errori Cumulativi**: Piccoli errori dovuti a slittamento delle ruote, imperfezioni del terreno, o imprecisioni nelle misurazioni si accumulano nel tempo, portando a una stima della posizione sempre meno accurata ("drift").
    *   Non tiene conto di ostacoli o dell'ambiente esterno.

### 2. Navigazione Basata su Landmark (Punti di Riferimento)

Utilizza sensori per rilevare caratteristiche note dell'ambiente (landmark) per correggere la stima della posizione o per guidare il movimento.

*   **Esempi di Landmark**: Linee sul pavimento (per sensore di colore), muri (per sensore a ultrasuoni o di tocco), oggetti specifici.
*   **Tecnica Semplice: Seguire una Linea**: Il robot usa un sensore di colore per seguire una linea nera su sfondo bianco (o viceversa). Questo è un tipo di navigazione reattiva.

    ```javascript
    // Esempio di base per seguire il bordo destro di una linea nera
    // (Vedi Modulo 7 per dettagli sui sensori)
    const SOGLIA_LUCE = 40; // Valore da calibrare
    const VELOCITA_BASE = 30;
    const FATTORE_CORREZIONE = 1.5;

    // loops.forever(function() {
    //     let luceRiflessa = sensors.color1.light(LightIntensityMode.Reflected);
    //     let errore = luceRiflessa - SOGLIA_LUCE;

    //     // Controllo Proporzionale (P-controller)
    //     let correzione = errore * FATTORE_CORREZIONE;

    //     motors.largeB.run(VELOCITA_BASE + correzione);
    //     motors.largeC.run(VELOCITA_BASE - correzione);
    //     pause(10);
    // });
    ```

### 3. Evitamento Ostacoli Reattivo

Il robot utilizza sensori (es. ultrasuoni, tocco) per rilevare ostacoli e reagire immediatamente per evitarli, senza una pianificazione complessa.

```javascript
// Esempio semplice: vai avanti finché non trovi un ostacolo, poi gira
// (Spesso implementato con una FSM - vedi Guida 2)

// const DISTANZA_SICUREZZA_CM = 20;
// let statoRobot = "AVANTI"; // Semplificazione, meglio una FSM

// loops.forever(function() {
//     if (statoRobot === "AVANTI") {
//         motors.largeBC.run(50);
//         if (sensors.ultrasonic1.distance() < DISTANZA_SICUREZZA_CM) {
//             statoRobot = "GIRA";
//             motors.largeBC.stop();
//             motors.largeB.run(40, 360, MoveUnit.Degrees); // Gira a destra
//             motors.largeC.run(-40, 360, MoveUnit.Degrees);
//         }
//     } else if (statoRobot === "GIRA") {
//         if (!motors.largeB.isRunning()) { // Attendi fine rotazione
//             statoRobot = "AVANTI";
//         }
//     }
//     pause(20);
// });
```

## Mappatura di Base

La creazione di mappe dettagliate (come in SLAM - Simultaneous Localization and Mapping) è complessa e generalmente oltre le capacità di MakeCode standard e dell'hardware EV3 senza elaborazione esterna. Tuttavia, si possono implementare forme di mappatura molto semplici.

### 1. Mappa a Griglia Occupazionale (Occupancy Grid Map)

L'ambiente viene diviso in una griglia di celle. Ogni cella può essere marcata come:
*   **Libera**: Il robot sa che può attraversarla.
*   **Occupata**: Il robot sa che c'è un ostacolo.
*   **Sconosciuta**: Il robot non ha ancora informazioni.

*   **Implementazione Semplificata**:
    *   Usa un array 2D per rappresentare la griglia.
    *   Usa l'odometria per stimare la posizione del robot (e quindi la cella corrente).
    *   Usa il sensore a ultrasuoni per rilevare ostacoli davanti al robot. Se un ostacolo è rilevato a una certa distanza, marca la cella corrispondente nella mappa come "occupata".

```javascript
const DIM_GRIGLIA_X = 10; // 10 celle in larghezza
const DIM_GRIGLIA_Y = 10; // 10 celle in altezza
const DIM_CELLA_CM = 20;  // Ogni cella è 20x20 cm

// 0 = Sconosciuta, 1 = Libera, 2 = Occupata
let mappa: number[][] = [];
for (let i = 0; i < DIM_GRIGLIA_Y; i++) {
    mappa[i] = [];
    for (let j = 0; j < DIM_GRIGLIA_X; j++) {
        mappa[i][j] = 0; // Inizializza come sconosciuta
    }
}

// Funzione per aggiornare la mappa (chiamata periodicamente)
function aggiornaMappaConSensore() {
    // Usa xPosCm, yPosCm, angoloRobotGradi dall'odometria
    let cellaRobotX = Math.floor(xPosCm / DIM_CELLA_CM);
    let cellaRobotY = Math.floor(yPosCm / DIM_CELLA_CM);

    // Marca la cella corrente del robot come libera (se valida)
    if (cellaRobotY >= 0 && cellaRobotY < DIM_GRIGLIA_Y && cellaRobotX >= 0 && cellaRobotX < DIM_GRIGLIA_X) {
        mappa[cellaRobotY][cellaRobotX] = 1; 
    }

    let distanzaOstacolo = sensors.ultrasonic1.distance();
    if (distanzaOstacolo < 100) { // Considera ostacoli entro 1 metro
        // Calcola la posizione dell'ostacolo rispetto al robot
        let angoloRobotRad = angoloRobotGradi * (Math.PI / 180);
        let xOstacoloRel = distanzaOstacolo * Math.cos(angoloRobotRad);
        let yOstacoloRel = distanzaOstacolo * Math.sin(angoloRobotRad);

        // Posizione assoluta dell'ostacolo
        let xOstacoloAbs = xPosCm + xOstacoloRel;
        let yOstacoloAbs = yPosCm + yOstacoloRel;

        let cellaOstacoloX = Math.floor(xOstacoloAbs / DIM_CELLA_CM);
        let cellaOstacoloY = Math.floor(yOstacoloAbs / DIM_CELLA_CM);

        if (cellaOstacoloY >= 0 && cellaOstacoloY < DIM_GRIGLIA_Y && 
            cellaOstacoloX >= 0 && cellaOstacoloX < DIM_GRIGLIA_X) {
            mappa[cellaOstacoloY][cellaOstacoloX] = 2; // Occupata
            // brick.showString(`Ostacolo in [${cellaOstacoloY}][${cellaOstacoloX}]`, 5);
        }
    }
}

// Per visualizzare la mappa (molto semplificato, solo su console o display EV3 riga per riga)
function visualizzaMappa() {
    for (let i = 0; i < DIM_GRIGLIA_Y; i++) {
        let riga = "";
        for (let j = 0; j < DIM_GRIGLIA_X; j++) {
            riga += mappa[i][j] + " ";
        }
        // console.log(riga); // Su console se disponibile
        // brick.showString(riga, i + 1); // Su display EV3, una riga alla volta
    }
}

// Esempio di loop principale per esplorazione e mappatura
/*
motors.largeB.reset();
motors.largeC.reset();

loops.forever(function() {
    // Logica di esplorazione (es. muoviti casualmente o in pattern)
    // Per ora, solo avanti con evitamento base
    if (sensors.ultrasonic1.distance() < 25) {
        motors.largeBC.stop();
        motors.largeB.run(-30, 180, MoveUnit.Degrees);
        motors.largeC.run(30, 180, MoveUnit.Degrees);
        pause(500); // Attendi fine rotazione
    } else {
        motors.largeBC.run(30);
    }

    aggiornaOdometria();
    aggiornaMappaConSensore();
    
    // Visualizza la mappa ogni tanto (costoso per il display)
    if (control.millis() % 5000 < 100) { 
        // visualizzaMappa(); // Scommenta per vedere la mappa sul display
        brick.showString(`X:${xPosCm.toFixed(0)} Y:${yPosCm.toFixed(0)} A:${angoloRobotGradi.toFixed(0)}`, 8);
    }
    pause(100);
});
*/
```
*Nota: L'esempio di mappatura è concettuale e richiede molta calibrazione e una logica di esplorazione più sofisticata per essere utile. La visualizzazione su EV3 è limitata.*

## Sfide e Limitazioni

*   **Precisione dei Sensori**: I sensori EV3 hanno limitazioni in termini di precisione e range.
*   **Potenza di Calcolo**: L'EV3 ha una potenza di calcolo limitata per algoritmi complessi di navigazione e mappatura in tempo reale.
*   **Errori dell'Odometria**: Come menzionato, l'odometria da sola non è affidabile a lungo termine.
*   **Ambienti Dinamici**: Queste tecniche di base faticano in ambienti che cambiano (oggetti che si muovono).

## Conclusione

La navigazione e la mappatura sono argomenti vasti e complessi nella robotica. Con l'EV3 e MakeCode, possiamo esplorare i principi fondamentali attraverso tecniche come l'odometria, il seguimento di linee, l'evitamento ostacoli reattivo e forme molto basilari di mappatura a griglia. Questi esercizi forniscono una base per comprendere le sfide coinvolte e possono essere un punto di partenza per esplorare algoritmi più avanzati su piattaforme più potenti.

L'accuratezza richiederà sempre un'attenta calibrazione dei parametri del robot (diametro ruote, interasse) e dei sensori.

---

[Torna all'elenco delle Guide](./README.md)

[Torna al Modulo 10](../README.md)

[Torna alla Home del Corso](../../README.md)