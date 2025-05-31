# Operazioni di Lettura e Scrittura in C++

## Introduzione

Le operazioni di lettura e scrittura sono fondamentali quando si lavora con i file in C++. In questa lezione, esploreremo le diverse tecniche per leggere e scrivere dati su file, dalle operazioni di base fino a quelle più avanzate.

C++ offre diversi metodi per manipolare i dati nei file, sia a livello di carattere che a livello di riga o di blocco, permettendo di gestire efficacemente vari tipi di file e formati di dati.

## Operazioni di Lettura

### Lettura Carattere per Carattere

La lettura carattere per carattere è utile quando si ha bisogno di elaborare ogni singolo carattere di un file:

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::ifstream file("testo.txt");
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    char c;
    int contatore = 0;
    
    // Lettura carattere per carattere
    while (file.get(c)) {
        std::cout << c;
        if (c == 'a' || c == 'A') {
            contatore++;
        }
    }
    
    std::cout << "\nNumero di 'a' nel file: " << contatore << std::endl;
    
    return 0;
}
```

Altre funzioni utili per la lettura di caratteri:

- `get()`: Legge un singolo carattere
- `peek()`: Visualizza il prossimo carattere senza estrarlo dallo stream
- `unget()`: Rimette l'ultimo carattere letto nello stream
- `putback(c)`: Rimette un carattere specifico nello stream

### Lettura Parola per Parola

L'operatore di estrazione `>>` legge i dati fino al prossimo spazio bianco, rendendolo ideale per leggere parole:

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    std::ifstream file("testo.txt");
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    std::string parola;
    int contatore = 0;
    
    // Lettura parola per parola
    while (file >> parola) {
        std::cout << "Parola " << contatore + 1 << ": " << parola << std::endl;
        contatore++;
    }
    
    std::cout << "Numero totale di parole: " << contatore << std::endl;
    
    return 0;
}
```

### Lettura Riga per Riga

Per leggere intere righe di testo, inclusi gli spazi, si utilizza la funzione `getline()`:

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    std::ifstream file("testo.txt");
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    std::string linea;
    int contatore = 0;
    
    // Lettura riga per riga
    while (std::getline(file, linea)) {
        std::cout << "Riga " << contatore + 1 << ": " << linea << std::endl;
        contatore++;
    }
    
    std::cout << "Numero totale di righe: " << contatore << std::endl;
    
    return 0;
}
```

### Lettura di Blocchi di Dati

Per leggere blocchi di dati di dimensione fissa, si utilizza il metodo `read()`:

```cpp
#include <fstream>
#include <iostream>
#include <vector>

int main() {
    std::ifstream file("dati.bin", std::ios::binary);
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    // Determina la dimensione del file
    file.seekg(0, std::ios::end);
    std::streamsize size = file.tellg();
    file.seekg(0, std::ios::beg);
    
    // Crea un buffer per contenere i dati
    std::vector<char> buffer(size);
    
    // Legge l'intero file in un'unica operazione
    if (file.read(buffer.data(), size)) {
        std::cout << "Letti " << file.gcount() << " byte dal file" << std::endl;
    } else {
        std::cerr << "Errore durante la lettura del file" << std::endl;
    }
    
    return 0;
}
```

## Operazioni di Scrittura

### Scrittura Carattere per Carattere

Per scrivere singoli caratteri su un file, si utilizza il metodo `put()`:

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::ofstream file("output.txt");
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    // Scrittura carattere per carattere
    for (char c = 'A'; c <= 'Z'; c++) {
        file.put(c);
        file.put(' '); // Aggiunge uno spazio tra i caratteri
    }
    
    std::cout << "Alfabeto scritto nel file" << std::endl;
    
    return 0;
}
```

### Scrittura di Stringhe e Dati Formattati

L'operatore di inserimento `<<` è il modo più comune per scrivere dati formattati su un file:

```cpp
#include <fstream>
#include <iostream>
#include <iomanip>

int main() {
    std::ofstream file("report.txt");
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    // Scrittura di dati formattati
    file << "Report Giornaliero\n";
    file << "================\n\n";
    file << "Data: " << __DATE__ << "\n";
    file << "Ora: " << __TIME__ << "\n\n";
    
    // Tabella formattata
    file << std::left << std::setw(20) << "Prodotto"
         << std::right << std::setw(10) << "Quantità"
         << std::right << std::setw(15) << "Prezzo" << "\n";
    
    file << std::string(45, '-') << "\n";
    
    file << std::left << std::setw(20) << "Mele"
         << std::right << std::setw(10) << 150
         << std::right << std::setw(15) << std::fixed << std::setprecision(2) << 2.50 << "\n";
    
    file << std::left << std::setw(20) << "Arance"
         << std::right << std::setw(10) << 75
         << std::right << std::setw(15) << std::fixed << std::setprecision(2) << 3.20 << "\n";
    
    std::cout << "Report scritto nel file" << std::endl;
    
    return 0;
}
```

### Scrittura di Blocchi di Dati

Per scrivere blocchi di dati di dimensione fissa, si utilizza il metodo `write()`:

```cpp
#include <fstream>
#include <iostream>
#include <vector>

int main() {
    // Prepara i dati da scrivere
    std::vector<int> numeri = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // Apre il file in modalità binaria
    std::ofstream file("numeri.bin", std::ios::binary);
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    // Scrive l'intero vettore in un'unica operazione
    file.write(reinterpret_cast<const char*>(numeri.data()), numeri.size() * sizeof(int));
    
    std::cout << "Scritti " << numeri.size() * sizeof(int) << " byte nel file" << std::endl;
    
    return 0;
}
```

## Tecniche Avanzate

### Lettura e Scrittura di Strutture Dati

È possibile leggere e scrivere strutture dati complete utilizzando i metodi `read()` e `write()`:

```cpp
#include <fstream>
#include <iostream>
#include <vector>
#include <string>
#include <cstring>

struct Persona {
    char nome[50];
    int età;
    double stipendio;
};

int main() {
    // Crea alcune persone
    std::vector<Persona> persone = {
        {"Mario Rossi", 35, 45000.50},
        {"Luigi Verdi", 28, 38000.75},
        {"Anna Bianchi", 42, 52000.25}
    };
    
    // Scrive le persone su file
    std::ofstream file_out("persone.dat", std::ios::binary);
    
    if (file_out) {
        // Scrive prima il numero di persone
        int num_persone = persone.size();
        file_out.write(reinterpret_cast<const char*>(&num_persone), sizeof(int));
        
        // Scrive ogni persona
        for (const auto& p : persone) {
            file_out.write(reinterpret_cast<const char*>(&p), sizeof(Persona));
        }
        
        file_out.close();
        std::cout << "Dati scritti con successo" << std::endl;
    }
    
    // Legge le persone dal file
    std::ifstream file_in("persone.dat", std::ios::binary);
    
    if (file_in) {
        // Legge il numero di persone
        int num_persone;
        file_in.read(reinterpret_cast<char*>(&num_persone), sizeof(int));
        
        // Legge ogni persona
        std::vector<Persona> persone_lette(num_persone);
        for (int i = 0; i < num_persone; i++) {
            file_in.read(reinterpret_cast<char*>(&persone_lette[i]), sizeof(Persona));
        }
        
        // Visualizza i dati letti
        for (const auto& p : persone_lette) {
            std::cout << "Nome: " << p.nome << ", Età: " << p.età
                      << ", Stipendio: " << p.stipendio << std::endl;
        }
    }
    
    return 0;
}
```

### Gestione di Stringhe in File Binari

Quando si lavora con stringhe in file binari, è necessario prestare attenzione alla loro rappresentazione:

```cpp
#include <fstream>
#include <iostream>
#include <string>
#include <vector>

struct PersonaFlessibile {
    std::string nome;
    int età;
    double stipendio;
};

// Funzione per scrivere una stringa in un file binario
void scrivi_stringa(std::ofstream& file, const std::string& str) {
    // Scrive prima la lunghezza della stringa
    int lunghezza = str.length();
    file.write(reinterpret_cast<const char*>(&lunghezza), sizeof(int));
    
    // Scrive poi i caratteri della stringa
    file.write(str.c_str(), lunghezza);
}

// Funzione per leggere una stringa da un file binario
std::string leggi_stringa(std::ifstream& file) {
    // Legge prima la lunghezza della stringa
    int lunghezza;
    file.read(reinterpret_cast<char*>(&lunghezza), sizeof(int));
    
    // Legge poi i caratteri della stringa
    std::vector<char> buffer(lunghezza);
    file.read(buffer.data(), lunghezza);
    
    return std::string(buffer.data(), lunghezza);
}

int main() {
    // Crea alcune persone con stringhe flessibili
    std::vector<PersonaFlessibile> persone = {
        {"Mario Rossi", 35, 45000.50},
        {"Luigi Verdi con un nome molto lungo", 28, 38000.75},
        {"Anna", 42, 52000.25}
    };
    
    // Scrive le persone su file
    std::ofstream file_out("persone_flex.dat", std::ios::binary);
    
    if (file_out) {
        // Scrive prima il numero di persone
        int num_persone = persone.size();
        file_out.write(reinterpret_cast<const char*>(&num_persone), sizeof(int));
        
        // Scrive ogni persona
        for (const auto& p : persone) {
            scrivi_stringa(file_out, p.nome);
            file_out.write(reinterpret_cast<const char*>(&p.età), sizeof(int));
            file_out.write(reinterpret_cast<const char*>(&p.stipendio), sizeof(double));
        }
        
        file_out.close();
        std::cout << "Dati scritti con successo" << std::endl;
    }
    
    // Legge le persone dal file
    std::ifstream file_in("persone_flex.dat", std::ios::binary);
    
    if (file_in) {
        // Legge il numero di persone
        int num_persone;
        file_in.read(reinterpret_cast<char*>(&num_persone), sizeof(int));
        
        // Legge ogni persona
        for (int i = 0; i < num_persone; i++) {
            PersonaFlessibile p;
            p.nome = leggi_stringa(file_in);
            file_in.read(reinterpret_cast<char*>(&p.età), sizeof(int));
            file_in.read(reinterpret_cast<char*>(&p.stipendio), sizeof(double));
            
            std::cout << "Nome: " << p.nome << ", Età: " << p.età
                      << ", Stipendio: " << p.stipendio << std::endl;
        }
    }
    
    return 0;
}
```

