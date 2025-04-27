# Pattern Matching e Algebraic Data Types in C++

## Introduzione

Il pattern matching e gli algebraic data types (ADT) sono concetti fondamentali nei linguaggi di programmazione funzionale come Haskell, OCaml e Scala. Sebbene C++ non supporti nativamente queste caratteristiche, è possibile simulare molti dei loro aspetti utilizzando le funzionalità del linguaggio. In questa lezione, esploreremo come implementare e utilizzare questi concetti in C++.

## Algebraic Data Types

Gli Algebraic Data Types (tipi di dati algebrici) sono tipi di dati composti che possono essere di due tipi principali:

1. **Sum Types (tipi somma)**: Rappresentano un valore che può essere di uno tra diversi tipi possibili (simili alle union o alle enum in C++).
2. **Product Types (tipi prodotto)**: Rappresentano un valore che contiene contemporaneamente valori di diversi tipi (simili alle struct o alle class in C++).

### Product Types in C++

I tipi prodotto sono facilmente implementabili in C++ utilizzando struct o class:

```cpp
#include <string>
#include <iostream>

// Product type: contiene contemporaneamente valori di tipi diversi
struct Persona {
    std::string nome;
    int età;
    double altezza;
};

int main() {
    Persona p{"Mario", 30, 1.75};
    std::cout << "Nome: " << p.nome << ", Età: " << p.età 
              << ", Altezza: " << p.altezza << " m" << std::endl;
    return 0;
}
```

### Sum Types in C++

I tipi somma sono più complessi da implementare in C++. Possiamo utilizzare diverse tecniche:

#### Utilizzo di `std::variant` (C++17)

```cpp
#include <variant>
#include <string>
#include <iostream>

int main() {
    // Un valore che può essere o un int o una string o un double
    std::variant<int, std::string, double> valore;
    
    valore = 42;
    std::cout << "Valore (int): " << std::get<int>(valore) << std::endl;
    
    valore = "Hello";
    std::cout << "Valore (string): " << std::get<std::string>(valore) << std::endl;
    
    valore = 3.14;
    std::cout << "Valore (double): " << std::get<double>(valore) << std::endl;
    
    // Verifica del tipo contenuto
    if (std::holds_alternative<int>(valore)) {
        std::cout << "Contiene un int" << std::endl;
    } else if (std::holds_alternative<std::string>(valore)) {
        std::cout << "Contiene una string" << std::endl;
    } else if (std::holds_alternative<double>(valore)) {
        std::cout << "Contiene un double" << std::endl;
    }
    
    return 0;
}
```

#### Implementazione di un Tagged Union

Prima di C++17, potevamo implementare manualmente un tagged union:

```cpp
#include <string>
#include <iostream>
#include <memory>

// Tagged union manuale
class Valore {
public:
    enum class Tipo { INT, STRING, DOUBLE };
    
    Valore(int v) : tipo(Tipo::INT), intVal(v) {}
    Valore(const std::string& v) : tipo(Tipo::STRING), strVal(new std::string(v)) {}
    Valore(double v) : tipo(Tipo::DOUBLE), doubleVal(v) {}
    
    ~Valore() {
        if (tipo == Tipo::STRING && strVal != nullptr) {
            delete strVal;
        }
    }
    
    // Copy constructor e assignment operator omessi per brevità
    
    Tipo getTipo() const { return tipo; }
    
    int getInt() const {
        if (tipo != Tipo::INT) throw std::runtime_error("Non è un int");
        return intVal;
    }
    
    std::string getString() const {
        if (tipo != Tipo::STRING) throw std::runtime_error("Non è una string");
        return *strVal;
    }
    
    double getDouble() const {
        if (tipo != Tipo::DOUBLE) throw std::runtime_error("Non è un double");
        return doubleVal;
    }
    
private:
    Tipo tipo;
    union {
        int intVal;
        std::string* strVal;
        double doubleVal;
    };
};

int main() {
    Valore v1(42);
    Valore v2("Hello");
    Valore v3(3.14);
    
    if (v1.getTipo() == Valore::Tipo::INT) {
        std::cout << "v1 (int): " << v1.getInt() << std::endl;
    }
    
    if (v2.getTipo() == Valore::Tipo::STRING) {
        std::cout << "v2 (string): " << v2.getString() << std::endl;
    }
    
    if (v3.getTipo() == Valore::Tipo::DOUBLE) {
        std::cout << "v3 (double): " << v3.getDouble() << std::endl;
    }
    
    return 0;
}
```

