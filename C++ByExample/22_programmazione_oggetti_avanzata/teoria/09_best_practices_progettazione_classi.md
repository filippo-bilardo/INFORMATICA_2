# Best Practices nella Progettazione delle Classi in C++

## Introduzione

La progettazione efficace delle classi è fondamentale per creare software robusto, manutenibile ed efficiente in C++. Una buona progettazione delle classi non solo facilita lo sviluppo iniziale, ma semplifica anche la manutenzione, l'estensione e il debug del codice nel lungo termine. In questa guida, esploreremo le migliori pratiche per la progettazione delle classi in C++, con esempi concreti e linee guida pratiche.

## Principi Fondamentali nella Progettazione delle Classi

### Responsabilità Singola

Una classe dovrebbe avere una sola ragione per cambiare, ovvero dovrebbe avere una singola responsabilità. Questo principio, noto come Principio di Responsabilità Singola (SRP), è il primo dei principi SOLID.

```cpp
// Approccio errato: classe con troppe responsabilità
class Utente {
public:
    void autenticaUtente(const std::string& username, const std::string& password);
    void inviaEmail(const std::string& messaggio);
    void generaReport();
    void salvaDatabase();
};

// Approccio corretto: classi con responsabilità singole
class Autenticazione {
public:
    bool autenticaUtente(const std::string& username, const std::string& password);
};

class EmailService {
public:
    void inviaEmail(const std::string& destinatario, const std::string& messaggio);
};

class ReportGenerator {
public:
    void generaReport(const Utente& utente);
};

class Database {
public:
    void salva(const Utente& utente);
};

class Utente {
private:
    std::string username;
    std::string email;
    // Altri dati dell'utente

public:
    // Metodi per accedere e modificare i dati dell'utente
};
```

### Coesione Alta

Una classe dovrebbe avere un alto grado di coesione, ovvero i suoi membri dovrebbero essere strettamente correlati e lavorare insieme per un obiettivo comune.

```cpp
// Bassa coesione
class Utilità {
public:
    static void ordinaArray(int arr[], int size);
    static void convertiInMaiuscolo(std::string& str);
    static double calcolaMedia(const std::vector<double>& valori);
    static void inviaEmail(const std::string& destinatario, const std::string& messaggio);
};

// Alta coesione
class Ordinatore {
public:
    static void ordinaArray(int arr[], int size);
    static void ordinaVector(std::vector<int>& vec);
};

class StringUtils {
public:
    static void convertiInMaiuscolo(std::string& str);
    static void convertiInMinuscolo(std::string& str);
    static std::string rimuoviSpazi(const std::string& str);
};

class Statistiche {
public:
    static double calcolaMedia(const std::vector<double>& valori);
    static double calcolaMediana(const std::vector<double>& valori);
    static double calcolaVarianza(const std::vector<double>& valori);
};
```

### Accoppiamento Basso

Le classi dovrebbero avere un basso grado di accoppiamento, ovvero dovrebbero dipendere il meno possibile da altre classi.

```cpp
// Alto accoppiamento
class Ordine {
private:
    Database db;
    EmailService emailService;
    Cliente cliente;

public:
    void elabora() {
        db.salva(*this);
        emailService.inviaConferma(cliente.getEmail());
    }
};

// Basso accoppiamento con Dependency Injection
class Ordine {
private:
    Cliente& cliente;

public:
    Ordine(Cliente& c) : cliente(c) {}
    
    void elabora(Database& db, EmailService& emailService) {
        db.salva(*this);
        emailService.inviaConferma(cliente.getEmail());
    }
};
```

## Progettazione dell'Interfaccia della Classe

### Interfacce Chiare e Minimali

L'interfaccia pubblica di una classe dovrebbe essere chiara, intuitiva e minimale.

