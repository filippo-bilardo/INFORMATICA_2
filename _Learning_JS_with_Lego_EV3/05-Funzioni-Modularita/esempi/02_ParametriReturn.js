/**
 * File: 02_ParametriReturn.js
 * Descrizione: Esempi di utilizzo di parametri e valori di ritorno nelle funzioni JavaScript per EV3
 * Corso: Learning JavaScript by Lego EV3 Example
 */

// ==========================================
// ESEMPIO 1: Funzioni con parametri
// ==========================================

// Funzione che accetta parametri per personalizzare il movimento
function muoviAvanti(velocita, durata) {
    brick.showString("Movimento in avanti", 1);
    brick.showValue("Velocità", velocita, 2);
    brick.showValue("Durata", durata, 3);
    
    motors.largeAB.steer(0, velocita);
    pause(durata);
    motors.largeAB.stop();
    pause(500);
}

// Funzione che accetta parametri per personalizzare la rotazione
function gira(direzione, gradi) {
    let direzioneStr = direzione > 0 ? "destra" : "sinistra";
    brick.showString(`Girando a ${direzioneStr}`, 1);
    brick.showValue("Gradi", gradi, 2);
    
    // Converti i gradi in rotazioni (approssimativo, dipende dalla configurazione del robot)
    let rotazioni = gradi / 90;
    motors.largeC.run(direzione * 30, rotazioni, MoveUnit.Rotations);
    pause(500);
}

// ==========================================
// ESEMPIO 2: Parametri di default
// ==========================================

// Funzione con parametri di default
function muoviAvantiDefault(velocita = 50, durata = 2000) {
    brick.showString("Movimento con default", 1);
    brick.showValue("Velocità", velocita, 2);
    brick.showValue("Durata", durata, 3);
    
    motors.largeAB.steer(0, velocita);
    pause(durata);
    motors.largeAB.stop();
    pause(500);
}

// ==========================================
// ESEMPIO 3: Funzioni con return
// ==========================================

// Funzione che calcola la distanza di sicurezza in base alla velocità
function calcolaDistanzaSicurezza(velocita) {
    // Formula semplice: più alta è la velocità, maggiore deve essere la distanza di sicurezza
    let distanza = 5 + (velocita / 10);
    return distanza;
}

// Funzione che rileva ostacoli e restituisce un valore booleano
function rilevaOstacolo(distanzaMinima) {
    let distanzaAttuale = sensors.ultrasonic4.distance();
    brick.showValue("Distanza", distanzaAttuale, 1);
    
    // Restituisce true se c'è un ostacolo entro la distanza minima
    return distanzaAttuale < distanzaMinima;
}

// ==========================================
// ESEMPIO 4: Combinare parametri e return
// ==========================================

// Funzione che calcola una velocità sicura in base alla distanza da un ostacolo
function calcolaVelocitaSicura(distanza, velocitaMax = 100) {
    if (distanza < 10) {
        return 0;  // Fermarsi se l'ostacolo è molto vicino
    } else if (distanza < 30) {
        // Velocità proporzionale alla distanza
        return Math.min(velocitaMax, distanza);
    } else {
        return velocitaMax;  // Velocità massima se il percorso è libero
    }
}

// Funzione che permette al robot di muoversi mantenendo una distanza di sicurezza
function muoviSicuro(durata = 5000) {
    brick.showString("Movimento sicuro", 1);
    let tempoInizio = control.millis();
    
    while (control.millis() - tempoInizio < durata) {
        let distanza = sensors.ultrasonic4.distance();
        brick.showValue("Distanza", distanza, 2);
        
        let velocita = calcolaVelocitaSicura(distanza, 70);
        brick.showValue("Velocità", velocita, 3);
        
        motors.largeAB.steer(0, velocita);
        pause(100);  // Breve pausa tra i cicli di controllo
    }
    
    motors.largeAB.stop();
    return true;  // Indica che il movimento è stato completato con successo
}

// ==========================================
// ESEMPIO 5: Funzioni che restituiscono oggetti
// ==========================================

// Funzione che legge e restituisce tutti i valori dei sensori come un oggetto
function leggiSensori() {
    return {
        distanza: sensors.ultrasonic4.distance(),
        luce: sensors.color1.light(),
        colore: sensors.color1.color(),
        batteria: brick.batteryLevel()
    };
}

