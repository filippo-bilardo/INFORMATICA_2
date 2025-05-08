# Arrow Functions

## Introduzione alle Arrow Functions

Le arrow functions (funzioni freccia) sono una sintassi moderna introdotta in JavaScript ES6 per definire funzioni in modo più conciso. Offrono non solo una sintassi più breve, ma anche vantaggi semantici in termini di comportamento del `this` e leggibilità del codice.

Nella programmazione dei robot EV3, le arrow functions sono particolarmente utili per definire funzioni di callback compatte e per scrivere codice più elegante e facile da leggere.

## Sintassi Base

La sintassi base di una arrow function è la seguente:

```javascript
// Sintassi tradizionale di una funzione
function somma(a, b) {
    return a + b;
}

// Equivalente con arrow function
let somma = (a, b) => {
    return a + b;
};

// Versione ancora più concisa per funzioni con un singolo return
let somma = (a, b) => a + b;
```

Come puoi vedere, le arrow functions eliminano la parola chiave `function` e aggiungono una freccia (`=>`) tra i parametri e il corpo della funzione.

## Vantaggi Sintattici

### 1. Espressioni di Ritorno Implicite

Se il corpo della funzione contiene solo un'espressione di ritorno, puoi omettere le parentesi graffe e la parola chiave `return`:

```javascript
// Funzione che calcola la potenza di un motore in base alla distanza da un ostacolo
let calcolaPotenzaSicura = distanza => Math.min(100, distanza * 2);

// Utilizzo
let distanzaOstacolo = sensors.ultrasonic4.distance();
let potenza = calcolaPotenzaSicura(distanzaOstacolo);
motors.largeAB.steer(0, potenza);
```

### 2. Parametri Singoli

Se la funzione ha un solo parametro, puoi omettere le parentesi attorno ad esso:

```javascript
// Con le parentesi (sempre valido)
let quadrato = (x) => x * x;

// Senza parentesi (solo per un parametro)
let quadrato = x => x * x;

// Utilizzo per calcolare l'energia cinetica
let velocita = 30;
let energia = quadrato(velocita) * 0.5;
brick.showValue("Energia", energia, 1);
```

### 3. Funzioni Senza Parametri

Per le funzioni senza parametri, devi comunque includere le parentesi vuote:

```javascript
// Funzione che legge il valore corrente del sensore ultrasonico
let leggiDistanza = () => sensors.ultrasonic4.distance();

// Utilizzo
forever(() => {
    let distanza = leggiDistanza();
    brick.showValue("Distanza", distanza, 1);
    pause(100);
});
```

## Comportamento del `this`

Una delle differenze principali tra le funzioni tradizionali e le arrow functions è il modo in cui gestiscono il contesto `this`. Le arrow functions non hanno un proprio `this`, ma ereditano il `this` dal contesto circostante.

Questo comportamento è particolarmente utile quando si definiscono funzioni di callback all'interno di metodi di oggetti:

```javascript
// Definizione di un oggetto robot con un metodo
let robot = {
    nome: "EV3Explorer",
    velocitaBase: 50,
    
    // Metodo che avvia una pattuglia
    pattuglia: function() {
        brick.showString(`${this.nome} in pattuglia`, 1);
        
        // Con una funzione tradizionale, 'this' cambierebbe contesto
        // e non si riferirebbe più all'oggetto robot
        motors.largeAB.steer(0, this.velocitaBase);
        
        // Utilizzo di una arrow function che mantiene il 'this' dell'oggetto robot
        setTimeout(() => {
            brick.showString(`${this.nome} cambia direzione`, 1);
            motors.largeC.run(30, 1, MoveUnit.Rotations);
        }, 2000);
    }
};

// Avvia la pattuglia
robot.pattuglia();
```

Nel codice sopra, l'arrow function all'interno di `setTimeout` eredita il `this` dal metodo `pattuglia`, quindi `this.nome` si riferisce correttamente a `"EV3Explorer"`.

## Arrow Functions come Callback

Uno degli usi più comuni delle arrow functions è come funzioni di callback, specialmente in metodi come `forEach`, `map`, `filter` o nella funzione `forever` di MakeCode per EV3:

```javascript
// Array di velocità per diverse fasi di una missione
let velocitaMissione = [20, 50, 30, 70, 10];

// Utilizzo di arrow function come callback in forEach
velocitaMissione.forEach(velocita => {
    brick.showValue("Velocità", velocita, 1);
    motors.largeAB.steer(0, velocita);
    pause(2000);
});

// Utilizzo con la funzione forever per monitoraggio continuo
forever(() => {
    let distanza = sensors.ultrasonic4.distance();
    let luce = sensors.color1.light();
    
    brick.showValue("Distanza", distanza, 1);
    brick.showValue("Luce", luce, 2);
    
    pause(100);
});
```

## Arrow Functions con Metodi di Array

Le arrow functions si combinano perfettamente con i metodi di array come `map`, `filter` e `reduce`, rendendo il codice più conciso ed espressivo:

