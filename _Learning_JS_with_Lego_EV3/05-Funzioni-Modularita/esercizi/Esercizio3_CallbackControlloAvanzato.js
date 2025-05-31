/**
 * Esercizio 3: Funzioni di Callback e Controllo Avanzato
 * 
 * Obiettivo: Utilizzare le funzioni di callback per implementare un sistema
 * di controllo avanzato per il robot EV3, che reagisca a eventi in tempo reale.
 * 
 * Compiti:
 * 1. Implementare un sistema di controllo basato su callback
 * 2. Creare funzioni di reazione a eventi specifici
 * 3. Utilizzare le funzioni di callback per un percorso automatico intelligente
 */

// ==========================================
// SISTEMA DI CONTROLLO BASATO SU EVENTI
// ==========================================

/**
 * Crea e configura un sistema di controllo per il robot
 * @returns {Object} Un oggetto controller con metodi per gestire le callback
 */
function creaSistemaControllo() {
    // Oggetto che rappresenta il sistema di controllo
    let sistema = {
        // Callback per vari eventi
        callbackOstacolo: null,
        callbackLineaRilevata: null,
        callbackBatteriaBassa: null,
        callbackTimer: null,
        
        // Parametri di configurazione
        sogliaDistanzaOstacolo: 15,
        sogliaLineaRilevata: 50,
        sogliaBatteriaBassa: 20,
        
        // Stato del sistema
        attivo: false,
        
        /**
         * Imposta una callback per gestire gli ostacoli
         * @param {Function} callback - La funzione da chiamare quando viene rilevato un ostacolo
         * @param {number} soglia - Soglia di distanza per considerare un ostacolo
         */
        quandoOstacoloRilevato: function(callback, soglia) {
            // TODO: Implementare questa funzione
            // - Memorizzare la callback e la soglia
        },
        
        /**
         * Imposta una callback per gestire il rilevamento di una linea
         * @param {Function} callback - La funzione da chiamare quando viene rilevata una linea
         * @param {number} soglia - Soglia di luminosità per considerare una linea rilevata
         */
        quandoLineaRilevata: function(callback, soglia) {
            // TODO: Implementare questa funzione
            // - Memorizzare la callback e la soglia
        },
        
        /**
         * Imposta una callback per gestire il livello di batteria basso
         * @param {Function} callback - La funzione da chiamare quando la batteria è bassa
         * @param {number} soglia - Soglia percentuale per considerare la batteria bassa
         */
        quandoBatteriaBassa: function(callback, soglia) {
            // TODO: Implementare questa funzione
            // - Memorizzare la callback e la soglia
        },
        
        /**
         * Imposta una callback da chiamare periodicamente
         * @param {Function} callback - La funzione da chiamare periodicamente
         * @param {number} intervallo - Intervallo in ms tra le chiamate
         */
        adIntervalli: function(callback, intervallo) {
            // TODO: Implementare questa funzione
            // - Memorizzare la callback e l'intervallo
            // - Utilizzare un contatore per simulare gli intervalli
        },
        
        /**
         * Avvia il sistema di controllo
         * @param {number} durata - Durata massima di esecuzione in ms
         */
        avvia: function(durata) {
            this.attivo = true;
            brick.showString("Sistema controllo attivo", 1);
            
            const tempoInizio = control.millis();
            let ultimoTimer = tempoInizio;
            let contatoreCicli = 0;
            
            // Loop principale del sistema di controllo
            while (this.attivo && (control.millis() - tempoInizio < durata)) {
                contatoreCicli++;
                
                // TODO: Implementare la logica del sistema di controllo
                // 1. Leggere i valori dai sensori
                // 2. Controllare se si verificano le condizioni per chiamare le callback
                // 3. Chiamare le callback appropriate quando necessario
                // 4. Gestire la callback di timer
                
                // Esempio:
                // - Leggere la distanza e verificare se è sotto la soglia degli ostacoli
                // - Se sì, chiamare la callback degli ostacoli
                // - Fare lo stesso per la linea e la batteria
                
                pause(50); // Breve pausa per non sovraccaricare il sistema
            }
            
            this.attivo = false;
            brick.showString("Sistema controllo fermato", 1);
            brick.showValue("Cicli eseguiti", contatoreCicli, 2);
        },
        
        /**
         * Ferma il sistema di controllo
         */
        ferma: function() {
            this.attivo = false;
        }
    };
    
    return sistema;
}

// ==========================================
// FUNZIONI DI REAZIONE AGLI EVENTI
// ==========================================

/**
 * Funzione di callback per gestire un ostacolo
 * @param {number} distanza - La distanza dall'ostacolo
 */
function gestioneOstacolo(distanza) {
    // TODO: Implementare questa funzione
    // - Fermare il robot
    // - Mostrare un messaggio sul display
    // - Avvisare con un segnale sonoro
    // - Eseguire una manovra di evasione (ad esempio, girare a destra)
}

/**
 * Funzione di callback per gestire una linea rilevata
 * @param {number} luminosita - Il valore di luminosità rilevato
 */
function gestioneLinea(luminosita) {
    // TODO: Implementare questa funzione
    // - Adattare la velocità o la direzione del robot
    // - Mostrare un messaggio sul display
    // - Eventualmente emettere un suono
}

/**
 * Funzione di callback per gestire la batteria bassa
 * @param {number} livello - Il livello di batteria percentuale
 */
function gestioneBatteriaBassa(livello) {
    // TODO: Implementare questa funzione
    // - Mostrare un avviso sul display
    // - Emettere un allarme sonoro
    // - Eventualmente avviare una procedura di ritorno alla base
}

/**
 * Funzione di callback per eseguire azioni a intervalli regolari
 * @param {number} contatore - Il numero di volte che la callback è stata chiamata
 */
function azioniPeriodiche(contatore) {
    // TODO: Implementare questa funzione
    // - Eseguire azioni periodiche come:
    //   - Mostrare informazioni sullo stato
    //   - Aggiornare contatori
    //   - Modificare parametri di movimento
    //   - Alternare direzioni o comportamenti
}

// ==========================================
// PERCORSO AUTOMATICO INTELLIGENTE
// ==========================================

/**
 * Implementa un percorso automatico intelligente utilizzando il sistema di controllo
 * @param {number} durata - Durata massima del percorso in ms
 */
function percorsoAutomatico(durata) {
    brick.showString("Percorso automatico", 1);
    brick.showValue("Durata max", durata, 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Crea e configura il sistema di controllo
    let controller = creaSistemaControllo();
    
    // TODO: Configurare le callback per il percorso automatico
    // - Utilizzare le funzioni quandoOstacoloRilevato, quandoLineaRilevata, ecc.
    // - Impostare le soglie appropriate
    
    // Esempio:
    // controller.quandoOstacoloRilevato(gestioneOstacolo, 15);
    
    // Imposta il movimento iniziale
    motors.largeAB.steer(0, 40); // Avvia il robot dritto a velocità media
    
    // Avvia il sistema di controllo
    controller.avvia(durata);
    
    // Ferma i motori alla fine
    motors.largeAB.stop();
    brick.showString("Percorso completato", 1);
}

// ==========================================
// FUNZIONE PRINCIPALE
// ==========================================

function main() {
    brick.showString("Esercizio: Callback", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Eseguire il percorso automatico per 30 secondi
    percorsoAutomatico(30000);
    
    // Conclusione
    brick.clearScreen();
    brick.showString("Esercizio completato!", 1);
}

// Avvia il programma principale
main();