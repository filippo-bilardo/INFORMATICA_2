/**
 * Esempio di feedback multimodale per EV3
 * Questo esempio mostra come combinare feedback visivo, sonoro e LED
 * per creare un'interfaccia utente più ricca e intuitiva
 */

// Definizione dei tipi di notifica
let TipoNotifica = {
    INFO: "info",
    SUCCESSO: "successo",
    AVVISO: "avviso",
    ERRORE: "errore"
};

// Funzione per mostrare una notifica multimodale
function mostraNotifica(messaggio, tipo, durata = 2000) {
    // Pulisci lo schermo
    brick.clearScreen();
    
    // Visualizza il messaggio
    let tipoVisualizzato = "";
    
    switch (tipo) {
        case TipoNotifica.INFO:
            tipoVisualizzato = "INFO";
            break;
        case TipoNotifica.SUCCESSO:
            tipoVisualizzato = "SUCCESSO";
            break;
        case TipoNotifica.AVVISO:
            tipoVisualizzato = "AVVISO";
            break;
        case TipoNotifica.ERRORE:
            tipoVisualizzato = "ERRORE";
            break;
    }
    
    brick.showString("[" + tipoVisualizzato + "]", 0);
    
    // Dividi il messaggio in righe se necessario
    if (messaggio.length > 16) {
        let parte1 = messaggio.substring(0, 16);
        let parte2 = messaggio.substring(16);
        brick.showString(parte1, 2);
        brick.showString(parte2, 3);
    } else {
        brick.showString(messaggio, 2);
    }
    
    // Feedback LED
    switch (tipo) {
        case TipoNotifica.INFO:
            brick.setStatusLight(StatusLight.Green);
            break;
        case TipoNotifica.SUCCESSO:
            brick.setStatusLight(StatusLight.Green);
            break;
        case TipoNotifica.AVVISO:
            brick.setStatusLight(StatusLight.Orange);
            break;
        case TipoNotifica.ERRORE:
            brick.setStatusLight(StatusLight.RedFlash);
            break;
    }
    
    // Feedback sonoro
    switch (tipo) {
        case TipoNotifica.INFO:
            music.playTone(440, 200);
            break;
        case TipoNotifica.SUCCESSO:
            music.playTone(440, 100);
            pause(50);
            music.playTone(660, 100);
            pause(50);
            music.playTone(880, 200);
            break;
        case TipoNotifica.AVVISO:
            music.playTone(440, 200);
            pause(100);
            music.playTone(440, 200);
            break;
        case TipoNotifica.ERRORE:
            music.playTone(880, 200);
            pause(100);
            music.playTone(220, 400);
            break;
    }
    
    // Mostra per la durata specificata
    pause(durata);
    
    // Ripristina lo stato normale
    brick.setStatusLight(StatusLight.Green);
}

