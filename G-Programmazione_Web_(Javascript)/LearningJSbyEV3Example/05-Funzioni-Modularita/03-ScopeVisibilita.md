# Scope e Visibilità delle Variabili

## Introduzione allo Scope

Lo "scope" (o ambito di visibilità) in JavaScript determina dove le variabili sono accessibili all'interno del codice. Comprendere lo scope è fondamentale per scrivere funzioni efficaci e prevenire errori di programmazione.

Nella programmazione robotica, gestire correttamente lo scope delle variabili è particolarmente importante per mantenere i comportamenti del robot prevedibili e per evitare interferenze indesiderate tra diverse parti del programma.

## Tipi di Scope in JavaScript

JavaScript ha principalmente tre tipi di scope:

1. **Scope Globale**: Variabili definite al di fuori di qualsiasi funzione o blocco
2. **Scope di Funzione**: Variabili definite all'interno di una funzione
3. **Scope di Blocco**: Variabili definite all'interno di un blocco (come un ciclo o un'istruzione if)

## Scope Globale

Le variabili con scope globale sono accessibili da qualsiasi parte del programma, incluse tutte le funzioni:

```javascript
// Variabile globale
let velocitaDefault = 50;

function muoviAvanti() {
    // La variabile velocitaDefault è accessibile qui
    motors.largeAB.steer(0, velocitaDefault);
    pause(1000);
    motors.largeAB.stop();
}

function muoviIndietro() {
    // La stessa variabile è accessibile anche qui
    motors.largeAB.steer(0, -velocitaDefault);
    pause(1000);
    motors.largeAB.stop();
}
```

### Vantaggi e Svantaggi delle Variabili Globali

**Vantaggi**:
- Accessibili da qualsiasi parte del programma
- Utili per costanti e configurazioni che devono essere condivise

**Svantaggi**:
- Possono essere modificate accidentalmente da qualsiasi parte del codice
- Rendono difficile tracciare i cambiamenti di stato
- Possono causare conflitti di nomi (name collision)

## Scope di Funzione

Le variabili dichiarate all'interno di una funzione sono visibili solo all'interno di quella funzione:

```javascript
function seguiLinea() {
    // Variabile locale alla funzione
    let velocitaBase = 30;
    
    // Questa variabile è accessibile solo qui dentro
    motors.largeAB.steer(0, velocitaBase);
    
    // Logica per seguire la linea...
}

function evitaOstacoli() {
    // velocitaBase non è accessibile qui
    // Il tentativo di usarla causerebbe un errore
    // motors.largeAB.steer(0, velocitaBase); // Questo causerebbe un errore!
    
    // Bisogna definire una nuova variabile
    let velocitaManovra = 20;
    // ...
}
```

### Il Vantaggio dell'Isolamento

Lo scope di funzione fornisce un isolamento che protegge le variabili da modifiche accidentali:

```javascript
function manovraComplessa() {
    // Queste variabili sono protette all'interno della funzione
    let passoCorrente = 1;
    let completato = false;
    
    while (!completato) {
        brick.showValue("Passo", passoCorrente, 1);
        
        switch (passoCorrente) {
            case 1:
                motors.largeAB.steer(0, 30);
                pause(2000);
                passoCorrente = 2;
                break;
            case 2:
                motors.largeC.run(40, 1, MoveUnit.Rotations);
                passoCorrente = 3;
                break;
            case 3:
                motors.largeAB.steer(0, 30);
                pause(1000);
                completato = true;
                break;
        }
    }
    
    // Le variabili passoCorrente e completato non interferiscono
    // con nessun'altra parte del programma
}
```

## Scope di Blocco con let e const

JavaScript moderno (ES6+) introduce le dichiarazioni `let` e `const` che rispettano lo scope di blocco. Ciò significa che le variabili definite con queste parole chiave all'interno di un blocco (come un ciclo o un'istruzione if) sono accessibili solo all'interno di quel blocco:

```javascript
function pattugliaPerimetro() {
    for (let i = 0; i < 4; i++) {
        // La variabile i è accessibile solo all'interno di questo ciclo
        brick.showValue("Lato", i + 1, 1);
        
        // Muovi in avanti
        motors.largeAB.steer(0, 40);
        pause(2000);
        motors.largeAB.stop();
        
        // Ruota di 90 gradi
        motors.largeC.run(30, 1, MoveUnit.Rotations);
        pause(500);
    }
    
    // Qui i non è più accessibile
    // brick.showValue("Ultimo lato", i, 2); // Questo causerebbe un errore!
}
```

### let vs var

A differenza di `let`, la parola chiave più antica `var` non rispetta lo scope di blocco:

```javascript
function esempioVar() {
    if (true) {
        var x = 10;  // x è accessibile anche fuori dal blocco if
        let y = 20;  // y è accessibile solo all'interno del blocco if
    }
    
    brick.showValue("x", x, 1);  // Funziona, mostra 10
    // brick.showValue("y", y, 2);  // Errore! y non è definita qui
}
```

Per questo motivo, nelle applicazioni moderne è generalmente consigliato usare `let` e `const` invece di `var`.

## Costanti con const

La dichiarazione `const` crea una variabile il cui valore non può essere riassegnato. È ideale per valori che non dovrebbero cambiare durante l'esecuzione del programma:

```javascript
function controlloMotori() {
    // Costanti per la configurazione
    const VELOCITA_MAX = 100;
    const VELOCITA_SICURA = 50;
    const DISTANZA_MINIMA = 15;
    
    let distanza = sensors.ultrasonic4.distance();
    
    if (distanza < DISTANZA_MINIMA) {
        // Usa una velocità sicura quando si è vicini a un ostacolo
        motors.largeAB.steer(0, VELOCITA_SICURA / 2);
    } else {
        // Altrimenti usa la velocità di sicurezza standard
        motors.largeAB.steer(0, VELOCITA_SICURA);
    }
    
    // Non è possibile riassegnare una costante
    // VELOCITA_SICURA = 70;  // Questo causerebbe un errore!
}
```

**Nota**: Anche se una costante non può essere riassegnata, se il suo valore è un oggetto o un array, le proprietà o gli elementi di quell'oggetto o array possono ancora essere modificati.

## Chiusure (Closures)

Una chiusura (closure) è una caratteristica potente di JavaScript che permette a una funzione di accedere a variabili del suo scope esterno anche dopo che la funzione esterna ha terminato l'esecuzione.

```javascript
function creaControlloreVelocita(velocitaIniziale) {
    let velocitaCorrente = velocitaIniziale;
    
    // Questa funzione "ricorda" velocitaCorrente anche quando
    // creaControlloreVelocita ha terminato l'esecuzione
    return function(incremento) {
        velocitaCorrente += incremento;
        
        // Limita la velocità a valori ragionevoli
        if (velocitaCorrente > 100) velocitaCorrente = 100;
        if (velocitaCorrente < -100) velocitaCorrente = -100;
        
        return velocitaCorrente;
    };
}

// Crea un controllore di velocità che parte da 0
let controlloreVelocita = creaControlloreVelocita(0);

// Usa il controllore per regolare la velocità
function accelera() {
    let nuovaVelocita = controlloreVelocita(10);  // Aumenta di 10
    brick.showValue("Velocità", nuovaVelocita, 1);
    motors.largeAB.steer(0, nuovaVelocita);
}

function decelera() {
    let nuovaVelocita = controlloreVelocita(-10);  // Diminuisce di 10
    brick.showValue("Velocità", nuovaVelocita, 1);
    motors.largeAB.steer(0, nuovaVelocita);
}
```

Questo pattern è molto utile per creare controllori che mantengono uno stato interno senza esporre direttamente le variabili allo scope globale.

## Applicazioni Pratiche nella Robotica EV3

### 1. Configurazione Globale

