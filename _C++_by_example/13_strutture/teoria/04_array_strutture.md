# Array di Strutture

In questa guida, esploreremo come lavorare con array di strutture in C++, una combinazione potente che permette di gestire collezioni di dati strutturati.

## Introduzione agli Array di Strutture

Un array di strutture è una collezione di elementi, dove ogni elemento è una struttura dello stesso tipo. Questo è particolarmente utile quando si devono gestire più istanze di dati strutturati, come una lista di contatti, un catalogo di prodotti o un registro di studenti.

## Dichiarazione e Inizializzazione

### Dichiarazione Base

```cpp
struct Persona {
    std::string nome;
    int eta;
    double altezza;
};

// Dichiarazione di un array di 10 strutture Persona
Persona persone[10];
```

### Inizializzazione all'atto della Dichiarazione

```cpp
// Inizializzazione di un array di 3 strutture Persona
Persona persone[3] = {
    {"Mario", 30, 1.75},
    {"Luigi", 28, 1.80},
    {"Peach", 25, 1.65}
};
```

Con C++11, è possibile utilizzare l'inizializzazione uniforme:

```cpp
Persona persone[3] = {
    {"Mario", 30, 1.75},  // C++98 e C++11
    {"Luigi", 28, 1.80},
    {"Peach", 25, 1.65}
};

// Oppure
Persona persone[3] = {
    Persona{"Mario", 30, 1.75},  // Solo C++11
    Persona{"Luigi", 28, 1.80},
    Persona{"Peach", 25, 1.65}
};
```

### Inizializzazione Parziale

È possibile inizializzare solo alcuni elementi dell'array:

```cpp
Persona persone[5] = {
    {"Mario", 30, 1.75},
    {"Luigi", 28, 1.80}
    // Gli altri elementi saranno inizializzati con valori predefiniti
};
```

## Accesso agli Elementi

### Accesso a un Elemento Specifico

```cpp
// Accesso al secondo elemento dell'array (indice 1)
Persona& secondaPersona = persone[1];
std::cout << "Nome: " << secondaPersona.nome << std::endl;
std::cout << "Età: " << secondaPersona.eta << " anni" << std::endl;

// Accesso diretto ai membri
std::cout << "Nome della terza persona: " << persone[2].nome << std::endl;
```

### Iterazione con For Tradizionale

```cpp
const int NUM_PERSONE = 3;
Persona persone[NUM_PERSONE] = {
    {"Mario", 30, 1.75},
    {"Luigi", 28, 1.80},
    {"Peach", 25, 1.65}
};

// Iterazione con for tradizionale
for (int i = 0; i < NUM_PERSONE; i++) {
    std::cout << "Persona " << i << ": " << persone[i].nome 
              << ", " << persone[i].eta << " anni, " 
              << persone[i].altezza << " m" << std::endl;
}
```

### Iterazione con Range-Based For (C++11)

```cpp
// Iterazione con range-based for
for (const Persona& p : persone) {
    std::cout << p.nome << ", " << p.eta << " anni, " 
              << p.altezza << " m" << std::endl;
}
```

## Manipolazione degli Elementi

### Modifica di Elementi

```cpp
// Modifica di un elemento specifico
persone[0].nome = "Super Mario";
persone[0].eta = 35;

// Modifica di tutti gli elementi
for (Persona& p : persone) {
    p.eta++;  // Incrementa l'età di ogni persona
}
```

### Ricerca di Elementi

```cpp
// Ricerca di una persona per nome
std::string nomeDaCercare = "Luigi";
for (int i = 0; i < NUM_PERSONE; i++) {
    if (persone[i].nome == nomeDaCercare) {
        std::cout << "Trovato " << nomeDaCercare << " all'indice " << i << std::endl;
        std::cout << "Età: " << persone[i].eta << " anni" << std::endl;
        break;  // Esce dal ciclo una volta trovato
    }
}
```

