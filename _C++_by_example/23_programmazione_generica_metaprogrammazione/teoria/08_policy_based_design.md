# Policy-Based Design in C++

## Introduzione al Policy-Based Design

Il Policy-Based Design è un paradigma di progettazione avanzato in C++ che sfrutta i template per creare componenti software altamente configurabili e riutilizzabili. Questo approccio, reso popolare da Andrei Alexandrescu nel suo libro "Modern C++ Design", permette di separare le funzionalità (policies) dalle strutture dati o algoritmi che le utilizzano (host).

## Concetti Fondamentali

### Cos'è una Policy?

Una policy è una classe o un template che implementa un comportamento specifico. Le policy sono progettate per essere:

1. **Intercambiabili**: Diverse policy possono implementare lo stesso comportamento in modi diversi.
2. **Ortogonali**: Le policy dovrebbero essere indipendenti tra loro.
3. **Componibili**: Le policy possono essere combinate per creare comportamenti complessi.

### Host Class

Una host class è una classe template che accetta una o più policy come parametri di template e le utilizza per implementare la sua funzionalità. La host class definisce l'interfaccia e la struttura generale, mentre le policy definiscono i comportamenti specifici.

## Implementazione del Policy-Based Design

### Esempio Base: Smart Pointer Configurabile

```cpp
// Policy per la gestione della memoria
class MallocAllocator {
public:
    template<typename T>
    static T* allocate() {
        return static_cast<T*>(malloc(sizeof(T)));
    }
    
    template<typename T>
    static void deallocate(T* ptr) {
        free(ptr);
    }
};

class NewAllocator {
public:
    template<typename T>
    static T* allocate() {
        return new T;
    }
    
    template<typename T>
    static void deallocate(T* ptr) {
        delete ptr;
    }
};

// Policy per il controllo degli accessi
class NoCheck {
public:
    template<typename T>
    static void checkNull(T* ptr) {
        // Non fa nulla
    }
};

class AssertCheck {
public:
    template<typename T>
    static void checkNull(T* ptr) {
        assert(ptr != nullptr);
    }
};

// Host class: SmartPtr configurabile
template<typename T, 
         typename AllocPolicy = NewAllocator,
         typename CheckPolicy = NoCheck>
class SmartPtr {
private:
    T* ptr_;

public:
    SmartPtr() : ptr_(AllocPolicy::template allocate<T>()) {}
    
    ~SmartPtr() {
        AllocPolicy::deallocate(ptr_);
    }
    
    T& operator*() {
        CheckPolicy::checkNull(ptr_);
        return *ptr_;
    }
    
    T* operator->() {
        CheckPolicy::checkNull(ptr_);
        return ptr_;
    }
};
```

### Utilizzo dello Smart Pointer Configurabile

```cpp
#include <iostream>
#include <cassert>

int main() {
    // Smart pointer con allocazione tramite new e senza controlli
    SmartPtr<int> sp1;
    *sp1 = 42;
    std::cout << "sp1: " << *sp1 << std::endl;
    
    // Smart pointer con allocazione tramite malloc e controlli assert
    SmartPtr<int, MallocAllocator, AssertCheck> sp2;
    *sp2 = 100;
    std::cout << "sp2: " << *sp2 << std::endl;
    
    return 0;
}
```

## Vantaggi del Policy-Based Design

1. **Flessibilità**: Permette di configurare il comportamento di una classe senza modificarne il codice.
2. **Riutilizzo del Codice**: Le policy possono essere riutilizzate in diversi contesti.
3. **Efficienza**: Il compilatore può ottimizzare il codice generato, eliminando overhead a runtime.
4. **Estensibilità**: Nuove policy possono essere aggiunte senza modificare il codice esistente.
5. **Separazione delle Responsabilità**: Ogni policy si occupa di un aspetto specifico del comportamento.

## Esempi Avanzati

### Container Configurabile

