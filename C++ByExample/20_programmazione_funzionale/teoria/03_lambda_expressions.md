# Espressioni Lambda

## Introduzione

Le espressioni lambda, introdotte in C++11, sono una caratteristica fondamentale che ha migliorato significativamente il supporto alla programmazione funzionale in C++. Le lambda permettono di definire funzioni anonime inline, rendendo il codice più conciso e espressivo.

Una lambda è essenzialmente una funzione senza nome che può essere definita nel punto in cui viene utilizzata. Può catturare variabili dal contesto circostante e può essere passata come argomento ad altre funzioni o restituita come risultato.

## Sintassi delle Espressioni Lambda

La sintassi generale di un'espressione lambda in C++ è la seguente:

```cpp
[cattura](parametri) -> tipo_ritorno { corpo }
```

Dove:
- `[cattura]` è la lista di cattura, che specifica quali variabili esterne sono accessibili all'interno della lambda e come (per valore o per riferimento)
- `(parametri)` è la lista dei parametri, simile a quella di una funzione normale
- `-> tipo_ritorno` è il tipo di ritorno (opzionale, può essere dedotto automaticamente)
- `{ corpo }` è il corpo della lambda, contenente il codice da eseguire

### Esempi di Base

```cpp
#include <iostream>

int main() {
    // Lambda senza parametri
    auto hello = []() { std::cout << "Hello, World!" << std::endl; };
    hello(); // Stampa: Hello, World!
    
    // Lambda con parametri
    auto add = [](int a, int b) { return a + b; };
    std::cout << "5 + 3 = " << add(5, 3) << std::endl; // Stampa: 5 + 3 = 8
    
    // Lambda con tipo di ritorno esplicito
    auto divide = [](double a, double b) -> double { return a / b; };
    std::cout << "10 / 3 = " << divide(10, 3) << std::endl; // Stampa: 10 / 3 = 3.33333
    
    return 0;
}
```

## Cattura delle Variabili

Una delle caratteristiche più potenti delle lambda è la capacità di catturare variabili dal contesto circostante. Ci sono diversi modi per specificare come le variabili vengono catturate:

- `[]`: Non cattura nessuna variabile
- `[=]`: Cattura tutte le variabili per valore
- `[&]`: Cattura tutte le variabili per riferimento
- `[x]`: Cattura la variabile `x` per valore
- `[&x]`: Cattura la variabile `x` per riferimento
- `[=, &x]`: Cattura tutte le variabili per valore, ma `x` per riferimento
- `[&, x]`: Cattura tutte le variabili per riferimento, ma `x` per valore
- `[this]`: Cattura il puntatore `this` (per lambda all'interno di metodi di classe)

### Esempi di Cattura

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    int multiplier = 3;
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // Cattura per valore
    std::cout << "Moltiplicazione per valore: ";
    std::for_each(numbers.begin(), numbers.end(), [multiplier](int n) {
        std::cout << n * multiplier << " ";
    });
    std::cout << std::endl; // Stampa: 3 6 9 12 15
    
    // Cattura per riferimento
    std::cout << "Moltiplicazione per riferimento: ";
    multiplier = 5;
    std::for_each(numbers.begin(), numbers.end(), [&multiplier](int n) {
        std::cout << n * multiplier << " ";
    });
    std::cout << std::endl; // Stampa: 5 10 15 20 25
    
    // Cattura mista
    int sum = 0;
    std::for_each(numbers.begin(), numbers.end(), [=, &sum](int n) {
        sum += n * multiplier;
    });
    std::cout << "Somma dei prodotti: " << sum << std::endl; // Stampa: 75 (5+10+15+20+25)
    
    return 0;
}
```

## Lambda Mutable

Per impostazione predefinita, le variabili catturate per valore sono immutabili all'interno della lambda. Per renderle modificabili, è necessario utilizzare la parola chiave `mutable`.

```cpp
#include <iostream>

int main() {
    int counter = 0;
    
    // Lambda non mutable (errore di compilazione)
    // auto increment = [counter]() { counter++; return counter; };
    
    // Lambda mutable
    auto increment = [counter]() mutable { counter++; return counter; };
    
    std::cout << "Primo incremento: " << increment() << std::endl; // 1
    std::cout << "Secondo incremento: " << increment() << std::endl; // 2
    std::cout << "Valore originale di counter: " << counter << std::endl; // 0 (non modificato)
    
    return 0;
}
```

## Lambda Generiche (C++14)

A partire da C++14, è possibile definire lambda generiche utilizzando `auto` come tipo dei parametri.

```cpp
#include <iostream>
#include <string>

