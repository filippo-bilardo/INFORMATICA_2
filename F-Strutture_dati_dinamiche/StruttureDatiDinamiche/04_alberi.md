# Alberi

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Grafi](05_grafi.md)

## Introduzione
Un albero è una struttura dati gerarchica non lineare composta da nodi collegati tra loro. A differenza delle strutture dati lineari come array, liste concatenate, pile e code, gli alberi sono utilizzati per rappresentare dati con relazioni gerarchiche.

Ogni albero ha un nodo speciale chiamato "radice" che è il primo nodo dell'albero. Tutti gli altri nodi sono raggiungibili dalla radice attraverso un percorso unico. I nodi che non hanno figli sono chiamati "foglie".

## Terminologia degli Alberi

- **Nodo**: Elemento base dell'albero che contiene dati e riferimenti ai nodi figli
- **Radice**: Il nodo superiore dell'albero, da cui partono tutti gli altri nodi
- **Genitore**: Un nodo che ha uno o più nodi figli
- **Figlio**: Un nodo che ha un nodo genitore
- **Foglia**: Un nodo che non ha figli
- **Sottoalbero**: Un albero costituito da un nodo e tutti i suoi discendenti
- **Livello**: La distanza di un nodo dalla radice (la radice è al livello 0)
- **Altezza dell'albero**: Il livello massimo di qualsiasi nodo nell'albero
- **Grado di un nodo**: Il numero di figli di un nodo
- **Grado dell'albero**: Il grado massimo di qualsiasi nodo nell'albero

## Tipi di Alberi

1. **Albero Binario**: Ogni nodo ha al massimo due figli, comunemente chiamati figlio sinistro e figlio destro
2. **Albero Binario di Ricerca (BST)**: Un albero binario in cui il valore di ogni nodo è maggiore di tutti i valori nel suo sottoalbero sinistro e minore di tutti i valori nel suo sottoalbero destro
3. **Albero AVL**: Un albero binario di ricerca auto-bilanciante in cui la differenza di altezza tra i sottoalberi sinistro e destro di ogni nodo non può essere più di uno
4. **Albero Rosso-Nero**: Un albero binario di ricerca auto-bilanciante con un bit extra per nodo che indica il colore (rosso o nero)
5. **Albero B**: Un albero di ricerca bilanciato progettato per essere efficiente su sistemi di archiviazione
6. **Heap**: Un albero binario completo in cui ogni nodo è maggiore (o minore) di tutti i suoi figli

## Operazioni di Base

- **Inserimento**: Aggiunta di un nuovo nodo all'albero
- **Cancellazione**: Rimozione di un nodo dall'albero
- **Ricerca**: Trovare un nodo specifico nell'albero
- **Attraversamento**: Visita di ogni nodo nell'albero
  - Pre-ordine: Radice, Sinistra, Destra
  - In-ordine: Sinistra, Radice, Destra
  - Post-ordine: Sinistra, Destra, Radice
  - Attraversamento in ampiezza (BFS): Livello per livello

## Vantaggi

- Rappresentazione gerarchica dei dati
- Operazioni di ricerca, inserimento e cancellazione efficienti (per alberi bilanciati)
- Flessibilità nella rappresentazione di relazioni complesse

## Svantaggi

- Più complessi da implementare rispetto alle strutture dati lineari
- Possono diventare sbilanciati, portando a prestazioni degradate
- Consumo di memoria maggiore a causa dei puntatori

## Applicazioni

- Strutture di file e directory nei sistemi operativi
- Database (indici B-tree)
- Compressione dei dati (alberi di Huffman)
- Algoritmi di routing
- Espressioni aritmetiche e sintassi nei compilatori
- Algoritmi di intelligenza artificiale (alberi di decisione, minimax)

## Implementazioni

- [Implementazione in C](c_binary_tree.c)
- [Implementazione in C++](cpp_binary_tree.cpp)

---

[INDICE](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Grafi](05_grafi.md)

## Complessità Temporale (per Alberi Binari di Ricerca)

| Operazione | Caso Medio | Caso Peggiore |
|-----------|------------|---------------|
| Accesso    | O(log n)   | O(n)          |
| Ricerca    | O(log n)   | O(n)          |
| Inserimento | O(log n)   | O(n)          |
| Cancellazione | O(log n) | O(n)          |

Nota: Per alberi bilanciati come AVL e Rosso-Nero, la complessità nel caso peggiore è garantita essere O(log n).

## Esercizi

1. Implementare un albero binario con le seguenti operazioni:
   - Inserimento
   - Cancellazione
   - Ricerca
   - Attraversamento (pre-ordine, in-ordine, post-ordine)

2. Implementare un albero binario di ricerca e verificare che mantenga la proprietà di ordinamento.

3. Implementare una funzione per trovare l'altezza di un albero binario.

4. Implementare una funzione per contare il numero di nodi in un albero binario.

5. Implementare una funzione per verificare se due alberi binari sono identici.

6. Implementare una funzione per trovare il percorso dalla radice a un nodo specifico.

7. Implementare un algoritmo per bilanciare un albero binario di ricerca sbilanciato.