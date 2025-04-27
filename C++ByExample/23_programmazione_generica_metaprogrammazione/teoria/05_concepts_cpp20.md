# Concepts in C++20

## Introduzione ai Concepts

I concepts sono una delle caratteristiche più significative introdotte in C++20. Rappresentano un'evoluzione della programmazione generica, permettendo di specificare vincoli sui parametri di template in modo chiaro, espressivo e verificabile dal compilatore.

## Motivazione e Vantaggi

Prima dei concepts, i vincoli sui template venivano implementati principalmente attraverso tecniche SFINAE o static_assert, che spesso portavano a codice complesso e messaggi di errore criptici. I concepts risolvono questi problemi offrendo:

1. **Vincoli Espliciti**: Dichiarazione chiara dei requisiti sui tipi.
2. **Messaggi di Errore Migliori**: Errori più comprensibili quando i vincoli non sono soddisfatti.
3. **Overloading Basato sui Vincoli**: Selezione delle funzioni in base ai vincoli soddisfatti.
4. **Documentazione Integrata**: I vincoli fungono da documentazione leggibile.

## Sintassi di Base

### Definizione di un Concept

```cpp
// Definizione di un concept che verifica se un tipo supporta l'operatore +
template <typename T>
concept Sommabile = requires(T a, T b) {
    { a + b } -> std::convertible_to<T>;
};
```

### Utilizzo in Funzioni Template

```cpp
// Funzione che accetta solo tipi che soddisfano il concept Sommabile
template <Sommabile T>
T somma(T a, T b) {
    return a + b;
}

// Utilizzo
int risultato1 = somma(5, 3);           // OK
double risultato2 = somma(3.14, 2.71);  // OK
// std::string s = somma("Hello", "World");  // Errore: std::string non soddisfa Sommabile
```

## Espressioni Requires

Le espressioni `requires` sono il cuore dei concepts e permettono di specificare vincoli dettagliati sui tipi.

### Sintassi delle Espressioni Requires

```cpp
template <typename T>
concept Iterabile = requires(T container) {
    // Requisito semplice: T deve avere begin() e end()
    { container.begin() } -> std::convertible_to<typename T::iterator>;
    { container.end() } -> std::convertible_to<typename T::iterator>;
    
    // Requisito di tipo: T deve definire un tipo value_type
    typename T::value_type;
    
    // Requisito composto: gli iteratori devono supportare l'incremento
    requires std::incrementable<typename T::iterator>;
};
```

### Tipi di Requisiti

1. **Requisiti Semplici**: Verificano se un'espressione è valida.
2. **Requisiti di Tipo**: Verificano se un tipo è definito.
3. **Requisiti Composti**: Verificano se un'espressione soddisfa un altro concept.
4. **Requisiti Nested**: Verificano proprietà più complesse usando `requires` annidati.

## Concepts Standard

C++20 include una ricca libreria di concepts predefiniti nella header `<concepts>`.

### Concepts di Base

```cpp
#include <concepts>

// Utilizzo di concepts standard
template <std::integral T>
void funzionePerInteri(T valore) {
    std::cout << "Valore intero: " << valore << std::endl;
}

template <std::floating_point T>
void funzionePerFloat(T valore) {
    std::cout << "Valore floating point: " << valore << std::endl;
}

// Utilizzo
funzionePerInteri(42);    // OK
// funzionePerInteri(3.14);  // Errore: double non è un tipo integrale
funzionePerFloat(3.14);   // OK
```

### Alcuni Concepts Standard Importanti

- **Core Language Concepts**: `same_as`, `derived_from`, `convertible_to`, `integral`, `floating_point`
- **Comparison Concepts**: `equality_comparable`, `totally_ordered`
- **Object Concepts**: `movable`, `copyable`, `semiregular`, `regular`
- **Callable Concepts**: `invocable`, `predicate`, `relation`, `equivalence_relation`

