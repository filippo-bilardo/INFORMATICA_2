/**
 * Esempio di interfaccia utente completa per EV3
 * Questo esempio mostra come creare un'applicazione con un'interfaccia
 * utente completa che integra menu, dashboard e controlli
 */

// Configurazione dell'applicazione
let configurazione = {
    nomeRobot: "EV3-Explorer",
    velocitaMax: 75,
    sensibilita: 3,
    volume: 50,
    modalitaRisparmioEnergia: false,
    tempoAutoSpegnimento: 300 // secondi
};

// Stato del sistema
let statoSistema = {
    batteria: 85, // percentuale
    modalitaAttuale: "Standby", // Standby, Esplorazione, SeguiLinea, Telecomando
    distanzaRilevata: 0,
    coloreRilevato: "Nessuno",
    velocitaAttuale: 0,
    tempoAttivita: 0,
    errori: []
};

// Simulazione sensori
function aggiornaSensori() {
    // Simula lettura sensore di distanza
    statoSistema.distanzaRilevata = Math.floor(Math.random() * 100);
    
    // Simula lettura sensore di colore
    let colori = ["Rosso", "Verde", "Blu", "Giallo", "Bianco", "Nero", "Nessuno"];
    statoSistema.coloreRilevato = colori[Math.floor(Math.random() * colori.length)];
    
    // Simula consumo batteria
    if (control.millis() % 30000 === 0 && statoSistema.batteria > 0) {
        statoSistema.batteria -= 1;
    }
    
    // Aggiorna tempo attività
    statoSistema.tempoAttivita = Math.floor(control.millis() / 1000);
}

// Funzione per mostrare la dashboard principale
function mostraDashboard() {
    brick.clearScreen();
    
    // Intestazione
    brick.showString(configurazione.nomeRobot, 0);
    
    // Informazioni di stato
    brick.showString("Batt: " + statoSistema.batteria + "%", 1);
    brick.showString("Modo: " + statoSistema.modalitaAttuale, 2);
    brick.showString("Dist: " + statoSistema.distanzaRilevata + " cm", 3);
    brick.showString("Col: " + statoSistema.coloreRilevato, 4);
    brick.showString("Vel: " + statoSistema.velocitaAttuale + "%", 5);
    
    // Tempo attività
    let minuti = Math.floor(statoSistema.tempoAttivita / 60);
    let secondi = statoSistema.tempoAttivita % 60;
    brick.showString("Attivo: " + minuti + "m " + secondi + "s", 6);
    
    // Istruzioni
    brick.showString("ENTER: Menu", 7);
    
    // Aggiorna LED in base allo stato della batteria
    if (statoSistema.batteria < 20) {
        brick.setStatusLight(StatusLight.RedFlash);
    } else if (statoSistema.batteria < 50) {
        brick.setStatusLight(StatusLight.Orange);
    } else {
        brick.setStatusLight(StatusLight.Green);
    }
}

// Sistema di menu
let menuPrincipale = {
    titolo: "Menu Principale",
    opzioni: [
        { nome: "Modalità", tipo: "sottomenu", riferimento: "menuModalita" },
        { nome: "Impostazioni", tipo: "sottomenu", riferimento: "menuImpostazioni" },
        { nome: "Diagnostica", tipo: "sottomenu", riferimento: "menuDiagnostica" },
        { nome: "Info Sistema", tipo: "azione", azione: mostraInfoSistema },
        { nome: "Torna a Dashboard", tipo: "indietro" }
    ]
};

let menuModalita = {
    titolo: "Seleziona Modalità",
    opzioni: [
        { nome: "Standby", tipo: "azione", azione: () => impostaModalita("Standby") },
        { nome: "Esplorazione", tipo: "azione", azione: () => impostaModalita("Esplorazione") },
        { nome: "Segui Linea", tipo: "azione", azione: () => impostaModalita("SeguilLinea") },
        { nome: "Telecomando", tipo: "azione", azione: () => impostaModalita("Telecomando") },
        { nome: "Indietro", tipo: "indietro" }
    ]
};

let menuImpostazioni = {
    titolo: "Impostazioni",
    opzioni: [
        { nome: "Nome Robot", tipo: "azione", azione: impostaNomeRobot },
        { nome: "Velocità Max", tipo: "parametro", azione: impostaVelocitaMax, valore: configurazione.velocitaMax },
        { nome: "Sensibilità", tipo: "parametro", azione: impostaSensibilita, valore: configurazione.sensibilita },
        { nome: "Volume", tipo: "parametro", azione: impostaVolume, valore: configurazione.volume },
        { nome: "Risparmio Energia", tipo: "toggle", azione: toggleRisparmioEnergia, valore: configurazione.modalitaRisparmioEnergia },
        { nome: "Indietro", tipo: "indietro" }
    ]
};

