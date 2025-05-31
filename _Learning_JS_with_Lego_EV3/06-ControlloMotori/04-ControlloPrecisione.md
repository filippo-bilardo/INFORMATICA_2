# Controllo di Precisione

## Introduzione

Nella robotica, la precisione dei movimenti è fondamentale per molte applicazioni avanzate. I robot LEGO EV3 sono dotati di encoder nei motori che permettono un controllo molto preciso del movimento. In questa guida, esploreremo tecniche e approcci per ottenere movimenti estremamente accurati con il tuo robot EV3.

## Gli Encoder dei Motori EV3

Alla base del controllo di precisione ci sono gli encoder integrati nei motori EV3. Questi componenti:

- Misurano la rotazione dell'albero motore con precisione di 1 grado
- Permettono al sistema di sapere esattamente quanto ha ruotato il motore
- Forniscono feedback continuo sulla posizione attuale del motore
- Consentono movimenti basati su rotazioni o gradi anziché tempo

## Movimenti Basati su Rotazioni e Gradi

Il controllo più preciso si ottiene utilizzando rotazioni o gradi invece del tempo:

```javascript
// Movimento basato sul tempo - meno preciso
motors.largeA.run(50, 2, MoveUnit.Seconds);

// Movimento basato sulle rotazioni - più preciso
motors.largeA.run(50, 2, MoveUnit.Rotations);

// Movimento basato sui gradi - massima precisione
motors.largeA.run(50, 180, MoveUnit.Degrees);
```

## Conversione tra Distanza Lineare e Rotazioni

Per muovere il robot di una distanza precisa, è necessario convertire la distanza lineare in rotazioni delle ruote:

```javascript
// Funzione per convertire centimetri in rotazioni
function cmToRotations(cm, wheelDiameterCm) {
    // Circonferenza della ruota = π * diametro
    let wheelCircumferenceCm = Math.PI * wheelDiameterCm;
    // Rotazioni necessarie = distanza / circonferenza
    return cm / wheelCircumferenceCm;
}

// Esempio: muovi il robot di 25 cm in avanti
let wheelDiameter = 5.6; // Diametro ruote in cm
let distanceCm = 25;
let rotations = cmToRotations(distanceCm, wheelDiameter);

motors.largeAB.steer(0, 50, rotations, MoveUnit.Rotations);
```

## Conversione tra Angoli di Rotazione del Robot e Rotazioni delle Ruote

Analogamente, per ruotare il robot di un angolo preciso, è necessario convertire l'angolo in rotazioni delle ruote:

```javascript
// Funzione per convertire gradi di rotazione del robot in rotazioni delle ruote
function degreesToRotations(robotDegrees, wheelBaseCm, wheelDiameterCm) {
    // Distanza che ciascuna ruota deve percorrere per una rotazione completa del robot
    let wheelTravelDistanceCm = (Math.PI * wheelBaseCm) * (robotDegrees / 360);
    // Circonferenza della ruota
    let wheelCircumferenceCm = Math.PI * wheelDiameterCm;
    // Rotazioni necessarie
    return wheelTravelDistanceCm / wheelCircumferenceCm;
}

// Esempio: ruota il robot di 90 gradi
let wheelBase = 15; // Distanza tra le ruote in cm
let wheelDiameter = 5.6; // Diametro ruote in cm
let rotations = degreesToRotations(90, wheelBase, wheelDiameter);

// Ruota sul posto, una ruota in avanti e una indietro
motors.largeAB.tank(50, -50, rotations, MoveUnit.Rotations);
```

## Calibrazione dell'Hardware

Per un controllo di precisione, è essenziale calibrare i parametri specifici del tuo robot:

### 1. Calibrazione della Distanza Lineare

```javascript
function calibrazioneDistanzaLineare() {
    let distanzaTarget = 100; // cm
    let diametroRuote = 5.6; // stima iniziale in cm
    
    // Calcola rotazioni in base alle stime
    let rotazioni = distanzaTarget / (Math.PI * diametroRuote);
    
    // Esegui il movimento e misura la distanza effettivamente percorsa
    motors.largeAB.steer(0, 50, rotazioni, MoveUnit.Rotations);
    
    // Ora misura manualmente la distanza percorsa (es. 96 cm)
    let distanzaEffettiva = 96; // inserisci il valore misurato
    
    // Calcola il diametro effettivo delle ruote
    let diametroEffettivo = (distanzaTarget / distanzaEffettiva) * diametroRuote;
    
    brick.showString("Diametro calibrato: " + diametroEffettivo.toFixed(2) + " cm", 1);
}
```

### 2. Calibrazione della Rotazione

