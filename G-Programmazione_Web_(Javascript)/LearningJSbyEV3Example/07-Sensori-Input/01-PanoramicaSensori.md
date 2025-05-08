# Panoramica dei Sensori EV3

## Introduzione

I sensori sono componenti fondamentali di qualsiasi sistema robotico, incluso il LEGO EV3. Fungono da "organi di senso" del robot, permettendogli di percepire l'ambiente circostante e di reagire ad esso. In questo capitolo, esploreremo i diversi tipi di sensori disponibili per la piattaforma EV3, le loro caratteristiche principali e le applicazioni di base.

## L'Importanza dei Sensori nella Robotica

I sensori trasformano il tuo robot EV3 da un semplice automa programmato in un sistema interattivo e reattivo. Con i sensori, il tuo robot può:

- Rilevare la presenza di ostacoli
- Seguire linee o percorsi
- Riconoscere colori
- Misurare distanze
- Rilevare movimenti e orientamento
- Rispondere agli input dell'utente
- Adattarsi a cambiamenti nell'ambiente

## Sensori Standard del Kit LEGO EV3

Il kit LEGO Mindstorms EV3 Educational include cinque tipi principali di sensori, ciascuno progettato per rilevare specifiche proprietà fisiche:

### 1. Sensore a Ultrasuoni