## Array Dinamici di Strutture

### Allocazione Dinamica

```cpp
// Allocazione dinamica di un array di strutture
int numPersone;
std::cout << "Quante persone vuoi inserire? ";
std::cin >> numPersone;

Persona* persone = new Persona[numPersone];

// Inserimento dei dati
for (int i = 0; i < numPersone; i++) {
    std::cout << "\nPersona " << i + 1 << ":" << std::endl;
    
    std::cout << "Nome: ";
    std::cin >> persone[i].nome;
    
    std::cout << "Età: ";
    std::cin >> persone[i].eta;
    
    std::cout << "Altezza (m): ";
    std::cin >> persone[i].altezza;
}

// Utilizzo dell'array
// ...

// Deallocazione
delete[] persone;
```

### Utilizzo di `std::vector` (Consigliato)

In C++ moderno, è generalmente preferibile utilizzare `std::vector` anziché array dinamici manuali:

```cpp
#include <vector>

// Creazione di un vector di strutture
std::vector<Persona> persone;

// Aggiunta di elementi
persone.push_back({"Mario", 30, 1.75});
persone.push_back({"Luigi", 28, 1.80});

// Oppure con emplace_back (C++11)
persone.emplace_back("Peach", 25, 1.65);

// Accesso agli elementi
std::cout << "Prima persona: " << persone[0].nome << std::endl;

// Iterazione
for (const Persona& p : persone) {
    std::cout << p.nome << ", " << p.eta << " anni" << std::endl;
}

// Non è necessario deallocare manualmente
```

## Passaggio di Array di Strutture a Funzioni

### Passaggio per Riferimento

```cpp
// Funzione che modifica un array di strutture
void invecchiaTutti(Persona persone[], int size, int anni) {
    for (int i = 0; i < size; i++) {
        persone[i].eta += anni;
    }
}

// Utilizzo
Persona gruppo[3] = {{"Mario", 30}, {"Luigi", 28}, {"Peach", 25}};
invecchiaTutti(gruppo, 3, 5);  // Incrementa l'età di tutti di 5 anni
```

### Passaggio di `std::vector`

```cpp
// Funzione che modifica un vector di strutture
void invecchiaTutti(std::vector<Persona>& persone, int anni) {
    for (Persona& p : persone) {
        p.eta += anni;
    }
}

// Utilizzo
std::vector<Persona> gruppo = {{"Mario", 30}, {"Luigi", 28}, {"Peach", 25}};
invecchiaTutti(gruppo, 5);  // Incrementa l'età di tutti di 5 anni
```

## Esempio Completo: Rubrica Telefonica

