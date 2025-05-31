# Async e Parallel Algorithms in C++

## Introduzione

C++ moderno offre strumenti di alto livello per la programmazione concorrente che semplificano notevolmente l'esecuzione di codice in parallelo. In questa sezione, esploreremo `std::async` e gli algoritmi paralleli introdotti in C++17, che permettono di sfruttare la potenza dei processori multi-core con un'interfaccia semplice ed elegante.

## std::async

`std::async` è una funzione template definita nella header `<future>` che esegue una funzione in modo asincrono (potenzialmente in un thread separato) e restituisce un `std::future` che conterrà il risultato dell'operazione.

### Sintassi Base

```cpp
template <class Function, class... Args>
future<typename result_of<Function(Args...)>::type>
async(Function&& f, Args&&... args);

template <class Function, class... Args>
future<typename result_of<Function(Args...)>::type>
async(launch policy, Function&& f, Args&&... args);
```

Dove `policy` può essere:

- `std::launch::async`: La funzione viene eseguita in un thread separato
- `std::launch::deferred`: La funzione viene eseguita in modo lazy (solo quando si chiama `get()` o `wait()` sul future)
- `std::launch::async | std::launch::deferred` (default): L'implementazione sceglie la politica

### Esempio Base

```cpp
#include <iostream>
#include <future>
#include <chrono>

int calculate() {
    std::cout << "Calcolo in corso..." << std::endl;
    std::this_thread::sleep_for(std::chrono::seconds(2)); // Simula un'operazione lunga
    return 42;
}

int main() {
    // Avvia il calcolo in modo asincrono
    std::future<int> result = std::async(std::launch::async, calculate);
    
    std::cout << "Facendo altro lavoro mentre il calcolo è in corso..." << std::endl;
    std::this_thread::sleep_for(std::chrono::seconds(1));
    
    // Attende e recupera il risultato
    std::cout << "Risultato: " << result.get() << std::endl;
    
    return 0;
}
```

In questo esempio, `calculate()` viene eseguito in un thread separato mentre il thread principale continua l'esecuzione. Quando chiamiamo `result.get()`, il thread principale attende il completamento del calcolo e recupera il risultato.

### Vantaggi di std::async

- **Semplicità**: Molto più semplice da usare rispetto alla gestione manuale di thread, promise e future
- **Gestione automatica delle eccezioni**: Le eccezioni lanciate nella funzione asincrona vengono propagate automaticamente quando si chiama `get()`
- **Gestione automatica del ciclo di vita del thread**: Non è necessario chiamare `join()` o `detach()`

### Esempio con Parametri e Valore di Ritorno

```cpp
#include <iostream>
#include <future>
#include <string>

std::string create_greeting(const std::string& name) {
    std::this_thread::sleep_for(std::chrono::seconds(1)); // Simula un'operazione
    return "Ciao, " + name + "!";
}

int main() {
    // Avvia più operazioni asincrone
    auto greeting1 = std::async(create_greeting, "Mario");
    auto greeting2 = std::async(create_greeting, "Luigi");
    auto greeting3 = std::async(create_greeting, "Peach");
    
    // Recupera i risultati (potenzialmente in parallelo)
    std::cout << greeting1.get() << std::endl;
    std::cout << greeting2.get() << std::endl;
    std::cout << greeting3.get() << std::endl;
    
    return 0;
}
```

### Politiche di Lancio

```cpp
#include <iostream>
#include <future>

int calculate() {
    std::cout << "Thread ID: " << std::this_thread::get_id() << std::endl;
    return 42;
}

int main() {
    std::cout << "Thread principale ID: " << std::this_thread::get_id() << std::endl;
    
    // Esecuzione asincrona (in un thread separato)
    auto f1 = std::async(std::launch::async, calculate);
    f1.get();
    
    // Esecuzione differita (nello stesso thread quando si chiama get())
    auto f2 = std::async(std::launch::deferred, calculate);
    f2.get();
    
    return 0;
}
```

In questo esempio, `f1` viene eseguito in un thread separato, mentre `f2` viene eseguito nel thread principale quando si chiama `get()`.

