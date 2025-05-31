/**
 * Esercizio 2: Sensori e Logica Decisionale con Funzioni
 * 
 * Obiettivo: Creare un sistema di navigazione intelligente che utilizzi
 * i sensori del robot EV3 e funzioni con parametri e valori di ritorno.
 * 
 * Compiti:
 * 1. Implementare funzioni per leggere e interpretare i sensori
 * 2. Creare funzioni per prendere decisioni in base ai valori dei sensori
 * 3. Utilizzare i valori di ritorno per costruire un sistema di navigazione
 */

// ==========================================
// FUNZIONI PER I SENSORI
// ==========================================

/**
 * Legge il valore dal sensore a ultrasuoni e restituisce la distanza
 * @returns {number} Distanza in centimetri
 */
function leggiDistanza() {
    // TODO: Implementare questa funzione
    // - Leggere il valore dal sensore a ultrasuoni
    // - Restituire il valore della distanza
    
    // Codice di esempio:
    // return sensors.ultrasonic1.distance();
    
    // Per scopi di test, restituisce un valore casuale tra 0 e 100
    return Math.randomRange(0, 100);
}

/**
 * Legge il valore dal sensore di colore e restituisce il colore rilevato
 * @returns {number} Codice del colore rilevato
 */
function leggiColore() {
    // TODO: Implementare questa funzione
    // - Leggere il valore dal sensore di colore
    // - Restituire il codice del colore
    
    // Codice di esempio:
    // return sensors.color1.color();
    
    // Per scopi di test, restituisce un valore casuale tra 0 e 7
    return Math.randomRange(0, 7);
}

/**
 * Converte il codice del colore in una stringa descrittiva
 * @param {number} codiceColore - Il codice del colore da convertire
 * @returns {string} Nome del colore
 */
function nomeColore(codiceColore) {
    // TODO: Implementare questa funzione
    // - Convertire il codice numerico in una stringa che descriva il colore
    
    const colori = [
        "Nessuno", "Nero", "Blu", "Verde", 
        "Giallo", "Rosso", "Bianco", "Marrone"
    ];
    
    if (codiceColore >= 0 && codiceColore < colori.length) {
        return colori[codiceColore];
    } else {
        return "Sconosciuto";
    }
}

/**
 * Verifica se la distanza rilevata è inferiore a una soglia di sicurezza
 * @param {number} distanza - La distanza in centimetri
 * @param {number} soglia - La soglia di sicurezza in centimetri
 * @returns {boolean} true se la distanza è inferiore alla soglia
 */
function ostacoloRilevato(distanza, soglia) {
    // TODO: Implementare questa funzione
    // - Confrontare la distanza con la soglia
    // - Restituire true se la distanza è inferiore alla soglia, false altrimenti
    
    return distanza < soglia;
}

// ==========================================
// FUNZIONI PER LA NAVIGAZIONE
// ==========================================

/**
 * Determina la velocità ottimale in base alla distanza dall'ostacolo
 * @param {number} distanza - La distanza in centimetri
 * @returns {number} Velocità ottimale (0-100)
 */
function calcolaVelocita(distanza) {
    // TODO: Implementare questa funzione
    // - Calcolare la velocità ottimale in base alla distanza
    // - Restituire un valore nell'intervallo 0-100
    
    // Esempio di implementazione:
    if (distanza < 10) {
        return 0; // Fermarsi se troppo vicino
    } else if (distanza < 30) {
        return 30; // Velocità ridotta se vicino
    } else if (distanza < 50) {
        return 60; // Velocità media se a distanza moderata
    } else {
        return 90; // Velocità massima se lontano
    }
}

/**
 * Determina l'azione da intraprendere in base al colore rilevato
 * @param {number} codiceColore - Il codice del colore rilevato
 * @returns {string} Azione da intraprendere
 */
