# Mini progetti Canvas per pratica

Questa collezione di mini progetti offre esercizi pratici per consolidare le conoscenze acquisite sui vari aspetti di Canvas. Ogni progetto è autonomo e si concentra su specifiche tecniche Canvas.

## 1. Orologio dei secondi minimalista

Un orologio che mostra solo il passaggio dei secondi con una animazione elegante.

```html
<canvas id="secondClock" width="300" height="300"></canvas>
<script>
    const canvas = document.getElementById('secondClock');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    function drawClock() {
        // Pulisci il canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Ottieni l'ora attuale
        const now = new Date();
        const seconds = now.getSeconds();
        const millis = now.getMilliseconds();
        
        // Calcola l'angolo per il secondo corrente (aggiunta dei millisecondi per movimento fluido)
        const secondAngle = ((seconds + millis/1000) / 60) * Math.PI * 2;
        
        // Disegna il cerchio esterno
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Disegna i marcatori dei secondi
        for (let i = 0; i < 60; i++) {
            const angle = (i / 60) * Math.PI * 2;
            const x1 = centerX + Math.cos(angle) * (radius - 5);
            const y1 = centerY + Math.sin(angle) * (radius - 5);
            const x2 = centerX + Math.cos(angle) * (radius - (i % 5 === 0 ? 15 : 10));
            const y2 = centerY + Math.sin(angle) * (radius - (i % 5 === 0 ? 15 : 10));
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = i % 5 === 0 ? '#999' : '#ccc';
            ctx.lineWidth = i % 5 === 0 ? 2 : 1;
            ctx.stroke();
        }
        
        // Disegna l'indicatore del secondo
        const secondX = centerX + Math.cos(secondAngle - Math.PI/2) * radius * 0.8;
        const secondY = centerY + Math.sin(secondAngle - Math.PI/2) * radius * 0.8;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(secondX, secondY);
        ctx.strokeStyle = '#F44336';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Disegna il cerchio centrale
        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#F44336';
        ctx.fill();
        
        // Continua l'animazione
        requestAnimationFrame(drawClock);
    }
    
    // Avvia l'animazione
    drawClock();
</script>
```

**Concetti applicati:** Animazione con `requestAnimationFrame`, disegno di archi e linee, trasformazioni matematiche.

---

## 2. Generatore di pattern geometrici

Crea pattern geometrici personalizzabili in tempo reale.

```html
<div>
    <canvas id="patternCanvas" width="400" height="400"></canvas>
    <div>
        <label>Numero forme: <input type="range" id="shapeCount" min="4" max="20" value="8"></label>
        <label>Rotazione: <input type="range" id="rotation" min="0" max="360" value="0"></label>
        <label>Dimensione: <input type="range" id="size" min="10" max="100" value="40"></label>
        <button id="randomize">Randomizza colori</button>
    </div>
</div>
<script>
    const canvas = document.getElementById('patternCanvas');
    const ctx = canvas.getContext('2d');
    const shapeCountInput = document.getElementById('shapeCount');
    const rotationInput = document.getElementById('rotation');
    const sizeInput = document.getElementById('size');
    const randomizeBtn = document.getElementById('randomize');

    // Colori del pattern
    let colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', 
                 '#536DFE', '#448AFF', '#40C4FF', '#18FFFF'];

    // Funzione per generare colori casuali
    function generateRandomColors() {
        colors = [];
        for (let i = 0; i < 8; i++) {
            const hue = Math.floor(Math.random() * 360);
            colors.push(`hsl(${hue}, 80%, 60%)`);
        }
        drawPattern();
    }

    // Funzione per disegnare il pattern
    function drawPattern() {
        // Pulisci il canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Ottieni valori correnti
        const count = parseInt(shapeCountInput.value);
        const rotation = parseInt(rotationInput.value) * Math.PI / 180;
        const size = parseInt(sizeInput.value);
        
        // Calcola il centro del canvas
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Disegna le forme
        for (let i = 0; i < count; i++) {
            // Calcola angolo e posizione
            const angle = (i / count) * Math.PI * 2 + rotation;
            const distance = Math.min(canvas.width, canvas.height) / 3;
            
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            // Disegna la forma
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            
            // Scegli colore
            ctx.fillStyle = colors[i % colors.length];
            
            // Disegna una forma
            ctx.beginPath();
            ctx.moveTo(0, -size/2);
            for (let j = 0; j < 5; j++) {
                const starAngle = (j / 5) * Math.PI * 2;
                const radius = j % 2 === 0 ? size/2 : size/4;
                ctx.lineTo(
                    Math.cos(starAngle) * radius,
                    Math.sin(starAngle) * radius
                );
            }
            ctx.closePath();
            ctx.fill();
            
            ctx.restore();
        }
        
        // Disegna un cerchio centrale
        ctx.beginPath();
        ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = '#333';
        ctx.fill();
    }
    
    // Aggiungi event listeners
    shapeCountInput.addEventListener('input', drawPattern);
    rotationInput.addEventListener('input', drawPattern);
    sizeInput.addEventListener('input', drawPattern);
    randomizeBtn.addEventListener('click', generateRandomColors);
    
    // Disegna il pattern iniziale
    drawPattern();
</script>
```

