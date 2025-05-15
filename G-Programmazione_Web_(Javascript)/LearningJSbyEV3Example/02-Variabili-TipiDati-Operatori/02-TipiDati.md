# Tipi di Dati

In JavaScript, comprendere i diversi tipi di dati è fondamentale per scrivere programmi efficaci. Questo capitolo esplorerà i vari tipi di dati disponibili in JavaScript e come utilizzarli nella programmazione del robot EV3.

## Introduzione ai Tipi di Dati in JavaScript

In JavaScript, tutti i valori sono categorizzati in due grandi famiglie: **tipi primitivi** e **tipi di riferimento**. Questa distinzione è fondamentale perché influenza profondamente il modo in cui i dati vengono memorizzati, copiati e confrontati durante l'esecuzione di un programma.

### Tipi Primitivi

I tipi primitivi sono valori semplici che vengono memorizzati direttamente nello stack di memoria. Quando assegni un valore primitivo a una variabile o lo passi a una funzione, JavaScript crea una copia del valore stesso (non un riferimento ad esso).

Caratteristiche principali dei tipi primitivi:
- **Immutabilità**: Una volta creati, non possono essere modificati.
- **Confronto per valore**: Due valori primitivi sono uguali se hanno lo stesso valore.
- **Memorizzazione nello stack**: Accesso rapido e gestione diretta in memoria.
- **Passaggio per valore**: Quando li assegni a una variabile o li passi a una funzione, viene creata una copia indipendente.

JavaScript include sette tipi primitivi:
1. **Number**: Rappresenta sia numeri interi che decimali (es. `42`, `3.14`)
2. **String**: Sequenze di caratteri racchiuse tra apici (es. `"Ciao"`, `'EV3'`)
3. **Boolean**: Rappresenta un valore logico, `true` o `false`
4. **Undefined**: Indica una variabile dichiarata ma non inizializzata 
5. **Null**: Rappresenta intenzionalmente l'assenza di un valore
6. **Symbol**: Valore univoco e immutabile, utilizzato come identificatore (ES6+)
7. **BigInt**: Permette di lavorare con numeri interi di dimensioni arbitrarie (ES2020+)

### Tipi di Riferimento

I tipi di riferimento sono strutture di dati complesse che vengono memorizzate nell'heap di memoria. Quando lavori con tipi di riferimento, la variabile contiene un riferimento (puntatore) alla posizione di memoria dove l'oggetto è memorizzato, non l'oggetto stesso.

Caratteristiche principali dei tipi di riferimento:
- **Mutabilità**: Possono essere modificati dopo la creazione.
- **Confronto per riferimento**: Due oggetti sono considerati uguali solo se puntano esattamente alla stessa istanza in memoria.
- **Memorizzazione nell'heap**: Permette strutture dati complesse e dimensioni variabili.
- **Passaggio per riferimento**: Quando li assegni o li passi a una funzione, viene passato il riferimento, non una copia del valore.

In JavaScript, i tipi di riferimento includono:
1. **Object**: La base di tutti i tipi di riferimento. Un oggetto è una collezione di proprietà (coppie chiave-valore).
2. **Array**: Collezioni ordinate di valori, accessibili tramite indici numerici (tecnicamente sono oggetti speciali).
3. **Function**: Le funzioni in JavaScript sono oggetti di prima classe, possono avere proprietà e metodi.
4. **Date**: Rappresentazioni di date e orari.
5. **RegExp**: Espressioni regolari per pattern matching.
6. **Map** e **Set**: Strutture dati più avanzate introdotte in ES6.
7. **Promise**, **Generator**, **AsyncFunction**: Oggetti per gestire operazioni asincrone.
8. **TypedArray**: Array con tipo per gestire dati binari.
9. **Oggetti wrapper** come `Number`, `String`, `Boolean`: Versioni oggetto dei tipi primitivi.

### Differenze Pratiche tra Tipi Primitivi e di Riferimento

Per capire meglio la differenza, consideriamo alcuni esempi:

