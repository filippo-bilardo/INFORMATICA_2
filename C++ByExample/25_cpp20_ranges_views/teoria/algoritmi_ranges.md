# Algoritmi con Ranges in C++20

## Introduzione

C++20 introduce una nuova versione degli algoritmi della libreria standard che lavorano direttamente con i ranges, eliminando la necessità di passare esplicitamente gli iteratori `begin()` e `end()`. Questi algoritmi si trovano nel namespace `std::ranges` e offrono un'interfaccia più moderna e intuitiva rispetto alle loro controparti tradizionali.

## Vantaggi degli Algoritmi con Ranges

1. **Sintassi più concisa**: Non è necessario specificare esplicitamente gli iteratori `begin()` e `end()`.
2. **Maggiore sicurezza**: Controlli aggiuntivi a compile-time grazie ai concetti.
3. **Migliore diagnostica degli errori**: Messaggi di errore più chiari quando i tipi non soddisfano i requisiti.
4. **Proiezioni**: Possibilità di specificare una funzione di proiezione per trasformare gli elementi prima di applicare l'algoritmo.

## Algoritmi Principali

### Algoritmi Non-Modificanti

Questi algoritmi non modificano gli elementi del range su cui operano:

```cpp
#include <iostream>
#include <vector>
#include <ranges>
#include <algorithm>

int main() {
    std::vector<int> v = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    
    // Trova il primo elemento maggiore di 5
    auto it = std::ranges::find_if(v, [](int n) { return n > 5; });
    if (it != v.end()) {
        std::cout << "Primo elemento maggiore di 5: " << *it << std::endl;
    }
    
    // Conta gli elementi pari
    int count = std::ranges::count_if(v, [](int n) { return n % 2 == 0; });
    std::cout << "Numero di elementi pari: " << count << std::endl;
    
    // Verifica se tutti gli elementi sono positivi
    bool all_positive = std::ranges::all_of(v, [](int n) { return n > 0; });
    std::cout << "Tutti positivi: " << (all_positive ? "Sì" : "No") << std::endl;
    
    // Verifica se almeno un elemento è maggiore di 8
    bool any_greater_than_8 = std::ranges::any_of(v, [](int n) { return n > 8; });
    std::cout << "Almeno uno maggiore di 8: " << (any_greater_than_8 ? "Sì" : "No") << std::endl;
    
    return 0;
}
```

### Algoritmi Modificanti

Questi algoritmi modificano gli elementi del range su cui operano:

```cpp
#include <iostream>
#include <vector>
#include <ranges>
#include <algorithm>

int main() {
    std::vector<int> v = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    
    // Ordina il vettore
    std::ranges::sort(v);
    std::cout << "Vettore ordinato:";
    for (int n : v) {
        std::cout << " " << n;
    }
    std::cout << std::endl;
    
    // Inverte il vettore
    std::ranges::reverse(v);
    std::cout << "Vettore invertito:";
    for (int n : v) {
        std::cout << " " << n;
    }
    std::cout << std::endl;
    
    // Rimuove i duplicati (richiede che il range sia ordinato)
    std::ranges::sort(v);
    auto [new_end, _] = std::ranges::unique(v);
    v.erase(new_end, v.end());
    std::cout << "Vettore senza duplicati:";
    for (int n : v) {
        std::cout << " " << n;
    }
    std::cout << std::endl;
    
    return 0;
}
```

### Algoritmi Numerici

Questi algoritmi eseguono operazioni numeriche sugli elementi del range:

```cpp
#include <iostream>
#include <vector>
#include <ranges>
#include <numeric>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    
    // Calcola la somma degli elementi
    int sum = std::ranges::fold_left(v, 0, std::plus<>());
    std::cout << "Somma: " << sum << std::endl;
    
    // Calcola il prodotto degli elementi
    int product = std::ranges::fold_left(v, 1, std::multiplies<>());
    std::cout << "Prodotto: " << product << std::endl;
    
    // Calcola la somma dei quadrati
    int sum_of_squares = std::ranges::fold_left(v, 0, [](int acc, int x) { return acc + x * x; });
    std::cout << "Somma dei quadrati: " << sum_of_squares << std::endl;
    
    return 0;
}
```

## Proiezioni

Una delle caratteristiche più potenti degli algoritmi con ranges è la possibilità di specificare una funzione di proiezione. Questa funzione viene applicata a ciascun elemento prima che l'algoritmo operi su di esso, permettendo di lavorare su una "vista" trasformata degli elementi senza modificarli.