```javascript
function calibrazioneRotazione() {
    let angoloTarget = 360; // rotazione completa
    let distanzaRuote = 15; // stima iniziale in cm
    let diametroRuote = 5.6; // in cm
    
    // Calcola rotazioni in base alle stime
    let circonferenzaGiro = Math.PI * distanzaRuote;
    let rotazioni = (circonferenzaGiro / (Math.PI * diametroRuote)) * (angoloTarget / 360);
    
    // Esegui la rotazione
    motors.largeAB.tank(50, -50, rotazioni, MoveUnit.Rotations);
    
    // Ora misura manualmente l'angolo effettivamente ruotato (es. 352 gradi)
    let angoloEffettivo = 352; // inserisci il valore misurato
    
    // Calcola la distanza effettiva tra le ruote
    let distanzaEffettiva = (angoloTarget / angoloEffettivo) * distanzaRuote;
    
    brick.showString("Distanza ruote: " + distanzaEffettiva.toFixed(2) + " cm", 1);
}
```

## Controllo Proporzionale

Per movimenti ancora più precisi, specialmente a velocità più elevate, è utile implementare un controllo proporzionale:

```javascript
function movimentoProporzionale(targetRotations) {
    const Kp = 2.0;  // Costante proporzionale
    const MIN_POWER = 10;  // Potenza minima per muovere il motore
    const MAX_POWER = 90;  // Potenza massima consentita
    
    // Reset encoder
    motors.largeA.reset();
    
    // Ciclo di controllo
    while (true) {
        // Leggi rotazioni attuali
        let currentRotations = motors.largeA.angle() / 360;
        
        // Calcola l'errore
        let error = targetRotations - currentRotations;
        
        // Se l'errore è sufficientemente piccolo, esci dal ciclo
        if (Math.abs(error) < 0.01) {
            break;
        }
        
        // Calcola la potenza proporzionale all'errore
        let power = Kp * error;
        
        // Limita la potenza nei range consentiti
        power = Math.max(MIN_POWER, Math.min(MAX_POWER, Math.abs(power))) * Math.sign(power);
        
        // Applica la potenza
        motors.largeA.run(power);
        
        pause(10);  // Piccola pausa per evitare sovraccarico CPU
    }
    
    // Ferma il motore
    motors.largeA.stop();
}
```

## Controllo PID

Per applicazioni che richiedono la massima precisione, puoi implementare un controllo PID (Proporzionale-Integrale-Derivativo):

```javascript
function controlloPID(targetPosition) {
    // Costanti PID - da calibrare per il tuo specifico setup
    const Kp = 2.0;    // Proporzionale
    const Ki = 0.1;    // Integrale
    const Kd = 0.5;    // Derivativo
    
    let integralError = 0;
    let previousError = 0;
    let startTime = control.millis();
    
    while (control.millis() - startTime < 5000) {  // Timeout di sicurezza
        // Posizione attuale in gradi
        let currentPosition = motors.largeA.angle();
        
        // Calcolo dell'errore
        let error = targetPosition - currentPosition;
        
        // Se siamo sufficientemente vicini al target, esci
        if (Math.abs(error) < 2) {
            break;
        }
        
        // Calcolo termine integrale
        integralError += error;
        
        // Limita l'errore integrale per evitare wind-up
        integralError = Math.max(-1000, Math.min(1000, integralError));
        
        // Calcolo termine derivativo
        let derivativeError = error - previousError;
        previousError = error;
        
        // Calcolo della potenza con formula PID
        let power = (Kp * error) + (Ki * integralError) + (Kd * derivativeError);
        
        // Limita la potenza nei range sicuri
        power = Math.max(-100, Math.min(100, power));
        
        // Applica la potenza
        motors.largeA.run(power);
        
        pause(10);
    }
    
    motors.largeA.stop();
}
```

## Tecniche di Precisione per il Terzo Motore

Il terzo motore (spesso utilizzato per accessori come bracci o pinze) richiede un'attenzione particolare alla precisione:

```javascript
function controlloPrezioneAccessorio() {
    // 1. Usa gradi per movimenti precisi
    motors.largeC.run(30, 45, MoveUnit.Degrees);  // Ruota esattamente di 45°
    
    // 2. Imposta la posizione di partenza/zero
    function resetPosition() {
        // Muovi lentamente in una direzione fino a raggiungere un fine corsa fisico
        motors.largeC.run(-10);
        pause(1000);  // Tempo sufficiente per raggiungere il fine corsa
        motors.largeC.stop();
        
        // Resetta l'encoder in questa posizione
        motors.largeC.reset();
    }
    
    // 3. Controllo di posizione con feedback
    function moveToPosition(targetDegrees) {
        while (Math.abs(motors.largeC.angle() - targetDegrees) > 2) {
            let error = targetDegrees - motors.largeC.angle();
            let power = Math.min(30, Math.max(-30, error / 10));
            motors.largeC.run(power);
            pause(10);
        }
        motors.largeC.stop();
    }
}
```

