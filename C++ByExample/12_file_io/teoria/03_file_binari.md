# File Binari in C++

In questa guida, esploreremo come lavorare con i file binari in C++, un aspetto fondamentale per la gestione efficiente dei dati e per applicazioni che richiedono la memorizzazione di informazioni in formato non testuale.

## Introduzione ai File Binari

A differenza dei file di testo, i file binari memorizzano i dati nel loro formato nativo, senza conversione in caratteri leggibili. Questo approccio offre diversi vantaggi:

- **Efficienza**: I dati binari occupano generalmente meno spazio rispetto alla loro rappresentazione testuale.
- **Precisione**: Non ci sono problemi di conversione o perdita di precisione come può accadere con i numeri in formato testo.
- **Velocità**: Le operazioni di lettura e scrittura sono più veloci poiché non è necessaria alcuna conversione.
- **Versatilità**: È possibile memorizzare qualsiasi tipo di dato, inclusi oggetti complessi e strutture dati.

## Apertura di File Binari

Per lavorare con file binari in C++, utilizziamo ancora la libreria `<fstream>`, ma dobbiamo specificare la modalità binaria:

```cpp
#include <fstream>
#include <iostream>

int main() {
    // Apertura di un file binario in scrittura
    std::ofstream fileOutput("dati.bin", std::ios::binary);
    
    // Apertura di un file binario in lettura
    std::ifstream fileInput("dati.bin", std::ios::binary);
    
    // Apertura di un file binario in lettura e scrittura
    std::fstream fileBoth("dati.bin", std::ios::binary | std::ios::in | std::ios::out);
    
    return 0;
}
```

L'opzione `std::ios::binary` indica al sistema di non effettuare alcuna conversione sui dati.

## Scrittura di Dati Binari

Per scrivere dati binari, utilizziamo il metodo `write()` che accetta un puntatore a char e il numero di byte da scrivere:

```cpp
#include <fstream>
#include <iostream>

int main() {
    // Dati da scrivere
    int numeri[] = {10, 20, 30, 40, 50};
    
    // Apertura del file in modalità binaria
    std::ofstream file("numeri.bin", std::ios::binary);
    
    if (file.is_open()) {
        // Scrittura dell'array come blocco di dati binari
        file.write(reinterpret_cast<char*>(numeri), sizeof(numeri));
        
        file.close();
        std::cout << "Dati scritti con successo!" << std::endl;
    } else {
        std::cerr << "Impossibile aprire il file!" << std::endl;
    }
    
    return 0;
}
```

Il cast `reinterpret_cast<char*>` è necessario perché `write()` accetta solo puntatori a char.

## Lettura di Dati Binari

Per leggere dati binari, utilizziamo il metodo `read()` che funziona in modo simile a `write()`:

```cpp
#include <fstream>
#include <iostream>

int main() {
    // Array dove memorizzare i dati letti
    int numeri[5];
    
    // Apertura del file in modalità binaria
    std::ifstream file("numeri.bin", std::ios::binary);
    
    if (file.is_open()) {
        // Lettura del blocco di dati binari
        file.read(reinterpret_cast<char*>(numeri), sizeof(numeri));
        
        // Verifica quanti byte sono stati effettivamente letti
        std::streamsize bytesLetti = file.gcount();
        
        file.close();
        
        // Stampa dei dati letti
        std::cout << "Letti " << bytesLetti << " bytes" << std::endl;
        for (int i = 0; i < 5; i++) {
            std::cout << "numeri[" << i << "] = " << numeri[i] << std::endl;
        }
    } else {
        std::cerr << "Impossibile aprire il file!" << std::endl;
    }
    
    return 0;
}
```

## Posizionamento nel File

Per i file binari, è spesso necessario posizionarsi in punti specifici del file:

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::fstream file("dati.bin", std::ios::binary | std::ios::in | std::ios::out);
    
    if (file.is_open()) {
        // Posizionamento dall'inizio del file (posizione 10)
        file.seekg(10, std::ios::beg);
        
        // Posizionamento dalla posizione corrente (avanti di 5 byte)
        file.seekg(5, std::ios::cur);
        
        // Posizionamento dalla fine del file (indietro di 20 byte)
        file.seekg(-20, std::ios::end);
        
        // Ottenimento della posizione corrente
        std::streampos posizione = file.tellg();
        std::cout << "Posizione corrente: " << posizione << std::endl;
        
        file.close();
    }
    
    return 0;
}
```

- `seekg()`: posiziona il puntatore di lettura (get)
- `seekp()`: posiziona il puntatore di scrittura (put)
- `tellg()`: restituisce la posizione corrente del puntatore di lettura
- `tellp()`: restituisce la posizione corrente del puntatore di scrittura

## Scrittura e Lettura di Oggetti

È possibile scrivere e leggere oggetti complessi, ma bisogna prestare attenzione:

```cpp
#include <fstream>
#include <iostream>
#include <string>

// Struttura semplice
struct Persona {
    char nome[50];
    int eta;
    double stipendio;
};