```cpp
#include <iostream>
#include <vector>
#include <ranges>
#include <algorithm>
#include <string>

struct Persona {
    std::string nome;
    int età;
};

int main() {
    std::vector<Persona> persone = {
        {"Mario", 25},
        {"Luigi", 17},
        {"Peach", 22},
        {"Bowser", 40},
        {"Toad", 16}
    };
    
    // Ordina le persone per età (usando una proiezione)
    std::ranges::sort(persone, {}, &Persona::età);
    
    std::cout << "Persone ordinate per età:" << std::endl;
    for (const auto& p : persone) {
        std::cout << p.nome << ": " << p.età << std::endl;
    }
    
    // Trova la persona più giovane (usando una proiezione)
    auto youngest = std::ranges::min_element(persone, {}, &Persona::età);
    if (youngest != persone.end()) {
        std::cout << "\nPersona più giovane: " << youngest->nome << " (" << youngest->età << " anni)" << std::endl;
    }
    
    // Trova la persona più anziana (usando una proiezione)
    auto oldest = std::ranges::max_element(persone, {}, &Persona::età);
    if (oldest != persone.end()) {
        std::cout << "Persona più anziana: " << oldest->nome << " (" << oldest->età << " anni)" << std::endl;
    }
    
    return 0;
}
```

## Algoritmi con Ranges e Views

Gli algoritmi con ranges possono essere combinati con le views per creare pipeline di elaborazione potenti e espressive:

```cpp
#include <iostream>
#include <vector>
#include <ranges>
#include <algorithm>
#include <string>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // Crea una view che filtra i numeri pari e li moltiplica per 2
    auto view = v | std::views::filter([](int n) { return n % 2 == 0; })
                 | std::views::transform([](int n) { return n * 2; });
    
    // Calcola la somma degli elementi della view
    int sum = std::ranges::fold_left(view, 0, std::plus<>());
    std::cout << "Somma dei numeri pari moltiplicati per 2: " << sum << std::endl;
    
    // Trova il massimo elemento nella view
    auto max = std::ranges::max_element(view);
    if (max != view.end()) {
        std::cout << "Massimo elemento: " << *max << std::endl;
    }
    
    return 0;
}
```

## Confronto con gli Algoritmi Tradizionali

Ecco un confronto tra gli algoritmi tradizionali e gli algoritmi con ranges:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <ranges>

int main() {
    std::vector<int> v1 = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    std::vector<int> v2 = v1;  // Copia per il confronto
    
    // Algoritmo tradizionale
    std::sort(v1.begin(), v1.end());
    auto it = std::find_if(v1.begin(), v1.end(), [](int n) { return n > 5; });
    if (it != v1.end()) {
        std::cout << "Tradizionale - Primo elemento > 5: " << *it << std::endl;
    }
    
    // Algoritmo con ranges
    std::ranges::sort(v2);
    auto it2 = std::ranges::find_if(v2, [](int n) { return n > 5; });
    if (it2 != v2.end()) {
        std::cout << "Ranges - Primo elemento > 5: " << *it2 << std::endl;
    }
    
    return 0;
}
```

## Esempio Completo: Elaborazione di Dati Complessi

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <ranges>
#include <algorithm>

struct Studente {
    std::string nome;
    std::vector<int> voti;
};

// Funzione per calcolare la media dei voti
double media_voti(const std::vector<int>& voti) {
    if (voti.empty()) return 0.0;
    return static_cast<double>(std::ranges::fold_left(voti, 0, std::plus<>())) / voti.size();
}

int main() {
    std::vector<Studente> studenti = {
        {"Mario", {8, 7, 9, 6, 8}},
        {"Luigi", {6, 5, 7, 6, 6}},
        {"Peach", {9, 9, 10, 8, 9}},
        {"Bowser", {5, 4, 6, 5, 5}},
        {"Toad", {7, 8, 7, 8, 7}}
    };
    
    // Calcola la media per ogni studente
    std::vector<std::pair<std::string, double>> medie;
    for (const auto& s : studenti) {
        medie.emplace_back(s.nome, media_voti(s.voti));
    }
    
    // Ordina gli studenti per media (decrescente)
    std::ranges::sort(medie, std::ranges::greater{}, &std::pair<std::string, double>::second);
    
    // Stampa la classifica
    std::cout << "Classifica studenti per media voti:" << std::endl;
    for (const auto& [nome, media] : medie) {
        std::cout << nome << ": " << media << std::endl;
    }
    
    // Trova lo studente con la media più alta
    auto top_student = std::ranges::max_element(medie, {}, &std::pair<std::string, double>::second);
    if (top_student != medie.end()) {
        std::cout << "\nStudente con la media più alta: " << top_student->first 
                  << " (" << top_student->second << ")" << std::endl;
    }
    
    // Trova gli studenti con media superiore a 7
    std::cout << "\nStudenti con media superiore a 7:" << std::endl;
    auto good_students = medie | std::views::filter([](const auto& p) { return p.second > 7.0; });
    for (const auto& [nome, media] : good_students) {
        std::cout << nome << ": " << media << std::endl;
    }
    
    return 0;
}
```

## Conclusione

Gli algoritmi con ranges in C++20 rappresentano un'evoluzione significativa rispetto agli algoritmi tradizionali della STL. Essi offrono un'interfaccia più moderna, intuitiva e sicura, con caratteristiche potenti come le proiezioni e una migliore integrazione con le views.

Con l'adozione di C++20, questi algoritmi diventeranno sempre più importanti nel toolkit di ogni programmatore C++, specialmente per operazioni complesse su collezioni di dati. La combinazione di algoritmi con ranges e views permette di creare pipeline di elaborazione potenti e espressive, migliorando significativamente la leggibilità e la manutenibilità del codice.