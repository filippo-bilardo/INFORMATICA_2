# Pile (Stack)

[INDICE](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md) | [Grafi](05_grafi.md)

## Introduzione
Una pila (stack) è una struttura dati lineare che segue il principio Last In First Out (LIFO). Questo significa che l'ultimo elemento aggiunto alla pila sarà il primo ad essere rimosso. Si può pensare ad essa come ad una pila di piatti - si può prendere solo il piatto in cima, e si può aggiungere un nuovo piatto solo in cima.

## Operazioni di Base

- **Push**: Aggiungere un elemento in cima alla pila
- **Pop**: Rimuovere l'elemento in cima alla pila
- **Peek/Top**: Visualizzare l'elemento in cima senza rimuoverlo
- **isEmpty**: Verificare se la pila è vuota
- **isFull**: Verificare se la pila è piena (per implementazioni basate su array)
- **Size**: Ottenere il numero di elementi nella pila

## Implementazioni

1. **Implementazione basata su Array**: Utilizza un array per memorizzare gli elementi con una variabile per tenere traccia della cima della pila.
2. **Implementazione basata su Lista Concatenata**: Utilizza una lista concatenata dove la testa della lista rappresenta la cima della pila.

## Vantaggi

- Semplice e facile da implementare
- Operazioni efficienti (complessità temporale O(1) per push, pop e peek)
- Efficiente in termini di memoria (nessun overhead per i puntatori nell'implementazione con array)

## Svantaggi

- Dimensione limitata nell'implementazione con array
- Dimensione dinamica ma memoria extra per i puntatori nell'implementazione con lista concatenata

## Applicazioni

- Gestione delle chiamate di funzione (call stack)
- Valutazione e conversione di espressioni (da infissa a postfissa)
- Meccanismi di annullamento negli editor di testo
- Algoritmi di backtracking
- Cronologia del browser (funzionalità del pulsante indietro)
- Analisi sintattica nei compilatori

## Complessità Temporale

| Operazione | Complessità Temporale |
|-----------|------------------|
| Push      | O(1)             |
| Pop       | O(1)             |
| Peek      | O(1)             |
| isEmpty   | O(1)             |
| isFull    | O(1)             |
| Size      | O(1)             |

## Implementazioni

- [Implementazione in C](c_stack.c)
- [Implementazione in C++](cpp_stack.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md) | [Grafi](05_grafi.md)

## Esercizi

1. Implementare una pila utilizzando un array con le seguenti operazioni:
   - Push
   - Pop
   - Peek
   - isEmpty
   - isFull

2. Implementare una pila utilizzando una lista concatenata con le stesse operazioni.

3. Utilizzare una pila per verificare se le parentesi in un'espressione sono bilanciate.

4. Implementare una funzione per invertire una stringa utilizzando una pila.

5. Implementare una funzione per convertire un'espressione infissa in un'espressione postfissa.

6. Implementare una funzione per valutare un'espressione postfissa.

7. Implementare due pile in un singolo array con il minimo spazio sprecato.