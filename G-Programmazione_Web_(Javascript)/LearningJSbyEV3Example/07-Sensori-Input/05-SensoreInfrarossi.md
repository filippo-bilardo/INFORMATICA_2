# Sensore Infrarossi

## Introduzione

Il sensore infrarossi è un componente versatile del kit LEGO EV3 che permette al robot di rilevare oggetti a distanza e ricevere comandi da un telecomando. Funziona emettendo e rilevando radiazioni infrarosse, invisibili all'occhio umano ma molto utili per la robotica. Questo sensore offre al robot la capacità di "vedere" nell'oscurità e di essere controllato a distanza.

## Caratteristiche Tecniche

- **Range di rilevamento**: da 5 a 70 centimetri circa
- **Modalità di funzionamento**: rilevamento di prossimità, rilevamento beacon, ricezione comandi remoti
- **Canali del telecomando**: 4 canali selezionabili
- **Pulsanti del telecomando**: 4 pulsanti direzionali (rosso, blu, sinistra, destra)
- **Porte compatibili**: qualsiasi porta di input (1, 2, 3, 4)

## Modalità di Funzionamento

Il sensore infrarossi EV3 può operare in tre modalità principali:

### 1. Modalità Prossimità (Proximity Mode)

In questa modalità, il sensore misura la distanza approssimativa da un oggetto. Restituisce un valore da 0 a 100, dove 0 rappresenta la massima vicinanza e 100 l'assenza di oggetti nel raggio di rilevamento.

### 2. Modalità Beacon (Beacon Mode)

In questa modalità, il sensore rileva la presenza, la direzione e la distanza approssimativa del telecomando infrarossi quando questo è impostato in modalità "beacon" (faro). Questa funzionalità è utile per creare robot che seguono o trovano il telecomando.

### 3. Modalità Telecomando (Remote Mode)

In questa modalità, il sensore riceve i comandi inviati dal telecomando infrarossi, permettendo di controllare il robot a distanza.

## Utilizzo in JavaScript con MakeCode

### Configurazione del Sensore

Prima di utilizzare il sensore, è necessario configurarlo specificando a quale porta è collegato:

```javascript
// Configurazione del sensore infrarossi sulla porta 4
const irSensor = sensors.infrared4;

// Se il sensore fosse collegato ad un'altra porta (es. porta 1)
// const irSensor = sensors.infrared1;
```

### Misurazione della Prossimità

Per misurare la distanza da un oggetto:

```javascript
// Lettura della prossimità (0-100)
let prossimita = irSensor.proximity();

// Visualizzazione del valore sul display
brick.showValue("Prossimità", prossimita, 1);

// Esempio: reazione in base alla prossimità
if (prossimita < 30) {
    brick.showString("Oggetto vicino!", 2);
}
```

### Rilevamento del Beacon

Per rilevare la direzione e la distanza del beacon (telecomando in modalità faro):

```javascript
// Impostazione del canale (1-4)
const canale = 1;

// Lettura della direzione del beacon (-25 a 25, 0 è di fronte)
let direzione = irSensor.beaconDirection(canale);

// Lettura della distanza del beacon (0-100)
let distanza = irSensor.beaconProximity(canale);

// Visualizzazione dei valori
brick.showValue("Direzione", direzione, 1);
brick.showValue("Distanza", distanza, 2);

// Verifica se il beacon è rilevato
if (distanza > 0) {
    brick.showString("Beacon trovato!", 3);
} else {
    brick.showString("Beacon non trovato", 3);
}
```

### Ricezione Comandi dal Telecomando

Per ricevere e interpretare i comandi dal telecomando:

```javascript
// Impostazione del canale (1-4)
const canale = 1;

// Lettura del pulsante premuto
let pulsante = irSensor.remoteCommand(canale);

// Reazione in base al pulsante premuto
switch (pulsante) {
    case RemoteButtonCode.TopLeft:
        brick.showString("Avanti a sinistra", 1);
        motors.largeB.run(30);
        motors.largeC.run(70);
        break;
        
    case RemoteButtonCode.TopRight:
        brick.showString("Avanti a destra", 1);
        motors.largeB.run(70);
        motors.largeC.run(30);
        break;
        
    case RemoteButtonCode.BottomLeft:
        brick.showString("Indietro a sinistra", 1);
        motors.largeB.run(-30);
        motors.largeC.run(-70);
        break;
        
    case RemoteButtonCode.BottomRight:
        brick.showString("Indietro a destra", 1);
        motors.largeB.run(-70);
        motors.largeC.run(-30);
        break;
        
    case RemoteButtonCode.TopLeftTopRight:
        brick.showString("Avanti", 1);
        motors.largeBC.run(50);
        break;
        
    case RemoteButtonCode.BottomLeftBottomRight:
        brick.showString("Indietro", 1);
        motors.largeBC.run(-50);
        break;
        
    default:
        brick.showString("Stop", 1);
        motors.largeBC.stop();
}
```

