# Accesso ai Membri di una Struttura

In questa guida, esploreremo in dettaglio come accedere ai membri di una struttura in C++, incluso l'accesso tramite variabili, puntatori e riferimenti.

## Accesso Diretto ai Membri

Per accedere ai membri di una struttura tramite una variabile, si utilizza l'operatore punto (`.`):

```cpp
struct Persona {
    std::string nome;
    int eta;
    double altezza;
};

int main() {
    Persona p1;
    
    // Accesso in scrittura
    p1.nome = "Mario";
    p1.eta = 30;
    p1.altezza = 1.75;
    
    // Accesso in lettura
    std::cout << "Nome: " << p1.nome << std::endl;
    std::cout << "Età: " << p1.eta << " anni" << std::endl;
    std::cout << "Altezza: " << p1.altezza << " m" << std::endl;
    
    return 0;
}
```

## Accesso tramite Puntatori

Per accedere ai membri di una struttura tramite un puntatore, si utilizza l'operatore freccia (`->`):

```cpp
Persona p1;
p1.nome = "Mario";
p1.eta = 30;

// Puntatore a p1
Persona* ptr = &p1;

// Accesso tramite puntatore
std::cout << "Nome: " << ptr->nome << std::endl;  // Equivalente a (*ptr).nome
std::cout << "Età: " << ptr->eta << " anni" << std::endl;  // Equivalente a (*ptr).eta
```

L'operatore `->` è una scorciatoia per la combinazione di dereferenziazione e accesso al membro: `ptr->nome` è equivalente a `(*ptr).nome`.

## Accesso tramite Riferimenti

I riferimenti permettono di accedere ai membri di una struttura senza creare una copia, utilizzando l'operatore punto (`.`):

```cpp
Persona p1;
p1.nome = "Mario";
p1.eta = 30;

// Riferimento a p1
Persona& ref = p1;

// Accesso tramite riferimento
std::cout << "Nome: " << ref.nome << std::endl;
std::cout << "Età: " << ref.eta << " anni" << std::endl;

// Modifica tramite riferimento
ref.eta = 31;  // Modifica anche p1.eta
std::cout << "Nuova età di p1: " << p1.eta << std::endl;  // Output: 31
```

## Accesso a Membri di Strutture Annidate

Quando una struttura contiene un'altra struttura come membro, è possibile accedere ai membri della struttura annidata concatenando gli operatori di accesso:

```cpp
struct Indirizzo {
    std::string via;
    std::string citta;
    std::string cap;
};

struct Persona {
    std::string nome;
    int eta;
    Indirizzo indirizzo;  // Struttura annidata
};

int main() {
    Persona p1;
    
    // Accesso ai membri della struttura principale
    p1.nome = "Mario";
    p1.eta = 30;
    
    // Accesso ai membri della struttura annidata
    p1.indirizzo.via = "Via Roma, 123";
    p1.indirizzo.citta = "Milano";
    p1.indirizzo.cap = "20100";
    
    // Accesso in lettura
    std::cout << p1.nome << " abita in " << p1.indirizzo.via << ", " 
              << p1.indirizzo.citta << " (" << p1.indirizzo.cap << ")" << std::endl;
    
    return 0;
}
```

## Accesso tramite Puntatori a Strutture Annidate

Combinando gli operatori `->` e `.` è possibile accedere ai membri di strutture annidate tramite puntatori:

```cpp
Persona* ptr = &p1;

// Accesso ai membri della struttura annidata tramite puntatore
ptr->indirizzo.via = "Via Verdi, 456";
std::cout << ptr->nome << " abita in " << ptr->indirizzo.via << std::endl;
```

## Accesso a Membri di Array di Strutture

Per accedere ai membri di un elemento di un array di strutture, si combina l'accesso all'array con l'accesso al membro:

```cpp
// Array di strutture
Persona persone[3];

// Accesso ai membri del primo elemento
persone[0].nome = "Mario";
persone[0].eta = 30;

// Accesso ai membri del secondo elemento
persone[1].nome = "Luigi";
persone[1].eta = 28;

// Accesso in lettura
for (int i = 0; i < 2; i++) {
    std::cout << "Persona " << i << ": " << persone[i].nome 
              << ", " << persone[i].eta << " anni" << std::endl;
}
```

