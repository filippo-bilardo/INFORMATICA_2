# Esercitazione 30: Progetto Finale

## Obiettivo

L'obiettivo di questa esercitazione è applicare tutte le conoscenze acquisite durante il corso per sviluppare un progetto completo in C++. Questo progetto finale ti permetterà di dimostrare la tua comprensione dei concetti fondamentali e avanzati del linguaggio C++, nonché la tua capacità di progettare e implementare un'applicazione funzionale.

## Descrizione del Progetto

Il progetto finale consiste nello sviluppo di un **Sistema di Gestione di una Biblioteca**. Questo sistema dovrà gestire libri, utenti, prestiti e restituzioni, offrendo un'interfaccia utente interattiva e funzionalità complete di gestione dei dati.

## Requisiti Funzionali

1. **Gestione dei Libri**:
   - Aggiunta, modifica ed eliminazione di libri
   - Ricerca di libri per titolo, autore, genere, ISBN
   - Visualizzazione dello stato di disponibilità dei libri

2. **Gestione degli Utenti**:
   - Registrazione, modifica ed eliminazione di utenti
   - Ricerca di utenti per nome, ID, email
   - Visualizzazione dello storico prestiti di un utente

3. **Gestione dei Prestiti**:
   - Registrazione di nuovi prestiti
   - Registrazione delle restituzioni
   - Calcolo di eventuali penalità per ritardi
   - Visualizzazione dei prestiti attivi e scaduti

4. **Funzionalità Aggiuntive**:
   - Generazione di report statistici (libri più prestati, utenti più attivi, ecc.)
   - Sistema di notifiche per prestiti in scadenza
   - Backup e ripristino dei dati

## Requisiti Tecnici

1. **Architettura del Software**:
   - Utilizzo del paradigma di programmazione a oggetti
   - Implementazione di design patterns appropriati
   - Separazione delle responsabilità (Model-View-Controller o simile)

2. **Gestione dei Dati**:
   - Persistenza dei dati (file, database SQLite, ecc.)
   - Gestione efficiente della memoria
   - Validazione dei dati in input

3. **Interfaccia Utente**:
   - Interfaccia a riga di comando ben strutturata
   - Opzionale: interfaccia grafica (utilizzando librerie come Qt, wxWidgets, ecc.)

4. **Qualità del Codice**:
   - Codice ben organizzato e commentato
   - Gestione appropriata delle eccezioni
   - Unit testing per le componenti principali

## Struttura Suggerita del Progetto

```
biblioteca/
├── include/                  # Header files
│   ├── models/               # Classi per i dati
│   │   ├── libro.hpp
│   │   ├── utente.hpp
│   │   └── prestito.hpp
│   ├── controllers/          # Logica di business
│   │   ├── libro_controller.hpp
│   │   ├── utente_controller.hpp
│   │   └── prestito_controller.hpp
│   ├── views/                # Interfaccia utente
│   │   ├── cli_view.hpp
│   │   └── gui_view.hpp (opzionale)
│   └── utils/                # Utilità
│       ├── database.hpp
│       ├── config.hpp
│       └── logger.hpp
├── src/                      # Implementazioni
│   ├── models/
│   ├── controllers/
│   ├── views/
│   └── utils/
├── tests/                    # Unit tests
├── data/                     # Dati persistenti
├── docs/                     # Documentazione
└── main.cpp                  # Entry point
```

## Fasi di Sviluppo Suggerite

1. **Analisi e Progettazione**:
   - Definizione dettagliata dei requisiti
   - Progettazione delle classi e delle loro relazioni (UML)
   - Definizione dell'architettura del sistema

2. **Implementazione Base**:
   - Creazione delle classi di base (Libro, Utente, Prestito)
   - Implementazione della persistenza dei dati
   - Sviluppo dell'interfaccia utente di base

3. **Implementazione delle Funzionalità**:
   - Sviluppo delle funzionalità di gestione dei libri
   - Sviluppo delle funzionalità di gestione degli utenti
   - Sviluppo delle funzionalità di gestione dei prestiti

4. **Testing e Raffinamento**:
   - Scrittura e esecuzione di unit test
   - Correzione di bug e miglioramento delle prestazioni
   - Aggiunta di funzionalità avanzate

5. **Documentazione e Finalizzazione**:
   - Scrittura della documentazione del codice
   - Preparazione di un manuale utente
   - Preparazione della presentazione del progetto

## Esempio di Implementazione delle Classi Base

### Classe Libro

```cpp
// include/models/libro.hpp
#ifndef LIBRO_HPP
#define LIBRO_HPP

#include <string>
#include <vector>
#include <memory>

class Libro {
private:
    std::string isbn;
    std::string titolo;
    std::string autore;
    std::string genere;
    int anno_pubblicazione;
    bool disponibile;

public:
    // Costruttori
    Libro() = default;
    Libro(const std::string& isbn, const std::string& titolo, const std::string& autore,
          const std::string& genere, int anno_pubblicazione);
    
    // Getters
    std::string getIsbn() const;
    std::string getTitolo() const;
    std::string getAutore() const;
    std::string getGenere() const;
    int getAnnoPubblicazione() const;
    bool isDisponibile() const;
    
    // Setters
    void setTitolo(const std::string& titolo);
    void setAutore(const std::string& autore);
    void setGenere(const std::string& genere);
    void setAnnoPubblicazione(int anno);
    void setDisponibile(bool disponibile);
    
    // Metodi
    std::string toString() const;
    
    // Operatori
    bool operator==(const Libro& other) const;
    bool operator!=(const Libro& other) const;
};

// Definizione di un tipo per una collezione di libri
typedef std::vector<std::shared_ptr<Libro>> LibroCollection;

#endif // LIBRO_HPP
```