```javascript
// Tipi primitivi - passaggio per valore
let a = 5;
let b = a;  // 'b' ottiene una copia del valore di 'a'
a = 10;     // Modificare 'a' non influisce su 'b'
console.log(b);  // Output: 5

// Tipi di riferimento - passaggio per riferimento
let objA = { nome: "EV3" };
let objB = objA;  // 'objB' ottiene un riferimento allo stesso oggetto
objA.nome = "Robot";  // Modificare objA modifica anche objB
console.log(objB.nome);  // Output: "Robot"
```

## I Tipi di Dati in JavaScript

JavaScript ha otto tipi di dati fondamentali, suddivisi in due categorie:

### Tipi Primitivi:
1. **Number** (numeri): rappresenta sia numeri interi che decimali, basati sul formato IEEE 754 a 64 bit. Può memorizzare valori da -(2^53 - 1) a (2^53 - 1).
2. **String** (stringhe di testo): sequenze di caratteri Unicode racchiuse tra apici singoli, doppi o backtick. Utili per rappresentare testo e dati non numerici.
3. **Boolean** (vero/falso): può avere solo due valori, `true` o `false`. Utilizzato per rappresentare stati binari e per controlli condizionali.
4. **Undefined** (valore non definito): indica che una variabile è stata dichiarata ma non le è stato assegnato alcun valore. È anche il valore restituito quando si accede a proprietà inesistenti.
5. **Null** (valore nullo intenzionale): rappresenta un valore vuoto o inesistente assegnato deliberatamente. A differenza di `undefined`, `null` è un valore che indica l'assenza intenzionale di un oggetto.
6. **Symbol** (simbolo univoco): tipo introdotto in ES6, rappresenta un identificatore unico e immutabile. Utile per evitare collisioni di nomi di proprietà negli oggetti.
7. **BigInt** (numeri interi molto grandi): tipo introdotto in ES2020, permette di rappresentare e operare su numeri interi di lunghezza arbitraria, superando i limiti del tipo Number.

### Tipi di Riferimento:
8. **Object** (oggetti): strutture di dati complesse che raccolgono dati correlati e funzionalità. Tutti i tipi non primitivi (array, funzioni, date, RegExp, ecc.) sono istanze di Object e memorizzati come riferimenti. Gli oggetti includono:
   - **Object standard**: collezioni di proprietà (coppie chiave-valore).
   - **Array**: collezioni ordinate di elementi accessibili tramite indice.
   - **Function**: blocchi di codice riutilizzabili trattati come oggetti di prima classe.
   - **Date**: rappresentazione di date e orari con metodi per manipolazione e formattazione.
   - **RegExp**: pattern di ricerca nelle stringhe tramite espressioni regolari.
   - **Map e Set**: strutture dati moderne per gestire collezioni con funzionalità avanzate.
   - **Promise**: oggetti per gestire operazioni asincrone e loro risultati.
   - **Error**: oggetti specializzati per rappresentare errori durante l'esecuzione.

Nell'ambito della programmazione EV3 con MakeCode, ci concentreremo principalmente su Number, String, Boolean e Object (inclusi gli Array).

## 1. Number (Numeri)

In JavaScript, tutti i numeri sono rappresentati come valori a virgola mobile (anche se appaiono come interi).

### Esempi di Numeri:

```javascript
let velocita = 50;          // Intero
let potenza = 0.75;         // Decimale
let distanzaMax = 100.5;    // Decimale
let tempoAttesa = 2000;     // Intero (millisecondi)
```

### Operazioni con i Numeri:

```javascript
let velocitaBase = 50;
let fattoreAccelerazione = 1.5;
let velocitaFinale = velocitaBase * fattoreAccelerazione;  // 75

// Potenze e radici
let area = Math.pow(10, 2);  // 10^2 = 100
let distanza = Math.sqrt(25);  // √25 = 5

// Arrotondamenti
let sensorValue = 23.7;
let valueRounded = Math.round(sensorValue);  // 24
let valueFloor = Math.floor(sensorValue);    // 23 (arrotondamento per difetto)
let valueCeil = Math.ceil(sensorValue);      // 24 (arrotondamento per eccesso)
```

