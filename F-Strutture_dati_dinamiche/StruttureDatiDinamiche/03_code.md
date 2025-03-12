# Code (Queue)

[INDICE](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Alberi](04_alberi.md) | [Grafi](05_grafi.md)

## Introduzione
Una coda è una struttura dati lineare che segue il principio First In First Out (FIFO). Questo significa che il primo elemento aggiunto alla coda sarà il primo ad essere rimosso. Si può pensare ad essa come ad una fila di persone in attesa di un servizio - la prima persona che si unisce alla fila è la prima ad essere servita.

## Operazioni di Base

- **Enqueue**: Aggiungere un elemento alla fine della coda
- **Dequeue**: Rimuovere l'elemento frontale dalla coda
- **Front/Peek**: Visualizzare l'elemento frontale senza rimuoverlo
- **isEmpty**: Verificare se la coda è vuota
- **isFull**: Verificare se la coda è piena (per implementazioni basate su array)
- **Size**: Ottenere il numero di elementi nella coda

## Implementazioni

1. **Implementazione basata su Array**: Utilizza un array per memorizzare gli elementi con variabili per tenere traccia del fronte e del retro della coda.
   - Implementazione con Array Semplice: Inefficiente a causa dello spostamento degli elementi dopo il dequeue
   - Coda Circolare: Implementazione efficiente che riutilizza lo spazio

2. **Implementazione basata su Lista Concatenata**: Utilizza una lista concatenata dove la testa rappresenta il fronte e la coda rappresenta il retro della coda.

## Vantaggi

- Struttura dati semplice e intuitiva
- Operazioni efficienti (complessità temporale O(1) per enqueue e dequeue nelle implementazioni appropriate)
- Utile per la gestione delle risorse e la pianificazione

## Svantaggi

- Dimensione limitata nell'implementazione con array
- Memoria extra per i puntatori nell'implementazione con lista concatenata
- Le code a dimensione fissa possono portare a overflow o underflow

## Applicazioni

- Scheduling della CPU nei sistemi operativi
- Gestione delle interruzioni nei sistemi in tempo reale
- Sistemi telefonici dei call center
- Gestione delle code di stampa
- Algoritmo di ricerca in ampiezza (BFS) nei grafi
- Code di messaggi nei sistemi di comunicazione
- Buffer per dispositivi come la tastiera

## Tipi di Code

1. **Coda Semplice**: Coda FIFO standard
2. **Coda Circolare**: Collega la fine all'inizio per riutilizzare gli spazi vuoti
3. **Coda di Priorità**: Gli elementi vengono serviti in base alla loro priorità piuttosto che all'ordine di arrivo
4. **Coda a Doppia Estremità (Deque)**: Gli elementi possono essere aggiunti o rimossi da entrambe le estremità

## Implementazioni

- [Implementazione in C](c_queue.c)
- [Implementazione in C++](cpp_queue.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Alberi](04_alberi.md) | [Grafi](05_grafi.md)

## Complessità Temporale

| Operazione | Coda basata su Array | Coda basata su Lista Concatenata |
|-----------|-------------------|-------------------------|
| Enqueue   | O(1)              | O(1)                    |
| Dequeue   | O(1)*             | O(1)                    |
| Front     | O(1)              | O(1)                    |
| isEmpty   | O(1)              | O(1)                    |
| isFull    | O(1)              | N/A                     |
| Size      | O(1)              | O(1)**                  |

*O(1) per la coda circolare, O(n) per l'implementazione con array semplice a causa dello spostamento
**O(1) se la dimensione è mantenuta come variabile, O(n) se calcolata mediante attraversamento

## Esercizi

1. Implementare una coda utilizzando un array con le seguenti operazioni:
   - Enqueue
   - Dequeue
   - Front
   - isEmpty
   - isFull

2. Implementare una coda circolare utilizzando un array per superare il limite dell'implementazione con array semplice.

3. Implementare una coda utilizzando una lista concatenata con le stesse operazioni.

4. Implementare una coda di priorità dove gli elementi con priorità più alta vengono rimossi per primi.

5. Implementare una coda a doppia estremità (deque) che permette l'inserimento e la cancellazione ad entrambe le estremità.

6. Utilizzare una coda per implementare un algoritmo di ricerca in ampiezza per un grafo.

7. Implementare una coda per simulare uno scenario reale come una coda di stampa o una coda di call center.