// Funzione per monitorare un sensore con feedback multimodale
function monitoraSensore() {
    // Configurazione
    let sensoreDistanza = sensors.ultrasonic1; // Simulato
    let sogliaDiAvviso = 30;
    let sogliaDiPericolo = 10;
    let ultimaNotifica = "";
    
    brick.clearScreen();
    brick.showString("Monitor Distanza", 0);
    brick.showString("Premi EXIT per uscire", 7);
    
    while (!brick.buttonExit.wasPressed()) {
        // Simula la lettura del sensore
        let distanza = Math.floor(Math.random() * 100);
        
        // Aggiorna il display
        brick.showString("Distanza: " + distanza + " cm    ", 2);
        
        // Disegna una barra proporzionale alla distanza (max 100cm)
        brick.fillRect(0, 30, 178, 10, 0); // Pulisci l'area
        let larghezzaBarra = Math.min(100, distanza) * 1.5;
        brick.fillRect(10, 30, larghezzaBarra, 10);
        
        // Feedback multimodale basato sulla distanza
        if (distanza < sogliaDiPericolo) {
            // Pericolo: oggetto molto vicino
            if (ultimaNotifica !== "pericolo") {
                brick.setStatusLight(StatusLight.RedFlash);
                music.playTone(880, 100);
                brick.showString("PERICOLO: Oggetto", 4);
                brick.showString("molto vicino!", 5);
                ultimaNotifica = "pericolo";
            }
        } else if (distanza < sogliaDiAvviso) {
            // Avviso: oggetto vicino
            if (ultimaNotifica !== "avviso") {
                brick.setStatusLight(StatusLight.Orange);
                music.playTone(440, 200);
                brick.showString("AVVISO: Oggetto", 4);
                brick.showString("in avvicinamento", 5);
                ultimaNotifica = "avviso";
            }
        } else {
            // Situazione normale
            if (ultimaNotifica !== "normale") {
                brick.setStatusLight(StatusLight.Green);
                brick.showString("                ", 4); // Pulisci le righe
                brick.showString("                ", 5); // dei messaggi
                ultimaNotifica = "normale";
            }
        }
        
        pause(500); // Aggiorna ogni mezzo secondo
    }
    
    // Ripristina lo stato normale
    brick.setStatusLight(StatusLight.Green);
}

// Funzione per creare un'interfaccia di controllo con feedback multimodale
function controlloMotori() {
    let velocita = 50;
    let motoreAttivo = false;
    
    brick.clearScreen();
    brick.showString("Controllo Motori", 0);
    brick.showString("Velocità: " + velocita + "%", 2);
    brick.showString("Stato: Fermo", 3);
    brick.showString("ENTER: Avvia/Ferma", 5);
    brick.showString("< >: Cambia velocità", 6);
    brick.showString("EXIT: Esci", 7);
    
    while (!brick.buttonExit.wasPressed()) {
        // Gestione pulsanti
        if (brick.buttonEnter.wasPressed()) {
            motoreAttivo = !motoreAttivo;
            
            // Feedback multimodale per cambio stato
            if (motoreAttivo) {
                // Avvio motori
                brick.showString("Stato: In movimento", 3);
                brick.setStatusLight(StatusLight.Green);
                music.playTone(440, 100);
                pause(50);
                music.playTone(880, 200);
            } else {
                // Arresto motori
                brick.showString("Stato: Fermo      ", 3);
                brick.setStatusLight(StatusLight.Orange);
                music.playTone(880, 100);
                pause(50);
                music.playTone(440, 200);
            }
        }
        
        // Aumenta velocità
        if (brick.buttonRight.wasPressed() && velocita < 100) {
            velocita += 10;
            brick.showString("Velocità: " + velocita + "%  ", 2);
            
            // Feedback per aumento velocità
            music.playTone(440 + velocita, 100);
        }
        
        // Diminuisci velocità
        if (brick.buttonLeft.wasPressed() && velocita > 0) {
            velocita -= 10;
            brick.showString("Velocità: " + velocita + "%  ", 2);
            
            // Feedback per diminuzione velocità
            music.playTone(440 + velocita, 100);
        }
        
        // Simula il comportamento dei motori
        if (motoreAttivo) {
            // Lampeggia il LED in base alla velocità
            if (control.millis() % (1100 - velocita * 10) < 500) {
                brick.setStatusLight(StatusLight.Green);
            } else {
                brick.setStatusLight(StatusLight.Off);
            }
        }
        
        pause(50);
    }
    
    // Ripristina lo stato normale
    brick.setStatusLight(StatusLight.Green);
}

