# Allocatori nella STL di C++

In questa guida, esploreremo gli allocatori nella Standard Template Library (STL) di C++, un componente fondamentale ma spesso trascurato che gestisce l'allocazione e la deallocazione della memoria per i contenitori.

## Cosa sono gli Allocatori?

Gli allocatori sono oggetti che incapsulano le strategie di gestione della memoria utilizzate dai contenitori della STL. Ogni contenitore della STL accetta un allocatore come parametro di template opzionale, permettendo di personalizzare come la memoria viene allocata e deallocata.

Per default, i contenitori della STL utilizzano `std::allocator`, che è un'implementazione standard che utilizza `new` e `delete` per gestire la memoria.

```cpp
// Dichiarazione di un vettore con l'allocatore predefinito
std::vector<int> v1;

// Dichiarazione esplicita con std::allocator
std::vector<int, std::allocator<int>> v2;

// v1 e v2 sono equivalenti
```

## Interfaccia di un Allocatore

Un allocatore deve fornire diverse funzionalità, tra cui:

1. **Allocazione di memoria**: Metodi per allocare blocchi di memoria non inizializzata.
2. **Deallocazione di memoria**: Metodi per liberare la memoria precedentemente allocata.
3. **Costruzione di oggetti**: Metodi per costruire oggetti nella memoria allocata.
4. **Distruzione di oggetti**: Metodi per distruggere oggetti senza deallocare la memoria.

Ecco un esempio semplificato dell'interfaccia di un allocatore:

```cpp
template <class T>
class MyAllocator {
public:
    using value_type = T;
    
    // Costruttori e distruttore
    MyAllocator() noexcept;
    template <class U> MyAllocator(const MyAllocator<U>&) noexcept;
    ~MyAllocator();
    
    // Allocazione e deallocazione
    T* allocate(std::size_t n);
    void deallocate(T* p, std::size_t n) noexcept;
    
    // Altri metodi richiesti...
};

// Operatori di confronto
template <class T, class U>
bool operator==(const MyAllocator<T>&, const MyAllocator<U>&) noexcept;

template <class T, class U>
bool operator!=(const MyAllocator<T>&, const MyAllocator<U>&) noexcept;
```

## Implementazione di un Allocatore Personalizzato

Ecco un esempio di un allocatore personalizzato che tiene traccia della memoria allocata:

```cpp
#include <iostream>
#include <vector>
#include <memory>

template <class T>
class TrackingAllocator {
public:
    using value_type = T;
    
    TrackingAllocator() noexcept {
        std::cout << "Costruttore di TrackingAllocator chiamato" << std::endl;
    }
    
    template <class U>
    TrackingAllocator(const TrackingAllocator<U>&) noexcept {
        std::cout << "Costruttore di copia di TrackingAllocator chiamato" << std::endl;
    }
    
    ~TrackingAllocator() {
        std::cout << "Distruttore di TrackingAllocator chiamato" << std::endl;
    }
    
    T* allocate(std::size_t n) {
        std::cout << "Allocazione di " << n << " elementi di tipo " << typeid(T).name() << std::endl;
        return static_cast<T*>(::operator new(n * sizeof(T)));
    }
    
    void deallocate(T* p, std::size_t n) noexcept {
        std::cout << "Deallocazione di " << n << " elementi di tipo " << typeid(T).name() << std::endl;
        ::operator delete(p);
    }
};

template <class T, class U>
bool operator==(const TrackingAllocator<T>&, const TrackingAllocator<U>&) noexcept {
    return true;
}

template <class T, class U>
bool operator!=(const TrackingAllocator<T>&, const TrackingAllocator<U>&) noexcept {
    return false;
}

int main() {
    // Utilizzo dell'allocatore personalizzato con un vettore
    std::vector<int, TrackingAllocator<int>> v;
    
    std::cout << "Aggiunta di elementi al vettore..." << std::endl;
    for (int i = 0; i < 10; ++i) {
        v.push_back(i);
    }
    
    std::cout << "Svuotamento del vettore..." << std::endl;
    v.clear();
    
    std::cout << "Fine del programma" << std::endl;
    return 0;
}
```

