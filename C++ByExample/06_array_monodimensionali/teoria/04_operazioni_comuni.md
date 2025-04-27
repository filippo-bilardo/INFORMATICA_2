# Operazioni Comuni sugli Array

In questa guida, esploreremo le operazioni più comuni che si possono eseguire sugli array in C++, fornendo esempi pratici e tecniche efficaci.

## 1. Ricerca di Elementi

### Ricerca Lineare

La ricerca lineare è l'approccio più semplice per trovare un elemento in un array non ordinato:

```cpp
#include <iostream>

int ricercaLineare(int arr[], int dimensione, int valore) {
    for (int i = 0; i < dimensione; i++) {
        if (arr[i] == valore) {
            return i; // Restituisce l'indice dell'elemento trovato
        }
    }
    return -1; // Restituisce -1 se l'elemento non è stato trovato
}

int main() {
    int numeri[5] = {10, 45, 23, 7, 19};
    int valoreDaCercare = 23;
    
    int indice = ricercaLineare(numeri, 5, valoreDaCercare);
    
    if (indice != -1) {
        std::cout << "Elemento " << valoreDaCercare << " trovato all'indice " << indice << std::endl;
    } else {
        std::cout << "Elemento " << valoreDaCercare << " non trovato" << std::endl;
    }
    
    return 0;
}
```

### Ricerca Binaria (per array ordinati)

La ricerca binaria è molto più efficiente per array ordinati:

```cpp
#include <iostream>

int ricercaBinaria(int arr[], int sinistra, int destra, int valore) {
    while (sinistra <= destra) {
        int medio = sinistra + (destra - sinistra) / 2;
        
        // Se l'elemento è presente all'indice medio
        if (arr[medio] == valore) {
            return medio;
        }
        
        // Se l'elemento è maggiore, ignora la metà sinistra
        if (arr[medio] < valore) {
            sinistra = medio + 1;
        }
        // Se l'elemento è minore, ignora la metà destra
        else {
            destra = medio - 1;
        }
    }
    
    // Elemento non presente nell'array
    return -1;
}

int main() {
    int numeri[5] = {7, 10, 19, 23, 45}; // Array ordinato
    int valoreDaCercare = 19;
    
    int indice = ricercaBinaria(numeri, 0, 4, valoreDaCercare);
    
    if (indice != -1) {
        std::cout << "Elemento " << valoreDaCercare << " trovato all'indice " << indice << std::endl;
    } else {
        std::cout << "Elemento " << valoreDaCercare << " non trovato" << std::endl;
    }
    
    return 0;
}
```

## 2. Ordinamento degli Array

### Bubble Sort

Un algoritmo di ordinamento semplice ma non molto efficiente per grandi array:

```cpp
#include <iostream>

void bubbleSort(int arr[], int dimensione) {
    for (int i = 0; i < dimensione - 1; i++) {
        for (int j = 0; j < dimensione - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Scambia arr[j] e arr[j+1]
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int numeri[5] = {45, 10, 23, 7, 19};
    
    std::cout << "Array prima dell'ordinamento:" << std::endl;
    for (int i = 0; i < 5; i++) {
        std::cout << numeri[i] << " ";
    }
    
    bubbleSort(numeri, 5);
    
    std::cout << "\nArray dopo l'ordinamento:" << std::endl;
    for (int i = 0; i < 5; i++) {
        std::cout << numeri[i] << " ";
    }
    
    return 0;
}
```

### Utilizzo di `std::sort` (approccio moderno)

```cpp
#include <iostream>
#include <algorithm> // Per std::sort

int main() {
    int numeri[5] = {45, 10, 23, 7, 19};
    
    std::cout << "Array prima dell'ordinamento:" << std::endl;
    for (int i = 0; i < 5; i++) {
        std::cout << numeri[i] << " ";
    }
    
    std::sort(numeri, numeri + 5);
    
    std::cout << "\nArray dopo l'ordinamento:" << std::endl;
    for (int i = 0; i < 5; i++) {
        std::cout << numeri[i] << " ";
    }
    
    return 0;
}
```

## 3. Calcolo di Statistiche

### Somma, Media, Minimo e Massimo

