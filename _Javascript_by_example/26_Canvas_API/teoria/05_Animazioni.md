# Animazioni con Canvas

In questo capitolo esploreremo come creare animazioni utilizzando l'elemento canvas di HTML5, permettendoci di sviluppare contenuti interattivi e dinamici.

## Principi di Base dell'Animazione

L'animazione su canvas si basa su un principio semplice: disegnare, cancellare e ridisegnare ripetutamente il contenuto del canvas con piccole modifiche ad ogni frame. Questo processo crea l'illusione del movimento.

I passaggi fondamentali per creare un'animazione sono:

1. **Cancellare** il canvas (o una parte di esso)
2. **Aggiornare** le proprietà degli oggetti (posizione, dimensione, colore, ecc.)
3. **Ridisegnare** gli oggetti con le nuove proprietà
4. **Ripetere** questi passaggi ad intervalli regolari

## Metodi di Temporizzazione

Per controllare la temporizzazione dell'animazione, JavaScript offre diverse funzioni:

### setTimeout e setInterval

Questi sono i metodi tradizionali per eseguire codice a intervalli regolari:

```javascript
// Esempio con setInterval
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let x = 0;

// Esegue la funzione ogni 10 millisecondi
const intervalId = setInterval(function() {
  // Cancella il canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Aggiorna la posizione
  x += 2;
  if (x > canvas.width) {
    x = 0;
  }
  
  // Ridisegna
  ctx.fillStyle = 'blue';
  ctx.fillRect(x, 50, 50, 50);
}, 10);

// Per fermare l'animazione:
// clearInterval(intervalId);
```

### requestAnimationFrame

Questo è il metodo moderno e preferito per le animazioni, in quanto è ottimizzato per le prestazioni e sincronizzato con il refresh del browser:

```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let x = 0;

function animate() {
  // Cancella il canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Aggiorna la posizione
  x += 2;
  if (x > canvas.width) {
    x = 0;
  }
  
  // Ridisegna
  ctx.fillStyle = 'blue';
  ctx.fillRect(x, 50, 50, 50);
  
  // Richiama animate al prossimo frame
  requestAnimationFrame(animate);
}

// Avvia l'animazione
animate();
```

`requestAnimationFrame` offre diversi vantaggi rispetto a `setInterval`:

- Si sincronizza con il refresh del monitor (tipicamente 60 Hz)
- Si interrompe automaticamente quando la scheda del browser non è attiva
- Ottimizza l'uso della CPU
- Fornisce un timestamp preciso come parametro alla funzione di callback

## Controllo del Frame Rate

A volte potrebbe essere necessario limitare il frame rate dell'animazione. Ecco come farlo con `requestAnimationFrame`:

```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let x = 0;
let lastTime = 0;
const fps = 30; // Frame per secondo desiderati
const interval = 1000 / fps; // Intervallo in millisecondi

function animate(currentTime) {
  // Calcola il tempo trascorso dall'ultimo frame
  if (!lastTime) lastTime = currentTime;
  const deltaTime = currentTime - lastTime;
  
  // Se è trascorso abbastanza tempo, disegna un nuovo frame
  if (deltaTime > interval) {
    // Aggiorna il timestamp dell'ultimo frame
    lastTime = currentTime - (deltaTime % interval);
    
    // Cancella il canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Aggiorna la posizione
    x += 2;
    if (x > canvas.width) {
      x = 0;
    }
    
    // Ridisegna
    ctx.fillStyle = 'blue';
    ctx.fillRect(x, 50, 50, 50);
  }
  
  // Richiama animate al prossimo frame
  requestAnimationFrame(animate);
}

// Avvia l'animazione
requestAnimationFrame(animate);
```

## Animazione di Oggetti

Per animazioni più complesse, è utile definire oggetti con proprietà e metodi per l'aggiornamento e il disegno:

```javascript
class Ball {
  constructor(x, y, radius, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx; // Velocità orizzontale
    this.dy = dy; // Velocità verticale
    this.color = color;
  }
  
  update(canvas) {
    // Aggiorna la posizione
    this.x += this.dx;
    this.y += this.dy;
    
    // Rimbalza sui bordi
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
  }
  
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

// Utilizzo
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Crea un array di palline
const balls = [];
for (let i = 0; i < 20; i++) {
  const radius = Math.random() * 20 + 10;
  const x = Math.random() * (canvas.width - 2 * radius) + radius;
  const y = Math.random() * (canvas.height - 2 * radius) + radius;
  const dx = (Math.random() - 0.5) * 4;
  const dy = (Math.random() - 0.5) * 4;
  const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
  
  balls.push(new Ball(x, y, radius, dx, dy, color));
}

function animate() {
  // Cancella il canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Aggiorna e disegna ogni pallina
  for (const ball of balls) {
    ball.update(canvas);
    ball.draw(ctx);
  }
  
  // Richiama animate al prossimo frame
  requestAnimationFrame(animate);
}

// Avvia l'animazione
animate();
```

## Interattività

Le animazioni diventano più coinvolgenti quando sono interattive. Ecco come aggiungere l'interazione con il mouse:

```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Oggetto per memorizzare la posizione del mouse
const mouse = {
  x: undefined,
  y: undefined
};

// Aggiorna la posizione del mouse quando si muove
canvas.addEventListener('mousemove', function(event) {
  const rect = canvas.getBoundingClientRect();
  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;
});

// Classe Circle con interattività
class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.baseRadius = radius;
    this.maxRadius = radius * 3;
  }
  
  update() {
    // Calcola la distanza dal mouse
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Se il mouse è vicino, aumenta il raggio
    if (distance < 50) {
      this.radius = Math.min(this.radius + 1, this.maxRadius);
    } else {
      // Altrimenti, riduci il raggio fino al valore base
      this.radius = Math.max(this.radius - 1, this.baseRadius);
    }
  }
  
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

// Crea un array di cerchi
const circles = [];
for (let i = 0; i < 100; i++) {
  const radius = Math.random() * 5 + 2;
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const color = `hsl(${Math.random() * 360}, 70%, 50%)`;
  
  circles.push(new Circle(x, y, radius, color));
}

function animate() {
  // Cancella il canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Aggiorna e disegna ogni cerchio
  for (const circle of circles) {
    circle.update();
    circle.draw(ctx);
  }
  
  // Richiama animate al prossimo frame
  requestAnimationFrame(animate);
}

// Avvia l'animazione
animate();
```

## Ottimizzazione delle Prestazioni

Per ottenere animazioni fluide, è importante ottimizzare le prestazioni:

1. **Limita il numero di oggetti**: Troppe forme possono rallentare l'animazione
2. **Usa tecniche di clipping**: Disegna solo ciò che è visibile
3. **Utilizza più canvas**: Uno per gli elementi statici e uno per quelli animati
4. **Evita trasparenze inutili**: Le operazioni con alpha sono costose
5. **Riduci le chiamate al contesto**: Raggruppa operazioni simili

Esempio di utilizzo di più canvas:

```javascript
// Canvas per lo sfondo (statico)
const bgCanvas = document.getElementById('backgroundCanvas');
const bgCtx = bgCanvas.getContext('2d');

// Canvas per gli elementi animati
const fgCanvas = document.getElementById('foregroundCanvas');
const fgCtx = fgCanvas.getContext('2d');

// Disegna lo sfondo una sola volta
function drawBackground() {
  // ... codice per disegnare lo sfondo ...
}

// Anima gli elementi in primo piano
function animate() {
  // Cancella solo il canvas in primo piano
  fgCtx.clearRect(0, 0, fgCanvas.width, fgCanvas.height);
  
  // ... codice per aggiornare e disegnare gli elementi animati ...
  
  requestAnimationFrame(animate);
}

// Inizializza
drawBackground();
animate();
```

## Esempio Completo: Particelle Interattive

Ecco un esempio completo di un sistema di particelle interattive:

```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: undefined,
  y: undefined,
  radius: 150
};

canvas.addEventListener('mousemove', function(event) {
  const rect = canvas.getBoundingClientRect();
  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;
});

canvas.addEventListener('mouseout', function() {
  mouse.x = undefined;
  mouse.y = undefined;
});

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

class Particle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.baseSize = size;
    this.color = color;
    this.baseX = x;
    this.baseY = y;
    this.density = (Math.random() * 30) + 1;
  }
  
  update() {
    if (mouse.x !== undefined && mouse.y !== undefined) {
      // Calcola la distanza dal mouse
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      
      // Calcola la forza di repulsione
      const maxDistance = mouse.radius;
      const force = (maxDistance - distance) / maxDistance;
      const directionX = forceDirectionX * force * this.density;
      const directionY = forceDirectionY * force * this.density;
      
      // Applica la forza se la particella è abbastanza vicina
      if (distance < maxDistance) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        // Ritorna gradualmente alla posizione originale
        if (this.x !== this.baseX) {
          const dx = this.x - this.baseX;
          this.x -= dx / 10;
        }
        if (this.y !== this.baseY) {
          const dy = this.y - this.baseY;
          this.y -= dy / 10;
        }
      }
    } else {
      // Ritorna alla posizione originale quando il mouse esce
      if (this.x !== this.baseX) {
        const dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        const dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

let particles = [];

function init() {
  particles = [];
  const numberOfParticles = (canvas.width * canvas.height) / 9000;
  
  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 5 + 1;
    const x = Math.random() * (canvas.width - size * 2) + size;
    const y = Math.random() * (canvas.height - size * 2) + size;
    const color = `hsl(${Math.random() * 360}, 70%, 50%)`;
    
    particles.push(new Particle(x, y, size, color));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (const particle of particles) {
    particle.update();
    particle.draw();
  }
  
  // Disegna linee tra particelle vicine
  connectParticles();
  
  requestAnimationFrame(animate);
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        // Opacità basata sulla distanza
        const opacity = 1 - (distance / 100);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

init();
animate();
```

## Conclusione

In questo capitolo abbiamo esplorato come creare animazioni con il canvas, utilizzando tecniche come `requestAnimationFrame`, la gestione degli oggetti e l'interattività con l'utente. Abbiamo anche visto come ottimizzare le prestazioni per ottenere animazioni fluide.

Le animazioni canvas sono uno strumento potente per creare contenuti web dinamici e interattivi, dai semplici effetti visivi ai giochi complessi. Con la pratica e la sperimentazione, potrai creare esperienze utente coinvolgenti e accattivanti.

Nel prossimo capitolo, esploreremo come utilizzare il canvas per creare giochi semplici, combinando tutte le tecniche che abbiamo imparato finora.