# Esercitazione 26: C++20 - Coroutines

## Obiettivo

L'obiettivo di questa esercitazione è esplorare le coroutine introdotte in C++20, un potente meccanismo che permette di scrivere codice asincrono in modo più leggibile e manutenibile. Imparerai i concetti fondamentali delle coroutine e come utilizzarle per implementare operazioni asincrone, generatori e altre funzionalità avanzate.

## Argomenti Trattati

- Introduzione alle coroutine in C++20
- Concetti fondamentali: co_await, co_yield, co_return
- Tipi di ritorno delle coroutine
- Implementazione di generatori
- Operazioni asincrone con le coroutine
- Gestione degli errori nelle coroutine

## Esercizi

### Esercizio 1: Primi Passi con le Coroutine

Implementa una semplice coroutine che genera una sequenza di numeri.

```cpp
#include <iostream>
#include <coroutine>
#include <exception>

// Tipo di ritorno per un generatore di interi
class generator {
 public:
    // Definizione del tipo promise_type richiesto per le coroutine
    struct promise_type {
        int current_value;
        
        auto get_return_object() { return generator{handle_type::from_promise(*this)}; }
        auto initial_suspend() { return std::suspend_always{}; }
        auto final_suspend() noexcept { return std::suspend_always{}; }
        void unhandled_exception() { std::terminate(); }
        
        auto yield_value(int value) {
            current_value = value;
            return std::suspend_always{};
        }
        
        void return_void() {}
    };
    
    using handle_type = std::coroutine_handle<promise_type>;
    
    // Costruttore e distruttore
    generator(handle_type h) : coro(h) {}
    ~generator() { if (coro) coro.destroy(); }
    
    // Non permettere la copia
    generator(const generator&) = delete;
    generator& operator=(const generator&) = delete;
    
    // Permetti il movimento
    generator(generator&& other) noexcept : coro(other.coro) { other.coro = nullptr; }
    generator& operator=(generator&& other) noexcept {
        if (this != &other) {
            if (coro) coro.destroy();
            coro = other.coro;
            other.coro = nullptr;
        }
        return *this;
    }
    
    // Interfaccia per l'iterazione
    bool next() {
        if (coro) {
            coro.resume();
            return !coro.done();
        }
        return false;
    }
    
    int value() const { return coro.promise().current_value; }
    
private:
    handle_type coro;
};

// Coroutine che genera numeri da start a end con incremento step
generator sequence(int start, int end, int step = 1) {
    for (int i = start; i <= end; i += step) {
        co_yield i;
    }
}

int main() {
    auto seq = sequence(1, 10, 2);
    
    std::cout << "Sequenza di numeri dispari da 1 a 10:" << std::endl;
    while (seq.next()) {
        std::cout << seq.value() << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### Esercizio 2: Implementazione di un Generatore Fibonacci

Utilizza le coroutine per implementare un generatore della sequenza di Fibonacci.

```cpp
#include <iostream>
#include <coroutine>
#include <exception>

// Riutilizziamo la classe generator dell'esercizio precedente
class generator {
 public:
    struct promise_type {
        int current_value;
        
        auto get_return_object() { return generator{handle_type::from_promise(*this)}; }
        auto initial_suspend() { return std::suspend_always{}; }
        auto final_suspend() noexcept { return std::suspend_always{}; }
        void unhandled_exception() { std::terminate(); }
        
        auto yield_value(int value) {
            current_value = value;
            return std::suspend_always{};
        }
        
        void return_void() {}
    };
    
    using handle_type = std::coroutine_handle<promise_type>;
    
    generator(handle_type h) : coro(h) {}
    ~generator() { if (coro) coro.destroy(); }
    
    generator(const generator&) = delete;
    generator& operator=(const generator&) = delete;
    
    generator(generator&& other) noexcept : coro(other.coro) { other.coro = nullptr; }
    generator& operator=(generator&& other) noexcept {
        if (this != &other) {
            if (coro) coro.destroy();
            coro = other.coro;
            other.coro = nullptr;
        }
        return *this;
    }
    
    bool next() {
        if (coro) {
            coro.resume();
            return !coro.done();
        }
        return false;
    }
    
    int value() const { return coro.promise().current_value; }
    
private:
    handle_type coro;
};

// Coroutine che genera la sequenza di Fibonacci fino a un limite
generator fibonacci(int limit) {
    if (limit >= 1) co_yield 0;
    if (limit >= 2) co_yield 1;
    
    int a = 0, b = 1;
    for (int i = 2; i < limit; ++i) {
        int next = a + b;
        co_yield next;
        a = b;
        b = next;
    }
}

int main() {
    auto fib = fibonacci(10);
    
    std::cout << "Primi 10 numeri della sequenza di Fibonacci:" << std::endl;
    while (fib.next()) {
        std::cout << fib.value() << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### Esercizio 3: Operazioni Asincrone con Coroutine

Implementa un semplice framework per operazioni asincrone utilizzando le coroutine.

```cpp
#include <iostream>
#include <coroutine>
#include <thread>
#include <chrono>
#include <functional>

// Tipo di ritorno per operazioni asincrone
class task {
public:
    struct promise_type {
        task get_return_object() { return {}; }
        std::suspend_never initial_suspend() { return {}; }
        std::suspend_never final_suspend() noexcept { return {}; }
        void return_void() {}
        void unhandled_exception() { std::terminate(); }
    };
};

// Awaitable per simulare un'operazione asincrona
class async_operation {
public:
    async_operation(std::function<void()> operation, int delay_ms)
        : operation_(std::move(operation)), delay_ms_(delay_ms) {}
    
    bool await_ready() const { return false; }
    
    void await_suspend(std::coroutine_handle<> handle) {
        std::thread([this, handle]() {
            std::this_thread::sleep_for(std::chrono::milliseconds(delay_ms_));
            operation_();
            handle.resume();
        }).detach();
    }
    
    void await_resume() const {}
    
private:
    std::function<void()> operation_;
    int delay_ms_;
};

// Coroutine che esegue operazioni asincrone in sequenza
task async_sequence() {
    std::cout << "Inizio della sequenza asincrona" << std::endl;
    
    co_await async_operation([]() {
        std::cout << "Operazione 1 completata" << std::endl;
    }, 1000);
    
    co_await async_operation([]() {
        std::cout << "Operazione 2 completata" << std::endl;
    }, 500);
    
    co_await async_operation([]() {
        std::cout << "Operazione 3 completata" << std::endl;
    }, 1500);
    
    std::cout << "Fine della sequenza asincrona" << std::endl;
}

int main() {
    std::cout << "Avvio del programma" << std::endl;
    
    async_sequence();
    
    std::cout << "Il programma principale continua l'esecuzione" << std::endl;
    
    // Attendi che tutte le operazioni asincrone siano completate
    std::this_thread::sleep_for(std::chrono::seconds(4));
    
    return 0;
}
```

## Approfondimenti

- [Introduzione alle Coroutine in C++20](teoria/introduzione_coroutine.md)
- [Tipi di Ritorno delle Coroutine](teoria/tipi_ritorno_coroutine.md)
- [Implementazione di Generatori](teoria/implementazione_generatori.md)

## Risorse Aggiuntive

- [C++ Reference: Coroutines](https://en.cppreference.com/w/cpp/language/coroutines)
- [CppCon 2019: Lewis Baker - Concurrency in C++20 and Beyond](https://www.youtube.com/watch?v=jozHW_B3D4U)