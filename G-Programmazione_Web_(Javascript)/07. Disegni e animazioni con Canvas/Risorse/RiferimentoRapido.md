# Guida di Riferimento Rapido per Canvas HTML5

Questa guida fornisce un riferimento conciso ai metodi e alle proprietà più comuni dell'API Canvas, organizzati per categoria. Utile come promemoria durante lo sviluppo.

## 1. Configurazione di Base

```javascript
// Ottieni il riferimento al canvas
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Imposta dimensioni canvas
canvas.width = 800;
canvas.height = 600;

// Salva/ripristina lo stato
ctx.save();      // Salva lo stato corrente del contesto
ctx.restore();   // Ripristina lo stato precedentemente salvato
```

## 2. Rettangoli e Tracciati

```javascript
// Rettangoli
ctx.fillRect(x, y, width, height);    // Rettangolo pieno
ctx.strokeRect(x, y, width, height);  // Contorno rettangolo
ctx.clearRect(x, y, width, height);   // Cancella area rettangolare

// Tracciati
ctx.beginPath();                      // Inizia un nuovo tracciato
ctx.moveTo(x, y);                     // Sposta il punto corrente
ctx.lineTo(x, y);                     // Linea dal punto corrente a (x,y)
ctx.closePath();                      // Chiude il tracciato
ctx.fill();                          // Riempie il tracciato
ctx.stroke();                        // Disegna il contorno del tracciato
```

## 3. Archi e Curve

```javascript
// Archi
ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);

// Curve quadratiche (1 punto di controllo)
ctx.quadraticCurveTo(cpx, cpy, x, y);

// Curve cubiche (2 punti di controllo)
ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);

// Archi definiti da tangenti
ctx.arcTo(x1, y1, x2, y2, radius);
```

## 4. Stili di Linea e Riempimento

```javascript
// Colori
ctx.fillStyle = 'red';                // Colore di riempimento
ctx.strokeStyle = '#00FF00';          // Colore del contorno
ctx.globalAlpha = 0.5;                // Trasparenza globale

// Stili di linea
ctx.lineWidth = 5;                    // Spessore linea
ctx.lineCap = 'round';                // Fine linea: butt, round, square
ctx.lineJoin = 'round';               // Unione linee: miter, round, bevel
ctx.miterLimit = 10;                  // Limite smusso per lineJoin 'miter'
ctx.setLineDash([5, 15]);             // Imposta linea tratteggiata
ctx.lineDashOffset = 0;               // Offset della linea tratteggiata

// Gradienti
const linearGrad = ctx.createLinearGradient(x0, y0, x1, y1);
const radialGrad = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
linearGrad.addColorStop(0, 'white');
linearGrad.addColorStop(1, 'black');
ctx.fillStyle = linearGrad;

// Pattern
const pattern = ctx.createPattern(image/canvas/video, 'repeat');
ctx.fillStyle = pattern;
```

## 5. Testo

```javascript
// Proprietà del testo
ctx.font = 'italic bold 16px Arial';
ctx.textAlign = 'left';          // left, right, center, start, end
ctx.textBaseline = 'alphabetic'; // top, hanging, middle, alphabetic, bottom

// Disegno del testo
ctx.fillText(text, x, y, maxWidth);     // Testo pieno
ctx.strokeText(text, x, y, maxWidth);   // Contorno del testo

// Misurare il testo
const metrics = ctx.measureText(text);  // Restituisce TextMetrics
const width = metrics.width;            // Larghezza del testo
```

## 6. Immagini

```javascript
// Disegnare un'immagine
ctx.drawImage(image, dx, dy);
ctx.drawImage(image, dx, dy, dw, dh);
ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);

// Manipolazione dei pixel
const imageData = ctx.getImageData(x, y, w, h);
const data = imageData.data; // Array RGBA
ctx.putImageData(imageData, x, y);

// Filtri
ctx.filter = 'blur(5px)';
ctx.filter = 'brightness(150%)';
ctx.filter = 'contrast(200%)';
ctx.filter = 'grayscale(100%)';
```

## 7. Trasformazioni

```javascript
// Trasformazioni di base
ctx.translate(x, y);      // Sposta l'origine
ctx.rotate(angle);        // Ruota (in radianti)
ctx.scale(x, y);          // Scala

// Trasformazioni dirette
ctx.transform(a, b, c, d, e, f);    // Applica una trasformazione
ctx.setTransform(a, b, c, d, e, f); // Imposta la trasformazione
ctx.resetTransform();               // Reimposta la trasformazione
```

## 8. Compositing e Clipping

```javascript
// Modalità di composizione
ctx.globalCompositeOperation = 'source-over'; // Predefinito
// Altre modalità: source-in, source-out, source-atop, 
// destination-over, destination-in, destination-out, destination-atop,
// lighter, copy, xor, multiply, screen, overlay, darken, lighten

// Clipping
ctx.clip();          // Crea una maschera dal tracciato corrente
```

## 9. Ombre

```javascript
ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 10;
```

## 10. Animazione

```javascript
// Animazione basilare
function animate() {
    // Cancella il canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Disegna e aggiorna
    update();
    draw();
    
    // Continua l'animazione
    requestAnimationFrame(animate);
}

// Avvia l'animazione
requestAnimationFrame(animate);
```

## 11. Gestione degli eventi

```javascript
// Evento click
canvas.addEventListener('click', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Controlla se il click è su un oggetto
    if (isPointInPath(x, y)) {
        // Gestisci il click
    }
});

// Supporto touch
canvas.addEventListener('touchstart', handleTouch, { passive: false });
canvas.addEventListener('touchmove', handleTouch, { passive: false });

function handleTouch(e) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    // Gestisci il tocco
}
```

## 12. Ottimizzazione

```javascript
// Off-screen canvas per elementi statici
const offCanvas = document.createElement('canvas');
offCanvas.width = canvas.width;
offCanvas.height = canvas.height;
const offCtx = offCanvas.getContext('2d');

// Disegna elementi statici una sola volta
drawStaticElements(offCtx);

// Nell'animazione, copia l'off-screen canvas
ctx.drawImage(offCanvas, 0, 0);

// Ridimensionamento per display ad alta densità
function setupHiDPI() {
    const dpr = window.devicePixelRatio || 1;
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    canvas.width *= dpr;
    canvas.height *= dpr;
    ctx.scale(dpr, dpr);
}
```

---
[Torna all'indice](../README.md)
