# Elaborazione Dati Sensori

## Introduzione all'Elaborazione dei Dati dei Sensori

I sensori sono gli "occhi e le orecchie" del robot EV3, fornendo informazioni cruciali sull'ambiente circostante. Tuttavia, i dati grezzi dei sensori spesso contengono rumore, imprecisioni o non sono direttamente utilizzabili per prendere decisioni. L'elaborazione dei dati dei sensori è quindi un aspetto fondamentale della programmazione robotica.

In questo capitolo esploreremo tecniche per filtrare, analizzare e interpretare i dati dei sensori per migliorare le prestazioni del robot EV3.

## Problematiche dei Dati dei Sensori

I dati dei sensori possono presentare diverse problematiche:

1. **Rumore**: Fluttuazioni casuali nelle letture che non riflettono cambiamenti reali nell'ambiente
2. **Outlier**: Valori anomali che si discostano significativamente dalle letture tipiche
3. **Deriva**: Cambiamenti graduali nelle letture nel tempo, non dovuti a cambiamenti nell'ambiente
4. **Latenza**: Ritardo tra un evento nell'ambiente e la sua rilevazione
5. **Precisione limitata**: Risoluzione o accuratezza insufficiente per alcune applicazioni

## Tecniche di Filtraggio

### Media Mobile

Una delle tecniche più semplici ed efficaci è la media mobile, che calcola la media delle ultime N letture:

```javascript
class MediaMobile {
    constructor(dimensioneFinestra = 5) {
        this.dimensioneFinestra = dimensioneFinestra;
        this.valori = [];
    }
    
    aggiungiValore(valore) {
        this.valori.push(valore);
        
        // Mantieni solo gli ultimi N valori
        if (this.valori.length > this.dimensioneFinestra) {
            this.valori.shift();
        }
    }
    
    getMedia() {
        if (this.valori.length === 0) return 0;
        
        let somma = this.valori.reduce((acc, val) => acc + val, 0);
        return somma / this.valori.length;
    }
    
    reset() {
        this.valori = [];
    }
}

// Utilizzo
let filtroDistanza = new MediaMobile(10);

function leggiDistanzaFiltrata() {
    let distanzaGrezzo = sensors.ultrasonic1.distance();
    filtroDistanza.aggiungiValore(distanzaGrezzo);
    return filtroDistanza.getMedia();
}
```

### Filtro Mediano

Il filtro mediano è particolarmente efficace per rimuovere outlier:

```javascript
class FiltroMediano {
    constructor(dimensioneFinestra = 5) {
        this.dimensioneFinestra = dimensioneFinestra;
        this.valori = [];
    }
    
    aggiungiValore(valore) {
        this.valori.push(valore);
        
        // Mantieni solo gli ultimi N valori
        if (this.valori.length > this.dimensioneFinestra) {
            this.valori.shift();
        }
    }
    
    getMediano() {
        if (this.valori.length === 0) return 0;
        
        // Crea una copia ordinata dell'array
        let valoriOrdinati = [...this.valori].sort((a, b) => a - b);
        
        // Trova il valore mediano
        let indiceMediano = Math.floor(valoriOrdinati.length / 2);
        
        if (valoriOrdinati.length % 2 === 0) {
            // Se il numero di elementi è pari, calcola la media dei due valori centrali
            return (valoriOrdinati[indiceMediano - 1] + valoriOrdinati[indiceMediano]) / 2;
        } else {
            // Se il numero di elementi è dispari, restituisci il valore centrale
            return valoriOrdinati[indiceMediano];
        }
    }
    
    reset() {
        this.valori = [];
    }
}
```

### Filtro Passa-Basso

Un filtro passa-basso semplice può essere implementato con un fattore di smorzamento:

```javascript
class FiltroPassa {
    constructor(fattoreSmorzamento = 0.2) {
        this.fattoreSmorzamento = fattoreSmorzamento;
        this.ultimoValore = null;
    }
    
    filtra(valore) {
        if (this.ultimoValore === null) {
            this.ultimoValore = valore;
            return valore;
        }
        
        // Applica il filtro passa-basso
        let valoreFiltratto = this.ultimoValore + this.fattoreSmorzamento * (valore - this.ultimoValore);
        this.ultimoValore = valoreFiltratto;
        
        return valoreFiltratto;
    }
    
    reset() {
        this.ultimoValore = null;
    }
}

// Utilizzo
let filtroColore = new FiltroPassa(0.3);

function leggiIntensitàLuceFiltrata() {
    let intensitàGrezzo = sensors.color1.light();
    return filtroColore.filtra(intensitàGrezzo);
}
```

## Rilevamento di Pattern e Eventi

### Rilevamento di Soglie

Una tecnica semplice ma efficace è il rilevamento di soglie per identificare eventi:

```javascript
class RilevatoreSoglia {
    constructor(soglia, isteresi = 0) {
        this.soglia = soglia;
        this.isteresi = isteresi;
        this.statoAttivo = false;
    }
    
    aggiorna(valore) {
        let vecchioStato = this.statoAttivo;
        
        if (this.statoAttivo) {
            // Se attualmente attivo, disattiva solo se scende sotto (soglia - isteresi)
            if (valore < this.soglia - this.isteresi) {
                this.statoAttivo = false;
            }
        } else {
            // Se attualmente non attivo, attiva solo se sale sopra la soglia
            if (valore >= this.soglia) {
                this.statoAttivo = true;
            }
        }
        
        // Restituisci true se c'è stato un cambiamento di stato
        return vecchioStato !== this.statoAttivo;
    }
    
    isAttivo() {
        return this.statoAttivo;
    }
}

// Utilizzo per rilevare ostacoli
let rilevatoreProssimità = new RilevatoreSoglia(15, 2);

function controllaOstacolo() {
    let distanza = sensors.ultrasonic1.distance();
    let cambioStato = rilevatoreProssimità.aggiorna(distanza);
    
    if (cambioStato) {
        if (rilevatoreProssimità.isAttivo()) {
            // Ostacolo rilevato
            motors.largeAB.stop();
            brick.showString("Ostacolo!", 1);
        } else {
            // Ostacolo rimosso
            motors.largeAB.run(50);
            brick.showString("Via libera", 1);
        }
    }
}

// Controlla ogni 100ms
loops.everyInterval(100, controllaOstacolo);
```

### Rilevamento di Cambiamenti

Per rilevare cambiamenti significativi nei dati dei sensori:

```javascript
class RilevatoreCambiamento {
    constructor(sogliaCambiamento, periodoStabilità = 500) {
        this.sogliaCambiamento = sogliaCambiamento;
        this.periodoStabilità = periodoStabilità;
        this.ultimoValore = null;
        this.ultimoCambiamento = 0;
    }
    
    aggiorna(valore, timestamp = control.millis()) {
        if (this.ultimoValore === null) {
            this.ultimoValore = valore;
            return false;
        }
        
        // Calcola la differenza assoluta
        let differenza = Math.abs(valore - this.ultimoValore);
        
        // Verifica se il cambiamento supera la soglia e se è passato abbastanza tempo dall'ultimo cambiamento
        if (differenza >= this.sogliaCambiamento && 
            (timestamp - this.ultimoCambiamento) >= this.periodoStabilità) {
            
            this.ultimoValore = valore;
            this.ultimoCambiamento = timestamp;
            return true;
        }
        
        return false;
    }
}

// Utilizzo per rilevare cambiamenti di luminosità
let rilevatoreLuce = new RilevatoreCambiamento(10, 1000);

function controllaLuminosità() {
    let luce = sensors.color1.light();
    
    if (rilevatoreLuce.aggiorna(luce)) {
        // Cambiamento significativo rilevato
        brick.showString(`Cambio luce: ${luce}`, 1);
    }
}
```

