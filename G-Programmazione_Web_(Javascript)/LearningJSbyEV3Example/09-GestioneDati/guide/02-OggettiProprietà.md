# Oggetti e Proprietà in JavaScript

## Introduzione agli Oggetti

Gli oggetti sono una delle strutture dati fondamentali in JavaScript e rappresentano collezioni di dati correlati. A differenza degli array che utilizzano indici numerici, gli oggetti utilizzano chiavi (o proprietà) per accedere ai valori. Nel contesto della programmazione del robot LEGO EV3, gli oggetti sono particolarmente utili per rappresentare entità complesse come configurazioni del robot, stati dei sensori o comportamenti.

## Creazione e Inizializzazione di Oggetti

### Sintassi Letterale

```javascript
// Creazione di un oggetto vuoto
let robot = {};

// Creazione di un oggetto con proprietà
let sensore = {
    tipo: "ultrasuoni",
    porta: 1,
    valoreAttuale: 0,
    unitàMisura: "cm"
};

// Oggetto con proprietà annidate
let configurazione = {
    motori: {
        sinistro: { porta: "A", velocità: 50 },
        destro: { porta: "B", velocità: 50 }
    },
    sensori: {
        distanza: { porta: 1, tipo: "ultrasuoni" },
        colore: { porta: 2, tipo: "colore" }
    }
};
```

## Accesso alle Proprietà

Esistono due modi principali per accedere alle proprietà di un oggetto:

```javascript
// Notazione con punto
let tipoSensore = sensore.tipo;  // "ultrasuoni"
let portaSensore = sensore.porta;  // 1

// Notazione con parentesi quadre (utile per nomi di proprietà dinamici)
let proprietà = "tipo";
let valore = sensore[proprietà];  // "ultrasuoni"

// Accesso a proprietà annidate
let velocitàMotoreSinistro = configurazione.motori.sinistro.velocità;  // 50
```

## Modifica e Aggiunta di Proprietà

Gli oggetti in JavaScript sono dinamici e possono essere modificati dopo la creazione:

```javascript
// Modifica di una proprietà esistente
sensore.valoreAttuale = 25;

// Aggiunta di una nuova proprietà
sensore.precisione = "alta";

// Rimozione di una proprietà
delete sensore.unitàMisura;
```

## Metodi degli Oggetti

Le proprietà di un oggetto possono anche essere funzioni, chiamate metodi:

```javascript
let sensoreDiDistanza = {
    tipo: "ultrasuoni",
    porta: 1,
    valoreAttuale: 0,
    leggi: function() {
        // Simulazione lettura sensore
        this.valoreAttuale = sensors.ultrasonic1.distance();
        return this.valoreAttuale;
    },
    èOstacolo: function(soglia) {
        return this.valoreAttuale < soglia;
    }
};

// Chiamata di un metodo
let distanza = sensoreDiDistanza.leggi();
if (sensoreDiDistanza.èOstacolo(10)) {
    // Evita l'ostacolo
}
```

Nota l'uso della parola chiave `this` che si riferisce all'oggetto stesso.

## Iterazione sulle Proprietà

Per iterare su tutte le proprietà di un oggetto:

```javascript
// Ciclo for...in
for (let chiave in sensore) {
    console.log(`${chiave}: ${sensore[chiave]}`);
}

// Ottenere array di chiavi
let chiavi = Object.keys(sensore);  // ["tipo", "porta", "valoreAttuale", ...]

// Ottenere array di valori
let valori = Object.values(sensore);  // ["ultrasuoni", 1, 0, ...]

// Ottenere array di coppie [chiave, valore]
let entries = Object.entries(sensore);  // [["tipo", "ultrasuoni"], ["porta", 1], ...]
```

## Oggetti e Riferimenti

È importante comprendere che gli oggetti sono passati per riferimento, non per valore:

```javascript
let config1 = { velocità: 50 };
let config2 = config1;  // config2 è un riferimento a config1, non una copia

config2.velocità = 75;  // Modifica anche config1.velocità
console.log(config1.velocità);  // 75

// Per creare una copia indipendente (shallow copy):
let config3 = { ...config1 };  // Utilizzo dell'operatore spread (ES6)
// oppure
let config4 = Object.assign({}, config1);
```