![Sensore a Ultrasuoni](https://education.lego.com/v3/assets/blt293eea581807678a/blt9d3f79046232f78b/5f8802bc3073400f96b7c52b/ultrasonic-sensor.png?auto=webp&format=png&width=600&quality=90&fit=bounds)

**Funzionamento**: Emette onde sonore ad alta frequenza e misura il tempo impiegato dall'eco a tornare dopo aver colpito un oggetto.

**Capacità**:
- Misura distanze da 3 a 250 cm con precisione di ±1 cm
- Rileva la presenza/assenza di altri sensori a ultrasuoni
- Dispone di LED che lampeggiano durante la misurazione

**Porte compatibili**: Porte di input 1, 2, 3, o 4

**Accesso in MakeCode**:
```javascript
// Lettura della distanza in centimetri
let distanza = sensors.ultrasonic1.distance();

// Verifica se un altro sensore a ultrasuoni è presente
let altroSensore = sensors.ultrasonic1.presence();
```

### 2. Sensore di Colore

![Sensore di Colore](https://education.lego.com/v3/assets/blt293eea581807678a/blt7c5f5f35ef89faf0/5f880301aa8cfa0f98c4f39f/colour-sensor.png?auto=webp&format=png&width=600&quality=90&fit=bounds)

**Funzionamento**: Emette luce attraverso LED colorati e misura la luce riflessa.

**Capacità**:
- Distingue tra 7 colori: nero, blu, verde, giallo, rosso, bianco e marrone
- Misura l'intensità della luce riflessa
- Misura l'intensità della luce ambientale
- Può emettere luce rossa, verde o blu

**Porte compatibili**: Porte di input 1, 2, 3, o 4

**Accesso in MakeCode**:
```javascript
// Lettura del colore rilevato (restituisce un valore numerico)
let colore = sensors.color1.color();

// Lettura dell'intensità della luce riflessa (0-100)
let intensitaRiflessa = sensors.color1.light(LightIntensityMode.Reflected);

// Lettura dell'intensità della luce ambientale (0-100)
let intensitaAmbiente = sensors.color1.light(LightIntensityMode.Ambient);
```

### 3. Sensore Giroscopico

![Sensore Giroscopico](https://education.lego.com/v3/assets/blt293eea581807678a/blt50fa1736a13183a2/5f880350aa8cfa0f98c4f3a4/gyro-sensor.png?auto=webp&format=png&width=600&quality=90&fit=bounds)

**Funzionamento**: Misura i movimenti rotazionali e i cambiamenti nell'orientamento.

**Capacità**:
- Misura l'angolo di rotazione con precisione di ±3 gradi
- Misura la velocità di rotazione fino a 440 gradi al secondo
- Un asse di misurazione (rotazione attorno a un singolo asse)

**Porte compatibili**: Porte di input 1, 2, 3, o 4

**Accesso in MakeCode**:
```javascript
// Lettura dell'angolo attuale (in gradi)
let angolo = sensors.gyro1.angle();

// Lettura della velocità di rotazione (gradi/secondo)
let velocitaRotazione = sensors.gyro1.rate();

// Reset dell'angolo (azzeramento)
sensors.gyro1.reset();
```

### 4. Sensore Infrarossi

![Sensore Infrarossi](https://education.lego.com/v3/assets/blt293eea581807678a/blt9f8e87c3344a2bef/5f88039c3073400f96b7c530/infrared-sensor.png?auto=webp&format=png&width=600&quality=90&fit=bounds)

**Funzionamento**: Rileva radiazioni infrarosse emesse dal telecomando o riflesse da oggetti.

**Capacità**:
- Misura la distanza da oggetti fino a 70 cm
- Rileva segnali dal telecomando infrarossi EV3
- Supporta più canali per controllare più robot
- Rileva la direzione approssimativa del telecomando

**Porte compatibili**: Porte di input 1, 2, 3, o 4

**Accesso in MakeCode**:
```javascript
// Lettura della distanza (0-100, dove 0 è lontano e 100 è vicino)
let prossimica = sensors.infrared1.proximity();

// Lettura dei pulsanti premuti sul telecomando
let pulsante = sensors.infrared1.buttons(1); // Il canale può essere 1-4

// Lettura della direzione del telecomando (-25 a 25)
let direzione = sensors.infrared1.heading(1); // Il canale può essere 1-4
```

### 5. Sensore Touch

![Sensore Touch](https://education.lego.com/v3/assets/blt293eea581807678a/blt64f1f8da6c22a954/5f8803f9aa8cfa0f98c4f3a9/touch-sensor.png?auto=webp&format=png&width=600&quality=90&fit=bounds)

**Funzionamento**: Sensore meccanico che rileva quando viene premuto o rilasciato.

**Capacità**:
- Distingue tre stati: premuto, rilasciato, toccato (premuto e rilasciato)
- Semplice e affidabile per rilevare collisioni o input utente
- Ideale per funzioni di arresto di emergenza

**Porte compatibili**: Porte di input 1, 2, 3, o 4

**Accesso in MakeCode**:
```javascript
// Verifica se il sensore è premuto
let premuto = sensors.touch1.isPressed();

// Attende fino a quando il sensore viene premuto
while (!sensors.touch1.isPressed()) {
    pause(10); // Piccola pausa per evitare di saturare la CPU
}

// Rileva il cambiamento di stato (premuto o rilasciato)
sensors.touch1.onEvent(ButtonEvent.Pressed, function() {
    brick.showString("Sensore premuto!", 1);
});
```

## Connessione dei Sensori al Brick EV3

Il brick EV3 dispone di quattro porte di input numerate da 1 a 4. Tutti i sensori possono essere collegati a qualsiasi porta di input, ma è buona pratica seguire una convenzione coerente:

- **Porta 1**: Sensore touch o altri sensori per input utente
- **Porta 2**: Sensore giroscopico o sensore di colore per navigazione
- **Porta 3**: Sensore di colore (se non usato nella porta 2)
- **Porta 4**: Sensore a ultrasuoni per rilevamento ostacoli

Questa è solo una convenzione suggerita; puoi collegare i sensori in qualsiasi combinazione che soddisfi le esigenze del tuo progetto.

```javascript
// Esempio di utilizzo dei sensori su porte specifiche
let distanza = sensors.ultrasonic4.distance();
let colore = sensors.color3.color();
let angolo = sensors.gyro2.angle();
let premuto = sensors.touch1.isPressed();
```

## Considerazioni sulla Precisione dei Sensori

È importante comprendere i limiti dei sensori EV3:

- **Sensore a Ultrasuoni**: 
  - Non rileva oggetti troppo vicini (< 3 cm)
  - Può avere difficoltà con superfici morbide o angolate
  - Le onde sonore si diffondono in un cono, non in una linea precisa

- **Sensore di Colore**:
  - La precisione dipende dalle condizioni di illuminazione
  - La distanza ottimale è di circa 1 cm dalla superficie
  - Alcuni colori simili possono essere difficili da distinguere

- **Sensore Giroscopico**:
  - Può accumulare errori nel tempo (deriva)
  - È sensibile alla temperatura
  - Richiede calibrazione per misurazioni precise

- **Sensore Infrarossi**:
  - La luce solare forte può interferire con le letture
  - La portata è limitata (circa 70 cm)
  - La precisione diminuisce con la distanza

- **Sensore Touch**:
  - Richiede un contatto fisico diretto
  - La forza necessaria per l'attivazione potrebbe variare

## Calibrazione dei Sensori

Alcuni sensori, come il giroscopio e il sensore di colore, beneficiano della calibrazione:

```javascript
// Calibrazione del giroscopio
// È consigliabile eseguire questa operazione con il robot fermo
sensors.gyro1.reset();
pause(1000); // Attendi che il sensore si stabilizzi

// Calibrazione del sensore di colore per le condizioni di luce specifiche
function calibraColore() {
    brick.showString("Posiziona su BIANCO", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Bumped);
    let valoreMax = sensors.color3.light(LightIntensityMode.Reflected);
    
    brick.showString("Posiziona su NERO", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Bumped);
    let valoreMin = sensors.color3.light(LightIntensityMode.Reflected);
    
    return { min: valoreMin, max: valoreMax };
}
```

## Pattern di Base per l'Utilizzo dei Sensori

### 1. Lettura Continua

```javascript
// Lettura continua della distanza e visualizzazione sul display
forever(function() {
    let distanza = sensors.ultrasonic4.distance();
    brick.clearScreen();
    brick.showValue("Distanza", distanza, 1);
    brick.showString("cm", 1, 11);
    pause(100); // Aggiorna 10 volte al secondo
});
```

### 2. Lettura Basata su Eventi

```javascript
// Reagisce quando il sensore touch viene premuto
sensors.touch1.onEvent(ButtonEvent.Pressed, function() {
    brick.showString("Sensore premuto!", 1);
    motors.largeAB.stop();
});

// Continua con il programma principale
motors.largeAB.steer(0, 50);
```

### 3. Lettura Condizionale (polling)

```javascript
// Muovi il robot finché non rileva un ostacolo
motors.largeAB.steer(0, 50);
while (sensors.ultrasonic4.distance() > 20) {
    pause(10); // Piccola pausa per evitare di saturare la CPU
}
motors.largeAB.stop();
brick.showString("Ostacolo rilevato!", 1);
```

## Combinazione di Sensori

I progetti più interessanti spesso combinano più sensori per creare comportamenti complessi:

```javascript
// Robot che segue una linea nera ed evita ostacoli
forever(function() {
    let distanza = sensors.ultrasonic4.distance();
    let luce = sensors.color3.light(LightIntensityMode.Reflected);
    
    if (distanza < 15) {
        // Evita l'ostacolo
        motors.largeAB.steer(0, -30, 1, MoveUnit.Seconds);
        motors.largeAB.tank(-30, 30, 0.5, MoveUnit.Seconds);
    } else if (luce < 30) {
        // Sulla linea nera (valore basso di luce riflessa)
        motors.largeAB.steer(-20, 30);
    } else {
        // Fuori dalla linea (valore alto di luce riflessa)
        motors.largeAB.steer(20, 30);
    }
});
```

## Risoluzione dei Problemi Comuni

### Letture Incoerenti

Se il sensore fornisce letture instabili o incoerenti:

1. **Verifica il collegamento**: Assicurati che il cavo sia collegato saldamente sia al sensore che al brick
2. **Controlla interferenze**: Alcuni sensori possono essere influenzati da fonti di luce o suono esterno
3. **Media le letture**: Utilizza la media di più letture per ridurre il rumore

```javascript
// Media di più letture per ridurre il rumore
function distanzaMedia(numCampioni) {
    let somma = 0;
    for (let i = 0; i < numCampioni; i++) {
        somma += sensors.ultrasonic4.distance();
        pause(10);
    }
    return somma / numCampioni;
}

let distanzaStabile = distanzaMedia(5);
```

### Sensore Non Rilevato

Se il brick non rileva il sensore:

1. Verifica che il sensore sia collegato alla porta corretta
2. Controlla che il cavo non sia danneggiato
3. Riavvia il brick EV3
4. Prova a utilizzare il sensore su una porta diversa

## Estensione del Sistema Sensoriale

Oltre ai sensori standard, è possibile espandere le capacità sensoriali del tuo robot EV3:

- **Sensori di terze parti**: Aziende come HiTechnic e Mindsensors producono sensori aggiuntivi compatibili
- **Combinazioni creative**: Puoi utilizzare parti LEGO per creare meccanismi che attivano il sensore touch
- **Multipli dello stesso tipo**: Puoi utilizzare più sensori dello stesso tipo (es. due sensori di colore per seguire due linee)

## Progetti Guidati con Sensori

Per iniziare a sperimentare con i sensori, ecco alcuni semplici progetti che puoi implementare:

1. **Rilevatore di distanza**: Visualizza la distanza sul display e suona un allarme quando si avvicina a un oggetto
2. **Identificatore di colori**: Mostra il nome del colore rilevato sul display
3. **Robot che evita ostacoli**: Un robot che si muove autonomamente e cambia direzione quando incontra ostacoli
4. **Robot segui-linea**: Un robot che segue una linea nera su sfondo bianco
5. **Controllo remoto**: Un robot controllato dal telecomando infrarossi

## Conclusione

I sensori sono ciò che trasforma un semplice assemblaggio di motori e mattoncini in un vero robot interattivo. Imparare a utilizzare efficacemente i sensori è fondamentale per creare progetti robotici avanzati e intelligenti.

Nei prossimi capitoli, approfondiremo ciascun tipo di sensore, esplorando tecniche specifiche e pattern di programmazione per sfruttare al meglio le loro capacità.

## Navigazione del Corso
- [📑 Indice](../README.md)
- [➡️ Sensore a Ultrasuoni](02-SensoreUltrasuoni.md)