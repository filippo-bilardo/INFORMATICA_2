# File System C++17 in C++

## Introduzione

La libreria `<filesystem>` è stata introdotta ufficialmente nello standard C++17 e fornisce un insieme completo di funzionalità per lavorare con file e directory in modo portabile. Prima di C++17, gli sviluppatori dovevano affidarsi a librerie di terze parti o a funzioni specifiche del sistema operativo per gestire operazioni sul file system, rendendo il codice meno portabile.

Questa libreria semplifica notevolmente operazioni comuni come la navigazione tra directory, la creazione e rimozione di file e cartelle, la verifica dell'esistenza di percorsi e molto altro.

## Inclusione della Libreria

Per utilizzare la libreria filesystem, è necessario includere l'header `<filesystem>` e, a seconda del compilatore e della versione, potrebbe essere necessario specificare il namespace:

```cpp
#include <filesystem>

// In C++17 completo
namespace fs = std::filesystem;

// Con alcuni compilatori più vecchi che supportavano la versione sperimentale
// namespace fs = std::experimental::filesystem;
```

## Percorsi (Path)

La classe `std::filesystem::path` è il componente fondamentale della libreria e rappresenta un percorso nel file system:

```cpp
#include <filesystem>
#include <iostream>

namespace fs = std::filesystem;

int main() {
    // Creazione di un oggetto path
    fs::path p1 = "C:/cartella/file.txt";
    fs::path p2 = "cartella/sottocartella";
    
    // Conversione automatica tra formati di percorso
    std::cout << "Percorso normalizzato: " << p1.generic_string() << std::endl;
    
    // Estrazione di componenti del percorso
    std::cout << "Nome file: " << p1.filename() << std::endl;
    std::cout << "Estensione: " << p1.extension() << std::endl;
    std::cout << "Cartella: " << p1.parent_path() << std::endl;
    
    // Operazioni su percorsi
    fs::path p3 = p2 / "file.dat";  // Operatore / per concatenare percorsi
    std::cout << "Percorso concatenato: " << p3 << std::endl;
    
    return 0;
}
```

## Verifica dell'Esistenza e Tipo di File

La libreria fornisce funzioni per verificare l'esistenza e il tipo di file:

```cpp
#include <filesystem>
#include <iostream>

namespace fs = std::filesystem;

int main() {
    fs::path p = "esempio.txt";
    
    // Verifica dell'esistenza
    if (fs::exists(p)) {
        std::cout << p << " esiste" << std::endl;
        
        // Verifica del tipo
        if (fs::is_regular_file(p)) {
            std::cout << "È un file regolare" << std::endl;
        } else if (fs::is_directory(p)) {
            std::cout << "È una directory" << std::endl;
        } else if (fs::is_symlink(p)) {
            std::cout << "È un collegamento simbolico" << std::endl;
        }
    } else {
        std::cout << p << " non esiste" << std::endl;
    }
    
    return 0;
}
```

## Creazione e Rimozione di Directory

La libreria permette di creare e rimuovere directory in modo semplice:

```cpp
#include <filesystem>
#include <iostream>

namespace fs = std::filesystem;

int main() {
    fs::path dir = "nuova_cartella";
    
    // Creazione di una directory
    if (fs::create_directory(dir)) {
        std::cout << "Directory creata con successo" << std::endl;
    } else {
        std::cout << "Impossibile creare la directory" << std::endl;
    }
    
    // Creazione di directory annidate
    fs::path nested_dir = "parent/child/grandchild";
    if (fs::create_directories(nested_dir)) {
        std::cout << "Directory annidate create con successo" << std::endl;
    }
    
    // Rimozione di una directory
    if (fs::remove(dir)) {
        std::cout << "Directory rimossa con successo" << std::endl;
    }
    
    // Rimozione ricorsiva (directory con contenuto)
    std::uintmax_t removed = fs::remove_all("parent");
    std::cout << "Rimossi " << removed << " elementi" << std::endl;
    
    return 0;
}
```

