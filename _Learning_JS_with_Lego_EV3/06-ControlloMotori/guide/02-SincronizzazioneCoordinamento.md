# Guida 2: Sincronizzazione e Coordinamento Motori

## Introduzione

La sincronizzazione dei motori è fondamentale per creare movimenti fluidi e precisi nel robot EV3. In questa guida esploreremo le tecniche per coordinare più motori e creare comportamenti complessi.

## Concetti Fondamentali

### Tipi di Sincronizzazione

1. **Sincronizzazione Semplice**: Due motori che si muovono insieme
2. **Sincronizzazione Differenziale**: Velocità diverse per curve
3. **Sincronizzazione Temporale**: Coordinamento basato su timing
4. **Sincronizzazione Adattiva**: Regolazione dinamica in base al feedback

## Tecniche di Implementazione

### 1. Sincronizzazione Base con Tank Drive

```javascript
/**
 * Movimento sincronizzato base per tank drive
 */
function tankDrive(velocitàSinistra, velocitàDestra, durata) {
    // Avvia entrambi i motori simultaneamente
    motors.largeBC.tank(velocitàSinistra, velocitàDestra);
    
    // Attende la durata specificata
    pause(durata);
    
    // Ferma entrambi i motori
    motors.largeBC.stop();
}

// Esempio di utilizzo
tankDrive(50, 50, 2000);  // Avanti dritto per 2 secondi
tankDrive(30, 60, 1000);  // Curva a sinistra per 1 secondo
```

### 2. Controllo di Velocità Differenziale

```javascript
/**
 * Sistema di controllo differenziale per curve precise
 */
class DifferentialController {
    constructor(motoreDestro, motoreSinistro) {
        this.motoreDestro = motoreDestro;
        this.motoreSinistro = motoreSinistro;
        this.velocitàBase = 50;
    }
    
    /**
     * Movimento curvilineo con raggio specificato
     * @param {number} raggio - Raggio della curva (positivo=destra, negativo=sinistra)
     * @param {number} velocità - Velocità base del movimento
     */
    curva(raggio, velocità = this.velocitàBase) {
        let fattoreCurva = Math.abs(raggio) > 100 ? 0.1 : 1 / Math.abs(raggio);
        
        if (raggio > 0) {
            // Curva a destra
            let velocitàDestra = velocità * (1 - fattoreCurva);
            let velocitàSinistra = velocità;
            this.setVelocità(velocitàSinistra, velocitàDestra);
        } else if (raggio < 0) {
            // Curva a sinistra
            let velocitàDestra = velocità;
            let velocitàSinistra = velocità * (1 - fattoreCurva);
            this.setVelocità(velocitàSinistra, velocitàDestra);
        } else {
            // Movimento dritto
            this.setVelocità(velocità, velocità);
        }
    }
    
    setVelocità(sinistra, destra) {
        this.motoreSinistro.setSpeed(sinistra);
        this.motoreDestro.setSpeed(destra);
    }
    
    stop() {
        this.motoreSinistro.stop();
        this.motoreDestro.stop();
    }
}
```

### 3. Sincronizzazione Temporale Avanzata

```javascript
/**
 * Sistema di sincronizzazione temporale per movimenti complessi
 */
class TimingSynchronizer {
    constructor() {
        this.azioni = [];
        this.tempoInizio = 0;
    }
    
    /**
     * Aggiunge un'azione temporizzata
     * @param {number} tempo - Tempo di esecuzione in millisecondi
     * @param {Function} azione - Funzione da eseguire
     */
    aggiungiAzione(tempo, azione) {
        this.azioni.push({ tempo, azione });
    }
    
    /**
     * Esegue tutte le azioni in sequenza temporale
     */
    esegui() {
        // Ordina le azioni per tempo
        this.azioni.sort((a, b) => a.tempo - b.tempo);
        
        this.tempoInizio = control.millis();
        
        for (let azione of this.azioni) {
            // Attende fino al momento giusto
            while (control.millis() - this.tempoInizio < azione.tempo) {
                pause(10);
            }
            
            // Esegue l'azione
            azione.azione();
        }
    }
    
    /**
     * Pulisce la lista delle azioni
     */
    reset() {
        this.azioni = [];
    }
}

// Esempio di utilizzo
let sincronizzatore = new TimingSynchronizer();

// Sequenza di movimenti temporizzati
sincronizzatore.aggiungiAzione(0, () => {
    music.playTone(262, 200);
    motors.largeBC.tank(50, 50);
});

sincronizzatore.aggiungiAzione(2000, () => {
    music.playTone(330, 200);
    motors.largeBC.tank(30, 60);
});

sincronizzatore.aggiungiAzione(3000, () => {
    music.playTone(392, 200);
    motors.largeBC.stop();
});

sincronizzatore.esegui();
```

