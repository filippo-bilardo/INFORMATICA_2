# Progetto: Gioco della Dama con Canvas

In questo progetto guidato svilupperemo un gioco della dama completo utilizzando HTML Canvas e JavaScript. L'implementazione seguirà un approccio incrementale, permettendo di testare ogni fase di sviluppo separatamente.

## Obiettivi di apprendimento
- Implementare una griglia interattiva con Canvas
- Gestire lo stato del gioco e i turni dei giocatori
- Creare un sistema di drag and drop per le pedine
- Implementare le regole della dama (movimenti, catture, promozioni)
- Sviluppare un'interfaccia utente reattiva

## Requisiti
- Conoscenza di base di HTML e CSS
- Comprensione dei fondamenti di JavaScript
- Familiarità con l'API Canvas

## Struttura del progetto

### HTML
```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gioco della Dama</title>
    <style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
            font-family: Arial, sans-serif;
        }
        
        h1 {
            margin-bottom: 10px;
        }
        
        canvas {
            border: 2px solid #333;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }
        
        .game-info {
            margin-top: 20px;
            font-size: 18px;
            display: flex;
            justify-content: space-between;
            width: 500px;
        }
        
        .controls {
            margin-top: 20px;
        }
        
        button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin: 0 5px;
        }
        
        button:hover {
            background-color: #45a049;
        }
        
        .steps {
            margin-top: 20px;
            text-align: center;
        }
        
        .steps button {
            background-color: #2196F3;
        }
        
        .steps button:hover {
            background-color: #0b7dda;
        }
    </style>
</head>
<body>
    <h1>Gioco della Dama</h1>
    <canvas id="checkerboard" width="500" height="500"></canvas>
    
    <div class="game-info">
        <div>Turno: <span id="currentPlayer">Bianco</span></div>
        <div>Pedine Bianche: <span id="whitePieces">12</span></div>
        <div>Pedine Nere: <span id="blackPieces">12</span></div>
    </div>
    
    <div class="controls">
        <button id="newGameBtn">Nuova Partita</button>
        <button id="undoBtn">Annulla Mossa</button>
    </div>
    
    <div class="steps">
        <h3>Modalità di sviluppo incrementale</h3>
        <button id="step1">Step 1: Scacchiera</button>
        <button id="step2">Step 2: Pedine</button>
        <button id="step3">Step 3: Selezione</button>
        <button id="step4">Step 4: Mosse Base</button>
        <button id="step5">Step 5: Catture</button>
        <button id="step6">Step 6: Dama</button>
        <button id="step7">Step 7: Completo</button>
    </div>
    
    <script src="dama.js"></script>
</body>
</html>
```

