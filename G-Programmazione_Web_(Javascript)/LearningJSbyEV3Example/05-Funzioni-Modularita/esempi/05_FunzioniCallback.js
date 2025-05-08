/**
 * File: 05_FunzioniCallback.js
 * Descrizione: Esempi di utilizzo delle funzioni di callback in JavaScript per EV3
 * Corso: Learning JavaScript by Lego EV3 Example
 */

// ==========================================
// ESEMPIO 1: Concetto Base delle Callback
// ==========================================

// Funzione che accetta una callback
function eseguiDopoPausa(millisecondi, callback) {
    brick.showString("Attendo...", 1);
    brick.showValue("Millisecondi", millisecondi, 2);
    
    // Esegue un'operazione (in questo caso, aspetta)
    pause(millisecondi);
    
    // Quindi esegue la callback
    brick.showString("Eseguo callback", 1);
    callback();
}

// Funzione da usare come callback
function azioneDiTest() {
    brick.showString("Azione completata!", 1);
    music.playTone(523, 500);  // Suona un Do per mezzo secondo
}

// ==========================================
// ESEMPIO 2: Callback con Parametri
// ==========================================

// Funzione che passa dati alla callback
function leggiSensoreEAnalizza(analizzatore) {
    brick.showString("Lettura sensore...", 1);
    
    // Legge il valore del sensore
    let distanza = sensors.ultrasonic4.distance();
    brick.showValue("Distanza", distanza, 2);
    
    // Passa il valore letto alla callback
    let risultatoAnalisi = analizzatore(distanza);
    
    // Utilizza il risultato
    brick.showString(`Analisi: ${risultatoAnalisi}`, 3);
    return risultatoAnalisi;
}

// Callback che analizza la distanza e restituisce un risultato
function analizzaDistanza(valore) {
    if (valore < 10) {
        return "Pericolo";
    } else if (valore < 30) {
        return "Attenzione";
    } else {
        return "Sicuro";
    }
}

// ==========================================
// ESEMPIO 3: Monitoraggio con Callback
// ==========================================

// Funzione che monitora un sensore e chiama diverse callback in base al valore
function monitoraSensoreDistanza(soglia, callbackSottoSoglia, callbackSopraSoglia) {
    brick.showString("Monitoraggio...", 1);
    brick.showValue("Soglia", soglia, 2);
    
    let contatore = 0;
    const MAX_ITERAZIONI = 10;
    
    // Ciclo di monitoraggio
    while (contatore < MAX_ITERAZIONI) {
        let distanza = sensors.ultrasonic4.distance();
        brick.showValue("Distanza", distanza, 3);
        
        if (distanza < soglia) {
            brick.showString("Sotto soglia", 4);
            callbackSottoSoglia(distanza);
        } else {
            brick.showString("Sopra soglia", 4);
            callbackSopraSoglia(distanza);
        }
        
        contatore++;
        pause(500);  // Piccola pausa tra le iterazioni
    }
    
    brick.showString("Monitoraggio completato", 4);
}

// Callback per quando la distanza è sotto la soglia
function azioneSottoSoglia(distanza) {
    motors.largeAB.stop();
    brick.setStatusLight(StatusLight.RedFlash);
}

// Callback per quando la distanza è sopra la soglia
function azioneSopraSoglia(distanza) {
    motors.largeAB.steer(0, 30);
    brick.setStatusLight(StatusLight.Green);
}

// ==========================================
// ESEMPIO 4: Sequenziamento di Azioni con Callback
// ==========================================

// Funzione che esegue una sequenza di callback in ordine
function eseguiSequenza(azioni) {
    brick.showString("Sequenza di azioni", 1);
    brick.showValue("Num azioni", azioni.length, 2);
    
    // Controlla se ci sono ancora azioni da eseguire
    if (azioni.length === 0) {
        brick.showString("Sequenza completata", 3);
        return;
    }
    
    // Funzione ricorsiva per eseguire le azioni
    function eseguiProssima(indice) {
        if (indice >= azioni.length) {
            brick.showString("Sequenza completata", 3);
            return;
        }
        
        brick.showValue("Azione", indice + 1, 3);
        
        // Esegue l'azione corrente e passa alla prossima come callback
        azioni[indice](function() {
            eseguiProssima(indice + 1);
        });
    }
    
    // Avvia l'esecuzione dalla prima azione
    eseguiProssima(0);
}

