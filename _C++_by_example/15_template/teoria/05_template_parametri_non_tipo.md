# Template con Parametri Non-Tipo in C++

In questa guida, esploreremo i template con parametri non-tipo in C++, una caratteristica avanzata che permette di parametrizzare i template non solo con tipi di dati ma anche con valori costanti.

## Cos'è un Parametro Non-Tipo?

Un parametro non-tipo in un template è un valore costante (anziché un tipo) che può essere utilizzato per parametrizzare un template. Questi parametri possono essere:

- Valori interi (int, long, ecc.)
- Puntatori
- Riferimenti
- Enumerazioni
- Puntatori a membri (C++11 e successivi)
- Valori in virgola mobile (C++20)

## Sintassi di Base

La sintassi per dichiarare un template con parametri non-tipo è simile a quella dei template standard, ma invece di utilizzare `typename` o `class`, si specifica direttamente il tipo del parametro:

```cpp
// Template con un parametro non-tipo N di tipo size_t
template <size_t N>
class Array {
private:
    int elementi[N];
    
public:
    size_t dimensione() const { return N; }
    int& operator[](size_t indice) { return elementi[indice]; }
    const int& operator[](size_t indice) const { return elementi[indice]; }
};
```

In questo esempio, `N` è un parametro non-tipo che determina la dimensione dell'array a tempo di compilazione.

## Utilizzo dei Template con Parametri Non-Tipo

Ecco come utilizzare il template `Array` definito sopra:

```cpp
#include <iostream>

int main() {
    // Crea un array di dimensione 5
    Array<5> arr1;
    
    // Assegna valori
    for (size_t i = 0; i < arr1.dimensione(); ++i) {
        arr1[i] = i * 10;
    }
    
    // Stampa i valori
    for (size_t i = 0; i < arr1.dimensione(); ++i) {
        std::cout << arr1[i] << " ";
    }
    std::cout << std::endl;
    
    // Crea un array di dimensione 3
    Array<3> arr2;
    
    // Il compilatore sa che arr1 e arr2 sono di tipi diversi
    // perché hanno parametri non-tipo diversi
    
    return 0;
}
```

## Combinazione di Parametri di Tipo e Non-Tipo

È possibile combinare parametri di tipo e non-tipo nello stesso template:

```cpp
template <typename T, size_t N>
class ArrayGenerico {
private:
    T elementi[N];
    
public:
    size_t dimensione() const { return N; }
    T& operator[](size_t indice) { return elementi[indice]; }
    const T& operator[](size_t indice) const { return elementi[indice]; }
};
```

Utilizzo:

```cpp
#include <iostream>
#include <string>

int main() {
    // Array di 5 interi
    ArrayGenerico<int, 5> arrInt;
    
    // Array di 3 stringhe
    ArrayGenerico<std::string, 3> arrString;
    
    // Assegna valori all'array di stringhe
    arrString[0] = "C++";
    arrString[1] = "Template";
    arrString[2] = "Parametri Non-Tipo";
    
    // Stampa i valori
    for (size_t i = 0; i < arrString.dimensione(); ++i) {
        std::cout << arrString[i] << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

## Espressioni come Parametri Non-Tipo

I parametri non-tipo possono anche essere espressioni costanti valutabili a tempo di compilazione:

```cpp
template <int A, int B>
struct Somma {
    static const int valore = A + B;
};

int main() {
    // Calcola 5 + 7 a tempo di compilazione
    int risultato = Somma<5, 7>::valore;
    std::cout << "5 + 7 = " << risultato << std::endl;  // Output: 5 + 7 = 12
    
    return 0;
}
```

## Parametri Template come Valori di Default per Funzioni

I parametri non-tipo possono essere utilizzati per fornire valori di default per le funzioni:

```cpp
template <typename T, size_t N = 10>
void inizializzaArray(T (&arr)[N], T valore = T()) {
    for (size_t i = 0; i < N; ++i) {
        arr[i] = valore;
    }
}

int main() {
    int numeri[10];
    double decimali[5];
    
    // Inizializza l'array di interi con 0 (valore di default per int)
    inizializzaArray(numeri);
    
    // Inizializza l'array di double con 3.14
    inizializzaArray(decimali, 3.14);
    
    return 0;
}
```

## Limitazioni dei Parametri Non-Tipo

- Fino a C++17, i parametri non-tipo potevano essere solo di tipo intero, enumerazione, puntatore, riferimento o puntatore a membro.
- In C++20, sono stati aggiunti i tipi in virgola mobile (float, double).
- I tipi di classe (come `std::string`) non possono essere utilizzati come parametri non-tipo fino a C++20.
- In C++20, è stata introdotta la possibilità di utilizzare tipi di classe con certe restrizioni.

## Casi d'Uso Comuni

### 1. Contenitori a Dimensione Fissa

Uno dei casi d'uso più comuni è la creazione di contenitori con dimensione fissa nota a tempo di compilazione:

```cpp
template <typename T, size_t Righe, size_t Colonne>
class Matrice {
private:
    T dati[Righe][Colonne];
    
public:
    T& at(size_t r, size_t c) { return dati[r][c]; }
    const T& at(size_t r, size_t c) const { return dati[r][c]; }
    