## Pattern Matching

Il pattern matching è una tecnica per verificare se un valore corrisponde a determinati pattern e, in caso affermativo, estrarre componenti del valore o eseguire azioni specifiche.

### Simulazione del Pattern Matching in C++

#### Utilizzo di `std::visit` con `std::variant` (C++17)

```cpp
#include <variant>
#include <string>
#include <iostream>

// Visitor per std::variant
struct Visitor {
    void operator()(int i) const {
        std::cout << "È un int: " << i << std::endl;
    }
    
    void operator()(const std::string& s) const {
        std::cout << "È una string: " << s << std::endl;
    }
    
    void operator()(double d) const {
        std::cout << "È un double: " << d << std::endl;
    }
};

int main() {
    std::variant<int, std::string, double> valore = 42;
    
    // Pattern matching con std::visit
    std::visit(Visitor{}, valore);
    
    valore = "Hello";
    std::visit(Visitor{}, valore);
    
    valore = 3.14;
    std::visit(Visitor{}, valore);
    
    // Pattern matching con lambda
    auto matcher = [](auto&& arg) {
        using T = std::decay_t<decltype(arg)>;
        if constexpr (std::is_same_v<T, int>) {
            std::cout << "Lambda: È un int: " << arg << std::endl;
        } else if constexpr (std::is_same_v<T, std::string>) {
            std::cout << "Lambda: È una string: " << arg << std::endl;
        } else if constexpr (std::is_same_v<T, double>) {
            std::cout << "Lambda: È un double: " << arg << std::endl;
        }
    };
    
    std::visit(matcher, valore);
    
    return 0;
}
```

#### Utilizzo di Switch e Type Traits

```cpp
#include <iostream>
#include <type_traits>
#include <string>

// Funzione template per il pattern matching
template<typename T>
void patternMatch(const T& value) {
    if constexpr (std::is_integral_v<T>) {
        std::cout << "È un tipo intero: " << value << std::endl;
    } else if constexpr (std::is_floating_point_v<T>) {
        std::cout << "È un tipo in virgola mobile: " << value << std::endl;
    } else if constexpr (std::is_same_v<T, std::string>) {
        std::cout << "È una stringa: " << value << std::endl;
    } else {
        std::cout << "Tipo non riconosciuto" << std::endl;
    }
}

int main() {
    patternMatch(42);
    patternMatch(3.14);
    patternMatch(std::string("Hello"));
    
    return 0;
}
```

## Algebraic Data Types Complessi

### Implementazione di un Albero Binario

```cpp
#include <memory>
#include <iostream>
#include <optional>

// Definizione di un albero binario come ADT ricorsivo
template<typename T>
class BinaryTree {
public:
    // Costruttore per un nodo foglia
    BinaryTree(const T& value) : value(value), left(nullptr), right(nullptr) {}
    
    // Costruttore per un nodo interno
    BinaryTree(const T& value, std::unique_ptr<BinaryTree<T>> left, std::unique_ptr<BinaryTree<T>> right)
        : value(value), left(std::move(left)), right(std::move(right)) {}
    
    // Metodi per accedere ai componenti
    const T& getValue() const { return value; }
    const BinaryTree<T>* getLeft() const { return left.get(); }
    const BinaryTree<T>* getRight() const { return right.get(); }
    
    // Pattern matching per l'albero
    template<typename F1, typename F2>
    auto match(F1 leafFn, F2 nodeFn) const {
        if (!left && !right) {
            // È una foglia
            return leafFn(value);
        } else {
            // È un nodo interno
            return nodeFn(value, left.get(), right.get());
        }
    }
    
private:
    T value;
    std::unique_ptr<BinaryTree<T>> left;
    std::unique_ptr<BinaryTree<T>> right;
};

// Funzioni di utilità per creare alberi
template<typename T>
std::unique_ptr<BinaryTree<T>> makeLeaf(const T& value) {
    return std::make_unique<BinaryTree<T>>(value);
}

template<typename T>
std::unique_ptr<BinaryTree<T>> makeNode(const T& value, 
                                       std::unique_ptr<BinaryTree<T>> left, 
                                       std::unique_ptr<BinaryTree<T>> right) {
    return std::make_unique<BinaryTree<T>>(value, std::move(left), std::move(right));
}

int main() {
    // Costruisce un albero: (1 (2 () ()) (3 () ()))
    auto tree = makeNode(1,
                         makeLeaf(2),
                         makeLeaf(3));
    
    // Pattern matching per calcolare la somma dei valori
    auto sum = [](const BinaryTree<int>* tree) -> int {
        return tree->match(
            // Caso foglia
            [](int value) { return value; },
            // Caso nodo interno
            [](int value, const BinaryTree<int>* left, const BinaryTree<int>* right) {
                return value + sum(left) + sum(right);
            }
        );
    };
    
    std::cout << "Somma dei valori nell'albero: " << sum(tree.get()) << std::endl;
    // Output: 6 (1 + 2 + 3)
    
    return 0;
}
```

