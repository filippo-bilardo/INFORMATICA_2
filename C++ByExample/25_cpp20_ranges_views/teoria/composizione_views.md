# Composizione di Views in C++20

In questa guida, esploreremo uno degli aspetti più potenti della libreria Ranges di C++20: la composizione di views. Questa funzionalità permette di combinare diverse operazioni su sequenze in modo dichiarativo ed elegante.

## Il Concetto di Composizione

La composizione di views è il processo di concatenare multiple operazioni di trasformazione su una sequenza, creando una pipeline di elaborazione dati. Ogni view nella catena prende l'output della view precedente come input, permettendo di costruire operazioni complesse a partire da blocchi semplici.

## Vantaggi della Composizione

### 1. Codice Dichiarativo

La composizione di views rende il codice più dichiarativo, concentrandosi sul "cosa" piuttosto che sul "come":

```cpp
// Approccio imperativo tradizionale
std::vector<int> numeri = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
std::vector<int> risultato;

for (int n : numeri) {
    if (n % 2 == 0) {
        risultato.push_back(n * n);
    }
}

// Approccio dichiarativo con views composte
auto risultato = numeri | std::views::filter([](int n) { return n % 2 == 0; })
                        | std::views::transform([](int n) { return n * n; });
```

### 2. Lazy Evaluation

Le views composte utilizzano la valutazione lazy, il che significa che le operazioni vengono eseguite solo quando necessario:

```cpp
// Definizione della pipeline (nessuna operazione viene eseguita qui)
auto pipeline = numeri | std::views::filter([](int n) { return n % 2 == 0; })
                      | std::views::transform([](int n) { return n * n; });

// Le operazioni vengono eseguite solo quando iteriamo sui risultati
for (int n : pipeline) {
    std::cout << n << " "; // Output: 4 16 36 64 100
}
```

Questo approccio può portare a significativi miglioramenti delle prestazioni, specialmente quando lavoriamo con grandi sequenze o quando non abbiamo bisogno di tutti i risultati.

### 3. Riutilizzabilità

Le pipeline di views possono essere definite una volta e riutilizzate in più punti del codice:

```cpp
auto solo_pari = std::views::filter([](int n) { return n % 2 == 0; });
auto quadrato = std::views::transform([](int n) { return n * n; });

// Riutilizzo delle views in diverse combinazioni
auto pari_al_quadrato = numeri | solo_pari | quadrato;
auto tutti_al_quadrato = numeri | quadrato;
auto pari_da_quadrati = numeri | quadrato | solo_pari;
```

## Operatore Pipe (`|`)

L'operatore pipe (`|`) è il cuore della composizione di views in C++20. Questo operatore è stato sovraccaricato per consentire la concatenazione di views in modo intuitivo, ispirato alle pipeline Unix/Linux.

```cpp
// Sintassi generale
auto risultato = sequenza | view1 | view2 | view3;
```

L'operatore pipe prende una sequenza (o una view) sul lato sinistro e un adattatore di view sul lato destro, restituendo una nuova view che rappresenta la sequenza trasformata.

## Esempi di Composizione

### Esempio 1: Filtraggio e Trasformazione

```cpp
#include <iostream>
#include <vector>
#include <ranges>
#include <algorithm>

int main() {
    std::vector<int> numeri = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // Filtra i numeri pari, calcola il quadrato e prendi i primi 3
    auto risultato = numeri | std::views::filter([](int n) { return n % 2 == 0; })
                           | std::views::transform([](int n) { return n * n; })
                           | std::views::take(3);
    
    for (int n : risultato) {
        std::cout << n << " "; // Output: 4 16 36
    }
    std::cout << std::endl;
    
    return 0;
}
```

### Esempio 2: Manipolazione di Stringhe

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <ranges>
#include <algorithm>

