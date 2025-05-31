# Introduzione alle Strutture

In questa guida, esploreremo il concetto di strutture in C++ e come possono essere utilizzate per organizzare dati correlati in un unico tipo personalizzato.

## Cosa sono le Strutture?

Una struttura (o `struct`) è un tipo di dato composto che permette di raggruppare elementi di tipi diversi sotto un unico nome. A differenza degli array, che contengono elementi dello stesso tipo, le strutture possono contenere elementi di tipi diversi, chiamati "membri" o "campi".

## Perché Usare le Strutture?

1. **Organizzazione dei Dati**: Le strutture permettono di organizzare dati correlati in un'unica entità logica.
2. **Leggibilità del Codice**: Migliorano la leggibilità raggruppando dati correlati sotto un nome significativo.
3. **Passaggio di Dati**: Semplificano il passaggio di gruppi di dati correlati a funzioni.
4. **Creazione di Tipi Personalizzati**: Permettono di creare tipi di dati personalizzati adatti alle specifiche esigenze del programma.

## Strutture vs Array

| Caratteristica | Array | Strutture |
|----------------|-------|------------|
| Tipo di elementi | Tutti dello stesso tipo | Possono essere di tipi diversi |
| Accesso agli elementi | Tramite indice (es. `arr[0]`) | Tramite nome del membro (es. `persona.nome`) |
| Dimensione | Fissa alla dichiarazione (eccetto array dinamici) | Fissa alla definizione della struttura |
| Scopo principale | Raccolta di elementi dello stesso tipo | Organizzazione di dati correlati di tipi diversi |

## Esempio Base

Ecco un esempio semplice di struttura che rappresenta una persona:

```cpp
#include <iostream>
#include <string>

// Definizione della struttura
struct Persona {
    std::string nome;
    std::string cognome;
    int eta;
    double altezza;  // in metri
    double peso;     // in kg
};

int main() {
    // Dichiarazione e inizializzazione di una variabile di tipo Persona
    Persona p1;
    p1.nome = "Mario";
    p1.cognome = "Rossi";
    p1.eta = 30;
    p1.altezza = 1.75;
    p1.peso = 70.5;
    
    // Accesso ai membri della struttura
    std::cout << "Persona: " << p1.nome << " " << p1.cognome << std::endl;
    std::cout << "Età: " << p1.eta << " anni" << std::endl;
    std::cout << "Altezza: " << p1.altezza << " m" << std::endl;
    std::cout << "Peso: " << p1.peso << " kg" << std::endl;
    
    return 0;
}
```

## Evoluzione delle Strutture in C++

In C, le strutture erano principalmente contenitori di dati. In C++, le strutture sono state estese per includere anche funzionalità tipiche delle classi:

- Possono contenere funzioni (metodi)
- Possono avere costruttori e distruttori
- Possono avere membri privati e pubblici

In C++, la principale differenza tra `struct` e `class` è che i membri di una `struct` sono pubblici per default, mentre i membri di una `class` sono privati per default.

```cpp
struct Rettangolo {
    double lunghezza;
    double larghezza;
    
    // Metodo all'interno della struttura
    double area() {
        return lunghezza * larghezza;
    }
};
```

## Casi d'Uso Comuni

1. **Rappresentazione di Entità**: Persone, prodotti, veicoli, ecc.
2. **Gestione di Dati Geometrici**: Punti, rettangoli, cerchi, ecc.
3. **Configurazioni**: Impostazioni di programma, parametri di funzioni.
4. **Ritorno di Valori Multipli da Funzioni**: Quando una funzione deve restituire più di un valore.

## Domande di Autovalutazione

1. Qual è la differenza principale tra un array e una struttura?
2. Perché è utile raggruppare dati correlati in una struttura?
3. In C++, qual è la differenza principale tra `struct` e `class`?
4. Puoi definire funzioni all'interno di una struttura in C++?
5. Quali sono alcuni casi d'uso comuni per le strutture?

## Esercizi Proposti

1. Crea una struttura `Punto` che rappresenta un punto 2D con coordinate x e y. Scrivi una funzione che calcola la distanza tra due punti.

2. Definisci una struttura `Studente` con campi per nome, matricola e voti in tre materie diverse. Scrivi un programma che calcola la media dei voti per uno studente.

3. Crea una struttura `Data` con campi per giorno, mese e anno. Scrivi una funzione che verifica se una data è valida.

## Prossimo Argomento

Nel prossimo argomento, esploreremo in dettaglio come definire e dichiarare strutture in C++, incluse le diverse sintassi di inizializzazione.