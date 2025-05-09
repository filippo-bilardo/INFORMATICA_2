# Guida 6: Strutture Dati Avanzate

## Introduzione

Oltre agli array e agli oggetti semplici, JavaScript permette di implementare e utilizzare strutture dati più complesse che possono essere molto utili nella programmazione robotica per organizzare e gestire i dati in modo più efficiente. In questa guida, esploreremo alcune di queste strutture e come potrebbero essere applicate ai progetti con LEGO EV3.

Sebbene MakeCode per EV3 non fornisca implementazioni native di tutte le strutture dati avanzate, i concetti possono essere realizzati utilizzando array e oggetti come blocchi di costruzione.

## Strutture Dati Comuni e Loro Applicazioni

### 1. Code (Queues)

Una coda è una struttura dati lineare che segue il principio FIFO (First-In, First-Out). Gli elementi vengono aggiunti alla fine (enqueue) e rimossi dall'inizio (dequeue).

**Applicazioni EV3:**
-   Gestione di una sequenza di comandi da eseguire.
-   Memorizzazione temporanea di letture di sensori in attesa di elaborazione.
-   Implementazione di un buffer per la comunicazione.

**Implementazione (usando Array):**

```javascript
// Inizializza una coda
let commandQueue = [];

// Aggiungere un comando alla coda (enqueue)
function enqueueCommand(command) {
  commandQueue.push(command);
  brick.showString("Comando aggiunto: " + command, 2);
}

// Rimuovere un comando dalla coda (dequeue)
function dequeueCommand() {
  if (commandQueue.length === 0) {
    brick.showString("Coda comandi vuota", 3);
    return null;
  }
  let command = commandQueue.shift(); // Rimuove e restituisce il primo elemento
  brick.showString("Comando eseguito: " + command, 3);
  return command;
}

// Esempio di utilizzo
enqueueCommand("AVANTI");
enqueueCommand("DESTRA");
enqueueCommand("STOP");

pause(1000);
dequeueCommand(); // Esegue AVANTI
pause(1000);
dequeueCommand(); // Esegue DESTRA
pause(1000);
dequeueCommand(); // Esegue STOP
pause(1000);
dequeueCommand(); // Coda vuota
```

### 2. Pile (Stacks)

Una pila è una struttura dati lineare che segue il principio LIFO (Last-In, First-Out). Gli elementi vengono aggiunti (push) e rimossi (pop) dalla stessa estremità (la cima).

**Applicazioni EV3:**
-   Gestione delle chiamate di funzione (stack di esecuzione).
-   Annullamento di azioni (undo).
-   Esplorazione di percorsi in algoritmi di pathfinding (es. Depth-First Search).

**Implementazione (usando Array):**

```javascript
// Inizializza una pila
let actionStack = [];

// Aggiungere un'azione alla pila (push)
function pushAction(action) {
  actionStack.push(action);
  brick.showString("Azione aggiunta: " + action, 5);
}

// Rimuovere un'azione dalla pila (pop)
function popAction() {
  if (actionStack.length === 0) {
    brick.showString("Pila azioni vuota", 6);
    return null;
  }
  let action = actionStack.pop(); // Rimuove e restituisce l'ultimo elemento
  brick.showString("Azione annullata: " + action, 6);
  return action;
}

// Esempio di utilizzo
pushAction("MOTORE_A_AVANTI");
pushAction("MOTORE_B_INDIETRO");
pushAction("ATTENDI_1S");

pause(1000);
popAction(); // Annulla ATTENDI_1S
pause(1000);
popAction(); // Annulla MOTORE_B_INDIETRO
```

### 3. Mappe (Maps) / Dizionari

Una mappa (o dizionario) è una collezione di coppie chiave-valore, dove ogni chiave è unica. Gli oggetti JavaScript possono essere usati direttamente come mappe semplici, ma `Map` (introdotto in ES6) offre vantaggi come l'uso di qualsiasi tipo di valore come chiave e un'iterazione più prevedibile.

**Applicazioni EV3:**
-   Memorizzare configurazioni del robot (es. velocità dei motori, soglie dei sensori).
-   Associare nomi di sensori ai loro valori attuali.
-   Creare una semplice mappa dell'ambiente (es. { 'posizione_x_y': 'ostacolo' }).

**Implementazione (usando Oggetti o `Map`):**

```javascript
// Utilizzo di Oggetti
let robotConfig = {
  'motorSpeed': 75,
  'lineFollowerPID_P': 0.5,
  'obstacleDistanceThreshold': 20
};

brick.showString("Velocità: " + robotConfig.motorSpeed, 8);
robotConfig['motorSpeed'] = 60; // Modifica valore
brick.showString("Nuova Vel: " + robotConfig['motorSpeed'], 9);

// Utilizzo di Map (più flessibile, ma potrebbe non essere supportato nativamente in tutte le versioni di MakeCode EV3)
// Concettualmente:
// let sensorDataMap = new Map();
// sensorDataMap.set('colorSensor1', 'RED');
// sensorDataMap.set('ultrasonicSensor1', 25.5);
// brick.showString("Colore: " + sensorDataMap.get('colorSensor1'), 10);
```

