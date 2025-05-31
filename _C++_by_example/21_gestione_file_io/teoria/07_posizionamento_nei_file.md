# Posizionamento nei File in C++

## Introduzione

Il posizionamento nei file è una funzionalità fondamentale che permette di navigare all'interno di un file e accedere a specifiche posizioni per operazioni di lettura e scrittura. Questa capacità è particolarmente utile quando si lavora con file di grandi dimensioni o con file strutturati, dove è necessario accedere a dati specifici senza dover leggere l'intero file sequenzialmente.

In C++, le classi di stream forniscono metodi specifici per controllare la posizione corrente all'interno di un file, permettendo operazioni di accesso casuale ai dati.

## Concetti di Base

### Indicatori di Posizione

Quando si lavora con i file, ci sono due indicatori di posizione principali:

1. **Indicatore di Posizione di Lettura (get pointer)**: Determina da dove verranno letti i dati nelle operazioni di input.
2. **Indicatore di Posizione di Scrittura (put pointer)**: Determina dove verranno scritti i dati nelle operazioni di output.

Nelle classi di stream bidirezionali come `std::fstream`, entrambi gli indicatori sono presenti e possono essere manipolati indipendentemente.

### Metodi di Posizionamento

Le classi di stream forniscono diversi metodi per manipolare gli indicatori di posizione:

- `seekg()`: Posiziona l'indicatore di lettura (get)
- `seekp()`: Posiziona l'indicatore di scrittura (put)
- `tellg()`: Restituisce la posizione corrente dell'indicatore di lettura
- `tellp()`: Restituisce la posizione corrente dell'indicatore di scrittura

## Posizionamento dell'Indicatore di Lettura

### Utilizzo di `seekg()`

Il metodo `seekg()` ha due forme principali:

1. `seekg(posizione)`: Posiziona l'indicatore a un offset assoluto dall'inizio del file.
2. `seekg(offset, direzione)`: Posiziona l'indicatore relativamente a una direzione specificata.

Le direzioni possibili sono:

- `std::ios::beg`: Dall'inizio del file (default)
- `std::ios::cur`: Dalla posizione corrente
- `std::ios::end`: Dalla fine del file

Esempio di utilizzo di `seekg()`:

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
    
    // Posizionamento a un offset assoluto (10 byte dall'inizio)
    file.seekg(10);
    
    char c;
    file.get(c);
    std::cout << "Carattere alla posizione 10: " << c << std::endl;
    
    // Posizionamento relativo alla posizione corrente (avanti di 5 byte)
    file.seekg(5, std::ios::cur);
    
    file.get(c);
    std::cout << "Carattere 5 posizioni più avanti: " << c << std::endl;
    
    // Posizionamento relativo alla fine del file (10 byte prima della fine)
    file.seekg(-10, std::ios::end);
    
    file.get(c);
    std::cout << "Carattere 10 posizioni prima della fine: " << c << std::endl;
    
    return 0;
}
```

### Utilizzo di `tellg()`

Il metodo `tellg()` restituisce la posizione corrente dell'indicatore di lettura:

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::ifstream file("dati.txt");
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    // Ottiene la posizione iniziale
    std::streampos inizio = file.tellg();
    std::cout << "Posizione iniziale: " << inizio << std::endl;
    
    // Legge alcuni dati
    std::string linea;
    std::getline(file, linea);
    
    // Ottiene la nuova posizione
    std::streampos dopo_lettura = file.tellg();
    std::cout << "Posizione dopo la lettura: " << dopo_lettura << std::endl;
    std::cout << "Lunghezza della linea letta: " << (dopo_lettura - inizio) << " byte" << std::endl;
    
    return 0;
}
```

## Posizionamento dell'Indicatore di Scrittura

### Utilizzo di `seekp()`

Il metodo `seekp()` funziona in modo simile a `seekg()`, ma agisce sull'indicatore di scrittura:

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::fstream file("dati.txt", std::ios::in | std::ios::out);
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    // Posizionamento per la scrittura a un offset specifico
    file.seekp(10);
    
    // Scrive un carattere alla posizione 10
    file.put('X');
    
    // Posizionamento relativo alla posizione corrente
    file.seekp(5, std::ios::cur);
    
    // Scrive un altro carattere
    file.put('Y');
    
    // Posizionamento relativo alla fine del file
    file.seekp(-1, std::ios::end);
    
    // Sovrascrive l'ultimo carattere
    file.put('Z');
    
    std::cout << "Modifiche applicate al file" << std::endl;
    
    return 0;
}
```

### Utilizzo di `tellp()`

Il metodo `tellp()` restituisce la posizione corrente dell'indicatore di scrittura:

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::ofstream file("output.txt");
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    // Ottiene la posizione iniziale
    std::streampos inizio = file.tellp();
    
    // Scrive alcuni dati
    file << "Hello, World!";
    
    // Ottiene la nuova posizione
    std::streampos dopo_scrittura = file.tellp();
    std::cout << "Byte scritti: " << (dopo_scrittura - inizio) << std::endl;
    
    return 0;
}
```

