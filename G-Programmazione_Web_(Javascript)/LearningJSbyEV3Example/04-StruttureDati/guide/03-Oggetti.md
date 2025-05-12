# Guida 3: Oggetti in JavaScript

## Introduzione agli Oggetti

In JavaScript, un oggetto è una collezione di coppie chiave-valore, dove le chiavi sono stringhe (o Simboli) e i valori possono essere di qualsiasi tipo (numeri, stringhe, booleani, array, funzioni, o altri oggetti). Gli oggetti sono estremamente versatili e vengono utilizzati per rappresentare entità complesse del mondo reale o concetti astratti, come la configurazione di un robot EV3, le sue proprietà (es. colore, nome) o i suoi componenti (es. motori, sensori).

## Creazione di Oggetti

Ci sono diversi modi per creare oggetti in JavaScript:

1.  **Object Literal (Notazione Letterale)**: È il modo più comune e diretto.
    ```javascript
    // Esempio: Configurazione di un motore dell'EV3
    let motoreSinistro = {
        porta: "outA",
        velocita: 50,
        direzione: "avanti",
        attivo: true
    };

    // Esempio: Rappresentazione di un sensore
    let sensoreColore = {
        tipo: "Colore",
        porta: "in1",
        modalita: "ColoreRiflesso",
        valoreCorrente: null // Verrà aggiornato dalla lettura del sensore
    };

    let oggettoVuoto = {}; // Un oggetto vuoto
    ```

2.  **Costruttore `Object()`**:
    ```javascript
    let altroOggetto = new Object();
    altroOggetto.proprieta = "valore";
    ```
    La notazione letterale `{}` è generalmente preferita.

3.  **Costruttori Personalizzati (Funzioni Costruttore o Classi ES6)**: Per creare più oggetti con la stessa struttura. Questo argomento è più avanzato e potrebbe essere trattato in moduli successivi.

## Accesso alle Proprietà

Le proprietà di un oggetto possono essere accessibili in due modi:

1.  **Dot Notation (Notazione con Punto)**: `oggetto.nomeProprieta`
    ```javascript
    console.log(motoreSinistro.porta); // Output: "outA"
    console.log(sensoreColore.tipo);   // Output: "Colore"

    // Modificare una proprietà
    motoreSinistro.velocita = 75;
    console.log(motoreSinistro.velocita); // Output: 75
    ```

2.  **Bracket Notation (Notazione con Parentesi Quadre)**: `oggetto["nomeProprieta"]`
    La notazione con parentesi quadre è utile quando il nome della proprietà è dinamico (memorizzato in una variabile) o contiene caratteri speciali (come spazi, anche se è una pratica sconsigliata per i nomi delle proprietà).
    ```javascript
    console.log(motoreSinistro["direzione"]); // Output: "avanti"

    let proprietaDaLeggere = "modalita";
    console.log(sensoreColore[proprietaDaLeggere]); // Output: "ColoreRiflesso"
    ```

## Aggiungere e Rimuovere Proprietà

-   **Aggiungere una nuova proprietà**:
    ```javascript
    motoreSinistro.posizioneIniziale = 0;
    console.log(motoreSinistro.posizioneIniziale); // Output: 0
    ```

