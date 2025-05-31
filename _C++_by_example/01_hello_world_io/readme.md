# Esercitazione 01: Hello World e Input/Output di Base

## Obiettivo

L'obiettivo di questa esercitazione è scrivere, compilare ed eseguire il primo programma C++, il classico "Hello, World!". Imparerai anche come leggere un input semplice dall'utente e visualizzarlo.

## Descrizione

Scrivi un programma C++ che:
1.  Stampa il messaggio "Ciao, mondo!" sullo schermo.
2.  Chiede all'utente di inserire il proprio nome.
3.  Legge il nome inserito dall'utente.
4.  Stampa un messaggio di saluto personalizzato che include il nome dell'utente (es. "Ciao, [NomeUtente]!").

## Argomenti Teorici Correlati

Per completare questa esercitazione, è utile comprendere i seguenti concetti:

1.  [Struttura di Base di un Programma C++](teoria/01_basic_structure.md)
2.  [La Libreria `iostream` e l'Input/Output](teoria/02_iostream.md)
3.  [Namespace `std`](teoria/03_namespace_std.md)
4.  [Compilazione ed Esecuzione](teoria/04_compilation.md)

*(Nota: Crea i file .md corrispondenti nella cartella `teoria`)*

## Codice Soluzione (Esempio)

```cpp
#include <iostream>
#include <string> // Necessario per std::string e std::getline

int main() {
    // 1. Stampa "Ciao, mondo!"
    std::cout << "Ciao, mondo!" << std::endl;

    // 2. Chiede il nome all'utente
    std::cout << "Inserisci il tuo nome: ";

    // 3. Legge il nome (usiamo std::string per gestire nomi con spazi)
    std::string nomeUtente;
    std::getline(std::cin, nomeUtente); // Legge l'intera riga, inclusi spazi

    // 4. Stampa il saluto personalizzato
    std::cout << "Ciao, " << nomeUtente << "!" << std::endl;

    return 0; // Indica che il programma è terminato correttamente
}
```