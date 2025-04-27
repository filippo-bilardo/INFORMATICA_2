# std::shared_ptr in C++

In questa guida, esploreremo in dettaglio `std::shared_ptr`, uno smart pointer che implementa la semantica di proprietà condivisa di una risorsa, permettendo a più puntatori di condividere la stessa risorsa allocata dinamicamente.

## Cos'è std::shared_ptr?

`std::shared_ptr` è uno smart pointer che mantiene un conteggio dei riferimenti all'oggetto che gestisce. È definito nell'header `<memory>` e fa parte della libreria standard C++ a partire da C++11.

Le caratteristiche principali di `std::shared_ptr` sono:

1. **Proprietà condivisa**: Più `shared_ptr` possono possedere lo stesso oggetto contemporaneamente.
2. **Conteggio dei riferimenti**: Tiene traccia di quanti `shared_ptr` puntano all'oggetto.
3. **Deallocazione automatica**: L'oggetto viene deallocato solo quando l'ultimo `shared_ptr` che lo possiede viene distrutto o reimpostato.
4. **Thread-safety parziale**: Il conteggio dei riferimenti è thread-safe, ma l'accesso all'oggetto condiviso non lo è.

## Creazione e Utilizzo Base

```cpp
#include <iostream>
#include <memory>

class Risorsa {
public:
    Risorsa(int id) : id_(id) {
        std::cout << "Risorsa " << id_ << " costruita" << std::endl;
    }
    
    ~Risorsa() {
        std::cout << "Risorsa " << id_ << " distrutta" << std::endl;
    }
    
    void utilizza() {
        std::cout << "Risorsa " << id_ << " utilizzata" << std::endl;
    }
    
private:
    int id_;
};

int main() {
    // Creazione di un shared_ptr con make_shared (raccomandato)
    std::shared_ptr<Risorsa> ptr1 = std::make_shared<Risorsa>(1);
    
    // Creazione di un altro shared_ptr che condivide la proprietà
    std::shared_ptr<Risorsa> ptr2 = ptr1;  // Il conteggio dei riferimenti diventa 2
    
    // Creazione di un shared_ptr con costruttore esplicito (meno efficiente)
    std::shared_ptr<Risorsa> ptr3(new Risorsa(2));
    
    // Utilizzo dell'oggetto attraverso i puntatori
    ptr1->utilizza();
    ptr2->utilizza();  // Stesso oggetto di ptr1
    ptr3->utilizza();  // Oggetto diverso
    
    // Verifica del conteggio dei riferimenti
    std::cout << "Conteggio riferimenti ptr1: " << ptr1.use_count() << std::endl;  // 2
    std::cout << "Conteggio riferimenti ptr3: " << ptr3.use_count() << std::endl;  // 1
    
    // ptr1 e ptr2 condividono la stessa risorsa
    std::cout << "ptr1 e ptr2 puntano allo stesso oggetto: " 
              << (ptr1 == ptr2 ? "sì" : "no") << std::endl;  // sì
    
    // Reimpostazione di ptr1
    ptr1.reset();
    std::cout << "Dopo reset di ptr1, conteggio riferimenti ptr2: " 
              << ptr2.use_count() << std::endl;  // 1
    
    // Alla fine dello scope, ptr2 e ptr3 vengono distrutti
    // e le risorse vengono deallocate automaticamente
    return 0;
}
```

Output:
```
Risorsa 1 costruita
Risorsa 2 costruita
Risorsa 1 utilizzata
Risorsa 1 utilizzata
Risorsa 2 utilizzata
Conteggio riferimenti ptr1: 2
Conteggio riferimenti ptr3: 1
ptr1 e ptr2 puntano allo stesso oggetto: sì
Dopo reset di ptr1, conteggio riferimenti ptr2: 1
Risorsa 2 distrutta
Risorsa 1 distrutta
```

## Vantaggi di std::make_shared

È preferibile utilizzare `std::make_shared` invece di `new` per creare un `shared_ptr` per diversi motivi:

1. **Efficienza di memoria**: `make_shared` alloca la memoria per l'oggetto e per il blocco di controllo in un'unica operazione, riducendo l'overhead.
2. **Sicurezza contro le eccezioni**: Previene potenziali memory leak in caso di eccezioni.
3. **Sintassi più pulita**: Evita la ripetizione del tipo.

```cpp
// Preferibile
std::shared_ptr<Risorsa> ptr = std::make_shared<Risorsa>(42);

// Meno efficiente
std::shared_ptr<Risorsa> ptr(new Risorsa(42));
```

## Conteggio dei Riferimenti

Il `shared_ptr` mantiene due conteggi:

1. **Conteggio dei riferimenti forte**: Il numero di `shared_ptr` che possiedono l'oggetto.
2. **Conteggio dei riferimenti debole**: Il numero di `weak_ptr` che osservano l'oggetto (vedremo i `weak_ptr` nel prossimo capitolo).

Puoi accedere al conteggio dei riferimenti forte con il metodo `use_count()`:

```cpp
std::shared_ptr<int> ptr1 = std::make_shared<int>(42);
std::shared_ptr<int> ptr2 = ptr1;

std::cout << ptr1.use_count() << std::endl;  // Output: 2
```

## Passaggio di shared_ptr a Funzioni

Quando passi un `shared_ptr` a una funzione, puoi scegliere di passarlo per valore o per riferimento, a seconda delle tue esigenze:

```cpp
// Passaggio per valore: incrementa il conteggio dei riferimenti
void funzione1(std::shared_ptr<Risorsa> ptr) {
    // La funzione ottiene una copia del shared_ptr
    // Il conteggio dei riferimenti viene incrementato
    ptr->utilizza();
}  // Il conteggio viene decrementato quando la funzione termina

// Passaggio per riferimento: non incrementa il conteggio
void funzione2(const std::shared_ptr<Risorsa>& ptr) {
    // La funzione usa il shared_ptr originale
    // Il conteggio dei riferimenti non cambia
    ptr->utilizza();
}

int main() {
    auto ptr = std::make_shared<Risorsa>(1);
    std::cout << "Conteggio iniziale: " << ptr.use_count() << std::endl;  // 1
    
    funzione1(ptr);
    std::cout << "Dopo funzione1: " << ptr.use_count() << std::endl;  // 1
    
    funzione2(ptr);
    std::cout << "Dopo funzione2: " << ptr.use_count() << std::endl;  // 1
    
    return 0;
}
```

## Creazione di shared_ptr da this

A volte, potresti voler creare un `shared_ptr` che punti a un oggetto corrente (`this`) all'interno di un metodo di classe. Questo può essere pericoloso se fatto in modo errato, poiché potrebbe creare più blocchi di controllo per lo stesso oggetto.

Per farlo correttamente, la classe deve ereditare da `std::enable_shared_from_this`:

```cpp
#include <iostream>
#include <memory>

class Risorsa : public std::enable_shared_from_this<Risorsa> {
public:
    Risorsa(int id) : id_(id) {
        std::cout << "Risorsa " << id_ << " costruita" << std::endl;
    }
    
    ~Risorsa() {
        std::cout << "Risorsa " << id_ << " distrutta" << std::endl;
    }
    
    // Metodo che restituisce un shared_ptr a this
    std::shared_ptr<Risorsa> getShared() {
        return shared_from_this();
    }
    
    void utilizza() {
        std::cout << "Risorsa " << id_ << " utilizzata" << std::endl;
    }
    
private:
    int id_;
};

int main() {
    // Importante: l'oggetto deve essere già gestito da un shared_ptr
    auto ptr1 = std::make_shared<Risorsa>(1);
    
    // Ottieni un altro shared_ptr allo stesso oggetto
    auto ptr2 = ptr1->getShared();
    
    std::cout << "Conteggio riferimenti: " << ptr1.use_count() << std::endl;  // 2
    
    return 0;
}
```

## Problemi Comuni con shared_ptr

### Cicli di Riferimento

Uno dei problemi più comuni con `shared_ptr` è la creazione di cicli di riferimento, che possono causare memory leak:

```cpp
#include <iostream>
#include <memory>

class Nodo {
public:
    Nodo(int valore) : valore_(valore) {
        std::cout << "Nodo " << valore_ << " costruito" << std::endl;
    }
    
    ~Nodo() {
        std::cout << "Nodo " << valore_ << " distrutto" << std::endl;
    }
    
    void setVicino(std::shared_ptr<Nodo> vicino) {
        vicino_ = vicino;
    }
    
private:
    int valore_;
    std::shared_ptr<Nodo> vicino_;  // Questo può creare un ciclo di riferimenti
};

int main() {
    {
        auto nodo1 = std::make_shared<Nodo>(1);
        auto nodo2 = std::make_shared<Nodo>(2);
        
        // Creiamo un ciclo di riferimenti
        nodo1->setVicino(nodo2);
        nodo2->setVicino(nodo1);
        
        // Alla fine di questo scope, nodo1 e nodo2 hanno ancora un riferimento l'uno all'altro
        // quindi non verranno distrutti -> memory leak!
    }
    
    std::cout << "Fine del programma" << std::endl;
    return 0;
}
```

Output:
```
Nodo 1 costruito
Nodo 2 costruito
Fine del programma
```

Nota che i distruttori non vengono chiamati! Questo problema può essere risolto utilizzando `weak_ptr`, che vedremo nel prossimo capitolo.

### Overhead di Prestazioni

I `shared_ptr` hanno un overhead maggiore rispetto ai `unique_ptr` a causa del conteggio dei riferimenti. Questo può influire sulle prestazioni in applicazioni sensibili alle prestazioni.

## Casi d'Uso Appropriati per shared_ptr

`std::shared_ptr` è appropriato quando:

1. **Proprietà condivisa**: Quando più parti del codice devono condividere la proprietà di un oggetto.
2. **Tempo di vita non determinato**: Quando il tempo di vita dell'oggetto non può essere determinato in anticipo.
3. **Strutture dati condivise**: Per oggetti in strutture dati accessibili da più parti del programma.
4. **Callback e handler**: Per gestire callback e handler che potrebbero essere registrati in più luoghi.

## Domande di Autovalutazione

1. Qual è la differenza principale tra `std::unique_ptr` e `std::shared_ptr`?
2. Cosa rappresenta il conteggio dei riferimenti in un `shared_ptr` e come puoi accedervi?
3. Perché è preferibile utilizzare `std::make_shared` invece di `new` con `shared_ptr`?
4. Come si può evitare il problema dei cicli di riferimento con `shared_ptr`?
5. In quali situazioni è più appropriato utilizzare `shared_ptr` rispetto a `unique_ptr`?
6. Cosa succede quando l'ultimo `shared_ptr` che possiede un oggetto viene distrutto?
7. Come si può creare un `shared_ptr` a `this` all'interno di un metodo di classe?

## Esercizi Proposti

1. **Implementazione di una Cache Condivisa**
   
   Crea una semplice cache che memorizza oggetti condivisi tra diverse parti del programma utilizzando `shared_ptr`.

2. **Gestore di Risorse Condivise**
   
   Implementa un gestore di risorse che permette a più componenti di accedere e utilizzare le stesse risorse in modo sicuro.

3. **Risoluzione di un Ciclo di Riferimenti**
   
   Modifica l'esempio del ciclo di riferimenti mostrato sopra per evitare il memory leak.

4. **Confronto di Prestazioni**
   
   Scrivi un programma che confronti le prestazioni di `unique_ptr` e `shared_ptr` in diversi scenari d'uso.

5. **Implementazione di un Grafo**
   
   Crea una struttura dati grafo dove i nodi sono gestiti con `shared_ptr` e gli archi con `weak_ptr` per evitare cicli di riferimenti.

## Conclusione

`std::shared_ptr` è uno strumento potente per la gestione della memoria condivisa in C++ moderno. Utilizzandolo correttamente, puoi creare strutture dati complesse con proprietà condivisa senza preoccuparti della gestione manuale della memoria. Tuttavia, è importante essere consapevoli dei potenziali problemi come i cicli di riferimento e l'overhead di prestazioni. Nel prossimo capitolo, esploreremo `std::weak_ptr`, che può essere utilizzato per risolvere il problema dei cicli di riferimento.