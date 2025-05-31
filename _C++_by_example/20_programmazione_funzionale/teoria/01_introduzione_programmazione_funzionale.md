# Introduzione alla Programmazione Funzionale

## Cos'è la Programmazione Funzionale?

La programmazione funzionale è un paradigma di programmazione che tratta il calcolo come la valutazione di funzioni matematiche ed evita il cambiamento di stato e i dati mutabili. A differenza della programmazione imperativa, che enfatizza i cambiamenti di stato, la programmazione funzionale enfatizza l'applicazione di funzioni a valori immutabili.

I principi fondamentali della programmazione funzionale includono:

- **Immutabilità**: I dati non vengono modificati dopo la creazione
- **Funzioni pure**: Le funzioni restituiscono sempre lo stesso risultato per gli stessi input e non hanno effetti collaterali
- **Funzioni di ordine superiore**: Le funzioni possono accettare altre funzioni come argomenti e restituire funzioni come risultati
- **Ricorsione**: Preferita ai costrutti iterativi
- **Valutazione lazy**: I calcoli vengono eseguiti solo quando necessario

## Programmazione Funzionale vs Altri Paradigmi

### Confronto con la Programmazione Imperativa

La programmazione imperativa si concentra su **come** eseguire un'operazione, descrivendo i passaggi necessari per raggiungere un risultato. La programmazione funzionale, invece, si concentra su **cosa** calcolare, descrivendo le proprietà del risultato.

```cpp
// Approccio imperativo per calcolare la somma di un array
int sum_imperative(const std::vector<int>& nums) {
    int sum = 0;
    for (int num : nums) {
        sum += num;
    }
    return sum;
}

// Approccio funzionale per calcolare la somma di un array
#include <numeric>
#include <vector>

int sum_functional(const std::vector<int>& nums) {
    return std::accumulate(nums.begin(), nums.end(), 0);
}
```

### Confronto con la Programmazione Orientata agli Oggetti

La programmazione orientata agli oggetti (OOP) organizza il codice in oggetti che contengono dati e comportamenti. La programmazione funzionale organizza il codice in funzioni pure che operano su dati immutabili.

```cpp
// Approccio OOP
class Calculator {
private:
    int value;

public:
    Calculator(int initial = 0) : value(initial) {}
    
    void add(int x) {
        value += x;
    }
    
    void subtract(int x) {
        value -= x;
    }
    
    int getValue() const {
        return value;
    }
};

// Utilizzo
Calculator calc(10);
calc.add(5);
calc.subtract(3);
int result = calc.getValue(); // 12

// Approccio funzionale
#include <functional>

int add(int a, int b) {
    return a + b;
}

int subtract(int a, int b) {
    return a - b;
}

// Utilizzo
int result = subtract(add(10, 5), 3); // 12
```

## Vantaggi della Programmazione Funzionale

1. **Prevedibilità**: Le funzioni pure producono sempre lo stesso output per lo stesso input, rendendo il codice più prevedibile e facile da testare.

2. **Concorrenza**: L'immutabilità e l'assenza di effetti collaterali rendono il codice funzionale naturalmente adatto alla programmazione concorrente.

3. **Modularità**: Le funzioni pure possono essere combinate in modi diversi, migliorando la modularità e la riusabilità del codice.

4. **Debugging semplificato**: L'assenza di stato mutabile rende più facile ragionare sul codice e identificare i bug.

5. **Testabilità**: Le funzioni pure sono facili da testare perché non dipendono da uno stato esterno.

## Supporto alla Programmazione Funzionale in C++

Sebbene C++ non sia un linguaggio funzionale puro, a partire da C++11 ha introdotto diverse caratteristiche che supportano la programmazione funzionale:

### Espressioni Lambda

Le espressioni lambda permettono di definire funzioni anonime inline:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // Utilizzo di una lambda per moltiplicare ogni elemento per 2
    std::transform(numbers.begin(), numbers.end(), numbers.begin(),
                   [](int x) { return x * 2; });
    
    // Stampa i risultati
    for (int num : numbers) {
        std::cout << num << " ";
    }
    // Output: 2 4 6 8 10
    
    return 0;
}
```

### Funzioni di Ordine Superiore

C++ supporta le funzioni di ordine superiore attraverso puntatori a funzione, functor e `std::function`:

```cpp
#include <iostream>
#include <functional>
#include <vector>

