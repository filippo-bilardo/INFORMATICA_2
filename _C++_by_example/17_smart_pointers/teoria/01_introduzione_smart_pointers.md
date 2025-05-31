# Introduzione agli Smart Pointers in C++

In questa guida, esploreremo gli Smart Pointers in C++, un meccanismo fondamentale per la gestione automatica della memoria che aiuta a prevenire memory leaks e altri problemi comuni legati alla gestione manuale della memoria.

## Problemi della Gestione Manuale della Memoria

In C++, la gestione manuale della memoria tramite i puntatori raw (`new` e `delete`) può portare a diversi problemi:

1. **Memory Leaks**: Dimenticare di deallocare la memoria con `delete` dopo averla allocata con `new`.
2. **Dangling Pointers**: Utilizzare un puntatore dopo che la memoria a cui punta è stata deallocata.
3. **Double Deletion**: Deallocare la stessa memoria più volte, causando comportamenti indefiniti.
4. **Exception Safety**: Se un'eccezione viene lanciata tra l'allocazione e la deallocazione, la memoria potrebbe non essere mai liberata.

```cpp
// Esempio di problemi con i puntatori raw
#include <iostream>

void funzione_con_leak() {
    int* p = new int(42);  // Allocazione di memoria
    // ... codice che potrebbe generare un'eccezione ...
    // Se un'eccezione viene lanciata qui, delete non verrà mai eseguito
    delete p;  // Deallocazione di memoria
}

void funzione_con_dangling_pointer() {
    int* p = new int(42);
    delete p;  // p è ora un dangling pointer
    *p = 10;   // Comportamento indefinito: accesso a memoria deallocata
}

void funzione_con_double_deletion() {
    int* p = new int(42);
    delete p;
    delete p;  // Double deletion: comportamento indefinito
}
```

## Cosa Sono gli Smart Pointers?

Gli Smart Pointers sono oggetti che si comportano come puntatori ma forniscono funzionalità aggiuntive, come la gestione automatica della memoria. Quando un oggetto Smart Pointer esce dallo scope, il suo distruttore si occupa automaticamente di deallocare la memoria, eliminando il rischio di memory leaks.

La libreria standard C++ fornisce tre tipi principali di Smart Pointers, tutti definiti nell'header `<memory>`:

1. **`std::unique_ptr`**: Rappresenta la proprietà esclusiva di una risorsa. Non può essere copiato, solo spostato.
2. **`std::shared_ptr`**: Implementa la semantica di proprietà condivisa attraverso il reference counting.
3. **`std::weak_ptr`**: Una versione "debole" di `shared_ptr` che non incrementa il conteggio dei riferimenti.

## Esempio Base: `std::unique_ptr`

```cpp
#include <iostream>
#include <memory>  // Per gli smart pointers

class Risorsa {
public:
    Risorsa() { std::cout << "Risorsa costruita" << std::endl; }
    ~Risorsa() { std::cout << "Risorsa distrutta" << std::endl; }
    void utilizza() { std::cout << "Risorsa utilizzata" << std::endl; }
};

void funzione() {
    // Creazione di un unique_ptr
    std::unique_ptr<Risorsa> ptr = std::make_unique<Risorsa>();
    
    // Utilizzo della risorsa
    ptr->utilizza();
    
    // Non è necessario chiamare delete
    // La risorsa verrà automaticamente deallocata quando ptr esce dallo scope
}

int main() {
    std::cout << "Inizio del programma" << std::endl;
    funzione();
    std::cout << "Fine del programma" << std::endl;
    return 0;
}
```

Output:
```
Inizio del programma
Risorsa costruita
Risorsa utilizzata
Risorsa distrutta
Fine del programma
```

## Esempio Base: `std::shared_ptr`

```cpp
#include <iostream>
#include <memory>

class Risorsa {
public:
    Risorsa() { std::cout << "Risorsa costruita" << std::endl; }
    ~Risorsa() { std::cout << "Risorsa distrutta" << std::endl; }
    void utilizza() { std::cout << "Risorsa utilizzata" << std::endl; }
};

void funzione(std::shared_ptr<Risorsa> ptr) {
    // Creazione di un altro shared_ptr che punta alla stessa risorsa
    std::shared_ptr<Risorsa> altro_ptr = ptr;
    
    std::cout << "Conteggio riferimenti: " << ptr.use_count() << std::endl;
    
    // Utilizzo della risorsa
    altro_ptr->utilizza();
    
    // altro_ptr verrà distrutto alla fine della funzione, ma la risorsa non verrà deallocata
    // perché esiste ancora un riferimento (ptr nel chiamante)
}

int main() {
    std::cout << "Inizio del programma" << std::endl;
    
    // Creazione di un shared_ptr
    std::shared_ptr<Risorsa> ptr = std::make_shared<Risorsa>();
    
    std::cout << "Conteggio riferimenti prima della chiamata: " << ptr.use_count() << std::endl;
    funzione(ptr);
    std::cout << "Conteggio riferimenti dopo la chiamata: " << ptr.use_count() << std::endl;
    
    // ptr verrà distrutto alla fine del main, e la risorsa verrà deallocata
    // perché non ci saranno più riferimenti
    
    std::cout << "Fine del programma" << std::endl;
    return 0;
}
```

