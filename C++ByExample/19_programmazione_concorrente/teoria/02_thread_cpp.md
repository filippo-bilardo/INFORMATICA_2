# Thread in C++

A partire da C++11, la libreria standard include il supporto nativo per i thread attraverso l'header `<thread>`. Questa implementazione fornisce un'interfaccia portabile per la creazione e la gestione dei thread su diverse piattaforme.

## La Classe `std::thread`

La classe `std::thread` rappresenta un singolo thread di esecuzione. Quando un oggetto `std::thread` viene creato, un nuovo thread viene avviato e inizia l'esecuzione della funzione specificata.

### Creazione di un Thread

```cpp
#include <iostream>
#include <thread>

// Funzione che verrà eseguita in un thread separato
void hello() {
    std::cout << "Hello from thread!" << std::endl;
}

int main() {
    // Creazione di un thread che esegue la funzione hello
    std::thread t(hello);
    
    // Attende che il thread completi l'esecuzione
    t.join();
    
    std::cout << "Hello from main!" << std::endl;
    
    return 0;
}
```

### Passaggio di Parametri ai Thread

È possibile passare parametri a un thread durante la sua creazione:

```cpp
#include <iostream>
#include <thread>
#include <string>

void greet(const std::string& name, int times) {
    for (int i = 0; i < times; ++i) {
        std::cout << "Hello, " << name << "!" << std::endl;
    }
}

int main() {
    // Passaggio di parametri al thread
    std::thread t(greet, "Alice", 3);
    
    t.join();
    
    return 0;
}
```

### Utilizzo di Funzioni Lambda

È possibile utilizzare funzioni lambda per definire il codice da eseguire in un thread:

```cpp
#include <iostream>
#include <thread>

int main() {
    int x = 10;
    
    // Utilizzo di una lambda per definire il codice del thread
    std::thread t([x]() {
        std::cout << "Valore di x nel thread: " << x << std::endl;
    });
    
    t.join();
    
    return 0;
}
```

## Gestione dei Thread

### join()

Il metodo `join()` blocca il thread chiamante fino a quando il thread su cui è chiamato non termina. È importante chiamare `join()` o `detach()` su ogni thread creato prima che l'oggetto `std::thread` venga distrutto.

```cpp
#include <iostream>
#include <thread>
#include <chrono>

void work() {
    std::this_thread::sleep_for(std::chrono::seconds(2));
    std::cout << "Lavoro completato!" << std::endl;
}

int main() {
    std::thread t(work);
    
    std::cout << "In attesa che il thread completi..." << std::endl;
    t.join(); // Blocca fino al completamento del thread
    std::cout << "Thread completato!" << std::endl;
    
    return 0;
}
```

### detach()

Il metodo `detach()` separa il thread dall'oggetto `std::thread`, permettendo al thread di continuare l'esecuzione indipendentemente. Dopo il detach, non è più possibile comunicare con il thread o attendere il suo completamento.

```cpp
#include <iostream>
#include <thread>
#include <chrono>

void background_task() {
    std::this_thread::sleep_for(std::chrono::seconds(2));
    std::cout << "Task in background completato!" << std::endl;
}

int main() {
    std::thread t(background_task);
    
    t.detach(); // Separa il thread dall'oggetto std::thread
    
    std::cout << "Il thread è stato distaccato e continua in background" << std::endl;
    
    // Il programma potrebbe terminare prima che il thread completi
    std::this_thread::sleep_for(std::chrono::seconds(3));
    
    return 0;
}
```

### Verifica dello Stato di un Thread

```cpp
#include <iostream>
#include <thread>

void task() {
    std::this_thread::sleep_for(std::chrono::seconds(1));
}

int main() {
    std::thread t;
    
    std::cout << "Il thread è joinable? " << (t.joinable() ? "Sì" : "No") << std::endl;
    
    t = std::thread(task);
    
    std::cout << "Il thread è joinable? " << (t.joinable() ? "Sì" : "No") << std::endl;
    
    t.join();
    
    std::cout << "Il thread è joinable? " << (t.joinable() ? "Sì" : "No") << std::endl;
    
    return 0;
}
```

## Funzioni Utili per i Thread

### Identificazione dei Thread

Ogni thread ha un ID unico che può essere ottenuto tramite `std::this_thread::get_id()` o `t.get_id()`.

```cpp
#include <iostream>
#include <thread>

void print_id() {
    std::cout << "ID del thread: " << std::this_thread::get_id() << std::endl;
}

int main() {
    std::thread t(print_id);
    
    std::cout << "ID del thread principale: " << std::this_thread::get_id() << std::endl;
    std::cout << "ID del thread creato: " << t.get_id() << std::endl;
    
    t.join();
    
    return 0;
}
```

### Sospensione dell'Esecuzione