### JavaScript (dama.js)
```javascript
// Riferimenti agli elementi DOM
const canvas = document.getElementById('checkerboard');
const ctx = canvas.getContext('2d');
const currentPlayerElement = document.getElementById('currentPlayer');
const whitePiecesElement = document.getElementById('whitePieces');
const blackPiecesElement = document.getElementById('blackPieces');
const newGameBtn = document.getElementById('newGameBtn');
const undoBtn = document.getElementById('undoBtn');

// Pulsanti per gli step di sviluppo
const stepButtons = [
    document.getElementById('step1'),
    document.getElementById('step2'),
    document.getElementById('step3'),
    document.getElementById('step4'),
    document.getElementById('step5'),
    document.getElementById('step6'),
    document.getElementById('step7')
];

// Costanti del gioco
const BOARD_SIZE = 8;
const SQUARE_SIZE = canvas.width / BOARD_SIZE;
const WHITE = 'white';
const BLACK = 'black';

// Stato del gioco
let gameState = {
    board: [], // Matrice 8x8 che rappresenta la scacchiera
    currentPlayer: WHITE,
    selectedPiece: null,
    validMoves: [],
    capturedPieces: [],
    gameHistory: [],
    developmentStep: 1 // Controlla quale step di sviluppo è attivo
};

// Inizializzazione del gioco
function initGame() {
    initBoard();
    drawBoard();
    if (gameState.developmentStep >= 2) {
        placePieces();
    }
    updateGameInfo();
}

// Step 1: Inizializzazione della scacchiera
function initBoard() {
    gameState.board = [];
    
    for (let row = 0; row < BOARD_SIZE; row++) {
        gameState.board[row] = [];
        for (let col = 0; col < BOARD_SIZE; col++) {
            gameState.board[row][col] = null; // Inizialmente tutte le caselle sono vuote
        }
    }
}

// Step 1: Disegno della scacchiera
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            // Determina il colore della casella (alternando bianco e nero)
            const isLightSquare = (row + col) % 2 === 0;
            ctx.fillStyle = isLightSquare ? '#EBECD0' : '#779556';
            
            // Disegna la casella
            ctx.fillRect(col * SQUARE_SIZE, row * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
            
            // Se siamo almeno allo step 2, disegna anche le pedine
            if (gameState.developmentStep >= 2 && gameState.board[row][col]) {
                drawPiece(row, col);
            }
        }
    }
    
    // Se siamo almeno allo step 3 e c'è una pedina selezionata, evidenziala
    if (gameState.developmentStep >= 3 && gameState.selectedPiece) {
        highlightSelectedPiece();
    }
    
    // Se siamo almeno allo step 4 e ci sono mosse valide, evidenziale
    if (gameState.developmentStep >= 4 && gameState.validMoves.length > 0) {
        highlightValidMoves();
    }
}

// Step 2: Posizionamento delle pedine iniziali
function placePieces() {
    // Posiziona le pedine nere (nelle prime 3 righe)
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            // Posiziona le pedine solo sulle caselle nere (somma di riga e colonna dispari)
            if ((row + col) % 2 === 1) {
                gameState.board[row][col] = { color: BLACK, isKing: false };
            }
        }
    }
    
    // Posiziona le pedine bianche (nelle ultime 3 righe)
    for (let row = 5; row < 8; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            // Posiziona le pedine solo sulle caselle nere (somma di riga e colonna dispari)
            if ((row + col) % 2 === 1) {
                gameState.board[row][col] = { color: WHITE, isKing: false };
            }
        }
    }
}

// Step 2: Disegno di una singola pedina
function drawPiece(row, col) {
    const piece = gameState.board[row][col];
    if (!piece) return;
    
    const x = col * SQUARE_SIZE + SQUARE_SIZE / 2;
    const y = row * SQUARE_SIZE + SQUARE_SIZE / 2;
    const radius = SQUARE_SIZE * 0.4;
    
    // Disegna il cerchio della pedina
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = piece.color;
    ctx.fill();
    ctx.strokeStyle = piece.color === WHITE ? '#000' : '#666';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Se la pedina è una dama (re), disegna una corona o un simbolo
    if (piece.isKing && gameState.developmentStep >= 6) {
        ctx.fillStyle = piece.color === WHITE ? '#000' : '#fff';
        ctx.font = `${radius * 0.8}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('♔', x, y);
    }
}

// Step 3: Evidenzia la pedina selezionata
function highlightSelectedPiece() {
    const { row, col } = gameState.selectedPiece;
    
    ctx.beginPath();
    ctx.arc(
        col * SQUARE_SIZE + SQUARE_SIZE / 2,
        row * SQUARE_SIZE + SQUARE_SIZE / 2,
        SQUARE_SIZE * 0.45,
        0,
        Math.PI * 2
    );
    ctx.strokeStyle = '#FFD700'; // Colore oro per l'evidenziazione
    ctx.lineWidth = 3;
    ctx.stroke();
}