## Accesso a Membri tramite Iterazione

Per iterare su un array di strutture e accedere ai membri, si può utilizzare un ciclo:

```cpp
const int NUM_PERSONE = 3;
Persona persone[NUM_PERSONE] = {
    {"Mario", 30},
    {"Luigi", 28},
    {"Peach", 25}
};

// Iterazione con for tradizionale
for (int i = 0; i < NUM_PERSONE; i++) {
    std::cout << persone[i].nome << ", " << persone[i].eta << " anni" << std::endl;
}

// Iterazione con range-based for (C++11)
for (const Persona& p : persone) {
    std::cout << p.nome << ", " << p.eta << " anni" << std::endl;
}
```

## Accesso a Membri tramite Funzioni

È comune definire funzioni che operano su strutture, accedendo ai loro membri:

```cpp
// Funzione che modifica l'età di una persona
void invecchia(Persona& p, int anni) {
    p.eta += anni;
}

// Funzione che stampa i dati di una persona
void stampaPersona(const Persona& p) {
    std::cout << "Nome: " << p.nome << std::endl;
    std::cout << "Età: " << p.eta << " anni" << std::endl;
}

// Utilizzo
Persona p1 = {"Mario", 30};
stampaPersona(p1);
invecchia(p1, 5);
stampaPersona(p1);  // Ora l'età sarà 35
```

## Esempio Completo

```cpp
#include <iostream>
#include <string>

struct Indirizzo {
    std::string via;
    std::string citta;
    std::string cap;
};

struct Persona {
    std::string nome;
    int eta;
    Indirizzo indirizzo;
};

// Funzione che stampa i dati di una persona
void stampaPersona(const Persona& p) {
    std::cout << "Nome: " << p.nome << std::endl;
    std::cout << "Età: " << p.eta << " anni" << std::endl;
    std::cout << "Indirizzo: " << p.indirizzo.via << ", " 
              << p.indirizzo.citta << " (" << p.indirizzo.cap << ")" << std::endl;
}

// Funzione che modifica l'indirizzo di una persona
void cambiaIndirizzo(Persona* p, const std::string& via, 
                    const std::string& citta, const std::string& cap) {
    p->indirizzo.via = via;
    p->indirizzo.citta = citta;
    p->indirizzo.cap = cap;
}

int main() {
    // Creazione e inizializzazione di una persona
    Persona p1;
    p1.nome = "Mario";
    p1.eta = 30;
    p1.indirizzo.via = "Via Roma, 123";
    p1.indirizzo.citta = "Milano";
    p1.indirizzo.cap = "20100";
    
    // Stampa dei dati iniziali
    std::cout << "Dati iniziali:" << std::endl;
    stampaPersona(p1);
    
    // Modifica dell'indirizzo tramite puntatore
    cambiaIndirizzo(&p1, "Via Verdi, 456", "Roma", "00100");
    
    // Stampa dei dati aggiornati
    std::cout << "\nDati aggiornati:" << std::endl;
    stampaPersona(p1);
    
    return 0;
}
```

## Domande di Autovalutazione

1. Qual è la differenza tra l'operatore `.` e l'operatore `->`?
2. Come si accede ai membri di una struttura annidata?
3. Perché è preferibile passare strutture per riferimento anziché per valore a funzioni?
4. Come si può iterare su un array di strutture in C++11?
5. Cosa succede se si tenta di accedere a un membro di una struttura tramite un puntatore nullo?

## Esercizi Proposti

1. Crea una struttura `Rettangolo` con campi per larghezza e altezza. Scrivi funzioni per calcolare l'area e il perimetro del rettangolo.

2. Definisci una struttura `Studente` con campi per nome e voti in diverse materie. Scrivi una funzione che calcola la media dei voti e un'altra che trova lo studente con la media più alta in un array di studenti.

3. Crea una struttura `Orario` con campi per ore, minuti e secondi. Scrivi funzioni per sommare due orari e per calcolare la differenza tra due orari.

## Prossimo Argomento

Nel prossimo argomento, esploreremo in dettaglio come lavorare con array di strutture in C++.