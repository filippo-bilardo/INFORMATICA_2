# Tipi di Dati Fondamentali in C++

In questa guida, esploreremo i tipi di dati fondamentali disponibili in C++ e le loro caratteristiche principali.

## Panoramica dei Tipi di Dati

C++ offre diversi tipi di dati predefiniti che possono essere classificati nelle seguenti categorie:

### 1. Tipi Interi

I tipi interi memorizzano numeri interi (senza parte decimale):

| Tipo | Dimensione tipica | Range tipico |
|------|------------------|---------------|
| `char` | 1 byte | -128 a 127 o 0 a 255 |
| `short` | 2 byte | -32,768 a 32,767 |
| `int` | 4 byte | -2,147,483,648 a 2,147,483,647 |
| `long` | 4 byte (o 8) | -2,147,483,648 a 2,147,483,647 (o maggiore) |
| `long long` | 8 byte | -9,223,372,036,854,775,808 a 9,223,372,036,854,775,807 |

```cpp
int numero = 42;
long popolazione = 7800000000L; // La 'L' indica un letterale long
long long distanzaStelle = 9460730472580800LL; // La 'LL' indica un letterale long long
```

### 2. Tipi in Virgola Mobile

I tipi in virgola mobile memorizzano numeri con parte decimale:

| Tipo | Dimensione | Precisione |
|------|-----------|------------|
| `float` | 4 byte | ~7 cifre decimali |
| `double` | 8 byte | ~15 cifre decimali |
| `long double` | 12 o 16 byte | ~19 cifre decimali |

```cpp
float prezzo = 19.99f; // La 'f' indica un letterale float
double pi = 3.14159265359;
long double calcoloScientifico = 1.23456789012345678901234567890L; // La 'L' indica un letterale long double
```

### 3. Tipo Booleano

Il tipo booleano può avere solo due valori: `true` o `false`:

```cpp
bool isAttivo = true;
bool haCompletato = false;
```

### 4. Tipo Carattere

Il tipo `char` memorizza un singolo carattere:

```cpp
char lettera = 'A';
char simbolo = '+';
```

### 5. Tipo Void

Il tipo `void` indica l'assenza di un tipo e viene utilizzato principalmente per funzioni che non restituiscono valori.

```cpp
void funzioneSenzaRitorno() {
    // Codice che non restituisce valori
}
```

## Limiti dei Tipi di Dati

Per conoscere i limiti esatti dei tipi di dati sulla tua piattaforma, puoi utilizzare la libreria `<limits>`:

```cpp
#include <iostream>
#include <limits>

int main() {
    std::cout << "Valore minimo di int: " << std::numeric_limits<int>::min() << std::endl;
    std::cout << "Valore massimo di int: " << std::numeric_limits<int>::max() << std::endl;
    return 0;
}
```

## Dimensioni dei Tipi di Dati

Per conoscere la dimensione in byte di un tipo di dato, puoi utilizzare l'operatore `sizeof()`:

```cpp
#include <iostream>

int main() {
    std::cout << "Dimensione di int: " << sizeof(int) << " byte" << std::endl;
    std::cout << "Dimensione di double: " << sizeof(double) << " byte" << std::endl;
    return 0;
}
```

## Best Practices

1. **Scegli il Tipo Appropriato**: Utilizza il tipo più adatto alle tue esigenze, considerando il range di valori e la precisione necessaria.
2. **Evita Overflow**: Assicurati che i valori che memorizzi rientrino nei limiti del tipo di dato scelto.
3. **Precisione vs Efficienza**: I tipi più grandi offrono maggiore precisione ma consumano più memoria e possono essere più lenti da elaborare.
4. **Coerenza**: Mantieni coerenza nell'uso dei tipi all'interno del tuo codice.

## Domande di Autovalutazione

1. Quale tipo di dato useresti per memorizzare l'età di una persona?
2. Qual è la differenza principale tra `float` e `double`?
3. Cosa succede se assegni il valore 300 a una variabile di tipo `char`?
4. Come puoi determinare il valore massimo che può essere memorizzato in un `int` sulla tua piattaforma?

## Esercizi Proposti

1. Scrivi un programma che dichiari variabili di tutti i tipi fondamentali e ne stampi dimensione e limiti.
2. Crea un programma che mostri cosa succede quando si verifica un overflow in un tipo intero.
3. Implementa un calcolatore che mostri la differenza di precisione tra `float` e `double` in operazioni matematiche complesse.
4. Scrivi un programma che converta temperature da Celsius a Fahrenheit utilizzando diversi tipi di dati e confronta i risultati.