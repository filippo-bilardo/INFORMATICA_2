# La funzione forever e il polling

## Introduzione

Nella programmazione di robot, spesso abbiamo bisogno che il nostro dispositivo esegua continuamente determinate azioni o monitori costantemente l'ambiente circostante. In JavaScript, e in particolare nell'ambiente MakeCode per LEGO EV3, questo tipo di comportamento può essere implementato utilizzando la funzione `forever` e tecniche di polling. Questi concetti sono fondamentali per creare robot reattivi che possono rispondere in tempo reale agli eventi del mondo esterno.

## La funzione forever

La funzione `forever` è un costrutto speciale disponibile in MakeCode che permette di eseguire un blocco di codice ripetutamente e indefinitamente. È l'equivalente di un ciclo `while (true)` ma è ottimizzato per l'ambiente di esecuzione dei robot.

### Sintassi

```javascript
forever(function() {
    // Codice che verrà eseguito continuamente
});
```

### Caratteristiche principali

- **Esecuzione concorrente**: In molti ambienti di programmazione per robot, incluso MakeCode, la funzione `forever` viene eseguita in background mentre il resto del programma continua.
- **Non blocca l'esecuzione**: A differenza di un ciclo `while` standard, la funzione `forever` spesso non blocca il flusso principale del programma.
- **Ideale per il monitoraggio continuo**: Perfetta per leggere costantemente i sensori e reagire ai cambiamenti.

### Esempio per EV3

```javascript
// Questo codice verrà eseguito una volta all'avvio
brick.showString("Robot avviato", 1);
motors.largeAB.steer(0, 20);  // Inizia a muoverti in avanti

// Questo codice verrà eseguito continuamente
forever(function() {
    // Controlla costantemente il sensore a ultrasuoni
    if (sensors.ultrasonic4.distance() < 10) {
        // Se c'è un ostacolo vicino, fermati e cambia direzione
        motors.largeAB.stop();
        brick.showString("Ostacolo!", 1);
        motors.largeC.run(50, 1, MoveUnit.Rotations);  // Ruota
        motors.largeAB.steer(0, 20);  // Riprendi il movimento
    }
});
```

## Il concetto di polling

Il polling è una tecnica in cui un programma controlla ripetutamente e ad intervalli regolari lo stato di un dispositivo, di un sensore o di una risorsa per individuare eventuali cambiamenti. È un metodo fondamentale per implementare comportamenti reattivi nei robot.

### Come funziona il polling

1. **Lettura periodica**: Il programma legge lo stato di un sensore o di un input ad intervalli regolari.
2. **Confronto**: Il valore letto viene confrontato con un valore precedente o con una soglia predefinita.
3. **Reazione**: Se viene rilevata una differenza significativa o se viene superata una soglia, il programma esegue un'azione specifica.

### Esempio di polling in un ciclo

```javascript
// Implementazione di polling in un ciclo while
let previousDistance = 100;  // Un valore iniziale arbitrario

while (true) {
    let currentDistance = sensors.ultrasonic4.distance();
    
    // Controlla se la distanza è cambiata significativamente
    if (Math.abs(currentDistance - previousDistance) > 5) {
        brick.showString("Movimento rilevato!", 1);
        // Altre azioni in risposta al cambiamento
    }
    
    previousDistance = currentDistance;  // Aggiorna il valore precedente
    pause(100);  // Pausa per evitare di sovraccaricare il sistema
}
```

## Frequency e Interval

Quando implementi il polling, è importante considerare la frequenza con cui controlli i tuoi sensori:

- **Polling troppo frequente**: Può consumare risorse inutilmente e potenzialmente sovraccaricare il sistema.
- **Polling troppo raro**: Potrebbe farti perdere eventi importanti o rendere il robot meno reattivo.

La funzione `pause()` è utile per controllare l'intervallo di polling:

```javascript
forever(function() {
    // Leggi i sensori e reagisci
    let light = sensors.color1.light();
    
    if (light < 20) {
        // Azione quando viene rilevata una superficie scura
    }
    
    pause(50);  // Pausa di 50 millisecondi tra le letture
});
```

