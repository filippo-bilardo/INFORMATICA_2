# Disegno di Forme Base con Canvas

## Rettangoli e Quadrati

Il contesto 2D del canvas offre tre metodi principali per disegnare rettangoli:

- `fillRect(x, y, width, height)`: disegna un rettangolo pieno
- `strokeRect(x, y, width, height)`: disegna solo il contorno di un rettangolo
- `clearRect(x, y, width, height)`: cancella un'area rettangolare, rendendola trasparente

Ecco un esempio che mostra l'utilizzo di questi metodi:

```javascript
// Ottieni il contesto 2D
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Disegna un rettangolo pieno
ctx.fillStyle = 'blue';
ctx.fillRect(25, 25, 100, 100);

// Disegna un rettangolo con solo il contorno
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;
ctx.strokeRect(150, 25, 100, 100);

// Cancella una parte del primo rettangolo
ctx.clearRect(45, 45, 60, 60);
```

Questo codice disegna un quadrato blu pieno, un quadrato con solo il contorno rosso, e poi cancella una parte del quadrato blu, creando un "buco" al suo interno.

## Linee e Percorsi

Per disegnare forme più complesse, è necessario utilizzare i percorsi (paths). Un percorso è una sequenza di punti, connessi da segmenti di linea o curve, che può essere riempito o tracciato (solo contorno).

Ecco i passaggi principali per creare un percorso:

1. Chiamare `beginPath()` per iniziare un nuovo percorso
2. Utilizzare i metodi di disegno per definire il percorso
3. Chiamare `closePath()` per chiudere il percorso (opzionale)
4. Chiamare `fill()` e/o `stroke()` per renderizzare il percorso

Esempio di disegno di una linea:

```javascript
ctx.beginPath();
ctx.moveTo(50, 50);  // Punto di partenza
ctx.lineTo(200, 50); // Punto di arrivo
ctx.stroke();        // Disegna la linea
```

Esempio di disegno di un triangolo:

```javascript
ctx.beginPath();
ctx.moveTo(100, 50);  // Primo vertice
ctx.lineTo(50, 150);  // Secondo vertice
ctx.lineTo(150, 150); // Terzo vertice
ctx.closePath();      // Chiude il percorso (collega l'ultimo punto al primo)
ctx.fillStyle = 'green';
ctx.fill();           // Riempie il triangolo
ctx.strokeStyle = 'black';
ctx.stroke();         // Disegna anche il contorno
```

### Proprietà delle linee

È possibile personalizzare l'aspetto delle linee utilizzando diverse proprietà:

- `lineWidth`: spessore della linea in pixel
- `lineCap`: aspetto delle estremità della linea ('butt', 'round', 'square')
- `lineJoin`: aspetto delle giunzioni tra segmenti ('miter', 'round', 'bevel')
- `miterLimit`: limite per le giunzioni a spigolo
- `setLineDash([...])`: imposta uno schema di tratteggio
- `lineDashOffset`: offset per lo schema di tratteggio

Esempio di linee personalizzate:

```javascript
// Linea spessa con estremità arrotondate
ctx.beginPath();
ctx.lineWidth = 10;
ctx.lineCap = 'round';
ctx.moveTo(50, 50);
ctx.lineTo(200, 50);
ctx.stroke();

// Linea tratteggiata
ctx.beginPath();
ctx.setLineDash([15, 5]); // 15px di linea, 5px di spazio
ctx.moveTo(50, 100);
ctx.lineTo(200, 100);
ctx.stroke();

// Ripristina lo stile della linea
ctx.setLineDash([]);
```

## Archi e Cerchi

Per disegnare archi e cerchi, si utilizza il metodo `arc()`:

```javascript
arc(x, y, radius, startAngle, endAngle, anticlockwise)
```

Dove:
- `x, y`: centro dell'arco
- `radius`: raggio dell'arco
- `startAngle, endAngle`: angoli di inizio e fine in radianti
- `anticlockwise`: direzione di disegno (default: false, cioè in senso orario)

Per convertire da gradi a radianti, si può usare la formula: `radianti = gradi * Math.PI / 180`.

Esempio di disegno di un cerchio completo:

```javascript
ctx.beginPath();
ctx.arc(100, 100, 50, 0, 2 * Math.PI); // Cerchio completo
ctx.fillStyle = 'orange';
ctx.fill();
ctx.strokeStyle = 'brown';
ctx.lineWidth = 3;
ctx.stroke();
```

Esempio di disegno di un semicerchio:

```javascript
ctx.beginPath();
ctx.arc(250, 100, 50, 0, Math.PI); // Semicerchio (180 gradi)
ctx.fillStyle = 'yellow';
ctx.fill();
ctx.stroke();
```

## Curve di Bézier

Le curve di Bézier sono utilizzate per creare linee curve più complesse. Canvas supporta due tipi di curve di Bézier:

### Curve di Bézier Quadratiche

Una curva di Bézier quadratica ha un punto di controllo che "attira" la linea verso di sé:

```javascript
quadraticCurveTo(cpx, cpy, x, y)
```

Dove:
- `cpx, cpy`: punto di controllo
- `x, y`: punto finale

Esempio:

```javascript
ctx.beginPath();
ctx.moveTo(50, 150);                // Punto di partenza
ctx.quadraticCurveTo(100, 50, 150, 150); // Punto di controllo e punto finale
ctx.stroke();
```

### Curve di Bézier Cubiche

Una curva di Bézier cubica ha due punti di controllo:

```javascript
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
```

Dove:
- `cp1x, cp1y`: primo punto di controllo
- `cp2x, cp2y`: secondo punto di controllo
- `x, y`: punto finale

Esempio:

```javascript
ctx.beginPath();
ctx.moveTo(50, 200);                          // Punto di partenza
ctx.bezierCurveTo(50, 100, 200, 100, 200, 200); // Punti di controllo e punto finale
ctx.stroke();
```

## Forme Complesse

È possibile combinare i vari metodi di disegno per creare forme più complesse. Ecco un esempio di una stella a cinque punte:

```javascript
function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fillStyle = 'gold';
  ctx.fill();
  ctx.strokeStyle = 'black';
  ctx.stroke();
}

// Utilizzo
drawStar(ctx, 150, 150, 5, 50, 25);
```

## Regole di Riempimento

Quando si riempiono forme complesse, specialmente quelle che si intersecano, è possibile specificare quale regola di riempimento utilizzare:

- `'nonzero'` (default): riempie l'intera area del percorso
- `'evenodd'`: riempie in base alla parità del numero di segmenti che attraversano un punto

Esempio:

```javascript
// Disegna una stella con il metodo evenodd
ctx.beginPath();
// ... codice per disegnare la stella ...
ctx.fill('evenodd');
```

## Conclusione

In questo capitolo abbiamo esplorato i metodi fondamentali per disegnare forme base sul canvas: rettangoli, linee, archi, cerchi e curve di Bézier. Abbiamo anche visto come combinare questi elementi per creare forme più complesse.

Nel prossimo capitolo, esploreremo come applicare colori, gradienti e pattern alle nostre forme per renderle più interessanti e accattivanti.