# Esercizi di Programmazione Generica e Metaprogrammazione in C++

Questo file contiene una serie di esercizi pratici per approfondire i concetti di programmazione generica e metaprogrammazione in C++. Gli esercizi sono organizzati per livello di difficoltà e per argomento.

## Esercizi sui Template di Base

### Esercizio 1: Funzione Template Minimo/Massimo

Implementa una funzione template `minimo` che restituisca il valore minimo tra due valori di qualsiasi tipo che supporti l'operatore `<`.

```cpp
// Soluzione
template <typename T>
T minimo(T a, T b) {
    return (a < b) ? a : b;
}
```

Implementa anche una funzione template `massimo` che restituisca il valore massimo tra due valori.

### Esercizio 2: Funzione Template per Scambio

Implementa una funzione template `scambia` che scambi i valori di due variabili di qualsiasi tipo.

```cpp
// Soluzione
template <typename T>
void scambia(T& a, T& b) {
    T temp = std::move(a);
    a = std::move(b);
    b = std::move(temp);
}
```

### Esercizio 3: Classe Template Pila

Implementa una classe template `Pila` che rappresenti una pila di elementi di tipo generico con le operazioni `push`, `pop`, `top` e `isEmpty`.

```cpp
template <typename T>
class Pila {
private:
    std::vector<T> elementi;

public:
    void push(const T& elemento) {
        elementi.push_back(elemento);
    }
    
    T pop() {
        if (isEmpty()) {
            throw std::runtime_error("Pila vuota");
        }
        T elemento = elementi.back();
        elementi.pop_back();
        return elemento;
    }
    
    const T& top() const {
        if (isEmpty()) {
            throw std::runtime_error("Pila vuota");
        }
        return elementi.back();
    }
    
    bool isEmpty() const {
        return elementi.empty();
    }
    
    size_t size() const {
        return elementi.size();
    }
};
```

## Esercizi sulla Metaprogrammazione

### Esercizio 4: Calcolo del Fattoriale a Tempo di Compilazione

Implementa una metafunzione `Fattoriale` che calcoli il fattoriale di un numero a tempo di compilazione.

```cpp
template <unsigned int N>
struct Fattoriale {
    static constexpr unsigned int valore = N * Fattoriale<N-1>::valore;
};

template <>
struct Fattoriale<0> {
    static constexpr unsigned int valore = 1;
};

// Utilizzo
constexpr unsigned int fact5 = Fattoriale<5>::valore;  // 120
```

### Esercizio 5: Metafunzione Potenza

Implementa una metafunzione `Potenza` che calcoli Base^Esponente a tempo di compilazione.

```cpp
template <int Base, unsigned int Esponente>
struct Potenza {
    static constexpr int valore = Base * Potenza<Base, Esponente-1>::valore;
};

template <int Base>
struct Potenza<Base, 0> {
    static constexpr int valore = 1;
};

// Utilizzo
constexpr int pot = Potenza<2, 8>::valore;  // 256
```

### Esercizio 6: Metafunzione IsArray

Implementa una metafunzione `IsArray` che determini se un tipo è un array.

```cpp
template <typename T>
struct IsArray : std::false_type {};

template <typename T, size_t N>
struct IsArray<T[N]> : std::true_type {};

template <typename T>
struct IsArray<T[]> : std::true_type {};

// Utilizzo
static_assert(IsArray<int[5]>::value, "int[5] è un array");
static_assert(!IsArray<int>::value, "int non è un array");
```

## Esercizi su SFINAE

### Esercizio 7: Funzione print con SFINAE

Implementa una funzione template `print` che utilizzi SFINAE per:
- Utilizzare `std::to_string` per tipi numerici
- Utilizzare il metodo `.c_str()` per tipi stringa
- Utilizzare `operator<<` per altri tipi che lo supportano

```cpp
// Per tipi numerici
template <typename T>
auto print(T value) -> typename std::enable_if<std::is_arithmetic<T>::value, void>::type {
    std::cout << std::to_string(value) << std::endl;
}

// Per tipi stringa con metodo c_str()
template <typename T>
auto print(const T& value) -> decltype(value.c_str(), void()) {
    std::cout << value.c_str() << std::endl;
}

// Per altri tipi che supportano operator<<
template <typename T>
auto print(const T& value) -> decltype(std::cout << value, void()) {
    std::cout << value << std::endl;
}
```

