/**
 * Server WebSocket per il gioco multiplayer Tic Tac Toe
 * Questo server gestisce le connessioni dei giocatori, lo stato del gioco
 * e la sincronizzazione delle mosse tra i client.
 */

// Importa il modulo WebSocket
const WebSocket = require('ws');

// Crea un nuovo server WebSocket sulla porta 8083
const wss = new WebSocket.Server({ port: 8083 });

// Strutture dati per gestire i giocatori e le partite
const players = new Map(); // Mappa dei client WebSocket ai nomi dei giocatori
const games = new Map();   // Mappa delle partite in corso
let waitingPlayer = null;  // Giocatore in attesa di un avversario

console.log('Server WebSocket per Tic Tac Toe avviato sulla porta 8083');

// Gestione delle connessioni WebSocket
wss.on('connection', (ws) => {
    console.log('Nuovo client connesso');
    
    // Gestione dei messaggi ricevuti dal client
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log(`Messaggio ricevuto: ${JSON.stringify(data)}`);
            
            // Gestione dei diversi tipi di messaggi
            switch (data.type) {
                case 'join':
                    handlePlayerJoin(ws, data.name);
                    break;
                    
                case 'move':
                    handlePlayerMove(ws, data.index);
                    break;
                    
                case 'restart':
                    handleGameRestart(ws);
                    break;
            }
        } catch (error) {
            console.error('Errore nel parsing del messaggio:', error);
        }
    });
    
    // Gestione della chiusura della connessione
    ws.on('close', () => {
        handlePlayerDisconnect(ws);
    });
    
    // Gestione degli errori
    ws.on('error', (error) => {
        console.error('Errore WebSocket:', error);
    });
});

/**
 * Gestisce l'ingresso di un nuovo giocatore
 * @param {WebSocket} ws - La connessione WebSocket del giocatore
 * @param {string} name - Il nome del giocatore
 */
function handlePlayerJoin(ws, name) {
    // Registra il giocatore
    players.set(ws, name);
    
    // Invia la lista aggiornata dei giocatori a tutti
    broadcastPlayersList();
    
    console.log(`Giocatore ${name} si è unito`);
    
    // Se c'è un giocatore in attesa, inizia una partita
    if (waitingPlayer && waitingPlayer !== ws) {
        const opponent = players.get(waitingPlayer);
        const player = name;
        
        // Crea una nuova partita
        const gameId = `${player}_vs_${opponent}`;
        const game = {
            id: gameId,
            players: [waitingPlayer, ws],
            playerNames: [opponent, player],
            currentPlayerIndex: 0, // Inizia il primo giocatore
            gameState: ['', '', '', '', '', '', '', '', ''],
            active: true
        };
        
        // Salva la partita
        games.set(gameId, game);
        
        // Associa i giocatori alla partita
        waitingPlayer.gameId = gameId;
        ws.gameId = gameId;
        
        // Invia il messaggio di inizio partita ai giocatori
        sendGameStart(game);
        
        // Resetta il giocatore in attesa
        waitingPlayer = null;
    } else {
        // Questo giocatore è in attesa
        waitingPlayer = ws;
    }
}

/**
 * Gestisce la disconnessione di un giocatore
 * @param {WebSocket} ws - La connessione WebSocket del giocatore
 */
function handlePlayerDisconnect(ws) {
    if (!players.has(ws)) return;
    
    const playerName = players.get(ws);
    console.log(`Giocatore ${playerName} disconnesso`);
    
    // Se il giocatore era in una partita, termina la partita
    if (ws.gameId && games.has(ws.gameId)) {
        const game = games.get(ws.gameId);
        
        // Trova l'altro giocatore
        const otherPlayerWs = game.players.find(p => p !== ws);
        
        if (otherPlayerWs) {
            // Rimuovi l'associazione alla partita
            delete otherPlayerWs.gameId;
            
            // Informa l'altro giocatore
            sendToClient(otherPlayerWs, {
                type: 'player_left',
                player: playerName,
                players: getPlayersList()
            });
        }
        
        // Rimuovi la partita
        games.delete(ws.gameId);
    }
    
    // Se era il giocatore in attesa, resetta
    if (waitingPlayer === ws) {
        waitingPlayer = null;
    }
    
    // Rimuovi il giocatore
    players.delete(ws);
    
    // Invia la lista aggiornata dei giocatori a tutti
    broadcastPlayersList();
}

/**
 * Gestisce una mossa di un giocatore
 * @param {WebSocket} ws - La connessione WebSocket del giocatore
 * @param {number} index - L'indice della cella selezionata
 */
