# Progetto: Orologio Analogico con Canvas

Questo progetto guidato ti mostrerà come creare un elegante orologio analogico utilizzando l'elemento Canvas di HTML5. L'orologio mostrerà ore, minuti e secondi in tempo reale, con una grafica personalizzabile.

## Obiettivi di apprendimento
- Implementare un'animazione basata sul tempo reale
- Utilizzare trasformazioni canvas (rotazione, traslazione)
- Applicare stili diversi per creare elementi visivi attraenti
- Creare codice modulare e facilmente personalizzabile

## Requisiti
- Conoscenza di base di HTML, CSS e JavaScript
- Comprensione delle funzioni di disegno di Canvas
- Familiarità con il concetto di loop di animazione

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
            margin: 0;
            font-family: Arial, sans-serif;
        }
        
        .clock-container {
            position: relative;
            width: 400px;
        }
        
        canvas {
            display: block;
            margin: 0 auto;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            border-radius: 50%;
        }
        
        .controls {
            margin-top: 20px;
            text-align: center;
        }
        
        .controls button {
            margin: 0 5px;
            padding: 8px 16px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        
        .controls button:hover {
            background-color: #45a049;
        }
        
        h1 {
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="clock-container">
        <h1>Orologio Analogico</h1>
        <canvas id="clockCanvas" width="300" height="300"></canvas>
        <div class="controls">
            <button id="classicTheme">Tema Classico</button>
            <button id="modernTheme">Tema Moderno</button>
            <button id="darkTheme">Tema Scuro</button>
        </div>
    </div>
    <script src="orologio.js"></script>
</body>
</html>
```

### JavaScript (orologio.js)
```javascript
// Recuperiamo il canvas e il contesto
const canvas = document.getElementById('clockCanvas');
const ctx = canvas.getContext('2d');

// Definiamo il centro e il raggio dell'orologio
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = Math.min(centerX, centerY) - 10;

// Temi dell'orologio
const themes = {
    classic: {
        face: '#f5f5f5',
        border: '#333',
        numbers: '#000',
        hourHand: '#333',
        minuteHand: '#555',
        secondHand: '#f00',
        centerDot: '#333',
        hourMarks: '#333',
        minuteMarks: '#999'
    },
    modern: {
        face: '#fff',
        border: '#2196F3',
        numbers: '#2196F3',
        hourHand: '#2196F3',
        minuteHand: '#64B5F6',
        secondHand: '#FF5252',
        centerDot: '#2196F3',
        hourMarks: '#2196F3',
        minuteMarks: '#BBDEFB'
    },
    dark: {
        face: '#263238',
        border: '#37474F',
        numbers: '#B0BEC5',
        hourHand: '#ECEFF1',
        minuteHand: '#CFD8DC',
        secondHand: '#FF8A80',
        centerDot: '#ECEFF1',
        hourMarks: '#CFD8DC',
        minuteMarks: '#546E7A'
    }
};

// Tema corrente
let currentTheme = themes.classic;

// Funzione per disegnare il quadrante
function drawClockFace() {
    // Disegna il cerchio esterno
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = currentTheme.face;
    ctx.fill();
    ctx.strokeStyle = currentTheme.border;
    ctx.lineWidth = 8;
    ctx.stroke();

    // Disegna i trattini delle ore
    ctx.lineWidth = 3;
    ctx.strokeStyle = currentTheme.hourMarks;
    
    for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI / 6);
        const innerRadius = radius - 15;
        
        ctx.beginPath();
        ctx.moveTo(
            centerX + innerRadius * Math.sin(angle),
            centerY - innerRadius * Math.cos(angle)
        );
        ctx.lineTo(
            centerX + radius * Math.sin(angle),
            centerY - radius * Math.cos(angle)
        );
        ctx.stroke();
    }
    
    // Disegna i trattini dei minuti
    ctx.lineWidth = 1;
    ctx.strokeStyle = currentTheme.minuteMarks;
    
    for (let i = 0; i < 60; i++) {
        // Salta i trattini delle ore
        if (i % 5 === 0) continue;
        
        const angle = (i * Math.PI / 30);
        const innerRadius = radius - 5;
        
        ctx.beginPath();
        ctx.moveTo(
            centerX + innerRadius * Math.sin(angle),
            centerY - innerRadius * Math.cos(angle)
        );
        ctx.lineTo(
            centerX + radius * Math.sin(angle),
            centerY - radius * Math.cos(angle)
        );
        ctx.stroke();
    }
    
    // Disegna i numeri delle ore
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = currentTheme.numbers;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    for (let i = 1; i <= 12; i++) {
        const angle = (i * Math.PI / 6);
        const numberRadius = radius - 30;
        const x = centerX + numberRadius * Math.sin(angle);
        const y = centerY - numberRadius * Math.cos(angle);
        
        ctx.fillText(i.toString(), x, y);
    }
}

