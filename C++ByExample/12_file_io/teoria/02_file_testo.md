# File di Testo in C++

In questa guida, esploreremo come lavorare con i file di testo in C++, un'operazione comune nella programmazione per salvare e caricare dati in formato leggibile dall'uomo.

## Caratteristiche dei File di Testo

I file di testo:
- Contengono caratteri leggibili (lettere, numeri, simboli)
- Sono organizzati in righe, separate da caratteri di nuova riga
- Possono essere aperti e modificati con qualsiasi editor di testo
- Sono ideali per dati che devono essere letti da umani o condivisi tra programmi diversi

## Scrittura su File di Testo

### Scrittura Base

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::ofstream file("dati.txt");
    
    if (file.is_open()) {
        file << "Questa è la prima riga" << std::endl;
        file << "Questa è la seconda riga" << std::endl;
        file << "Numero: " << 42 << std::endl;
        
        file.close();
        std::cout << "Dati scritti con successo!" << std::endl;
    } else {
        std::cerr << "Impossibile aprire il file!" << std::endl;
    }
    
    return 0;
}
```

### Aggiunta di Contenuto (Append)

Per aggiungere contenuto alla fine di un file esistente, utilizzare il flag `ios::app`:

```cpp
#include <fstream>

int main() {
    std::ofstream file("dati.txt", std::ios::app);
    
    if (file.is_open()) {
        file << "Questa riga viene aggiunta alla fine del file" << std::endl;
        file.close();
    }
    
    return 0;
}
```

## Lettura da File di Testo

### Lettura Riga per Riga

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    std::ifstream file("dati.txt");
    std::string linea;
    
    if (file.is_open()) {
        while (std::getline(file, linea)) {
            std::cout << linea << std::endl;
        }
        file.close();
    } else {
        std::cerr << "Impossibile aprire il file!" << std::endl;
    }
    
    return 0;
}
```

### Lettura Parola per Parola

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    std::ifstream file("dati.txt");
    std::string parola;
    
    if (file.is_open()) {
        while (file >> parola) {
            std::cout << parola << std::endl;
        }
        file.close();
    }
    
    return 0;
}
```

### Lettura Carattere per Carattere

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::ifstream file("dati.txt");
    char carattere;
    
    if (file.is_open()) {
        while (file.get(carattere)) {
            std::cout << carattere;
        }
        file.close();
    }
    
    return 0;
}
```

## Formattazione dell'Output

Puoi controllare la formattazione dell'output nei file di testo utilizzando i manipolatori di stream:

```cpp
#include <fstream>
#include <iomanip>  // Per i manipolatori

int main() {
    std::ofstream file("formattato.txt");
    
    if (file.is_open()) {
        // Imposta la precisione per i numeri in virgola mobile
        file << std::fixed << std::setprecision(2);
        
        // Scrive un numero con larghezza fissa e riempimento
        file << std::setw(10) << std::setfill('0') << 42 << std::endl;
        
        // Scrive numeri in diverse basi
        file << "Decimale: " << std::dec << 255 << std::endl;
        file << "Esadecimale: " << std::hex << 255 << std::endl;
        file << "Ottale: " << std::oct << 255 << std::endl;
        
        file.close();
    }
    
    return 0;
}
```

## Gestione di File CSV

I file CSV (Comma-Separated Values) sono un formato comune per i dati tabulari:

```cpp
#include <fstream>
#include <iostream>
#include <string>
#include <vector>
#include <sstream>

// Struttura per rappresentare una riga di dati
struct Persona {
    std::string nome;
    int eta;
    std::string citta;
};

// Funzione per dividere una stringa in base a un delimitatore
std::vector<std::string> split(const std::string& s, char delimiter) {
    std::vector<std::string> tokens;
    std::string token;
    std::istringstream tokenStream(s);
    
    while (std::getline(tokenStream, token, delimiter)) {
        tokens.push_back(token);
    }
    
    return tokens;
}

int main() {
    // Scrittura di un file CSV
    std::ofstream fileOutput("persone.csv");
    
    if (fileOutput.is_open()) {
        // Intestazione
        fileOutput << "Nome,Età,Città" << std::endl;
        
        // Dati
        fileOutput << "Mario,30,Roma" << std::endl;
        fileOutput << "Lucia,25,Milano" << std::endl;
        fileOutput << "Giovanni,40,Napoli" << std::endl;
        
        fileOutput.close();
    }
    
    // Lettura di un file CSV
    std::ifstream fileInput("persone.csv");
    std::string linea;
    std::vector<Persona> persone;
    
    if (fileInput.is_open()) {
        // Salta la riga di intestazione
        std::getline(fileInput, linea);
        
        // Leggi i dati
        while (std::getline(fileInput, linea)) {
            std::vector<std::string> valori = split(linea, ',');
            
            if (valori.size() >= 3) {
                Persona p;
                p.nome = valori[0];
                p.eta = std::stoi(valori[1]);
                p.citta = valori[2];
                
                persone.push_back(p);
            }
        }
        
        fileInput.close();
    }
    
    // Stampa i dati letti
    for (const auto& p : persone) {
        std::cout << "Nome: " << p.nome << ", Età: " << p.eta 
                  << ", Città: " << p.citta << std::endl;
    }
    
    return 0;
}
```

## File di Configurazione

Un caso d'uso comune per i file di testo è la gestione delle configurazioni:

```cpp
#include <fstream>
#include <iostream>
#include <string>
#include <map>
#include <sstream>

// Funzione per caricare un file di configurazione
std::map<std::string, std::string> caricaConfigurazione(const std::string& nomeFile) {
    std::map<std::string, std::string> config;
    std::ifstream file(nomeFile);
    std::string linea;
    
    if (file.is_open()) {
        while (std::getline(file, linea)) {
            // Ignora commenti e righe vuote
            if (linea.empty() || linea[0] == '#') {
                continue;
            }
            
            // Cerca il separatore '='
            size_t pos = linea.find('=');
            if (pos != std::string::npos) {
                std::string chiave = linea.substr(0, pos);
                std::string valore = linea.substr(pos + 1);
                
                // Rimuovi spazi bianchi
                chiave.erase(0, chiave.find_first_not_of(" \t"));
                chiave.erase(chiave.find_last_not_of(" \t") + 1);
                valore.erase(0, valore.find_first_not_of(" \t"));
                valore.erase(valore.find_last_not_of(" \t") + 1);
                
                config[chiave] = valore;
            }
        }
        file.close();
    }
    
    return config;
}

int main() {
    // Crea un file di configurazione di esempio
    std::ofstream fileOutput("config.ini");
    
    if (fileOutput.is_open()) {
        fileOutput << "# Questo è un file di configurazione di esempio" << std::endl;
        fileOutput << "porta = 8080" << std::endl;
        fileOutput << "indirizzo = 127.0.0.1" << std::endl;
        fileOutput << "debug = true" << std::endl;
        fileOutput << "max_connessioni = 100" << std::endl;
        fileOutput.close();
    }
    
    // Carica e utilizza la configurazione
    std::map<std::string, std::string> config = caricaConfigurazione("config.ini");
    
    std::cout << "Configurazione caricata:" << std::endl;
    for (const auto& [chiave, valore] : config) {
        std::cout << chiave << " = " << valore << std::endl;
    }
    
    // Accedi a valori specifici
    if (config.find("porta") != config.end()) {
        int porta = std::stoi(config["porta"]);
        std::cout << "\nPorta configurata: " << porta << std::endl;
    }
    
    return 0;
}
```

## Domande di Autovalutazione

1. Qual è la differenza tra leggere un file carattere per carattere e riga per riga?
2. Come si può aggiungere contenuto alla fine di un file esistente?
3. Quali sono i vantaggi e gli svantaggi dei file di testo rispetto ai file binari?
4. Come si può gestire la formattazione quando si scrive su un file di testo?
5. Quali sono le considerazioni da fare quando si lavora con file CSV in C++?

## Esercizi Proposti

1. Crea un programma che legge un file di testo e crea una copia invertendo l'ordine delle righe.

2. Implementa un semplice database di contatti che salva e carica i dati da un file CSV.

3. Scrivi un programma che analizza un file di log e estrae statistiche (ad esempio, conta le occorrenze di determinate parole chiave).

4. Crea un'applicazione che legge un file di configurazione in formato chiave-valore e lo utilizza per impostare i parametri del programma.

5. Implementa un convertitore che trasforma un file di testo in formato HTML, sostituendo caratteri speciali e aggiungendo tag appropriati.