# Guida 3: Principi OOP in JavaScript per EV3

## Introduzione

La Programmazione Orientata agli Oggetti (Object-Oriented Programming - OOP) è un paradigma di programmazione che utilizza "oggetti" – strutture dati consistenti in campi dati e metodi – e le loro interazioni per progettare applicazioni e programmi per computer. Sebbene JavaScript sia un linguaggio multi-paradigma e il suo supporto OOP sia basato sui prototipi piuttosto che sulle classi classiche (almeno prima di ES6), i principi OOP possono essere applicati efficacemente anche nella programmazione di LEGO EV3 con MakeCode per organizzare meglio il codice, renderlo più modulare e riutilizzabile.

Questa guida esplorerà i concetti base dell'OOP e come possono essere adattati all'ambiente MakeCode/JavaScript per EV3.

## Concetti Fondamentali dell'OOP

1.  **Oggetti (Objects):** Un'istanza che contiene dati (proprietà o attributi) e comportamenti (metodi). In robotica, un oggetto potrebbe rappresentare un componente fisico del robot (es. un motore, un sensore) o un concetto logico (es. un controller PID, un gestore di stato).

2.  **Classi (Classes) (o Costruttori/Prototipi in JavaScript):** Un modello o un progetto per creare oggetti. Definisce le proprietà e i metodi che tutti gli oggetti creati da quella classe avranno. In JavaScript ES5 e versioni precedenti, questo si ottiene spesso tramite funzioni costruttore e prototipi. ES6 ha introdotto la sintassi `class` che è zucchero sintattico sopra i prototipi.

3.  **Incapsulamento (Encapsulation):** Legare insieme i dati (proprietà) e i metodi che operano su quei dati all'interno di un oggetto, e nascondere lo stato interno dell'oggetto al mondo esterno. L'accesso allo stato dell'oggetto avviene tramite un'interfaccia pubblica (i suoi metodi).
    *   **Vantaggio:** Protegge i dati da modifiche accidentali e semplifica la gestione della complessità.

4.  **Astrazione (Abstraction):** Nascondere i dettagli complessi dell'implementazione e mostrare solo le funzionalità essenziali dell'oggetto. L'utente di un oggetto interagisce con esso a un livello superiore, senza doversi preoccupare di come funziona internamente.
    *   **Vantaggio:** Semplifica l'uso degli oggetti e riduce l'impatto delle modifiche interne.

5.  **Ereditarietà (Inheritance) (tramite Prototipi in JS):** Un meccanismo per cui un oggetto (o classe) può ereditare proprietà e metodi da un altro oggetto (o classe) genitore. Permette di creare gerarchie di oggetti e di riutilizzare il codice.
    *   **Vantaggio:** Promuove il riutilizzo del codice e la creazione di specializzazioni.

6.  **Polimorfismo (Polymorphism):** La capacità di oggetti di classi diverse di rispondere allo stesso messaggio (chiamata di metodo) in modi diversi, specifici per la loro classe. "Molte forme".
    *   **Vantaggio:** Permette di scrivere codice più generico e flessibile.

## Applicare OOP in MakeCode/JavaScript per EV3

L'ambiente MakeCode per EV3 potrebbe non supportare tutte le funzionalità avanzate di JavaScript ES6+ relative alle classi in modo completo o ottimizzato come un browser moderno o Node.js. Tuttavia, possiamo applicare i principi usando funzioni costruttore e prototipi, o la sintassi `class` se supportata e appropriata per la complessità.

### Esempio 1: Funzione Costruttore per un Motore Personalizzato

Supponiamo di voler creare un oggetto che rappresenti un motore con funzionalità aggiuntive o una configurazione specifica.