int main() {
    std::vector<std::string> parole = {"hello", "world", "c++", "ranges", "views"};
    
    // Filtra parole con lunghezza > 4, trasforma in maiuscolo e inverti l'ordine
    auto risultato = parole | std::views::filter([](const std::string& s) { return s.length() > 4; })
                           | std::views::transform([](std::string s) {
                                 std::transform(s.begin(), s.end(), s.begin(), ::toupper);
                                 return s;
                             })
                           | std::views::reverse;
    
    for (const auto& s : risultato) {
        std::cout << s << " "; // Output: RANGES WORLD HELLO
    }
    std::cout << std::endl;
    
    return 0;
}
```

### Esempio 3: Elaborazione di Dati Complessi

```cpp
#include <iostream>
#include <vector>
#include <ranges>
#include <algorithm>

struct Persona {
    std::string nome;
    int età;
    double stipendio;
};

int main() {
    std::vector<Persona> persone = {
        {"Mario", 30, 45000.0},
        {"Luigi", 25, 38000.0},
        {"Anna", 35, 52000.0},
        {"Marco", 40, 60000.0},
        {"Giulia", 28, 42000.0}
    };
    
    // Filtra persone con età > 30, estrai gli stipendi e calcola la media
    auto stipendi_over_30 = persone | std::views::filter([](const Persona& p) { return p.età > 30; })
                                   | std::views::transform([](const Persona& p) { return p.stipendio; });
    
    double somma = 0.0;
    int conteggio = 0;
    
    for (double stipendio : stipendi_over_30) {
        somma += stipendio;
        conteggio++;
    }
    
    double media = somma / conteggio;
    std::cout << "Stipendio medio delle persone con più di 30 anni: " << media << std::endl;
    // Output: Stipendio medio delle persone con più di 30 anni: 56000
    
    return 0;
}
```

## Ottimizzazione delle Pipeline

### Fusione delle Operazioni

Una caratteristica importante della composizione di views è che il compilatore può potenzialmente fondere (fusion) operazioni adiacenti, migliorando ulteriormente le prestazioni:

```cpp
// Il compilatore potrebbe ottimizzare questa pipeline...
auto risultato = numeri | std::views::filter([](int n) { return n % 2 == 0; })
                       | std::views::transform([](int n) { return n * n; });

// ...in qualcosa di equivalente a questo ciclo singolo
for (int n : numeri) {
    if (n % 2 == 0) {
        int trasformato = n * n;
        // usa trasformato
    }
}
```

### Considerazioni sulle Prestazioni

Nonostante i vantaggi della valutazione lazy, è importante considerare che la composizione di views può introdurre un certo overhead rispetto a soluzioni manuali altamente ottimizzate. Tuttavia, nella maggior parte dei casi, i benefici in termini di leggibilità, manutenibilità e correttezza superano ampiamente questo potenziale svantaggio.

## Best Practices

1. **Preferisci la Composizione alla Nidificazione**: Usa l'operatore pipe per comporre views invece di nidificare le chiamate di funzione.

```cpp
// Preferisci questo
auto risultato = numeri | std::views::filter(...) | std::views::transform(...);

// Rispetto a questo
auto risultato = std::views::transform(std::views::filter(numeri, ...), ...);
```

2. **Riutilizza le Views Comuni**: Definisci views comuni una volta e riutilizzale in diverse pipeline.

3. **Considera la Materializzazione**: In alcuni casi, potrebbe essere più efficiente materializzare (convertire in un contenitore concreto) i risultati intermedi di una pipeline complessa.

```cpp
// Materializzazione dei risultati
auto risultato_view = numeri | std::views::filter(...) | std::views::transform(...);
std::vector<int> risultato_materializzato(risultato_view.begin(), risultato_view.end());
```

## Conclusione

La composizione di views è una delle caratteristiche più potenti e innovative della libreria Ranges di C++20. Permette di scrivere codice più dichiarativo, modulare e manutenibile, mantenendo al contempo buone prestazioni grazie alla valutazione lazy. Padroneggiare questa tecnica ti permetterà di esprimere algoritmi complessi in modo elegante e conciso.

Nelle prossime guide, esploreremo esempi più avanzati di utilizzo delle views e tecniche per creare views personalizzate per esigenze specifiche.