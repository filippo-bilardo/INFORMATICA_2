# Gestione dell'Inerzia e Calibrazione

## Introduzione

Per ottenere movimenti precisi e affidabili con un robot EV3, è essenziale comprendere e gestire l'inerzia e calibrare correttamente il sistema. In questa guida esploreremo tecniche avanzate per controllare l'inerzia e procedure di calibrazione che ti permetteranno di ottenere prestazioni ottimali in diverse condizioni operative.

## Comprendere l'Inerzia nei Robot

L'inerzia è la resistenza di un oggetto a cambiare il suo stato di movimento. Nel contesto dei robot LEGO EV3, questo fenomeno fisico si manifesta in vari modi:

1. **Slittamento**: Quando il robot accelera o decelera rapidamente, le ruote possono slittare sulla superficie.
2. **Sopravanzamento**: Quando si ferma il motore, l'inerzia fa continuare il movimento per un breve tratto.
3. **Oscillazioni**: In movimenti precisi, l'inerzia può causare piccole oscillazioni attorno alla posizione target.

## Tecniche per Gestire l'Inerzia

### 1. Accelerazione e Decelerazione Graduali

Una delle tecniche più efficaci per gestire l'inerzia è implementare rampe di accelerazione e decelerazione:

```javascript
function movimentoConRampeVelocita() {
    // Parametri
    const velocitaMax = 80;
    const passoAccelerazione = 5;
    const tempoPerPasso = 50; // millisecondi
    
    // Rampa di accelerazione
    for (let velocita = 0; velocita <= velocitaMax; velocita += passoAccelerazione) {
        motors.largeAB.steer(0, velocita);
        pause(tempoPerPasso);
    }
    
    // Movimento a velocità costante
    pause(2000);
    
    // Rampa di decelerazione
    for (let velocita = velocitaMax; velocita >= 0; velocita -= passoAccelerazione) {
        motors.largeAB.steer(0, velocita);
        pause(tempoPerPasso);
    }
    
    motors.largeAB.stop();
}
```

### 2. Approccio a Due Fasi

Per movimenti molto precisi, un approccio efficace è dividere il movimento in due fasi:

```javascript
function movimentoDueFasi(distanzaCm) {
    // Costante di conversione (da calibrare)
    const rotazioniPerCm = 1 / (Math.PI * 5.6); // Assumendo ruote di diametro 5.6 cm
    
    // Calcolo rotazioni totali
    const rotazioniTotali = distanzaCm * rotazioniPerCm;
    
    // Fase 1: movimento veloce al 90% della distanza
    motors.largeAB.steer(0, 70, rotazioniTotali * 0.9, MoveUnit.Rotations);
    pause(200); // Piccola pausa per stabilizzazione
    
    // Fase 2: movimento lento per il restante 10%
    motors.largeAB.steer(0, 20, rotazioniTotali * 0.1, MoveUnit.Rotations);
}
```

### 3. Frenata Attiva vs. Frenata Passiva

I motori EV3 supportano due modalità di arresto: frenata attiva (brake) e frenata passiva (coast):

```javascript
function dimostrazioneFrenataBrakeVsCoast() {
    // Prima parte: Frenata attiva (brake)
    brick.showString("Frenata Attiva", 1);
    
    motors.largeAB.steer(0, 80, 2, MoveUnit.Seconds);
    // Frenata attiva: il motore applica potenza in direzione opposta
    motors.largeAB.setBrake(true);
    motors.largeAB.stop();
    
    pause(3000);
    brick.clearScreen();
    
    // Seconda parte: Frenata passiva (coast)
    brick.showString("Frenata Passiva", 1);
    
    motors.largeAB.steer(0, 80, 2, MoveUnit.Seconds);
    // Frenata passiva: il motore semplicemente smette di applicare potenza
    motors.largeAB.setBrake(false);
    motors.largeAB.stop();
}
```

La frenata attiva (brake) è più precisa ma può causare movimenti bruschi, mentre la frenata passiva (coast) è più morbida ma meno prevedibile.

### 4. Pre-correzione dell'Inerzia

In alcuni casi, puoi prevedere e correggere l'inerzia fermando il motore prima di raggiungere il target:

