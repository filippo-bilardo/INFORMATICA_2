# Manipolatori di Stream in C++

## Introduzione ai Manipolatori

I manipolatori di stream sono funzioni o oggetti speciali che modificano lo stato di uno stream di I/O, influenzando il modo in cui i dati vengono formattati durante l'input o l'output. Sono particolarmente utili per controllare la presentazione dei dati, come la precisione dei numeri decimali, l'allineamento del testo o il sistema numerico utilizzato.

La maggior parte dei manipolatori è definita negli header `<iostream>` e `<iomanip>`.

## Manipolatori Base

Alcuni manipolatori di base sono disponibili direttamente nell'header `<iostream>` e non richiedono parametri:

### Manipolatori per il Controllo del Buffer

```cpp
#include <iostream>

int main() {
    // endl: inserisce una nuova linea e svuota il buffer
    std::cout << "Prima riga" << std::endl;
    std::cout << "Seconda riga" << std::endl;
    
    // flush: svuota il buffer senza inserire una nuova linea
    std::cout << "Messaggio importante" << std::flush;
    
    // ends: inserisce un carattere null ('\0') e svuota il buffer
    std::cout << "Testo con terminatore" << std::ends;
    
    return 0;
}
```

### Manipolatori per il Sistema Numerico

```cpp
#include <iostream>

int main() {
    int numero = 42;
    
    std::cout << "Decimale: " << std::dec << numero << std::endl;  // Output: 42
    std::cout << "Esadecimale: " << std::hex << numero << std::endl;  // Output: 2a
    std::cout << "Ottale: " << std::oct << numero << std::endl;  // Output: 52
    
    return 0;
}
```

### Manipolatori per il Controllo della Visualizzazione

```cpp
#include <iostream>

int main() {
    bool valore = true;
    
    std::cout << "Default: " << valore << std::endl;  // Output: 1
    std::cout << "Booleano: " << std::boolalpha << valore << std::endl;  // Output: true
    std::cout << "Numerico: " << std::noboolalpha << valore << std::endl;  // Output: 1
    
    return 0;
}
```

## Manipolatori Parametrizzati

I manipolatori più avanzati richiedono parametri e sono definiti nell'header `<iomanip>`:

### Controllo della Precisione e Formato dei Numeri

```cpp
#include <iostream>
#include <iomanip>

int main() {
    double pi = 3.14159265358979;
    
    // setprecision: imposta il numero di cifre significative o decimali
    std::cout << "Precisione predefinita: " << pi << std::endl;
    std::cout << "Precisione 4: " << std::setprecision(4) << pi << std::endl;
    
    // fixed: notazione a virgola fissa (il setprecision controlla i decimali)
    std::cout << "Fixed con 2 decimali: " << std::fixed << std::setprecision(2) << pi << std::endl;
    
    // scientific: notazione scientifica
    std::cout << "Scientifica: " << std::scientific << pi << std::endl;
    
    // Ritorno alla notazione predefinita
    std::cout << "Default: " << std::defaultfloat << std::setprecision(6) << pi << std::endl;
    
    return 0;
}
```

### Controllo della Larghezza e Allineamento

```cpp
#include <iostream>
#include <iomanip>

int main() {
    // setw: imposta la larghezza del campo
    std::cout << "|" << std::setw(10) << "Testo" << "|" << std::endl;  // Output: |      Testo|
    
    // left, right, internal: controllo dell'allineamento
    std::cout << "|" << std::left << std::setw(10) << "Testo" << "|" << std::endl;  // Output: |Testo      |
    std::cout << "|" << std::right << std::setw(10) << "Testo" << "|" << std::endl;  // Output: |      Testo|
    
    // setfill: imposta il carattere di riempimento
    std::cout << "|" << std::setfill('*') << std::setw(10) << "Testo" << "|" << std::endl;  // Output: |******Testo|
    
    // internal: posiziona il segno a sinistra e il valore a destra
    std::cout << std::internal << std::setw(10) << -42 << std::endl;  // Output: -        42
    
    return 0;
}
```

### Controllo della Base Numerica e Prefissi

```cpp
#include <iostream>
#include <iomanip>

int main() {
    int numero = 42;
    
    // showbase: mostra il prefisso della base numerica (0x per hex, 0 per oct)
    std::cout << "Esadecimale senza prefisso: " << std::hex << numero << std::endl;
    std::cout << "Esadecimale con prefisso: " << std::showbase << numero << std::endl;
    
    // uppercase: converte le lettere esadecimali in maiuscolo
    std::cout << "Esadecimale minuscolo: " << std::nouppercase << std::hex << numero << std::endl;
    std::cout << "Esadecimale maiuscolo: " << std::uppercase << std::hex << numero << std::endl;
    
    return 0;
}
```

### Controllo della Visualizzazione dei Segni

```cpp
#include <iostream>
#include <iomanip>

int main() {
    int positivo = 42;
    int negativo = -42;
    
    // showpos: mostra il segno + per i numeri positivi
    std::cout << "Senza showpos: " << positivo << " " << negativo << std::endl;
    std::cout << "Con showpos: " << std::showpos << positivo << " " << negativo << std::endl;
    
    return 0;
}
```