## Implementazione di macchine a stati con forever

La funzione `forever` è particolarmente utile per implementare macchine a stati, dove il comportamento del robot cambia in base al suo stato corrente:

```javascript
// Stati possibili del robot
let STATO_ESPLORAZIONE = 0;
let STATO_SEGUILINEA = 1;
let STATO_EVITA_OSTACOLI = 2;

// Stato iniziale
let statoCorrente = STATO_ESPLORAZIONE;

forever(function() {
    // Leggi i sensori
    let distanza = sensors.ultrasonic4.distance();
    let luce = sensors.color1.light();
    
    // Macchina a stati
    switch (statoCorrente) {
        case STATO_ESPLORAZIONE:
            motors.largeAB.steer(0, 30);  // Vai dritto
            
            // Cambia stato se necessario
            if (distanza < 10) {
                statoCorrente = STATO_EVITA_OSTACOLI;
            } else if (luce < 20) {
                statoCorrente = STATO_SEGUILINEA;
            }
            break;
            
        case STATO_SEGUILINEA:
            // Logica per seguire la linea
            // ...
            
            // Torna all'esplorazione se la linea finisce
            if (luce > 50) {
                statoCorrente = STATO_ESPLORAZIONE;
            }
            break;
            
        case STATO_EVITA_OSTACOLI:
            // Logica per evitare gli ostacoli
            // ...
            
            // Torna all'esplorazione quando l'ostacolo è superato
            if (distanza > 30) {
                statoCorrente = STATO_ESPLORAZIONE;
            }
            break;
    }
    
    pause(50);  // Breve pausa
});
```

## Gestione di eventi multipli

Con la funzione `forever`, è possibile monitorare contemporaneamente più sensori e rispondere a vari eventi:

```javascript
forever(function() {
    // Monitora la distanza per evitare collisioni
    if (sensors.ultrasonic4.distance() < 15) {
        motors.largeAB.stop();
        motors.largeAB.steer(-50, 20, 1, MoveUnit.Seconds);
    }
    
    // Monitora la luminosità per rilevare linee
    if (sensors.color1.light() < 20) {
        brick.showString("Linea trovata", 1);
    }
    
    // Monitora i pulsanti per l'interazione dell'utente
    if (brick.buttonEnter.isPressed()) {
        brick.showString("Modalità cambiata!", 1);
    }
    
    pause(20);  // Piccola pausa
});
```

## Ottimizzazione e best practices

1. **Usa pause appropriate**: Inserisci brevi pause tra le iterazioni per non sovraccaricare la CPU.
2. **Limita le operazioni costose**: All'interno di un ciclo `forever`, evita operazioni che richiedono molto tempo o risorse.
3. **Gestisci gli stati**: Per comportamenti complessi, implementa una macchina a stati piuttosto che condizioni complesse.
4. **Considera i tempi di risposta**: Se il tuo robot deve reagire rapidamente, minimizza il tempo di pausa ma assicurati che sia sufficiente per non causare problemi di performance.
5. **Testa in condizioni reali**: I comportamenti dei sensori possono variare in ambienti diversi.

## Confronto tra cicli e forever

| Aspetto | Ciclo while | Funzione forever |
|---------|-------------|------------------|
| Blocca l'esecuzione | Sì | No (in molti ambienti) |
| Uso della CPU | Può essere intensivo | Spesso ottimizzato |
| Facilità d'uso | Standard JavaScript | Specifico dell'ambiente |
| Controllo | Maggiore controllo manuale | Gestito dal runtime |

## Conclusione

La funzione `forever` e le tecniche di polling sono strumenti essenziali per creare robot reattivi e autonomi. Con queste tecniche, i robot LEGO EV3 possono monitorare continuamente l'ambiente, rispondere agli stimoli esterni e adattare il loro comportamento in tempo reale. Padroneggiare questi concetti ti permetterà di creare applicazioni robotiche più sofisticate e reattive.

## Navigazione del Corso
- [📑 Indice](../README.md)
- [⬅️ Break e Continue](04-Break-Continue.md)
- [➡️ Funzioni e Modularità](../05-Funzioni-Modularita/README.md)