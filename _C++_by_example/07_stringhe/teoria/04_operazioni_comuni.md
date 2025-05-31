# Operazioni Comuni sulle Stringhe

In questa sezione, esamineremo le operazioni più comuni che si effettuano sulle stringhe in C++, confrontando l'implementazione con stringhe in stile C e con la classe `std::string`.

## 1. Calcolo della Lunghezza

### Con Stringhe C-style
```cpp
#include <cstring>

char str[] = "Hello World";
size_t lunghezza = strlen(str); // 11
```

### Con std::string
```cpp
#include <string>

std::string str = "Hello World";
size_t lunghezza = str.length(); // 11 (equivalente a str.size())
```

## 2. Concatenazione

### Con Stringhe C-style
```cpp
#include <cstring>

char str1[50] = "Hello";
char str2[] = " World";

// Metodo 1: strcat
strcat(str1, str2); // str1 diventa "Hello World"

// Metodo 2: strncat (più sicuro)
char str3[50] = "Hello";
strncat(str3, str2, sizeof(str3) - strlen(str3) - 1);
```

### Con std::string
```cpp
#include <string>

std::string str1 = "Hello";
std::string str2 = " World";

// Metodo 1: operatore +
std::string risultato = str1 + str2;

// Metodo 2: operatore +=
str1 += str2; // str1 diventa "Hello World"

// Metodo 3: append
str1.append("!"); // str1 diventa "Hello World!"
```

## 3. Copia

### Con Stringhe C-style
```cpp
#include <cstring>

char origine[] = "Hello World";
char destinazione[20];

// Metodo 1: strcpy
strcpy(destinazione, origine);

// Metodo 2: strncpy (più sicuro)
strncpy(destinazione, origine, sizeof(destinazione) - 1);
destinazione[sizeof(destinazione) - 1] = '\0'; // Assicura il terminatore nullo
```

### Con std::string
```cpp
#include <string>

std::string origine = "Hello World";

// Metodo 1: operatore =
std::string destinazione = origine;

// Metodo 2: costruttore di copia
std::string destinazione2(origine);

// Metodo 3: assign
std::string destinazione3;
destinazione3.assign(origine);
```

## 4. Confronto

### Con Stringhe C-style
```cpp
#include <cstring>

char str1[] = "Hello";
char str2[] = "World";

// Confronto completo
int risultato = strcmp(str1, str2);
// risultato < 0 se str1 < str2
// risultato = 0 se str1 == str2
// risultato > 0 se str1 > str2

// Confronto dei primi n caratteri
int risultato_parziale = strncmp(str1, str2, 3);
```

### Con std::string
```cpp
#include <string>

std::string str1 = "Hello";
std::string str2 = "World";

// Metodo 1: operatori di confronto
bool uguale = (str1 == str2); // false
bool minore = (str1 < str2);  // true (confronto lessicografico)

// Metodo 2: compare
int risultato = str1.compare(str2);
// risultato < 0 se str1 < str2
// risultato = 0 se str1 == str2
// risultato > 0 se str1 > str2

// Confronto parziale
int risultato_parziale = str1.compare(0, 3, str2, 0, 3); // Confronta i primi 3 caratteri
```

## 5. Ricerca

### Con Stringhe C-style
```cpp
#include <cstring>

char str[] = "Hello World";

// Ricerca di un carattere
char* pos_char = strchr(str, 'o');
if (pos_char != nullptr) {
    size_t indice = pos_char - str; // 4
}

// Ricerca dell'ultima occorrenza di un carattere
char* pos_last_char = strrchr(str, 'o');

// Ricerca di una sottostringa
char* pos_substr = strstr(str, "World");
if (pos_substr != nullptr) {
    size_t indice = pos_substr - str; // 6
}
```

### Con std::string
```cpp
#include <string>

std::string str = "Hello World";

// Ricerca di un carattere
size_t pos_char = str.find('o');
if (pos_char != std::string::npos) {
    // Carattere trovato in posizione 4
}

// Ricerca dell'ultima occorrenza di un carattere
size_t pos_last_char = str.rfind('o');

// Ricerca di una sottostringa
size_t pos_substr = str.find("World");

// Ricerca di uno tra più caratteri
size_t pos_any = str.find_first_of("aeiou"); // Prima vocale
size_t pos_last_any = str.find_last_of("aeiou"); // Ultima vocale
```

## 6. Estrazione di Sottostringhe

### Con Stringhe C-style
```cpp
#include <cstring>

char str[] = "Hello World";
char substring[6];

// Copia i primi 5 caratteri
strncpy(substring, str, 5);
substring[5] = '\0'; // Aggiungi manualmente il terminatore

// Copia da una posizione specifica
char substring2[6];
strncpy(substring2, str + 6, 5); // Copia da "World"
substring2[5] = '\0';
```