// Step 4: Evidenzia le mosse valide
function highlightValidMoves() {
    gameState.validMoves.forEach(move => {
        const { row, col } = move;
        
        ctx.beginPath();
        ctx.arc(
            col * SQUARE_SIZE + SQUARE_SIZE / 2,
            row * SQUARE_SIZE + SQUARE_SIZE / 2,
            SQUARE_SIZE * 0.2,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'; // Verde semi-trasparente
        ctx.fill();
    });
}

// Step 3: Gestione del click sulla scacchiera
function handleBoardClick(event) {
    if (gameState.developmentStep < 3) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const col = Math.floor(x / SQUARE_SIZE);
    const row = Math.floor(y / SQUARE_SIZE);
    
    // Se c'è già una pedina selezionata
    if (gameState.selectedPiece) {
        // Controlla se il click è su una mossa valida
        const moveIndex = gameState.validMoves.findIndex(
            move => move.row === row && move.col === col
        );
        
        if (moveIndex !== -1) {
            // Esegui la mossa
            if (gameState.developmentStep >= 4) {
                makeMove(gameState.validMoves[moveIndex]);
            }
        } else {
            // Deseleziona la pedina corrente
            gameState.selectedPiece = null;
            gameState.validMoves = [];
            
            // Controlla se è stata selezionata una nuova pedina
            checkForPieceSelection(row, col);
        }
    } else {
        // Nessuna pedina selezionata, controlla se è stata cliccata una pedina
        checkForPieceSelection(row, col);
    }
    
    // Ridisegna la scacchiera
    drawBoard();
}

// Step 3: Controlla se è stata selezionata una pedina
function checkForPieceSelection(row, col) {
    const piece = gameState.board[row][col];
    
    // Verifica se c'è una pedina nella casella e se appartiene al giocatore corrente
    if (piece && piece.color === gameState.currentPlayer) {
        gameState.selectedPiece = { row, col };
        
        // Se siamo almeno allo step 4, calcola le mosse valide
        if (gameState.developmentStep >= 4) {
            gameState.validMoves = calculateValidMoves(row, col);
        }
    }
}

// Step 4: Calcola le mosse valide per una pedina
function calculateValidMoves(row, col) {
    const piece = gameState.board[row][col];
    const moves = [];
    
    // Direzioni di movimento (dipendono dal colore della pedina e se è una dama)
    const directions = [];
    
    if (piece.color === WHITE || piece.isKing) {
        // Le pedine bianche si muovono verso l'alto (righe decrescenti)
        directions.push({ rowDir: -1, colDir: -1 }); // Diagonale in alto a sinistra
        directions.push({ rowDir: -1, colDir: 1 });  // Diagonale in alto a destra
    }
    
    if (piece.color === BLACK || piece.isKing) {
        // Le pedine nere si muovono verso il basso (righe crescenti)
        directions.push({ rowDir: 1, colDir: -1 });  // Diagonale in basso a sinistra
        directions.push({ rowDir: 1, colDir: 1 });   // Diagonale in basso a destra
    }
    
    // Controlla le mosse normali (spostamento di una casella)
    directions.forEach(dir => {
        const newRow = row + dir.rowDir;
        const newCol = col + dir.colDir;
        
        // Verifica che la nuova posizione sia all'interno della scacchiera
        if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
            // Verifica che la casella di destinazione sia vuota
            if (!gameState.board[newRow][newCol]) {
                moves.push({ row: newRow, col: newCol, captures: [] });
            }
            // Se siamo almeno allo step 5, controlla anche le catture
            else if (gameState.developmentStep >= 5) {
                checkForCapture(row, col, dir.rowDir, dir.colDir, moves);
            }
        }
    });
    
    return moves;
}

// Step 5: Controlla se è possibile una cattura
function checkForCapture(row, col, rowDir, colDir, moves) {
    const piece = gameState.board[row][col];
    const newRow = row + rowDir;
    const newCol = col + colDir;
    
    // Verifica che la casella adiacente contenga una pedina avversaria
    if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
        const adjacentPiece = gameState.board[newRow][newCol];
        
        if (adjacentPiece && adjacentPiece.color !== piece.color) {
            // Controlla se la casella dopo la pedina avversaria è libera
            const jumpRow = newRow + rowDir;
            const jumpCol = newCol + colDir;
            
            if (jumpRow >= 0 && jumpRow < BOARD_SIZE && jumpCol >= 0 && jumpCol < BOARD_SIZE) {
                if (!gameState.board[jumpRow][jumpCol]) {
                    // È possibile catturare
                    moves.push({
                        row: jumpRow,
                        col: jumpCol,
                        captures: [{ row: newRow, col: newCol }]
                    });
                }
            }
        }
    }
}

// Step 4: Esegui una mossa
function makeMove(move) {
    // Salva lo stato corrente nella cronologia
    saveGameState();
    
    const { row: fromRow, col: fromCol } = gameState.selectedPiece;
    const { row: toRow, col: toCol, captures } = move;
    
    // Sposta la pedina
    gameState.board[toRow][toCol] = gameState.board[fromRow][fromCol];
    gameState.board[fromRow][fromCol] = null;
    
    // Se siamo almeno allo step 5, gestisci le catture
    if (gameState.developmentStep >= 5 && captures.length > 0) {
        captures.forEach(capture => {
            gameState.board[capture.row][capture.col] = null;
        });
    }
    
    // Se siamo almeno allo step 6, controlla se la pedina diventa dama
    if (gameState.developmentStep >= 6) {
        checkForKingPromotion(toRow, toCol);
    }
    
    // Cambia il turno
    gameState.currentPlayer = gameState.currentPlayer === WHITE ? BLACK : WHITE;
    
    // Resetta la selezione
    gameState.selectedPiece = null;
    gameState.validMoves = [];
    
    // Aggiorna le informazioni di gioco
    updateGameInfo();
}

