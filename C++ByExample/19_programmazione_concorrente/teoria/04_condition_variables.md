# Condition Variables in C++

## Introduzione

Le condition variables sono un meccanismo di sincronizzazione che permette ai thread di comunicare tra loro e di coordinarsi in base a determinate condizioni. Sono particolarmente utili quando un thread deve attendere che una certa condizione diventi vera prima di procedere, mentre altri thread possono notificare quando tale condizione è soddisfatta.

In C++, le condition variables sono implementate nella header `<condition_variable>`.

## Concetti Fondamentali

Una condition variable è sempre associata a un mutex, che protegge la condizione condivisa. Il pattern tipico di utilizzo è il seguente:

1. Un thread acquisisce un mutex
2. Verifica una condizione
3. Se la condizione non è soddisfatta, rilascia il mutex e si mette in attesa sulla condition variable
4. Quando un altro thread modifica la condizione, notifica la condition variable
5. Il thread in attesa viene risvegliato, riacquisisce il mutex e verifica nuovamente la condizione

## Utilizzo Base delle Condition Variables

```cpp
#include <iostream>
#include <condition_variable>
#include <mutex>
#include <thread>

std::mutex mtx;
std::condition_variable cv;
bool data_ready = false;

void worker_thread() {
    // Prepara i dati
    std::this_thread::sleep_for(std::chrono::seconds(1)); // Simula un'elaborazione
    
    // Notifica che i dati sono pronti
    {
        std::lock_guard<std::mutex> lock(mtx);
        data_ready = true;
        std::cout << "Worker: dati pronti!" << std::endl;
    }
    
    // Notifica la condition variable
    cv.notify_one();
}

void main_thread() {
    // Attende che i dati siano pronti
    std::unique_lock<std::mutex> lock(mtx);
    cv.wait(lock, [] { return data_ready; });
    
    // I dati sono pronti, procede con l'elaborazione
    std::cout << "Main: elaborazione dei dati" << std::endl;
}

int main() {
    std::thread worker(worker_thread);
    std::thread main(main_thread);
    
    worker.join();
    main.join();
    
    return 0;
}
```

In questo esempio:

- `main_thread` attende che `data_ready` diventi `true`
- `worker_thread` imposta `data_ready` a `true` e notifica `main_thread` tramite la condition variable
- `main_thread` si risveglia, verifica che `data_ready` sia effettivamente `true` e procede

## Metodi Principali

### wait

Il metodo `wait` ha due varianti principali:

```cpp
void wait(std::unique_lock<std::mutex>& lock);
template <class Predicate>
void wait(std::unique_lock<std::mutex>& lock, Predicate pred);
```

La prima variante rilascia il mutex e mette il thread in attesa. Quando il thread viene notificato, riacquisisce il mutex e ritorna.

La seconda variante è equivalente a:

```cpp
while (!pred()) {
    wait(lock);
}
```

Questo pattern è importante per gestire i "risvegli spuri" (spurious wakeups), situazioni in cui un thread può essere risvegliato anche senza una notifica esplicita.

### notify_one e notify_all

```cpp
void notify_one();
void notify_all();
```

- `notify_one()`: Risveglia un singolo thread in attesa sulla condition variable
- `notify_all()`: Risveglia tutti i thread in attesa sulla condition variable

## Esempio: Produttore-Consumatore

Un classico problema di sincronizzazione è quello del produttore-consumatore, dove un thread produce dati e un altro li consuma:

```cpp
#include <iostream>
#include <condition_variable>
#include <mutex>
#include <queue>
#include <thread>

std::mutex mtx;
std::condition_variable cv_not_empty;
std::condition_variable cv_not_full;
std::queue<int> buffer;
const int BUFFER_SIZE = 5;

void producer() {
    for (int i = 0; i < 10; ++i) {
        std::unique_lock<std::mutex> lock(mtx);
        
        // Attende che ci sia spazio nel buffer
        cv_not_full.wait(lock, [] { return buffer.size() < BUFFER_SIZE; });
        
        // Produce un elemento
        buffer.push(i);
        std::cout << "Prodotto: " << i << std::endl;
        
        // Notifica che il buffer non è più vuoto
        cv_not_empty.notify_one();
        
        lock.unlock();
        std::this_thread::sleep_for(std::chrono::milliseconds(200)); // Simula il tempo di produzione
    }
}

void consumer() {
    for (int i = 0; i < 10; ++i) {
        std::unique_lock<std::mutex> lock(mtx);
        
        // Attende che ci sia almeno un elemento nel buffer
        cv_not_empty.wait(lock, [] { return !buffer.empty(); });
        
        // Consuma un elemento
        int value = buffer.front();
        buffer.pop();
        std::cout << "Consumato: " << value << std::endl;
        
        // Notifica che il buffer non è più pieno
        cv_not_full.notify_one();
        
        lock.unlock();
        std::this_thread::sleep_for(std::chrono::milliseconds(500)); // Simula il tempo di consumo
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

In questo esempio:

- Il produttore attende che ci sia spazio nel buffer (`buffer.size() < BUFFER_SIZE`)
- Il consumatore attende che ci sia almeno un elemento nel buffer (`!buffer.empty()`)
- Ogni thread notifica l'altro quando la condizione di interesse cambia

## Timeout con wait_for e wait_until

Le condition variables supportano anche l'attesa con timeout:

```cpp
#include <iostream>
#include <condition_variable>
#include <mutex>
#include <thread>
#include <chrono>

std::mutex mtx;
std::condition_variable cv;
bool data_ready = false;

void worker_thread() {
    std::this_thread::sleep_for(std::chrono::seconds(2)); // Simula un'elaborazione lunga
    
    {
        std::lock_guard<std::mutex> lock(mtx);
        data_ready = true;
    }
    
    cv.notify_one();
}

void main_thread() {
    std::unique_lock<std::mutex> lock(mtx);
    
    // Attende che i dati siano pronti, ma non più di 1 secondo
    auto status = cv.wait_for(lock, std::chrono::seconds(1), [] { return data_ready; });
    
    if (status) {
        std::cout << "Dati ricevuti in tempo" << std::endl;
    } else {
        std::cout << "Timeout: dati non ricevuti in tempo" << std::endl;
    }
}

int main() {
    std::thread worker(worker_thread);
    std::thread main(main_thread);
    
    worker.join();
    main.join();
    
    return 0;
}
```

In questo esempio, `main_thread` attende i dati per al massimo 1 secondo, mentre `worker_thread` impiega 2 secondi per prepararli, quindi si verificherà un timeout.

## Best Practices

1. **Usa sempre un predicato**: Utilizza sempre la versione di `wait` con predicato per gestire i risvegli spuri.
2. **Verifica la condizione prima di wait**: Verifica sempre la condizione prima di chiamare `wait` per evitare race condition.
3. **Usa notify_all con cautela**: `notify_all` può causare il "thundering herd problem" (tutti i thread si risvegliano contemporaneamente), usa `notify_one` quando possibile.
4. **Minimizza il codice protetto dal mutex**: Rilascia il mutex il prima possibile per migliorare la concorrenza.
5. **Attenzione ai deadlock**: Fai attenzione quando usi più condition variables e mutex per evitare deadlock.

## Esercizi Proposti

1. **Semaforo**: Implementa un semaforo usando condition variables.
2. **Barriera**: Implementa una barriera che blocca i thread finché non ne arrivano N.
3. **Lettori-Scrittori**: Risolvi il problema dei lettori-scrittori usando condition variables.
4. **Produttore-Consumatore Multiplo**: Estendi l'esempio produttore-consumatore con più produttori e più consumatori.

## Domande di Autovalutazione

1. Perché le condition variables sono sempre associate a un mutex?
2. Qual è la differenza tra `notify_one()` e `notify_all()`?
3. Cosa sono i risvegli spuri e come si gestiscono?
4. Perché è importante usare `std::unique_lock` invece di `std::lock_guard` con le condition variables?
5. In quali scenari è utile utilizzare `wait_for` o `wait_until` invece di `wait`?

## Conclusione

Le condition variables sono un potente meccanismo di sincronizzazione che permette ai thread di comunicare tra loro in modo efficiente. Utilizzate correttamente, consentono di implementare pattern di concorrenza complessi come produttore-consumatore, lettori-scrittori e molti altri.

Nella prossima sezione, esploreremo le future e le promise, che forniscono un modo più astratto e orientato ai risultati per gestire la concorrenza in C++.