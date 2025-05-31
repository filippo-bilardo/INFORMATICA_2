/**
 * Esempio di menu interattivo per EV3
 * Questo esempio mostra come creare un sistema di menu completo
 * con navigazione, sottomenu e azioni
 */

// Definizione della struttura del menu
let menuPrincipale = {
    titolo: "Menu Principale",
    opzioni: [
        { nome: "Programmi", tipo: "sottomenu", riferimento: "menuProgrammi" },
        { nome: "Sensori", tipo: "sottomenu", riferimento: "menuSensori" },
        { nome: "Impostazioni", tipo: "sottomenu", riferimento: "menuImpostazioni" },
        { nome: "Info", tipo: "azione", azione: mostraInfo }
    ]
};

let menuProgrammi = {
    titolo: "Programmi",
    opzioni: [
        { nome: "Segui Linea", tipo: "azione", azione: avviaSeguilinea },
        { nome: "Evita Ostacoli", tipo: "azione", azione: avviaEvitaOstacoli },
        { nome: "Telecomando", tipo: "azione", azione: avviaTelecomando },
        { nome: "Indietro", tipo: "indietro" }
    ]
};

let menuSensori = {
    titolo: "Sensori",
    opzioni: [
        { nome: "Test Ultrasuoni", tipo: "azione", azione: testUltrasuoni },
        { nome: "Test Colore", tipo: "azione", azione: testColore },
        { nome: "Test Tocco", tipo: "azione", azione: testTocco },
        { nome: "Indietro", tipo: "indietro" }
    ]
};

let menuImpostazioni = {
    titolo: "Impostazioni",
    opzioni: [
        { nome: "Volume", tipo: "parametro", azione: impostaVolume, valore: 50 },
        { nome: "Luminosità", tipo: "parametro", azione: impostaLuminosita, valore: 75 },
        { nome: "Velocità", tipo: "parametro", azione: impostaVelocita, valore: 50 },
        { nome: "Indietro", tipo: "indietro" }
    ]
};

// Variabili di stato del menu
let menuAttuale = menuPrincipale;
let menuPrecedente = null;
let selezioneAttuale = 0;
let modificaParametro = false;

// Funzione per visualizzare il menu corrente
function visualizzaMenu() {
    brick.clearScreen();
    brick.showString(menuAttuale.titolo + ":", 0);
    
    for (let i = 0; i < menuAttuale.opzioni.length; i++) {
        // Evidenzia l'opzione selezionata
        let prefisso = (i === selezioneAttuale) ? "> " : "  ";
        let opzione = menuAttuale.opzioni[i];
        
        // Mostra il valore per i parametri
        if (opzione.tipo === "parametro") {
            brick.showString(prefisso + opzione.nome + ": " + opzione.valore, i + 1);
        } else {
            brick.showString(prefisso + opzione.nome, i + 1);
        }
    }
    
    // Mostra istruzioni contestuali
    if (modificaParametro) {
        brick.showString("< Diminuisci | Aumenta >", 7);
    } else {
        brick.showString("^ Su | Giù v | > Seleziona", 7);
    }
}

// Funzione per gestire la selezione
function gestisciSelezione() {
    let opzioneSelezionata = menuAttuale.opzioni[selezioneAttuale];
    
    if (opzioneSelezionata.tipo === "sottomenu") {
        // Naviga al sottomenu
        menuPrecedente = menuAttuale;
        menuAttuale = eval(opzioneSelezionata.riferimento); // Nota: eval è usato per semplicità
        selezioneAttuale = 0;
        visualizzaMenu();
        // Feedback sonoro
        music.playTone(440, 100);
    } else if (opzioneSelezionata.tipo === "indietro") {
        // Torna al menu precedente
        if (menuPrecedente) {
            menuAttuale = menuPrecedente;
            menuPrecedente = menuPrincipale; // Semplificazione
            selezioneAttuale = 0;
            visualizzaMenu();
            // Feedback sonoro
            music.playTone(330, 100);
        }
    } else if (opzioneSelezionata.tipo === "azione") {
        // Esegui l'azione associata
        // Feedback sonoro
        music.playTone(660, 100);
        opzioneSelezionata.azione();
    } else if (opzioneSelezionata.tipo === "parametro") {
        // Entra in modalità modifica parametro
        modificaParametro = true;
        visualizzaMenu();
        // Feedback sonoro
        music.playTone(550, 100);
    }
}