```cpp
// Interfaccia confusa e sovraccarica
class Vettore {
public:
    void aggiungi(int elemento);
    void inserisci(int elemento);
    void push(int elemento);
    void append(int elemento);
    // Tutti questi metodi fanno essenzialmente la stessa cosa!
};

// Interfaccia chiara e minimale
class Vettore {
public:
    void aggiungi(int elemento);  // Un solo metodo con un nome chiaro
    int ottieni(size_t indice) const;
    size_t dimensione() const;
};
```

### Nomi Significativi

I nomi delle classi, dei metodi e degli attributi dovrebbero essere significativi e descrivere chiaramente il loro scopo.

```cpp
// Nomi poco significativi
class X {
private:
    int a;
    std::string b;

public:
    void proc1();
    int proc2();
};

// Nomi significativi
class Cliente {
private:
    int id;
    std::string nome;

public:
    void registra();
    int calcolaPunteggio();
};
```

### Parametri di Default e Overloading

Utilizza parametri di default e overloading dei metodi per rendere l'interfaccia più flessibile e facile da usare.

```cpp
class Messaggio {
public:
    // Costruttore con parametri di default
    Messaggio(const std::string& testo = "", const std::string& mittente = "Sistema");
    
    // Overloading dei metodi
    void invia(const std::string& destinatario);
    void invia(const std::vector<std::string>& destinatari);
};
```

## Gestione delle Risorse

### Regola dei Tre/Cinque

Se una classe necessita di un distruttore personalizzato, probabilmente necessita anche di un costruttore di copia e di un operatore di assegnazione personalizzati (Regola dei Tre). In C++11 e successivi, si aggiungono il costruttore di spostamento e l'operatore di assegnazione per spostamento (Regola dei Cinque).

```cpp
class GestoreRisorse {
private:
    int* risorsa;

public:
    // Costruttore
    GestoreRisorse(int valore) : risorsa(new int(valore)) {}
    
    // Distruttore
    ~GestoreRisorse() {
        delete risorsa;
    }
    
    // Costruttore di copia
    GestoreRisorse(const GestoreRisorse& altro) : risorsa(new int(*altro.risorsa)) {}
    
    // Operatore di assegnazione per copia
    GestoreRisorse& operator=(const GestoreRisorse& altro) {
        if (this != &altro) {
            delete risorsa;
            risorsa = new int(*altro.risorsa);
        }
        return *this;
    }
    
    // Costruttore di spostamento (C++11)
    GestoreRisorse(GestoreRisorse&& altro) noexcept : risorsa(altro.risorsa) {
        altro.risorsa = nullptr;
    }
    
    // Operatore di assegnazione per spostamento (C++11)
    GestoreRisorse& operator=(GestoreRisorse&& altro) noexcept {
        if (this != &altro) {
            delete risorsa;
            risorsa = altro.risorsa;
            altro.risorsa = nullptr;
        }
        return *this;
    }
};
```

### RAII (Resource Acquisition Is Initialization)

Utilizza il pattern RAII per gestire le risorse, assicurandoti che vengano acquisite durante l'inizializzazione e rilasciate durante la distruzione.

```cpp
class FileHandler {
private:
    std::FILE* file;

public:
    FileHandler(const std::string& filename, const std::string& mode) {
        file = std::fopen(filename.c_str(), mode.c_str());
        if (!file) {
            throw std::runtime_error("Impossibile aprire il file");
        }
    }
    
    ~FileHandler() {
        if (file) {
            std::fclose(file);
        }
    }
    
    // Disabilita la copia
    FileHandler(const FileHandler&) = delete;
    FileHandler& operator=(const FileHandler&) = delete;
    
    // Permetti lo spostamento
    FileHandler(FileHandler&& altro) noexcept : file(altro.file) {
        altro.file = nullptr;
    }
    
    FileHandler& operator=(FileHandler&& altro) noexcept {
        if (this != &altro) {
            if (file) {
                std::fclose(file);
            }
            file = altro.file;
            altro.file = nullptr;
        }
        return *this;
    }
    
    // Metodi per utilizzare il file
    void scrivi(const std::string& data) {
        if (std::fputs(data.c_str(), file) == EOF) {
            throw std::runtime_error("Errore durante la scrittura");
        }
    }
};
```

