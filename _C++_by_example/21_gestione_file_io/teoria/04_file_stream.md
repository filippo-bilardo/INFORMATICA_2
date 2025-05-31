# File Stream in C++

## Introduzione ai File Stream

I file stream in C++ sono classi specializzate che estendono il concetto di stream per operare su file. Permettono di leggere dati da file (input) e scrivere dati su file (output) utilizzando gli stessi operatori e concetti che abbiamo visto per gli stream standard.

Le classi principali per la gestione dei file sono definite nell'header `<fstream>`:

- `std::ifstream`: per operazioni di lettura da file (input file stream)
- `std::ofstream`: per operazioni di scrittura su file (output file stream)
- `std::fstream`: per operazioni sia di lettura che di scrittura (file stream bidirezionale)

## Apertura e Chiusura dei File

### Apertura di un File

Ci sono due modi principali per aprire un file:

1. **Nel costruttore**:

```cpp
#include <fstream>
#include <iostream>

int main() {
    // Apertura di un file in lettura
    std::ifstream file_input("dati.txt");
    
    // Apertura di un file in scrittura
    std::ofstream file_output("risultati.txt");
    
    // Verifica se l'apertura è avvenuta con successo
    if (!file_input) {
        std::cerr << "Errore nell'apertura del file dati.txt" << std::endl;
        return 1;
    }
    
    // Utilizzo dei file...
    
    return 0;
}
```

2. **Con il metodo `open()`**:

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::ifstream file_input;
    std::ofstream file_output;
    
    // Apertura dei file
    file_input.open("dati.txt");
    file_output.open("risultati.txt");
    
    // Verifica se l'apertura è avvenuta con successo
    if (!file_input.is_open()) {
        std::cerr << "Errore nell'apertura del file dati.txt" << std::endl;
        return 1;
    }
    
    // Utilizzo dei file...
    
    return 0;
}
```

### Chiusura di un File

È buona pratica chiudere esplicitamente i file quando non sono più necessari, anche se i distruttori delle classi file stream chiuderanno automaticamente i file quando gli oggetti escono dallo scope:

```cpp
#include <fstream>

int main() {
    std::ofstream file("dati.txt");
    
    // Scrittura su file...
    file << "Dati di esempio" << std::endl;
    
    // Chiusura esplicita del file
    file.close();
    
    // Riapertura dello stesso file per altre operazioni
    file.open("altro_file.txt");
    
    // Altre operazioni...
    
    // Il file verrà chiuso automaticamente quando 'file' esce dallo scope
    return 0;
}
```

## Operazioni di Base sui File

### Lettura da File

La lettura da file con `ifstream` utilizza gli stessi operatori e metodi di `cin`:

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    std::ifstream file("dati.txt");
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    // Lettura parola per parola
    std::string parola;
    while (file >> parola) {
        std::cout << "Parola letta: " << parola << std::endl;
    }
    
    return 0;
}
```

### Lettura di Linee Intere

Per leggere linee intere, si utilizza `std::getline`:

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    std::ifstream file("dati.txt");
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    // Lettura riga per riga
    std::string linea;
    while (std::getline(file, linea)) {
        std::cout << "Linea letta: " << linea << std::endl;
    }
    
    return 0;
}
```

### Scrittura su File

La scrittura su file con `ofstream` utilizza gli stessi operatori e metodi di `cout`:

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::ofstream file("risultati.txt");
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    // Scrittura di dati sul file
    file << "Riga 1: Dati di esempio" << std::endl;
    file << "Riga 2: Altri dati" << std::endl;
    file << "Numero: " << 42 << ", Valore: " << 3.14 << std::endl;
    
    std::cout << "Dati scritti con successo nel file" << std::endl;
    
    return 0;
}
```

### Lettura e Scrittura Contemporanee

Con `fstream` è possibile leggere e scrivere sullo stesso file:

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    std::fstream file("dati.txt", std::ios::in | std::ios::out | std::ios::app);
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    // Lettura del contenuto attuale
    std::string linea;
    while (std::getline(file, linea)) {
        std::cout << "Contenuto attuale: " << linea << std::endl;
    }
    
    // Ritorno all'inizio del file per la scrittura
    file.clear(); // Resetta gli stati di errore (come EOF)
    
    // Aggiunta di nuovi dati alla fine del file
    file << "Nuova riga aggiunta" << std::endl;
    
    return 0;
}
```

## Controllo degli Errori

È importante verificare sempre se le operazioni sui file hanno avuto successo:

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::ifstream file("dati.txt");
    
    // Verifica se il file è stato aperto correttamente
    if (!file) {
        std::cerr << "Errore: impossibile aprire il file" << std::endl;
        return 1;
    }
    
    int numero;
    
    // Tentativo di lettura
    file >> numero;
    
    // Verifica se la lettura è avvenuta con successo
    if (file.fail()) {
        std::cerr << "Errore: formato dati non valido" << std::endl;
        file.clear(); // Resetta lo stato di errore
    }
    
    // Verifica se è stata raggiunta la fine del file
    if (file.eof()) {
        std::cout << "Fine del file raggiunta" << std::endl;
    }
    
    return 0;
}
```

