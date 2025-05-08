# Movimenti Sincronizzati

## Introduzione

Per creare comportamenti robotici avanzati e fluidi, è essenziale padroneggiare la sincronizzazione dei motori. Questa guida esplorerà come coordinare i movimenti di più motori per ottenere azioni complesse, precise e naturali.

La sincronizzazione dei motori è fondamentale nei robot EV3 per:
- Garantire movimenti in linea retta
- Eseguire curve e rotazioni precise
- Implementare comportamenti complessi come il segui-linea
- Creare movimenti fluidi che combinano trazione e accessori

## Sincronizzazione Predefinita con Gruppi di Motori

MakeCode per EV3 offre già una sincronizzazione di base attraverso i gruppi di motori predefiniti come `motors.largeAB`. Quando utilizzi metodi come `steer()` o `tank()`, i motori vengono automaticamente coordinati.

```javascript
// I motori A e B si muovono in modo coordinato
motors.largeAB.steer(0, 50, 2, MoveUnit.Seconds);
```

## Sincronizzazione Manuale dei Motori

In alcune situazioni, potresti aver bisogno di sincronizzare manualmente i motori per ottenere comportamenti specifici.

### Sincronizzazione Sequenziale

La sincronizzazione sequenziale esegue un movimento dopo l'altro in rapida successione:

```javascript
function rotazioneSequenziale() {
    // Sequenza di movimenti per una rotazione a 3 fasi
    motors.largeA.run(50, 0.3, MoveUnit.Rotations);
    motors.largeB.run(50, 0.3, MoveUnit.Rotations);
    motors.largeC.run(50, 0.3, MoveUnit.Rotations);
}
```

### Sincronizzazione Temporale

La sincronizzazione temporale utilizza i tempi di esecuzione per coordinare i movimenti:

```javascript
function movimentiTemporizzati() {
    // Avvia tutti i motori contemporaneamente
    let tempoInizio = control.millis();
    
    motors.largeA.run(50);  // Avvia il motore A
    motors.largeB.run(30);  // Avvia il motore B a velocità diversa
    
    // Mantieni i motori in esecuzione per 2 secondi
    while (control.millis() - tempoInizio < 2000) {
        pause(10);  // Piccola pausa per non sovraccaricare la CPU
    }
    
    // Ferma tutti i motori
    motors.largeA.stop();
    motors.largeB.stop();
}
```

## Tecniche di Sincronizzazione Avanzate

### Rampe di Accelerazione e Decelerazione

Per ottenere movimenti fluidi, spesso è necessario implementare rampe di accelerazione e decelerazione. Questo approccio riduce l'inerzia e lo slittamento:

```javascript
function movimentoConRampa() {
    // Rampa di accelerazione
    for (let potenza = 0; potenza <= 50; potenza += 5) {
        motors.largeAB.steer(0, potenza);
        pause(100);
    }
    
    // Velocità costante
    pause(2000);
    
    // Rampa di decelerazione
    for (let potenza = 50; potenza >= 0; potenza -= 5) {
        motors.largeAB.steer(0, potenza);
        pause(100);
    }
    
    motors.largeAB.stop();
}
```

### Sincronizzazione con Feedback dei Sensori

Una tecnica potente è sincronizzare i motori utilizzando i dati dei sensori per adattarsi all'ambiente:

```javascript
function seguiLinea() {
    let valoreLuce;
    let potenzaSinistra;
    let potenzaDestra;
    
    // Continua a seguire la linea per 10 secondi
    let tempoInizio = control.millis();
    
    while (control.millis() - tempoInizio < 10000) {
        valoreLuce = sensors.color1.light();
        
        if (valoreLuce < 30) {  // Sulla linea nera
            // Sterza a destra
            potenzaSinistra = 40;
            potenzaDestra = 20;
        } else {  // Sulla superficie chiara
            // Sterza a sinistra
            potenzaSinistra = 20;
            potenzaDestra = 40;
        }
        
        // Applica le potenze calcolate
        motors.largeA.run(potenzaSinistra);
        motors.largeB.run(potenzaDestra);
        
        pause(10);  // Piccola pausa per la stabilità
    }
    
    motors.largeAB.stop();
}
```

## Movimenti Coordinati di Trazione e Accessori

Una caratteristica comune dei robot più complessi è la necessità di coordinare i motori di trazione (tipicamente A e B) con i motori per accessori (come il motore C per un braccio o una pinza).

### Esempio: Robot Raccoglitore