### 4. Insiemi (Sets)

Un insieme è una collezione di valori unici, senza un ordine particolare. Utile per verificare rapidamente l'appartenenza di un elemento o per rimuovere duplicati.

**Applicazioni EV3:**
-   Tenere traccia degli ostacoli rilevati (evitando duplicati).
-   Memorizzare un insieme di colori che il robot deve riconoscere.

**Implementazione (usando Array e controlli o `Set`):**

```javascript
// Utilizzo di Array con controllo di unicità
let detectedColors = [];

function addDetectedColor(color) {
  if (!detectedColors.includes(color)) {
    detectedColors.push(color);
    brick.showString("Colore rilevato: " + color, 11);
  }
}

addDetectedColor("ROSSO");
addDetectedColor("BLU");
addDetectedColor("ROSSO"); // Non verrà aggiunto di nuovo

// Utilizzo di Set (più efficiente, ma potrebbe non essere supportato nativamente)
// Concettualmente:
// let uniqueObstacles = new Set();
// uniqueObstacles.add('cella_1_1');
// uniqueObstacles.add('cella_2_3');
// uniqueObstacles.add('cella_1_1'); // Non verrà aggiunto di nuovo
// brick.showString("Num ostacoli: " + uniqueObstacles.size, 12);
```

## Strutture Dati per la Mappatura dell'Ambiente

Quando un robot deve navigare o interagire con il suo ambiente, spesso è necessario costruire una rappresentazione interna di tale ambiente (una mappa).

### Griglie (Grid Maps)

Una griglia bidimensionale (spesso un array di array) può rappresentare l'ambiente diviso in celle. Ogni cella può contenere informazioni sullo stato (es. libero, ostacolo, visitato).

**Esempio (concettuale):**

```javascript
// Griglia 5x5, inizializzata a 0 (libero)
let mapGrid = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

// Segna un ostacolo alla posizione (x=1, y=2)
let obstacleX = 1;
let obstacleY = 2;
mapGrid[obstacleY][obstacleX] = 1; // 1 rappresenta un ostacolo

// Controlla se una cella è un ostacolo
if (mapGrid[obstacleY][obstacleX] === 1) {
  brick.showString("Ostacolo a (" + obstacleX + "," + obstacleY + ")", 1);
}

// Funzione per visualizzare la mappa (semplificata)
function displayMap() {
  for (let y = 0; y < mapGrid.length; y++) {
    let rowStr = "";
    for (let x = 0; x < mapGrid[y].length; x++) {
      rowStr += mapGrid[y][x] + " ";
    }
    // In un ambiente EV3 reale, si mostrerebbe una riga alla volta
    // o si userebbe una rappresentazione grafica se disponibile.
    console.log(rowStr); // Per debug in console, se applicabile
  }
}

// displayMap(); // Chiamata per visualizzare la mappa
```

### Grafi (Graphs)

I grafi sono strutture più generali composte da nodi (vertici) e connessioni tra di essi (archi). Possono rappresentare mappe stradali, relazioni tra oggetti, ecc.

**Applicazioni EV3:**
-   Pianificazione di percorsi (es. trovare il percorso più breve tra due punti).
-   Rappresentazione di stati e transizioni in una macchina a stati.

L'implementazione di grafi e algoritmi su grafi (come Dijkstra o A*) è complessa e va oltre lo scopo di questa introduzione, ma è importante conoscerne l'esistenza per problemi di navigazione avanzata.

## Considerazioni per EV3

-   **Memoria Limitata:** Il brick EV3 ha risorse limitate. Strutture dati molto grandi o complesse potrebbero consumare troppa memoria o rallentare l'esecuzione.
-   **Semplicità:** Spesso, soluzioni più semplici basate su array e oggetti sono sufficienti e più facili da debuggare.
-   **Supporto MakeCode:** Verificare sempre quali funzionalità JavaScript sono pienamente supportate dall'ambiente MakeCode per EV3. Alcune funzionalità ES6+ (come `Map` e `Set` nativi) potrebbero non essere disponibili o comportarsi diversamente.

## Conclusione

Comprendere e saper utilizzare diverse strutture dati arricchisce notevolmente le capacità di un programmatore. Anche se non si implementano sempre le versioni più complesse su EV3, conoscere i principi di code, pile, mappe e insiemi aiuta a scrivere codice più organizzato, efficiente e scalabile per i propri robot. La scelta della struttura dati giusta può semplificare la logica del programma e migliorare le prestazioni.

---

[Torna al README del Modulo 09](../README.md)

[Torna all'indice del corso](../../README.md)