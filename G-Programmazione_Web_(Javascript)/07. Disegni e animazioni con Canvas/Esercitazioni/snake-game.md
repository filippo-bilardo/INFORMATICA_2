# Progetto: Snake Game con Canvas

Questo progetto ti guiderà nella creazione del classico gioco Snake utilizzando Canvas e JavaScript.

## Obiettivi di apprendimento
- Implementare un sistema di movimento basato su griglia
- Gestire input da tastiera per controllare un personaggio
- Creare un sistema di collisioni semplice
- Implementare la logica di un gioco completo

## Requisiti
- Conoscenza di JavaScript di base
- Comprensione degli eventi tastiera
- Familiarità con animazioni Canvas

## Struttura del progetto

### HTML
```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game</title>
    <style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 20px;
        }
        
        h1 {
            color: #333;
        }
        
        canvas {
            background-color: #111;
            border: 5px solid #333;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
        
        .controls {
            margin-top: 20px;
            display: flex;
            gap: 10px;
        }
        
        button {
            padding: 10px 20px;
            background-color: #4caf50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        
        button:hover {
            background-color: #45a049;
        }
        
        .score {
            margin-top: 10px;
            font-size: 18px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Snake Game</h1>
    <div class="score">Punteggio: <span id="scoreValue">0</span></div>
    <canvas id="gameCanvas" width="400" height="400"></canvas>
    <div class="controls">
        <button id="startButton">Inizia Gioco</button>
        <button id="resetButton">Reset</button>
    </div>
    <script src="snake.js"></script>
</body>
</html>
```

### JavaScript (snake.js)
```javascript
// Ottieni riferimenti agli elementi del DOM
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('scoreValue');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

// Costanti del gioco
const GRID_SIZE = 20;
const GRID_COUNT = canvas.width / GRID_SIZE;
const GAME_SPEED = 150; // millisecondi tra i frame

// Variabili di stato del gioco
let snake = [];
let food = {};
let direction = 'right';
let nextDirection = 'right';
let gameRunning = false;
let gameLoop;
let score = 0;

// Inizializza lo stato del gioco
function initGame() {
    // Posizione iniziale del serpente (3 blocchi al centro)
    const centerPos = Math.floor(GRID_COUNT / 2);
    snake = [
        { x: centerPos, y: centerPos },
        { x: centerPos - 1, y: centerPos },
        { x: centerPos - 2, y: centerPos }
    ];
    
    // Direzione iniziale
    direction = 'right';
    nextDirection = 'right';
    
    // Punteggio iniziale
    score = 0;
    scoreElement.textContent = score;
    
    // Genera il primo pezzo di cibo
    generateFood();
}

// Genera cibo in una posizione casuale
function generateFood() {
    // Continua a generare posizioni finché non ne troviamo una non occupata dal serpente
    let foodPosition;
    
    do {
        foodPosition = {
            x: Math.floor(Math.random() * GRID_COUNT),
            y: Math.floor(Math.random() * GRID_COUNT)
        };
    } while (isPositionOccupied(foodPosition));
    
    food = foodPosition;
}

// Verifica se una posizione è occupata dal serpente
function isPositionOccupied(position) {
    return snake.some(segment => segment.x === position.x && segment.y === position.y);
}

// Aggiorna lo stato del gioco
function updateGame() {
    // Aggiorna la direzione
    direction = nextDirection;
    
    // Calcola la nuova testa del serpente
    const head = { ...snake[0] };
    
    switch (direction) {
        case 'up':
            head.y -= 1;
            break;
        case 'down':
            head.y += 1;
            break;
        case 'left':
            head.x -= 1;
            break;
        case 'right':
            head.x += 1;
            break;
    }
    
    // Controlla collisione con i bordi
    if (head.x < 0 || head.y < 0 || head.x >= GRID_COUNT || head.y >= GRID_COUNT) {
        gameOver();
        return;
    }
    
    // Controlla collisione con se stesso
    if (isPositionOccupied(head)) {
        gameOver();
        return;
    }
    
    // Aggiungi la nuova testa
    snake.unshift(head);
    
    // Controlla se abbiamo mangiato il cibo
    if (head.x === food.x && head.y === food.y) {
        // Aumenta il punteggio
        score += 10;
        scoreElement.textContent = score;
        
        // Genera nuovo cibo
        generateFood();
        
        // Non rimuoviamo l'ultimo segmento per far crescere il serpente
    } else {
        // Rimuovi l'ultimo segmento se non abbiamo mangiato
        snake.pop();
    }
}

// Disegna lo stato del gioco
function drawGame() {
    // Pulisci il canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Disegna il serpente
    ctx.fillStyle = '#4CAF50'; // Verde
    snake.forEach((segment, index) => {
        // Testa leggermente diversa
        if (index === 0) {
            ctx.fillStyle = '#45a049'; // Verde scuro per la testa
        } else {
            ctx.fillStyle = '#4CAF50'; // Verde normale
        }
        
        ctx.fillRect(
            segment.x * GRID_SIZE,
            segment.y * GRID_SIZE,
            GRID_SIZE - 1, // -1 per creare una griglia visibile
            GRID_SIZE - 1
        );
    });
    
    // Disegna il cibo
    ctx.fillStyle = '#FF5252'; // Rosso
    ctx.beginPath();
    ctx.arc(
        food.x * GRID_SIZE + GRID_SIZE / 2,
        food.y * GRID_SIZE + GRID_SIZE / 2,
        GRID_SIZE / 2 - 1, // leggermente più piccolo per la griglia
        0,
        Math.PI * 2
    );
    ctx.fill();
}

// Gestisci il game over
function gameOver() {
    clearInterval(gameLoop);
    gameRunning = false;
    startButton.textContent = 'Riprova';
    alert(`Game Over! Punteggio: ${score}`);
}

// Gestisci l'avvio del gioco
function startGame() {
    if (gameRunning) return;
    
    initGame();
    gameRunning = true;
    startButton.textContent = 'In corso...';
    
    // Avvia il loop di gioco
    gameLoop = setInterval(() => {
        updateGame();
        drawGame();
    }, GAME_SPEED);
}

// Gestisci il reset del gioco
function resetGame() {
    clearInterval(gameLoop);
    gameRunning = false;
    startButton.textContent = 'Inizia Gioco';
    
    initGame();
    drawGame();
}

// Gestisci l'input da tastiera
function handleKeyPress(event) {
    if (!gameRunning) return;
    
    // Previeni il cambio in direzione opposta (il serpente non può girarsi su se stesso)
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') nextDirection = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') nextDirection = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') nextDirection = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') nextDirection = 'right';
            break;
    }
}

// Event Listeners
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
document.addEventListener('keydown', handleKeyPress);

// Inizializzazione
initGame();
drawGame();
```

