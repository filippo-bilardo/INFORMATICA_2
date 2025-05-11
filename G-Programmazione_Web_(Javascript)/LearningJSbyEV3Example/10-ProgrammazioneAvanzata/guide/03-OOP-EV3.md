# Guida 3: Programmazione Orientata agli Oggetti (OOP) con EV3

## Introduzione alla OOP

La Programmazione Orientata agli Oggetti (Object-Oriented Programming - OOP) è un paradigma di programmazione che utilizza "oggetti" – istanze di classi – per progettare applicazioni e programmi informatici. La OOP si basa su diversi concetti chiave:

1.  **Classi (Classes)**: Modelli o " progetti" per creare oggetti. Una classe definisce le proprietà (attributi) e i comportamenti (metodi) che tutti gli oggetti creati da essa avranno.
2.  **Oggetti (Objects)**: Istanze di una classe. Ogni oggetto ha il proprio stato (i valori dei suoi attributi) ma condivide i comportamenti definiti dalla sua classe.
3.  **Incapsulamento (Encapsulation)**: Raggruppare i dati (attributi) e i metodi che operano su quei dati all'interno di un'unica unità (un oggetto). Nasconde i dettagli interni di un oggetto e protegge i dati da accessi esterni non autorizzati.
4.  **Ereditarietà (Inheritance)**: Permette a una classe (sottoclasse o classe derivata) di ereditare attributi e metodi da un'altra classe (superclasse o classe base). Questo promuove il riutilizzo del codice e la creazione di gerarchie di classi.
5.  **Polimorfismo (Polymorphism)**: Letteralmente "molte forme". Permette a oggetti di classi diverse di rispondere allo stesso messaggio (chiamata di metodo) in modi specifici per la loro classe. Spesso si realizza tramite l'override di metodi.

JavaScript, pur essendo un linguaggio basato su prototipi, supporta i concetti della OOP, specialmente con le sintassi introdotte in ES6 (ECMAScript 2015) che rendono più familiare la definizione di classi e l'ereditarietà.

## Perché Usare la OOP con EV3?

Anche se MakeCode per EV3 è fortemente basato su blocchi e un approccio funzionale/procedurale, l'applicazione dei principi OOP può portare benefici significativi, specialmente in progetti più grandi e complessi:

*   **Organizzazione del Codice**: Raggruppare la logica relativa a componenti specifici del robot (es. un braccio meccanico, un sistema di navigazione) in classi dedicate.
*   **Modularità e Riusabilità**: Creare classi per sensori o attuatori personalizzati che possono essere riutilizzate in diversi progetti o parti dello stesso progetto.
*   **Astrazione**: Nascondere la complessità di basso livello dell'hardware EV3 dietro interfacce di classe più semplici.
*   **Gestione della Complessità**: Suddividere un problema complesso in oggetti più piccoli e gestibili che interagiscono tra loro.

## Definire Classi in JavaScript (ES6+) per MakeCode

MakeCode supporta la sintassi delle classi ES6. Vediamo come definire una classe semplice.

### Esempio: Una Classe `MotoreControllato`

Supponiamo di voler creare una classe che gestisca un motore EV3 con funzionalità aggiuntive, come il controllo della velocità con rampe o il conteggio delle rotazioni.

```javascript
class MotoreControllato {
    // Costruttore della classe
    constructor(portaMotore, velocitaDefault) {
        this.porta = portaMotore; // es. motors.largeA
        this.velocita = velocitaDefault;
        this.rotazioniTotali = 0;

        // Inizializza il motore (esempio)
        this.porta.setRegulated(true);
        this.porta.setSpeedRegulation(true);
        brick.showString(`Motore ${this.porta.port()} init`, 5);
    }

    // Metodo per avviare il motore
    avvia(velocita) {
        if (velocita !== undefined) {
            this.velocita = velocita;
        }
        this.porta.run(this.velocita);
        brick.showString(`Motore ${this.porta.port()} ON V:${this.velocita}`, 6);
    }

    // Metodo per fermare il motore
    ferma() {
        this.porta.stop();
        // Potremmo voler leggere le rotazioni qui se il motore le traccia
        // this.rotazioniTotali += this.porta.angle() / 360; // Esempio approssimativo
        brick.showString(`Motore ${this.porta.port()} OFF`, 6);
    }

    // Metodo per impostare una nuova velocità
    setVelocita(nuovaVelocita) {
        this.velocita = nuovaVelocita;
        if (this.porta.isRunning()) {
            this.porta.run(this.velocita); // Applica subito se in movimento
        }
    }

    // Metodo per ottenere le rotazioni (semplificato)
    getRotazioni() {
        // Questo è un esempio, la lettura precisa delle rotazioni
        // richiede di resettare l'angolo o di tracciarlo continuamente.
        return this.porta.angle() / 360;
    }

    // Metodo per muovere per un certo numero di gradi
    muoviGradi(gradi, velocita) {
        let vel = velocita !== undefined ? velocita : this.velocita;
        brick.showString(`Muovo ${gradi} deg`, 7);
        this.porta.run(vel, gradi, MoveUnit.Degrees);
        // Il blocco run con gradi è sincrono, attende il completamento
        // this.rotazioniTotali += gradi / 360;
    }
}

// --- Utilizzo della Classe ---

// Creazione di istanze (oggetti) della classe MotoreControllato
let motoreSinistro = new MotoreControllato(motors.largeB, 50);
let motoreDestro = new MotoreControllato(motors.largeC, 50);

pause(2000); // Pausa per vedere i messaggi di init

// Utilizzo dei metodi degli oggetti
motoreSinistro.avvia(60);
motoreDestro.avvia(60);

pause(3000); // Lascia i motori accesi per 3 secondi

motoreSinistro.setVelocita(30);
// motoreDestro rimane a 60

pause(2000);

motoreSinistro.ferma();
motoreDestro.ferma();

pause(1000);

motoreDestro.muoviGradi(720, 40); // Fai 2 rotazioni
brick.showString(`Rot DX: ${motoreDestro.getRotazioni().toFixed(2)}`, 8);

```

