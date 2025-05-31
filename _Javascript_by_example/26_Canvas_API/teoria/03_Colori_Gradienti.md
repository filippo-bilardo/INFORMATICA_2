# Colori, Gradienti e Pattern con Canvas

In questo capitolo esploreremo come applicare colori, gradienti e pattern alle forme disegnate sul canvas, per renderle più interessanti e accattivanti.

## Colori

Nel contesto 2D del canvas, è possibile specificare i colori in diversi modi:

- Nomi di colori predefiniti: `'red'`, `'blue'`, `'green'`, ecc.
- Valori esadecimali: `'#ff0000'` (rosso), `'#00ff00'` (verde), ecc.
- Funzioni RGB: `'rgb(255, 0, 0)'` (rosso), `'rgba(255, 0, 0, 0.5)'` (rosso semi-trasparente)
- Funzioni HSL: `'hsl(0, 100%, 50%)'` (rosso), `'hsla(0, 100%, 50%, 0.5)'` (rosso semi-trasparente)

I colori possono essere applicati sia al riempimento che al contorno delle forme:

```javascript
// Ottieni il contesto 2D
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Colore di riempimento
ctx.fillStyle = 'purple';
ctx.fillRect(25, 25, 100, 100);

// Colore del contorno
ctx.strokeStyle = '#00aaff';
ctx.lineWidth = 5;
ctx.strokeRect(150, 25, 100, 100);

// Colore con trasparenza (RGBA)
ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
ctx.fillRect(75, 75, 100, 100);
```

## Gradienti

I gradienti permettono di creare transizioni fluide tra diversi colori. Canvas supporta due tipi di gradienti:

### Gradienti Lineari

Un gradiente lineare crea una transizione di colore lungo una linea retta:

```javascript
// Crea un gradiente lineare
const gradient = ctx.createLinearGradient(0, 0, 200, 0);

// Aggiungi i colori di stop
gradient.addColorStop(0, 'blue');     // 0% del gradiente
gradient.addColorStop(0.5, 'white');  // 50% del gradiente
gradient.addColorStop(1, 'red');      // 100% del gradiente

// Usa il gradiente come stile di riempimento
ctx.fillStyle = gradient;
ctx.fillRect(10, 10, 200, 100);
```

Il metodo `createLinearGradient(x0, y0, x1, y1)` crea un gradiente lungo la linea che va dal punto (x0, y0) al punto (x1, y1).

Il metodo `addColorStop(position, color)` aggiunge un colore al gradiente, dove `position` è un valore tra 0 e 1 che rappresenta la posizione relativa lungo la linea del gradiente.

### Gradienti Radiali

Un gradiente radiale crea una transizione di colore che si irradia da un punto centrale:

```javascript
// Crea un gradiente radiale
const gradient = ctx.createRadialGradient(100, 100, 10, 100, 100, 80);

// Aggiungi i colori di stop
gradient.addColorStop(0, 'white');
// Colore al centro
gradient.addColorStop(1, 'blue');
// Colore al bordo esterno

// Usa il gradiente come stile di riempimento
ctx.fillStyle = gradient;
ctx.fillRect(20, 20, 160, 160);
```

Il metodo `createRadialGradient(x0, y0, r0, x1, y1, r1)` crea un gradiente tra due cerchi: il primo con centro in (x0, y0) e raggio r0, il secondo con centro in (x1, y1) e raggio r1.

## Pattern

I pattern permettono di riempire forme con immagini ripetute. Possono essere creati a partire da immagini, canvas o video:

```javascript
// Crea un'immagine
const img = new Image();
img.src = 'pattern.png';

// Quando l'immagine è caricata, crea il pattern e disegna
img.onload = function() {
  // Crea un pattern
  const pattern = ctx.createPattern(img, 'repeat');
  
  // Usa il pattern come stile di riempimento
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};
```

Il metodo `createPattern(image, repetition)` crea un pattern a partire da un'immagine. Il parametro `repetition` può essere:

- `'repeat'`: ripete l'immagine sia orizzontalmente che verticalmente
- `'repeat-x'`: ripete l'immagine solo orizzontalmente
- `'repeat-y'`: ripete l'immagine solo verticalmente
- `'no-repeat'`: non ripete l'immagine

## Ombre

È possibile aggiungere ombre alle forme disegnate sul canvas utilizzando le seguenti proprietà:

- `shadowColor`: il colore dell'ombra
- `shadowBlur`: l'effetto di sfocatura dell'ombra
- `shadowOffsetX`: lo spostamento orizzontale dell'ombra
- `shadowOffsetY`: lo spostamento verticale dell'ombra

Esempio:

```javascript
// Imposta le proprietà dell'ombra
ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;

// Disegna un rettangolo con ombra
ctx.fillStyle = 'blue';
ctx.fillRect(50, 50, 100, 100);

// Disegna un cerchio con ombra
ctx.beginPath();
ctx.arc(250, 100, 50, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill();
```

## Composizione

La proprietà `globalCompositeOperation` determina come i nuovi disegni si combinano con i contenuti esistenti del canvas. Ci sono diversi valori possibili, tra cui:

- `'source-over'` (default): il nuovo disegno viene posizionato sopra il contenuto esistente
- `'source-in'`: mostra solo la parte del nuovo disegno che si sovrappone al contenuto esistente
- `'source-out'`: mostra solo la parte del nuovo disegno che non si sovrappone al contenuto esistente
- `'destination-over'`: il nuovo disegno viene posizionato sotto il contenuto esistente
- `'lighter'`: somma i valori di colore
- `'multiply'`: moltiplica i valori di colore

Esempio:

```javascript
// Disegna un rettangolo blu
ctx.fillStyle = 'blue';
ctx.fillRect(50, 50, 100, 100);

// Cambia la modalità di composizione
ctx.globalCompositeOperation = 'source-atop';

// Disegna un cerchio rosso
ctx.fillStyle = 'red';
ctx.beginPath();
ctx.arc(120, 120, 50, 0, 2 * Math.PI);
ctx.fill();
```

## Trasparenza Globale

La proprietà `globalAlpha` imposta la trasparenza globale per tutti i disegni successivi:

```javascript
// Imposta la trasparenza globale al 50%
ctx.globalAlpha = 0.5;

// Tutti i disegni successivi saranno semi-trasparenti
ctx.fillStyle = 'blue';
ctx.fillRect(50, 50, 100, 100);

ctx.fillStyle = 'red';
ctx.fillRect(100, 100, 100, 100);

// Ripristina la trasparenza globale
ctx.globalAlpha = 1.0;
```

## Conclusione

In questo capitolo abbiamo esplorato come applicare colori, gradienti, pattern e ombre alle forme disegnate sul canvas. Abbiamo anche visto come utilizzare la composizione e la trasparenza globale per creare effetti interessanti.

Nel prossimo capitolo, esploreremo le trasformazioni del canvas, che permettono di ruotare, scalare e traslare gli elementi disegnati.