function decidiAzioneColore(codiceColore) {
    // TODO: Implementare questa funzione
    // - Decidere l'azione da intraprendere in base al colore rilevato
    // - Restituire una stringa che descrive l'azione
    
    switch (codiceColore) {
        case 1: // Nero
            return "fermarsi";
        case 2: // Blu
            return "girare a sinistra";
        case 3: // Verde
            return "aumentare velocità";
        case 4: // Giallo
            return "ridurre velocità";
        case 5: // Rosso
            return "girare a destra";
        case 6: // Bianco
            return "proseguire dritto";
        default:
            return "proseguire con cautela";
    }
}

/**
 * Esegue l'azione specificata
 * @param {string} azione - L'azione da eseguire
 * @param {number} velocitaBase - La velocità base
 * @returns {boolean} true se l'azione è stata eseguita con successo
 */
function eseguiAzione(azione, velocitaBase) {
    // TODO: Implementare questa funzione
    // - Eseguire l'azione specificata
    // - Utilizzare velocitaBase come parametro per i movimenti
    
    brick.showString("Azione: " + azione, 3);
    
    // Esempio di implementazione:
    switch (azione) {
        case "fermarsi":
            // TODO: Fermare i motori
            return true;
        case "girare a sinistra":
            // TODO: Girare a sinistra
            return true;
        case "girare a destra":
            // TODO: Girare a destra
            return true;
        case "aumentare velocità":
            // TODO: Aumentare la velocità
            return true;
        case "ridurre velocità":
            // TODO: Ridurre la velocità
            return true;
        case "proseguire dritto":
            // TODO: Proseguire dritto
            return true;
        case "proseguire con cautela":
            // TODO: Proseguire a velocità ridotta
            return true;
        default:
            return false;
    }
}

// ==========================================
// SISTEMA DI NAVIGAZIONE PRINCIPALE
// ==========================================

/**
 * Sistema di navigazione autonoma che utilizza sensori e funzioni
 * @param {number} durata - Durata dell'esecuzione in millisecondi
 * @param {number} sogliaOstacolo - Soglia per il rilevamento ostacoli
 */
function navigazioneAutonoma(durata, sogliaOstacolo) {
    brick.showString("Navigazione autonoma", 1);
    brick.showString("Durata: " + durata + "ms", 2);
    
    // Tempo di inizio
    const tempoInizio = control.millis();
    
    // Ciclo di navigazione
    while (control.millis() - tempoInizio < durata) {
        // TODO: Implementare questa funzione
        // 1. Leggere i valori dei sensori utilizzando le funzioni create
        const distanza = leggiDistanza();
        const codiceColore = leggiColore();
        
        // 2. Visualizzare le informazioni
        brick.showString("Dist: " + distanza + "cm", 3);
        brick.showString("Colore: " + nomeColore(codiceColore), 4);
        
        // 3. Prendere decisioni in base ai sensori
        // 3.1 Verificare se c'è un ostacolo
        if (ostacoloRilevato(distanza, sogliaOstacolo)) {
            brick.showString("OSTACOLO!", 5);
            // TODO: Implementare reazione all'ostacolo
            // Esempio: eseguiAzione("fermarsi", 0);
        }
        
        // 3.2 Calcolare la velocità in base alla distanza
        const velocita = calcolaVelocita(distanza);
        
        // 3.3 Decidere l'azione in base al colore
        const azione = decidiAzioneColore(codiceColore);
        
        // 3.4 Eseguire l'azione
        eseguiAzione(azione, velocita);
        
        // Breve pausa per non sovraccaricare il sistema
        pause(100);
    }
    
    // Fermare il robot alla fine
    brick.showString("Navigazione completata", 1);
    // TODO: Fermare i motori
}

// ==========================================
// FUNZIONE PRINCIPALE
// ==========================================

function main() {
    brick.showString("Es2: Funzioni e Sensori", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Esegui la navigazione autonoma per 30 secondi
    // con una soglia di sicurezza di 15 cm per gli ostacoli
    navigazioneAutonoma(30000, 15);
    
    // Conclusione
    brick.clearScreen();
    brick.showString("Esercizio completato!", 1);
}

// Avvia il programma principale
main();