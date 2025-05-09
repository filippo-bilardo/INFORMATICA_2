# Guida 6: Algoritmi di Navigazione di Base

## Introduzione

La navigazione autonoma è una delle funzionalità più affascinanti e complesse della robotica. Permettere a un robot di muoversi in modo intelligente in un ambiente, evitando ostacoli e raggiungendo obiettivi, richiede algoritmi specifici. In questa guida, introdurremo alcuni concetti e algoritmi di navigazione di base applicabili al LEGO EV3 con JavaScript e MakeCode.

Ci concentreremo su strategie semplici che possono essere implementate con i sensori tipici dell'EV3 (ultrasuoni, colore, contatto).

## Contenuti della Guida

1.  **Concetti Fondamentali della Navigazione Robotica**
    *   **Localizzazione**: Sapere dove si trova il robot (difficile con solo EV3, spesso si usa l'odometria approssimativa).
    *   **Mappatura**: Creare una rappresentazione dell'ambiente (può essere implicita o esplicita).
    *   **Path Planning**: Trovare un percorso da un punto A a un punto B.
    *   **Evitamento Ostacoli**: Rilevare e aggirare ostacoli.
2.  **Odometria Semplice con i Motori EV3**
    *   Utilizzare i gradi di rotazione dei motori per stimare la distanza percorsa e le rotazioni.
    *   Limiti: slittamento delle ruote, imprecisioni dei motori.
3.  **Algoritmi di Base per l'Evitamento Ostacoli**
    *   **Random Walk (Passeggiata Casuale)**: Muoversi in avanti finché non si incontra un ostacolo, poi girare casualmente e ripetere.
    *   **Wall Following (Seguire il Muro)**: Mantenere una distanza costante da un muro (o ostacolo) usando un sensore laterale (es. ultrasuoni).
        *   Logica: se troppo vicino, allontanarsi; se troppo lontano, avvicinarsi; se alla distanza giusta, andare dritto.
    *   **Bug Algorithms (es. Bug1, Bug2)**: Algoritmi semplici per raggiungere un obiettivo in presenza di ostacoli. Generalmente combinano il movimento verso l'obiettivo con il seguire il contorno dell'ostacolo.
4.  **Navigazione Basata su Linee (Line Follower)**
    *   Utilizzare uno o più sensori di colore per seguire una linea tracciata sul pavimento.
    *   Logiche di controllo: Bang-bang (o on-off), Proporzionale (P), Proporzionale-Integrale-Derivativo (PID) - quest'ultimo più avanzato.
5.  **Raggiungimento di un Obiettivo Semplice (Goal Seeking)**
    *   Se l'obiettivo è rilevabile (es. un oggetto di un colore specifico), il robot può muoversi verso di esso.
    *   Combinazione con l'evitamento ostacoli.
6.  **Esempi Pratici per EV3 con MakeCode**
    *   Implementazione di un robot che segue un muro.
    *   Robot che esplora casualmente evitando ostacoli.
    *   Robot line follower di base.

## Esempio: Wall Follower Semplice

```javascript
// Assumiamo un sensore ultrasuoni sulla porta 4, motori B e C
const distanzaDesiderata = 15; // cm dal muro
const tolleranza = 2; // cm
const velocitaBase = 30;

brick.showString("Wall Follower", 1);

function seguiMuro() {
    let distanzaAttuale = sensors.ultrasonic4.distance();

    if (distanzaAttuale === null || distanzaAttuale < 0) {
        // Errore lettura sensore, fermati o gestisci
        motors.mediumBC.stop();
        brick.showString("Errore Sensore!", 3);
        return;
    }

    brick.showString("D: " + distanzaAttuale + "cm", 2);

    if (distanzaAttuale < distanzaDesiderata - tolleranza) {
        // Troppo vicino, gira leggermente allontanandoti dal muro (es. muro a destra, gira a sinistra)
        motors.mediumB.run(velocitaBase - 10);
        motors.mediumC.run(velocitaBase + 10);
        brick.showString("Gira Sinistra", 4);
    } else if (distanzaAttuale > distanzaDesiderata + tolleranza) {
        // Troppo lontano, gira leggermente verso il muro (es. muro a destra, gira a destra)
        motors.mediumB.run(velocitaBase + 10);
        motors.mediumC.run(velocitaBase - 10);
        brick.showString("Gira Destra", 4);
    } else {
        // Distanza corretta, vai dritto
        motors.mediumBC.run(velocitaBase);
        brick.showString("Dritto", 4);
    }
}

// Esegui la logica di wall following in un loop
loops.forever(function () {
    seguiMuro();
    loops.pause(100); // Pausa per dare tempo ai motori di reagire e al sensore di leggere
});

brick.buttonEnter.onEvent(ButtonEvent.Pressed, function() {
    motors.mediumBC.stop();
    control.programStop(); // Ferma il programma alla pressione del pulsante
});

```

## Considerazioni per MakeCode EV3

*   **Semplicità**: Gli algoritmi devono essere mantenuti relativamente semplici a causa delle limitazioni di MakeCode e della potenza di calcolo dell'EV3.
*   **Calibrazione dei Sensori**: La precisione dei sensori (specialmente quello di colore per il line following) è cruciale. Potrebbe essere necessaria una calibrazione o una buona scelta delle soglie.
*   **Ambiente Controllato**: Questi algoritmi funzionano meglio in ambienti controllati e con ostacoli ben definiti.
*   **Test Iterativi**: La navigazione richiede molti test e aggiustamenti dei parametri (velocità, angoli di sterzata, soglie dei sensori).

## Conclusione

Gli algoritmi di navigazione di base forniscono le fondamenta per creare robot EV3 che possono muoversi autonomamente nel loro ambiente. Partendo da semplici strategie come il wall following o l'evitamento ostacoli, è possibile costruire comportamenti più complessi. La chiave è comprendere i limiti dei sensori e degli attuatori e progettare algoritmi robusti ma semplici.

Questi concetti aprono la strada a progetti più ambiziosi, come robot che mappano piccole aree o che cercano oggetti specifici.

---

[Torna al README del Modulo 10](../README.md)

[Torna all'indice del corso](../../README.md)