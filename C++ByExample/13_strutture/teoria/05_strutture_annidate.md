# Strutture Annidate

In questa guida, esploreremo le strutture annidate in C++, ovvero strutture che contengono altre strutture come membri.

## Introduzione alle Strutture Annidate

Le strutture annidate sono strutture che contengono altre strutture come membri. Questo approccio permette di creare tipi di dati complessi e gerarchici, organizzando i dati in modo logico e modulare.

## Definizione di Strutture Annidate

### Utilizzo di Strutture Predefinite

Il modo più comune per creare strutture annidate è definire prima le strutture componenti e poi utilizzarle come membri di altre strutture:

```cpp
// Definizione della struttura componente
struct Indirizzo {
    std::string via;
    std::string citta;
    std::string cap;
    std::string paese;
};

// Definizione della struttura contenitore
struct Persona {
    std::string nome;
    std::string cognome;
    int eta;
    Indirizzo indirizzo;  // Struttura annidata
};
```

### Definizione Inline

È anche possibile definire strutture annidate direttamente all'interno di altre strutture:

```cpp
struct Persona {
    std::string nome;
    std::string cognome;
    int eta;
    
    // Definizione inline della struttura annidata
    struct Indirizzo {
        std::string via;
        std::string citta;
        std::string cap;
        std::string paese;
    } indirizzo;  // Dichiarazione di un membro di tipo Indirizzo
};
```

In questo caso, `Indirizzo` è definita all'interno dello scope di `Persona` e può essere riferita esternamente come `Persona::Indirizzo`.

## Inizializzazione di Strutture Annidate

### Inizializzazione Membro per Membro

```cpp
Persona p1;
p1.nome = "Mario";
p1.cognome = "Rossi";
p1.eta = 30;
p1.indirizzo.via = "Via Roma, 123";
p1.indirizzo.citta = "Milano";
p1.indirizzo.cap = "20100";
p1.indirizzo.paese = "Italia";
```

### Inizializzazione con Lista di Inizializzatori (C++98)

```cpp
Indirizzo ind = {"Via Roma, 123", "Milano", "20100", "Italia"};
Persona p1 = {"Mario", "Rossi", 30, ind};
```

### Inizializzazione Uniforme (C++11)

```cpp
Persona p1 = {
    "Mario",
    "Rossi",
    30,
    {"Via Roma, 123", "Milano", "20100", "Italia"}  // Inizializzazione della struttura annidata
};

// Oppure
Persona p2{
    "Luigi",
    "Verdi",
    28,
    Indirizzo{"Via Verdi, 456", "Roma", "00100", "Italia"}
};
```

### Inizializzazione con Designatori (C++20)

```cpp
Persona p1 = {
    .nome = "Mario",
    .cognome = "Rossi",
    .eta = 30,
    .indirizzo = {
        .via = "Via Roma, 123",
        .citta = "Milano",
        .cap = "20100",
        .paese = "Italia"
    }
};
```

## Accesso ai Membri di Strutture Annidate

### Accesso Diretto

```cpp
Persona p1;

// Accesso ai membri della struttura principale
p1.nome = "Mario";
p1.cognome = "Rossi";

// Accesso ai membri della struttura annidata
p1.indirizzo.via = "Via Roma, 123";
p1.indirizzo.citta = "Milano";

// Accesso in lettura
std::cout << p1.nome << " " << p1.cognome << " abita in " 
          << p1.indirizzo.via << ", " << p1.indirizzo.citta << std::endl;
```

### Accesso tramite Puntatori

```cpp
Persona* ptr = &p1;

// Accesso ai membri della struttura principale
ptr->nome = "Luigi";
ptr->cognome = "Verdi";

// Accesso ai membri della struttura annidata
ptr->indirizzo.via = "Via Verdi, 456";
ptr->indirizzo.citta = "Roma";

// Accesso in lettura
std::cout << ptr->nome << " " << ptr->cognome << " abita in " 
          << ptr->indirizzo.via << ", " << ptr->indirizzo.citta << std::endl;
```

