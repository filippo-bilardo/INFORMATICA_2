# Contenitori Sequenziali nella STL

In questa guida, esploreremo i contenitori sequenziali della Standard Template Library (STL), che sono strutture dati che memorizzano elementi in una sequenza lineare.

## Cosa Sono i Contenitori Sequenziali?

I contenitori sequenziali sono strutture dati che memorizzano gli elementi in una sequenza ordinata. L'ordine degli elementi è determinato dalla sequenza di inserimento e non dal valore degli elementi stessi. La STL fornisce diversi tipi di contenitori sequenziali, ciascuno con caratteristiche e casi d'uso specifici.

## Tipi di Contenitori Sequenziali

### 1. Vector (`std::vector`)

Un array dinamico che può crescere o ridursi in dimensione. Offre accesso casuale agli elementi e inserimento/rimozione efficienti alla fine.

```cpp
#include <iostream>
#include <vector>

int main() {
    // Creazione di un vettore vuoto
    std::vector<int> v1;
    
    // Creazione di un vettore con 5 elementi inizializzati a 0
    std::vector<int> v2(5);
    
    // Creazione di un vettore con 5 elementi inizializzati a 10
    std::vector<int> v3(5, 10);
    
    // Creazione di un vettore da una lista di inizializzazione (C++11)
    std::vector<int> v4 = {1, 2, 3, 4, 5};
    
    // Aggiunta di elementi alla fine
    v1.push_back(10);
    v1.push_back(20);
    
    // Accesso agli elementi
    std::cout << "Primo elemento di v1: " << v1[0] << std::endl;
    std::cout << "Secondo elemento di v1: " << v1[1] << std::endl;
    
    // Accesso sicuro con at() (lancia un'eccezione se l'indice è fuori range)
    try {
        std::cout << "Elemento a indice 5 di v1: " << v1.at(5) << std::endl;
    } catch (const std::out_of_range& e) {
        std::cout << "Eccezione: " << e.what() << std::endl;
    }
    
    // Dimensione e capacità
    std::cout << "Dimensione di v1: " << v1.size() << std::endl;
    std::cout << "Capacità di v1: " << v1.capacity() << std::endl;
    
    // Ridimensionamento
    v1.resize(5);  // Ora v1 ha 5 elementi (i nuovi sono inizializzati a 0)
    std::cout << "Dimensione di v1 dopo resize: " << v1.size() << std::endl;
    
    // Iterazione
    std::cout << "Elementi di v4: ";
    for (int num : v4) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

#### Vantaggi di `std::vector`:
- Accesso casuale in tempo costante O(1)
- Inserimento/rimozione alla fine in tempo ammortizzato costante O(1)
- Memoria contigua, che favorisce la località dei dati e le prestazioni della cache

#### Svantaggi di `std::vector`:
- Inserimento/rimozione in posizioni arbitrarie in tempo lineare O(n)
- Può richiedere riallocazioni costose quando cresce oltre la sua capacità

### 2. Deque (`std::deque`)

Un double-ended queue che permette inserimento e rimozione efficienti sia all'inizio che alla fine.

```cpp
#include <iostream>
#include <deque>

