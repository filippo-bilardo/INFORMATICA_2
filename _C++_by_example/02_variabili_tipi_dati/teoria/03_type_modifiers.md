# Modificatori di Tipo in C++

In questa guida, esploreremo i modificatori di tipo disponibili in C++ e come influenzano i tipi di dati fondamentali.

## Cos'è un Modificatore di Tipo?

I modificatori di tipo sono parole chiave che alterano le caratteristiche di un tipo di dato, come la dimensione in memoria o il range di valori che può contenere. In C++, i modificatori di tipo principali sono: `signed`, `unsigned`, `short`, `long`, e `const`.

## Modificatori di Segno

### 1. `signed`

Il modificatore `signed` indica che una variabile può contenere sia valori positivi che negativi. È il comportamento predefinito per i tipi interi, quindi spesso viene omesso.

```cpp
signed int numero = -42;  // Può contenere valori negativi
int altro_numero = -100;   // Equivalente a 'signed int'
```

### 2. `unsigned`

Il modificatore `unsigned` indica che una variabile può contenere solo valori non negativi (zero o positivi). Questo raddoppia il range positivo disponibile.

```cpp
unsigned int contatore = 100;  // Può contenere solo valori >= 0
```

Confrontando i range:

| Tipo | Range tipico |
|------|---------------|
| `signed int` | -2,147,483,648 a 2,147,483,647 |
| `unsigned int` | 0 a 4,294,967,295 |

## Modificatori di Dimensione

### 1. `short`

Il modificatore `short` riduce la dimensione di un tipo intero, tipicamente a 2 byte. La dimensione effettiva dipende dalla piattaforma. 

```cpp
short int piccolo_numero = 1000;  // Occupa meno memoria di un int standard
short altro = 2000;               // 'int' può essere omesso
```

### 2. `long`

Il modificatore `long` aumenta la dimensione di un tipo intero o in virgola mobile.

```cpp
long int grande_numero = 2000000000L;  // La 'L' indica un letterale long
long double precisione_elevata = 3.14159265359L;  // Maggiore precisione di un double
```

### 3. `long long` (C++11)

Il modificatore `long long` fornisce un tipo intero ancora più grande, tipicamente 8 byte.

```cpp
long long int numero_enorme = 9223372036854775807LL;  // La 'LL' indica un letterale long long
```

## Combinazione di Modificatori

I modificatori di segno e dimensione possono essere combinati:

```cpp
unsigned long int valore = 4000000000UL;  // La 'UL' indica un letterale unsigned long
short unsigned int flag = 65000U;         // Unsigned short int
```

## Il Modificatore `const`

Il modificatore `const` indica che il valore di una variabile non può essere modificato dopo l'inizializzazione.

```cpp
const int GIORNI_SETTIMANA = 7;  // Non può essere modificato
const double PI = 3.14159;       // Costante matematica
```

Se si tenta di modificare una variabile `const`, si otterrà un errore di compilazione:

```cpp
const int MAX = 100;
MAX = 200;  // Errore: non è possibile assegnare a una variabile const
```

## Dimensioni e Range dei Tipi Modificati

Ecco una tabella che mostra le dimensioni e i range tipici dei tipi modificati:

| Tipo | Dimensione tipica | Range tipico |
|------|------------------|---------------|
| `short int` | 2 byte | -32,768 a 32,767 |
| `unsigned short int` | 2 byte | 0 a 65,535 |
| `int` | 4 byte | -2,147,483,648 a 2,147,483,647 |
| `unsigned int` | 4 byte | 0 a 4,294,967,295 |
| `long int` | 4 o 8 byte | -2,147,483,648 a 2,147,483,647 (o maggiore) |
| `unsigned long int` | 4 o 8 byte | 0 a 4,294,967,295 (o maggiore) |
| `long long int` | 8 byte | -9,223,372,036,854,775,808 a 9,223,372,036,854,775,807 |
| `unsigned long long int` | 8 byte | 0 a 18,446,744,073,709,551,615 |

## Verificare Dimensioni e Limiti

Per verificare le dimensioni e i limiti esatti sulla tua piattaforma:

```cpp
#include <iostream>
#include <limits>

int main() {
    std::cout << "Dimensione di short: " << sizeof(short) << " byte" << std::endl;
    std::cout << "Valore minimo di short: " << std::numeric_limits<short>::min() << std::endl;
    std::cout << "Valore massimo di short: " << std::numeric_limits<short>::max() << std::endl;
    
    std::cout << "Dimensione di unsigned int: " << sizeof(unsigned int) << " byte" << std::endl;
    std::cout << "Valore massimo di unsigned int: " << std::numeric_limits<unsigned int>::max() << std::endl;
    
    return 0;
}
```

## Best Practices

1. **Scegli il Tipo Appropriato**: Usa il tipo più piccolo che può contenere con sicurezza tutti i valori possibili per risparmiare memoria.

2. **Usa `unsigned` con Cautela**: Utilizza `unsigned` solo quando sei sicuro che la variabile non conterrà mai valori negativi. Le operazioni aritmetiche con tipi `unsigned` possono portare a risultati inaspettati quando coinvolgono valori negativi.

3. **Usa `const` per Valori Immutabili**: Dichiara come `const` tutte le variabili che non devono cambiare valore dopo l'inizializzazione.

4. **Considera la Portabilità**: Ricorda che le dimensioni dei tipi possono variare tra diverse piattaforme e compilatori. Se hai bisogno di dimensioni specifiche, considera l'uso dei tipi a larghezza fissa da `<cstdint>` (C++11).

## Domande di Autovalutazione

1. Qual è la differenza tra `signed` e `unsigned`?
2. Quando è appropriato utilizzare `short` invece di `int`?
3. Cosa succede se si assegna un valore negativo a una variabile `unsigned`?
4. Perché è utile il modificatore `const`?
5. Come si può determinare il range esatto di un tipo di dato sulla propria piattaforma?

## Esercizi Proposti

1. Scrivi un programma che mostri le dimensioni e i range di tutti i tipi interi modificati disponibili sulla tua piattaforma.
2. Crea un programma che dimostri cosa succede quando si verifica un overflow con tipi `signed` e `unsigned`.
3. Implementa un programma che utilizzi variabili `const` per rappresentare costanti fisiche o matematiche e le utilizzi in calcoli.
4. Scrivi un programma che confronti le prestazioni di calcoli eseguiti con diversi tipi di dati modificati.