## Esempi Pratici

### Esempio 1: Robot Telecomandato

```javascript
// Robot controllato dal telecomando infrarossi
forever(function() {
    // Lettura del comando dal telecomando (canale 1)
    let comando = sensors.infrared1.remoteCommand(1);
    
    // Controllo del robot in base al comando
    switch (comando) {
        case RemoteButtonCode.TopLeft:
            // Avanti a sinistra
            motors.largeB.run(20);
            motors.largeC.run(60);
            break;
            
        case RemoteButtonCode.TopRight:
            // Avanti a destra
            motors.largeB.run(60);
            motors.largeC.run(20);
            break;
            
        case RemoteButtonCode.BottomLeft:
            // Indietro a sinistra
            motors.largeB.run(-20);
            motors.largeC.run(-60);
            break;
            
        case RemoteButtonCode.BottomRight:
            // Indietro a destra
            motors.largeB.run(-60);
            motors.largeC.run(-20);
            break;
            
        case RemoteButtonCode.TopLeftTopRight:
            // Avanti dritto
            motors.largeBC.run(50);
            break;
            
        case RemoteButtonCode.BottomLeftBottomRight:
            // Indietro dritto
            motors.largeBC.run(-50);
            break;
            
        case RemoteButtonCode.TopLeftBottomLeft:
            // Rotazione a sinistra sul posto
            motors.largeB.run(-40);
            motors.largeC.run(40);
            break;
            
        case RemoteButtonCode.TopRightBottomRight:
            // Rotazione a destra sul posto
            motors.largeB.run(40);
            motors.largeC.run(-40);
            break;
            
        default:
            // Nessun pulsante premuto: ferma i motori
            motors.largeBC.stop();
    }
    
    // Breve pausa per non sovraccaricare il sistema
    pause(50);
});
```

### Esempio 2: Robot Cercatore di Beacon

```javascript
// Robot che cerca e si avvicina al beacon (telecomando)
forever(function() {
    // Lettura della direzione e distanza del beacon (canale 1)
    let direzione = sensors.infrared1.beaconDirection(1);
    let distanza = sensors.infrared1.beaconProximity(1);
    
    // Visualizzazione dei valori
    brick.clearScreen();
    brick.showValue("Direzione", direzione, 1);
    brick.showValue("Distanza", distanza, 2);
    
    // Verifica se il beacon è rilevato
    if (distanza > 0) {
        // Beacon trovato: muoviti verso di esso
        brick.showString("Beacon trovato!", 3);
        
        // Calcolo della potenza dei motori in base alla direzione
        let potenzaSinistra = 50 - direzione;
        let potenzaDestra = 50 + direzione;
        
        // Limitazione dei valori di potenza
        potenzaSinistra = Math.max(-100, Math.min(100, potenzaSinistra));
        potenzaDestra = Math.max(-100, Math.min(100, potenzaDestra));
        
        // Movimento verso il beacon
        motors.largeB.run(potenzaSinistra);
        motors.largeC.run(potenzaDestra);
        
        // Se il beacon è molto vicino, fermati
        if (distanza < 20) {
            motors.largeBC.stop();
            brick.showString("Obiettivo raggiunto!", 4);
        }
    } else {
        // Beacon non trovato: ruota per cercarlo
        brick.showString("Cercando beacon...", 3);
        motors.largeB.run(30);
        motors.largeC.run(-30);
    }
    
    // Breve pausa
    pause(100);
});
```

## Limitazioni e Considerazioni

- **Interferenze**: Fonti di luce intensa (come la luce solare diretta) possono interferire con il sensore
- **Portata**: La portata effettiva può variare in base alle condizioni ambientali
- **Angolo di rilevamento**: Il sensore ha un campo visivo limitato, specialmente in modalità beacon
- **Batterie del telecomando**: Assicurarsi che le batterie del telecomando siano cariche per un funzionamento ottimale

## Applicazioni Comuni

- Robot telecomandati
- Sistemi di navigazione che seguono un beacon
- Rilevamento di ostacoli e oggetti
- Giochi interattivi con controllo remoto
- Robot che cercano o evitano fonti di calore (che emettono infrarossi)

## Esercizi Proposti

1. **Controllo Avanzato**: Crea un robot telecomandato con funzioni speciali attivabili con combinazioni di pulsanti
2. **Cercatore di Tesori**: Programma un robot che cerca e si avvicina a un beacon nascosto, emettendo suoni quando si avvicina
3. **Evita Ostacoli con Telecomando**: Combina il controllo remoto con il rilevamento di prossimità per creare un robot che può essere guidato ma evita automaticamente gli ostacoli

---

**Prossimo Capitolo**: [Sensore Touch](06-SensoreTouch.md)

**Capitolo Precedente**: [Sensore Giroscopico](04-SensoreGiroscopio.md)

[Torna all'indice del modulo](README.md)