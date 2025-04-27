# Pattern di Concorrenza

## Introduzione

I pattern di concorrenza sono soluzioni riutilizzabili a problemi comuni nella programmazione concorrente. Questi modelli aiutano a strutturare il codice in modo da gestire efficacemente la concorrenza, migliorando la leggibilità, la manutenibilità e le prestazioni delle applicazioni multi-thread.

In questa sezione, esploreremo alcuni dei pattern di concorrenza più comuni e utili in C++.

## Pattern Producer-Consumer

Il pattern Producer-Consumer è uno dei modelli di concorrenza più utilizzati. In questo pattern:

- I thread "producer" generano dati e li inseriscono in una struttura dati condivisa (buffer)
- I thread "consumer" prelevano i dati dal buffer e li elaborano

Questo pattern è particolarmente utile quando la generazione e l'elaborazione dei dati possono avvenire a velocità diverse.

```cpp
#include <iostream>
#include <queue>
#include <thread>
#include <mutex>
#include <condition_variable>

template<typename T>
class ThreadSafeQueue {
private:
    std::queue<T> queue;
    mutable std::mutex mutex;
    std::condition_variable cond_not_empty;
    std::condition_variable cond_not_full;
    unsigned int capacity;

public:
    ThreadSafeQueue(unsigned int cap = 10) : capacity(cap) {}

    void push(T value) {
        std::unique_lock<std::mutex> lock(mutex);
        
        // Attende che la coda non sia piena
        cond_not_full.wait(lock, [this] { return queue.size() < capacity; });
        
        queue.push(value);
        
        // Notifica che la coda non è più vuota
        cond_not_empty.notify_one();
    }

    T pop() {
        std::unique_lock<std::mutex> lock(mutex);
        
        // Attende che la coda non sia vuota
        cond_not_empty.wait(lock, [this] { return !queue.empty(); });
        
        T value = queue.front();
        queue.pop();
        
        // Notifica che la coda non è più piena
        cond_not_full.notify_one();
        
        return value;
    }
};

ThreadSafeQueue<int> buffer;

void producer() {
    for (int i = 0; i < 20; ++i) {
        buffer.push(i);
        std::cout << "Prodotto: " << i << std::endl;
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
}

void consumer() {
    for (int i = 0; i < 20; ++i) {
        int value = buffer.pop();
        std::cout << "Consumato: " << value << std::endl;
        std::this_thread::sleep_for(std::chrono::milliseconds(150));
    }
}

int main() {
    std::thread prod(producer);
    std::thread cons(consumer);
    
    prod.join();
    cons.join();
    
    return 0;
}
```

## Pattern Thread Pool

Il pattern Thread Pool gestisce un gruppo di thread worker che attendono e processano task. Questo pattern è utile per:

- Limitare il numero di thread attivi contemporaneamente
- Riutilizzare i thread per più task, evitando il costo di creazione/distruzione
- Bilanciare il carico di lavoro tra i thread disponibili

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <functional>
#include <future>

class ThreadPool {
private:
    std::vector<std::thread> workers;
    std::queue<std::function<void()>> tasks;
    
    std::mutex queue_mutex;
    std::condition_variable condition;
    bool stop;

public:
    ThreadPool(size_t threads) : stop(false) {
        for (size_t i = 0; i < threads; ++i) {
            workers.emplace_back([this] {
                while (true) {
                    std::function<void()> task;
                    
                    {
                        std::unique_lock<std::mutex> lock(this->queue_mutex);
                        this->condition.wait(lock, [this] { 
                            return this->stop || !this->tasks.empty(); 
                        });
                        
                        if (this->stop && this->tasks.empty()) {
                            return;
                        }
                        
                        task = std::move(this->tasks.front());
                        this->tasks.pop();
                    }
                    
                    task();
                }
            });
        }
    }
    
