// Esempio 03: Memorizzazione Dati sul Brick EV3

brick.showString("Esempio Memorizzazione", 1);

// MakeCode per EV3 offre funzionalità di base per la memorizzazione persistente di dati
// utilizzando il blocco 'storage'. Questo permette di salvare piccole quantità di dati
// (come stringhe o numeri) che persistono anche dopo lo spegnimento del brick.

// Nota: La capacità di memorizzazione è limitata e non è adatta per grandi dataset.
// I dati vengono memorizzati come coppie chiave-valore.

// 1. Scrittura di un Valore (Numero)
let punteggioMassimo = 1500;
storage.putNumber("highScore", punteggioMassimo);
brick.showString("HighScore salvato: " + punteggioMassimo, 3);
pause(1500);

// 2. Lettura di un Valore (Numero)
// Se la chiave non esiste, getNumber restituisce 0.
let punteggioRecuperato = storage.getNumber("highScore");
brick.showString("HighScore letto: " + punteggioRecuperato, 4);
pause(1500);

// Verifica se il valore è stato recuperato correttamente
if (punteggioRecuperato === punteggioMassimo) {
  brick.showString("Recupero OK!", 5);
} else {
  brick.showString("Errore recupero!", 5);
}
pause(1500);

// 3. Scrittura di una Stringa
let nomeGiocatore = "EV3Player1";
storage.putString("playerName", nomeGiocatore);
brick.showString("Nome salvato: " + nomeGiocatore, 6);
pause(1500);

// 4. Lettura di una Stringa
// Se la chiave non esiste, getString restituisce una stringa vuota "".
let nomeRecuperato = storage.getString("playerName");
brick.showString("Nome letto: " + nomeRecuperato, 7);
pause(1500);

// Pulizia display
for(let i=3; i < 8; i++) brick.showString("                     ", i);

// 5. Gestione di Chiavi Non Esistenti
let valoreInesistenteNum = storage.getNumber("chiaveNonEsiste");
brick.showString("Num inesistente: " + valoreInesistenteNum, 3); // Dovrebbe essere 0
pause(1000);

let valoreInesistenteStr = storage.getString("chiaveNonEsisteStr");
brick.showString("Str inesistente: '" + valoreInesistenteStr + "'", 4); // Dovrebbe essere ""
pause(1000);

// 6. Sovrascrittura di Valori
storage.putNumber("highScore", 2000); // Sovrascrive il valore precedente
let nuovoHighScore = storage.getNumber("highScore");
brick.showString("Nuovo HS: " + nuovoHighScore, 5);
pause(1500);

// 7. Memorizzare Dati Strutturati (come JSON stringhificato)
// Poiché 'storage' supporta solo numeri e stringhe, per memorizzare oggetti o array
// è necessario convertirli in una stringa JSON e poi riconvertirli durante la lettura.
// MakeCode EV3 potrebbe non avere JSON.stringify/parse nativamente.
// Questo è un esempio concettuale; la sua fattibilità dipende dall'ambiente MakeCode specifico.

// Esempio concettuale (verifica la disponibilità di JSON in MakeCode):
let impostazioniRobot = {
  velocita: 70,
  sensibilitaSensore: 0.8
};

// Tentativo di stringhificazione (potrebbe non funzionare direttamente)
// let impostazioniString = JSON.stringify(impostazioniRobot);
// storage.putString("robotSettings", impostazioniString);
// brick.showString("Settings salvate (str)", 6);
// pause(1000);

// Tentativo di parsing (potrebbe non funzionare direttamente)
// let settingsRecuperateString = storage.getString("robotSettings");
// if (settingsRecuperateString) {
//   let settingsRecuperateObj = JSON.parse(settingsRecuperateString);
//   brick.showString("Vel recuperata: " + settingsRecuperateObj.velocita, 7);
// } else {
//   brick.showString("Settings non trovate", 7);
// }
// pause(1000);

// Se JSON.stringify/parse non sono disponibili, si possono salvare i singoli valori:
storage.putNumber("robotSpeedSetting", impostazioniRobot.velocita);
storage.putNumber("robotSensorSensitivity", impostazioniRobot.sensibilitaSensore * 100); // Salva come intero se necessario

let speedSetting = storage.getNumber("robotSpeedSetting");
let sensitivitySetting = storage.getNumber("robotSensorSensitivity") / 100;

brick.showString("Vel (singola): " + speedSetting, 6);
brick.showString("Sens (singola): " + sensitivitySetting, 7);
pause(2000);


// 8. Rimozione di un Valore (se supportato)
// Alcune implementazioni di 'storage' potrebbero avere un metodo 'remove' o 'delete'.
// In MakeCode EV3, non sembra esserci un metodo diretto per rimuovere una chiave.
// Si può sovrascrivere con un valore nullo/vuoto se necessario, ma la chiave rimarrà.
// storage.putNumber("highScore", 0); // Resetta il punteggio
// storage.putString("playerName", ""); // Resetta il nome

brick.showString("Fine Esempio Storage", 1);

// Considerazioni:
// - Lo spazio di archiviazione è limitato.
// - Salva solo i dati essenziali.
// - I nomi delle chiavi devono essere univoci.
// - Utile per salvare configurazioni, punteggi, stati semplici del robot.