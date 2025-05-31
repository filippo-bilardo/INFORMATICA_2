# Programmazione Reattiva

## Introduzione

La programmazione reattiva è un paradigma di programmazione orientato alla gestione di flussi di dati e alla propagazione dei cambiamenti. Nel contesto della robotica EV3, questo approccio è particolarmente utile per creare robot che rispondono dinamicamente agli stimoli dell'ambiente circostante attraverso i sensori. In questo capitolo, esploreremo come implementare comportamenti reattivi utilizzando JavaScript e i sensori EV3.

## Concetti Fondamentali

### Eventi e Reazioni

Nella programmazione reattiva, il flusso del programma è guidato da eventi esterni (come i dati provenienti dai sensori) piuttosto che da una sequenza predeterminata di istruzioni. Il robot "reagisce" a questi eventi eseguendo specifiche azioni.

### Cicli di Controllo

Un ciclo di controllo è un loop continuo che:
1. Legge i dati dai sensori
2. Elabora le informazioni
3. Decide le azioni da intraprendere
4. Esegue le azioni
5. Ripete il processo

### Comportamenti

Un comportamento è una relazione tra percezione (input dai sensori) e azione (output sui motori o altri attuatori). I comportamenti possono essere semplici o complessi, e possono essere combinati per creare sistemi più sofisticati.

## Implementazione in JavaScript con MakeCode

### Ciclo di Controllo Base

Il blocco `forever` di MakeCode è perfetto per implementare cicli di controllo reattivi:

```javascript
// Ciclo di controllo base
forever(function() {
    // 1. Lettura dei sensori
    let distanza = sensors.ultrasonic1.distance();
    
    // 2. Elaborazione e decisione
    if (distanza < 20) {
        // 3. Azione (evita ostacolo)
        motors.largeBC.stop();
        motors.largeB.run(50);
        motors.largeC.run(-50);
        pause(500);
    } else {
        // 3. Azione (procedi)
        motors.largeBC.run(50);
    }
    
    // 4. Breve pausa per non sovraccaricare il sistema
    pause(10);
});
```

### Gestione di Eventi

Possiamo implementare una gestione degli eventi più esplicita utilizzando variabili di stato e controlli di cambiamento:

```javascript
// Gestione di eventi con il sensore touch
let statoPrec = false;

forever(function() {
    // Lettura dello stato corrente
    let statoCorr = sensors.touch1.isPressed();
    
    // Verifica se c'è stato un cambiamento (evento)
    if (statoCorr && !statoPrec) {
        // Evento: pressione del sensore
        brick.showString("Evento: Premuto!", 1);
        music.playTone(880, 200);
    } else if (!statoCorr && statoPrec) {
        // Evento: rilascio del sensore
        brick.showString("Evento: Rilasciato!", 1);
        music.playTone(440, 200);
    }
    
    // Aggiornamento dello stato precedente
    statoPrec = statoCorr;
    
    // Pausa
    pause(10);
});
```

### Comportamenti Multipli

Possiamo implementare più comportamenti contemporaneamente e decidere quale ha la priorità:

```javascript
// Robot con comportamenti multipli
forever(function() {
    // Lettura dei sensori
    let distanza = sensors.ultrasonic1.distance();
    let colore = sensors.color3.color();
    let touchPremuto = sensors.touch1.isPressed();
    
    // Comportamento 1: Arresto di emergenza (massima priorità)
    if (touchPremuto) {
        motors.largeBC.stop();
        brick.showString("STOP EMERGENZA", 1);
        music.playTone(220, 500);
        pause(1000);
    }
    // Comportamento 2: Evita ostacoli (media priorità)
    else if (distanza < 20) {
        brick.showString("Evito ostacolo", 1);
        motors.largeBC.stop();
        motors.largeB.run(50);
        motors.largeC.run(-50);
        pause(800);
    }
    // Comportamento 3: Segui linea (bassa priorità)
    else if (colore === ColorSensorColor.Black) {
        brick.showString("Seguo linea", 1);
        motors.largeB.run(30);
        motors.largeC.run(10);
    } else {
        brick.showString("Cerco linea", 1);
        motors.largeB.run(10);
        motors.largeC.run(30);
    }
    
    // Pausa
    pause(10);
});
```

## Architetture di Controllo Reattivo

### Architettura Subsumption