```cpp
#include <iostream>
#include <algorithm> // Per std::min_element e std::max_element

int main() {
    int numeri[5] = {10, 45, 23, 7, 19};
    int dimensione = 5;
    
    // Calcolo della somma
    int somma = 0;
    for (int i = 0; i < dimensione; i++) {
        somma += numeri[i];
    }
    
    // Calcolo della media
    double media = static_cast<double>(somma) / dimensione;
    
    // Trovare il minimo e il massimo
    int minimo = numeri[0];
    int massimo = numeri[0];
    
    for (int i = 1; i < dimensione; i++) {
        if (numeri[i] < minimo) {
            minimo = numeri[i];
        }
        if (numeri[i] > massimo) {
            massimo = numeri[i];
        }
    }
    
    // Alternativa con algoritmi standard
    int* min = std::min_element(numeri, numeri + dimensione);
    int* max = std::max_element(numeri, numeri + dimensione);
    
    std::cout << "Somma: " << somma << std::endl;
    std::cout << "Media: " << media << std::endl;
    std::cout << "Minimo: " << minimo << " (o " << *min << " usando std::min_element)" << std::endl;
    std::cout << "Massimo: " << massimo << " (o " << *max << " usando std::max_element)" << std::endl;
    
    return 0;
}
```

## 4. Copia e Fusione di Array

### Copia di un Array

```cpp
#include <iostream>
#include <cstring> // Per std::memcpy

int main() {
    int originale[5] = {10, 45, 23, 7, 19};
    int copia1[5];
    int copia2[5];
    
    // Metodo 1: Copia manuale
    for (int i = 0; i < 5; i++) {
        copia1[i] = originale[i];
    }
    
    // Metodo 2: Utilizzo di memcpy (più efficiente)
    std::memcpy(copia2, originale, 5 * sizeof(int));
    
    // Verifica delle copie
    std::cout << "Array originale: ";
    for (int i = 0; i < 5; i++) {
        std::cout << originale[i] << " ";
    }
    
    std::cout << "\nCopia 1: ";
    for (int i = 0; i < 5; i++) {
        std::cout << copia1[i] << " ";
    }
    
    std::cout << "\nCopia 2: ";
    for (int i = 0; i < 5; i++) {
        std::cout << copia2[i] << " ";
    }
    
    return 0;
}
```

### Fusione di Due Array Ordinati

```cpp
#include <iostream>

void fondiArrayOrdinati(int arr1[], int dim1, int arr2[], int dim2, int risultato[]) {
    int i = 0, j = 0, k = 0;
    
    // Confronta elementi di entrambi gli array e inserisce il minore nel risultato
    while (i < dim1 && j < dim2) {
        if (arr1[i] <= arr2[j]) {
            risultato[k++] = arr1[i++];
        } else {
            risultato[k++] = arr2[j++];
        }
    }
    
    // Copia gli elementi rimanenti del primo array, se presenti
    while (i < dim1) {
        risultato[k++] = arr1[i++];
    }
    
    // Copia gli elementi rimanenti del secondo array, se presenti
    while (j < dim2) {
        risultato[k++] = arr2[j++];
    }
}

int main() {
    int arr1[3] = {1, 3, 5};
    int arr2[4] = {2, 4, 6, 8};
    int risultato[7]; // Dimensione totale: dim1 + dim2
    
    fondiArrayOrdinati(arr1, 3, arr2, 4, risultato);
    
    std::cout << "Array fuso: ";
    for (int i = 0; i < 7; i++) {
        std::cout << risultato[i] << " ";
    }
    
    return 0;
}
```

## 5. Inversione di un Array

```cpp
#include <iostream>
#include <algorithm> // Per std::reverse

int main() {
    int numeri[5] = {10, 45, 23, 7, 19};
    
    std::cout << "Array originale: ";
    for (int i = 0; i < 5; i++) {
        std::cout << numeri[i] << " ";
    }
    
    // Metodo 1: Inversione manuale
    for (int i = 0; i < 5/2; i++) {
        int temp = numeri[i];
        numeri[i] = numeri[4-i];
        numeri[4-i] = temp;
    }
    
    std::cout << "\nArray invertito (manualmente): ";
    for (int i = 0; i < 5; i++) {
        std::cout << numeri[i] << " ";
    }
    
    // Metodo 2: Utilizzo di std::reverse
    int numeri2[5] = {10, 45, 23, 7, 19};
    std::reverse(numeri2, numeri2 + 5);
    
    std::cout << "\nArray invertito (con std::reverse): ";
    for (int i = 0; i < 5; i++) {
        std::cout << numeri2[i] << " ";
    }
    
    return 0;
}
```

## Conclusione

Queste operazioni comuni sugli array sono fondamentali per manipolare efficacemente i dati in C++. Sebbene abbiamo mostrato implementazioni manuali per scopi didattici, in un contesto di produzione è spesso preferibile utilizzare gli algoritmi della libreria standard C++ (`<algorithm>`) che sono ottimizzati e ben testati.

Nella prossima guida, esploreremo i limiti degli array tradizionali in C++ e le best practices per utilizzarli in modo efficace e sicuro.