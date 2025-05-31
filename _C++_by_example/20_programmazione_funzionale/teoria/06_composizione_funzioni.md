# Composizione di Funzioni in C++

## Introduzione

La composizione di funzioni è un concetto fondamentale nella programmazione funzionale che permette di combinare più funzioni per crearne una nuova. In matematica, la composizione di funzioni f e g è definita come (f ∘ g)(x) = f(g(x)). In questa lezione, esploreremo come implementare e utilizzare la composizione di funzioni in C++.

## Concetti Base della Composizione di Funzioni

La composizione di funzioni consiste nel passare l'output di una funzione come input a un'altra funzione. Questo approccio permette di costruire funzioni complesse a partire da funzioni più semplici, migliorando la modularità e la riusabilità del codice.

### Esempio Base

```cpp
#include <iostream>

// Funzioni semplici
int quadrato(int x) {
    return x * x;
}

int incrementa(int x) {
    return x + 1;
}

// Composizione manuale
int quadratoIncrementato(int x) {
    return quadrato(incrementa(x));
}

int main() {
    int valore = 5;
    std::cout << "Valore originale: " << valore << std::endl;
    std::cout << "Dopo incrementa: " << incrementa(valore) << std::endl;
    std::cout << "Dopo quadrato: " << quadrato(valore) << std::endl;
    std::cout << "Dopo quadratoIncrementato: " << quadratoIncrementato(valore) << std::endl;
    // Output:
    // Valore originale: 5
    // Dopo incrementa: 6
    // Dopo quadrato: 25
    // Dopo quadratoIncrementato: 36 (quadrato di (5+1))
    
    return 0;
}
```

## Implementazione della Composizione di Funzioni in C++

### Utilizzo di Lambda Expressions

```cpp
#include <iostream>
#include <functional>

int main() {
    // Funzioni di base come lambda
    auto incrementa = [](int x) { return x + 1; };
    auto quadrato = [](int x) { return x * x; };
    
    // Composizione usando lambda
    auto quadratoIncrementato = [&](int x) { return quadrato(incrementa(x)); };
    auto incrementaQuadrato = [&](int x) { return incrementa(quadrato(x)); };
    
    int valore = 5;
    std::cout << "quadratoIncrementato(5): " << quadratoIncrementato(valore) << std::endl; // 36
    std::cout << "incrementaQuadrato(5): " << incrementaQuadrato(valore) << std::endl; // 26
    
    return 0;
}
```

### Utilizzo di `std::function` e Template

```cpp
#include <iostream>
#include <functional>

// Funzione di composizione generica
template<typename F, typename G>
auto componi(F f, G g) {
    return [=](auto x) { return f(g(x)); };
}

int main() {
    // Funzioni di base
    std::function<int(int)> incrementa = [](int x) { return x + 1; };
    std::function<int(int)> quadrato = [](int x) { return x * x; };
    
    // Composizione usando la funzione template
    auto quadratoIncrementato = componi(quadrato, incrementa);
    auto incrementaQuadrato = componi(incrementa, quadrato);
    
    int valore = 5;
    std::cout << "quadratoIncrementato(5): " << quadratoIncrementato(valore) << std::endl; // 36
    std::cout << "incrementaQuadrato(5): " << incrementaQuadrato(valore) << std::endl; // 26
    
    return 0;
}
```

### Composizione di Più Funzioni

```cpp
#include <iostream>
#include <functional>

// Funzione di composizione per due funzioni
template<typename F, typename G>
auto componi(F f, G g) {
    return [=](auto x) { return f(g(x)); };
}

// Funzione di composizione variadic per più funzioni
template<typename F>
auto componiTutte(F f) {
    return f;
}

template<typename F, typename... Fs>
auto componiTutte(F f, Fs... fs) {
    auto resto = componiTutte(fs...);
    return [=](auto x) { return f(resto(x)); };
}

int main() {
    // Funzioni di base
    auto incrementa = [](int x) { return x + 1; };
    auto quadrato = [](int x) { return x * x; };
    auto raddoppia = [](int x) { return x * 2; };
    
    // Composizione di più funzioni
    auto pipeline = componiTutte(raddoppia, quadrato, incrementa);
    
    int valore = 5;
    std::cout << "pipeline(5): " << pipeline(valore) << std::endl;
    // Output: 72 (raddoppia(quadrato(incrementa(5))) = raddoppia(quadrato(6)) = raddoppia(36) = 72)
    
    return 0;
}
```

## Operatore di Composizione Personalizzato

