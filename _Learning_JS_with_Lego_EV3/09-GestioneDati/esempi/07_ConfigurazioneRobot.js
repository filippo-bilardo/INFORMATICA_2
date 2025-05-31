// Esempio 07: Configurazione Robot con Oggetti
// Descrizione: Come utilizzare oggetti JavaScript per memorizzare e gestire
// diverse configurazioni e stati del robot EV3.

// Pulisci il display per iniziare
brick.clearScreen();
brick.showString("Configurazione Robot", 1);
brick.showString("con Oggetti", 2);
pause(2000);

// Definiamo diverse configurazioni del robot come oggetti
const configurazioniRobot = {
    // Modalità normale - bilanciamento tra velocità e precisione
    normale: {
        velocitaMax: 50,
        accelerazione: 20,
        distanzaArresto: 5,
        sensibilitaSensori: 0.7,
        volumeSuoni: 75,
        modalitaEnergia: "bilanciata",
        coloreIndicatore: StatusLight.Green
    },
    
    // Modalità veloce - privilegia la velocità a scapito della precisione
    veloce: {
        velocitaMax: 90,
        accelerazione: 40,
        distanzaArresto: 10,
        sensibilitaSensori: 0.5,
        volumeSuoni: 100,
        modalitaEnergia: "prestazioni",
        coloreIndicatore: StatusLight.Orange
    },
    
    // Modalità precisa - massima precisione nei movimenti
    precisa: {
        velocitaMax: 30,
        accelerazione: 10,
        distanzaArresto: 2,
        sensibilitaSensori: 0.9,
        volumeSuoni: 50,
        modalitaEnergia: "efficienza",
        coloreIndicatore: StatusLight.Blue
    },
    
    // Modalità silenziosa - ideale per ambienti che richiedono silenzio
    silenziosa: {
        velocitaMax: 40,
        accelerazione: 15,
        distanzaArresto: 3,
        sensibilitaSensori: 0.8,
        volumeSuoni: 10,
        modalitaEnergia: "efficienza",
        coloreIndicatore: StatusLight.Off
    }
};

// Variabile per tenere traccia della configurazione attuale
let configurazioneAttuale = "normale";

// Funzione per applicare una configurazione al robot
function applicaConfigurazione(nomeConfigurazione) {
    // Verifichiamo che la configurazione esista
    if (!configurazioniRobot[nomeConfigurazione]) {
        brick.showString("Errore: configurazione", 1);
        brick.showString("non trovata!", 2);
        return false;
    }
    
    // Ottieni l'oggetto configurazione
    const config = configurazioniRobot[nomeConfigurazione];
    configurazioneAttuale = nomeConfigurazione;
    
    // Applica le impostazioni al robot
    brick.clearScreen();
    brick.showString("Applico config:", 1);
    brick.showString(nomeConfigurazione, 2);
    
    // Imposta la velocità massima dei motori
    motors.largeBC.setSpeed(config.velocitaMax);
    
    // Imposta il colore dell'indicatore di stato
    brick.setStatusLight(config.coloreIndicatore);
    
    // Imposta il volume audio
    music.setVolume(config.volumeSuoni);
    
    // Simula l'applicazione di altre impostazioni
    pause(1000);
    
    // Feedback sonoro di conferma
    if (config.volumeSuoni > 0) {
        music.playTone(440, 200);
    }
    
    return true;
}

// Funzione per visualizzare i dettagli della configurazione
function mostraDettagliConfigurazione(nomeConfigurazione) {
    // Verifichiamo che la configurazione esista
    if (!configurazioniRobot[nomeConfigurazione]) {
        return;
    }
    
    const config = configurazioniRobot[nomeConfigurazione];
    brick.clearScreen();
    brick.showString("Config: " + nomeConfigurazione, 1);
    
    // Mostra i principali parametri
    brick.showString("Vel max: " + config.velocitaMax, 2);
    brick.showString("Accel: " + config.accelerazione, 3);
    brick.showString("Vol: " + config.volumeSuoni + "%", 4);
    brick.showString("Energia: " + config.modalitaEnergia, 5);
    
    pause(3000);
}

// Dimostra come accedere e modificare proprietà degli oggetti
function personalizzaConfigurazione(nomeConfigurazione, modifiche) {
    // Verifichiamo che la configurazione esista
    if (!configurazioniRobot[nomeConfigurazione]) {
        return false;
    }
    
    brick.clearScreen();
    brick.showString("Modifico config:", 1);
    brick.showString(nomeConfigurazione, 2);
    
    // Applica le modifiche
    for (const proprieta in modifiche) {
        if (configurazioniRobot[nomeConfigurazione].hasOwnProperty(proprieta)) {
            configurazioniRobot[nomeConfigurazione][proprieta] = modifiche[proprieta];
            
            // Mostra quale proprietà è stata modificata
            brick.showString("- " + proprieta, 3);
            pause(500);
        }
    }
    
    // Se la configurazione corrente è quella modificata, riapplicala
    if (configurazioneAttuale === nomeConfigurazione) {
        applicaConfigurazione(nomeConfigurazione);
    }
    
    return true;
}

// Dimostrazione dell'utilizzo delle configurazioni
brick.clearScreen();
brick.showString("Test configurazioni", 1);
brick.showString("Inizio in 3s...", 2);
pause(3000);

// Applica e mostra la configurazione normale
applicaConfigurazione("normale");
mostraDettagliConfigurazione("normale");

// Applica e mostra la configurazione veloce
applicaConfigurazione("veloce");
mostraDettagliConfigurazione("veloce");

// Torna alla configurazione normale e personalizzala
applicaConfigurazione("normale");
personalizzaConfigurazione("normale", {
    velocitaMax: 60,
    volumeSuoni: 85
});
mostraDettagliConfigurazione("normale");

// Visualizza tutte le configurazioni disponibili
brick.clearScreen();
brick.showString("Config disponibili:", 1);

let riga = 2;
for (const nomeConfig in configurazioniRobot) {
    brick.showString("- " + nomeConfig, riga);
    riga++;
    pause(500);
}
pause(2000);

// Simulazione di selezione configurazione in base all'ambiente
brick.clearScreen();
brick.showString("Selezione automatica", 1);
brick.showString("configurazione", 2);
pause(1000);

// Simula la lettura di un sensore di luce
const valoreAmbiente = 65; // valore simulato
brick.showString("Luminosità: " + valoreAmbiente, 3);
pause(1000);

// Scegli configurazione in base alla luce ambientale
let configScelta;
if (valoreAmbiente < 30) {
    configScelta = "precisa"; // In ambienti bui, meglio precisione
} else if (valoreAmbiente > 70) {
    configScelta = "veloce";  // In ambienti luminosi, ok velocità
} else {
    configScelta = "normale"; // Altrimenti usa impostazioni normali
}

brick.showString("Selezionata: " + configScelta, 4);
pause(1000);
applicaConfigurazione(configScelta);

// Conclusione demo
brick.clearScreen();
brick.showString("Oggetti JavaScript", 1);
brick.showString("per configurazioni", 2);
brick.showString("robot completato!", 3);
music.playSoundEffect(SoundEffect.Success);
pause(3000);
brick.clearScreen();
