# Controllo Motori di Base

## Comandi Fondamentali per i Motori

Per controllare i motori del tuo robot EV3 in JavaScript utilizzando MakeCode, hai a disposizione diversi metodi che permettono di gestire velocità, direzione e durata dei movimenti. In questa guida esploreremo i comandi di base che ti permetteranno di dare vita al tuo robot.

## I Metodi Principali

### Metodo `run()`

Il metodo più semplice per far girare un motore è `run()`. Questo comando fa girare il motore a una determinata potenza indefinitamente (finché non viene fermato con un altro comando).

```javascript
// Sintassi: run(potenza)
// potenza: valore tra -100 e 100

// Esempi:
motors.largeA.run(50);  // Fa girare il motore A in avanti a metà potenza
motors.largeB.run(-30); // Fa girare il motore B all'indietro al 30% della potenza
```

### Metodo `stop()`

Per fermare un motore in esecuzione, utilizziamo il metodo `stop()`:

```javascript
// Sintassi: stop()

// Esempi:
motors.largeA.stop();  // Ferma il motore A
motors.largeAB.stop(); // Ferma entrambi i motori A e B
```

### Metodo `run()` con Durata

Una variante più completa del metodo `run()` permette di specificare non solo la potenza, ma anche per quanto tempo (o per quante rotazioni) il motore deve girare:

```javascript
// Sintassi: run(potenza, valore, unitaDiMisura)
// potenza: valore tra -100 e 100
// valore: quanto deve durare il movimento
// unitaDiMisura: MoveUnit.Seconds, MoveUnit.Rotations o MoveUnit.Degrees

// Esempi:
motors.largeA.run(50, 2, MoveUnit.Seconds);    // Gira a potenza 50 per 2 secondi
motors.largeB.run(70, 3.5, MoveUnit.Rotations); // Gira a potenza 70 per 3.5 rotazioni
motors.largeC.run(-30, 90, MoveUnit.Degrees);   // Gira all'indietro per 90 gradi
```

Nota che questi comandi sono bloccanti: il programma si ferma e aspetta che il motore completi l'azione prima di procedere con l'istruzione successiva.

## Controllo di Base per Robot a Due Ruote

La maggior parte dei robot EV3 utilizza due motori grandi (tipicamente A e B) per controllare le ruote. MakeCode fornisce metodi specifici per gestire questo tipo di configurazione tramite l'oggetto `motors.largeAB`.

### Metodo `steer()`

Il metodo `steer()` permette di controllare contemporaneamente due motori con un solo comando, specificando la direzione e la potenza:

```javascript
// Sintassi base: steer(direzione, potenza)
// direzione: valore tra -100 (tutto a sinistra) e 100 (tutto a destra), 0 per dritto
// potenza: valore tra -100 e 100 per la velocità

// Esempi:
motors.largeAB.steer(0, 50);   // Avanti dritto a metà potenza
motors.largeAB.steer(0, -50);  // Indietro dritto a metà potenza
motors.largeAB.steer(50, 70);  // Curva a destra con potenza 70
motors.largeAB.steer(-100, 40); // Gira sul posto verso sinistra
```

### Metodo `steer()` con Durata

Come per `run()`, anche `steer()` ha una variante che permette di specificare la durata del movimento:

```javascript
// Sintassi: steer(direzione, potenza, valore, unitaDiMisura)

// Esempi:
motors.largeAB.steer(0, 50, 3, MoveUnit.Seconds);    // Avanti dritto per 3 secondi
motors.largeAB.steer(30, 60, 2, MoveUnit.Rotations); // Curva leggera per 2 rotazioni
motors.largeAB.steer(-50, 40, 180, MoveUnit.Degrees); // Curva più stretta per 180 gradi
```

### Metodo `tank()`

Un altro modo di controllare due motori è con il metodo `tank()`, che permette di specificare separatamente la potenza per ciascun motore:

```javascript
// Sintassi: tank(potenzaSinistra, potenzaDestra)
// potenzaSinistra: potenza per il motore sinistro (A)
// potenzaDestra: potenza per il motore destro (B)

// Esempi:
motors.largeAB.tank(50, 50);   // Entrambi i motori al 50%, avanti dritto
motors.largeAB.tank(70, 30);   // Curva a destra (motore sinistro più veloce)
motors.largeAB.tank(-30, 30);  // Gira sul posto (un motore avanti, uno indietro)
```

### Metodo `tank()` con Durata

Anche `tank()` ha una variante con durata:

```javascript
// Sintassi: tank(potenzaSinistra, potenzaDestra, valore, unitaDiMisura)

// Esempi:
motors.largeAB.tank(60, 60, 2, MoveUnit.Seconds);    // Avanti dritto per 2 secondi
motors.largeAB.tank(40, -40, 0.5, MoveUnit.Rotations); // Gira sul posto per mezza rotazione
```

## Esempi Pratici

### Esempio 1: Movimento Base Avanti-Indietro

```javascript
// Movimento semplice avanti e indietro
function movimentoBaseAvantiIndietro() {
    brick.showString("Avanti", 1);
    motors.largeAB.steer(0, 50, 3, MoveUnit.Seconds);  // Avanti per 3 secondi
    
    brick.showString("Indietro", 1);
    motors.largeAB.steer(0, -50, 3, MoveUnit.Seconds); // Indietro per 3 secondi
    
    brick.showString("Fine", 1);
}
```

### Esempio 2: Percorso Quadrato

```javascript
// Percorso a forma di quadrato
function percorsoQuadrato() {
    // Ripeti 4 volte per formare un quadrato
    for (let i = 0; i < 4; i++) {
        // Avanza dritto
        brick.showString("Lato " + (i + 1), 1);
        motors.largeAB.steer(0, 50, 2, MoveUnit.Seconds);
        
        // Fermati brevemente
        motors.largeAB.stop();
        pause(500);
        
        // Gira di 90 gradi (assumendo che il motore C controlli lo sterzo)
        brick.showString("Giro " + (i + 1), 1);
        motors.largeC.run(30, 0.25, MoveUnit.Rotations);
        pause(500);
    }
    
    brick.showString("Quadrato completato", 1);
}
```

### Esempio 3: Controllo Differenziale con Movimento Fluido

```javascript
// Esempio di movimento fluido con controllo differenziale
function movimentoFluido() {
    // Avanti dritto
    motors.largeAB.steer(0, 50);
    pause(2000);
    
    // Gradualmente curva a destra
    for (let direzione = 0; direzione <= 50; direzione += 5) {
        motors.largeAB.steer(direzione, 50);
        pause(100);
    }
    
    // Mantieni la curva
    pause(1000);
    
    // Gradualmente torna dritto
    for (let direzione = 50; direzione >= 0; direzione -= 5) {
        motors.largeAB.steer(direzione, 50);
        pause(100);
    }
    
    // Avanti dritto per un altro po'
    pause(1000);
    
    // Fermati gradualmente riducendo la potenza
    for (let potenza = 50; potenza >= 0; potenza -= 5) {
        motors.largeAB.steer(0, potenza);
        pause(100);
    }
    
    // Ferma completamente i motori
    motors.largeAB.stop();
}
```

## Differenze tra Steer e Tank

Entrambi i metodi `steer()` e `tank()` controllano due motori contemporaneamente, ma con approcci differenti:

- **steer()**: Più intuitivo per il controllo direzionale. Utilizzi un singolo parametro per la direzione e uno per la velocità.
- **tank()**: Offre più controllo preciso specificando separatamente la potenza per ciascun motore. Utile per manovre complesse o quando hai bisogno di calibrare finemente il movimento.

Ecco un confronto tra i due metodi per ottenere lo stesso movimento:

```javascript
// Girare a destra con steer
motors.largeAB.steer(50, 70);  // Curva a destra con potenza 70

// Equivalente con tank (approssimativo)
motors.largeAB.tank(70, 35);   // Motore sinistro più veloce del destro
```

## Best Practices

1. **Inizia con Potenze Moderate**: Inizia sempre con valori di potenza moderati (30-50) prima di passare a potenze più elevate, per evitare movimenti bruschi o incontrollati.

2. **Usa le Pause**: Inserisci brevi pause (`pause()`) tra movimenti diversi per permettere al robot di stabilizzarsi.

3. **Ferma Sempre i Motori**: Quando non hai più bisogno che i motori girino, fermali esplicitamente con `stop()`.

4. **Calibra i Tuoi Comandi**: Ogni robot è leggermente diverso, quindi potrebbe essere necessario calibrare i valori di potenza e direzione per ottenere movimenti precisi.

5. **Testa su Diverse Superfici**: I movimenti del robot possono variare significativamente su superfici diverse (più o meno scivolose, tappeti, ecc.).

## Navigazione del Corso
- [📑 Indice](../README.md)
- [⬅️ Introduzione ai Motori EV3](01-IntroduzioneMotori.md)
- [➡️ Movimenti Sincronizzati](03-MovimentiSincronizzati.md)