### Numeri Speciali:

```javascript
let infinito = Infinity;           // Rappresenta l'infinito
let negativoInfinito = -Infinity;  // Infinito negativo
let nonNumero = NaN;               // Not a Number (risultato di operazioni non valide)
```

### Utilizzo nella Programmazione EV3:

```javascript
// Controllo della velocità dei motori
let velocitaNormale = 50;
let velocitaRapida = 80;
let velocitaLenta = 30;

// Scelta della velocità in base alla situazione
motors.largeBC.tank(velocitaNormale, velocitaNormale);

// Calcoli per conversioni
let gradi = 90;
let millisecondi = gradi * 10;  // Tempo approssimativo per ruotare di 90 gradi
```

## 2. String (Stringhe)

Le stringhe sono sequenze di caratteri utilizzate per rappresentare testo.

### Creazione di Stringhe:

```javascript
let messaggio = "Hello EV3!";
let comando = 'ruota';
let istruzioni = `Premi il pulsante centrale per iniziare`; // Template literal
```

### Operazioni con le Stringhe:

```javascript
// Concatenazione (unione di stringhe)
let nomeRobot = "EV3";
let saluto = "Ciao, sono " + nomeRobot + "!";  // "Ciao, sono EV3!"

// Template literals (più leggibile per stringhe complesse)
let stato = "attivo";
let batteria = 87;
let infoRobot = `Robot: ${nomeRobot}, Stato: ${stato}, Batteria: ${batteria}%`;

// Lunghezza di una stringa
let lunghezzaMessaggio = messaggio.length;  // 10 per "Hello EV3!"

// Estrazione di parti di una stringa
let primaParola = messaggio.substring(0, 5);  // "Hello"
```

### Utilizzo nella Programmazione EV3:

```javascript
// Visualizzazione di messaggi sul display
brick.showString("Avvio programma...", 1);

// Uso di stringhe per stati del robot
let statoRobot = "in attesa";
if (statoRobot === "in attesa") {
    brick.showString("Robot in attesa di comandi", 2);
}

// Costruzione di messaggi informativi
let distanza = sensors.ultrasonic4.distance();
brick.showString(`Distanza: ${distanza} cm`, 3);
```

## 3. Boolean (Booleani)

I valori booleani rappresentano uno stato binario: vero o falso.

### Creazione di Booleani:

```javascript
let robotAttivo = true;
let ostacolomRilevato = false;
```

### Operazioni con i Booleani:

```javascript
// Inversione (NOT logico)
let sensoreNonPremuto = !sensors.touch1.isPressed();

// Combinazione con AND logico (&&)
let condizioniSicurezza = distanzaSufficiente && batteriaCarica;

// Combinazione con OR logico (||)
let necessitaStop = ostacoloRilevato || batteriaInsufficiente;
```

### Utilizzo nella Programmazione EV3:

```javascript
// Controllo del movimento basato su condizioni booleane
let percorsoLibero = sensors.ultrasonic4.distance() > 20;

if (percorsoLibero) {
    motors.largeBC.tank(50, 50);  // Avanti
} else {
    motors.largeBC.stop();        // Ferma
}

// Utilizzo in cicli
let programmaAttivo = true;

while (programmaAttivo) {
    // Esegui azioni...
    
    // Condizione di uscita
    if (sensors.touch1.isPressed()) {
        programmaAttivo = false;  // Termina il ciclo
    }
}
```

## 4. Undefined e Null

Questi tipi rappresentano l'assenza di un valore, ma in modi diversi.

### Undefined:

```javascript
let sensore;  // Variabile dichiarata ma non inizializzata, valore: undefined

// Verifica se una variabile è undefined
if (sensore === undefined) {
    sensore = sensors.touch1;  // Inizializzazione
}
```

### Null:

```javascript
let connessione = null;  // Esplicitamente impostata a null (nessun valore intenzionalmente)

// Verifica se una variabile è null
if (connessione === null) {
    // Tentativo di stabilire una connessione
    connessione = brick.establishConnection();
}
```

## 5. Object (Oggetti)

