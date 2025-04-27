// Esempio di implementazione di un generatore usando le coroutine C++20
#include <iostream>
#include <coroutine>
#include <exception>
#include <vector>

// Implementazione di un generatore di sequenze
class generator {
public:
    // Definizione della promise_type richiesta per le coroutine
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
    ~generator() {
        if (coro) coro.destroy();
    }
    
    // Non permettere la copia
    generator(const generator&) = delete;
    generator& operator=(const generator&) = delete;
    
    // Permettere il movimento
    generator(generator&& other) noexcept : coro(other.coro) {
        other.coro = nullptr;
    }
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
    
    int value() const {
        return coro.promise().current_value;
    }
    
private:
    handle_type coro;
};

// Funzione coroutine che genera i numeri di Fibonacci
generator fibonacci(int n) {
    if (n > 0) co_yield 0;
    if (n > 1) co_yield 1;
    
    int a = 0, b = 1;
    for (int i = 2; i < n; ++i) {
        int next = a + b;
        co_yield next;
        a = b;
        b = next;
    }
}

// Funzione coroutine che genera numeri pari
generator even_numbers(int max) {
    for (int i = 0; i <= max; i += 2) {
        co_yield i;
    }
}

// Funzione coroutine che genera numeri dispari
generator odd_numbers(int max) {
    for (int i = 1; i <= max; i += 2) {
        co_yield i;
    }
}

int main() {
    std::cout << "Sequenza di Fibonacci (primi 10 numeri):" << std::endl;
    auto fib = fibonacci(10);
    while (fib.next()) {
        std::cout << fib.value() << " ";
    }
    std::cout << std::endl;
    
    std::cout << "\nNumeri pari fino a 20:" << std::endl;
    auto even = even_numbers(20);
    while (even.next()) {
        std::cout << even.value() << " ";
    }
    std::cout << std::endl;
    
    std::cout << "\nNumeri dispari fino a 20:" << std::endl;
    auto odd = odd_numbers(20);
    while (odd.next()) {
        std::cout << odd.value() << " ";
    }
    std::cout << std::endl;
    
    return 0;
}

/*
Note per la compilazione:
Questo esempio richiede un compilatore che supporti C++20 con le coroutine.
Per compilare con GCC (versione 10 o superiore):
  g++ -std=c++20 -fcoroutines generator_esempio.cpp -o generator_esempio

Per compilare con Clang (versione 12 o superiore):
  clang++ -std=c++20 -fcoroutines-ts generator_esempio.cpp -o generator_esempio

Per compilare con MSVC (Visual Studio 2019 16.8 o superiore):
  cl /std:c++latest /EHsc generator_esempio.cpp
*/