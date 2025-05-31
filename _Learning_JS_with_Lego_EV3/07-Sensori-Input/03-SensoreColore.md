# Sensore di Colore

## Introduzione

Il sensore di colore è uno dei componenti più versatili del kit LEGO EV3. Questo sensore permette al robot di "vedere" i colori, distinguere tra diverse tonalità e misurare l'intensità della luce. Grazie a queste capacità, il robot può interagire con l'ambiente in modi sofisticati, come seguire linee colorate, ordinare oggetti per colore o reagire a specifici segnali visivi.

## Caratteristiche Tecniche

- **Colori riconoscibili**: 7 colori distinti (nero, blu, verde, giallo, rosso, bianco e marrone)
- **Modalità di funzionamento**: rilevamento colore, misurazione intensità luce riflessa, misurazione luce ambientale
- **Frequenza di campionamento**: fino a 1000 volte al secondo
- **LED integrato**: emette luce rossa, verde o blu per il rilevamento
- **Porte compatibili**: qualsiasi porta di input (1, 2, 3, 4)

## Modalità di Funzionamento

Il sensore di colore EV3 può operare in tre modalità principali:

### 1. Modalità Colore (Color Mode)

In questa modalità, il sensore identifica il colore dell'oggetto posto davanti ad esso. Può distinguere tra sette colori: nero, blu, verde, giallo, rosso, bianco e marrone.

### 2. Modalità Luce Riflessa (Reflected Light Mode)

In questa modalità, il sensore emette luce rossa e misura l'intensità della luce che viene riflessa da una superficie. I valori restituiti vanno da 0 (molto scuro) a 100 (molto chiaro). Questa modalità è particolarmente utile per seguire linee o rilevare bordi.

### 3. Modalità Luce Ambientale (Ambient Light Mode)

In questa modalità, il sensore misura l'intensità della luce ambientale senza emettere luce propria. I valori restituiti vanno da 0 (molto scuro) a 100 (molto chiaro). Questa modalità è utile per rilevare fonti di luce esterne o cambiamenti nell'illuminazione dell'ambiente.

## Utilizzo in JavaScript con MakeCode

### Configurazione del Sensore

Prima di utilizzare il sensore, è necessario configurarlo specificando a quale porta è collegato:

```javascript
// Configurazione del sensore di colore sulla porta 3
const colorSensor = sensors.color3;

// Se il sensore fosse collegato ad un'altra porta (es. porta 2)
// const colorSensor = sensors.color2;
```

### Rilevamento del Colore

Per rilevare il colore di un oggetto:

```javascript
// Lettura del colore
let colore = colorSensor.color();

// Visualizzazione del colore rilevato
brick.showString("Colore: " + colore, 1);

// Reazione in base al colore
if (colore === ColorSensorColor.Red) {
    brick.showString("Rilevato ROSSO!", 2);
} else if (colore === ColorSensorColor.Blue) {
    brick.showString("Rilevato BLU!", 2);
}
```

### Misurazione della Luce Riflessa

Per misurare l'intensità della luce riflessa:

```javascript
// Lettura dell'intensità della luce riflessa (0-100)
let intensita = colorSensor.reflectedLight();

// Visualizzazione dell'intensità
brick.showValue("Luce riflessa", intensita, 1);

// Esempio: rilevamento di una linea nera su sfondo bianco
if (intensita < 20) {
    brick.showString("Linea nera rilevata", 2);
}
```

### Misurazione della Luce Ambientale

Per misurare l'intensità della luce ambientale:

```javascript
// Lettura dell'intensità della luce ambientale (0-100)
let luceAmbiente = colorSensor.ambientLight();

// Visualizzazione dell'intensità
brick.showValue("Luce ambiente", luceAmbiente, 1);

// Esempio: rilevamento di buio/luce
if (luceAmbiente < 10) {
    brick.showString("È buio!", 2);
} else if (luceAmbiente > 70) {
    brick.showString("È molto luminoso!", 2);
}
```

## Esempi Pratici

### Esempio 1: Robot Segui-Linea

```javascript
// Robot che segue una linea nera su sfondo bianco
forever(function() {
    // Lettura dell'intensità della luce riflessa
    let intensita = sensors.color3.reflectedLight();
    
    // Logica di controllo per seguire la linea
    if (intensita < 30) {
        // Sulla linea nera: gira a destra
        motors.largeB.run(30);
        motors.largeC.run(10);
    } else {
        // Fuori dalla linea: gira a sinistra
        motors.largeB.run(10);
        motors.largeC.run(30);
    }
});
```

### Esempio 2: Selezionatore di Colori

```javascript
// Robot che reagisce in base al colore rilevato
forever(function() {
    // Lettura del colore
    let colore = sensors.color3.color();
    
    // Reazione in base al colore
    switch (colore) {
        case ColorSensorColor.Red:
            // Se rileva rosso, suona una nota alta e va avanti
            brick.showString("ROSSO", 1);
            music.playTone(880, 500);
            motors.largeBC.run(50);
            break;
            
        case ColorSensorColor.Green:
            // Se rileva verde, suona una nota media e ruota
            brick.showString("VERDE", 1);
            music.playTone(440, 500);
            motors.largeB.run(50);
            motors.largeC.run(-50);
            break;
            
        case ColorSensorColor.Blue:
            // Se rileva blu, suona una nota bassa e si ferma
            brick.showString("BLU", 1);
            music.playTone(220, 500);
            motors.largeBC.stop();
            break;
            
        default:
            // Per altri colori, non fa nulla di speciale
            brick.showString("Altro colore", 1);
            pause(100);
    }
    
    // Breve pausa per evitare letture troppo frequenti
    pause(500);
});
```

## Limitazioni e Considerazioni

- **Condizioni di illuminazione**: Le prestazioni del sensore possono variare in base all'illuminazione ambientale
- **Distanza ottimale**: Il sensore funziona meglio quando è posizionato a circa 1 cm dalla superficie
- **Calibrazione**: In alcune applicazioni (come il segui-linea) potrebbe essere necessario calibrare i valori soglia in base all'ambiente
- **Superfici riflettenti**: Superfici molto lucide o riflettenti possono causare letture imprecise

## Applicazioni Comuni

- Robot segui-linea
- Selezionatori e ordinatori di oggetti per colore
- Rilevamento di condizioni ambientali (luce/buio)
- Lettura di codici a colori
- Giochi interattivi basati sui colori
- Sistemi di controllo basati su segnali visivi

## Esercizi Proposti

1. **Segui-Linea Avanzato**: Crea un robot che segue una linea nera e reagisce a "segnali" colorati lungo il percorso
2. **Ordinatore di Colori**: Programma il robot per identificare e ordinare piccoli oggetti LEGO in base al loro colore
3. **Lettore di Codici a Colori**: Crea un sistema che legge una sequenza di colori e la interpreta come un "codice" per eseguire azioni specifiche

---

**Prossimo Capitolo**: [Sensore Giroscopico](04-SensoreGiroscopio.md)

**Capitolo Precedente**: [Sensore a Ultrasuoni](02-SensoreUltrasuoni.md)

[Torna all'indice del modulo](README.md)