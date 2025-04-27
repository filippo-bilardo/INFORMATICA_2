# Contenitori Associativi nella STL

In questa guida, esploreremo i contenitori associativi della Standard Template Library (STL), che sono strutture dati che memorizzano coppie chiave-valore o valori unici in un ordine determinato dalla chiave o dal valore stesso.

## Cosa Sono i Contenitori Associativi?

I contenitori associativi sono strutture dati che permettono di memorizzare e recuperare elementi in base a una chiave, piuttosto che in base alla posizione. Questi contenitori mantengono automaticamente un ordinamento interno degli elementi, facilitando operazioni come la ricerca, l'inserimento e la rimozione. La STL fornisce due categorie principali di contenitori associativi: ordinati e non ordinati (hash).

## Contenitori Associativi Ordinati

I contenitori associativi ordinati utilizzano un albero binario di ricerca bilanciato (tipicamente un albero rosso-nero) per mantenere gli elementi ordinati in base alla chiave.

### 1. Set (`std::set`)

Un contenitore che memorizza valori unici in ordine crescente.

```cpp
#include <iostream>
#include <set>

int main() {
    // Creazione di un set vuoto
    std::set<int> s1;
    
    // Inserimento di elementi
    s1.insert(30);
    s1.insert(10);
    s1.insert(50);
    s1.insert(20);
    s1.insert(10);  // Duplicato, non verrà inserito
    
    // Verifica della dimensione
    std::cout << "Dimensione del set: " << s1.size() << std::endl;
    
    // Verifica se un elemento è presente
    if (s1.find(20) != s1.end()) {
        std::cout << "L'elemento 20 è presente nel set" << std::endl;
    }
    
    // Rimozione di un elemento
    s1.erase(30);
    
    // Iterazione (gli elementi saranno in ordine crescente)
    std::cout << "Elementi del set: ";
    for (int num : s1) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

#### Vantaggi di `std::set`:
- Mantiene automaticamente gli elementi ordinati
- Garantisce l'unicità degli elementi
- Ricerca, inserimento e rimozione in tempo logaritmico O(log n)

#### Svantaggi di `std::set`:
- Più lento di un array o un vector per l'accesso sequenziale
- Maggiore overhead di memoria rispetto a strutture dati più semplici

### 2. Map (`std::map`)

Un contenitore che memorizza coppie chiave-valore uniche, ordinate in base alla chiave.

```cpp
#include <iostream>
#include <map>
#include <string>

int main() {
    // Creazione di una map vuota
    std::map<std::string, int> m1;
    
    // Inserimento di elementi
    m1["uno"] = 1;
    m1["due"] = 2;
    m1["tre"] = 3;
    m1.insert({"quattro", 4});  // Inserimento con una coppia
    
    // Accesso agli elementi
    std::cout << "m1[\"due\"] = " << m1["due"] << std::endl;
    
    // Modifica di un elemento
    m1["tre"] = 33;
    
    // Verifica se una chiave è presente
    if (m1.find("quattro") != m1.end()) {
        std::cout << "La chiave 'quattro' è presente nella map" << std::endl;
    }
    
    // Rimozione di un elemento
    m1.erase("uno");
    
    // Iterazione (gli elementi saranno ordinati in base alla chiave)
    std::cout << "Elementi della map:" << std::endl;
    for (const auto& pair : m1) {
        std::cout << pair.first << ": " << pair.second << std::endl;
    }
    
    return 0;
}
```

#### Vantaggi di `std::map`:
- Mantiene automaticamente le coppie chiave-valore ordinate in base alla chiave
- Garantisce l'unicità delle chiavi
- Ricerca, inserimento e rimozione in tempo logaritmico O(log n)

#### Svantaggi di `std::map`:
- Più lento di un array o un vector per l'accesso sequenziale
- Maggiore overhead di memoria rispetto a strutture dati più semplici

### 3. Multiset (`std::multiset`)

Simile a `std::set`, ma permette elementi duplicati.

```cpp
#include <iostream>
#include <set>