```javascript
function raccogliOggetto() {
    // 1. Avvicinati all'oggetto
    motors.largeAB.steer(0, 30, 2, MoveUnit.Seconds);
    motors.largeAB.stop();
    
    // 2. Abbassa il braccio (motore C)
    motors.largeC.run(-30, 0.5, MoveUnit.Rotations);
    
    // 3. Avanza leggermente per posizionarti
    motors.largeAB.steer(0, 20, 0.5, MoveUnit.Seconds);
    motors.largeAB.stop();
    
    // 4. Chiudi la pinza (motore D)
    motors.largeD.run(30, 0.25, MoveUnit.Rotations);
    
    // 5. Solleva il braccio con l'oggetto
    motors.largeC.run(30, 0.5, MoveUnit.Rotations);
    
    // 6. Torna indietro portando l'oggetto
    motors.largeAB.steer(0, -30, 2, MoveUnit.Seconds);
    motors.largeAB.stop();
}
```

## Sincronizzazione con Pattern di Design

Per progetti più complessi, puoi utilizzare pattern di design per strutturare meglio la sincronizzazione dei motori.

### Macchina a Stati per Comportamenti Complessi

```javascript
// Stati possibili del robot
const STATO_FERMO = 0;
const STATO_AVANZAMENTO = 1;
const STATO_ROTAZIONE = 2;
const STATO_RACCOLTA = 3;

// Stato iniziale
let statoAttuale = STATO_FERMO;

function eseguiComportamentoRobot() {
    // Variabili per il controllo
    let tempoStato = 0;
    let tempoCorrente = control.millis();
    
    // Loop principale di controllo
    forever(function() {
        // Aggiorna il tempo trascorso nello stato attuale
        tempoCorrente = control.millis();
        
        // Macchina a stati
        switch (statoAttuale) {
            case STATO_FERMO:
                motors.largeAB.stop();
                // Passa allo stato successivo dopo 1 secondo
                if (tempoStato > 1000) {
                    statoAttuale = STATO_AVANZAMENTO;
                    tempoStato = 0;
                }
                break;
                
            case STATO_AVANZAMENTO:
                motors.largeAB.steer(0, 50);
                // Passa allo stato successivo dopo 2 secondi
                if (tempoStato > 2000) {
                    statoAttuale = STATO_ROTAZIONE;
                    tempoStato = 0;
                }
                break;
                
            case STATO_ROTAZIONE:
                motors.largeAB.steer(100, 40);  // Gira sul posto
                // Passa allo stato successivo dopo 1 secondo
                if (tempoStato > 1000) {
                    statoAttuale = STATO_RACCOLTA;
                    tempoStato = 0;
                }
                break;
                
            case STATO_RACCOLTA:
                motors.largeAB.stop();
                motors.largeC.run(30, 0.5, MoveUnit.Rotations);  // Aziona il braccio
                // Torna allo stato iniziale
                statoAttuale = STATO_FERMO;
                tempoStato = 0;
                break;
        }
        
        // Incrementa il tempo nello stato attuale
        tempoStato += control.millis() - tempoCorrente;
        tempoCorrente = control.millis();
        
        pause(20);  // Piccola pausa per la stabilità
    });
}
```

## Considerazioni sulla Batteria

La sincronizzazione può essere influenzata dallo stato della batteria del brick EV3. Una batteria più scarica può far muovere i motori più lentamente, causando problemi di coordinazione.

```javascript
function verificaBatteria() {
    let livelloBatteria = brick.batteryLevel();
    brick.showString("Batteria: " + livelloBatteria + "%", 1);
    
    if (livelloBatteria < 20) {
        brick.showString("ATTENZIONE: Batteria bassa", 2);
        brick.showString("Prestazioni ridotte", 3);
    }
}
```

## Best Practices per Movimenti Sincronizzati

1. **Inizia Semplice**: Testa prima i singoli motori, poi combinali in movimenti più complessi.

2. **Usa Funzioni Dedicate**: Crea funzioni specifiche per ciascun tipo di movimento sincronizzato.

3. **Gestisci l'Inerzia**: Implementa accelerazioni e decelerazioni graduali per movimenti più fluidi.

4. **Calibra Spesso**: Verifica e calibra i movimenti su diverse superfici e con livelli di batteria diversi.

5. **Usa i Sensori**: Quando possibile, utilizza i sensori per fornire feedback e correggere i movimenti.

6. **Documenta i Comportamenti**: Annota i valori di potenza e durata che funzionano bene per riferimenti futuri.

## Conclusione

La sincronizzazione efficace dei motori trasforma un semplice robot in un dispositivo capace di comportamenti complessi e fluidi. Padroneggiando queste tecniche, potrai implementare robot che si muovono con precisione, raccolgono oggetti in modo affidabile e si adattano all'ambiente circostante.

Nel prossimo capitolo, approfondiremo il controllo di precisione dei motori, esplorando come ottenere movimenti estremamente accurati per applicazioni che richiedono alta precisione.

## Navigazione del Corso
- [📑 Indice](../README.md)
- [⬅️ Controllo Motori di Base](02-ControlloBase.md)
- [➡️ Controllo di Precisione](04-ControlloPrecisione.md)