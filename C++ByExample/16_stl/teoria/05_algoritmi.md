# Algoritmi nella STL

In questa guida, esploreremo gli algoritmi della Standard Template Library (STL), che sono funzioni template che operano su intervalli di elementi definiti da coppie di iteratori.

## Cosa Sono gli Algoritmi della STL?

Gli algoritmi della STL sono funzioni generiche che implementano operazioni comuni come ricerca, ordinamento, trasformazione, conteggio e manipolazione di elementi in contenitori. Questi algoritmi sono indipendenti dal tipo di contenitore e funzionano con qualsiasi struttura dati che supporti gli iteratori richiesti dall'algoritmo specifico.

La maggior parte degli algoritmi della STL è definita nell'header `<algorithm>`, mentre alcuni algoritmi numerici sono definiti in `<numeric>`.

## Categorie di Algoritmi

### 1. Algoritmi Non-Modificanti

Questi algoritmi non modificano gli elementi nell'intervallo su cui operano.

#### Algoritmi di Ricerca

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v = {10, 20, 30, 40, 50, 30, 20, 10};
    
    // find: trova la prima occorrenza di un elemento
    auto it1 = std::find(v.begin(), v.end(), 30);
    if (it1 != v.end()) {
        std::cout << "Elemento 30 trovato alla posizione: " << (it1 - v.begin()) << std::endl;
    }
    
    // find_if: trova il primo elemento che soddisfa un predicato
    auto it2 = std::find_if(v.begin(), v.end(), [](int n) { return n > 25; });
    if (it2 != v.end()) {
        std::cout << "Primo elemento > 25: " << *it2 << " alla posizione: " << (it2 - v.begin()) << std::endl;
    }
    
    // count: conta le occorrenze di un elemento
    int count_30 = std::count(v.begin(), v.end(), 30);
    std::cout << "Numero di occorrenze di 30: " << count_30 << std::endl;
    
    // count_if: conta gli elementi che soddisfano un predicato
    int count_even = std::count_if(v.begin(), v.end(), [](int n) { return n % 2 == 0; });
    std::cout << "Numero di elementi pari: " << count_even << std::endl;
    
    // search: cerca una sottosequenza
    std::vector<int> sub = {30, 40, 50};
    auto it3 = std::search(v.begin(), v.end(), sub.begin(), sub.end());
    if (it3 != v.end()) {
        std::cout << "Sottosequenza trovata alla posizione: " << (it3 - v.begin()) << std::endl;
    }
    
    return 0;
}
```

#### Algoritmi di Confronto

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v1 = {10, 20, 30, 40, 50};
    std::vector<int> v2 = {10, 20, 30, 40, 50};
    std::vector<int> v3 = {50, 40, 30, 20, 10};
    
    // equal: verifica se due intervalli sono uguali
    bool equal_v1_v2 = std::equal(v1.begin(), v1.end(), v2.begin());
    std::cout << "v1 e v2 sono uguali: " << (equal_v1_v2 ? "sì" : "no") << std::endl;
    
    // mismatch: trova la prima posizione in cui due intervalli differiscono
    auto [it1, it2] = std::mismatch(v1.begin(), v1.end(), v3.begin());
    if (it1 != v1.end()) {
        std::cout << "Prima differenza: " << *it1 << " vs " << *it2 << std::endl;
    }
    
    // lexicographical_compare: confronto lessicografico
    bool v1_less_v3 = std::lexicographical_compare(v1.begin(), v1.end(), v3.begin(), v3.end());
    std::cout << "v1 è lessicograficamente minore di v3: " << (v1_less_v3 ? "sì" : "no") << std::endl;
    
    return 0;
}
```

### 2. Algoritmi Modificanti

Questi algoritmi modificano gli elementi nell'intervallo su cui operano.

#### Algoritmi di Trasformazione

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v1 = {1, 2, 3, 4, 5};
    std::vector<int> v2 = {10, 20, 30, 40, 50};
    std::vector<int> result(5);
    
    // transform: applica una funzione a ogni elemento
    std::transform(v1.begin(), v1.end(), v1.begin(), [](int n) { return n * 2; });
    std::cout << "v1 dopo transform: ";
    for (int n : v1) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // transform con due intervalli di input
    std::transform(v1.begin(), v1.end(), v2.begin(), result.begin(), [](int a, int b) { return a + b; });
    std::cout << "result dopo transform: ";
    for (int n : result) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

