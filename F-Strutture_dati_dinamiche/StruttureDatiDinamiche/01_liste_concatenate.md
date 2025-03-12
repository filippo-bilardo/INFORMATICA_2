# Liste Concatenate

[INDICE](README.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md) | [Grafi](05_grafi.md)

## Introduzione
Una lista concatenata è una struttura dati lineare in cui gli elementi sono memorizzati in nodi. Ogni nodo contiene dati e un riferimento (o collegamento) al nodo successivo nella sequenza. A differenza degli array, le liste concatenate non hanno una dimensione fissa e possono crescere o ridursi dinamicamente durante l'esecuzione del programma.

## Tipi di Liste Concatenate

1. **Lista Concatenata Semplice**: Ogni nodo punta al nodo successivo nella sequenza.
2. **Lista Concatenata Doppia**: Ogni nodo ha due puntatori, uno che punta al nodo successivo e un altro che punta al nodo precedente.
3. **Lista Concatenata Circolare**: L'ultimo nodo punta al primo nodo, formando un cerchio.

## Operazioni di Base

- **Inserimento**: Aggiunta di un nuovo nodo alla lista
  - All'inizio (testa)
  - Alla fine (coda)
  - In una posizione specifica

- **Cancellazione**: Rimozione di un nodo dalla lista
  - Dall'inizio
  - Dalla fine
  - Da una posizione specifica

- **Attraversamento**: Visita di ogni nodo nella lista

- **Ricerca**: Trovare un nodo specifico nella lista

## Vantaggi

- Dimensione dinamica
- Inserimenti e cancellazioni efficienti
- Nessuno spreco di memoria

## Svantaggi

