# Dichiarazione e Inizializzazione degli Array

In questa guida, esploreremo come dichiarare e inizializzare gli array in C++, un passo fondamentale per utilizzare efficacemente questa struttura dati.

## Dichiarazione di un Array

La sintassi di base per dichiarare un array in C++ è la seguente:

```cpp
tipo_dato nome_array[dimensione];
```

Dove:
- `tipo_dato` è il tipo di dati che l'array conterrà (int, double, char, ecc.)
- `nome_array` è l'identificatore dell'array
- `dimensione` è il numero di elementi che l'array può contenere

Esempi:

```cpp
int numeri[5];         // Array di 5 interi
double prezzi[100];    // Array di 100 numeri in virgola mobile
char lettere[26];      // Array di 26 caratteri
```

## Inizializzazione degli Array

Esistono diversi modi per inizializzare un array in C++:

### 1. Inizializzazione al momento della dichiarazione

```cpp
int numeri[5] = {10, 20, 30, 40, 50};
```

### 2. Inizializzazione parziale

Se si forniscono meno valori rispetto alla dimensione dell'array, gli elementi rimanenti vengono inizializzati a zero:

```cpp
int numeri[5] = {10, 20, 30}; // Equivalente a {10, 20, 30, 0, 0}
```

### 3. Inizializzazione con dimensione implicita

Se si inizializza un array con una lista di valori, è possibile omettere la dimensione, che verrà determinata automaticamente dal numero di valori forniti:

```cpp
int numeri[] = {10, 20, 30, 40, 50}; // Dimensione 5
```

### 4. Inizializzazione a zero

Per inizializzare tutti gli elementi di un array a zero:

```cpp
int numeri[5] = {}; // Tutti gli elementi sono inizializzati a 0
```

oppure

```cpp
int numeri[5] = {0}; // Tutti gli elementi sono inizializzati a 0
```

### 5. Inizializzazione con valori specifici

Per inizializzare tutti gli elementi con lo stesso valore (diverso da zero), è necessario specificare ogni valore o utilizzare un ciclo:

```cpp
int numeri[5] = {42, 42, 42, 42, 42}; // Tutti gli elementi sono 42
```

oppure

```cpp
int numeri[5];
for (int i = 0; i < 5; i++) {
    numeri[i] = 42;
}
```

## Inizializzazione di Array di Diversi Tipi di Dati

### Array di caratteri (stringhe C-style)

```cpp
char nome[10] = {'M', 'a', 'r', 'i', 'o', '\0'}; // Inizializzazione esplicita
char nome[10] = "Mario"; // Inizializzazione con stringa letterale
```

Nota: Quando si inizializza un array di caratteri con una stringa letterale, il carattere null terminatore '\0' viene aggiunto automaticamente.

### Array di tipi definiti dall'utente

```cpp
struct Punto {
    int x;
    int y;
};

Punto punti[3] = {{1, 2}, {3, 4}, {5, 6}};
```

## Dimensione degli Array

La dimensione di un array deve essere una costante nota al momento della compilazione per gli array statici:

```cpp
const int DIMENSIONE = 5;
int numeri[DIMENSIONE];
```

È anche possibile utilizzare un'espressione costante:

```cpp
const int RIGHE = 3;
const int COLONNE = 4;
int matrice[RIGHE * COLONNE];
```

## Best Practices

1. **Evitare Overflow**: Assicurarsi che la dimensione dell'array sia sufficiente per i dati che si intende memorizzare.
2. **Inizializzazione Esplicita**: Inizializzare sempre gli array per evitare valori indeterminati.
3. **Dimensione Simbolica**: Utilizzare costanti simboliche per le dimensioni degli array per migliorare la leggibilità e la manutenibilità.
4. **Considerare Alternative Moderne**: Per casi d'uso più complessi, considerare l'utilizzo di `std::vector` o `std::array`.

## Conclusione

La corretta dichiarazione e inizializzazione degli array è fondamentale per evitare errori comuni e utilizzare efficacemente questa struttura dati. Nelle prossime guide, esploreremo come accedere agli elementi di un array e come eseguire operazioni comuni su di essi.