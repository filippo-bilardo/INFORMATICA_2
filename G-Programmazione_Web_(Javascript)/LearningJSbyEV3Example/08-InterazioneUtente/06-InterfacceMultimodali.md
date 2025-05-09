# Interfacce Multimodali

## Introduzione

Le interfacce multimodali combinano diversi canali di comunicazione per creare un'esperienza utente più ricca e intuitiva. In questo capitolo, esploreremo come integrare display, pulsanti, suoni e LED per creare interfacce complete e coinvolgenti per i robot EV3.

## Cos'è un'Interfaccia Multimodale?

Un'interfaccia multimodale utilizza più modalità di interazione simultaneamente:

1. **Input Visivo**: Display e indicatori LED
2. **Input Tattile**: Pulsanti e sensori di tocco
3. **Output Sonoro**: Toni, melodie e messaggi vocali

Combinando questi elementi, è possibile creare interfacce più intuitive, accessibili e robuste, che si adattano a diverse situazioni e preferenze degli utenti.

## Vantaggi delle Interfacce Multimodali

1. **Accessibilità**: Permettono l'interazione anche quando un canale è limitato (es. ambiente rumoroso)
2. **Ridondanza**: L'informazione viene comunicata attraverso più canali, riducendo gli errori
3. **Flessibilità**: Si adattano a diverse situazioni e preferenze dell'utente
4. **Esperienza Migliorata**: Creano un'interazione più naturale e coinvolgente

## Progettazione di Interfacce Multimodali

### Principi di Progettazione

1. **Coerenza**: Mantenere coerenza tra i diversi canali di comunicazione
2. **Complementarità**: Ogni modalità dovrebbe aggiungere valore, non solo duplicare informazioni
3. **Feedback Appropriato**: Scegliere la modalità più adatta per ogni tipo di feedback
4. **Semplicità**: Evitare il sovraccarico sensoriale dell'utente

## Implementazione di Interfacce Multimodali

### Esempio 1: Dashboard di Stato Multimodale

```javascript
// Funzione per aggiornare lo stato del robot su più canali
function aggiornaStatoRobot(stato) {
    // Aggiorna display
    brick.clearScreen();
    brick.showString("Stato: " + stato.nome, 0);
    brick.showString("Batteria: " + stato.batteria + "%", 1);
    brick.showString("Velocità: " + stato.velocita, 2);
    
    // Aggiorna LED in base al livello della batteria
    if (stato.batteria < 20) {
        brick.setStatusLight(StatusLight.RedFlash); // Batteria critica
    } else if (stato.batteria < 50) {
        brick.setStatusLight(StatusLight.Orange); // Batteria bassa
    } else {
        brick.setStatusLight(StatusLight.Green); // Batteria ok
    }
    
    // Feedback sonoro se lo stato è cambiato
    if (stato.nome !== ultimoStato) {
        if (stato.nome === "Attivo") {
            music.playTone(880, 200);
        } else if (stato.nome === "In Pausa") {
            music.playTone(440, 200);
            pause(100);
            music.playTone(440, 200);
        } else if (stato.nome === "Errore") {
            music.playTone(220, 500);
        }
        
        ultimoStato = stato.nome;
    }
}

// Stato iniziale
let statoRobot = {
    nome: "In Attesa",
    batteria: 75,
    velocita: 50
};
let ultimoStato = "";

// Aggiorna lo stato iniziale
aggiornaStatoRobot(statoRobot);

// Loop principale
while (true) {
    // Cambia stato con i pulsanti
    if (brick.buttonEnter.wasPressed()) {
        statoRobot.nome = "Attivo";
        aggiornaStatoRobot(statoRobot);
    }
    
    if (brick.buttonLeft.wasPressed()) {
        statoRobot.nome = "In Pausa";
        aggiornaStatoRobot(statoRobot);
    }
    
    if (brick.buttonRight.wasPressed()) {
        statoRobot.nome = "Errore";
        aggiornaStatoRobot(statoRobot);
    }
    
    // Simula consumo batteria
    if (control.millis() % 10000 === 0 && statoRobot.batteria > 0) {
        statoRobot.batteria -= 1;
        aggiornaStatoRobot(statoRobot);
    }
    
    pause(50);
}
```

