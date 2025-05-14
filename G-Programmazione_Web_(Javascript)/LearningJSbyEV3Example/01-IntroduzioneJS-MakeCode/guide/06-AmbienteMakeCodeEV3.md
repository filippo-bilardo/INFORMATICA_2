# Guida 6: Ambiente MakeCode per EV3

## Introduzione all'Ambiente MakeCode per EV3

MakeCode per EV3 è un ambiente di sviluppo creato da Microsoft che consente di programmare i robot LEGO MINDSTORMS EV3 utilizzando un approccio a blocchi o JavaScript. Questa guida fornisce una panoramica approfondita dell'ambiente MakeCode specifico per EV3 e delle sue funzionalità principali.

## L'Interfaccia di MakeCode per EV3

### Componenti Principali dell'Interfaccia

![Interfaccia MakeCode EV3](https://i.imgur.com/XZf0cPm.png)

1. **Menu Principale**: Situato in alto, consente di accedere alle funzionalità generali come la condivisione, il salvataggio e le impostazioni.
2. **Selettore di Modalità**: Permette di passare dalla programmazione a blocchi alla programmazione JavaScript.
3. **Area di Editing**: Lo spazio centrale dove costruisci il tuo programma (blocchi o codice).
4. **Palette Blocchi/Librerie**: A sinistra, contiene le categorie dei blocchi disponibili o le librerie JavaScript.
5. **Simulatore EV3**: A destra, mostra una rappresentazione visuale del tuo robot e consente di testare il programma prima di caricarlo sul robot fisico.
6. **Console di Output**: Nella parte inferiore, visualizza messaggi di debug e informazioni di esecuzione.

## Librerie e API Specifiche per EV3

MakeCode per EV3 include librerie dedicate per interagire con i componenti hardware del robot:

### Motori

```javascript
// Controllare i motori grandi (porte A, B, C, D)
motors.largeA.run(50);  // Avvia il motore A con velocità 50
motors.largeB.stop();   // Ferma il motore B

// Controllare più motori insieme
motors.largeBC.setSpeed(70);  // Imposta la velocità per entrambi i motori B e C
motors.largeBC.run();         // Avvia entrambi i motori
motors.largeBC.tank(50, 30);  // Modalità carro armato con velocità diverse

// Controllare i motori medi
motors.mediumA.run(-30);  // Avvia il motore medio A indietro a velocità 30
```

### Sensori

```javascript
// Sensore di tocco (porte 1-4)
let premuto = sensors.touch1.isPressed();  // Verifica se il sensore di tocco è premuto

// Sensore di colore (porte 1-4)
let colore = sensors.color3.color();  // Ottiene il colore rilevato
let luce = sensors.color3.light();    // Ottiene l'intensità della luce (0-100)

// Sensore a ultrasuoni (porte 1-4)
let distanza = sensors.ultrasonic4.distance();  // Ottiene la distanza in cm

// Sensore giroscopico (porte 1-4)
let angolo = sensors.gyro1.angle();  // Ottiene l'angolo in gradi
```

### Brick EV3 (il "cervello" del robot)

```javascript
// Display del brick
brick.clearScreen();                  // Pulisce lo schermo
brick.showString("Hello!", 1);        // Mostra testo sulla riga 1
brick.showValue("Distanza", 25, 2);   // Mostra nome e valore sulla riga 2
brick.showImage(images.expressionsBig);  // Mostra un'immagine predefinita

// LED e suoni
brick.setStatusLight(StatusLight.Green);  // Imposta il LED di stato verde
music.playSoundEffect(SoundEffect.Hello);  // Riproduce un suono predefinito
music.playTone(440, 500);  // Riproduce un tono a 440Hz per 500ms
```

### Controllo del Flusso e Temporizzazione

```javascript
// Pause e temporizzazione
pause(1000);  // Mette in pausa l'esecuzione per 1000ms (1 secondo)

// Esecuzione continua
forever(function() {
    // Questo codice viene eseguito continuamente
    brick.showString("Ciclo infinito", 1);
    pause(500);
});

// Timer
let inizioTimer = control.millis();  // Ottiene il tempo corrente in millisecondi
// ... fai qualcosa ...
let tempoTrascorso = control.millis() - inizioTimer;  // Calcola il tempo trascorso
```

## Funzionalità del Simulatore

Il simulatore di MakeCode per EV3 offre:

1. **Robot Virtuale**: Una rappresentazione visuale del tuo robot EV3.
2. **Simulazione Sensori**: Puoi simulare input dai sensori:
   - Clicca sul sensore di tocco per "premerlo"
   - Regola la distanza del sensore a ultrasuoni
   - Cambia il colore rilevato dal sensore di colore
3. **Controllo Esecuzione**: Pulsanti per avviare, mettere in pausa e arrestare il programma.
4. **Feedback Visivo**: Visualizzazione in tempo reale di:
   - Rotazione dei motori
   - Display del brick
   - Stato dei LED

## Modalità di Download e Caricamento

MakeCode per EV3 offre diverse modalità per caricare i programmi sul robot:

1. **WebUSB** (solo Chrome e Edge): Collega il robot via USB e carica direttamente dal browser.
2. **File .uf2**: Scarica il programma come file .uf2 e trasferiscilo manualmente al robot.
3. **App MakeCode**: Se usi l'app desktop di MakeCode, puoi caricare direttamente sul robot.

## Debugging e Risoluzione Problemi

### Strumenti di Debugging

1. **Console**: Visualizza i messaggi di `console.log()` per il debugging.
2. **Display del Brick**: Usa `brick.showValue()` per visualizzare valori sul display del robot.
3. **Simulatore**: Testa il programma nel simulatore prima di caricarlo sul robot fisico.

### Problemi Comuni e Soluzioni

1. **Motori non rispondono**:
   - Verifica che i motori siano collegati alle porte corrette
   - Controlla che la velocità impostata non sia zero
   - Assicurati di chiamare `.run()` dopo aver impostato la velocità

2. **Sensori non funzionano**:
   - Verifica che i sensori siano collegati alle porte specificate nel codice
   - Controlla che i sensori siano configurati correttamente
   - Prova a usare `pause()` tra le letture dei sensori

3. **Problemi di download**:
   - Se WebUSB non funziona, prova il metodo del file .uf2
   - Assicurati che il robot sia acceso e correttamente collegato
   - Riavvia il browser o il robot se necessario

## Risorse e Riferimenti

- [Documentazione ufficiale MakeCode per EV3](https://makecode.mindstorms.com/reference)
- [Tutorial MakeCode per EV3](https://makecode.mindstorms.com/tutorials)
- [Forum di supporto MakeCode](https://forum.makecode.com/)

## Tecniche Avanzate

### Estensioni

MakeCode permette di aggiungere estensioni per funzionalità aggiuntive:

1. Clicca su "Extensions" nel menu blocchi
2. Cerca e aggiungi estensioni rilevanti per il tuo progetto

### Programmazione Asincrona

```javascript
// Funzione che restituisce una Promise che si risolve dopo un certo tempo
function aspetta(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Utilizzo in una funzione asincrona
async function eseguiSequenza() {
    brick.showString("Passo 1", 1);
    await aspetta(1000);
    brick.showString("Passo 2", 1);
    await aspetta(1000);
    brick.showString("Completato", 1);
}
```

### Integrazione con JavaScript Avanzato

MakeCode per EV3 supporta molte funzionalità moderne di JavaScript:

- Arrow functions: `() => { }`
- Template strings: `` `Valore: ${valore}` ``
- Destructuring: `let {x, y} = posizione`
- Metodi di array avanzati: `map()`, `filter()`, `reduce()`

---

[⬅️ Torna all'indice delle guide](./README.md) | [🔙 Torna al Modulo 01](../README.md)