```javascript
function movimentoPreCorretto(targetRotazioni) {
    // Fattore di correzione (da calibrare sperimentalmente)
    const fattoreInerzia = 0.05; // 5% di sopravanzamento
    
    // Calcolo del punto di arresto corretto
    const puntoArresto = targetRotazioni * (1 - fattoreInerzia);
    
    // Esegui il movimento fino al punto corretto
    motors.largeAB.steer(0, 60, puntoArresto, MoveUnit.Rotations);
    motors.largeAB.stop();
    
    // L'inerzia porterà il robot a completare il movimento fino al target
}
```

## Calibrazione dei Robot EV3

La calibrazione è il processo di misurare e aggiustare i parametri del robot per ottenere comportamenti coerenti e prevedibili. Una corretta calibrazione è fondamentale per la precisione dei movimenti.

### 1. Calibrazione del Diametro Effettivo delle Ruote

```javascript
function calibrazioneDiametroRuote() {
    brick.showString("Calibrazione Ruote", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Parametri iniziali
    let diametroStimato = 5.6; // cm, valore standard per le ruote EV3
    let distanzaTarget = 100; // cm
    
    // Calcolo rotazioni basato sulla stima iniziale
    let rotazioniStimate = distanzaTarget / (Math.PI * diametroStimato);
    
    // Prima esecuzione del movimento
    brick.showString("Muovo di 100cm", 1);
    brick.showString("Stimati: " + diametroStimato.toFixed(2) + " cm", 2);
    motors.largeAB.steer(0, 50, rotazioniStimate, MoveUnit.Rotations);
    
    // Richiedi input utente per distanza effettiva misurata
    brick.showString("Misura la distanza", 1);
    brick.showString("effettiva percorsa", 2);
    brick.showString("e premi per continuare", 3);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    
    // Qui dovresti implementare una forma di input
    // In un caso reale, potresti usare i pulsanti freccia per incrementare/decrementare
    // un valore mostrato su schermo. Per semplicità, usiamo un valore fisso
    let distanzaEffettiva = 96; // cm (esempio: il robot ha percorso 96 cm invece di 100)
    
    // Calcolo del diametro effettivo
    let diametroEffettivo = diametroStimato * (distanzaEffettiva / distanzaTarget);
    
    brick.clearScreen();
    brick.showString("Risultati:", 1);
    brick.showString("Diametro effettivo:", 2);
    brick.showString(diametroEffettivo.toFixed(2) + " cm", 3);
    
    // Test di verifica con il nuovo diametro
    brick.showString("Test di verifica", 4);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    
    // Torna alla posizione iniziale
    motors.largeAB.steer(0, -50, rotazioniStimate * (distanzaEffettiva / distanzaTarget), MoveUnit.Rotations);
    pause(1000);
    
    // Calcola rotazioni con il diametro calibrato
    let rotazioniCorrette = distanzaTarget / (Math.PI * diametroEffettivo);
    
    // Esegui il movimento con il valore calibrato
    motors.largeAB.steer(0, 50, rotazioniCorrette, MoveUnit.Rotations);
    
    brick.showString("Calibrazione completata", 5);
}
```

### 2. Calibrazione delle Rotazioni