-   **Rimuovere una proprietà** (usando l'operatore `delete`):
    ```javascript
    delete motoreSinistro.attivo;
    console.log(motoreSinistro.attivo); // Output: undefined
    ```

## Metodi negli Oggetti

Quando una proprietà di un oggetto è una funzione, viene chiamata **metodo**. I metodi definiscono i comportamenti che un oggetto può eseguire.

```javascript
let robotEV3 = {
    nome: "Roby",
    batteria: 90, // Percentuale
    sensori: ["colore", "ultrasuoni"],
    stato: "inattivo",

    avvia: function() {
        this.stato = "attivo";
        console.log(`${this.nome} è ora ${this.stato}.`);
    },

    ferma: function() {
        this.stato = "inattivo";
        console.log(`${this.nome} è ora ${this.stato}.`);
    },

    controllaBatteria: function() {
        console.log(`Livello batteria di ${this.nome}: ${this.batteria}%`);
        if (this.batteria < 20) {
            console.log("Attenzione: Batteria scarica!");
        }
    }
};

robotEV3.avvia(); // Output: Roby è ora attivo.
robotEV3.controllaBatteria(); // Output: Livello batteria di Roby: 90%
robotEV3.ferma(); // Output: Roby è ora inattivo.
```
La parola chiave `this` all'interno di un metodo si riferisce all'oggetto stesso a cui il metodo appartiene. Il valore di `this` è determinato da come una funzione viene chiamata (contesto di esecuzione).

    **Contesto di `this` negli Oggetti EV3:**
    Quando un metodo viene chiamato su un oggetto (es. `robotEV3.avvia()`), `this` all'interno di `avvia` punterà a `robotEV3`. Questo è il comportamento più comune e intuitivo.

    ```javascript
    let sensoreUltrasuoni = {
        porta: "in4",
        distanzaCorrente: 0,
        leggiDistanza: function() {
            // Simulazione lettura sensore
            this.distanzaCorrente = Math.floor(Math.random() * 100) + 1; // Valore casuale 1-100 cm
            console.log(`Sensore su porta ${this.porta} rileva: ${this.distanzaCorrente} cm`);
            return this.distanzaCorrente;
        },
        isTroppoVicino: function(soglia) {
            return this.leggiDistanza() < soglia;
        }
    };

    sensoreUltrasuoni.leggiDistanza();
    if (sensoreUltrasuoni.isTroppoVicino(20)) {
        console.log("Attenzione! Ostacolo troppo vicino!");
    }
    ```
    È importante fare attenzione a `this` quando si usano funzioni callback o quando si passa un metodo come riferimento, poiché il contesto di `this` potrebbe cambiare. Le arrow functions (`=>`) hanno un comportamento diverso per `this` (lo ereditano dal contesto lessicale circostante), il che può essere utile in certi scenari, ma è un argomento più avanzato.

## Iterazione su Proprietà di Oggetti

Si può iterare sulle proprietà *enumerabili* di un oggetto usando il ciclo `for...in`. Questo sarà trattato in dettaglio nella guida sull'iterazione.

Oltre a `for...in`, ci sono altri modi per lavorare con le proprietà di un oggetto:

-   **`Object.keys(obj)`**: Restituisce un array contenente i nomi (stringhe) delle proprietà enumerabili di `obj`.
    ```javascript
    let configMotore = { porta: "A", velocita: 60, invertito: false };
    let chiaviConfig = Object.keys(configMotore);
    console.log(chiaviConfig); // Output: ["porta", "velocita", "invertito"]
    chiaviConfig.forEach(chiave => {
        console.log(`${chiave}: ${configMotore[chiave]}`);
    });
    ```

-   **`Object.values(obj)`**: Restituisce un array contenente i valori delle proprietà enumerabili di `obj`.
    ```javascript
    let valoriConfig = Object.values(configMotore);
    console.log(valoriConfig); // Output: ["A", 60, false]
    ```

-   **`Object.entries(obj)`**: Restituisce un array di array, dove ogni sotto-array è una coppia `[chiave, valore]` delle proprietà enumerabili di `obj`.
    ```javascript
    let entriesConfig = Object.entries(configMotore);
    console.log(entriesConfig);
    // Output: [ ["porta", "A"], ["velocita", 60], ["invertito", false] ]
    for (const [chiave, valore] of entriesConfig) {
        console.log(`${chiave} -> ${valore}`);
    }
    ```
Questi metodi sono spesso più diretti e meno proni a errori (come iterare su proprietà ereditate senza `hasOwnProperty`) rispetto a `for...in` per certi casi d'uso.

```javascript
// Esempio: Stampare tutte le proprietà e i valori di motoreSinistro
for (let chiave in motoreSinistro) {
    if (motoreSinistro.hasOwnProperty(chiave)) { // Buona pratica per evitare proprietà ereditate
        console.log(`${chiave}: ${motoreSinistro[chiave]}`);
    }
}
/* Output (l'ordine non è garantito):
   porta: outA
   velocita: 75
   direzione: avanti
   posizioneIniziale: 0
*/
```

## Oggetti Annidati e Array di Oggetti

Gli oggetti possono contenere altri oggetti o array, permettendo di creare strutture dati complesse e gerarchiche.

```javascript
let configurazioneRobot = {
    nome: "EV3-Explorer",
    versioneFirmware: "1.09H",
    componenti: {
        cpu: "ARM9",
        memoriaRAM: "64MB",
        display: {
            risoluzione: "178x128",
            tipo: "Monocromatico"
        }
    },
    motori: [
        { porta: "outA", tipo: "Grande", descrizione: "Motore Sinistro" },
        { porta: "outB", tipo: "Grande", descrizione: "Motore Destro" },
        { porta: "outC", tipo: "Medio", descrizione: "Braccio" }
    ],
    sensori: [
        { porta: "in1", tipo: "Colore" },
        { porta: "in4", tipo: "Ultrasuoni" }
    ]
};

console.log(configurazioneRobot.componenti.display.risoluzione); // Output: "178x128"
console.log(configurazioneRobot.motori[0].descrizione); // Output: "Motore Sinistro"
console.log(configurazioneRobot.sensori[1].tipo); // Output: "Ultrasuoni"

// Aggiungere un nuovo motore
configurazioneRobot.motori.push({ porta: "outD", tipo: "Medio", descrizione: "Pinza" });

// Modificare una proprietà annidata
configurazioneRobot.componenti.display.tipo = "LCD Monocromatico Retroilluminato";

// Esempio EV3: Array di oggetti per una sequenza di azioni
let sequenzaAzioni = [
    { tipo: "movimento", motore: "AB", direzione: "avanti", potenza: 70, durata: 2000 }, // ms
    { tipo: "attesa", durata: 500 },
    { tipo: "suono", file: "effetto.rsf" },
    { tipo: "sensore_check", sensore: "colore_1", condizione: "ugualeA", valore: "rosso", azioneSeVera: "stop" }
];

// Processare la prima azione
console.log(`Azione: ${sequenzaAzioni[0].tipo}, Motori: ${sequenzaAzioni[0].motore}`);
// Output: Azione: movimento, Motori: AB
```

## Applicazioni con EV3

-   **Configurazione del Robot**: Memorizzare impostazioni come porte dei motori/sensori, velocità predefinite, parametri PID.
-   **Stato del Robot**: Rappresentare lo stato corrente del robot (es. `robot.stato = "in esplorazione"`, `robot.ostacoloRilevato = true`).
-   **Modellare Componenti**: Creare oggetti per rappresentare motori, sensori, o altri attuatori, ognuno con le proprie proprietà e metodi.
-   **Dati Strutturati**: Organizzare dati complessi provenienti da più sensori o da calcoli interni. Ad esempio, un oggetto potrebbe contenere le letture correnti di tutti i sensori, insieme a un timestamp.
    ```javascript
    let statoSensoriCorrente = {
        timestamp: Date.now(),
        ultrasuoni_cm: 25,
        colore_rgb: { r: 100, g: 50, b: 30 },
        tocco_premuto: false,
        giroscopio_angolo: 92.5
    };
    ```

-   **Macchine a Stati**: Definire gli stati di un robot e le transizioni tra di essi. Ogni stato può essere un oggetto con proprietà che definiscono il comportamento del robot in quello stato.
    ```javascript
    let macchinaStati = {
        statoCorrente: "IN_ATTESA",
        stati: {
            IN_ATTESA: {
                onAvvio: function() { this.statoCorrente = "ESPLORAZIONE"; console.log("Avvio esplorazione"); },
                loop: function() { /* controlla comandi esterni */ }
            },
            ESPLORAZIONE: {
                onSensoreOstacolo: function() { this.statoCorrente = "EVITA_OSTACOLO"; console.log("Ostacolo rilevato!"); },
                loop: function() { /* muovi robot, leggi sensori */ }
            },
            EVITA_OSTACOLO: {
                onOstacoloSuperato: function() { this.statoCorrente = "ESPLORAZIONE"; console.log("Ostacolo evitato, riprendo esplorazione"); },
                loop: function() { /* esegui manovra evasiva */ }
            }
        },
        transizioneA: function(nuovoStato) {
            if (this.stati[nuovoStato]) {
                console.log(`Transizione da ${this.statoCorrente} a ${nuovoStato}`);
                this.statoCorrente = nuovoStato;
                // Qui si potrebbero chiamare funzioni di setup per il nuovo stato
            } else {
                console.error(`Stato ${nuovoStato} non definito!`);
            }
        }
    };

    // Esempio di utilizzo
    // macchinaStati.stati[macchinaStati.statoCorrente].onAvvio.call(macchinaStati);
    // macchinaStati.transizioneA("ESPLORAZIONE");
    ```

-   **Messaggistica e Comunicazione**: Se l'EV3 comunica con altri dispositivi (es. un PC, un altro EV3, un'app mobile), gli oggetti sono ideali per strutturare i messaggi inviati e ricevuti (spesso serializzati in JSON, vedi guida successiva).
    ```javascript
    let messaggioAlPC = {
        tipo: "aggiornamento_stato",
        idRobot: "EV3-001",
        payload: {
            batteria: 85, // percentuale
            posizione: { x: 10, y: 25 },
            sensoreColore: "blu"
        }
    };
    // Questo oggetto potrebbe essere convertito in JSON e inviato.
    ```

