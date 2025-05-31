# Stream di I/O Standard in C++

## Introduzione agli Stream Standard

Gli stream standard sono flussi di I/O predefiniti che C++ mette a disposizione per interagire con l'utente attraverso la console. Questi stream sono automaticamente inizializzati all'avvio del programma e sono accessibili senza necessità di ulteriori configurazioni.

## I Quattro Stream Standard

C++ fornisce quattro stream standard, tutti definiti nell'header `<iostream>`:

### 1. `std::cin` - Standard Input Stream

`cin` (Console INput) è lo stream di input standard, collegato di default alla tastiera. Viene utilizzato per leggere dati inseriti dall'utente.

Caratteristiche principali:
- È un'istanza della classe `std::istream`
- Utilizza l'operatore di estrazione `>>` per leggere dati
- Salta automaticamente gli spazi bianchi (spazi, tab, newline) durante la lettura

Esempio di utilizzo:

```cpp
#include <iostream>

int main() {
    int numero;
    std::string nome;
    
    std::cout << "Inserisci un numero: ";
    std::cin >> numero;
    
    std::cout << "Inserisci il tuo nome: ";
    std::cin >> nome; // Legge solo fino al primo spazio
    
    std::cout << "Hai inserito il numero " << numero << " e il nome " << nome << std::endl;
    
    return 0;
}
```

### 2. `std::cout` - Standard Output Stream

`cout` (Console OUTput) è lo stream di output standard, collegato di default allo schermo. Viene utilizzato per visualizzare dati all'utente.

Caratteristiche principali:
- È un'istanza della classe `std::ostream`
- Utilizza l'operatore di inserimento `<<` per scrivere dati
- È bufferizzato, quindi i dati potrebbero non essere immediatamente visualizzati

Esempio di utilizzo:

```cpp
#include <iostream>

int main() {
    int età = 25;
    double altezza = 1.75;
    std::string nome = "Mario";
    
    std::cout << "Nome: " << nome << std::endl;
    std::cout << "Età: " << età << " anni" << std::endl;
    std::cout << "Altezza: " << altezza << " metri" << std::endl;
    
    return 0;
}
```

### 3. `std::cerr` - Standard Error Stream

`cerr` (Console ERRor) è lo stream di output per errori, collegato di default allo schermo. Viene utilizzato per visualizzare messaggi di errore.

Caratteristiche principali:
- È un'istanza della classe `std::ostream`
- Non è bufferizzato, quindi i messaggi vengono visualizzati immediatamente
- Utile per messaggi critici che devono essere mostrati subito

Esempio di utilizzo:

```cpp
#include <iostream>
#include <fstream>

int main() {
    std::ifstream file("dati.txt");
    
    if (!file) {
        std::cerr << "ERRORE: Impossibile aprire il file dati.txt" << std::endl;
        return 1;
    }
    
    // Continua con l'elaborazione del file...
    std::cout << "File aperto con successo." << std::endl;
    
    return 0;
}
```

### 4. `std::clog` - Standard Log Stream

`clog` (Console LOG) è lo stream di output per messaggi di log, collegato di default allo schermo. Viene utilizzato per visualizzare informazioni diagnostiche.

Caratteristiche principali:
- È un'istanza della classe `std::ostream`
- È bufferizzato, quindi i messaggi potrebbero essere accumulati prima di essere visualizzati
- Utile per messaggi informativi non critici

Esempio di utilizzo:

```cpp
#include <iostream>

int main() {
    std::clog << "INFO: Avvio del programma" << std::endl;
    
    // Esecuzione del programma...
    int risultato = 42;
    
    std::clog << "INFO: Calcolo completato, risultato = " << risultato << std::endl;
    std::clog << "INFO: Programma terminato" << std::endl;
    
    return 0;
}
```

## Differenze tra gli Stream di Output

È importante comprendere le differenze tra i tre stream di output:

| Stream | Bufferizzato | Uso tipico | Quando utilizzarlo |
|--------|--------------|------------|--------------------|
| cout   | Sì           | Output normale | Per la maggior parte dell'output del programma |
| cerr   | No           | Messaggi di errore | Per errori critici che devono essere visualizzati immediatamente |
| clog   | Sì           | Messaggi di log | Per informazioni diagnostiche e di debug |

## Reindirizzamento degli Stream Standard

Una caratteristica potente degli stream standard è che possono essere reindirizzati da/verso file o altri dispositivi a livello di sistema operativo, senza modificare il codice del programma.

Per esempio, in un ambiente Unix/Linux, si può reindirizzare l'output di un programma verso un file:

```bash
./mio_programma > output.txt  # Reindirizza cout verso output.txt
./mio_programma 2> errori.txt # Reindirizza cerr verso errori.txt
```

## Lettura di Linee Intere con `std::getline`

L'operatore `>>` con `cin` legge solo fino al primo spazio bianco. Per leggere una linea intera, inclusi gli spazi, si utilizza la funzione `std::getline`:

```cpp
#include <iostream>
#include <string>

int main() {
    std::string linea;
    
    std::cout << "Inserisci una frase: ";
    std::getline(std::cin, linea);
    
    std::cout << "Hai inserito: " << linea << std::endl;
    
    return 0;
}
```

## Problemi Comuni con `cin` e Soluzioni

### Problema 1: Mixing `>>` e `getline`

Quando si mischiano operazioni di lettura con `>>` e `getline`, possono verificarsi comportamenti inaspettati a causa del carattere newline che rimane nel buffer:

```cpp
#include <iostream>
#include <string>

int main() {
    int numero;
    std::string linea;
    
    std::cout << "Inserisci un numero: ";
    std::cin >> numero;
    
    std::cout << "Inserisci una frase: ";
    std::getline(std::cin, linea); // Potrebbe non funzionare come previsto
    
    std::cout << "Numero: " << numero << std::endl;
    std::cout << "Frase: " << linea << std::endl;
    
    return 0;
}
```

Soluzione: Pulire il buffer dopo l'uso di `>>`:

```cpp
std::cin >> numero;
std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // Ignora il resto della linea
std::getline(std::cin, linea); // Ora funzionerà correttamente
```

### Problema 2: Gestione degli Errori di Input

Quando l'utente inserisce un input non valido, `cin` entra in uno stato di errore:

```cpp
#include <iostream>
#include <limits>

int main() {
    int numero;
    
    std::cout << "Inserisci un numero: ";
    std::cin >> numero;
    
    if (std::cin.fail()) {
        std::cerr << "Input non valido!" << std::endl;
        std::cin.clear(); // Resetta lo stato di errore
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // Pulisce il buffer
    } else {
        std::cout << "Hai inserito: " << numero << std::endl;
    }
    
    return 0;
}
```

## Sincronizzazione con C Standard I/O

Per default, gli stream C++ sono sincronizzati con gli stream C standard (stdin, stdout, stderr). Questa sincronizzazione può essere disabilitata per migliorare le prestazioni:

```cpp
#include <iostream>

int main() {
    std::ios_base::sync_with_stdio(false); // Disabilita la sincronizzazione
    
    // Il codice seguente potrebbe essere più veloce
    for (int i = 0; i < 100000; ++i) {
        std::cout << i << "\n"; // Nota: usando '\n' invece di std::endl per evitare flush
    }
    
    return 0;
}
```

Nota: Disabilitare la sincronizzazione può causare problemi se si mescolano chiamate di I/O C e C++ nello stesso programma.

## Domande di Autovalutazione

1. Qual è la differenza principale tra `cin` e `getline` per la lettura dell'input?
2. Perché `cerr` non è bufferizzato mentre `cout` e `clog` lo sono?
3. Come si può gestire correttamente un input non valido quando si utilizza `cin`?
4. Quali problemi possono verificarsi quando si mescolano operazioni di lettura con `>>` e `getline`?
5. Cosa succede quando si disabilita la sincronizzazione con gli stream C standard?

## Esercizi Proposti

1. Scrivi un programma che chieda all'utente di inserire nome, cognome ed età, utilizzando sia `>>` che `getline` in modo corretto.
2. Crea un programma che legga una serie di numeri interi dalla console, fino a quando l'utente non inserisce un valore non numerico, e poi calcoli la somma e la media dei numeri inseriti.
3. Implementa un semplice sistema di log che utilizzi `cout`, `cerr` e `clog` in modo appropriato per diversi tipi di messaggi.
4. Scrivi un programma che legga un file di testo riga per riga utilizzando `getline` e conti il numero di parole in ciascuna riga.
5. Crea un'applicazione di chat simulata dove l'utente può inserire messaggi che vengono visualizzati con timestamp e nome utente, utilizzando la formattazione appropriata.

## Conclusione

Gli stream standard in C++ forniscono un modo potente e flessibile per gestire l'input e l'output del programma. La comprensione delle loro caratteristiche e differenze è fondamentale per creare interfacce utente robuste e gestire correttamente gli errori.

Nella prossima lezione, esploreremo i manipolatori di stream, che permettono di controllare in modo avanzato la formattazione dell'output.