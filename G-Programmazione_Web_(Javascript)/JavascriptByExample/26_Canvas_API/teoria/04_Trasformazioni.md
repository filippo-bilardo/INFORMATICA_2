# Trasformazioni del Canvas

In questo capitolo esploreremo le trasformazioni del canvas, che permettono di ruotare, scalare e traslare gli elementi disegnati, offrendo maggiore flessibilità e controllo sulle nostre creazioni grafiche.

## Introduzione alle Trasformazioni

Le trasformazioni modificano il sistema di coordinate del canvas, influenzando il modo in cui gli elementi vengono disegnati. Il contesto 2D del canvas offre diversi metodi per applicare trasformazioni:

- `translate(x, y)`: sposta l'origine del canvas
- `rotate(angle)`: ruota il canvas attorno all'origine
- `scale(x, y)`: scala il canvas orizzontalmente e verticalmente
- `transform(a, b, c, d, e, f)`: applica una trasformazione personalizzata
- `setTransform(a, b, c, d, e, f)`: reimposta la matrice di trasformazione
- `resetTransform()`: ripristina la matrice di trasformazione all'identità

## Traslazione

La traslazione sposta l'origine del canvas (il punto 0,0) in una nuova posizione. Questo è utile quando si vogliono disegnare più elementi con la stessa posizione relativa:

```javascript
// Ottieni il contesto 2D
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Disegna un rettangolo nella posizione originale
ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 50, 50);

// Trasla l'origine a (100, 100)
ctx.translate(100, 100);

// Disegna un rettangolo nella nuova posizione
// Nota: le coordinate sono relative alla nuova origine
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 50, 50);
```

In questo esempio, il secondo rettangolo viene disegnato alle coordinate (10, 10) rispetto alla nuova origine, che corrisponde alle coordinate (110, 110) nel sistema di coordinate originale.

## Rotazione

La rotazione ruota il canvas attorno all'origine corrente. L'angolo è specificato in radianti (2π radianti = 360 gradi):

```javascript
// Trasla l'origine al centro del canvas
ctx.translate(canvas.width / 2, canvas.height / 2);

// Ruota di 45 gradi (π/4 radianti)
ctx.rotate(Math.PI / 4);

// Disegna un rettangolo centrato nell'origine
ctx.fillStyle = 'green';
ctx.fillRect(-25, -25, 50, 50);
```

In questo esempio, il rettangolo viene disegnato centrato nell'origine (che è stata traslata al centro del canvas) e ruotato di 45 gradi.

## Scala

La scala modifica le dimensioni degli elementi disegnati. È possibile specificare fattori di scala diversi per gli assi x e y:

```javascript
// Trasla l'origine al centro del canvas
ctx.translate(canvas.width / 2, canvas.height / 2);

// Scala di un fattore 2 sull'asse x e 0.5 sull'asse y
ctx.scale(2, 0.5);

// Disegna un rettangolo centrato nell'origine
ctx.fillStyle = 'purple';
ctx.fillRect(-25, -25, 50, 50);
```

In questo esempio, il rettangolo viene allungato orizzontalmente (fattore 2) e compresso verticalmente (fattore 0.5).

## Salvataggio e Ripristino dello Stato

Quando si applicano trasformazioni, è spesso utile salvare lo stato corrente del contesto prima di applicare le trasformazioni e ripristinarlo successivamente. Questo si può fare con i metodi `save()` e `restore()`:

```javascript
// Salva lo stato corrente
ctx.save();

// Applica trasformazioni
ctx.translate(100, 100);
ctx.rotate(Math.PI / 4);

// Disegna con le trasformazioni applicate
ctx.fillStyle = 'orange';
ctx.fillRect(-25, -25, 50, 50);

// Ripristina lo stato salvato (annulla le trasformazioni)
ctx.restore();

// Disegna senza trasformazioni
ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 50, 50);
```

I metodi `save()` e `restore()` salvano e ripristinano non solo le trasformazioni, ma anche altre proprietà del contesto come colori, spessori delle linee, ecc.

## Trasformazioni Multiple