// Definizione di azioni per la sequenza
function avanza(next) {
    brick.showString("Avanzamento", 4);
    motors.largeAB.steer(0, 50);
    pause(1000);
    motors.largeAB.stop();
    pause(500);
    next();  // Chiama la callback per procedere alla prossima azione
}

function gira(next) {
    brick.showString("Rotazione", 4);
    motors.largeC.run(30, 1, MoveUnit.Rotations);
    pause(1000);
    next();  // Chiama la callback per procedere alla prossima azione
}

function suona(next) {
    brick.showString("Suono", 4);
    music.playTone(440, 500);
    pause(600);  // Aspetta un po' più del suono
    next();  // Chiama la callback per procedere alla prossima azione
}

// ==========================================
// ESEMPIO 5: Array Methods con Callback
// ==========================================

// Array di comandi per i movimenti del robot
let comandiMovimento = [
    { direzione: "avanti", durata: 1000 },
    { direzione: "sinistra", durata: 800 },
    { direzione: "avanti", durata: 1500 },
    { direzione: "destra", durata: 800 },
    { direzione: "avanti", durata: 1000 }
];

// Funzione che esegue i comandi utilizzando forEach
function eseguiComandiForEach() {
    brick.showString("forEach con callback", 1);
    
    comandiMovimento.forEach(function(comando, indice) {
        brick.showValue("Comando", indice + 1, 2);
        brick.showString(`Dir: ${comando.direzione}`, 3);
        brick.showValue("Durata", comando.durata, 4);
        
        if (comando.direzione === "avanti") {
            motors.largeAB.steer(0, 50);
            pause(comando.durata);
            motors.largeAB.stop();
        } else if (comando.direzione === "sinistra") {
            motors.largeC.run(-30, 1, MoveUnit.Rotations);
            pause(500);
        } else if (comando.direzione === "destra") {
            motors.largeC.run(30, 1, MoveUnit.Rotations);
            pause(500);
        }
        
        pause(300);  // Breve pausa tra i comandi
    });
}

// ==========================================
// ESEMPIO 6: Error-First Callbacks
// ==========================================

// Funzione che tenta di rilevare un oggetto di un colore specifico
function trovaColore(coloreTarget, callback) {
    brick.showString("Ricerca colore...", 1);
    brick.showValue("Colore target", coloreTarget, 2);
    
    let tentativi = 0;
    const MAX_TENTATIVI = 5;
    
    // Funzione ricorsiva che cerca il colore
    function tenta() {
        tentativi++;
        brick.showValue("Tentativo", tentativi, 3);
        
        let coloreRilevato = sensors.color1.color();
        brick.showValue("Colore rilevato", coloreRilevato, 4);
        
        if (coloreRilevato === coloreTarget) {
            // Successo: chiama la callback senza errore
            callback(null, coloreRilevato);
        } else if (tentativi >= MAX_TENTATIVI) {
            // Fallimento dopo troppi tentativi
            callback(new Error("Colore non trovato"), null);
        } else {
            // Continua a cercare
            motors.largeAB.steer(0, 20);
            pause(1000);
            motors.largeAB.stop();
            tenta();  // Chiamata ricorsiva
        }
    }
    
    tenta();  // Avvia la ricerca
}

// ==========================================
// ESEMPIO 7: Middleware Pattern
// ==========================================

// Funzione che crea un sistema middleware
function creaControllerRobot() {
    let middleware = [];
    
    // Oggetto controller
    let controller = {
        // Funzione per aggiungere un middleware
        usa: function(fn) {
            middleware.push(fn);
            return this;  // Ritorna l'oggetto controller per permettere il concatenamento
        },
        
        // Funzione per eseguire la catena di middleware
        esegui: function(contesto) {
            brick.showString("Eseguo middleware", 1);
            let indice = 0;
            
            // Funzione next che chiama il prossimo middleware
            function next() {
                if (indice < middleware.length) {
                    brick.showValue("Middleware", indice + 1, 2);
                    let currentMiddleware = middleware[indice];
                    indice++;
                    currentMiddleware(contesto, next);
                } else {
                    brick.showString("Middleware completato", 2);
                }
            }
            
            // Avvia la catena
            next();
        }
    };
    
    return controller;
}

