# Best Practices e Pattern di Utilizzo degli Smart Pointers in C++

In questa guida, esploreremo le best practices e i pattern di utilizzo degli smart pointers in C++ moderno, per aiutarti a scrivere codice più sicuro, efficiente e manutenibile.

## Principi Generali

Quando si utilizzano gli smart pointers, è importante seguire alcuni principi generali:

1. **Preferisci gli smart pointers ai puntatori raw**: Gli smart pointers gestiscono automaticamente la memoria, riducendo il rischio di memory leak.
2. **Esprimi chiaramente l'intento di proprietà**: Utilizza il tipo di smart pointer che meglio esprime l'intento di proprietà della risorsa.
3. **Minimizza l'uso di `new` e `delete`**: Utilizza le funzioni `make_unique`, `make_shared` e i container standard quando possibile.
4. **Segui il principio RAII** (Resource Acquisition Is Initialization): Le risorse dovrebbero essere acquisite durante l'inizializzazione e rilasciate automaticamente durante la distruzione.

## Quando Utilizzare Ciascun Tipo di Smart Pointer

### unique_ptr

Utilizza `std::unique_ptr` quando:

- Hai bisogno di proprietà esclusiva di una risorsa.
- La risorsa non deve essere condivisa tra diversi oggetti.
- Vuoi trasferire la proprietà della risorsa (tramite move semantics).
- Hai bisogno di un container di oggetti polimorfi.

```cpp
#include <iostream>
#include <memory>
#include <vector>

class Base {
public:
    virtual ~Base() = default;
    virtual void operazione() const {
        std::cout << "Operazione Base" << std::endl;
    }
};

class Derivata : public Base {
public:
    void operazione() const override {
        std::cout << "Operazione Derivata" << std::endl;
    }
};

// Funzione factory che restituisce un unique_ptr
std::unique_ptr<Base> creaOggetto(bool creaDerivata) {
    if (creaDerivata) {
        return std::make_unique<Derivata>();
    } else {
        return std::make_unique<Base>();
    }
}

int main() {
    // Proprietà esclusiva
    auto ptr1 = std::make_unique<Base>();
    ptr1->operazione();
    
    // Trasferimento di proprietà
    auto ptr2 = std::move(ptr1);  // ptr1 è ora nullptr
    ptr2->operazione();
    
    // Container di oggetti polimorfi
    std::vector<std::unique_ptr<Base>> oggetti;
    oggetti.push_back(std::make_unique<Base>());
    oggetti.push_back(std::make_unique<Derivata>());
    
    for (const auto& obj : oggetti) {
        obj->operazione();
    }
    
    // Utilizzo della funzione factory
    auto obj = creaOggetto(true);
    obj->operazione();
    
    return 0;
}
```

### shared_ptr

Utilizza `std::shared_ptr` quando:

- Più oggetti devono condividere la proprietà di una risorsa.
- Non sai in anticipo quale oggetto sarà l'ultimo a utilizzare la risorsa.
- Hai bisogno di risorse condivise in una struttura dati complessa.

```cpp
#include <iostream>
#include <memory>
#include <vector>
#include <string>

class Documento {
public:
    Documento(const std::string& nome) : nome_(nome) {
        std::cout << "Documento '" << nome_ << "' creato" << std::endl;
    }
    
    ~Documento() {
        std::cout << "Documento '" << nome_ << "' distrutto" << std::endl;
    }
    
    const std::string& getNome() const {
        return nome_;
    }
    
private:
    std::string nome_;
};

class Editor {
public:
    Editor(const std::string& nome) : nome_(nome) {}
    
    void apriDocumento(std::shared_ptr<Documento> doc) {
        documentiAperti_.push_back(doc);
        std::cout << "Editor '" << nome_ << "' ha aperto il documento '" 
                  << doc->getNome() << "'" << std::endl;
    }
    
    void chiudiDocumento(const std::string& nomeDoc) {
        auto it = std::find_if(documentiAperti_.begin(), documentiAperti_.end(),
            [&nomeDoc](const std::shared_ptr<Documento>& doc) {
                return doc->getNome() == nomeDoc;
            });
        
        if (it != documentiAperti_.end()) {
            std::cout << "Editor '" << nome_ << "' ha chiuso il documento '" 
                      << (*it)->getNome() << "'" << std::endl;
            documentiAperti_.erase(it);
        }
    }
    
private:
    std::string nome_;
    std::vector<std::shared_ptr<Documento>> documentiAperti_;
};

int main() {
    // Creazione di un documento condiviso
    auto documento = std::make_shared<Documento>("Relazione.txt");
    
    // Più editor condividono lo stesso documento
    Editor editor1("Editor 1");
    Editor editor2("Editor 2");
    
    editor1.apriDocumento(documento);
    editor2.apriDocumento(documento);
    
    std::cout << "Conteggio riferimenti: " << documento.use_count() << std::endl;  // 3 (documento, editor1, editor2)
    
    editor1.chiudiDocumento("Relazione.txt");
    std::cout << "Conteggio riferimenti dopo chiusura da editor1: " << documento.use_count() << std::endl;  // 2
    
    editor2.chiudiDocumento("Relazione.txt");
    std::cout << "Conteggio riferimenti dopo chiusura da editor2: " << documento.use_count() << std::endl;  // 1
    
    // Il documento verrà distrutto quando l'ultimo shared_ptr (documento) esce dallo scope
    return 0;
}
```

