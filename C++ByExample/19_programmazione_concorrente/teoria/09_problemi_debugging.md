# Problemi Comuni e Debugging nella Programmazione Concorrente

## Introduzione

La programmazione concorrente, sebbene potente, introduce una serie di sfide e problemi che possono essere difficili da identificare e risolvere. In questa sezione, esploreremo i problemi più comuni nella programmazione concorrente e le tecniche per il debugging di applicazioni multi-thread.

## Problemi Comuni nella Programmazione Concorrente

### Race Condition

Una race condition si verifica quando il comportamento di un programma dipende dalla sequenza o dalla tempistica di eventi non controllabili, come l'ordine di esecuzione dei thread.

```cpp
#include <iostream>
#include <thread>
#include <vector>

int counter = 0;

void increment() {
    for (int i = 0; i < 1000; ++i) {
        // Race condition: lettura e scrittura non atomiche
        counter++;
    }
}

int main() {
    std::vector<std::thread> threads;
    
    // Crea 10 thread che incrementano il contatore
    for (int i = 0; i < 10; ++i) {
        threads.emplace_back(increment);
    }
    
    // Attende il completamento di tutti i thread
    for (auto& t : threads) {
        t.join();
    }
    
    // Il valore atteso è 10000, ma potrebbe essere inferiore
    std::cout << "Valore finale: " << counter << std::endl;
    
    return 0;
}
```

**Soluzione**: Utilizzare meccanismi di sincronizzazione come mutex o operazioni atomiche.

```cpp
#include <iostream>
#include <thread>
#include <vector>
#include <mutex>

int counter = 0;
std::mutex counter_mutex;

void increment() {
    for (int i = 0; i < 1000; ++i) {
        // Protegge l'accesso alla variabile condivisa
        std::lock_guard<std::mutex> lock(counter_mutex);
        counter++;
    }
}

// Oppure usando operazioni atomiche
#include <atomic>
std::atomic<int> atomic_counter(0);

void atomic_increment() {
    for (int i = 0; i < 1000; ++i) {
        // Incremento atomico
        atomic_counter++;
    }
}
```

### Deadlock

Un deadlock si verifica quando due o più thread si bloccano a vicenda, ognuno in attesa che l'altro rilasci una risorsa.

```cpp
#include <iostream>
#include <thread>
#include <mutex>

std::mutex mutex1, mutex2;

void thread1_function() {
    // Acquisisce mutex1
    std::lock_guard<std::mutex> lock1(mutex1);
    std::cout << "Thread 1: mutex1 acquisito" << std::endl;
    
    // Simula un'operazione
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
    
    // Tenta di acquisire mutex2
    std::cout << "Thread 1: tentativo di acquisire mutex2" << std::endl;
    std::lock_guard<std::mutex> lock2(mutex2);
    
    std::cout << "Thread 1: mutex2 acquisito" << std::endl;
}

void thread2_function() {
    // Acquisisce mutex2
    std::lock_guard<std::mutex> lock2(mutex2);
    std::cout << "Thread 2: mutex2 acquisito" << std::endl;
    
    // Simula un'operazione
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
    
    // Tenta di acquisire mutex1
    std::cout << "Thread 2: tentativo di acquisire mutex1" << std::endl;
    std::lock_guard<std::mutex> lock1(mutex1);
    
    std::cout << "Thread 2: mutex1 acquisito" << std::endl;
}

int main() {
    std::thread t1(thread1_function);
    std::thread t2(thread2_function);
    
    t1.join();
    t2.join();
    
    std::cout << "Programma completato" << std::endl;
    
    return 0;
}
```

**Soluzione**: Utilizzare `std::lock` o `std::scoped_lock` per acquisire più mutex contemporaneamente, evitando deadlock.

```cpp
#include <iostream>
#include <thread>
#include <mutex>

std::mutex mutex1, mutex2;

void thread_function_safe() {
    // Acquisisce entrambi i mutex in modo sicuro
    std::scoped_lock lock(mutex1, mutex2);
    
    // Ora entrambi i mutex sono acquisiti, nessun rischio di deadlock
    std::cout << "Thread: entrambi i mutex acquisiti" << std::endl;
}
```

### Starvation

La starvation si verifica quando un thread non ottiene mai l'accesso alle risorse di cui ha bisogno per progredire.

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>

std::mutex mutex;
std::condition_variable cv;
bool high_priority_running = false;

void high_priority_task() {
    while (true) {
        {
            std::unique_lock<std::mutex> lock(mutex);
            high_priority_running = true;
        }
        
        // Esegue operazioni ad alta priorità
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
        
        {
            std::unique_lock<std::mutex> lock(mutex);
            high_priority_running = false;
        }
        
        // Notifica altri thread
        cv.notify_all();
        
        // Breve pausa
        std::this_thread::sleep_for(std::chrono::milliseconds(10));
    }
}

