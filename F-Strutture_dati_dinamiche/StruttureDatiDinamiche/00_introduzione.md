# Strutture Dati

## Introduzione

Le strutture dati sono modi di organizzare e memorizzare i dati per facilitarne l'accesso e la modifica. Una struttura dati è una collezione di valori, le relazioni tra di essi, e le funzioni o operazioni che possono essere applicate ai dati.

### Perché sono importanti?

1. **Efficienza**: Le strutture dati appropriate possono migliorare significativamente le prestazioni di un programma
2. **Organizzazione**: Aiutano a gestire grandi quantità di dati in modo organizzato
3. **Riutilizzo**: Forniscono soluzioni riutilizzabili per problemi di programmazione comuni
4. **Astrazione**: Permettono di pensare ai dati ad un livello più alto di astrazione

### Tipi principali di strutture dati

1. **Strutture Lineari**
   - Array: collezioni ordinate di elementi con indici numerici
   - Liste collegate: sequenze di nodi dove ogni nodo contiene dati e un riferimento al nodo successivo
   - Stack: strutture LIFO (Last-In-First-Out) che supportano operazioni push e pop
   - Code: strutture FIFO (First-In-First-Out) che supportano operazioni enqueue e dequeue
   - Liste doppiamente collegate: come le liste collegate ma con riferimenti sia al nodo successivo che al precedente
   - Deque (Double-ended queue): code che permettono inserimenti e rimozioni da entrambe le estremità

2. **Strutture Non Lineari**
   - Alberi: strutture gerarchiche con un nodo radice e sottoalberi di nodi figli
     - Alberi binari: ogni nodo ha al massimo due figli
     - Alberi AVL: alberi binari di ricerca bilanciati
     - Alberi Rosso-Neri: alberi binari di ricerca bilanciati con proprietà di colorazione
     - B-Tree: alberi bilanciati ottimizzati per sistemi di archiviazione
     - Heap: alberi binari con proprietà specifiche per priorità
   - Grafi: insiemi di nodi (vertici) e archi che connettono coppie di nodi
     - Grafi diretti e non diretti
     - Grafi pesati e non pesati
     - Grafi ciclici e aciclici
   - Tabelle hash: strutture che mappano chiavi a valori usando funzioni hash
   - Trie (Alberi dei prefissi): strutture ottimizzate per la ricerca di stringhe
   - Set e Multiset: collezioni di elementi unici o con duplicati

### Operazioni comuni

La maggior parte delle strutture dati supporta le seguenti operazioni base:

- **Inserimento**: aggiungere un nuovo elemento
- **Cancellazione**: rimuovere un elemento esistente
- **Ricerca**: trovare un elemento specifico
- **Attraversamento**: visitare tutti gli elementi in un ordine specifico
  - In-order, Pre-order, Post-order per alberi
  - BFS (Breadth-First Search) e DFS (Depth-First Search) per grafi
- **Ordinamento**: disporre gli elementi secondo un criterio
  - Quick Sort, Merge Sort, Heap Sort, ecc.
- **Fusione**: combinare due strutture dati

## Complessità computazionale

È importante considerare la complessità computazionale quando si sceglie una struttura dati:

- **Tempo**: Quanto velocemente vengono eseguite le operazioni
  - Caso migliore, caso medio, caso peggiore
- **Spazio**: Quanta memoria viene utilizzata
  - Spazio ausiliario vs spazio totale
- **Complessità**: Espressa in notazione O-grande (Big-O)
  - O(1): tempo costante
  - O(log n): tempo logaritmico
  - O(n): tempo lineare
  - O(n log n): tempo linearitmico
  - O(n²), O(n³): tempo quadratico, cubico
  - O(2ⁿ): tempo esponenziale

### Esempi di complessità

| Struttura Dati | Accesso | Ricerca | Inserimento | Cancellazione |
|----------------|---------|---------|-------------|---------------|
| Array          | O(1)    | O(n)    | O(n)        | O(n)         |
| Lista collegata| O(n)    | O(n)    | O(1)        | O(1)         |
| Albero BST     | O(h)    | O(h)    | O(h)        | O(h)         |
| Hash Table     | N/A     | O(1)    | O(1)        | O(1)         |
| Heap           | O(1)    | O(n)    | O(log n)    | O(log n)     |
| AVL Tree       | O(log n)| O(log n)| O(log n)    | O(log n)     |
| Trie           | -       | O(k)    | O(k)        | O(k)         |

Dove:
- n = numero di elementi
- h = altezza dell'albero (può essere O(log n) per alberi bilanciati o O(n) nel caso peggiore)
- k = lunghezza della chiave (per Trie)

## Applicazioni pratiche

Le strutture dati sono fondamentali in molti contesti applicativi:

1. **Database**: B-Tree e hash table per indici e ricerche efficienti
2. **Sistemi operativi**: Liste e code per gestione dei processi
3. **Reti**: Grafi per routing e connessioni
4. **Intelligenza artificiale**: Alberi per algoritmi di ricerca e decisione
5. **Compressione dati**: Heap e alberi per algoritmi come Huffman
6. **Compilatori**: Trie e tabelle hash per analisi lessicale
7. **GIS e navigazione**: Strutture spaziali come Quadtree e R-Tree

## Considerazioni sulla scelta

La scelta della struttura dati ottimale dipende da diversi fattori:

- **Frequenza delle operazioni**: quali operazioni saranno più comuni?
- **Vincoli di memoria**: quanto spazio è disponibile?
- **Prevedibilità dei dati**: i pattern di accesso sono prevedibili?
- **Requisiti di concorrenza**: la struttura sarà acceduta da più thread?
- **Persistenza**: i dati devono essere salvati su disco?

## Implementazione

Le strutture dati possono essere implementate in diversi modi:

- **Array-based**: utilizzando array sottostanti (più efficienti in spazio)
- **Pointer-based**: utilizzando puntatori e allocazione dinamica (più flessibili)
- **Ibride**: combinando approcci diversi per ottimizzare casi specifici

## Conclusione

La scelta della struttura dati giusta è fondamentale per:
- Ottimizzare le prestazioni
- Ridurre la complessità del codice
- Migliorare l'efficienza dello spazio
- Facilitare la manutenzione del codice

La padronanza delle strutture dati è una competenza essenziale per qualsiasi programmatore, poiché influenza direttamente l'efficienza, la scalabilità e la manutenibilità del software.

[INDICE](README.md)
