// Esempio 08: Raccolta e Analisi Dati Sensori
// Descrizione: Come utilizzare array per raccogliere, analizzare e visualizzare
// dati provenienti dai sensori del robot EV3.

// Pulisci il display per iniziare
brick.clearScreen();
brick.showString("Raccolta Dati", 1);
brick.showString("dai Sensori", 2);
pause(2000);

// Definiamo la dimensione dell'array per i dati dei sensori
const DIMENSIONE_BUFFER = 10;

// Creiamo array vuoti per memorizzare le letture dei sensori
let lettureUltrasuoni = new Array(DIMENSIONE_BUFFER).fill(0);
let lettureColore = new Array(DIMENSIONE_BUFFER).fill(0);
let lettureTocco = new Array(DIMENSIONE_BUFFER).fill(false);

// Variabili per tenere traccia dell'indice corrente nel buffer circolare
let indiceLetturaCorrente = 0;

// Funzione per aggiungere una nuova lettura al buffer circolare
function aggiungiLettura(array, valore) {
    array[indiceLetturaCorrente] = valore;
}

// Funzione per calcolare la media delle letture numeriche
function calcolaMedia(array) {
    let somma = 0;
    for (let i = 0; i < array.length; i++) {
        somma += array[i];
    }
    return somma / array.length;
}

// Funzione per trovare il valore minimo
function trovaMinimoArray(array) {
    let minimo = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] < minimo) {
            minimo = array[i];
        }
    }
    return minimo;
}

// Funzione per trovare il valore massimo
function trovaMassimoArray(array) {
    let massimo = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] > massimo) {
            massimo = array[i];
        }
    }
    return massimo;
}

// Funzione per contare quanti elementi dell'array soddisfano una condizione
function contaSeVero(array) {
    let conteggio = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === true) {
            conteggio++;
        }
    }
    return conteggio;
}

// Funzione per raccogliere i dati dai sensori e aggiungerli agli array
function raccogliDatiSensori() {
    // Leggi i valori dai sensori
    // Nota: assicurati che i sensori siano collegati alle porte corrette
    let distanza = 0;
    let colore = 0;
    let tocco = false;
    
    // Se hai un sensore a ultrasuoni collegato alla porta 4
    if (sensors.ultrasonic4) {
        distanza = sensors.ultrasonic4.distance();
    } else {
        // Simuliamo una lettura se il sensore non è disponibile
        distanza = Math.floor(Math.random() * 100);
    }
    
    // Se hai un sensore di colore collegato alla porta 3
    if (sensors.color3) {
        colore = sensors.color3.light();
    } else {
        // Simuliamo una lettura di luce ambientale
        colore = Math.floor(Math.random() * 100);
    }
    
    // Se hai un sensore di tocco collegato alla porta 1
    if (sensors.touch1) {
        tocco = sensors.touch1.isPressed();
    } else {
        // Simuliamo una lettura casuale
        tocco = Math.random() > 0.8; // 20% di probabilità di essere premuto
    }
    
    // Aggiungi le letture ai rispettivi array
    aggiungiLettura(lettureUltrasuoni, distanza);
    aggiungiLettura(lettureColore, colore);
    aggiungiLettura(lettureTocco, tocco);
    
    // Aggiorna l'indice per la prossima lettura (buffer circolare)
    indiceLetturaCorrente = (indiceLetturaCorrente + 1) % DIMENSIONE_BUFFER;
}

// Funzione per visualizzare le statistiche sul display
function visualizzaStatistiche() {
    brick.clearScreen();
    brick.showString("Statistiche Sensori", 1);
    
    // Calcola e mostra statistiche per il sensore a ultrasuoni
    const mediaUltrasuoni = calcolaMedia(lettureUltrasuoni);
    const minUltrasuoni = trovaMinimoArray(lettureUltrasuoni);
    const maxUltrasuoni = trovaMassimoArray(lettureUltrasuoni);
    
    brick.showString("US: " + Math.round(mediaUltrasuoni) + "cm", 2);
    brick.showString("(min:" + minUltrasuoni + " max:" + maxUltrasuoni + ")", 3);
    
    // Calcola e mostra statistiche per il sensore di colore
    const mediaColore = calcolaMedia(lettureColore);
    brick.showString("Luce: " + Math.round(mediaColore) + "%", 4);
    
    // Calcola e mostra statistiche per il sensore di tocco
    const pressioni = contaSeVero(lettureTocco);
    const percentualePressioni = Math.round((pressioni / DIMENSIONE_BUFFER) * 100);
    brick.showString("Tocco: " + percentualePressioni + "% attivo", 5);
}

// Inizia la raccolta dati
brick.clearScreen();
brick.showString("Inizio raccolta", 1);
brick.showString("dati sensori...", 2);
pause(1000);

// Simula la raccolta dati per alcuni cicli
for (let ciclo = 0; ciclo < 30; ciclo++) {
    // Raccogli i dati dai sensori
    raccogliDatiSensori();
    
    // Ogni 5 letture, visualizza le statistiche
    if (ciclo % 5 === 0) {
        visualizzaStatistiche();
    }
    
    // Piccola pausa tra le letture
    pause(300);
}

// Alla fine, mostra l'ultima serie di statistiche
visualizzaStatistiche();
pause(1000);

// Visualizza tutto l'array delle letture ultrasuoni
brick.clearScreen();
brick.showString("Letture Ultrasuoni:", 1);
let rigaDisplay = 2;

for (let i = 0; i < lettureUltrasuoni.length; i += 2) {
    // Mostriamo due valori per riga per risparmiare spazio
    if (i + 1 < lettureUltrasuoni.length) {
        brick.showString(i + ":" + lettureUltrasuoni[i] + " " + 
                        (i+1) + ":" + lettureUltrasuoni[i+1], rigaDisplay);
    } else {
        brick.showString(i + ":" + lettureUltrasuoni[i], rigaDisplay);
    }
    rigaDisplay++;
}

pause(3000);

// Conclusione demo
brick.clearScreen();
brick.showString("Array per raccolta", 1);
brick.showString("dati sensori", 2);
brick.showString("completato!", 3);
music.playSoundEffect(SoundEffect.Success);
pause(2000);
brick.clearScreen();