### Lettura e Scrittura di File CSV

I file CSV (Comma-Separated Values) sono un formato comune per lo scambio di dati:

```cpp
#include <fstream>
#include <iostream>
#include <string>
#include <vector>
#include <sstream>

struct Prodotto {
    std::string nome;
    int quantità;
    double prezzo;
};

// Funzione per dividere una stringa in base a un delimitatore
std::vector<std::string> split(const std::string& str, char delim) {
    std::vector<std::string> tokens;
    std::stringstream ss(str);
    std::string token;
    
    while (std::getline(ss, token, delim)) {
        tokens.push_back(token);
    }
    
    return tokens;
}

int main() {
    // Crea alcuni prodotti
    std::vector<Prodotto> prodotti = {
        {"Mele", 150, 2.50},
        {"Arance", 75, 3.20},
        {"Banane", 100, 1.80}
    };
    
    // Scrive i prodotti in formato CSV
    std::ofstream file_out("prodotti.csv");
    
    if (file_out) {
        // Intestazione
        file_out << "Nome,Quantità,Prezzo" << std::endl;
        
        // Dati
        for (const auto& p : prodotti) {
            file_out << p.nome << "," << p.quantità << "," << p.prezzo << std::endl;
        }
        
        file_out.close();
        std::cout << "File CSV creato con successo" << std::endl;
    }
    
    // Legge i prodotti dal file CSV
    std::ifstream file_in("prodotti.csv");
    
    if (file_in) {
        std::string linea;
        
        // Salta l'intestazione
        std::getline(file_in, linea);
        
        // Legge i dati
        std::vector<Prodotto> prodotti_letti;
        
        while (std::getline(file_in, linea)) {
            auto tokens = split(linea, ',');
            
            if (tokens.size() == 3) {
                Prodotto p;
                p.nome = tokens[0];
                p.quantità = std::stoi(tokens[1]);
                p.prezzo = std::stod(tokens[2]);
                
                prodotti_letti.push_back(p);
            }
        }
        
        // Visualizza i dati letti
        for (const auto& p : prodotti_letti) {
            std::cout << "Nome: " << p.nome << ", Quantità: " << p.quantità
                      << ", Prezzo: " << p.prezzo << std::endl;
        }
    }
    
    return 0;
}
```

## Gestione degli Errori

Durante le operazioni di lettura e scrittura, è importante gestire correttamente gli errori:

```cpp
#include <fstream>
#include <iostream>
#include <limits>

int main() {
    std::ifstream file("dati.txt");
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    int numero;
    
    while (file >> numero) {
        std::cout << "Numero letto: " << numero << std::endl;
    }
    
    if (file.eof()) {
        std::cout << "Fine del file raggiunta" << std::endl;
    } else if (file.fail()) {
        std::cerr << "Errore durante la lettura: formato non valido" << std::endl;
        
        // Resetta lo stato di errore
        file.clear();
        
        // Salta l'input non valido
        file.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
        
        // Continua con la lettura
        if (file >> numero) {
            std::cout << "Ripresa della lettura: " << numero << std::endl;
        }
    } else if (file.bad()) {
        std::cerr << "Errore critico durante la lettura" << std::endl;
    }
    
    return 0;
}
```

## Domande di Autovalutazione

1. Quali sono le differenze tra la lettura carattere per carattere, parola per parola e riga per riga?
2. Come si può leggere un file binario contenente strutture dati personalizzate?
3. Quali metodi si utilizzano per la lettura e scrittura di blocchi di dati?
4. Come si gestiscono le stringhe di lunghezza variabile in file binari?
5. Quali sono i principali stati di errore durante le operazioni di I/O e come si gestiscono?

## Esercizi Proposti

1. Scrivi un programma che conti il numero di occorrenze di una parola specifica in un file di testo.
2. Crea un'applicazione che legga un file CSV contenente dati di studenti (nome, età, voti) e calcoli la media dei voti per ogni studente.
3. Implementa un programma che legga un file binario contenente una serie di numeri interi e li ordini in ordine crescente, salvando il risultato in un nuovo file.
4. Scrivi un'applicazione che converta un file di testo in un formato personalizzato, dove ogni riga contiene il numero di riga originale, il numero di parole e il testo della riga.
5. Crea un programma che legga un file di log e generi un report con statistiche come il numero di errori, avvisi e messaggi informativi.

## Conclusione

Le operazioni di lettura e scrittura in C++ offrono un'ampia gamma di possibilità per manipolare i dati nei file. La scelta del metodo più appropriato dipende dal tipo di file (testo o binario) e dalla struttura dei dati che si stanno gestendo.

Nella prossima lezione, esploreremo le tecniche per il posizionamento nei file, che permettono di navigare all'interno di un file e accedere a specifiche posizioni per operazioni di lettura e scrittura.