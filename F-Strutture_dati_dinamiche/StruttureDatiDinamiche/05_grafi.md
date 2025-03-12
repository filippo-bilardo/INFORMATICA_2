# Grafi

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Introduzione
Un grafo è una struttura dati non lineare che consiste in un insieme di nodi (o vertici) e un insieme di archi che collegano coppie di nodi. I grafi sono utilizzati per rappresentare relazioni tra oggetti e sono ampiamente applicati in vari campi dell'informatica e della matematica.

A differenza degli alberi, i grafi possono contenere cicli e non hanno necessariamente una struttura gerarchica. Un nodo in un grafo può essere collegato a qualsiasi altro nodo, creando una rete di connessioni.

## Terminologia dei Grafi

- **Nodo/Vertice**: Elemento base del grafo che rappresenta un'entità
- **Arco/Spigolo**: Connessione tra due nodi che rappresenta una relazione
- **Grafo Diretto**: Grafo in cui gli archi hanno una direzione (da un nodo a un altro)
- **Grafo Non Diretto**: Grafo in cui gli archi non hanno direzione (la connessione è bidirezionale)
- **Grafo Pesato**: Grafo in cui ogni arco ha un peso o costo associato
- **Grafo Non Pesato**: Grafo in cui gli archi non hanno pesi
- **Percorso**: Sequenza di nodi collegati da archi
- **Ciclo**: Percorso che inizia e termina nello stesso nodo
- **Grado di un Nodo**: Numero di archi collegati al nodo
- **Grafo Connesso**: Grafo in cui esiste un percorso tra ogni coppia di nodi
- **Componente Connessa**: Sottoinsieme massimale di nodi in cui esiste un percorso tra ogni coppia di nodi
- **Albero Ricoprente**: Sottoinsieme di archi che forma un albero e include tutti i nodi del grafo

## Rappresentazioni dei Grafi

1. **Matrice di Adiacenza**: Matrice bidimensionale dove l'elemento (i, j) è 1 se esiste un arco dal nodo i al nodo j, altrimenti è 0
2. **Lista di Adiacenza**: Array di liste dove ogni lista contiene i nodi adiacenti a un nodo specifico
3. **Matrice di Incidenza**: Matrice bidimensionale dove le righe rappresentano i nodi e le colonne rappresentano gli archi

## Operazioni di Base

- **Aggiunta di un Nodo**: Inserimento di un nuovo nodo nel grafo
- **Aggiunta di un Arco**: Creazione di una connessione tra due nodi
- **Rimozione di un Nodo**: Eliminazione di un nodo e di tutti gli archi ad esso collegati
- **Rimozione di un Arco**: Eliminazione di una connessione tra due nodi
- **Attraversamento**: Visita di ogni nodo nel grafo
  - Ricerca in Ampiezza (BFS): Esplora i nodi livello per livello
  - Ricerca in Profondità (DFS): Esplora un percorso fino alla fine prima di tornare indietro

## Algoritmi Comuni sui Grafi

1. **Algoritmo di Dijkstra**: Trova il percorso più breve da un nodo a tutti gli altri in un grafo pesato con pesi non negativi
2. **Algoritmo di Bellman-Ford**: Trova il percorso più breve da un nodo a tutti gli altri, anche in presenza di pesi negativi
3. **Algoritmo di Floyd-Warshall**: Trova i percorsi più brevi tra tutte le coppie di nodi
4. **Algoritmo di Kruskal**: Trova l'albero ricoprente minimo in un grafo pesato
5. **Algoritmo di Prim**: Altro algoritmo per trovare l'albero ricoprente minimo
6. **Ordinamento Topologico**: Ordina i nodi di un grafo diretto aciclico in modo che per ogni arco (u, v), u viene prima di v nell'ordinamento
7. **Algoritmo di Tarjan**: Trova le componenti fortemente connesse in un grafo diretto

## Vantaggi

- Flessibilità nella rappresentazione di relazioni complesse
- Modellazione di problemi del mondo reale
- Base per molti algoritmi importanti

## Svantaggi

- Complessità di implementazione
- Consumo di memoria potenzialmente elevato
- Alcuni algoritmi sui grafi hanno complessità temporale elevata

## Applicazioni

- Reti sociali (amicizie, connessioni)
- Reti di trasporto (strade, voli)
- Internet e reti di computer
- Sistemi di raccomandazione
- Analisi di dipendenze in software
- Pianificazione e scheduling
- Riconoscimento di pattern
- Sistemi di navigazione GPS

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve in un grafo pesato.

6. Implementare l'algoritmo di Kruskal o Prim per trovare l'albero ricoprente minimo.

7. Implementare un algoritmo per verificare se un grafo è bipartito.

8. Utilizzare i grafi per risolvere un problema pratico, come la pianificazione di un percorso o l'analisi di una rete sociale.

## Implementazioni

- [Implementazione in C](c_graph.c)
- [Implementazione in C++](cpp_graph.cpp)

---

[Torna al README](README.md) | [Liste Concatenate](01_liste_concatenate.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md)

## Complessità Temporale

| Operazione | Matrice di Adiacenza | Lista di Adiacenza |
|-----------|---------------------|--------------------|
| Aggiunta di un Nodo | O(V²) | O(1) |
| Aggiunta di un Arco | O(1) | O(1) |
| Rimozione di un Nodo | O(V²) | O(V + E) |
| Rimozione di un Arco | O(1) | O(E) |
| Verifica Adiacenza | O(1) | O(V) |
| BFS/DFS | O(V²) | O(V + E) |

Dove V è il numero di vertici (nodi) e E è il numero di archi.

## Esercizi

1. Implementare un grafo utilizzando una matrice di adiacenza con le seguenti operazioni:
   - Aggiunta di un nodo
   - Aggiunta di un arco
   - Rimozione di un nodo
   - Rimozione di un arco
   - Verifica se due nodi sono adiacenti

2. Implementare un grafo utilizzando una lista di adiacenza con le stesse operazioni.

3. Implementare l'algoritmo di ricerca in ampiezza (BFS) per trovare il percorso più breve tra due nodi.

4. Implementare l'algoritmo di ricerca in profondità (DFS) e utilizzarlo per rilevare cicli in un grafo.

5. Implementare l'algoritmo di Dijkstra per trovare il percorso più breve