// Step 6: Controlla se una pedina deve essere promossa a dama
function checkForKingPromotion(row, col) {
    const piece = gameState.board[row][col];
    
    if (!piece || piece.isKing) return;
    
    // Le pedine bianche diventano dame quando raggiungono la riga 0
    if (piece.color === WHITE && row === 0) {
        piece.isKing = true;
    }
    
    // Le pedine nere diventano dame quando raggiungono la riga 7
    if (piece.color === BLACK && row === 7) {
        piece.isKing = true;
    }
}

// Salva lo stato corrente del gioco nella cronologia
function saveGameState() {
    // Crea una copia profonda dello stato corrente
    const boardCopy = JSON.parse(JSON.stringify(gameState.board));
    
    gameState.gameHistory.push({
        board: boardCopy,
        currentPlayer: gameState.currentPlayer
    });
}

// Annulla l'ultima mossa
function undoMove() {
    if (gameState.gameHistory.length === 0) return;
    
    // Recupera l'ultimo stato salvato
    const lastState = gameState.gameHistory.pop();
    
    // Ripristina lo stato
    gameState.board = lastState.board;
    gameState.currentPlayer = lastState.currentPlayer;
    gameState.selectedPiece = null;
    gameState.validMoves = [];
    
    // Aggiorna le informazioni di gioco
    updateGameInfo();
    drawBoard();
}

// Aggiorna le informazioni di gioco (turno e numero di pedine)
function updateGameInfo() {
    currentPlayerElement.textContent = gameState.currentPlayer === WHITE ? 'Bianco' : 'Nero';
    
    // Conta le pedine
    let whitePieces = 0;
    let blackPieces = 0;
    
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const piece = gameState.board[row][col];
            if (piece) {
                if (piece.color === WHITE) {
                    whitePieces++;
                } else {
                    blackPieces++;
                }
            }
        }
    }
    
    whitePiecesElement.textContent = whitePieces;
    blackPiecesElement.textContent = blackPieces;
    
    // Controlla se il gioco è finito
    if (gameState.developmentStep >= 7) {
        checkGameOver(whitePieces, blackPieces);
    }
}

// Step 7: Controlla se il gioco è finito
function checkGameOver(whitePieces, blackPieces) {
    if (whitePieces === 0) {
        alert('Il giocatore Nero ha vinto!');
        initGame();
    } else if (blackPieces === 0) {
        alert('Il giocatore Bianco ha vinto!');
        initGame();
    }
}

// Event listeners
canvas.addEventListener('click', handleBoardClick);

newGameBtn.addEventListener('click', () => {
    gameState.gameHistory = [];
    initGame();
});

undoBtn.addEventListener('click', undoMove);

// Event listeners per i pulsanti degli step di sviluppo
stepButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        gameState.developmentStep = index + 1;
        initGame();
    });
});

