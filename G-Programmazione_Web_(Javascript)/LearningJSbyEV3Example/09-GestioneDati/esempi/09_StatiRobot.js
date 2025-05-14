// Esempio 09: Stati del Robot con Oggetti
// Descrizione: Come utilizzare oggetti JavaScript per implementare
// un sistema di gestione degli stati del robot.

// Pulisci il display per iniziare
brick.clearScreen();
brick.showString("Stati del Robot", 1);
brick.showString("con Oggetti", 2);
pause(2000);

// Definiamo gli stati possibili del robot come oggetti
const statiRobot = {
    // Stato iniziale all'avvio
    INATTIVO: {
        nome: "Inattivo",
        coloreIndicatore: StatusLight.Off,
        velocitaMotori: 0,
        comportamento: function() {
            // Cosa fa il robot in questo stato
            motors.largeBC.stop();
            brick.showString("Stato: Inattivo", 1);
            brick.showString("In attesa...", 2);
        },
        transizioniPossibili: ["ESPLORAZIONE", "INSEGUIMENTO", "EVITAMENTO"]
    },
    
    // Stato di esplorazione casuale dell'ambiente
    ESPLORAZIONE: {
        nome: "Esplorazione",
        coloreIndicatore: StatusLight.Green,
        velocitaMotori: 40,
        comportamento: function() {
            brick.showString("Stato: Esplorazione", 1);
            brick.showString("Esploro l'ambiente", 2);
            
            // Muovi avanti per un po'
            motors.largeBC.setSpeed(this.velocitaMotori);
            motors.largeBC.run();
            pause(1000);
            
            // Cambia direzione casualmente
            if (Math.random() > 0.7) {
                brick.showString("Cambio direzione", 3);
                // Gira a destra o sinistra casualmente
                if (Math.random() > 0.5) {
                    motors.largeB.setSpeed(this.velocitaMotori);
                    motors.largeC.setSpeed(-this.velocitaMotori);
                } else {
                    motors.largeB.setSpeed(-this.velocitaMotori);
                    motors.largeC.setSpeed(this.velocitaMotori);
                }
                motors.largeBC.run();
                pause(500);
            }
        },
        transizioniPossibili: ["INATTIVO", "INSEGUIMENTO", "EVITAMENTO"]
    },
    
    // Stato di inseguimento di un obiettivo
    INSEGUIMENTO: {
        nome: "Inseguimento",
        coloreIndicatore: StatusLight.Orange,
        velocitaMotori: 75,
        comportamento: function() {
            brick.showString("Stato: Inseguimento", 1);
            brick.showString("Inseguo obiettivo", 2);
            
            // Simula l'inseguimento di un oggetto
            motors.largeBC.setSpeed(this.velocitaMotori);
            motors.largeBC.run();
            pause(800);
            
            // Simula correzioni di rotta casuali
            if (Math.random() > 0.5) {
                // Correzione leggera a destra
                motors.largeB.setSpeed(this.velocitaMotori);
                motors.largeC.setSpeed(this.velocitaMotori * 0.7);
            } else {
                // Correzione leggera a sinistra
                motors.largeB.setSpeed(this.velocitaMotori * 0.7);
                motors.largeC.setSpeed(this.velocitaMotori);
            }
            motors.largeBC.run();
            pause(300);
        },
        transizioniPossibili: ["INATTIVO", "ESPLORAZIONE", "EVITAMENTO"]
    },
    
    // Stato di evitamento ostacoli
    EVITAMENTO: {
        nome: "Evitamento",
        coloreIndicatore: StatusLight.Red,
        velocitaMotori: 30,
        comportamento: function() {
            brick.showString("Stato: Evitamento", 1);
            brick.showString("Evito ostacolo", 2);
            
            // Ferma il robot brevemente
            motors.largeBC.stop();
            pause(300);
            
            // Retromarcia
            motors.largeBC.setSpeed(-this.velocitaMotori);
            motors.largeBC.run();
            pause(700);
            motors.largeBC.stop();
            pause(200);
            
            // Gira per evitare l'ostacolo (sempre a sinistra in questo esempio)
            motors.largeB.setSpeed(-this.velocitaMotori);
            motors.largeC.setSpeed(this.velocitaMotori);
            motors.largeBC.run();
            pause(800);
            motors.largeBC.stop();
        },
        transizioniPossibili: ["INATTIVO", "ESPLORAZIONE"]
    }
};