// Funzione per dimostrare un sistema di allerta multimodale
function sistemaAllerta() {
    brick.clearScreen();
    brick.showString("Sistema di Allerta", 0);
    brick.showString("Simulazione eventi", 1);
    brick.showString("Premi EXIT per uscire", 7);
    
    let eventi = [
        { tipo: TipoNotifica.INFO, messaggio: "Sistema avviato" },
        { tipo: TipoNotifica.INFO, messaggio: "Sensori attivi" },
        { tipo: TipoNotifica.AVVISO, messaggio: "Batteria al 30%" },
        { tipo: TipoNotifica.SUCCESSO, messaggio: "Obiettivo raggiunto" },
        { tipo: TipoNotifica.ERRORE, messaggio: "Errore di comunicazione" },
        { tipo: TipoNotifica.AVVISO, messaggio: "Ostacolo rilevato" },
        { tipo: TipoNotifica.INFO, messaggio: "Cambio modalità" },
        { tipo: TipoNotifica.ERRORE, messaggio: "Sensore disconnesso" },
        { tipo: TipoNotifica.SUCCESSO, messaggio: "Aggiornamento completato" }
    ];
    
    let indiceEvento = 0;
    let ultimoEventoTempo = 0;
    
    while (!brick.buttonExit.wasPressed()) {
        let tempoAttuale = control.millis();
        
        // Genera un nuovo evento ogni 3 secondi
        if (tempoAttuale - ultimoEventoTempo > 3000) {
            let evento = eventi[indiceEvento];
            mostraNotifica(evento.messaggio, evento.tipo);
            
            indiceEvento = (indiceEvento + 1) % eventi.length;
            ultimoEventoTempo = tempoAttuale;
            
            // Torna alla schermata principale
            brick.clearScreen();
            brick.showString("Sistema di Allerta", 0);
            brick.showString("Simulazione eventi", 1);
            brick.showString("Ultimo evento:", 3);
            brick.showString(evento.messaggio, 4);
            brick.showString("Premi EXIT per uscire", 7);
        }
        
        pause(50);
    }
}

// Menu principale
function menuPrincipale() {
    let opzioni = [
        "1. Notifiche Demo",
        "2. Monitor Sensore",
        "3. Controllo Motori",
        "4. Sistema Allerta",
        "5. Esci"
    ];
    let selezioneAttuale = 0;
    
    while (true) {
        // Visualizza il menu
        brick.clearScreen();
        brick.showString("Demo Feedback", 0);
        brick.showString("Multimodale", 1);
        
        for (let i = 0; i < opzioni.length; i++) {
            if (i === selezioneAttuale) {
                brick.showString("> " + opzioni[i], i + 2);
            } else {
                brick.showString("  " + opzioni[i], i + 2);
            }
        }
        
        // Attendi input utente
        while (!brick.buttonUp.wasPressed() &&
               !brick.buttonDown.wasPressed() &&
               !brick.buttonEnter.wasPressed()) {
            pause(50);
        }
        
        // Gestisci navigazione
        if (brick.buttonUp.wasPressed() && selezioneAttuale > 0) {
            selezioneAttuale--;
            music.playTone(440, 50); // Feedback sonoro
        } else if (brick.buttonDown.wasPressed() && selezioneAttuale < opzioni.length - 1) {
            selezioneAttuale++;
            music.playTone(440, 50); // Feedback sonoro
        } else if (brick.buttonEnter.wasPressed()) {
            // Feedback sonoro di selezione
            music.playTone(660, 100);
            
            // Esegui l'opzione selezionata
            switch (selezioneAttuale) {
                case 0:
                    // Demo notifiche
                    mostraNotifica("Esempio di notifica informativa", TipoNotifica.INFO);
                    pause(500);
                    mostraNotifica("Operazione completata con successo", TipoNotifica.SUCCESSO);
                    pause(500);
                    mostraNotifica("Attenzione: batteria in esaurimento", TipoNotifica.AVVISO);
                    pause(500);
                    mostraNotifica("Errore: connessione persa", TipoNotifica.ERRORE);
                    break;
                case 1:
                    monitoraSensore();
                    break;
                case 2:
                    controlloMotori();
                    break;
                case 3:
                    sistemaAllerta();
                    break;
                case 4:
                    // Esci dal programma
                    brick.clearScreen();
                    brick.showString("Programma terminato", 3);
                    return;
            }
        }
    }
}

// Avvia il programma
menuPrincipale();