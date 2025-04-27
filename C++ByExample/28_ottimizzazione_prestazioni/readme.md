# Esercitazione 28: Ottimizzazione delle Prestazioni

## Obiettivo

L'obiettivo di questa esercitazione è imparare tecniche e strategie per ottimizzare le prestazioni del codice C++. Esplorerai vari aspetti dell'ottimizzazione, dalla scelta delle strutture dati appropriate all'utilizzo efficiente della memoria, fino all'ottimizzazione a livello di compilatore.

## Argomenti Trattati

- Principi di ottimizzazione del codice
- Misurazione delle prestazioni (profiling)
- Ottimizzazione delle strutture dati e degli algoritmi
- Gestione efficiente della memoria
- Ottimizzazioni del compilatore
- Parallelizzazione e concorrenza per migliorare le prestazioni

## Esercizi

### Esercizio 1: Misurazione delle Prestazioni

Implementa un semplice framework per misurare il tempo di esecuzione di diverse funzioni.

```cpp
#include <iostream>
#include <chrono>
#include <vector>
#include <algorithm>
#include <functional>
#include <string>

// Classe per misurare il tempo di esecuzione
class Timer {
private:
    std::chrono::high_resolution_clock::time_point start_time;
    std::string name;

public:
    Timer(const std::string& operation_name) : name(operation_name) {
        start_time = std::chrono::high_resolution_clock::now();
    }

    ~Timer() {
        auto end_time = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::microseconds>(end_time - start_time).count();
        std::cout << "Operazione '" << name << "' completata in " << duration << " microsecondi" << std::endl;
    }
};

// Funzione da misurare
void operazione_costosa(size_t size) {
    std::vector<int> v;
    
    {
        Timer t("Riempimento vector");
        for (size_t i = 0; i < size; ++i) {
            v.push_back(i);
        }
    }
    
    {
        Timer t("Ordinamento vector");
        std::sort(v.begin(), v.end(), [](int a, int b) { return a > b; });
    }
}

int main() {
    {
        Timer t("Operazione completa");
        operazione_costosa(1000000);
    }
    
    return 0;
}
```

### Esercizio 2: Confronto di Strutture Dati

Confrontare le prestazioni di diverse strutture dati per operazioni comuni.

```cpp
#include <iostream>
#include <chrono>
#include <vector>
#include <list>
#include <deque>
#include <set>
#include <unordered_set>
#include <algorithm>
#include <random>

template<typename Container>
void test_container(const std::string& container_name, size_t size) {
    Container c;
    
    // Generatore di numeri casuali
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(1, size * 10);
    
    // Vettore di numeri casuali per l'inserimento
    std::vector<int> numbers;
    for (size_t i = 0; i < size; ++i) {
        numbers.push_back(distrib(gen));
    }
    
    // Test inserimento
    auto start = std::chrono::high_resolution_clock::now();
    for (int num : numbers) {
        c.insert(c.end(), num);
    }
    auto end = std::chrono::high_resolution_clock::now();
    auto insert_time = std::chrono::duration_cast<std::chrono::microseconds>(end - start).count();
    
    // Test ricerca
    start = std::chrono::high_resolution_clock::now();
    for (int num : numbers) {
        std::find(c.begin(), c.end(), num);
    }
    end = std::chrono::high_resolution_clock::now();
    auto search_time = std::chrono::duration_cast<std::chrono::microseconds>(end - start).count();
    
    std::cout << container_name << " (size " << size << "):\n";
    std::cout << "  Inserimento: " << insert_time << " microsecondi\n";
    std::cout << "  Ricerca: " << search_time << " microsecondi\n";
}

int main() {
    const size_t size = 10000;
    
    test_container<std::vector<int>>("Vector", size);
    test_container<std::list<int>>("List", size);
    test_container<std::deque<int>>("Deque", size);
    
    return 0;
}
```

### Esercizio 3: Ottimizzazione della Memoria

Implementa tecniche per ridurre l'uso della memoria e migliorare le prestazioni.