### Esempio 2: Interfaccia di Configurazione Multimodale

```javascript
// Parametri configurabili
let configurazione = {
    velocita: 50,
    sensibilita: 3,
    modalita: "Standard"
};

// Opzioni disponibili
let opzioni = ["Velocità", "Sensibilità", "Modalità", "Salva"];
let modalitaDisponibili = ["Standard", "Sport", "Eco", "Personalizzata"];
let selezioneAttuale = 0;
let modificaInCorso = false;

// Funzione per visualizzare l'interfaccia
function visualizzaInterfaccia() {
    brick.clearScreen();
    brick.showString("Configurazione:", 0);
    
    // Visualizza le opzioni con i valori attuali
    for (let i = 0; i < opzioni.length; i++) {
        let prefisso = (i === selezioneAttuale) ? "> " : "  ";
        
        if (i === 0) {
            brick.showString(prefisso + opzioni[i] + ": " + configurazione.velocita, i + 1);
        } else if (i === 1) {
            brick.showString(prefisso + opzioni[i] + ": " + configurazione.sensibilita, i + 1);
        } else if (i === 2) {
            brick.showString(prefisso + opzioni[i] + ": " + configurazione.modalita, i + 1);
        } else {
            brick.showString(prefisso + opzioni[i], i + 1);
        }
    }
    
    // Istruzioni contestuali
    if (modificaInCorso) {
        brick.showString("< Diminuisci | Aumenta >", 7);
    } else {
        brick.showString("^ Su | Giù v", 7);
    }
}

// Funzione per fornire feedback multimodale
function feedbackModifica(tipo) {
    if (tipo === "incremento") {
        // Feedback visivo
        brick.setStatusLight(StatusLight.Green);
        // Feedback sonoro
        music.playTone(880, 100);
    } else if (tipo === "decremento") {
        // Feedback visivo
        brick.setStatusLight(StatusLight.Orange);
        // Feedback sonoro
        music.playTone(440, 100);
    } else if (tipo === "limite") {
        // Feedback visivo
        brick.setStatusLight(StatusLight.RedFlash);
        // Feedback sonoro
        music.playTone(220, 200);
    } else if (tipo === "salvataggio") {
        // Feedback visivo
        brick.setStatusLight(StatusLight.Green);
        // Feedback sonoro
        music.playTone(440, 100);
        pause(100);
        music.playTone(660, 100);
        pause(100);
        music.playTone(880, 200);
    }
    
    // Ripristina LED dopo un breve periodo
    pause(300);
    brick.setStatusLight(StatusLight.Green);
}

// Funzione per modificare un parametro
function modificaParametro(incremento) {
    if (selezioneAttuale === 0) { // Velocità
        let nuovoValore = configurazione.velocita + incremento;
        if (nuovoValore >= 0 && nuovoValore <= 100) {
            configurazione.velocita = nuovoValore;
            feedbackModifica(incremento > 0 ? "incremento" : "decremento");
        } else {
            feedbackModifica("limite");
        }
    } else if (selezioneAttuale === 1) { // Sensibilità
        let nuovoValore = configurazione.sensibilita + incremento;
        if (nuovoValore >= 1 && nuovoValore <= 5) {
            configurazione.sensibilita = nuovoValore;
            feedbackModifica(incremento > 0 ? "incremento" : "decremento");
        } else {
            feedbackModifica("limite");
        }
    } else if (selezioneAttuale === 2) { // Modalità
        let indiceAttuale = modalitaDisponibili.indexOf(configurazione.modalita);
        let nuovoIndice = indiceAttuale + incremento;
        
        if (nuovoIndice >= 0 && nuovoIndice < modalitaDisponibili.length) {
            configurazione.modalita = modalitaDisponibili[nuovoIndice];
            feedbackModifica(incremento > 0 ? "incremento" : "decremento");
        } else {
            feedbackModifica("limite");
        }
    }
}

// Loop principale
visualizzaInterfaccia();

while (true) {
    if (!modificaInCorso) {
        // Modalità navigazione
        if (brick.buttonUp.wasPressed() && selezioneAttuale > 0) {
            selezioneAttuale--;
            visualizzaInterfaccia();
        }
        
        if (brick.buttonDown.wasPressed() && selezioneAttuale < opzioni.length - 1) {
            selezioneAttuale++;
            visualizzaInterfaccia();
        }
        
        if (brick.buttonEnter.wasPressed()) {
            if (selezioneAttuale === 3) { // Salva
                feedbackModifica("salvataggio");
                brick.clearScreen();
                brick.showString("Configurazione", 1);
                brick.showString("salvata!", 2);
                pause(2000);
                break;
            } else {
                // Entra in modalità modifica
                modificaInCorso = true;
                visualizzaInterfaccia();
            }
        }
    } else {
        // Modalità modifica
        if (brick.buttonRight.wasPressed()) {
            modificaParametro(1);
            visualizzaInterfaccia();
        }
        
        if (brick.buttonLeft.wasPressed()) {
            modificaParametro(-1);
            visualizzaInterfaccia();
        }
        
        if (brick.buttonEnter.wasPressed() || brick.buttonExit.wasPressed()) {
            // Esci dalla modalità modifica
            modificaInCorso = false;
            visualizzaInterfaccia();
        }
    }
    
    pause(50);
}
```