**Concetti applicati:** Trasformazioni (translazione, rotazione), forme personalizzate, gestione di input utente in tempo reale.

---

## 3. Particelle interattive

Sistema di particelle che reagisce al movimento del mouse.

```html
<canvas id="particleCanvas" width="600" height="400"></canvas>
<script>
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    // Imposta il canvas a schermo intero
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Variabili per il mouse
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    
    // Classe Particella
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
            this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        
        update() {
            // Calcola la distanza dalla posizione del mouse
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Forza repulsiva
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            
            // Distanza massima di effetto
            const maxDistance = 100;
            let force = (maxDistance - distance) / maxDistance;
            
            // Evita valori negativi
            if (force < 0) force = 0;
            
            // Movimento quando il mouse è vicino
            const directionX = (forceDirectionX * force * this.density) * -1;
            const directionY = (forceDirectionY * force * this.density) * -1;
            
            if (distance < maxDistance) {
                this.x += directionX;
                this.y += directionY;
            } else {
                // Movimento di ritorno alla posizione originale
                if (this.x !== this.baseX) {
                    const dx = this.x - this.baseX;
                    this.x -= dx/10;
                }
                if (this.y !== this.baseY) {
                    const dy = this.y - this.baseY;
                    this.y -= dy/10;
                }
            }
        }
    }
    
    // Array di particelle
    const particleArray = [];
    
    // Inizializza le particelle
    function init() {
        particleArray.length = 0;
        for (let i = 0; i < 150; i++) {
            particleArray.push(new Particle());
        }
    }
    
    // Anima le particelle
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
            particleArray[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    // Eventi del mouse
    canvas.addEventListener('mousemove', function(e) {
        mouseX = e.x;
        mouseY = e.y;
    });
    
    // Gestisce il ridimensionamento della finestra
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
    
    // Simula movimento del mouse quando è fermo
    canvas.addEventListener('mouseleave', function() {
        mouseX = undefined;
        mouseY = undefined;
    });
    
    // Inizializza e avvia l'animazione
    init();
    animate();
</script>
```

**Concetti applicati:** Programmazione orientata agli oggetti, fisica di base, interazione con il mouse, animazione con particelle.

---

## 4. Visualizzatore di onde audio

Crea una visualizzazione grafica di onde audio che si animano in modo armonioso.