void low_priority_task() {
    while (true) {
        std::unique_lock<std::mutex> lock(mutex);
        
        // Attende che il task ad alta priorità non sia in esecuzione
        cv.wait(lock, [] { return !high_priority_running; });
        
        // Esegue operazioni a bassa priorità
        std::cout << "Task a bassa priorità in esecuzione" << std::endl;
        std::this_thread::sleep_for(std::chrono::milliseconds(50));
    }
}
```

**Soluzione**: Implementare un sistema di priorità equo o utilizzare meccanismi come `std::shared_mutex` per consentire l'accesso concorrente quando possibile.

### Livelock

Un livelock è simile a un deadlock, ma i thread coinvolti cambiano continuamente il loro stato in risposta alle azioni dell'altro, senza fare progressi effettivi.

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <atomic>

std::atomic<bool> resource_for_thread1(false);
std::atomic<bool> resource_for_thread2(false);

void thread1_function() {
    for (int i = 0; i < 10; ++i) {
        // Tenta di ottenere la risorsa
        while (resource_for_thread2.load()) {
            // Rilascia la propria risorsa per permettere all'altro thread di progredire
            resource_for_thread1.store(false);
            std::this_thread::sleep_for(std::chrono::milliseconds(10));
            // Riprova ad acquisire la risorsa
            resource_for_thread1.store(true);
        }
        
        std::cout << "Thread 1 sta usando la risorsa" << std::endl;
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
        resource_for_thread1.store(false);
    }
}

void thread2_function() {
    for (int i = 0; i < 10; ++i) {
        // Tenta di ottenere la risorsa
        while (resource_for_thread1.load()) {
            // Rilascia la propria risorsa per permettere all'altro thread di progredire
            resource_for_thread2.store(false);
            std::this_thread::sleep_for(std::chrono::milliseconds(10));
            // Riprova ad acquisire la risorsa
            resource_for_thread2.store(true);
        }
        
        std::cout << "Thread 2 sta usando la risorsa" << std::endl;
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
        resource_for_thread2.store(false);
    }
}
```

**Soluzione**: Introdurre un elemento di casualità o un sistema di priorità per rompere il ciclo.

## Tecniche di Debugging per Applicazioni Multi-thread

### Logging Thread-Safe

Implementare un sistema di logging thread-safe è fondamentale per il debugging di applicazioni concorrenti.

```cpp
#include <iostream>
#include <fstream>
#include <mutex>
#include <thread>
#include <string>
#include <sstream>

class Logger {
private:
    std::mutex mutex;
    std::ofstream file;

public:
    Logger(const std::string& filename) {
        file.open(filename, std::ios::out | std::ios::app);
    }

    ~Logger() {
        if (file.is_open()) {
            file.close();
        }
    }

    void log(const std::string& message) {
        std::lock_guard<std::mutex> lock(mutex);
        
        // Ottiene l'ID del thread corrente
        std::stringstream ss;
        ss << std::this_thread::get_id();
        
        // Scrive il messaggio nel file di log
        file << "[Thread " << ss.str() << "] " << message << std::endl;
    }
};

// Esempio di utilizzo
Logger logger("app.log");

void worker(int id) {
    logger.log("Thread " + std::to_string(id) + " avviato");
    
    // Esegue operazioni
    std::this_thread::sleep_for(std::chrono::milliseconds(100 * id));
    
    logger.log("Thread " + std::to_string(id) + " completato");
}
```

### Utilizzo di Strumenti di Analisi

Strumenti come Valgrind (con Helgrind), ThreadSanitizer e Intel Inspector possono aiutare a identificare problemi di concorrenza.

```bash
# Esempio di utilizzo di Valgrind con Helgrind
g++ -g -pthread -o my_program my_program.cpp
valgrind --tool=helgrind ./my_program

# Esempio di utilizzo di ThreadSanitizer
g++ -fsanitize=thread -g -o my_program my_program.cpp
./my_program
```

### Tecniche di Debugging Manuale

1. **Inserimento di Punti di Sincronizzazione**: Aggiungere barriere o punti di sincronizzazione per controllare l'ordine di esecuzione dei thread durante il debugging.

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>

std::mutex debug_mutex;
std::condition_variable debug_cv;
bool thread1_done = false;
bool thread2_done = false;

void thread1_function() {
    // Esegue operazioni
    std::cout << "Thread 1: operazioni in corso..." << std::endl;
    
    // Segnala il completamento
    {
        std::lock_guard<std::mutex> lock(debug_mutex);
        thread1_done = true;
    }
    debug_cv.notify_all();
    
    // Attende che thread2 completi
    {
        std::unique_lock<std::mutex> lock(debug_mutex);
        debug_cv.wait(lock, [] { return thread2_done; });
    }
    
    std::cout << "Thread 1: continua dopo thread2" << std::endl;
}

