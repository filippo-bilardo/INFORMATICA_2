# Progetto: Gioco Breakout con Canvas

Questo progetto guida ti mostrerà come creare il classico gioco Breakout utilizzando HTML Canvas e JavaScript.

## Obiettivi di apprendimento
- Creare animazioni fluide con Canvas
- Gestire il movimento e le collisioni di oggetti
- Implementare controlli utente tramite tastiera e mouse/touch
- Creare una logica di gioco completa

## Requisiti
- Conoscenza di HTML e CSS di base
- Familiarità con JavaScript e gestione degli eventi
- Comprensione dei principi di animazione di Canvas

## Struttura del progetto

### HTML
```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gioco Breakout</title>
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
        canvas {
            background-color: #222;
            border: 2px solid #333;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
        .game-container {
            text-align: center;
        }
        .controls {
            margin-top: 20px;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="game-container">
        <canvas id="gameCanvas" width="800" height="600"></canvas>
        <div class="controls">
            <p>Controlli: Usa le frecce ← → o il mouse per muovere la racchetta</p>
            <p>Premi SPAZIO per iniziare</p>
        </div>
    </div>
    <script src="game.js"></script>
</body>
</html>
```

### JavaScript (game.js)
```javascript
// Riferimenti al canvas e contesto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Costanti del gioco
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;
const PADDLE_MARGIN_BOTTOM = 30;
const BALL_RADIUS = 10;
const BRICK_ROWS = 5;
const BRICK_COLS = 9;
const BRICK_WIDTH = 80;
const BRICK_HEIGHT = 20;
const BRICK_PADDING = 10;
const BRICK_OFFSET_TOP = 50;
const BRICK_OFFSET_LEFT = 35;

// Variabili del gioco
let rightPressed = false;
let leftPressed = false;
let gameStarted = false;
let score = 0;
let lives = 3;
let level = 1;

// Oggetti del gioco
const paddle = {
    x: canvas.width / 2 - PADDLE_WIDTH / 2,
    y: canvas.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    dx: 8
};

const ball = {
    x: canvas.width / 2,
    y: paddle.y - BALL_RADIUS,
    radius: BALL_RADIUS,
    speed: 5,
    dx: 5,
    dy: -5
};

// Creazione dei mattoncini
const bricks = [];
for (let c = 0; c < BRICK_COLS; c++) {
    bricks[c] = [];
    for (let r = 0; r < BRICK_ROWS; r++) {
        const brickX = c * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
        const brickY = r * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;
        // Assegna un colore in base alla riga
        const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF'];
        bricks[c][r] = {
            x: brickX,
            y: brickY,
            width: BRICK_WIDTH,
            height: BRICK_HEIGHT,
            status: 1,
            color: colors[r]
        };
    }
}

// Event Listeners
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.addEventListener('mousemove', mouseMoveHandler);
document.addEventListener('touchmove', touchMoveHandler, { passive: false });

// Gestione eventi tastiera
function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    } else if (e.key === ' ' && !gameStarted) {
        gameStarted = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

// Gestione movimento mouse
function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddle.x = relativeX - paddle.width / 2;
        // Limita la racchetta ai bordi del canvas
        if (paddle.x < 0) {
            paddle.x = 0;
        } else if (paddle.x + paddle.width > canvas.width) {
            paddle.x = canvas.width - paddle.width;
        }
    }
}

// Gestione touch per dispositivi mobili
function touchMoveHandler(e) {
    e.preventDefault(); // Previeni lo scorrimento della pagina
    const touch = e.touches[0];
    const relativeX = touch.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddle.x = relativeX - paddle.width / 2;
        // Limita la racchetta ai bordi del canvas
        if (paddle.x < 0) {
            paddle.x = 0;
        } else if (paddle.x + paddle.width > canvas.width) {
            paddle.x = canvas.width - paddle.width;
        }
    }
}

// Disegna la racchetta
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.strokeStyle = '#003366';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

// Disegna la palla
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.strokeStyle = '#003366';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

// Disegna i mattoncini
function drawBricks() {
    for (let c = 0; c < BRICK_COLS; c++) {
        for (let r = 0; r < BRICK_ROWS; r++) {
            const brick = bricks[c][r];
            if (brick.status === 1) {
                ctx.beginPath();
                ctx.rect(brick.x, brick.y, brick.width, brick.height);
                ctx.fillStyle = brick.color;
                ctx.fill();
                ctx.strokeStyle = '#333';
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

// Disegna il punteggio
function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`Punteggio: ${score}`, 10, 30);
}

// Disegna le vite rimanenti
function drawLives() {
    ctx.font = '20px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`Vite: ${lives}`, canvas.width - 100, 30);
}

// Disegna il livello attuale
function drawLevel() {
    ctx.font = '20px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`Livello: ${level}`, canvas.width / 2 - 40, 30);
}

// Rilevamento collisioni con i mattoncini
function collisionDetection() {
    for (let c = 0; c < BRICK_COLS; c++) {
        for (let r = 0; r < BRICK_ROWS; r++) {
            const brick = bricks[c][r];
            if (brick.status === 1) {
                if (ball.x > brick.x && 
                    ball.x < brick.x + brick.width &&
                    ball.y > brick.y && 
                    ball.y < brick.y + brick.height) {
                    ball.dy = -ball.dy;
                    brick.status = 0;
                    score += 10;
                    
                    // Controllo se tutti i mattoncini sono stati colpiti
                    if (score === BRICK_ROWS * BRICK_COLS * 10 * level) {
                        // Passaggio al livello successivo
                        level++;
                        ball.speed += 1;
                        resetGame();
                        alert(`Congratulazioni! Livello ${level}`);
                        return;
                    }
                }
            }
        }
    }
}

// Reset del gioco per nuovo livello o vita persa
function resetGame() {
    // Resetta posizione palla
    ball.x = canvas.width / 2;
    ball.y = paddle.y - ball.radius;
    ball.dx = ball.speed * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = -ball.speed;
    
    // Resetta posizione racchetta
    paddle.x = canvas.width / 2 - paddle.width / 2;
    
    // Resetta i mattoncini per nuovo livello
    if (level > 1 && score === BRICK_ROWS * BRICK_COLS * 10 * (level - 1)) {
        for (let c = 0; c < BRICK_COLS; c++) {
            for (let r = 0; r < BRICK_ROWS; r++) {
                bricks[c][r].status = 1;
            }
        }
    }
    
    gameStarted = false;
}

// Loop principale del gioco
function draw() {
    // Pulisci il canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Disegna tutti gli elementi
    drawBricks();
    drawPaddle();
    drawBall();
    drawScore();
    drawLives();
    drawLevel();
    
    // Rilevamento collisioni con i mattoncini
    collisionDetection();
    
    // Movimento della palla solo se il gioco è iniziato
    if (gameStarted) {
        // Collisione con i bordi orizzontali
        if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
            ball.dx = -ball.dx;
        }
        
        // Collisione con il bordo superiore
        if (ball.y + ball.dy < ball.radius) {
            ball.dy = -ball.dy;
        } 
        // Collisione con la racchetta
        else if (ball.y + ball.dy > paddle.y - ball.radius && 
                 ball.x > paddle.x && 
                 ball.x < paddle.x + paddle.width) {
            // Calcola l'angolo di rimbalzo in base alla posizione di impatto sulla racchetta
            const hitPoint = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
            const angle = hitPoint * Math.PI / 3; // Max ±60 gradi
            
            ball.dx = ball.speed * Math.sin(angle);
            ball.dy = -ball.speed * Math.cos(angle);
        }
        // La palla cade sotto il canvas
        else if (ball.y + ball.dy > canvas.height - ball.radius) {
            lives--;
            if (lives === 0) {
                alert('Game Over');
                document.location.reload();
            } else {
                resetGame();
            }
        }
        
        // Movimento della palla
        ball.x += ball.dx;
        ball.y += ball.dy;
    } else {
        // Se il gioco non è iniziato, la palla segue la racchetta
        ball.x = paddle.x + paddle.width / 2;
    }
    
    // Movimento della racchetta
    if (rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += paddle.dx;
    } else if (leftPressed && paddle.x > 0) {
        paddle.x -= paddle.dx;
    }
    
    requestAnimationFrame(draw);
}

// Avvia il gioco
draw();
```

## Funzionalità avanzate da implementare

1. **Aggiungere effetti sonori**
   - Suono per la collisione con i mattoncini
   - Suono per la collisione con la racchetta
   - Musica di sottofondo

2. **Aggiungere power-up**
   - Racchetta più larga
   - Palla più lenta
   - Vita extra
   - Palla che attraversa i mattoncini

3. **Implementare un sistema di salvataggio dei punteggi migliori**
   Utilizzare il localStorage per salvare i punteggi più alti.

4. **Aggiungere differenti tipi di mattoncini**
   - Mattoncini che richiedono più colpi per essere distrutti
   - Mattoncini indistruttibili
   - Mattoncini che rilasciano power-up

## Conclusione

Questo progetto dimostra come utilizzare Canvas per creare un gioco interattivo completo, gestendo le animazioni, le collisioni e l'input dell'utente. Si tratta di un ottimo esempio di come combinare diverse tecniche di Canvas per creare un'esperienza di gioco coinvolgente.
