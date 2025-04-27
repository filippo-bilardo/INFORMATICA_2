# Esercitazione 24: C++20 - Concetti e Vincoli

## Obiettivo

L'obiettivo di questa esercitazione è comprendere e utilizzare i concetti (concepts) e i vincoli (constraints) introdotti in C++20. Questi strumenti permettono di specificare requisiti sui parametri di template in modo chiaro e leggibile, migliorando la programmazione generica.

## Argomenti Trattati

- Introduzione ai concetti in C++20
- Definizione di concetti personalizzati
- Utilizzo dei concetti predefiniti nella libreria standard
- Vincoli sui parametri di template
- Miglioramento dei messaggi di errore con i concetti
- Overloading di funzioni basato sui concetti

## Esercizi

### Esercizio 1: Primi Passi con i Concetti

Crea un semplice concetto che verifica se un tipo supporta l'operazione di addizione e utilizzalo in una funzione template.

```cpp
#include <iostream>
#include <concepts>
#include <string>

// Definizione di un concetto personalizzato
template<typename T>
concept Addable = requires(T a, T b) {
    { a + b } -> std::convertible_to<T>;
};

// Funzione template che utilizza il concetto
template<Addable T>
T somma(T a, T b) {
    return a + b;
}

int main() {
    // Utilizzo con tipi che soddisfano il concetto
    std::cout << "Somma di interi: " << somma(5, 3) << std::endl;
    std::cout << "Somma di double: " << somma(2.5, 3.7) << std::endl;
    std::cout << "Concatenazione di stringhe: " << somma(std::string("Hello, "), std::string("World!")) << std::endl;
    
    // Il seguente codice genererebbe un errore di compilazione
    // perché std::complex non supporta l'operatore + in modo compatibile
    // somma(std::complex<double>(1.0, 2.0), std::complex<double>(3.0, 4.0));
    
    return 0;
}
```

### Esercizio 2: Utilizzo di Concetti Predefiniti

Utilizza i concetti predefiniti della libreria standard per creare funzioni template più robuste.

```cpp
#include <iostream>
#include <concepts>
#include <vector>
#include <list>

// Funzione che opera su contenitori con accesso random
template<std::random_access_iterator It>
void processoRapido(It begin, It end) {
    std::cout << "Utilizzo algoritmo ottimizzato per accesso random" << std::endl;
    // Implementazione che sfrutta l'accesso random
}

// Funzione che opera su iteratori generici
template<std::input_iterator It>
void processoGenerico(It begin, It end) {
    std::cout << "Utilizzo algoritmo generico per iteratori sequenziali" << std::endl;
    // Implementazione generica
}

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    std::list<int> l = {1, 2, 3, 4, 5};
    
    processoRapido(v.begin(), v.end());  // Usa la versione ottimizzata
    processoGenerico(l.begin(), l.end()); // Usa la versione generica
    
    // Anche questo usa la versione generica, poiché list non supporta accesso random
    processoGenerico(l.begin(), l.end());
    
    return 0;
}
```

### Esercizio 3: Concetti Compositi

Crea concetti più complessi combinando concetti esistenti e requisiti personalizzati.

```cpp
#include <iostream>
#include <concepts>
#include <type_traits>

// Concetto per tipi numerici
template<typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

// Concetto per tipi che supportano operazioni matematiche complete
template<typename T>
concept MathType = Numeric<T> && requires(T a, T b) {
    { a + b } -> std::convertible_to<T>;
    { a - b } -> std::convertible_to<T>;
    { a * b } -> std::convertible_to<T>;
    { a / b } -> std::convertible_to<T>;
};

// Funzione che calcola il quadrato di un numero
template<MathType T>
T quadrato(T x) {
    return x * x;
}

// Funzione che calcola la media di due numeri
template<MathType T>
T media(T a, T b) {
    return (a + b) / static_cast<T>(2);
}

int main() {
    std::cout << "Quadrato di 5: " << quadrato(5) << std::endl;
    std::cout << "Quadrato di 3.5: " << quadrato(3.5) << std::endl;
    
    std::cout << "Media di 10 e 20: " << media(10, 20) << std::endl;
    std::cout << "Media di 2.5 e 7.5: " << media(2.5, 7.5) << std::endl;
    
    return 0;
}
```

## Approfondimenti

- [Guida ai Concetti in C++20](teoria/concetti_cpp20.md)
- [Vincoli e Requisiti](teoria/vincoli_requisiti.md)
- [Concetti Predefiniti nella Libreria Standard](teoria/concetti_predefiniti.md)

## Risorse Aggiuntive

- [C++ Reference: Concepts](https://en.cppreference.com/w/cpp/language/constraints)
- [C++20 Concepts: The Definitive Guide](https://www.modernescpp.com/index.php/c-20-concepts-the-details)