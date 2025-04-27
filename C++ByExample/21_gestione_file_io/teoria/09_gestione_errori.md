# Gestione degli Errori di I/O in C++

## Introduzione

La gestione degli errori è un aspetto fondamentale della programmazione, specialmente quando si tratta di operazioni di input/output (I/O). Le operazioni su file e stream possono fallire per numerose ragioni: file inesistenti, permessi insufficienti, dispositivi non disponibili o errori di formattazione. Un'adeguata gestione degli errori è essenziale per creare applicazioni robuste e affidabili.

In C++, esistono diversi meccanismi per rilevare e gestire gli errori di I/O, che vanno dal controllo degli stati degli stream all'utilizzo delle eccezioni.

## Stati degli Stream

Gli stream in C++ mantengono una serie di flag di stato che possono essere consultati per determinare se un'operazione è andata a buon fine o meno. I principali flag di stato sono:

1. **good()**: Restituisce `true` se lo stream è in buono stato e pronto per le operazioni.
2. **eof()**: Restituisce `true` se è stata raggiunta la fine del file.
3. **fail()**: Restituisce `true` se un'operazione di I/O è fallita, ma lo stream è ancora utilizzabile.
4. **bad()**: Restituisce `true` se si è verificato un errore grave e lo stream non è più utilizzabile.

Esempio di utilizzo dei flag di stato:

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::ifstream file("dati.txt");
    
    if (!file.is_open()) {
        std::cerr << "Impossibile aprire il file" << std::endl;
        return 1;
    }
    
    int numero;
    while (file >> numero) {
        std::cout << "Letto: " << numero << std::endl;
    }
    
    if (file.eof()) {
        std::cout << "Raggiunta la fine del file" << std::endl;
    } else if (file.fail()) {
        std::cerr << "Errore di lettura: formato non valido" << std::endl;
    } else if (file.bad()) {
        std::cerr << "Errore grave durante la lettura" << std::endl;
    }
    
    file.close();
    return 0;
}
```

## Operatore di Test Booleano

Gli oggetti stream possono essere utilizzati direttamente in espressioni condizionali. Questo è possibile grazie all'operatore di conversione booleana che restituisce `true` se lo stream è in buono stato (`good()`) e `false` altrimenti.

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::ifstream file("dati.txt");
    
    if (!file) {
        std::cerr << "Impossibile aprire il file" << std::endl;
        return 1;
    }
    
    int numero;
    while (file >> numero) {
        // Questo ciclo continua finché la lettura ha successo
        std::cout << numero << " ";
    }
    
    return 0;
}
```

## Eccezioni negli Stream

Per impostazione predefinita, gli stream C++ non lanciano eccezioni in caso di errori. Tuttavia, è possibile configurarli per farlo utilizzando il metodo `exceptions()`.

```cpp
#include <fstream>
#include <iostream>

int main() {
    try {
        std::ifstream file("dati.txt");
        
        // Configura lo stream per lanciare eccezioni in caso di errori
        file.exceptions(std::ifstream::failbit | std::ifstream::badbit);
        
        int numero;
        while (true) {
            file >> numero;
            std::cout << numero << " ";
        }
    } catch (const std::ios_base::failure& e) {
        if (std::cin.eof()) {
            std::cout << "\nRaggiunta la fine del file" << std::endl;
        } else {
            std::cerr << "\nEccezione durante la lettura: " << e.what() << std::endl;
        }
    }
    
    return 0;
}
```

## Ripristino degli Stream dopo un Errore

Quando si verifica un errore in uno stream, potrebbe essere necessario ripristinarlo per continuare le operazioni. Questo può essere fatto utilizzando il metodo `clear()` per reimpostare i flag di stato e, se necessario, `seekg()` o `seekp()` per riposizionare il cursore.

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    std::ifstream file("dati_misti.txt");
    
    if (!file) {
        std::cerr << "Impossibile aprire il file" << std::endl;
        return 1;
    }
    
    int numero;
    std::string parola;
    
    // Tenta di leggere un numero
    if (file >> numero) {
        std::cout << "Numero letto: " << numero << std::endl;
    } else {
        // Se la lettura fallisce, ripristina lo stream e tenta di leggere una stringa
        file.clear(); // Reimposta i flag di stato
        file.seekg(0); // Torna all'inizio del file
        
        if (file >> parola) {
            std::cout << "Parola letta: " << parola << std::endl;
        } else {
            std::cerr << "Impossibile leggere dal file" << std::endl;
        }
    }
    
    file.close();
    return 0;
}
```

## Gestione degli Errori nelle Operazioni di File

La gestione degli errori è particolarmente importante nelle operazioni su file. Ecco un esempio più completo che mostra come gestire vari scenari di errore:

```cpp
#include <fstream>
#include <iostream>
#include <string>

