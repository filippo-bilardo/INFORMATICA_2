# Design Pattern in C++

## Introduzione ai Design Pattern

I design pattern sono soluzioni consolidate a problemi ricorrenti nella progettazione del software. Rappresentano le migliori pratiche sviluppate e perfezionate nel tempo da sviluppatori esperti. In C++, i design pattern aiutano a creare codice più manutenibile, flessibile e riutilizzabile.

## Perché Utilizzare i Design Pattern?

- **Riutilizzo di soluzioni provate**: I design pattern offrono soluzioni a problemi comuni che sono state testate e perfezionate nel tempo.
- **Vocabolario comune**: Forniscono un linguaggio comune tra sviluppatori per discutere di architetture software.
- **Miglioramento della qualità del codice**: Promuovono principi di buona progettazione come basso accoppiamento e alta coesione.
- **Facilitano la manutenzione**: Rendono il codice più comprensibile e più facile da mantenere.

## Categorie di Design Pattern

I design pattern sono generalmente classificati in tre categorie principali:

1. **Pattern Creazionali**: Si occupano dei meccanismi di creazione degli oggetti.
2. **Pattern Strutturali**: Si occupano della composizione di classi e oggetti.
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
        // Logica di business
    }
    
    // Versione thread-safe (C++11 e successivi)
    static Singleton& getInstanceThreadSafe() {
        static Singleton instance;
        return instance;
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

// Implementazioni concrete del prodotto
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

// Classe Creator che dichiara il factory method
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

// Implementazioni concrete del Creator
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

### Abstract Factory

Il pattern Abstract Factory fornisce un'interfaccia per creare famiglie di oggetti correlati o dipendenti senza specificare le loro classi concrete.

```cpp
// Interfacce dei prodotti
class AbstractProductA {
public:
    virtual ~AbstractProductA() {};
    virtual std::string useProductA() const = 0;
};

class AbstractProductB {
public:
    virtual ~AbstractProductB() {};
    virtual std::string useProductB() const = 0;
    virtual std::string anotherUseProductB(const AbstractProductA& collaborator) const = 0;
};

// Prodotti concreti per la famiglia 1
class ConcreteProductA1 : public AbstractProductA {
public:
    std::string useProductA() const override {
        return "Risultato del prodotto A1";
    }
};

class ConcreteProductB1 : public AbstractProductB {
public:
    std::string useProductB() const override {
        return "Risultato del prodotto B1";
    }
    
    std::string anotherUseProductB(const AbstractProductA& collaborator) const override {
        const std::string result = collaborator.useProductA();
        return "B1 collabora con (" + result + ")";
    }
};

// Prodotti concreti per la famiglia 2
class ConcreteProductA2 : public AbstractProductA {
public:
    std::string useProductA() const override {
        return "Risultato del prodotto A2";
    }
};

class ConcreteProductB2 : public AbstractProductB {
public:
    std::string useProductB() const override {
        return "Risultato del prodotto B2";
    }
    
    std::string anotherUseProductB(const AbstractProductA& collaborator) const override {
        const std::string result = collaborator.useProductA();
        return "B2 collabora con (" + result + ")";
    }
};

// Abstract Factory
class AbstractFactory {
public:
    virtual AbstractProductA* createProductA() const = 0;
    virtual AbstractProductB* createProductB() const = 0;
};

// Fabbriche concrete
class ConcreteFactory1 : public AbstractFactory {
public:
    AbstractProductA* createProductA() const override {
        return new ConcreteProductA1();
    }
    
    AbstractProductB* createProductB() const override {
        return new ConcreteProductB1();
    }
};

class ConcreteFactory2 : public AbstractFactory {
public:
    AbstractProductA* createProductA() const override {
        return new ConcreteProductA2();
    }
    
    AbstractProductB* createProductB() const override {
        return new ConcreteProductB2();
    }
};
```

### Builder

Il pattern Builder separa la costruzione di un oggetto complesso dalla sua rappresentazione, permettendo di creare diverse rappresentazioni con lo stesso processo di costruzione.

```cpp
class Product {
public:
    std::vector<std::string> parts_;
    
    void listParts() const {
        std::cout << "Parti del prodotto: ";
        for (size_t i = 0; i < parts_.size(); i++) {
            if (parts_[i] == parts_.back()) {
                std::cout << parts_[i];
            } else {
                std::cout << parts_[i] << ", ";
            }
        }
        std::cout << "\n\n";
    }
};

class Builder {
public:
    virtual ~Builder() {}
    virtual void buildPartA() const = 0;
    virtual void buildPartB() const = 0;
    virtual void buildPartC() const = 0;
};

class ConcreteBuilder : public Builder {
private:
    Product* product;

public:
    ConcreteBuilder() {
        this->reset();
    }
    
    ~ConcreteBuilder() {
        delete product;
    }
    
    void reset() {
        this->product = new Product();
    }
    
    void buildPartA() const override {
        this->product->parts_.push_back("PartA1");
    }
    
    void buildPartB() const override {
        this->product->parts_.push_back("PartB1");
    }
    
    void buildPartC() const override {
        this->product->parts_.push_back("PartC1");
    }
    
    Product* getProduct() {
        Product* result = this->product;
        this->reset();
        return result;
    }
};

class Director {
private:
    Builder* builder;

public:
    void setBuilder(Builder* builder) {
        this->builder = builder;
    }
    
    void buildMinimalViableProduct() {
        this->builder->buildPartA();
    }
    
    void buildFullFeaturedProduct() {
        this->builder->buildPartA();
        this->builder->buildPartB();
        this->builder->buildPartC();
    }
};
```

## Pattern Strutturali

### Adapter

Il pattern Adapter converte l'interfaccia di una classe in un'altra interfaccia che i client si aspettano. Permette a classi con interfacce incompatibili di lavorare insieme.

```cpp
// Interfaccia target che il client utilizza
class Target {
public:
    virtual ~Target() = default;
    virtual std::string request() const {
        return "Target: comportamento predefinito del target.";
    }
};

// Classe esistente con un'interfaccia incompatibile
class Adaptee {
public:
    std::string specificRequest() const {
        return ".eetpadA eht fo roivaheb laicepS";
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
        std::reverse(to_reverse.begin(), to_reverse.end());
        return "Adapter: (TRADOTTO) " + to_reverse;
    }
};
```

### Composite

Il pattern Composite compone oggetti in strutture ad albero per rappresentare gerarchie parte-tutto. Permette ai client di trattare oggetti singoli e composizioni di oggetti in modo uniforme.

```cpp
class Component {
protected:
    Component* parent_;

public:
    virtual ~Component() {}
    
    void setParent(Component* parent) {
        this->parent_ = parent;
    }
    
    Component* getParent() const {
        return this->parent_;
    }
    
    virtual void add(Component* component) {}
    virtual void remove(Component* component) {}
    virtual bool isComposite() const {
        return false;
    }
    
    virtual std::string operation() const = 0;
};

class Leaf : public Component {
public:
    std::string operation() const override {
        return "Leaf";
    }
};

class Composite : public Component {
protected:
    std::list<Component*> children_;

public:
    void add(Component* component) override {
        this->children_.push_back(component);
        component->setParent(this);
    }
    
    void remove(Component* component) override {
        children_.remove(component);
        component->setParent(nullptr);
    }
    
    bool isComposite() const override {
        return true;
    }
    
    std::string operation() const override {
        std::string result;
        for (const Component* c : children_) {
            if (c == children_.back()) {
                result += c->operation();
            } else {
                result += c->operation() + "+";
            }
        }
        return "Branch(" + result + ")";
    }
};
```

## Pattern Comportamentali

### Observer

Il pattern Observer definisce una dipendenza uno-a-molti tra oggetti, in modo che quando un oggetto cambia stato, tutti i suoi dipendenti vengono notificati e aggiornati automaticamente.

```cpp
class Subject;

class Observer {
public:
    virtual ~Observer() {}
    virtual void update(Subject* subject) = 0;
};

class Subject {
public:
    virtual ~Subject() {}
    
    void attach(Observer* observer) {
        observers_.push_back(observer);
    }
    
    void detach(Observer* observer) {
        observers_.remove(observer);
    }
    
    void notify() {
        std::list<Observer*>::iterator iterator = observers_.begin();
        while (iterator != observers_.end()) {
            (*iterator)->update(this);
            ++iterator;
        }
    }

private:
    std::list<Observer*> observers_;
};

class ConcreteSubject : public Subject {
private:
    std::string message_;

public:
    void setMessage(std::string message) {
        message_ = message;
        notify();
    }
    
    std::string getMessage() const {
        return message_;
    }
};

class ConcreteObserver : public Observer {
private:
    std::string message_from_subject_;
    Subject* subject_;
    int number_;
    static int static_number_;

public:
    ConcreteObserver(Subject* subject) : subject_(subject) {
        this->subject_->attach(this);
        this->number_ = ++ConcreteObserver::static_number_;
    }
    
    virtual ~ConcreteObserver() {
        this->subject_->detach(this);
    }
    
    void update(Subject* subject) override {
        message_from_subject_ = dynamic_cast<ConcreteSubject*>(subject)->getMessage();
        std::cout << "Observer " << this->number_ << ": " << this->message_from_subject_ << "\n";
    }
};

int ConcreteObserver::static_number_ = 0;
```

### Strategy

Il pattern Strategy definisce una famiglia di algoritmi, incapsula ciascuno di essi e li rende intercambiabili. Permette all'algoritmo di variare indipendentemente dai client che lo utilizzano.

```cpp
class Strategy {
public:
    virtual ~Strategy() {}
    virtual std::string doAlgorithm(const std::vector<std::string>& data) const = 0;
};

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
        if (this->strategy_) {
            std::cout << "Context: Ordinamento dei dati usando la strategia";
            std::string result = this->strategy_->doAlgorithm(std::vector<std::string>{"a", "e", "c", "b", "d"});
            std::cout << result << "\n";
        } else {
            std::cout << "Context: Strategia non impostata";
        }
    }
};

class ConcreteStrategyA : public Strategy {
public:
    std::string doAlgorithm(const std::vector<std::string>& data) const override {
        std::string result;
        std::vector<std::string> copy(data);
        std::sort(copy.begin(), copy.end());
        
        for (const std::string& letter : copy) {
            result += letter;
        }
        return result;
    }
};

class ConcreteStrategyB : public Strategy {
    std::string doAlgorithm(const std::vector<std::string>& data) const override {
        std::string result;
        std::vector<std::string> copy(data);
        std::sort(copy.begin(), copy.end(), std::greater<std::string>());
        
        for (const std::string& letter : copy) {
            result += letter;
        }
        return result;
    }
};
```

## Applicazione dei Design Pattern in Progetti Reali

I design pattern sono strumenti potenti, ma devono essere utilizzati con giudizio. Ecco alcune linee guida per l'applicazione dei design pattern nei progetti reali:

1. **Comprendi il problema prima di applicare un pattern**: Non forzare l'uso di un pattern se non è necessario.
2. **Inizia semplice**: Non complicare il design con pattern non necessari.
3. **Considera il contesto**: Un pattern che funziona bene in un contesto potrebbe non essere adatto in un altro.
4. **Combina i pattern**: Spesso i pattern funzionano meglio quando vengono utilizzati insieme.
5. **Documenta l'uso dei pattern**: Assicurati che altri sviluppatori possano comprendere il tuo design.

## Domande di Autovalutazione

1. Quali sono le tre categorie principali di design pattern e quali problemi risolvono?
2. Come il pattern Singleton garantisce che una classe abbia una sola istanza?
3. Qual è la differenza tra Factory Method e Abstract Factory?
4. In quali situazioni il pattern Observer è particolarmente utile?
5. Come il pattern Strategy permette di cambiare il comportamento di un'applicazione a runtime?

## Esercizi Proposti

1. Implementa il pattern Singleton in modo thread-safe utilizzando le funzionalità di C++11.
2. Crea un sistema di logging utilizzando il pattern Observer, dove diversi tipi di logger (console, file, database) osservano un oggetto LogManager.
3. Implementa un sistema di pagamento utilizzando il pattern Strategy, dove diverse strategie di pagamento (carta di credito, PayPal, bonifico bancario) possono essere utilizzate in modo intercambiabile.
4. Progetta un editor di testo semplice utilizzando il pattern Command per implementare le funzionalità di annulla/ripeti.
5. Crea un sistema di plugin utilizzando il pattern Abstract Factory, dove diverse fabbriche creano famiglie di plugin compatibili tra loro.

## Conclusione

I design pattern sono strumenti potenti nel toolkit di ogni sviluppatore C++. Comprendere quando e come applicarli può migliorare significativamente la qualità del codice e la produttività dello sviluppo. Ricorda che i pattern non sono soluzioni universali, ma piuttosto linee guida che devono essere adattate al contesto specifico del tuo progetto.