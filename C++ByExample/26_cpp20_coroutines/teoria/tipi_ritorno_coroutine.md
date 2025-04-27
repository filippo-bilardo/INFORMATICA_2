# Tipi di Ritorno delle Coroutine in C++20

## Introduzione

Uno degli aspetti più complessi delle coroutine in C++20 è la definizione dei tipi di ritorno. A differenza delle funzioni tradizionali, il tipo di ritorno di una coroutine deve soddisfare requisiti specifici per supportare il meccanismo di sospensione e ripresa. Questo documento esplora i diversi tipi di ritorno delle coroutine e come implementarli correttamente.

## Requisiti per i Tipi di Ritorno delle Coroutine

Affinché un tipo possa essere utilizzato come tipo di ritorno di una coroutine, deve soddisfare i seguenti requisiti:

1. **Definire un tipo annidato `promise_type`**: Questo tipo controlla il comportamento della coroutine.
2. **La `promise_type` deve definire metodi specifici**: Come `get_return_object()`, `initial_suspend()`, `final_suspend()`, ecc.

## La Classe `promise_type`

La classe `promise_type` è il cuore del meccanismo delle coroutine. Essa definisce come la coroutine interagisce con il chiamante e come gestisce i valori prodotti o restituiti.

### Metodi Richiesti

1. **`get_return_object()`**: Crea l'oggetto che verrà restituito al chiamante quando la coroutine viene invocata.

2. **`initial_suspend()`**: Determina se la coroutine deve essere sospesa immediatamente dopo l'inizializzazione.
   - `std::suspend_always`: La coroutine viene sospesa immediatamente.
   - `std::suspend_never`: La coroutine inizia l'esecuzione immediatamente.

3. **`final_suspend()` noexcept**: Determina se la coroutine deve essere sospesa dopo il completamento.
   - `std::suspend_always`: La coroutine viene sospesa e il chiamante deve distruggerla esplicitamente.
   - `std::suspend_never`: La coroutine viene distrutta automaticamente.

4. **`unhandled_exception()`**: Gestisce le eccezioni non catturate all'interno della coroutine.

### Metodi Opzionali

1. **`return_void()`** o **`return_value(T)`**: Gestisce il valore restituito dalla coroutine con `co_return`.

2. **`yield_value(T)`**: Gestisce il valore prodotto dalla coroutine con `co_yield`.

3. **`await_transform(T)`**: Trasforma un'espressione prima che venga utilizzata con `co_await`.

## Tipi di Ritorno Comuni

### 1. Generator

Un generatore è un tipo di coroutine che produce una sequenza di valori. Utilizza `co_yield` per produrre valori e sospendere l'esecuzione.

```cpp
template<typename T>
class generator {
public:
    struct promise_type {
        T current_value;
        
        generator get_return_object() {
            return generator{std::coroutine_handle<promise_type>::from_promise(*this)};
        }
        
        std::suspend_always initial_suspend() { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }
        
        std::suspend_always yield_value(T value) {
            current_value = value;
            return {};
        }
        
        void return_void() {}
        void unhandled_exception() { std::terminate(); }
    };
    
    // Costruttore e distruttore
    generator(std::coroutine_handle<promise_type> h) : handle(h) {}
    ~generator() { if (handle) handle.destroy(); }
    
    // Non permettere la copia
    generator(const generator&) = delete;
    generator& operator=(const generator&) = delete;
    
    // Permetti il movimento
    generator(generator&& other) noexcept : handle(other.handle) {
        other.handle = nullptr;
    }
    
    generator& operator=(generator&& other) noexcept {
        if (this != &other) {
            if (handle) handle.destroy();
            handle = other.handle;
            other.handle = nullptr;
        }
        return *this;
    }
    
    // Interfaccia per l'iterazione
    bool next() {
        if (handle) {
            handle.resume();
            return !handle.done();
        }
        return false;
    }
    
    T value() const { return handle.promise().current_value; }
    
private:
    std::coroutine_handle<promise_type> handle;
};
```

Esempio di utilizzo:

```cpp
generator<int> fibonacci(int n) {
    int a = 0, b = 1;
    for (int i = 0; i < n; ++i) {
        co_yield a;
        int tmp = a;
        a = b;
        b = tmp + b;
    }
}

int main() {
    auto fib = fibonacci(10);
    while (fib.next()) {
        std::cout << fib.value() << " ";
    }
    return 0;
}
```

### 2. Task

Una task rappresenta un'operazione asincrona che può essere sospesa e ripresa. Utilizza `co_await` per sospendere l'esecuzione in attesa del completamento di un'operazione.

```cpp
template<typename T>
class task {
public:
    struct promise_type {
        std::optional<T> result;
        std::exception_ptr exception;
        
        task get_return_object() {
            return task{std::coroutine_handle<promise_type>::from_promise(*this)};
        }
        
        std::suspend_never initial_suspend() { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }
        
        void return_value(T value) {
            result = std::move(value);
        }
        
        void unhandled_exception() {
            exception = std::current_exception();
        }
    };
    
    // Costruttore e distruttore
    task(std::coroutine_handle<promise_type> h) : handle(h) {}
    ~task() { if (handle) handle.destroy(); }
    
    // Non permettere la copia
    task(const task&) = delete;
    task& operator=(const task&) = delete;
    
    // Permetti il movimento
    task(task&& other) noexcept : handle(other.handle) {
        other.handle = nullptr;
    }
    
    task& operator=(task&& other) noexcept {
        if (this != &other) {
            if (handle) handle.destroy();
            handle = other.handle;
            other.handle = nullptr;
        }
        return *this;
    }
    
    // Ottieni il risultato
    T get_result() {
        if (handle.promise().exception) {
            std::rethrow_exception(handle.promise().exception);
        }
        return *handle.promise().result;
    }
    
private:
    std::coroutine_handle<promise_type> handle;
};
```