L'architettura Subsumption, sviluppata da Rodney Brooks, organizza i comportamenti in livelli di competenza, dove i comportamenti di livello superiore possono "subsumere" (sostituire) quelli di livello inferiore quando necessario.

```javascript
// Implementazione semplificata dell'architettura Subsumption

// Definizione dei comportamenti
function comportamentoBase() {
    // Comportamento di base: vagare
    brick.showString("Vagando", 1);
    motors.largeBC.run(30);
}

function evitaOstacoli() {
    // Comportamento: evitare ostacoli
    let distanza = sensors.ultrasonic1.distance();
    if (distanza < 20) {
        brick.showString("Evito ostacolo", 1);
        motors.largeBC.stop();
        motors.largeB.run(50);
        motors.largeC.run(-50);
        pause(800);
        return true; // Comportamento attivo
    }
    return false; // Comportamento non attivo
}

function seguiLuce() {
    // Comportamento: seguire la luce
    let luce = sensors.color3.ambientLight();
    if (luce > 50) {
        brick.showString("Seguo luce", 1);
        // Calcola direzione verso la luce
        // (semplificato per l'esempio)
        motors.largeB.run(40);
        motors.largeC.run(20);
        return true; // Comportamento attivo
    }
    return false; // Comportamento non attivo
}

// Ciclo principale con architettura Subsumption
forever(function() {
    // Applica i comportamenti in ordine di priorità
    if (!evitaOstacoli()) { // Priorità più alta
        if (!seguiLuce()) { // Priorità media
            comportamentoBase(); // Priorità più bassa
        }
    }
    
    // Pausa
    pause(10);
});
```

### Architettura a Campi di Potenziale

L'architettura a campi di potenziale considera gli ostacoli come fonti di forze repulsive e gli obiettivi come fonti di forze attrattive. Il robot si muove seguendo il gradiente del campo risultante.

```javascript
// Implementazione semplificata dell'architettura a campi di potenziale
forever(function() {
    // Lettura dei sensori
    let distanzaAvanti = sensors.ultrasonic1.distance();
    
    // Calcolo delle forze
    let forzaRepulsiva = 0;
    if (distanzaAvanti < 50) {
        // Forza repulsiva inversamente proporzionale alla distanza
        forzaRepulsiva = 100 * (1 - distanzaAvanti / 50);
    }
    
    // Forza attrattiva verso l'obiettivo (semplificata)
    let forzaAttrattiva = 50;
    
    // Calcolo della forza risultante
    let forzaRisultante = forzaAttrattiva - forzaRepulsiva;
    
    // Applicazione della forza ai motori
    if (forzaRisultante > 0) {
        // Movimento in avanti con potenza proporzionale alla forza
        let potenza = Math.min(100, forzaRisultante);
        motors.largeBC.run(potenza);
        brick.showValue("Avanti", potenza, 1);
    } else {
        // Movimento indietro o rotazione
        motors.largeBC.stop();
        motors.largeB.run(50);
        motors.largeC.run(-50);
        brick.showString("Evito ostacolo", 1);
        pause(500);
    }
    
    // Pausa
    pause(10);
});
```

## Esempi Pratici

### Esempio 1: Robot Reattivo Multimodale

```javascript
// Robot che reagisce a diversi stimoli ambientali

// Variabili di stato
let modalita = 0; // 0: normale, 1: allerta, 2: emergenza

forever(function() {
    // Lettura dei sensori
    let distanza = sensors.ultrasonic1.distance();
    let colore = sensors.color3.color();
    let touchPremuto = sensors.touch1.isPressed();
    let luce = sensors.color3.ambientLight();
    
    // Aggiornamento della modalità
    if (touchPremuto) {
        modalita = 2; // Emergenza
    } else if (distanza < 15) {
        modalita = 1; // Allerta
    } else {
        modalita = 0; // Normale
    }
    
    // Comportamento in base alla modalità
    switch (modalita) {
        case 0: // Modalità normale
            brick.showString("Modalità: Normale", 1);
            
            // Segui linea se presente
            if (colore === ColorSensorColor.Black) {
                motors.largeB.run(30);
                motors.largeC.run(10);
            } else {
                // Altrimenti, muoviti verso la luce
                if (luce > 50) {
                    motors.largeBC.run(40);
                } else {
                    motors.largeB.run(20);
                    motors.largeC.run(20);
                }
            }
            break;
            
        case 1: // Modalità allerta
            brick.showString("Modalità: Allerta", 1);
            brick.showValue("Distanza", distanza, 2);
            
            // Rallenta e valuta la situazione
            motors.largeBC.run(10);
            
            // Se l'ostacolo è molto vicino, evitalo
            if (distanza < 10) {
                motors.largeBC.stop();
                motors.largeB.run(40);
                motors.largeC.run(-40);
                pause(500);
            }
            break;
            
        case 2: // Modalità emergenza
            brick.showString("EMERGENZA!", 1);
            
            // Ferma tutto e segnala
            motors.largeBC.stop();
            music.playTone(880, 500);
            pause(2000);
            modalita = 0; // Ritorna alla modalità normale
            break;
    }
    
    // Pausa
    pause(10);
});
```