Possiamo definire un operatore personalizzato per rendere la composizione di funzioni più leggibile.

```cpp
#include <iostream>
#include <functional>

// Operatore di composizione
template<typename F, typename G>
auto operator|(G g, F f) {
    return [=](auto x) { return f(g(x)); };
}

int main() {
    // Funzioni di base
    auto incrementa = [](int x) { return x + 1; };
    auto quadrato = [](int x) { return x * x; };
    auto raddoppia = [](int x) { return x * 2; };
    
    // Composizione usando l'operatore |
    auto pipeline = incrementa | quadrato | raddoppia;
    
    int valore = 5;
    std::cout << "pipeline(5): " << pipeline(valore) << std::endl;
    // Output: 72 (raddoppia(quadrato(incrementa(5))) = raddoppia(quadrato(6)) = raddoppia(36) = 72)
    
    return 0;
}
```

## Composizione con Funzioni a Più Argomenti

La composizione diventa più complessa quando si lavora con funzioni che accettano più argomenti. Possiamo utilizzare tecniche come il currying o il partial application.

### Currying

Il currying è una tecnica che trasforma una funzione con più argomenti in una sequenza di funzioni, ciascuna con un singolo argomento.

```cpp
#include <iostream>
#include <functional>

// Funzione di currying per una funzione a due argomenti
template<typename F>
auto curry(F f) {
    return [=](auto x) {
        return [=](auto y) {
            return f(x, y);
        };
    };
}

int main() {
    // Funzione a due argomenti
    auto somma = [](int a, int b) { return a + b; };
    
    // Versione curried della funzione somma
    auto sommaCurried = curry(somma);
    
    // Creazione di funzioni specializzate
    auto aggiungi5 = sommaCurried(5);
    auto aggiungi10 = sommaCurried(10);
    
    std::cout << "aggiungi5(3): " << aggiungi5(3) << std::endl; // 8
    std::cout << "aggiungi10(3): " << aggiungi10(3) << std::endl; // 13
    
    // Composizione con funzioni curried
    auto quadrato = [](int x) { return x * x; };
    auto quadratoSomma = [=](int x) { return quadrato(aggiungi5(x)); };
    
    std::cout << "quadratoSomma(3): " << quadratoSomma(3) << std::endl; // 64 (quadrato di (3+5))
    
    return 0;
}
```

### Partial Application

Il partial application consiste nel fissare alcuni argomenti di una funzione, creando una nuova funzione con meno argomenti.

```cpp
#include <iostream>
#include <functional>

// Funzione per il partial application
template<typename F, typename... Args>
auto partial(F f, Args... args) {
    return [=](auto... remainingArgs) {
        return f(args..., remainingArgs...);
    };
}

int main() {
    // Funzione a tre argomenti
    auto somma3 = [](int a, int b, int c) { return a + b + c; };
    
    // Partial application: fissa il primo argomento a 10
    auto somma3Con10 = partial(somma3, 10);
    
    // Partial application: fissa i primi due argomenti a 10 e 20
    auto somma3Con10e20 = partial(somma3, 10, 20);
    
    std::cout << "somma3(10, 20, 30): " << somma3(10, 20, 30) << std::endl; // 60
    std::cout << "somma3Con10(20, 30): " << somma3Con10(20, 30) << std::endl; // 60
    std::cout << "somma3Con10e20(30): " << somma3Con10e20(30) << std::endl; // 60
    
    return 0;
}
```

## Applicazioni Pratiche

### Pipeline di Elaborazione Dati

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
#include <functional>

// Operatore di composizione
template<typename F, typename G>
auto operator|(G g, F f) {
    return [=](auto x) { return f(g(x)); };
}

// Funzioni di trasformazione per vettori
auto filtraPari = [](const std::vector<int>& v) {
    std::vector<int> risultato;
    std::copy_if(v.begin(), v.end(), std::back_inserter(risultato),
                [](int n) { return n % 2 == 0; });
    return risultato;
};

auto moltiplica = [](int fattore) {
    return [=](const std::vector<int>& v) {
        std::vector<int> risultato(v.size());
        std::transform(v.begin(), v.end(), risultato.begin(),
                      [=](int n) { return n * fattore; });
        return risultato;
    };
};

auto somma = [](const std::vector<int>& v) {
    return std::accumulate(v.begin(), v.end(), 0);
};

