/**
 * Esempio di visualizzazione di testo e grafica sul display EV3
 * Questo esempio mostra come utilizzare le funzioni di visualizzazione
 * per creare un'interfaccia utente semplice ma efficace
 */

// Funzione per mostrare testo in diverse posizioni
function mostraTestoDemo() {
    brick.clearScreen();
    brick.showString("Testo Demo", 0); // Titolo in alto
    
    // Mostra testo in diverse posizioni
    brick.showString("Riga 1: Normale", 1);
    brick.showString("Riga 2: Numeri 12345", 2);
    brick.showString("Riga 3: Simboli !@#$%", 3);
    
    // Attendi che l'utente prema un pulsante
    brick.showString("Premi un pulsante...", 7);
    waitAnyButton();
}

// Funzione per mostrare numeri con formattazione
function mostraNumeriDemo() {
    brick.clearScreen();
    brick.showString("Numeri Demo", 0);
    
    // Mostra numeri con diversa formattazione
    let numero = 42;
    brick.showString("Intero: " + numero, 1);
    
    let decimale = 3.14159;
    brick.showString("Decimale: " + decimale.toFixed(2), 2);
    
    let percentuale = 0.75;
    brick.showString("Percentuale: " + (percentuale * 100) + "%", 3);
    
    // Attendi che l'utente prema un pulsante
    brick.showString("Premi un pulsante...", 7);
    waitAnyButton();
}

// Funzione per disegnare forme semplici
function disegnaFormeDemo() {
    brick.clearScreen();
    brick.showString("Forme Demo", 0);
    
    // Disegna un rettangolo
    // Nota: le coordinate sono (x, y, larghezza, altezza)
    brick.drawRect(10, 20, 40, 30);
    
    // Disegna un cerchio
    // Nota: le coordinate sono (x, y, raggio)
    brick.drawCircle(100, 40, 20);
    
    // Disegna una linea
    // Nota: le coordinate sono (x1, y1, x2, y2)
    brick.drawLine(10, 80, 100, 80);
    
    // Attendi che l'utente prema un pulsante
    brick.showString("Premi un pulsante...", 7);
    waitAnyButton();
}

// Funzione per creare un'animazione semplice
function animazioneDemo() {
    brick.clearScreen();
    brick.showString("Animazione Demo", 0);
    
    // Crea un'animazione semplice di un punto che si muove
    for (let i = 0; i < 100; i++) {
        // Pulisci solo l'area dell'animazione
        brick.fillRect(0, 30, 178, 20, 0); // Rettangolo bianco per pulire
        
        // Disegna il punto nella nuova posizione
        brick.fillCircle(i, 40, 5);
        
        // Piccola pausa per l'animazione
        pause(50);
        
        // Esci se viene premuto un pulsante
        if (anyButtonPressed()) {
            break;
        }
    }
    
    // Attendi che l'utente prema un pulsante
    brick.showString("Premi un pulsante...", 7);
    waitAnyButton();
}

// Funzione per mostrare un'interfaccia con barra di progresso
function barraProgressoDemo() {
    brick.clearScreen();
    brick.showString("Progresso Demo", 0);
    
    // Simula un'operazione con progresso
    for (let percentuale = 0; percentuale <= 100; percentuale += 5) {
        // Aggiorna la percentuale
        brick.showString("Completato: " + percentuale + "%", 2);
        
        // Disegna la barra di progresso
        let larghezzaTotale = 100;
        let larghezzaAttuale = Math.floor(larghezzaTotale * percentuale / 100);
        
        // Cornice della barra
        brick.drawRect(10, 40, larghezzaTotale, 10);
        
        // Riempimento della barra
        if (larghezzaAttuale > 0) {
            brick.fillRect(10, 40, larghezzaAttuale, 10);
        }
        
        // Piccola pausa per simulare il progresso
        pause(100);
        
        // Esci se viene premuto un pulsante
        if (anyButtonPressed()) {
            break;
        }
    }
    
    // Messaggio di completamento
    brick.showString("Operazione completata!", 5);
    
    // Attendi che l'utente prema un pulsante
    brick.showString("Premi un pulsante...", 7);
    waitAnyButton();
}

// Funzioni di utilità
function waitAnyButton() {
    while (!anyButtonPressed()) {
        pause(50);
    }
    // Attendi il rilascio del pulsante
    while (anyButtonPressed()) {
        pause(50);
    }
}

function anyButtonPressed() {
    return brick.buttonEnter.isPressed() ||
           brick.buttonExit.isPressed() ||
           brick.buttonLeft.isPressed() ||
           brick.buttonRight.isPressed() ||
           brick.buttonUp.isPressed() ||
           brick.buttonDown.isPressed();
}

// Menu principale
function menuPrincipale() {
    let opzioni = [
        "1. Testo Demo",
        "2. Numeri Demo",
        "3. Forme Demo",
        "4. Animazione Demo",
        "5. Progresso Demo",
        "6. Esci"
    ];
    let selezioneAttuale = 0;
    
    while (true) {
        // Visualizza il menu
        brick.clearScreen();
        brick.showString("Demo Display EV3", 0);
        
        for (let i = 0; i < opzioni.length; i++) {
            if (i === selezioneAttuale) {
                brick.showString("> " + opzioni[i], i + 1);
            } else {
                brick.showString("  " + opzioni[i], i + 1);
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
        } else if (brick.buttonDown.wasPressed() && selezioneAttuale < opzioni.length - 1) {
            selezioneAttuale++;
        } else if (brick.buttonEnter.wasPressed()) {
            // Esegui l'opzione selezionata
            switch (selezioneAttuale) {
                case 0:
                    mostraTestoDemo();
                    break;
                case 1:
                    mostraNumeriDemo();
                    break;
                case 2:
                    disegnaFormeDemo();
                    break;
                case 3:
                    animazioneDemo();
                    break;
                case 4:
                    barraProgressoDemo();
                    break;
                case 5:
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