### Smart Pointer

Utilizza gli smart pointer (`std::unique_ptr`, `std::shared_ptr`, `std::weak_ptr`) per gestire automaticamente la memoria dinamica.

```cpp
class Risorsa {
public:
    void utilizza() {
        std::cout << "Risorsa utilizzata" << std::endl;
    }
};

class Gestore {
private:
    std::unique_ptr<Risorsa> risorsa;

public:
    Gestore() : risorsa(std::make_unique<Risorsa>()) {}
    
    void esegui() {
        risorsa->utilizza();
    }
    
    // Non è necessario un distruttore personalizzato!
    // unique_ptr si occupa automaticamente della deallocazione
};
```

## Invarianti di Classe

### Costruttori e Validazione

I costruttori dovrebbero stabilire tutti gli invarianti di classe e rifiutare input invalidi.

```cpp
class Rettangolo {
private:
    double larghezza;
    double altezza;

public:
    Rettangolo(double l, double a) {
        if (l <= 0 || a <= 0) {
            throw std::invalid_argument("Le dimensioni devono essere positive");
        }
        larghezza = l;
        altezza = a;
    }
    
    double area() const {
        return larghezza * altezza;
    }
};
```

### Metodi Const-Correct

Dichiara i metodi che non modificano lo stato dell'oggetto come `const`.

```cpp
class Punto {
private:
    double x, y;

public:
    Punto(double x, double y) : x(x), y(y) {}
    
    // Metodi che non modificano lo stato dell'oggetto
    double getX() const { return x; }
    double getY() const { return y; }
    double distanzaDallOrigine() const {
        return std::sqrt(x*x + y*y);
    }
    
    // Metodi che modificano lo stato dell'oggetto
    void setX(double nuovoX) { x = nuovoX; }
    void setY(double nuovoY) { y = nuovoY; }
    void sposta(double deltaX, double deltaY) {
        x += deltaX;
        y += deltaY;
    }
};
```

## Ereditarietà e Polimorfismo

### Progettazione per l'Ereditarietà

Se una classe è destinata a essere ereditata, progettala di conseguenza.

```cpp
class Forma {
public:
    // Distruttore virtuale per garantire la corretta distruzione
    virtual ~Forma() = default;
    
    // Metodi virtuali per il comportamento polimorfico
    virtual double area() const = 0;
    virtual double perimetro() const = 0;
    
    // Metodo non virtuale che utilizza i metodi virtuali
    double rapportoAreaPerimetro() const {
        return area() / perimetro();
    }

protected:
    // Costruttore protetto per impedire l'istanziazione diretta
    Forma() = default;
};
```

### Principio di Sostituzione di Liskov

Le classi derivate dovrebbero essere sostituibili alle classi base senza alterare la correttezza del programma.

```cpp
class Uccello {
public:
    virtual ~Uccello() = default;
    virtual void canta() const {
        std::cout << "Cip cip" << std::endl;
    }
};

class Canarino : public Uccello {
public:
    void canta() const override {
        std::cout << "Trillo trillo" << std::endl;
    }
};

class Pinguino : public Uccello {
public:
    // I pinguini non cantano, ma possiamo fornire un'implementazione ragionevole
    void canta() const override {
        std::cout << "Squawk" << std::endl;
    }
};

// Funzione che utilizza il polimorfismo
void faiCantare(const Uccello& uccello) {
    uccello.canta();
}

// Uso
Uccello* uccello = new Canarino();
faiCantare(*uccello); // Output: Trillo trillo
delete uccello;

uccello = new Pinguino();
faiCantare(*uccello); // Output: Squawk
delete uccello;
```