// Funzione per disegnare le lancette
function drawHands() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    
    // Calcola gli angoli delle lancette
    // Si aggiunge una frazione basata sui valori successivi per un movimento più fluido
    const hourAngle = (hours + minutes / 60) * Math.PI / 6;
    const minuteAngle = (minutes + seconds / 60) * Math.PI / 30;
    const secondAngle = (seconds + milliseconds / 1000) * Math.PI / 30;
    
    // Disegna la lancetta delle ore
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(hourAngle);
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(0, -radius * 0.5);
    ctx.lineTo(10, 0);
    ctx.fillStyle = currentTheme.hourHand;
    ctx.fill();
    ctx.restore();
    
    // Disegna la lancetta dei minuti
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(minuteAngle);
    ctx.beginPath();
    ctx.moveTo(-6, 0);
    ctx.lineTo(0, -radius * 0.7);
    ctx.lineTo(6, 0);
    ctx.fillStyle = currentTheme.minuteHand;
    ctx.fill();
    ctx.restore();
    
    // Disegna la lancetta dei secondi
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(secondAngle);
    ctx.beginPath();
    ctx.moveTo(-2, 20); // Contrappeso
    ctx.lineTo(0, -radius * 0.85);
    ctx.lineTo(2, 20);
    ctx.fillStyle = currentTheme.secondHand;
    ctx.fill();
    ctx.restore();
    
    // Disegna il punto centrale
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
    ctx.fillStyle = currentTheme.centerDot;
    ctx.fill();
    
    // Disegna un piccolo cerchio bianco al centro
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI);
    ctx.fillStyle = currentTheme.face;
    ctx.fill();
}

// Funzione principale di disegno
function drawClock() {
    // Pulisce il canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Disegna il quadrante e le lancette
    drawClockFace();
    drawHands();
    
    // Continua l'animazione
    requestAnimationFrame(drawClock);
}

// Gestione dei pulsanti per i temi
document.getElementById('classicTheme').addEventListener('click', () => {
    currentTheme = themes.classic;
});

document.getElementById('modernTheme').addEventListener('click', () => {
    currentTheme = themes.modern;
});

document.getElementById('darkTheme').addEventListener('click', () => {
    currentTheme = themes.dark;
});

