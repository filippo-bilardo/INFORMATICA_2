# Introduzione ai Ranges in C++20

## Cos'è la Libreria Ranges

La libreria Ranges, introdotta ufficialmente in C++20, rappresenta un'evoluzione significativa nel modo in cui manipoliamo le sequenze di dati in C++. Essa fornisce un approccio più dichiarativo e componibile per lavorare con collezioni di elementi, superando alcune limitazioni degli algoritmi tradizionali della STL.

## Problemi Risolti dai Ranges

Prima di C++20, l'utilizzo degli algoritmi della STL presentava alcune sfide:

1. **Verbosità**: Era necessario passare esplicitamente gli iteratori `begin()` e `end()`.
2. **Composizione difficile**: Combinare più algoritmi richiedeva variabili temporanee o espressioni complesse.
3. **Valutazione immediata**: Gli algoritmi tradizionali eseguono immediatamente le operazioni, senza possibilità di lazy evaluation.

Esempio di codice pre-C++20:

```cpp
std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

// Filtrare e trasformare richiede passaggi intermedi
std::vector<int> temp;
std::copy_if(v.begin(), v.end(), std::back_inserter(temp), [](int n) { return n % 2 == 0; });

std::vector<int> risultato;
std::transform(temp.begin(), temp.end(), std::back_inserter(risultato), [](int n) { return n * 2; });

// Oppure soluzioni più complesse con algoritmi come std::transform_if (che non esiste nella STL standard)
```

## Concetti Fondamentali dei Ranges

### Range

Un range è semplicemente qualsiasi cosa che ha un inizio e una fine, ovvero qualsiasi oggetto per cui è possibile chiamare `begin()` e `end()`. Tutti i contenitori standard (come `vector`, `list`, `map`) sono ranges, così come gli array C-style e le stringhe.

### View

Una view è un range speciale con le seguenti caratteristiche:

1. **Lightweight**: Le operazioni di copia sono economiche (spesso O(1)).
2. **Non-owning**: Non possiede gli elementi a cui fa riferimento.
3. **Lazy evaluation**: Le operazioni vengono eseguite solo quando necessario.

Le views sono il cuore della libreria Ranges e permettono di comporre operazioni in modo efficiente.

### Range Adaptor

Un range adaptor è una funzione o un oggetto che trasforma un range in un altro range (tipicamente una view). Gli adaptors possono essere composti usando l'operatore pipe (`|`).

Esempi di adaptors predefiniti:
- `views::filter`: Filtra gli elementi in base a un predicato.
- `views::transform`: Trasforma gli elementi applicando una funzione.
- `views::take`: Prende i primi N elementi.
- `views::drop`: Salta i primi N elementi.

## Sintassi di Base

### Utilizzo di Base

```cpp
#include <ranges>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    
    // Itera direttamente sul range
    for (int n : v) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // Equivalente a:
    for (int n : std::ranges::ref_view(v)) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### Composizione con l'Operatore Pipe

```cpp
#include <ranges>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // Filtra i numeri pari e moltiplica per 2
    auto risultato = v | std::views::filter([](int n) { return n % 2 == 0; })
                       | std::views::transform([](int n) { return n * 2; });
    
    for (int n : risultato) {
        std::cout << n << " ";  // Output: 4 8 12 16 20
    }
    std::cout << std::endl;
    
    return 0;
}
```

## Vantaggi dei Ranges

### 1. Codice più Dichiarativo

I ranges permettono di esprimere le intenzioni in modo più chiaro e diretto:

```cpp
// Con ranges
auto risultato = numeri | std::views::filter(is_even) | std::views::transform(double_it);

// Senza ranges
std::vector<int> risultato;
for (int n : numeri) {
    if (is_even(n)) {
        risultato.push_back(double_it(n));
    }
}
```

### 2. Lazy Evaluation

Le operazioni vengono eseguite solo quando necessario, il che può portare a significativi miglioramenti delle prestazioni:

```cpp
// Questo non esegue alcuna operazione finché non si itera sul risultato
auto risultato = numeri | std::views::filter(is_even) | std::views::transform(double_it);

// Le operazioni vengono eseguite qui, una per una
for (int n : risultato) {
    std::cout << n << " ";
}
```

### 3. Composizione Semplice

Le operazioni possono essere facilmente composte senza variabili temporanee:

```cpp
auto risultato = numeri | std::views::filter(is_even)
                       | std::views::transform(double_it)
                       | std::views::take(5)
                       | std::views::reverse;
```

### 4. Riutilizzo delle Trasformazioni

Le trasformazioni possono essere definite una volta e riutilizzate:

```cpp
auto solo_pari = std::views::filter([](int n) { return n % 2 == 0; });
auto doppio = std::views::transform([](int n) { return n * 2; });

auto risultato1 = numeri1 | solo_pari | doppio;
auto risultato2 = numeri2 | solo_pari | doppio;
```

## Esempio Completo

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <ranges>
#include <algorithm>

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
    
    // Filtra le persone maggiorenni, ordina per età e estrai i nomi
    auto nomi_maggiorenni = persone 
        | std::views::filter([](const Persona& p) { return p.età >= 18; })
        | std::views::transform([](const Persona& p) { return p; })
        | std::ranges::to<std::vector>(); // Materializza il risultato per poterlo ordinare
    
    std::ranges::sort(nomi_maggiorenni, {}, &Persona::età);
    
    auto nomi = nomi_maggiorenni
        | std::views::transform([](const Persona& p) { return p.nome; });
    
    std::cout << "Nomi delle persone maggiorenni in ordine di età:" << std::endl;
    for (const auto& nome : nomi) {
        std::cout << nome << std::endl;
    }
    
    return 0;
}
```

## Conclusione

La libreria Ranges in C++20 rappresenta un passo avanti significativo nel modo in cui manipoliamo le sequenze di dati in C++. Essa fornisce un approccio più dichiarativo, componibile ed efficiente per lavorare con collezioni di elementi, rendendo il codice più leggibile e manutenibile.

Con l'adozione di C++20, i ranges diventeranno uno strumento fondamentale nel toolkit di ogni programmatore C++, specialmente per operazioni complesse su sequenze di dati.