### Esempio 3: Sistema di Notifiche Multimodali

```javascript
// Definizione dei tipi di notifica
let TipoNotifica = {
    INFO: "info",
    SUCCESSO: "successo",
    AVVISO: "avviso",
    ERRORE: "errore"
};

// Funzione per mostrare una notifica multimodale
function mostraNotifica(messaggio, tipo, durata = 3000) {
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
    brick.clearScreen();
    brick.setStatusLight(StatusLight.Green);
}

// Esempio di utilizzo
mostraNotifica("Sistema avviato", TipoNotifica.INFO);
pause(500);

mostraNotifica("Operazione completata", TipoNotifica.SUCCESSO);
pause(500);

mostraNotifica("Batteria in esaurimento", TipoNotifica.AVVISO);
pause(500);

mostraNotifica("Connessione persa", TipoNotifica.ERRORE);
```

## Integrazione con i Sensori

Le interfacce multimodali possono essere arricchite integrando i dati provenienti dai sensori:

```javascript
// Configurazione sensori
let sensoreDistanza = sensors.ultrasonic1;
let sensoreColore = sensors.color1;

// Funzione per monitorare l'ambiente e fornire feedback multimodale
function monitoraAmbiente() {
    // Leggi i dati dai sensori
    let distanza = sensoreDistanza.distance();
    let colore = sensoreColore.color();
    
    // Aggiorna il display
    brick.clearScreen();
    brick.showString("Monitor Ambiente", 0);
    brick.showString("Distanza: " + distanza + " cm", 2);
    brick.showString("Colore: " + colore, 3);
    
    // Feedback visivo LED
    if (distanza < 10) {
        brick.setStatusLight(StatusLight.RedFlash); // Oggetto molto vicino
    } else if (distanza < 30) {
        brick.setStatusLight(StatusLight.Orange); // Oggetto a media distanza
    } else {
        brick.setStatusLight(StatusLight.Green); // Nessun oggetto nelle vicinanze
    }
    
    // Feedback sonoro per oggetti molto vicini
    if (distanza < 10 && ultimaDistanza >= 10) {
        music.playTone(880, 200); // Avviso sonoro quando un oggetto si avvicina troppo
    }
    
    // Feedback tattile (vibrazione simulata con suono)
    if (distanza < 5) {
        music.playTone(110, 50);
        pause(50);
    }
    
    // Memorizza l'ultima distanza per confronto
    ultimaDistanza = distanza;
}

// Inizializzazione
let ultimaDistanza = 100;

// Loop principale
while (true) {
    monitoraAmbiente();
    pause(100);
}
```