## Analisi Statistica dei Dati

### Calcolo di Statistiche Base

```javascript
class AnalizzatoreDati {
    constructor() {
        this.valori = [];
    }
    
    aggiungiValore(valore) {
        this.valori.push(valore);
    }
    
    getMedia() {
        if (this.valori.length === 0) return 0;
        return this.valori.reduce((acc, val) => acc + val, 0) / this.valori.length;
    }
    
    getMinimo() {
        if (this.valori.length === 0) return 0;
        return Math.min(...this.valori);
    }
    
    getMassimo() {
        if (this.valori.length === 0) return 0;
        return Math.max(...this.valori);
    }
    
    getDeviazioneSt() {
        if (this.valori.length <= 1) return 0;
        
        const media = this.getMedia();
        const sommaQuadrati = this.valori.reduce((acc, val) => {
            return acc + Math.pow(val - media, 2);
        }, 0);
        
        return Math.sqrt(sommaQuadrati / (this.valori.length - 1));
    }
    
    reset() {
        this.valori = [];
    }
}
```

### Rilevamento di Anomalie

```javascript
class RilevatoreAnomalie {
    constructor(numDeviazioni = 2) {
        this.analizzatore = new AnalizzatoreDati();
        this.numDeviazioni = numDeviazioni;
    }
    
    addValore(valore) {
        this.analizzatore.aggiungiValore(valore);
    }
    
    isAnomalia(valore) {
        if (this.analizzatore.valori.length < 10) {
            // Servono abbastanza dati per un'analisi significativa
            return false;
        }
        
        const media = this.analizzatore.getMedia();
        const devSt = this.analizzatore.getDeviazioneSt();
        
        // Calcola quante deviazioni standard il valore è lontano dalla media
        const zScore = Math.abs(valore - media) / devSt;
        
        // Se il valore è oltre il numero specificato di deviazioni standard, è un'anomalia
        return zScore > this.numDeviazioni;
    }
}
```

## Fusione di Dati da Sensori Multipli

La fusione di dati permette di combinare informazioni da più sensori per ottenere una comprensione più accurata dell'ambiente:

```javascript
class FusioneSensori {
    constructor() {
        this.filtroDistanza = new MediaMobile(5);
        this.filtroColore = new MediaMobile(3);
        this.filtroGiroscopio = new MediaMobile(8);
    }
    
    aggiornaDati() {
        // Leggi e filtra i dati dei sensori
        this.filtroDistanza.aggiungiValore(sensors.ultrasonic1.distance());
        this.filtroColore.aggiungiValore(sensors.color1.light());
        this.filtroGiroscopio.aggiungiValore(sensors.gyro1.angle());
    }
    
    getDistanzaFiltrata() {
        return this.filtroDistanza.getMedia();
    }
    
    getLuceFiltrata() {
        return this.filtroColore.getMedia();
    }
    
    getAngoloFiltrato() {
        return this.filtroGiroscopio.getMedia();
    }
    
    // Metodo che combina dati da più sensori per determinare se è sicuro procedere
    isSicuroProcedere() {
        const distanza = this.getDistanzaFiltrata();
        const luce = this.getLuceFiltrata();
        
        // Logica di decisione basata su più sensori
        return distanza > 20 && luce > 30;
    }
    
    // Metodo che stima la posizione relativa combinando dati da più sensori
    stimaPosizione() {
        // Implementazione semplificata
        return {
            distanzaMuro: this.getDistanzaFiltrata(),
            angolazione: this.getAngoloFiltrato(),
            superficieScura: this.getLuceFiltrata() < 20
        };
    }
}
```

## Calibrazione dei Sensori

La calibrazione è fondamentale per ottenere letture accurate dai sensori:

```javascript
class CalibrazioneSensore {
    constructor(tipoSensore) {
        this.tipoSensore = tipoSensore;
        this.valoreMinimo = Infinity;
        this.valoreMassimo = -Infinity;
        this.calibrato = false;
    }
    
    aggiungiCampione(valore) {
        this.valoreMinimo = Math.min(this.valoreMinimo, valore);
        this.valoreMassimo = Math.max(this.valoreMassimo, valore);
    }
    
    finalizzaCalibrazione() {
        if (this.valoreMinimo === Infinity || this.valoreMassimo === -Infinity) {
            return false;
        }
        
        // Verifica che ci sia una differenza significativa tra min e max
        if (this.valoreMassimo - this.valoreMinimo < 5) {
            return false;
        }
        
        this.calibrato = true;
        return true;
    }
    
    normalizza(valore) {
        if (!this.calibrato) return valore;
        
        // Normalizza il valore nell'intervallo [0, 100]
        return Math.max(0, Math.min(100, 
            ((valore - this.valoreMinimo) / (this.valoreMassimo - this.valoreMinimo)) * 100
        ));
    }
    
    // Procedura guidata di calibrazione
    async eseguiCalibrazione() {
        brick.showString("Calibrazione...", 1);
        brick.showString(this.tipoSensore, 2);
        
        // Reset dei valori
        this.valoreMinimo = Infinity;
        this.valoreMassimo = -Infinity;
        
        // Attendi pressione pulsante per iniziare
        brick.showString("Premi per iniziare", 3);
        await brick.buttonEnter.waitForEvent(ButtonEvent.Pressed);
        
        brick.showString("Raccolgo campioni", 3);
        
        // Raccogli campioni per 5 secondi
        const inizioCalibrazione = control.millis();
        while (control.millis() - inizioCalibrazione < 5000) {
            let valore;
            
            // Leggi il sensore appropriato
            switch (this.tipoSensore) {
                case "colore":
                    valore = sensors.color1.light();
                    break;
                case "distanza":
                    valore = sensors.ultrasonic1.distance();
                    break;
                // Altri tipi di sensori...
            }
            
            this.aggiungiCampione(valore);
            brick.showValue("Valore", valore, 4);
            
            await pause(100);
        }
        
        // Finalizza la calibrazione
        if (this.finalizzaCalibrazione()) {
            brick.showString("Calibrazione OK", 3);
            brick.showValue("Min", this.valoreMinimo, 4);
            brick.showValue("Max", this.valoreMassimo, 5);
        } else {
            brick.showString("Calibrazione fallita", 3);
        }
        
        await pause(2000);
        brick.clearScreen();
    }
}

// Utilizzo
let calibrazioneLuce = new CalibrazioneSensore("colore");

async function main() {
    await calibrazioneLuce.eseguiCalibrazione();
    
    // Ora puoi usare valori normalizzati
    while (true) {
        let luceGrezzo = sensors.color1.light();
        let luceNormalizzato = calibrazioneLuce.normalizza(luceGrezzo);
        
        brick.showValue("Grezzo", luceGrezzo, 1);
        brick.showValue("Normalizzato", luceNormalizzato, 2);
        
        await pause(100);
    }
}
```

## Esempi Pratici

### Sistema di Rilevamento Linea Avanzato