```html
<canvas id="waveCanvas" width="800" height="300"></canvas>
<div>
    <button id="playPause">Play/Pause</button>
    <label>Ampiezza: <input type="range" id="amplitude" min="5" max="100" value="50"></label>
    <label>Frequenza: <input type="range" id="frequency" min="1" max="10" value="2"></label>
    <label>Velocità: <input type="range" id="speed" min="1" max="10" value="3"></label>
</div>
<script>
    const canvas = document.getElementById('waveCanvas');
    const ctx = canvas.getContext('2d');
    const playPauseBtn = document.getElementById('playPause');
    const amplitudeInput = document.getElementById('amplitude');
    const frequencyInput = document.getElementById('frequency');
    const speedInput = document.getElementById('speed');
    
    let animating = true;
    let time = 0;
    
    // Inizializza gradiente
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#4facfe');
    gradient.addColorStop(1, '#00f2fe');
    
    function draw() {
        if (!animating) return;
        
        // Pulisci il canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Ottieni parametri
        const amplitude = parseInt(amplitudeInput.value);
        const frequency = parseInt(frequencyInput.value) / 5;
        const speed = parseInt(speedInput.value);
        
        // Incrementa il tempo
        time += 0.02 * speed;
        
        // Inizia il percorso dell'onda
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        
        // Disegna l'onda principale
        for (let x = 0; x < canvas.width; x++) {
            // Calcola varie onde e sovrapponile
            const y = Math.sin(x * frequency * 0.01 + time) * amplitude + 
                     Math.sin(x * frequency * 0.02 + time * 0.8) * (amplitude * 0.5) +
                     canvas.height / 2;
            
            ctx.lineTo(x, y);
        }
        
        // Completa il percorso per riempimento
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        // Riempi con gradiente
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Disegna la linea dell'onda sopra il riempimento
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
            const y = Math.sin(x * frequency * 0.01 + time) * amplitude + 
                     Math.sin(x * frequency * 0.02 + time * 0.8) * (amplitude * 0.5) +
                     canvas.height / 2;
            
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Continua l'animazione
        requestAnimationFrame(draw);
    }
    
    // Gestisci pulsante Play/Pause
    playPauseBtn.addEventListener('click', () => {
        animating = !animating;
        if (animating) {
            draw();
        }
    });
    
    // Avvia l'animazione
    draw();
</script>
```

**Concetti applicati:** Animazione di forme matematiche, gradiente, eventi input multipli, funzioni matematiche sin/cos.

---

## 5. Effetto pioggia

Simula gocce di pioggia che cadono con effetti realistici.

```html
<canvas id="rainCanvas" width="800" height="600"></canvas>
<script>
    const canvas = document.getElementById('rainCanvas');
    const ctx = canvas.getContext('2d');
    
    // Dimensioni a schermo intero
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Array di gocce di pioggia
    const raindrops = [];
    
    // Classe Goccia di Pioggia
    class Raindrop {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -100; // Parte sopra lo schermo
            this.length = Math.random() * 20 + 10;
            this.speed = Math.random() * 10 + 5;
            this.thickness = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.3 + 0.1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.length);
            ctx.strokeStyle = `rgba(200, 230, 255, ${this.opacity})`;
            ctx.lineWidth = this.thickness;
            ctx.stroke();
        }
        
        update() {
            this.y += this.speed;
            
            // Se la goccia è uscita dallo schermo, resettala
            if (this.y > canvas.height) {
                this.createSplash();
                this.reset();
            }
        }
        
        createSplash() {
            // Aggiungi uno splash al pavimento
            splashes.push(new Splash(this.x, canvas.height, this.opacity));
        }
    }
    
    // Classe Splash
    class Splash {
        constructor(x, y, opacity) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.maxRadius = Math.random() * 5 + 2;
            this.speed = Math.random() * 0.5 + 0.2;
            this.opacity = opacity * 2; // Rendi lo splash più visibile
            this.decreasing = false;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(200, 230, 255, ${this.opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        update() {
            if (!this.decreasing) {
                this.radius += this.speed;
                if (this.radius >= this.maxRadius) {
                    this.decreasing = true;
                }
            } else {
                this.radius -= this.speed * 0.5;
                this.opacity -= 0.01;
            }
            
            return this.opacity > 0 && this.radius > 0;
        }
    }
    
    // Array degli splash
    const splashes = [];
    
    // Crea le gocce di pioggia
    function createRain() {
        for (let i = 0; i < 200; i++) {
            raindrops.push(new Raindrop());
        }
    }
    
    // Funzione di animazione
    function animate() {
        // Pulisci canvas con un leggero effetto di scia
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Aggiorna e disegna ogni goccia
        for (let i = 0; i < raindrops.length; i++) {
            raindrops[i].update();
            raindrops[i].draw();
        }
        
        // Aggiorna e disegna gli splash
        for (let i = splashes.length - 1; i >= 0; i--) {
            const isAlive = splashes[i].update();
            if (isAlive) {
                splashes[i].draw();
            } else {
                splashes.splice(i, 1);
            }
        }
        
        // Continua l'animazione
        requestAnimationFrame(animate);
    }
    
    // Gestisci ridimensionamento della finestra
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Crea la pioggia e avvia l'animazione
    createRain();
    animate();
</script>
```

