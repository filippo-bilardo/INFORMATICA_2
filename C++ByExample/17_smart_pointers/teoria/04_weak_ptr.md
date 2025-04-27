# std::weak_ptr in C++

In questa guida, esploreremo in dettaglio `std::weak_ptr`, uno smart pointer che fornisce un accesso non proprietario a un oggetto gestito da `std::shared_ptr`, utile per risolvere problemi come i cicli di riferimento.

## Cos'è std::weak_ptr?

`std::weak_ptr` è uno smart pointer che mantiene un riferimento non proprietario (o "debole") a un oggetto che è gestito da uno o più `std::shared_ptr`. È definito nell'header `<memory>` e fa parte della libreria standard C++ a partire da C++11.

Le caratteristiche principali di `std::weak_ptr` sono:

1. **Riferimento non proprietario**: Non contribuisce al conteggio dei riferimenti dell'oggetto.
2. **Non previene la deallocazione**: L'oggetto può essere deallocato anche se ci sono `weak_ptr` che vi puntano.
3. **Verifica di validità**: Permette di verificare se l'oggetto a cui punta è ancora valido.
4. **Conversione a shared_ptr**: Può essere convertito temporaneamente in un `shared_ptr` per accedere all'oggetto in modo sicuro.

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
    // Creazione di un shared_ptr
    std::shared_ptr<Risorsa> shared = std::make_shared<Risorsa>(1);
    
    // Creazione di un weak_ptr dal shared_ptr
    std::weak_ptr<Risorsa> weak = shared;
    
    std::cout << "Conteggio riferimenti shared: " << shared.use_count() << std::endl;  // 1
    
    // Il weak_ptr non incrementa il conteggio dei riferimenti
    
    // Verifica se l'oggetto è ancora valido
    if (!weak.expired()) {
        // Conversione da weak_ptr a shared_ptr per accedere all'oggetto
        std::shared_ptr<Risorsa> temp = weak.lock();
        if (temp) {
            temp->utilizza();
            std::cout << "Conteggio riferimenti dopo lock: " << shared.use_count() << std::endl;  // 2
        }
    }
    
    // Rilascio del shared_ptr originale
    shared.reset();
    std::cout << "Dopo reset del shared_ptr" << std::endl;
    
    // Verifica se l'oggetto è ancora valido
    if (weak.expired()) {
        std::cout << "L'oggetto non è più valido" << std::endl;
    }
    
    // Tentativo di accesso all'oggetto
    std::shared_ptr<Risorsa> temp = weak.lock();
    if (!temp) {
        std::cout << "Impossibile ottenere un shared_ptr valido" << std::endl;
    }
    
    return 0;
}
```

Output:
```
Risorsa 1 costruita
Conteggio riferimenti shared: 1
Risorsa 1 utilizzata
Conteggio riferimenti dopo lock: 2
Dopo reset del shared_ptr
Risorsa 1 distrutta
L'oggetto non è più valido
Impossibile ottenere un shared_ptr valido
```

## Metodi Principali di weak_ptr

- **expired()**: Verifica se l'oggetto a cui punta il `weak_ptr` è stato deallocato.
- **lock()**: Crea e restituisce un `shared_ptr` che condivide la proprietà dell'oggetto. Se l'oggetto è stato deallocato, restituisce un `shared_ptr` vuoto.
- **reset()**: Reimposta il `weak_ptr` a un stato vuoto.
- **use_count()**: Restituisce il numero di `shared_ptr` che possiedono l'oggetto.

## Risoluzione dei Cicli di Riferimento

Uno dei principali casi d'uso di `weak_ptr` è la risoluzione dei cicli di riferimento che possono verificarsi con `shared_ptr`:

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
        // Utilizziamo weak_ptr per evitare cicli di riferimento
        vicino_ = vicino;
    }
    
    void utilizzaVicino() {
        // Verifichiamo se il vicino è ancora valido
        if (!vicino_.expired()) {
            // Convertiamo il weak_ptr in shared_ptr per accedere all'oggetto
            auto vicino = vicino_.lock();
            std::cout << "Utilizzo il nodo vicino" << std::endl;
        }
    }
    
private:
    int valore_;
    std::weak_ptr<Nodo> vicino_;  // Utilizziamo weak_ptr invece di shared_ptr
};

int main() {
    {
        auto nodo1 = std::make_shared<Nodo>(1);
        auto nodo2 = std::make_shared<Nodo>(2);
        
        // Creiamo un ciclo, ma con weak_ptr
        nodo1->setVicino(nodo2);
        nodo2->setVicino(nodo1);
        
        nodo1->utilizzaVicino();
        
        // Alla fine di questo scope, nodo1 e nodo2 verranno distrutti
        // poiché i weak_ptr non incrementano il conteggio dei riferimenti
    }
    
    std::cout << "Fine del programma" << std::endl;
    return 0;
}
```

Output:
```
Nodo 1 costruito
Nodo 2 costruito
Utilizzo il nodo vicino
Nodo 2 distrutto
Nodo 1 distrutto
Fine del programma
```

Notare che, a differenza dell'esempio con i cicli di `shared_ptr`, qui i distruttori vengono chiamati correttamente.

## Pattern Observer con weak_ptr