// Funzione per modificare un parametro
function modificaValore(incremento) {
    let opzioneSelezionata = menuAttuale.opzioni[selezioneAttuale];
    
    if (opzioneSelezionata.tipo === "parametro") {
        // Calcola il nuovo valore
        let nuovoValore = opzioneSelezionata.valore + incremento;
        
        // Applica limiti appropriati
        if (opzioneSelezionata.nome === "Volume" || opzioneSelezionata.nome === "Luminosità" || opzioneSelezionata.nome === "Velocità") {
            nuovoValore = Math.max(0, Math.min(100, nuovoValore));
        }
        
        // Aggiorna il valore
        opzioneSelezionata.valore = nuovoValore;
        
        // Applica l'effetto del parametro
        opzioneSelezionata.azione(nuovoValore);
        
        // Feedback sonoro
        if (incremento > 0) {
            music.playTone(880, 50);
        } else {
            music.playTone(440, 50);
        }
        
        // Aggiorna il display
        visualizzaMenu();
    }
}

// Funzioni di esempio per le azioni
function mostraInfo() {
    brick.clearScreen();
    brick.showString("EV3 Menu Demo", 0);
    brick.showString("Versione 1.0", 1);
    brick.showString("Creato per il corso", 3);
    brick.showString("Learning JS by EV3", 4);
    brick.showString("Premi Indietro", 6);
    
    // Attendi che l'utente prema il pulsante indietro
    while (!brick.buttonExit.wasPressed()) {
        pause(50);
    }
    
    visualizzaMenu();
}

function avviaSeguilinea() {
    simulaEsecuzioneProgramma("Segui Linea");
}

function avviaEvitaOstacoli() {
    simulaEsecuzioneProgramma("Evita Ostacoli");
}

function avviaTelecomando() {
    simulaEsecuzioneProgramma("Telecomando");
}

function testUltrasuoni() {
    brick.clearScreen();
    brick.showString("Test Ultrasuoni", 0);
    brick.showString("Simulazione...", 2);
    
    // Simula letture del sensore
    for (let i = 0; i < 10; i++) {
        let distanza = Math.floor(Math.random() * 100);
        brick.showString("Distanza: " + distanza + " cm  ", 3);
        pause(500);
    }
    
    brick.showString("Test completato", 5);
    brick.showString("Premi un pulsante...", 7);
    
    waitAnyButton();
    visualizzaMenu();
}

function testColore() {
    brick.clearScreen();
    brick.showString("Test Colore", 0);
    brick.showString("Simulazione...", 2);
    
    // Simula letture del sensore
    let colori = ["Rosso", "Verde", "Blu", "Giallo", "Bianco", "Nero"];
    for (let i = 0; i < 10; i++) {
        let colore = colori[Math.floor(Math.random() * colori.length)];
        brick.showString("Colore: " + colore + "      ", 3);
        pause(500);
    }
    
    brick.showString("Test completato", 5);
    brick.showString("Premi un pulsante...", 7);
    
    waitAnyButton();
    visualizzaMenu();
}

function testTocco() {
    brick.clearScreen();
    brick.showString("Test Sensore Tocco", 0);
    brick.showString("Premi il sensore...", 2);
    
    // Simula il sensore di tocco
    let premuto = false;
    let contatore = 0;
    
    while (contatore < 5) {
        // Simula pressioni casuali
        if (Math.random() > 0.7 && !premuto) {
            premuto = true;
            contatore++;
            brick.showString("Pressione rilevata! " + contatore + "/5", 3);
            music.playTone(880, 100);
        } else {
            premuto = false;
        }
        
        pause(300);
    }
    
    brick.showString("Test completato", 5);
    brick.showString("Premi un pulsante...", 7);
    
    waitAnyButton();
    visualizzaMenu();
}