Output:
```
Inizio del programma
Risorsa costruita
Conteggio riferimenti prima della chiamata: 1
Conteggio riferimenti: 2
Risorsa utilizzata
Conteggio riferimenti dopo la chiamata: 1
Fine del programma
Risorsa distrutta
```

## Vantaggi degli Smart Pointers

1. **Gestione Automatica della Memoria**: Gli Smart Pointers si occupano automaticamente di deallocare la memoria quando non è più necessaria.
2. **Exception Safety**: Anche in presenza di eccezioni, la memoria viene correttamente deallocata.
3. **Semantica di Proprietà Chiara**: `unique_ptr` per proprietà esclusiva, `shared_ptr` per proprietà condivisa.
4. **Prevenzione di Errori Comuni**: Memory leaks, dangling pointers e double deletion sono molto meno probabili.
5. **Interoperabilità con Algoritmi e Contenitori**: Gli Smart Pointers possono essere utilizzati con gli algoritmi e i contenitori della STL.

## Quando Utilizzare gli Smart Pointers

- **`std::unique_ptr`**: Quando hai bisogno di proprietà esclusiva di una risorsa e vuoi trasferirla (tramite move) tra diverse parti del codice.
- **`std::shared_ptr`**: Quando hai bisogno di proprietà condivisa di una risorsa, dove più parti del codice possono accedere e utilizzare la stessa risorsa.
- **`std::weak_ptr`**: Quando hai bisogno di accedere a una risorsa gestita da `shared_ptr` senza aumentare il conteggio dei riferimenti, utile per evitare reference cycles.

## Quando Evitare gli Smart Pointers

- Per puntatori a oggetti che non sono allocati dinamicamente (es. oggetti sullo stack).
- Quando hai bisogno di un puntatore a un array con dimensione nota a tempo di compilazione (usa `std::array` invece).
- Quando le prestazioni sono critiche e il costo del reference counting di `shared_ptr` è troppo elevato.

## Creazione di Smart Pointers

È consigliabile utilizzare le funzioni `std::make_unique` (C++14) e `std::make_shared` (C++11) per creare Smart Pointers, piuttosto che utilizzare direttamente `new`:

```cpp
// Preferibile (C++14)
std::unique_ptr<int> p1 = std::make_unique<int>(42);

// Meno preferibile
std::unique_ptr<int> p2(new int(42));

// Preferibile (C++11)
std::shared_ptr<int> p3 = std::make_shared<int>(42);

// Meno preferibile
std::shared_ptr<int> p4(new int(42));
```

I vantaggi di `make_unique` e `make_shared` includono:

1. **Exception Safety**: Se il costruttore dell'oggetto lancia un'eccezione, non ci saranno memory leaks.
2. **Efficienza**: `make_shared` alloca la memoria per l'oggetto e per il control block in un'unica operazione.
3. **Leggibilità**: Il codice è più conciso e chiaro.

## Domande di Autovalutazione

1. Quali sono i principali problemi della gestione manuale della memoria in C++?
2. Quali sono i tre tipi principali di Smart Pointers nella libreria standard C++?
3. Qual è la differenza principale tra `std::unique_ptr` e `std::shared_ptr`?
4. Perché è preferibile utilizzare `std::make_unique` e `std::make_shared` invece di `new`?
5. In quali situazioni è appropriato utilizzare `std::weak_ptr`?

## Esercizi Proposti

1. Scrivi un programma che utilizzi `std::unique_ptr` per gestire un oggetto di una classe personalizzata, assicurandoti che la memoria venga correttamente deallocata anche in presenza di eccezioni.
2. Implementa una semplice struttura dati (es. una lista collegata) utilizzando `std::shared_ptr` per gestire i nodi.
3. Crea un esempio che dimostri un reference cycle con `std::shared_ptr` e mostra come risolverlo utilizzando `std::weak_ptr`.
4. Scrivi una funzione che accetti un `std::unique_ptr` per valore (trasferendo la proprietà) e una che lo accetti per riferimento (senza trasferire la proprietà).
5. Implementa una factory function che restituisca un `std::unique_ptr` a un oggetto di una gerarchia di classi, determinando il tipo concreto a runtime.

## Conclusione

Gli Smart Pointers sono uno strumento fondamentale per la gestione sicura ed efficiente della memoria in C++ moderno. Utilizzandoli correttamente, puoi evitare molti dei problemi comuni associati alla gestione manuale della memoria, rendendo il tuo codice più robusto, più sicuro e più facile da mantenere. Nei prossimi capitoli, esploreremo in dettaglio ciascun tipo di Smart Pointer e come utilizzarlo efficacemente nei tuoi programmi.