// Variabile per tenere traccia dello stato corrente
let statoCorrenteNome = "INATTIVO";

// Funzione per cambiare lo stato del robot
function cambiaStato(nuovoStatoNome) {
    // Verifica se lo stato esiste
    if (!statiRobot[nuovoStatoNome]) {
        brick.showString("Errore: stato", 1);
        brick.showString("non esistente!", 2);
        return false;
    }
    
    // Verifica se la transizione è consentita
    const statoCorrente = statiRobot[statoCorrenteNome];
    if (!statoCorrente.transizioniPossibili.includes(nuovoStatoNome)) {
        brick.showString("Errore: transizione", 1);
        brick.showString("non consentita!", 2);
        return false;
    }
    
    // Aggiorna lo stato corrente
    statoCorrenteNome = nuovoStatoNome;
    const nuovoStato = statiRobot[nuovoStatoNome];
    
    // Visualizza il cambio di stato
    brick.clearScreen();
    brick.showString("Cambio di stato:", 1);
    brick.showString(statoCorrente.nome + " -> " + nuovoStato.nome, 2);
    
    // Applica il nuovo colore dell'indicatore
    brick.setStatusLight(nuovoStato.coloreIndicatore);
    
    // Piccola pausa per visualizzare il cambio di stato
    music.playTone(880, 200);
    pause(800);
    
    return true;
}

// Funzione per eseguire il comportamento dello stato corrente
function eseguiStatoCorrente() {
    const stato = statiRobot[statoCorrenteNome];
    brick.clearScreen();
    stato.comportamento();
}

// Funzione per simulare eventi esterni che potrebbero causare transizioni di stato
function simulaEvento() {
    const evento = Math.random();
    const statoCorrente = statiRobot[statoCorrenteNome];
    
    brick.clearScreen();
    brick.showString("Evento esterno", 1);
    
    // Seleziona casualmente uno stato valido per la transizione
    if (evento < 0.3 && statoCorrente.transizioniPossibili.length > 0) {
        const indiceStatoDestinazione = Math.floor(Math.random() * statoCorrente.transizioniPossibili.length);
        const nuovoStatoNome = statoCorrente.transizioniPossibili[indiceStatoDestinazione];
        
        brick.showString("Cambio stato a:", 2);
        brick.showString(nuovoStatoNome, 3);
        pause(1000);
        
        cambiaStato(nuovoStatoNome);
    } else {
        brick.showString("Nessun cambio", 2);
        pause(500);
    }
}

// Dimostra l'utilizzo degli stati
brick.clearScreen();
brick.showString("Dimostrazione", 1);
brick.showString("Stati del Robot", 2);
pause(2000);

// Imposta lo stato iniziale
brick.clearScreen();
brick.showString("Stato iniziale:", 1);
brick.showString(statiRobot[statoCorrenteNome].nome, 2);
brick.setStatusLight(statiRobot[statoCorrenteNome].coloreIndicatore);
pause(2000);

// Simula alcuni cicli di esecuzione e cambi di stato
for (let ciclo = 0; ciclo < 10; ciclo++) {
    brick.clearScreen();
    brick.showString("Ciclo: " + (ciclo + 1) + "/10", 1);
    pause(500);
    
    // Esegui il comportamento dello stato corrente
    eseguiStatoCorrente();
    pause(1000);
    
    // Simula un possibile evento esterno che potrebbe causare un cambio di stato
    simulaEvento();
    pause(1000);
}

// Torna allo stato inattivo alla fine
cambiaStato("INATTIVO");
eseguiStatoCorrente();

// Conclusione demo
brick.clearScreen();
brick.showString("Gestione stati", 1);
brick.showString("con oggetti", 2);
brick.showString("completata!", 3);
music.playSoundEffect(SoundEffect.Success);
pause(2000);

// Spegni l'indicatore alla fine
brick.setStatusLight(StatusLight.Off);
brick.clearScreen();