È possibile sospendere l'esecuzione di un thread per un periodo di tempo specificato:

```cpp
#include <iostream>
#include <thread>
#include <chrono>

int main() {
    std::cout << "Inizio" << std::endl;
    
    // Sospende l'esecuzione per 2 secondi
    std::this_thread::sleep_for(std::chrono::seconds(2));
    
    std::cout << "Dopo 2 secondi" << std::endl;
    
    // Sospende l'esecuzione fino a un punto temporale specifico
    auto now = std::chrono::system_clock::now();
    std::this_thread::sleep_until(now + std::chrono::seconds(1));
    
    std::cout << "Dopo un altro secondo" << std::endl;
    
    return 0;
}
```

### Cedere il Controllo

Il metodo `std::this_thread::yield()` suggerisce al sistema operativo di cedere il controllo ad altri thread pronti per l'esecuzione:

```cpp
#include <iostream>
#include <thread>

void task(int id) {
    for (int i = 0; i < 5; ++i) {
        std::cout << "Thread " << id << ": iterazione " << i << std::endl;
        std::this_thread::yield(); // Suggerisce al sistema di cedere il controllo
    }
}

int main() {
    std::thread t1(task, 1);
    std::thread t2(task, 2);
    
    t1.join();
    t2.join();
    
    return 0;
}
```

## Numero di Thread Hardware

È possibile ottenere informazioni sul numero di thread hardware supportati dal sistema:

```cpp
#include <iostream>
#include <thread>

int main() {
    unsigned int num_threads = std::thread::hardware_concurrency();
    std::cout << "Questo sistema supporta " << num_threads << " thread hardware concorrenti" << std::endl;
    
    return 0;
}
```

## Best Practices

1. **Gestione delle Eccezioni**: Assicurarsi che le eccezioni lanciate nei thread siano gestite correttamente.

```cpp
#include <iostream>
#include <thread>
#include <exception>

void task_that_throws() {
    throw std::runtime_error("Eccezione nel thread");
}

void task_with_try_catch() {
    try {
        task_that_throws();
    } catch (const std::exception& e) {
        std::cout << "Eccezione catturata: " << e.what() << std::endl;
    }
}

int main() {
    std::thread t(task_with_try_catch);
    t.join();
    
    return 0;
}
```

2. **RAII per i Thread**: Utilizzare il pattern RAII (Resource Acquisition Is Initialization) per gestire i thread.

```cpp
#include <iostream>
#include <thread>

class ThreadGuard {
    std::thread& t;
public:
    explicit ThreadGuard(std::thread& t_) : t(t_) {}
    ~ThreadGuard() {
        if (t.joinable()) {
            t.join();
        }
    }
    // Impedisce la copia
    ThreadGuard(const ThreadGuard&) = delete;
    ThreadGuard& operator=(const ThreadGuard&) = delete;
};

void task() {
    std::this_thread::sleep_for(std::chrono::seconds(1));
    std::cout << "Task completato" << std::endl;
}

int main() {
    std::thread t(task);
    ThreadGuard g(t); // g si occuperà di chiamare join() su t
    
    // Anche se c'è un'eccezione qui, g.~ThreadGuard() verrà chiamato
    // e t.join() verrà eseguito
    
    return 0;
}
```

3. **Evitare Race Conditions**: Utilizzare meccanismi di sincronizzazione appropriati quando si accede a dati condivisi.

## Conclusione

I thread in C++ forniscono un potente strumento per la programmazione concorrente. Tuttavia, è importante utilizzarli con attenzione, gestendo correttamente la sincronizzazione e le risorse condivise per evitare problemi come race conditions e deadlock.

Nella prossima sezione, esploreremo i meccanismi di sincronizzazione come mutex e lock che aiutano a gestire l'accesso concorrente alle risorse condivise.

## Domande di Autovalutazione

1. Quali sono i due modi principali per gestire un thread dopo la sua creazione?
2. Cosa succede se un oggetto `std::thread` viene distrutto senza chiamare `join()` o `detach()`?
3. Come si può passare un parametro per riferimento a un thread?
4. Qual è la differenza tra `sleep_for` e `sleep_until`?
5. Come si può ottenere l'ID del thread corrente?

## Esercizi Proposti

1. Scrivi un programma che crei 5 thread, ognuno dei quali stampa il proprio ID e un messaggio personalizzato.
2. Implementa un programma che utilizzi thread per calcolare la somma degli elementi di un array, dividendo il lavoro tra più thread.
3. Crea una classe che utilizzi il pattern RAII per gestire automaticamente i thread.
4. Scrivi un programma che dimostri l'uso di `detach()` per eseguire un'attività in background.
5. Implementa un timer utilizzando i thread che esegue una funzione specificata dopo un certo periodo di tempo.