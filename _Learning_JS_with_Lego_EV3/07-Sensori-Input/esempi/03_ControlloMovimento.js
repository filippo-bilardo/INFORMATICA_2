/**
 * Esempio di utilizzo del sensore giroscopico per il controllo del movimento
 * 
 * Questo programma mostra come utilizzare il sensore giroscopico EV3 per
 * controllare con precisione i movimenti rotatori del robot e mantenere
 * l'orientamento desiderato.
 */

// Configurazione del sensore giroscopico sulla porta 4
const gyroSensor = sensors.gyro4;

// Funzione per ruotare il robot di un angolo specifico
function ruotaDiGradi(gradi, velocita) {
    // Parametri predefiniti
    velocita = velocita || 30; // Velocità predefinita: 30
    
    // Determina la direzione di rotazione
    let direzione = gradi >= 0 ? 1 : -1;
    velocita = Math.abs(velocita) * direzione;
    
    // Azzera il sensore giroscopico
    gyroSensor.reset();
    pause(500); // Pausa per stabilizzazione
    
    // Visualizza informazioni iniziali
    brick.clearScreen();
    brick.showString("Rotazione di " + gradi + "°", 1);
    
    // Calcola l'angolo target (valore assoluto)
    let angoloTarget = Math.abs(gradi);
    
    // Ruota fino a raggiungere l'angolo desiderato
    while (Math.abs(gyroSensor.angle()) < angoloTarget) {
        // Visualizza l'angolo corrente
        brick.showValue("Angolo attuale", gyroSensor.angle(), 2);
        
        // Calcola quanto manca al target
        let rimanente = angoloTarget - Math.abs(gyroSensor.angle());
        brick.showValue("Rimanente", rimanente, 3);
        
        // Rallenta quando si avvicina al target
        let velocitaCorrente = velocita;
        if (rimanente < 20) {
            velocitaCorrente = velocita * 0.5; // Dimezza la velocità
        }
        
        // Applica la rotazione
        motors.largeB.run(velocitaCorrente);
        motors.largeC.run(-velocitaCorrente);
        
        // Breve pausa
        pause(10);
    }
    
    // Ferma i motori
    motors.largeBC.stop();
    
    // Visualizza il risultato finale
    brick.showString("Rotazione completata!", 4);
    brick.showValue("Angolo finale", gyroSensor.angle(), 5);
    
    // Feedback sonoro
    music.playTone(880, 200);
    
    // Breve pausa
    pause(1000);
}

// Funzione per mantenere una direzione rettilinea
function mantieneDirezione(durata, velocita) {
    // Parametri predefiniti
    velocita = velocita || 50; // Velocità predefinita: 50
    durata = durata || 5000; // Durata predefinita: 5 secondi
    
    // Costante di proporzionalità per la correzione
    const KP = 2;
    
    // Azzera il sensore giroscopico
    gyroSensor.reset();
    pause(500); // Pausa per stabilizzazione
    
    // Visualizza informazioni iniziali
    brick.clearScreen();
    brick.showString("Mantenimento direzione", 1);
    brick.showString("Durata: " + (durata / 1000) + " sec", 2);
    
    // Tempo di inizio
    let tempoInizio = control.millis();
    
    // Loop di controllo
    while (control.millis() - tempoInizio < durata) {
        // Lettura dell'angolo corrente
        let angolo = gyroSensor.angle();
        
        // Calcolo dell'errore (deviazione dalla linea retta)
        let errore = 0 - angolo; // L'obiettivo è mantenere angolo = 0
        
        // Calcolo della correzione proporzionale all'errore
        let correzione = KP * errore;
        
        // Applicazione della correzione ai motori
        motors.largeB.run(velocita + correzione);
        motors.largeC.run(velocita - correzione);
        
        // Visualizzazione dei dati
        brick.showValue("Angolo", angolo, 3);
        brick.showValue("Correzione", correzione, 4);
        
        // Tempo rimanente
        let rimanente = Math.floor((durata - (control.millis() - tempoInizio)) / 1000);
        brick.showValue("Rimanente (s)", rimanente, 5);
        
        // Breve pausa
        pause(10);
    }
    
    // Ferma i motori
    motors.largeBC.stop();
    
    // Visualizza il risultato finale
    brick.showString("Percorso completato!", 6);
    
    // Feedback sonoro
    music.playTone(880, 200);
    
    // Breve pausa
    pause(1000);
}

// Programma principale: menu di selezione
let opzioneSelezionata = 0;
let opzioni = ["Ruota 90 gradi", "Ruota 180 gradi", "Ruota 360 gradi", "Percorso rettilineo"];

// Funzione per visualizzare il menu
function visualizzaMenu() {
    brick.clearScreen();
    brick.showString("MENU GIROSCOPIO", 0);
    
    for (let i = 0; i < opzioni.length; i++) {
        if (i === opzioneSelezionata) {
            brick.showString("> " + opzioni[i], i + 1);
        } else {
            brick.showString("  " + opzioni[i], i + 1);
        }
    }
    
    brick.showString("Su/Giù: seleziona", 6);
    brick.showString("Enter: conferma", 7);
}

// Loop principale del programma
forever(function() {
    // Visualizza il menu
    visualizzaMenu();
    
    // Gestione dei pulsanti
    if (brick.buttonUp.wasPressed()) {
        // Sposta la selezione in su
        opzioneSelezionata = (opzioneSelezionata - 1 + opzioni.length) % opzioni.length;
        pause(200); // Evita pressioni multiple
    } else if (brick.buttonDown.wasPressed()) {
        // Sposta la selezione in giù
        opzioneSelezionata = (opzioneSelezionata + 1) % opzioni.length;
        pause(200); // Evita pressioni multiple
    } else if (brick.buttonEnter.wasPressed()) {
        // Esegui l'opzione selezionata
        switch (opzioneSelezionata) {
            case 0: // Ruota 90 gradi
                ruotaDiGradi(90, 30);
                break;
            case 1: // Ruota 180 gradi
                ruotaDiGradi(180, 30);
                break;
            case 2: // Ruota 360 gradi
                ruotaDiGradi(360, 30);
                break;
            case 3: // Percorso rettilineo
                mantieneDirezione(5000, 50);
                break;
        }
        pause(200); // Evita pressioni multiple
    }
    
    // Breve pausa
    pause(50);
});