int main() {
    // Creazione di una deque vuota
    std::deque<int> d1;
    
    // Aggiunta di elementi alla fine
    d1.push_back(10);
    d1.push_back(20);
    
    // Aggiunta di elementi all'inizio
    d1.push_front(5);
    d1.push_front(1);
    
    // Accesso agli elementi
    std::cout << "Primo elemento: " << d1.front() << std::endl;
    std::cout << "Ultimo elemento: " << d1.back() << std::endl;
    std::cout << "Elemento a indice 2: " << d1[2] << std::endl;
    
    // Rimozione di elementi
    d1.pop_front();  // Rimuove il primo elemento
    d1.pop_back();   // Rimuove l'ultimo elemento
    
    // Iterazione
    std::cout << "Elementi dopo rimozione: ";
    for (int num : d1) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

#### Vantaggi di `std::deque`:
- Accesso casuale in tempo costante O(1)
- Inserimento/rimozione all'inizio e alla fine in tempo costante O(1)
- Non richiede riallocazioni quando cresce

#### Svantaggi di `std::deque`:
- Leggermente più lento di `std::vector` per l'accesso agli elementi
- Memoria non contigua, che può influire sulle prestazioni della cache
- Maggiore overhead di memoria rispetto a `std::vector`

### 3. List (`std::list`)

Una lista doppiamente collegata che permette inserimento e rimozione efficienti in qualsiasi posizione.

```cpp
#include <iostream>
#include <list>

int main() {
    // Creazione di una lista vuota
    std::list<int> l1;
    
    // Aggiunta di elementi
    l1.push_back(10);
    l1.push_back(20);
    l1.push_front(5);
    
    // Accesso agli elementi
    std::cout << "Primo elemento: " << l1.front() << std::endl;
    std::cout << "Ultimo elemento: " << l1.back() << std::endl;
    
    // Inserimento in una posizione specifica
    auto it = l1.begin();
    ++it;  // Avanza l'iteratore alla seconda posizione
    l1.insert(it, 7);  // Inserisce 7 prima della seconda posizione
    
    // Rimozione di un elemento
    it = l1.begin();
    ++it;  // Avanza l'iteratore alla seconda posizione
    l1.erase(it);  // Rimuove l'elemento alla seconda posizione
    
    // Iterazione
    std::cout << "Elementi della lista: ";
    for (int num : l1) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Ordinamento
    l1.sort();
    std::cout << "Lista ordinata: ";
    for (int num : l1) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

#### Vantaggi di `std::list`:
- Inserimento/rimozione in qualsiasi posizione in tempo costante O(1)
- Non richiede riallocazioni quando cresce
- Stabile: gli iteratori e i riferimenti rimangono validi dopo inserimenti e rimozioni

#### Svantaggi di `std::list`:
- Nessun accesso casuale (richiede tempo lineare O(n) per accedere a un elemento arbitrario)
- Maggiore overhead di memoria per i puntatori
- Prestazioni della cache inferiori a causa della memoria non contigua

### 4. Forward List (`std::forward_list`) - C++11

Una lista a collegamento singolo che permette inserimento e rimozione efficienti dopo una posizione data.

```cpp
#include <iostream>
#include <forward_list>

int main() {
    // Creazione di una forward_list vuota
    std::forward_list<int> fl1;
    
    // Aggiunta di elementi all'inizio
    fl1.push_front(10);
    fl1.push_front(5);
    fl1.push_front(1);
    
    // Accesso al primo elemento
    std::cout << "Primo elemento: " << fl1.front() << std::endl;
    
    // Inserimento dopo una posizione
    auto it = fl1.begin();  // Iteratore al primo elemento
    fl1.insert_after(it, 3);  // Inserisce 3 dopo il primo elemento
    
    // Rimozione dopo una posizione
    it = fl1.begin();
    fl1.erase_after(it);  // Rimuove l'elemento dopo il primo
    
    // Iterazione
    std::cout << "Elementi della forward_list: ";
    for (int num : fl1) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Ordinamento
    fl1.sort();
    std::cout << "Forward_list ordinata: ";
    for (int num : fl1) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

#### Vantaggi di `std::forward_list`:
- Minimo overhead di memoria tra tutti i contenitori sequenziali
- Inserimento/rimozione dopo una posizione in tempo costante O(1)
- Efficiente per attraversamenti in avanti

#### Svantaggi di `std::forward_list`:
- Nessun accesso casuale
- Nessun accesso diretto all'ultimo elemento
- Nessuna funzione `size()` (richiede tempo lineare O(n) per calcolare la dimensione)

### 5. Array (`std::array`) - C++11

Un wrapper per array a dimensione fissa con interfaccia simile a quella di altri contenitori STL.

```cpp
#include <iostream>
#include <array>

int main() {
    // Creazione di un array con 5 elementi
    std::array<int, 5> arr1 = {1, 2, 3, 4, 5};
    
    // Accesso agli elementi
    std::cout << "Primo elemento: " << arr1[0] << std::endl;
    std::cout << "Secondo elemento: " << arr1.at(1) << std::endl;
    
    // Dimensione
    std::cout << "Dimensione: " << arr1.size() << std::endl;
    
    // Iterazione
    std::cout << "Elementi dell'array: ";
    for (int num : arr1) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Accesso diretto all'array sottostante
    int* data = arr1.data();
    std::cout << "Primo elemento tramite puntatore: " << *data << std::endl;
    
    return 0;
}
```

#### Vantaggi di `std::array`:
- Dimensione fissa, nessuna allocazione dinamica
- Accesso casuale in tempo costante O(1)
- Interfaccia simile a quella di altri contenitori STL
- Memoria contigua, ottime prestazioni della cache

#### Svantaggi di `std::array`:
- Dimensione fissa, non può crescere o ridursi
- Deve essere inizializzato con una dimensione nota a tempo di compilazione

## Confronto tra Contenitori Sequenziali

| Contenitore | Accesso Casuale | Inserimento/Rimozione all'Inizio | Inserimento/Rimozione alla Fine | Inserimento/Rimozione in Mezzo | Memoria Contigua |
|-------------|-----------------|----------------------------------|----------------------------------|--------------------------------|------------------|
| vector      | O(1)            | O(n)                             | O(1) ammortizzato               | O(n)                           | Sì               |
| deque       | O(1)            | O(1)                             | O(1)                             | O(n)                           | No               |
| list        | O(n)            | O(1)                             | O(1)                             | O(1)                           | No               |
| forward_list| O(n)            | O(1)                             | O(n)                             | O(1) dopo la posizione         | No               |
| array       | O(1)            | N/A                              | N/A                              | N/A                            | Sì               |

## Quando Utilizzare Ciascun Contenitore

- **vector**: Quando hai bisogno di accesso casuale frequente e inserimenti/rimozioni principalmente alla fine.
- **deque**: Quando hai bisogno di inserimenti/rimozioni frequenti sia all'inizio che alla fine.
- **list**: Quando hai bisogno di inserimenti/rimozioni frequenti in posizioni arbitrarie.
- **forward_list**: Quando hai bisogno di inserimenti/rimozioni frequenti e la memoria è una preoccupazione.
- **array**: Quando hai bisogno di un array a dimensione fissa con l'interfaccia dei contenitori STL.

## Domande di Autovalutazione

1. Quali sono le differenze principali tra `std::vector` e `std::list`?
2. In quali situazioni è preferibile utilizzare `std::deque` rispetto a `std::vector`?
3. Quali sono i vantaggi di `std::forward_list` rispetto a `std::list`?
4. Perché `std::array` è preferibile a un array C tradizionale?
5. Come si comportano i diversi contenitori sequenziali in termini di invalidazione degli iteratori dopo inserimenti e rimozioni?

## Esercizi Proposti

1. Scrivi un programma che confronti le prestazioni di `std::vector`, `std::deque` e `std::list` per inserimenti all'inizio, alla fine e in mezzo.
2. Implementa una coda (FIFO) utilizzando `std::deque` e una pila (LIFO) utilizzando `std::vector`.
3. Scrivi una funzione che rimuova tutti gli elementi duplicati da un `std::list` senza utilizzare contenitori ausiliari.
4. Implementa un algoritmo di ordinamento per un `std::forward_list` senza utilizzare la funzione `sort()` integrata.
5. Crea un programma che utilizzi `std::array` per implementare una matrice 3x3 e calcoli il determinante.

## Conclusione

I contenitori sequenziali della STL offrono diverse opzioni per memorizzare e manipolare sequenze di elementi, ciascuna con i propri punti di forza e debolezza. La scelta del contenitore giusto dipende dalle operazioni che prevedi di eseguire più frequentemente e dalle caratteristiche di prestazione che sono più importanti per la tua applicazione. Nei prossimi capitoli, esploreremo altri tipi di contenitori e come utilizzarli efficacemente nei tuoi programmi.