## Parallel Algorithms (C++17)

C++17 ha introdotto versioni parallele di molti algoritmi della libreria standard. Questi algoritmi possono eseguire operazioni in parallelo su collezioni di dati, sfruttando automaticamente i processori multi-core.

Gli algoritmi paralleli sono definiti nella header `<execution>` e utilizzano politiche di esecuzione per specificare come devono essere eseguiti.

### Politiche di Esecuzione

- `std::execution::sequenced_policy` (`std::execution::seq`): Esecuzione sequenziale
- `std::execution::parallel_policy` (`std::execution::par`): Esecuzione parallela
- `std::execution::parallel_unsequenced_policy` (`std::execution::par_unseq`): Esecuzione parallela e vettorizzata

### Esempio: for_each Parallelo

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <execution>
#include <chrono>

int main() {
    // Crea un grande vettore
    std::vector<int> v(10000000, 1);
    
    // Versione sequenziale
    auto start = std::chrono::high_resolution_clock::now();
    std::for_each(std::execution::seq, v.begin(), v.end(), [](int& x) { x = x * 2; });
    auto end = std::chrono::high_resolution_clock::now();
    std::cout << "Sequenziale: " << std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count() << "ms" << std::endl;
    
    // Versione parallela
    start = std::chrono::high_resolution_clock::now();
    std::for_each(std::execution::par, v.begin(), v.end(), [](int& x) { x = x * 2; });
    end = std::chrono::high_resolution_clock::now();
    std::cout << "Parallelo: " << std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count() << "ms" << std::endl;
    
    return 0;
}
```

In questo esempio, confrontiamo le prestazioni dell'algoritmo `for_each` eseguito in modo sequenziale e parallelo.

### Altri Algoritmi Paralleli

La maggior parte degli algoritmi della libreria standard supporta l'esecuzione parallela in C++17. Ecco alcuni esempi:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
#include <execution>

int main() {
    std::vector<int> v(1000000);
    
    // Riempie il vettore con numeri da 0 a 999999
    std::iota(v.begin(), v.end(), 0);
    
    // Trova la somma in parallelo
    int sum = std::reduce(std::execution::par, v.begin(), v.end(), 0);
    std::cout << "Somma: " << sum << std::endl;
    
    // Ordina in parallelo
    std::sort(std::execution::par, v.begin(), v.end(), std::greater<int>());
    
    // Verifica se tutti gli elementi soddisfano una condizione
    bool all_positive = std::all_of(std::execution::par, v.begin(), v.end(), [](int x) { return x >= 0; });
    std::cout << "Tutti positivi: " << (all_positive ? "sì" : "no") << std::endl;
    
    return 0;
}
```

### Considerazioni sull'Uso degli Algoritmi Paralleli

1. **Overhead**: L'esecuzione parallela introduce un overhead di sincronizzazione. Per collezioni piccole, l'esecuzione sequenziale potrebbe essere più veloce.
2. **Funzioni non bloccanti**: Le lambda o funzioni passate agli algoritmi paralleli non dovrebbero bloccarsi o attendere altre operazioni.
3. **Race condition**: Fai attenzione alle race condition quando modifichi dati condivisi all'interno delle funzioni passate agli algoritmi paralleli.
4. **Eccezioni**: Se una funzione lanciata in parallelo lancia un'eccezione, il comportamento dipende dall'implementazione.

## Combinare std::async e Algoritmi Paralleli

È possibile combinare `std::async` e gli algoritmi paralleli per ottenere un controllo più fine sulla concorrenza:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <execution>
#include <future>

// Funzione che elabora una parte di un vettore
void process_chunk(std::vector<int>& v, size_t start, size_t end) {
    std::sort(std::execution::par, v.begin() + start, v.begin() + end);
}

