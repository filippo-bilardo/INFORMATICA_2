# Operazioni Atomiche in C++

## Introduzione

Le operazioni atomiche sono operazioni che vengono eseguite come un'unica unità indivisibile, senza possibilità di interruzione da parte di altri thread. In C++, la libreria standard fornisce il template `std::atomic<T>` e una serie di funzioni correlate nella header `<atomic>` per implementare operazioni atomiche in modo efficiente e portabile.

Le operazioni atomiche sono fondamentali per implementare algoritmi concorrenti senza lock (lock-free) e per costruire meccanismi di sincronizzazione più complessi.

## std::atomic

`std::atomic<T>` è un template di classe che incapsula un valore di tipo `T` e garantisce che le operazioni su questo valore siano atomiche. Ciò significa che, in un ambiente multi-thread, non ci saranno race condition quando più thread accedono contemporaneamente all'oggetto atomico.

### Tipi Atomici Comuni

- `std::atomic<bool>`
- `std::atomic<int>`
- `std::atomic<unsigned>`
- `std::atomic<long>`
- `std::atomic<long long>`
- `std::atomic<T*>` (puntatori atomici)

Inoltre, C++ fornisce alias per questi tipi comuni:

- `std::atomic_bool`
- `std::atomic_int`
- `std::atomic_uint`
- `std::atomic_long`
- `std::atomic_llong`

### Operazioni Base

```cpp
#include <iostream>
#include <atomic>
#include <thread>
#include <vector>

std::atomic<int> counter(0);

void increment() {
    for (int i = 0; i < 1000; ++i) {
        counter++; // Incremento atomico
    }
}

int main() {
    std::vector<std::thread> threads;
    
    // Crea 10 thread che incrementano il contatore
    for (int i = 0; i < 10; ++i) {
        threads.push_back(std::thread(increment));
    }
    
    // Attende il completamento di tutti i thread
    for (auto& t : threads) {
        t.join();
    }
    
    std::cout << "Valore finale del contatore: " << counter << std::endl;
    // Output atteso: 10000
    
    return 0;
}
```

In questo esempio, 10 thread incrementano un contatore atomico 1000 volte ciascuno. Poiché l'incremento è atomico, non ci sono race condition e il risultato finale è sempre 10000.

## Operazioni Atomiche Fondamentali

### load e store

```cpp
T load(std::memory_order order = std::memory_order_seq_cst) const noexcept;
void store(T desired, std::memory_order order = std::memory_order_seq_cst) noexcept;
```

- `load()`: Legge e restituisce il valore atomicamente
- `store()`: Imposta il valore atomicamente

```cpp
std::atomic<int> value(42);

int x = value.load(); // Legge atomicamente
value.store(100);     // Scrive atomicamente
```

### exchange

```cpp
T exchange(T desired, std::memory_order order = std::memory_order_seq_cst) noexcept;
```

Sostituisce il valore contenuto con `desired` e restituisce il valore precedente, tutto in un'unica operazione atomica.

```cpp
std::atomic<int> value(42);

int old_value = value.exchange(100); // old_value = 42, value = 100
```

### compare_exchange_weak e compare_exchange_strong

```cpp
bool compare_exchange_weak(T& expected, T desired,
                           std::memory_order success,
                           std::memory_order failure) noexcept;

bool compare_exchange_strong(T& expected, T desired,
                             std::memory_order success,
                             std::memory_order failure) noexcept;
```

Queste funzioni implementano l'operazione atomica Compare-And-Swap (CAS):

1. Confrontano il valore attuale con `expected`
2. Se sono uguali, sostituiscono il valore con `desired` e restituiscono `true`
3. Se sono diversi, aggiornano `expected` con il valore attuale e restituiscono `false`

La differenza tra le versioni `weak` e `strong` è che `compare_exchange_weak` può fallire spuriamente (restituire `false` anche se il valore era uguale a `expected`), mentre `compare_exchange_strong` garantisce di fallire solo se il valore è effettivamente diverso.

```cpp
std::atomic<int> value(42);

int expected = 42;
if (value.compare_exchange_strong(expected, 100)) {
    // Successo: value era 42, ora è 100
} else {
    // Fallimento: value non era 42, expected contiene il valore attuale
}
```

### Operazioni Aritmetiche e Bitwise

Per i tipi numerici, `std::atomic` fornisce operazioni aritmetiche e bitwise atomiche:

- `fetch_add`: Aggiunge un valore e restituisce il valore precedente
- `fetch_sub`: Sottrae un valore e restituisce il valore precedente
- `fetch_and`: Esegue AND bitwise e restituisce il valore precedente
- `fetch_or`: Esegue OR bitwise e restituisce il valore precedente
- `fetch_xor`: Esegue XOR bitwise e restituisce il valore precedente

```cpp
std::atomic<int> value(42);

int prev1 = value.fetch_add(10); // prev1 = 42, value = 52
int prev2 = value.fetch_sub(5);  // prev2 = 52, value = 47
int prev3 = value.fetch_and(0xF); // prev3 = 47, value = 15 (47 & 15)
int prev4 = value.fetch_or(0x30); // prev4 = 15, value = 63 (15 | 48)
int prev5 = value.fetch_xor(0xFF); // prev5 = 63, value = 192 (63 ^ 255)
```

## Modelli di Memoria

C++ definisce diversi modelli di memoria che specificano come le operazioni atomiche interagiscono con altre operazioni atomiche e non atomiche in un programma multi-thread. Questi modelli sono specificati tramite l'enumerazione `std::memory_order`.

### Tipi di Memory Order

- `std::memory_order_relaxed`: Garantisce solo l'atomicità dell'operazione, senza vincoli di ordinamento
- `std::memory_order_consume`: Garantisce ordinamento dipendente dai dati (deprecato in C++17)
- `std::memory_order_acquire`: Utilizzato per operazioni di lettura, garantisce che le operazioni successive non vengano riordinate prima di questa
- `std::memory_order_release`: Utilizzato per operazioni di scrittura, garantisce che le operazioni precedenti non vengano riordinate dopo questa
- `std::memory_order_acq_rel`: Combina acquire e release
- `std::memory_order_seq_cst`: Ordinamento sequenzialmente consistente (default)

### Esempio di Utilizzo

```cpp
#include <iostream>
#include <atomic>
#include <thread>

std::atomic<bool> ready(false);
std::atomic<int> data(0);

void producer() {
    // Prepara i dati
    data.store(42, std::memory_order_relaxed);
    // Segnala che i dati sono pronti
    ready.store(true, std::memory_order_release);
}

void consumer() {
    // Attende che i dati siano pronti
    while (!ready.load(std::memory_order_acquire)) {
        std::this_thread::yield();
    }
    // Legge i dati
    int value = data.load(std::memory_order_relaxed);
    std::cout << "Valore letto: " << value << std::endl;
}

int main() {
    std::thread t1(producer);
    std::thread t2(consumer);
    
    t1.join();
    t2.join();
    
    return 0;
}
```

In questo esempio:

1. Il producer imposta `data` e poi segnala che i dati sono pronti impostando `ready` a `true`
2. Il consumer attende che `ready` diventi `true` e poi legge `data`
3. L'uso di `memory_order_release` e `memory_order_acquire` garantisce che, quando il consumer vede `ready` come `true`, veda anche il valore aggiornato di `data`

## Fence (Barriere di Memoria)

Oltre alle operazioni atomiche, C++ fornisce anche funzioni di fence che impongono vincoli di ordinamento senza essere associate a una particolare variabile atomica:

```cpp
void atomic_thread_fence(std::memory_order order) noexcept;
```

Esempio:

```cpp
#include <atomic>
#include <thread>

std::atomic<bool> ready(false);
int data = 0; // Non atomico

void producer() {
    // Prepara i dati
    data = 42;
    // Fence che garantisce che la scrittura di data sia visibile
    std::atomic_thread_fence(std::memory_order_release);
    // Segnala che i dati sono pronti
    ready.store(true, std::memory_order_relaxed);
}

void consumer() {
    // Attende che i dati siano pronti
    while (!ready.load(std::memory_order_relaxed)) {
        std::this_thread::yield();
    }
    // Fence che garantisce che la lettura di data veda il valore aggiornato
    std::atomic_thread_fence(std::memory_order_acquire);
    // Legge i dati
    int value = data; // Non atomico
    std::cout << "Valore letto: " << value << std::endl;
}
```

## Implementazione di Algoritmi Lock-Free

Le operazioni atomiche sono fondamentali per implementare algoritmi concorrenti senza lock (lock-free). Ecco un esempio di una coda lock-free semplificata:

```cpp
#include <atomic>
#include <memory>

template<typename T>
class LockFreeQueue {
    struct Node {
        std::shared_ptr<T> data;
        std::atomic<Node*> next;
        
        Node() : next(nullptr) {}
    };
    
    std::atomic<Node*> head;
    std::atomic<Node*> tail;
    
public:
    LockFreeQueue() {
        Node* dummy = new Node();
        head.store(dummy);
        tail.store(dummy);
    }
    
    ~LockFreeQueue() {
        while (pop()) {}
        delete head.load();
    }
    
    void push(T value) {
        std::shared_ptr<T> new_data = std::make_shared<T>(std::move(value));
        Node* new_node = new Node();
        new_node->data = new_data;
        
        Node* old_tail = tail.load();
        while (!old_tail->next.compare_exchange_weak(nullptr, new_node)) {
            old_tail = tail.load();
        }
        
        tail.store(new_node);
    }
    
    std::shared_ptr<T> pop() {
        Node* old_head = head.load();
        Node* first = old_head->next.load();
        
        if (!first) {
            return nullptr; // Coda vuota
        }
        
        if (head.compare_exchange_strong(old_head, first)) {
            std::shared_ptr<T> result = first->data;
            delete old_head;
            return result;
        }
        
        return nullptr; // Qualcun altro ha fatto pop
    }
};
```

Questo è un esempio semplificato e non completamente corretto di una coda lock-free. Gli algoritmi lock-free reali sono molto più complessi e richiedono una comprensione approfondita dei modelli di memoria e delle garanzie fornite dalle operazioni atomiche.

## Considerazioni sulle Prestazioni

1. **Overhead**: Le operazioni atomiche possono essere più lente delle operazioni non atomiche, specialmente su architetture che non supportano nativamente certe operazioni atomiche.
2. **Contesa**: Quando molti thread accedono contemporaneamente alla stessa variabile atomica, si può verificare contesa, che può degradare significativamente le prestazioni.
3. **Memory Order**: L'uso di memory order meno restrittivi (`memory_order_relaxed`) può migliorare le prestazioni, ma richiede una comprensione approfondita dei modelli di memoria.
4. **False Sharing**: Le variabili atomiche che si trovano sulla stessa linea di cache possono causare false sharing, degradando le prestazioni.

## Best Practices

1. **Usa atomic solo quando necessario**: Le operazioni atomiche hanno un overhead, usale solo quando è necessaria la sincronizzazione.
2. **Scegli il memory order appropriato**: Usa il memory order più debole che soddisfa i tuoi requisiti di sincronizzazione.
3. **Evita il false sharing**: Assicurati che variabili atomiche accedute da thread diversi siano su linee di cache diverse.
4. **Preferisci algoritmi testati**: Gli algoritmi lock-free sono difficili da implementare correttamente, preferisci librerie testate quando possibile.
5. **Testa a fondo**: Gli errori di concorrenza possono essere difficili da riprodurre, testa a fondo il codice che utilizza operazioni atomiche.

## Esercizi Proposti

1. **Contatore Atomico**: Implementa un contatore atomico che supporta incremento, decremento e reset, e confronta le sue prestazioni con un contatore protetto da mutex.
2. **Spin Lock**: Implementa un semplice spin lock utilizzando `std::atomic_flag`.
3. **Double-Checked Locking**: Implementa il pattern double-checked locking utilizzando operazioni atomiche e memory order appropriati.
4. **Produttore-Consumatore Lock-Free**: Implementa una versione semplificata del problema produttore-consumatore utilizzando solo operazioni atomiche (senza mutex o condition variables).

## Domande di Autovalutazione

1. Qual è la differenza tra un'operazione atomica e un'operazione protetta da mutex?
2. Perché esistono diverse versioni di `compare_exchange` (weak e strong) e quando è preferibile usare l'una o l'altra?
3. Quali sono i diversi memory order disponibili in C++ e come influenzano le prestazioni e la correttezza?
4. Cosa significa che un algoritmo è "lock-free" e quali vantaggi offre rispetto agli algoritmi basati su lock?
5. In quali situazioni le operazioni atomiche potrebbero non offrire vantaggi di prestazioni rispetto ai mutex?

## Conclusione

Le operazioni atomiche sono un potente strumento per la programmazione concorrente ad alte prestazioni in C++. Permettono di implementare algoritmi concorrenti senza lock e di costruire meccanismi di sincronizzazione più complessi. Tuttavia, richiedono una comprensione approfondita dei modelli di memoria e delle garanzie fornite dalle operazioni atomiche.

Nella prossima sezione, esploreremo i pattern di concorrenza comuni, che forniscono soluzioni riutilizzabili per problemi di concorrenza ricorrenti.