### Spiegazione dell'Esempio:

1.  **`class MotoreControllato { ... }`**: Definisce la classe.
2.  **`constructor(portaMotore, velocitaDefault)`**: Il costruttore viene chiamato quando si crea un nuovo oggetto con `new MotoreControllato(...)`. Inizializza le proprietà dell'oggetto (`this.porta`, `this.velocita`, ecc.).
    *   `this` si riferisce all'istanza corrente dell'oggetto.
3.  **Metodi (`avvia`, `ferma`, `setVelocita`, `getRotazioni`, `muoviGradi`)**: Funzioni definite all'interno della classe che operano sui dati dell'oggetto. Possono accedere alle proprietà dell'oggetto usando `this`.
4.  **Creazione di Oggetti**: `let motoreSinistro = new MotoreControllato(motors.largeB, 50);` crea una nuova istanza della classe `MotoreControllato`, passando `motors.largeB` e `50` al costruttore. `motoreSinistro` è ora un oggetto.
5.  **Utilizzo dei Metodi**: `motoreSinistro.avvia(60);` chiama il metodo `avvia` sull'oggetto `motoreSinistro`.

## Ereditarietà in JavaScript per EV3

L'ereditarietà permette di creare una nuova classe che è una versione specializzata di una classe esistente.

### Esempio: Classe `MotoreConSensore` che Eredita da `MotoreControllato`

Supponiamo di voler un motore che si ferma automaticamente se un sensore (es. di tocco) viene attivato.

```javascript
// Assumendo che la classe MotoreControllato sia definita come sopra

class MotoreConSensore extends MotoreControllato {
    constructor(portaMotore, velocitaDefault, sensoreDiStop, portaSensore) {
        // Chiama il costruttore della classe base (MotoreControllato)
        super(portaMotore, velocitaDefault);

        this.sensore = sensoreDiStop; // es. sensors.touch1
        this.portaSensoreNumero = portaSensore; // es. 1, per messaggi

        // Registra un evento per fermare il motore se il sensore è premuto
        // Nota: la gestione degli eventi deve essere fatta con attenzione al contesto di 'this'
        // Usiamo una arrow function per mantenere il 'this' della classe MotoreConSensore
        this.sensore.onEvent(ButtonEvent.Pressed, () => {
            if (this.porta.isRunning()) {
                brick.showString(`Sens ${this.portaSensoreNumero} STOP MOT ${this.porta.port()}`, 4);
                this.ferma(); // Chiama il metodo ferma() ereditato (o sovrascritto)
                brick.sound(Sound.PlayStop);
            }
        });
        brick.showString(`Motore ${this.porta.port()} con Sens ${this.portaSensoreNumero}`, 5);
    }

    // Possiamo sovrascrivere metodi della classe base (Polimorfismo)
    avvia(velocita) {
        brick.showString(`Avvio MotoreSens ${this.porta.port()}`, 6);
        super.avvia(velocita); // Chiama il metodo avvia() della classe base
        // Aggiungi logica specifica per MotoreConSensore, se necessario
    }

    // Aggiungere nuovi metodi specifici per questa sottoclasse
    controllaSensoreManualmente() {
        if (this.sensore.isPressed()) {
            brick.showString("Sensore premuto manualmente!", 7);
            return true;
        }
        return false;
    }
}

// --- Utilizzo della Classe Derivata ---

// Assicurati che la classe MotoreControllato sia definita prima

let motoreSpeciale = new MotoreConSensore(motors.largeA, 40, sensors.touch1, 1);

pause(2000);

motoreSpeciale.avvia(50);

// Il motore si fermerà automaticamente se premi il sensore di tocco sulla porta 1
// Lasciamo il programma in esecuzione per testare
brick.showString("Premi Touch1 per fermare A", 8);

// Dopo un po', possiamo fermarlo anche programmaticamente
loops.pause(10000); // Attendi 10 secondi o la pressione del sensore
if (motoreSpeciale.porta.isRunning()) {
    motoreSpeciale.ferma();
    brick.showString("Fermato da programma", 8);
}

```