### 4. Coordinamento Multi-Motore con Feedback

```javascript
/**
 * Sistema di coordinamento con feedback per più motori
 */
class MultiMotorCoordinator {
    constructor() {
        this.motori = {
            sinistro: motors.largeB,
            destro: motors.largeC,
            braccio: motors.mediumA
        };
        this.encoder = {
            sinistro: 0,
            destro: 0,
            braccio: 0
        };
    }
    
    /**
     * Movimento coordinato con correzione automatica
     */
    movimentoCoordinato(distanza, velocità) {
        // Reset encoders
        this.motori.sinistro.clearCounts();
        this.motori.destro.clearCounts();
        
        let targetCounts = Math.round(distanza * 360 / (Math.PI * 5.5)); // Per ruote da 5.5cm
        
        this.motori.sinistro.setSpeed(velocità);
        this.motori.destro.setSpeed(velocità);
        
        // Loop di controllo con correzione
        while (true) {
            let countSinistro = Math.abs(this.motori.sinistro.angle());
            let countDestro = Math.abs(this.motori.destro.angle());
            
            // Controllo se abbiamo raggiunto la distanza
            if (countSinistro >= targetCounts && countDestro >= targetCounts) {
                break;
            }
            
            // Correzione per sincronizzazione
            let differenza = countSinistro - countDestro;
            
            if (Math.abs(differenza) > 10) {
                if (differenza > 0) {
                    // Motore sinistro è avanti, rallentalo
                    this.motori.sinistro.setSpeed(velocità * 0.9);
                    this.motori.destro.setSpeed(velocità * 1.1);
                } else {
                    // Motore destro è avanti, rallentalo
                    this.motori.sinistro.setSpeed(velocità * 1.1);
                    this.motori.destro.setSpeed(velocità * 0.9);
                }
            } else {
                // Mantieni velocità normale
                this.motori.sinistro.setSpeed(velocità);
                this.motori.destro.setSpeed(velocità);
            }
            
            pause(50);
        }
        
        this.fermaMotori();
    }
    
    /**
     * Movimento combinato: locomozione + braccio
     */
    movimentoCombinato(distanza, velocitàBase, angoloBraccio) {
        // Inizio movimento base
        this.movimentoCoordinato(distanza / 2, velocitàBase);
        
        // Movimento braccio durante la pausa
        this.motori.braccio.run(angoloBraccio, 30);
        
        // Completa movimento base
        this.movimentoCoordinato(distanza / 2, velocitàBase);
    }
    
    fermaMotori() {
        Object.values(this.motori).forEach(motore => motore.stop());
    }
}
```

### 5. Sincronizzazione Adattiva

```javascript
/**
 * Sistema di sincronizzazione che si adatta alle condizioni
 */
class AdaptiveSynchronizer {
    constructor() {
        this.parametri = {
            kP: 0.5,  // Controllo proporzionale
            kI: 0.1,  // Controllo integrativo
            kD: 0.05, // Controllo derivativo
            erroreIntegrale: 0,
            errorePrecedente: 0
        };
    }
    
    /**
     * Controllo PID per sincronizzazione precisa
     */
    controlloPID(errore, deltaTime) {
        this.parametri.erroreIntegrale += errore * deltaTime;
        let erroreDerivativo = (errore - this.parametri.errorePrecedente) / deltaTime;
        
        let correzione = 
            this.parametri.kP * errore +
            this.parametri.kI * this.parametri.erroreIntegrale +
            this.parametri.kD * erroreDerivativo;
        
        this.parametri.errorePrecedente = errore;
        
        return correzione;
    }
    
    /**
     * Movimento adattivo con sensori
     */
    movimentoAdattivo(distanza, velocitàBase) {
        let tempoInizio = control.millis();
        let targetCounts = distanza * 360 / (Math.PI * 5.5);
        
        motors.largeB.clearCounts();
        motors.largeC.clearCounts();
        
        while (true) {
            let tempoCorrente = control.millis();
            let deltaTime = (tempoCorrente - tempoInizio) / 1000;
            
            let countB = Math.abs(motors.largeB.angle());
            let countC = Math.abs(motors.largeC.angle());
            
            if (countB >= targetCounts && countC >= targetCounts) {
                break;
            }
            
            // Calcola errore di sincronizzazione
            let errore = countB - countC;
            
            // Applica controllo PID
            let correzione = this.controlloPID(errore, deltaTime);
            
            // Regola le velocità
            let velocitàB = velocitàBase - correzione;
            let velocitàC = velocitàBase + correzione;
            
            // Limita le velocità
            velocitàB = Math.max(-100, Math.min(100, velocitàB));
            velocitàC = Math.max(-100, Math.min(100, velocitàC));
            
            motors.largeB.setSpeed(velocitàB);
            motors.largeC.setSpeed(velocitàC);
            
            pause(20);
        }
        
        motors.largeBC.stop();
    }
}
```