```javascript
class RilevatorLinea {
    constructor() {
        this.filtro = new MediaMobile(3);
        this.calibrazione = new CalibrazioneSensore("colore");
        this.sogliaNero = 30;  // Valore predefinito, meglio calibrare
    }
    
    async calibra() {
        await this.calibrazione.eseguiCalibrazione();
        // Imposta la soglia a metà tra min e max
        this.sogliaNero = (this.calibrazione.valoreMinimo + this.calibrazione.valoreMassimo) / 2;
    }
    
    aggiorna() {
        let luce = sensors.color1.light();
        this.filtro.aggiungiValore(luce);
        return this.filtro.getMedia();
    }
    
    isLinea() {
        let valoreAttuale = this.filtro.getMedia();
        
        if (this.calibrazione.calibrato) {
            // Usa il valore normalizzato se calibrato
            return this.calibrazione.normalizza(valoreAttuale) < 50;
        } else {
            // Usa la soglia predefinita
            return valoreAttuale < this.sogliaNero;
        }
    }
    
    getDeviazione() {
        // Calcola quanto siamo lontani dalla soglia (positivo = chiaro, negativo = scuro)
        let valoreAttuale = this.filtro.getMedia();
        
        if (this.calibrazione.calibrato) {
            // Normalizzato tra 0-100, quindi 50 è il punto medio
            return this.calibrazione.normalizza(valoreAttuale) - 50;
        } else {
            return valoreAttuale - this.sogliaNero;
        }
    }
}

// Utilizzo in un seguiLinea PID
class SeguiLineaPID {
    constructor() {
        this.rilevatore = new RilevatorLinea();
        
        // Parametri PID
        this.kp = 0.8;  // Proporzionale
        this.ki = 0.1;  // Integrale
        this.kd = 0.4;  // Derivativo
        
        this.errorePrec = 0;
        this.integrale = 0;
        
        this.velocitàBase = 50;
    }
    
    async inizializza() {
        await this.rilevatore.calibra();
    }
    
    aggiorna() {
        // Aggiorna la lettura del sensore
        this.rilevatore.aggiorna();
        
        // Calcola l'errore (deviazione dalla linea)
        let errore = this.rilevatore.getDeviazione();
        
        // Calcola il termine integrale (somma degli errori nel tempo)
        this.integrale = this.integrale * 0.8 + errore * 0.2;
        
        // Calcola il termine derivativo (variazione dell'errore)
        let derivativo = errore - this.errorePrec;
        this.errorePrec = errore;
        
        // Calcola la correzione PID
        let correzione = (this.kp * errore) + (this.ki * this.integrale) + (this.kd * derivativo);
        
        // Applica la correzione ai motori
        let velocitàSinistra = this.velocitàBase - correzione;
        let velocitàDestra = this.velocitàBase + correzione;
        
        // Limita le velocità
        velocitàSinistra = Math.max(-100, Math.min(100, velocitàSinistra));
        velocitàDestra = Math.max(-100, Math.min(100, velocitàDestra));
        
        // Imposta le velocità dei motori
        motors.largeA.run(velocitàSinistra);
        motors.largeB.run(velocitàDestra);
        
        // Visualizza informazioni di debug
        brick.showValue("Errore", errore, 1);
        brick.showValue("Correzione", correzione, 2);
    }
}
```

## Considerazioni sulle Prestazioni

Quando si implementano algoritmi di elaborazione dati sul brick EV3:

- **Efficienza computazionale**: Scegli algoritmi che bilancino precisione e costo computazionale
- **Frequenza di campionamento**: Adatta la frequenza di lettura dei sensori alle esigenze dell'applicazione
- **Memoria**: Monitora l'utilizzo della memoria, specialmente con buffer di grandi dimensioni
- **Latenza**: Considera il ritardo introdotto dall'elaborazione quando si progettano sistemi di controllo

## Esercizi Pratici

1. Implementa un filtro a media mobile per migliorare le letture di un sensore di distanza
2. Crea un sistema di calibrazione per un sensore di colore che normalizza le letture
3. Sviluppa un algoritmo di rilevamento di anomalie per identificare letture insolite dei sensori
4. Implementa un sistema di fusione dati che combina informazioni da più sensori per prendere decisioni

---

**Prossima Guida**: [Logging e Debug](05-LoggingDebug.md)

**Guida Precedente**: [Memorizzazione Dati](03-MemorizzazioneDati.md)

**Modulo**: [Gestione Dati e Strutture Dati](README.md)

[Torna all'indice del corso](../README.md)