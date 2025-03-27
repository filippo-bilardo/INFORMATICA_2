# Progetto: Gioco Pong con Canvas

Questo progetto guida ti mostrerà come creare il classico gioco Pong utilizzando HTML Canvas e JavaScript.

## Obiettivi di apprendimento
- Implementare un loop di gioco fluido con `requestAnimationFrame`
- Creare un sistema di collisioni semplice ma accurato
- Gestire input da tastiera e automatizzare l'intelligenza artificiale
- Aggiungere effetti sonori e visivi

## Requisiti
- Conoscenza di HTML e CSS di base
- Comprensione dei fondamenti di JavaScript
- Familiarità con il ciclo di animazione Canvas

## Struttura del progetto

### HTML
```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pong Game</title>
    <style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background-color: #222;
            font-family: Arial, sans-serif;
            color: white;
        }
        h1 {
            margin-bottom: 10px;
        }
        canvas {
            background-color: #000;
            border: 2px solid white;
        }
        .score-container {
            display: flex;
            width: 600px;
            justify-content: space-between;
            margin-bottom: 20px;
            font-size: 24px;
        }
        .controls {
            margin-top: 20px;
            text-align: center;
        }
        button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #444;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin: 0 10px;
        }
        button:hover {
            background-color: #666;
        }
    </style>
</head>
<body>
    <h1>PONG</h1>
    <div class="score-container">
        <div>Giocatore: <span id="playerScore">0</span></div>
        <div>Computer: <span id="computerScore">0</span></div>
    </div>
    <canvas id="gameCanvas" width="600" height="400"></canvas>
    <div class="controls">
        <p>Usa i tasti ↑ e ↓ per muovere la racchetta</p>
        <button id="startButton">Inizia Partita</button>
        <button id="resetButton">Reset</button>
    </div>
    <script src="pong.js"></script>
</body>
</html>
```

