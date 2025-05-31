# Funzionali nella STL (Standard Template Library)

## Introduzione

La Standard Template Library (STL) di C++ offre diversi strumenti che supportano la programmazione funzionale. In questa lezione, esploreremo i funzionali disponibili nella STL e come possono essere utilizzati per scrivere codice più espressivo e conciso.

## Algoritmi Funzionali nella STL

La STL include numerosi algoritmi che operano su sequenze di elementi e che possono accettare funzioni o funzionali come parametri. Questi algoritmi sono definiti nell'header `<algorithm>`.

### Algoritmi di Trasformazione

#### `std::transform`

L'algoritmo `std::transform` applica una funzione a ciascun elemento di una sequenza e memorizza il risultato in un'altra sequenza.

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> numeri = {1, 2, 3, 4, 5};
    std::vector<int> risultato(numeri.size());
    
    // Trasforma ogni numero nel suo quadrato
    std::transform(numeri.begin(), numeri.end(), risultato.begin(),
                   [](int n) { return n * n; });
    
    // Stampa i risultati
    for (int n : risultato) {
        std::cout << n << " "; // Output: 1 4 9 16 25
    }
    
    return 0;
}
```

### Algoritmi di Filtraggio

#### `std::copy_if`

L'algoritmo `std::copy_if` copia gli elementi da una sequenza a un'altra se soddisfano un predicato.

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> numeri = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    std::vector<int> pari;
    
    // Copia solo i numeri pari
    std::copy_if(numeri.begin(), numeri.end(), std::back_inserter(pari),
                 [](int n) { return n % 2 == 0; });
    
    // Stampa i numeri pari
    for (int n : pari) {
        std::cout << n << " "; // Output: 2 4 6 8 10
    }
    
    return 0;
}
```

### Algoritmi di Riduzione

#### `std::accumulate`

L'algoritmo `std::accumulate` (definito in `<numeric>`) riduce una sequenza a un singolo valore applicando un'operazione binaria.

```cpp
#include <numeric>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> numeri = {1, 2, 3, 4, 5};
    
    // Calcola la somma
    int somma = std::accumulate(numeri.begin(), numeri.end(), 0);
    std::cout << "Somma: " << somma << std::endl; // Output: 15
    
    // Calcola il prodotto
    int prodotto = std::accumulate(numeri.begin(), numeri.end(), 1,
                                  [](int a, int b) { return a * b; });
    std::cout << "Prodotto: " << prodotto << std::endl; // Output: 120
    
    return 0;
}
```

### Algoritmi di Ricerca

#### `std::find_if`

L'algoritmo `std::find_if` trova il primo elemento in una sequenza che soddisfa un predicato.

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> numeri = {1, 3, 5, 7, 9, 2, 4, 6, 8, 10};
    
    // Trova il primo numero pari
    auto it = std::find_if(numeri.begin(), numeri.end(),
                          [](int n) { return n % 2 == 0; });
    
    if (it != numeri.end()) {
        std::cout << "Primo numero pari: " << *it << std::endl; // Output: 2
    }
    
    return 0;
}
```

## Funzionali Predefiniti nella STL

La STL fornisce una serie di funzionali predefiniti nell'header `<functional>` che possono essere utilizzati con gli algoritmi della STL.

### Operatori Aritmetici

```cpp
#include <functional>
#include <vector>
#include <iostream>
#include <algorithm>

int main() {
    std::vector<int> a = {1, 2, 3, 4, 5};
    std::vector<int> b = {10, 20, 30, 40, 50};
    std::vector<int> risultato(a.size());
    
    // Somma elemento per elemento usando std::plus
    std::transform(a.begin(), a.end(), b.begin(), risultato.begin(),
                   std::plus<int>());
    
    // Stampa i risultati
    for (int n : risultato) {
        std::cout << n << " "; // Output: 11 22 33 44 55
    }
    
    return 0;
}
```

Altri funzionali predefiniti includono `std::minus`, `std::multiplies`, `std::divides`, `std::modulus`, `std::negate`.

### Operatori di Confronto

```cpp
#include <functional>
#include <vector>
#include <iostream>
#include <algorithm>

int main() {
    std::vector<int> numeri = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    
    // Ordina in ordine crescente usando std::less
    std::sort(numeri.begin(), numeri.end(), std::less<int>());
    
    // Stampa i numeri ordinati
    for (int n : numeri) {
        std::cout << n << " "; // Output: 1 2 3 4 5 6 7 8 9
    }
    
    std::cout << std::endl;
    
    // Ordina in ordine decrescente usando std::greater
    std::sort(numeri.begin(), numeri.end(), std::greater<int>());
    
    // Stampa i numeri ordinati
    for (int n : numeri) {
        std::cout << n << " "; // Output: 9 8 7 6 5 4 3 2 1
    }
    
    return 0;
}
```

Altri funzionali di confronto includono `std::equal_to`, `std::not_equal_to`, `std::greater_equal`, `std::less_equal`.

### Operatori Logici

```cpp
#include <functional>
#include <vector>
#include <iostream>
#include <algorithm>

