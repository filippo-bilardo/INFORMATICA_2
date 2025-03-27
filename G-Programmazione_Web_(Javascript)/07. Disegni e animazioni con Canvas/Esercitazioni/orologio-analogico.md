# Progetto: Orologio Analogico con Canvas

Questo progetto guida ti mostrerà come creare un orologio analogico funzionante utilizzando HTML Canvas e JavaScript.

## Obiettivi di apprendimento
- Utilizzare le trasformazioni di Canvas
- Implementare animazioni con `requestAnimationFrame`
- Gestire eventi temporali in JavaScript
- Organizzare il codice in componenti logici

## Requisiti
- Conoscenza di HTML e CSS di base
- Familiarità con JavaScript e DOM
- Comprensione delle trasformazioni di Canvas

## Struttura del progetto

### HTML
```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Orologio Analogico</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f0f0;
        }
        canvas {
            background-color: white;
            border-radius: 50%;
            box-shadow: 0 0 15px rgba(0,0,0,0.2);
        }
    </style>
</head>
<body>
    <canvas id="clockCanvas" width="400" height="400"></canvas>
    <script src="script.js"></script>
</body>
</html>
```

### JavaScript (script.js)
```javascript
// Ottieni il riferimento al canvas
const canvas = document.getElementById('clockCanvas');
const ctx = canvas.getContext('2d');
const radius = canvas.width / 2 * 0.9;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Funzione principale
function drawClock() {
    // Pulisci il canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Disegna il quadrante
    drawFace();
    
    // Disegna i numeri
    drawNumbers();
    
    // Ottieni l'ora corrente
    const now = new Date();
    const hour = now.getHours() % 12;
    const minute = now.getMinutes();
    const second = now.getSeconds();
    
    // Disegna le lancette
    drawHand(hour * 30 + (minute / 2), radius * 0.5, radius * 0.07, 'black');
    drawHand(minute * 6, radius * 0.8, radius * 0.05, 'blue');
    drawHand(second * 6, radius * 0.9, radius * 0.02, 'red');
    
    // Disegna il punto centrale
    drawCenter();
    
    // Continua l'animazione
    requestAnimationFrame(drawClock);
}

// Disegna il quadrante dell'orologio
function drawFace() {
    // Bordo esterno
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = radius * 0.03;
    ctx.stroke();
    
    // Cerchio interno
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

// Disegna i numeri sul quadrante
function drawNumbers() {
    ctx.font = radius * 0.15 + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#333';
    
    for(let num = 1; num <= 12; num++) {
        const angle = num * Math.PI / 6;
        const x = centerX + radius * 0.75 * Math.sin(angle);
        const y = centerY - radius * 0.75 * Math.cos(angle);
        ctx.fillText(num.toString(), x, y);
    }
    
    // Disegna i trattini per i minuti
    for(let i = 0; i < 60; i++) {
        const angle = i * Math.PI / 30;
        const length = (i % 5 === 0) ? 0.15 : 0.1;
        const thickness = (i % 5 === 0) ? 0.02 : 0.01;
        
        const x1 = centerX + radius * (1 - length) * Math.sin(angle);
        const y1 = centerY - radius * (1 - length) * Math.cos(angle);
        const x2 = centerX + radius * 0.95 * Math.sin(angle);
        const y2 = centerY - radius * 0.95 * Math.cos(angle);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = radius * thickness;
        ctx.stroke();
    }
}

// Disegna una lancetta
function drawHand(angle, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    
    // Converti l'angolo da gradi a radianti
    const radians = (angle - 90) * Math.PI / 180;
    
    // Disegna la lancetta
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
        centerX + length * Math.cos(radians),
        centerY + length * Math.sin(radians)
    );
    ctx.stroke();
}

// Disegna il punto centrale
function drawCenter() {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.03, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
}

// Avvia l'orologio
drawClock();
```

## Funzionalità avanzate da implementare

1. **Aggiungere il ticking sonoro**
   ```javascript
   const tickSound = new Audio('tick.mp3');
   
   function playTickSound() {
       tickSound.currentTime = 0;
       tickSound.play();
   }
   
   // Chiamare playTickSound() ogni secondo
   ```

2. **Aggiungere un allarme**
   Creare una funzione che confronti l'ora attuale con l'ora impostata per l'allarme.

3. **Modalità notturna**
   Cambiare i colori dell'orologio in base all'ora del giorno.

4. **Aggiungere opzioni di personalizzazione**
   Permettere all'utente di cambiare colori, dimensioni e stile dell'orologio.

## Conclusione

Questo progetto dimostra come utilizzare Canvas per creare un'applicazione interattiva che integra diverse tecniche: trasformazioni, animazioni e gestione del tempo. Puoi estenderlo ulteriormente aggiungendo funzionalità come fusi orari diversi, cronometro o timer.