### JavaScript (pong.js)
```javascript
// Riferimenti agli elementi DOM
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playerScoreElement = document.getElementById('playerScore');
const computerScoreElement = document.getElementById('computerScore');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

// Costanti del gioco
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 80;
const PADDLE_MARGIN = 20;
const BALL_SIZE = 12;
const NET_WIDTH = 3;
const NET_DASH = 10;
const NET_GAP = 6;

// Variabili di stato del gioco
let gameRunning = false;
let animationId = null;
let playerScore = 0;
let computerScore = 0;

// Oggetti del gioco
const player = {
    x: PADDLE_MARGIN,
    y: canvas.height / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    color: 'white',
    speed: 8,
    moveUp: false,
    moveDown: false
};

const computer = {
    x: canvas.width - PADDLE_MARGIN - PADDLE_WIDTH,
    y: canvas.height / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    color: 'white',
    speed: 6
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: BALL_SIZE,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: 'white'
};

// Funzione di reset
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    
    // Direzione casuale, ma sempre verso un giocatore
    ball.velocityX = ball.speed * (Math.random() > 0.5 ? 1 : -1);
    ball.velocityY = ball.speed * (Math.random() * 2 - 1); // Angolo casuale
}

// Disegna gli elementi di gioco
function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawNet() {
    const netX = canvas.width / 2 - NET_WIDTH / 2;
    for (let i = 0; i <= canvas.height; i += NET_DASH + NET_GAP) {
        drawRect(netX, i, NET_WIDTH, NET_DASH, 'white');
    }
}

function drawGame() {
    // Pulisci il canvas
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    
    // Disegna la rete
    drawNet();
    
    // Disegna i punteggi
    ctx.fillStyle = 'white';
    ctx.font = '35px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(playerScore.toString(), canvas.width / 4, 50);
    ctx.fillText(computerScore.toString(), 3 * canvas.width / 4, 50);
    
    // Disegna le racchette
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
    
    // Disegna la palla
    drawCircle(ball.x, ball.y, ball.size / 2, ball.color);
}

// Collisione tra palla e racchetta
function collision(b, p) {
    // Controlla se la palla è nell'area della racchetta
    return b.x + b.size / 2 > p.x && 
           b.x - b.size / 2 < p.x + p.width && 
           b.y + b.size / 2 > p.y && 
           b.y - b.size / 2 < p.y + p.height;
}

// Aggiorna lo stato del gioco
function update() {
    // Movimento del giocatore
    if (player.moveUp && player.y > 0) {
        player.y -= player.speed;
    }
    if (player.moveDown && player.y + player.height < canvas.height) {
        player.y += player.speed;
    }
    
    // IA del computer: segue la palla con un po' di ritardo
    const computerCenter = computer.y + computer.height / 2;
    const ballCenter = ball.y;
    
    // Muovi solo se la palla sta andando verso il computer
    if (ball.velocityX > 0) {
        if (computerCenter < ballCenter - 10) {
            computer.y += computer.speed;
        } else if (computerCenter > ballCenter + 10) {
            computer.y -= computer.speed;
        }
    }
    
    // Limita la posizione del computer
    if (computer.y < 0) computer.y = 0;
    if (computer.y + computer.height > canvas.height) {
        computer.y = canvas.height - computer.height;
    }
    
    // Aggiorna la posizione della palla
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    // Collisione con il bordo superiore/inferiore
    if (ball.y - ball.size / 2 < 0 || ball.y + ball.size / 2 > canvas.height) {
        ball.velocityY = -ball.velocityY;
        playSound('wall');
    }
    
    // Determina quale racchetta ha colpito la palla
    let player = (ball.x < canvas.width / 2) ? this.player : computer;
    
    // Collisione con la racchetta
    if (collision(ball, player)) {
        playSound('hit');
        
        // Calcola dove la palla ha colpito la racchetta
        const collidePoint = (ball.y - (player.y + player.height / 2)) / (player.height / 2);
        
        // Calcola l'angolo (tra -45 e 45 gradi)
        const angle = collidePoint * Math.PI / 4;
        
        // Determina la direzione in base a quale racchetta ha colpito
        const direction = (ball.x < canvas.width / 2) ? 1 : -1;
        
        // Cambia la velocità X e Y
        ball.velocityX = direction * ball.speed * Math.cos(angle);
        ball.velocityY = ball.speed * Math.sin(angle);
        
        // Aumenta leggermente la velocità ad ogni colpo
        ball.speed += 0.2;
    }
    
    // Segna punto
    if (ball.x - ball.size / 2 < 0) {
        // Il computer segna
        computerScore++;
        computerScoreElement.textContent = computerScore;
        playSound('score');
        resetBall();
    } else if (ball.x + ball.size / 2 > canvas.width) {
        // Il giocatore segna
        playerScore++;
        playerScoreElement.textContent = playerScore;
        playSound('score');
        resetBall();
    }
    
    // Controlla fine partita (esempio: primo a 10 punti)
    if (playerScore >= 10 || computerScore >= 10) {
        gameRunning = false;
        const winner = playerScore >= 10 ? "Giocatore" : "Computer";
        alert(`${winner} ha vinto!`);
        startButton.textContent = "Ricomincia";
        cancelAnimationFrame(animationId);
    }
}

// Funzione principale del loop di gioco
function gameLoop() {
    if (!gameRunning) return;
    
    update();
    drawGame();
    animationId = requestAnimationFrame(gameLoop);
}

// Gestori degli eventi
function keyDown(e) {
    if (e.key === 'ArrowUp') {
        player.moveUp = true;
    } else if (e.key === 'ArrowDown') {
        player.moveDown = true;
    }
}

function keyUp(e) {
    if (e.key === 'ArrowUp') {
        player.moveUp = false;
    } else if (e.key === 'ArrowDown') {
        player.moveDown = false;
    }
}

// Suoni del gioco
function playSound(type) {
    // Se vuoi aggiungere suoni reali, crea un oggetto Audio e riproducilo qui
    // Per semplicità, questo è solo un placeholder
    console.log(`Playing ${type} sound`);
}

// Event Listeners
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

startButton.addEventListener('click', () => {
    if (!gameRunning) {
        gameRunning = true;
        startButton.textContent = "Partita in corso";
        gameLoop();
    }
});

resetButton.addEventListener('click', () => {
    // Reset totale del gioco
    cancelAnimationFrame(animationId);
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = '0';
    computerScoreElement.textContent = '0';
    player.y = canvas.height / 2 - PADDLE_HEIGHT / 2;
    computer.y = canvas.height / 2 - PADDLE_HEIGHT / 2;
    ball.speed = 5;
    resetBall();
    gameRunning = false;
    startButton.textContent = "Inizia Partita";
    drawGame();
});

// Inizializza disegnando lo stato iniziale
drawGame();
```

