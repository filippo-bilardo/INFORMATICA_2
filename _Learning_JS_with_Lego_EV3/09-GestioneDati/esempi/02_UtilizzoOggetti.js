// Esempio 02: Utilizzo degli Oggetti in JavaScript per EV3

brick.showString("Esempio Oggetti", 1);

// 1. Creazione di un Oggetto
// Gli oggetti sono collezioni di coppie chiave-valore (proprietà).
// Le chiavi sono stringhe (o simboli), i valori possono essere di qualsiasi tipo.

let robot = {
  nome: "EV3Bot",
  colore: "Grigio/Rosso",
  ruote: 4,
  sensori: ["Colore", "Ultrasuoni", "Tocco"],
  attivo: true,
  posizione: {
    x: 0,
    y: 0
  }
};

brick.showString("Oggetto 'robot' creato", 3);
pause(1000);

// 2. Accesso alle Proprietà dell'Oggetto
// Si può accedere alle proprietà usando la notazione punto (.) o la notazione parentesi quadre ([]).

brick.showString("Nome: " + robot.nome, 4); // Notazione punto
brick.showString("Colore: " + robot['colore'], 5); // Notazione parentesi quadre
pause(2000);

// Accesso a proprietà annidate
brick.showString("Posizione X: " + robot.posizione.x, 6);
pause(1000);

// 3. Modifica delle Proprietà
robot.attivo = false;
robot.posizione.x = 10;
robot['colore'] = "Nero";

brick.showString("Attivo: " + robot.attivo, 4);
brick.showString("Nuova Pos X: " + robot.posizione.x, 5);
brick.showString("Nuovo Colore: " + robot.colore, 6);
pause(2000);

// 4. Aggiungere Nuove Proprietà
robot.velocita = 50; // Aggiunge la proprietà 'velocita'
robot['batteria'] = 95.5; // Aggiunge la proprietà 'batteria'

brick.showString("Velocità: " + robot.velocita, 7);
brick.showString("Batteria: " + robot.batteria + "%", 8);
pause(2000);

// 5. Rimuovere Proprietà
// L'operatore 'delete' rimuove una proprietà da un oggetto.
delete robot.ruote;

// Tentare di accedere a una proprietà rimossa restituisce 'undefined'
brick.showString("Ruote: " + robot.ruote, 9); // Mostrerà 'undefined' o un errore a seconda dell'ambiente MakeCode
pause(2000);

// Pulizia display
for(let i=3; i < 10; i++) brick.showString("                     ", i);

// 6. Metodi negli Oggetti
// Le proprietà possono anche essere funzioni (chiamate metodi).
let calcolatrice = {
  operando1: 0,
  operando2: 0,
  somma: function() {
    return this.operando1 + this.operando2;
  },
  impostaValori: function(a, b) {
    this.operando1 = a;
    this.operando2 = b;
  }
};

calcolatrice.impostaValori(5, 7);
let risultatoSomma = calcolatrice.somma();
brick.showString("Calc: 5+7 = " + risultatoSomma, 3);
pause(2000);

// 7. Iterare sulle Proprietà di un Oggetto
// Il ciclo 'for...in' itera sulle chiavi enumerabili di un oggetto.
brick.showString("Proprietà del robot:", 4);
let riga = 5;
for (let chiave in robot) {
  // È buona pratica verificare se la proprietà appartiene direttamente all'oggetto
  // e non è ereditata dal prototipo (anche se meno critico in MakeCode semplice).
  if (robot.hasOwnProperty(chiave)) {
    // Per visualizzare valori complessi (oggetti, array) potremmo aver bisogno di JSON.stringify
    // ma MakeCode potrebbe non supportarlo pienamente o avere alternative.
    // Qui mostriamo solo la chiave per semplicità.
    if (riga < 12) { // Limita le righe usate sul display EV3
        let valore = robot[chiave];
        if (typeof valore === 'object') {
            brick.showString(chiave + ": [obj/arr]", riga++);
        } else {
            brick.showString(chiave + ": " + valore, riga++);
        }
        pause(500);
    }
  }
}
pause(2000);

// Esempio: Oggetto per configurazione sensore
let configSensoreColore = {
  porta: sensors.color1,
  modalita: LightIntensityMode.Reflected,
  sogliaLuce: 45,
  valoreAttuale: 0,
  leggiValore: function() {
    this.valoreAttuale = this.porta.light(this.modalita);
    return this.valoreAttuale;
  },
  sopraSoglia: function() {
    return this.leggiValore() > this.sogliaLuce;
  }
};

// Pulizia display
for(let i=3; i < 12; i++) brick.showString("                     ", i);

brick.showString("Test Sensore Colore Obj", 3);
configSensoreColore.leggiValore();
brick.showString("Valore: " + configSensoreColore.valoreAttuale, 4);
pause(1000);
if (configSensoreColore.sopraSoglia()) {
  brick.showString("Luce intensa rilevata", 5);
} else {
  brick.showString("Luce debole rilevata", 5);
}
pause(2000);

brick.showString("Fine Esempio Oggetti", 1);

// Nota: La gestione di oggetti complessi e la prototipazione avanzata
// potrebbero essere limitate o comportarsi diversamente in MakeCode per EV3
// rispetto a un ambiente JavaScript standard.