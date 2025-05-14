// Esempio 06: Sequenze di Movimento con Array
// Descrizione: Come utilizzare un array per memorizzare una sequenza di comandi di movimento
// e poi eseguirla sul robot EV3.

// Pulisci il display per iniziare
brick.clearScreen();
brick.showString("Esempio Sequenze", 1);
brick.showString("di Movimento", 2);
pause(2000);

// Definiamo una sequenza di movimenti come un array di oggetti.
// Ogni oggetto rappresenta un passo della sequenza con parametri specifici.
const sequenzaMovimenti = [
    { tipo: "avanti", velocita: 50, durataMs: 2000 },       // Vai avanti per 2 secondi
    { tipo: "giraDestra", velocita: 30, gradi: 90 },        // Gira a destra di 90 gradi
    { tipo: "avanti", velocita: 60, durataMs: 1500 },       // Vai avanti per 1.5 secondi
    { tipo: "giraSinistra", velocita: 30, gradi: 90 },      // Gira a sinistra di 90 gradi
    { tipo: "suono", frequenza: 440, durataMs: 500 },       // Emetti un suono
    { tipo: "pausa", durataMs: 1000 }                       // Fermati per 1 secondo
];

// Funzione per eseguire un singolo passo della sequenza
function eseguiPasso(passo) {
    // Mostra sul display cosa stiamo eseguendo
    brick.clearScreen();
    brick.showString("Eseguo: " + passo.tipo, 1);
    
    // Gestiamo i diversi tipi di passo
    switch (passo.tipo) {
        case "avanti":
            // Mostra parametri sul display
            brick.showString("Vel: " + passo.velocita, 2);
            brick.showString("Tempo: " + passo.durataMs + "ms", 3);
            
            // Imposta la velocità dei motori
            motors.largeBC.setSpeed(passo.velocita);
            // Avvia i motori
            motors.largeBC.run();
            // Attendi per la durata specificata
            pause(passo.durataMs);
            // Ferma i motori
            motors.largeBC.stop();
            break;
            
        case "indietro":
            brick.showString("Vel: " + passo.velocita, 2);
            brick.showString("Tempo: " + passo.durataMs + "ms", 3);
            
            // Per andare indietro, impostiamo una velocità negativa
            motors.largeBC.setSpeed(-passo.velocita);
            motors.largeBC.run();
            pause(passo.durataMs);
            motors.largeBC.stop();
            break;
            
        case "giraDestra":
            brick.showString("Vel: " + passo.velocita, 2);
            brick.showString("Gradi: " + passo.gradi, 3);
            
            // Per girare a destra, un motore va avanti e l'altro indietro
            motors.largeB.setSpeed(passo.velocita);
            motors.largeC.setSpeed(-passo.velocita);
            motors.largeBC.run();
            
            // Il tempo di rotazione dipende dai gradi da ruotare
            // Questa è una stima approssimativa, in pratica andrebbe calibrata
            let tempoDiRotazione = (passo.gradi / 90) * 1000; // 1 secondo per 90 gradi
            pause(tempoDiRotazione);
            
            motors.largeBC.stop();
            break;
            
        case "giraSinistra":
            brick.showString("Vel: " + passo.velocita, 2);
            brick.showString("Gradi: " + passo.gradi, 3);
            
            // Per girare a sinistra, invertiamo i motori rispetto a "giraDestra"
            motors.largeB.setSpeed(-passo.velocita);
            motors.largeC.setSpeed(passo.velocita);
            motors.largeBC.run();
            
            let tempoDiRotazioneSx = (passo.gradi / 90) * 1000;
            pause(tempoDiRotazioneSx);
            
            motors.largeBC.stop();
            break;
            
        case "suono":
            brick.showString("Freq: " + passo.frequenza + "Hz", 2);
            brick.showString("Durata: " + passo.durataMs + "ms", 3);
            
            // Riproduci un tono alla frequenza specificata
            music.playTone(passo.frequenza, passo.durataMs);
            break;
            
        case "pausa":
            brick.showString("Durata: " + passo.durataMs + "ms", 2);
            
            // Semplicemente attendiamo per la durata specificata
            pause(passo.durataMs);
            break;
            
        default:
            brick.showString("Tipo sconosciuto!", 2);
    }
}

// Mostra un countdown prima di iniziare
brick.clearScreen();
brick.showString("Inizio sequenza in:", 1);
for (let i = 3; i > 0; i--) {
    brick.showString(i.toString(), 2);
    music.playTone(440, 200);
    pause(800);
}

brick.clearScreen();
brick.showString("Esecuzione sequenza", 1);
brick.showString("in corso...", 2);
pause(1000);

// Esegui la sequenza completa di movimenti
for (let i = 0; i < sequenzaMovimenti.length; i++) {
    // Mostra quale passo stiamo per eseguire
    brick.clearScreen();
    brick.showString("Passo " + (i+1) + "/" + sequenzaMovimenti.length, 1);
    pause(500);
    
    // Esegui il passo corrente
    eseguiPasso(sequenzaMovimenti[i]);
    
    // Breve pausa tra un passo e l'altro
    pause(500);
}

// Comunica il completamento della sequenza
brick.clearScreen();
brick.showString("Sequenza completata!", 1);
music.playSoundEffect(SoundEffect.Success);
pause(2000);

// Mostra un messaggio a scorrimento
brick.clearScreen();
for (let i = 0; i < 5; i++) {
    let posizione = 16 - (i * 4); // Inizia fuori dallo schermo e sposta verso sinistra
    if (posizione < 0) posizione = 0;
    brick.showString("Array per", 1, posizione);
    brick.showString("Sequenze di Movimento", 2, posizione);
    pause(300);
}

pause(2000);
brick.clearScreen();
