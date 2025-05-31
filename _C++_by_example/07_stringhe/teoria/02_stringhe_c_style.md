# Stringhe in Stile C (C-style Strings)

## Definizione e Caratteristiche

Le stringhe in stile C sono array di caratteri terminati da un carattere nullo ('\0'). Questo carattere speciale, chiamato "null terminator" o "terminatore nullo", indica la fine della stringa.

```cpp
char stringa[6] = "Hello"; // Occupa 6 byte: 5 per "Hello" + 1 per '\0'
```

È importante notare che:
- La dimensione dell'array deve essere almeno pari alla lunghezza della stringa + 1 (per il terminatore nullo)
- Il terminatore nullo è essenziale per il corretto funzionamento delle funzioni di manipolazione delle stringhe

## Dichiarazione e Inizializzazione

Esistono diversi modi per dichiarare e inizializzare una stringa in stile C:

```cpp
// Metodo 1: Inizializzazione con letterale stringa
char str1[6] = "Hello";

// Metodo 2: Inizializzazione carattere per carattere
char str2[6] = {'H', 'e', 'l', 'l', 'o', '\0'};

// Metodo 3: Dichiarazione con dimensione automatica
char str3[] = "Hello"; // Il compilatore calcola automaticamente la dimensione

// Metodo 4: Utilizzo di puntatori (allocazione statica)
char* str4 = "Hello"; // Sconsigliato in C++ moderno, preferire const char*

// Metodo 5: Utilizzo di puntatori (allocazione dinamica)
char* str5 = new char[6];
strcpy(str5, "Hello");
```

## Funzioni Principali per la Manipolazione

La libreria `<cstring>` (o `<string.h>` in C) fornisce numerose funzioni per manipolare le stringhe in stile C:

| Funzione | Descrizione | Esempio |
|----------|-------------|--------|
| `strlen(str)` | Restituisce la lunghezza della stringa (escluso '\0') | `size_t len = strlen(str);` |
| `strcpy(dest, src)` | Copia `src` in `dest` | `strcpy(dest, src);` |
| `strncpy(dest, src, n)` | Copia al massimo `n` caratteri da `src` a `dest` | `strncpy(dest, src, n);` |
| `strcat(dest, src)` | Concatena `src` alla fine di `dest` | `strcat(dest, src);` |
| `strncat(dest, src, n)` | Concatena al massimo `n` caratteri di `src` a `dest` | `strncat(dest, src, n);` |
| `strcmp(str1, str2)` | Confronta `str1` e `str2` (restituisce 0 se uguali) | `if (strcmp(str1, str2) == 0)` |
| `strncmp(str1, str2, n)` | Confronta i primi `n` caratteri | `if (strncmp(str1, str2, n) == 0)` |
| `strchr(str, ch)` | Trova la prima occorrenza di `ch` in `str` | `char* pos = strchr(str, 'a');` |
| `strstr(str, substr)` | Trova la prima occorrenza di `substr` in `str` | `char* pos = strstr(str, "abc");` |

## Problemi Comuni e Limitazioni

### 1. Buffer Overflow

Uno dei problemi più gravi con le stringhe in stile C è il rischio di buffer overflow:

```cpp
char nome[5]; // Può contenere solo 4 caratteri + '\0'
strcpy(nome, "Alessandro"); // ERRORE: buffer overflow!
```

Per evitare questo problema, è consigliabile utilizzare le versioni sicure delle funzioni:

```cpp
char nome[5];
strncpy(nome, "Alessandro", 4); // Copia solo 4 caratteri
nome[4] = '\0'; // Assicura il terminatore nullo
```

### 2. Gestione Manuale della Memoria

Con le stringhe dinamiche, è necessario gestire manualmente la memoria:

```cpp
char* str = new char[100];
strcpy(str, "Hello");

// Operazioni sulla stringa...

delete[] str; // Non dimenticare di liberare la memoria!
```

### 3. Dimensione Fissa

Le stringhe in stile C hanno dimensione fissa dopo la dichiarazione, rendendo difficile gestire stringhe di lunghezza variabile.

## Best Practices

1. **Verifica sempre la dimensione del buffer** prima di operazioni di copia o concatenazione
2. **Utilizza le versioni sicure delle funzioni** (`strncpy`, `strncat`, ecc.)
3. **Assicurati sempre che la stringa termini con '\0'**
4. **Libera la memoria** quando usi allocazione dinamica
5. **Considera l'uso di `std::string`** per nuovo codice C++

## Esempio Completo

```cpp
#include <iostream>
#include <cstring>

int main() {
    // Dichiarazione e inizializzazione
    char nome[50];
    char cognome[50] = "Rossi";
    
    // Copia sicura
    strncpy(nome, "Mario", sizeof(nome) - 1);
    nome[sizeof(nome) - 1] = '\0'; // Assicura il terminatore nullo
    
    // Calcolo lunghezza
    size_t lunghezza_nome = strlen(nome);
    size_t lunghezza_cognome = strlen(cognome);
    
    std::cout << "Nome: " << nome << " (" << lunghezza_nome << " caratteri)" << std::endl;
    std::cout << "Cognome: " << cognome << " (" << lunghezza_cognome << " caratteri)" << std::endl;
    
    // Creazione nome completo
    char nome_completo[100];
    strcpy(nome_completo, nome);
    strcat(nome_completo, " ");
    strcat(nome_completo, cognome);
    
    std::cout << "Nome completo: " << nome_completo << std::endl;
    
    // Confronto stringhe
    if (strcmp(nome, "Mario") == 0) {
        std::cout << "Il nome è Mario" << std::endl;
    }
    
    return 0;
}
```

Nonostante le limitazioni, le stringhe in stile C sono ancora ampiamente utilizzate, specialmente quando si lavora con codice C legacy o quando è necessaria la massima efficienza. Tuttavia, per la maggior parte delle applicazioni C++ moderne, la classe `std::string` offre un'alternativa più sicura e flessibile.