### Esercizio 8: Metafunzione HasToString

Implementa una metafunzione `HasToString` che verifichi se un tipo ha un metodo `toString()`.

```cpp
// Implementazione con SFINAE
template <typename T, typename = void>
struct HasToString : std::false_type {};

template <typename T>
struct HasToString<T, std::void_t<decltype(std::declval<T>().toString())>> : std::true_type {};

// Classe di test
struct ConToString {
    std::string toString() const { return "Hello"; }
};

struct SenzaToString {};

// Utilizzo
static_assert(HasToString<ConToString>::value, "ConToString ha toString()");
static_assert(!HasToString<SenzaToString>::value, "SenzaToString non ha toString()");
```

## Esercizi su Fold Expressions (C++17)

### Esercizio 9: Funzione somma con Fold Expressions

Implementa una funzione `somma` che calcoli la somma di un numero variabile di argomenti usando fold expressions.

```cpp
template <typename... Args>
auto somma(Args... args) {
    return (... + args);
}

// Utilizzo
int risultato = somma(1, 2, 3, 4, 5);  // 15
```

### Esercizio 10: Funzione all_of con Fold Expressions

Implementa una funzione `all_of` che verifichi se tutti gli elementi soddisfano un predicato.

```cpp
template <typename Pred, typename... Args>
bool all_of(Pred pred, Args... args) {
    return (... && pred(args));
}

// Utilizzo
bool tutti_positivi = all_of([](int x) { return x > 0; }, 1, 2, 3);  // true
bool tutti_pari = all_of([](int x) { return x % 2 == 0; }, 2, 4, 6);  // true
```

## Esercizi su Concepts (C++20)

### Esercizio 11: Concept Contenitore

Implementa un concept `Contenitore` che verifichi se un tipo ha i metodi `begin()`, `end()` e `size()`.

```cpp
template <typename T>
concept Contenitore = requires(T container) {
    { container.begin() } -> std::convertible_to<typename T::iterator>;
    { container.end() } -> std::convertible_to<typename T::iterator>;
    { container.size() } -> std::convertible_to<size_t>;
};

// Funzione che accetta solo contenitori
template <Contenitore T>
void stampaElementi(const T& container) {
    std::cout << "Numero di elementi: " << container.size() << std::endl;
    for (const auto& elemento : container) {
        std::cout << elemento << " ";
    }
    std::cout << std::endl;
}
```

### Esercizio 12: Concept Serializzabile

Implementa un concept `Serializzabile` che verifichi se un tipo può essere serializzato in JSON.

```cpp
template <typename T>
concept Serializzabile = requires(T obj) {
    { obj.toJson() } -> std::convertible_to<std::string>;
    { T::fromJson(std::string{}) } -> std::convertible_to<T>;
};

// Funzione che accetta solo tipi serializzabili
template <Serializzabile T>
void salva(const T& obj, const std::string& filename) {
    std::ofstream file(filename);
    file << obj.toJson();
}

template <Serializzabile T>
T carica(const std::string& filename) {
    std::ifstream file(filename);
    std::string json((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());
    return T::fromJson(json);
}
```

## Progetti Pratici

### Progetto 1: Libreria di Contenitori Generici

Implementa una libreria di contenitori generici che includa:
- Una classe template `Lista<T>` per una lista concatenata
- Una classe template `Dizionario<K, V>` per una mappa chiave-valore
- Una classe template `Insieme<T>` per un insieme di elementi unici

### Progetto 2: Framework di Serializzazione

Implementa un framework di serializzazione che utilizzi la metaprogrammazione per generare automaticamente funzioni di serializzazione e deserializzazione per tipi definiti dall'utente.

### Progetto 3: Libreria di Algoritmi Generici

Implementa una libreria di algoritmi generici che utilizzi concepts per selezionare l'implementazione più efficiente in base al tipo di container.

## Sfide Avanzate

### Sfida 1: Tuple Eterogenea

Implementa una classe template `Tupla` che possa contenere elementi di tipi diversi, simile a `std::tuple`.

### Sfida 2: Expression Templates

Implementa una libreria di expression templates per operazioni vettoriali che eviti la creazione di oggetti temporanei.

### Sfida 3: Reflection in C++

Implementa un sistema di reflection semplice che utilizzi la metaprogrammazione per generare informazioni sui tipi a tempo di compilazione.