```javascript
function calibrazioneRotazioni() {
    brick.showString("Calibrazione Rotazioni", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Parametri iniziali
    let distanzaRuoteStimata = 15; // cm, distanza tra le ruote
    let diametroRuote = 5.6; // cm
    let angoloTarget = 360; // gradi, una rotazione completa
    
    // Calcolo rotazioni basato sulle stime iniziali
    let circonferenzaGiro = Math.PI * distanzaRuoteStimata;
    let rotazioniStimate = circonferenzaGiro / (Math.PI * diametroRuote);
    
    // Esegui la rotazione
    brick.showString("Ruoto di 360°", 1);
    motors.largeAB.tank(50, -50, rotazioniStimate, MoveUnit.Rotations);
    
    // Richiedi input utente per angolo effettivo
    brick.showString("Misura l'angolo", 1);
    brick.showString("effettivo di rotazione", 2);
    brick.showString("e premi per continuare", 3);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    
    // Esempio di angolo effettivo misurato
    let angoloEffettivo = 340; // gradi (esempio: il robot ha ruotato 340° invece di 360°)
    
    // Calcolo della distanza effettiva tra le ruote
    let distanzaRuoteEffettiva = distanzaRuoteStimata * (angoloTarget / angoloEffettivo);
    
    brick.clearScreen();
    brick.showString("Risultati:", 1);
    brick.showString("Distanza effettiva:", 2);
    brick.showString(distanzaRuoteEffettiva.toFixed(2) + " cm", 3);
    
    // Test di verifica con il nuovo valore
    brick.showString("Test di verifica", 4);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    
    // Calcola rotazioni con il valore calibrato
    let rotazioniCorrected = (Math.PI * distanzaRuoteEffettiva) / (Math.PI * diametroRuote);
    
    // Esegui la rotazione con il valore calibrato
    motors.largeAB.tank(-50, 50, rotazioniCorrected, MoveUnit.Rotations); // Rotazione opposta
    pause(1000);
    motors.largeAB.tank(50, -50, rotazioniCorrected, MoveUnit.Rotations); // Rotazione originale
    
    brick.showString("Calibrazione completata", 5);
}
```

### 3. Calibrazione della Potenza dei Motori

I motori possono avere piccole differenze che causano movimenti non rettilinei. Questa procedura aiuta a calibrare la potenza relativa:

```javascript
function calibrazionePotenzaMotori() {
    brick.showString("Calibrazione Potenza", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Valori iniziali
    let potenzaA = 50;
    let potenzaB = 50;
    let correzione = 0;
    
    // Funzione di test
    function testMovimento() {
        brick.clearScreen();
        brick.showString("Test movimento", 1);
        brick.showValue("Potenza A", potenzaA, 2);
        brick.showValue("Potenza B", potenzaB, 3);
        brick.showValue("Correzione", correzione, 4);
        
        // Reset encoder
        motors.largeA.reset();
        motors.largeB.reset();
        
        // Movimento dritto per 3 secondi
        motors.largeA.run(potenzaA);
        motors.largeB.run(potenzaB);
        pause(3000);
        motors.largeAB.stop();
        
        // Leggi le rotazioni effettive
        let rotazioniA = motors.largeA.angle() / 360;
        let rotazioniB = motors.largeB.angle() / 360;
        
        // Calcola la differenza percentuale
        let differenza = ((rotazioniA - rotazioniB) / ((rotazioniA + rotazioniB) / 2)) * 100;
        
        brick.showValue("Diff %", differenza.toFixed(2), 5);
        
        // Aggiorna la correzione se necessario
        if (Math.abs(differenza) > 1) { // Se la differenza è maggiore dell'1%
            if (rotazioniA > rotazioniB) {
                correzione -= 1; // Riduci potenza del motore A
            } else {
                correzione += 1; // Aumenta potenza del motore A
            }
            
            // Aggiorna le potenze
            potenzaA = 50 + correzione;
            potenzaB = 50;
            
            brick.showString("Aggiornamento potenza", 6);
            pause(2000);
            
            // Test ricorsivo con nuovi valori
            return false;
        } else {
            brick.showString("Calibrazione OK", 6);
            return true;
        }
    }
    
    // Esegui test fino a calibrazione corretta
    let calibrazioneCompletata = false;
    while (!calibrazioneCompletata) {
        calibrazioneCompletata = testMovimento();
        if (!calibrazioneCompletata) {
            brick.showString("Ripeto test", 7);
            pause(2000);
        }
    }
    
    brick.clearScreen();
    brick.showString("Risultati finali:", 1);
    brick.showValue("Potenza A", potenzaA, 2);
    brick.showValue("Potenza B", potenzaB, 3);
    brick.showString("Utilizza questi valori", 4);
    brick.showString("nei tuoi programmi", 5);
}
```

## Compensazione della Superficie e delle Condizioni Ambientali

### 1. Calibrazione per Diverse Superfici

