# Costanti e Letterali in C++

In questa guida, esploreremo le costanti e i letterali in C++, imparando come dichiararli e utilizzarli correttamente.

## Cos'è una Costante?

Una costante è un valore che non può essere modificato durante l'esecuzione del programma. In C++, esistono diversi modi per definire costanti.

## Tipi di Costanti

### 1. Costanti Letterali

I letterali sono valori fissi che appaiono direttamente nel codice sorgente. Possono essere di vari tipi:

#### a. Letterali Interi

```cpp
int numero = 42;        // Letterale intero decimale
int ottale = 052;       // Letterale intero ottale (inizia con 0)
int esadecimale = 0x2A; // Letterale intero esadecimale (inizia con 0x)
int binario = 0b101010; // Letterale intero binario (inizia con 0b, C++14)
```

È possibile specificare il tipo esatto di un letterale intero usando suffissi:

```cpp
long valore1 = 42L;          // Letterale long
unsigned int valore2 = 42U;   // Letterale unsigned
unsigned long valore3 = 42UL; // Letterale unsigned long
long long valore4 = 42LL;     // Letterale long long (C++11)
```

#### b. Letterali in Virgola Mobile

```cpp
double d1 = 3.14159;   // Letterale double
float f1 = 3.14159F;    // Letterale float (suffisso F o f)
long double ld1 = 3.14159L; // Letterale long double (suffisso L o l)
```

#### c. Letterali Carattere

```cpp
char c1 = 'A';          // Letterale carattere
char c2 = '\n';         // Carattere di escape (newline)
char c3 = '\t';         // Carattere di escape (tab)
char c4 = '\0';         // Carattere nullo
```

#### d. Letterali Stringa

```cpp
const char* s1 = "Hello";      // Stringa C-style
std::string s2 = "World";     // Stringa C++ (richiede #include <string>)
```

In C++11 e versioni successive, è possibile utilizzare i raw string literals per stringhe multilinea o con caratteri speciali:

```cpp
const char* s3 = R"(Questa è una stringa
su più righe con "virgolette")"; // Raw string literal
```

#### e. Letterali Booleani

```cpp
bool b1 = true;   // Letterale booleano vero
bool b2 = false;  // Letterale booleano falso
```

### 2. Costanti Simboliche

#### a. Utilizzo di `const`

Il modificatore `const` crea una variabile di sola lettura che non può essere modificata dopo l'inizializzazione:

```cpp
const int MAX_STUDENTI = 30;
const double PI = 3.14159;
```

Le costanti `const` devono essere inizializzate al momento della dichiarazione.

#### b. Utilizzo di `constexpr` (C++11)

Il modificatore `constexpr` indica che il valore può essere calcolato a tempo di compilazione:

```cpp
constexpr int QUADRATO_DI_CINQUE = 5 * 5;
constexpr double VELOCITA_LUCE = 299792458.0; // m/s
```

#### c. Utilizzo di `#define` (Preprocessore)

Un altro modo per definire costanti è attraverso le direttive del preprocessore:

```cpp
#define MAX_BUFFER_SIZE 1024
#define PI 3.14159
```

Tuttavia, questo approccio è generalmente sconsigliato in C++ moderno, poiché le costanti definite con `#define` non rispettano le regole di scope e tipo.

## Enumerazioni

Le enumerazioni sono un altro modo per definire costanti simboliche in C++:

```cpp
enum Colore { ROSSO, VERDE, BLU }; // ROSSO=0, VERDE=1, BLU=2

// È possibile specificare i valori
enum Giorno { LUNEDI = 1, MARTEDI, MERCOLEDI, GIOVEDI, VENERDI, SABATO, DOMENICA };

// esempio di utilizzo
Colore c = VERDE;
Giorno g = MARTEDI;
// Stampa il valore di c e g
std::cout << "Colore: " << c << ", Giorno: " << g << std::endl;
```

In C++11, è stata introdotta l'enumerazione con scope (`enum class`):

```cpp
enum class Stagione { PRIMAVERA, ESTATE, AUTUNNO, INVERNO };

// Utilizzo
Stagione s = Stagione::ESTATE;
```

## Best Practices

1. **Preferisci `const` e `constexpr` a `#define`**: Le costanti definite con `const` e `constexpr` rispettano le regole di scope e tipo, offrendo maggiore sicurezza.

2. **Usa nomi significativi**: Scegli nomi descrittivi per le tue costanti, preferibilmente in maiuscolo per distinguerle dalle variabili normali.

3. **Centralizza le costanti**: Considera di raggruppare le costanti correlate in un unico file header o namespace per facilitarne la manutenzione.

4. **Utilizza `enum class` per gruppi di costanti correlate**: Le enumerazioni con scope offrono maggiore sicurezza di tipo e prevengono collisioni di nomi.

5. **Evita la duplicazione**: Definisci ogni costante una sola volta e riutilizzala dove necessario.

## Domande di Autovalutazione

1. Qual è la differenza tra una costante definita con `const` e una definita con `#define`?
2. Quando è preferibile utilizzare `constexpr` invece di `const`?
3. Quali sono i vantaggi delle enumerazioni con scope (`enum class`) rispetto alle enumerazioni tradizionali?
4. Come si può definire una costante stringa multilinea in C++?
5. Perché è importante utilizzare costanti invece di valori letterali sparsi nel codice?

## Esercizi Proposti

1. Crea un programma che utilizzi costanti per rappresentare i giorni della settimana e stampi il nome del giorno corrispondente a un numero inserito dall'utente.
2. Implementa una calcolatrice geometrica che utilizzi costanti per π e altre formule matematiche comuni.
3. Scrivi un programma che utilizzi enumerazioni con scope per rappresentare i mesi dell'anno e calcoli il numero di giorni in ciascun mese.
4. Crea un programma che utilizzi costanti letterali di diversi tipi e mostri come vengono memorizzate in memoria.