    // Ottiene le dimensioni
    size_t righe() const { return Righe; }
    size_t colonne() const { return Colonne; }
};
```

### 2. Metaprogrammazione Template

I parametri non-tipo sono fondamentali nella metaprogrammazione template, dove i calcoli vengono eseguiti a tempo di compilazione:

```cpp
// Calcolo del fattoriale a tempo di compilazione
template <unsigned int N>
struct Fattoriale {
    static const unsigned int valore = N * Fattoriale<N-1>::valore;
};

// Caso base per la ricorsione
template <>
struct Fattoriale<0> {
    static const unsigned int valore = 1;
};

int main() {
    // Calcola 5! a tempo di compilazione
    std::cout << "5! = " << Fattoriale<5>::valore << std::endl;  // Output: 5! = 120
    
    return 0;
}
```

## Vantaggi dei Parametri Non-Tipo

1. **Efficienza**: I valori sono noti a tempo di compilazione, permettendo ottimizzazioni.
2. **Sicurezza dei tipi**: Gli errori vengono rilevati a tempo di compilazione.
3. **Flessibilità**: Permettono di parametrizzare i template in modi che i soli parametri di tipo non consentirebbero.
4. **Metaprogrammazione**: Abilitano tecniche avanzate di metaprogrammazione template.

## Considerazioni sulle Prestazioni

I template con parametri non-tipo possono migliorare le prestazioni in diversi modi:

1. **Allocazione su stack**: Le dimensioni fisse permettono l'allocazione su stack anziché su heap.
2. **Ottimizzazioni del compilatore**: Il compilatore può applicare ottimizzazioni specifiche conoscendo i valori a tempo di compilazione.
3. **Inlining**: Le funzioni possono essere più facilmente inlinate.
4. **Eliminazione di controlli a runtime**: Non è necessario verificare dimensioni o limiti a runtime.

## Esempi Pratici

### Implementazione di un Buffer Circolare a Dimensione Fissa

```cpp
template <typename T, size_t Capacita>
class BufferCircolare {
private:
    T dati[Capacita];
    size_t testa = 0;
    size_t coda = 0;
    bool pieno = false;
    
public:
    bool vuoto() const { return !pieno && (testa == coda); }
    bool pieno() const { return pieno; }
    
    bool push(const T& valore) {
        if (pieno) return false;
        
        dati[coda] = valore;
        coda = (coda + 1) % Capacita;
        pieno = (testa == coda);
        return true;
    }
    
    bool pop(T& valore) {
        if (vuoto()) return false;
        
        valore = dati[testa];
        testa = (testa + 1) % Capacita;
        pieno = false;
        return true;
    }
};
```

### Implementazione di un Vettore N-dimensionale

```cpp
template <typename T, size_t N>
class Vettore {
private:
    T componenti[N];
    
public:
    // Costruttore di default
    Vettore() {
        for (size_t i = 0; i < N; ++i) {
            componenti[i] = T();
        }
    }
    
    // Accesso agli elementi
    T& operator[](size_t indice) { return componenti[indice]; }
    const T& operator[](size_t indice) const { return componenti[indice]; }
    
    // Prodotto scalare
    T prodottoScalare(const Vettore<T, N>& altro) const {
        T risultato = T();
        for (size_t i = 0; i < N; ++i) {
            risultato += componenti[i] * altro.componenti[i];
        }
        return risultato;
    }
    
    // Somma di vettori
    Vettore<T, N> operator+(const Vettore<T, N>& altro) const {
        Vettore<T, N> risultato;
        for (size_t i = 0; i < N; ++i) {
            risultato[i] = componenti[i] + altro.componenti[i];
        }
        return risultato;
    }
};
```

## Domande di Autovalutazione

1. Quali tipi di valori possono essere utilizzati come parametri non-tipo in un template?
2. Qual è la differenza principale tra un parametro di tipo e un parametro non-tipo in un template?
3. Come si può combinare parametri di tipo e non-tipo nello stesso template?
4. Quali sono i vantaggi dell'utilizzo di parametri non-tipo rispetto a variabili membro?
5. Come possono i parametri non-tipo migliorare le prestazioni del codice?
6. Quali sono le limitazioni dei parametri non-tipo in C++17 e come sono cambiate in C++20?
7. Come si può utilizzare un parametro non-tipo per implementare la metaprogrammazione template?

## Esercizi Proposti

1. Implementa un template di classe `Stack<T, size_t Capacita>` che rappresenti uno stack a dimensione fissa.
2. Crea un template `Potenza<base, esponente>` che calcoli la potenza di un numero a tempo di compilazione.
3. Implementa un template di classe `Array2D<T, size_t Righe, size_t Colonne>` per rappresentare una matrice bidimensionale.
4. Crea un template `IsPrimo<N>` che determini se un numero è primo a tempo di compilazione.
5. Implementa un template di funzione `creaArray<T, size_t N>(T valore)` che restituisca un array di tipo `T` e dimensione `N` inizializzato con il valore specificato.

## Prossimo Argomento

Nel prossimo argomento, esploreremo i template variadic introdotti in C++11, che permettono di creare template con un numero variabile di parametri.