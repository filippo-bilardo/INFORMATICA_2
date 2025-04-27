# Puntatori e Array

In questa guida, esploreremo la stretta relazione tra puntatori e array in C++, un concetto fondamentale per comprendere appieno entrambi gli strumenti.

## La Relazione Fondamentale

In C++, esiste una relazione intrinseca tra array e puntatori. Il nome di un array, quando utilizzato nella maggior parte dei contesti, decade (o "decade") in un puntatore al suo primo elemento.

```cpp
#include <iostream>

int main() {
    int numeri[5] = {10, 20, 30, 40, 50};
    int* p = numeri;  // Equivalente a int* p = &numeri[0];
    
    std::cout << "numeri: " << numeri << std::endl;
    std::cout << "&numeri[0]: " << &numeri[0] << std::endl;
    std::cout << "p: " << p << std::endl;
    
    // Tutti e tre stampano lo stesso indirizzo
    
    return 0;
}
```

Output:
```
numeri: 0x7ffee13b9a30
&numeri[0]: 0x7ffee13b9a30
p: 0x7ffee13b9a30
```

## Accesso agli Elementi dell'Array tramite Puntatori

Gli elementi di un array possono essere accessibili sia utilizzando la notazione con indice (`array[i]`) sia utilizzando l'aritmetica dei puntatori (`*(array + i)`).

```cpp
#include <iostream>

int main() {
    int numeri[5] = {10, 20, 30, 40, 50};
    int* p = numeri;
    
    // Accesso tramite notazione con indice
    for (int i = 0; i < 5; i++) {
        std::cout << "numeri[" << i << "] = " << numeri[i] << std::endl;
    }
    
    std::cout << "\n";
    
    // Accesso tramite aritmetica dei puntatori
    for (int i = 0; i < 5; i++) {
        std::cout << "*(p + " << i << ") = " << *(p + i) << std::endl;
    }
    
    std::cout << "\n";
    
    // Accesso tramite incremento del puntatore
    p = numeri;  // Riporta p all'inizio dell'array
    for (int i = 0; i < 5; i++) {
        std::cout << "*p = " << *p << std::endl;
        p++;
    }
    
    return 0;
}
```

Output:
```
numeri[0] = 10
numeri[1] = 20
numeri[2] = 30
numeri[3] = 40
numeri[4] = 50

*(p + 0) = 10
*(p + 1) = 20
*(p + 2) = 30
*(p + 3) = 40
*(p + 4) = 50

*p = 10
*p = 20
*p = 30
*p = 40
*p = 50
```

## Equivalenza tra Notazione con Indice e Aritmetica dei Puntatori

In C++, le espressioni `array[i]` e `*(array + i)` sono equivalenti. Questo perché l'operatore `[]` è definito in termini di aritmetica dei puntatori.

```cpp
#include <iostream>

int main() {
    int numeri[5] = {10, 20, 30, 40, 50};
    
    // Le seguenti espressioni sono equivalenti
    std::cout << "numeri[2] = " << numeri[2] << std::endl;
    std::cout << "*(numeri + 2) = " << *(numeri + 2) << std::endl;
    
    // Anche queste sono equivalenti
    std::cout << "2[numeri] = " << 2[numeri] << std::endl;  // Sintassi strana ma valida
    std::cout << "*(2 + numeri) = " << *(2 + numeri) << std::endl;
    
    return 0;
}
```

Output:
```
numeri[2] = 30
*(numeri + 2) = 30
2[numeri] = 30
*(2 + numeri) = 30
```

## Differenze tra Array e Puntatori

Nonostante la stretta relazione, ci sono importanti differenze tra array e puntatori:

### 1. Dimensione

L'operatore `sizeof` restituisce dimensioni diverse quando applicato a un array o a un puntatore:

```cpp
#include <iostream>

int main() {
    int numeri[5] = {10, 20, 30, 40, 50};
    int* p = numeri;
    
    std::cout << "sizeof(numeri) = " << sizeof(numeri) << " byte" << std::endl;
    std::cout << "sizeof(p) = " << sizeof(p) << " byte" << std::endl;
    
    return 0;
}
```

Output su un sistema a 64 bit:
```
sizeof(numeri) = 20 byte  // 5 interi * 4 byte ciascuno
sizeof(p) = 8 byte        // Dimensione di un puntatore a 64 bit
```

### 2. Assegnazione

Non è possibile assegnare un array a un altro array, ma è possibile assegnare un puntatore a un altro puntatore:

```cpp
#include <iostream>

int main() {
    int array1[5] = {1, 2, 3, 4, 5};
    int array2[5] = {6, 7, 8, 9, 10};
    int* p1 = array1;
    int* p2 = array2;
    
    // array1 = array2;  // Errore: non è possibile assegnare un array a un altro
    
    p1 = p2;  // Valido: ora p1 punta a array2
    
    std::cout << "*p1 = " << *p1 << std::endl;  // Stampa 6 (primo elemento di array2)
    
    return 0;
}
```

Output:
```
*p1 = 6
```

### 3. Indirizzo dell'Array

L'indirizzo di un array è l'indirizzo del suo primo elemento, ma l'indirizzo di un puntatore è l'indirizzo della variabile puntatore stessa:

```cpp
#include <iostream>

int main() {
    int numeri[5] = {10, 20, 30, 40, 50};
    int* p = numeri;
    
    std::cout << "numeri = " << numeri << std::endl;
    std::cout << "&numeri = " << &numeri << std::endl;
    std::cout << "p = " << p << std::endl;
    std::cout << "&p = " << &p << std::endl;
    
    return 0;
}
```

Output (gli indirizzi esatti possono variare):
```
numeri = 0x7ffee13b9a30
&numeri = 0x7ffee13b9a30  // Stesso indirizzo di numeri
p = 0x7ffee13b9a30        // Stesso indirizzo di numeri
&p = 0x7ffee13b9a28        // Indirizzo della variabile puntatore p
```

## Array Multidimensionali e Puntatori

La relazione tra array e puntatori si estende anche agli array multidimensionali, ma diventa più complessa.

### Array Bidimensionali

```cpp
#include <iostream>

int main() {
    int matrice[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };
    
    // matrice decade in un puntatore a un array di 4 interi
    int (*p)[4] = matrice;
    
    // Accesso agli elementi tramite puntatore
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            std::cout << p[i][j] << " ";
        }
        std::cout << std::endl;
    }
    
    return 0;
}
```

Output:
```
1 2 3 4
5 6 7 8
9 10 11 12
```

### Puntatori a Puntatori

Un array bidimensionale non è esattamente la stessa cosa di un puntatore a puntatore. Tuttavia, è possibile creare una struttura simile utilizzando puntatori a puntatori e allocazione dinamica:

```cpp
#include <iostream>

int main() {
    int righe = 3;
    int colonne = 4;
    
    // Allocazione di un array di puntatori
    int** matrice = new int*[righe];
    
    // Allocazione di ogni riga
    for (int i = 0; i < righe; i++) {
        matrice[i] = new int[colonne];
    }
    
    // Inizializzazione della matrice
    int valore = 1;
    for (int i = 0; i < righe; i++) {
        for (int j = 0; j < colonne; j++) {
            matrice[i][j] = valore++;
        }
    }
    
    // Accesso agli elementi
    for (int i = 0; i < righe; i++) {
        for (int j = 0; j < colonne; j++) {
            std::cout << matrice[i][j] << " ";
        }
        std::cout << std::endl;
    }
    
    // Deallocazione della memoria
    for (int i = 0; i < righe; i++) {
        delete[] matrice[i];
    }
    delete[] matrice;
    
    return 0;
}
```

Output:
```
1 2 3 4
5 6 7 8
9 10 11 12
```

## Puntatori a Array

È possibile creare un puntatore a un intero array, non solo al suo primo elemento:

```cpp
#include <iostream>

int main() {
    int numeri[5] = {10, 20, 30, 40, 50};
    
    // Puntatore a un array di 5 interi
    int (*pArray)[5] = &numeri;
    
    // Accesso agli elementi tramite il puntatore all'array
    for (int i = 0; i < 5; i++) {
        std::cout << "(*pArray)[" << i << "] = " << (*pArray)[i] << std::endl;
    }
    
    return 0;
}
```

Output:
```
(*pArray)[0] = 10
(*pArray)[1] = 20
(*pArray)[2] = 30
(*pArray)[3] = 40
(*pArray)[4] = 50
```

## Array di Puntatori

È anche possibile creare un array di puntatori, utile quando si lavora con oggetti di dimensioni diverse o quando si implementano tabelle di dispatch di funzioni:

```cpp
#include <iostream>
#include <string>

int main() {
    // Array di stringhe (implementato come array di puntatori a char)
    const char* nomi[] = {"Mario", "Luigi", "Peach", "Bowser"};
    
    for (int i = 0; i < 4; i++) {
        std::cout << "nomi[" << i << "] = " << nomi[i] << std::endl;
    }
    
    // Array di puntatori a int
    int a = 10, b = 20, c = 30;
    int* puntatori[] = {&a, &b, &c};
    
    for (int i = 0; i < 3; i++) {
        std::cout << "*puntatori[" << i << "] = " << *puntatori[i] << std::endl;
    }
    
    return 0;
}
```