int main() {
    std::vector<bool> a = {true, false, true, false};
    std::vector<bool> b = {true, true, false, false};
    std::vector<bool> risultato(a.size());
    
    // Operazione AND logico elemento per elemento
    std::transform(a.begin(), a.end(), b.begin(), risultato.begin(),
                   std::logical_and<bool>());
    
    // Stampa i risultati
    std::cout << "AND logico: ";
    for (bool b : risultato) {
        std::cout << b << " "; // Output: 1 0 0 0
    }
    
    // Operazione OR logico elemento per elemento
    std::transform(a.begin(), a.end(), b.begin(), risultato.begin(),
                   std::logical_or<bool>());
    
    // Stampa i risultati
    std::cout << "\nOR logico: ";
    for (bool b : risultato) {
        std::cout << b << " "; // Output: 1 1 1 0
    }
    
    return 0;
}
```

Altri funzionali logici includono `std::logical_not`.

## Funzionali Personalizzati

Oltre ai funzionali predefiniti, è possibile creare funzionali personalizzati definendo classi con l'operatore `operator()`.

```cpp
#include <functional>
#include <vector>
#include <iostream>
#include <algorithm>

// Funzionale personalizzato per verificare se un numero è nell'intervallo [min, max]
class InRange {
private:
    int min;
    int max;

public:
    InRange(int min, int max) : min(min), max(max) {}
    
    bool operator()(int value) const {
        return value >= min && value <= max;
    }
};

int main() {
    std::vector<int> numeri = {1, 5, 10, 15, 20, 25, 30};
    
    // Conta i numeri nell'intervallo [5, 20]
    int count = std::count_if(numeri.begin(), numeri.end(), InRange(5, 20));
    
    std::cout << "Numeri nell'intervallo [5, 20]: " << count << std::endl; // Output: 4
    
    return 0;
}
```

## Composizione di Funzionali

C++11 e versioni successive offrono strumenti per comporre funzionali, come `std::bind` e `std::function`.

### `std::bind`

`std::bind` permette di creare un nuovo funzionale legando alcuni argomenti di un funzionale esistente.

```cpp
#include <functional>
#include <iostream>

int somma(int a, int b, int c) {
    return a + b + c;
}

int main() {
    // Crea un nuovo funzionale che somma 1, 2 e un terzo valore
    auto somma_con_1_2 = std::bind(somma, 1, 2, std::placeholders::_1);
    
    // Usa il nuovo funzionale
    std::cout << somma_con_1_2(3) << std::endl; // Output: 6 (1 + 2 + 3)
    std::cout << somma_con_1_2(10) << std::endl; // Output: 13 (1 + 2 + 10)
    
    return 0;
}
```

### `std::function`

`std::function` è un wrapper per funzioni, funzionali, lambda e altri oggetti chiamabili.

```cpp
#include <functional>
#include <iostream>
#include <vector>

int somma(int a, int b) {
    return a + b;
}

class Moltiplicatore {
private:
    int fattore;

public:
    Moltiplicatore(int f) : fattore(f) {}
    
    int operator()(int x) const {
        return x * fattore;
    }
};

int main() {
    // Diverse funzioni/funzionali con la stessa firma
    std::function<int(int, int)> operazione;
    
    // Assegna una funzione
    operazione = somma;
    std::cout << "Somma: " << operazione(2, 3) << std::endl; // Output: 5
    
    // Assegna una lambda
    operazione = [](int a, int b) { return a - b; };
    std::cout << "Sottrazione: " << operazione(5, 3) << std::endl; // Output: 2
    
    // Vettore di funzioni
    std::vector<std::function<int(int)>> trasformazioni;
    
    // Aggiungi diverse trasformazioni
    trasformazioni.push_back([](int x) { return x + 1; }); // Incremento
    trasformazioni.push_back([](int x) { return x * x; }); // Quadrato
    trasformazioni.push_back(Moltiplicatore(3)); // Moltiplicazione per 3
    
    // Applica tutte le trasformazioni a un valore
    int valore = 5;
    for (const auto& trasforma : trasformazioni) {
        valore = trasforma(valore);
    }
    
    std::cout << "Risultato finale: " << valore << std::endl; // Output: 108 ((5+1)^2*3)
    
    return 0;
}
```

## Applicazioni Pratiche

### Elaborazione di Dati

```cpp
#include <algorithm>
#include <functional>
#include <vector>
#include <string>
#include <iostream>

struct Persona {
    std::string nome;
    int età;
};