```javascript
function calibrazioneMultiSuperficie() {
    // Struttura dati per memorizzare i parametri calibrati per diverse superfici
    let parametriSuperfici = {
        "liscia": { diametroRuote: 5.6, distanzaRuote: 15, fattoreAttrito: 1.0 },
        "tappeto": { diametroRuote: 5.4, distanzaRuote: 15.2, fattoreAttrito: 1.3 },
        "ruvida": { diametroRuote: 5.5, distanzaRuote: 15.1, fattoreAttrito: 1.15 }
    };
    
    // Funzione per selezionare parametri in base alla superficie
    function selezionaParametri(tipoSuperficie) {
        return parametriSuperfici[tipoSuperficie] || parametriSuperfici["liscia"];
    }
    
    // Esempio di utilizzo
    function muoviSuSuperficie(distanzaCm, tipoSuperficie) {
        let params = selezionaParametri(tipoSuperficie);
        
        // Calcola rotazioni in base ai parametri della superficie
        let rotazioni = distanzaCm / (Math.PI * params.diametroRuote);
        
        // Applica il fattore di attrito alla potenza
        let potenzaAggiustata = 50 * params.fattoreAttrito;
        potenzaAggiustata = Math.min(100, potenzaAggiustata); // Limita a 100
        
        // Esegui il movimento con parametri calibrati
        motors.largeAB.steer(0, potenzaAggiustata, rotazioni, MoveUnit.Rotations);
    }
    
    // Demo di calibrazione multiSuperficie
    brick.showString("Demo Multisuperficie", 1);
    brick.showString("Seleziona superficie:", 2);
    brick.showString("SU: liscia", 3);
    brick.showString("GIU: tappeto", 4);
    brick.showString("ENTER: ruvida", 5);
    
    let superficie = "";
    while (superficie === "") {
        if (brick.buttonUp.isPressed()) {
            superficie = "liscia";
        } else if (brick.buttonDown.isPressed()) {
            superficie = "tappeto";
        } else if (brick.buttonEnter.isPressed()) {
            superficie = "ruvida";
        }
        pause(50);
    }
    
    brick.clearScreen();
    brick.showString("Movimento su:", 1);
    brick.showString(superficie, 2);
    
    muoviSuSuperficie(30, superficie);
}
```

### 2. Compensazione del Livello di Batteria

```javascript
function compensazioneBatteria() {
    // Funzione per calcolare il fattore di compensazione in base al livello batteria
    function calcolaFattoreBatteria() {
        const livelloBatteria = brick.batteryLevel();
        const livelloOttimale = 100; // Livello batteria al 100%
        
        // Se la batteria è sopra l'80%, non c'è bisogno di compensazione
        if (livelloBatteria >= 80) {
            return 1.0;
        }
        
        // Altrimenti, compensazione proporzionale al livello
        // La formula può essere calibrata sperimentalmente
        return livelloOttimale / livelloBatteria;
    }
    
    // Esempio di funzione che compensa automaticamente
    function movimentoCompensato(potenzaBase, durata) {
        const fattoreBatteria = calcolaFattoreBatteria();
        let potenzaCompensata = potenzaBase * fattoreBatteria;
        
        // Limita potenza massima a 100
        potenzaCompensata = Math.min(100, potenzaCompensata);
        
        brick.showString("Livello batteria:", 1);
        brick.showValue("%", brick.batteryLevel(), 2);
        brick.showString("Fattore compensazione:", 3);
        brick.showValue("x", fattoreBatteria.toFixed(2), 4);
        
        motors.largeAB.steer(0, potenzaCompensata, durata, MoveUnit.Seconds);
    }
    
    // Demo di compensazione batteria
    brick.showString("Demo compensazione", 1);
    brick.showString("della batteria", 2);
    brick.showString("Premere per iniziare", 3);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Esegui movimento compensato
    movimentoCompensato(50, 3);
}
```

## Tecniche di Calibrazione Avanzate

### 1. Memorizzazione dei Parametri Calibrati