function impostaVolume(valore) {
    // Imposta il volume del sistema
    music.setVolume(valore);
    
    // Riproduci un suono di test con il nuovo volume
    if (!modificaParametro) {
        brick.clearScreen();
        brick.showString("Impostazione Volume", 0);
        brick.showString("Volume: " + valore + "%", 2);
        brick.showString("Riproduzione test...", 3);
        
        // Riproduci un suono di test
        music.playTone(440, 200);
        pause(300);
        music.playTone(880, 200);
        
        pause(1000);
        visualizzaMenu();
    }
}

function impostaLuminosita(valore) {
    if (!modificaParametro) {
        brick.clearScreen();
        brick.showString("Impostazione Luminosità", 0);
        brick.showString("Luminosità: " + valore + "%", 2);
        brick.showString("(Simulazione)", 3);
        
        // Simula il cambio di luminosità
        for (let i = 0; i < 5; i++) {
            brick.showString("Applicazione...", 5);
            pause(200);
            brick.showString("            ", 5);
            pause(200);
        }
        
        brick.showString("Luminosità impostata", 5);
        pause(1000);
        visualizzaMenu();
    }
}

function impostaVelocita(valore) {
    if (!modificaParametro) {
        brick.clearScreen();
        brick.showString("Impostazione Velocità", 0);
        brick.showString("Velocità: " + valore + "%", 2);
        
        // Simula il motore a diverse velocità
        brick.showString("Motori in movimento...", 3);
        
        // Visualizza una barra proporzionale alla velocità
        brick.drawRect(10, 40, 100, 10);
        brick.fillRect(10, 40, valore, 10);
        
        pause(2000);
        visualizzaMenu();
    }
}

// Funzione per simulare l'esecuzione di un programma
function simulaEsecuzioneProgramma(nomeProgramma) {
    brick.clearScreen();
    brick.showString("Avvio: " + nomeProgramma, 0);
    
    // Mostra una barra di progresso
    for (let i = 0; i <= 100; i += 10) {
        brick.showString("Caricamento: " + i + "%", 2);
        
        // Disegna la barra di progresso
        brick.drawRect(10, 30, 100, 10);
        brick.fillRect(10, 30, i, 10);
        
        pause(100);
    }
    
    brick.showString("Programma in esecuzione", 4);
    brick.showString("Premi EXIT per terminare", 6);
    
    // Attendi che l'utente prema il pulsante EXIT
    while (!brick.buttonExit.wasPressed()) {
        pause(50);
    }
    
    brick.showString("Terminazione...", 4);
    pause(1000);
    
    visualizzaMenu();
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

// Loop principale del menu
visualizzaMenu();

while (true) {
    if (!modificaParametro) {
        // Modalità navigazione
        if (brick.buttonUp.wasPressed() && selezioneAttuale > 0) {
            selezioneAttuale--;
            visualizzaMenu();
        }
        
        if (brick.buttonDown.wasPressed() && selezioneAttuale < menuAttuale.opzioni.length - 1) {
            selezioneAttuale++;
            visualizzaMenu();
        }
        
        if (brick.buttonEnter.wasPressed() || brick.buttonRight.wasPressed()) {
            gestisciSelezione();
        }
        
        if (brick.buttonExit.wasPressed() && menuPrecedente) {
            menuAttuale = menuPrecedente;
            menuPrecedente = menuPrincipale; // Semplificazione
            selezioneAttuale = 0;
            visualizzaMenu();
            // Feedback sonoro
            music.playTone(330, 100);
        }
    } else {
        // Modalità modifica parametro
        if (brick.buttonRight.wasPressed()) {
            modificaValore(5);
        }
        
        if (brick.buttonLeft.wasPressed()) {
            modificaValore(-5);
        }
        
        if (brick.buttonEnter.wasPressed() || brick.buttonExit.wasPressed()) {
            // Esci dalla modalità modifica
            modificaParametro = false;
            visualizzaMenu();
            // Feedback sonoro
            music.playTone(660, 100);
        }
    }
    
    pause(50);
}