- Accesso casuale non consentito (è necessario attraversare dall'inizio)
- Memoria extra per i puntatori
- Non ottimale per la cache a causa dell'allocazione di memoria non contigua

## Applicazioni

- Implementazione di pile (stack) e code
- Tabelle dei simboli nei compilatori
- Allocazione dinamica della memoria
- Rappresentazione di matrici sparse
- Implementazione di grafi (liste di adiacenza)

## Implementazioni

- [Implementazione in C](01_c_linked_list.c)
- [Implementazione in C++](01_cpp_linked_list.cpp)

## Complessità Temporale

| Operazione | Complessità Temporale |
|-----------|------------------|
| Accesso    | O(n)             |
| Ricerca    | O(n)             |
| Inserimento | O(1)*            |
| Cancellazione | O(1)*          |

*Assumendo che abbiamo un riferimento al nodo da eliminare o alla posizione in cui deve essere effettuato l'inserimento.

## Implementazione in C++

L'implementazione in C++ utilizza i puntatori intelligenti (`std::shared_ptr`) per gestire automaticamente la memoria, evitando perdite di memoria e semplificando il codice.

### Classe Node

```cpp
class Node {
public:
    int data;                  // Dati memorizzati nel nodo
    std::shared_ptr<Node> next; // Puntatore al nodo successivo
    
    // Costruttore
    Node(int val) : data(val), next(nullptr) {}
};
```

La classe `Node` rappresenta un singolo nodo nella lista concatenata. Contiene:
- Un campo `data` per memorizzare il valore intero
- Un puntatore intelligente `next` che punta al nodo successivo
- Un costruttore che inizializza il nodo con un valore e imposta il puntatore `next` a `nullptr`

### Classe LinkedList

```cpp
class LinkedList {
private:
    std::shared_ptr<Node> head; // Puntatore al primo nodo della lista
    
public:
    // Costruttore
    LinkedList() : head(nullptr) {}
    
    // Metodi per le operazioni sulla lista
    // ...
};
```

La classe `LinkedList` gestisce la lista concatenata. Contiene:
- Un puntatore `head` privato che punta al primo nodo della lista
- Un costruttore che inizializza la lista vuota
- Vari metodi per operare sulla lista

### Operazioni Principali

#### 1. Inserimento all'inizio

```cpp
void insertAtBeginning(int data) {
    std::shared_ptr<Node> newNode = std::make_shared<Node>(data);
    newNode->next = head;
    head = newNode;
}
```

Questo metodo:
1. Crea un nuovo nodo con il valore fornito
2. Imposta il puntatore `next` del nuovo nodo al nodo attualmente in testa
3. Aggiorna il puntatore `head` per puntare al nuovo nodo

#### 2. Inserimento alla fine

```cpp
void insertAtEnd(int data) {
    std::shared_ptr<Node> newNode = std::make_shared<Node>(data);
    
    // Se la lista è vuota
    if (head == nullptr) {
        head = newNode;
        return;
    }
    
    // Attraversa fino alla fine della lista
    std::shared_ptr<Node> current = head;
    while (current->next != nullptr) {
        current = current->next;
    }
    
    // Collega il nuovo nodo alla fine
    current->next = newNode;
}
```

Questo metodo:
1. Crea un nuovo nodo con il valore fornito
2. Se la lista è vuota, imposta il nuovo nodo come `head`
3. Altrimenti, attraversa la lista fino all'ultimo nodo
4. Collega il nuovo nodo all'ultimo nodo

#### 3. Inserimento in una posizione specifica

```cpp
void insertAtPosition(int data, int position) {
    // Se la posizione è 0, inserisci all'inizio
    if (position == 0) {
        insertAtBeginning(data);
        return;
    }
    
    std::shared_ptr<Node> newNode = std::make_shared<Node>(data);
    std::shared_ptr<Node> current = head;
    int i = 0;
    
    // Attraversa fino alla posizione - 1
    while (current != nullptr && i < position - 1) {
        current = current->next;
        i++;
    }
    
    // Se la posizione è oltre la fine della lista
    if (current == nullptr) {
        std::cout << "Posizione fuori intervallo!" << std::endl;
        return;
    }
    
    // Inserisci il nuovo nodo
    newNode->next = current->next;
    current->next = newNode;
}
```

Questo metodo:
1. Se la posizione è 0, chiama `insertAtBeginning`
2. Altrimenti, crea un nuovo nodo e attraversa la lista fino al nodo in posizione `position - 1`
3. Se la posizione è valida, inserisce il nuovo nodo
4. Altrimenti, mostra un messaggio di errore

#### 4. Cancellazione dall'inizio

```cpp
void deleteFromBeginning() {
    if (head == nullptr) {
        std::cout << "Lista vuota!" << std::endl;
        return;
    }
    
    head = head->next;
}
```

Questo metodo:
1. Verifica se la lista è vuota
2. Aggiorna il puntatore `head` per puntare al secondo nodo

#### 5. Cancellazione dalla fine

```cpp
void deleteFromEnd() {
    if (head == nullptr) {
        std::cout << "Lista vuota!" << std::endl;
        return;
    }
    
    // Se c'è solo un nodo
    if (head->next == nullptr) {
        head = nullptr;
        return;
    }
    
    // Attraversa fino al penultimo nodo
    std::shared_ptr<Node> current = head;
    while (current->next->next != nullptr) {
        current = current->next;
    }
    
    // Elimina l'ultimo nodo
    current->next = nullptr;
}
```

Questo metodo:
1. Verifica se la lista è vuota
2. Se c'è solo un nodo, imposta `head` a `nullptr`
3. Altrimenti, attraversa la lista fino al penultimo nodo
4. Imposta il puntatore `next` del penultimo nodo a `nullptr`

#### 6. Cancellazione da una posizione specifica

```cpp
void deleteFromPosition(int position) {
    if (head == nullptr) {
        std::cout << "Lista vuota!" << std::endl;
        return;
    }
    
    // Se la posizione è 0, elimina dall'inizio
    if (position == 0) {
        deleteFromBeginning();
        return;
    }
    
    std::shared_ptr<Node> current = head;
    int i = 0;
    
    // Attraversa fino alla posizione - 1
    while (current != nullptr && i < position - 1) {
        current = current->next;
        i++;
    }
    
    // Se la posizione è oltre la fine della lista o il nodo successivo è NULL
    if (current == nullptr || current->next == nullptr) {
        std::cout << "Posizione fuori intervallo!" << std::endl;
        return;
    }
    
    // Elimina il nodo in posizione
    current->next = current->next->next;
}
```

Questo metodo:
1. Verifica se la lista è vuota
2. Se la posizione è 0, chiama `deleteFromBeginning`
3. Altrimenti, attraversa la lista fino al nodo in posizione `position - 1`
4. Se la posizione è valida, elimina il nodo
5. Altrimenti, mostra un messaggio di errore

#### 7. Ricerca di un elemento

```cpp
int search(int key) {
    std::shared_ptr<Node> current = head;
    int position = 0;
    
    while (current != nullptr) {
        if (current->data == key) {
            return position;  // Restituisce la posizione se trovato
        }
        current = current->next;
        position++;
    }
    
    return -1;  // Restituisce -1 se non trovato
}
```

Questo metodo:
1. Attraversa la lista nodo per nodo
2. Se trova un nodo con il valore cercato, restituisce la sua posizione
3. Se non trova il valore, restituisce -1

#### 8. Visualizzazione della lista

```cpp
void display() {
    if (head == nullptr) {
        std::cout << "Lista vuota!" << std::endl;
        return;
    }
    
    std::shared_ptr<Node> current = head;
    std::cout << "Lista Concatenata: ";
    while (current != nullptr) {
        std::cout << current->data << " -> ";
        current = current->next;
    }
    std::cout << "NULL" << std::endl;
}
```

Questo metodo:
1. Verifica se la lista è vuota
2. Attraversa la lista nodo per nodo
3. Stampa il valore di ogni nodo seguito da una freccia
4. Termina con "NULL" per indicare la fine della lista

## Differenze tra l'implementazione in C e C++

L'implementazione in C++ differisce da quella in C principalmente per l'uso dei puntatori intelligenti (`std::shared_ptr`), che gestiscono automaticamente la memoria. Questo elimina la necessità di liberare manualmente la memoria, riducendo il rischio di perdite di memoria.

In C, è necessario:
1. Allocare manualmente la memoria con `malloc`
2. Liberare manualmente la memoria con `free`
3. Gestire esplicitamente i puntatori

In C++, i puntatori intelligenti:
1. Allocano automaticamente la memoria
2. Liberano automaticamente la memoria quando non è più necessaria
3. Semplificano la gestione dei puntatori

## Esercizi

1. Implementare una lista concatenata semplice con le seguenti operazioni:
   - Inserimento all'inizio
   - Inserimento alla fine
   - Cancellazione da una posizione specifica
   - Ricerca di un elemento
   - Visualizzazione della lista

2. Implementare una lista concatenata doppia e confrontare le sue prestazioni con una lista concatenata semplice.

3. Rilevare un ciclo in una lista concatenata.

4. Invertire una lista concatenata in modo iterativo e ricorsivo.

5. Trovare l'elemento centrale di una lista concatenata in un solo passaggio.

---

[Torna al README](README.md) | [Pile (Stack)](02_pile.md) | [Code (Queue)](03_code.md) | [Alberi](04_alberi.md) | [Grafi](05_grafi.md)