# Pattern di Progettazione in C++

## Introduzione ai Design Pattern

I pattern di progettazione (design pattern) sono soluzioni consolidate a problemi ricorrenti nella progettazione del software. Rappresentano le migliori pratiche utilizzate dagli sviluppatori esperti per risolvere problemi comuni durante la progettazione del software. I pattern di progettazione non sono codice finito, ma piuttosto modelli che possono essere adattati per risolvere un particolare problema di design in molte situazioni diverse.

## Categorie di Pattern di Progettazione

I pattern di progettazione sono generalmente classificati in tre categorie principali:

1. **Pattern Creazionali**: Si occupano dei meccanismi di creazione degli oggetti, cercando di creare oggetti in modo adeguato alla situazione.
2. **Pattern Strutturali**: Si occupano della composizione di classi e oggetti per formare strutture più grandi.
3. **Pattern Comportamentali**: Si occupano dell'interazione tra oggetti e della distribuzione delle responsabilità.

## Pattern Creazionali

### Singleton

Il pattern Singleton garantisce che una classe abbia una sola istanza e fornisce un punto di accesso globale a questa istanza.

```cpp
class Singleton {
private:
    static Singleton* instance;
    // Costruttore privato per impedire l'istanziazione diretta
    Singleton() {}

public:
    // Metodo per ottenere l'istanza
    static Singleton* getInstance() {
        if (instance == nullptr) {
            instance = new Singleton();
        }
        return instance;
    }
    
    void someBusinessLogic() {
        // ...
    }
};

// Inizializzazione del membro statico
Singleton* Singleton::instance = nullptr;
```

### Factory Method

Il pattern Factory Method definisce un'interfaccia per creare un oggetto, ma lascia alle sottoclassi la decisione su quale classe istanziare.

```cpp
// Interfaccia del prodotto
class Product {
public:
    virtual ~Product() {}
    virtual std::string operation() const = 0;
};

// Prodotti concreti
class ConcreteProduct1 : public Product {
public:
    std::string operation() const override {
        return "Risultato dell'operazione di ConcreteProduct1";
    }
};

class ConcreteProduct2 : public Product {
public:
    std::string operation() const override {
        return "Risultato dell'operazione di ConcreteProduct2";
    }
};

// Creatore
class Creator {
public:
    virtual ~Creator() {};
    virtual Product* factoryMethod() const = 0;
    
    std::string someOperation() const {
        // Chiama il factory method per creare un oggetto Product
        Product* product = this->factoryMethod();
        // Usa il prodotto
        std::string result = "Creator: " + product->operation();
        delete product;
        return result;
    }
};

// Creatori concreti
class ConcreteCreator1 : public Creator {
public:
    Product* factoryMethod() const override {
        return new ConcreteProduct1();
    }
};

class ConcreteCreator2 : public Creator {
public:
    Product* factoryMethod() const override {
        return new ConcreteProduct2();
    }
};
```

## Pattern Strutturali

### Adapter

Il pattern Adapter consente a interfacce incompatibili di lavorare insieme, convertendo l'interfaccia di una classe in un'altra interfaccia che i client si aspettano.

```cpp
// Interfaccia target che il client utilizza
class Target {
public:
    virtual ~Target() = default;
    virtual std::string request() const {
        return "Target: comportamento predefinito";
    }
};

// Classe esistente con interfaccia incompatibile
class Adaptee {
public:
    std::string specificRequest() const {
        return "Comportamento specifico dell'Adaptee";
    }
};

// Adapter che fa funzionare Adaptee con Target
class Adapter : public Target {
private:
    Adaptee* adaptee_;

public:
    Adapter(Adaptee* adaptee) : adaptee_(adaptee) {}

    std::string request() const override {
        std::string to_reverse = this->adaptee_->specificRequest();
        // Adatta la risposta dell'Adaptee al formato atteso dal Target
        std::reverse(to_reverse.begin(), to_reverse.end());
        return "Adapter: (TRADOTTO) " + to_reverse;
    }
};
```

### Composite

Il pattern Composite compone oggetti in strutture ad albero per rappresentare gerarchie parte-tutto, permettendo ai client di trattare oggetti singoli e composizioni di oggetti in modo uniforme.

```cpp
// Componente base
class Component {
public:
    virtual ~Component() {}
    virtual void operation() const = 0;
    virtual void add(Component* component) {}
    virtual void remove(Component* component) {}
    virtual bool isComposite() const {
        return false;
    }
};

// Foglia
class Leaf : public Component {
public:
    void operation() const override {
        std::cout << "Leaf: Esecuzione operazione" << std::endl;
    }
};

// Composite
class Composite : public Component {
private:
    std::list<Component*> children_;

public:
    void add(Component* component) override {
        this->children_.push_back(component);
    }

    void remove(Component* component) override {
        children_.remove(component);
    }

    bool isComposite() const override {
        return true;
    }

    void operation() const override {
        std::cout << "Composite: " << std::endl;
        for (const Component* c : children_) {
            c->operation();
        }
    }
};
```

## Pattern Comportamentali

### Observer

Il pattern Observer definisce una dipendenza uno-a-molti tra oggetti, in modo che quando un oggetto cambia stato, tutti i suoi dipendenti vengono notificati e aggiornati automaticamente.

