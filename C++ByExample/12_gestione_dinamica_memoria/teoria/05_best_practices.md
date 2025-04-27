# Best Practices nella Gestione della Memoria

In questa guida, esploreremo le migliori pratiche per gestire efficacemente la memoria dinamica in C++, evitando problemi comuni come memory leak e dangling pointers.

## Principi Fondamentali

### 1. Responsabilità Chiara

Stabilire chiaramente chi è responsabile dell'allocazione e della deallocazione della memoria:

- Chi alloca dovrebbe deallocare
- Documentare chiaramente le responsabilità di gestione della memoria nelle API

### 2. Simmetria nell'Allocazione/Deallocazione

Mantenere la simmetria tra allocazione e deallocazione:

- `new` → `delete`
- `new[]` → `delete[]`
- `malloc()` → `free()`

```cpp
// Corretto
int* p1 = new int;
delete p1;

// Corretto
int* p2 = new int[10];
delete[] p2;

// ERRATO: mancata corrispondenza
int* p3 = new int;
delete[] p3;  // Dovrebbe essere delete p3;

int* p4 = new int[10];
delete p4;    // Dovrebbe essere delete[] p4;
```

## Tecniche Avanzate

### 1. RAII (Resource Acquisition Is Initialization)

RAII è un pattern di programmazione che lega il ciclo di vita di una risorsa (come la memoria) al ciclo di vita di un oggetto:

```cpp
class IntArray {
private:
    int* data;
    size_t size;

public:
    // Costruttore (acquisizione risorsa)
    IntArray(size_t n) : size(n) {
        data = new int[size]();
    }
    
    // Distruttore (rilascio risorsa)
    ~IntArray() {
        delete[] data;
    }
    
    // Accesso agli elementi
    int& operator[](size_t index) {
        return data[index];
    }
    
    size_t getSize() const {
        return size;
    }
};

// Utilizzo
void funzione() {
    IntArray arr(10);  // Allocazione automatica
    arr[0] = 42;
    // ...
}  // Deallocazione automatica quando arr esce dallo scope
```

### 2. Smart Pointers (C++11 e versioni successive)

Gli smart pointers gestiscono automaticamente la memoria, deallocandola quando non è più necessaria:

#### `std::unique_ptr`

Per ownership esclusiva (non può essere copiato, solo spostato):

```cpp
#include <memory>

void funzione() {
    // C++11
    std::unique_ptr<int> p1(new int(42));
    
    // C++14 (preferibile)
    auto p2 = std::make_unique<int>(42);
    
    // Accesso al valore
    *p2 = 100;
    
    // Array
    auto arr = std::make_unique<int[]>(10);
    arr[0] = 42;
    
    // Non è necessario chiamare delete
}  // Deallocazione automatica
```

#### `std::shared_ptr`

Per ownership condivisa (reference counting):

```cpp
#include <memory>

void funzione() {
    // C++11
    std::shared_ptr<int> p1(new int(42));
    
    // C++11 e successivi (preferibile)
    auto p2 = std::make_shared<int>(42);
    
    // Condivisione
    std::shared_ptr<int> p3 = p2;  // p2 e p3 condividono la proprietà
    
    std::cout << "Reference count: " << p2.use_count() << std::endl;  // Output: 2
    
    // Non è necessario chiamare delete
}  // Deallocazione quando l'ultimo shared_ptr esce dallo scope
```

#### `std::weak_ptr`

Per riferimenti non-owning a oggetti gestiti da `shared_ptr`:

```cpp
#include <memory>

void funzione() {
    auto sp = std::make_shared<int>(42);
    
    std::weak_ptr<int> wp = sp;  // wp non aumenta il reference count
    
    // Verifica se l'oggetto esiste ancora
    if (auto locked = wp.lock()) {
        std::cout << "Valore: " << *locked << std::endl;
    } else {
        std::cout << "L'oggetto non esiste più" << std::endl;
    }
    
    sp.reset();  // Rilascia la proprietà
    
    // Ora wp punta a un oggetto che non esiste più
    if (wp.expired()) {
        std::cout << "Il weak_ptr è scaduto" << std::endl;
    }
}
```

### 3. Containers della STL

Utilizzare i containers della Standard Template Library anziché array dinamici manuali:

```cpp
#include <vector>
#include <string>

void funzione() {
    // Invece di:
    // int* array = new int[size];
    // ...
    // delete[] array;
    
    // Utilizzare:
    std::vector<int> vec(10, 0);  // Vector di 10 elementi inizializzati a 0
    vec.push_back(42);  // Aggiunge un elemento
    vec.resize(20);     // Ridimensiona automaticamente
    
    // Anche per tipi complessi
    std::vector<std::string> names = {"Alice", "Bob", "Charlie"};
    
    // Non è necessario deallocare manualmente
}  // Deallocazione automatica
```

## Linee Guida Pratiche

### 1. Inizializzare i Puntatori

Inizializzare sempre i puntatori a `nullptr` o a un valore valido:

```cpp
int* p = nullptr;  // Inizializzazione esplicita

// Più tardi nel codice
p = new int(42);
```

### 2. Assegnare `nullptr` dopo `delete`

```cpp
int* p = new int(42);
// Utilizzo di p
delete p;
p = nullptr;  // Previene l'uso accidentale di un dangling pointer
```

