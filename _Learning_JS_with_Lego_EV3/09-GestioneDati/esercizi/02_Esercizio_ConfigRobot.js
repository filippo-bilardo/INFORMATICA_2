// Esercizio 02: Configurazione del Robot Tramite Oggetto
// Obiettivo: Definire un oggetto JavaScript che contenga i parametri di configurazione del robot 
// (es. velocità di movimento, velocità di rotazione, porta del sensore di colore). 
// Utilizzare questo oggetto per controllare il comportamento del robot.
//
// Dettagli:
// - Crea un oggetto `configRobot` con proprietà come `velocitaMovimento: 50`, 
//   `velocitaRotazione: 30`, `portaSensoreColore: sensors.color1`.
// - Scrivi funzioni che prendono questo oggetto di configurazione (o sue parti) 
//   come parametro per eseguire azioni (es. `muoviAvanti(config, durata)`).
// - Permetti all'utente di modificare alcuni parametri di configurazione tramite i pulsanti 
//   del brick (es. aumentare/diminuire la velocità) e aggiorna l'oggetto `configRobot` di conseguenza.
//
// Concetti da Applicare: Oggetti, passaggio di parametri, modifica di proprietà degli oggetti.
//
// TODO: Implementare la logica dell'esercizio.

brick.showString("Esercizio: Config Robot", 1);
console.log("Configurare il robot e testare le modifiche.");

// Esempio di struttura dati per la configurazione
let configRobot = {
    velocitaMovimento: 50,
    velocitaRotazione: 30,
    // Aggiungere altre configurazioni necessarie
};

// Qui andrà la logica per utilizzare e modificare la configurazione