int main() {
    std::vector<int> data(10000000);
    // Riempie il vettore con numeri casuali
    std::generate(data.begin(), data.end(), []() { return rand() % 1000; });
    
    // Divide il lavoro in chunk e li elabora in modo asincrono
    size_t chunk_size = data.size() / 4;
    std::vector<std::future<void>> futures;
    
    for (size_t i = 0; i < 4; ++i) {
        size_t start = i * chunk_size;
        size_t end = (i == 3) ? data.size() : (i + 1) * chunk_size;
        
        futures.push_back(std::async(std::launch::async, process_chunk, std::ref(data), start, end));
    }
    
    // Attende il completamento di tutti i task
    for (auto& f : futures) {
        f.wait();
    }
    
    // Unisce i chunk ordinati
    std::vector<int> result;
    result.reserve(data.size());
    
    std::vector<size_t> indices(4, 0);
    for (size_t i = 0; i < data.size(); ++i) {
        size_t min_idx = 0;
        int min_val = std::numeric_limits<int>::max();
        
        for (size_t j = 0; j < 4; ++j) {
            size_t idx = j * chunk_size + indices[j];
            if (indices[j] < chunk_size && data[idx] < min_val) {
                min_val = data[idx];
                min_idx = j;
            }
        }
        
        result.push_back(min_val);
        indices[min_idx]++;
    }
    
    // Verifica che il risultato sia ordinato
    bool is_sorted = std::is_sorted(result.begin(), result.end());
    std::cout << "Risultato ordinato: " << (is_sorted ? "sì" : "no") << std::endl;
    
    return 0;
}
```

In questo esempio, dividiamo un grande vettore in chunk, ordiniamo ogni chunk in parallelo usando `std::async` e `std::sort` con `std::execution::par`, e poi uniamo i risultati.

## Best Practices

1. **Scegli la giusta granularità**: Dividi il lavoro in chunk abbastanza grandi da giustificare l'overhead della parallelizzazione.
2. **Evita la contesa**: Minimizza la condivisione di dati tra thread per ridurre la contesa e migliorare le prestazioni.
3. **Usa std::async per operazioni indipendenti**: `std::async` è ideale per operazioni che possono essere eseguite in modo completamente indipendente.
4. **Usa gli algoritmi paralleli per operazioni su collezioni**: Gli algoritmi paralleli sono ottimizzati per operazioni su grandi collezioni di dati.
5. **Testa le prestazioni**: Non assumere che il codice parallelo sia sempre più veloce. Misura le prestazioni e confronta diverse strategie.

## Esercizi Proposti

1. **Elaborazione di Immagini**: Implementa un programma che applica filtri a un'immagine in parallelo, dividendo l'immagine in regioni e utilizzando `std::async` per elaborare ogni regione.
2. **Map-Reduce**: Implementa un framework map-reduce semplificato utilizzando `std::async` per la fase di map e gli algoritmi paralleli per la fase di reduce.
3. **Web Crawler Parallelo**: Estendi l'esercizio del web crawler della sezione precedente utilizzando `std::async` per scaricare e analizzare più pagine contemporaneamente.
4. **Benchmark**: Crea un benchmark che confronta le prestazioni di diversi approcci alla parallelizzazione (thread manuali, `std::async`, algoritmi paralleli) su vari tipi di problemi.

## Domande di Autovalutazione

1. Qual è la differenza tra `std::launch::async` e `std::launch::deferred`?
2. In quali situazioni gli algoritmi paralleli potrebbero non offrire un miglioramento delle prestazioni?
3. Come gestisce `std::async` le eccezioni lanciate nella funzione asincrona?
4. Quali sono i potenziali problemi quando si utilizzano lambda che catturano variabili per riferimento negli algoritmi paralleli?
5. Come puoi combinare `std::async` e gli algoritmi paralleli per ottenere il massimo delle prestazioni?

## Conclusione

`std::async` e gli algoritmi paralleli offrono un'astrazione di alto livello per la programmazione concorrente in C++, permettendo di sfruttare la potenza dei processori multi-core con un'interfaccia semplice ed elegante. Questi strumenti sono particolarmente utili quando si desidera parallelizzare operazioni indipendenti o elaborare grandi collezioni di dati in parallelo.

Nella prossima sezione, esploreremo le operazioni atomiche, che forniscono primitive di sincronizzazione a basso livello per la programmazione concorrente ad alte prestazioni.