int main() {
    std::vector<Persona> persone = {
        {"Mario", 25},
        {"Luigi", 30},
        {"Peach", 22},
        {"Bowser", 40},
        {"Toad", 18}
    };
    
    // Filtra le persone con età >= 25
    std::vector<Persona> adulti;
    std::copy_if(persone.begin(), persone.end(), std::back_inserter(adulti),
                 [](const Persona& p) { return p.età >= 25; });
    
    // Estrai i nomi delle persone adulte
    std::vector<std::string> nomiAdulti;
    std::transform(adulti.begin(), adulti.end(), std::back_inserter(nomiAdulti),
                   [](const Persona& p) { return p.nome; });
    
    // Stampa i nomi
    std::cout << "Persone con età >= 25: ";
    for (const auto& nome : nomiAdulti) {
        std::cout << nome << " ";
    }
    // Output: Mario Luigi Bowser
    
    return 0;
}
```

### Pipeline di Elaborazione

```cpp
#include <functional>
#include <vector>
#include <string>
#include <iostream>
#include <algorithm>
#include <numeric>

// Funzione per creare una pipeline di trasformazioni
template<typename T>
class Pipeline {
private:
    std::vector<std::function<T(T)>> funzioni;

public:
    // Aggiunge una funzione alla pipeline
    Pipeline& aggiungi(std::function<T(T)> f) {
        funzioni.push_back(f);
        return *this;
    }
    
    // Applica tutte le funzioni in sequenza
    T applica(T input) const {
        T risultato = input;
        for (const auto& f : funzioni) {
            risultato = f(risultato);
        }
        return risultato;
    }
};

int main() {
    // Crea una pipeline per elaborare numeri interi
    Pipeline<int> pipeline;
    pipeline.aggiungi([](int x) { return x + 10; })  // Aggiungi 10
            .aggiungi([](int x) { return x * 2; })   // Moltiplica per 2
            .aggiungi([](int x) { return x - 5; });  // Sottrai 5
    
    // Applica la pipeline a un valore
    int risultato = pipeline.applica(7);
    std::cout << "Risultato: " << risultato << std::endl; // Output: 39 ((7+10)*2-5)
    
    // Crea una pipeline per elaborare vettori di interi
    Pipeline<std::vector<int>> pipelineVettori;
    pipelineVettori.aggiungi([](std::vector<int> v) {
        // Filtra i numeri pari
        std::vector<int> risultato;
        std::copy_if(v.begin(), v.end(), std::back_inserter(risultato),
                     [](int n) { return n % 2 == 0; });
        return risultato;
    }).aggiungi([](std::vector<int> v) {
        // Moltiplica ogni elemento per 3
        std::transform(v.begin(), v.end(), v.begin(),
                       [](int n) { return n * 3; });
        return v;
    }).aggiungi([](std::vector<int> v) {
        // Ordina in ordine decrescente
        std::sort(v.begin(), v.end(), std::greater<int>());
        return v;
    });
    
    // Applica la pipeline a un vettore
    std::vector<int> numeri = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    std::vector<int> risultatoVettore = pipelineVettori.applica(numeri);
    
    // Stampa il risultato
    std::cout << "Risultato vettore: ";
    for (int n : risultatoVettore) {
        std::cout << n << " ";
    }
    // Output: 30 24 18 12 6
    
    return 0;
}
```

## Esercizi Proposti

1. Implementa una funzione `mapVector` che applica una funzione a ogni elemento di un vettore e restituisce un nuovo vettore con i risultati.
2. Crea una funzione `filterVector` che filtra gli elementi di un vettore in base a un predicato.
3. Implementa una funzione `reduceVector` che riduce un vettore a un singolo valore applicando una funzione binaria.
4. Scrivi un programma che utilizzi gli algoritmi della STL per trovare la somma dei quadrati dei numeri pari in un vettore.
5. Crea una classe `FunctionComposer` che permetta di comporre facilmente più funzioni.

## Domande di Autovalutazione

1. Quali sono i principali algoritmi funzionali disponibili nella STL?
2. Come si può utilizzare `std::transform` per applicare una funzione a ogni elemento di un contenitore?
3. Qual è la differenza tra `std::bind` e le espressioni lambda?
4. Come si può implementare una pipeline di elaborazione utilizzando i funzionali della STL?
5. Quali sono i vantaggi dell'utilizzo dei funzionali predefiniti rispetto alle funzioni personalizzate?

## Conclusione

I funzionali nella STL offrono potenti strumenti per scrivere codice C++ in stile funzionale. Combinando algoritmi come `std::transform`, `std::copy_if` e `std::accumulate` con funzionali predefiniti o personalizzati, è possibile creare codice più espressivo, modulare e manutenibile. Questi strumenti sono particolarmente utili per l'elaborazione di dati e la creazione di pipeline di trasformazioni.

Nella prossima lezione, esploreremo la composizione di funzioni in modo più dettagliato, un altro concetto fondamentale della programmazione funzionale.