## Come si gioca
1. Premi il pulsante "Inizia Gioco" per avviare la partita
2. Usa le frecce direzionali per controllare il serpente
3. Mangia il cibo (cerchi rossi) per crescere e guadagnare punti
4. Evita di colpire i bordi o te stesso

## Concetti chiave implementati

### Rappresentazione su griglia
Il gioco utilizza una rappresentazione a griglia per semplificare la gestione delle posizioni e delle collisioni.

### Gestione dello stato del gioco
Lo stato del gioco è mantenuto attraverso diverse variabili e strutture dati:
- `snake`: array di oggetti che rappresenta ogni segmento del serpente
- `food`: oggetto con coordinate per il cibo
- `direction`: direzione corrente
- `nextDirection`: prossima direzione (per evitare rotazioni di 180°)

### Loop di gioco
Il gioco usa `setInterval` per creare un ciclo di aggiornamento consistente:
1. Aggiorna la posizione del serpente
2. Controlla le collisioni
3. Aggiorna il punteggio se necessario
4. Ridisegna il canvas

### Rilevamento delle collisioni
Il gioco implementa due tipi di collisioni:
1. Collisioni con i bordi del canvas
2. Collisioni con il corpo stesso del serpente

## Estensioni possibili

1. **Sistema di livelli**  
   Aggiungi livelli con velocità crescente man mano che il punteggio aumenta

2. **Power-ups**  
   Inserisci power-up che appaiono casualmente:
   - Velocità temporanea
   - Immunità temporanea
   - Punteggio doppio

3. **Ostacoli**  
   Aggiungi muri o altri ostacoli da evitare

4. **Modalità multigiocatore**  
   Implementa un sistema multigiocatore locale (due giocatori con tasti diversi)

5. **Supporto per touch screen**  
   Aggiungi controlli touch per dispositivi mobili

6. **Salvataggio del punteggio**  
   Implementa un sistema di salvataggio dei punteggi migliori usando localStorage

## Conclusione

Questo progetto dimostra l'uso del Canvas per creare un gioco completo con meccaniche semplici ma coinvolgenti. Attraverso la gestione delle animazioni, degli eventi tastiera e delle collisioni, hai implementato un classico gioco arcade che può essere ulteriormente esteso con nuove funzionalità.