Gli oggetti sono collezioni di coppie chiave-valore che permettono di organizzare dati correlati.

### Creazione di Oggetti:

```javascript
let robot = {
    nome: "Explorer",
    motoriPrincipali: "B e C",
    velocita: 50,
    attivo: true
};
```

### Accesso alle Proprietà degli Oggetti:

```javascript
let nomeRobot = robot.nome;        // "Explorer"
let motori = robot["motoriPrincipali"];  // "B e C"

// Modifica delle proprietà
robot.velocita = 75;
robot["attivo"] = false;
```

### Oggetti Annidati:

```javascript
let missioneRobot = {
    id: "M001",
    robot: {
        nome: "Scout",
        configurazione: {
            motori: {
                sinistro: "B",
                destro: "C"
            },
            sensori: {
                tocco: 1,
                ultrasuoni: 4
            }
        }
    },
    durata: 120
};

// Accesso a proprietà annidate
let motoreSinistro = missioneRobot.robot.configurazione.motori.sinistro;  // "B"
```

### Utilizzo nella Programmazione EV3:

```javascript
// Configurazione centralizzata
let config = {
    motori: {
        sinistro: "B",
        destro: "C",
        braccio: "A"
    },
    velocita: {
        normale: 50,
        veloce: 80,
        lenta: 30
    },
    limiti: {
        distanzaMinima: 10,
        batteriaBassa: 20
    }
};

// Utilizzo della configurazione
motors.large(config.motori.sinistro).run(config.velocita.normale);

// Oggetto per memorizzare lo stato del robot
let statoRobot = {
    inMovimento: false,
    direzione: "fermo",
    velocitaAttuale: 0,
    distanzaPercorsa: 0
};

// Aggiornamento dello stato
function avanti() {
    statoRobot.inMovimento = true;
    statoRobot.direzione = "avanti";
    statoRobot.velocitaAttuale = config.velocita.normale;
    motors.largeBC.tank(config.velocita.normale, config.velocita.normale);
}
```

## 6. Array

Gli array sono oggetti speciali utilizzati per memorizzare collezioni ordinate di valori.

### Creazione di Array:

```javascript
let velocita = [30, 50, 70];  // Array di numeri
let direzioni = ["avanti", "indietro", "sinistra", "destra"];  // Array di stringhe
let misto = [10, "ciao", true, {nome: "EV3"}];  // Array con tipi diversi
```

### Accesso agli Elementi di un Array:

```javascript
let primaVelocita = velocita[0];  // 30 (gli indici partono da 0)
let ultimaDirezione = direzioni[3];  // "destra"

// Modifica di elementi
velocita[1] = 55;  // L'array diventa [30, 55, 70]
```

### Metodi Comuni degli Array:

```javascript
// Aggiunta di elementi
direzioni.push("rotazione");  // Aggiunge alla fine: ["avanti", "indietro", "sinistra", "destra", "rotazione"]

// Rimozione di elementi
let ultimaDirezioneRimossa = direzioni.pop();  // Rimuove e restituisce "rotazione"

// Lunghezza dell'array
let numeroVelocita = velocita.length;  // 3

// Iterazione su un array
for (let i = 0; i < direzioni.length; i++) {
    brick.showString(`Direzione ${i+1}: ${direzioni[i]}`, i+1);
}

// Metodo forEach
velocita.forEach(function(vel, indice) {
    brick.showString(`Velocità ${indice+1}: ${vel}`, indice+1);
});
```

### Utilizzo nella Programmazione EV3:

```javascript
// Sequenza di movimenti predefinita
let sequenzaMovimenti = [
    {direzione: "avanti", velocita: 50, durata: 2000},
    {direzione: "sinistra", velocita: 40, durata: 1000},
    {direzione: "avanti", velocita: 60, durata: 3000},
    {direzione: "destra", velocita: 40, durata: 1000}
];

// Esecuzione della sequenza
for (let i = 0; i < sequenzaMovimenti.length; i++) {
    let movimento = sequenzaMovimenti[i];
    
    brick.showString(`Movimento: ${movimento.direzione}`, 1);
    
    if (movimento.direzione === "avanti") {
        motors.largeBC.tank(movimento.velocita, movimento.velocita);
    } else if (movimento.direzione === "sinistra") {
        motors.largeBC.tank(-movimento.velocita, movimento.velocita);
    } else if (movimento.direzione === "destra") {
        motors.largeBC.tank(movimento.velocita, -movimento.velocita);
    }
    
    pause(movimento.durata);
    motors.largeBC.stop();
}
```

