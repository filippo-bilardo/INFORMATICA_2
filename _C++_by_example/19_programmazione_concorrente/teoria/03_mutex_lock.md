# Mutex e Lock

I mutex (mutual exclusion) e i lock sono meccanismi fondamentali per la sincronizzazione dei thread in C++. Questi strumenti permettono di proteggere le risorse condivise dall'accesso concorrente, prevenendo race condition e garantendo la coerenza dei dati.

## Mutex in C++

La libreria standard C++ fornisce diverse classi di mutex nell'header `<mutex>`:

### `std::mutex`

È il tipo di mutex più semplice che fornisce un meccanismo di esclusione mutua non ricorsivo.

```cpp
#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx; // Mutex globale
int shared_data = 0; // Risorsa condivisa

void increment() {
    for (int i = 0; i < 1000000; ++i) {
        mtx.lock();   // Acquisizione del lock
        shared_data++; // Accesso sicuro alla risorsa condivisa
        mtx.unlock(); // Rilascio del lock
    }
}

int main() {
    std::thread t1(increment);
    std::thread t2(increment);
    
    t1.join();
    t2.join();
    
    std::cout << "Valore finale: " << shared_data << std::endl;
    return 0;
}
```

### `std::recursive_mutex`

Permette allo stesso thread di acquisire il lock più volte (in modo ricorsivo) senza causare deadlock.

```cpp
#include <iostream>
#include <thread>
#include <mutex>

std::recursive_mutex rmtx;

void recursive_function(int depth) {
    rmtx.lock();
    std::cout << "Profondità: " << depth << std::endl;
    
    if (depth > 0) {
        recursive_function(depth - 1); // Chiamata ricorsiva con lo stesso mutex
    }
    
    rmtx.unlock();
}

int main() {
    std::thread t(recursive_function, 5);
    t.join();
    return 0;
}
```

### Altri Tipi di Mutex

- **`std::timed_mutex`**: Aggiunge la possibilità di specificare un timeout per l'acquisizione del lock.
- **`std::recursive_timed_mutex`**: Combina le funzionalità di `recursive_mutex` e `timed_mutex`.
- **`std::shared_mutex`** (C++17): Supporta sia lock esclusivi (scrittura) che condivisi (lettura).

## Lock Guards e Unique Lock

L'uso diretto di `lock()` e `unlock()` può essere pericoloso perché è facile dimenticare di rilasciare un lock, specialmente in presenza di eccezioni. C++ fornisce classi wrapper che gestiscono automaticamente l'acquisizione e il rilascio dei lock.

### `std::lock_guard`

Implementa il pattern RAII (Resource Acquisition Is Initialization) per i mutex, acquisendo il lock alla costruzione e rilasciandolo alla distruzione.

```cpp
#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx;
int shared_data = 0;

void increment_safe() {
    for (int i = 0; i < 1000000; ++i) {
        // Il lock viene acquisito qui e rilasciato automaticamente alla fine dello scope
        std::lock_guard<std::mutex> lock(mtx);
        shared_data++;
    } // Il lock_guard viene distrutto qui, rilasciando il mutex
}

int main() {
    std::thread t1(increment_safe);
    std::thread t2(increment_safe);
    
    t1.join();
    t2.join();
    
    std::cout << "Valore finale: " << shared_data << std::endl;
    return 0;
}
```

### `std::unique_lock`

Offre più flessibilità rispetto a `lock_guard`, permettendo di acquisire e rilasciare il lock manualmente, oltre a supportare operazioni di timeout e lock differito.

```cpp
#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx;

void process_data() {
    std::unique_lock<std::mutex> lock(mtx);
    
    // Elaborazione con il lock acquisito
    std::cout << "Elaborazione con lock..." << std::endl;
    
    // Rilascio temporaneo del lock
    lock.unlock();
    std::cout << "Elaborazione senza lock..." << std::endl;
    
    // Riacquisizione del lock
    lock.lock();
    std::cout << "Lock riacquisito." << std::endl;
    
    // Il lock viene rilasciato automaticamente alla distruzione
}

int main() {
    std::thread t(process_data);
    t.join();
    return 0;
}
```

### `std::scoped_lock` (C++17)

Simile a `lock_guard` ma può bloccare più mutex contemporaneamente in modo sicuro da deadlock.

```cpp
#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx1, mtx2;

void process_resources() {
    // Blocca entrambi i mutex in modo sicuro da deadlock
    std::scoped_lock lock(mtx1, mtx2);
    
    // Ora abbiamo accesso esclusivo a entrambe le risorse
    std::cout << "Accesso sicuro a risorse multiple" << std::endl;
}

int main() {
    std::thread t(process_resources);
    t.join();
    return 0;
}
```

## Deadlock e Come Evitarlo

Un deadlock si verifica quando due o più thread si bloccano a vicenda, ciascuno in attesa che l'altro rilasci una risorsa.

### Esempio di Deadlock

```cpp
#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx1, mtx2;

void thread_1_function() {
    mtx1.lock(); // Acquisisce il primo mutex
    std::this_thread::sleep_for(std::chrono::milliseconds(100)); // Simula un'operazione
    mtx2.lock(); // Tenta di acquisire il secondo mutex (potenziale deadlock)
    
    // Operazioni con entrambi i mutex
    
    mtx2.unlock();
    mtx1.unlock();
}

void thread_2_function() {
    mtx2.lock(); // Acquisisce il secondo mutex
    std::this_thread::sleep_for(std::chrono::milliseconds(100)); // Simula un'operazione
    mtx1.lock(); // Tenta di acquisire il primo mutex (potenziale deadlock)
    
    // Operazioni con entrambi i mutex
    
    mtx1.unlock();
    mtx2.unlock();
}

int main() {
    std::thread t1(thread_1_function);
    std::thread t2(thread_2_function);
    
    t1.join();
    t2.join();
    
    return 0;
}
```