## Allocatori Specializzati

Gli allocatori personalizzati possono essere utilizzati per implementare strategie di allocazione specializzate:

### Pool Allocator

Un pool allocator pre-alloca un grande blocco di memoria e lo divide in blocchi di dimensione fissa, riducendo l'overhead delle chiamate di sistema per l'allocazione.

```cpp
template <class T, std::size_t BlockSize = 4096>
class PoolAllocator {
    // Implementazione...
};
```

### Stack Allocator

Uno stack allocator alloca memoria da uno stack, permettendo una deallocazione molto rapida (semplicemente spostando un puntatore).

```cpp
template <class T, std::size_t StackSize = 4096>
class StackAllocator {
    // Implementazione...
};
```

### Arena Allocator

Un arena allocator alloca grandi blocchi di memoria e li gestisce internamente, deallocando tutto in una volta alla fine.

```cpp
template <class T>
class ArenaAllocator {
    // Implementazione...
};
```

## Allocatori nella STL Moderna (C++17 e oltre)

A partire da C++17, l'interfaccia degli allocatori è stata semplificata e sono stati introdotti nuovi concetti come `polymorphic_allocator` e `memory_resource`.

```cpp
#include <memory_resource>
#include <vector>
#include <iostream>

int main() {
    // Creazione di un pool di memoria
    std::array<std::byte, 4096> buffer;
    std::pmr::monotonic_buffer_resource pool{buffer.data(), buffer.size()};
    
    // Creazione di un vettore che utilizza il pool
    std::pmr::vector<int> v{&pool};
    
    // Aggiunta di elementi
    for (int i = 0; i < 100; ++i) {
        v.push_back(i);
    }
    
    std::cout << "Dimensione del vettore: " << v.size() << std::endl;
    return 0;
}
```

## Considerazioni sulle Prestazioni

La scelta dell'allocatore può avere un impatto significativo sulle prestazioni di un'applicazione:

1. **Frammentazione della memoria**: Allocatori specializzati possono ridurre la frammentazione.
2. **Località dei dati**: Allocatori che mantengono i dati vicini possono migliorare le prestazioni della cache.
3. **Overhead di allocazione**: Allocatori personalizzati possono ridurre l'overhead delle chiamate di sistema.
4. **Thread safety**: Alcuni allocatori sono ottimizzati per ambienti multi-thread.

## Domande di Autovalutazione

1. Qual è il ruolo degli allocatori nella STL?
2. Quali sono i componenti principali dell'interfaccia di un allocatore?
3. In quali situazioni potrebbe essere vantaggioso utilizzare un allocatore personalizzato?
4. Come funziona un pool allocator e quali vantaggi offre?
5. Quali miglioramenti sono stati introdotti negli allocatori con C++17?

## Esercizi Proposti

1. Implementa un semplice pool allocator e utilizzalo con un `std::vector`.
2. Crea un allocatore che registri statistiche dettagliate sull'utilizzo della memoria.
3. Confronta le prestazioni di un contenitore STL con l'allocatore predefinito e con un allocatore personalizzato in uno scenario ad alta frequenza di allocazione/deallocazione.
4. Implementa un allocatore thread-safe utilizzando mutex o altre primitive di sincronizzazione.
5. Crea un allocatore che utilizzi una memoria condivisa tra processi per permettere la comunicazione tra processi attraverso contenitori STL.

## Conclusione

Gli allocatori sono un componente fondamentale della STL che permette di personalizzare la gestione della memoria dei contenitori. Sebbene l'allocatore predefinito sia adeguato per la maggior parte delle applicazioni, comprendere come funzionano gli allocatori e come implementarne di personalizzati può essere cruciale per ottimizzare le prestazioni in scenari specifici o per implementare strategie di gestione della memoria specializzate. Con l'evoluzione dello standard C++, gli allocatori sono diventati più potenti e flessibili, offrendo nuove opportunità per migliorare l'efficienza e la robustezza delle applicazioni C++.