int main() {
    // Lambda generica che accetta qualsiasi tipo
    auto print = [](const auto& value) {
        std::cout << value << std::endl;
    };
    
    print(42); // Stampa: 42
    print(3.14); // Stampa: 3.14
    print("Hello"); // Stampa: Hello
    print(std::string("World")); // Stampa: World
    
    // Lambda generica con più parametri
    auto max = [](const auto& a, const auto& b) {
        return (a > b) ? a : b;
    };
    
    std::cout << "Max(5, 10): " << max(5, 10) << std::endl; // 10
    std::cout << "Max(3.14, 2.71): " << max(3.14, 2.71) << std::endl; // 3.14
    
    return 0;
}
```

## Lambda Ricorsive

Le lambda possono essere ricorsive, ma poiché non hanno un nome, è necessario utilizzare tecniche speciali per implementare la ricorsione.

```cpp
#include <iostream>
#include <functional>

int main() {
    // Lambda ricorsiva per calcolare il fattoriale
    std::function<int(int)> factorial = [&factorial](int n) {
        return (n <= 1) ? 1 : n * factorial(n - 1);
    };
    
    std::cout << "Fattoriale di 5: " << factorial(5) << std::endl; // 120
    
    // Alternativa usando std::function direttamente nella cattura
    auto factorial2 = [](int n) {
        std::function<int(int)> fact = [&fact](int n) {
            return (n <= 1) ? 1 : n * fact(n - 1);
        };
        return fact(n);
    };
    
    std::cout << "Fattoriale di 6: " << factorial2(6) << std::endl; // 720
    
    return 0;
}
```

## Lambda come Oggetti Funzione

Le espressioni lambda in C++ sono in realtà implementate come oggetti funzione (functor) con un operatore di chiamata `operator()` sovraccaricato. Ogni lambda ha un tipo unico generato dal compilatore.

```cpp
#include <iostream>
#include <typeinfo>
#include <functional>

struct Functor {
    int operator()(int a, int b) const {
        return a + b;
    }
};

int main() {
    // Functor esplicito
    Functor add_functor;
    std::cout << "Risultato functor: " << add_functor(5, 3) << std::endl; // 8
    
    // Lambda equivalente
    auto add_lambda = [](int a, int b) { return a + b; };
    std::cout << "Risultato lambda: " << add_lambda(5, 3) << std::endl; // 8
    
    // Confronto dei tipi
    std::cout << "Tipo del functor: " << typeid(add_functor).name() << std::endl;
    std::cout << "Tipo della lambda: " << typeid(add_lambda).name() << std::endl;
    
    // Utilizzo di std::function per memorizzare sia functor che lambda
    std::function<int(int, int)> add_function = add_functor;
    std::cout << "Risultato function (functor): " << add_function(5, 3) << std::endl; // 8
    
    add_function = add_lambda;
    std::cout << "Risultato function (lambda): " << add_function(5, 3) << std::endl; // 8
    
    return 0;
}
```

## Utilizzo delle Lambda con gli Algoritmi STL

Uno dei casi d'uso più comuni per le lambda è con gli algoritmi della Standard Template Library (STL).

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    std::vector<int> numbers = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    
    // Ordinamento personalizzato
    std::sort(numbers.begin(), numbers.end(), [](int a, int b) {
        return a > b; // Ordine decrescente
    });
    
    std::cout << "Numeri ordinati (decrescente): ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl; // 9 8 7 6 5 4 3 2 1
    
    // Filtraggio con std::copy_if
    std::vector<int> even_numbers;
    std::copy_if(numbers.begin(), numbers.end(), std::back_inserter(even_numbers),
                 [](int n) { return n % 2 == 0; });
    
    std::cout << "Numeri pari: ";
    for (int num : even_numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl; // 8 6 4 2
    
    // Trasformazione con std::transform
    std::vector<int> squared_numbers(numbers.size());
    std::transform(numbers.begin(), numbers.end(), squared_numbers.begin(),
                   [](int n) { return n * n; });
    
    std::cout << "Numeri al quadrato: ";
    for (int num : squared_numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl; // 81 64 49 36 25 16 9 4 1
    
    // Riduzione con std::accumulate
    int sum = std::accumulate(numbers.begin(), numbers.end(), 0,
                             [](int acc, int n) { return acc + n; });
    
    std::cout << "Somma: " << sum << std::endl; // 45
    
    return 0;
}
```

## Lambda con Stato (Stateful Lambda)

Le lambda possono mantenere uno stato interno attraverso la cattura delle variabili.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // Lambda con stato che tiene traccia della somma
    int sum = 0;
    std::for_each(numbers.begin(), numbers.end(), [&sum](int n) {
        sum += n;
        std::cout << "Somma parziale: " << sum << std::endl;
    });
    
    // Lambda che genera una sequenza di numeri
    auto sequence_generator = [count = 0]() mutable {
        return ++count;
    };
    
    std::cout << "Sequenza: ";
    for (int i = 0; i < 5; ++i) {
        std::cout << sequence_generator() << " ";
    }
    std::cout << std::endl; // 1 2 3 4 5
    
    return 0;
}
```

## Inizializzazione di Cattura (C++14)

A partire da C++14, è possibile inizializzare nuove variabili nella lista di cattura.

```cpp
#include <iostream>
#include <memory>