## Iterazione su Directory

La libreria fornisce strumenti per iterare sul contenuto di una directory:

```cpp
#include <filesystem>
#include <iostream>

namespace fs = std::filesystem;

int main() {
    fs::path dir = ".";
    
    // Iterazione semplice
    std::cout << "Contenuto della directory:" << std::endl;
    for (const auto& entry : fs::directory_iterator(dir)) {
        std::cout << entry.path() << std::endl;
    }
    
    // Iterazione ricorsiva
    std::cout << "\nContenuto ricorsivo:" << std::endl;
    for (const auto& entry : fs::recursive_directory_iterator(dir)) {
        std::cout << entry.path() << " (profondità: " 
                  << entry.depth() << ")" << std::endl;
    }
    
    return 0;
}
```

## Operazioni su File

La libreria permette di eseguire varie operazioni sui file:

```cpp
#include <filesystem>
#include <iostream>
#include <fstream>

namespace fs = std::filesystem;

int main() {
    fs::path source = "file_originale.txt";
    fs::path dest = "file_copia.txt";
    
    // Creazione di un file di esempio
    std::ofstream(source) << "Contenuto di esempio";
    
    // Copia di un file
    fs::copy_file(source, dest, fs::copy_options::overwrite_existing);
    std::cout << "File copiato" << std::endl;
    
    // Rinomina/spostamento di un file
    fs::path new_name = "file_rinominato.txt";
    fs::rename(dest, new_name);
    std::cout << "File rinominato" << std::endl;
    
    // Dimensione del file
    std::uintmax_t size = fs::file_size(source);
    std::cout << "Dimensione del file: " << size << " byte" << std::endl;
    
    // Ultima modifica
    auto time = fs::last_write_time(source);
    std::cout << "Ultima modifica: " << std::endl;
    
    // Rimozione dei file
    fs::remove(source);
    fs::remove(new_name);
    
    return 0;
}
```

## Spazio su Disco

La libreria permette di ottenere informazioni sullo spazio disponibile su disco:

```cpp
#include <filesystem>
#include <iostream>

namespace fs = std::filesystem;

int main() {
    fs::path p = ".";
    
    fs::space_info space = fs::space(p);
    
    std::cout << "Spazio totale: " << space.capacity << " byte" << std::endl;
    std::cout << "Spazio libero: " << space.free << " byte" << std::endl;
    std::cout << "Spazio disponibile: " << space.available << " byte" << std::endl;
    
    return 0;
}
```

## Gestione degli Errori

Le funzioni della libreria filesystem possono generare eccezioni di tipo `std::filesystem::filesystem_error` in caso di errori:

```cpp
#include <filesystem>
#include <iostream>

namespace fs = std::filesystem;

int main() {
    try {
        fs::path p = "/percorso/inesistente/o/inaccessibile";
        fs::directory_iterator it(p);  // Potrebbe generare un'eccezione
    } catch (const fs::filesystem_error& e) {
        std::cerr << "Errore filesystem: " << e.what() << std::endl;
        std::cerr << "Percorso 1: " << e.path1() << std::endl;
        std::cerr << "Percorso 2: " << e.path2() << std::endl;
        std::cerr << "Codice errore: " << e.code() << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "Altro errore: " << e.what() << std::endl;
    }
    
    return 0;
}
```

## Esempi Pratici

### Calcolo della Dimensione di una Directory

```cpp
#include <filesystem>
#include <iostream>

namespace fs = std::filesystem;

uintmax_t directory_size(const fs::path& dir) {
    uintmax_t size = 0;
    
    for (const auto& entry : fs::recursive_directory_iterator(dir)) {
        if (fs::is_regular_file(entry)) {
            size += fs::file_size(entry);
        }
    }
    
    return size;
}

int main() {
    fs::path dir = ".";
    
    try {
        uintmax_t size = directory_size(dir);
        std::cout << "Dimensione totale: " << size << " byte" << std::endl;
    } catch (const fs::filesystem_error& e) {
        std::cerr << "Errore: " << e.what() << std::endl;
    }
    
    return 0;
}
```

