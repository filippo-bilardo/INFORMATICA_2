# Progetto: Gioco Breakout con Canvas

In questo progetto realizzeremo il classico gioco Breakout (o Arkanoid) utilizzando l'elemento Canvas di HTML5 e JavaScript. Questo progetto combina molteplici concetti visti nei capitoli precedenti: disegno di forme base, gestione del movimento, collisioni, eventi utente e animazioni.

## Obiettivi di apprendimento
- Implementare una struttura base per un gioco Canvas
- Gestire il movimento degli oggetti e le collisioni
- Implementare controlli tramite tastiera e mouse
- Creare una struttura modulare e riutilizzabile per il codice di gioco

## Requisiti
- Conoscenza di JavaScript di base
- Comprensione dell'API Canvas
- Familiarità con i concetti di animazione e game loop

## Struttura del progetto

### HTML
```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Breakout Game</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            height: 100vh;
            background-color: #f0f0f0;
            margin: 0;
            font-family: Arial, sans-serif;
        }
        
        canvas {
            background: #333;
            border: 2px solid #000;
            display: block;
            margin: 0 auto;
        }
        
        .controls {
            margin-top: 20px;
            display: flex;
            gap: 20px;
        }
        
        button {
            padding: 10px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        
        button:hover {
            background-color: #45a049;
        }
        
        #gameInfo {
            margin-top: 10px;
            font-size: 18px;
        }
        
        .game-over {
            display: none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>Breakout Game</h1>
    <canvas id="gameCanvas" width="800" height="600"></canvas>
    <div class="controls">
        <button id="startButton">Inizia Gioco</button>
        <button id="resetButton">Reset</button>
    </div>
    <div id="gameInfo">Vite: <span id="lives">3</span> | Punteggio: <span id="score">0</span></div>
    <div id="gameOver" class="game-over">
        <h2>Game Over!</h2>
        <p>Il tuo punteggio finale: <span id="finalScore">0</span></p>
        <button id="restartButton">Gioca di nuovo</button>
    </div>
    <script src="breakout.js"></script>
</body>
</html>
```

