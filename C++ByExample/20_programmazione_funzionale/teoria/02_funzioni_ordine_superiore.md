# Funzioni di Ordine Superiore

## Introduzione

Le funzioni di ordine superiore sono uno dei concetti fondamentali della programmazione funzionale. Una funzione di ordine superiore è una funzione che soddisfa almeno uno dei seguenti criteri:

1. Accetta una o più funzioni come argomenti
2. Restituisce una funzione come risultato

In C++, le funzioni di ordine superiore possono essere implementate utilizzando puntatori a funzione, functor, espressioni lambda e la classe `std::function` della libreria standard.

## Funzioni come Argomenti

Una delle caratteristiche più comuni delle funzioni di ordine superiore è la capacità di accettare altre funzioni come argomenti. Questo permette di parametrizzare il comportamento di una funzione.

### Utilizzo di Puntatori a Funzione

```cpp
#include <iostream>
#include <vector>

// Funzione che accetta un'altra funzione come argomento
void for_each(const std::vector<int>& values, void (*func)(int)) {
    for (int value : values) {
        func(value);
    }
}

// Funzione da passare come argomento
void print(int value) {
    std::cout << value << " ";
}

void square_and_print(int value) {
    std::cout << value * value << " ";
}

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    std::cout << "Valori originali: ";
    for_each(numbers, print); // Passa la funzione print come argomento
    std::cout << std::endl;
    
    std::cout << "Valori al quadrato: ";
    for_each(numbers, square_and_print); // Passa la funzione square_and_print come argomento
    std::cout << std::endl;
    
    return 0;
}
```

### Utilizzo di `std::function`

`std::function` è un wrapper per oggetti invocabili che fornisce un'interfaccia uniforme per puntatori a funzione, functor e lambda.

```cpp
#include <iostream>
#include <vector>
#include <functional>

// Funzione che accetta un'altra funzione come argomento utilizzando std::function
void for_each(const std::vector<int>& values, std::function<void(int)> func) {
    for (int value : values) {
        func(value);
    }
}

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // Utilizzo di una lambda come argomento
    std::cout << "Valori originali: ";
    for_each(numbers, [](int value) { std::cout << value << " "; });
    std::cout << std::endl;
    
    // Utilizzo di una lambda con stato come argomento
    int sum = 0;
    for_each(numbers, [&sum](int value) { sum += value; });
    std::cout << "Somma: " << sum << std::endl;
    
    return 0;
}
```

### Utilizzo di Template

I template offrono un modo più flessibile e efficiente per implementare funzioni di ordine superiore in C++.

```cpp
#include <iostream>
#include <vector>

// Funzione template che accetta qualsiasi tipo di funzione
template<typename T, typename Func>
void for_each(const std::vector<T>& values, Func func) {
    for (const T& value : values) {
        func(value);
    }
}

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // Utilizzo con una lambda
    std::cout << "Valori originali: ";
    for_each(numbers, [](int value) { std::cout << value << " "; });
    std::cout << std::endl;
    
    // Utilizzo con un functor
    struct Multiplier {
        int factor;
        
        Multiplier(int f) : factor(f) {}
        
        void operator()(int value) const {
            std::cout << value * factor << " ";
        }
    };
    
    std::cout << "Valori moltiplicati per 3: ";
    for_each(numbers, Multiplier(3));
    std::cout << std::endl;
    
    return 0;
}
```

## Funzioni che Restituiscono Funzioni

Un'altra caratteristica delle funzioni di ordine superiore è la capacità di restituire altre funzioni come risultato. Questo è particolarmente utile per creare funzioni specializzate o per implementare tecniche come il currying.

### Restituzione di Lambda

```cpp
#include <iostream>
#include <functional>

// Funzione che restituisce una lambda
std::function<int(int)> create_multiplier(int factor) {
    return [factor](int value) { return value * factor; };
}

int main() {
    // Crea una funzione che moltiplica per 2
    auto double_function = create_multiplier(2);
    
    // Crea una funzione che moltiplica per 3
    auto triple_function = create_multiplier(3);
    
    std::cout << "5 * 2 = " << double_function(5) << std::endl; // 10
    std::cout << "5 * 3 = " << triple_function(5) << std::endl; // 15
    
    return 0;
}
```

### Implementazione del Currying

Il currying è una tecnica che trasforma una funzione con più argomenti in una sequenza di funzioni, ciascuna con un singolo argomento.