### Esempio 2: Robot con Memoria a Breve Termine

```javascript
// Robot che ricorda gli ultimi eventi e adatta il comportamento

// Array per memorizzare le ultime letture di distanza
let ultimeDistanze = [100, 100, 100, 100, 100];

forever(function() {
    // Lettura della distanza corrente
    let distanzaCorrente = sensors.ultrasonic1.distance();
    
    // Aggiornamento della memoria (shift dell'array)
    for (let i = ultimeDistanze.length - 1; i > 0; i--) {
        ultimeDistanze[i] = ultimeDistanze[i - 1];
    }
    ultimeDistanze[0] = distanzaCorrente;
    
    // Calcolo della media delle distanze
    let somma = 0;
    for (let i = 0; i < ultimeDistanze.length; i++) {
        somma += ultimeDistanze[i];
    }
    let mediaDistanze = somma / ultimeDistanze.length;
    
    // Calcolo della variazione (tendenza)
    let tendenza = ultimeDistanze[0] - ultimeDistanze[ultimeDistanze.length - 1];
    
    // Visualizzazione dei dati
    brick.showValue("Distanza", distanzaCorrente, 1);
    brick.showValue("Media", mediaDistanze, 2);
    brick.showValue("Tendenza", tendenza, 3);
    
    // Comportamento adattivo
    if (distanzaCorrente < 20) {
        // Ostacolo vicino: fermati e ruota
        motors.largeBC.stop();
        motors.largeB.run(50);
        motors.largeC.run(-50);
        pause(500);
    } else if (tendenza < -10) {
        // La distanza sta diminuendo rapidamente: rallenta
        brick.showString("Rallento!", 4);
        motors.largeBC.run(20);
    } else if (mediaDistanze < 50) {
        // Zona con ostacoli: procedi con cautela
        brick.showString("Cautela", 4);
        motors.largeBC.run(30);
    } else {
        // Via libera: procedi normalmente
        brick.showString("Via libera", 4);
        motors.largeBC.run(50);
    }
    
    // Pausa
    pause(100);
});
```

## Limitazioni e Considerazioni

- **Complessità emergente**: Comportamenti semplici possono interagire in modi complessi e talvolta imprevedibili
- **Reattività vs. pianificazione**: I sistemi puramente reattivi possono mancare di capacità di pianificazione a lungo termine
- **Calibrazione**: I parametri (come le soglie di distanza) potrebbero richiedere calibrazione in base all'ambiente
- **Latenza**: Il tempo di risposta del sistema è cruciale per una reattività efficace

## Applicazioni Comuni

- Robot che evitano ostacoli
- Sistemi di navigazione reattiva
- Robot seguitori (di linee, luci, persone)
- Comportamenti animali artificiali
- Sistemi di sicurezza e risposta alle emergenze

## Esercizi Proposti

1. **Robot Emotivo**: Crea un robot che cambia "stato emotivo" in base agli stimoli ambientali (es. "felice" in ambienti luminosi, "spaventato" vicino agli ostacoli)
2. **Comportamenti Emergenti**: Implementa più comportamenti semplici e osserva come interagiscono per creare un comportamento complessivo più complesso
3. **Robot Adattivo**: Progetta un robot che modifica i suoi parametri di comportamento in base all'esperienza (es. diventa più cauto dopo aver urtato più volte)

---

**Capitolo Precedente**: [Sensore Touch](06-SensoreTouch.md)

[Torna all'indice del modulo](README.md)