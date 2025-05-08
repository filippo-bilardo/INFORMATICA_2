/**
 * File: 04_ArrowFunctions.js
 * Descrizione: Esempi di utilizzo delle arrow functions in JavaScript per EV3
 * Corso: Learning JavaScript by Lego EV3 Example
 */

// ==========================================
// ESEMPIO 1: Sintassi Base delle Arrow Functions
// ==========================================

// Funzione tradizionale
function somma(a, b) {
    return a + b;
}

// Equivalente con arrow function
let sommaArrow = (a, b) => {
    return a + b;
};

// Versione ancora più concisa con return implicito
let sommaArrowConcisa = (a, b) => a + b;

// ==========================================
// ESEMPIO 2: Arrow Functions con un Solo Parametro
// ==========================================

// Con un solo parametro, le parentesi sono opzionali
let quadrato = x => x * x;

// Con le parentesi (sempre valido)
let cubo = (x) => x * x * x;

// ==========================================
// ESEMPIO 3: Arrow Functions Senza Parametri
// ==========================================

// Senza parametri, le parentesi vuote sono obbligatorie
let saluta = () => {
    brick.showString("Ciao da arrow function!", 1);
    pause(2000);
};

// Lettura sensore come arrow function
let leggiDistanza = () => sensors.ultrasonic4.distance();

// ==========================================
// ESEMPIO 4: Arrow Functions in Callback
// ==========================================

// Array di velocità per diverse fasi di una missione
let velocitaMissione = [20, 50, 30, 70, 10];

// Funzione che utilizza forEach con arrow function
function dimostrazioneForeach() {
    brick.showString("forEach con arrow", 1);
    
    // Utilizzo di arrow function come callback in forEach
    velocitaMissione.forEach((velocita, indice) => {
        brick.showValue("Indice", indice, 2);
        brick.showValue("Velocità", velocita, 3);
        
        motors.largeAB.steer(0, velocita);
        pause(1000);
    });
    
    motors.largeAB.stop();
}

// ==========================================
// ESEMPIO 5: Arrow Functions e This
// ==========================================

// Oggetto robot con metodi
let robot = {
    nome: "EV3Explorer",
    velocitaBase: 50,
    
    // Metodo tradizionale che utilizza 'this'
    pattugliaTradizionale: function() {
        brick.showString(`${this.nome} in pattuglia`, 1);
        brick.showValue("Velocità", this.velocitaBase, 2);
        
        motors.largeAB.steer(0, this.velocitaBase);
        pause(2000);
        motors.largeAB.stop();
    },
    
    // Non usare arrow function come metodo se hai bisogno di this!
    pattugliaSbagliata: () => {
        // 'this' qui non si riferisce all'oggetto robot, ma al contesto esterno
        brick.showString(`${this.nome} in pattuglia`, 1); // Non funzionerà come previsto
        motors.largeAB.steer(0, 50);
        pause(2000);
        motors.largeAB.stop();
    },
    
    // Uso corretto di arrow function all'interno di un metodo tradizionale
    eseguiPattuglia: function() {
        brick.showString(`${this.nome} inizia pattuglia`, 1);
        
        // Qui 'this' si riferisce correttamente all'oggetto robot
        motors.largeAB.steer(0, this.velocitaBase);
        
        // Simula un'operazione asincrona con setTimeout
        // L'arrow function mantiene il 'this' dell'oggetto robot
        setTimeout(() => {
            brick.showString(`${this.nome} fine pattuglia`, 1);
            motors.largeAB.stop();
        }, 3000);
    }
};

// ==========================================
// ESEMPIO 6: Arrow Functions con Metodi di Array
// ==========================================

// Array di letture di distanza
let letture = [45, 32, 12, 67, 89, 23, 10, 5, 78];

function elaboraLetture() {
    brick.showString("Elaborazione letture", 1);
    
    // Filtra solo le letture che indicano una distanza ravvicinata usando arrow function
    let ostacoliVicini = letture.filter(distanza => distanza < 20);
    brick.showValue("Ostacoli vicini", ostacoliVicini.length, 2);
    
    // Usa map per trasformare le letture in valori di velocità
    let velocitaSicure = letture.map(distanza => {
        if (distanza < 10) return 0;
        if (distanza < 30) return distanza;
        return 70;
    });
    
    // Mostra alcune velocità calcolate
    for (let i = 0; i < 3 && i < velocitaSicure.length; i++) {
        brick.showValue(`Vel ${i}`, velocitaSicure[i], 3 + i);
    }
    
    // Trova la velocità massima sicura usando reduce con arrow function
    let velocitaMax = velocitaSicure.reduce((max, val) => Math.max(max, val), 0);
    brick.showValue("Velocità max", velocitaMax, 6);
}

// ==========================================
// ESEMPIO 7: Forever con Arrow Function
// ==========================================