## Best Practices e Suggerimenti per EV3

1.  **Nomi Significativi**: Usa nomi chiari e descrittivi per le proprietà e i metodi. `robot.sensoreColore.leggiValore()` è meglio di `r.sC.getV()`.

2.  **Consistenza**: Mantieni una struttura consistente per oggetti simili. Se hai più oggetti motore, dovrebbero avere le stesse proprietà (es. `porta`, `velocita`, `direzione`).

3.  **Incapsulamento (Base)**: Raggruppa dati e funzioni correlate all'interno di un oggetto. I metodi dell'oggetto dovrebbero operare sui dati dell'oggetto stesso (usando `this`).

4.  **Evita Oggetti Globali Troppo Grandi**: Invece di un singolo oggetto globale monolitico che contiene tutto, considera di suddividere la logica in oggetti più piccoli e focalizzati (es. un oggetto per la gestione dei motori, uno per i sensori, uno per la logica di navigazione).

5.  **Attenzione alla Mutabilità**: Gli oggetti in JavaScript sono tipi riferimento. Se assegni un oggetto a una nuova variabile, entrambe le variabili puntano allo stesso oggetto in memoria. Modifiche tramite una variabile si rifletteranno sull'altra.
    ```javascript
    let config1 = { velocita: 50 };
    let config2 = config1; // config2 ora punta allo stesso oggetto di config1
    config2.velocita = 70;
    console.log(config1.velocita); // Output: 70

    // Per creare una copia (shallow copy per oggetti semplici):
    let config3 = { ...config1 }; // o Object.assign({}, config1)
    config3.velocita = 90;
    console.log(config1.velocita); // Output: 70 (config1 non è cambiato)
    ```
    Per copie profonde (deep copies) di oggetti complessi (contenenti altri oggetti o array), potresti aver bisogno di `JSON.parse(JSON.stringify(obj))` (per oggetti JSON-compatibili) o funzioni di copia ricorsiva.

