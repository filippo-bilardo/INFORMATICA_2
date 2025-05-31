# Gestione degli Errori nelle Coroutine C++20

In questa guida, esploreremo le tecniche e le best practices per gestire gli errori nelle coroutine C++20, un aspetto fondamentale per scrivere codice asincrono robusto e affidabile.

## Sfide nella Gestione degli Errori Asincroni

La gestione degli errori nelle coroutine presenta sfide uniche rispetto al codice sincrono tradizionale:

1. **Propagazione Asincrona**: Gli errori possono verificarsi dopo che la coroutine è stata sospesa e ripresa.
2. **Contesto di Esecuzione**: Gli errori potrebbero manifestarsi in un contesto di esecuzione diverso da quello originale.
3. **Cancellazione**: Potrebbe essere necessario gestire la cancellazione di operazioni asincrone in corso.

## Meccanismi di Gestione degli Errori

### 1. Utilizzo di `unhandled_exception()`

Il metodo `unhandled_exception()` della promise_type viene chiamato quando un'eccezione non gestita viene lanciata all'interno di una coroutine:

```cpp
struct promise_type {
    // ...
    
    void unhandled_exception() {
        // Gestione dell'eccezione non catturata nella coroutine
        exception_ptr = std::current_exception();
        has_exception = true;
    }
    
    std::exception_ptr exception_ptr;
    bool has_exception = false;
};
```

### 2. Propagazione delle Eccezioni

Le eccezioni possono essere propagate dal chiamante alla coroutine e viceversa:

```cpp
#include <iostream>
#include <coroutine>
#include <exception>
#include <future>

std::future<int> compute_value(int x) {
    if (x < 0) {
        throw std::invalid_argument("Valore negativo non consentito");
    }
    
    // Simula un'operazione asincrona
    co_await std::suspend_always{};
    
    if (x == 0) {
        // Eccezione lanciata dopo la ripresa
        throw std::runtime_error("Divisione per zero");
    }
    
    co_return 100 / x;
}

int main() {
    try {
        auto future = compute_value(-5);
        int result = future.get(); // Lancia l'eccezione std::invalid_argument
    } catch (const std::exception& e) {
        std::cerr << "Eccezione catturata: " << e.what() << std::endl;
    }
    
    try {
        auto future = compute_value(0);
        int result = future.get(); // Lancia l'eccezione std::runtime_error
    } catch (const std::exception& e) {
        std::cerr << "Eccezione catturata: " << e.what() << std::endl;
    }
    
    return 0;
}
```

### 3. Gestione degli Errori con `co_await`

Quando si utilizza `co_await`, è possibile gestire gli errori direttamente con blocchi try-catch:

```cpp
#include <iostream>
#include <coroutine>
#include <exception>

// Awaitable che può fallire
struct FailableTask {
    bool should_fail;
    
    bool await_ready() const noexcept { return false; }
    void await_suspend(std::coroutine_handle<> h) const { h.resume(); }
    
    int await_resume() const {
        if (should_fail) {
            throw std::runtime_error("Operazione fallita");
        }
        return 42;
    }
};

// Coroutine che gestisce l'errore
std::future<int> safe_task() {
    try {
        int result = co_await FailableTask{true}; // Questo lancerà un'eccezione
        co_return result;
    } catch (const std::exception& e) {
        std::cerr << "Errore gestito all'interno della coroutine: " << e.what() << std::endl;
        co_return -1; // Valore di fallback
    }
}
```

## Pattern per la Gestione degli Errori

### 1. Result-Based Error Handling

Utilizzare un tipo di risultato che può rappresentare sia un valore valido che un errore:

```cpp
#include <iostream>
#include <coroutine>
#include <variant>
#include <string>

// Tipo di risultato che può contenere un valore o un errore
template<typename T, typename E = std::string>
class Result {
    std::variant<T, E> value;
    
public:
    Result(const T& v) : value(v) {}
    Result(const E& e) : value(e) {}
    
    bool is_error() const { return std::holds_alternative<E>(value); }
    const T& get_value() const { return std::get<T>(value); }
    const E& get_error() const { return std::get<E>(value); }
};

// Awaitable che restituisce un Result
struct ResultAwaitable {
    bool should_fail;
    
    bool await_ready() const noexcept { return false; }
    void await_suspend(std::coroutine_handle<> h) const { h.resume(); }
    
    Result<int> await_resume() const {
        if (should_fail) {
            return Result<int>("Operazione fallita");
        }
        return Result<int>(42);
    }
};

// Coroutine che utilizza Result per la gestione degli errori
std::future<Result<int>> result_task() {
    Result<int> result = co_await ResultAwaitable{true};
    
    if (result.is_error()) {
        std::cerr << "Errore: " << result.get_error() << std::endl;
        // Possiamo decidere di propagare l'errore o gestirlo
        co_return result;
    }
    
    // Continua con il valore valido
    co_return Result<int>(result.get_value() * 2);
}
```

