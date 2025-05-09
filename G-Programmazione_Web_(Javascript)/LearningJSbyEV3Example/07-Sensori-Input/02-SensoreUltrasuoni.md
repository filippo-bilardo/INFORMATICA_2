# Sensore a Ultrasuoni

## Introduzione

Il sensore a ultrasuoni è uno dei componenti più versatili del kit LEGO EV3. Funziona in modo simile ai sistemi sonar utilizzati dai pipistrelli o dalle navi: emette onde sonore ad alta frequenza (ultrasuoni) e misura il tempo che impiegano a rimbalzare su un oggetto e tornare indietro. Questo permette al robot di "vedere" e misurare la distanza dagli oggetti circostanti.

## Caratteristiche Tecniche

- **Range di misurazione**: da 3 a 250 centimetri
- **Precisione**: ±1 centimetro
- **Frequenza di aggiornamento**: fino a 10 volte al secondo
- **Indicatori LED**: due LED che lampeggiano durante la misurazione
- **Porte compatibili**: qualsiasi porta di input (1, 2, 3, 4)

## Modalità di Funzionamento

Il sensore a ultrasuoni EV3 può operare in due modalità principali:

### 1. Modalità Distanza (Distance Mode)

In questa modalità, il sensore misura la distanza in centimetri o pollici. È la modalità più utilizzata e permette al robot di determinare quanto è lontano da un ostacolo.

### 2. Modalità Presenza (Presence Mode)

In questa modalità, il sensore rileva la presenza di altri sensori a ultrasuoni nell'ambiente. Può essere utile per la comunicazione tra robot o per evitare interferenze quando più robot con sensori a ultrasuoni operano nello stesso spazio.

## Utilizzo in JavaScript con MakeCode

### Configurazione del Sensore

Prima di utilizzare il sensore, è necessario configurarlo specificando a quale porta è collegato:

```javascript
// Configurazione del sensore a ultrasuoni sulla porta 1
const ultrasonicSensor = sensors.ultrasonic1;

// Se il sensore fosse collegato ad un'altra porta (es. porta 3)
// const ultrasonicSensor = sensors.ultrasonic3;
```

### Lettura della Distanza

Per leggere la distanza misurata dal sensore:

```javascript
// Lettura della distanza in centimetri
let distanza = ultrasonicSensor.distance();

// Stampa della distanza sul display EV3
brick.showValue("Distanza", distanza, 1);
```

### Verifica della Presenza di Altri Sensori

Per rilevare la presenza di altri sensori a ultrasuoni:

```javascript
// Verifica se un altro sensore a ultrasuoni è presente
let altroSensore = ultrasonicSensor.presence();

// Reazione in base alla presenza
if (altroSensore) {
    brick.showString("Altro sensore rilevato!", 1);
} else {
    brick.showString("Nessun altro sensore", 1);
}
```

## Esempi Pratici

### Esempio 1: Robot che Evita Ostacoli

```javascript
// Robot che si muove in avanti ed evita ostacoli
forever(function() {
    // Leggi la distanza dall'ostacolo
    let distanza = sensors.ultrasonic1.distance();
    
    // Se la distanza è inferiore a 20 cm
    if (distanza < 20) {
        // Ferma i motori
        motors.largeBC.stop();
        
        // Attendi un momento
        pause(500);
        
        // Ruota a destra
        motors.largeB.run(50);
        motors.largeC.run(-50);
        
        // Attendi per la rotazione
        pause(1000);
    } else {
        // Altrimenti, procedi in avanti
        motors.largeBC.run(50);
    }
});
```

### Esempio 2: Misurazione Continua della Distanza

```javascript
// Visualizza continuamente la distanza sul display
forever(function() {
    // Leggi la distanza
    let distanza = sensors.ultrasonic1.distance();
    
    // Visualizza sul display
    brick.clearScreen();
    brick.showValue("Distanza (cm)", distanza, 1);
    
    // Emetti un suono proporzionale alla distanza
    // (più acuto quando l'oggetto è vicino)
    if (distanza < 100) {
        brick.beep(100 - distanza);
    }
    
    // Breve pausa per non sovraccaricare il display
    pause(100);
});
```

## Limitazioni e Considerazioni

- **Superfici riflettenti**: Il sensore potrebbe avere difficoltà con superfici molto riflettenti o che assorbono il suono
- **Angolo di rilevamento**: Funziona meglio quando l'oggetto è direttamente di fronte al sensore
- **Dimensione degli oggetti**: Oggetti molto piccoli potrebbero non essere rilevati correttamente
- **Interferenze**: Più sensori a ultrasuoni attivi contemporaneamente possono interferire tra loro

## Applicazioni Comuni

- Robot che evitano ostacoli
- Misurazione di distanze e spazi
- Rilevamento di movimento
- Mappatura di ambienti
- Sistemi di parcheggio assistito
- Robot che seguono persone o oggetti a distanza costante

## Esercizi Proposti

1. **Radar Rotante**: Crea un "radar" che ruota il sensore a ultrasuoni di 180 gradi e visualizza le distanze rilevate
2. **Parcheggio Assistito**: Programma il robot per parcheggiare in uno spazio, utilizzando il sensore per misurare la distanza dalle "pareti"
3. **Inseguitore**: Fai in modo che il robot mantenga una distanza costante (es. 20 cm) da un oggetto in movimento

---

**Prossimo Capitolo**: [Sensore di Colore](03-SensoreColore.md)

**Capitolo Precedente**: [Panoramica dei Sensori EV3](01-PanoramicaSensori.md)

[Torna all'indice del modulo](README.md)