Un altro caso d'uso comune per `weak_ptr` è l'implementazione del pattern Observer, dove gli osservatori non dovrebbero impedire la deallocazione del soggetto osservato:

```cpp
#include <iostream>
#include <memory>
#include <vector>
#include <algorithm>

class Soggetto;

class Osservatore {
public:
    Osservatore(int id) : id_(id) {
        std::cout << "Osservatore " << id_ << " creato" << std::endl;
    }
    
    ~Osservatore() {
        std::cout << "Osservatore " << id_ << " distrutto" << std::endl;
    }
    
    void aggiorna() {
        std::cout << "Osservatore " << id_ << " aggiornato" << std::endl;
    }
    
private:
    int id_;
};

class Soggetto {
public:
    void aggiungiOsservatore(std::shared_ptr<Osservatore> osservatore) {
        // Memorizziamo un weak_ptr all'osservatore
        osservatori_.push_back(osservatore);
    }
    
    void notificaOsservatori() {
        // Rimuoviamo gli osservatori non più validi
        osservatori_.erase(
            std::remove_if(osservatori_.begin(), osservatori_.end(),
                [](const std::weak_ptr<Osservatore>& wp) {
                    return wp.expired();
                }),
            osservatori_.end());
        
        // Notifichiamo gli osservatori validi
        for (auto& wp : osservatori_) {
            if (auto osservatore = wp.lock()) {
                osservatore->aggiorna();
            }
        }
    }
    
private:
    std::vector<std::weak_ptr<Osservatore>> osservatori_;
};

int main() {
    Soggetto soggetto;
    
    // Creiamo alcuni osservatori in uno scope interno
    {
        auto osservatore1 = std::make_shared<Osservatore>(1);
        auto osservatore2 = std::make_shared<Osservatore>(2);
        
        soggetto.aggiungiOsservatore(osservatore1);
        soggetto.aggiungiOsservatore(osservatore2);
        
        std::cout << "Prima notifica:" << std::endl;
        soggetto.notificaOsservatori();
        
        // osservatore1 esce dallo scope e viene distrutto
    }
    
    std::cout << "\nSeconda notifica (dopo la distruzione degli osservatori):" << std::endl;
    soggetto.notificaOsservatori();
    
    return 0;
}
```

Output:
```
Osservatore 1 creato
Osservatore 2 creato
Prima notifica:
Osservatore 1 aggiornato
Osservatore 2 aggiornato
Osservatore 2 distrutto
Osservatore 1 distrutto

Seconda notifica (dopo la distruzione degli osservatori):
```

## Casi d'Uso Appropriati per weak_ptr

`std::weak_ptr` è appropriato quando:

1. **Risoluzione di cicli di riferimento**: Per spezzare cicli di riferimento in strutture dati circolari.
2. **Cache**: Per implementare cache che non impediscono la deallocazione degli oggetti.
3. **Pattern Observer**: Per implementare osservatori che non influenzano il ciclo di vita del soggetto osservato.
4. **Accesso condizionale**: Quando si vuole accedere a un oggetto solo se è ancora valido.

## Domande di Autovalutazione

1. Qual è la differenza principale tra `std::shared_ptr` e `std::weak_ptr`?
2. Come si può verificare se un oggetto puntato da un `weak_ptr` è ancora valido?
3. Come si accede all'oggetto puntato da un `weak_ptr`?
4. Perché `weak_ptr` è utile per risolvere i cicli di riferimento?
5. In quali situazioni è più appropriato utilizzare `weak_ptr`?
6. Cosa succede quando si tenta di accedere a un oggetto tramite un `weak_ptr` dopo che l'oggetto è stato deallocato?
7. Come si può implementare il pattern Observer utilizzando `weak_ptr`?

## Esercizi Proposti

1. **Implementazione di una Cache con weak_ptr**
   
   Crea una cache che memorizza oggetti utilizzando `weak_ptr` in modo che gli oggetti possano essere deallocati quando non sono più utilizzati altrove.

2. **Sistema di Eventi con Callback**
   
   Implementa un sistema di eventi dove i listener sono registrati utilizzando `weak_ptr` per evitare memory leak quando i listener vengono distrutti.

3. **Grafo Bidirezionale**
   
   Crea una struttura dati grafo bidirezionale dove i nodi sono collegati in entrambe le direzioni senza creare cicli di riferimento.

4. **Gestore di Risorse con Riferimenti Deboli**
   
   Implementa un gestore di risorse che tiene traccia delle risorse utilizzando `weak_ptr` per permettere la deallocazione quando non sono più necessarie.

5. **Pattern Memento con weak_ptr**
   
   Implementa il pattern Memento utilizzando `weak_ptr` per memorizzare lo stato precedente di un oggetto senza impedirne la deallocazione.

## Conclusione

`std::weak_ptr` è uno strumento essenziale nel toolkit degli smart pointer di C++ moderno. Fornisce un modo per osservare oggetti gestiti da `shared_ptr` senza influenzarne il ciclo di vita, risolvendo problemi comuni come i cicli di riferimento. Utilizzando `weak_ptr` in combinazione con `shared_ptr`, puoi creare strutture dati complesse e robuste che gestiscono automaticamente la memoria senza memory leak. Nel prossimo capitolo, esploreremo i custom deleters, che permettono di personalizzare il comportamento di deallocazione degli smart pointer.