```javascript
// Funzione Costruttore per un Motore Personalizzato
function MotoreControllato(motorPorts, defaultSpeed) {
  // Proprietà (dati)
  this.ports = motorPorts; // es. motors.largeA o motors.largeBC
  this.velocitaDefault = defaultSpeed || 50; // Velocità di default se non specificata
  this.inFunzione = false;

  // Metodi (comportamenti)
  this.avvia = function(velocita) {
    let vel = velocita || this.velocitaDefault;
    this.ports.run(vel);
    this.inFunzione = true;
    brick.showString("Motore avv: " + vel + "%", 2);
  };

  this.ferma = function() {
    this.ports.stop();
    this.inFunzione = false;
    brick.showString("Motore fermo", 2);
  };

  this.invertiDirezione = function() {
    // Questa logica è semplificata; una vera inversione potrebbe richiedere
    // di fermare, cambiare la velocità a negativa e riavviare.
    // Per semplicità, assumiamo che run con velocità negativa funzioni.
    if (this.inFunzione) {
        let currentSpeed = this.ports.speed(); // Potrebbe non esistere un metodo diretto per ottenere la velocità corrente
                                            // in questo modo in MakeCode. Questo è concettuale.
                                            // Spesso si memorizza l'ultima velocità impostata.
        this.avvia(-this.velocitaDefault); // Esempio: riparte con velocità negativa
        brick.showString("Motore invertito", 3);
    } else {
        brick.showString("Motore non in funzione", 3);
    }
  };

  this.stato = function() {
    return this.inFunzione ? "In funzione" : "Fermo";
  };
}

// Creazione di istanze (oggetti) di MotoreControllato
let motoreSinistro = new MotoreControllato(motors.largeB, 60);
let motoreDestro = new MotoreControllato(motors.largeC, 60);

// Utilizzo degli oggetti motore
brick.showString("Test Motore OOP", 1);

motoreSinistro.avvia();
pause(1000);
motoreDestro.avvia(75);
pause(1000);

brick.showString("Stato SX: " + motoreSinistro.stato(), 4);
brick.showString("Stato DX: " + motoreDestro.stato(), 5);
pause(2000);

motoreSinistro.ferma();
motoreDestro.ferma();
pause(1000);

// motoreSinistro.invertiDirezione(); // Esempio di chiamata metodo
```

**Spiegazione:**
*   `MotoreControllato` è una funzione costruttore. Quando chiamata con `new`, crea un nuovo oggetto.
*   `this` all'interno del costruttore si riferisce all'oggetto che viene creato.
*   Proprietà come `this.ports`, `this.velocitaDefault` memorizzano lo stato del motore.
*   Funzioni assegnate a `this.nomeMetodo` diventano metodi dell'oggetto.
*   **Incapsulamento:** I dettagli su come il motore viene avviato o fermato sono nascosti all'interno dei metodi `avvia` e `ferma`. L'utente dell'oggetto non ha bisogno di conoscere i comandi specifici di `motors.largeBC.run()`.
*   **Astrazione:** L'oggetto `MotoreControllato` fornisce un'interfaccia semplice (`avvia`, `ferma`) per controllare un motore.

### Esempio 2: Utilizzo di Prototipi per Metodi Condivisi

Per risparmiare memoria, i metodi che non dipendono dallo stato specifico di ogni istanza (o che possono accedere allo stato tramite `this`) possono essere definiti sul prototipo della funzione costruttore. Tutte le istanze condivideranno quindi la stessa copia del metodo.

```javascript
function SensoreWrapper(sensorPort, nome) {
  this.port = sensorPort;
  this.nome = nome || "SensoreSconosciuto";
  this.ultimoValore = null;
}

// Aggiunta di metodi al prototipo
SensoreWrapper.prototype.leggiValore = function() {
  // Logica specifica per tipo di sensore (questo è generico)
  // In un caso reale, si avrebbe una logica diversa per ColorSensor, Ultrasonic, etc.
  if (this.port && typeof this.port.value === 'function') { // Esempio ipotetico
      this.ultimoValore = this.port.value();
  } else if (this.port && typeof this.port.distance === 'function') { // Per sensore ultrasuoni
      this.ultimoValore = this.port.distance();
  } else if (this.port && typeof this.port.light === 'function') { // Per sensore luce
      this.ultimoValore = this.port.light(LightIntensityMode.Reflected);
  } else {
      this.ultimoValore = "N/D";
  }
  return this.ultimoValore;
};

SensoreWrapper.prototype.mostraUltimoValore = function(rigaDisplay) {
  this.leggiValore(); // Assicura che il valore sia aggiornato
  brick.showString(this.nome + ": " + this.ultimoValore, rigaDisplay);
};

// Creazione istanze
let mioSensoreLuce = new SensoreWrapper(sensors.color1, "Luce");
let mioSensoreUltrasuoni = new SensoreWrapper(sensors.ultrasonic1, "Dist");

// Utilizzo
brick.showString("Test Sensori OOP", 1);

forever(function() {
    mioSensoreLuce.mostraUltimoValore(3);
    mioSensoreUltrasuoni.mostraUltimoValore(4);
    pause(500);
});
```

### Sintassi `class` (ES6) - Se Supportata

