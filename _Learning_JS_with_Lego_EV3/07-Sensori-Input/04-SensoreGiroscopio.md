# Sensore Giroscopico

## Introduzione

Il sensore giroscopico è un componente avanzato del kit LEGO EV3 che permette al robot di rilevare e misurare rotazioni e cambiamenti di orientamento. Questo sensore è fondamentale per creare robot che necessitano di un controllo preciso del movimento rotatorio, mantenere l'equilibrio o navigare con precisione in uno spazio.

## Caratteristiche Tecniche

- **Misurazione**: rileva il movimento rotatorio e la velocità di rotazione
- **Unità di misura**: gradi (°) per la rotazione e gradi al secondo (°/s) per la velocità angolare
- **Precisione**: ±3° per una rotazione di 90°
- **Frequenza di aggiornamento**: 1 kHz (1000 volte al secondo)
- **Range di misurazione**: ±440° al secondo
- **Porte compatibili**: qualsiasi porta di input (1, 2, 3, 4)

## Modalità di Funzionamento

Il sensore giroscopico EV3 può operare in due modalità principali:

### 1. Modalità Angolo (Angle Mode)

In questa modalità, il sensore misura l'angolo di rotazione rispetto alla posizione iniziale (quando il sensore è stato azzerato o acceso). Il valore è espresso in gradi e può essere positivo o negativo a seconda della direzione di rotazione.

### 2. Modalità Velocità (Rate Mode)

In questa modalità, il sensore misura la velocità di rotazione in gradi al secondo. Anche in questo caso, il valore può essere positivo o negativo a seconda della direzione.

## Utilizzo in JavaScript con MakeCode

### Configurazione del Sensore

Prima di utilizzare il sensore, è necessario configurarlo specificando a quale porta è collegato:

```javascript
// Configurazione del sensore giroscopico sulla porta 4
const gyroSensor = sensors.gyro4;

// Se il sensore fosse collegato ad un'altra porta (es. porta 2)
// const gyroSensor = sensors.gyro2;
```

### Lettura dell'Angolo di Rotazione

Per leggere l'angolo di rotazione corrente:

```javascript
// Lettura dell'angolo in gradi
let angolo = gyroSensor.angle();

// Visualizzazione dell'angolo sul display
brick.showValue("Angolo", angolo, 1);
```

### Lettura della Velocità di Rotazione

Per leggere la velocità di rotazione corrente:

```javascript
// Lettura della velocità in gradi al secondo
let velocita = gyroSensor.rate();

// Visualizzazione della velocità sul display
brick.showValue("Velocità", velocita, 1);
```

### Reset del Sensore

Per azzerare il sensore e impostare la posizione corrente come riferimento (0 gradi):

```javascript
// Azzeramento del sensore giroscopico
gyroSensor.reset();
brick.showString("Sensore azzerato", 1);
```

## Esempi Pratici

### Esempio 1: Rotazione Precisa

```javascript
// Robot che ruota di esattamente 90 gradi

// Azzeramento del sensore prima di iniziare
sensors.gyro4.reset();
pause(1000); // Breve pausa per stabilizzazione

// Rotazione fino a 90 gradi
while (sensors.gyro4.angle() < 90) {
    // Ruota a destra
    motors.largeB.run(30);
    motors.largeC.run(-30);
    
    // Visualizza l'angolo corrente
    brick.showValue("Angolo", sensors.gyro4.angle(), 1);
    pause(10); // Piccola pausa per aggiornamento display
}

// Ferma i motori quando raggiunge 90 gradi
motors.largeBC.stop();
brick.showString("Rotazione completata!", 2);
```

### Esempio 2: Robot Equilibrista

```javascript
// Robot che mantiene l'equilibrio su due ruote
// (versione semplificata di un controllo PID)

// Costanti per il controllo
const KP = 0.5;  // Fattore proporzionale
const KD = 0.1;  // Fattore derivativo

// Azzeramento del sensore nella posizione di equilibrio
sensors.gyro4.reset();

// Variabili per il controllo
let angoloTarget = 0;
let errorePrec = 0;

forever(function() {
    // Lettura dell'angolo corrente
    let angolo = sensors.gyro4.angle();
    let velocita = sensors.gyro4.rate();
    
    // Calcolo dell'errore
    let errore = angolo - angoloTarget;
    
    // Calcolo del termine derivativo (variazione dell'errore)
    let derivativo = velocita;
    
    // Calcolo della potenza da applicare ai motori
    let potenza = (KP * errore) + (KD * derivativo);
    
    // Applicazione della potenza ai motori
    motors.largeBC.run(potenza);
    
    // Visualizzazione dei dati
    brick.showValue("Angolo", angolo, 1);
    brick.showValue("Potenza", potenza, 2);
    
    // Aggiornamento dell'errore precedente
    errorePrec = errore;
    
    // Piccola pausa per il ciclo di controllo
    pause(10);
});
```

## Limitazioni e Considerazioni

- **Deriva (Drift)**: Con il tempo, il sensore può accumulare piccoli errori che causano una "deriva" nella misurazione dell'angolo
- **Calibrazione**: È consigliabile azzerare il sensore prima di ogni utilizzo critico
- **Vibrazioni**: Forti vibrazioni possono influenzare la precisione delle letture
- **Temperatura**: Le prestazioni del sensore possono variare leggermente con la temperatura

## Applicazioni Comuni

- Rotazioni precise del robot
- Robot equilibristi (su due ruote)
- Navigazione inerziale
- Controllo di stabilità
- Misurazione di pendenze
- Rilevamento di urti o cadute

## Esercizi Proposti

1. **Rotazione Precisa**: Programma il robot per ruotare esattamente di 90°, 180° e 360° e verificane la precisione
2. **Quadrato Perfetto**: Fai percorrere al robot un percorso quadrato utilizzando il giroscopio per le rotazioni agli angoli
3. **Pendolo**: Crea un robot che oscilla come un pendolo e utilizza il giroscopio per misurare l'ampiezza dell'oscillazione

---

**Prossimo Capitolo**: [Sensore Infrarossi](05-SensoreInfrarossi.md)

**Capitolo Precedente**: [Sensore di Colore](03-SensoreColore.md)

[Torna all'indice del modulo](README.md)