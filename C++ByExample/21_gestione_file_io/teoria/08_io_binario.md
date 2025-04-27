# I/O Binario in C++

## Introduzione

L'I/O binario è una modalità di lettura e scrittura dei file che permette di manipolare i dati nel loro formato nativo, senza conversioni in formato testuale. Questa modalità è particolarmente utile quando si lavora con dati strutturati, come record o oggetti, o quando è necessaria la massima efficienza e precisione nella rappresentazione dei dati.

A differenza dell'I/O testuale, che interpreta i dati come sequenze di caratteri e applica conversioni di formato, l'I/O binario tratta i dati come sequenze di byte, preservando esattamente la loro rappresentazione in memoria.

## Vantaggi dell'I/O Binario

1. **Efficienza**: L'I/O binario è generalmente più veloce dell'I/O testuale, poiché non richiede conversioni tra rappresentazioni interne e testuali.
2. **Precisione**: I dati numerici vengono salvati esattamente come sono rappresentati in memoria, evitando perdite di precisione dovute alle conversioni.
3. **Compattezza**: I file binari occupano generalmente meno spazio rispetto ai file di testo equivalenti.
4. **Preservazione della struttura dei dati**: Le strutture dati complesse possono essere salvate e caricate mantenendo la loro organizzazione interna.

## Apertura di File in Modalità Binaria

Per aprire un file in modalità binaria in C++, si utilizza il flag `std::ios::binary` in combinazione con i flag di apertura standard:

```cpp
#include <fstream>
#include <iostream>

int main() {
    // Apertura di un file in modalità binaria per scrittura
    std::ofstream file_out("dati.bin", std::ios::binary | std::ios::out);
    
    if (!file_out) {
        std::cerr << "Errore nell'apertura del file per la scrittura" << std::endl;
        return 1;
    }
    
    // Operazioni di scrittura...
    file_out.close();
    
    // Apertura di un file in modalità binaria per lettura
    std::ifstream file_in("dati.bin", std::ios::binary | std::ios::in);
    
    if (!file_in) {
        std::cerr << "Errore nell'apertura del file per la lettura" << std::endl;
        return 1;
    }
    
    // Operazioni di lettura...
    file_in.close();
    
    return 0;
}
```

## Scrittura Binaria

### Utilizzo di `write()`

Per scrivere dati in formato binario, si utilizza il metodo `write()` delle classi di output stream. Questo metodo accetta due parametri:

1. Un puntatore ai dati da scrivere, convertito in `const char*`
2. Il numero di byte da scrivere

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::ofstream file("numeri.bin", std::ios::binary);
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    // Scrittura di un intero
    int numero = 42;
    file.write(reinterpret_cast<const char*>(&numero), sizeof(numero));
    
    // Scrittura di un array di double
    double valori[] = {3.14, 2.71, 1.41};
    file.write(reinterpret_cast<const char*>(valori), sizeof(valori));
    
    file.close();
    
    return 0;
}
```

### Scrittura di Strutture Dati

È possibile scrivere strutture dati complete in un file binario:

```cpp
#include <fstream>
#include <iostream>
#include <string>
#include <vector>

struct Persona {
    int id;
    char nome[50];
    double stipendio;
};

int main() {
    std::ofstream file("persone.bin", std::ios::binary);
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    // Creazione di alcune strutture Persona
    std::vector<Persona> persone = {
        {1, "Mario Rossi", 45000.50},
        {2, "Luigi Verdi", 38000.75},
        {3, "Anna Bianchi", 52000.25}
    };
    
    // Scrittura delle strutture nel file
    for (const auto& p : persone) {
        file.write(reinterpret_cast<const char*>(&p), sizeof(Persona));
    }
    
    file.close();
    
    return 0;
}
```

## Lettura Binaria

### Utilizzo di `read()`

Per leggere dati in formato binario, si utilizza il metodo `read()` delle classi di input stream. Questo metodo accetta due parametri:

1. Un puntatore alla memoria dove salvare i dati letti, convertito in `char*`
2. Il numero di byte da leggere

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::ifstream file("numeri.bin", std::ios::binary);
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    // Lettura di un intero
    int numero;
    file.read(reinterpret_cast<char*>(&numero), sizeof(numero));
    std::cout << "Numero letto: " << numero << std::endl;
    
    // Lettura di un array di double
    double valori[3];
    file.read(reinterpret_cast<char*>(valori), sizeof(valori));
    
    std::cout << "Valori letti:" << std::endl;
    for (int i = 0; i < 3; i++) {
        std::cout << valori[i] << std::endl;
    }
    
    file.close();
    
    return 0;
}
```