int main() {
    // Creazione di un multiset vuoto
    std::multiset<int> ms1;
    
    // Inserimento di elementi
    ms1.insert(10);
    ms1.insert(20);
    ms1.insert(10);  // Duplicato, verrà inserito
    ms1.insert(30);
    
    // Verifica della dimensione
    std::cout << "Dimensione del multiset: " << ms1.size() << std::endl;
    
    // Conteggio delle occorrenze di un elemento
    std::cout << "Occorrenze di 10: " << ms1.count(10) << std::endl;
    
    // Rimozione di tutte le occorrenze di un elemento
    ms1.erase(10);
    
    // Iterazione (gli elementi saranno in ordine crescente)
    std::cout << "Elementi del multiset: ";
    for (int num : ms1) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 4. Multimap (`std::multimap`)

Simile a `std::map`, ma permette chiavi duplicate.

```cpp
#include <iostream>
#include <map>
#include <string>

int main() {
    // Creazione di una multimap vuota
    std::multimap<std::string, int> mm1;
    
    // Inserimento di elementi
    mm1.insert({"a", 10});
    mm1.insert({"b", 20});
    mm1.insert({"a", 30});  // Chiave duplicata, verrà inserita
    
    // Verifica della dimensione
    std::cout << "Dimensione della multimap: " << mm1.size() << std::endl;
    
    // Conteggio delle occorrenze di una chiave
    std::cout << "Occorrenze della chiave 'a': " << mm1.count("a") << std::endl;
    
    // Iterazione (gli elementi saranno ordinati in base alla chiave)
    std::cout << "Elementi della multimap:" << std::endl;
    for (const auto& pair : mm1) {
        std::cout << pair.first << ": " << pair.second << std::endl;
    }
    
    // Accesso a tutti gli elementi con una chiave specifica
    auto range = mm1.equal_range("a");
    std::cout << "Elementi con chiave 'a':" << std::endl;
    for (auto it = range.first; it != range.second; ++it) {
        std::cout << it->first << ": " << it->second << std::endl;
    }
    
    return 0;
}
```

## Contenitori Associativi Non Ordinati (C++11)

I contenitori associativi non ordinati utilizzano tabelle hash per memorizzare gli elementi, offrendo operazioni in tempo costante medio O(1) a scapito dell'ordinamento.

### 1. Unordered Set (`std::unordered_set`)

Un contenitore che memorizza valori unici senza un ordine specifico, utilizzando una tabella hash.

```cpp
#include <iostream>
#include <unordered_set>

int main() {
    // Creazione di un unordered_set vuoto
    std::unordered_set<int> us1;
    
    // Inserimento di elementi
    us1.insert(30);
    us1.insert(10);
    us1.insert(50);
    us1.insert(20);
    us1.insert(10);  // Duplicato, non verrà inserito
    
    // Verifica della dimensione
    std::cout << "Dimensione dell'unordered_set: " << us1.size() << std::endl;
    
    // Verifica se un elemento è presente
    if (us1.find(20) != us1.end()) {
        std::cout << "L'elemento 20 è presente nell'unordered_set" << std::endl;
    }
    
    // Rimozione di un elemento
    us1.erase(30);
    
    // Iterazione (l'ordine non è garantito)
    std::cout << "Elementi dell'unordered_set: ";
    for (int num : us1) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Informazioni sulla tabella hash
    std::cout << "Numero di bucket: " << us1.bucket_count() << std::endl;
    std::cout << "Fattore di carico: " << us1.load_factor() << std::endl;
    
    return 0;
}
```

#### Vantaggi di `std::unordered_set`:
- Ricerca, inserimento e rimozione in tempo costante medio O(1)
- Garantisce l'unicità degli elementi

#### Svantaggi di `std::unordered_set`:
- Non mantiene gli elementi ordinati
- Prestazioni possono degradare con un alto fattore di carico
- Maggiore overhead di memoria rispetto a `std::set`

### 2. Unordered Map (`std::unordered_map`)

Un contenitore che memorizza coppie chiave-valore uniche senza un ordine specifico, utilizzando una tabella hash.

```cpp
#include <iostream>
#include <unordered_map>
#include <string>

int main() {
    // Creazione di una unordered_map vuota
    std::unordered_map<std::string, int> um1;
    
    // Inserimento di elementi
    um1["uno"] = 1;
    um1["due"] = 2;
    um1["tre"] = 3;
    um1.insert({"quattro", 4});
    
    // Accesso agli elementi
    std::cout << "um1[\"due\"] = " << um1["due"] << std::endl;
    
    // Verifica se una chiave è presente
    if (um1.find("quattro") != um1.end()) {
        std::cout << "La chiave 'quattro' è presente nell'unordered_map" << std::endl;
    }
    
    // Rimozione di un elemento
    um1.erase("uno");
    
    // Iterazione (l'ordine non è garantito)
    std::cout << "Elementi dell'unordered_map:" << std::endl;
    for (const auto& pair : um1) {
        std::cout << pair.first << ": " << pair.second << std::endl;
    }
    
    return 0;
}
```

### 3. Unordered Multiset (`std::unordered_multiset`)

Simile a `std::unordered_set`, ma permette elementi duplicati.

```cpp
#include <iostream>
#include <unordered_set>

int main() {
    // Creazione di un unordered_multiset vuoto
    std::unordered_multiset<int> ums1;
    
    // Inserimento di elementi
    ums1.insert(10);
    ums1.insert(20);
    ums1.insert(10);  // Duplicato, verrà inserito
    ums1.insert(30);
    
    // Verifica della dimensione
    std::cout << "Dimensione dell'unordered_multiset: " << ums1.size() << std::endl;
    
    // Conteggio delle occorrenze di un elemento
    std::cout << "Occorrenze di 10: " << ums1.count(10) << std::endl;
    
    // Iterazione (l'ordine non è garantito)
    std::cout << "Elementi dell'unordered_multiset: ";
    for (int num : ums1) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 4. Unordered Multimap (`std::unordered_multimap`)

Simile a `std::unordered_map`, ma permette chiavi duplicate.

```cpp
#include <iostream>
#include <unordered_map>
#include <string>

int main() {
    // Creazione di una unordered_multimap vuota
    std::unordered_multimap<std::string, int> umm1;
    
    // Inserimento di elementi
    umm1.insert({"a", 10});
    umm1.insert({"b", 20});
    umm1.insert({"a", 30});  // Chiave duplicata, verrà inserita
    
    // Verifica della dimensione
    std::cout << "Dimensione dell'unordered_multimap: " << umm1.size() << std::endl;
    
    // Conteggio delle occorrenze di una chiave
    std::cout << "Occorrenze della chiave 'a': " << umm1.count("a") << std::endl;
    
    // Iterazione (l'ordine non è garantito)
    std::cout << "Elementi dell'unordered_multimap:" << std::endl;
    for (const auto& pair : umm1) {
        std::cout << pair.first << ": " << pair.second << std::endl;
    }
    
    return 0;
}
```

## Confronto tra Contenitori Associativi

| Contenitore | Elementi Duplicati | Ordinamento | Complessità Media di Ricerca/Inserimento/Rimozione |
|-------------|-------------------|-------------|---------------------------------------------------|
| set         | No                | Sì (chiave) | O(log n)                                          |
| map         | No (chiave)       | Sì (chiave) | O(log n)                                          |
| multiset    | Sì                | Sì (chiave) | O(log n)                                          |
| multimap    | Sì (chiave)       | Sì (chiave) | O(log n)                                          |
| unordered_set | No              | No          | O(1)                                              |
| unordered_map | No (chiave)     | No          | O(1)                                              |
| unordered_multiset | Sì         | No          | O(1)                                              |
| unordered_multimap | Sì (chiave) | No          | O(1)                                              |

## Quando Utilizzare Ciascun Contenitore

- **set/map**: Quando hai bisogno di mantenere gli elementi ordinati e di operazioni di ricerca, inserimento e rimozione efficienti.
- **multiset/multimap**: Quando hai bisogno di elementi duplicati e di mantenerli ordinati.
- **unordered_set/unordered_map**: Quando hai bisogno di operazioni di ricerca, inserimento e rimozione molto veloci e l'ordine degli elementi non è importante.
- **unordered_multiset/unordered_multimap**: Quando hai bisogno di elementi duplicati e di operazioni molto veloci, senza preoccuparti dell'ordine.

## Domande di Autovalutazione

1. Quali sono le differenze principali tra contenitori associativi ordinati e non ordinati?
2. In quali situazioni è preferibile utilizzare `std::map` rispetto a `std::unordered_map`?
3. Quali sono i vantaggi di `std::multiset` rispetto a `std::set`?
4. Come funziona internamente una tabella hash e quali fattori possono influenzare le sue prestazioni?
5. Quali sono le complessità temporali delle operazioni comuni sui contenitori associativi?

## Esercizi Proposti

1. Scrivi un programma che conti la frequenza di ogni parola in un testo utilizzando `std::map` e `std::unordered_map`, e confronta le prestazioni.
2. Implementa un dizionario multilingue utilizzando `std::multimap` dove la chiave è la parola in italiano e il valore è la traduzione in un'altra lingua.
3. Scrivi una funzione che rimuova tutti i duplicati da un vettore utilizzando `std::set` e restituisca un nuovo vettore con elementi unici.
4. Implementa una cache LRU (Least Recently Used) utilizzando `std::unordered_map` e una lista per tenere traccia dell'ordine di utilizzo.
5. Crea un programma che utilizzi `std::multiset` per implementare un sistema di priorità, dove gli elementi con lo stesso valore di priorità vengono gestiti in ordine FIFO.

## Conclusione

I contenitori associativi della STL offrono potenti strumenti per memorizzare e manipolare dati in base a chiavi o valori, con diverse caratteristiche di prestazione e comportamento. La scelta del contenitore giusto dipende dalle operazioni che prevedi di eseguire più frequentemente, dall'importanza dell'ordinamento e dalla necessità di gestire elementi duplicati. Nei prossimi capitoli, esploreremo altri componenti della STL e come utilizzarli efficacemente nei tuoi programmi.