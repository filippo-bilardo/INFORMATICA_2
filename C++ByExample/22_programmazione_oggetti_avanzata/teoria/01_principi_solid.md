# Principi SOLID in C++

In questa guida, esploreremo i principi SOLID, un insieme di linee guida fondamentali per la progettazione di software orientato agli oggetti che promuovono la creazione di codice manutenibile, estensibile e robusto.

## Cosa sono i Principi SOLID?

I principi SOLID sono stati introdotti da Robert C. Martin (Uncle Bob) e rappresentano cinque principi di progettazione che, se seguiti, portano a software più facile da mantenere e da estendere. L'acronimo SOLID sta per:

- **S**: Single Responsibility Principle (Principio di Responsabilità Singola)
- **O**: Open-Closed Principle (Principio Aperto-Chiuso)
- **L**: Liskov Substitution Principle (Principio di Sostituzione di Liskov)
- **I**: Interface Segregation Principle (Principio di Segregazione dell'Interfaccia)
- **D**: Dependency Inversion Principle (Principio di Inversione delle Dipendenze)

Vediamo ciascun principio in dettaglio con esempi pratici in C++.

## S - Single Responsibility Principle (SRP)

Il principio di responsabilità singola afferma che una classe dovrebbe avere una sola ragione per cambiare, ovvero dovrebbe avere una sola responsabilità.

### Esempio di violazione del SRP:

```cpp
class Report {
public:
    void generateReport(const std::vector<Data>& data) {
        // Logica per generare il report
    }
    
    void saveToFile(const std::string& filename) {
        // Logica per salvare il report su file
    }
    
    void printReport() {
        // Logica per stampare il report
    }
    
    void sendByEmail(const std::string& recipient) {
        // Logica per inviare il report via email
    }
};
```

In questo esempio, la classe `Report` ha troppe responsabilità: generare il report, salvarlo, stamparlo e inviarlo via email.

### Esempio corretto che rispetta il SRP:

```cpp
class ReportGenerator {
public:
    std::string generateReport(const std::vector<Data>& data) {
        // Logica per generare il report
        return reportContent;
    }
};

class ReportSaver {
public:
    void saveToFile(const std::string& content, const std::string& filename) {
        // Logica per salvare il report su file
    }
};

class ReportPrinter {
public:
    void printReport(const std::string& content) {
        // Logica per stampare il report
    }
};

class EmailSender {
public:
    void sendEmail(const std::string& content, const std::string& recipient) {
        // Logica per inviare il report via email
    }
};
```

Ora ogni classe ha una singola responsabilità, rendendo il codice più modulare e facile da mantenere.

## O - Open-Closed Principle (OCP)

Il principio aperto-chiuso afferma che le entità software (classi, moduli, funzioni, ecc.) dovrebbero essere aperte all'estensione ma chiuse alla modifica.

### Esempio di violazione dell'OCP:

```cpp
class Shape {
public:
    enum Type { CIRCLE, RECTANGLE };
    
    Shape(Type type) : type(type) {}
    
    double area() const {
        if (type == CIRCLE) {
            return 3.14159 * radius * radius;
        } else if (type == RECTANGLE) {
            return width * height;
        }
        return 0;
    }
    
    Type type;
    double radius;
    double width;
    double height;
};
```

Se volessimo aggiungere un nuovo tipo di forma, dovremmo modificare la classe `Shape` e il metodo `area()`.

### Esempio corretto che rispetta l'OCP:

```cpp
class Shape {
public:
    virtual double area() const = 0;
    virtual ~Shape() = default;
};

class Circle : public Shape {
public:
    Circle(double radius) : radius(radius) {}
    
    double area() const override {
        return 3.14159 * radius * radius;
    }
    
private:
    double radius;
};

class Rectangle : public Shape {
public:
    Rectangle(double width, double height) : width(width), height(height) {}
    
    double area() const override {
        return width * height;
    }
    
private:
    double width;
    double height;
};

// Aggiungere un nuovo tipo di forma è semplice senza modificare il codice esistente
class Triangle : public Shape {
public:
    Triangle(double base, double height) : base(base), height(height) {}
    
    double area() const override {
        return 0.5 * base * height;
    }
    
private:
    double base;
    double height;
};
```

Ora possiamo estendere il sistema aggiungendo nuove forme senza modificare il codice esistente.

## L - Liskov Substitution Principle (LSP)

Il principio di sostituzione di Liskov afferma che gli oggetti di una classe derivata devono poter sostituire gli oggetti della classe base senza alterare la correttezza del programma.

### Esempio di violazione del LSP:

```cpp
class Rectangle {
public:
    virtual void setWidth(double w) { width = w; }
    virtual void setHeight(double h) { height = h; }
    double getWidth() const { return width; }
    double getHeight() const { return height; }
    double area() const { return width * height; }

protected:
    double width;
    double height;
};

class Square : public Rectangle {
public:
    void setWidth(double w) override {
        width = w;
        height = w;  // Un quadrato ha lati uguali
    }
    
    void setHeight(double h) override {
        width = h;  // Un quadrato ha lati uguali
        height = h;
    }
};

// Questo codice viola il LSP
void processRectangle(Rectangle& r) {
    r.setWidth(5);
    r.setHeight(4);
    // Ci aspettiamo che l'area sia 5 * 4 = 20
    assert(r.area() == 20);  // Fallisce se r è un Square
}
```

In questo esempio, `Square` non può sostituire `Rectangle` senza alterare il comportamento del programma.

### Esempio corretto che rispetta il LSP:

```cpp
class Shape {
public:
    virtual double area() const = 0;
    virtual ~Shape() = default;
};

class Rectangle : public Shape {
public:
    Rectangle(double width, double height) : width(width), height(height) {}
    
    void setWidth(double w) { width = w; }
    void setHeight(double h) { height = h; }
    double getWidth() const { return width; }
    double getHeight() const { return height; }
    
    double area() const override { return width * height; }

protected:
    double width;
    double height;
};

class Square : public Shape {
public:
    Square(double side) : side(side) {}
    
    void setSide(double s) { side = s; }
    double getSide() const { return side; }
    
    double area() const override { return side * side; }

protected:
    double side;
};

// Ora possiamo usare Shape come tipo base
void processShape(Shape& s) {
    // Lavoriamo con l'interfaccia comune
    std::cout << "Area: " << s.area() << std::endl;
}
```

In questo modo, `Square` non è più una sottoclasse di `Rectangle`, ma entrambi implementano l'interfaccia `Shape`.

## I - Interface Segregation Principle (ISP)

Il principio di segregazione dell'interfaccia afferma che i client non dovrebbero essere forzati a dipendere da interfacce che non utilizzano.

### Esempio di violazione dell'ISP:

```cpp
class Printer {
public:
    virtual void print(const Document& doc) = 0;
    virtual void scan(Document& doc) = 0;
    virtual void fax(const Document& doc) = 0;
    virtual void copy(const Document& doc) = 0;
    virtual ~Printer() = default;
};

// Una stampante base che può solo stampare è costretta a implementare metodi che non utilizza
class SimplePrinter : public Printer {
public:
    void print(const Document& doc) override {
        // Implementazione della stampa
    }
    
    void scan(Document& doc) override {
        throw std::runtime_error("Operazione non supportata");
    }
    
    void fax(const Document& doc) override {
        throw std::runtime_error("Operazione non supportata");
    }
    
    void copy(const Document& doc) override {
        throw std::runtime_error("Operazione non supportata");
    }
};
```

### Esempio corretto che rispetta l'ISP:

```cpp
class Printer {
public:
    virtual void print(const Document& doc) = 0;
    virtual ~Printer() = default;
};

class Scanner {
public:
    virtual void scan(Document& doc) = 0;
    virtual ~Scanner() = default;
};

class Fax {
public:
    virtual void fax(const Document& doc) = 0;
    virtual ~Fax() = default;
};

class Copier {
public:
    virtual void copy(const Document& doc) = 0;
    virtual ~Copier() = default;
};

// Ora possiamo implementare solo le interfacce necessarie
class SimplePrinter : public Printer {
public:
    void print(const Document& doc) override {
        // Implementazione della stampa
    }
};

// Un dispositivo multifunzione implementa tutte le interfacce
class AllInOnePrinter : public Printer, public Scanner, public Fax, public Copier {
public:
    void print(const Document& doc) override {
        // Implementazione della stampa
    }
    
    void scan(Document& doc) override {
        // Implementazione della scansione
    }
    
    void fax(const Document& doc) override {
        // Implementazione del fax
    }
    
    void copy(const Document& doc) override {
        // Implementazione della copia
    }
};
```

Ora ogni classe implementa solo le interfacce di cui ha bisogno.

## D - Dependency Inversion Principle (DIP)

Il principio di inversione delle dipendenze afferma che i moduli di alto livello non dovrebbero dipendere da moduli di basso livello. Entrambi dovrebbero dipendere da astrazioni. Inoltre, le astrazioni non dovrebbero dipendere dai dettagli, ma i dettagli dovrebbero dipendere dalle astrazioni.

### Esempio di violazione del DIP:

```cpp
class MySQLDatabase {
public:
    void connect() {
        // Logica per connettersi a MySQL
    }
    
    void query(const std::string& sql) {
        // Logica per eseguire query su MySQL
    }
};

class UserRepository {
private:
    MySQLDatabase database;
    
public:
    UserRepository() {
        database.connect();
    }
    
    User findById(int id) {
        database.query("SELECT * FROM users WHERE id = " + std::to_string(id));
        // Elaborazione del risultato
        return user;
    }
};
```

In questo esempio, `UserRepository` dipende direttamente da `MySQLDatabase`, rendendo difficile cambiare il database in futuro.

### Esempio corretto che rispetta il DIP:

```cpp
class Database {
public:
    virtual void connect() = 0;
    virtual void query(const std::string& sql) = 0;
    virtual ~Database() = default;
};

class MySQLDatabase : public Database {
public:
    void connect() override {
        // Logica per connettersi a MySQL
    }
    
    void query(const std::string& sql) override {
        // Logica per eseguire query su MySQL
    }
};

class PostgreSQLDatabase : public Database {
public:
    void connect() override {
        // Logica per connettersi a PostgreSQL
    }
    
    void query(const std::string& sql) override {
        // Logica per eseguire query su PostgreSQL
    }
};

class UserRepository {
private:
    Database& database;
    
public:
    UserRepository(Database& db) : database(db) {
        database.connect();
    }
    
    User findById(int id) {
        database.query("SELECT * FROM users WHERE id = " + std::to_string(id));
        // Elaborazione del risultato
        return user;
    }
};

// Utilizzo
MySQLDatabase mysqlDb;
UserRepository userRepo(mysqlDb);

// Oppure
PostgreSQLDatabase postgresDb;
UserRepository anotherUserRepo(postgresDb);
```

Ora `UserRepository` dipende dall'astrazione `Database` e non da una implementazione specifica, rendendo il codice più flessibile e testabile.

## Vantaggi dell'Applicazione dei Principi SOLID

L'applicazione dei principi SOLID porta numerosi vantaggi:

1. **Manutenibilità**: Il codice diventa più facile da mantenere e modificare.
2. **Estensibilità**: È più semplice estendere il sistema con nuove funzionalità.
3. **Testabilità**: Il codice diventa più facile da testare, specialmente attraverso unit test.
4. **Riusabilità**: I componenti possono essere riutilizzati in diversi contesti.
5. **Robustezza**: Il sistema diventa più resistente ai cambiamenti.

## Domande di Autovalutazione

1. Qual è il significato dell'acronimo SOLID e quali principi rappresenta?
2. Come si può violare il principio di responsabilità singola e come si può correggerlo?
3. Perché è importante che una classe sia aperta all'estensione ma chiusa alla modifica?
4. Spiega con un esempio pratico il principio di sostituzione di Liskov.
5. Come il principio di segregazione dell'interfaccia migliora la progettazione del software?
6. In che modo il principio di inversione delle dipendenze facilita il testing e la manutenzione del codice?
7. Quali sono i principali vantaggi dell'applicazione dei principi SOLID nella progettazione del software?

## Esercizi Proposti

1. Identifica le violazioni dei principi SOLID in un progetto esistente e proponi soluzioni per correggerle.
2. Progetta un sistema di gestione di una biblioteca seguendo i principi SOLID.
3. Refactoring di un'applicazione di e-commerce per rispettare il principio di responsabilità singola.
4. Implementa un framework di plugin che rispetti il principio aperto-chiuso.
5. Crea un sistema di notifiche (email, SMS, push) che rispetti il principio di inversione delle dipendenze.

## Conclusione

I principi SOLID sono fondamentali per creare software orientato agli oggetti di alta qualità. Applicandoli correttamente, è possibile creare sistemi più manutenibili, estensibili e robusti. Ricorda che questi principi sono linee guida, non regole rigide, e devono essere applicati con buon senso in base al contesto specifico del progetto.