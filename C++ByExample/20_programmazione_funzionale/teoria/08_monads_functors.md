# Monads e Functors in C++

## Introduzione

I concetti di Monads e Functors provengono dalla teoria delle categorie e sono ampiamente utilizzati in linguaggi di programmazione funzionale puri come Haskell. Sebbene C++ non sia un linguaggio funzionale puro, è possibile implementare questi concetti per migliorare la gestione degli effetti collaterali e la composizione di operazioni.

## Functors

Un Functor è un tipo di dato che implementa una funzione `map` (o `fmap`), che permette di applicare una funzione al valore contenuto all'interno del Functor, producendo un nuovo Functor dello stesso tipo.

### Implementazione di un Functor in C++

```cpp
template <typename T>
class Optional {
private:
    bool _hasValue;
    T _value;

public:
    Optional() : _hasValue(false) {}
    Optional(const T& value) : _hasValue(true), _value(value) {}
    
    bool hasValue() const { return _hasValue; }
    const T& value() const { return _value; }
    
    // Implementazione della funzione map che definisce il Functor
    template <typename Func>
    auto map(Func f) const -> Optional<decltype(f(std::declval<T>()))> {
        using ReturnType = decltype(f(std::declval<T>()));
        
        if (_hasValue) {
            return Optional<ReturnType>(f(_value));
        } else {
            return Optional<ReturnType>();
        }
    }
};
```

Esempio di utilizzo:

```cpp
#include <iostream>
#include <string>

int main() {
    Optional<int> num(42);
    
    // Applicare una funzione al valore contenuto
    auto doubled = num.map([](int x) { return x * 2; });
    auto asString = num.map([](int x) { return std::to_string(x); });
    
    if (doubled.hasValue()) {
        std::cout << "Doubled: " << doubled.value() << std::endl;
    }
    
    if (asString.hasValue()) {
        std::cout << "As string: " << asString.value() << std::endl;
    }
    
    // Esempio con un Optional vuoto
    Optional<int> empty;
    auto result = empty.map([](int x) { return x * 2; });
    
    std::cout << "Empty has value: " << (result.hasValue() ? "yes" : "no") << std::endl;
    
    return 0;
}
```

## Monads

Un Monad è un Functor con funzionalità aggiuntive: `return` (o `unit`) e `bind` (o `flatMap`). La funzione `return` avvolge un valore in un Monad, mentre `bind` permette di concatenare operazioni che producono Monad.

### Implementazione di un Monad in C++

Estendiamo la classe `Optional` per renderla un Monad:

```cpp
template <typename T>
class Optional {
private:
    bool _hasValue;
    T _value;

public:
    Optional() : _hasValue(false) {}
    Optional(const T& value) : _hasValue(true), _value(value) {}
    
    bool hasValue() const { return _hasValue; }
    const T& value() const { return _value; }
    
    // Functor: map
    template <typename Func>
    auto map(Func f) const -> Optional<decltype(f(std::declval<T>()))> {
        using ReturnType = decltype(f(std::declval<T>()));
        
        if (_hasValue) {
            return Optional<ReturnType>(f(_value));
        } else {
            return Optional<ReturnType>();
        }
    }
    
    // Monad: bind (flatMap)
    template <typename Func>
    auto bind(Func f) const -> decltype(f(std::declval<T>())) {
        using ReturnType = decltype(f(std::declval<T>()));
        
        if (_hasValue) {
            return f(_value);
        } else {
            return ReturnType();
        }
    }
    
    // Monad: return (già implementato nel costruttore)
    static Optional<T> return_value(const T& value) {
        return Optional<T>(value);
    }
};
```

Esempio di utilizzo:

```cpp
#include <iostream>
#include <string>

// Funzione che restituisce un Optional
Optional<int> safeDivide(int a, int b) {
    if (b == 0) {
        return Optional<int>(); // Nessun valore (errore)
    }
    return Optional<int>(a / b);
}

Optional<int> safeSqrt(int x) {
    if (x < 0) {
        return Optional<int>(); // Nessun valore (errore)
    }
    return Optional<int>(static_cast<int>(std::sqrt(x)));
}

int main() {
    Optional<int> num(16);
    
    // Concatenazione di operazioni monadiche
    auto result = num.bind([](int x) {
        return safeSqrt(x).bind([](int y) {
            return safeDivide(y, 2);
        });
    });
    
    if (result.hasValue()) {
        std::cout << "Result: " << result.value() << std::endl;
    } else {
        std::cout << "Operation failed" << std::endl;
    }
    
    // Esempio con errore
    Optional<int> num2(16);
    auto result2 = num2.bind([](int x) {
        return safeSqrt(x).bind([](int y) {
            return safeDivide(y, 0); // Divisione per zero
        });
    });
    
    if (result2.hasValue()) {
        std::cout << "Result 2: " << result2.value() << std::endl;
    } else {
        std::cout << "Operation 2 failed" << std::endl;
    }
    
    return 0;
}
```

## Applicazioni Pratiche

### Gestione degli Errori