6.  **Usa `const` per Oggetti che non devono essere Riassegnati**: Se una variabile deve sempre riferirsi allo stesso oggetto (anche se le proprietà dell'oggetto possono cambiare), dichiarala con `const`.
    ```javascript
    const IMPOSTAZIONI_ROBOT = {
        maxVelocita: 100,
        portaSensoreColore: "in1"
    };
    IMPOSTAZIONI_ROBOT.maxVelocita = 90; // OK: modifica una proprietà
    // IMPOSTAZIONI_ROBOT = {}; // Errore: non si può riassegnare una costante
    ```

7.  **Metodi vs. Funzioni Esterne**: Decide se una funzionalità debba essere un metodo di un oggetto o una funzione separata. Se la funzione opera primariamente sui dati interni dell'oggetto e rappresenta un comportamento di quell'oggetto, rendila un metodo. Se è un'utilità più generica, potrebbe essere una funzione esterna che prende l'oggetto come parametro.

## Conclusione

Gli oggetti sono una pietra miliare della programmazione in JavaScript e offrono un modo potente per strutturare e gestire dati complessi. Per la programmazione dell'EV3, gli oggetti permettono di creare modelli chiari e organizzati del robot, dei suoi componenti e del suo ambiente, facilitando lo sviluppo di comportamenti sofisticati e codice più manutenibile.

---

[⬅️ Torna all'elenco delle Guide](./README.md) | [➡️ Vai alla Guida Successiva: Iterazione](./04-Iterazione.md)