// Middleware per il controllo della batteria
function controllaLivelloBatteria(ctx, next) {
    ctx.batteria = brick.batteryLevel();
    brick.showValue("Batteria", ctx.batteria, 3);
    
    if (ctx.batteria < 20) {
        brick.showString("Batteria bassa!", 4);
    }
    
    next();  // Passa al prossimo middleware
}

// Middleware per il controllo degli ostacoli
function controllaOstacoli(ctx, next) {
    ctx.distanza = sensors.ultrasonic4.distance();
    brick.showValue("Distanza", ctx.distanza, 5);
    
    if (ctx.distanza < 15) {
        ctx.ostacolo = true;
        brick.showString("Ostacolo rilevato", 6);
    }
    
    next();  // Passa al prossimo middleware
}

// Middleware per il movimento
function gestisciMovimento(ctx, next) {
    if (ctx.ostacolo) {
        // Evita l'ostacolo
        brick.showString("Evito ostacolo", 7);
        motors.largeAB.steer(-50, 30);
        pause(1000);
    } else {
        // Movimento normale
        brick.showString("Movimento normale", 7);
        motors.largeAB.steer(0, 40);
        pause(1000);
    }
    
    motors.largeAB.stop();
    next();  // Passa al prossimo middleware
}

// ==========================================
// ESEMPIO 8: Gestione del Callback Hell
// ==========================================

// Esempio di callback hell (da evitare)
function esempioCallbackHell() {
    brick.showString("Callback Hell (da evitare)", 1);
    
    motors.largeAB.steer(0, 50);
    pause(1000);
    motors.largeAB.stop();
    
    // Callback hell - difficile da leggere e mantenere
    setTimeout(function() {
        brick.showString("Prima azione", 2);
        motors.largeC.run(30, 1, MoveUnit.Rotations);
        
        setTimeout(function() {
            brick.showString("Seconda azione", 2);
            motors.largeAB.steer(0, 50);
            
            setTimeout(function() {
                brick.showString("Terza azione", 2);
                motors.largeAB.stop();
                
                setTimeout(function() {
                    brick.showString("Quarta azione", 2);
                    motors.largeC.run(-30, 1, MoveUnit.Rotations);
                    
                    setTimeout(function() {
                        brick.showString("Completato", 2);
                        music.playTone(440, 500);
                    }, 1000);
                }, 1000);
            }, 1500);
        }, 1000);
    }, 1000);
}

// Soluzione: funzioni nominate
function esempioFunzioniNominate() {
    brick.showString("Funzioni nominate", 1);
    
    // Avvia la sequenza
    primaAzione();
}

function primaAzione() {
    brick.showString("Prima azione", 2);
    motors.largeAB.steer(0, 50);
    pause(1000);
    secondaAzione();
}

function secondaAzione() {
    brick.showString("Seconda azione", 2);
    motors.largeC.run(30, 1, MoveUnit.Rotations);
    pause(1000);
    terzaAzione();
}

function terzaAzione() {
    brick.showString("Terza azione", 2);
    motors.largeAB.stop();
    pause(1000);
    azioneFinaleFunzioni();
}

function azioneFinaleFunzioni() {
    brick.showString("Completato", 2);
    music.playTone(440, 500);
}

// Soluzione alternativa: composizione di funzioni
function creaSequenzaAzioni(...azioni) {
    brick.showString("Composizione funzioni", 1);
    
    return function esegui() {
        let indiceCorrente = 0;
        
        function next() {
            if (indiceCorrente < azioni.length) {
                brick.showValue("Passo", indiceCorrente + 1, 2);
                let azioneCorrente = azioni[indiceCorrente];
                indiceCorrente++;
                azioneCorrente(next);
            } else {
                brick.showString("Sequenza completata", 2);
            }
        }
        
        next();  // Avvia la sequenza
    };
}