### 2. Cancellazione e Timeout

Implementare meccanismi per la cancellazione di operazioni asincrone:

```cpp
#include <iostream>
#include <coroutine>
#include <chrono>
#include <thread>
#include <atomic>

// Token di cancellazione
class CancellationToken {
public:
    CancellationToken() : cancelled(false) {}
    
    void cancel() { cancelled.store(true); }
    bool is_cancelled() const { return cancelled.load(); }
    
private:
    std::atomic<bool> cancelled;
};

// Awaitable con supporto per la cancellazione
struct CancellableTask {
    std::shared_ptr<CancellationToken> token;
    std::chrono::milliseconds duration;
    
    bool await_ready() const { return token->is_cancelled(); }
    
    void await_suspend(std::coroutine_handle<> h) {
        std::thread([this, h]() {
            auto start = std::chrono::steady_clock::now();
            
            while (!token->is_cancelled()) {
                auto now = std::chrono::steady_clock::now();
                if (now - start >= duration) {
                    break;
                }
                std::this_thread::sleep_for(std::chrono::milliseconds(100));
            }
            
            h.resume();
        }).detach();
    }
    
    bool await_resume() const {
        return !token->is_cancelled();
    }
};

// Coroutine con supporto per la cancellazione
std::future<std::string> cancellable_operation(std::shared_ptr<CancellationToken> token) {
    bool completed = co_await CancellableTask{token, std::chrono::seconds(5)};
    
    if (!completed) {
        co_return "Operazione cancellata";
    }
    
    co_return "Operazione completata con successo";
}
```

## Best Practices

### 1. Gestione Coerente degli Errori

Scegli un approccio coerente per la gestione degli errori nelle coroutine e mantienilo in tutto il codice:

- Eccezioni per errori eccezionali
- Tipi di risultato (come `std::expected<T, E>` in C++23) per errori previsti
- Codici di errore per interfacce di basso livello

### 2. Documentazione Chiara

Documenta chiaramente il comportamento di gestione degli errori delle tue coroutine:

```cpp
/**
 * Esegue un'operazione asincrona che può fallire.
 * 
 * @throws std::invalid_argument se i parametri di input non sono validi
 * @throws std::runtime_error se l'operazione fallisce durante l'esecuzione
 * @return Un future che contiene il risultato dell'operazione
 */
std::future<int> async_operation(int param);
```

### 3. Gestione delle Risorse

Utilizza RAII (Resource Acquisition Is Initialization) per garantire il rilascio delle risorse anche in caso di errori:

```cpp
std::future<void> process_file(const std::string& filename) {
    // RAII per la gestione del file
    std::unique_ptr<FILE, decltype(&fclose)> file(fopen(filename.c_str(), "r"), &fclose);
    
    if (!file) {
        throw std::runtime_error("Impossibile aprire il file");
    }
    
    // Anche se la coroutine viene sospesa o si verifica un errore,
    // il file verrà chiuso automaticamente quando lo unique_ptr esce dallo scope
    
    co_await std::suspend_always{};
    
    // Operazioni sul file...
    
    co_return;
}
```

### 4. Testing degli Scenari di Errore

Testa sistematicamente gli scenari di errore nelle coroutine:

- Errori prima della prima sospensione
- Errori durante la sospensione
- Errori dopo la ripresa
- Cancellazione durante operazioni di lunga durata

## Conclusione

La gestione degli errori nelle coroutine C++20 richiede un'attenta considerazione delle sfide uniche poste dalla programmazione asincrona. Utilizzando i meccanismi e i pattern descritti in questa guida, è possibile creare coroutine robuste che gestiscono correttamente gli errori in tutti gli scenari possibili.

Ricorda che una buona gestione degli errori non è solo una questione di catturare le eccezioni, ma anche di progettare interfacce che comunicano chiaramente i possibili errori e forniscono informazioni utili per la loro risoluzione.

Nelle prossime guide, esploreremo pattern più avanzati per la gestione degli errori nelle coroutine e tecniche per il debug di codice asincrono.