```javascript
// Nota: LEGO EV3 in MakeCode non supporta nativamente la memorizzazione persistente
// Questo esempio mostra come la funzionalità potrebbe essere implementata
// usando variabili globali che persistono durante l'esecuzione del programma

// Variabili globali per memorizzare i parametri calibrati
namespace ParametriCalibrazione {
    export let diametroRuote = 5.6;
    export let distanzaRuote = 15;
    export let fattoreCorrezioneA = 1.0;
    export let fattoreCorrezioneB = 1.0;
    
    // Funzione per aggiornare i parametri
    export function aggiorna(nuovoDiametro, nuovaDistanza, nuovoFattoreA, nuovoFattoreB) {
        diametroRuote = nuovoDiametro;
        distanzaRuote = nuovaDistanza;
        fattoreCorrezioneA = nuovoFattoreA;
        fattoreCorrezioneB = nuovoFattoreB;
    }
    
    // Funzione per applicare i parametri al movimento
    export function muoviDistanzaCalibrata(distanzaCm, potenza) {
        let rotazioni = distanzaCm / (Math.PI * diametroRuote);
        
        motors.largeA.run(potenza * fattoreCorrezioneA, rotazioni, MoveUnit.Rotations);
        motors.largeB.run(potenza * fattoreCorrezioneB, rotazioni, MoveUnit.Rotations);
    }
    
    export function ruotaAngoloCalibrato(angoloGradi, potenza) {
        let circonferenzaRobot = Math.PI * distanzaRuote;
        let distanzaLineare = circonferenzaRobot * (angoloGradi / 360);
        let rotazioni = distanzaLineare / (Math.PI * diametroRuote);
        
        motors.largeA.run(potenza * fattoreCorrezioneA, rotazioni, MoveUnit.Rotations);
        motors.largeB.run(-potenza * fattoreCorrezioneB, rotazioni, MoveUnit.Rotations);
    }
}
```

### 2. Auto-calibrazione con Sensori

```javascript
function autoCalibrazione() {
    brick.showString("Auto-calibrazione", 1);
    brick.showString("con sensori", 2);
    brick.showString("Premere per iniziare", 3);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Nota: Questo esempio assume che:
    // - Un sensore ultrasonico è collegato alla porta 4
    // - Un sensore di colore per rilevare linee è collegato alla porta 1
    // - Il robot è posizionato di fronte a una parete a distanza nota
    
    // 1. Calibrazione distanza con sensore ultrasonico
    function calibraDistanza() {
        const distanzaIniziale = sensors.ultrasonic4.distance();
        const distanzaTarget = 30; // cm
        
        brick.showString("Calibrazione distanza", 1);
        brick.showValue("Distanza iniziale", distanzaIniziale, 2);
        
        // Calcola rotazioni stimate
        let diametroStimato = 5.6;
        let rotazioniStimate = distanzaTarget / (Math.PI * diametroStimato);
        
        // Muovi il robot
        motors.largeAB.steer(0, 50, rotazioniStimate, MoveUnit.Rotations);
        pause(500); // Stabilizzazione
        
        // Misura la distanza percorsa con il sensore
        const nuovaDistanza = sensors.ultrasonic4.distance();
        const distanzaPercorsa = distanzaIniziale - nuovaDistanza;
        
        // Calcola il diametro effettivo delle ruote
        const diametroEffettivo = diametroStimato * (distanzaPercorsa / distanzaTarget);
        
        brick.showValue("Distanza percorsa", distanzaPercorsa, 3);
        brick.showValue("Diametro calcolato", diametroEffettivo.toFixed(2), 4);
        
        return diametroEffettivo;
    }
    
    // 2. Calibrazione rotazione con linea di riferimento
    function calibraRotazione() {
        // Assume che il robot sia posizionato su una linea nera perpendicolare
        // e che il sensore di colore sia posizionato per rilevare la linea
        
        const valoreLinea = sensors.color1.light();
        const soglia = valoreLinea - 10; // Assumiamo che la linea sia più scura
        
        brick.showString("Calibrazione rotazione", 1);
        brick.showValue("Valore linea", valoreLinea, 2);
        
        // Parametri stimati
        let distanzaRuoteStimata = 15;
        let diametroRuote = 5.6;
        
        // Calcola rotazioni per 360 gradi
        let rotazioni = (Math.PI * distanzaRuoteStimata) / (Math.PI * diametroRuote);
        
        // Esegui una rotazione completa lentamente cercando la linea
        motors.largeAB.tank(20, -20);
        
        let tempoInizio = control.millis();
        let lineaRilevata = 0;
        let tempoPrimoRilevamento = 0;
        
        // Loop per rilevare la linea due volte (completando un giro)
        while (lineaRilevata < 2 && control.millis() - tempoInizio < 10000) {
            if (sensors.color1.light() < soglia) {
                if (lineaRilevata === 0) {
                    tempoPrimoRilevamento = control.millis() - tempoInizio;
                    brick.showString("Prima linea rilevata", 3);
                    lineaRilevata = 1;
                    pause(500); // Evita rilevamenti multipli
                } else if (lineaRilevata === 1 && (control.millis() - tempoInizio) > (tempoPrimoRilevamento + 1000)) {
                    let tempoRotazioneCompleta = control.millis() - tempoInizio;
                    lineaRilevata = 2;
                    
                    brick.showString("Seconda linea rilevata", 4);
                    motors.largeAB.stop();
                    
                    // Calcola la distanza effettiva tra le ruote
                    let rapportoTempoRotazione = tempoRotazioneCompleta / (tempoPrimoRilevamento * 2);
                    let distanzaRuoteEffettiva = distanzaRuoteStimata * rapportoTempoRotazione;
                    
                    brick.showValue("Distanza ruote", distanzaRuoteEffettiva.toFixed(2), 5);
                    
                    return distanzaRuoteEffettiva;
                }
            }
            pause(10);
        }
        
        motors.largeAB.stop();
        return distanzaRuoteStimata; // Ritorna il valore di default se la calibrazione fallisce
    }
    
    // Esegui calibrazioni
    const diametroCalibrato = calibraDistanza();
    pause(2000);
    brick.clearScreen();
    const distanzaRuoteCalibrata = calibraRotazione();
    
    // Aggiorna i parametri globali
    ParametriCalibrazione.aggiorna(diametroCalibrato, distanzaRuoteCalibrata, 1.0, 1.0);
    
    brick.clearScreen();
    brick.showString("Calibrazione completata", 1);
    brick.showString("Parametri aggiornati:", 2);
    brick.showValue("Diametro ruote", diametroCalibrato.toFixed(2), 3);
    brick.showValue("Distanza ruote", distanzaRuoteCalibrata.toFixed(2), 4);
}
```