```cpp
// Policy per la strategia di ordinamento
class AscendingSort {
public:
    template<typename T>
    static bool compare(const T& a, const T& b) {
        return a < b;
    }
};

class DescendingSort {
public:
    template<typename T>
    static bool compare(const T& a, const T& b) {
        return a > b;
    }
};

// Policy per la strategia di storage
template<typename T>
class VectorStorage {
private:
    std::vector<T> data_;

public:
    void add(const T& item) {
        data_.push_back(item);
    }
    
    T& get(size_t index) {
        return data_[index];
    }
    
    size_t size() const {
        return data_.size();
    }
    
    void sort() {
        // Implementazione dell'ordinamento per vector
    }
};

template<typename T>
class ListStorage {
private:
    std::list<T> data_;

public:
    void add(const T& item) {
        data_.push_back(item);
    }
    
    T& get(size_t index) {
        auto it = data_.begin();
        std::advance(it, index);
        return *it;
    }
    
    size_t size() const {
        return data_.size();
    }
    
    void sort() {
        // Implementazione dell'ordinamento per list
    }
};

// Host class: Container configurabile
template<typename T, 
         typename StoragePolicy,
         typename SortPolicy = AscendingSort>
class Container {
private:
    StoragePolicy storage_;

public:
    void add(const T& item) {
        storage_.add(item);
    }
    
    T& get(size_t index) {
        return storage_.get(index);
    }
    
    size_t size() const {
        return storage_.size();
    }
    
    void sort() {
        // Utilizzo della policy di ordinamento
        // Implementazione dipende dalla storage policy
    }
};
```

## Best Practices

1. **Progetta Policy Ortogonali**: Ogni policy dovrebbe occuparsi di un singolo aspetto del comportamento.
2. **Fornisci Policy di Default**: Definisci policy di default ragionevoli per semplificare l'uso della classe host.
3. **Documenta le Interfacce delle Policy**: Chiarisci quali metodi e tipi devono essere forniti da una policy.
4. **Usa Ereditarietà con Cautela**: L'ereditarietà può complicare il design delle policy; preferisci la composizione quando possibile.
5. **Considera le Prestazioni**: Il policy-based design può introdurre overhead di compilazione; usalo quando i benefici superano i costi.

## Confronto con Altri Pattern

### Policy-Based Design vs Strategy Pattern

Il policy-based design è simile al pattern Strategy, ma con alcune differenze chiave:

- **Tempo di Risoluzione**: Le policy sono risolte a tempo di compilazione, mentre le strategie sono tipicamente risolte a runtime.
- **Overhead**: Le policy non hanno overhead a runtime, mentre le strategie possono avere overhead dovuto al polimorfismo dinamico.
- **Flessibilità**: Le strategie possono essere cambiate a runtime, mentre le policy sono fisse dopo la compilazione.

### Policy-Based Design vs Traits

I traits sono spesso utilizzati insieme al policy-based design, ma hanno scopi leggermente diversi:

- **Scopo**: I traits forniscono informazioni sui tipi, mentre le policy forniscono comportamenti.
- **Utilizzo**: I traits sono spesso utilizzati per prendere decisioni di compilazione, mentre le policy implementano comportamenti specifici.

## Domande di Autovalutazione

1. Quali sono i vantaggi principali del policy-based design rispetto all'ereditarietà tradizionale?
2. Come si può garantire che una policy implementi correttamente l'interfaccia richiesta?
3. In quali scenari il policy-based design è particolarmente utile?
4. Quali sono le limitazioni del policy-based design?
5. Come si possono combinare più policy in una singola classe host?

## Esercizi Proposti

1. **Smart Container**: Implementa un container che utilizzi policy per la gestione della memoria, la strategia di crescita e il controllo degli accessi.
2. **Logger Configurabile**: Crea un sistema di logging che utilizzi policy per determinare dove e come i messaggi vengono registrati.
3. **Algoritmo di Ordinamento Generico**: Implementa un algoritmo di ordinamento che utilizzi policy per la strategia di confronto e la strategia di partizionamento.
4. **Validatore di Input**: Crea un validatore di input che utilizzi policy per definire regole di validazione diverse.
5. **Cache Configurabile**: Implementa una cache che utilizzi policy per la strategia di evizione, la strategia di storage e la strategia di sincronizzazione.

## Conclusione

Il policy-based design è una tecnica potente per creare componenti software flessibili e riutilizzabili in C++. Sfruttando la potenza dei template, permette di separare chiaramente i comportamenti dalla struttura, facilitando la manutenzione e l'estensione del codice. Sebbene richieda una buona comprensione dei template e della metaprogrammazione, i benefici in termini di flessibilità, riutilizzo e prestazioni lo rendono uno strumento prezioso nel toolkit di ogni programmatore C++ avanzato.