## 7. Symbol

I Symbol sono un tipo di dato primitivo introdotto in ES6 (ECMAScript 2015) che rappresenta un identificatore unico e immutabile.

### Creazione di un Symbol:

```javascript
// Creazione di un Symbol
let id = Symbol();
let id2 = Symbol('descrizione');  // Con una descrizione opzionale per il debug

// Due Symbol sono sempre diversi, anche con la stessa descrizione
let id3 = Symbol('id');
let id4 = Symbol('id');
console.log(id3 === id4);  // false

// Utilizzo come chiavi di proprietà di oggetti
let oggetto = {};
oggetto[id] = 'Valore con chiave Symbol';
```

### Casi d'uso comuni:

```javascript
// 1. Proprietà "private" negli oggetti (pre-classi private)
const chiavePrivata = Symbol('proprietàPrivata');
let obj = {
    [chiavePrivata]: 'Questo valore non è facilmente accessibile'
};

// 2. Evitare collisioni di nomi in proprietà
const CONFIGURAZIONE = Symbol('config');
class Robot {
    constructor(nome) {
        this.nome = nome;
        this[CONFIGURAZIONE] = {
            // Configurazioni interne
        };
    }
}

// 3. Costanti univoche
const DIREZIONE = {
    SU: Symbol('su'),
    GIU: Symbol('giù'),
    SINISTRA: Symbol('sinistra'),
    DESTRA: Symbol('destra')
};
```

### Utilizzo nella Programmazione EV3:

Nell'ambiente MakeCode per EV3, i Symbol non vengono utilizzati frequentemente, ma possono essere utili in progetti più complessi per garantire l'unicità delle chiavi di configurazione o per definire stati interni del robot.

```javascript
// Definizione di stati univoci del robot
const STATO_ROBOT = {
    INATTIVO: Symbol('inattivo'),
    ESPLORAZIONE: Symbol('esplorazione'),
    SEGUIMENTO_LINEA: Symbol('seguimentoLinea'),
    EVITAMENTO_OSTACOLI: Symbol('evitamentoOstacoli')
};

// Utilizzo
let statoCorrente = STATO_ROBOT.INATTIVO;

function cambiaStato(nuovoStato) {
    brick.showString(`Cambio stato: ${String(nuovoStato.description)}`, 1);
    statoCorrente = nuovoStato;
}

// Cambio stato
cambiaStato(STATO_ROBOT.ESPLORAZIONE);
```

## 9. Altri Tipi di Oggetti Importanti

Oltre agli oggetti standard, array, symbol e bigint, JavaScript fornisce altri tipi di oggetti specializzati che sono utili in contesti specifici.

### 9.1 Function

Le funzioni in JavaScript sono oggetti di prima classe, il che significa che possono essere assegnate a variabili, passate come argomenti e restituite da altre funzioni.

```javascript
// Definizione di una funzione
function calcolaVelocita(distanza, tempo) {
    return distanza / tempo;
}

// Funzione come valore
let calcolo = calcolaVelocita;
let risultato = calcolo(100, 5);  // 20

// Funzioni anonime
let fermaRobot = function() {
    motors.largeBC.stop();
};

// Arrow functions (ES6)
let avanza = () => {
    motors.largeBC.tank(50, 50);
};

// Funzioni come parametri
function eseguiDopoPausa(funzione, millisecondi) {
    pause(millisecondi);
    funzione();
}

eseguiDopoPausa(() => {
    brick.showString("Azione completata", 1);
}, 2000);
```

### 9.2 Date

L'oggetto `Date` permette di lavorare con date e orari.