int main() {
    std::vector<int> numeri = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // Pipeline: filtra i numeri pari, moltiplica per 3, calcola la somma
    auto pipeline = filtraPari | moltiplica(3) | somma;
    
    int risultato = pipeline(numeri);
    std::cout << "Risultato: " << risultato << std::endl;
    // Output: 90 (somma di [6, 12, 18, 24, 30])
    
    return 0;
}
```

### Composizione per Elaborazione di Stringhe

```cpp
#include <iostream>
#include <string>
#include <algorithm>
#include <cctype>
#include <functional>

// Operatore di composizione
template<typename F, typename G>
auto operator|(G g, F f) {
    return [=](auto x) { return f(g(x)); };
}

// Funzioni di trasformazione per stringhe
auto toUpper = [](std::string s) {
    std::transform(s.begin(), s.end(), s.begin(),
                  [](unsigned char c) { return std::toupper(c); });
    return s;
};

auto reverse = [](std::string s) {
    std::reverse(s.begin(), s.end());
    return s;
};

auto addPrefix = [](std::string prefix) {
    return [=](std::string s) {
        return prefix + s;
    };
};

auto addSuffix = [](std::string suffix) {
    return [=](std::string s) {
        return s + suffix;
    };
};

int main() {
    std::string testo = "hello world";
    
    // Pipeline: converti in maiuscolo, inverti, aggiungi prefisso e suffisso
    auto pipeline = toUpper | reverse | addPrefix("[START] ") | addSuffix(" [END]");
    
    std::string risultato = pipeline(testo);
    std::cout << "Risultato: " << risultato << std::endl;
    // Output: [START] DLROW OLLEH [END]
    
    return 0;
}
```

## Vantaggi della Composizione di Funzioni

1. **Modularità**: Permette di costruire funzioni complesse a partire da funzioni più semplici e riutilizzabili.
2. **Leggibilità**: Rende il codice più espressivo e dichiarativo, focalizzandosi sul "cosa" piuttosto che sul "come".
3. **Manutenibilità**: Facilita la modifica e il test di singole componenti senza influenzare l'intero sistema.
4. **Riusabilità**: Le funzioni di base possono essere riutilizzate in diverse composizioni.
5. **Testabilità**: Le funzioni più piccole sono più facili da testare individualmente.

## Sfide e Considerazioni

1. **Prestazioni**: La composizione di funzioni può introdurre overhead a causa delle chiamate di funzione annidate.
2. **Debugging**: Può essere più difficile seguire il flusso di esecuzione in una catena di funzioni composte.
3. **Tipi di Ritorno**: La gestione dei tipi di ritorno può diventare complessa, specialmente con funzioni eterogenee.
4. **Curva di Apprendimento**: La composizione di funzioni richiede una mentalità diversa rispetto alla programmazione imperativa tradizionale.

## Esercizi Proposti

1. Implementa una funzione `componi` che accetta un numero arbitrario di funzioni e le compone da destra a sinistra.
2. Crea un operatore di composizione `>>` che compone le funzioni da sinistra a destra (in ordine di applicazione).
3. Implementa una pipeline di elaborazione per un vettore di stringhe che: filtra le stringhe più lunghe di 5 caratteri, le converte in maiuscolo e le ordina alfabeticamente.
4. Scrivi una funzione `map` che applica una funzione a ogni elemento di un contenitore e una funzione `filter` che filtra gli elementi in base a un predicato. Poi componile per creare una pipeline di elaborazione.
5. Implementa una versione generalizzata di currying che funziona con funzioni con un numero arbitrario di argomenti.

## Domande di Autovalutazione

1. Cosa si intende per composizione di funzioni e quali sono i suoi vantaggi nella programmazione funzionale?
2. Come si può implementare la composizione di funzioni in C++ utilizzando template e lambda expressions?
3. Qual è la differenza tra currying e partial application? Quando è preferibile utilizzare l'uno rispetto all'altro?
4. Come si può gestire la composizione di funzioni con tipi di ritorno diversi?
5. Quali sono le sfide nell'implementare e utilizzare la composizione di funzioni in un linguaggio come C++?

## Conclusione

La composizione di funzioni è un potente strumento della programmazione funzionale che permette di costruire funzioni complesse a partire da funzioni più semplici. In C++, possiamo implementare la composizione utilizzando lambda expressions, template, `std::function` e operatori personalizzati. Questo approccio porta a codice più modulare, espressivo e manutenibile, anche se può introdurre alcune sfide in termini di prestazioni e complessità.

Nella prossima lezione, esploreremo il pattern matching e gli algebraic data types, e come possiamo simulare queste caratteristiche in C++.