**Concetti applicati:** Gestione di molti oggetti, effetti particellari, effetto di scia, interazioni tra oggetti.

---

## 6. Disegno con simmetria

Crea un'applicazione di disegno che genera pattern simmetrici.

```html
<canvas id="symmetryCanvas" width="800" height="600"></canvas>
<div>
    <label>Assi di simmetria: <input type="range" id="axesCount" min="1" max="12" value="6"></label>
    <label>Dimensione pennello: <input type="range" id="brushSize" min="1" max="20" value="5"></label>
    <button id="clear">Cancella tutto</button>
</div>
<script>
    const canvas = document.getElementById('symmetryCanvas');
    const ctx = canvas.getContext('2d');
    const axesCountInput = document.getElementById('axesCount');
    const brushSizeInput = document.getElementById('brushSize');
    const clearBtn = document.getElementById('clear');
    
    // Imposta uno sfondo nero
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Variabili di stato
    let isDrawing = false;
    let lastX = canvas.width / 2;
    let lastY = canvas.height / 2;
    
    // Funzione per disegnare con simmetria
    function drawWithSymmetry(x, y) {
        const axesCount = parseInt(axesCountInput.value);
        const brushSize = parseInt(brushSizeInput.value);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Calcola l'offset dal centro
        const offsetX = x - centerX;
        const offsetY = y - centerY;
        
        // Calcola la distanza e l'angolo dal centro
        const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
        const angle = Math.atan2(offsetY, offsetX);
        
        // Disegna per ogni asse di simmetria
        for (let i = 0; i < axesCount; i++) {
            const rotationAngle = (i / axesCount) * Math.PI * 2;
            const newAngle = angle + rotationAngle;
            
            // Calcola nuove coordinate
            const newX = centerX + distance * Math.cos(newAngle);
            const newY = centerY + distance * Math.sin(newAngle);
            
            // Scegli un colore basato sull'angolo
            const hue = (newAngle / (Math.PI * 2)) * 360;
            ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
            
            // Disegna un punto
            ctx.beginPath();
            ctx.arc(newX, newY, brushSize, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Funzione per disegnare una linea con simmetria
    function drawLine(x1, y1, x2, y2) {
        // Calcola punti intermedi per una linea fluida
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const steps = Math.max(distance / 2, 1);
        
        for (let i = 0; i <= steps; i++) {
            const x = x1 + (x2 - x1) * (i / steps);
            const y = y1 + (y2 - y1) * (i / steps);
            drawWithSymmetry(x, y);
        }
    }
    
    // Mouse event handlers
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        lastX = e.clientX - rect.left;
        lastY = e.clientY - rect.top;
        drawWithSymmetry(lastX, lastY);
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        drawLine(lastX, lastY, x, y);
        
        lastX = x;
        lastY = y;
    });
    
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseleave', () => isDrawing = false);
    
    // Clear button handler
    clearBtn.addEventListener('click', () => {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
    
    // Touch support
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchend', () => {
        const mouseEvent = new MouseEvent('mouseup');
        canvas.dispatchEvent(mouseEvent);
    });
</script>
```

**Concetti applicati:** Coordinate polari, trasformazioni matematiche, interazioni mouse/touch, calcolo colori HSL.

Questi mini-progetti offrono un'opportunità pratica per esercitarsi con le diverse capacità di Canvas, dalla gestione degli eventi all'animazione, dalle trasformazioni all'interattività. Ogni progetto può essere esteso e personalizzato per approfondire ulteriormente i concetti appresi.