### weak_ptr

Utilizza `std::weak_ptr` quando:

- Hai bisogno di accedere a un oggetto gestito da `shared_ptr` senza influenzarne il ciclo di vita.
- Vuoi evitare cicli di riferimento in strutture dati circolari.
- Implementi il pattern Observer o callback.
- Hai bisogno di una cache che non impedisca la deallocazione degli oggetti.

```cpp
#include <iostream>
#include <memory>
#include <string>
#include <unordered_map>

class Risorsa {
public:
    Risorsa(const std::string& id) : id_(id) {
        std::cout << "Risorsa '" << id_ << "' creata" << std::endl;
    }
    
    ~Risorsa() {
        std::cout << "Risorsa '" << id_ << "' distrutta" << std::endl;
    }
    
    void utilizza() {
        std::cout << "Risorsa '" << id_ << "' utilizzata" << std::endl;
    }
    
    const std::string& getId() const {
        return id_;
    }
    
private:
    std::string id_;
};

class CacheRisorse {
public:
    // Ottiene una risorsa dalla cache o la crea se non esiste
    std::shared_ptr<Risorsa> getRisorsa(const std::string& id) {
        // Verifica se la risorsa è nella cache
        auto it = cache_.find(id);
        if (it != cache_.end()) {
            // Tenta di ottenere un shared_ptr dalla weak_ptr
            if (auto risorsa = it->second.lock()) {
                std::cout << "Risorsa '" << id << "' trovata nella cache" << std::endl;
                return risorsa;
            }
            // La risorsa è stata deallocata, rimuoviamo l'entry dalla cache
            std::cout << "Risorsa '" << id << "' era nella cache ma è stata deallocata" << std::endl;
            cache_.erase(it);
        }
        
        // Crea una nuova risorsa
        auto risorsa = std::make_shared<Risorsa>(id);
        // Memorizza un weak_ptr nella cache
        cache_[id] = risorsa;
        std::cout << "Risorsa '" << id << "' creata e aggiunta alla cache" << std::endl;
        return risorsa;
    }
    
    // Pulisce le entry scadute dalla cache
    void pulisciCache() {
        for (auto it = cache_.begin(); it != cache_.end();) {
            if (it->second.expired()) {
                std::cout << "Rimozione entry scaduta per '" << it->first << "' dalla cache" << std::endl;
                it = cache_.erase(it);
            } else {
                ++it;
            }
        }
    }
    
private:
    std::unordered_map<std::string, std::weak_ptr<Risorsa>> cache_;
};

int main() {
    CacheRisorse cache;
    
    {
        // Creiamo e utilizziamo alcune risorse
        auto risorsa1 = cache.getRisorsa("R1");
        auto risorsa2 = cache.getRisorsa("R2");
        
        risorsa1->utilizza();
        risorsa2->utilizza();
        
        // Otteniamo di nuovo R1 dalla cache
        auto risorsa1bis = cache.getRisorsa("R1");
        risorsa1bis->utilizza();
        
        // risorsa2 esce dallo scope e viene deallocata
    }
    
    // Puliamo la cache
    cache.pulisciCache();
    
    // Tentiamo di ottenere di nuovo le risorse
    auto risorsa1 = cache.getRisorsa("R1");  // Dovrebbe essere deallocata
    auto risorsa2 = cache.getRisorsa("R2");  // Dovrebbe essere deallocata
    
    return 0;
}
```