## Personalizzazione dell'Interfaccia

Per migliorare l'esperienza utente, è possibile implementare opzioni di personalizzazione:

```javascript
// Preferenze utente
let preferenze = {
    volumeFeedback: 50,  // Volume per i feedback sonori (0-100)
    usaLED: true,        // Utilizzare i LED per il feedback
    usaSuoni: true,      // Utilizzare suoni per il feedback
    contrastoDisplay: 8  // Contrasto del display (1-10)
};

// Funzione per applicare le preferenze
function applicaPreferenze() {
    // Imposta il volume
    music.setVolume(preferenze.volumeFeedback);
    
    // Imposta il contrasto (simulato)
    brick.showString("Contrasto: " + preferenze.contrastoDisplay, 7);
}

// Funzione per fornire feedback in base alle preferenze
function feedbackPersonalizzato(tipo) {
    // Feedback visivo LED
    if (preferenze.usaLED) {
        if (tipo === "successo") {
            brick.setStatusLight(StatusLight.Green);
        } else if (tipo === "errore") {
            brick.setStatusLight(StatusLight.Red);
        }
    }
    
    // Feedback sonoro
    if (preferenze.usaSuoni) {
        if (tipo === "successo") {
            music.playTone(880, 200);
        } else if (tipo === "errore") {
            music.playTone(220, 200);
        }
    }
}

// Applica le preferenze iniziali
applicaPreferenze();

// Esempio di utilizzo
feedbackPersonalizzato("successo");
pause(1000);
feedbackPersonalizzato("errore");
```

## Best Practices per Interfacce Multimodali

### 1. Progettazione Centrata sull'Utente

Considerare sempre le esigenze e le preferenze dell'utente finale, offrendo opzioni di personalizzazione quando possibile.

### 2. Ridondanza Informativa

Fornire le informazioni importanti attraverso più canali, ma evitare la ridondanza eccessiva che potrebbe risultare fastidiosa.

### 3. Feedback Appropriato

Scegliere la modalità di feedback più appropriata per ogni situazione:
- **Visivo**: Per informazioni dettagliate o persistenti
- **Sonoro**: Per notifiche immediate o quando l'attenzione visiva è altrove
- **LED**: Per stati persistenti o cambiamenti di stato

### 4. Coerenza

Mantenere coerenza nei pattern di interazione e feedback in tutta l'interfaccia.

### 5. Accessibilità

Assicurarsi che l'interfaccia sia utilizzabile anche quando uno dei canali di comunicazione è limitato o non disponibile.

## Esercizi Proposti

1. **Sistema di Navigazione Multimodale**: Crea un'interfaccia che guidi il robot attraverso un percorso utilizzando feedback visivi, sonori e LED
2. **Dashboard Sensoriale**: Implementa un'interfaccia che mostri i dati di tutti i sensori collegati, con feedback appropriati per valori anomali
3. **Interfaccia di Gioco**: Crea un semplice gioco che utilizzi tutte le modalità di interazione disponibili
4. **Sistema di Allerta**: Implementa un sistema che monitori diverse condizioni del robot e fornisca allerte appropriate attraverso più canali

---

**Prossimo Modulo**: [Gestione Dati e Strutture Dati](../09-GestioneDati/README.md)

**Capitolo Precedente**: [Menu e Navigazione](05-MenuNavigazione.md)

[Torna all'indice del modulo](README.md)