### JavaScript (breakout.js)
```javascript
// Ottieni il riferimento al canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Riferimenti agli elementi UI
const livesElement = document.getElementById("lives");
const scoreElement = document.getElementById("score");
const finalScoreElement = document.getElementById("finalScore");
const gameOverElement = document.getElementById("gameOver");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const restartButton = document.getElementById("restartButton");

// Costanti del gioco
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 15;
const PADDLE_SPEED = 400; // Pixel al secondo
const BALL_RADIUS = 10;
const BALL_SPEED = 250;
const BRICK_ROWS = 5;
const BRICK_COLUMNS = 10;
const BRICK_WIDTH = 75;
const BRICK_HEIGHT = 20;
const BRICK_PADDING = 10;
const BRICK_OFFSET_TOP = 60;
const BRICK_OFFSET_LEFT = 35;

// Stato del gioco
const game = {
    running: false,
    score: 0,
    lives: 3,
    gameOver: false
};

// Stato degli input
const input = {
    leftPressed: false,
    rightPressed: false,
    mousePosition: null
};

// Oggetti di gioco
const ball = {
    x: canvas.width / 2,
    y: canvas.height - PADDLE_HEIGHT - BALL_RADIUS - 10,
    dx: BALL_SPEED,
    dy: -BALL_SPEED,
    radius: BALL_RADIUS,
    speed: BALL_SPEED,
    stuckToPaddle: true
};

const paddle = {
    x: (canvas.width - PADDLE_WIDTH) / 2,
    y: canvas.height - PADDLE_HEIGHT - 10,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    speed: PADDLE_SPEED
};

// Matrice di mattoncini
let bricks = [];

// Inizializzazione dei mattoncini
function initBricks() {
    bricks = [];
    
    const colorRows = [
        "#FF0000", // Red
        "#FF7F00", // Orange
        "#FFFF00", // Yellow
        "#00FF00", // Green
        "#0000FF"  // Blue
    ];
    
    for (let c = 0; c < BRICK_COLUMNS; c++) {
        bricks[c] = [];
        for (let r = 0; r < BRICK_ROWS; r++) {
            const brickX = c * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
            const brickY = r * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;
            
            bricks[c][r] = {
                x: brickX,
                y: brickY,
                width: BRICK_WIDTH,
                height: BRICK_HEIGHT,
                color: colorRows[r],
                visible: true
            };
        }
    }
}

// Funzione per disegnare la palla
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

// Funzione per disegnare la racchetta
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = "#00BFFF";
    ctx.fill();
    ctx.closePath();
}

// Funzione per disegnare i mattoncini
function drawBricks() {
    for (let c = 0; c < BRICK_COLUMNS; c++) {
        for (let r = 0; r < BRICK_ROWS; r++) {
            const brick = bricks[c][r];
            
            if (brick.visible) {
                ctx.beginPath();
                ctx.rect(brick.x, brick.y, brick.width, brick.height);
                ctx.fillStyle = brick.color;
                ctx.fill();
                ctx.strokeStyle = "#000";
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

// Funzione per disegnare il punteggio
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "left";
    ctx.fillText(`Punteggio: ${game.score}`, 10, 25);
}

// Funzione per disegnare le vite rimanenti
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "right";
    ctx.fillText(`Vite: ${game.lives}`, canvas.width - 10, 25);
}

// Funzione per disegnare tutto
function draw() {
    // Pulisci il canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Disegna tutti gli elementi
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
}

// Funzione per rilevare le collisioni con i mattoncini
function checkBrickCollision() {
    for (let c = 0; c < BRICK_COLUMNS; c++) {
        for (let r = 0; r < BRICK_ROWS; r++) {
            const brick = bricks[c][r];
            
            if (brick.visible) {
                // Controllo collisione
                if (
                    ball.x + ball.radius > brick.x &&
                    ball.x - ball.radius < brick.x + brick.width &&
                    ball.y + ball.radius > brick.y &&
                    ball.y - ball.radius < brick.y + brick.height
                ) {
                    ball.dy = -ball.dy; // Cambia direzione verticale
                    brick.visible = false; // "Distruggi" il mattoncino
                    game.score += 10; // Aumenta il punteggio
                    scoreElement.textContent = game.score; // Aggiorna UI
                    
                    // Controlla vittoria
                    checkWinCondition();
                }
            }
        }
    }
}

// Funzione per controllare se tutti i mattoncini sono stati distrutti
function checkWinCondition() {
    let remainingBricks = 0;
    
    // Conta i mattoncini rimasti
    for (let c = 0; c < BRICK_COLUMNS; c++) {
        for (let r = 0; r < BRICK_ROWS; r++) {
            if (bricks[c][r].visible) {
                remainingBricks++;
            }
        }
    }
    
    // Se non ci sono più mattoncini, hai vinto
    if (remainingBricks === 0) {
        // Mostra vittoria
        showMessage("Hai vinto!", true);
        stopGame();
    }
}

// Funzione per aggiornare lo stato di gioco
function update(deltaTime) {
    if (!game.running || game.gameOver) return;
    
    // Muovi la racchetta con la tastiera
    if (input.leftPressed && paddle.x > 0) {
        paddle.x -= paddle.speed * deltaTime;
    } else if (input.rightPressed && paddle.x + paddle.width < canvas.width) {
        paddle.x += paddle.speed * deltaTime;
    }
    
    // Muovi la racchetta con il mouse se disponibile
    if (input.mousePosition !== null) {
        const mouseX = input.mousePosition;
        // Limita la posizione della racchetta all'interno del canvas
        paddle.x = Math.max(0, Math.min(mouseX - paddle.width / 2, canvas.width - paddle.width));
    }
    
    // Se la palla è attaccata alla racchetta, muovila con essa
    if (ball.stuckToPaddle) {
        ball.x = paddle.x + paddle.width / 2;
        return;
    }
    
    // Muovi la palla
    ball.x += ball.dx * deltaTime;
    ball.y += ball.dy * deltaTime;
    
    // Collisione con i bordi laterali
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    
    // Collisione con il bordo superiore
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    
    // Collisione con il fondo (perdi una vita)
    if (ball.y + ball.radius > canvas.height) {
        game.lives--;
        livesElement.textContent = game.lives;
        
        if (game.lives <= 0) {
            // Game over
            gameOver();
        } else {
            // Resetta la palla
            resetBall();
        }
    }
    
    // Collisione con la racchetta
    if (
        ball.y + ball.radius > paddle.y &&
        ball.y - ball.radius < paddle.y + paddle.height &&
        ball.x + ball.radius > paddle.x &&
        ball.x - ball.radius < paddle.x + paddle.width
    ) {
        // Calcola il punto di impatto sulla racchetta (da -1 a 1)
        const impactPoint = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
        
        // Calcola il nuovo angolo (massimo ±60° = ±π/3)
        const maxAngle = Math.PI / 3;
        const newAngle = impactPoint * maxAngle;
        
        // Imposta la nuova velocità basata sull'angolo
        const speed = ball.speed;
        ball.dx = speed * Math.sin(newAngle);
        ball.dy = -speed * Math.cos(newAngle);
        
        // Assicurati che la palla si muova verso l'alto
        if (ball.dy > 0) {
            ball.dy = -ball.dy;
        }
        
        // Aumenta leggermente la velocità ad ogni colpo
        ball.speed += 5;
    }
    
    // Controlla collisioni con i mattoncini
    checkBrickCollision();
}

// Funzione per resettare la palla
function resetBall() {
    ball.x = paddle.x + paddle.width / 2;
    ball.y = canvas.height - PADDLE_HEIGHT - BALL_RADIUS - 10;
    ball.dx = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = -BALL_SPEED;
    ball.speed = BALL_SPEED;
    ball.stuckToPaddle = true;
}

// Funzione per mostrare un messaggio
function showMessage(message, isWin = false) {
    gameOverElement.style.display = "block";
    gameOverElement.querySelector("h2").textContent = isWin ? "Vittoria!" : "Game Over!";
    finalScoreElement.textContent = game.score;
}

// Funzione per il game over
function gameOver() {
    game.gameOver = true;
    game.running = false;
    showMessage("Game Over!");
}

// Funzione per fermare il gioco
function stopGame() {
    game.running = false;
    startButton.textContent = "Inizia Gioco";
}

// Funzione principale del gioco (loop)
function gameLoop(timestamp) {
    if (!game.animationFrameId) {
        game.animationFrameId = timestamp;
    }
    
    // Calcola il delta time (in secondi)
    const deltaTime = (timestamp - game.animationFrameId) / 1000;
    game.animationFrameId = timestamp;
    
    // Aggiorna lo stato del gioco
    update(deltaTime);
    
    // Disegna
    draw();
    
    // Continua il loop se il gioco è in esecuzione
    if (game.running) {
        requestAnimationFrame(gameLoop);
    } else {
        game.animationFrameId = null;
    }
}

// Event listeners per la tastiera
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a") {
        input.leftPressed = true;
    } else if (e.key === "ArrowRight" || e.key === "d") {
        input.rightPressed = true;
    } else if (e.key === " " && game.running) { // Spazio
        ball.stuckToPaddle = false;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a") {
        input.leftPressed = false;
    } else if (e.key === "ArrowRight" || e.key === "d") {
        input.rightPressed = false;
    }
});

// Event listener per il mouse
canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    input.mousePosition = e.clientX - rect.left;
});

canvas.addEventListener("click", () => {
    if (game.running && ball.stuckToPaddle) {
        ball.stuckToPaddle = false;
    }
});

// Event listeners per i pulsanti
startButton.addEventListener("click", () => {
    if (!game.running) {
        game.running = true;
        game.gameOver = false;
        startButton.textContent = "Pausa";
        requestAnimationFrame(gameLoop);
    } else {
        stopGame();
    }
});

resetButton.addEventListener("click", () => {
    // Resetta lo stato del gioco
    game.score = 0;
    game.lives = 3;
    game.gameOver = false;
    game.running = false;
    
    // Aggiorna l'UI
    scoreElement.textContent = game.score;
    livesElement.textContent = game.lives;
    gameOverElement.style.display = "none";
    startButton.textContent = "Inizia Gioco";
    
    // Resetta gli oggetti di gioco
    resetBall();
    paddle.x = (canvas.width - PADDLE_WIDTH) / 2;
    initBricks();
    
    // Disegna iniziale
    draw();
});

restartButton.addEventListener("click", () => {
    gameOverElement.style.display = "none";
    resetButton.click(); // Riutilizza la funzionalità di reset
    startButton.click(); // Avvia automaticamente il gioco
});

// Inizializzazione
initBricks();
draw();
```