## Creazione di Tabelle Formattate

I manipolatori sono particolarmente utili per creare output tabulari ben formattati:

```cpp
#include <iostream>
#include <iomanip>
#include <vector>
#include <string>

int main() {
    // Dati della tabella
    std::vector<std::string> nomi = {"Mario", "Luigi", "Peach", "Bowser"};
    std::vector<int> età = {35, 33, 28, 40};
    std::vector<double> stipendi = {2500.75, 2300.50, 3200.25, 4500.00};
    
    // Impostazioni di formattazione
    std::cout << std::left << std::setfill(' ');
    
    // Intestazione
    std::cout << std::setw(15) << "Nome"
              << std::setw(10) << "Età"
              << std::setw(15) << "Stipendio" << std::endl;
    
    // Linea separatrice
    std::cout << std::setfill('-') << std::setw(40) << "-" << std::endl;
    std::cout << std::setfill(' '); // Ripristina il riempimento
    
    // Dati
    for (size_t i = 0; i < nomi.size(); ++i) {
        std::cout << std::setw(15) << nomi[i]
                  << std::setw(10) << età[i]
                  << std::fixed << std::setprecision(2) << std::setw(15) << stipendi[i] << std::endl;
    }
    
    return 0;
}
```

Output:
```
Nome           Età      Stipendio      
----------------------------------------
Mario          35       2500.75        
Luigi          33       2300.50        
Peach          28       3200.25        
Bowser         40       4500.00        
```

## Manipolatori Personalizzati

È possibile creare manipolatori personalizzati per esigenze specifiche. Ci sono due tipi di manipolatori personalizzati:

### 1. Manipolatori senza Parametri

```cpp
#include <iostream>

// Manipolatore personalizzato senza parametri
std::ostream& linea(std::ostream& os) {
    return os << "\n--------------------------\n";
}

int main() {
    std::cout << "Prima sezione" << linea << "Seconda sezione" << std::endl;
    return 0;
}
```

### 2. Manipolatori con Parametri

```cpp
#include <iostream>
#include <iomanip>

// Classe per il manipolatore con parametri
class TabManip {
    int num_tabs;
public:
    TabManip(int n) : num_tabs(n) {}
    
    friend std::ostream& operator<<(std::ostream& os, const TabManip& manip) {
        for (int i = 0; i < manip.num_tabs; ++i) {
            os << "\t";
        }
        return os;
    }
};

// Funzione factory per creare il manipolatore
TabManip tab(int n) {
    return TabManip(n);
}

int main() {
    std::cout << "Livello 0" << tab(1) << "Livello 1" << tab(2) << "Livello 2" << std::endl;
    return 0;
}
```

## Stati Persistenti vs. Stati Temporanei

Alcuni manipolatori impostano stati persistenti dello stream, mentre altri hanno effetto solo sull'operazione successiva:

- **Stati persistenti**: `std::fixed`, `std::scientific`, `std::showpos`, ecc.
- **Stati temporanei**: `std::setw`

Esempio:

```cpp
#include <iostream>
#include <iomanip>

int main() {
    // setw è temporaneo, influisce solo sul prossimo elemento
    std::cout << std::setw(10) << 42 << 43 << std::endl;  // Solo 42 è formattato con larghezza 10
    
    // fixed è persistente, influisce su tutti gli elementi successivi
    std::cout << std::fixed << std::setprecision(2);
    std::cout << 3.14159 << " " << 2.71828 << std::endl;  // Entrambi hanno 2 decimali
    
    return 0;
}
```

## Domande di Autovalutazione

1. Qual è la differenza tra `std::endl` e `'\n'`?
2. Come si può formattare un numero in notazione scientifica con 3 cifre decimali?
3. Quale manipolatore si utilizza per mostrare il prefisso della base numerica (0x per esadecimale)?
4. Perché `std::setw` deve essere applicato prima di ogni elemento che si vuole formattare?
5. Come si può creare un manipolatore personalizzato che aggiunge un prefisso a ogni output?

## Esercizi Proposti

1. Scrivi un programma che visualizzi una tabella di conversione da gradi Celsius a Fahrenheit, formattando correttamente i numeri con 2 decimali e allineando le colonne.
2. Crea un manipolatore personalizzato che formatti un numero come valuta (ad esempio, "€ 1.234,56") e utilizzalo in un programma.
3. Implementa un programma che legga un file di dati CSV e lo visualizzi come una tabella ben formattata con colonne allineate.
4. Scrivi una funzione che generi un report finanziario con diverse sezioni, utilizzando manipolatori per formattare numeri, allineare testo e creare separatori tra le sezioni.
5. Crea un programma che visualizzi lo stesso numero in diversi formati (decimale, esadecimale, ottale, scientifico) con diverse impostazioni di formattazione.

## Conclusione

I manipolatori di stream sono strumenti potenti per controllare la formattazione dell'output in C++. Consentono di creare output leggibili e ben strutturati, essenziali per applicazioni che richiedono una presentazione chiara dei dati.

Nella prossima lezione, esploreremo i file stream, che permettono di leggere e scrivere dati su file utilizzando gli stessi concetti e operatori che abbiamo visto per gli stream standard.