# Feedback Sonoro

## Introduzione

Il feedback sonoro è un elemento fondamentale nell'interazione uomo-macchina, specialmente nella robotica educativa. In questo capitolo, esploreremo come utilizzare le capacità audio del brick EV3 per fornire feedback sonori che migliorano l'esperienza utente e comunicano informazioni importanti.

## Capacità Audio del Brick EV3

Il brick EV3 è dotato di un altoparlante integrato che può riprodurre:

1. **Toni semplici**: Note musicali di frequenza e durata specifiche
2. **File audio**: Suoni preregistrati in formato WAV
3. **Melodie**: Sequenze di note musicali

Queste capacità permettono di creare una vasta gamma di feedback sonori, da semplici bip di conferma a melodie complesse e messaggi vocali.

## Riproduzione di Toni in JavaScript

In MakeCode per EV3, puoi utilizzare l'oggetto `music` per riprodurre toni e melodie. Ecco come riprodurre un semplice tono:

```javascript
// Riproduce un tono a 440Hz (nota LA) per 500 millisecondi
music.playTone(440, 500);
```

Puoi anche utilizzare le note musicali predefinite:

```javascript
// Riproduce la nota DO centrale per 500 millisecondi
music.playTone(262, 500); // 262Hz = DO (C4)

// Altre note comuni:
// RE (D4) = 294Hz
// MI (E4) = 330Hz
// FA (F4) = 349Hz
// SOL (G4) = 392Hz
// LA (A4) = 440Hz
// SI (B4) = 494Hz
```

## Riproduzione di File Audio

Il brick EV3 include una libreria di suoni preregistrati che puoi utilizzare nei tuoi programmi:

```javascript
// Riproduce un suono preregistrato
brick.soundEffect(BrickSoundEffect.Hello);
```

Alcuni suoni preregistrati comuni includono:

```javascript
// Saluti e messaggi
brick.soundEffect(BrickSoundEffect.Hello);
brick.soundEffect(BrickSoundEffect.Goodbye);
brick.soundEffect(BrickSoundEffect.Okay);

// Reazioni
brick.soundEffect(BrickSoundEffect.Ouch);
brick.soundEffect(BrickSoundEffect.Boing);
brick.soundEffect(BrickSoundEffect.Laughing1);

// Effetti sonori
brick.soundEffect(BrickSoundEffect.Laser);
brick.soundEffect(BrickSoundEffect.Sonar);
brick.soundEffect(BrickSoundEffect.EnergyUp);
```

## Riproduzione di Melodie

Puoi creare melodie più complesse utilizzando sequenze di note:

```javascript
// Riproduce una semplice scala ascendente
music.playTone(262, 200); // DO
pause(50); // Breve pausa tra le note
music.playTone(294, 200); // RE
pause(50);
music.playTone(330, 200); // MI
pause(50);
music.playTone(349, 200); // FA
pause(50);
music.playTone(392, 200); // SOL
pause(50);
music.playTone(440, 200); // LA
pause(50);
music.playTone(494, 200); // SI
pause(50);
music.playTone(523, 400); // DO (ottava superiore)
```

Per melodie più complesse, puoi utilizzare la funzione `beginMelody`:

```javascript
// Definisce una melodia usando la notazione RTTTL
let melodia = "jingle:d=8,o=5,b=120:32p,a,a,4a,a,a,4a,a,c6,f.,16g,2a,a#,a#,a#.,16a#,a#,a,a.,16a,a,g,g,a,g,4c6";
music.beginMelody(melodia, MelodyOptions.Once);
```

## Controllo del Volume

Puoi regolare il volume dell'altoparlante EV3:

```javascript
// Imposta il volume al 50% (valori da 0 a 100)
music.setVolume(50);
```

## Esempi di Utilizzo

### Esempio 1: Feedback di Conferma