## Ottimizzazione delle Prestazioni

### Passaggio dei Parametri

Scegli il modo più efficiente per passare i parametri.

```cpp
// Tipi primitivi: passa per valore
void funzione(int x, double y);

// Oggetti piccoli e copiabili: passa per valore
void funzione(std::pair<int, int> coppia);

// Oggetti grandi o non copiabili: passa per riferimento costante
void funzione(const BigObject& obj);

// Quando devi modificare l'oggetto: passa per riferimento
void funzione(std::vector<int>& vec);

// Per trasferire la proprietà: passa per rvalue reference (C++11)
void funzione(std::unique_ptr<Resource>&& resource);
```

### Move Semantics (C++11)

Utilizza la semantica di spostamento per evitare copie inutili.

```cpp
class Buffer {
private:
    std::vector<char> data;

public:
    // Costruttore di spostamento
    Buffer(Buffer&& altro) noexcept : data(std::move(altro.data)) {}
    
    // Operatore di assegnazione per spostamento
    Buffer& operator=(Buffer&& altro) noexcept {
        if (this != &altro) {
            data = std::move(altro.data);
        }
        return *this;
    }
    
    // Metodo che utilizza la semantica di spostamento
    void setData(std::vector<char>&& nuovaData) {
        data = std::move(nuovaData);
    }
};
```

### Evitare Copie Inutili

Utilizza riferimenti, puntatori e la semantica di spostamento per evitare copie inutili.

```cpp
// Inefficiente: copia l'intero vettore
std::vector<int> filtra(std::vector<int> vec, int soglia) {
    std::vector<int> risultato;
    for (int x : vec) {
        if (x > soglia) {
            risultato.push_back(x);
        }
    }
    return risultato;
}

// Efficiente: usa riferimenti e evita copie
std::vector<int> filtra(const std::vector<int>& vec, int soglia) {
    std::vector<int> risultato;
    risultato.reserve(vec.size()); // Preallocazione per evitare riallocazioni
    for (int x : vec) {
        if (x > soglia) {
            risultato.push_back(x);
        }
    }
    return risultato;
}
```

## Gestione degli Errori

### Eccezioni

Utilizza le eccezioni per gestire gli errori in modo robusto.

```cpp
class DatabaseConnection {
private:
    bool connected;
    // Altri membri...

public:
    DatabaseConnection() : connected(false) {}
    
    void connect(const std::string& connectionString) {
        // Tentativo di connessione
        if (/* connessione fallita */) {
            throw std::runtime_error("Impossibile connettersi al database");
        }
        connected = true;
    }
    
    void executeQuery(const std::string& query) {
        if (!connected) {
            throw std::logic_error("Connessione al database non stabilita");
        }
        // Esecuzione della query
    }
};
```

### Sicurezza delle Eccezioni

Assicurati che le tue classi siano sicure rispetto alle eccezioni.

```cpp
class ResourceManager {
private:
    Resource* resource1;
    Resource* resource2;

public:
    // Costruttore non sicuro rispetto alle eccezioni
    ResourceManager() {
        resource1 = new Resource();
        // Se l'allocazione di resource2 lancia un'eccezione, resource1 non viene deallocato
        resource2 = new Resource();
    }
    
    // Costruttore sicuro rispetto alle eccezioni usando smart pointer
    ResourceManager() : resource1(nullptr), resource2(nullptr) {
        std::unique_ptr<Resource> temp1(new Resource());
        std::unique_ptr<Resource> temp2(new Resource());
        
        resource1 = temp1.release();
        resource2 = temp2.release();
    }
    
    // Ancora meglio: usa direttamente gli smart pointer come membri
    // std::unique_ptr<Resource> resource1;
    // std::unique_ptr<Resource> resource2;
};
```

## Documentazione e Commenti

### Documentazione dell'Interfaccia

Documenta chiaramente l'interfaccia pubblica della tua classe.