Esempio di utilizzo:

```cpp
task<int> async_operation() {
    // Simula un'operazione asincrona
    co_await std::suspend_always{};
    co_return 42;
}

int main() {
    auto t = async_operation();
    // Fai qualcos'altro...
    int result = t.get_result();
    std::cout << "Risultato: " << result << std::endl;
    return 0;
}
```

### 3. Lazy

Un tipo lazy rappresenta un calcolo che viene eseguito solo quando necessario. Utilizza `co_await` per sospendere l'esecuzione e `co_return` per restituire il risultato.

```cpp
template<typename T>
class lazy {
public:
    struct promise_type {
        T result;
        
        lazy get_return_object() {
            return lazy{std::coroutine_handle<promise_type>::from_promise(*this)};
        }
        
        std::suspend_always initial_suspend() { return {}; }
        std::suspend_never final_suspend() noexcept { return {}; }
        
        void return_value(T value) {
            result = std::move(value);
        }
        
        void unhandled_exception() { std::terminate(); }
    };
    
    // Costruttore e distruttore
    lazy(std::coroutine_handle<promise_type> h) : handle(h) {}
    ~lazy() { if (handle) handle.destroy(); }
    
    // Non permettere la copia
    lazy(const lazy&) = delete;
    lazy& operator=(const lazy&) = delete;
    
    // Permetti il movimento
    lazy(lazy&& other) noexcept : handle(other.handle) {
        other.handle = nullptr;
    }
    
    lazy& operator=(lazy&& other) noexcept {
        if (this != &other) {
            if (handle) handle.destroy();
            handle = other.handle;
            other.handle = nullptr;
        }
        return *this;
    }
    
    // Valuta il calcolo
    T value() {
        if (handle) {
            handle.resume();
            T result = handle.promise().result;
            handle.destroy();
            handle = nullptr;
            return result;
        }
        throw std::runtime_error("Lazy value already consumed");
    }
    
private:
    std::coroutine_handle<promise_type> handle;
};
```

Esempio di utilizzo:

```cpp
lazy<int> expensive_calculation() {
    // Simula un calcolo costoso
    co_return 42;
}

int main() {
    auto calc = expensive_calculation();
    // Il calcolo non viene eseguito finché non chiamiamo value()
    std::cout << "Prima di value()" << std::endl;
    int result = calc.value();
    std::cout << "Risultato: " << result << std::endl;
    return 0;
}
```

## Awaitable e Awaiters

Un awaitable è un oggetto che può essere utilizzato con `co_await`. Per essere awaitable, un tipo deve soddisfare uno dei seguenti requisiti:

1. Avere metodi `await_ready()`, `await_suspend()` e `await_resume()`.
2. Essere convertibile in un tipo che ha questi metodi.
3. Essere un tipo per cui esiste un'operatore `operator co_await` che restituisce un tipo che ha questi metodi.

### Implementazione di un Awaitable

```cpp
class simple_awaitable {
public:
    bool await_ready() const { return false; }
    
    void await_suspend(std::coroutine_handle<> handle) {
        // Esegui operazioni asincrone e poi riprendi la coroutine
        std::thread([handle]() {
            std::this_thread::sleep_for(std::chrono::seconds(1));
            handle.resume();
        }).detach();
    }
    
    int await_resume() const { return 42; }
};

task<void> use_awaitable() {
    int result = co_await simple_awaitable{};
    std::cout << "Risultato: " << result << std::endl;
}
```

## Considerazioni Avanzate

### 1. Gestione delle Eccezioni

La gestione delle eccezioni nelle coroutine è gestita dal metodo `unhandled_exception()` della promise_type. Questo metodo viene chiamato quando un'eccezione non catturata viene lanciata all'interno della coroutine.

```cpp
void unhandled_exception() {
    exception = std::current_exception();
}
```

### 2. Cancellazione

La cancellazione di operazioni asincrone può essere implementata utilizzando token di cancellazione o altri meccanismi simili.

### 3. Composizione di Coroutine

Le coroutine possono essere composte per creare operazioni asincrone più complesse:

```cpp
task<int> operation1() {
    co_return 42;
}

task<std::string> operation2(int value) {
    co_return "Risultato: " + std::to_string(value);
}

task<std::string> composed_operation() {
    int result1 = co_await operation1();
    std::string result2 = co_await operation2(result1);
    co_return result2;
}
```

## Conclusione

I tipi di ritorno delle coroutine in C++20 rappresentano uno degli aspetti più complessi ma anche più potenti del meccanismo delle coroutine. La definizione corretta di questi tipi è fondamentale per sfruttare appieno le potenzialità delle coroutine per generatori, operazioni asincrone e altre funzionalità avanzate.

Sebbene l'implementazione di tipi di ritorno personalizzati per le coroutine possa sembrare complessa, le librerie esistenti e future semplificheranno l'utilizzo delle coroutine per casi d'uso comuni. Con l'adozione di C++20, questi tipi diventeranno sempre più standardizzati e facili da utilizzare.