## Pattern di Utilizzo Comuni

### PIMPL (Pointer to Implementation)

Il pattern PIMPL (Pointer to Implementation) utilizza smart pointers per nascondere i dettagli di implementazione di una classe:

```cpp
// Header file: widget.h
#ifndef WIDGET_H
#define WIDGET_H

#include <memory>
#include <string>

class Widget {
public:
    Widget(const std::string& nome);
    ~Widget();  // Necessario per il destructor completo
    
    // Costruttori di copia e move, operatori di assegnazione
    Widget(const Widget& other);
    Widget& operator=(const Widget& other);
    Widget(Widget&& other) noexcept;
    Widget& operator=(Widget&& other) noexcept;
    
    void operazione() const;
    std::string getNome() const;
    
private:
    class Impl;  // Dichiarazione forward della classe di implementazione
    std::unique_ptr<Impl> pImpl_;  // Puntatore all'implementazione
};

#endif
```

```cpp
// Implementation file: widget.cpp
#include "widget.h"
#include <iostream>

class Widget::Impl {
public:
    Impl(const std::string& nome) : nome_(nome) {}
    
    void operazione() const {
        std::cout << "Operazione su Widget '" << nome_ << "'" << std::endl;
    }
    
    std::string getNome() const {
        return nome_;
    }
    
private:
    std::string nome_;
};

// Implementazione dei metodi di Widget
Widget::Widget(const std::string& nome) : pImpl_(std::make_unique<Impl>(nome)) {}

// Destructor necessario per il tipo incompleto Impl
Widget::~Widget() = default;

// Implementazione dei costruttori di copia e move
Widget::Widget(const Widget& other) : pImpl_(std::make_unique<Impl>(*other.pImpl_)) {}

Widget& Widget::operator=(const Widget& other) {
    if (this != &other) {
        pImpl_ = std::make_unique<Impl>(*other.pImpl_);
    }
    return *this;
}

Widget::Widget(Widget&& other) noexcept = default;
Widget& Widget::operator=(Widget&& other) noexcept = default;

void Widget::operazione() const {
    pImpl_->operazione();
}

std::string Widget::getNome() const {
    return pImpl_->getNome();
}
```

### Factory Method

Il pattern Factory Method può utilizzare smart pointers per creare oggetti in modo sicuro:

```cpp
#include <iostream>
#include <memory>
#include <string>

class Prodotto {
public:
    virtual ~Prodotto() = default;
    virtual void utilizza() const = 0;
};

class ProdottoConcreto1 : public Prodotto {
public:
    void utilizza() const override {
        std::cout << "Utilizzo ProdottoConcreto1" << std::endl;
    }
};

class ProdottoConcreto2 : public Prodotto {
public:
    void utilizza() const override {
        std::cout << "Utilizzo ProdottoConcreto2" << std::endl;
    }
};

class Factory {
public:
    virtual ~Factory() = default;
    virtual std::unique_ptr<Prodotto> creaProdotto() const = 0;
};

class Factory1 : public Factory {
public:
    std::unique_ptr<Prodotto> creaProdotto() const override {
        return std::make_unique<ProdottoConcreto1>();
    }
};

class Factory2 : public Factory {
public:
    std::unique_ptr<Prodotto> creaProdotto() const override {
        return std::make_unique<ProdottoConcreto2>();
    }
};

int main() {
    // Utilizzo delle factory
    Factory1 factory1;
    Factory2 factory2;
    
    auto prodotto1 = factory1.creaProdotto();
    auto prodotto2 = factory2.creaProdotto();
    
    prodotto1->utilizza();
    prodotto2->utilizza();
    
    return 0;
}
```

### Dependency Injection

Gli smart pointers possono essere utilizzati per implementare la dependency injection:

```cpp
#include <iostream>
#include <memory>
#include <string>

class Logger {
public:
    virtual ~Logger() = default;
    virtual void log(const std::string& messaggio) const = 0;
};

class ConsoleLogger : public Logger {
public:
    void log(const std::string& messaggio) const override {
        std::cout << "[Console] " << messaggio << std::endl;
    }
};

class FileLogger : public Logger {
public:
    explicit FileLogger(const std::string& nomeFile) : nomeFile_(nomeFile) {
        std::cout << "Apertura file di log: " << nomeFile_ << std::endl;
    }
    
    ~FileLogger() {
        std::cout << "Chiusura file di log: " << nomeFile_ << std::endl;
    }
    
    void log(const std::string& messaggio) const override {
        std::cout << "[File: " << nomeFile_ << "] " << messaggio << std::endl;
    }
    
private:
    std::string nomeFile_;
};

class Servizio {
public:
    // Dependency injection tramite costruttore
    explicit Servizio(std::shared_ptr<Logger> logger) : logger_(std::move(logger)) {}
    
    void eseguiOperazione() {
        // Utilizzo della dipendenza
        logger_->log("Esecuzione operazione");
    }
    
private:
    std::shared_ptr<Logger> logger_;
};

int main() {
    // Creazione delle dipendenze
    auto consoleLogger = std::make_shared<ConsoleLogger>();
    auto fileLogger = std::make_shared<FileLogger>("app.log");
    
    // Creazione dei servizi con diverse dipendenze
    Servizio servizio1(consoleLogger);
    Servizio servizio2(fileLogger);
    
    // Utilizzo dei servizi
    servizio1.eseguiOperazione();
    servizio2.eseguiOperazione();
    
    return 0;
}
```

## Best Practices Specifiche

### Passaggio di Smart Pointers a Funzioni

Quando passi smart pointers a funzioni, segui queste linee guida:

1. **Passa per valore** quando la funzione deve prendere la proprietà o condividerla:

```cpp
void prendiProprietà(std::unique_ptr<Risorsa> risorsa) {
    // La funzione prende la proprietà della risorsa
    risorsa->utilizza();
}  // La risorsa viene deallocata qui

void condividiProprietà(std::shared_ptr<Risorsa> risorsa) {
    // La funzione condivide la proprietà e incrementa il conteggio dei riferimenti
    risorsa->utilizza();
}  // Il conteggio dei riferimenti viene decrementato qui
```

2. **Passa per riferimento costante** quando la funzione deve solo utilizzare la risorsa senza prenderne la proprietà:

```cpp
void utilizzaRisorsa(const std::unique_ptr<Risorsa>& risorsa) {
    // La funzione utilizza la risorsa senza prenderne la proprietà
    risorsa->utilizza();
}  // La proprietà rimane invariata

void utilizzaRisorsaCondivisa(const std::shared_ptr<Risorsa>& risorsa) {
    // La funzione utilizza la risorsa senza incrementare il conteggio dei riferimenti
    risorsa->utilizza();
}  // Il conteggio dei riferimenti rimane invariato
```

3. **Passa il puntatore raw** quando la funzione deve solo utilizzare l'oggetto e la proprietà è garantita dal chiamante:

```cpp
void utilizzaOggetto(Risorsa* risorsa) {
    // La funzione utilizza l'oggetto senza preoccuparsi della proprietà
    if (risorsa) {
        risorsa->utilizza();
    }
}

// Utilizzo
auto ptr = std::make_unique<Risorsa>();
utilizzaOggetto(ptr.get());
```

### Evitare Cicli di Riferimento

Per evitare cicli di riferimento con `shared_ptr`, utilizza `weak_ptr` per le relazioni non proprietarie:

```cpp
class Nodo {
public:
    void setVicino(std::shared_ptr<Nodo> vicino) {
        // Utilizziamo weak_ptr per evitare cicli di riferimento
        vicino_ = vicino;
    }
    
    void utilizzaVicino() {
        if (auto vicino = vicino_.lock()) {
            // Utilizzo del vicino
        }
    }
    
private:
    std::weak_ptr<Nodo> vicino_;  // Relazione non proprietaria
};
```

### Preferire make_unique e make_shared

Preferisci `std::make_unique` e `std::make_shared` invece di `new` per diversi motivi:

1. **Sicurezza contro le eccezioni**: Prevengono memory leak in caso di eccezioni.
2. **Efficienza**: `make_shared` alloca l'oggetto e il blocco di controllo in un'unica operazione.
3. **Sintassi più pulita**: Evitano la ripetizione del tipo.