    template<class F, class... Args>
    auto enqueue(F&& f, Args&&... args) -> std::future<typename std::result_of<F(Args...)>::type> {
        using return_type = typename std::result_of<F(Args...)>::type;
        
        auto task = std::make_shared<std::packaged_task<return_type()>>(
            std::bind(std::forward<F>(f), std::forward<Args>(args)...)
        );
        
        std::future<return_type> res = task->get_future();
        
        {
            std::unique_lock<std::mutex> lock(queue_mutex);
            if (stop) {
                throw std::runtime_error("enqueue su thread pool fermato");
            }
            
            tasks.emplace([task]() { (*task)(); });
        }
        
        condition.notify_one();
        return res;
    }
    
    ~ThreadPool() {
        {
            std::unique_lock<std::mutex> lock(queue_mutex);
            stop = true;
        }
        
        condition.notify_all();
        
        for (std::thread &worker : workers) {
            worker.join();
        }
    }
};

// Esempio di utilizzo
int main() {
    ThreadPool pool(4); // Crea un pool con 4 thread
    
    // Invia alcuni task al pool
    std::vector<std::future<int>> results;
    
    for (int i = 0; i < 8; ++i) {
        results.emplace_back(
            pool.enqueue([i] {
                std::cout << "Task " << i << " eseguito dal thread " 
                          << std::this_thread::get_id() << std::endl;
                std::this_thread::sleep_for(std::chrono::seconds(1));
                return i * i;
            })
        );
    }
    
    // Recupera i risultati
    for (auto &result : results) {
        std::cout << "Risultato: " << result.get() << std::endl;
    }
    
    return 0;
}
```

## Pattern Read-Write Lock

Il pattern Read-Write Lock permette l'accesso concorrente in lettura ma esclusivo in scrittura. Questo è utile quando:

- Le operazioni di lettura sono molto più frequenti delle scritture
- Più thread possono leggere contemporaneamente senza problemi
- Le operazioni di scrittura richiedono accesso esclusivo

C++17 fornisce `std::shared_mutex` che implementa questo pattern:

```cpp
#include <iostream>
#include <thread>
#include <shared_mutex>
#include <vector>
#include <chrono>

class ThreadSafeCounter {
private:
    mutable std::shared_mutex mutex;
    int value = 0;

public:
    // Operazione di scrittura - accesso esclusivo
    void increment() {
        std::unique_lock<std::shared_mutex> lock(mutex);
        ++value;
    }
    
    // Operazione di lettura - accesso condiviso
    int get() const {
        std::shared_lock<std::shared_mutex> lock(mutex);
        return value;
    }
};

ThreadSafeCounter counter;