### Lettura di Strutture Dati

È possibile leggere strutture dati complete da un file binario:

```cpp
#include <fstream>
#include <iostream>
#include <string>
#include <vector>

struct Persona {
    int id;
    char nome[50];
    double stipendio;
};

int main() {
    std::ifstream file("persone.bin", std::ios::binary);
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    // Lettura delle strutture dal file
    std::vector<Persona> persone;
    Persona p;
    
    while (file.read(reinterpret_cast<char*>(&p), sizeof(Persona))) {
        persone.push_back(p);
    }
    
    // Visualizzazione dei dati letti
    std::cout << "Persone lette dal file:" << std::endl;
    for (const auto& p : persone) {
        std::cout << "ID: " << p.id << ", Nome: " << p.nome
                  << ", Stipendio: " << p.stipendio << std::endl;
    }
    
    file.close();
    
    return 0;
}
```

## Verifica delle Operazioni di I/O

È importante verificare se le operazioni di lettura e scrittura sono state completate con successo:

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::fstream file("dati.bin", std::ios::binary | std::ios::in | std::ios::out);
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    int dati[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // Scrittura dei dati
    file.write(reinterpret_cast<const char*>(dati), sizeof(dati));
    
    // Verifica se la scrittura è avvenuta con successo
    if (file.fail()) {
        std::cerr << "Errore durante la scrittura" << std::endl;
        file.close();
        return 1;
    }
    
    // Riposizionamento all'inizio del file
    file.seekg(0);
    
    // Lettura dei dati
    int dati_letti[10];
    file.read(reinterpret_cast<char*>(dati_letti), sizeof(dati_letti));
    
    // Verifica se la lettura è avvenuta con successo
    if (file.fail() && !file.eof()) {
        std::cerr << "Errore durante la lettura" << std::endl;
        file.close();
        return 1;
    }
    
    // Verifica quanti byte sono stati effettivamente letti
    std::streamsize bytes_letti = file.gcount();
    std::cout << "Byte letti: " << bytes_letti << std::endl;
    
    file.close();
    
    return 0;
}
```

## Applicazioni Pratiche

### Serializzazione di Oggetti

L'I/O binario può essere utilizzato per implementare una forma semplice di serializzazione degli oggetti:

```cpp
#include <fstream>
#include <iostream>
#include <string>
#include <vector>

class Prodotto {
private:
    int codice;
    char nome[50];
    double prezzo;
    int quantita;

public:
    Prodotto() : codice(0), nome{""), prezzo(0.0), quantita(0) {}
    
    Prodotto(int c, const std::string& n, double p, int q) : codice(c), prezzo(p), quantita(q) {
        strncpy(nome, n.c_str(), sizeof(nome) - 1);
        nome[sizeof(nome) - 1] = '\0';
    }
    
    void visualizza() const {
        std::cout << "Codice: " << codice << ", Nome: " << nome
                  << ", Prezzo: " << prezzo << ", Quantità: " << quantita << std::endl;
    }
    
    // Metodo per salvare l'oggetto in un file binario
    bool salva(std::ofstream& file) const {
        file.write(reinterpret_cast<const char*>(this), sizeof(Prodotto));
        return !file.fail();
    }
    
    // Metodo per caricare l'oggetto da un file binario
    bool carica(std::ifstream& file) {
        file.read(reinterpret_cast<char*>(this), sizeof(Prodotto));
        return !file.fail();
    }
};

