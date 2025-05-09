# Display EV3

## Introduzione

Il display del brick EV3 è uno strumento fondamentale per l'interazione con l'utente. Si tratta di un display LCD monocromatico con una risoluzione di 178x128 pixel che permette di visualizzare testo, numeri, immagini semplici e grafica. Attraverso il display, puoi fornire feedback all'utente, visualizzare dati dei sensori, creare interfacce di controllo e molto altro.

In questo capitolo, esploreremo le diverse funzionalità del display EV3 e come utilizzarle efficacemente nei tuoi programmi JavaScript.

## Caratteristiche del Display EV3

- **Risoluzione**: 178x128 pixel
- **Tipo**: LCD monocromatico (bianco e nero)
- **Retroilluminazione**: Sì
- **Coordinate**: L'origine (0,0) è nell'angolo in alto a sinistra

## Funzioni Base per il Display

### Cancellare il Display

Prima di visualizzare nuove informazioni, è spesso utile cancellare il display per evitare sovrapposizioni con contenuti precedenti:

```javascript
// Cancella tutto il contenuto del display
brick.clearScreen();
```

### Visualizzare Testo

Per visualizzare testo sul display:

```javascript
// Visualizza una stringa di testo su una riga specifica (0-7)
brick.showString("Ciao Mondo!", 1);

// Visualizza testo in una posizione specifica (x, y)
brick.showString("Posizione personalizzata", 0, 50);
```

Le righe del display sono numerate da 0 a 7, dove 0 è la riga superiore e 7 è quella inferiore.

### Visualizzare Valori Numerici

Per visualizzare valori numerici, spesso con un'etichetta:

```javascript
// Visualizza un valore numerico con etichetta su una riga specifica
let temperatura = 25;
brick.showValue("Temperatura", temperatura, 2);

// Visualizza un valore con posizione e dimensione personalizzate
brick.showValue("Velocità", 50, 3, 20); // Riga 3, dimensione 20
```

### Visualizzare Immagini Predefinite

L'EV3 include alcune immagini predefinite che possono essere visualizzate sul display:

```javascript
// Visualizza un'immagine predefinita
brick.showImage(ImageNames.EyesNeutral, 0, 0);

// Alcune immagini disponibili:
// - ImageNames.EyesNeutral, ImageNames.EyesAngry, ImageNames.EyesSleepy
// - ImageNames.Target, ImageNames.Dial
// - ImageNames.Check, ImageNames.Cross
```

## Funzioni Grafiche Avanzate

### Disegnare Pixel

Puoi disegnare singoli pixel sul display:

```javascript
// Disegna un pixel alle coordinate (x, y)
brick.setPixel(50, 50);
```

### Disegnare Linee

Per disegnare linee tra due punti:

```javascript
// Disegna una linea da (x1, y1) a (x2, y2)
brick.drawLine(10, 10, 100, 50);
```

### Disegnare Rettangoli

Per disegnare rettangoli:

```javascript
// Disegna un rettangolo con angolo in alto a sinistra in (x, y) e dimensioni (width, height)
brick.drawRect(20, 20, 60, 40);

// Disegna un rettangolo pieno
brick.fillRect(90, 20, 60, 40);
```

### Disegnare Cerchi

Per disegnare cerchi:

```javascript
// Disegna un cerchio con centro in (x, y) e raggio r
brick.drawCircle(80, 64, 30);

// Disegna un cerchio pieno
brick.fillCircle(40, 64, 20);
```

## Esempi Pratici

### Esempio 1: Dashboard per Sensori

```javascript
// Dashboard che visualizza i valori di diversi sensori
forever(function() {
    // Cancella il display
    brick.clearScreen();
    
    // Titolo
    brick.showString("DASHBOARD SENSORI", 0);
    
    // Lettura e visualizzazione dei valori dei sensori
    let distanza = sensors.ultrasonic1.distance();
    let colore = sensors.color3.color();
    let angolo = sensors.gyro4.angle();
    
    // Visualizzazione dei valori
    brick.showValue("Distanza", distanza, 2);
    brick.showValue("Colore", colore, 3);
    brick.showValue("Angolo", angolo, 4);
    
    // Indicatore grafico per la distanza
    let barraLunghezza = Math.min(100, distanza);
    brick.fillRect(10, 100, barraLunghezza, 10);
    
    // Breve pausa per non aggiornare troppo frequentemente
    pause(100);
});
```

### Esempio 2: Animazione Semplice

```javascript
// Animazione di un punto che si muove sul display

// Posizione iniziale
let x = 89; // Centro orizzontale
let y = 64; // Centro verticale

// Velocità di movimento
let vx = 2;
let vy = 1;

forever(function() {
    // Cancella il display
    brick.clearScreen();
    
    // Aggiorna la posizione
    x += vx;
    y += vy;
    
    // Controlla i bordi e rimbalza
    if (x <= 0 || x >= 177) {
        vx = -vx;
    }
    if (y <= 0 || y >= 127) {
        vy = -vy;
    }
    
    // Disegna il punto
    brick.fillCircle(x, y, 5);
    
    // Breve pausa per l'animazione
    pause(50);
});
```

## Considerazioni e Limitazioni

- **Prestazioni**: Aggiornare frequentemente l'intero display può rallentare l'esecuzione del programma
- **Contrasto**: Il display ha un contrasto limitato, quindi è importante utilizzare elementi grafici chiari e leggibili
- **Dimensione del testo**: Il testo standard occupa circa 8 pixel in altezza, quindi ci sono circa 16 righe disponibili
- **Memoria**: Le operazioni grafiche complesse possono richiedere molta memoria

## Consigli per un'Interfaccia Efficace

1. **Mantieni la semplicità**: Data la risoluzione limitata, evita di sovraccaricare il display con troppe informazioni
2. **Usa la gerarchia visiva**: Posiziona le informazioni più importanti in alto o al centro
3. **Fornisci feedback**: Aggiorna il display quando l'utente interagisce con il robot
4. **Usa elementi grafici**: Quando appropriato, usa elementi grafici invece del testo per comunicare informazioni
5. **Testa la leggibilità**: Assicurati che il testo sia leggibile da una distanza ragionevole

## Esercizi Proposti

1. **Orologio Digitale**: Crea un orologio che visualizza il tempo trascorso dall'avvio del programma
2. **Grafico in Tempo Reale**: Visualizza un grafico che mostra i valori di un sensore nel tempo
3. **Animazione Personalizzata**: Crea un'animazione che reagisce ai dati dei sensori

---

**Prossimo Capitolo**: [Pulsanti del Brick](02-PulsantiBrick.md)

[Torna all'indice del modulo](README.md)