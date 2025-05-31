# Views e Adaptors in C++20

## Introduzione alle Views

Le views sono uno dei concetti fondamentali della libreria Ranges in C++20. Una view è un tipo speciale di range che presenta le seguenti caratteristiche:

1. **Lightweight (leggera)**: Le operazioni di copia sono economiche, tipicamente O(1).
2. **Non-owning (non proprietaria)**: Non possiede gli elementi a cui fa riferimento.
3. **Lazy evaluation (valutazione pigra)**: Le operazioni vengono eseguite solo quando necessario.

Queste caratteristiche rendono le views particolarmente adatte per comporre operazioni su sequenze di dati senza creare copie intermedie.

## Views Predefinite nella Libreria Standard

C++20 include numerose views predefinite nel namespace `std::views`. Ecco le più comuni:

### Views di Base

- `std::views::all`: Crea una view che rappresenta l'intero range.
- `std::views::empty`: Crea una view vuota.

```cpp
std::vector<int> v = {1, 2, 3, 4, 5};
auto view = std::views::all(v);  // View sull'intero vettore
```

### Views di Trasformazione

- `std::views::transform`: Applica una funzione a ciascun elemento.
- `std::views::filter`: Seleziona solo gli elementi che soddisfano un predicato.

```cpp
std::vector<int> v = {1, 2, 3, 4, 5};

// Moltiplica ogni elemento per 2
auto doubled = v | std::views::transform([](int n) { return n * 2; });

// Seleziona solo i numeri pari
auto even = v | std::views::filter([](int n) { return n % 2 == 0; });
```

### Views di Selezione

- `std::views::take`: Prende i primi N elementi.
- `std::views::take_while`: Prende elementi finché un predicato è vero.
- `std::views::drop`: Salta i primi N elementi.
- `std::views::drop_while`: Salta elementi finché un predicato è vero.

```cpp
std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

// Prende i primi 3 elementi
auto first_three = v | std::views::take(3);  // {1, 2, 3}

// Salta i primi 7 elementi
auto last_three = v | std::views::drop(7);  // {8, 9, 10}

// Prende elementi finché sono minori di 5
auto less_than_five = v | std::views::take_while([](int n) { return n < 5; });  // {1, 2, 3, 4}

// Salta elementi finché sono minori di 5
auto from_five = v | std::views::drop_while([](int n) { return n < 5; });  // {5, 6, 7, 8, 9, 10}
```

### Views di Riordinamento

- `std::views::reverse`: Inverte l'ordine degli elementi.

```cpp
std::vector<int> v = {1, 2, 3, 4, 5};

// Inverte l'ordine degli elementi
auto reversed = v | std::views::reverse;  // {5, 4, 3, 2, 1}
```

### Views di Elementi

- `std::views::keys`: Estrae le chiavi da un range di coppie.
- `std::views::values`: Estrae i valori da un range di coppie.

```cpp
std::map<std::string, int> m = {{"", 1}, {"due", 2}, {"tre", 3}};

// Estrae le chiavi
auto keys = m | std::views::keys;  // {"", "due", "tre"}

// Estrae i valori
auto values = m | std::views::values;  // {1, 2, 3}
```

### Views di Generazione

- `std::views::iota`: Genera una sequenza di valori incrementali.

```cpp
// Genera i numeri da 1 a 10
auto numbers = std::views::iota(1, 11);  // {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

// Genera una sequenza infinita a partire da 1
auto infinite = std::views::iota(1);  // {1, 2, 3, ...}
```

## Range Adaptors

I range adaptors sono funzioni o oggetti che trasformano un range in un altro range (tipicamente una view). La caratteristica distintiva degli adaptors è che possono essere composti utilizzando l'operatore pipe (`|`).

### Composizione di Adaptors

```cpp
std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

// Composizione di più adaptors:
// 1. Filtra i numeri pari
// 2. Moltiplica per 2
// 3. Prende i primi 3 risultati
auto result = v | std::views::filter([](int n) { return n % 2 == 0; })
               | std::views::transform([](int n) { return n * 2; })
               | std::views::take(3);

// Risultato: {4, 8, 12}
```

### Creazione di Adaptors Personalizzati

È possibile creare adaptors personalizzati per operazioni comuni:

```cpp
// Adaptor personalizzato per filtrare i numeri pari
auto even = std::views::filter([](int n) { return n % 2 == 0; });

// Adaptor personalizzato per moltiplicare per 2
auto doubled = std::views::transform([](int n) { return n * 2; });

// Utilizzo degli adaptors personalizzati
std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
auto result = v | even | doubled | std::views::take(3);
```

## Lazy Evaluation

Una delle caratteristiche più potenti delle views è la lazy evaluation (valutazione pigra). Le operazioni specificate non vengono eseguite immediatamente, ma solo quando si accede effettivamente agli elementi.

```cpp
std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

// Definisce una trasformazione complessa
auto complex = v | std::views::filter([](int n) { 
                    std::cout << "Filtering " << n << std::endl;
                    return n % 2 == 0;
                })
                | std::views::transform([](int n) {
                    std::cout << "Transforming " << n << std::endl;
                    return n * 2;
                });

// Nessuna operazione viene eseguita finora
std::cout << "Prima dell'iterazione" << std::endl;

// Le operazioni vengono eseguite solo quando si accede agli elementi
std::cout << "Primo elemento: " << *complex.begin() << std::endl;
```

Questo comportamento può portare a significativi miglioramenti delle prestazioni, specialmente quando si lavora con grandi collezioni di dati o quando non è necessario elaborare tutti gli elementi.

## Materializzazione dei Risultati

In alcuni casi, potrebbe essere necessario "materializzare" i risultati di una view, ovvero creare una copia concreta degli elementi. Questo può essere fatto utilizzando algoritmi come `std::ranges::copy` o convertendo la view in un contenitore:

```cpp
std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

// Definisce una view
auto view = v | std::views::filter([](int n) { return n % 2 == 0; })
             | std::views::transform([](int n) { return n * 2; });

// Materializza i risultati in un nuovo vettore
std::vector<int> result;
std::ranges::copy(view, std::back_inserter(result));

// Oppure, con C++23:
// auto result = view | std::ranges::to<std::vector>();
```

## Esempio Completo

```cpp
#include <iostream>
#include <vector>
#include <ranges>
#include <algorithm>
#include <string>

struct Persona {
    std::string nome;
    int età;
    std::string città;
};

int main() {
    std::vector<Persona> persone = {
        {"Mario", 25, "Roma"},
        {"Luigi", 17, "Milano"},
        {"Peach", 22, "Roma"},
        {"Bowser", 40, "Napoli"},
        {"Toad", 16, "Milano"},
        {"Yoshi", 20, "Firenze"}
    };
    
    // Crea adaptors personalizzati
    auto maggiorenni = std::views::filter([](const Persona& p) { return p.età >= 18; });
    auto nomi = std::views::transform([](const Persona& p) { return p.nome; });
    auto di_roma = std::views::filter([](const Persona& p) { return p.città == "Roma"; });
    
    // Utilizza gli adaptors in diverse combinazioni
    
    // 1. Nomi di tutte le persone maggiorenni
    std::cout << "Persone maggiorenni:" << std::endl;
    for (const auto& nome : persone | maggiorenni | nomi) {
        std::cout << nome << std::endl;
    }
    
    // 2. Nomi di tutte le persone di Roma
    std::cout << "\nPersone di Roma:" << std::endl;
    for (const auto& nome : persone | di_roma | nomi) {
        std::cout << nome << std::endl;
    }
    
    // 3. Nomi di tutte le persone maggiorenni di Roma
    std::cout << "\nPersone maggiorenni di Roma:" << std::endl;
    for (const auto& nome : persone | maggiorenni | di_roma | nomi) {
        std::cout << nome << std::endl;
    }
    
    return 0;
}
```

## Conclusione

Le views e gli adaptors rappresentano uno degli aspetti più potenti e innovativi della libreria Ranges in C++20. Essi permettono di esprimere trasformazioni complesse su sequenze di dati in modo dichiarativo, componibile ed efficiente, migliorando significativamente la leggibilità e la manutenibilità del codice.

Con l'adozione di C++20, questi strumenti diventeranno sempre più importanti nel toolkit di ogni programmatore C++, specialmente per operazioni complesse su collezioni di dati.