// Azioni atomiche per la composizione
function avantiBreve(next) {
    motors.largeAB.steer(0, 50);
    pause(1000);
    motors.largeAB.stop();
    next();
}

function avantiLungo(next) {
    motors.largeAB.steer(0, 50);
    pause(2000);
    motors.largeAB.stop();
    next();
}

function giraDestra(next) {
    motors.largeC.run(30, 1, MoveUnit.Rotations);
    pause(1000);
    next();
}

function giraSinistra(next) {
    motors.largeC.run(-30, 1, MoveUnit.Rotations);
    pause(1000);
    next();
}

function suonaBeep(next) {
    music.playTone(440, 500);
    pause(600);
    next();
}

// ==========================================
// FUNZIONE PRINCIPALE
// ==========================================

function main() {
    brick.showString("Demo callback functions", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Demo 1: Concetto Base delle Callback
    brick.showString("Demo 1: Callback base", 1);
    eseguiDopoPausa(2000, azioneDiTest);
    pause(1000);
    
    // Demo 2: Callback con Parametri
    brick.showString("Demo 2: Callback con param", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    let risultatoAnalisi = leggiSensoreEAnalizza(analizzaDistanza);
    
    // Azione basata sul risultato
    if (risultatoAnalisi === "Pericolo") {
        brick.setStatusLight(StatusLight.RedFlash);
        music.playTone(880, 500);  // Tono acuto di allarme
    } else if (risultatoAnalisi === "Attenzione") {
        brick.setStatusLight(StatusLight.OrangeFlash);
    } else {
        brick.setStatusLight(StatusLight.Green);
    }
    
    pause(2000);
    brick.setStatusLight(StatusLight.Off);
    
    // Demo 3: Monitoraggio con Callback
    brick.showString("Demo 3: Monitoraggio", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    monitoraSensoreDistanza(20, azioneSottoSoglia, azioneSopraSoglia);
    motors.largeAB.stop();
    brick.setStatusLight(StatusLight.Off);
    pause(1000);
    
    // Demo 4: Sequenziamento di Azioni
    brick.showString("Demo 4: Sequenziamento", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    eseguiSequenza([avanza, gira, avanza, suona, gira]);
    pause(1000);
    
    // Demo 5: Array Methods con Callback
    brick.showString("Demo 5: Array Methods", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    eseguiComandiForEach();
    pause(1000);
    
    // Demo 6: Error-First Callbacks
    brick.showString("Demo 6: Error-First", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    trovaColore(Color.Blue, function(errore, risultato) {
        if (errore) {
            brick.showString("Errore: " + errore.message, 5);
            music.playTone(262, 500);  // Tono di errore
        } else {
            brick.showString("Colore trovato!", 5);
            brick.setStatusLight(StatusLight.Green);
            music.playTone(523, 500);  // Tono di successo
        }
    });
    
    pause(1000);
    brick.setStatusLight(StatusLight.Off);
    
    // Demo 7: Middleware Pattern
    brick.showString("Demo 7: Middleware", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    let robotController = creaControllerRobot();
    
    // Configurazione e esecuzione dei middleware
    robotController
        .usa(controllaLivelloBatteria)
        .usa(controllaOstacoli)
        .usa(gestisciMovimento);
    
    // Esegui la catena di middleware con un contesto condiviso
    robotController.esegui({});
    pause(2000);
    
    // Demo 8: Gestione del Callback Hell
    brick.showString("Demo 8: Callback Hell", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Nota: Il callback hell è mostrato solo come esempio negativo
    // Useremo le funzioni nominate e la composizione invece
    
    // Approccio con funzioni nominate
    esempioFunzioniNominate();
    pause(2000);
    
    // Approccio con composizione di funzioni
    brick.showString("Composizione funzioni", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Crea una sequenza con composizione di funzioni
    let percorsoComplesso = creaSequenzaAzioni(
        avantiBreve,
        giraDestra,
        avantiLungo,
        giraSinistra,
        avantiBreve,
        suonaBeep
    );
    
    // Esegue la sequenza
    percorsoComplesso();
    
    // Conclusione
    pause(1000);
    brick.clearScreen();
    brick.showString("Demo completata!", 1);
}

// Avvia il programma principale
main();