```cpp
#include <iostream>
#include <chrono>
#include <vector>
#include <memory>
#include <string>

// Classe con allocazione inefficiente
class InefficienteConCopie {
private:
    std::vector<int> dati;
    std::string nome;

public:
    InefficienteConCopie(size_t size, const std::string& n) : nome(n) {
        dati.resize(size, 0);
    }
    
    // Passa per valore (crea copia)
    void elabora(std::vector<int> input) {
        for (size_t i = 0; i < dati.size() && i < input.size(); ++i) {
            dati[i] += input[i];
        }
    }
    
    // Ritorna per valore (crea copia)
    std::vector<int> getDati() {
        return dati;
    }
};

// Classe ottimizzata
class Ottimizzata {
private:
    std::vector<int> dati;
    std::string nome;

public:
    Ottimizzata(size_t size, std::string n) : nome(std::move(n)) {
        dati.resize(size, 0);
    }
    
    // Passa per riferimento costante (no copia)
    void elabora(const std::vector<int>& input) {
        for (size_t i = 0; i < dati.size() && i < input.size(); ++i) {
            dati[i] += input[i];
        }
    }
    
    // Ritorna per riferimento costante (no copia)
    const std::vector<int>& getDati() const {
        return dati;
    }
};

int main() {
    const size_t size = 1000000;
    std::vector<int> input(size, 1);
    
    // Test classe inefficiente
    auto start = std::chrono::high_resolution_clock::now();
    {
        InefficienteConCopie obj(size, "Test");
        for (int i = 0; i < 10; ++i) {
            obj.elabora(input);
            auto result = obj.getDati();
        }
    }
    auto end = std::chrono::high_resolution_clock::now();
    auto inefficiente_time = std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count();
    
    // Test classe ottimizzata
    start = std::chrono::high_resolution_clock::now();
    {
        Ottimizzata obj(size, "Test");
        for (int i = 0; i < 10; ++i) {
            obj.elabora(input);
            const auto& result = obj.getDati();
        }
    }
    end = std::chrono::high_resolution_clock::now();
    auto ottimizzata_time = std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count();
    
    std::cout << "Tempo classe inefficiente: " << inefficiente_time << " ms" << std::endl;
    std::cout << "Tempo classe ottimizzata: " << ottimizzata_time << " ms" << std::endl;
    std::cout << "Miglioramento: " << (inefficiente_time > 0 ? (float)inefficiente_time / ottimizzata_time : 0) << "x" << std::endl;
    
    return 0;
}
```

### Esercizio 4: Ottimizzazioni del Compilatore

Esplora l'effetto delle diverse opzioni di ottimizzazione del compilatore.

```cpp
#include <iostream>
#include <chrono>
#include <vector>
#include <cmath>

// Funzione che il compilatore potrebbe ottimizzare
double calcolo_intensivo(const std::vector<double>& input) {
    double result = 0.0;
    for (double val : input) {
        result += std::sin(val) * std::cos(val) / (std::tan(val) + 1.0);
    }
    return result;
}

int main() {
    const size_t size = 10000000;
    std::vector<double> input(size);
    
    // Inizializza il vettore con valori
    for (size_t i = 0; i < size; ++i) {
        input[i] = static_cast<double>(i) / size;
    }
    
    // Misura il tempo di esecuzione
    auto start = std::chrono::high_resolution_clock::now();
    volatile double result = calcolo_intensivo(input);  // volatile per evitare ottimizzazioni eccessive
    auto end = std::chrono::high_resolution_clock::now();
    
    auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count();
    std::cout << "Calcolo completato in " << duration << " ms" << std::endl;
    std::cout << "Risultato: " << result << std::endl;
    
    return 0;
}
```

## Approfondimenti

- [Principi di Ottimizzazione](teoria/principi_ottimizzazione.md)
- [Profiling e Benchmarking](teoria/profiling_benchmarking.md)
- [Ottimizzazione della Memoria](teoria/ottimizzazione_memoria.md)
- [Ottimizzazioni del Compilatore](teoria/ottimizzazioni_compilatore.md)

## Risorse Aggiuntive

- [C++ Core Guidelines: Performance](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#S-performance)
- [Optimizing C++](https://www.agner.org/optimize/optimizing_cpp.pdf)
- [C++ Optimization Strategies and Techniques](https://en.algorithmica.org/hpc/)