```cpp
/**
 * @class Calculator
 * @brief Classe per eseguire operazioni matematiche di base.
 */
class Calculator {
public:
    /**
     * @brief Somma due numeri.
     * @param a Primo addendo.
     * @param b Secondo addendo.
     * @return La somma di a e b.
     */
    double add(double a, double b);
    
    /**
     * @brief Divide due numeri.
     * @param numerator Numeratore.
     * @param denominator Denominatore.
     * @return Il risultato della divisione.
     * @throws std::invalid_argument Se il denominatore è zero.
     */
    double divide(double numerator, double denominator);
};
```

### Commenti Interni

Usa commenti interni per spiegare parti complesse o non ovvie del codice.

```cpp
void algoritmoComplesso() {
    // Inizializzazione delle strutture dati
    // ...
    
    // Fase 1: Preprocessing dei dati
    // ...
    
    // Fase 2: Applicazione dell'algoritmo principale
    // Utilizziamo l'algoritmo di Dijkstra per trovare il percorso più breve
    // ...
    
    // Fase 3: Postprocessing dei risultati
    // ...
}
```

## Testing

### Progettazione per il Testing

Progetta le tue classi in modo che siano facilmente testabili.

```cpp
// Difficile da testare: dipendenze hardcoded
class OrderProcessor {
private:
    Database db;
    EmailService emailService;

public:
    void processOrder(const Order& order) {
        db.save(order);
        emailService.sendConfirmation(order.getCustomerEmail());
    }
};

// Facile da testare: dependency injection
class OrderProcessor {
public:
    void processOrder(const Order& order, Database& db, EmailService& emailService) {
        db.save(order);
        emailService.sendConfirmation(order.getCustomerEmail());
    }
};
```

### Interfacce per il Mock

Utilizza interfacce per facilitare il mocking nei test.

```cpp
class DatabaseInterface {
public:
    virtual ~DatabaseInterface() = default;
    virtual void save(const Order& order) = 0;
};

class RealDatabase : public DatabaseInterface {
public:
    void save(const Order& order) override {
        // Implementazione reale
    }
};

class MockDatabase : public DatabaseInterface {
public:
    void save(const Order& order) override {
        // Implementazione mock per i test
        savedOrders.push_back(order);
    }
    
    std::vector<Order> savedOrders;
};

class OrderProcessor {
public:
    void processOrder(const Order& order, DatabaseInterface& db) {
        db.save(order);
    }
};

// Test
void testOrderProcessor() {
    MockDatabase mockDb;
    OrderProcessor processor;
    Order order("123", "customer@example.com");
    
    processor.processOrder(order, mockDb);
    
    assert(mockDb.savedOrders.size() == 1);
    assert(mockDb.savedOrders[0].getId() == "123");
}
```

## Domande di Autovalutazione

1. Quali sono i principi fondamentali da seguire nella progettazione delle classi in C++?
2. Come si applica il principio di responsabilità singola nella progettazione delle classi?
3. Quali sono le best practices per la gestione delle risorse nelle classi C++?
4. Come si progetta una classe per garantire che sia facilmente testabile?
5. Quali sono le considerazioni importanti quando si progetta una classe che sarà ereditata?

## Esercizi Proposti

1. Progetta una classe `StringBuffer` che gestisce in modo efficiente la concatenazione di stringhe, utilizzando le best practices discusse.
2. Refactoring di una classe esistente per migliorarne la progettazione, applicando i principi di responsabilità singola, alta coesione e basso accoppiamento.
3. Implementa una gerarchia di classi per un sistema di logging che segua le best practices per l'ereditarietà e il polimorfismo.
4. Progetta una classe `ThreadSafeQueue` che implementi una coda thread-safe, applicando le best practices per la gestione delle risorse e la sicurezza delle eccezioni.
5. Crea un sistema di gestione delle configurazioni che utilizzi le best practices per l'interfaccia della classe e la documentazione.