## Spiegazione del codice

### Struttura principale del gioco

Il gioco Breakout è strutturato con i seguenti componenti principali:

1. **Canvas e contesto grafico**: Utilizziamo `getContext("2d")` per ottenere il contesto di disegno 2D del canvas.

2. **Oggetti di gioco**: Abbiamo definito oggetti per:
   - La palla (`ball`)
   - La racchetta (`paddle`)
   - I mattoncini (`bricks`)
   - Lo stato del gioco (`game`)
   - Gli input dell'utente (`input`)

3. **Funzioni principali**:
   - `draw()`: Disegna tutti gli elementi grafici
   - `update(deltaTime)`: Aggiorna la posizione degli elementi e gestisce le collisioni
   - `gameLoop(timestamp)`: Implementa il loop principale di gioco
   - Varie funzioni helper per gestire eventi specifici (collisioni, reset, game over)

### Sistema di movimento

Il movimento nel gioco è gestito in modo indipendente dal frame rate grazie all'uso di `deltaTime`:

```javascript
// Calcola il delta time (in secondi)
const deltaTime = (timestamp - game.animationFrameId) / 1000;

// Movimento basato sul tempo
paddle.x -= paddle.speed * deltaTime;
```

Questo approccio garantisce che la velocità del gioco sia consistente indipendentemente dalla frequenza di aggiornamento del dispositivo.

