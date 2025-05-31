# Sensore Touch

## Introduzione

Il sensore Touch è uno dei componenti più semplici ma versatili del kit LEGO EV3. Funziona come un pulsante che può rilevare quando viene premuto o rilasciato, permettendo al robot di interagire fisicamente con l'ambiente circostante. Nonostante la sua semplicità, questo sensore è fondamentale per molte applicazioni robotiche che richiedono il rilevamento di contatto o pressione.

## Caratteristiche Tecniche

- **Tipo**: sensore digitale (on/off)
- **Stati rilevabili**: premuto, rilasciato, urto (premuto e rilasciato rapidamente)
- **Meccanismo**: pulsante a molla con feedback tattile
- **Porte compatibili**: qualsiasi porta di input (1, 2, 3, 4)

## Modalità di Funzionamento

Il sensore Touch EV3 può rilevare tre stati principali:

### 1. Premuto (Pressed)

Il sensore rileva quando il pulsante è attualmente premuto.

### 2. Rilasciato (Released)

Il sensore rileva quando il pulsante non è premuto (stato di riposo).

### 3. Urto (Bumped)

Il sensore rileva quando il pulsante è stato premuto e rilasciato rapidamente, utile per rilevare urti o tocchi momentanei.

## Utilizzo in JavaScript con MakeCode

### Configurazione del Sensore

Prima di utilizzare il sensore, è necessario configurarlo specificando a quale porta è collegato:

```javascript
// Configurazione del sensore touch sulla porta 1
const touchSensor = sensors.touch1;

// Se il sensore fosse collegato ad un'altra porta (es. porta 3)
// const touchSensor = sensors.touch3;
```

### Rilevamento dello Stato Premuto

Per verificare se il sensore è attualmente premuto:

```javascript
// Verifica se il sensore è premuto
let premuto = touchSensor.isPressed();

// Reazione in base allo stato
if (premuto) {
    brick.showString("Sensore premuto!", 1);
} else {
    brick.showString("Sensore rilasciato", 1);
}
```

### Rilevamento di un Urto

Per rilevare se il sensore ha subito un urto (premuto e rilasciato rapidamente):

```javascript
// Verifica se il sensore ha subito un urto
let urto = touchSensor.wasPressed();

// Reazione in caso di urto
if (urto) {
    brick.showString("Urto rilevato!", 1);
    music.playTone(440, 500); // Suona un tono
}
```

### Attesa di un Evento

Per mettere in pausa il programma fino a quando il sensore viene premuto:

```javascript
// Visualizza un messaggio di attesa
brick.showString("Premi il sensore...", 1);

// Attendi finché il sensore non viene premuto
while (!sensors.touch1.isPressed()) {
    pause(10); // Piccola pausa per non sovraccaricare il sistema
}

// Reazione quando il sensore viene premuto
brick.showString("Sensore premuto!", 1);
music.playTone(880, 500);
```

## Esempi Pratici

### Esempio 1: Robot con Paraurti

```javascript
// Robot che si muove in avanti e cambia direzione quando urta un ostacolo
forever(function() {
    // Movimento in avanti
    motors.largeBC.run(50);
    
    // Verifica se il paraurti (sensore touch) è premuto
    if (sensors.touch1.isPressed()) {
        // Ferma i motori
        motors.largeBC.stop();
        
        // Emetti un suono di allarme
        music.playTone(330, 500);
        
        // Retromarcia
        motors.largeBC.run(-50);
        pause(1000);
        
        // Ruota
        motors.largeB.run(50);
        motors.largeC.run(-50);
        pause(800);
        
        // Ferma la rotazione
        motors.largeBC.stop();
    }
    
    // Breve pausa
    pause(10);
});
```

### Esempio 2: Contatore di Pressioni

```javascript
// Programma che conta quante volte viene premuto il sensore

// Inizializzazione del contatore
let contatore = 0;
let ultimoStato = false;

// Visualizzazione iniziale
brick.clearScreen();
brick.showString("Contatore:", 1);
brick.showValue("Pressioni", contatore, 2);

forever(function() {
    // Lettura dello stato corrente del sensore
    let statoCorrente = sensors.touch1.isPressed();
    
    // Verifica se c'è stato un cambiamento da rilasciato a premuto
    if (statoCorrente && !ultimoStato) {
        // Incrementa il contatore
        contatore++;
        
        // Aggiorna il display
        brick.showValue("Pressioni", contatore, 2);
        
        // Feedback sonoro
        music.playTone(440 + (contatore * 20), 200);
    }
    
    // Aggiorna lo stato precedente
    ultimoStato = statoCorrente;
    
    // Breve pausa
    pause(50);
});
```

### Esempio 3: Pulsante di Avvio/Arresto

```javascript
// Programma che utilizza il sensore touch come pulsante di avvio/arresto

// Stato iniziale
let robotAttivo = false;
let ultimoStato = false;

// Visualizzazione iniziale
brick.clearScreen();
brick.showString("Robot fermo", 1);
brick.showString("Premi per avviare", 2);

forever(function() {
    // Lettura dello stato corrente del sensore
    let statoCorrente = sensors.touch1.isPressed();
    
    // Verifica se c'è stato un cambiamento da rilasciato a premuto
    if (statoCorrente && !ultimoStato) {
        // Cambia lo stato del robot
        robotAttivo = !robotAttivo;
        
        // Aggiorna il display
        brick.clearScreen();
        if (robotAttivo) {
            brick.showString("Robot attivo", 1);
            brick.showString("Premi per fermare", 2);
            music.playTone(880, 300);
        } else {
            brick.showString("Robot fermo", 1);
            brick.showString("Premi per avviare", 2);
            music.playTone(440, 300);
        }
    }
    
    // Controlla i motori in base allo stato
    if (robotAttivo) {
        motors.largeBC.run(50);
    } else {
        motors.largeBC.stop();
    }
    
    // Aggiorna lo stato precedente
    ultimoStato = statoCorrente;
    
    // Breve pausa
    pause(50);
});
```

## Limitazioni e Considerazioni

- **Semplicità**: Il sensore touch è binario (on/off) e non può misurare l'intensità della pressione
- **Posizionamento**: È importante posizionare il sensore in modo che possa essere premuto efficacemente dagli ostacoli
- **Rimbalzo**: Come tutti i pulsanti meccanici, può verificarsi un effetto di "rimbalzo" (multiple letture rapide durante una singola pressione)
- **Durabilità**: Sebbene robusto, l'uso intensivo può causare usura del meccanismo a molla

## Applicazioni Comuni

- Rilevamento di collisioni e ostacoli
- Pulsanti di avvio/arresto per programmi
- Interfacce utente semplici
- Rilevamento di fine corsa in meccanismi
- Trigger per azioni o eventi
- Contatori di eventi fisici

## Esercizi Proposti

1. **Robot Esploratore**: Crea un robot che esplora l'ambiente e cambia direzione quando urta un ostacolo
2. **Interfaccia a Menu**: Utilizza il sensore touch per navigare tra diverse opzioni visualizzate sul display EV3
3. **Registratore di Urti**: Programma il robot per contare e registrare quante volte urta un ostacolo durante un percorso

---

**Prossimo Capitolo**: [Programmazione Reattiva](07-ProgrammazioneReattiva.md)

**Capitolo Precedente**: [Sensore Infrarossi](05-SensoreInfrarossi.md)

[Torna all'indice del modulo](README.md)