function handlePlayerMove(ws, index) {
    // Verifica se il giocatore è in una partita
    if (!ws.gameId || !games.has(ws.gameId)) return;
    
    const game = games.get(ws.gameId);
    
    // Verifica se è il turno del giocatore
    if (!game.active || game.players[game.currentPlayerIndex] !== ws) return;
    
    // Verifica se la mossa è valida
    if (index < 0 || index >= 9 || game.gameState[index] !== '') return;
    
    // Esegui la mossa
    const symbol = game.currentPlayerIndex === 0 ? 'X' : 'O';
    game.gameState[index] = symbol;
    
    // Verifica se la partita è terminata
    const result = checkGameResult(game.gameState);
    
    if (result.over) {
        // La partita è terminata
        game.active = false;
        
        // Invia il messaggio di fine partita
        game.players.forEach(player => {
            sendToClient(player, {
                type: 'game_over',
                gameState: game.gameState,
                result: result.result,
                winner: result.result === 'win' ? players.get(ws) : null
            });
        });
    } else {
        // Passa al giocatore successivo
        game.currentPlayerIndex = 1 - game.currentPlayerIndex;
        
        // Invia l'aggiornamento dello stato del gioco
        game.players.forEach(player => {
            sendToClient(player, {
                type: 'game_update',
                gameState: game.gameState,
                currentPlayer: players.get(game.players[game.currentPlayerIndex])
            });
        });
    }
}

/**
 * Gestisce la richiesta di riavvio di una partita
 * @param {WebSocket} ws - La connessione WebSocket del giocatore
 */
function handleGameRestart(ws) {
    // Verifica se il giocatore era in una partita
    if (!ws.gameId || !games.has(ws.gameId)) return;
    
    const oldGame = games.get(ws.gameId);
    const gameId = oldGame.id;
    
    // Crea una nuova partita con gli stessi giocatori
    const game = {
        id: gameId,
        players: [...oldGame.players],
        playerNames: [...oldGame.playerNames],
        currentPlayerIndex: 0, // Il primo giocatore inizia
        gameState: ['', '', '', '', '', '', '', '', ''],
        active: true
    };
    
    // Aggiorna la partita
    games.set(gameId, game);
    
    // Invia il messaggio di inizio partita
    sendGameStart(game);
}

/**
 * Invia un messaggio di inizio partita ai giocatori
 * @param {Object} game - L'oggetto partita
 */
function sendGameStart(game) {
    // Invia al primo giocatore (X)
    sendToClient(game.players[0], {
        type: 'game_start',
        symbol: 'X',
        opponent: game.playerNames[1],
        currentPlayer: game.playerNames[0]
    });
    
    // Invia al secondo giocatore (O)
    sendToClient(game.players[1], {
        type: 'game_start',
        symbol: 'O',
        opponent: game.playerNames[0],
        currentPlayer: game.playerNames[0]
    });
}

/**
 * Verifica se la partita è terminata
 * @param {Array} gameState - Lo stato attuale del gioco
 * @returns {Object} - Risultato della verifica
 */
function checkGameResult(gameState) {
    // Combinazioni vincenti
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // righe
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // colonne
        [0, 4, 8], [2, 4, 6]             // diagonali
    ];
    
    // Verifica se c'è un vincitore
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return { over: true, result: 'win' };
        }
    }
    
    // Verifica se è un pareggio
    if (!gameState.includes('')) {
        return { over: true, result: 'draw' };
    }
    
    // La partita continua
    return { over: false };
}

/**
 * Ottiene la lista dei nomi dei giocatori
 * @returns {Array} - Lista dei nomi dei giocatori
 */
function getPlayersList() {
    return Array.from(players.values());
}

/**
 * Invia la lista aggiornata dei giocatori a tutti i client
 */
function broadcastPlayersList() {
    const playersList = getPlayersList();
    
    for (const client of players.keys()) {
        sendToClient(client, {
            type: 'player_joined',
            players: playersList
        });
    }
}

/**
 * Invia un messaggio a un client specifico
 * @param {WebSocket} client - Il client WebSocket
 * @param {Object} message - Il messaggio da inviare
 */
function sendToClient(client, message) {
    if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
    }
}

/**
 * Gestione della chiusura del server
 */
process.on('SIGINT', () => {
    console.log('Chiusura del server WebSocket...');
    
    // Chiudi tutte le connessioni client
    wss.clients.forEach((client) => {
        client.close();
    });
    
    // Chiudi il server
    wss.close(() => {
        console.log('Server WebSocket chiuso');
        process.exit(0);
    });
});

/**
 * Note per l'esecuzione:
 * 1. Assicurati di avere Node.js installato
 * 2. Installa il modulo ws con: npm install ws
 * 3. Avvia il server con: node esempio4.js
 * 4. Apri esempio4.html nel browser per connetterti al server
 */