int main() {
    // Creazione di alcuni prodotti
    std::vector<Prodotto> prodotti = {
        Prodotto(101, "Tastiera", 45.99, 10),
        Prodotto(102, "Mouse", 25.50, 15),
        Prodotto(103, "Monitor", 199.99, 5)
    };
    
    // Salvataggio dei prodotti in un file binario
    std::ofstream file_out("prodotti.bin", std::ios::binary);
    
    if (!file_out) {
        std::cerr << "Errore nell'apertura del file per la scrittura" << std::endl;
        return 1;
    }
    
    for (const auto& p : prodotti) {
        p.salva(file_out);
    }
    
    file_out.close();
    
    // Caricamento dei prodotti dal file binario
    std::ifstream file_in("prodotti.bin", std::ios::binary);
    
    if (!file_in) {
        std::cerr << "Errore nell'apertura del file per la lettura" << std::endl;
        return 1;
    }
    
    std::vector<Prodotto> prodotti_caricati;
    Prodotto p;
    
    while (p.carica(file_in)) {
        prodotti_caricati.push_back(p);
    }
    
    file_in.close();
    
    // Visualizzazione dei prodotti caricati
    std::cout << "Prodotti caricati dal file:" << std::endl;
    for (const auto& p : prodotti_caricati) {
        p.visualizza();
    }
    
    return 0;
}
```

### Database Semplice

L'I/O binario può essere utilizzato per implementare un semplice database con accesso casuale ai record:

```cpp
#include <fstream>
#include <iostream>
#include <string>
#include <vector>

struct Record {
    int id;
    char nome[50];
    char indirizzo[100];
    double saldo;
    bool attivo;
};

class Database {
private:
    std::string nome_file;
    std::fstream file;
    
    // Calcola la posizione di un record nel file
    std::streampos posizione_record(int id) {
        return static_cast<std::streampos>((id - 1) * sizeof(Record));
    }
    
public:
    Database(const std::string& nome) : nome_file(nome) {
        // Apre il file in modalità binaria per lettura e scrittura
        file.open(nome_file, std::ios::binary | std::ios::in | std::ios::out);
        
        // Se il file non esiste, lo crea
        if (!file) {
            file.clear();
            file.open(nome_file, std::ios::binary | std::ios::out);
            file.close();
            file.open(nome_file, std::ios::binary | std::ios::in | std::ios::out);
        }
    }
    
    ~Database() {
        if (file.is_open()) {
            file.close();
        }
    }
    
    // Inserisce o aggiorna un record
    bool inserisci(const Record& r) {
        file.seekp(posizione_record(r.id));
        file.write(reinterpret_cast<const char*>(&r), sizeof(Record));
        return !file.fail();
    }
    
    // Legge un record
    bool leggi(int id, Record& r) {
        file.seekg(posizione_record(id));
        file.read(reinterpret_cast<char*>(&r), sizeof(Record));
        return !file.fail();
    }
    
    // Elimina logicamente un record
    bool elimina(int id) {
        Record r;
        if (leggi(id, r)) {
            r.attivo = false;
            return inserisci(r);
        }
        return false;
    }
};