### Sistema di collisioni

Il gioco implementa due tipi principali di collisioni:

1. **Collisioni con i bordi**: La palla rimbalza quando colpisce i bordi laterali o superiore del canvas.

2. **Collisioni con la racchetta**: La direzione della palla cambia in base al punto di impatto sulla racchetta.

3. **Collisioni con i mattoncini**: Quando la palla colpisce un mattoncino, questo viene "distrutto" (impostando `visible: false`) e il punteggio aumenta.

### Controlli utente

Abbiamo implementato controlli multipli:

1. **Tastiera**: Frecce sinistra/destra o tasti A/D per muovere la racchetta
2. **Mouse**: La racchetta segue la posizione orizzontale del mouse
3. **Touch**: Lo stesso evento del mouse viene usato per i dispositivi touch (implicitamente)
4. **Pulsanti UI**: Per iniziare/mettere in pausa e resettare il gioco

### Feedback all'utente

Il gioco fornisce feedback attraverso:

1. **UI aggiornata**: Mostra punteggio e vite rimanenti
2. **Schermata di fine gioco**: Appare quando il giocatore vince o perde
3. **Elementi visivi**: I mattoncini scompaiono quando colpiti

## Estensioni possibili

Con questa base, puoi estendere il gioco in diversi modi:

### 1. Power-up

Aggiungi oggetti speciali che cadono quando distruggi alcuni mattoncini:

```javascript
// Nel codice di collisione dei mattoncini
if (Math.random() < 0.1) { // 10% di probabilità
    powerups.push({
        x: brick.x + brick.width / 2,
        y: brick.y + brick.height,
        width: 20,
        height: 20,
        type: 'expand', // o 'extraLife', 'multiball', ecc.
        speed: 100
    });
}

// Nella funzione update
powerups.forEach((powerup, index) => {
    powerup.y += powerup.speed * deltaTime;
    
    // Collisione con la racchetta
    if (
        powerup.y + powerup.height > paddle.y &&
        powerup.y < paddle.y + paddle.height &&
        powerup.x + powerup.width > paddle.x &&
        powerup.x < paddle.x + paddle.width
    ) {
        // Applica effetto powerup
        if (powerup.type === 'expand') {
            paddle.width *= 1.5; // Aumenta la larghezza della racchetta
            
            // Rimuovi dopo 10 secondi
            setTimeout(() => {
                paddle.width /= 1.5;
            }, 10000);
        }
        
        powerups.splice(index, 1);
    }
    
    // Rimuovi se fuori schermo
    if (powerup.y > canvas.height) {
        powerups.splice(index, 1);
    }
});
```

### 2. Livelli multipli

Aggiungi una progressione di livelli:

```javascript
function nextLevel() {
    game.level++;
    ball.speed += 20; // Aumenta la velocità
    initBricks(); // Inizializza nuovi mattoncini
    resetBall();
    
    // Mostra messaggio di livello
    const levelMessage = document.createElement('div');
    levelMessage.textContent = `Livello ${game.level}`;
    // ... styling e animazione del messaggio
    
    document.body.appendChild(levelMessage);
    setTimeout(() => document.body.removeChild(levelMessage), 2000);
}

// Chiama nextLevel() quando checkWinCondition() rileva che tutti i mattoncini sono distrutti
```

### 3. Effetti sonori

Aggiungi feedback audio:

```javascript
const sounds = {
    hit: new Audio('hit.wav'),
    brick: new Audio('brick.wav'),
    win: new Audio('win.wav'),
    lose: new Audio('lose.wav')
};

// Riproduci i suoni nei momenti appropriati
function playSound(sound) {
    sounds[sound].currentTime = 0;
    sounds[sound].play();
}
```

## Conclusione

Questo progetto dimostra i concetti fondamentali della programmazione di giochi 2D con Canvas:

- Rendering grafico
- Gestione del tempo e degli stati
- Interazione utente
- Rilevamento delle collisioni
- Logica di gioco

Utilizzando questi principi, puoi creare una varietà di giochi e applicazioni interattive. Sperimenta aggiungendo nuove funzionalità e personalizzando il gioco secondo il tuo stile.