## Lettura e Scrittura di Tipi di Dati Diversi

I file stream possono gestire vari tipi di dati:

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    // Scrittura di diversi tipi di dati
    std::ofstream out_file("dati_misti.txt");
    
    if (out_file) {
        int intero = 42;
        double decimale = 3.14159;
        std::string testo = "Hello, World!";
        char carattere = 'A';
        
        out_file << intero << " " << decimale << " " << testo << " " << carattere << std::endl;
        out_file.close();
    }
    
    // Lettura di diversi tipi di dati
    std::ifstream in_file("dati_misti.txt");
    
    if (in_file) {
        int intero;
        double decimale;
        std::string testo;
        char carattere;
        
        in_file >> intero >> decimale >> testo >> carattere;
        
        std::cout << "Intero: " << intero << std::endl;
        std::cout << "Decimale: " << decimale << std::endl;
        std::cout << "Testo: " << testo << std::endl;
        std::cout << "Carattere: " << carattere << std::endl;
    }
    
    return 0;
}
```

## Utilizzo dei File Stream con Classi Personalizzate

È possibile sovraccaricare gli operatori `<<` e `>>` per utilizzare i file stream con classi personalizzate:

```cpp
#include <fstream>
#include <iostream>
#include <string>

class Persona {
private:
    std::string nome;
    int età;

public:
    Persona(const std::string& n = "", int e = 0) : nome(n), età(e) {}
    
    friend std::ostream& operator<<(std::ostream& os, const Persona& p);
    friend std::istream& operator>>(std::istream& is, Persona& p);
};

// Sovraccarico dell'operatore di inserimento
std::ostream& operator<<(std::ostream& os, const Persona& p) {
    os << p.nome << " " << p.età;
    return os;
}

// Sovraccarico dell'operatore di estrazione
std::istream& operator>>(std::istream& is, Persona& p) {
    is >> p.nome >> p.età;
    return is;
}

int main() {
    // Scrittura di oggetti su file
    std::ofstream out_file("persone.txt");
    
    if (out_file) {
        Persona p1("Mario", 30);
        Persona p2("Luigi", 28);
        
        out_file << p1 << std::endl;
        out_file << p2 << std::endl;
        
        out_file.close();
    }
    
    // Lettura di oggetti da file
    std::ifstream in_file("persone.txt");
    
    if (in_file) {
        Persona p;
        
        while (in_file >> p) {
            std::cout << "Persona letta: " << p << std::endl;
        }
    }
    
    return 0;
}
```

## Domande di Autovalutazione

1. Qual è la differenza tra `ifstream`, `ofstream` e `fstream`?
2. Come si può verificare se un file è stato aperto correttamente?
3. Quali sono i diversi modi per leggere dati da un file in C++?
4. Perché è importante chiudere un file dopo averlo utilizzato?
5. Come si può gestire la lettura di un file fino alla fine?

## Esercizi Proposti

1. Scrivi un programma che legga un file di testo e conti il numero di caratteri, parole e righe presenti.
2. Crea un'applicazione che legga un file CSV (valori separati da virgole) e lo converta in un formato JSON.
3. Implementa un semplice editor di testo che permetta di aprire un file, modificarlo e salvarlo.
4. Scrivi un programma che copi il contenuto di un file in un altro file, ma convertendo tutto il testo in maiuscolo.
5. Crea una classe `Studente` con attributi come nome, cognome e voti, e implementa i metodi per salvare e caricare una lista di studenti da un file.

## Conclusione

I file stream in C++ offrono un modo potente e flessibile per interagire con i file, utilizzando gli stessi concetti e operatori degli stream standard. La comprensione di queste classi è fondamentale per creare applicazioni che necessitano di persistenza dei dati o di elaborazione di file esterni.

Nella prossima lezione, esploreremo le diverse modalità di apertura dei file e i flag che permettono di controllare il comportamento dei file stream in modo più dettagliato.