```javascript
// Funzione per fornire feedback sonoro di conferma
function confermaOperazione() {
    // Suono breve ascendente
    music.playTone(440, 100);
    pause(50);
    music.playTone(880, 200);
}

// Utilizzo in un programma
brick.showString("Premi Enter per confermare", 1);

while (!brick.buttonEnter.wasPressed()) {
    pause(50);
}

confermaOperazione();
brick.showString("Operazione confermata!", 1);
```

### Esempio 2: Feedback di Errore

```javascript
// Funzione per fornire feedback sonoro di errore
function segnalaErrore() {
    // Suono breve discendente
    music.playTone(880, 100);
    pause(50);
    music.playTone(440, 200);
}

// Utilizzo in un programma
let valore = 15;
let limiteMax = 10;

if (valore > limiteMax) {
    segnalaErrore();
    brick.showString("Errore: valore troppo alto", 1);
}
```

### Esempio 3: Indicatore di Progresso

```javascript
// Funzione che emette un bip per ogni passo completato
function indicaProgresso(passoAttuale, totalePassi) {
    music.playTone(440, 100);
    brick.showString("Passo " + passoAttuale + "/" + totalePassi, 1);
}

// Utilizzo in un programma
let totalePassi = 5;

for (let i = 1; i <= totalePassi; i++) {
    indicaProgresso(i, totalePassi);
    
    // Simula un'operazione
    pause(1000);
}

// Segnala completamento
music.beginMelody("c5:4 e5:4 g5:4 c6:8", MelodyOptions.Once);
brick.showString("Operazione completata!", 1);
```

## Pattern di Feedback Sonoro

Ecco alcuni pattern comuni per l'utilizzo del feedback sonoro:

1. **Conferma**: Tono breve ascendente o doppio bip
2. **Errore**: Tono discendente o buzzer
3. **Avviso**: Serie di bip rapidi
4. **Completamento**: Breve melodia ascendente
5. **Attesa**: Tono ripetuto a intervalli regolari
6. **Countdown**: Serie di toni con frequenza o volume crescente

## Combinazione con Feedback Visivo

Per un'esperienza utente ottimale, è consigliabile combinare il feedback sonoro con quello visivo:

```javascript
// Funzione per segnalare un evento importante
function segnalaEvento(messaggio) {
    // Feedback sonoro
    music.playTone(880, 200);
    
    // Feedback visivo
    brick.clearScreen();
    brick.showString(messaggio, 1);
    
    // Lampeggio LED
    brick.setStatusLight(StatusLight.Orange);
    pause(500);
    brick.setStatusLight(StatusLight.Green);
}
```

## Considerazioni sull'Usabilità

Quando implementi feedback sonori, considera questi aspetti:

1. **Coerenza**: Usa gli stessi suoni per le stesse azioni in tutto il programma
2. **Semplicità**: Evita suoni troppo lunghi o complessi per azioni frequenti
3. **Significato**: Scegli suoni che abbiano una relazione intuitiva con l'azione (es. tono ascendente per successo)
4. **Contesto**: Considera l'ambiente in cui il robot verrà utilizzato (es. ambienti rumorosi potrebbero richiedere feedback visivi aggiuntivi)
5. **Personalizzazione**: Se possibile, permetti all'utente di regolare o disattivare i suoni

## Esercizi Proposti

1. **Sistema di Notifiche**: Crea un sistema di notifiche sonore per diversi eventi del robot (batteria scarica, ostacolo rilevato, ecc.)
2. **Interfaccia Audio**: Implementa un'interfaccia utente basata solo su feedback sonori
3. **Sonificazione Dati**: Converti i dati dei sensori in feedback sonori (es. tono più alto quando un oggetto è più vicino)

---

**Prossimo Capitolo**: [Indicatori LED](04-IndicatoriLED.md)

**Capitolo Precedente**: [Pulsanti del Brick](02-PulsantiBrick.md)

[Torna all'indice del modulo](README.md)