### Strategie per Evitare Deadlock

1. **Ordine di acquisizione coerente**: Acquisire sempre i mutex nello stesso ordine in tutti i thread.
2. **Utilizzo di `std::lock` o `std::scoped_lock`**: Queste funzioni acquisiscono più mutex atomicamente.
3. **Timeout**: Utilizzare `std::timed_mutex` con timeout per evitare attese infinite.
4. **Evitare lock nidificati**: Minimizzare l'acquisizione di un mutex mentre si detiene già un altro.

```cpp
#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx1, mtx2;

void safe_function() {
    // Acquisisce entrambi i mutex in modo atomico e sicuro da deadlock
    std::lock(mtx1, mtx2);
    
    // Adotta i mutex in lock_guard per il rilascio automatico
    std::lock_guard<std::mutex> lock1(mtx1, std::adopt_lock);
    std::lock_guard<std::mutex> lock2(mtx2, std::adopt_lock);
    
    // Operazioni con entrambi i mutex
    std::cout << "Accesso sicuro a risorse multiple" << std::endl;
}

int main() {
    std::thread t1(safe_function);
    std::thread t2(safe_function);
    
    t1.join();
    t2.join();
    
    return 0;
}
```

## Casi d'Uso Comuni

### Protezione di Dati Condivisi

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <vector>

class ThreadSafeCounter {
private:
    mutable std::mutex mtx; // mutable permette la modifica in metodi const
    int value;

public:
    ThreadSafeCounter() : value(0) {}
    
    // Incrementa il contatore
    void increment() {
        std::lock_guard<std::mutex> lock(mtx);
        ++value;
    }
    
    // Ottiene il valore corrente
    int get() const {
        std::lock_guard<std::mutex> lock(mtx);
        return value;
    }
};

int main() {
    ThreadSafeCounter counter;
    std::vector<std::thread> threads;
    
    // Crea 10 thread che incrementano il contatore
    for (int i = 0; i < 10; ++i) {
        threads.push_back(std::thread([&counter]() {
            for (int j = 0; j < 1000; ++j) {
                counter.increment();
            }
        }));
    }
    
    // Attende il completamento di tutti i thread
    for (auto& t : threads) {
        t.join();
    }
    
    std::cout << "Valore finale: " << counter.get() << std::endl;
    return 0;
}
```

### Inizializzazione Lazy Thread-Safe (Singleton)

```cpp
#include <iostream>
#include <mutex>

class Singleton {
private:
    static Singleton* instance;
    static std::mutex mtx;
    
    // Costruttore privato
    Singleton() {
        std::cout << "Singleton creato" << std::endl;
    }
    
public:
    // Non permettere la copia
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;
    
    // Metodo per ottenere l'istanza
    static Singleton* getInstance() {
        // Double-checked locking pattern
        if (instance == nullptr) {
            std::lock_guard<std::mutex> lock(mtx);
            if (instance == nullptr) {
                instance = new Singleton();
            }
        }
        return instance;
    }
};

// Inizializzazione delle variabili statiche
Singleton* Singleton::instance = nullptr;
std::mutex Singleton::mtx;

int main() {
    // Il singleton viene creato solo la prima volta
    Singleton* s1 = Singleton::getInstance();
    Singleton* s2 = Singleton::getInstance();
    
    std::cout << "Indirizzi: " << s1 << " e " << s2 << std::endl;
    return 0;
}
```

## Domande di Autovalutazione

1. Qual è la differenza principale tra `std::mutex` e `std::recursive_mutex`?
2. Perché è preferibile utilizzare `std::lock_guard` o `std::unique_lock` invece di chiamare direttamente `lock()` e `unlock()`?
3. Cosa è un deadlock e quali strategie si possono adottare per evitarlo?
4. In quali situazioni è più appropriato utilizzare `std::unique_lock` rispetto a `std::lock_guard`?
5. Come funziona il pattern "double-checked locking" e perché è utile?

## Esercizi Proposti

1. Implementa una classe `ThreadSafeQueue<T>` che permetta l'inserimento e l'estrazione di elementi in modo thread-safe.
2. Modifica l'esempio di deadlock per utilizzare `std::scoped_lock` e dimostrare come evitare il problema.
3. Implementa un pattern "readers-writers" utilizzando `std::shared_mutex` (C++17) che permetta a più lettori di accedere contemporaneamente a una risorsa, ma garantisca accesso esclusivo agli scrittori.
4. Crea un programma che simuli un sistema bancario con più conti e permetta trasferimenti tra conti in modo thread-safe, evitando deadlock.
5. Implementa una versione thread-safe del pattern Singleton utilizzando la tecnica di inizializzazione statica locale (Meyers Singleton).

## Conclusione

I mutex e i lock sono strumenti fondamentali per la sincronizzazione dei thread in C++. Utilizzati correttamente, permettono di proteggere le risorse condivise e prevenire race condition. Tuttavia, è importante essere consapevoli dei potenziali problemi come deadlock e starvation, e adottare le strategie appropriate per evitarli.

Nella prossima sezione, esploreremo le condition variables, un altro importante meccanismo di sincronizzazione che permette ai thread di comunicare tra loro e coordinarsi in base a condizioni specifiche.