let menuDiagnostica = {
    titolo: "Diagnostica",
    opzioni: [
        { nome: "Test Motori", tipo: "azione", azione: testMotori },
        { nome: "Test Sensori", tipo: "azione", azione: testSensori },
        { nome: "Test Display", tipo: "azione", azione: testDisplay },
        { nome: "Test Audio", tipo: "azione", azione: testAudio },
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
    brick.showString(menuAttuale.titolo, 0);
    
    for (let i = 0; i < menuAttuale.opzioni.length; i++) {
        // Evidenzia l'opzione selezionata
        let prefisso = (i === selezioneAttuale) ? "> " : "  ";
        let opzione = menuAttuale.opzioni[i];
        
        // Mostra il valore per i parametri e toggle
        if (opzione.tipo === "parametro") {
            brick.showString(prefisso + opzione.nome + ": " + opzione.valore, i + 1);
        } else if (opzione.tipo === "toggle") {
            brick.showString(prefisso + opzione.nome + ": " + (opzione.valore ? "ON" : "OFF"), i + 1);
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

// Funzione per gestire la selezione nel menu
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
        // Torna al menu precedente o alla dashboard
        if (menuPrecedente) {
            menuAttuale = menuPrecedente;
            menuPrecedente = menuPrincipale; // Semplificazione
            selezioneAttuale = 0;
            visualizzaMenu();
            // Feedback sonoro
            music.playTone(330, 100);
        } else {
            // Torna alla dashboard
            return "dashboard";
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
    } else if (opzioneSelezionata.tipo === "toggle") {
        // Cambia il valore del toggle
        opzioneSelezionata.valore = !opzioneSelezionata.valore;
        opzioneSelezionata.azione(opzioneSelezionata.valore);
        visualizzaMenu();
        // Feedback sonoro
        music.playTone(opzioneSelezionata.valore ? 880 : 440, 100);
    }
    
    return "menu";
}

// Funzione per modificare un parametro
function modificaValore(incremento) {
    let opzioneSelezionata = menuAttuale.opzioni[selezioneAttuale];
    
    if (opzioneSelezionata.tipo === "parametro") {
        // Calcola il nuovo valore
        let nuovoValore = opzioneSelezionata.valore + incremento;
        
        // Applica limiti appropriati
        if (opzioneSelezionata.nome === "Velocità Max") {
            nuovoValore = Math.max(0, Math.min(100, nuovoValore));
        } else if (opzioneSelezionata.nome === "Sensibilità") {
            nuovoValore = Math.max(1, Math.min(5, nuovoValore));
        } else if (opzioneSelezionata.nome === "Volume") {
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

// Funzioni per le azioni del menu
function mostraInfoSistema() {
    brick.clearScreen();
    brick.showString("Informazioni Sistema", 0);
    brick.showString("Nome: " + configurazione.nomeRobot, 1);
    brick.showString("Versione SW: 1.0", 2);
    brick.showString("Batteria: " + statoSistema.batteria + "%", 3);
    brick.showString("Tempo attività:", 4);
    
    let minuti = Math.floor(statoSistema.tempoAttivita / 60);
    let secondi = statoSistema.tempoAttivita % 60;
    brick.showString(minuti + " minuti " + secondi + " sec", 5);
    
    brick.showString("Premi un pulsante...", 7);
    waitAnyButton();
    visualizzaMenu();
}

function impostaModalita(modalita) {
    statoSistema.modalitaAttuale = modalita;
    
    brick.clearScreen();
    brick.showString("Modalità impostata:", 0);
    brick.showString(modalita, 2);
    
    // Feedback multimodale
    if (modalita === "Standby") {
        brick.setStatusLight(StatusLight.Green);
        statoSistema.velocitaAttuale = 0;
    } else if (modalita === "Esplorazione") {
        brick.setStatusLight(StatusLight.Orange);
        statoSistema.velocitaAttuale = Math.floor(configurazione.velocitaMax * 0.7);
    } else if (modalita === "SeguilLinea") {
        brick.setStatusLight(StatusLight.Green);
        statoSistema.velocitaAttuale = Math.floor(configurazione.velocitaMax * 0.5);
    } else if (modalita === "Telecomando") {
        brick.setStatusLight(StatusLight.Orange);
        statoSistema.velocitaAttuale = configurazione.velocitaMax;
    }
    
    // Feedback sonoro
    music.playTone(660, 100);
    pause(50);
    music.playTone(880, 200);
    
    pause(1500);
    visualizzaMenu();
}

function impostaNomeRobot() {
    // Simulazione di input del nome
    let nomi = ["EV3-Explorer", "RoboMaster", "LegoBot", "MindBot", "NaviBot"];
    let indiceNome = nomi.indexOf(configurazione.nomeRobot);
    indiceNome = (indiceNome + 1) % nomi.length;
    configurazione.nomeRobot = nomi[indiceNome];
    
    brick.clearScreen();
    brick.showString("Nome Robot:", 0);
    brick.showString(configurazione.nomeRobot, 2);
    brick.showString("(Simulazione input)", 4);
    
    // Feedback sonoro
    music.playTone(880, 100);
    
    pause(1500);
    visualizzaMenu();
}

function impostaVelocitaMax(valore) {
    configurazione.velocitaMax = valore;
    
    if (!modificaParametro) {
        brick.clearScreen();
        brick.showString("Velocità Massima", 0);
        brick.showString("Impostata a: " + valore + "%", 2);
        
        // Visualizza una barra proporzionale alla velocità
        brick.drawRect(10, 40, 100, 10);
        brick.fillRect(10, 40, valore, 10);
        
        pause(1500);
        visualizzaMenu();
    }
}

function impostaSensibilita(valore) {
    configurazione.sensibilita = valore;
    
    if (!modificaParametro) {
        brick.clearScreen();
        brick.showString("Sensibilità", 0);
        brick.showString("Impostata a: " + valore, 2);
        
        // Visualizza livello sensibilità
        brick.showString("Livello:", 4);
        for (let i = 1; i <= 5; i++) {
            if (i <= valore) {
                brick.showString("█", 5, (i - 1) * 3);
            } else {
                brick.showString("░", 5, (i - 1) * 3);
            }
        }
        
        pause(1500);
        visualizzaMenu();
    }
}

function impostaVolume(valore) {
    configurazione.volume = valore;
    music.setVolume(valore);
    
    if (!modificaParametro) {
        brick.clearScreen();
        brick.showString("Volume", 0);
        brick.showString("Impostato a: " + valore + "%", 2);
        
        // Riproduci un suono di test
        music.playTone(440, 200);
        pause(300);
        music.playTone(880, 200);
        
        pause(1000);
        visualizzaMenu();
    }
}

function toggleRisparmioEnergia(valore) {
    configurazione.modalitaRisparmioEnergia = valore;
    
    brick.clearScreen();
    brick.showString("Risparmio Energia", 0);
    brick.showString(valore ? "Attivato" : "Disattivato", 2);
    
    if (valore) {
        brick.showString("Auto-spegnimento:", 4);
        brick.showString(configurazione.tempoAutoSpegnimento + " sec", 5);
    }
    
    pause(1500);
    visualizzaMenu();
}

function testMotori() {
    brick.clearScreen();
    brick.showString("Test Motori", 0);
    brick.showString("Simulazione...", 2);
    
    // Simula test motori
    for (let i = 0; i < 3; i++) {
        brick.showString("Test motore " + (i + 1), 3);
        
        // Barra di progresso
        for (let j = 0; j <= 100; j += 10) {
            brick.fillRect(0, 40, 178, 10, 0); // Pulisci l'area
            brick.drawRect(10, 40, 100, 10);
            brick.fillRect(10, 40, j, 10);
            pause(50);
        }
        
        brick.showString("OK", 3, 15);
        music.playTone(880, 100);
        pause(500);
    }
    
    brick.showString("Test completato", 5);
    brick.showString("Tutti i motori OK", 6);
    pause(2000);
    visualizzaMenu();
}

function testSensori() {
    brick.clearScreen();
    brick.showString("Test Sensori", 0);
    
    // Simula test sensori
    let sensori = ["Ultrasuoni", "Colore", "Tocco", "Giroscopio"];
    let risultati = ["OK", "OK", "OK", "OK"];
    
    for (let i = 0; i < sensori.length; i++) {
        brick.showString("Test " + sensori[i], 2);
        
        // Simula lettura
        for (let j = 0; j < 5; j++) {
            brick.showString("Lettura " + (j + 1), 3);
            pause(300);
        }
        
        brick.showString(sensori[i] + ": " + risultati[i], i + 3);
        music.playTone(risultati[i] === "OK" ? 880 : 220, 100);
        pause(500);
    }
    
    brick.showString("Test completato", 7);
    pause(2000);
    visualizzaMenu();
}

function testDisplay() {
    // Test pattern display
    let patterns = [
        () => {
            brick.clearScreen();
            brick.showString("Test Display", 0);
            brick.showString("Pattern 1: Testo", 1);
            for (let i = 2; i < 8; i++) {
                brick.showString("Riga " + i + " di test", i);
            }
        },
        () => {
            brick.clearScreen();
            brick.showString("Test Display", 0);
            brick.showString("Pattern 2: Linee", 1);
            for (let i = 0; i < 5; i++) {
                brick.drawLine(0, 20 + i * 10, 178, 20 + i * 10);
            }
        },
        () => {
            brick.clearScreen();
            brick.showString("Test Display", 0);
            brick.showString("Pattern 3: Rettangoli", 1);
            for (let i = 0; i < 3; i++) {
                brick.drawRect(20 + i * 40, 30, 30, 30);
            }
        },
        () => {
            brick.clearScreen();
            brick.showString("Test Display", 0);
            brick.showString("Pattern 4: Cerchi", 1);
            for (let i = 0; i < 3; i++) {
                brick.drawCircle(30 + i * 50, 50, 15);
            }
        },
        () => {
            brick.clearScreen();
            brick.showString("Test Display", 0);
            brick.showString("Pattern 5: Riempimento", 1);
            for (let i = 0; i < 3; i++) {
                brick.fillRect(20 + i * 50, 30, 30, 30);
            }
        }
    ];
    
    for (let i = 0; i < patterns.length; i++) {
        patterns[i]();
        brick.showString("Premi un pulsante...", 7);
        waitAnyButton();
    }
    
    visualizzaMenu();
}

function testAudio() {
    brick.clearScreen();
    brick.showString("Test Audio", 0);
    
    // Test toni
    brick.showString("Test 1: Toni", 2);
    let frequenze = [262, 294, 330, 349, 392, 440, 494, 523]; // Scala Do-Do
    
    for (let i = 0; i < frequenze.length; i++) {
        brick.showString("Tono " + (i + 1), 3);
        music.playTone(frequenze[i], 300);
        pause(100);
    }
    
    // Test melodia
    brick.showString("Test 2: Melodia", 4);
    pause(500);
    
    // Semplice melodia
    music.playTone(392, 200); // Sol
    pause(50);
    music.playTone(392, 200); // Sol
    pause(50);
    music.playTone(440, 200); // La
    pause(50);
    music.playTone(392, 200); // Sol
    pause(50);
    music.playTone(523, 200); // Do (ottava superiore)
    pause(50);
    music.playTone(494, 400); // Si
    
    brick.showString("Test completato", 6);
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

// Loop principale dell'applicazione
let modalitaInterfaccia = "dashboard";

// Inizializzazione
brick.clearScreen();
brick.showString("Avvio sistema...", 3);

// Barra di progresso
for (let i = 0; i <= 100; i += 5) {
    brick.fillRect(0, 40, 178, 10, 0); // Pulisci l'area
    brick.drawRect(10, 40, 100, 10);
    brick.fillRect(10, 40, i, 10);
    pause(30);
}

// Suono di avvio
music.playTone(440, 100);
pause(50);
music.playTone(880, 200);

// Loop principale
while (true) {
    // Aggiorna i dati dei sensori
    aggiornaSensori();
    
    if (modalitaInterfaccia === "dashboard") {
        // Mostra la dashboard
        mostraDashboard();
        
        // Controlla input utente
        if (brick.buttonEnter.wasPressed()) {
            // Passa alla modalità menu
            modalitaInterfaccia = "menu";
            menuAttuale = menuPrincipale;
            menuPrecedente = null;
            selezioneAttuale = 0;
            visualizzaMenu();
            // Feedback sonoro
            music.playTone(660, 100);
        }
    } else if (modalitaInterfaccia === "menu") {
        // Gestione menu
        if (!modificaParametro) {
            // Modalità navigazione
            if (brick.buttonUp.wasPressed() && selezioneAttuale > 0) {
                selezioneAttuale--;
                visualizzaMenu();
                // Feedback sonoro
                music.playTone(440, 50);
            }
            
            if (brick.buttonDown.wasPressed() && selezioneAttuale < menuAttuale.opzioni.length - 1) {
                selezioneAttuale++;
                visualizzaMenu();
                // Feedback sonoro
                music.playTone(440, 50);
            }
            
            if (brick.buttonEnter.wasPressed() || brick.buttonRight.wasPressed()) {
                let risultato = gestisciSelezione();
                if (risultato === "dashboard") {
                    modalitaInterfaccia = "dashboard";
                }
            }
            
            if (brick.buttonExit.wasPressed()) {
                if (menuPrecedente) {
                    menuAttuale = menuPrecedente;
                    menuPrecedente = menuPrincipale; // Semplificazione
                    selezioneAttuale = 0;
                    visualizzaMenu();
                    // Feedback sonoro
                    music.playTone(330, 100);
                } else {
                    // Torna alla dashboard
                    modalitaInterfaccia = "dashboard";
                    // Feedback sonoro
                    music.playTone(330, 100);
                }
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
    }
    
    // Piccola pausa per non sovraccaricare il processore
    pause(50);
}