// Funzione di ordine superiore che applica una funzione a ogni elemento di un vettore
template<typename T, typename Func>
std::vector<T> map(const std::vector<T>& input, Func f) {
    std::vector<T> result;
    result.reserve(input.size());
    
    for (const auto& item : input) {
        result.push_back(f(item));
    }
    
    return result;
}

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // Utilizzo della funzione map con una lambda
    auto squared = map(numbers, [](int x) { return x * x; });
    
    // Stampa i risultati
    for (int num : squared) {
        std::cout << num << " ";
    }
    // Output: 1 4 9 16 25
    
    return 0;
}
```

### Algoritmi Funzionali nella STL

La Standard Template Library (STL) include molti algoritmi che seguono principi funzionali:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // Calcola la somma utilizzando std::accumulate
    int sum = std::accumulate(numbers.begin(), numbers.end(), 0);
    std::cout << "Somma: " << sum << std::endl; // 15
    
    // Filtra i numeri pari utilizzando std::copy_if
    std::vector<int> even_numbers;
    std::copy_if(numbers.begin(), numbers.end(), std::back_inserter(even_numbers),
                 [](int x) { return x % 2 == 0; });
    
    std::cout << "Numeri pari: ";
    for (int num : even_numbers) {
        std::cout << num << " ";
    }
    // Output: Numeri pari: 2 4
    
    return 0;
}
```

## Sfide nell'Adozione della Programmazione Funzionale in C++

1. **Immutabilità**: C++ non impone l'immutabilità per impostazione predefinita, quindi è responsabilità del programmatore garantirla.

2. **Garbage Collection**: A differenza di molti linguaggi funzionali, C++ non ha un garbage collector, quindi la gestione della memoria richiede attenzione.

3. **Sintassi Verbosa**: Alcune operazioni funzionali possono richiedere una sintassi più verbosa rispetto ai linguaggi funzionali puri.

4. **Ottimizzazioni del Compilatore**: Alcune tecniche funzionali possono essere meno efficienti se il compilatore non è in grado di ottimizzarle adeguatamente.

## Esempio Pratico: Elaborazione di una Lista di Numeri

Vediamo un esempio completo che utilizza tecniche di programmazione funzionale per elaborare una lista di numeri:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
#include <functional>

// Funzione per filtrare elementi in base a un predicato
template<typename T, typename Predicate>
std::vector<T> filter(const std::vector<T>& input, Predicate pred) {
    std::vector<T> result;
    std::copy_if(input.begin(), input.end(), std::back_inserter(result), pred);
    return result;
}

// Funzione per trasformare elementi utilizzando una funzione
template<typename T, typename Func>
std::vector<T> map(const std::vector<T>& input, Func f) {
    std::vector<T> result(input.size());
    std::transform(input.begin(), input.end(), result.begin(), f);
    return result;
}

// Funzione per ridurre una collezione a un singolo valore
template<typename T, typename U, typename BinaryOp>
U reduce(const std::vector<T>& input, U init, BinaryOp op) {
    return std::accumulate(input.begin(), input.end(), init, op);
}

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // Filtra i numeri pari
    auto even_numbers = filter(numbers, [](int x) { return x % 2 == 0; });
    
    // Eleva al quadrato ogni numero
    auto squared = map(even_numbers, [](int x) { return x * x; });
    
    // Calcola la somma dei quadrati
    auto sum = reduce(squared, 0, std::plus<int>());
    
    std::cout << "Numeri originali: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    std::cout << "Numeri pari: ";
    for (int num : even_numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    std::cout << "Quadrati dei numeri pari: ";
    for (int num : squared) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    std::cout << "Somma dei quadrati: " << sum << std::endl;
    
    // Approccio funzionale in una singola espressione
    auto result = reduce(
        map(
            filter(numbers, [](int x) { return x % 2 == 0; }),
            [](int x) { return x * x; }
        ),
        0,
        std::plus<int>()
    );
    
    std::cout << "Risultato (approccio composto): " << result << std::endl;
    
    return 0;
}
```

## Domande di Autovalutazione

1. Quali sono i principi fondamentali della programmazione funzionale?
2. Come si differenzia la programmazione funzionale dalla programmazione imperativa e orientata agli oggetti?
3. Quali caratteristiche di C++ supportano la programmazione funzionale?
4. Cosa sono le funzioni pure e perché sono importanti nella programmazione funzionale?
5. Come può l'immutabilità migliorare la qualità del codice?

## Esercizi Proposti

1. **Implementazione di map, filter e reduce**: Implementa queste funzioni di ordine superiore utilizzando gli algoritmi della STL.

2. **Trasformazione di Codice Imperativo**: Prendi un esempio di codice imperativo e riscrivilo utilizzando tecniche di programmazione funzionale.

3. **Composizione di Funzioni**: Crea una funzione `compose` che permetta di comporre due o più funzioni.

4. **Implementazione di una Pipeline di Elaborazione**: Crea una pipeline di elaborazione dati utilizzando tecniche funzionali.

5. **Currying in C++**: Implementa una funzione che supporti il currying (trasformazione di una funzione con più argomenti in una sequenza di funzioni con un singolo argomento).

## Conclusione

La programmazione funzionale offre un approccio potente e alternativo alla programmazione in C++. Sebbene C++ non sia un linguaggio funzionale puro, le caratteristiche moderne introdotte da C++11 in poi permettono di adottare molti principi funzionali, portando a codice più modulare, testabile e manutenibile.

Nelle prossime lezioni, approfondiremo questi concetti e vedremo come applicarli in scenari più complessi.