bool salva_dati(const std::string& nome_file, const std::string& dati) {
    std::ofstream file(nome_file);
    
    if (!file) {
        std::cerr << "Errore: impossibile aprire il file '" << nome_file << "' per la scrittura" << std::endl;
        return false;
    }
    
    if (!(file << dati)) {
        std::cerr << "Errore durante la scrittura dei dati" << std::endl;
        file.close();
        return false;
    }
    
    file.close();
    if (file.fail()) {
        std::cerr << "Errore durante la chiusura del file" << std::endl;
        return false;
    }
    
    return true;
}

std::string carica_dati(const std::string& nome_file) {
    std::ifstream file(nome_file);
    
    if (!file) {
        throw std::runtime_error("Impossibile aprire il file '" + nome_file + "' per la lettura");
    }
    
    std::string contenuto;
    std::string linea;
    
    while (std::getline(file, linea)) {
        contenuto += linea + "\n";
    }
    
    if (file.bad()) {
        throw std::runtime_error("Errore durante la lettura del file '" + nome_file + "'");
    }
    
    file.close();
    return contenuto;
}

int main() {
    const std::string nome_file = "test_errori.txt";
    const std::string dati = "Questo è un test di gestione degli errori.\nSeconda linea di test.";
    
    // Test di scrittura
    if (salva_dati(nome_file, dati)) {
        std::cout << "Dati salvati con successo" << std::endl;
    } else {
        std::cerr << "Impossibile salvare i dati" << std::endl;
        return 1;
    }
    
    // Test di lettura
    try {
        std::string contenuto = carica_dati(nome_file);
        std::cout << "Contenuto del file:\n" << contenuto << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "Eccezione: " << e.what() << std::endl;
        return 1;
    }
    
    // Test di lettura con file inesistente
    try {
        std::string contenuto = carica_dati("file_inesistente.txt");
        std::cout << "Contenuto del file:\n" << contenuto << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "Eccezione prevista: " << e.what() << std::endl;
    }
    
    return 0;
}
```

## Best Practices per la Gestione degli Errori di I/O

1. **Verifica sempre l'apertura dei file**: Controlla sempre se un file è stato aperto correttamente prima di tentare operazioni su di esso.
2. **Controlla lo stato dopo le operazioni critiche**: Verifica lo stato dello stream dopo operazioni importanti di lettura o scrittura.
3. **Usa le eccezioni per errori gravi**: Configura gli stream per lanciare eccezioni in caso di errori critici che richiedono un'interruzione del flusso normale del programma.
4. **Fornisci messaggi di errore chiari**: Includi informazioni dettagliate nei messaggi di errore, come il nome del file e l'operazione che ha causato l'errore.
5. **Chiudi sempre i file**: Assicurati di chiudere i file dopo l'uso, preferibilmente utilizzando tecniche RAII (Resource Acquisition Is Initialization) come gli smart pointer o gli oggetti locali.
6. **Gestisci i diversi tipi di errori in modo appropriato**: Distingui tra diversi tipi di errori (EOF, errori di formato, errori di I/O) e gestiscili in modo appropriato.

## Domande di Autovalutazione

1. Quali sono i principali flag di stato degli stream in C++ e cosa indicano?
2. Come si può configurare uno stream per lanciare eccezioni in caso di errori?
3. Qual è la differenza tra i metodi `fail()` e `bad()` di uno stream?
4. Come si può ripristinare uno stream dopo un errore di lettura?
5. Perché è importante verificare lo stato di uno stream dopo operazioni di I/O?

## Esercizi Proposti

1. **Lettura Robusta**: Scrivi una funzione che legga numeri interi da un file, ignorando le righe che contengono dati non validi e registrando gli errori in un file di log.

2. **Copia File Sicura**: Implementa una funzione che copi un file in un altro, gestendo tutti i possibili errori e fornendo messaggi dettagliati.

3. **Validazione di Input**: Crea un programma che legga dati strutturati da un file CSV, verificando la validità di ogni campo e segnalando eventuali errori di formato.

4. **Recupero da Errori**: Scrivi un programma che tenti di leggere dati da un file, e se incontra un errore, tenti strategie alternative (come aprire un file di backup o richiedere input all'utente).

5. **Logger con Gestione degli Errori**: Implementa una classe Logger che scriva messaggi su un file, gestendo correttamente tutti i possibili errori di I/O e fornendo meccanismi di fallback (come scrivere su console se il file non è disponibile).