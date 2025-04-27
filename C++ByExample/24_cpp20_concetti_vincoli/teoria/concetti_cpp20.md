# Concetti in C++20

## Introduzione

I concetti (concepts) rappresentano una delle innovazioni più significative introdotte in C++20. Essi forniscono un modo per specificare vincoli sui parametri di template, migliorando notevolmente la leggibilità, la manutenibilità e la diagnostica degli errori nella programmazione generica.

Prima di C++20, i vincoli sui template erano impliciti: se un tipo non soddisfaceva i requisiti necessari, gli errori di compilazione potevano essere criptici e difficili da interpretare. Con i concetti, questi vincoli diventano espliciti e parte dell'interfaccia del codice.

## Sintassi di Base

Un concetto è essenzialmente un predicato valutato in fase di compilazione che determina se un tipo soddisfa determinati requisiti. La sintassi di base è la seguente:

```cpp
template<typename T>
concept NomeConcetto = /* espressione booleana o clausola requires */;
```

Esempio di un semplice concetto:

```cpp
template<typename T>
concept Integral = std::is_integral_v<T>;
```

## Clausola `requires`

La clausola `requires` è un potente strumento per definire requisiti più complessi:

```cpp
template<typename T>
concept Addable = requires(T a, T b) {
    { a + b } -> std::convertible_to<T>;
};
```

Questa clausola verifica che l'espressione `a + b` sia valida e che il risultato sia convertibile al tipo `T`.

## Utilizzo dei Concetti

I concetti possono essere utilizzati in diversi modi:

### 1. Come vincoli sui parametri di template

```cpp
template<Addable T>
T somma(T a, T b) {
    return a + b;
}
```

### 2. Con la sintassi abbreviata

```cpp
Addable auto somma(Addable auto a, Addable auto b) {
    return a + b;
}
```

### 3. In dichiarazioni condizionali

```cpp
template<typename T>
    requires Addable<T>
T somma(T a, T b) {
    return a + b;
}
```

## Vantaggi dei Concetti

### Miglioramento dei Messaggi di Errore

Uno dei principali vantaggi dei concetti è il miglioramento significativo dei messaggi di errore. Quando un tipo non soddisfa un concetto, il compilatore può fornire messaggi di errore più chiari e specifici.

### Overloading Basato sui Concetti

I concetti permettono di definire funzioni sovraccaricate basate sui requisiti dei tipi:

```cpp
// Versione per tipi integrali
template<std::integral T>
void processa(T value) {
    // Implementazione specifica per interi
}

// Versione per tipi a virgola mobile
template<std::floating_point T>
void processa(T value) {
    // Implementazione specifica per floating point
}
```

### Documentazione Implicita

I concetti servono anche come documentazione implicita, rendendo chiaro quali requisiti deve soddisfare un tipo per essere utilizzato con una determinata funzione o classe template.

## Concetti Predefiniti

C++20 include una serie di concetti predefiniti nella libreria standard, tra cui:

- `std::integral` e `std::floating_point` per tipi numerici
- `std::same_as` per verificare l'uguaglianza di tipi
- `std::derived_from` per verificare relazioni di ereditarietà
- `std::convertible_to` per verificare la convertibilità tra tipi
- Vari concetti per iteratori: `std::input_iterator`, `std::forward_iterator`, `std::bidirectional_iterator`, `std::random_access_iterator`

## Esempio Completo

```cpp
#include <iostream>
#include <concepts>
#include <vector>
#include <list>

// Definizione di un concetto personalizzato
template<typename T>
concept Sortable = requires(T& container) {
    // Richiede che il contenitore supporti begin() e end()
    { container.begin() } -> std::same_as<typename T::iterator>;
    { container.end() } -> std::same_as<typename T::iterator>;
    // Richiede che gli elementi siano confrontabili
    requires std::totally_ordered<typename T::value_type>;
};

// Funzione che utilizza il concetto
template<Sortable Container>
void ordina(Container& c) {
    std::sort(c.begin(), c.end());
}

int main() {
    std::vector<int> v = {5, 3, 1, 4, 2};
    ordina(v);  // OK, vector<int> soddisfa il concetto Sortable
    
    // std::list<int> l = {5, 3, 1, 4, 2};
    // ordina(l);  // Errore: list non supporta std::sort
    
    return 0;
}
```

## Conclusione

I concetti rappresentano un'evoluzione significativa nella programmazione generica in C++. Essi rendono il codice template più leggibile, più manutenibile e forniscono una migliore diagnostica degli errori. Con l'adozione di C++20, i concetti diventeranno uno strumento fondamentale nel toolkit di ogni programmatore C++.