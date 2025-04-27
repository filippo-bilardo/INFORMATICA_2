# Metaprogrammazione con Template in C++

## Introduzione alla Metaprogrammazione con Template

La metaprogrammazione con template è una tecnica avanzata di programmazione in C++ che consente di eseguire calcoli e generare codice durante la fase di compilazione anziché a runtime. Questa tecnica sfrutta il sistema di template di C++ per creare programmi che vengono eseguiti dal compilatore, producendo codice ottimizzato e specifico per ogni istanza.

La metaprogrammazione con template può sembrare complessa all'inizio, ma offre vantaggi significativi in termini di prestazioni, type safety e flessibilità del codice.

## Concetti Base dei Template

Prima di addentrarci nella metaprogrammazione, rivediamo brevemente i concetti base dei template in C++.

### Template di Funzioni

```cpp
// Template di funzione per trovare il massimo tra due valori
template <typename T>
T massimo(T a, T b) {
    return (a > b) ? a : b;
}

// Uso
int a = 5, b = 7;
std::cout << massimo(a, b) << std::endl; // Output: 7

double c = 3.14, d = 2.71;
std::cout << massimo(c, d) << std::endl; // Output: 3.14
```

### Template di Classi

```cpp
// Template di classe per un contenitore generico
template <typename T>
class Contenitore {
private:
    T elemento;

public:
    Contenitore(const T& e) : elemento(e) {}
    
    T getElemento() const {
        return elemento;
    }
    
    void setElemento(const T& e) {
        elemento = e;
    }
};

// Uso
Contenitore<int> contenitoreInt(42);
std::cout << contenitoreInt.getElemento() << std::endl; // Output: 42

Contenitore<std::string> contenitoreString("Hello");
std::cout << contenitoreString.getElemento() << std::endl; // Output: Hello
```

## Specializzazione dei Template

La specializzazione dei template permette di fornire implementazioni specifiche per determinati tipi.

### Specializzazione Totale

```cpp
// Template generico
template <typename T>
class Processore {
public:
    void processa(const T& valore) {
        std::cout << "Processamento generico: " << valore << std::endl;
    }
};

// Specializzazione totale per il tipo bool
template <>
class Processore<bool> {
public:
    void processa(const bool& valore) {
        std::cout << "Processamento specializzato per bool: " 
                  << (valore ? "vero" : "falso") << std::endl;
    }
};

// Uso
Processore<int> processorInt;
processorInt.processa(42); // Output: Processamento generico: 42

Processore<bool> processorBool;
processorBool.processa(true); // Output: Processamento specializzato per bool: vero
```

### Specializzazione Parziale

```cpp
// Template generico
template <typename T, typename U>
class Coppia {
public:
    void descrivi() {
        std::cout << "Coppia generica" << std::endl;
    }
};

// Specializzazione parziale per quando il secondo tipo è int
template <typename T>
class Coppia<T, int> {
public:
    void descrivi() {
        std::cout << "Coppia con secondo tipo int" << std::endl;
    }
};

// Specializzazione parziale per quando entrambi i tipi sono uguali
template <typename T>
class Coppia<T, T> {
public:
    void descrivi() {
        std::cout << "Coppia con tipi identici" << std::endl;
    }
};

// Uso
Coppia<double, std::string> c1;
c1.descrivi(); // Output: Coppia generica

Coppia<double, int> c2;
c2.descrivi(); // Output: Coppia con secondo tipo int

Coppia<int, int> c3;
c3.descrivi(); // Output: Coppia con tipi identici
```

## Metaprogrammazione con Template: Calcoli a Tempo di Compilazione

La metaprogrammazione con template permette di eseguire calcoli durante la compilazione, riducendo il carico a runtime.

### Calcolo del Fattoriale a Tempo di Compilazione

```cpp
// Calcolo del fattoriale a tempo di compilazione
template <unsigned int N>
struct Fattoriale {
    static constexpr unsigned int valore = N * Fattoriale<N-1>::valore;
};

// Caso base per terminare la ricorsione
template <>
struct Fattoriale<0> {
    static constexpr unsigned int valore = 1;
};

// Uso
constexpr unsigned int fact5 = Fattoriale<5>::valore;
std::cout << "5! = " << fact5 << std::endl; // Output: 5! = 120
```

In questo esempio, il calcolo del fattoriale avviene interamente durante la compilazione. Il compilatore genera una serie di istanziazioni del template `Fattoriale` e calcola il risultato, che viene poi inserito direttamente nel codice compilato.

### Sequenza di Fibonacci a Tempo di Compilazione