```javascript
// Array di letture di distanza
let letture = [45, 32, 12, 67, 89, 23, 10, 5, 78];

// Filtra solo le letture che indicano una distanza ravvicinata
let ostacoliVicini = letture.filter(distanza => distanza < 20);
brick.showValue("Ostacoli vicini", ostacoliVicini.length, 1);

// Trasforma le letture in valori di velocità sicuri
let velocitaSicure = letture.map(distanza => {
    if (distanza < 10) return 0;
    if (distanza < 30) return 30;
    return 70;
});

// Trova la velocità massima sicura
let velocitaMax = Math.max(...velocitaSicure);
brick.showValue("Velocità max", velocitaMax, 2);
```

## Limitazioni delle Arrow Functions

Nonostante i loro vantaggi, le arrow functions hanno alcune limitazioni:

1. **Non possono essere usate come costruttori**: Non puoi usare `new` con un'arrow function.
2. **Non hanno l'oggetto `arguments`**: Se hai bisogno di accedere a tutti gli argomenti, devi usare i parametri rest (`...args`).
3. **Non possono essere usate come metodi di oggetti** se hai bisogno di accedere all'oggetto attraverso `this`.

## Quando Usare Arrow Functions nella Programmazione EV3

Le arrow functions sono particolarmente utili nei seguenti contesti:

### 1. Funzioni di Callback Brevi

```javascript
// Monitoraggio sensori con callback compatta
forever(() => {
    if (sensors.ultrasonic4.distance() < 15) {
        motors.largeAB.stop();
        brick.showString("Ostacolo!", 1);
    }
    pause(50);
});
```

### 2. Trasformazione di Dati

```javascript
// Conversione di letture di sensori in comandi motore
let lettureDistanza = [35, 42, 21, 10, 53];
let comandiVelocita = lettureDistanza.map(d => Math.min(d * 2, 100));

// Esecuzione dei comandi
comandiVelocita.forEach(v => {
    motors.largeAB.steer(0, v);
    pause(1000);
});
```

### 3. Gestione di Eventi

```javascript
// Reazione ai pulsanti con arrow functions
let gestionePulsanti = () => {
    if (brick.buttonEnter.isPressed()) {
        return "CONFERMA";
    } else if (brick.buttonLeft.isPressed()) {
        return "SINISTRA";
    } else if (brick.buttonRight.isPressed()) {
        return "DESTRA";
    } else {
        return "NESSUNO";
    }
};

// Utilizzo in un ciclo di controllo
forever(() => {
    let pulsante = gestionePulsanti();
    brick.showString(`Pulsante: ${pulsante}`, 1);
    pause(200);
});
```

## Arrow Functions e Programmazione Funzionale

Le arrow functions facilitano l'adozione di uno stile di programmazione funzionale, che può rendere il codice più chiaro e manutenibile:

```javascript
// Generazione di una sequenza di movimenti
let creaSequenzaMovimenti = lunghezza => {
    return Array(lunghezza).fill(0).map((_, i) => {
        return i % 2 === 0 
            ? { tipo: "avanti", durata: 1000 } 
            : { tipo: "rotazione", gradi: 90 };
    });
};

// Esecuzione di una sequenza di movimenti
let eseguiSequenza = movimenti => {
    movimenti.forEach(mossa => {
        if (mossa.tipo === "avanti") {
            motors.largeAB.steer(0, 50);
            pause(mossa.durata);
        } else {
            motors.largeAB.stop();
            motors.largeC.run(30, mossa.gradi / 90, MoveUnit.Rotations);
            pause(500);
        }
    });
    motors.largeAB.stop();
};

// Crea e esegui una sequenza
let sequenza = creaSequenzaMovimenti(6);  // Crea 6 movimenti alternati
eseguiSequenza(sequenza);
```

## Best Practices

1. **Scegli la Sintassi Appropriata**: Usa le funzioni tradizionali quando hai bisogno di `this` o dell'oggetto `arguments`, e le arrow functions per callback e funzioni più concise.

2. **Mantieni la Leggibilità**: Anche se puoi scrivere funzioni molto compatte, assicurati che il codice rimanga leggibile.

3. **Coerenza Stilistica**: Scegli uno stile coerente per l'intero progetto (ad esempio, utilizzare sempre arrow functions per callback).

4. **Documenta le Funzioni Complesse**: Aggiungi commenti per spiegare cosa fa una funzione, specialmente se è complessa o utilizza tecniche avanzate.

## Conclusione

Le arrow functions offrono un modo elegante e conciso per definire funzioni in JavaScript, con benefici aggiuntivi in termini di gestione del contesto `this` e integrazione con la programmazione funzionale. Nella programmazione robotica con EV3, possono rendere il codice più compatto e facile da leggere, soprattutto quando si tratta di gestire callback e trasformazioni di dati.

Mentre continui a sviluppare le tue abilità di programmazione, le arrow functions diventeranno uno strumento indispensabile nel tuo arsenale per creare comportamenti robotici sofisticati e codice ben strutturato.

## Navigazione del Corso
- [📑 Indice](../README.md)
- [⬅️ Scope e Visibilità delle Variabili](03-ScopeVisibilita.md)
- [➡️ Funzioni di Callback](05-FunzioniCallback.md)