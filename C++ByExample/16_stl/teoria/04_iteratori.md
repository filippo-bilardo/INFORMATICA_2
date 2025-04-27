# Iteratori nella STL

In questa guida, esploreremo gli iteratori della Standard Template Library (STL), che sono oggetti che permettono di accedere agli elementi dei contenitori in modo sequenziale, indipendentemente dalla struttura interna del contenitore.

## Cosa Sono gli Iteratori?

Gli iteratori sono oggetti che fungono da "puntatori generalizzati" per accedere agli elementi dei contenitori. Forniscono un'interfaccia uniforme per attraversare e manipolare gli elementi di diversi tipi di contenitori, nascondendo i dettagli implementativi specifici di ciascun contenitore. Gli iteratori sono uno dei concetti fondamentali della programmazione generica in C++.

## Categorie di Iteratori

La STL definisce diverse categorie di iteratori, ciascuna con un insieme specifico di operazioni supportate. Le categorie formano una gerarchia, dove ogni categoria supporta tutte le operazioni delle categorie precedenti, più alcune operazioni aggiuntive.

### 1. Iteratori di Input

Gli iteratori di input permettono di leggere gli elementi di un contenitore una sola volta, procedendo in avanti.

Operazioni supportate:
- Dereferenziazione per lettura (`*it`)
- Incremento (`++it` o `it++`)
- Confronto di uguaglianza (`it1 == it2`, `it1 != it2`)

Esempio: iteratori restituiti da `std::istream_iterator`.

### 2. Iteratori di Output

Gli iteratori di output permettono di scrivere gli elementi di un contenitore una sola volta, procedendo in avanti.

Operazioni supportate:
- Dereferenziazione per scrittura (`*it = value`)
- Incremento (`++it` o `it++`)

Esempio: iteratori restituiti da `std::ostream_iterator`.

### 3. Iteratori Forward

Gli iteratori forward combinano le capacità degli iteratori di input e output, permettendo di leggere e scrivere gli elementi più volte, procedendo in avanti.

Operazioni supportate:
- Tutte le operazioni degli iteratori di input e output
- Multi-pass: possono essere utilizzati per attraversare più volte la stessa sequenza

Esempio: iteratori restituiti da `std::forward_list`.

### 4. Iteratori Bidirezionali

Gli iteratori bidirezionali estendono gli iteratori forward, permettendo di procedere sia in avanti che indietro.

Operazioni supportate:
- Tutte le operazioni degli iteratori forward
- Decremento (`--it` o `it--`)

Esempio: iteratori restituiti da `std::list`, `std::set`, `std::map`.

### 5. Iteratori ad Accesso Casuale

Gli iteratori ad accesso casuale estendono gli iteratori bidirezionali, permettendo di accedere direttamente a qualsiasi elemento della sequenza.

Operazioni supportate:
- Tutte le operazioni degli iteratori bidirezionali
- Aritmetica degli iteratori (`it + n`, `it - n`, `it += n`, `it -= n`)
- Indicizzazione (`it[n]`)
- Confronto relazionale (`it1 < it2`, `it1 <= it2`, `it1 > it2`, `it1 >= it2`)

Esempio: iteratori restituiti da `std::vector`, `std::deque`, `std::array`.

### 6. Iteratori Contiguous (C++17)

Gli iteratori contiguous estendono gli iteratori ad accesso casuale, garantendo che gli elementi siano memorizzati in posizioni di memoria contigue.

Operazioni supportate:
- Tutte le operazioni degli iteratori ad accesso casuale
- Garanzia di contiguità in memoria

Esempio: iteratori restituiti da `std::vector`, `std::array`, `std::string`.

## Utilizzo degli Iteratori