## Oggetti come Strutture Dati

### Mappa di Configurazioni

```javascript
let configurazioni = {
    "modalitàVeloce": {
        velocitàMax: 100,
        accelerazione: "rapida",
        precisione: "bassa"
    },
    "modalitàPrecisa": {
        velocitàMax: 50,
        accelerazione: "graduale",
        precisione: "alta"
    },
    "modalitàRisparmio": {
        velocitàMax: 30,
        accelerazione: "minima",
        precisione: "media"
    }
};

// Utilizzo
let modalitàCorrente = "modalitàPrecisa";
let configAttuale = configurazioni[modalitàCorrente];
```

### Registro di Eventi

```javascript
let registro = {};

function registraEvento(tipo, dati) {
    let timestamp = new Date().toISOString();
    registro[timestamp] = {
        tipo: tipo,
        dati: dati
    };
}

registraEvento("ostacolo", { distanza: 15, posizione: "fronte" });
registraEvento("linea", { colore: "nero", intensità: 85 });
```

## Esempi Pratici con EV3

### Configurazione Robot

```javascript
// Oggetto di configurazione del robot
let robotConfig = {
    nome: "Explorer-1",
    motori: {
        sinistro: { porta: "B", inversione: false },
        destro: { porta: "C", inversione: true },
        braccio: { porta: "A", velocità: 30 }
    },
    sensori: {
        distanza: { porta: 1, soglia: 15 },
        colore: { porta: 2, modalità: "riflesso" },
        touch: { porta: 3 }
    },
    comportamenti: {
        evitaOstacoli: true,
        seguiLinea: false,
        velocitàBase: 50
    },
    
    // Metodi
    inizializza: function() {
        // Configurazione iniziale del robot
        display.clear();
        display.text(this.nome, 0, 0);
        // Altre inizializzazioni...
    },
    
    impostaComportamento: function(nome, valore) {
        if (nome in this.comportamenti) {
            this.comportamenti[nome] = valore;
            return true;
        }
        return false;
    }
};

// Utilizzo
robotConfig.inizializza();
robotConfig.impostaComportamento("seguiLinea", true);
```

### Gestore di Stati

```javascript
let statoRobot = {
    stato: "fermo",  // fermo, movimento, scansione, ecc.
    sottoStato: null,
    ultimoStato: null,
    timestamp: 0,
    
    cambiaStato: function(nuovoStato, sottoStato = null) {
        this.ultimoStato = this.stato;
        this.stato = nuovoStato;
        this.sottoStato = sottoStato;
        this.timestamp = control.millis();
        
        // Logica da eseguire al cambio di stato
        console.log(`Cambio stato: ${this.ultimoStato} -> ${this.stato}`);
        
        // Azioni specifiche per il nuovo stato
        switch(nuovoStato) {
            case "movimento":
                motors.largeAB.run(50);
                break;
            case "fermo":
                motors.largeAB.stop();
                break;
            case "scansione":
                // Avvia scansione
                break;
        }
    },
    
    tempoNelloStato: function() {
        return control.millis() - this.timestamp;
    }
};

// Utilizzo
statoRobot.cambiaStato("movimento", "avanti");
// ... dopo un po' ...
if (statoRobot.stato === "movimento" && statoRobot.tempoNelloStato() > 5000) {
    statoRobot.cambiaStato("fermo");
}
```

## Considerazioni sulle Prestazioni

Quando si lavora con oggetti sul brick EV3:

- Evita oggetti troppo complessi o profondamente annidati
- Limita l'uso di metodi che creano nuovi oggetti
- Considera l'impatto sulla leggibilità del codice vs. prestazioni

## Esercizi Pratici

1. Crea un oggetto per rappresentare il tuo robot EV3 con tutte le sue caratteristiche e funzionalità
2. Implementa un sistema di stati utilizzando oggetti per gestire diversi comportamenti del robot
3. Crea un registro di eventi che memorizza le azioni del robot e le letture dei sensori

---

**Prossima Guida**: [Memorizzazione Dati](03-MemorizzazioneDati.md)

**Guida Precedente**: [Array e Collezioni](01-ArrayCollezioni.md)

**Modulo**: [Gestione Dati e Strutture Dati](README.md)

[Torna all'indice del corso](../README.md)