```cpp
#include <iostream>
#include <string>
#include <vector>

struct Contatto {
    std::string nome;
    std::string cognome;
    std::string telefono;
};

// Funzione per aggiungere un contatto
void aggiungiContatto(std::vector<Contatto>& rubrica) {
    Contatto nuovo;
    
    std::cout << "\nInserisci i dati del nuovo contatto:" << std::endl;
    
    std::cout << "Nome: ";
    std::cin >> nuovo.nome;
    
    std::cout << "Cognome: ";
    std::cin >> nuovo.cognome;
    
    std::cout << "Telefono: ";
    std::cin >> nuovo.telefono;
    
    rubrica.push_back(nuovo);
    std::cout << "Contatto aggiunto con successo!" << std::endl;
}

// Funzione per visualizzare tutti i contatti
void visualizzaContatti(const std::vector<Contatto>& rubrica) {
    if (rubrica.empty()) {
        std::cout << "\nLa rubrica è vuota." << std::endl;
        return;
    }
    
    std::cout << "\nElenco contatti:" << std::endl;
    std::cout << "--------------------------------------------------" << std::endl;
    std::cout << "Nome\t\tCognome\t\tTelefono" << std::endl;
    std::cout << "--------------------------------------------------" << std::endl;
    
    for (const Contatto& c : rubrica) {
        std::cout << c.nome << "\t\t" << c.cognome << "\t\t" << c.telefono << std::endl;
    }
}

// Funzione per cercare un contatto
void cercaContatto(const std::vector<Contatto>& rubrica) {
    if (rubrica.empty()) {
        std::cout << "\nLa rubrica è vuota." << std::endl;
        return;
    }
    
    std::string cognomeDaCercare;
    std::cout << "\nInserisci il cognome da cercare: ";
    std::cin >> cognomeDaCercare;
    
    bool trovato = false;
    
    for (const Contatto& c : rubrica) {
        if (c.cognome == cognomeDaCercare) {
            if (!trovato) {
                std::cout << "\nContatti trovati:" << std::endl;
                std::cout << "--------------------------------------------------" << std::endl;
                std::cout << "Nome\t\tCognome\t\tTelefono" << std::endl;
                std::cout << "--------------------------------------------------" << std::endl;
                trovato = true;
            }
            
            std::cout << c.nome << "\t\t" << c.cognome << "\t\t" << c.telefono << std::endl;
        }
    }
    
    if (!trovato) {
        std::cout << "Nessun contatto trovato con cognome '" << cognomeDaCercare << "'." << std::endl;
    }
}

int main() {
    std::vector<Contatto> rubrica;
    int scelta;
    
    // Inizializzazione con alcuni contatti di esempio
    rubrica.push_back({"Mario", "Rossi", "333-1234567"});
    rubrica.push_back({"Luigi", "Verdi", "333-7654321"});
    rubrica.push_back({"Anna", "Bianchi", "333-9876543"});
    
    do {
        std::cout << "\n=== RUBRICA TELEFONICA ===" << std::endl;
        std::cout << "1. Aggiungi contatto" << std::endl;
        std::cout << "2. Visualizza tutti i contatti" << std::endl;
        std::cout << "3. Cerca contatto per cognome" << std::endl;
        std::cout << "0. Esci" << std::endl;
        std::cout << "Scelta: ";
        std::cin >> scelta;
        
        switch (scelta) {
            case 1:
                aggiungiContatto(rubrica);
                break;
            case 2:
                visualizzaContatti(rubrica);
                break;
            case 3:
                cercaContatto(rubrica);
                break;
            case 0:
                std::cout << "Arrivederci!" << std::endl;
                break;
            default:
                std::cout << "Scelta non valida. Riprova." << std::endl;
        }
    } while (scelta != 0);
    
    return 0;
}
```

## Domande di Autovalutazione

1. Quali sono i vantaggi di utilizzare un array di strutture rispetto a più array separati?
2. Come si può inizializzare un array di strutture all'atto della dichiarazione?
3. Qual è la differenza tra un array statico e un array dinamico di strutture?
4. Perché è generalmente preferibile utilizzare `std::vector` anziché array dinamici manuali?
5. Come si può passare un array di strutture a una funzione?

## Esercizi Proposti

1. Crea un programma che gestisce un catalogo di libri, utilizzando un array di strutture `Libro` con campi per titolo, autore, anno di pubblicazione e prezzo. Implementa funzioni per aggiungere libri, visualizzare tutti i libri e cercare libri per autore.

2. Implementa un sistema di gestione studenti che utilizza un array di strutture `Studente` con campi per nome, matricola e voti in diverse materie. Aggiungi funzioni per calcolare la media dei voti di ogni studente e per trovare lo studente con la media più alta.

3. Crea un programma che gestisce un'agenda di appuntamenti, utilizzando un array di strutture `Appuntamento` con campi per data, ora, luogo e descrizione. Implementa funzioni per aggiungere appuntamenti, visualizzare tutti gli appuntamenti e cercare appuntamenti per data.

## Prossimo Argomento

Nel prossimo argomento, esploreremo le strutture annidate in C++, ovvero strutture che contengono altre strutture come membri.