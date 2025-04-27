# Introduzione all'I/O in C++

## Concetti Base

L'Input/Output (I/O) è una parte fondamentale di qualsiasi linguaggio di programmazione, poiché permette ai programmi di interagire con il mondo esterno. In C++, le operazioni di I/O sono gestite principalmente attraverso il concetto di "stream" (flussi).

## Stream in C++

Uno stream in C++ rappresenta un flusso di dati che può essere diretto verso o provenire da varie fonti, come la console, file, stringhe in memoria o dispositivi di rete. La libreria standard di C++ fornisce diverse classi per gestire questi stream, tutte definite nell'header `<iostream>`.

### Tipi di Stream

1. **Stream di Input**: Utilizzati per leggere dati da una fonte.
2. **Stream di Output**: Utilizzati per scrivere dati verso una destinazione.
3. **Stream Bidirezionali**: Permettono sia operazioni di lettura che di scrittura.

## Gerarchia delle Classi di Stream

La libreria di I/O di C++ è organizzata in una gerarchia di classi:

```
                ios_base
                   |
                   ios
                  /   \
             istream   ostream
             /  |       |  \
  ifstream -/   |       |   \- ofstream
                |       |
                \       /
                 \     /
                iostream
                   |
                fstream
```

- `ios_base`: Classe base che fornisce funzionalità comuni a tutti gli stream.
- `ios`: Classe derivata da `ios_base` che aggiunge funzionalità specifiche per i flussi.
- `istream`: Classe per operazioni di input.
- `ostream`: Classe per operazioni di output.
- `iostream`: Classe che combina funzionalità di input e output.
- `ifstream`, `ofstream`, `fstream`: Classi specializzate per operazioni su file.

## Stream Standard

C++ fornisce quattro stream standard predefiniti:

1. `cin`: Stream di input standard, collegato alla console (tastiera).
2. `cout`: Stream di output standard, collegato alla console (schermo).
3. `cerr`: Stream di output per errori, collegato alla console (schermo), non bufferizzato.
4. `clog`: Stream di output per log, collegato alla console (schermo), bufferizzato.

Esempio di utilizzo degli stream standard:

```cpp
#include <iostream>

int main() {
    int numero;
    std::cout << "Inserisci un numero: "; // Output verso la console
    std::cin >> numero;                  // Input dalla console
    
    if (numero < 0) {
        std::cerr << "Errore: numero negativo!" << std::endl; // Output di errore
    } else {
        std::cout << "Hai inserito: " << numero << std::endl; // Output normale
    }
    
    std::clog << "Operazione completata." << std::endl; // Output di log
    
    return 0;
}
```

## Operatori di Stream

C++ utilizza gli operatori di redirezione `<<` e `>>` per operazioni di I/O:

- `<<` (operatore di inserimento): Utilizzato con stream di output per inserire dati nello stream.
- `>>` (operatore di estrazione): Utilizzato con stream di input per estrarre dati dallo stream.

Questi operatori sono sovraccaricati per funzionare con vari tipi di dati, inclusi tipi primitivi e molti tipi della libreria standard.

## Buffer di Stream

Gli stream in C++ sono generalmente bufferizzati, il che significa che i dati non vengono immediatamente scritti o letti dalla fonte/destinazione, ma vengono temporaneamente memorizzati in un buffer. Questo migliora le prestazioni riducendo il numero di operazioni di I/O effettive.

Per forzare lo svuotamento del buffer, si possono utilizzare i manipolatori come `std::endl` o la funzione `flush()`:

```cpp
std::cout << "Questo è un messaggio" << std::endl; // Inserisce una nuova linea e svuota il buffer
std::cout << "Altro messaggio" << std::flush;     // Svuota il buffer senza inserire una nuova linea
```

## Stati di Stream

Gli stream in C++ mantengono uno stato interno che può essere utilizzato per verificare se le operazioni di I/O sono state eseguite con successo. Gli stati principali sono:

- `good()`: Restituisce `true` se lo stream è in buono stato.
- `eof()`: Restituisce `true` se è stata raggiunta la fine del file.
- `fail()`: Restituisce `true` se l'ultima operazione è fallita.
- `bad()`: Restituisce `true` se si è verificato un errore irreversibile.

Esempio di controllo dello stato di uno stream:

```cpp
#include <iostream>

int main() {
    int numero;
    std::cout << "Inserisci un numero: ";
    std::cin >> numero;
    
    if (std::cin.fail()) {
        std::cerr << "Input non valido!" << std::endl;
        std::cin.clear(); // Resetta lo stato dello stream
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // Ignora il resto dell'input
    } else {
        std::cout << "Hai inserito: " << numero << std::endl;
    }
    
    return 0;
}
```

## Formattazione Base

C++ offre vari modi per formattare l'output, inclusi i manipolatori di stream. Alcuni esempi di base:

```cpp
#include <iostream>
#include <iomanip> // Necessario per alcuni manipolatori

int main() {
    double valore = 123.456789;
    
    // Impostazione della precisione
    std::cout << "Precisione predefinita: " << valore << std::endl;
    std::cout << "Precisione 2: " << std::fixed << std::setprecision(2) << valore << std::endl;
    
    // Larghezza del campo e riempimento
    std::cout << "Larghezza 10: |" << std::setw(10) << valore << "|" << std::endl;
    std::cout << "Riempimento: |" << std::setfill('*') << std::setw(10) << valore << "|" << std::endl;
    
    // Notazione scientifica
    std::cout << "Scientifica: " << std::scientific << valore << std::endl;
    
    return 0;
}
```

## Domande di Autovalutazione

1. Quali sono i quattro stream standard in C++ e a cosa servono?
2. Qual è la differenza tra `cerr` e `clog`?
3. Come si può verificare se un'operazione di input è fallita?
4. Cosa significa che uno stream è "bufferizzato" e come si può forzare lo svuotamento del buffer?
5. Quali sono i principali stati di uno stream e come si possono controllare?

## Esercizi Proposti

1. Scrivi un programma che chieda all'utente di inserire un numero intero e gestisca correttamente il caso in cui l'utente inserisca un input non valido.
2. Crea un programma che formatti l'output di una tabella di valori numerici, allineando correttamente le colonne e impostando la precisione dei numeri decimali.
3. Implementa un semplice logger che scriva messaggi sia su console che su un file, utilizzando diversi livelli di log (info, warning, error).
4. Scrivi un programma che legga una serie di numeri dalla console fino a quando l'utente non inserisce un carattere non numerico, e poi calcoli la somma e la media dei numeri inseriti.
5. Crea una funzione che stampi un messaggio di errore su `cerr` con un formato specifico, includendo data, ora e livello di gravità.

## Conclusione

Le operazioni di I/O sono fondamentali in qualsiasi programma C++. La comprensione dei concetti di stream, degli operatori di I/O e della gestione degli stati è essenziale per creare applicazioni robuste che interagiscano correttamente con l'utente e con i file.

Nelle prossime lezioni, approfondiremo l'utilizzo degli stream standard, i manipolatori per la formattazione avanzata e le operazioni su file.