# Profiling e Benchmarking in C++

## Introduzione

Il profiling e il benchmarking sono tecniche fondamentali per l'ottimizzazione delle prestazioni in C++. Queste tecniche permettono di identificare i colli di bottiglia nel codice e di misurare oggettivamente l'impatto delle ottimizzazioni apportate.

## Profiling

Il profiling è il processo di analisi del comportamento di un programma durante la sua esecuzione, con l'obiettivo di raccogliere informazioni su:

- Tempo di esecuzione delle funzioni
- Frequenza di chiamata delle funzioni
- Utilizzo della memoria
- Accessi al disco
- Utilizzo della CPU

### Tipi di Profiling

#### 1. Profiling del Tempo di Esecuzione

Questo tipo di profiling misura quanto tempo viene speso in ciascuna funzione o blocco di codice.

```cpp
#include <chrono>
#include <iostream>
#include <string>

class ProfilerTimer {
private:
    std::string m_nome;
    std::chrono::high_resolution_clock::time_point m_inizio;

public:
    ProfilerTimer(const std::string& nome) : m_nome(nome) {
        m_inizio = std::chrono::high_resolution_clock::now();
    }

    ~ProfilerTimer() {
        auto fine = std::chrono::high_resolution_clock::now();
        auto durata = std::chrono::duration_cast<std::chrono::microseconds>(fine - m_inizio).count();
        std::cout << m_nome << ": " << durata << " microsecondi" << std::endl;
    }
};

// Esempio di utilizzo
void funzione_costosa() {
    ProfilerTimer timer("funzione_costosa");
    // Codice da misurare
    for (int i = 0; i < 1000000; ++i) {
        // Operazione costosa
    }
}

int main() {
    ProfilerTimer timer_main("main");
    funzione_costosa();
    return 0;
}
```

#### 2. Profiling della Memoria

Questo tipo di profiling monitora l'allocazione e la deallocazione della memoria, aiutando a identificare memory leak e utilizzo inefficiente della memoria.

```cpp
#include <iostream>
#include <map>
#include <string>
#include <cstdlib>

// Semplice profiler di memoria (solo a scopo dimostrativo)
class MemoryProfiler {
private:
    static std::map<void*, size_t> allocazioni;

public:
    static void* alloca(size_t size, const char* file, int line) {
        void* ptr = std::malloc(size);
        allocazioni[ptr] = size;
        std::cout << "Allocati " << size << " bytes a " << ptr << " (" << file << ":" << line << ")" << std::endl;
        return ptr;
    }

    static void dealloca(void* ptr, const char* file, int line) {
        if (allocazioni.find(ptr) != allocazioni.end()) {
            std::cout << "Deallocati " << allocazioni[ptr] << " bytes da " << ptr << " (" << file << ":" << line << ")" << std::endl;
            allocazioni.erase(ptr);
            std::free(ptr);
        } else {
            std::cout << "Tentativo di deallocare memoria non allocata a " << ptr << " (" << file << ":" << line << ")" << std::endl;
        }
    }

    static void report() {
        size_t totale = 0;
        for (const auto& alloc : allocazioni) {
            totale += alloc.second;
        }
        std::cout << "Memory leak: " << allocazioni.size() << " allocazioni non deallocate, " << totale << " bytes totali" << std::endl;
    }
};

std::map<void*, size_t> MemoryProfiler::allocazioni;

// Macro per semplificare l'uso
#define MP_NEW(size) MemoryProfiler::alloca(size, __FILE__, __LINE__)
#define MP_DELETE(ptr) MemoryProfiler::dealloca(ptr, __FILE__, __LINE__)

// Esempio di utilizzo
int main() {
    void* p1 = MP_NEW(100);
    void* p2 = MP_NEW(200);
    
    MP_DELETE(p1);
    // p2 non viene deallocato (memory leak)
    
    MemoryProfiler::report();
    return 0;
}
```

### Strumenti di Profiling

#### 1. Strumenti Integrati nei Compilatori

- **GCC/Clang**: `-pg` flag per generare dati per gprof
- **MSVC**: Visual Studio Profiler

#### 2. Strumenti Esterni

- **Valgrind**: Suite di strumenti per il debugging e il profiling della memoria
- **perf**: Strumento di profiling per Linux
- **Intel VTune**: Profiler avanzato per applicazioni C++
- **gperftools**: Libreria di Google per il profiling

## Benchmarking

Il benchmarking è il processo di misurazione delle prestazioni di un programma o di una sua parte, spesso confrontando diverse implementazioni o configurazioni.

### Principi del Benchmarking

1. **Ripetibilità**: I benchmark devono essere ripetibili per garantire risultati affidabili.
2. **Isolamento**: Minimizzare l'influenza di fattori esterni (altri processi, I/O, etc.).
3. **Rappresentatività**: I benchmark devono riflettere l'uso reale del programma.
4. **Misurazioni multiple**: Eseguire più misurazioni e calcolare statistiche (media, deviazione standard).

### Implementazione di un Benchmark