int main() {
    // Creazione di un oggetto Persona
    Persona p1;
    strcpy(p1.nome, "Mario Rossi");
    p1.eta = 35;
    p1.stipendio = 45000.50;
    
    // Scrittura dell'oggetto su file
    std::ofstream fileOutput("persone.bin", std::ios::binary);
    if (fileOutput.is_open()) {
        fileOutput.write(reinterpret_cast<char*>(&p1), sizeof(Persona));
        fileOutput.close();
    }
    
    // Lettura dell'oggetto dal file
    Persona p2;
    std::ifstream fileInput("persone.bin", std::ios::binary);
    if (fileInput.is_open()) {
        fileInput.read(reinterpret_cast<char*>(&p2), sizeof(Persona));
        fileInput.close();
        
        // Stampa dei dati letti
        std::cout << "Nome: " << p2.nome << std::endl;
        std::cout << "Età: " << p2.eta << std::endl;
        std::cout << "Stipendio: " << p2.stipendio << std::endl;
    }
    
    return 0;
}
```

## Considerazioni Importanti

1. **Portabilità**: I file binari non sono sempre portabili tra sistemi diversi a causa di differenze nell'endianness, nell'allineamento dei dati e nelle dimensioni dei tipi.

2. **Oggetti con Puntatori**: Gli oggetti che contengono puntatori non possono essere scritti direttamente, poiché i puntatori non avranno senso quando il file viene letto in un altro contesto.

3. **Classi con Membri Dinamici**: Le classi con membri allocati dinamicamente (come `std::string`) richiedono una serializzazione personalizzata.

4. **Versioning**: Se la struttura dei dati cambia nel tempo, è necessario implementare un meccanismo di versioning per garantire la compatibilità.

## Serializzazione

Per gestire oggetti complessi, è spesso necessario implementare funzioni di serializzazione e deserializzazione personalizzate:

```cpp
#include <fstream>
#include <iostream>
#include <string>
#include <vector>

class Studente {
private:
    std::string nome;
    std::vector<int> voti;
    int matricola;

public:
    Studente(const std::string& n, int m) : nome(n), matricola(m) {}
    
    void aggiungiVoto(int voto) {
        voti.push_back(voto);
    }
    
    // Serializzazione
    bool salva(std::ofstream& file) const {
        // Salva la lunghezza del nome
        size_t lunghezza = nome.length();
        file.write(reinterpret_cast<const char*>(&lunghezza), sizeof(lunghezza));
        
        // Salva il nome
        file.write(nome.c_str(), lunghezza);
        
        // Salva la matricola
        file.write(reinterpret_cast<const char*>(&matricola), sizeof(matricola));
        
        // Salva il numero di voti
        size_t numVoti = voti.size();
        file.write(reinterpret_cast<const char*>(&numVoti), sizeof(numVoti));
        
        // Salva i voti
        for (int voto : voti) {
            file.write(reinterpret_cast<const char*>(&voto), sizeof(voto));
        }
        
        return file.good();
    }
    
    // Deserializzazione
    static Studente carica(std::ifstream& file) {
        // Leggi la lunghezza del nome
        size_t lunghezza;
        file.read(reinterpret_cast<char*>(&lunghezza), sizeof(lunghezza));
        
        // Leggi il nome
        std::vector<char> buffer(lunghezza + 1, '\0');
        file.read(buffer.data(), lunghezza);
        std::string nome(buffer.data());
        
        // Leggi la matricola
        int matricola;
        file.read(reinterpret_cast<char*>(&matricola), sizeof(matricola));
        
        // Crea lo studente
        Studente s(nome, matricola);
        
        // Leggi il numero di voti
        size_t numVoti;
        file.read(reinterpret_cast<char*>(&numVoti), sizeof(numVoti));
        
        // Leggi i voti
        for (size_t i = 0; i < numVoti; i++) {
            int voto;
            file.read(reinterpret_cast<char*>(&voto), sizeof(voto));
            s.aggiungiVoto(voto);
        }
        
        return s;
    }
    
    // Metodo per la stampa
    void stampa() const {
        std::cout << "Nome: " << nome << ", Matricola: " << matricola << std::endl;
        std::cout << "Voti: ";
        for (int voto : voti) {
            std::cout << voto << " ";
        }
        std::cout << std::endl;
    }
};

int main() {
    // Creazione di alcuni studenti
    Studente s1("Mario Rossi", 12345);
    s1.aggiungiVoto(28);
    s1.aggiungiVoto(30);
    s1.aggiungiVoto(25);
    
    Studente s2("Laura Bianchi", 67890);
    s2.aggiungiVoto(30);
    s2.aggiungiVoto(29);
    
    // Salvataggio su file
    std::ofstream fileOutput("studenti.bin", std::ios::binary);
    if (fileOutput.is_open()) {
        s1.salva(fileOutput);
        s2.salva(fileOutput);
        fileOutput.close();
        std::cout << "Studenti salvati con successo!" << std::endl;
    }
    
    // Caricamento dal file
    std::ifstream fileInput("studenti.bin", std::ios::binary);
    if (fileInput.is_open()) {
        Studente s1_caricato = Studente::carica(fileInput);
        Studente s2_caricato = Studente::carica(fileInput);
        fileInput.close();
        
        std::cout << "\nStudenti caricati:" << std::endl;
        s1_caricato.stampa();
        s2_caricato.stampa();
    }
    
    return 0;
}
```

## Conclusione

I file binari sono uno strumento potente per la gestione efficiente dei dati in C++. Tuttavia, richiedono una maggiore attenzione rispetto ai file di testo, soprattutto quando si tratta di oggetti complessi o di portabilità tra sistemi diversi. La serializzazione personalizzata è spesso la soluzione migliore per gestire questi casi.