Output:
```
nomi[0] = Mario
nomi[1] = Luigi
nomi[2] = Peach
nomi[3] = Bowser
*puntatori[0] = 10
*puntatori[1] = 20
*puntatori[2] = 30
```

## Passaggio di Array alle Funzioni

Quando si passa un array a una funzione, in realtà si passa un puntatore al suo primo elemento. Questo è il motivo per cui le funzioni non conoscono la dimensione dell'array passato e spesso richiedono un parametro aggiuntivo per la dimensione.

```cpp
#include <iostream>

// La funzione riceve un puntatore, non una copia dell'array
void stampaArray(int* arr, int dimensione) {
    for (int i = 0; i < dimensione; i++) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
    
    // Modifica dell'array originale
    arr[0] = 100;
}

// Alternativa con notazione array
void stampaArray2(int arr[], int dimensione) {
    for (int i = 0; i < dimensione; i++) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
}

// Con array di dimensione fissa (C++11 e successivi)
template<std::size_t N>
void stampaArrayFisso(int (&arr)[N]) {
    for (int i = 0; i < N; i++) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
}

int main() {
    int numeri[5] = {10, 20, 30, 40, 50};
    
    stampaArray(numeri, 5);
    std::cout << "Dopo la chiamata a stampaArray: " << numeri[0] << std::endl;
    
    stampaArray2(numeri, 5);
    
    stampaArrayFisso(numeri);  // Non richiede la dimensione
    
    return 0;
}
```

Output:
```
10 20 30 40 50
Dopo la chiamata a stampaArray: 100
100 20 30 40 50
100 20 30 40 50
```

## Allocazione Dinamica di Array

I puntatori sono essenziali per l'allocazione dinamica di array, che permette di creare array la cui dimensione è determinata durante l'esecuzione del programma.

```cpp
#include <iostream>

int main() {
    int dimensione;
    std::cout << "Inserisci la dimensione dell'array: ";
    std::cin >> dimensione;
    
    // Allocazione dinamica di un array
    int* array = new int[dimensione];
    
    // Inizializzazione dell'array
    for (int i = 0; i < dimensione; i++) {
        array[i] = i * 10;
    }
    
    // Stampa dell'array
    for (int i = 0; i < dimensione; i++) {
        std::cout << array[i] << " ";
    }
    std::cout << std::endl;
    
    // Deallocazione della memoria
    delete[] array;
    
    return 0;
}
```

Output (con dimensione = 5):
```
Inserisci la dimensione dell'array: 5
0 10 20 30 40
```

## Puntatori Costanti e Array

Quando si lavora con array e puntatori, è possibile utilizzare la parola chiave `const` in diversi modi:

```cpp
#include <iostream>

int main() {
    int numeri[5] = {10, 20, 30, 40, 50};
    
    // Puntatore costante a int (il puntatore non può essere modificato)
    int* const pFisso = numeri;
    *pFisso = 100;  // OK: il valore puntato può essere modificato
    // pFisso++;    // Errore: il puntatore non può essere modificato
    
    // Puntatore a int costante (il valore puntato non può essere modificato)
    const int* pValoreConst = numeri;
    // *pValoreConst = 200;  // Errore: il valore puntato non può essere modificato
    pValoreConst++;         // OK: il puntatore può essere modificato
    
    // Puntatore costante a int costante (né il puntatore né il valore puntato possono essere modificati)
    const int* const pTuttoConst = numeri;
    // *pTuttoConst = 300;  // Errore: il valore puntato non può essere modificato
    // pTuttoConst++;       // Errore: il puntatore non può essere modificato
    
    return 0;
}
```

## Conclusione

La relazione tra puntatori e array in C++ è fondamentale per comprendere come funziona il linguaggio a un livello più profondo. Sebbene gli array e i puntatori siano strettamente correlati, hanno differenze importanti che devono essere comprese per utilizzarli correttamente.

L'uso combinato di array e puntatori permette di implementare strutture dati complesse, gestire la memoria in modo dinamico e ottimizzare le prestazioni del codice.

Nel prossimo capitolo, esploreremo come utilizzare i puntatori con le funzioni per passare parametri per riferimento e implementare funzioni che modificano i loro argomenti.