// Sfida Avanzata: Gestione Input Errati e Priorità tra Sensori
// Obiettivo: Scrivi un programma che gestisca contemporaneamente più sensori (ad esempio, colore, tocco e ultrasuoni) e prenda decisioni in base a una priorità definita tra essi.
// Inoltre, il programma deve essere in grado di rilevare e gestire input errati o valori anomali provenienti dai sensori.

/*
Requisiti:
1. Definisci una priorità tra i sensori (es: 1. Tocco, 2. Ultrasuoni, 3. Colore).
2. Se più sensori rilevano una condizione "critica" nello stesso momento, il robot deve reagire seguendo la priorità stabilita.
3. Se un sensore restituisce un valore non valido (es: null, undefined, valore fuori range), il programma deve ignorare quell'input e segnalarlo sulla console.
4. Implementa almeno 3 scenari di test:
   - Solo un sensore attivo
   - Più sensori attivi contemporaneamente
   - Presenza di input errati
5. Utilizza if, else if, else e operatori logici per gestire le condizioni.
6. Commenta il codice spiegando la logica delle priorità e della gestione degli errori.

Suggerimento: Puoi simulare i valori dei sensori con variabili o funzioni random per testare il comportamento del programma.
*/

// Inizia qui il tuo codice