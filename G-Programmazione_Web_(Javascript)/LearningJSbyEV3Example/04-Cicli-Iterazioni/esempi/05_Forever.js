/**
 * File: 05_Forever.js
 * Descrizione: Esempi di utilizzo della funzione forever e tecniche di polling nella programmazione dei robot LEGO EV3
 * Corso: Learning JavaScript by Lego EV3 Example
 */

// ESEMPIO 1: Monitoraggio continuo con la funzione forever
// Questo esempio mostra come monitorare continuamente l'ambiente con i sensori del robot

function esempioForever() {
    // Messaggio iniziale
    brick.showString("Monitor sensori", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    
    brick.clearScreen();
    brick.showString("Monitoraggio attivo", 1);
    
    // Monitoraggio continuo dei sensori in background
    forever(function() {
        // Leggi i valori dei sensori
        let distanza = sensors.ultrasonic4.distance();
        let luce = sensors.color1.light();
        
        // Mostra i valori sul display
        brick.showValue("Distanza", distanza, 2);
        brick.showValue("Luce", luce, 3);
        
        // Reagisci a valori specifici dei sensori
        if (distanza < 10) {
            brick.showString("Ostacolo vicino!", 4);
            // Lampeggia un LED o suona un allarme
            brick.setStatusLight(StatusLight.RedFlash);
        } else {
            brick.setStatusLight(StatusLight.Green);
            brick.clearLine(4);
        }
        
        // Pausa breve per limitare la frequenza di aggiornamento
        pause(50);
    });
    
    // Nota: Il codice sottostante continuerà a essere eseguito mentre
    // il blocco forever è in esecuzione in background
    
    // Aspetta che l'utente prema il pulsante per interrompere la demo
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    
    // In un ambiente reale, potremmo voler interrompere il ciclo forever qui,
    // ma in MakeCode for EV3 questo può non essere direttamente supportato
}

// ESEMPIO 2: Implementazione di polling manuale con while
// Questo esempio mostra un approccio alternativo a forever usando cicli while

function esempioPolling() {
    brick.showString("Polling demo", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    
    brick.clearScreen();
    brick.showString("Polling attivo", 1);
    
    // Valori precedenti per confronto
    let prevDistanza = 0;
    let prevLuce = 0;
    
    // Flag per controllo del ciclo
    let attivo = true;
    
    // Implementazione manuale di polling
    while (attivo) {
        // Leggi i valori dei sensori
        let distanza = sensors.ultrasonic4.distance();
        let luce = sensors.color1.light();
        
        // Verifica se ci sono cambiamenti significativi
        let cambioDistanza = Math.abs(distanza - prevDistanza) > 2;
        let cambioLuce = Math.abs(luce - prevLuce) > 5;
        
        // Reagisci solo ai cambiamenti (event-driven approach)
        if (cambioDistanza) {
            brick.showValue("Nuova distanza", distanza, 2);
            prevDistanza = distanza;
        }
        
        if (cambioLuce) {
            brick.showValue("Nuova luce", luce, 3);
            prevLuce = luce;
        }
        
        // Controlla se l'utente vuole uscire (premendo il pulsante giù)
        if (brick.buttonDown.isPressed()) {
            attivo = false;
            brick.showString("Uscita...", 4);
        }
        
        // Pausa per controllare la frequenza di polling
        pause(100);
    }
    
    brick.clearScreen();
    brick.showString("Polling terminato", 1);
}

// ESEMPIO 3: Macchina a stati usando forever
// Questo esempio mostra come implementare una macchina a stati per un robot che esplora l'ambiente

function esempioMacchinaStati() {
    // Definizione degli stati
    const STATO_ESPLORAZIONE = 0;
    const STATO_EVITA_OSTACOLI = 1;
    const STATO_SEGUI_LINEA = 2;
    const STATO_RITORNO_BASE = 3;
    
    // Stato iniziale
    let statoCorrente = STATO_ESPLORAZIONE;
    // Contatori e variabili di controllo
    let tempoEsplorazione = 0;
    let ostacoli = 0;
    
    brick.showString("Robot esploratore", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    
    brick.clearScreen();
    
    // Implementa la macchina a stati con forever
    forever(function() {
        // Leggi i sensori
        let distanza = sensors.ultrasonic4.distance();
        let colore = sensors.color1.color();
        
        // Mostra lo stato attuale
        brick.showString(`Stato: ${statoCorrente}`, 1);
        
        // Logica principale della macchina a stati
        switch (statoCorrente) {
            case STATO_ESPLORAZIONE:
                brick.showString("Esplorazione", 2);
                motors.largeAB.steer(0, 30);  // Movimento in avanti
                
                // Incrementa il tempo di esplorazione
                tempoEsplorazione += 1;
                brick.showValue("Tempo", tempoEsplorazione, 3);
                
                // Transizioni di stato
                if (distanza < 15) {
                    statoCorrente = STATO_EVITA_OSTACOLI;
                    ostacoli += 1;
                } else if (colore === 1) {  // es. Color.Black = 1
                    statoCorrente = STATO_SEGUI_LINEA;
                } else if (tempoEsplorazione > 100) {
                    statoCorrente = STATO_RITORNO_BASE;
                }
                break;
                
            case STATO_EVITA_OSTACOLI:
                brick.showString("Evita ostacoli", 2);
                brick.showValue("Ostacoli", ostacoli, 3);
                
                // Manovra di evitamento
                motors.largeAB.stop();
                motors.largeAB.steer(-50, 30, 1, MoveUnit.Seconds);
                motors.largeC.run(50, 0.5, MoveUnit.Rotations);  // Gira
                
                // Torna all'esplorazione
                statoCorrente = STATO_ESPLORAZIONE;
                break;
                
            case STATO_SEGUI_LINEA:
                brick.showString("Segui linea", 2);
                
                // Implementazione semplificata per seguire la linea
                if (colore === 1) {  // es. Color.Black = 1
                    motors.largeA.run(10);  // Ruota più lentamente
                    motors.largeB.run(30);
                } else {
                    motors.largeA.run(30);
                    motors.largeB.run(10);
                }
                
                // Controlla se la linea è terminata
                if (colore !== 1 && colore !== 0) {  // né nero né bianco
                    statoCorrente = STATO_ESPLORAZIONE;
                }
                break;
                
            case STATO_RITORNO_BASE:
                brick.showString("Ritorno alla base", 2);
                brick.showValue("Ostacoli totali", ostacoli, 3);
                
                // Simulazione ritorno alla base (in un caso reale useremmo algoritmi di navigazione)
                motors.largeAB.steer(0, -30);  // Vai all'indietro
                pause(2000);
                motors.largeAB.stop();
                
                // Termina il programma (in un ambiente reale, potremmo resettare lo stato)
                brick.showString("Missione completata", 4);
                
                // Qui normalmente usciremmo dal ciclo, ma in forever potremmo non avere questo controllo diretto
                // Quindi simuliamo un idle state
                while (true) {
                    pause(1000);  // Attesa infinita
                }
                break;
        }
        
        // Pausa tra le iterazioni della macchina a stati
        pause(100);
    });
}

// Funzione principale che permette all'utente di scegliere quale esempio eseguire
function main() {
    brick.showString("Demo forever/polling", 1);
    brick.showString("Premere <", 2);
    brick.showString("per forever", 3);
    brick.showString("Premere >", 4);
    brick.showString("per polling", 5);
    brick.showString("Premere ^", 6);
    brick.showString("per macchina a stati", 7);
    
    // Attendi la scelta dell'utente
    let scelta = false;
    while (!scelta) {
        if (brick.buttonLeft.isPressed()) {
            scelta = true;
            esempioForever();
        } else if (brick.buttonRight.isPressed()) {
            scelta = true;
            esempioPolling();
        } else if (brick.buttonUp.isPressed()) {
            scelta = true;
            esempioMacchinaStati();
        }
        pause(100);
    }
    
    brick.clearScreen();
    brick.showString("Demo completata", 1);
}

// Esecuzione del programma principale
main();