// Funzione che analizza i dati dei sensori e restituisce raccomandazioni
function analizzaDatiSensori(dati) {
    let raccomandazioni = {};
    
    // Analizza la distanza
    if (dati.distanza < 10) {
        raccomandazioni.azione = "stop";
        raccomandazioni.messaggio = "Ostacolo vicino!";
    } else if (dati.distanza < 30) {
        raccomandazioni.azione = "rallenta";
        raccomandazioni.messaggio = "Ostacolo in avvicinamento";
    } else {
        raccomandazioni.azione = "procedi";
        raccomandazioni.messaggio = "Percorso libero";
    }
    
    // Aggiunge consigli sulla batteria
    if (dati.batteria < 20) {
        raccomandazioni.avvertimento = "Batteria scarica!";
    }
    
    return raccomandazioni;
}

// ==========================================
// ESEMPIO 6: Return anticipato
// ==========================================

// Funzione che verifica le condizioni ambientali prima di procedere
function controllaCondizioni() {
    // Controlla la batteria
    let livelloBatteria = brick.batteryLevel();
    if (livelloBatteria < 10) {
        brick.showString("Batteria troppo bassa!", 1);
        return false;  // Esce immediatamente con errore
    }
    
    // Controlla la distanza
    let distanza = sensors.ultrasonic4.distance();
    if (distanza < 5) {
        brick.showString("Ostacolo troppo vicino!", 1);
        return false;  // Esce immediatamente con errore
    }
    
    // Controlla la luce
    let luce = sensors.color1.light();
    if (luce < 5) {
        brick.showString("Ambiente troppo buio!", 1);
        return false;  // Esce immediatamente con errore
    }
    
    // Se arriviamo qui, tutte le condizioni sono buone
    brick.showString("Condizioni OK", 1);
    return true;  // Operazione riuscita
}

// ==========================================
// FUNZIONE PRINCIPALE
// ==========================================

function main() {
    brick.showString("Demo parametri e return", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Demo 1: Funzioni con parametri
    brick.showString("Demo 1: Parametri", 1);
    muoviAvanti(30, 1500);  // Lentamente per 1.5 secondi
    muoviAvanti(70, 1000);  // Velocemente per 1 secondo
    gira(1, 90);   // Gira a destra di 90 gradi
    gira(-1, 180); // Gira a sinistra di 180 gradi
    pause(1000);
    
    // Demo 2: Parametri di default
    brick.showString("Demo 2: Parametri default", 1);
    muoviAvantiDefault();          // Usa entrambi i valori di default
    muoviAvantiDefault(30);        // Specifica solo la velocità
    muoviAvantiDefault(60, 1000);  // Specifica entrambi i parametri
    pause(1000);
    
    // Demo 3 e 4: Return e combinazione
    brick.showString("Demo 3 & 4: Return", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    
    // Calcola e mostra la distanza di sicurezza
    let distSicurezza = calcolaDistanzaSicurezza(60);
    brick.showValue("Dist. sicurezza", distSicurezza, 2);
    
    // Verifica se c'è un ostacolo entro la distanza di sicurezza
    if (rilevaOstacolo(distSicurezza)) {
        brick.showString("Ostacolo rilevato!", 3);
        music.playTone(880, 500);  // Suona un allarme
    } else {
        brick.showString("Percorso libero", 3);
        // Movimento sicuro per 5 secondi
        let successo = muoviSicuro(5000);
        brick.showValue("Successo", successo, 4);
    }
    
    pause(1000);
    
    // Demo 5: Funzioni che restituiscono oggetti
    brick.showString("Demo 5: Return oggetti", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Leggi e mostra i dati dei sensori
    let datiSensori = leggiSensori();
    brick.showValue("Distanza", datiSensori.distanza, 1);
    brick.showValue("Luce", datiSensori.luce, 2);
    brick.showValue("Colore", datiSensori.colore, 3);
    brick.showValue("Batteria", datiSensori.batteria, 4);
    
    pause(3000);
    brick.clearScreen();
    
    // Analizza e mostra le raccomandazioni
    let analisi = analizzaDatiSensori(datiSensori);
    brick.showString(`Azione: ${analisi.azione}`, 1);
    brick.showString(analisi.messaggio, 2);
    if (analisi.avvertimento) {
        brick.showString(analisi.avvertimento, 3);
    }
    
    pause(3000);
    
    // Demo 6: Return anticipato
    brick.showString("Demo 6: Return anticipato", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    let condizioniOk = controllaCondizioni();
    
    if (condizioniOk) {
        brick.showString("Avvio operazione", 2);
        motors.largeAB.steer(0, 50);
        pause(2000);
        motors.largeAB.stop();
    } else {
        brick.showString("Operazione annullata", 2);
        music.playTone(262, 500);  // Suona un tono di errore
    }
    
    pause(2000);
    brick.clearScreen();
    brick.showString("Demo completata!", 1);
}

// Avvia il programma principale
main();