### Accesso tramite Riferimenti

```cpp
Persona& ref = p1;

// Accesso ai membri della struttura annidata tramite riferimento
ref.indirizzo.via = "Via Garibaldi, 789";
ref.indirizzo.citta = "Napoli";
```

## Strutture Annidate Multiple

È possibile annidare più strutture a diversi livelli:

```cpp
struct Coordinate {
    double latitudine;
    double longitudine;
};

struct Indirizzo {
    std::string via;
    std::string citta;
    std::string cap;
    std::string paese;
    Coordinate posizione;  // Struttura annidata
};

struct Persona {
    std::string nome;
    std::string cognome;
    int eta;
    Indirizzo indirizzo;  // Struttura annidata che contiene un'altra struttura annidata
};

// Accesso a membri di strutture annidate multiple
Persona p1;
p1.indirizzo.posizione.latitudine = 45.4642;
p1.indirizzo.posizione.longitudine = 9.1900;
```

## Array di Strutture Annidate

È possibile creare array di strutture che contengono strutture annidate:

```cpp
// Array di persone
Persona persone[3];

// Inizializzazione della prima persona e del suo indirizzo
persone[0].nome = "Mario";
persone[0].cognome = "Rossi";
persone[0].indirizzo.via = "Via Roma, 123";
persone[0].indirizzo.citta = "Milano";

// Inizializzazione della seconda persona e del suo indirizzo
persone[1].nome = "Luigi";
persone[1].cognome = "Verdi";
persone[1].indirizzo.via = "Via Verdi, 456";
persone[1].indirizzo.citta = "Roma";
```

## Passaggio di Strutture Annidate a Funzioni

### Passaggio per Valore

```cpp
// Funzione che stampa l'indirizzo di una persona
void stampaIndirizzo(Indirizzo indirizzo) {
    std::cout << indirizzo.via << ", " << indirizzo.citta << " (" 
              << indirizzo.cap << "), " << indirizzo.paese << std::endl;
}

// Utilizzo
stampaIndirizzo(p1.indirizzo);
```

### Passaggio per Riferimento

```cpp
// Funzione che modifica l'indirizzo di una persona
void cambiaIndirizzo(Indirizzo& indirizzo, const std::string& via, 
                    const std::string& citta, const std::string& cap) {
    indirizzo.via = via;
    indirizzo.citta = citta;
    indirizzo.cap = cap;
}

// Utilizzo
cambiaIndirizzo(p1.indirizzo, "Via Nuova, 789", "Torino", "10100");
```

## Esempio Completo: Sistema di Gestione Dipendenti