### 3. Verificare i Puntatori Prima dell'Uso

```cpp
if (p != nullptr) {
    *p = 100;  // Sicuro solo se p è valido
}
```

### 4. Evitare Allocazioni/Deallocazioni Ripetute

Le allocazioni e deallocazioni frequenti possono degradare le prestazioni:

```cpp
// Inefficiente
for (int i = 0; i < 1000; i++) {
    int* p = new int(i);
    // Utilizzo di p
    delete p;
}

// Più efficiente
int* p = new int;
for (int i = 0; i < 1000; i++) {
    *p = i;
    // Utilizzo di p
}
delete p;
```

### 5. Utilizzare Strumenti di Analisi della Memoria

- Valgrind (Linux/macOS)
- Visual Leak Detector (Windows)
- AddressSanitizer (compilatori moderni)

## Esempio Completo

```cpp
#include <iostream>
#include <memory>
#include <vector>
#include <string>

// Classe che gestisce risorse con RAII
class Resource {
private:
    std::string name;
    int* data;

public:
    Resource(const std::string& n, int value) : name(n) {
        data = new int(value);
        std::cout << "Resource '" << name << "' allocata" << std::endl;
    }
    
    ~Resource() {
        delete data;
        std::cout << "Resource '" << name << "' deallocata" << std::endl;
    }
    
    int getValue() const {
        return *data;
    }
    
    void setValue(int value) {
        *data = value;
    }
};

// Funzione che utilizza unique_ptr
void useUniquePtr() {
    auto resource = std::make_unique<Resource>("UniqueResource", 42);
    std::cout << "Valore: " << resource->getValue() << std::endl;
    resource->setValue(100);
    std::cout << "Nuovo valore: " << resource->getValue() << std::endl;
    
    // Non è necessario deallocare manualmente
}  // Deallocazione automatica

// Funzione che utilizza shared_ptr
void useSharedPtr() {
    auto resource1 = std::make_shared<Resource>("SharedResource", 42);
    
    {
        auto resource2 = resource1;  // Condivisione della proprietà
        std::cout << "Reference count: " << resource1.use_count() << std::endl;  // Output: 2
        std::cout << "Valore da resource2: " << resource2->getValue() << std::endl;
    }  // resource2 esce dallo scope, ma l'oggetto non viene deallocato
    
    std::cout << "Reference count dopo il blocco: " << resource1.use_count() << std::endl;  // Output: 1
    
    // Non è necessario deallocare manualmente
}  // Deallocazione quando resource1 esce dallo scope

// Funzione che utilizza vector invece di array dinamici
void useVector() {
    std::vector<int> numbers;
    
    // Aggiunta di elementi
    for (int i = 0; i < 10; i++) {
        numbers.push_back(i * 10);
    }
    
    // Accesso agli elementi
    std::cout << "Elementi del vector:";
    for (int num : numbers) {
        std::cout << " " << num;
    }
    std::cout << std::endl;
    
    // Ridimensionamento
    numbers.resize(5);  // Riduce a 5 elementi
    
    std::cout << "Dopo il ridimensionamento:";
    for (int num : numbers) {
        std::cout << " " << num;
    }
    std::cout << std::endl;
    
    // Non è necessario deallocare manualmente
}  // Deallocazione automatica

int main() {
    std::cout << "=== Esempio di unique_ptr ===" << std::endl;
    useUniquePtr();
    
    std::cout << "\n=== Esempio di shared_ptr ===" << std::endl;
    useSharedPtr();
    
    std::cout << "\n=== Esempio di vector ===" << std::endl;
    useVector();
    
    return 0;
}
```

## Domande di Autovalutazione

1. Quali sono i vantaggi del pattern RAII nella gestione della memoria?
2. Quando è preferibile utilizzare `std::unique_ptr` rispetto a `std::shared_ptr`?
3. Quali sono i vantaggi dell'utilizzo dei containers STL rispetto agli array dinamici manuali?
4. Perché è importante assegnare `nullptr` a un puntatore dopo averlo deallocato?
5. Come possono gli strumenti di analisi della memoria aiutare a identificare problemi di gestione della memoria?

## Esercizi Proposti

1. Riscrivi un programma che utilizza `new`/`delete` per gestire un array dinamico, utilizzando invece `std::vector`.

2. Implementa una classe che gestisce una risorsa (ad esempio, un file o un buffer di memoria) seguendo il pattern RAII.

3. Crea un programma che dimostra l'uso di `std::shared_ptr` e `std::weak_ptr` per gestire oggetti con relazioni cicliche (ad esempio, una struttura dati grafo).

## Conclusione

La gestione efficace della memoria è fondamentale per scrivere programmi C++ robusti ed efficienti. Seguendo le best practices descritte in questa guida, è possibile evitare problemi comuni come memory leak e dangling pointers, migliorando la qualità e l'affidabilità del codice.

Nelle moderne applicazioni C++, è generalmente consigliabile utilizzare gli strumenti forniti dalla libreria standard (smart pointers, containers STL) anziché gestire manualmente la memoria con `new` e `delete`. Tuttavia, è comunque importante comprendere i meccanismi sottostanti per utilizzare questi strumenti in modo efficace e per gestire situazioni in cui è necessario un controllo più diretto sulla memoria.