### Backup di una Directory

```cpp
#include <filesystem>
#include <iostream>
#include <chrono>
#include <ctime>
#include <iomanip>
#include <sstream>

namespace fs = std::filesystem;

std::string get_timestamp() {
    auto now = std::chrono::system_clock::now();
    auto time = std::chrono::system_clock::to_time_t(now);
    std::stringstream ss;
    ss << std::put_time(std::localtime(&time), "%Y%m%d_%H%M%S");
    return ss.str();
}

void backup_directory(const fs::path& source, const fs::path& backup_root) {
    if (!fs::exists(source) || !fs::is_directory(source)) {
        std::cerr << "La directory di origine non esiste" << std::endl;
        return;
    }
    
    // Crea il nome della directory di backup con timestamp
    std::string timestamp = get_timestamp();
    fs::path backup_dir = backup_root / (source.filename().string() + "_backup_" + timestamp);
    
    try {
        // Crea la directory di backup
        fs::create_directories(backup_dir);
        
        // Copia i file
        for (const auto& entry : fs::recursive_directory_iterator(source)) {
            fs::path relative = fs::relative(entry, source);
            fs::path dest = backup_dir / relative;
            
            if (fs::is_directory(entry)) {
                fs::create_directories(dest);
            } else {
                fs::create_directories(dest.parent_path());
                fs::copy_file(entry, dest, fs::copy_options::overwrite_existing);
            }
        }
        
        std::cout << "Backup completato in: " << backup_dir << std::endl;
    } catch (const fs::filesystem_error& e) {
        std::cerr << "Errore durante il backup: " << e.what() << std::endl;
    }
}

int main() {
    fs::path source = "cartella_da_backuppare";
    fs::path backup_root = "backups";
    
    backup_directory(source, backup_root);
    
    return 0;
}
```

## Domande di Autovalutazione

1. Quali sono i principali vantaggi dell'utilizzo della libreria filesystem di C++17 rispetto alle soluzioni precedenti?
2. Come si può verificare se un percorso esiste e se è un file o una directory?
3. Quali sono le differenze tra `directory_iterator` e `recursive_directory_iterator`?
4. Come si può gestire in modo efficace gli errori quando si lavora con la libreria filesystem?
5. Come si può ottenere informazioni dettagliate su un file, come dimensione e data di ultima modifica?

## Esercizi Proposti

1. Scrivi un programma che elenchi tutti i file in una directory, raggruppandoli per estensione e mostrando la dimensione totale per ogni tipo di file.
2. Implementa un semplice programma di sincronizzazione che copi solo i file più recenti da una directory di origine a una directory di destinazione.
3. Crea un'utility che cerchi file duplicati in una directory (confrontando dimensione e contenuto) e offra opzioni per eliminarli.
4. Implementa un programma che monitori una directory per cambiamenti (creazione, modifica o eliminazione di file) e registri questi eventi in un file di log.
5. Sviluppa un'applicazione che organizzi automaticamente i file in una directory in sottocartelle basate sulla data di creazione o sul tipo di file.

## Conclusione

La libreria filesystem di C++17 rappresenta un importante passo avanti nella standardizzazione delle operazioni sul file system in C++. Fornisce un'API completa, portabile ed efficiente per gestire file e directory, eliminando la necessità di utilizzare soluzioni specifiche per ogni sistema operativo o librerie di terze parti.

Con questa libreria, gli sviluppatori possono scrivere codice più pulito, più portabile e più robusto per le operazioni sul file system, migliorando la qualità complessiva delle applicazioni C++.

Nelle prossime versioni del linguaggio, questa libreria continuerà probabilmente ad evolversi, aggiungendo nuove funzionalità e migliorando quelle esistenti, rendendo ancora più semplice e potente la gestione del file system in C++.