È possibile combinare più trasformazioni per ottenere effetti complessi. Le trasformazioni vengono applicate nell'ordine in cui sono specificate:

```javascript
// Disegna un quadrato che ruota attorno a un punto
function drawRotatingSquare(ctx, centerX, centerY, size, angle) {
  ctx.save();
  
  // Trasla l'origine al punto di rotazione
  ctx.translate(centerX, centerY);
  
  // Applica la rotazione
  ctx.rotate(angle);
  
  // Disegna il quadrato centrato nell'origine
  ctx.fillStyle = 'teal';
  ctx.fillRect(-size/2, -size/2, size, size);
  
  ctx.restore();
}

// Utilizzo
drawRotatingSquare(ctx, 150, 150, 50, Math.PI / 6); // Ruotato di 30 gradi
```

## Trasformazioni Personalizzate

Il metodo `transform(a, b, c, d, e, f)` permette di applicare una trasformazione personalizzata utilizzando una matrice di trasformazione 3x3. I parametri corrispondono ai valori della matrice:

```
[ a c e ]
[ b d f ]
[ 0 0 1 ]
```

Dove:
- `a` e `d` controllano la scala (rispettivamente orizzontale e verticale)
- `b` e `c` controllano l'inclinazione (shear)
- `e` e `f` controllano la traslazione (rispettivamente orizzontale e verticale)

Esempio di inclinazione (shear):

```javascript
// Applica una trasformazione di inclinazione orizzontale
ctx.transform(1, 0, 0.5, 1, 0, 0);

// Disegna un rettangolo con la trasformazione applicata
ctx.fillStyle = 'magenta';
ctx.fillRect(50, 50, 100, 100);
```

Il metodo `setTransform(a, b, c, d, e, f)` funziona in modo simile, ma invece di applicare la trasformazione alla matrice corrente, la sostituisce completamente.

## Esempio Pratico: Orologio

Ecco un esempio che combina diverse trasformazioni per creare un semplice orologio analogico:

```javascript
function drawClock(ctx, radius) {
  const now = new Date();
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  
  // Disegna il quadrante
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = radius * 0.05;
  ctx.stroke();
  ctx.restore();
  
  // Disegna i numeri
  ctx.save();
  ctx.font = radius * 0.15 + 'px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 1; i <= 12; i++) {
    const angle = i * Math.PI / 6;
    const x = radius * 0.85 * Math.sin(angle);
    const y = -radius * 0.85 * Math.cos(angle);
    ctx.fillText(i.toString(), x, y);
  }
  ctx.restore();
  
  // Disegna le lancette
  // Lancetta delle ore
  ctx.save();
  const hourAngle = (hours * Math.PI / 6) + (minutes * Math.PI / (6 * 60));
  ctx.rotate(hourAngle);
  ctx.lineWidth = radius * 0.07;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -radius * 0.5);
  ctx.stroke();
  ctx.restore();
  
  // Lancetta dei minuti
  ctx.save();
  const minuteAngle = minutes * Math.PI / 30;
  ctx.rotate(minuteAngle);
  ctx.lineWidth = radius * 0.05;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -radius * 0.7);
  ctx.stroke();
  ctx.restore();
  
  // Lancetta dei secondi
  ctx.save();
  const secondAngle = seconds * Math.PI / 30;
  ctx.rotate(secondAngle);
  ctx.strokeStyle = 'red';
  ctx.lineWidth = radius * 0.02;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -radius * 0.9);
  ctx.stroke();
  ctx.restore();
}

// Utilizzo
ctx.save();
ctx.translate(canvas.width / 2, canvas.height / 2);
const radius = Math.min(canvas.width, canvas.height) / 2 * 0.9;
drawClock(ctx, radius);
ctx.restore();
```

## Conclusione

In questo capitolo abbiamo esplorato le trasformazioni del canvas, che permettono di manipolare il sistema di coordinate per creare effetti complessi. Abbiamo visto come traslare, ruotare e scalare gli elementi, come combinare più trasformazioni e come salvare e ripristinare lo stato del contesto.

Nel prossimo capitolo, esploreremo le animazioni con canvas, che ci permetteranno di creare contenuti interattivi e dinamici.