```javascript
// Data corrente
let adesso = new Date();

// Data specifica
let dataInizio = new Date(2023, 8, 15);  // 15 settembre 2023 (i mesi partono da 0)

// Estrarre componenti della data
let anno = adesso.getFullYear();
let mese = adesso.getMonth() + 1;  // +1 perché i mesi partono da 0
let giorno = adesso.getDate();
let ore = adesso.getHours();
let minuti = adesso.getMinutes();

// Calcolare durate
let inizio = new Date();
// ... esegui operazioni ...
let fine = new Date();
let durata = fine - inizio;  // Durata in millisecondi

// Utilizzo nella programmazione EV3
function registraTempiEsecuzione() {
    let inizio = new Date();
    // Esegui operazioni robot
    let fine = new Date();
    let durata = fine - inizio;
    brick.showString(`Durata: ${durata}ms`, 1);
}
```

### 9.3 RegExp (Espressioni Regolari)

Le espressioni regolari sono pattern utilizzati per trovare corrispondenze in stringhe.

```javascript
// Creazione di un'espressione regolare
let pattern = /^\d{3}-\d{2}$/;  // Formato: 123-45

// Test di una stringa contro un pattern
let codiceValido = pattern.test("123-45");  // true
let codiceNonValido = pattern.test("1234-5");  // false

// Ricerca in una stringa
let testo = "Il sensore 1 è attivo e il sensore 2 è inattivo";
let numeri = testo.match(/\d+/g);  // ["1", "2"]

// Sostituzione basata su pattern
let comando = "motore-sinistra-avanti";
let comandoFormattato = comando.replace(/-/g, " ");  // "motore sinistra avanti"
```

### 9.4 Map e Set

`Map` e `Set` sono strutture dati introdotte in ES6 che offrono funzionalità aggiuntive rispetto agli oggetti e agli array.

#### Map

```javascript
// Creazione di una Map
let configSensori = new Map();

// Aggiunta di elementi (chiave-valore)
configSensori.set("ultrasuono", 4);
configSensori.set("tocco", 1);
configSensori.set("colore", 3);

// Accesso ai valori
let portaUltrasuono = configSensori.get("ultrasuono");  // 4

// Verifica esistenza chiave
let haColore = configSensori.has("colore");  // true

// Dimensione e cancellazione
let numeroSensori = configSensori.size;  // 3
configSensori.delete("tocco");  // Rimuove l'elemento
```

#### Set

```javascript
// Creazione di un Set (valori unici)
let comandiDisponibili = new Set(["avanti", "indietro", "sinistra", "destra", "stop"]);

// Aggiunta di elementi
comandiDisponibili.add("rotazione");

// Verifica esistenza
let puoRuotare = comandiDisponibili.has("rotazione");  // true

// Dimensione e cancellazione
let numeroComandi = comandiDisponibili.size;  // 6
comandiDisponibili.delete("rotazione");  // Rimuove l'elemento
```

### 9.5 Promise

Le `Promise` sono oggetti utilizzati per gestire operazioni asincrone.

```javascript
// Creazione di una Promise
let operazioneAsincrona = new Promise((resolve, reject) => {
    // Operazione che richiede tempo...
    let successo = true;
    
    if (successo) {
        resolve("Operazione completata!");
    } else {
        reject("Si è verificato un errore");
    }
});

// Utilizzo di una Promise
operazioneAsincrona
    .then(risultato => {
        console.log(risultato);  // "Operazione completata!"
    })
    .catch(errore => {
        console.error(errore);
    });

// Esempio pratico nella programmazione EV3
function misuraDistanzaConRitardo(millisecondi) {
    return new Promise((resolve, reject) => {
        pause(millisecondi);
        let distanza = sensors.ultrasonic4.distance();
        
        if (distanza < 0) {
            reject("Errore di lettura del sensore");
        } else {
            resolve(distanza);
        }
    });
}

// Utilizzo
misuraDistanzaConRitardo(500)
    .then(distanza => {
        brick.showString(`Distanza: ${distanza} cm`, 1);
    })
    .catch(errore => {
        brick.showString(`Errore: ${errore}`, 1);
    });
```