```cpp
#include <iostream>
#include <functional>

// Implementazione del currying per una funzione a due argomenti
template<typename A, typename B, typename R>
std::function<std::function<R(B)>(A)> curry(R(*f)(A, B)) {
    return [f](A a) {
        return [f, a](B b) {
            return f(a, b);
        };
    };
}

// Funzione a due argomenti
int add(int a, int b) {
    return a + b;
}

int main() {
    // Applica il currying alla funzione add
    auto curriedAdd = curry<int, int, int>(add);
    
    // Crea una funzione che aggiunge 5
    auto add5 = curriedAdd(5);
    
    std::cout << "5 + 3 = " << add5(3) << std::endl; // 8
    std::cout << "5 + 7 = " << add5(7) << std::endl; // 12
    
    return 0;
}
```

## Applicazioni Pratiche

### Implementazione di map, filter e reduce

Le funzioni `map`, `filter` e `reduce` sono esempi classici di funzioni di ordine superiore che sono ampiamente utilizzate nella programmazione funzionale.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
#include <functional>

// Implementazione di map
template<typename T, typename Func>
auto map(const std::vector<T>& input, Func f) {
    using ResultType = decltype(f(std::declval<T>()));
    std::vector<ResultType> result(input.size());
    
    std::transform(input.begin(), input.end(), result.begin(), f);
    return result;
}

// Implementazione di filter
template<typename T, typename Predicate>
std::vector<T> filter(const std::vector<T>& input, Predicate pred) {
    std::vector<T> result;
    
    for (const auto& item : input) {
        if (pred(item)) {
            result.push_back(item);
        }
    }
    
    return result;
}

// Implementazione di reduce
template<typename T, typename U, typename BinaryOp>
U reduce(const std::vector<T>& input, U init, BinaryOp op) {
    return std::accumulate(input.begin(), input.end(), init, op);
}

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // Utilizzo di map per raddoppiare ogni numero
    auto doubled = map(numbers, [](int x) { return x * 2; });
    
    std::cout << "Numeri raddoppiati: ";
    for (int num : doubled) {
        std::cout << num << " ";
    }
    std::cout << std::endl; // 2 4 6 8 10
    
    // Utilizzo di filter per selezionare solo i numeri pari
    auto even = filter(numbers, [](int x) { return x % 2 == 0; });
    
    std::cout << "Numeri pari: ";
    for (int num : even) {
        std::cout << num << " ";
    }
    std::cout << std::endl; // 2 4
    
    // Utilizzo di reduce per calcolare la somma
    auto sum = reduce(numbers, 0, std::plus<int>());
    
    std::cout << "Somma: " << sum << std::endl; // 15
    
    return 0;
}
```

### Composizione di Funzioni

La composizione di funzioni è una tecnica che permette di combinare più funzioni in una singola funzione.

```cpp
#include <iostream>
#include <functional>

// Funzione per comporre due funzioni
template<typename F, typename G>
auto compose(F f, G g) {
    return [f, g](auto x) { return f(g(x)); };
}

int main() {
    // Definizione di alcune funzioni semplici
    auto square = [](int x) { return x * x; };
    auto increment = [](int x) { return x + 1; };
    
    // Composizione: prima incrementa, poi eleva al quadrato
    auto square_after_increment = compose(square, increment);
    
    // Composizione: prima eleva al quadrato, poi incrementa
    auto increment_after_square = compose(increment, square);
    
    std::cout << "square_after_increment(5) = " << square_after_increment(5) << std::endl; // (5+1)^2 = 36
    std::cout << "increment_after_square(5) = " << increment_after_square(5) << std::endl; // 5^2+1 = 26
    
    return 0;
}
```

### Memoization

La memoization è una tecnica di ottimizzazione che memorizza i risultati di chiamate di funzione costose e restituisce il risultato memorizzato quando gli stessi input si verificano di nuovo.

```cpp
#include <iostream>
#include <functional>
#include <map>
#include <tuple>

// Funzione per creare una versione memoizzata di una funzione a un argomento
template<typename Arg, typename Result>
std::function<Result(Arg)> memoize(std::function<Result(Arg)> func) {
    auto cache = std::make_shared<std::map<Arg, Result>>();
    
    return [=](Arg arg) mutable {
        auto it = cache->find(arg);
        if (it != cache->end()) {
            return it->second;
        }
        
        Result result = func(arg);
        (*cache)[arg] = result;
        return result;
    };
}

