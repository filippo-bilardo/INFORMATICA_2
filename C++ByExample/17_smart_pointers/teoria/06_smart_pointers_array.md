# Smart Pointers con Array in C++

In questa guida, esploreremo come utilizzare gli smart pointers per gestire array dinamici in C++, una funzionalità importante per garantire la corretta deallocazione degli array allocati dinamicamente.

## Gestione degli Array con Smart Pointers

Quando si lavora con array allocati dinamicamente in C++, è importante ricordare che la deallocazione deve avvenire utilizzando `delete[]` invece di `delete`. Gli smart pointers standard possono essere configurati per gestire correttamente gli array.

## unique_ptr con Array

`std::unique_ptr` può essere specializzato per gli array utilizzando la sintassi `std::unique_ptr<T[]>`. Questa specializzazione utilizza automaticamente `delete[]` invece di `delete` quando l'oggetto viene deallocato.

```cpp
#include <iostream>
#include <memory>

int main() {
    // Creazione di un unique_ptr per un array di interi
    std::unique_ptr<int[]> arrayPtr(new int[5]);
    
    // Inizializzazione degli elementi
    for (int i = 0; i < 5; ++i) {
        arrayPtr[i] = i * 10;
    }
    
    // Accesso agli elementi
    for (int i = 0; i < 5; ++i) {
        std::cout << "arrayPtr[" << i << "] = " << arrayPtr[i] << std::endl;
    }
    
    // L'array verrà deallocato automaticamente con delete[] quando arrayPtr esce dallo scope
    return 0;
}
```

### make_unique per Array (C++14)

A partire da C++14, è possibile utilizzare `std::make_unique` anche per gli array, specificando la dimensione dell'array:

```cpp
#include <iostream>
#include <memory>

int main() {
    // Creazione di un unique_ptr per un array di interi con make_unique
    auto arrayPtr = std::make_unique<int[]>(5);
    
    // Inizializzazione e utilizzo come prima
    for (int i = 0; i < 5; ++i) {
        arrayPtr[i] = i * 10;
    }
    
    for (int i = 0; i < 5; ++i) {
        std::cout << "arrayPtr[" << i << "] = " << arrayPtr[i] << std::endl;
    }
    
    return 0;
}
```

### Limitazioni di unique_ptr con Array

È importante notare alcune limitazioni quando si utilizza `unique_ptr` con array:

1. Non è possibile utilizzare i metodi `get_deleter()` o `release()` con la specializzazione per array.
2. Non è possibile inizializzare gli elementi dell'array durante la creazione con `make_unique`.
3. Non è possibile utilizzare `unique_ptr<T[]>` con tipi incompleti.

## shared_ptr con Array

A differenza di `unique_ptr`, `std::shared_ptr` non ha una specializzazione specifica per gli array. Tuttavia, è possibile utilizzare un custom deleter per garantire che venga utilizzato `delete[]` invece di `delete`:

```cpp
#include <iostream>
#include <memory>

int main() {
    // Creazione di un shared_ptr per un array di interi con custom deleter
    std::shared_ptr<int> arrayPtr(new int[5], [](int* p) { delete[] p; });
    
    // Inizializzazione degli elementi
    // Nota: non possiamo usare la sintassi arrayPtr[i] direttamente
    for (int i = 0; i < 5; ++i) {
        arrayPtr.get()[i] = i * 10;
    }
    
    // Accesso agli elementi
    for (int i = 0; i < 5; ++i) {
        std::cout << "arrayPtr[" << i << "] = " << arrayPtr.get()[i] << std::endl;
    }
    
    // L'array verrà deallocato automaticamente con delete[] grazie al custom deleter
    return 0;
}
```

### Utilizzo di shared_ptr con Array (C++17)

A partire da C++17, `std::shared_ptr` supporta nativamente gli array con la sintassi `std::shared_ptr<T[]>`, simile a `unique_ptr`:

```cpp
#include <iostream>
#include <memory>

int main() {
    // C++17: Creazione di un shared_ptr per un array
    std::shared_ptr<int[]> arrayPtr(new int[5]);
    
    // Ora possiamo usare la sintassi arrayPtr[i] direttamente
    for (int i = 0; i < 5; ++i) {
        arrayPtr[i] = i * 10;
    }
    
    for (int i = 0; i < 5; ++i) {
        std::cout << "arrayPtr[" << i << "] = " << arrayPtr[i] << std::endl;
    }
    
    return 0;
}
```

### make_shared per Array (C++20)

A partire da C++20, è possibile utilizzare `std::make_shared` anche per gli array:

```cpp
#include <iostream>
#include <memory>

int main() {
    // C++20: Creazione di un shared_ptr per un array con make_shared
    auto arrayPtr = std::make_shared<int[]>(5);
    
    // Utilizzo come prima
    for (int i = 0; i < 5; ++i) {
        arrayPtr[i] = i * 10;
    }
    
    for (int i = 0; i < 5; ++i) {
        std::cout << "arrayPtr[" << i << "] = " << arrayPtr[i] << std::endl;
    }
    
    return 0;
}
```

## Gestione di Array Multidimensionali

La gestione di array multidimensionali con smart pointers richiede un approccio leggermente diverso:

```cpp
#include <iostream>
#include <memory>

int main() {
    const int righe = 3;
    const int colonne = 4;
    
    // Creazione di un array bidimensionale con unique_ptr
    auto matrice = std::make_unique<int[]>(righe * colonne);
    
    // Inizializzazione degli elementi
    for (int i = 0; i < righe; ++i) {
        for (int j = 0; j < colonne; ++j) {
            // Accesso all'elemento [i][j] tramite aritmetica dei puntatori
            matrice[i * colonne + j] = i * 10 + j;
        }
    }
    
    // Accesso agli elementi
    for (int i = 0; i < righe; ++i) {
        for (int j = 0; j < colonne; ++j) {
            std::cout << matrice[i * colonne + j] << "\t";
        }
        std::cout << std::endl;
    }
    
    return 0;
}
```

### Approccio Alternativo con Array di Puntatori

Un altro approccio per gli array multidimensionali è utilizzare un array di puntatori:

```cpp
#include <iostream>
#include <memory>

int main() {
    const int righe = 3;
    const int colonne = 4;
    
    // Creazione di un array di unique_ptr, ciascuno che punta a un array
    auto matrice = std::make_unique<std::unique_ptr<int[]>[]>(righe);
    
    // Allocazione delle righe
    for (int i = 0; i < righe; ++i) {
        matrice[i] = std::make_unique<int[]>(colonne);
    }
    
    // Inizializzazione degli elementi
    for (int i = 0; i < righe; ++i) {
        for (int j = 0; j < colonne; ++j) {
            matrice[i][j] = i * 10 + j;
        }
    }
    
    // Accesso agli elementi
    for (int i = 0; i < righe; ++i) {
        for (int j = 0; j < colonne; ++j) {
            std::cout << matrice[i][j] << "\t";
        }
        std::cout << std::endl;
    }
    
    // Tutte le righe e la matrice stessa verranno deallocate automaticamente
    return 0;
}
```

## Considerazioni sulle Prestazioni

Quando si utilizzano smart pointers con array, ci sono alcune considerazioni sulle prestazioni da tenere a mente:

1. **Overhead di memoria**: Gli smart pointers aggiungono un overhead di memoria rispetto ai puntatori raw.
2. **Accesso agli elementi**: L'accesso agli elementi di un array tramite smart pointer può essere leggermente più lento rispetto all'accesso diretto.
3. **Allocazione in blocco**: Per array multidimensionali, l'allocazione in un unico blocco (primo esempio) è generalmente più efficiente dell'allocazione separata per ogni riga (secondo esempio).

## Alternative agli Array Dinamici

In C++ moderno, ci sono alternative agli array dinamici gestiti manualmente che spesso sono preferibili:

### std::vector

`std::vector` è la scelta più comune e flessibile per array dinamici in C++:

```cpp
#include <iostream>
#include <vector>

int main() {
    // Creazione di un vector
    std::vector<int> vec(5);
    
    // Inizializzazione degli elementi
    for (int i = 0; i < 5; ++i) {
        vec[i] = i * 10;
    }
    
    // Accesso agli elementi
    for (int i = 0; i < 5; ++i) {
        std::cout << "vec[" << i << "] = " << vec[i] << std::endl;
    }
    
    // Aggiunta di elementi
    vec.push_back(50);
    vec.push_back(60);
    
    // Utilizzo di range-based for loop
    for (const auto& val : vec) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### std::array

Per array di dimensione fissa, `std::array` è una scelta migliore:

```cpp
#include <iostream>
#include <array>

int main() {
    // Creazione di un array di dimensione fissa
    std::array<int, 5> arr = {0, 10, 20, 30, 40};
    
    // Accesso agli elementi
    for (size_t i = 0; i < arr.size(); ++i) {
        std::cout << "arr[" << i << "] = " << arr[i] << std::endl;
    }
    
    // Utilizzo di range-based for loop
    for (const auto& val : arr) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

## Quando Utilizzare Smart Pointers con Array

Nonostante le alternative come `std::vector` e `std::array`, ci sono situazioni in cui gli smart pointers con array sono utili:

1. **Interoperabilità con codice C o API legacy**: Quando devi lavorare con funzioni che richiedono puntatori raw a array.
2. **Controllo preciso della deallocazione**: Quando hai bisogno di un controllo più preciso su quando e come gli array vengono deallocati.
3. **Strutture dati complesse**: Per implementare strutture dati complesse dove la proprietà degli array deve essere trasferita o condivisa.

## Domande di Autovalutazione

1. Qual è la differenza tra `delete` e `delete[]` e perché è importante quando si gestiscono array dinamici?
2. Come si dichiara un `unique_ptr` che gestisce un array di interi?
3. Quali sono le limitazioni di `unique_ptr` con array?
4. Come si può utilizzare `shared_ptr` per gestire un array prima di C++17?
5. Quali sono i vantaggi di utilizzare `std::vector` rispetto a un array gestito con smart pointer?
6. Come si può gestire un array multidimensionale utilizzando smart pointers?
7. In quali situazioni è appropriato utilizzare smart pointers con array invece di container standard come `std::vector`?

## Esercizi Proposti

1. **Implementazione di una Matrice**
   
   Crea una classe `Matrice` che utilizza smart pointers per gestire un array bidimensionale, con metodi per accedere e modificare gli elementi.

2. **Gestore di Buffer Dinamico**
   
   Implementa un gestore di buffer che utilizza `unique_ptr` per gestire array di byte, con funzionalità per ridimensionare il buffer quando necessario.

3. **Pool di Array**
   
   Crea un pool di array di dimensioni diverse utilizzando `shared_ptr`, con funzionalità per allocare e rilasciare array dal pool.

4. **Confronto di Prestazioni**
   
   Scrivi un programma che confronti le prestazioni di array gestiti con smart pointers, `std::vector` e array raw in diverse operazioni (allocazione, accesso, deallocazione).

5. **Implementazione di una Lista Collegata**
   
   Implementa una lista collegata dove ogni nodo contiene un array di elementi, utilizzando smart pointers per gestire i nodi e gli array.

## Conclusione

Gli smart pointers offrono un modo sicuro ed efficiente per gestire array dinamici in C++, garantendo la corretta deallocazione e prevenendo memory leak. Tuttavia, in molti casi, i container standard come `std::vector` e `std::array` offrono un'alternativa più flessibile e robusta. La scelta tra smart pointers con array e container standard dipende dalle specifiche esigenze del tuo programma. Nel prossimo capitolo, esploreremo le best practices e i pattern di utilizzo degli smart pointers in C++.