## Come si gioca
1. Clicca sul pulsante "Inizia Partita" per avviare il gioco
2. Usa le frecce su e giù per muovere la tua racchetta (quella a sinistra)
3. Cerca di far rimbalzare la palla e di farla passare oltre la racchetta del computer
4. Vince il primo che raggiunge 10 punti

## Concetti chiave implementati

### Sistema di fisica
Il gioco implementa un sistema di fisica basilare che include:
1. **Rilevamento collisioni** tra la palla e le racchette
2. **Calcolo dell'angolo di rimbalzo** basato sul punto di impatto sulla racchetta
3. **Aumento graduale della velocità** per aumentare la difficoltà

### Intelligenza artificiale semplice
Il computer utilizza una semplice IA che segue la palla quando questa si dirige verso di lui, con un piccolo ritardo per rendere il gioco più equilibrato.

### Loop di gioco ottimizzato
Il gioco utilizza `requestAnimationFrame` per creare un loop di gioco fluido che si sincronizza con il refresh del monitor.

## Estensioni possibili

1. **Aggiungere suoni reali**
   Implementa suoni per colpi, rimbalzi e punti utilizzando l'API Audio.

   ```javascript
   const sounds = {
       hit: new Audio('hit.wav'),
       wall: new Audio('wall.wav'),
       score: new Audio('score.wav')
   };
   
   function playSound(type) {
       if (sounds[type]) {
           sounds[type].currentTime = 0;
           sounds[type].play();
       }
   }
   ```

2. **Modalità a due giocatori**
   Modifica il codice per consentire a due giocatori di giocare sulla stessa tastiera.

   ```javascript
   // Aggiungi controlli per il secondo giocatore (W e S)
   function keyDown(e) {
       if (e.key === 'ArrowUp') {
           player.moveUp = true;
       } else if (e.key === 'ArrowDown') {
           player.moveDown = true;
       } else if (e.key === 'w' || e.key === 'W') {
           computer.moveUp = true;
       } else if (e.key === 's' || e.key === 'S') {
           computer.moveDown = true;
       }
   }
   
   function keyUp(e) {
       // Aggiorna analogamente
   }
   ```

3. **Effetti visivi**
   Aggiungi effetti come scie dietro la palla, lampeggiamenti quando viene segnato un punto, ecc.

   ```javascript
   // Aggiungi una scia alla palla
   function drawBallTrail() {
       // Salva le ultime 10 posizioni della palla
       ballTrail.push({x: ball.x, y: ball.y});
       if (ballTrail.length > 10) ballTrail.shift();
       
       // Disegna la scia
       ballTrail.forEach((pos, index) => {
           const opacity = (index + 1) / 10;
           ctx.beginPath();
           ctx.arc(pos.x, pos.y, ball.size / 2 * opacity, 0, Math.PI * 2);
           ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
           ctx.fill();
       });
   }
   ```

4. **Powerup**
   Aggiungi elementi che appaiono casualmente nel campo e che, se colpiti, danno vantaggi come:
   - Racchetta più grande
   - Palla più lenta
   - Palla invisibile (per l'avversario)

## Conclusione

Questo progetto dimostra le basi dello sviluppo di un gioco con Canvas, dalla gestione del rendering grafico al controllo dell'input utente, fino alla creazione di un'intelligenza artificiale basilare. Puoi estendere questo progetto in molti modi, aggiungendo funzionalità più avanzate come effetti particellari, menu di gioco, o modalità di gioco alternative.