### Classe Utente

```cpp
// include/models/utente.hpp
#ifndef UTENTE_HPP
#define UTENTE_HPP

#include <string>
#include <vector>
#include <memory>

class Utente {
private:
    int id;
    std::string nome;
    std::string cognome;
    std::string email;
    std::string telefono;
    static int nextId;

public:
    // Costruttori
    Utente() = default;
    Utente(const std::string& nome, const std::string& cognome, 
           const std::string& email, const std::string& telefono);
    
    // Getters
    int getId() const;
    std::string getNome() const;
    std::string getCognome() const;
    std::string getEmail() const;
    std::string getTelefono() const;
    std::string getNomeCompleto() const;
    
    // Setters
    void setNome(const std::string& nome);
    void setCognome(const std::string& cognome);
    void setEmail(const std::string& email);
    void setTelefono(const std::string& telefono);
    
    // Metodi
    std::string toString() const;
    
    // Operatori
    bool operator==(const Utente& other) const;
    bool operator!=(const Utente& other) const;
};

// Definizione di un tipo per una collezione di utenti
typedef std::vector<std::shared_ptr<Utente>> UtenteCollection;

#endif // UTENTE_HPP
```

### Classe Prestito

```cpp
// include/models/prestito.hpp
#ifndef PRESTITO_HPP
#define PRESTITO_HPP

#include <string>
#include <chrono>
#include <memory>
#include "libro.hpp"
#include "utente.hpp"

class Prestito {
private:
    int id;
    std::shared_ptr<Libro> libro;
    std::shared_ptr<Utente> utente;
    std::chrono::system_clock::time_point data_prestito;
    std::chrono::system_clock::time_point data_restituzione_prevista;
    std::chrono::system_clock::time_point data_restituzione_effettiva;
    bool restituito;
    static int nextId;

public:
    // Costruttori
    Prestito() = default;
    Prestito(std::shared_ptr<Libro> libro, std::shared_ptr<Utente> utente,
             const std::chrono::system_clock::time_point& data_prestito,
             int giorni_durata = 30);
    
    // Getters
    int getId() const;
    std::shared_ptr<Libro> getLibro() const;
    std::shared_ptr<Utente> getUtente() const;
    std::chrono::system_clock::time_point getDataPrestito() const;
    std::chrono::system_clock::time_point getDataRestituzionePrevista() const;
    std::chrono::system_clock::time_point getDataRestituzioneEffettiva() const;
    bool isRestituito() const;
    
    // Metodi
    void registraRestituzione();
    bool isInRitardo() const;
    int giorniDiRitardo() const;
    double calcolaPenalita(double tariffa_giornaliera = 0.50) const;
    std::string toString() const;
    
    // Operatori
    bool operator==(const Prestito& other) const;
    bool operator!=(const Prestito& other) const;
};

// Definizione di un tipo per una collezione di prestiti
typedef std::vector<std::shared_ptr<Prestito>> PrestitoCollection;

#endif // PRESTITO_HPP
```

## Criteri di Valutazione

Il progetto finale sarà valutato in base ai seguenti criteri:

1. **Funzionalità**: Completezza e correttezza delle funzionalità implementate.
2. **Design**: Qualità dell'architettura software e delle scelte di design.
3. **Implementazione**: Qualità del codice, uso appropriato delle caratteristiche di C++.
4. **Usabilità**: Facilità d'uso e intuitività dell'interfaccia utente.
5. **Documentazione**: Completezza e chiarezza della documentazione.
6. **Originalità**: Implementazione di funzionalità aggiuntive o approcci innovativi.

## Consegna

Il progetto finale dovrà essere consegnato entro la data stabilita e dovrà includere:

1. Codice sorgente completo
2. Documentazione del progetto
3. Istruzioni per la compilazione e l'esecuzione
4. Eventuali file di dati di esempio

## Risorse Utili

- [Design Patterns in Modern C++](https://www.packtpub.com/product/design-patterns-in-modern-c-20/9781800208988)
- [C++ Best Practices](https://github.com/lefticus/cppbestpractices)
- [SQLite C++ Wrapper](https://github.com/SRombauts/SQLiteCpp)
- [JSON for Modern C++](https://github.com/nlohmann/json)
- [Catch2 - Unit Testing Framework](https://github.com/catchorg/Catch2)
- [Qt Framework](https://www.qt.io/) (per interfaccia grafica)

## Conclusione

Questo progetto finale rappresenta l'opportunità di mettere in pratica tutte le conoscenze acquisite durante il corso. Ti incoraggiamo a essere creativo, a sperimentare con diverse soluzioni e a non esitare a chiedere aiuto o chiarimenti quando necessario.

Buon lavoro!