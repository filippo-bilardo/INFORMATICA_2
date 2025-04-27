# La Classe `std::string`

## Introduzione a `std::string`

La classe `std::string`, definita nell'header `<string>`, è parte della Standard Template Library (STL) di C++. Rappresenta una sequenza di caratteri con gestione automatica della memoria e offre numerose funzionalità per la manipolazione delle stringhe.

```cpp
#include <string>

std::string nome = "Mario";
```

Rispetto alle stringhe in stile C, `std::string` offre numerosi vantaggi:
- Gestione automatica della memoria
- Dimensione dinamica (si espande automaticamente quando necessario)
- Interfaccia orientata agli oggetti
- Maggiore sicurezza contro buffer overflow
- Ampia gamma di metodi per la manipolazione

## Dichiarazione e Inizializzazione

Esistono diversi modi per dichiarare e inizializzare un oggetto `std::string`:

```cpp
// Metodo 1: Inizializzazione con letterale stringa
std::string str1 = "Hello";

// Metodo 2: Costruttore con letterale stringa
std::string str2("Hello");

// Metodo 3: Inizializzazione con caratteri ripetuti
std::string str3(5, 'A'); // "AAAAA"

// Metodo 4: Inizializzazione da stringa C-style
char cstr[] = "Hello";
std::string str4(cstr);

// Metodo 5: Inizializzazione da parte di un'altra stringa
std::string str5 = str1.substr(0, 3); // "Hel"

// Metodo 6: Inizializzazione con lista di inizializzazione (C++11)
std::string str6{'H', 'e', 'l', 'l', 'o'};
```

## Operazioni Principali

### Accesso agli Elementi

```cpp
std::string str = "Hello";

// Accesso tramite operatore []
char primo = str[0]; // 'H'

// Accesso tramite metodo at() (con controllo dei limiti)
char secondo = str.at(1); // 'e'

// Accesso al primo e all'ultimo carattere
char primo_char = str.front(); // 'H' (C++11)
char ultimo_char = str.back();  // 'o' (C++11)
```

### Modifica della Stringa

```cpp
std::string str = "Hello";

// Concatenazione con operatore +=
str += " World"; // "Hello World"

// Concatenazione con metodo append()
str.append("!");  // "Hello World!"

// Inserimento in una posizione specifica
str.insert(5, " Dear"); // "Hello Dear World!"

// Sostituzione di una parte della stringa
str.replace(6, 4, "Sweet"); // "Hello Sweet World!"

// Cancellazione di una parte della stringa
str.erase(6, 6); // "Hello World!"

// Svuotamento della stringa
str.clear(); // ""
```

### Informazioni sulla Stringa

```cpp
std::string str = "Hello World";

// Lunghezza della stringa
size_t len = str.length(); // 11 (equivalente a str.size())

// Capacità attuale (spazio allocato)
size_t cap = str.capacity();

// Verifica se la stringa è vuota
bool empty = str.empty(); // false

// Dimensione massima teorica
size_t max_size = str.max_size();
```

### Ricerca e Sottostringhe

```cpp
std::string str = "Hello World";

// Ricerca di una sottostringa
size_t pos = str.find("World"); // 6
if (pos != std::string::npos) {
    // Sottostringa trovata
}

// Ricerca a partire dalla fine
pos = str.rfind("o"); // 7 (l'ultima 'o')

// Estrazione di una sottostringa
std::string sub = str.substr(0, 5); // "Hello"

// Ricerca di uno tra più caratteri
pos = str.find_first_of("aeiou"); // 1 (posizione della 'e')
pos = str.find_last_of("aeiou");  // 7 (posizione dell'ultima 'o')
```

### Confronto tra Stringhe

```cpp
std::string str1 = "Hello";
std::string str2 = "World";

// Confronto con operatori
bool equal = (str1 == str2); // false
bool less = (str1 < str2);   // true (confronto lessicografico)

// Confronto con metodo compare()
int result = str1.compare(str2);
// result < 0 se str1 < str2
// result = 0 se str1 == str2
// result > 0 se str1 > str2
```

### Conversione da e verso Altri Tipi

```cpp
// Da std::string a C-style string
std::string str = "Hello";
const char* cstr = str.c_str();

// Da std::string a numeri
std::string num_str = "42";
int num = std::stoi(num_str);       // C++11
double dbl = std::stod("3.14159"); // C++11

// Da numeri a std::string
std::string str_from_int = std::to_string(42);     // C++11
std::string str_from_dbl = std::to_string(3.14159); // C++11
```

## Gestione della Memoria

Una delle caratteristiche più importanti di `std::string` è la gestione automatica della memoria:

```cpp
std::string str = "Hello";

// La stringa si espande automaticamente
str += " World! This is a very long string that would require manual memory management with C-style strings.";

// Non è necessario preoccuparsi della memoria
// - Nessun rischio di buffer overflow
// - Nessuna necessità di allocare/deallocare memoria manualmente
// - La memoria viene liberata automaticamente quando str esce dallo scope
```

È possibile ottimizzare l'uso della memoria con i seguenti metodi:

```cpp
// Riservare spazio in anticipo (evita riallocazioni multiple)
str.reserve(100);

// Ridurre la capacità per adattarla alla dimensione attuale
str.shrink_to_fit(); // C++11
```

## Esempio Completo

```cpp
#include <iostream>
#include <string>

int main() {
    // Inizializzazione
    std::string nome = "Mario";
    std::string cognome = "Rossi";
    
    // Concatenazione per creare il nome completo
    std::string nome_completo = nome + " " + cognome;
    
    // Informazioni sulla stringa
    std::cout << "Nome completo: " << nome_completo << std::endl;
    std::cout << "Lunghezza: " << nome_completo.length() << " caratteri" << std::endl;
    
    // Modifica della stringa
    nome_completo.insert(0, "Sig. ");
    std::cout << "Con titolo: " << nome_completo << std::endl;
    
    // Ricerca
    size_t pos = nome_completo.find("Rossi");
    if (pos != std::string::npos) {
        std::cout << "Cognome trovato in posizione: " << pos << std::endl;
    }
    
    // Sostituzione
    nome_completo.replace(pos, cognome.length(), "Bianchi");
    std::cout << "Dopo sostituzione: " << nome_completo << std::endl;
    
    // Iterazione sui caratteri (C++11)
    std::cout << "Caratteri: ";
    for (char c : nome_completo) {
        std::cout << c << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

## Considerazioni sulle Prestazioni

Nonostante i numerosi vantaggi, `std::string` può avere un overhead di prestazioni rispetto alle stringhe C-style in alcuni scenari specifici. Tuttavia, nella maggior parte dei casi, i vantaggi in termini di sicurezza, flessibilità e facilità d'uso superano ampiamente questo svantaggio.

Per applicazioni con requisiti di prestazioni estremamente elevati, è possibile considerare:

- L'uso di `std::string_view` (C++17) per riferimenti a stringhe senza copia
- L'ottimizzazione con `reserve()` per evitare riallocazioni
- L'uso di Small String Optimization (SSO), implementata in molte librerie standard

In generale, `std::string` dovrebbe essere la scelta predefinita per la gestione delle stringhe in C++ moderno, a meno che non ci siano motivi specifici per utilizzare stringhe in stile C.