```cpp
// Preferibile
auto ptr1 = std::make_unique<Risorsa>(arg1, arg2);
auto ptr2 = std::make_shared<Risorsa>(arg1, arg2);

// Meno preferibile
std::unique_ptr<Risorsa> ptr3(new Risorsa(arg1, arg2));
std::shared_ptr<Risorsa> ptr4(new Risorsa(arg1, arg2));
```

### Utilizzare enable_shared_from_this

Quando una classe deve creare `shared_ptr` a se stessa, utilizza `std::enable_shared_from_this`:

```cpp
class Risorsa : public std::enable_shared_from_this<Risorsa> {
public:
    // Factory method per creare istanze gestite da shared_ptr
    static std::shared_ptr<Risorsa> crea() {
        return std::make_shared<Risorsa>();
    }
    
    // Metodo che restituisce un shared_ptr a this
    std::shared_ptr<Risorsa> getPtr() {
        return shared_from_this();
    }
    
private:
    // Costruttore privato per forzare l'utilizzo della factory
    Risorsa() = default;
};

int main() {
    // Utilizzo corretto
    auto risorsa = Risorsa::crea();
    auto ptr = risorsa->getPtr();
    
    return 0;
}
```

### Utilizzare alias per Smart Pointers Complessi

Per smart pointers con tipi complessi, utilizza alias per migliorare la leggibilità:

```cpp
// Definizione di alias
using RisorsaPtr = std::unique_ptr<Risorsa>;
using RisorsaCondivisaPtr = std::shared_ptr<Risorsa>;
using MappaRisorse = std::unordered_map<std::string, RisorsaCondivisaPtr>;

// Utilizzo
RisorsaPtr creaRisorsa() {
    return std::make_unique<Risorsa>();
}

MappaRisorse getRisorseGlobali() {
    MappaRisorse mappa;
    mappa["risorsa1"] = std::make_shared<Risorsa>();
    return mappa;
}
```

## Domande di Autovalutazione

1. Quali sono i principi generali da seguire quando si utilizzano gli smart pointers?
2. In quali situazioni è più appropriato utilizzare `unique_ptr` rispetto a `shared_ptr`?
3. Come si può evitare un ciclo di riferimento quando si utilizzano `shared_ptr`?
4. Perché è preferibile utilizzare `make_unique` e `make_shared` invece di `new`?
5. Quando è appropriato passare uno smart pointer per valore a una funzione?
6. Come si può implementare il pattern PIMPL utilizzando gli smart pointers?
7. Quali sono i vantaggi di utilizzare `enable_shared_from_this`?
8. Come si può utilizzare gli smart pointers per implementare la dependency injection?

## Esercizi Proposti

1. **Refactoring di Codice Legacy**
   
   Prendi un esempio di codice che utilizza puntatori raw e refactorizzalo per utilizzare smart pointers appropriati.

2. **Implementazione di un Gestore di Risorse**
   
   Crea un gestore di risorse che utilizza smart pointers per gestire diverse risorse (file, connessioni di rete, ecc.) in modo sicuro.

3. **Pattern Observer con Smart Pointers**
   
   Implementa il pattern Observer utilizzando `weak_ptr` per evitare cicli di riferimento tra il soggetto e gli osservatori.

4. **Dependency Injection Container**
   
   Crea un semplice container di dependency injection che utilizza smart pointers per gestire le dipendenze.

5. **Implementazione di un Cache Manager**
   
   Implementa un cache manager che utilizza `weak_ptr` per memorizzare oggetti in cache senza impedirne la deallocazione quando non sono più utilizzati altrove.

## Conclusione

Gli smart pointers sono uno strumento potente in C++ moderno che, se utilizzati correttamente, possono migliorare significativamente la sicurezza, la leggibilità e la manutenibilità del codice. Seguendo le best practices e i pattern di utilizzo descritti in questa guida, puoi sfruttare al meglio gli smart pointers nei tuoi progetti, evitando memory leak e altri problemi comuni legati alla gestione manuale della memoria.

Ricorda che gli smart pointers non sono una panacea e che in alcuni casi (come per le prestazioni critiche o l'interoperabilità con codice C) potrebbe essere necessario utilizzare puntatori raw. Tuttavia, nella maggior parte dei casi, gli smart pointers offrono un equilibrio ottimale tra sicurezza e prestazioni.