```cpp
#include <iostream>
#include <string>
#include <vector>

// Struttura per rappresentare una data
struct Data {
    int giorno;
    int mese;
    int anno;
};

// Struttura per rappresentare un indirizzo
struct Indirizzo {
    std::string via;
    std::string citta;
    std::string cap;
    std::string paese;
};

// Struttura per rappresentare un dipendente
struct Dipendente {
    std::string nome;
    std::string cognome;
    Data dataNascita;      // Struttura annidata
    Indirizzo indirizzo;   // Struttura annidata
    double stipendio;
    Data dataAssunzione;   // Struttura annidata
};

// Funzione per stampare una data nel formato GG/MM/AAAA
void stampaData(const Data& data) {
    std::cout << (data.giorno < 10 ? "0" : "") << data.giorno << "/"
              << (data.mese < 10 ? "0" : "") << data.mese << "/"
              << data.anno;
}

// Funzione per stampare i dettagli di un dipendente
void stampaDipendente(const Dipendente& dip) {
    std::cout << "Nome: " << dip.nome << " " << dip.cognome << std::endl;
    
    std::cout << "Data di nascita: ";
    stampaData(dip.dataNascita);
    std::cout << std::endl;
    
    std::cout << "Indirizzo: " << dip.indirizzo.via << ", " 
              << dip.indirizzo.citta << " (" << dip.indirizzo.cap << "), "
              << dip.indirizzo.paese << std::endl;
    
    std::cout << "Stipendio: " << dip.stipendio << " €" << std::endl;
    
    std::cout << "Data di assunzione: ";
    stampaData(dip.dataAssunzione);
    std::cout << std::endl;
}

// Funzione per calcolare l'anzianità di servizio in anni
int calcolaAnzianita(const Dipendente& dip, const Data& dataAttuale) {
    int anni = dataAttuale.anno - dip.dataAssunzione.anno;
    
    // Aggiustamento se non ha ancora raggiunto l'anniversario quest'anno
    if (dataAttuale.mese < dip.dataAssunzione.mese || 
        (dataAttuale.mese == dip.dataAssunzione.mese && 
         dataAttuale.giorno < dip.dataAssunzione.giorno)) {
        anni--;
    }
    
    return anni;
}

int main() {
    // Creazione di un vettore di dipendenti
    std::vector<Dipendente> dipendenti = {
        {
            "Mario", "Rossi",
            {15, 5, 1980},  // Data di nascita
            {"Via Roma, 123", "Milano", "20100", "Italia"},  // Indirizzo
            2500.0,  // Stipendio
            {10, 1, 2010}  // Data di assunzione
        },
        {
            "Luigi", "Verdi",
            {20, 8, 1985},
            {"Via Verdi, 456", "Roma", "00100", "Italia"},
            2200.0,
            {5, 3, 2015}
        },
        {
            "Anna", "Bianchi",
            {10, 12, 1990},
            {"Via Garibaldi, 789", "Napoli", "80100", "Italia"},
            2800.0,
            {15, 7, 2018}
        }
    };
    
    // Data attuale per calcolare l'anzianità
    Data dataAttuale = {1, 6, 2023};
    
    // Stampa dei dettagli di tutti i dipendenti
    std::cout << "=== ELENCO DIPENDENTI ===" << std::endl;
    for (const Dipendente& dip : dipendenti) {
        stampaDipendente(dip);
        std::cout << "Anzianità di servizio: " 
                  << calcolaAnzianita(dip, dataAttuale) << " anni" << std::endl;
        std::cout << "------------------------" << std::endl;
    }
    
    return 0;
}
```

## Domande di Autovalutazione

1. Quali sono i vantaggi di utilizzare strutture annidate?
2. Come si accede ai membri di una struttura annidata?
3. È possibile definire una struttura direttamente all'interno di un'altra struttura? Se sì, come si fa riferimento ad essa dall'esterno?
4. Come si inizializza una struttura annidata utilizzando la sintassi di inizializzazione uniforme (C++11)?
5. Quali sono le considerazioni da tenere a mente quando si passano strutture annidate a funzioni?

## Esercizi Proposti

1. Crea una struttura `Rettangolo` che contiene una struttura annidata `Punto` per rappresentare i vertici. Implementa funzioni per calcolare l'area e il perimetro del rettangolo.

2. Definisci una struttura `Libro` con campi per titolo, autore e anno di pubblicazione. Poi, crea una struttura `Biblioteca` che contiene un array di strutture `Libro`. Implementa funzioni per aggiungere libri, cercare libri per autore e visualizzare tutti i libri.

3. Implementa un sistema di gestione di un'agenda che utilizza strutture annidate per rappresentare appuntamenti, con una struttura `Orario` annidata all'interno di una struttura `Appuntamento`.

## Conclusione

Le strutture annidate sono uno strumento potente per organizzare dati complessi in modo logico e gerarchico. Permettono di creare tipi di dati personalizzati che riflettono la struttura naturale delle informazioni che rappresentano, migliorando la leggibilità e la manutenibilità del codice.

Nelle prossime esercitazioni, esploreremo il concetto di classi in C++, che estende ulteriormente le capacità delle strutture aggiungendo funzionalità come l'incapsulamento, l'ereditarietà e il polimorfismo.