## Gestione dell'Inerzia

L'inerzia è una sfida significativa per i movimenti di precisione. Ecco alcune tecniche per gestirla:

```javascript
function controlloInerzia() {
    // 1. Approccio in due fasi (rapido, poi preciso)
    function movimentoDueFasi(targetRotations) {
        // Prima fase: movimento veloce fino a 90% del target
        motors.largeA.run(80, targetRotations * 0.9, MoveUnit.Rotations);
        
        // Seconda fase: movimento lento per il restante 10%
        motors.largeA.run(20, targetRotations * 0.1, MoveUnit.Rotations);
    }
    
    // 2. Decelerazione progressiva
    function decelerazioneProgressiva() {
        // Avvia a piena potenza
        motors.largeAB.steer(0, 100);
        pause(1000);
        
        // Decelera gradualmente
        for (let potenza = 100; potenza >= 20; potenza -= 10) {
            motors.largeAB.steer(0, potenza);
            pause(200);
        }
        
        // Potenza minima e poi stop
        motors.largeAB.steer(0, 10);
        pause(500);
        motors.largeAB.stop();
    }
}
```

## Feedback Attivo e Loop di Controllo

Per garantire la massima precisione in condizioni variabili, implementa sistemi di feedback attivo:

```javascript
function movimentoConFeedbackAttivo() {
    // Target e parametri
    let targetDistanza = 50;  // cm
    let wheelDiameter = 5.6;  // cm
    let targetRotations = targetDistanza / (Math.PI * wheelDiameter);
    
    // Reset encoder
    motors.largeAB.reset();
    
    // Loop di controllo attivo con aggiustamenti in tempo reale
    while (true) {
        // Calcola rotazioni medie dei due motori
        let rotazioniA = motors.largeA.angle() / 360;
        let rotazioniB = motors.largeB.angle() / 360;
        let rotazioniMedie = (rotazioniA + rotazioniB) / 2;
        
        // Verifica se abbiamo raggiunto l'obiettivo
        if (Math.abs(rotazioniMedie - targetRotations) < 0.05) {
            break;
        }
        
        // Calcola la differenza tra i due motori (per mantenere la direzione)
        let diff = rotazioniA - rotazioniB;
        
        // Potenza base in funzione della distanza dal target
        let distanzaRimanente = Math.abs(targetRotations - rotazioniMedie);
        let potenzaBase = Math.min(70, Math.max(20, distanzaRimanente * 100));
        
        // Aggiusta le potenze per correggere la direzione
        let potenzaA = potenzaBase - diff * 10;
        let potenzaB = potenzaBase + diff * 10;
        
        // Applica le potenze calcolate
        motors.largeA.run(potenzaA);
        motors.largeB.run(potenzaB);
        
        pause(20);
    }
    
    motors.largeAB.stop();
}
```

## Best Practices per il Controllo di Precisione

1. **Calibrazione Regolare**: Ricalibrare periodicamente i parametri del robot, specialmente dopo modifiche meccaniche.

2. **Movimento a Bassa Potenza**: Per la massima precisione, usa potenze più basse, che riducono l'inerzia.

3. **Gestione dell'inerzia**: Implementa accelerazioni e decelerazioni graduali.

4. **Feedback Continuo**: Utilizza letture continue degli encoder per correggere gli errori durante il movimento.

5. **Considerazioni sulla Superficie**: Calibra separatamente per diverse superfici (più o meno scivolose).

6. **Controllo della Batteria**: Verifica e compensa il livello di carica della batteria, che può influenzare la potenza dei motori.

7. **Isola le Variabili**: Quando calibri, cambia un parametro alla volta per comprendere meglio il suo effetto.

## Conclusione

Il controllo di precisione è una delle competenze più avanzate nella programmazione di robot. Con le tecniche descritte in questa guida, potrai ottenere movimenti estremamente accurati, rendendo il tuo robot EV3 capace di eseguire compiti che richiedono alta precisione, come seguire percorsi complessi, manipolare oggetti con cura o navigare in spazi ristretti.

Nel prossimo capitolo, esploreremo come gestire l'inerzia e calibrare il tuo robot per ottenere prestazioni ottimali in diverse condizioni.

## Navigazione del Corso
- [📑 Indice](../README.md)
- [⬅️ Movimenti Sincronizzati](03-MovimentiSincronizzati.md)
- [➡️ Gestione dell'Inerzia e Calibrazione](05-InerziaCalibrazione.md)