### 9.6 Error

Gli oggetti `Error` rappresentano errori durante l'esecuzione del programma.

```javascript
// Creazione di un oggetto Error
let errore = new Error("Sensore non connesso");

// Utilizzo in try-catch
try {
    // Operazione che potrebbe generare un errore
    if (sensors.ultrasonic4.distance() < 0) {
        throw new Error("Lettura sensore non valida");
    }
} catch (e) {
    brick.showString(`Errore: ${e.message}`, 1);
}

// Tipi specializzati di errori
let sintassi = new SyntaxError("Errore di sintassi");
let tipi = new TypeError("Tipo non valido");
let riferimento = new ReferenceError("Variabile non definita");
```

### 9.7 Oggetti Wrapper (String, Number, Boolean)

JavaScript fornisce oggetti wrapper per i tipi primitivi, che consentono di accedere a metodi e proprietà utili.

```javascript
// Primitive vs Wrapper
let testoPrimitivo = "ciao";
let testoOggetto = new String("ciao");

typeof testoPrimitivo;  // "string"
typeof testoOggetto;    // "object"

// JavaScript converte automaticamente tra primitive e wrapper quando necessario
let lunghezza = "ciao".length;  // 4 (conversione implicita a oggetto String)

// Metodi degli oggetti wrapper
let num = 42.56789;
num.toFixed(2);         // "42.57" (arrotondamento a 2 decimali)
num.toString(2);        // "101010" (conversione in base 2)

let bool = true;
bool.toString();        // "true"
```

## Conversione tra Tipi di Dati

In JavaScript, a volte è necessario convertire i dati da un tipo all'altro.

### Da Stringa a Numero:

```javascript
let velocitaTesto = "50";
let velocitaNumero = Number(velocitaTesto);  // 50 come numero
// oppure
let velocitaNumero2 = parseInt(velocitaTesto, 10);  // 50 come intero
let velocitaDecimale = parseFloat("50.5");  // 50.5 come decimale
```

### Da Numero a Stringa:

```javascript
let distanza = 42;
let distanzaTesto = String(distanza);  // "42"
// oppure
let distanzaTesto2 = distanza.toString();  // "42"
```

### Altri Esempi di Conversione:

```javascript
// Booleano a String
let attivo = true;
let attivoTesto = String(attivo);  // "true"

// Vari tipi a Booleano
let booleano1 = Boolean(1);       // true
let booleano2 = Boolean(0);       // false
let booleano3 = Boolean("");      // false
let booleano4 = Boolean("ciao");  // true
```

## Verifica del Tipo di Dati

Per verificare il tipo di un valore, puoi utilizzare l'operatore `typeof`:

```javascript
let tipo1 = typeof 42;          // "number"
let tipo2 = typeof "ciao";      // "string"
let tipo3 = typeof true;        // "boolean"
let tipo4 = typeof undefined;   // "undefined"
let tipo5 = typeof null;        // "object" (questo è considerato un bug storico di JavaScript)
let tipo6 = typeof {};          // "object"
let tipo7 = typeof [];          // "object" (gli array sono un tipo di oggetto)
let tipo8 = typeof function(){}; // "function"
```

## Esercizi Pratici

1. **Registro Dati Sensori**: Crea un programma che registri i valori di un sensore in un array e poi calcoli statistiche come media, minimo e massimo.

2. **Configurazione Robot**: Crea un oggetto di configurazione complesso per il tuo robot, incluse impostazioni per motori, sensori, velocità e comportamenti.

3. **Conversione di Unità**: Implementa funzioni che convertano valori tra diverse unità (ad esempio, da gradi a millisecondi di rotazione, da centimetri a tempo di percorrenza).

Nel prossimo capitolo, esploreremo gli operatori in JavaScript e come utilizzarli per manipolare dati e creare espressioni complesse per controllare il comportamento del robot EV3.

## Navigazione del Corso
- [📑 Indice](../README.md)
- [⬅️ Variabili in JavaScript](01-Variabili.md)
- [➡️ Operatori](03-Operatori.md)