void thread2_function() {
    // Attende che thread1 completi
    {
        std::unique_lock<std::mutex> lock(debug_mutex);
        debug_cv.wait(lock, [] { return thread1_done; });
    }
    
    std::cout << "Thread 2: operazioni dopo thread1" << std::endl;
    
    // Segnala il completamento
    {
        std::lock_guard<std::mutex> lock(debug_mutex);
        thread2_done = true;
    }
    debug_cv.notify_all();
}
```

2. **Utilizzo di Assertion**: Inserire assertion per verificare invarianti e condizioni attese.

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <cassert>

int shared_value = 0;
std::mutex mutex;

void increment() {
    for (int i = 0; i < 1000; ++i) {
        std::lock_guard<std::mutex> lock(mutex);
        shared_value++;
        
        // Verifica che il valore sia sempre positivo
        assert(shared_value > 0);
    }
}

void decrement() {
    for (int i = 0; i < 500; ++i) {
        std::lock_guard<std::mutex> lock(mutex);
        shared_value--;
        
        // Verifica che il valore non diventi negativo
        assert(shared_value >= 0);
    }
}
```

## Strategie di Prevenzione

### Progettazione Thread-Safe

1. **Immutabilità**: Utilizzare oggetti immutabili quando possibile, poiché non richiedono sincronizzazione.

```cpp
class ImmutablePoint {
private:
    const int x;
    const int y;

public:
    ImmutablePoint(int x_val, int y_val) : x(x_val), y(y_val) {}
    
    int getX() const { return x; }
    int getY() const { return y; }
    
    // Crea un nuovo punto invece di modificare quello esistente
    ImmutablePoint translate(int dx, int dy) const {
        return ImmutablePoint(x + dx, y + dy);
    }
};
```

2. **Confinamento del Thread**: Limitare l'accesso ai dati a un singolo thread.

```cpp
#include <iostream>
#include <thread>
#include <vector>

void process_chunk(std::vector<int>& data, int start, int end) {
    // Ogni thread lavora su una porzione distinta dei dati
    for (int i = start; i < end; ++i) {
        data[i] = data[i] * data[i]; // Operazione sicura perché ogni thread accede a elementi diversi
    }
}

int main() {
    std::vector<int> data(1000);
    
    // Inizializza i dati
    for (int i = 0; i < 1000; ++i) {
        data[i] = i;
    }
    
    // Divide il lavoro tra 4 thread
    std::vector<std::thread> threads;
    int chunk_size = data.size() / 4;
    
    for (int i = 0; i < 4; ++i) {
        int start = i * chunk_size;
        int end = (i == 3) ? data.size() : (i + 1) * chunk_size;
        
        threads.emplace_back(process_chunk, std::ref(data), start, end);
    }
    
    // Attende il completamento
    for (auto& t : threads) {
        t.join();
    }
    
    return 0;
}
```

3. **Utilizzo di Strutture Dati Thread-Safe**: Utilizzare contenitori e strutture dati progettati per l'accesso concorrente.

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <vector>

template<typename T>
class ThreadSafeVector {
private:
    std::vector<T> data;
    mutable std::mutex mutex;

public:
    void push_back(const T& value) {
        std::lock_guard<std::mutex> lock(mutex);
        data.push_back(value);
    }
    
    T at(size_t index) const {
        std::lock_guard<std::mutex> lock(mutex);
        return data.at(index);
    }
    
    size_t size() const {
        std::lock_guard<std::mutex> lock(mutex);
        return data.size();
    }
};
```

## Domande di Autovalutazione

1. Quali sono le differenze tra deadlock e livelock? Come si possono prevenire entrambi?
2. Perché le race condition sono difficili da identificare e riprodurre? Quali tecniche possono aiutare a rilevarle?
3. Quali strumenti di analisi possono essere utilizzati per identificare problemi di concorrenza in un'applicazione C++?
4. Come si può implementare un sistema di logging thread-safe e perché è importante per il debugging di applicazioni concorrenti?
5. Quali strategie di progettazione possono aiutare a prevenire problemi di concorrenza fin dall'inizio?

## Esercizi Proposti

1. **Identificazione e Correzione di Race Condition**: Analizza un programma con una race condition e correggi il problema utilizzando mutex o operazioni atomiche.

2. **Risoluzione di Deadlock**: Identifica e risolvi un deadlock in un'applicazione multi-thread utilizzando `std::scoped_lock` o altre tecniche appropriate.

3. **Implementazione di un Logger Thread-Safe**: Crea un sistema di logging thread-safe che possa essere utilizzato da più thread contemporaneamente.

4. **Analisi con Strumenti di Debugging**: Utilizza Valgrind o ThreadSanitizer per analizzare un'applicazione concorrente e identificare potenziali problemi.

5. **Progettazione Thread-Safe**: Converti una classe esistente in una versione thread-safe, utilizzando le tecniche appropriate per garantire la sicurezza in un ambiente multi-thread.

## Conclusione

La programmazione concorrente introduce sfide uniche che richiedono attenzione e tecniche specifiche per essere affrontate. Comprendere i problemi comuni come race condition, deadlock, starvation e livelock è fondamentale per sviluppare applicazioni multi-thread robuste.

Le tecniche di debugging e gli strumenti di analisi possono aiutare a identificare e risolvere questi problemi, mentre le strategie di progettazione thread-safe possono prevenirli fin dall'inizio.

Con la pratica e l'applicazione delle tecniche discusse in questa sezione, è possibile sviluppare applicazioni concorrenti affidabili ed efficienti in C++.