# Introduzione all'I/O su File in C++

In questa guida, esploreremo i concetti fondamentali dell'input/output (I/O) su file in C++, una competenza essenziale per qualsiasi programmatore che desideri salvare o caricare dati in modo persistente.

## La Libreria `<fstream>`

C++ fornisce la libreria `<fstream>` (file stream) che contiene classi e funzioni per gestire l'I/O su file. Le principali classi sono:

- `ifstream` (input file stream): per leggere dati da un file
- `ofstream` (output file stream): per scrivere dati su un file
- `fstream` (file stream): per operazioni sia di lettura che di scrittura

Queste classi ereditano da `istream` e `ostream`, quindi supportano gli stessi operatori (`<<` e `>>`) e metodi che usiamo con `cin` e `cout`.

## Apertura e Chiusura di un File

### Apertura di un File

Ci sono due modi principali per aprire un file:

1. **Tramite il costruttore**:

```cpp
#include <fstream>
#include <string>

int main() {
    std::ifstream fileInput("dati.txt");  // Apre un file in lettura
    std::ofstream fileOutput("risultati.txt");  // Apre un file in scrittura
    
    // Operazioni sul file...
    
    return 0;
}  // I file vengono chiusi automaticamente quando gli oggetti escono dallo scope
```

2. **Tramite il metodo `open()`**:

```cpp
#include <fstream>

int main() {
    std::ifstream fileInput;
    fileInput.open("dati.txt");  // Apre un file in lettura
    
    // Operazioni sul file...
    
    fileInput.close();  // Chiude esplicitamente il file
    return 0;
}
```

### Modalità di Apertura

È possibile specificare la modalità di apertura di un file utilizzando i flag della classe `ios`:

```cpp
std::ofstream file("dati.txt", std::ios::out | std::ios::app);
```

I flag più comuni sono:

- `ios::in`: Apre il file in lettura (default per ifstream)
- `ios::out`: Apre il file in scrittura (default per ofstream)
- `ios::app`: Aggiunge i dati alla fine del file
- `ios::ate`: Posiziona il puntatore alla fine del file dopo l'apertura
- `ios::trunc`: Cancella il contenuto del file se esiste (default con ios::out)
- `ios::binary`: Apre il file in modalità binaria

### Chiusura di un File

È buona pratica chiudere esplicitamente un file quando non è più necessario:

```cpp
fileInput.close();
fileOutput.close();
```

Tuttavia, i file vengono chiusi automaticamente quando gli oggetti stream escono dallo scope o quando il programma termina.

## Verifica dell'Apertura di un File

È importante verificare sempre se un file è stato aperto correttamente:

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::ifstream file("dati.txt");
    
    if (!file) {  // Equivalente a if (file.fail())
        std::cerr << "Errore: impossibile aprire il file!" << std::endl;
        return 1;
    }
    
    // Operazioni sul file...
    
    return 0;
}
```

## Posizionamento nel File

C++ offre metodi per controllare la posizione corrente nel file:

- `seekg()` e `seekp()`: Posizionano il puntatore di lettura (get) o scrittura (put)
- `tellg()` e `tellp()`: Restituiscono la posizione corrente del puntatore

```cpp
#include <fstream>

int main() {
    std::fstream file("dati.txt", std::ios::in | std::ios::out);
    
    // Vai alla posizione 10 dall'inizio del file
    file.seekg(10, std::ios::beg);
    
    // Vai 5 posizioni avanti rispetto alla posizione corrente
    file.seekg(5, std::ios::cur);
    
    // Vai 3 posizioni indietro rispetto alla fine del file
    file.seekg(-3, std::ios::end);
    
    // Ottieni la posizione corrente
    std::streampos posizione = file.tellg();
    
    return 0;
}
```

## Esempio Completo

Ecco un esempio che mostra come leggere e scrivere su un file di testo:

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    // Scrittura su file
    std::ofstream fileOutput("esempio.txt");
    
    if (fileOutput.is_open()) {
        fileOutput << "Benvenuto alla gestione dei file in C++!" << std::endl;
        fileOutput << "Questa è la seconda riga del file." << std::endl;
        fileOutput.close();
        std::cout << "File scritto con successo!" << std::endl;
    } else {
        std::cerr << "Errore nell'apertura del file per la scrittura!" << std::endl;
        return 1;
    }
    
    // Lettura da file
    std::ifstream fileInput("esempio.txt");
    std::string linea;
    
    if (fileInput.is_open()) {
        std::cout << "\nContenuto del file:" << std::endl;
        
        while (std::getline(fileInput, linea)) {
            std::cout << linea << std::endl;
        }
        
        fileInput.close();
    } else {
        std::cerr << "Errore nell'apertura del file per la lettura!" << std::endl;
        return 1;
    }
    
    return 0;
}
```

## Domande di Autovalutazione

1. Qual è la differenza tra `ifstream`, `ofstream` e `fstream`?
2. Come si può verificare se un file è stato aperto correttamente?
3. Quali sono i principali flag di modalità per l'apertura di un file?
4. Perché è importante chiudere un file dopo averlo utilizzato?
5. Come si può leggere un file riga per riga in C++?

## Esercizi Proposti

1. Scrivi un programma che crea un file di testo, scrive alcune righe su di esso e poi lo legge visualizzando il contenuto.

2. Implementa un programma che copia il contenuto di un file in un altro file.

3. Crea un'applicazione che legge un file di testo e conta il numero di parole, caratteri e righe presenti.

4. Scrivi un programma che legge un file di numeri (uno per riga) e calcola la somma, la media, il minimo e il massimo.

5. Implementa un semplice editor di testo che permette di aprire un file, modificarlo e salvarlo.