Se l'ambiente MakeCode EV3 ha un buon supporto per la sintassi `class` di ES6, l'esempio del motore potrebbe essere scritto così:

```javascript
/* // Esempio con sintassi class (verificare supporto in MakeCode)
class RobotComponente {
    constructor(nome) {
        this.nomeComponente = nome;
    }

    getNome() {
        return this.nomeComponente;
    }

    diagnostica() {
        log("Diagnostica per: " + this.nomeComponente);
        // Logica di diagnostica comune
    }
}

class MotoreEsteso extends RobotComponente { // Ereditarietà
    constructor(nome, motorPorts, defaultSpeed) {
        super(nome); // Chiama il costruttore della classe genitore
        this.ports = motorPorts;
        this.velocitaDefault = defaultSpeed || 50;
        this.inFunzione = false;
    }

    avvia(velocita) {
        let vel = velocita || this.velocitaDefault;
        this.ports.run(vel);
        this.inFunzione = true;
        log(this.getNome() + " avviato a " + vel + "%");
    }

    ferma() {
        this.ports.stop();
        this.inFunzione = false;
        log(this.getNome() + " fermato.");
    }

    // Override del metodo diagnostica (Polimorfismo)
    diagnostica() {
        super.diagnostica(); // Chiama il metodo della classe base
        log("Stato motore " + this.nomeComponente + ": " + (this.inFunzione ? "ON" : "OFF"));
    }
}

function log(messaggio) { // Semplice funzione di log per l'esempio
    brick.showString(messaggio, नेक्स्टLogRiga());
}

let logLine = 2;
function nextLogLine() { if (logLine > 8) logLine = 2; return logLine++; }

let motoreAvanzato = new MotoreEsteso("Motore Principale", motors.largeA, 70);
motoreAvanzato.avvia();
pause(1000);
motoreAvanzato.diagnostica();
pause(1000);
motoreAvanzato.ferma();
*/
```
**Nota sulla sintassi `class`:** La sua disponibilità e il comportamento esatto (specialmente per funzionalità avanzate come `super()` in contesti complessi o getter/setter) dovrebbero essere verificati specificamente per l'ambiente MakeCode EV3 che si sta utilizzando. Per progetti più semplici o per garantire massima compatibilità, le funzioni costruttore e i prototipi sono un approccio più sicuro.

## Vantaggi dell'OOP per Progetti EV3

*   **Organizzazione del Codice:** Raggruppare la logica relativa a un componente specifico (es. un braccio robotico con i suoi motori e sensori) in un unico oggetto o classe.
*   **Riusabilità:** Una classe `SensoreGenerico` o `MotorePID` può essere riutilizzata in diversi progetti o per controllare più istanze dello stesso tipo di componente.
*   **Manutenibilità:** Le modifiche a un componente sono localizzate all'interno della sua classe/oggetto, riducendo il rischio di rompere altre parti del codice.
*   **Astrazione:** Si può interagire con un `RobotArm` tramite metodi come `prendiOggetto()` o `posizionaA(x, y)` senza preoccuparsi dei singoli movimenti dei motori.

## Limitazioni e Considerazioni

*   **Overhead:** Per compiti molto semplici, l'introduzione di OOP potrebbe aggiungere un overhead non necessario. Valuta la complessità del tuo progetto.
*   **Complessità di JavaScript OOP:** L'OOP basata sui prototipi di JavaScript può essere meno intuitiva per chi proviene da linguaggi basati su classi classiche (come Java o C#), sebbene la sintassi `class` di ES6 mitighi questo aspetto.
*   **Debug:** Il debug di catene di prototipi o di `this` binding può talvolta essere più complesso.
*   **Prestazioni:** In ambienti con risorse molto limitate, la creazione di molti oggetti potrebbe avere un impatto sulle prestazioni, ma per la maggior parte degli scenari EV3 con MakeCode, questo non è un problema primario se l'OOP è usata giudiziosamente.

## Conclusione

Applicare i principi della Programmazione Orientata agli Oggetti, anche in forma semplificata usando funzioni costruttore e prototipi, può migliorare significativamente la struttura, la leggibilità e la manutenibilità dei tuoi programmi JavaScript per LEGO EV3. Inizia con oggetti semplici per rappresentare componenti o concetti chiave del tuo robot e gradualmente introduci più struttura OOP man mano che la complessità del progetto cresce.

---

[Torna al README del Modulo 10](../README.md)

[Torna all'indice del corso](../../README.md)