```cpp
#include <iostream>
#include <chrono>
#include <vector>
#include <algorithm>
#include <numeric>
#include <cmath>

template<typename Func>
double benchmark(Func func, int num_runs) {
    std::vector<double> tempi;
    tempi.reserve(num_runs);
    
    for (int i = 0; i < num_runs; ++i) {
        auto inizio = std::chrono::high_resolution_clock::now();
        
        func(); // Esegui la funzione da misurare
        
        auto fine = std::chrono::high_resolution_clock::now();
        auto durata = std::chrono::duration_cast<std::chrono::microseconds>(fine - inizio).count();
        tempi.push_back(durata);
    }
    
    // Calcola statistiche
    double media = std::accumulate(tempi.begin(), tempi.end(), 0.0) / tempi.size();
    
    double varianza = 0.0;
    for (double t : tempi) {
        varianza += (t - media) * (t - media);
    }
    varianza /= tempi.size();
    
    double dev_std = std::sqrt(varianza);
    
    std::cout << "Tempo medio: " << media << " microsecondi" << std::endl;
    std::cout << "Deviazione standard: " << dev_std << " microsecondi" << std::endl;
    
    return media;
}

// Esempio di utilizzo
void algoritmo1() {
    std::vector<int> v(10000);
    std::iota(v.begin(), v.end(), 0); // Riempie con 0, 1, 2, ...
    std::sort(v.begin(), v.end(), [](int a, int b) { return a > b; }); // Ordine decrescente
}

void algoritmo2() {
    std::vector<int> v(10000);
    std::iota(v.begin(), v.end(), 0);
    std::sort(v.rbegin(), v.rend()); // Alternativa per l'ordine decrescente
}

int main() {
    std::cout << "Benchmark Algoritmo 1:" << std::endl;
    double tempo1 = benchmark(algoritmo1, 100);
    
    std::cout << "\nBenchmark Algoritmo 2:" << std::endl;
    double tempo2 = benchmark(algoritmo2, 100);
    
    std::cout << "\nRapporto Algoritmo1/Algoritmo2: " << tempo1 / tempo2 << std::endl;
    
    return 0;
}
```

### Framework di Benchmarking

#### Google Benchmark

Google Benchmark è una libreria C++ che facilita la creazione di benchmark affidabili.

```cpp
#include <benchmark/benchmark.h>
#include <vector>
#include <algorithm>
#include <numeric>

static void BM_Algoritmo1(benchmark::State& state) {
    for (auto _ : state) {
        std::vector<int> v(state.range(0));
        std::iota(v.begin(), v.end(), 0);
        std::sort(v.begin(), v.end(), [](int a, int b) { return a > b; });
    }
}

static void BM_Algoritmo2(benchmark::State& state) {
    for (auto _ : state) {
        std::vector<int> v(state.range(0));
        std::iota(v.begin(), v.end(), 0);
        std::sort(v.rbegin(), v.rend());
    }
}

BENCHMARK(BM_Algoritmo1)->Arg(1000)->Arg(10000)->Arg(100000);
BENCHMARK(BM_Algoritmo2)->Arg(1000)->Arg(10000)->Arg(100000);

BENCHMARK_MAIN();
```

## Consigli Pratici

### 1. Iniziare con Profiling di Alto Livello

Prima di immergersi nei dettagli, utilizzare strumenti di profiling di alto livello per identificare le aree problematiche generali.

### 2. Concentrarsi sui Colli di Bottiglia

Segui la regola 80/20: spesso l'80% del tempo di esecuzione è speso nel 20% del codice. Concentrati su queste aree.

### 3. Misurare Prima e Dopo le Ottimizzazioni

Verifica sempre che le tue ottimizzazioni abbiano effettivamente migliorato le prestazioni.

### 4. Considerare il Contesto Reale

Assicurati che i benchmark riflettano l'uso reale del programma, inclusi i pattern di accesso ai dati e i carichi di lavoro tipici.

## Domande di Autovalutazione

1. Qual è la differenza principale tra profiling e benchmarking?
2. Perché è importante eseguire più misurazioni quando si fa benchmarking?
3. Quali fattori esterni possono influenzare i risultati di un benchmark?
4. Come si può utilizzare il profiling per identificare memory leak?
5. Quali sono i vantaggi di utilizzare un framework di benchmarking come Google Benchmark rispetto a scrivere il proprio codice di misurazione?

## Esercizi Proposti

1. Implementa un semplice profiler che misuri il tempo di esecuzione di diverse funzioni in un programma esistente.
2. Utilizza Valgrind o un altro strumento di profiling della memoria per identificare memory leak in un programma.
3. Crea un benchmark che confronti le prestazioni di diverse strutture dati (vector, list, deque) per operazioni comuni come inserimento, ricerca e cancellazione.
4. Implementa due versioni diverse di un algoritmo e utilizza Google Benchmark per confrontarne le prestazioni con diversi input.
5. Analizza un programma esistente con un profiler e identifica almeno tre possibili ottimizzazioni basate sui risultati del profiling.

## Conclusione

Il profiling e il benchmarking sono strumenti essenziali nel toolkit di ogni programmatore C++ che si occupa di ottimizzazione delle prestazioni. Utilizzando questi strumenti in modo efficace, è possibile identificare con precisione dove concentrare gli sforzi di ottimizzazione e verificare oggettivamente i miglioramenti apportati.

Ricorda sempre la regola d'oro dell'ottimizzazione: misura prima, ottimizza dopo, e misura di nuovo per verificare i risultati.