int main() {
    // Inizializzazione di una variabile nella lista di cattura
    auto lambda = [value = 42]() {
        return value;
    };
    
    std::cout << "Valore: " << lambda() << std::endl; // 42
    
    // Inizializzazione di un puntatore unico
    auto ptr_lambda = [ptr = std::make_unique<int>(100)]() {
        return *ptr;
    };
    
    std::cout << "Valore del puntatore: " << ptr_lambda() << std::endl; // 100
    
    // Spostamento di una risorsa nella lambda
    auto resource = std::make_unique<int>(200);
    auto move_lambda = [res = std::move(resource)]() {
        return *res;
    };
    
    std::cout << "Risorsa spostata: " << move_lambda() << std::endl; // 200
    std::cout << "Resource è ora: " << (resource ? "valido" : "nullo") << std::endl; // nullo
    
    return 0;
}
```

## Lambda Immediate (IIFE - Immediately Invoked Function Expression)

È possibile definire e invocare una lambda immediatamente, simile al pattern IIFE in JavaScript.

```cpp
#include <iostream>

int main() {
    // Lambda invocata immediatamente
    int result = [](int x) {
        int sum = 0;
        for (int i = 1; i <= x; ++i) {
            sum += i;
        }
        return sum;
    }(10);
    
    std::cout << "Somma dei primi 10 numeri: " << result << std::endl; // 55
    
    // Utile per inizializzazioni complesse
    const auto complex_value = []() {
        // Calcolo complesso che richiede variabili temporanee
        int temp1 = 10;
        int temp2 = 20;
        return temp1 * temp2 + temp1;
    }();
    
    std::cout << "Valore complesso: " << complex_value << std::endl; // 210
    
    return 0;
}
```

## Vantaggi delle Espressioni Lambda

1. **Concisione**: Le lambda permettono di definire funzioni inline senza dover dichiarare funzioni separate o classi functor.

2. **Leggibilità**: Il codice è spesso più leggibile quando la logica è definita vicino al punto in cui viene utilizzata.

3. **Cattura del Contesto**: Le lambda possono accedere alle variabili locali, rendendo più facile lavorare con lo stato locale.

4. **Flessibilità**: Le lambda possono essere passate come argomenti, restituite da funzioni o memorizzate in variabili.

5. **Ottimizzazione**: I compilatori moderni possono ottimizzare efficacemente le lambda, spesso inlinizzandole completamente.

## Considerazioni sulle Prestazioni

1. **Inlining**: Le lambda semplici vengono spesso inlinizzate dal compilatore, eliminando l'overhead della chiamata di funzione.

2. **Cattura per Valore vs Riferimento**: La cattura per valore può comportare copie costose di oggetti grandi, mentre la cattura per riferimento può causare problemi di ciclo di vita se le variabili catturate escono dallo scope.

3. **std::function vs Lambda Diretta**: L'utilizzo di `std::function` per memorizzare una lambda introduce un overhead rispetto all'utilizzo diretto della lambda.

## Domande di Autovalutazione

1. Qual è la sintassi generale di un'espressione lambda in C++?
2. Quali sono i diversi modi per catturare variabili in una lambda?
3. Come si può modificare una variabile catturata per valore all'interno di una lambda?
4. Come si può implementare una lambda ricorsiva?
5. Quali sono i vantaggi dell'utilizzo delle lambda rispetto alle funzioni tradizionali o ai functor?

## Esercizi Proposti

1. **Implementazione di un Generatore di Sequenze**: Crea una lambda che generi una sequenza di numeri Fibonacci quando viene chiamata ripetutamente.

2. **Ordinamento Personalizzato**: Utilizza una lambda per ordinare un vettore di stringhe in base alla loro lunghezza, e a parità di lunghezza, in ordine alfabetico.

3. **Filtro Composito**: Crea una funzione che accetta più predicati (lambda) e restituisce una nuova lambda che è vera solo se tutti i predicati originali sono veri.

4. **Memoization con Lambda**: Implementa una funzione che accetta una lambda e restituisce una nuova lambda che memorizza i risultati per evitare calcoli ripetuti.

5. **Pipeline di Elaborazione**: Crea una serie di lambda che formano una pipeline di elaborazione dati, dove l'output di una lambda diventa l'input della successiva.

## Conclusione

Le espressioni lambda sono una caratteristica potente di C++ moderno che ha migliorato significativamente il supporto alla programmazione funzionale nel linguaggio. Permettono di scrivere codice più conciso, espressivo e modulare, facilitando l'implementazione di algoritmi funzionali e la composizione di funzioni.

Nella prossima lezione, esploreremo il concetto di funzioni pure e immutabilità in C++, e vedremo come questi principi della programmazione funzionale possono essere applicati per creare codice più robusto e manutenibile.