## Best Practices per la Gestione dell'Inerzia e la Calibrazione

1. **Calibra all'inizio di ogni sessione**: Le condizioni meccaniche possono cambiare tra una sessione e l'altra.

2. **Considera l'ambiente**: Superficie, temperatura e livello della batteria influenzano il comportamento del robot.

3. **Usa movimenti combinati**: Movimento + rotazione simultanea spesso dà risultati migliori rispetto a movimenti sequenziali.

4. **Documenta i parametri calibrati**: Mantieni un registro dei parametri ottimali per diverse condizioni.

5. **Implementa un "modo calibrazione"**: Aggiungi una modalità al tuo programma che permetta di eseguire calibrazioni rapide.

6. **Test incrementali**: Migliora un parametro alla volta, testando ogni modifica.

7. **Considera il carico del robot**: Il peso influenza significativamente l'inerzia e la precisione del movimento.

## Conclusione

La gestione dell'inerzia e una calibrazione accurata sono elementi fondamentali per ottenere prestazioni ottimali dai robot LEGO EV3. Implementando le tecniche descritte in questa guida, potrai ottenere movimenti più precisi, affidabili e coerenti, indipendentemente dalle condizioni operative.

Ricorda che la robotica fisica comporta sempre una componente di variabilità: anche con la migliore calibrazione, il tuo robot potrebbe non comportarsi esattamente come previsto in ogni situazione. La chiave è implementare sistemi abbastanza robusti da adattarsi e correggere gli errori durante l'esecuzione.

## Navigazione del Corso
- [📑 Indice](../README.md)
- [⬅️ Controllo di Precisione](04-ControlloPrecisione.md)
- [➡️ Sensori e Input](../07-Sensori-Input/README.md)