// Funzione ricorsiva costosa: calcolo del numero di Fibonacci
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    // Crea una versione memoizzata della funzione fibonacci
    std::function<int(int)> fib_func = fibonacci;
    auto memoized_fibonacci = memoize<int, int>(fib_func);
    
    // Misura il tempo per calcolare fibonacci(40) con e senza memoization
    auto start = std::chrono::high_resolution_clock::now();
    int result1 = fibonacci(30);
    auto end = std::chrono::high_resolution_clock::now();
    
    std::cout << "fibonacci(30) = " << result1 << std::endl;
    std::cout << "Tempo senza memoization: " 
              << std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count() 
              << " ms" << std::endl;
    
    start = std::chrono::high_resolution_clock::now();
    int result2 = memoized_fibonacci(30);
    end = std::chrono::high_resolution_clock::now();
    
    std::cout << "memoized_fibonacci(30) = " << result2 << std::endl;
    std::cout << "Tempo con memoization: " 
              << std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count() 
              << " ms" << std::endl;
    
    // Chiamata ripetuta con lo stesso input (dovrebbe essere istantanea)
    start = std::chrono::high_resolution_clock::now();
    result2 = memoized_fibonacci(30);
    end = std::chrono::high_resolution_clock::now();
    
    std::cout << "memoized_fibonacci(30) (seconda chiamata) = " << result2 << std::endl;
    std::cout << "Tempo con memoization (seconda chiamata): " 
              << std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count() 
              << " ms" << std::endl;
    
    return 0;
}
```

## Vantaggi delle Funzioni di Ordine Superiore

1. **Astrazione**: Permettono di astrarre pattern comuni di codice, riducendo la duplicazione.

2. **Modularità**: Facilitano la creazione di componenti software modulari e riutilizzabili.

3. **Flessibilità**: Consentono di parametrizzare il comportamento delle funzioni, rendendo il codice più flessibile.

4. **Espressività**: Rendono il codice più espressivo e dichiarativo, concentrandosi sul "cosa" piuttosto che sul "come".

## Considerazioni sulle Prestazioni

L'utilizzo di funzioni di ordine superiore in C++ può avere implicazioni sulle prestazioni:

1. **Inlining**: I compilatori moderni sono in grado di effettuare l'inlining di funzioni e lambda, riducendo l'overhead delle chiamate di funzione.

2. **Ottimizzazioni del Compilatore**: Le funzioni template possono essere ottimizzate in modo più efficace rispetto alle funzioni che utilizzano `std::function`.

3. **Overhead di `std::function`**: `std::function` può introdurre un overhead a causa del type erasure e dell'allocazione dinamica.

4. **Cattura delle Lambda**: Le lambda che catturano variabili per riferimento possono essere più efficienti di quelle che catturano per valore, ma richiedono attenzione alla gestione del ciclo di vita delle variabili catturate.

## Domande di Autovalutazione

1. Quali sono le due caratteristiche principali delle funzioni di ordine superiore?
2. Quali sono i diversi modi per implementare funzioni di ordine superiore in C++?
3. Cosa sono le funzioni `map`, `filter` e `reduce` e come possono essere implementate in C++?
4. Come può essere implementata la composizione di funzioni in C++?
5. Quali sono i vantaggi e gli svantaggi dell'utilizzo di `std::function` rispetto ai template per implementare funzioni di ordine superiore?

## Esercizi Proposti

1. **Implementazione di forEach**: Crea una funzione `forEach` che accetta un container e una funzione, e applica la funzione a ogni elemento del container.

2. **Implementazione di Partial Application**: Crea una funzione `partial` che permette di applicare parzialmente una funzione, fissando alcuni dei suoi argomenti.

3. **Pipeline di Funzioni**: Implementa una funzione `pipeline` che permette di creare una pipeline di funzioni, dove l'output di una funzione diventa l'input della successiva.

4. **Memoization per Funzioni con Più Argomenti**: Estendi la funzione `memoize` per supportare funzioni con più argomenti.

5. **Implementazione di zip**: Crea una funzione `zip` che combina due container elemento per elemento utilizzando una funzione binaria.

## Conclusione

Le funzioni di ordine superiore sono uno strumento potente nella programmazione funzionale che permette di creare codice più modulare, riutilizzabile e espressivo. C++ offre diverse opzioni per implementare funzioni di ordine superiore, dalle tradizionali funzioni template alle moderne espressioni lambda e `std::function`.

Nella prossima lezione, approfondiremo le espressioni lambda in C++ e vedremo come possono essere utilizzate per implementare funzioni anonime e catturare variabili dal contesto circostante.