// Inizializza il gioco
initGame();
```

## Sviluppo incrementale

Questo progetto è strutturato in 7 step incrementali, ognuno dei quali aggiunge nuove funzionalità al gioco. Ogni step è testabile individualmente premendo il pulsante corrispondente nell'interfaccia.

### Step 1: Scacchiera
- Disegno della scacchiera 8x8 con caselle alternate
- Implementazione della struttura dati per rappresentare la scacchiera

### Step 2: Pedine
- Posizionamento iniziale delle pedine bianche e nere
- Disegno delle pedine sulla scacchiera

### Step 3: Selezione
- Implementazione della selezione delle pedine
- Evidenziazione della pedina selezionata
- Gestione dei turni di gioco

### Step 4: Mosse Base
- Calcolo delle mosse valide per una pedina selezionata
- Evidenziazione delle caselle di destinazione valide
- Implementazione dello spostamento delle pedine

### Step 5: Catture
- Implementazione delle regole di cattura
- Rimozione delle pedine catturate dalla scacchiera

### Step 6: Dama
- Promozione delle pedine a dama quando raggiungono il lato opposto
- Implementazione delle regole di movimento per le dame

### Step 7: Gioco Completo
- Controllo della fine del gioco
- Gestione della vittoria
- Ottimizzazioni e miglioramenti

## Concetti chiave implementati

### Gestione dello stato del gioco
Il gioco utilizza un oggetto `gameState` per tenere traccia di tutte le informazioni rilevanti, come la posizione delle pedine, il giocatore corrente e la cronologia delle mosse.

### Rendering Canvas
Il progetto dimostra come utilizzare l'API Canvas per disegnare elementi grafici come la scacchiera e le pedine, gestendo anche l'evidenziazione degli elementi selezionati.

### Interazione utente
L'implementazione include la gestione degli eventi del mouse per selezionare le pedine e scegliere le mosse, creando un'interfaccia intuitiva.

### Logica di gioco
Il codice implementa tutte le regole della dama, inclusi i movimenti diagonali, le catture e la promozione a dama.

## Estensioni possibili

1. **Intelligenza artificiale**
   Implementare un avversario controllato dal computer con diversi livelli di difficoltà.

   ```javascript
   function computerMove() {
       // Trova tutte le pedine del computer
       const computerPieces = [];
       for (let row = 0; row < BOARD_SIZE; row++) {
           for (let col = 0; col < BOARD_SIZE; col++) {
               const piece = gameState.board[row][col];
               if (piece && piece.color === gameState.currentPlayer) {
                   computerPieces.push({ row, col });
               }
           }
       }
       
       // Scegli una mossa casuale tra quelle disponibili
       // (in una versione più avanzata, si potrebbe implementare un algoritmo minimax)
       const validMoves = [];
       computerPieces.forEach(piece => {
           const moves = calculateValidMoves(piece.row, piece.col);
           moves.forEach(move => {
               validMoves.push({
                   fromRow: piece.row,
                   fromCol: piece.col,
                   toRow: move.row,
                   toCol: move.col,
                   captures: move.captures
               });
           });
       });
       
       if (validMoves.length > 0) {
           const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
           gameState.selectedPiece = { row: randomMove.fromRow, col: randomMove.fromCol };
           makeMove({
               row: randomMove.toRow,
               col: randomMove.toCol,
               captures: randomMove.captures
           });
       }
   }
   ```

2. **Modalità multiplayer online**
   Estendere il gioco per consentire partite online contro altri giocatori utilizzando WebSockets.

3. **Animazioni**
   Aggiungere animazioni fluide per il movimento delle pedine e le catture.

   ```javascript
   function animateMove(fromRow, fromCol, toRow, toCol, callback) {
       const piece = gameState.board[fromRow][fromCol];
       const startX = fromCol * SQUARE_SIZE + SQUARE_SIZE / 2;
       const startY = fromRow * SQUARE_SIZE + SQUARE_SIZE / 2;
       const endX = toCol * SQUARE_SIZE + SQUARE_SIZE / 2;
       const endY = toRow * SQUARE_SIZE + SQUARE_SIZE / 2;
       
       const duration = 500; // millisecondi
       const startTime = performance.now();
       
       function animate(currentTime) {
           const elapsed = currentTime - startTime;
           const progress = Math.min(elapsed / duration, 1);
           
           // Funzione di easing per un movimento più naturale
           const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
           
           const x = startX + (endX - startX) * easeProgress;
           const y = startY + (endY - startY) * easeProgress;
           
           // Ridisegna la scacchiera
           drawBoard();
           
           // Disegna la pedina in movimento
           ctx.beginPath();
           ctx.arc(x, y, SQUARE_SIZE * 0.4, 0, Math.PI * 2);
           ctx.fillStyle = piece.color;
           ctx.fill();
           ctx.strokeStyle = piece.color === WHITE ? '#000' : '#666';
           ctx.lineWidth = 2;
           ctx.stroke();
           
           if (progress < 1) {
               requestAnimationFrame(animate);
           } else {
               if (callback) callback();
           }
       }
       
       requestAnimationFrame(animate);
   }
   ```

4. **Salvataggio delle partite**
   Implementare il salvataggio e il caricamento delle partite utilizzando localStorage.

## Conclusione

Questo progetto dimostra come implementare un gioco completo della dama utilizzando Canvas e JavaScript. L'approccio incrementale permette di comprendere ogni aspetto del gioco separatamente, rendendo più facile l'apprendimento e la personalizzazione. Le tecn