# Fondamenti dei Template in C++

## Introduzione ai Template

I template sono uno dei meccanismi più potenti di C++ che permettono di implementare la programmazione generica. Consentono di scrivere codice che funziona con qualsiasi tipo di dato, promuovendo il riutilizzo del codice e l'astrazione.

## Funzioni Template

Una funzione template è una funzione che può operare con diversi tipi di dati. Il compilatore genera automaticamente il codice appropriato per ogni tipo utilizzato.

### Sintassi di Base

```cpp
template <typename T>
T massimo(T a, T b) {
    return (a > b) ? a : b;
}
```

### Utilizzo

```cpp
int a = 5, b = 7;
std::cout << "Massimo tra " << a << " e " << b << ": " << massimo(a, b) << std::endl;

double c = 3.14, d = 2.71;
std::cout << "Massimo tra " << c << " e " << d << ": " << massimo(c, d) << std::endl;

std::string s1 = "abc", s2 = "xyz";
std::cout << "Massimo tra " << s1 << " e " << s2 << ": " << massimo(s1, s2) << std::endl;
```

### Deduzione dei Tipi

Il compilatore deduce automaticamente il tipo T in base agli argomenti passati alla funzione:

```cpp
massimo(10, 20);      // T è dedotto come int
massimo(3.14, 2.71);  // T è dedotto come double
```

### Template con Più Parametri di Tipo

```cpp
template <typename T, typename U>
auto somma(T a, U b) {
    return a + b;
}
```

## Classi Template

Le classi template permettono di definire classi che possono lavorare con diversi tipi di dati.

### Sintassi di Base

```cpp
template <typename T>
class Contenitore {
private:
    T elemento;

public:
    Contenitore(T val) : elemento(val) {}
    
    T getElemento() const {
        return elemento;
    }
    
    void setElemento(T val) {
        elemento = val;
    }
};
```

### Utilizzo

```cpp
Contenitore<int> contenitoreInt(42);
std::cout << "Valore: " << contenitoreInt.getElemento() << std::endl;

Contenitore<std::string> contenitoreString("Hello, World!");
std::cout << "Valore: " << contenitoreString.getElemento() << std::endl;
```

### Membri di Classe Template

```cpp
template <typename T>
class Collezione {
private:
    std::vector<T> elementi;

public:
    void aggiungi(const T& elemento) {
        elementi.push_back(elemento);
    }
    
    // Metodo template all'interno di una classe template
    template <typename Func>
    void applica(Func funzione) {
        for (auto& elem : elementi) {
            funzione(elem);
        }
    }
};
```

## Specializzazione dei Template

La specializzazione dei template permette di fornire implementazioni specifiche per determinati tipi.

### Specializzazione Completa

```cpp
// Template generale
template <typename T>
class Processore {
public:
    void processa(T valore) {
        std::cout << "Processando valore generico: " << valore << std::endl;
    }
};

// Specializzazione completa per il tipo std::string
template <>
class Processore<std::string> {
public:
    void processa(std::string valore) {
        std::cout << "Processando stringa: " << valore << std::endl;
    }
};
```

### Specializzazione Parziale

```cpp
// Template generale
template <typename T, typename U>
class Coppia {
public:
    T primo;
    U secondo;
    
    Coppia(T p, U s) : primo(p), secondo(s) {}
    
    void stampa() {
        std::cout << "Coppia generica: " << primo << ", " << secondo << std::endl;
    }
};

// Specializzazione parziale per quando il secondo tipo è int
template <typename T>
class Coppia<T, int> {
public:
    T primo;
    int secondo;
    
    Coppia(T p, int s) : primo(p), secondo(s) {}
    
    void stampa() {
        std::cout << "Coppia con secondo elemento int: " << primo << ", " << secondo << std::endl;
    }
};
```

## Template Non-Type Parameters

I template possono anche accettare valori costanti come parametri, non solo tipi.

```cpp
template <typename T, int Dimensione>
class Array {
private:
    T dati[Dimensione];

public:
    Array() {
        for (int i = 0; i < Dimensione; ++i) {
            dati[i] = T();
        }
    }
    
    T& operator[](int indice) {
        return dati[indice];
    }
    
    int dimensione() const {
        return Dimensione;
    }
};

// Utilizzo
Array<int, 5> arrayInteri;
arrayInteri[0] = 10;
arrayInteri[1] = 20;
std::cout << "Dimensione array: " << arrayInteri.dimensione() << std::endl;
```

## Vantaggi dei Template

1. **Riutilizzo del Codice**: Scrivi una volta, usa con molti tipi diversi.
2. **Type Safety**: Il controllo dei tipi avviene a tempo di compilazione.
3. **Efficienza**: Non c'è overhead a runtime, il codice è generato a tempo di compilazione.
4. **Flessibilità**: Possibilità di specializzare per tipi specifici.

## Limitazioni dei Template

1. **Messaggi di Errore Complessi**: Gli errori nei template possono generare messaggi di errore difficili da interpretare.
2. **Aumento della Dimensione del Codice**: Ogni istanziazione di un template genera nuovo codice.
3. **Tempo di Compilazione**: L'uso intensivo di template può aumentare il tempo di compilazione.

## Esercizi

1. Crea una funzione template `scambia` che scambi i valori di due variabili di qualsiasi tipo.
2. Implementa una classe template `Pila` che rappresenti una pila di elementi di tipo generico.
3. Crea una specializzazione della classe `Pila` per il tipo `bool` che ottimizzi lo spazio utilizzando un singolo bit per elemento.
4. Implementa una funzione template `trovaMinMax` che restituisca sia il minimo che il massimo valore in un array.

## Domande di Autovalutazione

1. Qual è la differenza tra `typename` e `class` nella dichiarazione di un template?
2. Come funziona la deduzione dei tipi nelle funzioni template?
3. Quando è utile utilizzare la specializzazione dei template?
4. Quali sono i vantaggi e gli svantaggi dell'utilizzo dei template rispetto all'ereditarietà per il riutilizzo del codice?
5. Come si può limitare i tipi che possono essere utilizzati con un template?