```cpp
template <unsigned int N>
struct Fibonacci {
    static constexpr unsigned int valore = Fibonacci<N-1>::valore + Fibonacci<N-2>::valore;
};

// Casi base
template <>
struct Fibonacci<0> {
    static constexpr unsigned int valore = 0;
};

template <>
struct Fibonacci<1> {
    static constexpr unsigned int valore = 1;
};

// Uso
constexpr unsigned int fib10 = Fibonacci<10>::valore;
std::cout << "Fibonacci(10) = " << fib10 << std::endl; // Output: Fibonacci(10) = 55
```

## Metaprogrammazione con Template: Manipolazione di Tipi

La metaprogrammazione con template non si limita ai calcoli numerici, ma può essere utilizzata anche per manipolare tipi a tempo di compilazione.

### Traits di Tipo

I traits di tipo sono template che forniscono informazioni sui tipi durante la compilazione.

```cpp
// Trait per verificare se un tipo è un puntatore
template <typename T>
struct is_pointer {
    static constexpr bool value = false;
};

// Specializzazione per i puntatori
template <typename T>
struct is_pointer<T*> {
    static constexpr bool value = true;
};

// Uso
std::cout << "int è un puntatore? " << (is_pointer<int>::value ? "sì" : "no") << std::endl;
std::cout << "int* è un puntatore? " << (is_pointer<int*>::value ? "sì" : "no") << std::endl;

// Output:
// int è un puntatore? no
// int* è un puntatore? sì
```

### Rimozione di Qualificatori

```cpp
// Trait per rimuovere il qualificatore const
template <typename T>
struct remove_const {
    using type = T;
};

template <typename T>
struct remove_const<const T> {
    using type = T;
};

// Uso
typedef remove_const<const int>::type Tipo;
std::cout << "Tipo è: " << typeid(Tipo).name() << std::endl; // Output dipende dal compilatore, ma sarà int
```

## SFINAE (Substitution Failure Is Not An Error)

SFINAE è un principio del C++ che permette di selezionare diverse implementazioni di template in base alle proprietà dei tipi, senza generare errori di compilazione.

```cpp
#include <type_traits>

// Funzione per tipi che supportano l'addizione
template <typename T>
typename std::enable_if<std::is_arithmetic<T>::value, T>::type
somma(T a, T b) {
    return a + b;
}

// Funzione per tipi che non supportano l'addizione
template <typename T>
typename std::enable_if<!std::is_arithmetic<T>::value, std::string>::type
somma(T a, T b) {
    return "Operazione non supportata";
}

// Uso
std::cout << somma(5, 3) << std::endl; // Output: 8
std::cout << somma(std::string("a"), std::string("b")) << std::endl; // Output: Operazione non supportata
```

In C++17, possiamo semplificare l'uso di SFINAE con `if constexpr`:

```cpp
template <typename T>
auto somma(T a, T b) {
    if constexpr (std::is_arithmetic_v<T>) {
        return a + b;
    } else {
        return std::string("Operazione non supportata");
    }
}
```

## Fold Expressions (C++17)

Le fold expressions, introdotte in C++17, semplificano notevolmente la metaprogrammazione con template per operazioni su pacchetti di parametri.

```cpp
// Somma di un numero variabile di argomenti
template <typename... Args>
auto somma_tutti(Args... args) {
    return (... + args); // Fold expression unaria (da sinistra)
}

// Uso
std::cout << somma_tutti(1, 2, 3, 4, 5) << std::endl; // Output: 15
```

Esistono quattro tipi di fold expressions:

1. Fold unaria da sinistra: `(... op args)`
2. Fold unaria da destra: `(args op ...)`
3. Fold binaria da sinistra: `(init op ... op args)`
4. Fold binaria da destra: `(args op ... op init)`

```cpp
// Concatenazione di stringhe con fold expression binaria
template <typename... Args>
std::string concatena(Args... args) {
    return (std::string("") + ... + std::to_string(args));
}

// Uso
std::cout << concatena(1, 2, 3) << std::endl; // Output: 123
```

## Metaprogrammazione con Concetti (C++20)

I concetti, introdotti in C++20, forniscono un modo più elegante per esprimere vincoli sui template.

```cpp
#include <concepts>

// Definizione di un concetto
template <typename T>
concept Sommabile = requires(T a, T b) {
    { a + b } -> std::convertible_to<T>;
};

// Funzione che accetta solo tipi che soddisfano il concetto Sommabile
template <Sommabile T>
T somma(T a, T b) {
    return a + b;
}

// Uso
std::cout << somma(5, 3) << std::endl; // Output: 8
// somma(std::vector<int>{}, std::vector<int>{}); // Errore di compilazione
```

## Applicazioni Pratiche della Metaprogrammazione con Template

### Generazione di Codice Ottimizzato