void reader(int id) {
    for (int i = 0; i < 5; ++i) {
        // Legge il valore (accesso condiviso)
        int value = counter.get();
        std::cout << "Reader " << id << ": valore letto = " << value << std::endl;
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
}

void writer(int id) {
    for (int i = 0; i < 3; ++i) {
        // Incrementa il valore (accesso esclusivo)
        counter.increment();
        std::cout << "Writer " << id << ": incrementato valore" << std::endl;
        std::this_thread::sleep_for(std::chrono::milliseconds(200));
    }
}

int main() {
    std::vector<std::thread> threads;
    
    // Crea 5 thread reader
    for (int i = 0; i < 5; ++i) {
        threads.emplace_back(reader, i);
    }
    
    // Crea 2 thread writer
    for (int i = 0; i < 2; ++i) {
        threads.emplace_back(writer, i);
    }
    
    // Attende il completamento di tutti i thread
    for (auto& t : threads) {
        t.join();
    }
    
    return 0;
}
```

## Pattern Active Object

Il pattern Active Object disaccoppia l'esecuzione del metodo dalla sua invocazione, permettendo di eseguire metodi in un thread dedicato. Questo pattern è utile per:

- Incapsulare la concorrenza all'interno di un oggetto
- Semplificare la sincronizzazione
- Migliorare la modularità del codice concorrente

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <queue>
#include <functional>
#include <future>

class ActiveObject {
private:
    std::thread worker;
    std::queue<std::function<void()>> tasks;
    std::mutex mutex;
    std::condition_variable condition;
    bool stop;

public:
    ActiveObject() : stop(false) {
        worker = std::thread([this] {
            while (true) {
                std::function<void()> task;
                
                {
                    std::unique_lock<std::mutex> lock(this->mutex);
                    this->condition.wait(lock, [this] { 
                        return this->stop || !this->tasks.empty(); 
                    });
                    
                    if (this->stop && this->tasks.empty()) {
                        return;
                    }
                    
                    task = std::move(this->tasks.front());
                    this->tasks.pop();
                }
                
                task();
            }
        });
    }
    
    template<class F, class... Args>
    auto enqueue(F&& f, Args&&... args) -> std::future<typename std::result_of<F(Args...)>::type> {
        using return_type = typename std::result_of<F(Args...)>::type;
        
        auto task = std::make_shared<std::packaged_task<return_type()>>(
            std::bind(std::forward<F>(f), std::forward<Args>(args)...)
        );
        
        std::future<return_type> res = task->get_future();
        
        {
            std::unique_lock<std::mutex> lock(mutex);
            if (stop) {
                throw std::runtime_error("enqueue su active object fermato");
            }
            
            tasks.emplace([task]() { (*task)(); });
        }
        
        condition.notify_one();
        return res;
    }
    
    ~ActiveObject() {
        {
            std::unique_lock<std::mutex> lock(mutex);
            stop = true;
        }
        
        condition.notify_one();
        
        if (worker.joinable()) {
            worker.join();
        }
    }
};

// Esempio di utilizzo
class Calculator {
private:
    ActiveObject active;

public:
    std::future<int> add(int a, int b) {
        return active.enqueue([a, b] {
            std::this_thread::sleep_for(std::chrono::seconds(1)); // Simula un'operazione lunga
            return a + b;
        });
    }
    
    std::future<int> multiply(int a, int b) {
        return active.enqueue([a, b] {
            std::this_thread::sleep_for(std::chrono::seconds(1)); // Simula un'operazione lunga
            return a * b;
        });
    }
};

int main() {
    Calculator calc;
    
    // Esegue operazioni in modo asincrono
    auto sum_future = calc.add(5, 3);
    auto product_future = calc.multiply(5, 3);
    
    // Fa altre cose mentre le operazioni vengono eseguite
    std::cout << "Operazioni in corso..." << std::endl;
    
    // Ottiene i risultati quando sono pronti
    std::cout << "Somma: " << sum_future.get() << std::endl;
    std::cout << "Prodotto: " << product_future.get() << std::endl;
    
    return 0;
}
```

## Domande di Autovalutazione

1. Quali sono i vantaggi del pattern Producer-Consumer nella programmazione concorrente?
2. In quali situazioni è preferibile utilizzare un Thread Pool rispetto alla creazione di thread individuali?
3. Qual è la differenza principale tra un mutex standard e un Read-Write Lock?
4. Come il pattern Active Object aiuta a gestire la concorrenza in un'applicazione orientata agli oggetti?
5. Quali problemi di concorrenza possono essere risolti utilizzando questi pattern?

## Esercizi Proposti

1. **Implementazione di una Pipeline Concorrente**: Crea una pipeline di elaborazione dati con tre stadi, dove ogni stadio è gestito da un thread separato. I dati devono fluire dal primo all'ultimo stadio.

2. **Sistema di Log Thread-Safe**: Implementa un sistema di logging che permetta a più thread di scrivere messaggi in un file di log in modo thread-safe, utilizzando il pattern Producer-Consumer.

3. **Cache Concorrente**: Implementa una cache che permetta accessi concorrenti in lettura ma esclusivi in scrittura, utilizzando `std::shared_mutex`.

4. **Scheduler di Task**: Crea uno scheduler che permetta di programmare l'esecuzione di task a intervalli regolari utilizzando un Thread Pool.

5. **Simulazione di un Sistema Bancario**: Implementa un sistema bancario semplificato dove più clienti (thread) possono effettuare operazioni su conti correnti. Utilizza i pattern appropriati per garantire la consistenza dei dati.

## Conclusione

I pattern di concorrenza forniscono soluzioni collaudate a problemi comuni nella programmazione multi-thread. Utilizzando questi pattern, è possibile creare applicazioni concorrenti più robuste, efficienti e manutenibili.

Nella prossima sezione, esploreremo i problemi comuni nella programmazione concorrente e le tecniche di debugging per risolverli.