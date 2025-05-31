# Logging e Debug in JavaScript per EV3

## Introduzione al Logging e Debug

Il logging e il debug sono componenti essenziali dello sviluppo software, particolarmente importanti nella programmazione robotica dove il comportamento del sistema può essere complesso e difficile da osservare direttamente. In questo capitolo, esploreremo tecniche efficaci per implementare sistemi di logging e strategie di debug nei programmi JavaScript per il robot LEGO EV3.

## Importanza del Logging nella Programmazione Robotica

Nella programmazione robotica, il logging offre numerosi vantaggi:

- **Diagnostica in tempo reale**: Permette di monitorare lo stato del robot durante l'esecuzione
- **Analisi post-esecuzione**: Consente di esaminare i dati raccolti dopo che il programma è terminato
- **Identificazione di problemi**: Aiuta a individuare errori e comportamenti anomali
- **Ottimizzazione delle prestazioni**: Fornisce dati per migliorare l'efficienza del programma
- **Documentazione del comportamento**: Registra come il robot ha risposto in diverse situazioni

## Tecniche di Logging Base

### Console.log e Varianti

La funzione `console.log()` è lo strumento più semplice per il logging in JavaScript:

```javascript
// Logging di base
console.log("Programma avviato");

// Logging di variabili
let distanza = sensoreUltrasuoni.getDistance();
console.log("Distanza rilevata:", distanza, "cm");

// Logging di oggetti
let statoMotori = {
    motoreA: motoreA.getSpeed(),
    motoreB: motoreB.getSpeed(),
    motoreC: motoreC.getSpeed()
};
console.log("Stato motori:", statoMotori);
```

Altre varianti utili:

```javascript
// Logging di avvisi
console.warn("Batteria sotto il 20%");

// Logging di errori
console.error("Errore di connessione al sensore");

// Logging con formattazione
console.info(`Sensore di colore: ${sensoreColore.getColor()}, Intensità: ${sensoreColore.getIntensity()}`);
```

### Livelli di Logging

Implementare livelli di logging permette di controllare la quantità di informazioni visualizzate:

```javascript
const LIVELLO_LOG = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
};

let livelloCorrente = LIVELLO_LOG.INFO;

function log(messaggio, livello = LIVELLO_LOG.INFO) {
    if (livello >= livelloCorrente) {
        let prefisso = "";
        switch(livello) {
            case LIVELLO_LOG.DEBUG: prefisso = "[DEBUG] "; break;
            case LIVELLO_LOG.INFO: prefisso = "[INFO] "; break;
            case LIVELLO_LOG.WARN: prefisso = "[AVVISO] "; break;
            case LIVELLO_LOG.ERROR: prefisso = "[ERRORE] "; break;
        }
        console.log(prefisso + messaggio);
    }
}

// Utilizzo
log("Inizializzazione sensori", LIVELLO_LOG.DEBUG);
log("Programma avviato");
log("Problema di calibrazione", LIVELLO_LOG.WARN);
log("Sensore non risponde", LIVELLO_LOG.ERROR);
```

## Logging Avanzato

### Timestamp e Formattazione

Aggiungere timestamp ai log aiuta a tracciare la sequenza temporale degli eventi:

```javascript
function logConTimestamp(messaggio) {
    let ora = new Date();
    let timestamp = `${ora.getHours()}:${ora.getMinutes()}:${ora.getSeconds()}.${ora.getMilliseconds()}`;
    console.log(`[${timestamp}] ${messaggio}`);
}

logConTimestamp("Inizio movimento");
// Output: [10:23:45.123] Inizio movimento
```

### Logging su File

Per analisi più approfondite, è utile salvare i log su file nel brick EV3:

```javascript
const fs = require('fs');

class Logger {
    constructor(nomeFile) {
        this.nomeFile = nomeFile;
        // Crea o svuota il file di log all'avvio
        fs.writeFileSync(this.nomeFile, "");
    }
    
    log(messaggio) {
        let ora = new Date();
        let timestamp = `${ora.getHours()}:${ora.getMinutes()}:${ora.getSeconds()}`;
        let logEntry = `[${timestamp}] ${messaggio}\n`;
        
        // Aggiungi al file di log
        fs.appendFileSync(this.nomeFile, logEntry);
    }
}

// Utilizzo
let logger = new Logger('/home/robot/logs/missione.log');
logger.log("Programma avviato");
logger.log(`Distanza rilevata: ${sensoreUltrasuoni.getDistance()} cm`);
```

### Logging Strutturato

Per analisi più sofisticate, è utile utilizzare un formato strutturato come JSON:

```javascript
class LoggerJSON {
    constructor(nomeFile) {
        this.nomeFile = nomeFile;
        this.logs = [];
    }
    
    log(tipo, dati) {
        let entry = {
            timestamp: new Date().toISOString(),
            tipo: tipo,
            dati: dati
        };
        
        this.logs.push(entry);
    }
    
    salva() {
        fs.writeFileSync(this.nomeFile, JSON.stringify(this.logs, null, 2));
    }
}

// Utilizzo
let loggerJSON = new LoggerJSON('/home/robot/logs/dati_missione.json');

loggerJSON.log("sensore", {
    tipo: "ultrasuoni",
    distanza: sensoreUltrasuoni.getDistance()
});

loggerJSON.log("motore", {
    porta: "A",
    velocità: motoreA.getSpeed(),
    posizione: motoreA.getPosition()
});

// Salva i log alla fine dell'esecuzione
loggerJSON.salva();
```

## Tecniche di Debug

### Debug Visivo

Utilizzare il display del brick EV3 per visualizzare informazioni di debug in tempo reale:

```javascript
function mostraDebug(riga, messaggio) {
    // Pulisci la riga specifica sul display
    brick.clearLine(riga);
    // Scrivi il messaggio di debug
    brick.printString(messaggio, 0, riga * 10);
}

// Utilizzo
mostraDebug(1, "Dist: " + sensoreUltrasuoni.getDistance());
mostraDebug(2, "Col: " + sensoreColore.getColor());
```

### Debug Sonoro

Utilizzare suoni per segnalare eventi specifici senza interrompere l'esecuzione:

```javascript
function debugSonoro(evento) {
    switch(evento) {
        case "inizio":
            brick.playTone(440, 200); // La, breve
            break;
        case "fine":
            brick.playTone(880, 500); // La alto, lungo
            break;
        case "errore":
            brick.playTone(220, 300); // La basso, medio
            brick.playTone(110, 500); // La molto basso, lungo
            break;
    }
}

// Utilizzo
debugSonoro("inizio");
// ... esecuzione del programma ...
debugSonoro("fine");
```

### Breakpoint Virtuali

Implementare "breakpoint" nel codice per analizzare lo stato in punti specifici:

```javascript
function breakpoint(etichetta, dati) {
    console.log(`=== BREAKPOINT: ${etichetta} ===`);
    console.log("Dati:", dati);
    
    // Pausa l'esecuzione e attendi la pressione di un pulsante
    console.log("Premi un pulsante per continuare...");
    brick.buttonWait();
}

// Utilizzo
breakpoint("Prima del movimento", {
    distanza: sensoreUltrasuoni.getDistance(),
    colore: sensoreColore.getColor(),
    velocità: motoreA.getSpeed()
});
```

## Analisi dei Log

### Tecniche di Analisi

Dopo aver raccolto i log, è importante saperli analizzare efficacemente:

1. **Ricerca di pattern**: Identificare sequenze ricorrenti che possono indicare problemi
2. **Analisi temporale**: Esaminare i timestamp per individuare ritardi o comportamenti anomali
3. **Correlazione eventi**: Collegare eventi diversi per comprendere relazioni causa-effetto
4. **Visualizzazione**: Convertire i log in grafici per una comprensione più immediata

### Strumenti di Analisi

Per log più complessi, è possibile utilizzare strumenti esterni:

- **Fogli di calcolo**: Importare log strutturati per analisi e grafici
- **Strumenti di visualizzazione**: Convertire i dati in rappresentazioni grafiche
- **Script personalizzati**: Creare programmi specifici per analizzare i log

## Best Practices

1. **Log significativi**: Registra informazioni utili, evitando dati superflui
2. **Consistenza**: Mantieni un formato coerente per facilitare l'analisi
3. **Prestazioni**: Considera l'impatto del logging sulle prestazioni del programma
4. **Livelli appropriati**: Usa i livelli di logging per filtrare le informazioni
5. **Rotazione dei log**: Implementa meccanismi per gestire file di log di grandi dimensioni
6. **Privacy e sicurezza**: Evita di registrare dati sensibili

## Conclusione

Un sistema di logging e debug ben progettato è fondamentale per sviluppare applicazioni robotiche robuste e affidabili. Investire tempo nella creazione di strumenti di logging efficaci ripaga ampiamente durante lo sviluppo, il testing e la manutenzione dei programmi per il robot EV3.

---

**Prossimo Capitolo**: [Strutture Dati Avanzate](06-StruttureDatiAvanzate.md)

**Capitolo Precedente**: [Elaborazione Dati Sensori](04-ElaborazioneDatiSensori.md)

[Torna all'indice del modulo](README.md)