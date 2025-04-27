# Funzioni Oggetto (Functors) in C++

In questa guida, esploreremo le funzioni oggetto (functors) in C++, un concetto potente che combina la flessibilità delle funzioni con la capacità di mantenere uno stato interno tipica degli oggetti.

## Cosa sono i Functors?

I functors (o funzioni oggetto) sono oggetti che possono essere utilizzati come se fossero funzioni. Tecnicamente, sono istanze di classi che hanno sovraccaricato l'operatore di chiamata di funzione `operator()`. Questo permette di utilizzare un oggetto come se fosse una funzione, chiamandolo con la sintassi delle parentesi.

```cpp
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
    Moltiplicatore moltiplica_per_5(5);
    int risultato = moltiplica_per_5(10);  // risultato = 50
    
    // Oppure direttamente
    risultato = Moltiplicatore(3)(10);  // risultato = 30
    
    return 0;
}
```

## Vantaggi dei Functors rispetto alle Funzioni Tradizionali

1. **Stato interno**: A differenza delle funzioni tradizionali, i functors possono mantenere uno stato interno tra le chiamate.
2. **Personalizzazione**: Possono essere inizializzati con parametri specifici.
3. **Tipo**: Ogni functor ha un tipo distinto, permettendo al compilatore di ottimizzare meglio il codice.
4. **Integrazione con la STL**: Molti algoritmi della STL accettano functors come parametri.

## Functors Predefiniti nella STL

La STL fornisce diversi functors predefiniti nel header `<functional>`. Questi sono divisi in categorie:

### Operatori Aritmetici

```cpp
#include <functional>
#include <iostream>

int main() {
    std::plus<int> somma;
    std::minus<int> differenza;
    std::multiplies<int> prodotto;
    std::divides<int> quoziente;
    std::modulus<int> resto;
    std::negate<int> negazione;
    
    std::cout << somma(5, 3) << std::endl;        // 8
    std::cout << differenza(5, 3) << std::endl;    // 2
    std::cout << prodotto(5, 3) << std::endl;      // 15
    std::cout << quoziente(5, 3) << std::endl;     // 1
    std::cout << resto(5, 3) << std::endl;         // 2
    std::cout << negazione(5) << std::endl;        // -5
    
    return 0;
}
```

### Operatori di Confronto

```cpp
#include <functional>
#include <iostream>

int main() {
    std::equal_to<int> uguale;
    std::not_equal_to<int> diverso;
    std::greater<int> maggiore;
    std::less<int> minore;
    std::greater_equal<int> maggiore_uguale;
    std::less_equal<int> minore_uguale;
    
    std::cout << uguale(5, 5) << std::endl;           // 1 (true)
    std::cout << diverso(5, 3) << std::endl;          // 1 (true)
    std::cout << maggiore(5, 3) << std::endl;         // 1 (true)
    std::cout << minore(5, 3) << std::endl;           // 0 (false)
    std::cout << maggiore_uguale(5, 5) << std::endl;  // 1 (true)
    std::cout << minore_uguale(3, 5) << std::endl;    // 1 (true)
    
    return 0;
}
```

### Operatori Logici

```cpp
#include <functional>
#include <iostream>

int main() {
    std::logical_and<bool> e_logico;
    std::logical_or<bool> o_logico;
    std::logical_not<bool> non_logico;
    
    std::cout << e_logico(true, false) << std::endl;  // 0 (false)
    std::cout << o_logico(true, false) << std::endl;   // 1 (true)
    std::cout << non_logico(true) << std::endl;        // 0 (false)
    
    return 0;
}
```

## Utilizzo dei Functors con gli Algoritmi della STL

I functors sono particolarmente utili con gli algoritmi della STL, dove possono essere utilizzati per personalizzare il comportamento dell'algoritmo.

```cpp
#include <algorithm>
#include <functional>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> numeri = {1, 2, 3, 4, 5};
    
    // Moltiplica ogni elemento per 2
    std::transform(numeri.begin(), numeri.end(), numeri.begin(),
                   std::bind(std::multiplies<int>(), std::placeholders::_1, 2));
    
    // Stampa i risultati
    for (int n : numeri) {
        std::cout << n << " ";
    }  // Output: 2 4 6 8 10
    
    return 0;
}
```

## Funzioni Lambda come Alternative ai Functors

A partire da C++11, le funzioni lambda offrono un'alternativa più concisa ai functors per molti casi d'uso:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> numeri = {1, 2, 3, 4, 5};
    
    // Usando una lambda invece di un functor
    std::transform(numeri.begin(), numeri.end(), numeri.begin(),
                   [](int x) { return x * 2; });
    
    // Stampa i risultati
    for (int n : numeri) {
        std::cout << n << " ";
    }  // Output: 2 4 6 8 10
    
    return 0;
}
```

Tuttavia, i functors rimangono utili in scenari più complessi o quando è necessario riutilizzare la stessa logica in più punti del codice.

## Creazione di Functors Personalizzati

Puoi creare functors personalizzati per incapsulare logiche specifiche:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

class InRangeChecker {
private:
    int min, max;
public:
    InRangeChecker(int min_val, int max_val) : min(min_val), max(max_val) {}
    
    bool operator()(int val) const {
        return (val >= min) && (val <= max);
    }
};

int main() {
    std::vector<int> numeri = {1, 15, 42, 7, 23, 5, 8, 38};
    
    // Conta quanti numeri sono nell'intervallo [5, 25]
    int count = std::count_if(numeri.begin(), numeri.end(), InRangeChecker(5, 25));
    
    std::cout << "Numeri nell'intervallo [5, 25]: " << count << std::endl;  // Output: 5
    
    return 0;
}
```

## Domande di Autovalutazione

1. Cosa distingue un functor da una funzione tradizionale in C++?
2. Come si implementa un functor in C++?
3. Quali sono i vantaggi dell'utilizzo dei functors rispetto alle funzioni tradizionali?
4. Quali categorie di functors predefiniti sono disponibili nella STL?
5. In quali situazioni è preferibile utilizzare un functor rispetto a una funzione lambda?

## Esercizi Proposti

1. Crea un functor `Potenza` che calcoli la potenza di un numero con un esponente specificato nel costruttore.
2. Implementa un functor `Filtro` che accetti solo numeri che soddisfano una certa condizione (ad esempio, numeri pari o numeri primi).
3. Utilizza i functors predefiniti della STL per ordinare un vettore di numeri in ordine decrescente.
4. Crea un functor che conti le occorrenze di una specifica parola in un vettore di stringhe.
5. Implementa un functor che calcoli la media mobile di una sequenza di numeri con una finestra di dimensione specificata nel costruttore.

## Conclusione

I functors sono uno strumento potente in C++ che combina la flessibilità delle funzioni con la capacità di mantenere uno stato interno tipica degli oggetti. Sono particolarmente utili quando si lavora con gli algoritmi della STL e possono essere utilizzati per creare comportamenti personalizzati e riutilizzabili. Sebbene le funzioni lambda abbiano reso meno necessario l'uso esplicito dei functors in molti casi, comprendere questo concetto rimane fondamentale per padroneggiare la programmazione in C++ e sfruttare appieno le potenzialità della STL.