### Spiegazione dell'Ereditarietà:

1.  **`class MotoreConSensore extends MotoreControllato`**: Dichiara che `MotoreConSensore` è una sottoclasse di `MotoreControllato`.
2.  **`super(portaMotore, velocitaDefault)`**: Nel costruttore della sottoclasse, `super()` chiama il costruttore della superclasse (`MotoreControllato`). È necessario farlo prima di usare `this`.
3.  **Ereditarietà dei Metodi**: `MotoreConSensore` eredita tutti i metodi di `MotoreControllato` (come `ferma`, `setVelocita`).
4.  **Sovrascrittura (Override)**: Il metodo `avvia` è stato ridefinito in `MotoreConSensore`. La chiamata `super.avvia(velocita)` permette di eseguire l'implementazione originale del metodo `avvia` della superclasse.
5.  **Nuovi Metodi**: `controllaSensoreManualmente` è un nuovo metodo aggiunto specificamente a `MotoreConSensore`.
6.  **Gestione Eventi e `this`**: Nell' `onEvent` del sensore, `() => { ... }` (arrow function) è usata per assicurare che `this` all'interno del gestore dell'evento si riferisca all'istanza di `MotoreConSensore`, e non all'oggetto evento o a un contesto globale.

## Incapsulamento e Polimorfismo

*   **Incapsulamento**: Nell'esempio `MotoreControllato`, le proprietà come `this.porta` e `this.velocita` sono direttamente accessibili. In JavaScript puro, l'incapsulamento si ottiene spesso per convenzione (es. prefisso `_` per indicare proprietà private) o usando costrutti più avanzati come le chiusure (closures) o i campi privati delle classi (con `#`, supportati nelle versioni più recenti di JS, da verificare la compatibilità con l'ambiente MakeCode).
    L'idea è che l'utente della classe dovrebbe interagire con l'oggetto principalmente attraverso i suoi metodi pubblici (`avvia`, `ferma`), non manipolando direttamente le sue proprietà interne, se non necessario.

*   **Polimorfismo**: Se avessimo un array di oggetti `MotoreControllato` e `MotoreConSensore`, potremmo chiamare `oggettoMotore.avvia()` su ciascuno. Ogni oggetto eseguirebbe la sua versione specifica del metodo `avvia`.

    ```javascript
    // let motori = [new MotoreControllato(motors.largeD, 30), new MotoreConSensore(motors.largeA, 40, sensors.touch1, 1)];
    // motori.forEach(m => m.avvia()); // Ogni motore usa la sua implementazione di avvia()
    ```

## Quando e Come Usare OOP in Progetti EV3

*   **Componenti Complessi**: Se hai un sottosistema del robot con molti stati e comportamenti (es. un braccio articolato, un sistema di pinze, un modulo di scansione ambientale), una classe può aiutare a organizzarlo.
*   **Astrazione Hardware**: Se vuoi fornire un'interfaccia più semplice o di più alto livello per un sensore o un attuatore standard.
*   **Comportamenti Riutilizzabili**: Se hai comportamenti che si ripetono per diversi motori o sensori, una classe base e sottoclassi possono ridurre la duplicazione del codice.
*   **Non Esagerare**: Per script semplici o comportamenti lineari, la OOP potrebbe essere un eccesso di complessità. Valuta se i benefici superano i costi di implementazione.

## Limitazioni e Considerazioni in MakeCode

*   **Ambiente Basato su Blocchi**: MakeCode è primariamente orientato ai blocchi. Mentre il codice JavaScript sottostante supporta la OOP, l'integrazione visuale potrebbe non essere sempre diretta per concetti OOP avanzati.
*   **Performance**: La creazione di molti oggetti o gerarchie di classi complesse potrebbe avere un impatto sulle performance su un hardware limitato come l'EV3, sebbene per la maggior parte degli usi tipici questo non sia un problema significativo.
*   **Debugging**: Il debugging di codice OOP può richiedere una comprensione del flusso di chiamate tra oggetti e metodi.

## Conclusione

La Programmazione Orientata agli Oggetti offre strumenti potenti per strutturare e gestire la complessità nei progetti di robotica con EV3, anche all'interno dell'ambiente MakeCode/JavaScript. Utilizzando classi, ereditarietà e polimorfismo, puoi scrivere codice più modulare, riutilizzabile e facile da mantenere. Inizia con classi semplici per rappresentare componenti del tuo robot e gradualmente esplora concetti più avanzati man mano che i tuoi progetti crescono in complessità.

---

[Torna all'elenco delle Guide](./README.md)

[Torna al Modulo 10](../README.md)

[Torna alla Home del Corso](../../README.md)