## Applicazioni Pratiche

### Lettura di Record a Lunghezza Fissa

Il posizionamento nei file è particolarmente utile quando si lavora con record a lunghezza fissa, dove ogni record occupa lo stesso numero di byte:

```cpp
#include <fstream>
#include <iostream>
#include <string>
#include <vector>

struct Persona {
    char nome[30];
    int età;
    double stipendio;
};

int main() {
    // Crea un file con alcuni record
    std::ofstream file_out("persone.dat", std::ios::binary);
    
    if (!file_out) {
        std::cerr << "Errore nella creazione del file" << std::endl;
        return 1;
    }
    
    std::vector<Persona> persone = {
        {"Mario Rossi", 35, 45000.50},
        {"Luigi Verdi", 28, 38000.75},
        {"Anna Bianchi", 42, 52000.25}
    };
    
    for (const auto& p : persone) {
        file_out.write(reinterpret_cast<const char*>(&p), sizeof(Persona));
    }
    
    file_out.close();
    
    // Apre il file per la lettura casuale
    std::ifstream file_in("persone.dat", std::ios::binary);
    
    if (!file_in) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    // Dimensione di ogni record
    const std::streamsize record_size = sizeof(Persona);
    
    // Legge il secondo record (indice 1)
    int indice = 1;
    file_in.seekg(indice * record_size);
    
    Persona p;
    file_in.read(reinterpret_cast<char*>(&p), record_size);
    
    std::cout << "Record #" << indice + 1 << ": " << p.nome << ", " << p.età << " anni, "
              << p.stipendio << " euro" << std::endl;
    
    return 0;
}
```

### Modifica di Dati in Posizioni Specifiche

Il posizionamento permette di modificare dati specifici senza riscrivere l'intero file:

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    // Crea un file di testo
    std::ofstream file_out("testo.txt");
    
    if (!file_out) {
        std::cerr << "Errore nella creazione del file" << std::endl;
        return 1;
    }
    
    file_out << "Questa è la prima riga del file." << std::endl;
    file_out << "Questa è la seconda riga del file." << std::endl;
    file_out << "Questa è la terza riga del file." << std::endl;
    
    file_out.close();
    
    // Apre il file per la modifica
    std::fstream file("testo.txt", std::ios::in | std::ios::out);
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    // Trova la posizione della parola "seconda"
    std::string linea;
    std::streampos posizione = 0;
    
    while (std::getline(file, linea)) {
        size_t pos = linea.find("seconda");
        if (pos != std::string::npos) {
            // Calcola la posizione esatta nel file
            posizione += pos;
            break;
        }
        // +1 per il carattere newline
        posizione += linea.length() + 1;
    }
    
    // Posiziona l'indicatore di scrittura e modifica la parola
    file.clear(); // Resetta gli stati di errore (come EOF)
    file.seekp(posizione);
    file << "NUOVA  ";
    
    file.close();
    
    std::cout << "File modificato con successo" << std::endl;
    
    return 0;
}
```

### Creazione di un Indice per Accesso Rapido

Il posizionamento può essere utilizzato per creare un indice che permetta un accesso rapido a specifiche sezioni di un file:

```cpp
#include <fstream>
#include <iostream>
#include <string>
#include <map>
#include <vector>