```cpp
// Interfaccia Observer
class Observer {
public:
    virtual ~Observer() {};
    virtual void update(const std::string& message_from_subject) = 0;
};

// Interfaccia Subject
class Subject {
public:
    virtual ~Subject() {};
    virtual void attach(Observer* observer) = 0;
    virtual void detach(Observer* observer) = 0;
    virtual void notify() = 0;
};

// Subject concreto
class ConcreteSubject : public Subject {
private:
    std::list<Observer*> list_observer_;
    std::string message_;

public:
    void attach(Observer* observer) override {
        list_observer_.push_back(observer);
    }

    void detach(Observer* observer) override {
        list_observer_.remove(observer);
    }

    void notify() override {
        for (Observer* observer : list_observer_) {
            observer->update(message_);
        }
    }

    void createMessage(std::string message = "Vuoto") {
        this->message_ = message;
        notify();
    }
};

// Observer concreto
class ConcreteObserver : public Observer {
private:
    std::string message_from_subject_;
    Subject& subject_;

public:
    ConcreteObserver(Subject& subject) : subject_(subject) {
        this->subject_.attach(this);
    }

    void update(const std::string& message_from_subject) override {
        message_from_subject_ = message_from_subject;
        std::cout << "Observer: Nuovo messaggio ricevuto: " << message_from_subject_ << std::endl;
    }

    void removeMeFromTheList() {
        subject_.detach(this);
    }
};
```

### Strategy

Il pattern Strategy definisce una famiglia di algoritmi, incapsula ciascuno di essi e li rende intercambiabili. Strategy permette all'algoritmo di variare indipendentemente dai client che lo utilizzano.

```cpp
// Interfaccia Strategy
class Strategy {
public:
    virtual ~Strategy() = default;
    virtual std::string doAlgorithm(const std::vector<std::string>& data) const = 0;
};

// Strategie concrete
class ConcreteStrategyA : public Strategy {
public:
    std::string doAlgorithm(const std::vector<std::string>& data) const override {
        std::string result;
        for (const auto& element : data) {
            result += element + "_";
        }
        return result;
    }
};

class ConcreteStrategyB : public Strategy {
public:
    std::string doAlgorithm(const std::vector<std::string>& data) const override {
        std::string result;
        for (auto it = data.rbegin(); it != data.rend(); ++it) {
            result += *it + "_";
        }
        return result;
    }
};

// Contesto
class Context {
private:
    Strategy* strategy_;

public:
    Context(Strategy* strategy = nullptr) : strategy_(strategy) {}
    ~Context() {
        delete this->strategy_;
    }

    void setStrategy(Strategy* strategy) {
        delete this->strategy_;
        this->strategy_ = strategy;
    }

    void doSomeBusinessLogic() const {
        if (strategy_) {
            std::cout << "Contesto: Ordinamento dei dati usando la strategia" << std::endl;
            std::vector<std::string> data = {"a", "b", "c", "d", "e"};
            std::string result = strategy_->doAlgorithm(data);
            std::cout << result << std::endl;
        } else {
            std::cout << "Contesto: Strategia non impostata" << std::endl;
        }
    }
};
```

## Quando Usare i Pattern di Progettazione

I pattern di progettazione dovrebbero essere utilizzati con giudizio. Non tutti i problemi richiedono l'uso di un pattern, e l'applicazione forzata di un pattern può portare a un codice inutilmente complesso. Ecco alcune linee guida:

- Usa i pattern quando hai un problema che il pattern è progettato per risolvere.
- Comprendi il compromesso tra flessibilità e complessità.
- Considera l'impatto sulla manutenibilità e sulla leggibilità del codice.
- Non cercare di forzare un problema in un pattern; adatta il pattern al problema.

## Vantaggi dell'Uso dei Pattern di Progettazione

- **Riutilizzo del codice**: I pattern promuovono il riutilizzo di soluzioni comprovate.
- **Comunicazione**: I pattern forniscono un vocabolario comune per i progettisti.
- **Elevazione del livello di astrazione**: I pattern aiutano a pensare a livello di design piuttosto che a livello di implementazione.
- **Anticipazione dei cambiamenti**: Molti pattern sono progettati per facilitare i futuri cambiamenti nel sistema.

## Domande di Autovalutazione

1. Quali sono le tre categorie principali di pattern di progettazione e quali problemi risolvono?
2. Come implementeresti il pattern Singleton in modo thread-safe?
3. Qual è la differenza tra il pattern Factory Method e Abstract Factory?
4. In quali situazioni il pattern Observer sarebbe più appropriato del pattern Strategy?
5. Come il pattern Composite aiuta a gestire le gerarchie di oggetti?

## Esercizi Proposti

1. Implementa un sistema di logging utilizzando il pattern Singleton.
2. Crea un framework per la creazione di documenti di diversi formati (HTML, PDF, ecc.) utilizzando il pattern Factory Method.
3. Progetta un sistema di notifica per un'applicazione di social media utilizzando il pattern Observer.
4. Implementa un editor grafico che gestisce forme diverse (cerchi, rettangoli, ecc.) utilizzando il pattern Composite.
5. Crea un sistema di ordinamento che permette di cambiare l'algoritmo di ordinamento a runtime utilizzando il pattern Strategy.