int main() {
    Database db("clienti.dat");
    
    // Inserimento di alcuni record
    Record r1 = {1, "Mario Rossi", "Via Roma 1, Milano", 1500.75, true};
    Record r2 = {2, "Luigi Verdi", "Via Napoli 5, Roma", 2750.50, true};
    Record r3 = {3, "Anna Bianchi", "Via Torino 10, Firenze", 950.25, true};
    
    db.inserisci(r1);
    db.inserisci(r2);
    db.inserisci(r3);
    
    // Lettura di un record
    Record r;
    if (db.leggi(2, r)) {
        std::cout << "Record trovato:" << std::endl;
        std::cout << "ID: " << r.id << ", Nome: " << r.nome
                  << ", Indirizzo: " << r.indirizzo
                  << ", Saldo: " << r.saldo
                  << ", Attivo: " << (r.attivo ? "Sì" : "No") << std::endl;
    } else {
        std::cout << "Record non trovato" << std::endl;
    }
    
    // Modifica di un record
    if (db.leggi(1, r)) {
        r.saldo += 500;
        db.inserisci(r);
        std::cout << "Saldo aggiornato per " << r.nome << std::endl;
    }
    
    // Eliminazione logica di un record
    db.elimina(3);
    std::cout << "Record #3 eliminato logicamente" << std::endl;
    
    return 0;
}
```

## Considerazioni Importanti

### Portabilità

I file binari possono presentare problemi di portabilità tra sistemi diversi a causa di:

1. **Endianness**: L'ordine dei byte può variare tra architetture diverse (little-endian vs big-endian).
2. **Dimensione dei tipi**: La dimensione dei tipi di dati può variare tra compilatori e sistemi operativi diversi.
3. **Allineamento**: Le strutture possono avere padding diverso su architetture diverse.

Per garantire la portabilità, è possibile:

- Utilizzare tipi di dati a dimensione fissa (come `int32_t`, `int64_t` da `<cstdint>`)
- Implementare funzioni di serializzazione che gestiscano esplicitamente l'ordine dei byte
- Utilizzare formati binari standard come Protocol Buffers o MessagePack

### Sicurezza

Quando si legge da file binari, è importante verificare la validità dei dati per evitare comportamenti imprevisti:

```cpp
#include <fstream>
#include <iostream>

struct Dati {
    int id;
    double valore;
};

bool valida_dati(const Dati& d) {
    // Esempio di validazione
    return d.id > 0 && d.valore >= 0.0;
}

int main() {
    std::ifstream file("dati.bin", std::ios::binary);
    
    if (!file) {
        std::cerr << "Errore nell'apertura del file" << std::endl;
        return 1;
    }
    
    Dati d;
    while (file.read(reinterpret_cast<char*>(&d), sizeof(Dati))) {
        // Verifica la validità dei dati prima di utilizzarli
        if (valida_dati(d)) {
            std::cout << "ID: " << d.id << ", Valore: " << d.valore << std::endl;
        } else {
            std::cerr << "Dati non validi trovati nel file" << std::endl;
        }
    }
    
    file.close();
    
    return 0;
}
```

## Domande di Autovalutazione

1. Quali sono le principali differenze tra I/O testuale e I/O binario?
2. Perché l'I/O binario è generalmente più efficiente dell'I/O testuale?
3. Come si può verificare se un'operazione di lettura binaria è stata completata con successo?
4. Quali problemi di portabilità possono presentare i file binari?
5. Come si può implementare un sistema di accesso casuale ai record utilizzando l'I/O binario?

## Esercizi Proposti

1. Scrivi un programma che crei un file binario contenente 100 numeri interi casuali, e poi legga e visualizzi solo i numeri pari.
2. Implementa una classe `Immagine` che rappresenti un'immagine bitmap semplice (array di pixel) e fornisca metodi per salvare e caricare l'immagine da un file binario.
3. Crea un programma che implementi un semplice editor di testo binario, permettendo di visualizzare e modificare il contenuto di un file a livello di byte.
4. Implementa un sistema di gestione di un inventario che utilizzi l'I/O binario per salvare e caricare i dati dei prodotti, con funzionalità di ricerca, aggiunta, modifica ed eliminazione.
5. Scrivi un programma che converta un file di testo in un file binario e viceversa, gestendo correttamente i caratteri di fine riga.

## Conclusione

L'I/O binario in C++ offre un modo efficiente e preciso per salvare e caricare dati strutturati, particolarmente utile per applicazioni che richiedono prestazioni elevate o che lavorano con dati complessi. Sebbene presenti alcune sfide in termini di portabilità e sicurezza, con le giuste precauzioni può essere uno strumento potente per lo sviluppo di applicazioni robuste.

Nella prossima lezione, esploreremo tecniche avanzate di gestione dei file, come la gestione degli errori, le operazioni asincrone e l'utilizzo di librerie di I/O di alto livello.