// Avvia l'animazione
drawClock();
```

## Spiegazione passo-passo

### 1. Configurazione del Canvas

Il primo passo è configurare il nostro elemento Canvas e definire le variabili di base:

```javascript
const canvas = document.getElementById('clockCanvas');
const ctx = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = Math.min(centerX, centerY) - 10;
```

Queste variabili ci permettono di:
- Accedere al contesto di disegno 2D
- Definire il centro dell'orologio
- Calcolare il raggio massimo dell'orologio con un piccolo margine

### 2. Sistema di temi

Abbiamo implementato un sistema di temi che ci permette di cambiare facilmente l'aspetto dell'orologio:

```javascript
const themes = {
    classic: { /* colori per il tema classico */ },
    modern: { /* colori per il tema moderno */ },
    dark: { /* colori per il tema scuro */ }
};
```

Ogni tema definisce i colori per tutti gli elementi dell'orologio, rendendo semplice creare nuovi stili.

### 3. Disegno del quadrante

La funzione `drawClockFace()` disegna:
- Il cerchio esterno dell'orologio
- I trattini delle ore (più spessi)
- I trattini dei minuti (più sottili)
- I numeri delle ore

La parte più interessante è il calcolo della posizione dei trattini e dei numeri usando le coordinate polari:

```javascript
for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI / 6); // Ogni ora è a 30° (π/6 radianti)
    // Calcola le coordinate usando sin e cos
    const x = centerX + radius * Math.sin(angle);
    const y = centerY - radius * Math.cos(angle);
    // ... disegno ...
}
```

### 4. Disegno delle lancette

La funzione `drawHands()` calcola la posizione delle lancette basandosi sull'ora corrente:

```javascript
const now = new Date();
const hours = now.getHours() % 12;
const minutes = now.getMinutes();
const seconds = now.getSeconds();
const milliseconds = now.getMilliseconds();

// Calcolo degli angoli
const hourAngle = (hours + minutes / 60) * Math.PI / 6;
const minuteAngle = (minutes + seconds / 60) * Math.PI / 30;
const secondAngle = (seconds + milliseconds / 1000) * Math.PI / 30;
```

Per ogni lancetta, utilizziamo le trasformazioni canvas per ruotarla dell'angolo corretto:
1. Salviamo lo stato del contesto
2. Trasferiamo l'origine al centro dell'orologio
3. Ruotiamo il contesto dell'angolo calcolato
4. Disegniamo la lancetta
5. Ripristiniamo lo stato del contesto

### 5. Animazione

Utilizziamo `requestAnimationFrame` per creare un'animazione fluida:

```javascript
function drawClock() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawClockFace();
    drawHands();
    requestAnimationFrame(drawClock);
}
```

Questo metodo sincronizza il refresh del nostro orologio con il refresh del display, garantendo un'animazione efficiente.

## Estensioni possibili

Ecco alcune idee per estendere questo progetto:

1. **Aggiungere una modalità a 24 ore**
   ```javascript
   // Nel calcolo dell'angolo della lancetta delle ore:
   const hourAngle = mode24h 
     ? (hours + minutes/60) * Math.PI / 12   // 24 ore  
     : (hours % 12 + minutes/60) * Math.PI / 6;  // 12 ore
   ```

2. **Aggiungere la visualizzazione digitale**
   ```javascript
   function drawDigitalTime() {
       const now = new Date();
       const timeString = now.toLocaleTimeString();
       
       ctx.font = '16px Arial';
       ctx.fillStyle = currentTheme.numbers;
       ctx.textAlign = 'center';
       ctx.fillText(timeString, centerX, centerY + 50);
   }
   ```

3. **Personalizzazione ulteriore**
   - Aggiungere un selettore di colore per ogni elemento
   - Permettere il ridimensionamento dell'orologio
   - Aggiungere effetti come ombre e riflessi

4. **Funzionalità allarme**
   - Implementare un sistema di allarme visivo
   - Aggiungere un contatore alla rovescia

## Concetti chiave imparati

Attraverso questo progetto hai imparato:

1. **Trasformazioni Canvas**: utilizzo di `translate()` e `rotate()` per posizionare le lancette.
2. **Pattern di animazione**: utilizzo di `requestAnimationFrame` per creare un'animazione fluida.
3. **Trigonometria applicata**: utilizzo di seno e coseno per calcolare posizioni su un cerchio.
4. **Gestione del tempo in JavaScript**: utilizzo dell'oggetto `Date` per ottenere l'ora corrente.
5. **Tecniche di styling**: implementazione di un sistema di temi per personalizzare l'aspetto.

## Conclusione

Questo progetto dimostra come Canvas possa essere utilizzato per creare interfacce grafiche interattive e dinamiche. L'orologio analogico combina diversi concetti fondamentali di programmazione grafica e può essere facilmente esteso con funzionalità aggiuntive.
