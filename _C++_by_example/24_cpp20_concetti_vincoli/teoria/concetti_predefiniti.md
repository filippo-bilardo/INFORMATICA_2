# Concetti Predefiniti nella Libreria Standard C++20

## Introduzione

C++20 introduce nella libreria standard una serie di concetti predefiniti che possono essere utilizzati direttamente senza doverli implementare manualmente. Questi concetti coprono molti casi d'uso comuni e forniscono un vocabolario standardizzato per esprimere vincoli sui tipi.

## Concetti per Tipi Fondamentali

### Concetti per Tipi Numerici

```cpp
#include <concepts>
```

- `std::integral<T>`: Verifica se `T` è un tipo intero (come `int`, `long`, `unsigned`, ecc.)
- `std::signed_integral<T>`: Verifica se `T` è un tipo intero con segno
- `std::unsigned_integral<T>`: Verifica se `T` è un tipo intero senza segno
- `std::floating_point<T>`: Verifica se `T` è un tipo a virgola mobile (come `float`, `double`)

Esempio:

```cpp
template<std::integral T>
void funzionePerInteri(T valore) {
    // Implementazione specifica per interi
}

template<std::floating_point T>
void funzionePerFloatingPoint(T valore) {
    // Implementazione specifica per floating point
}
```

## Concetti per Relazioni tra Tipi

- `std::same_as<T, U>`: Verifica se `T` e `U` sono lo stesso tipo
- `std::derived_from<T, U>`: Verifica se `T` è derivato da `U`
- `std::convertible_to<From, To>`: Verifica se `From` è convertibile a `To`
- `std::common_reference_with<T, U>`: Verifica se `T` e `U` hanno un riferimento comune
- `std::common_with<T, U>`: Verifica se `T` e `U` hanno un tipo comune
- `std::assignable_from<T, U>`: Verifica se un valore di tipo `U` può essere assegnato a un lvalue di tipo `T`

Esempio:

```cpp
template<typename Derived, typename Base>
    requires std::derived_from<Derived, Base>
void processaOggettoDerivatoDa(Derived& obj) {
    // Implementazione che sfrutta la relazione di ereditarietà
}
```

## Concetti per Confronti

- `std::equality_comparable<T>`: Verifica se `T` supporta l'operatore di uguaglianza (`==`)
- `std::equality_comparable_with<T, U>`: Verifica se `T` e `U` possono essere confrontati con `==`
- `std::totally_ordered<T>`: Verifica se `T` supporta tutti gli operatori di confronto (`<`, `<=`, `>`, `>=`, `==`, `!=`)
- `std::totally_ordered_with<T, U>`: Verifica se `T` e `U` possono essere confrontati con tutti gli operatori di confronto

Esempio:

```cpp
template<std::totally_ordered T>
void ordina(std::vector<T>& v) {
    std::sort(v.begin(), v.end());
}
```

## Concetti per Oggetti

- `std::movable<T>`: Verifica se `T` può essere spostato (move)
- `std::copyable<T>`: Verifica se `T` può essere copiato
- `std::semiregular<T>`: Verifica se `T` è default-constructible, copyable, movable e destructible
- `std::regular<T>`: Verifica se `T` è semiregular e equality_comparable

Esempio:

```cpp
template<std::copyable T>
void duplica(const T& originale, std::vector<T>& destinazione) {
    destinazione.push_back(originale);
}
```

## Concetti per Funzioni e Invocabili

- `std::invocable<F, Args...>`: Verifica se `F` può essere invocato con gli argomenti `Args...`
- `std::regular_invocable<F, Args...>`: Come `invocable`, ma con requisiti aggiuntivi
- `std::predicate<F, Args...>`: Verifica se `F` è un predicato invocabile con `Args...`

Esempio:

```cpp
template<typename F, typename... Args>
    requires std::invocable<F, Args...>
auto invocaFunzione(F&& f, Args&&... args) {
    return std::forward<F>(f)(std::forward<Args>(args)...);
}
```

## Concetti per Iteratori