function monitoraggioSensori() {
    brick.showString("Monitoraggio con arrow", 1);
    brick.showString("Premere per fermare", 2);
    
    // Crea un ID per il monitoraggio
    let monitoraggioAttivo = true;
    
    // Implementa il monitoraggio con forever e arrow function
    forever(() => {
        if (!monitoraggioAttivo) return;
        
        let distanza = leggiDistanza();
        let luce = sensors.color1.light();
        
        brick.showValue("Distanza", distanza, 3);
        brick.showValue("Luce", luce, 4);
        
        // Cambia colore dello status light in base alla distanza
        if (distanza < 15) {
            brick.setStatusLight(StatusLight.RedFlash);
        } else {
            brick.setStatusLight(StatusLight.Green);
        }
        
        // Controlla se l'utente vuole interrompere
        if (brick.buttonEnter.isPressed()) {
            monitoraggioAttivo = false;
            brick.setStatusLight(StatusLight.Off);
            brick.showString("Monitoraggio fermato", 5);
        }
        
        pause(100);
    });
    
    // Aspetta che l'utente prema il pulsante per fermare
    while (monitoraggioAttivo) {
        pause(100);
    }
}

// ==========================================
// ESEMPIO 8: Programmazione Funzionale con Arrow Functions
// ==========================================

// Genera una sequenza di movimenti usando tecniche di programmazione funzionale
function generaSequenzaMovimenti() {
    brick.showString("Sequenza con arrows", 1);
    
    // Crea un array di numeri da 0 a 9
    let sequenza = Array.from({ length: 10 }, (_, i) => i);
    
    // Trasforma i numeri in comandi per il robot
    let comandi = sequenza.map(num => {
        if (num % 3 === 0) {
            return { tipo: "avanti", durata: 1000 };
        } else if (num % 3 === 1) {
            return { tipo: "destra", gradi: 90 };
        } else {
            return { tipo: "sinistra", gradi: 90 };
        }
    });
    
    // Esegui i primi 5 comandi
    comandi.slice(0, 5).forEach((comando, i) => {
        brick.showValue("Comando", i + 1, 2);
        brick.showString(`Tipo: ${comando.tipo}`, 3);
        
        // Esegui il comando
        if (comando.tipo === "avanti") {
            motors.largeAB.steer(0, 50);
            pause(comando.durata);
            motors.largeAB.stop();
        } else if (comando.tipo === "destra") {
            motors.largeC.run(30, comando.gradi / 90, MoveUnit.Rotations);
            pause(500);
        } else if (comando.tipo === "sinistra") {
            motors.largeC.run(-30, comando.gradi / 90, MoveUnit.Rotations);
            pause(500);
        }
        
        pause(500);
    });
}

// ==========================================
// FUNZIONE PRINCIPALE
// ==========================================

function main() {
    brick.showString("Demo arrow functions", 1);
    brick.showString("Premere per iniziare", 2);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Demo 1: Sintassi base
    brick.showString("Demo 1: Sintassi base", 1);
    let risultato1 = somma(5, 3);
    let risultato2 = sommaArrow(5, 3);
    let risultato3 = sommaArrowConcisa(5, 3);
    
    brick.showValue("somma", risultato1, 2);
    brick.showValue("sommaArrow", risultato2, 3);
    brick.showValue("sommaArrowConcisa", risultato3, 4);
    pause(3000);
    
    // Demo 2 e 3: Arrow con un solo parametro o senza parametri
    brick.showString("Demo 2-3: Arrow semplici", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    let val1 = quadrato(4);
    let val2 = cubo(3);
    brick.showValue("quadrato(4)", val1, 1);
    brick.showValue("cubo(3)", val2, 2);
    
    saluta();
    let distanza = leggiDistanza();
    brick.showValue("Distanza letta", distanza, 3);
    pause(2000);
    
    // Demo 4: Arrow Functions in Callback
    brick.showString("Demo 4: Arrow in callback", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    dimostrazioneForeach();
    pause(1000);
    
    // Demo 5: Arrow Functions e This
    brick.showString("Demo 5: Arrow e this", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    // Usa metodo tradizionale con 'this'
    robot.pattugliaTradizionale();
    pause(1000);
    
    // Usa metodo con arrow function interna
    robot.eseguiPattuglia();
    pause(4000);  // Attendi che l'operazione asincrona completi
    
    // Demo 6: Arrow Functions con Metodi di Array
    brick.showString("Demo 6: Arrow con array", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    elaboraLetture();
    pause(4000);
    
    // Demo 7: Forever con Arrow Function
    brick.showString("Demo 7: Forever con arrow", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    monitoraggioSensori();
    pause(1000);
    
    // Demo 8: Programmazione Funzionale con Arrow Functions
    brick.showString("Demo 8: Prog. funzionale", 1);
    brick.buttonEnter.pauseUntil(ButtonEvent.Pressed);
    brick.clearScreen();
    
    generaSequenzaMovimenti();
    pause(1000);
    
    // Conclusione
    brick.clearScreen();
    brick.showString("Demo completata!", 1);
}

// Avvia il programma principale
main();