## Vincoli Congiunti e Disgiunti

I concepts possono essere combinati usando operatori logici per creare vincoli più complessi.

```cpp
template <typename T>
concept Numerico = std::integral<T> || std::floating_point<T>;

template <typename T>
concept NumericoNonChar = Numerico<T> && !std::same_as<T, char>;

// Funzione che accetta solo tipi numerici non char
template <NumericoNonChar T>
void elabora(T valore) {
    std::cout << "Elaborazione: " << valore << std::endl;
}

// Utilizzo
elabora(42);      // OK
elabora(3.14);    // OK
// elabora('a');     // Errore: char non soddisfa NumericoNonChar
```

## Vincoli sui Template di Classe

I concepts possono essere utilizzati anche per vincolare i parametri di template delle classi.

```cpp
template <std::copyable T>
class Contenitore {
private:
    T valore;

public:
    Contenitore(const T& val) : valore(val) {}
    
    T get() const { return valore; }
    void set(const T& val) { valore = val; }
};

// Utilizzo
Contenitore<int> c1(42);                // OK
Contenitore<std::string> c2("Hello");    // OK
// Contenitore<std::unique_ptr<int>> c3;  // Errore: unique_ptr non è copyable
```

## Concetti Auto-Definiti

È possibile definire concepts che si riferiscono a se stessi, utile per vincoli ricorsivi.

```cpp
template <typename T>
concept Incrementabile = requires(T x) {
    { ++x } -> std::same_as<T&>;
    { x++ } -> std::same_as<T>;
};
```

## Vantaggi dei Concepts

1. **Codice Più Chiaro**: I vincoli sono espliciti e leggibili.
2. **Migliore Diagnostica**: Messaggi di errore più precisi e comprensibili.
3. **Documentazione Integrata**: I concepts documentano i requisiti dei template.
4. **Overloading Migliorato**: Selezione più precisa delle funzioni in base ai vincoli.
5. **Manutenibilità**: Codice più facile da mantenere e modificare.

## Limitazioni dei Concepts

1. **Disponibilità**: Richiedono un compilatore che supporti C++20.
2. **Curva di Apprendimento**: Richiedono una comprensione approfondita del sistema di tipi di C++.
3. **Granularità**: A volte può essere difficile esprimere vincoli molto specifici.
4. **Overhead di Compilazione**: L'uso intensivo di concepts può aumentare i tempi di compilazione.

## Confronto con SFINAE

I concepts offrono diversi vantaggi rispetto alle tecniche SFINAE tradizionali:

1. **Sintassi Più Chiara**: I concepts sono più leggibili e meno verbosi.
2. **Messaggi di Errore**: Generano messaggi di errore più comprensibili.
3. **Riutilizzabilità**: I concepts possono essere facilmente riutilizzati in più contesti.
4. **Manutenibilità**: Il codice basato su concepts è più facile da mantenere.

## Esercizi

1. Implementa un concept `Contenitore` che verifichi se un tipo ha i metodi `begin()`, `end()` e `size()`.
2. Crea una funzione template `ordina` che utilizzi concepts per selezionare l'algoritmo di ordinamento più efficiente in base al tipo di container.
3. Implementa un concept `Serializzabile` che verifichi se un tipo può essere serializzato in JSON.
4. Sviluppa una classe template `Grafo<N>` dove `N` è vincolato a essere un tipo che rappresenta un nodo con determinate proprietà.

## Domande di Autovalutazione

1. Qual è la differenza principale tra concepts e tecniche SFINAE tradizionali?
2. Come si possono combinare più concepts per creare vincoli complessi?
3. Quali sono i vantaggi dell'utilizzo dei concepts standard rispetto alla definizione di concepts personalizzati?
4. Come influiscono i concepts sulla leggibilità e manutenibilità del codice?
5. In quali scenari i concepts potrebbero non essere la soluzione migliore rispetto ad altre tecniche di metaprogrammazione?