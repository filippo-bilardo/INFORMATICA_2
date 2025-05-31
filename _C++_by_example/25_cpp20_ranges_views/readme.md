# Esercitazione 25: C++20 - Ranges e Views

## Obiettivo

L'obiettivo di questa esercitazione è esplorare la libreria Ranges introdotta in C++20, che fornisce strumenti potenti per lavorare con sequenze di elementi in modo più dichiarativo ed espressivo. Imparerai a utilizzare i ranges e le views per manipolare collezioni di dati in modo più leggibile e componibile.

## Argomenti Trattati

- Introduzione ai Ranges in C++20
- Concetti fondamentali: range, view, adaptor
- Views predefinite nella libreria standard
- Composizione di views
- Lazy evaluation e vantaggi prestazionali
- Algoritmi con ranges

## Esercizi

### Esercizio 1: Primi Passi con i Ranges

Utilizza i ranges per trasformare e filtrare una sequenza di numeri.

```cpp
#include <iostream>
#include <vector>
#include <ranges>
#include <algorithm>

int main() {
    std::vector<int> numeri = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // Filtra i numeri pari e moltiplica per 2
    auto risultato = numeri | std::views::filter([](int n) { return n % 2 == 0; })
                           | std::views::transform([](int n) { return n * 2; });
    
    std::cout << "Numeri pari moltiplicati per 2:" << std::endl;
    for (int n : risultato) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### Esercizio 2: Utilizzo di Views Predefinite

Esplora le views predefinite nella libreria standard.

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <ranges>

int main() {
    std::vector<std::string> parole = {"mela", "banana", "arancia", "kiwi", "fragola"};
    
    // Prendi le prime 3 parole
    std::cout << "Prime 3 parole:" << std::endl;
    for (const auto& parola : parole | std::views::take(3)) {
        std::cout << parola << " ";
    }
    std::cout << std::endl;
    
    // Salta le prime 2 parole
    std::cout << "Saltando le prime 2 parole:" << std::endl;
    for (const auto& parola : parole | std::views::drop(2)) {
        std::cout << parola << " ";
    }
    std::cout << std::endl;
    
    // Inverti l'ordine
    std::cout << "Parole in ordine inverso:" << std::endl;
    for (const auto& parola : parole | std::views::reverse) {
        std::cout << parola << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### Esercizio 3: Composizione di Views

Combina più views per creare trasformazioni complesse.

```cpp
#include <iostream>
#include <vector>
#include <ranges>
#include <algorithm>
#include <string>

int main() {
    std::vector<int> numeri = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15};
    
    // Composizione di più views:
    // 1. Filtra i numeri divisibili per 3
    // 2. Salta i primi 2 risultati
    // 3. Prendi i successivi 3 risultati
    // 4. Trasforma in stringhe
    auto risultato = numeri | std::views::filter([](int n) { return n % 3 == 0; })
                           | std::views::drop(1)
                           | std::views::take(3)
                           | std::views::transform([](int n) { return "Numero: " + std::to_string(n); });
    
    std::cout << "Risultato della composizione:" << std::endl;
    for (const auto& str : risultato) {
        std::cout << str << std::endl;
    }
    
    return 0;
}
```

### Esercizio 4: Algoritmi con Ranges

Utilizza gli algoritmi della libreria standard con i ranges.

```cpp
#include <iostream>
#include <vector>
#include <ranges>
#include <algorithm>

int main() {
    std::vector<int> numeri = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    
    // Ordina i numeri usando ranges
    std::ranges::sort(numeri);
    
    std::cout << "Numeri ordinati:" << std::endl;
    for (int n : numeri) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // Trova il primo numero maggiore di 5
    auto it = std::ranges::find_if(numeri, [](int n) { return n > 5; });
    if (it != numeri.end()) {
        std::cout << "Primo numero maggiore di 5: " << *it << std::endl;
    }
    
    // Conta i numeri pari
    int count = std::ranges::count_if(numeri, [](int n) { return n % 2 == 0; });
    std::cout << "Numero di elementi pari: " << count << std::endl;
    
    return 0;
}
```

## Approfondimenti

- [Introduzione ai Ranges](teoria/introduzione_ranges.md)
- [Views e Adaptors](teoria/views_adaptors.md)
- [Algoritmi con Ranges](teoria/algoritmi_ranges.md)

## Risorse Aggiuntive

- [C++ Reference: Ranges Library](https://en.cppreference.com/w/cpp/ranges)
- [C++20 Ranges: The Key Features](https://www.modernescpp.com/index.php/c-20-the-ranges-library)