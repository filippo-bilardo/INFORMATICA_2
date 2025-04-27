# SFINAE (Substitution Failure Is Not An Error) in C++

## Introduzione a SFINAE

SFINAE è un principio fondamentale nella metaprogrammazione C++ che permette al compilatore di escludere silenziosamente un'overload di funzione o una specializzazione di template quando la sostituzione dei parametri template porta a un codice non valido. Questo meccanismo è alla base di molte tecniche avanzate di metaprogrammazione.

## Il Principio di SFINAE

Quando il compilatore C++ tenta di risolvere un'overload di funzione template, sostituisce i parametri template con gli argomenti effettivi. Se questa sostituzione porta a un codice non valido, il compilatore non genera un errore ma semplicemente esclude quella funzione dalla lista dei candidati per l'overload resolution.

### Esempio Base

```cpp
// Funzione per tipi che hanno un membro type
template <typename T>
auto test(typename T::type) -> std::true_type;

// Funzione fallback per altri tipi
template <typename>
auto test(...) -> std::false_type;

// Metafunzione che verifica se T ha un membro type
template <typename T>
using HasTypeMember = decltype(test<T>(std::declval<typename T::type>()));

// Struttura con membro type
struct ConType { using type = int; };

// Struttura senza membro type
struct SenzaType { };

// Utilizzo
static_assert(HasTypeMember<ConType>::value, "ConType ha un membro type");
static_assert(!HasTypeMember<SenzaType>::value, "SenzaType non ha un membro type");
```

## Tecniche SFINAE

### enable_if

Una delle tecniche SFINAE più comuni è l'uso di `std::enable_if` per abilitare o disabilitare funzioni template in base a condizioni sui tipi.

```cpp
// Funzione abilitata solo per tipi integrali
template <typename T>
typename std::enable_if<std::is_integral<T>::value, bool>::type
èIntegrale(T) {
    return true;
}

// Funzione abilitata solo per tipi non integrali
template <typename T>
typename std::enable_if<!std::is_integral<T>::value, bool>::type
èIntegrale(T) {
    return false;
}

// Utilizzo
std::cout << èIntegrale(42) << std::endl;     // Stampa: 1 (true)
std::cout << èIntegrale(3.14) << std::endl;   // Stampa: 0 (false)
```

### Void_t

Introdotto in C++17, `std::void_t` è un alias template che mappa qualsiasi sequenza di tipi a `void`. È particolarmente utile per rilevare proprietà dei tipi.

```cpp
// Implementazione di void_t (pre-C++17)
template <typename...>
using void_t = void;

// Metafunzione predefinita (fallback)
template <typename, typename = void>
struct HasSizeMember : std::false_type {};

// Specializzazione per tipi con membro size()
template <typename T>
struct HasSizeMember<T, void_t<decltype(std::declval<T>().size())>> : std::true_type {};

// Utilizzo
static_assert(HasSizeMember<std::vector<int>>::value, "vector ha un membro size()");
static_assert(!HasSizeMember<int>::value, "int non ha un membro size()");
```

## Tag Dispatching

Il tag dispatching è una tecnica correlata a SFINAE che utilizza tag di tipo per selezionare diverse implementazioni di funzioni.

```cpp
// Tag per dispatching
struct InputIteratorTag {};
struct RandomAccessIteratorTag : InputIteratorTag {};

// Funzione che implementa l'algoritmo per input iterator
template <typename Iterator>
void algoritmo_impl(Iterator first, Iterator last, InputIteratorTag) {
    std::cout << "Implementazione per input iterator" << std::endl;
    // Implementazione generica ma meno efficiente
}

// Funzione ottimizzata per random access iterator
template <typename Iterator>
void algoritmo_impl(Iterator first, Iterator last, RandomAccessIteratorTag) {
    std::cout << "Implementazione ottimizzata per random access iterator" << std::endl;
    // Implementazione più efficiente
}

// Funzione principale che determina il tag appropriato
template <typename Iterator>
void algoritmo(Iterator first, Iterator last) {
    // Determina il tag appropriato in base al tipo di iteratore
    using IteratorCategory = typename std::iterator_traits<Iterator>::iterator_category;
    algoritmo_impl(first, last, IteratorCategory());
}

// Utilizzo
std::vector<int> v = {1, 2, 3};
std::list<int> l = {1, 2, 3};

algoritmo(v.begin(), v.end());  // Usa l'implementazione per random access iterator
algoritmo(l.begin(), l.end());  // Usa l'implementazione per input iterator
```

## Concetti (C++20)

In C++20, i concetti forniscono un modo più elegante e leggibile per implementare vincoli sui template, sostituendo in molti casi l'uso di SFINAE.

```cpp
// Definizione di un concetto
template <typename T>
concept Sommabile = requires(T a, T b) {
    { a + b } -> std::convertible_to<T>;
};

// Funzione che accetta solo tipi sommabili
template <Sommabile T>
T somma(T a, T b) {
    return a + b;
}

// Utilizzo
int risultato1 = somma(5, 3);           // OK
double risultato2 = somma(3.14, 2.71);  // OK
// std::string risultato3 = somma(std::string("Hello"), 42);  // Errore: non soddisfa il concetto Sommabile
```

## Vantaggi di SFINAE

1. **Selezione di Overload**: Permette di selezionare automaticamente la funzione più appropriata in base ai tipi.
2. **Introspection dei Tipi**: Consente di verificare proprietà dei tipi a tempo di compilazione.
3. **Codice Generico Specializzato**: Facilita la scrittura di algoritmi generici con ottimizzazioni per casi specifici.
4. **Interfacce Flessibili**: Permette di creare interfacce che funzionano con diversi tipi senza richiedere un'interfaccia comune.

## Limitazioni di SFINAE

1. **Sintassi Complessa**: Le espressioni SFINAE possono diventare molto complesse e difficili da leggere.
2. **Messaggi di Errore**: Gli errori relativi a SFINAE possono essere criptici e difficili da interpretare.
3. **Impatto sulla Compilazione**: L'uso intensivo di SFINAE può aumentare i tempi di compilazione.
4. **Manutenibilità**: Il codice che fa uso intensivo di SFINAE può essere difficile da mantenere.

## Esercizi

1. Implementa una metafunzione `HasToString<T>` che verifichi se un tipo ha un metodo `toString()`.
2. Crea una funzione template `print(T value)` che utilizzi `std::to_string` per tipi numerici e il metodo `.c_str()` per tipi stringa.
3. Implementa una funzione `sort(Container& c)` che utilizzi SFINAE per selezionare l'algoritmo di ordinamento più efficiente in base al tipo di container.
4. Sviluppa una metafunzione `IsCallable<F, Args...>` che verifichi se una funzione può essere chiamata con determinati argomenti.

## Domande di Autovalutazione

1. Qual è la differenza tra SFINAE e la specializzazione esplicita dei template?
2. Come funziona `std::enable_if` e in quali scenari è utile?
3. Quali sono i vantaggi dei concetti C++20 rispetto alle tecniche SFINAE tradizionali?
4. Come si può utilizzare SFINAE per implementare il pattern di design Strategy a tempo di compilazione?
5. Quali sono le best practices per scrivere codice SFINAE leggibile e manutenibile?