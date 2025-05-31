// Esempio 2: Funzioni con Parametri e Valori di Ritorno
// In questo esempio, definiamo una funzione che accetta parametri (velocità e durata)
// e restituisce un valore (distanza percorsa approssimativa).

/**
 * Funzione per far muovere il robot in avanti con velocità e durata specificate.
 * @param velocita Percentuale di potenza dei motori (0-100).
 * @param durata Millisecondi per cui il robot si muove.
 * @returns Distanza approssimativa percorsa (valore fittizio per l'esempio).
 */
function muoviAvantiControllato(velocita: number, durata: number): number {
    brick.showString("Muovo con V:" + velocita + "% per " + durata + "ms", 4);
    brick.motorA.run(velocita);
    brick.motorB.run(velocita);
    pause(durata);
    brick.motorA.stop();
    brick.motorB.stop();
    
    // Calcolo fittizio della distanza
    let distanza = (velocita / 100) * (durata / 1000) * 10; // Esempio di calcolo
    return distanza;
}

// Programma principale
brick.showString("Esempio Funzioni Param/Ritorno", 2);

// Chiamata alla funzione con parametri specifici
let velocitaRobot = 75;
let tempoMovimento = 2000; // 2 secondi
let distanzaPercorsa = muoviAvantiControllato(velocitaRobot, tempoMovimento);

brick.showString("Distanza percorsa: " + distanzaPercorsa + " cm", 6);

pause(2000);

// Altra chiamata con parametri diversi
distanzaPercorsa = muoviAvantiControllato(30, 500);
brick.showString("Nuova distanza: " + distanzaPercorsa + " cm", 8);

brick.showString("Esecuzione completata.", 10);