## Gestione degli Errori di Sincronizzazione

### Rilevamento di Problemi

```javascript
/**
 * Sistema di monitoraggio per rilevare problemi di sincronizzazione
 */
class SyncMonitor {
    constructor() {
        this.soglie = {
            differenzaMax: 50,      // Differenza massima tra encoder
            velocitàMin: 5,         // Velocità minima per considerare il movimento
            tempoTimeout: 5000      // Timeout per movimenti
        };
        this.errori = [];
    }
    
    /**
     * Monitora lo stato di sincronizzazione
     */
    monitora(motoreA, motoreB) {
        let countA = Math.abs(motoreA.angle());
        let countB = Math.abs(motoreB.angle());
        let differenza = Math.abs(countA - countB);
        
        if (differenza > this.soglie.differenzaMax) {
            this.registraErrore("DESYNC", differenza);
            return false;
        }
        
        return true;
    }
    
    registraErrore(tipo, valore) {
        this.errori.push({
            tipo: tipo,
            valore: valore,
            timestamp: control.millis()
        });
        
        // Feedback visivo/sonoro
        brick.setStatusLight(StatusLight.Orange);
        music.playTone(440, 100);
    }
    
    getStatistiche() {
        return {
            erroriTotali: this.errori.length,
            ultimoErrore: this.errori[this.errori.length - 1]
        };
    }
}
```

## Applicazioni Pratiche

### Robot Che Disegna

```javascript
/**
 * Robot che disegna forme geometriche con precisione
 */
class DrawingRobot {
    constructor() {
        this.coordinator = new MultiMotorCoordinator();
        this.posizione = { x: 0, y: 0, angolo: 0 };
    }
    
    /**
     * Disegna un quadrato
     */
    disegnaQuadrato(lato) {
        for (let i = 0; i < 4; i++) {
            this.coordinator.movimentoCoordinato(lato, 30);
            this.gira(90);
        }
    }
    
    /**
     * Disegna un cerchio approssimato
     */
    disegnaCerchio(raggio) {
        let circonferenza = 2 * Math.PI * raggio;
        let segmenti = 36; // 10 gradi per segmento
        let lunghezzaSegmento = circonferenza / segmenti;
        
        for (let i = 0; i < segmenti; i++) {
            this.coordinator.movimentoCoordinato(lunghezzaSegmento, 20);
            this.gira(10);
        }
    }
    
    gira(gradi) {
        // Calcolo per rotazione sul posto
        let distanzaRuote = 18; // cm tra le ruote
        let arcoRotazione = (gradi * Math.PI * distanzaRuote) / 180;
        
        motors.largeB.run(-arcoRotazione * 360 / (Math.PI * 5.5), 30);
        motors.largeC.run(arcoRotazione * 360 / (Math.PI * 5.5), 30);
    }
}
```

## Best Practices

### 1. Pianificazione del Movimento
- Calcola sempre i parametri prima di iniziare
- Usa costanti per valori critici (diametro ruote, distanza tra ruote)
- Implementa controlli di sicurezza

### 2. Gestione degli Errori
- Monitora costantemente la sincronizzazione
- Implementa strategie di recupero
- Logga gli errori per l'analisi

### 3. Ottimizzazione delle Prestazioni
- Usa tempi di ciclo appropriati (20-50ms)
- Evita calcoli complessi nel loop principale
- Implementa filtri per ridurre il rumore

### 4. Testing e Calibrazione
- Testa su superfici diverse
- Calibra i parametri per il tuo robot specifico
- Verifica la precisione con misurazioni reali

## Esercizi Pratici

1. **Movimento Sincronizzato**: Implementa un sistema che mantiene due motori perfettamente sincronizzati
2. **Controllo Differenziale**: Crea un sistema per seguire un percorso curvilineo preciso
3. **Coordinamento Multi-Motore**: Sviluppa un robot che coordina movimento e manipolazione
4. **Sistema Adattivo**: Implementa un controllo che si adatta alle condizioni del terreno

## Conclusioni

La sincronizzazione e il coordinamento dei motori sono competenze essenziali per creare robot EV3 precisi e affidabili. Questi concetti formano la base per comportamenti robotici complessi e applicazioni avanzate.

---

[⬅️ Torna alla Guida 1](./01-ControlloPrecisioneAvanzato.md) | [➡️ Vai alla Guida 3](./03-CalibrazioneOttimizzazione.md)

[🏠 Torna al Modulo 6](../README.md) | [🎯 Vai agli Esempi](../esempi/README.md)
