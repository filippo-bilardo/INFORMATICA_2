/**
 * File: 04_BreakContinue.js
 * Descrizione: Esempi di utilizzo delle istruzioni break e continue nella programmazione dei robot LEGO EV3
 * Corso: Learning JavaScript by Lego EV3 Example
 */

// ESEMPIO 1: Utilizzo di break per fermare il robot quando rileva un ostacolo
// Questo esempio mostra come interrompere un ciclo quando il sensore ultrasonico rileva un ostacolo vicino

function esempioBreak() {
    // Inizia con il robot che si muove in avanti
    motors.largeAB.steer(0, 30);
    brick.showString("Cerco ostacoli", 1);
    
    // Continua a muoversi finché non viene rilevato un ostacolo
    for (let i = 0; i < 100; i++) {  // Limita a 100 iterazioni per sicurezza
        // Leggi la distanza dal sensore ultrasonico
        let distanza = sensors.ultrasonic4.distance();
        brick.showValue("Distanza", distanza, 2);
        
        // Se viene rilevato un ostacolo a meno di 15 cm, interrompi il ciclo
        if (distanza < 15) {
            brick.showString("Ostacolo trovato!", 3);
            break;  // Esci immediatamente dal ciclo
        }
        
        // Breve pausa per non sovraccaricare il sistema
        pause(100);
    }
    
    // Ferma i motori dopo l'uscita dal ciclo
    motors.largeAB.stop();
    brick.showString("Movimento fermato", 4);
}

// ESEMPIO 2: Utilizzo di continue per ignorare situazioni specifiche
// Questo esempio mostra come saltare azioni per determinate condizioni durante la navigazione

function esempioContinue() {
    brick.showString("Segui percorso", 1);
    
    // Leggi il colore iniziale
    let coloreIniziale = sensors.color1.color();
    
    for (let i = 0; i < 200; i++) {  // Limita a 200 iterazioni
        let coloreAttuale = sensors.color1.color();
        brick.showValue("Colore", coloreAttuale, 2);
        
        // Ignora il colore giallo (es. Color.Yellow = 4)
        if (coloreAttuale === 4) {
            brick.showString("Giallo ignorato", 3);
            continue;  // Salta il resto del codice in questa iterazione
        }
        
        // Se rileva il colore rosso, esegui manovra evasiva
        if (coloreAttuale === 5) {  // es. Color.Red = 5
            brick.showString("Rosso: STOP", 3);
            motors.largeAB.stop();
            pause(1000);
        } else {
            // Movimento normale per altri colori
            motors.largeAB.steer(0, 20);
        }
        
        pause(100);
    }
    
    motors.largeAB.stop();
    brick.showString("Fine percorso", 4);
}

// ESEMPIO 3: Utilizzo combinato di break e continue in cicli annidati
// Questo esempio mostra come navigare in una griglia utilizzando entrambe le istruzioni

function esempioGridNavigation() {
    brick.showString("Esplora griglia", 1);
    
    // Naviga in una griglia virtuale 4x4
    righe: for (let riga = 0; riga < 4; riga++) {
        brick.showValue("Riga", riga, 2);
        
        for (let colonna = 0; colonna < 4; colonna++) {
            brick.showValue("Colonna", colonna, 3);
            
            // Muovi il robot in avanti
            motors.largeAB.steer(0, 30, 1, MoveUnit.Rotations);
            
            // Leggi il sensore
            let distanza = sensors.ultrasonic4.distance();
            
            // Se c'è un ostacolo molto vicino, interrompi l'esplorazione della griglia
            if (distanza < 5) {
                brick.showString("Pericolo! Esco!", 4);
                break righe;  // Esci da entrambi i cicli
            }
            
            // Se c'è un ostacolo nella cella, passa alla colonna successiva
            if (distanza < 20) {
                brick.showString("Ostacolo! Prossima colonna", 4);
                continue;  // Salta alla prossima iterazione
            }
            
            // Esplora la cella (simulazione)
            brick.showString("Esploro cella", 4);
            music.playTone(440, 200);
            pause(500);
        }
        
        // Alla fine di ogni riga, ruota per passare alla riga successiva
        motors.largeC.run(40, 1, MoveUnit.Rotations);  // Gira di 90 gradi
    }
    
    motors.largeAB.stop();
    brick.showString("Esplorazione completata", 5);
}

// Funzione principale che dimostra l'uso di break e continue
function main() {
    brick.showString("Dimostrazioni break/continue", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    
    esempioBreak();
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    
    esempioContinue();
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    
    esempioGridNavigation();
    
    brick.showString("Demo completata", 1);
}

// Esecuzione del programma principale
main();