### Esempio Base: Iterazione attraverso un Contenitore

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    
    // Utilizzo di iteratori espliciti
    std::cout << "Utilizzo di iteratori espliciti: ";
    for (std::vector<int>::iterator it = v.begin(); it != v.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    
    // Utilizzo di auto (C++11)
    std::cout << "Utilizzo di auto: ";
    for (auto it = v.begin(); it != v.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    
    // Utilizzo di ciclo range-based (C++11)
    std::cout << "Utilizzo di ciclo range-based: ";
    for (int num : v) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### Iteratori Inversi

Gli iteratori inversi permettono di attraversare un contenitore all'indietro.

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    
    // Utilizzo di iteratori inversi
    std::cout << "Utilizzo di iteratori inversi: ";
    for (std::vector<int>::reverse_iterator it = v.rbegin(); it != v.rend(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;  // Output: 5 4 3 2 1
    
    // Utilizzo di auto con iteratori inversi (C++11)
    std::cout << "Utilizzo di auto con iteratori inversi: ";
    for (auto it = v.rbegin(); it != v.rend(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;  // Output: 5 4 3 2 1
    
    return 0;
}
```

### Iteratori Costanti

Gli iteratori costanti permettono di accedere agli elementi in sola lettura.

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    
    // Utilizzo di iteratori costanti
    std::cout << "Utilizzo di iteratori costanti: ";
    for (std::vector<int>::const_iterator it = v.cbegin(); it != v.cend(); ++it) {
        std::cout << *it << " ";
        // *it = 10;  // Errore: non è possibile modificare l'elemento
    }
    std::cout << std::endl;
    
    // Utilizzo di auto con iteratori costanti (C++11)
    std::cout << "Utilizzo di auto con iteratori costanti: ";
    for (auto it = v.cbegin(); it != v.cend(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

## Funzioni che Restituiscono Iteratori

Molti contenitori e algoritmi della STL restituiscono iteratori come risultato.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v = {10, 20, 30, 40, 50};
    
    // Ricerca di un elemento
    auto it = std::find(v.begin(), v.end(), 30);
    if (it != v.end()) {
        std::cout << "Elemento 30 trovato alla posizione: " << (it - v.begin()) << std::endl;
    } else {
        std::cout << "Elemento 30 non trovato" << std::endl;
    }
    
    // Ricerca del primo elemento maggiore di 25
    auto it2 = std::find_if(v.begin(), v.end(), [](int n) { return n > 25; });
    if (it2 != v.end()) {
        std::cout << "Primo elemento maggiore di 25: " << *it2 << std::endl;
    }
    
    // Ricerca della posizione di inserimento per mantenere l'ordine
    auto it3 = std::lower_bound(v.begin(), v.end(), 35);  // v deve essere ordinato
    std::cout << "Posizione di inserimento per 35: " << (it3 - v.begin()) << std::endl;
    
    return 0;
}
```

## Invalidazione degli Iteratori

Gli iteratori possono essere invalidati da operazioni che modificano la struttura del contenitore.

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    
    // Ottieni un iteratore al secondo elemento
    auto it = v.begin() + 1;  // Punta a 2
    std::cout << "Elemento puntato: " << *it << std::endl;
    
    // Inserimento di un elemento all'inizio (può invalidare tutti gli iteratori)
    v.insert(v.begin(), 0);
    
    // L'iteratore it è ora invalidato, il suo utilizzo può causare comportamenti indefiniti
    // std::cout << "Elemento puntato dopo insert: " << *it << std::endl;  // Comportamento indefinito!
    
    // Ottieni un nuovo iteratore valido
    it = v.begin() + 2;  // Ora punta a 2
    std::cout << "Nuovo elemento puntato: " << *it << std::endl;
    
    return 0;
}
```

## Regole di Invalidazione degli Iteratori per Diversi Contenitori

| Contenitore | Inserimento | Rimozione |
|-------------|-------------|----------|
| vector      | Invalida tutti gli iteratori se causa riallocazione, altrimenti invalida solo gli iteratori dopo il punto di inserimento | Invalida gli iteratori al punto di rimozione e successivi |
| deque       | Invalida tutti gli iteratori | Invalida tutti gli iteratori |
| list        | Nessun iteratore è invalidato | Invalida solo gli iteratori al punto di rimozione |
| forward_list| Nessun iteratore è invalidato | Invalida solo gli iteratori al punto di rimozione |
| set/map     | Nessun iteratore è invalidato | Invalida solo gli iteratori al punto di rimozione |
| unordered_set/map | Invalida tutti gli iteratori se causa rehashing, altrimenti nessun iteratore è invalidato | Invalida solo gli iteratori al punto di rimozione |

## Adattatori di Iteratori

La STL fornisce adattatori che trasformano un tipo di iteratore in un altro.

### Iteratori di Stream

```cpp
#include <iostream>
#include <iterator>
#include <vector>
#include <algorithm>

int main() {
    // Lettura di numeri dallo standard input
    std::cout << "Inserisci alcuni numeri (termina con un carattere non numerico): ";
    std::istream_iterator<int> input_it(std::cin);
    std::istream_iterator<int> eos;  // End-of-stream iterator
    
    std::vector<int> v(input_it, eos);
    
    // Ordinamento del vettore
    std::sort(v.begin(), v.end());
    
    // Scrittura dei numeri ordinati sullo standard output
    std::cout << "Numeri ordinati: ";
    std::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout, " "));
    std::cout << std::endl;
    
    return 0;
}
```

### Iteratori di Inserimento

```cpp
#include <iostream>
#include <vector>
#include <list>
#include <iterator>
#include <algorithm>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    std::list<int> l;
    
    // Utilizzo di back_inserter per aggiungere elementi alla fine di l
    std::copy(v.begin(), v.end(), std::back_inserter(l));
    
    // Utilizzo di front_inserter per aggiungere elementi all'inizio di l
    std::copy(v.begin(), v.end(), std::front_inserter(l));  // Gli elementi saranno in ordine inverso
    
    // Utilizzo di inserter per aggiungere elementi in una posizione specifica
    auto it = l.begin();
    std::advance(it, 5);  // Avanza l'iteratore di 5 posizioni
    std::copy(v.begin(), v.end(), std::inserter(l, it));
    
    // Stampa degli elementi di l
    std::cout << "Elementi di l: ";
    for (int num : l) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

## Best Practices nell'Uso degli Iteratori

1. **Usa `auto` per dichiarare gli iteratori (C++11)**: Semplifica il codice e riduce gli errori di digitazione.

   ```cpp
   auto it = v.begin();  // Invece di std::vector<int>::iterator it = v.begin();
   ```

2. **Preferisci gli iteratori pre-incremento (`++it`) rispetto a quelli post-incremento (`it++`)**: L'operatore pre-incremento è generalmente più efficiente, soprattutto per iteratori complessi.

3. **Utilizza gli iteratori costanti quando non hai bisogno di modificare gli elementi**:

   ```cpp
   for (auto it = v.cbegin(); it != v.cend(); ++it) {
       // Operazioni di sola lettura
   }
   ```

4. **Verifica sempre la validità degli iteratori dopo operazioni che potrebbero invalidarli**.

5. **Utilizza gli algoritmi della STL invece di cicli espliciti quando possibile**:

   ```cpp
   // Invece di:
   for (auto it = v.begin(); it != v.end(); ++it) {
       *it *= 2;
   }
   
   // Usa:
   std::transform(v.begin(), v.end(), v.begin(), [](int n) { return n * 2; });
   ```

6. **Considera l'uso di cicli range-based (C++11) per semplicità**:

   ```cpp
   for (auto& elem : v) {
       elem *= 2;
   }
   ```

## Domande di Autovalutazione

1. Quali sono le principali categorie di iteratori nella STL e come differiscono tra loro?
2. Cosa significa "invalidazione degli iteratori" e quali operazioni possono causarla?
3. Quali sono le differenze tra `begin()`, `cbegin()`, `rbegin()` e `crbegin()`?
4. Come funzionano gli adattatori di iteratori e in quali situazioni sono utili?
5. Perché è generalmente preferibile utilizzare `++it` invece di `it++` quando si lavora con gli iteratori?

## Esercizi Proposti

1. Scrivi un programma che utilizzi iteratori per trovare e rimuovere tutti gli elementi pari da un `std::list<int>`.
2. Implementa una funzione template che accetti due iteratori di input e calcoli la media degli elementi nell'intervallo.
3. Scrivi un programma che utilizzi `std::istream_iterator` e `std::ostream_iterator` per copiare il contenuto di un file di testo in un altro file, convertendo tutte le lettere in maiuscolo.
4. Implementa un algoritmo di ordinamento personalizzato (ad esempio, bubble sort) utilizzando iteratori ad accesso casuale.
5. Scrivi una funzione che utilizzi iteratori per unire due contenitori ordinati in un terzo contenitore, mantenendo l'ordine (simile a `std::merge`).

## Conclusione

Gli iteratori sono uno dei concetti fondamentali della STL e della programmazione generica in C++. Forniscono un'interfaccia uniforme per accedere agli elementi dei contenitori, indipendentemente dalla loro struttura interna, permettendo di scrivere algoritmi generici che funzionano con diversi tipi di contenitori. Comprendere le diverse categorie di iteratori e le loro caratteristiche è essenziale per utilizzare efficacemente la STL e scrivere codice C++ moderno e idiomatico.