### Implementazione di un Maybe Type (simile a `std::optional`)

```cpp
#include <iostream>
#include <string>
#include <functional>

// Implementazione di un Maybe type (simile a std::optional)
template<typename T>
class Maybe {
public:
    // Costruttore per Nothing
    Maybe() : hasValue(false), value{} {}
    
    // Costruttore per Just
    explicit Maybe(const T& v) : hasValue(true), value(v) {}
    
    // Pattern matching
    template<typename F1, typename F2>
    auto match(F1 nothingFn, F2 justFn) const {
        if (!hasValue) {
            return nothingFn();
        } else {
            return justFn(value);
        }
    }
    
    // Funzioni di utilità
    bool isJust() const { return hasValue; }
    bool isNothing() const { return !hasValue; }
    
    // Funzioni monadiche (vedremo nella prossima lezione)
    template<typename F>
    auto bind(F f) const -> decltype(f(value)) {
        if (hasValue) {
            return f(value);
        } else {
            return decltype(f(value)){};
        }
    }
    
private:
    bool hasValue;
    T value;
};

// Funzioni di utilità
template<typename T>
Maybe<T> Just(const T& value) {
    return Maybe<T>(value);
}

template<typename T>
Maybe<T> Nothing() {
    return Maybe<T>();
}

int main() {
    auto m1 = Just(42);
    auto m2 = Nothing<int>();
    
    // Pattern matching con Maybe
    auto printMaybe = [](const auto& m) {
        m.match(
            []() { std::cout << "Nothing" << std::endl; },
            [](auto value) { std::cout << "Just " << value << std::endl; }
        );
    };
    
    printMaybe(m1); // Output: Just 42
    printMaybe(m2); // Output: Nothing
    
    // Funzione che restituisce Maybe
    auto divideIfEven = [](int n) -> Maybe<int> {
        if (n % 2 == 0) {
            return Just(n / 2);
        } else {
            return Nothing<int>();
        }
    };
    
    printMaybe(divideIfEven(42)); // Output: Just 21
    printMaybe(divideIfEven(43)); // Output: Nothing
    
    return 0;
}
```

### Implementazione di un Either Type

