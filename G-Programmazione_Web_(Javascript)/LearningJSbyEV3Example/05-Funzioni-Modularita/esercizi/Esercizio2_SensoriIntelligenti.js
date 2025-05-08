/**
 * Esercizio 2: Sensori Intelligenti con Parametri e Valori di Ritorno
 * 
 * Obiettivo: Creare un sistema che utilizzi i sensori dell'EV3 e funzioni con parametri
 * e valori di ritorno per prendere decisioni intelligenti sul movimento del robot.
 * 
 * Compiti:
 * 1. Implementare le funzioni di lettura sensori che restituiscono valori elaborati
 * 2. Implementare le funzioni di analisi che prendono decisioni in base ai parametri
 * 3. Creare una funzione di navigazione intelligente che utilizza tutte le precedenti
 */

// ==========================================
// FUNZIONI DI LETTURA SENSORI
// ==========================================

/**
 * Legge il sensore di distanza e restituisce un valore elaborato
 * @param {number} numeroLetture - Quante letture effettuare per la media
 * @param {number} intervallo - Intervallo in ms tra le letture
 * @returns {Object} Oggetto con distanza media e classificazione
 */
function leggiDistanzaMedia(numeroLetture, intervallo) {
    // TODO: Implementare questa funzione
    // - Effettuare più letture dal sensore a ultrasuoni (sensors.ultrasonic4.distance())
    // - Calcolare la media delle letture
    // - Classificare la distanza (vicino/medio/lontano)
    // - Restituire un oggetto con i risultati
    
    // Esempio di struttura dell'oggetto da restituire:
    // return {
    //     valore: mediaDistanza,
    //     classificazione: "vicino" / "medio" / "lontano",
    //     letture: array delle letture effettuate
    // };
}

/**
 * Legge il sensore di colore e restituisce informazioni elaborate
 * @returns {Object} Oggetto con colore rilevato e luminosità
 */
function leggiColoreElaborato() {
    // TODO: Implementare questa funzione
    // - Leggere il colore dal sensore (sensors.color1.color())
    // - Leggere la luminosità (sensors.color1.light())
    // - Restituire un oggetto con i risultati e una descrizione testuale
    
    // Esempio di struttura dell'oggetto da restituire:
    // return {
    //     colore: valore del colore,
    //     luminosita: valore della luminosità,
    //     descrizione: descrizione testuale del colore
    // };
}

// ==========================================
// FUNZIONI DI ANALISI E DECISIONE
// ==========================================

/**
 * Determina la velocità ottimale in base alla distanza
 * @param {Object} infoDistanza - Oggetto con le informazioni sulla distanza
 * @param {number} velocitaMax - Velocità massima consentita
 * @returns {number} La velocità calcolata in base alla situazione
 */
function calcolaVelocitaOttimale(infoDistanza, velocitaMax) {
    // TODO: Implementare questa funzione
    // - Analizzare le informazioni sulla distanza
    // - Calcolare la velocità appropriata (più lento quando vicino, più veloce quando lontano)
    // - Non superare la velocità massima specificata
    // - Restituire la velocità calcolata
}

/**
 * Decide se e come evitare un ostacolo in base alle informazioni dei sensori
 * @param {Object} infoDistanza - Oggetto con le informazioni sulla distanza
 * @param {Object} infoColore - Oggetto con le informazioni sul colore
 * @returns {Object} Strategia di evasione ostacoli
 */
function decidiStrategiaEvasione(infoDistanza, infoColore) {
    // TODO: Implementare questa funzione
    // - Analizzare le informazioni di distanza e colore
    // - Decidere se è necessario evitare un ostacolo
    // - Determinare la strategia migliore (fermarsi, girare a destra/sinistra, tornare indietro, ecc.)
    
    // Esempio di struttura dell'oggetto da restituire:
    // return {
    //     necessaria: true/false,
    //     azione: "fermarsi" / "giraDestra" / "giraSinistra" / "indietro",
    //     motivazione: spiegazione testuale della decisione
    // };
}

// ==========================================
// FUNZIONE DI NAVIGAZIONE INTELLIGENTE
// ==========================================

/**
 * Sistema di navigazione intelligente che utilizza le funzioni precedenti
 * @param {number} durataMassima - Durata massima dell'esecuzione in ms
 * @param {number} velocitaDefault - Velocità di default
 */
function navigazioneIntelligente(durataMassima, velocitaDefault) {
    brick.showString("Navigazione intelligente", 1);
    brick.showValue("Durata max", durataMassima, 2);
    
    let tempoInizio = control.millis();
    let contatoreIterazioni = 0;
    
    // Loop di navigazione
    while (control.millis() - tempoInizio < durataMassima) {
        contatoreIterazioni++;
        brick.showValue("Iterazione", contatoreIterazioni, 3);
        
        // TODO: Implementare la logica di navigazione intelligente
        // 1. Leggi informazioni dai sensori usando le funzioni implementate
        // 2. Calcola la velocità ottimale
        // 3. Determina se è necessario evitare ostacoli
        // 4. Esegui l'azione appropriata
        // 5. Visualizza informazioni utili sul display dell'EV3
        
        // Nota: inserire una piccola pausa tra le iterazioni
        pause(100);
    }
    
    // Alla fine ferma il robot
    motors.largeAB.stop();
    brick.showString("Navigazione completata", 1);
    brick.showValue("Iterazioni totali", contatoreIterazioni, 2);
}

// ==========================================
// FUNZIONE PRINCIPALE
// ==========================================

function main() {
    brick.showString("Esercizio: Sensori intelligenti", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Test funzioni di lettura sensori
    brick.showString("Test lettura sensori", 1);
    let infoDistanza = leggiDistanzaMedia(5, 100);
    brick.showValue("Distanza media", infoDistanza.valore, 2);
    brick.showString(`Class: ${infoDistanza.classificazione}`, 3);
    
    let infoColore = leggiColoreElaborato();
    brick.showValue("Colore", infoColore.colore, 4);
    brick.showValue("Luminosità", infoColore.luminosita, 5);
    brick.showString(`Desc: ${infoColore.descrizione}`, 6);
    
    pause(3000);
    brick.clearScreen();
    
    // Test funzioni di analisi
    brick.showString("Test analisi", 1);
    let velocitaOttimale = calcolaVelocitaOttimale(infoDistanza, 75);
    brick.showValue("Velocità ottimale", velocitaOttimale, 2);
    
    let strategia = decidiStrategiaEvasione(infoDistanza, infoColore);
    brick.showString(`Evitare: ${strategia.necessaria}`, 3);
    brick.showString(`Azione: ${strategia.azione}`, 4);
    brick.showString(`Motivo: ${strategia.motivazione}`, 5);
    
    pause(3000);
    brick.clearScreen();
    
    // Avvia la navigazione intelligente
    brick.showString("Avvio navigazione", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // 20 secondi di navigazione a velocità 50
    navigazioneIntelligente(20000, 50);
    
    // Conclusione
    brick.clearScreen();
    brick.showString("Esercizio completato!", 1);
}

// Avvia il programma principale
main();