```cpp
// Calcolo della potenza a tempo di compilazione
template <typename T, unsigned int N>
struct Power {
    static T calculate(T base) {
        return base * Power<T, N-1>::calculate(base);
    }
};

template <typename T>
struct Power<T, 0> {
    static T calculate(T) {
        return static_cast<T>(1);
    }
};

// Uso
double risultato = Power<double, 3>::calculate(2.0); // 2^3 = 8
std::cout << risultato << std::endl; // Output: 8
```

### Implementazione di Tuple

```cpp
// Implementazione semplificata di una tuple
template <typename... Types>
class SimpleTuple;

// Caso base: tuple vuota
template <>
class SimpleTuple<> {};

// Caso ricorsivo
template <typename Head, typename... Tail>
class SimpleTuple<Head, Tail...> : private SimpleTuple<Tail...> {
private:
    Head value;

public:
    SimpleTuple(const Head& head, const Tail&... tail)
        : SimpleTuple<Tail...>(tail...), value(head) {}
    
    Head getHead() const { return value; }
    
    const SimpleTuple<Tail...>& getTail() const {
        return static_cast<const SimpleTuple<Tail...>&>(*this);
    }
};

// Funzione helper per accedere agli elementi
template <size_t I, typename... Types>
struct TupleGetter;

template <typename Head, typename... Tail>
struct TupleGetter<0, Head, Tail...> {
    static const Head& get(const SimpleTuple<Head, Tail...>& tuple) {
        return tuple.getHead();
    }
};

template <size_t I, typename Head, typename... Tail>
struct TupleGetter<I, Head, Tail...> {
    static const auto& get(const SimpleTuple<Head, Tail...>& tuple) {
        return TupleGetter<I-1, Tail...>::get(tuple.getTail());
    }
};

// Funzione di accesso più user-friendly
template <size_t I, typename... Types>
const auto& get(const SimpleTuple<Types...>& tuple) {
    return TupleGetter<I, Types...>::get(tuple);
}

// Uso
SimpleTuple<int, double, std::string> tuple(1, 3.14, "Hello");
std::cout << get<0>(tuple) << ", " << get<1>(tuple) << ", " << get<2>(tuple) << std::endl;
// Output: 1, 3.14, Hello
```

## Vantaggi e Svantaggi della Metaprogrammazione con Template

### Vantaggi

1. **Esecuzione a tempo di compilazione**: I calcoli vengono eseguiti durante la compilazione, riducendo l'overhead a runtime.
2. **Type safety**: Gli errori di tipo vengono rilevati a tempo di compilazione.
3. **Ottimizzazione**: Il compilatore può generare codice altamente ottimizzato per ogni istanza specifica.
4. **Genericità**: Permette di scrivere codice che funziona con diversi tipi mantenendo la type safety.

### Svantaggi

1. **Complessità**: La sintassi e i concetti possono essere difficili da comprendere e debuggare.
2. **Tempi di compilazione**: L'uso intensivo di template può aumentare significativamente i tempi di compilazione.
3. **Messaggi di errore**: Gli errori nei template spesso producono messaggi di errore lunghi e difficili da interpretare.
4. **Manutenibilità**: Il codice che fa uso intensivo di metaprogrammazione può essere difficile da mantenere.

## Best Practices

1. **Usa la metaprogrammazione con moderazione**: Applicala solo quando i benefici superano i costi in termini di complessità e manutenibilità.
2. **Documenta il codice**: La metaprogrammazione può essere difficile da comprendere; una buona documentazione è essenziale.
3. **Usa alias di template**: Gli alias di template possono rendere il codice più leggibile.
4. **Considera le alternative moderne**: In C++17 e C++20, molte operazioni che richiedevano metaprogrammazione complessa possono essere realizzate con costrutti più semplici come `if constexpr` e i concetti.

## Domande di Autovalutazione

1. Qual è la differenza tra template di funzione e template di classe?
2. Come funziona la specializzazione dei template e quando è utile?
3. Cosa significa che la metaprogrammazione con template è "Turing-complete"?
4. Quali sono i vantaggi dell'esecuzione di calcoli a tempo di compilazione rispetto all'esecuzione a runtime?
5. Come possono i concetti (C++20) migliorare la metaprogrammazione con template?

## Esercizi Proposti

1. Implementa una classe template `Array` che rappresenta un array statico con controllo dei limiti a tempo di compilazione.
2. Crea un trait di tipo `has_toString` che verifica se un tipo ha un metodo `toString()`.
3. Implementa una funzione template `map` che applica una funzione a ogni elemento di un contenitore e restituisce un nuovo contenitore con i risultati.
4. Crea una classe template `TypeList` che rappresenta una lista di tipi e implementa operazioni come `Append`, `Remove` e `Contains`.
5. Implementa il calcolo dei numeri primi a tempo di compilazione utilizzando la metaprogrammazione con template.