I Monad sono particolarmente utili per la gestione degli errori, come alternativa alle eccezioni:

```cpp
template <typename T, typename E>
class Either {
private:
    bool _isRight;
    union {
        T _right;
        E _left;
    };

public:
    // Costruttore per il caso di successo (Right)
    static Either<T, E> Right(const T& value) {
        Either<T, E> result;
        result._isRight = true;
        new (&result._right) T(value);
        return result;
    }
    
    // Costruttore per il caso di errore (Left)
    static Either<T, E> Left(const E& error) {
        Either<T, E> result;
        result._isRight = false;
        new (&result._left) E(error);
        return result;
    }
    
    // Distruttore
    ~Either() {
        if (_isRight) {
            _right.~T();
        } else {
            _left.~E();
        }
    }
    
    bool isRight() const { return _isRight; }
    bool isLeft() const { return !_isRight; }
    
    const T& right() const { return _right; }
    const E& left() const { return _left; }
    
    // Implementazione di bind per Either
    template <typename Func>
    auto bind(Func f) const -> decltype(f(std::declval<T>())) {
        using ReturnType = decltype(f(std::declval<T>()));
        
        if (_isRight) {
            return f(_right);
        } else {
            return ReturnType::Left(_left);
        }
    }
};
```

### Computazioni Asincrone

I Monad possono essere utilizzati anche per gestire computazioni asincrone:

```cpp
template <typename T>
class Future {
private:
    std::shared_ptr<std::promise<T>> _promise;
    std::shared_future<T> _future;

public:
    Future() : _promise(std::make_shared<std::promise<T>>()) {
        _future = _promise->get_future();
    }
    
    void set_value(const T& value) {
        _promise->set_value(value);
    }
    
    T get() {
        return _future.get();
    }
    
    // Implementazione di bind per Future
    template <typename Func>
    auto bind(Func f) -> Future<decltype(f(std::declval<T>()).get())> {
        using ReturnType = decltype(f(std::declval<T>()).get());
        Future<ReturnType> result;
        
        std::thread([this, f, result]() mutable {
            try {
                T value = _future.get();
                auto nextFuture = f(value);
                result.set_value(nextFuture.get());
            } catch (const std::exception& e) {
                // Gestione degli errori
            }
        }).detach();
        
        return result;
    }
};
```

## Vantaggi dell'Utilizzo di Functors e Monads

1. **Composizione di Operazioni**: Facilitano la composizione di operazioni complesse in modo leggibile.
2. **Gestione degli Effetti Collaterali**: Incapsulano gli effetti collaterali, rendendo il codice più prevedibile.
3. **Gestione degli Errori**: Offrono un'alternativa elegante alle eccezioni per la gestione degli errori.
4. **Codice più Dichiarativo**: Permettono di scrivere codice più dichiarativo e meno imperativo.

## Limitazioni in C++

1. **Sintassi Verbosa**: Rispetto a linguaggi funzionali puri, l'implementazione in C++ può risultare più verbosa.
2. **Mancanza di Supporto Nativo**: C++ non ha un supporto nativo per questi concetti, richiedendo implementazioni personalizzate.
3. **Complessità**: L'introduzione di questi concetti può aumentare la complessità del codice per sviluppatori non familiari con la programmazione funzionale.

## Domande di Autovalutazione

1. Qual è la differenza principale tra un Functor e un Monad?
2. Come può un Monad aiutare nella gestione degli errori in C++?
3. Quali sono i vantaggi dell'utilizzo di Functors e Monads rispetto ad approcci più tradizionali?
4. In quali scenari l'utilizzo di Monads potrebbe non essere appropriato in C++?
5. Come si potrebbe implementare un Monad per gestire operazioni asincrone in C++?

## Esercizi Proposti

1. Implementa un Functor `Maybe<T>` che gestisca valori opzionali.
2. Crea un Monad `Result<T, E>` per la gestione degli errori senza eccezioni.
3. Implementa un Monad `List<T>` che permetta di applicare funzioni a tutti gli elementi di una lista.
4. Utilizza il Monad `Optional<T>` per implementare una funzione di ricerca sicura in un container.
5. Crea un Monad per gestire operazioni di I/O in modo funzionale.

## Conclusione

I concetti di Functors e Monads, sebbene provenienti dalla programmazione funzionale pura, possono essere implementati e utilizzati efficacemente anche in C++. Offrono un modo elegante per gestire effetti collaterali, errori e composizione di operazioni, portando a un codice più modulare e manutenibile. Tuttavia, è importante valutare attentamente quando questi approcci sono appropriati nel contesto di un'applicazione C++, considerando la familiarità del team con i concetti funzionali e la complessità aggiuntiva che potrebbero introdurre.

Nelle esercitazioni precedenti, abbiamo esplorato vari aspetti della programmazione funzionale in C++. Con questa lezione su Monads e Functors, concludiamo il nostro percorso attraverso i concetti funzionali applicati a C++. Questi strumenti avanzati completano il tuo arsenale di tecniche di programmazione funzionale, permettendoti di scrivere codice più robusto, componibile e manutenibile.