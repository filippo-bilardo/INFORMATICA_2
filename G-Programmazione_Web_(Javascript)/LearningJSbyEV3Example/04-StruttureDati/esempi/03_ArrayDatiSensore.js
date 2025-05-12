// Esempio 03: Registrazione Dati da Sensori in un Array
// Descrizione: Come raccogliere letture multiple da un sensore (es. sensore di colore o ultrasuoni)
// e memorizzarle in un array per analisi successive.

// Nota: Questo codice è concettuale e necessita delle API specifiche del tuo ambiente EV3.
// Le funzioni come `sensors.ultrasonic1.distance()`, `control.pause()` sono illustrative.

console.log("Avvio Esempio 03: Registrazione Dati da Sensori in un Array");

// Array per memorizzare le letture del sensore
let lettureDistanza = [];
const numeroLettureDaEffettuare = 10;
const intervalloLetturaMs = 500; // Leggi ogni 0.5 secondi

// Simulazione di una funzione per leggere il sensore a ultrasuoni
// In un ambiente EV3 reale, useresti l'API fornita.
function leggiSensoreUltrasuoni() {
    // Valore simulato tra 5 e 250 cm
    const distanzaSimulata = Math.floor(Math.random() * (250 - 5 + 1)) + 5;
    // Esempio API EV3 (da adattare):
    // return sensors.ultrasonic1.distance();
    return distanzaSimulata;
}

console.log(`Inizio raccolta di ${numeroLettureDaEffettuare} letture dal sensore a ultrasuoni...`);

for (let i = 0; i < numeroLettureDaEffettuare; i++) {
    // Leggi il valore dal sensore
    const distanzaCorrente = leggiSensoreUltrasuoni();

    // Aggiungi la lettura all'array
    lettureDistanza.push(distanzaCorrente);

    console.log(`Lettura ${i + 1}: ${distanzaCorrente} cm`);

    // Attendi prima della prossima lettura (se non è l'ultima)
    if (i < numeroLettureDaEffettuare - 1) {
        // control.pause(intervalloLetturaMs); // Funzione di pausa dell'EV3
        // Simulazione della pausa per questo script Node.js (non blocca come control.pause)
        // Per una vera pausa bloccante in Node.js puro, servirebbero approcci diversi
        // o l'uso di librerie sincrone, ma per l'EV3 `control.pause` è tipico.
        let start = new Date().getTime();
        while (new Date().getTime() < start + intervalloLetturaMs) {
            // Pausa attiva (non ideale per Node.js generico, ma simula il blocco)
        }
    }
}

console.log("\nRaccolta dati completata.");
console.log("Letture memorizzate:", lettureDistanza);

// Ora possiamo analizzare i dati raccolti
// Esempio: Calcolare la distanza media
if (lettureDistanza.length > 0) {
    let sommaDistanze = 0;
    for (const distanza of lettureDistanza) {
        sommaDistanze += distanza;
    }
    const mediaDistanze = sommaDistanze / lettureDistanza.length;
    console.log(`\nDistanza media rilevata: ${mediaDistanze.toFixed(2)} cm`);

    // Esempio: Trovare la distanza minima e massima
    let distanzaMinima = lettureDistanza[0];
    let distanzaMassima = lettureDistanza[0];
    for (let i = 1; i < lettureDistanza.length; i++) {
        if (lettureDistanza[i] < distanzaMinima) {
            distanzaMinima = lettureDistanza[i];
        }
        if (lettureDistanza[i] > distanzaMassima) {
            distanzaMassima = lettureDistanza[i];
        }
    }
    // Alternativa con Math.min e Math.max (più concisa)
    // const distanzaMinimaAlt = Math.min(...lettureDistanza);
    // const distanzaMassimaAlt = Math.max(...lettureDistanza);

    console.log(`Distanza minima rilevata: ${distanzaMinima} cm`);
    console.log(`Distanza massima rilevata: ${distanzaMassima} cm`);

    // Esempio: Contare quante volte è stata rilevata una distanza inferiore a una soglia
    const sogliaVicinanza = 50; // cm
    let conteggioVicino = 0;
    for (const distanza of lettureDistanza) {
        if (distanza < sogliaVicinanza) {
            conteggioVicino++;
        }
    }
    console.log(`Numero di rilevamenti sotto ${sogliaVicinanza} cm: ${conteggioVicino}`);
} else {
    console.log("Nessuna lettura da analizzare.");
}

console.log("\nEsempio 03 Terminato.");

// Per eseguire questo script in un ambiente Node.js:
// 1. Salva il file come 03_ArrayDatiSensore.js
// 2. Apri il terminale e naviga nella cartella dove hai salvato il file
// 3. Esegui: node 03_ArrayDatiSensore.js

// Su EV3, le funzioni `leggiSensoreUltrasuoni()` e `control.pause()` 
// andrebbero sostituite con le chiamate API appropriate del tuo ambiente.
// Ad esempio, con ev3dev-lang:
// const ev3 = require('ev3dev-lang');
// const ultrasonicSensor = new ev3.UltrasonicSensor('in4'); // o la porta corretta
// const motor = new ev3.Motor('outA'); // per eventuali pause basate su motore
// ultrasonicSensor.mode = 'US-DIST-CM'; // Assicurati che la modalità sia corretta
// function leggiSensoreUltrasuoniReale() { return ultrasonicSensor.getValue(0); }