C++20 definisce una gerarchia di concetti per gli iteratori, che riflette la gerarchia tradizionale degli iteratori in C++:

- `std::input_iterator<I>`: Iteratore che supporta la lettura in avanti
- `std::output_iterator<I, T>`: Iteratore che supporta la scrittura
- `std::forward_iterator<I>`: Iteratore che supporta più passaggi in avanti
- `std::bidirectional_iterator<I>`: Iteratore che supporta il movimento in entrambe le direzioni
- `std::random_access_iterator<I>`: Iteratore che supporta l'accesso casuale
- `std::contiguous_iterator<I>`: Iteratore che garantisce contiguità in memoria

Esempio:

```cpp
// Algoritmo ottimizzato per iteratori ad accesso casuale
template<std::random_access_iterator It>
void algoritmoRapido(It begin, It end) {
    // Implementazione che sfrutta l'accesso casuale
}

// Versione generica per qualsiasi iteratore in avanti
template<std::forward_iterator It>
void algoritmoGenerico(It begin, It end) {
    // Implementazione generica
}
```

## Concetti per Range

C++20 introduce anche concetti per i range, che sono coppie di iteratori o oggetti che forniscono metodi `begin()` e `end()`:

- `std::range<R>`: Verifica se `R` è un range
- `std::input_range<R>`: Range con iteratori di input
- `std::output_range<R, T>`: Range con iteratori di output
- `std::forward_range<R>`: Range con iteratori in avanti
- `std::bidirectional_range<R>`: Range con iteratori bidirezionali
- `std::random_access_range<R>`: Range con iteratori ad accesso casuale
- `std::contiguous_range<R>`: Range con iteratori contigui

Esempio:

```cpp
template<std::random_access_range R>
void processoRapido(R&& r) {
    // Implementazione ottimizzata per range ad accesso casuale
}
```

## Utilizzo Combinato di Concetti

I concetti predefiniti possono essere combinati per creare vincoli più specifici:

```cpp
template<typename T>
concept NumericoOrdinabile = std::integral<T> || (std::floating_point<T> && std::totally_ordered<T>);

template<NumericoOrdinabile T>
void ordinaEStampa(std::vector<T>& v) {
    std::sort(v.begin(), v.end());
    for (const auto& elem : v) {
        std::cout << elem << " ";
    }
    std::cout << std::endl;
}
```

## Esempio Completo

```cpp
#include <iostream>
#include <concepts>
#include <vector>
#include <list>
#include <string>

// Funzione che utilizza concetti per iteratori
template<std::random_access_iterator It>
void stampaRapida(It begin, It end) {
    std::cout << "Utilizzo algoritmo ottimizzato per accesso random" << std::endl;
    for (auto it = begin; it != end; ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
}

template<std::input_iterator It>
void stampaGenerica(It begin, It end) {
    std::cout << "Utilizzo algoritmo generico per iteratori" << std::endl;
    for (auto it = begin; it != end; ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
}

// Funzione che utilizza concetti per tipi
template<std::integral T>
void processoIntero(T valore) {
    std::cout << "Processo intero: " << valore << std::endl;
}

template<std::floating_point T>
void processoFloat(T valore) {
    std::cout << "Processo floating point: " << valore << std::endl;
}

int main() {
    // Test con diversi tipi di contenitori
    std::vector<int> v = {1, 2, 3, 4, 5};
    std::list<int> l = {1, 2, 3, 4, 5};
    
    stampaRapida(v.begin(), v.end());  // Usa la versione ottimizzata
    stampaGenerica(l.begin(), l.end()); // Usa la versione generica
    
    // Test con diversi tipi numerici
    processoIntero(42);
    processoFloat(3.14);
    
    return 0;
}
```

## Conclusione

I concetti predefiniti nella libreria standard C++20 forniscono un vocabolario ricco e standardizzato per esprimere vincoli sui tipi. Essi permettono di scrivere codice generico più chiaro, più robusto e con una migliore diagnostica degli errori. Con l'adozione di C++20, questi concetti diventeranno uno strumento fondamentale per la programmazione generica in C++.