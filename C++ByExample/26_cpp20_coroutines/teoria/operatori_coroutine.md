# Operatori delle Coroutine in C++20

In questa guida, esploreremo i tre operatori fondamentali delle coroutine introdotti in C++20: `co_await`, `co_yield` e `co_return`. Questi operatori sono essenziali per implementare e utilizzare le coroutine in modo efficace.

## Introduzione agli Operatori delle Coroutine

Le coroutine in C++20 si basano su tre operatori chiave che ne definiscono il comportamento:

- `co_await`: Sospende l'esecuzione della coroutine in attesa che un'operazione asincrona venga completata
- `co_yield`: Produce un valore e sospende l'esecuzione della coroutine
- `co_return`: Termina l'esecuzione della coroutine e restituisce un valore finale (opzionale)

La presenza di uno qualsiasi di questi operatori in una funzione la trasforma automaticamente in una coroutine.

## L'Operatore `co_await`

### Sintassi e Funzionamento

```cpp
Tipo risultato = co_await espressione;
```

L'operatore `co_await` sospende l'esecuzione della coroutine corrente fino a quando l'operazione asincrona rappresentata dall'espressione non viene completata. Quando l'operazione termina, la coroutine riprende l'esecuzione e il risultato dell'operazione viene assegnato alla variabile.

### Esempio di Utilizzo

```cpp
#include <iostream>
#include <coroutine>
#include <future>
#include <thread>
#include <chrono>

// Un semplice awaitable che attende per un periodo specificato
struct Sleeper {
    std::chrono::milliseconds duration;
    
    bool await_ready() const noexcept {
        return false; // Non è mai pronto immediatamente
    }
    
    void await_suspend(std::coroutine_handle<> h) const {
        std::thread([h, this]() {
            std::this_thread::sleep_for(duration);
            h.resume();
        }).detach();
    }
    
    void await_resume() const noexcept {}
};

// Una coroutine che utilizza co_await
std::future<void> task() {
    std::cout << "Inizio dell'operazione" << std::endl;
    
    co_await Sleeper{std::chrono::milliseconds(2000)};
    
    std::cout << "Operazione completata dopo 2 secondi" << std::endl;
}
```

## L'Operatore `co_yield`

### Sintassi e Funzionamento

```cpp
co_yield valore;
```

L'operatore `co_yield` produce un valore e sospende l'esecuzione della coroutine, mantenendo lo stato corrente. Quando la coroutine viene ripresa, l'esecuzione continua dalla riga successiva all'istruzione `co_yield`.

### Esempio di Utilizzo

```cpp
#include <iostream>
#include <coroutine>
#include <vector>

// Un generatore di sequenze
class Generator {
public:
    struct promise_type {
        int current_value;
        
        Generator get_return_object() {
            return Generator{std::coroutine_handle<promise_type>::from_promise(*this)};
        }
        
        auto initial_suspend() { return std::suspend_always{}; }
        auto final_suspend() noexcept { return std::suspend_always{}; }
        void unhandled_exception() { std::terminate(); }
        
        auto yield_value(int value) {
            current_value = value;
            return std::suspend_always{};
        }
        
        void return_void() {}
    };
    
    std::coroutine_handle<promise_type> handle;
    
    Generator(std::coroutine_handle<promise_type> h) : handle(h) {}
    ~Generator() { if (handle) handle.destroy(); }
    
    int current_value() {
        return handle.promise().current_value;
    }
    
    bool move_next() {
        if (handle.done())
            return false;
        handle.resume();
        return !handle.done();
    }
};

// Una coroutine che genera una sequenza di numeri
Generator sequence(int start, int end, int step) {
    for (int i = start; i <= end; i += step) {
        co_yield i;
    }
}

int main() {
    auto seq = sequence(1, 10, 2);
    
    while (seq.move_next()) {
        std::cout << seq.current_value() << " ";
    }
    // Output: 1 3 5 7 9
    
    return 0;
}
```

## L'Operatore `co_return`

### Sintassi e Funzionamento

```cpp
co_return valore; // Con valore
co_return;        // Senza valore
```

L'operatore `co_return` termina l'esecuzione della coroutine e restituisce un valore finale (opzionale). A differenza del normale `return`, `co_return` attiva la sequenza di terminazione della coroutine, che include la chiamata a `promise.return_value()` o `promise.return_void()`.

### Esempio di Utilizzo

```cpp
#include <iostream>
#include <coroutine>
#include <future>

std::future<int> compute_value(int x) {
    // Esegue un calcolo complesso
    int result = x * x;
    
    // Simula un'operazione asincrona
    co_await std::suspend_always{};
    
    // Restituisce il risultato finale
    co_return result;
}

// Utilizzo
int main() {
    auto future = compute_value(5);
    // ... altre operazioni ...
    int result = future.get(); // Ottiene il risultato: 25
    
    return 0;
}
```

## Considerazioni Importanti

### Interazione tra gli Operatori

Gli operatori delle coroutine possono essere utilizzati insieme nella stessa coroutine:

- Una coroutine può utilizzare `co_await` più volte per attendere diverse operazioni asincrone
- Un generatore può utilizzare `co_yield` più volte per produrre una sequenza di valori
- Una coroutine termina normalmente con `co_return` o quando raggiunge la fine della funzione

### Requisiti per i Tipi di Ritorno

Affinché una funzione possa essere una coroutine, il suo tipo di ritorno deve soddisfare determinati requisiti:

- Deve definire un tipo annidato `promise_type`
- `promise_type` deve fornire metodi specifici come `get_return_object()`, `initial_suspend()`, `final_suspend()`, ecc.

## Conclusione

Gli operatori `co_await`, `co_yield` e `co_return` sono gli strumenti fondamentali per lavorare con le coroutine in C++20. Comprendere il loro funzionamento e le loro interazioni è essenziale per sfruttare appieno il potenziale della programmazione asincrona in C++.

Nelle prossime guide, esploreremo esempi più complessi e casi d'uso avanzati delle coroutine, come la gestione degli errori e l'implementazione di pattern asincroni comuni.