```cpp
#include <iostream>
#include <string>
#include <variant>
#include <functional>

// Implementazione di un Either type usando std::variant
template<typename L, typename R>
class Either {
public:
    // Costruttore per Left
    Either(const L& left) : value(left) {}
    
    // Costruttore per Right
    Either(const R& right) : value(right) {}
    
    // Pattern matching
    template<typename F1, typename F2>
    auto match(F1 leftFn, F2 rightFn) const {
        return std::visit([&](const auto& v) {
            using T = std::decay_t<decltype(v)>;
            if constexpr (std::is_same_v<T, L>) {
                return leftFn(v);
            } else {
                return rightFn(v);
            }
        }, value);
    }
    
    // Funzioni di utilità
    bool isLeft() const { return std::holds_alternative<L>(value); }
    bool isRight() const { return std::holds_alternative<R>(value); }
    
    const L& getLeft() const { return std::get<L>(value); }
    const R& getRight() const { return std::get<R>(value); }
    
private:
    std::variant<L, R> value;
};

// Funzioni di utilità
template<typename L, typename R>
Either<L, R> Left(const L& left) {
    return Either<L, R>(left);
}

template<typename L, typename R>
Either<L, R> Right(const R& right) {
    return Either<L, R>(right);
}

int main() {
    // Either che rappresenta un risultato di successo o un errore
    Either<std::string, int> result1 = Right<std::string, int>(42);
    Either<std::string, int> result2 = Left<std::string, int>("Errore: divisione per zero");
    
    // Pattern matching con Either
    auto processResult = [](const auto& result) {
        return result.match(
            [](const std::string& error) { return "Errore: " + error; },
            [](int value) { return "Successo: " + std::to_string(value); }
        );
    };
    
    std::cout << processResult(result1) << std::endl; // Output: Successo: 42
    std::cout << processResult(result2) << std::endl; // Output: Errore: Errore: divisione per zero
    
    // Funzione che restituisce Either
    auto divide = [](int a, int b) -> Either<std::string, int> {
        if (b == 0) {
            return Left<std::string, int>("divisione per zero");
        } else {
            return Right<std::string, int>(a / b);
        }
    };
    
    std::cout << processResult(divide(10, 2)) << std::endl; // Output: Successo: 5
    std::cout << processResult(divide(10, 0)) << std::endl; // Output: Errore: divisione per zero
    
    return 0;
}
```

## Vantaggi degli Algebraic Data Types e del Pattern Matching

1. **Tipo-sicurezza**: Gli ADT garantiscono che i valori siano sempre in uno stato valido.
2. **Espressività**: Permettono di modellare concetti complessi in modo chiaro e conciso.
3. **Esaustività**: Il pattern matching può garantire che tutti i casi possibili siano gestiti.
4. **Composabilità**: Gli ADT possono essere composti per creare tipi più complessi.
5. **Immutabilità**: Gli ADT sono spesso implementati come valori immutabili, facilitando la programmazione funzionale.

## Sfide nell'Implementazione in C++

1. **Sintassi Verbosa**: L'implementazione di ADT e pattern matching in C++ può richiedere più codice rispetto ai linguaggi funzionali puri.
2. **Mancanza di Controllo di Esaustività**: C++ non può verificare automaticamente se tutti i casi sono stati gestiti nel pattern matching.
3. **Overhead di Runtime**: Alcune implementazioni possono introdurre overhead di runtime rispetto a soluzioni più dirette.
4. **Curva di Apprendimento**: Questi concetti possono essere difficili da comprendere per gli sviluppatori abituati alla programmazione imperativa.

## Esercizi Proposti

1. Implementa un tipo `List<T>` come ADT ricorsivo con costruttori per la lista vuota e per la lista con testa e coda.
2. Crea una funzione `map` che applica una funzione a ogni elemento di un `List<T>` utilizzando il pattern matching.
3. Implementa un tipo `Result<T, E>` simile a `Either<E, T>` per rappresentare operazioni che possono fallire.
4. Scrivi una funzione `fold` che riduce un `List<T>` a un singolo valore utilizzando il pattern matching.
5. Implementa un interprete per un semplice linguaggio di espressioni aritmetiche utilizzando ADT e pattern matching.

## Domande di Autovalutazione

1. Quali sono le differenze tra sum types e product types? Come possono essere implementati in C++?
2. Come si può simulare il pattern matching in C++? Quali sono i vantaggi e gli svantaggi delle diverse tecniche?
3. In che modo gli algebraic data types migliorano la sicurezza del tipo in un programma?
4. Come si può implementare un ADT ricorsivo in C++? Quali sfide si incontrano?
5. Quali sono le limitazioni nell'implementazione di ADT e pattern matching in C++ rispetto ai linguaggi funzionali puri?

## Conclusione

Sebbene C++ non supporti nativamente gli algebraic data types e il pattern matching come i linguaggi funzionali puri, è possibile simulare queste caratteristiche utilizzando le funzionalità del linguaggio come `std::variant`, `std::visit`, template e lambda expressions. Questi concetti offrono potenti strumenti per modellare dati complessi in modo tipo-sicuro e per scrivere codice più espressivo e manutenibile.

Nella prossima lezione, esploreremo i monads e i functors, altri concetti fondamentali della programmazione funzionale che possono essere implementati in C++.