#### Algoritmi di Copia e Rimozione

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>

int main() {
    std::vector<int> v1 = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    std::vector<int> v2(5);
    
    // copy: copia elementi da un intervallo a un altro
    std::copy(v1.begin(), v1.begin() + 5, v2.begin());
    std::cout << "v2 dopo copy: ";
    for (int n : v2) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // copy_if: copia elementi che soddisfano un predicato
    std::vector<int> v3;
    std::copy_if(v1.begin(), v1.end(), std::back_inserter(v3), [](int n) { return n % 2 == 0; });
    std::cout << "v3 dopo copy_if (elementi pari): ";
    for (int n : v3) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // remove: rimuove elementi uguali a un valore
    auto new_end = std::remove(v1.begin(), v1.end(), 5);
    v1.erase(new_end, v1.end());  // Rimuove effettivamente gli elementi
    std::cout << "v1 dopo remove(5): ";
    for (int n : v1) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // remove_if: rimuove elementi che soddisfano un predicato
    new_end = std::remove_if(v1.begin(), v1.end(), [](int n) { return n > 7; });
    v1.erase(new_end, v1.end());
    std::cout << "v1 dopo remove_if(> 7): ";
    for (int n : v1) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

#### Algoritmi di Riempimento e Generazione

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <random>

int main() {
    std::vector<int> v1(10);
    
    // fill: riempie un intervallo con un valore
    std::fill(v1.begin(), v1.end(), 42);
    std::cout << "v1 dopo fill: ";
    for (int n : v1) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // generate: riempie un intervallo con i risultati di una funzione
    int i = 0;
    std::generate(v1.begin(), v1.end(), [&i]() { return i++; });
    std::cout << "v1 dopo generate: ";
    for (int n : v1) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // iota (da <numeric>): riempie un intervallo con valori incrementali
    std::vector<int> v2(10);
    std::iota(v2.begin(), v2.end(), 100);  // Inizia da 100
    std::cout << "v2 dopo iota: ";
    for (int n : v2) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // shuffle: mescola casualmente gli elementi
    std::random_device rd;
    std::mt19937 g(rd());
    std::shuffle(v2.begin(), v2.end(), g);
    std::cout << "v2 dopo shuffle: ";
    for (int n : v2) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 3. Algoritmi di Ordinamento e Operazioni Correlate

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v1 = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    
    // sort: ordina gli elementi
    std::sort(v1.begin(), v1.end());
    std::cout << "v1 dopo sort: ";
    for (int n : v1) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // sort con comparatore personalizzato
    std::sort(v1.begin(), v1.end(), std::greater<int>());
    std::cout << "v1 dopo sort (decrescente): ";
    for (int n : v1) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // partial_sort: ordina solo una parte dell'intervallo
    std::vector<int> v2 = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    std::partial_sort(v2.begin(), v2.begin() + 4, v2.end());
    std::cout << "v2 dopo partial_sort: ";
    for (int n : v2) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // nth_element: riorganizza in modo che l'n-esimo elemento sia in posizione
    std::vector<int> v3 = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    std::nth_element(v3.begin(), v3.begin() + 4, v3.end());
    std::cout << "v3 dopo nth_element: ";
    for (int n : v3) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    std::cout << "5° elemento (indice 4): " << v3[4] << std::endl;
    
    // is_sorted: verifica se un intervallo è ordinato
    bool sorted = std::is_sorted(v1.begin(), v1.end(), std::greater<int>());
    std::cout << "v1 è ordinato in modo decrescente: " << (sorted ? "sì" : "no") << std::endl;
    
    return 0;
}
```

### 4. Algoritmi di Ricerca Binaria (su intervalli ordinati)

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v = {10, 20, 30, 40, 50, 60, 70, 80, 90};
    
    // binary_search: verifica se un elemento è presente
    bool has_30 = std::binary_search(v.begin(), v.end(), 30);
    bool has_35 = std::binary_search(v.begin(), v.end(), 35);
    std::cout << "30 è presente: " << (has_30 ? "sì" : "no") << std::endl;
    std::cout << "35 è presente: " << (has_35 ? "sì" : "no") << std::endl;
    
    // lower_bound: trova il primo elemento non inferiore a un valore
    auto it1 = std::lower_bound(v.begin(), v.end(), 35);
    std::cout << "lower_bound di 35: " << *it1 << " alla posizione " << (it1 - v.begin()) << std::endl;
    
    // upper_bound: trova il primo elemento superiore a un valore
    auto it2 = std::upper_bound(v.begin(), v.end(), 30);
    std::cout << "upper_bound di 30: " << *it2 << " alla posizione " << (it2 - v.begin()) << std::endl;
    
    // equal_range: restituisce una coppia di iteratori (lower_bound, upper_bound)
    auto [first, last] = std::equal_range(v.begin(), v.end(), 30);
    std::cout << "equal_range di 30: da " << (first - v.begin()) << " a " << (last - v.begin()) << std::endl;
    
    return 0;
}
```

### 5. Algoritmi di Partizione

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // partition: riorganizza gli elementi in modo che quelli che soddisfano il predicato vengano prima
    auto it = std::partition(v.begin(), v.end(), [](int n) { return n % 2 == 0; });
    std::cout << "v dopo partition (pari prima): ";
    for (int n : v) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    std::cout << "Primo elemento che non soddisfa il predicato: " << *it << std::endl;
    
    // stable_partition: come partition, ma mantiene l'ordine relativo
    std::vector<int> v2 = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    std::stable_partition(v2.begin(), v2.end(), [](int n) { return n % 2 == 0; });
    std::cout << "v2 dopo stable_partition (pari prima): ";
    for (int n : v2) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // partition_point: trova il punto di partizione
    std::vector<int> v3 = {2, 4, 6, 8, 1, 3, 5, 7, 9};
    auto it3 = std::partition_point(v3.begin(), v3.end(), [](int n) { return n % 2 == 0; });
    std::cout << "Punto di partizione in v3: " << (it3 - v3.begin()) << std::endl;
    
    return 0;
}
```

### 6. Algoritmi Numerici

```cpp
#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    
    // accumulate: calcola la somma degli elementi
    int sum = std::accumulate(v.begin(), v.end(), 0);
    std::cout << "Somma: " << sum << std::endl;
    
    // accumulate con operazione personalizzata (prodotto)
    int product = std::accumulate(v.begin(), v.end(), 1, std::multiplies<int>());
    std::cout << "Prodotto: " << product << std::endl;
    
    // inner_product: calcola il prodotto scalare
    std::vector<int> v2 = {10, 20, 30, 40, 50};
    int inner_prod = std::inner_product(v.begin(), v.end(), v2.begin(), 0);
    std::cout << "Prodotto scalare: " << inner_prod << std::endl;
    
    // adjacent_difference: calcola le differenze tra elementi adiacenti
    std::vector<int> diffs(v.size());
    std::adjacent_difference(v.begin(), v.end(), diffs.begin());
    std::cout << "Differenze adiacenti: ";
    for (int n : diffs) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // partial_sum: calcola le somme parziali
    std::vector<int> sums(v.size());
    std::partial_sum(v.begin(), v.end(), sums.begin());
    std::cout << "Somme parziali: ";
    for (int n : sums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 7. Algoritmi di Operazioni su Insiemi (su intervalli ordinati)

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>

int main() {
    std::vector<int> v1 = {1, 2, 3, 4, 5};
    std::vector<int> v2 = {4, 5, 6, 7, 8};
    std::vector<int> result;
    
    // set_union: unione di due insiemi
    std::set_union(v1.begin(), v1.end(), v2.begin(), v2.end(), std::back_inserter(result));
    std::cout << "Unione: ";
    for (int n : result) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // set_intersection: intersezione di due insiemi
    result.clear();
    std::set_intersection(v1.begin(), v1.end(), v2.begin(), v2.end(), std::back_inserter(result));
    std::cout << "Intersezione: ";
    for (int n : result) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // set_difference: differenza di due insiemi
    result.clear();
    std::set_difference(v1.begin(), v1.end(), v2.begin(), v2.end(), std::back_inserter(result));
    std::cout << "Differenza (v1 - v2): ";
    for (int n : result) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // set_symmetric_difference: differenza simmetrica di due insiemi
    result.clear();
    std::set_symmetric_difference(v1.begin(), v1.end(), v2.begin(), v2.end(), std::back_inserter(result));
    std::cout << "Differenza simmetrica: ";
    for (int n : result) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // includes: verifica se un insieme è incluso in un altro
    std::vector<int> v3 = {2, 3, 4};
    bool v3_in_v1 = std::includes(v1.begin(), v1.end(), v3.begin(), v3.end());
    std::cout << "v3 è incluso in v1: " << (v3_in_v1 ? "sì" : "no") << std::endl;
    
    return 0;
}
```

## Algoritmi Paralleli (C++17)

C++17 ha introdotto versioni parallele di molti algoritmi della STL, che possono essere eseguite in parallelo su più thread.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <execution>  // Per le policy di esecuzione
#include <chrono>

int main() {
    // Crea un vettore grande
    std::vector<int> v(10000000);
    std::iota(v.begin(), v.end(), 0);
    
    // Misura il tempo di esecuzione sequenziale
    auto start = std::chrono::high_resolution_clock::now();
    std::sort(std::execution::seq, v.begin(), v.end(), std::greater<int>());
    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> seq_time = end - start;
    
    // Misura il tempo di esecuzione parallelo
    start = std::chrono::high_resolution_clock::now();
    std::sort(std::execution::par, v.begin(), v.end());
    end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> par_time = end - start;
    
    std::cout << "Tempo sequenziale: " << seq_time.count() << " secondi" << std::endl;
    std::cout << "Tempo parallelo: " << par_time.count() << " secondi" << std::endl;
    
    return 0;
}
```

## Best Practices nell'Uso degli Algoritmi

1. **Preferisci gli algoritmi della STL ai cicli manuali**: Gli algoritmi della STL sono testati, ottimizzati e spesso più leggibili di cicli manuali.

2. **Utilizza gli algoritmi appropriati per il tuo caso d'uso**: Scegli l'algoritmo che meglio si adatta al tuo problema specifico.

3. **Considera le complessità temporali e spaziali**: Alcuni algoritmi possono essere più efficienti di altri per determinate operazioni o dimensioni di dati.

4. **Utilizza i predicati e i functori per personalizzare il comportamento**: Gli algoritmi della STL sono flessibili e possono essere adattati alle tue esigenze specifiche.

5. **Considera l'uso di algoritmi paralleli per grandi set di dati**: Se stai lavorando con grandi quantità di dati, gli algoritmi paralleli possono offrire significativi miglioramenti delle prestazioni.

6. **Fai attenzione all'invalidazione degli iteratori**: Alcuni algoritmi possono invalidare gli iteratori, quindi assicurati di utilizzare iteratori validi.

7. **Utilizza gli adattatori di iteratori quando appropriato**: Gli adattatori come `back_inserter` possono semplificare l'uso di alcuni algoritmi.

## Domande di Autovalutazione

1. Quali sono le principali categorie di algoritmi nella STL?
2. Qual è la differenza tra `std::find` e `std::binary_search`?
3. Come funzionano gli algoritmi di rimozione come `std::remove` e perché è comune utilizzarli insieme a `erase`?
4. Quali sono i vantaggi degli algoritmi paralleli introdotti in C++17?
5. Come possono essere personalizzati gli algoritmi della STL per adattarsi a esigenze specifiche?

## Esercizi Proposti

1. Scrivi un programma che utilizzi `std::transform` per convertire un vettore di stringhe in un vettore di interi, dove ogni intero rappresenta la lunghezza della stringa corrispondente.
2. Implementa una funzione che utilizzi `std::partition` per separare i numeri pari e dispari in un vettore, quindi ordina separatamente le due partizioni.
3. Scrivi un programma che utilizzi `std::accumulate` con un functor personalizzato per calcolare la media di un vettore di numeri.
4. Implementa una funzione che utilizzi `std::set_intersection` e `std::set_difference` per trovare gli elementi comuni e unici di due vettori.
5. Scrivi un programma che confronti le prestazioni di `std::sort` sequenziale e parallelo su vettori di diverse dimensioni.

## Conclusione

Gli algoritmi della STL sono uno strumento potente e versatile per manipolare dati in modo efficiente e leggibile. Forniscono implementazioni ottimizzate di operazioni comuni, permettendo di scrivere codice più conciso, più manutenibile e spesso più efficiente. Comprendere e utilizzare efficacemente questi algoritmi è una competenza essenziale per qualsiasi programmatore C++ moderno.