```javascript
// Variabili globali per la configurazione
let VELOCITA_STANDARD = 50;
let SENSIBILITA_SENSORE = 30;
let MODALITA_DEBUG = true;

// Funzioni che utilizzano la configurazione globale
function configuraSensibilita(nuovaSensibilita) {
    SENSIBILITA_SENSORE = nuovaSensibilita;
    if (MODALITA_DEBUG) {
        brick.showValue("Nuova sensibilità", SENSIBILITA_SENSORE, 1);
    }
}

function seguiLineaConfigurato() {
    while (true) {
        let valore = sensors.color1.light();
        
        if (valore < SENSIBILITA_SENSORE) {
            // Logica per seguire la linea...
            if (MODALITA_DEBUG) {
                brick.showString("Sulla linea", 2);
            }
        } else {
            // Logica per trovare la linea...
            if (MODALITA_DEBUG) {
                brick.showString("Fuori linea", 2);
            }
        }
        
        pause(10);
    }
}
```

### 2. Isolamento dei Comportamenti

```javascript
function rilevatoreOstacoli() {
    // Variabili locali per lo stato del rilevatore
    let ultimaDistanza = 100;
    let allarmeAttivo = false;
    
    // Funzione interna che utilizza le variabili locali
    function aggiorna() {
        let distanzaAttuale = sensors.ultrasonic4.distance();
        
        // Rileva cambiamenti significativi
        if (Math.abs(distanzaAttuale - ultimaDistanza) > 10) {
            brick.showValue("Nuovo valore", distanzaAttuale, 2);
            ultimaDistanza = distanzaAttuale;
        }
        
        // Gestisce l'allarme
        if (distanzaAttuale < 15 && !allarmeAttivo) {
            allarmeAttivo = true;
            brick.setStatusLight(StatusLight.RedFlash);
            brick.showString("Ostacolo!", 1);
        } else if (distanzaAttuale >= 15 && allarmeAttivo) {
            allarmeAttivo = false;
            brick.setStatusLight(StatusLight.Green);
            brick.showString("Percorso libero", 1);
        }
    }
    
    // Restituisce la funzione di aggiornamento
    return aggiorna;
}

// Crea un'istanza del rilevatore
let controlloOstacoli = rilevatoreOstacoli();

// Usa la funzione in un ciclo di monitoraggio
forever(function() {
    controlloOstacoli();  // Aggiorna e gestisce il rilevatore
    pause(100);
});
```

## Best Practices per lo Scope

1. **Minimizza le Variabili Globali**: Limita le variabili globali a quelle che sono veramente necessarie in tutto il programma.

2. **Preferisci `let` e `const` a `var`**: Utilizza `let` e `const` per un migliore controllo dello scope e per evitare errori.

3. **Usa `const` per Valori Costanti**: Se un valore non deve cambiare, dichiaralo con `const` per rendere esplicita questa intenzione.

4. **Nomina le Variabili in modo Chiaro**: Usa nomi descrittivi che rendono chiaro lo scopo di una variabile.

5. **Funzioni Piccole e Focalizzate**: Mantieni le funzioni piccole e concentrate su un compito specifico per ridurre la complessità dello scope.

6. **Attenzione alle Chiusure**: Quando usi le chiusure, assicurati di capire quali variabili vengono "catturate" e per quanto tempo rimangono in memoria.

## Conclusione

Comprendere lo scope e la visibilità delle variabili è fondamentale per scrivere codice JavaScript pulito ed efficace. Nel contesto della programmazione robotica con EV3, una buona gestione dello scope ti permette di:

- Organizzare meglio il codice e i comportamenti del robot
- Prevenire interferenze indesiderate tra diverse parti del programma
- Creare componenti riutilizzabili con uno stato ben incapsulato
- Facilitare il debug identificando chiaramente dove le variabili vengono modificate

Con queste conoscenze, sarai in grado di costruire programmi più affidabili e manutenibili per il tuo robot EV3.

## Navigazione del Corso
- [📑 Indice](../README.md)
- [⬅️ Parametri e Valori di Ritorno](02-ParametriReturn.md)
- [➡️ Arrow Functions](04-ArrowFunctions.md)