### Con std::string
```cpp
#include <string>

std::string str = "Hello World";

// Estrazione di una sottostringa
std::string substring = str.substr(0, 5); // "Hello"

// Estrazione dalla posizione 6 fino alla fine
std::string substring2 = str.substr(6); // "World"
```

## 7. Modifica

### Con Stringhe C-style
```cpp
#include <cstring>

char str[50] = "Hello World";

// Sostituzione di un carattere
str[0] = 'h';

// Inserimento (richiede spostamento manuale)
void insert_at(char* str, size_t pos, const char* ins) {
    size_t len_str = strlen(str);
    size_t len_ins = strlen(ins);
    
    // Sposta i caratteri per fare spazio
    for (size_t i = len_str; i >= pos; i--) {
        str[i + len_ins] = str[i];
    }
    
    // Inserisci la nuova stringa
    for (size_t i = 0; i < len_ins; i++) {
        str[pos + i] = ins[i];
    }
}

// Esempio di utilizzo
insert_at(str, 5, " Dear"); // "Hello Dear World"
```

### Con std::string
```cpp
#include <string>

std::string str = "Hello World";

// Sostituzione di un carattere
str[0] = 'h';

// Sostituzione di una parte
str.replace(0, 5, "Ciao"); // "Ciao World"

// Inserimento
str.insert(5, " Dear"); // "Ciao Dear World"

// Cancellazione
str.erase(5, 5); // Rimuove " Dear", torna a "Ciao World"
```

## 8. Conversione tra Tipi di Stringa

### Da C-style a std::string
```cpp
char cstr[] = "Hello World";
std::string str(cstr); // Costruttore

// Oppure
std::string str2 = cstr;
```

### Da std::string a C-style
```cpp
std::string str = "Hello World";

// Metodo 1: c_str() (restituisce un puntatore const char*)
const char* cstr = str.c_str();

// Metodo 2: data() (simile a c_str(), ma in C++17 garantisce terminatore nullo)
const char* data = str.data();

// Metodo 3: copia in un buffer
char buffer[50];
strcpy(buffer, str.c_str());
```

## 9. Conversione tra Stringhe e Numeri

### Con Stringhe C-style
```cpp
#include <cstdlib>

// Da stringa a numero
char str_int[] = "42";
int num = atoi(str_int);

char str_double[] = "3.14159";
double dbl = atof(str_double);

// Da numero a stringa
char buffer[20];
sprintf(buffer, "%d", 42);

char buffer2[20];
sprintf(buffer2, "%.2f", 3.14159);
```

### Con std::string
```cpp
#include <string>

// Da stringa a numero (C++11)
std::string str_int = "42";
int num = std::stoi(str_int);

std::string str_double = "3.14159";
double dbl = std::stod(str_double);

// Da numero a stringa (C++11)
std::string str_from_int = std::to_string(42);
std::string str_from_double = std::to_string(3.14159);
```

## 10. Iterazione sui Caratteri

### Con Stringhe C-style
```cpp
char str[] = "Hello";

// Metodo 1: indice
for (size_t i = 0; i < strlen(str); i++) {
    char c = str[i];
    // Elabora c
}

// Metodo 2: puntatore (più efficiente)
for (char* p = str; *p != '\0'; p++) {
    char c = *p;
    // Elabora c
}
```

### Con std::string
```cpp
std::string str = "Hello";

// Metodo 1: indice
for (size_t i = 0; i < str.length(); i++) {
    char c = str[i];
    // Elabora c
}

// Metodo 2: iteratori
for (std::string::iterator it = str.begin(); it != str.end(); ++it) {
    char c = *it;
    // Elabora c
}

// Metodo 3: range-based for (C++11)
for (char c : str) {
    // Elabora c
}
```

## Considerazioni sulle Prestazioni

In generale, le operazioni con `std::string` tendono ad essere più sicure e più facili da usare, ma possono avere un leggero overhead rispetto alle stringhe C-style in alcuni scenari specifici. Tuttavia, con i moderni compilatori e le ottimizzazioni come Small String Optimization (SSO), la differenza di prestazioni è spesso trascurabile.

Per operazioni critiche in termini di prestazioni, è consigliabile:

1. **Evitare concatenazioni ripetute** con `+` o `+=` in cicli (usare `std::ostringstream` o `reserve()` preventivamente)
2. **Riutilizzare le stringhe** invece di crearne di nuove quando possibile
3. **Utilizzare le versioni appropriate** delle funzioni (ad esempio, `find()` con posizione di inizio per ricerche ripetute)
4. **Considerare `std::string_view`** (C++17) per riferimenti a stringhe senza copia

In conclusione, per la maggior parte delle applicazioni moderne, `std::string` offre il miglior compromesso tra sicurezza, facilità d'uso e prestazioni, mentre le stringhe C-style rimangono utili principalmente per l'interoperabilità con codice C o API di sistema.