int main() {
    // Crea un file con sezioni
    std::ofstream file_out("documento.txt");
    
    if (!file_out) {
        std::cerr << "Errore nella creazione del file" << std::endl;
        return 1;
    }
    
    file_out << "# Introduzione" << std::endl;
    file_out << "Questa è l'introduzione del documento." << std::endl;
    file_out << std::endl;
    
    file_out << "# Capitolo 1" << std::endl;
    file_out << "Questo è il contenuto del primo capitolo." << std::endl;
    file_out << std::endl;
    
    file_out << "# Capitolo 2" << std::endl;
    file_out << "Questo è il contenuto del secondo capitolo." << std::endl;
    file_out << std::endl;
    
    file_out << "# Conclusione" << std::endl;
    file_out << "Questa è la conclusione del documento." << std::endl;
    
    file_out.close();
    
    // Crea un indice delle sezioni
    std::ifstream file_in("documento.txt");
    std::map<std::string, std::streampos> indice;
    
    if (!file_in) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    std::string linea;
    std::streampos posizione = 0;
    
    while (std::getline(file_in, linea)) {
        if (!linea.empty() && linea[0] == '#') {
            // Rimuove il carattere # e lo spazio
            std::string titolo = linea.substr(2);
            indice[titolo] = posizione;
        }
        // +1 per il carattere newline
        posizione += linea.length() + 1;
    }
    
    file_in.close();
    
    // Visualizza l'indice
    std::cout << "Indice del documento:" << std::endl;
    for (const auto& entry : indice) {
        std::cout << "- " << entry.first << " (posizione: " << entry.second << ")" << std::endl;
    }
    
    // Utilizza l'indice per accedere direttamente a una sezione
    std::string sezione_cercata = "Capitolo 2";
    
    if (indice.find(sezione_cercata) != indice.end()) {
        std::ifstream file_read("documento.txt");
        file_read.seekg(indice[sezione_cercata]);
        
        // Legge e visualizza la sezione
        std::cout << "\nContenuto della sezione '" << sezione_cercata << "':" << std::endl;
        
        // Legge il titolo
        std::getline(file_read, linea);
        std::cout << linea << std::endl;
        
        // Legge il contenuto fino alla prossima sezione o alla fine del file
        while (std::getline(file_read, linea) && (linea.empty() || linea[0] != '#')) {
            std::cout << linea << std::endl;
        }
    } else {
        std::cout << "Sezione non trovata" << std::endl;
    }
    
    return 0;
}
```

## Considerazioni Importanti

### Gestione degli Errori

Durante le operazioni di posizionamento, è importante verificare se si sono verificati errori:

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::fstream file("dati.txt", std::ios::in | std::ios::out);
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    // Tenta di posizionarsi oltre la fine del file
    file.seekg(1000000);
    
    // Verifica se l'operazione è riuscita
    if (file.fail()) {
        std::cerr << "Errore nel posizionamento" << std::endl;
        file.clear(); // Resetta lo stato di errore
    }
    
    return 0;
}
```

### Differenze tra File di Testo e File Binari

Il posizionamento funziona in modo diverso tra file di testo e file binari, specialmente su sistemi operativi diversi:

- Nei file di testo, i caratteri di fine riga possono essere rappresentati in modo diverso (\n, \r\n), rendendo meno prevedibile il posizionamento esatto.
- Nei file binari, ogni byte è trattato allo stesso modo, rendendo il posizionamento più preciso.

```cpp
#include <fstream>
#include <iostream>

int main() {
    // File di testo
    std::ofstream text_file("testo.txt");
    text_file << "Linea 1" << std::endl;
    text_file << "Linea 2" << std::endl;
    text_file.close();
    
    // File binario
    std::ofstream bin_file("dati.bin", std::ios::binary);
    const char data[] = "Linea 1\nLinea 2\n";
    bin_file.write(data, sizeof(data) - 1); // -1 per escludere il terminatore null
    bin_file.close();
    
    // Confronto delle dimensioni
    std::ifstream text_in("testo.txt");
    text_in.seekg(0, std::ios::end);
    std::streampos text_size = text_in.tellg();
    
    std::ifstream bin_in("dati.bin", std::ios::binary);
    bin_in.seekg(0, std::ios::end);
    std::streampos bin_size = bin_in.tellg();
    
    std::cout << "Dimensione del file di testo: " << text_size << " byte" << std::endl;
    std::cout << "Dimensione del file binario: " << bin_size << " byte" << std::endl;
    
    return 0;
}
```

## Domande di Autovalutazione

1. Qual è la differenza tra `seekg()` e `seekp()`?
2. Come si può determinare la dimensione di un file utilizzando i metodi di posizionamento?
3. Quali sono le tre direzioni di riferimento che si possono utilizzare con `seekg()` e `seekp()`?
4. Perché il posizionamento nei file di testo può essere meno preciso rispetto ai file binari?
5. Come si può implementare un sistema di accesso casuale a record in un file?

## Esercizi Proposti

1. Scrivi un programma che legga un file di testo e lo visualizzi al contrario, partendo dall'ultima riga fino alla prima.
2. Crea un'applicazione che permetta di modificare un record specifico in un file binario contenente strutture dati, identificando il record tramite un campo chiave.
3. Implementa un semplice database che utilizzi un file di indice separato per accedere rapidamente ai record in un file di dati.
4. Scrivi un programma che divida un file di grandi dimensioni in più parti di dimensione specificata dall'utente.
5. Crea un'applicazione che unisca più file in un unico file, mantenendo un indice delle posizioni di inizio di ciascun file originale.

## Conclusione

Il posizionamento nei file è una funzionalità potente che permette di implementare operazioni di accesso casuale ai dati, essenziali per molte applicazioni che lavorano con file strutturati o di grandi dimensioni. La comprensione dei metodi di posizionamento e delle loro applicazioni è fondamentale per creare programmi efficienti che manipolano file in modo avanzato.

Nella prossima lezione, esploreremo l'I/O binario, che permette di leggere e scrivere dati in formato binario, offrendo maggiore efficienza e precisione rispetto all'I/O di testo.