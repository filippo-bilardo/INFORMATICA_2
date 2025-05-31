# Puntatori e Funzioni

In questa guida, esploreremo come i puntatori interagiscono con le funzioni in C++, un aspetto fondamentale per scrivere codice efficiente e flessibile.

## Passaggio di Parametri per Valore vs per Riferimento

In C++, ci sono diversi modi per passare parametri alle funzioni:

1. **Passaggio per valore**: la funzione riceve una copia del valore originale
2. **Passaggio per riferimento**: la funzione riceve un riferimento al valore originale
3. **Passaggio per puntatore**: la funzione riceve l'indirizzo del valore originale

### Passaggio per Valore

Quando si passa un parametro per valore, la funzione riceve una copia del valore originale. Qualsiasi modifica al parametro all'interno della funzione non influisce sul valore originale.

```cpp
#include <iostream>

void incrementa(int numero) {
    numero++;  // Modifica solo la copia locale
    std::cout << "Valore all'interno della funzione: " << numero << std::endl;
}

int main() {
    int valore = 10;
    std::cout << "Valore prima della chiamata: " << valore << std::endl;
    
    incrementa(valore);
    
    std::cout << "Valore dopo la chiamata: " << valore << std::endl;  // Rimane 10
    
    return 0;
}
```

Output:
```
Valore prima della chiamata: 10
Valore all'interno della funzione: 11
Valore dopo la chiamata: 10
```

### Passaggio per Puntatore

Quando si passa un parametro per puntatore, la funzione riceve l'indirizzo del valore originale. Questo permette alla funzione di modificare direttamente il valore originale.

```cpp
#include <iostream>

void incrementa(int* numero) {
    (*numero)++;  // Modifica il valore originale
    std::cout << "Valore all'interno della funzione: " << *numero << std::endl;
}

int main() {
    int valore = 10;
    std::cout << "Valore prima della chiamata: " << valore << std::endl;
    
    incrementa(&valore);  // Passa l'indirizzo di valore
    
    std::cout << "Valore dopo la chiamata: " << valore << std::endl;  // Ora è 11
    
    return 0;
}
```

Output:
```
Valore prima della chiamata: 10
Valore all'interno della funzione: 11
Valore dopo la chiamata: 11
```

### Confronto con il Passaggio per Riferimento

Il passaggio per riferimento è simile al passaggio per puntatore, ma con una sintassi più pulita:

```cpp
#include <iostream>

void incrementaPerRiferimento(int& numero) {
    numero++;  // Modifica il valore originale
    std::cout << "Valore all'interno della funzione: " << numero << std::endl;
}

void incrementaPerPuntatore(int* numero) {
    (*numero)++;  // Modifica il valore originale
    std::cout << "Valore all'interno della funzione: " << *numero << std::endl;
}

int main() {
    int valore = 10;
    std::cout << "Valore prima delle chiamate: " << valore << std::endl;
    
    incrementaPerRiferimento(valore);  // Passa per riferimento
    std::cout << "Valore dopo incrementaPerRiferimento: " << valore << std::endl;
    
    incrementaPerPuntatore(&valore);  // Passa per puntatore
    std::cout << "Valore dopo incrementaPerPuntatore: " << valore << std::endl;
    
    return 0;
}
```

Output:
```
Valore prima delle chiamate: 10
Valore all'interno della funzione: 11
Valore dopo incrementaPerRiferimento: 11
Valore all'interno della funzione: 12
Valore dopo incrementaPerPuntatore: 12
```

## Vantaggi del Passaggio per Puntatore

### 1. Modifica dei Valori Originali

Il passaggio per puntatore permette alla funzione di modificare i valori originali, utile quando si vogliono restituire più valori da una funzione.

```cpp
#include <iostream>

// Funzione che calcola sia il quadrato che il cubo di un numero
void calcolaPotenzePerPuntatore(int numero, int* quadrato, int* cubo) {
    *quadrato = numero * numero;
    *cubo = numero * numero * numero;
}

int main() {
    int n = 5;
    int q, c;
    
    calcolaPotenzePerPuntatore(n, &q, &c);
    
    std::cout << n << "² = " << q << std::endl;
    std::cout << n << "³ = " << c << std::endl;
    
    return 0;
}
```

Output:
```
5² = 25
5³ = 125
```

### 2. Efficienza con Strutture Dati Grandi

Quando si passano strutture dati grandi, è più efficiente passare un puntatore (8 byte) piuttosto che copiare l'intera struttura.

```cpp
#include <iostream>

struct DatiGrandi {
    int array[1000];
    // ... altri membri ...
};

// Inefficiente: copia l'intera struttura (4000+ byte)
void processDatiPerValore(DatiGrandi dati) {
    dati.array[0] = 100;  // Modifica solo la copia locale
}

// Efficiente: passa solo l'indirizzo (8 byte)
void processDatiPerPuntatore(DatiGrandi* dati) {
    dati->array[0] = 100;  // Modifica la struttura originale
}

int main() {
    DatiGrandi dati = {};
    
    processDatiPerValore(dati);
    std::cout << "Dopo processDatiPerValore: " << dati.array[0] << std::endl;  // Rimane 0
    
    processDatiPerPuntatore(&dati);
    std::cout << "Dopo processDatiPerPuntatore: " << dati.array[0] << std::endl;  // Ora è 100
    
    return 0;
}
```

Output:
```
Dopo processDatiPerValore: 0
Dopo processDatiPerPuntatore: 100
```

### 3. Possibilità di Passare nullptr

I puntatori possono essere nulli, il che permette di gestire casi speciali:

```cpp
#include <iostream>

void processaDati(int* dati) {
    if (dati == nullptr) {
        std::cout << "Nessun dato da processare" << std::endl;
        return;
    }
    
    std::cout << "Dato processato: " << *dati << std::endl;
}

int main() {
    int valore = 42;
    
    processaDati(&valore);  // Passa un puntatore valido
    processaDati(nullptr);  // Passa nullptr
    
    return 0;
}
```

Output:
```
Dato processato: 42
Nessun dato da processare
```

## Puntatori a Funzione come Parametri

I puntatori a funzione possono essere passati come parametri ad altre funzioni, permettendo di implementare callback e strategie di design pattern.

```cpp
#include <iostream>

// Definizione di alcune funzioni
int somma(int a, int b) {
    return a + b;
}

int sottrazione(int a, int b) {
    return a - b;
}

int moltiplicazione(int a, int b) {
    return a * b;
}

// Funzione che accetta un puntatore a funzione come parametro
int calcolaEStampa(int a, int b, int (*operazione)(int, int)) {
    int risultato = operazione(a, b);
    std::cout << "Risultato: " << risultato << std::endl;
    return risultato;
}

int main() {
    int x = 10, y = 5;
    
    std::cout << "Somma: ";
    calcolaEStampa(x, y, somma);
    
    std::cout << "Sottrazione: ";
    calcolaEStampa(x, y, sottrazione);
    
    std::cout << "Moltiplicazione: ";
    calcolaEStampa(x, y, moltiplicazione);
    
    // Utilizzo di una lambda come puntatore a funzione
    std::cout << "Divisione: ";
    calcolaEStampa(x, y, [](int a, int b) -> int { return a / b; });
    
    return 0;
}
```

Output:
```
Somma: Risultato: 15
Sottrazione: Risultato: 5
Moltiplicazione: Risultato: 50
Divisione: Risultato: 2
```

## Restituire Puntatori da Funzioni

Le funzioni possono restituire puntatori, utile quando si vuole restituire un riferimento a un oggetto esistente o quando si alloca memoria dinamicamente.

### 1. Restituire un Puntatore a un Oggetto Esistente

```cpp
#include <iostream>

int* trovaMax(int* array, int dimensione) {
    if (dimensione <= 0 || array == nullptr) {
        return nullptr;
    }
    
    int* max = &array[0];
    
    for (int i = 1; i < dimensione; i++) {
        if (array[i] > *max) {
            max = &array[i];
        }
    }
    
    return max;
}

int main() {
    int numeri[] = {5, 8, 3, 12, 7};
    int dimensione = sizeof(numeri) / sizeof(numeri[0]);
    
    int* massimo = trovaMax(numeri, dimensione);
    
    if (massimo != nullptr) {
        std::cout << "Il valore massimo è: " << *massimo << std::endl;
        std::cout << "Si trova all'indice: " << (massimo - numeri) << std::endl;
        
        // Modifica del valore massimo
        *massimo = 100;
        
        std::cout << "Array dopo la modifica: ";
        for (int i = 0; i < dimensione; i++) {
            std::cout << numeri[i] << " ";
        }
        std::cout << std::endl;
    }
    
    return 0;
}
```

Output:
```
Il valore massimo è: 12
Si trova all'indice: 3
Array dopo la modifica: 5 8 3 100 7
```

### 2. Restituire un Puntatore a Memoria Allocata Dinamicamente

```cpp
#include <iostream>
#include <cstring>

char* creaStringaMaiuscola(const char* originale) {
    if (originale == nullptr) {
        return nullptr;
    }
    
    size_t lunghezza = strlen(originale);
    char* nuova = new char[lunghezza + 1];  // +1 per il terminatore
    
    for (size_t i = 0; i < lunghezza; i++) {
        nuova[i] = toupper(originale[i]);
    }
    
    nuova[lunghezza] = '\0';  // Terminatore di stringa
    
    return nuova;
}

int main() {
    const char* originale = "Hello, World!";
    
    char* maiuscola = creaStringaMaiuscola(originale);
    
    if (maiuscola != nullptr) {
        std::cout << "Originale: " << originale << std::endl;
        std::cout << "Maiuscola: " << maiuscola << std::endl;
        
        // Importante: deallocare la memoria
        delete[] maiuscola;
    }
    
    return 0;
}
```

Output:
```
Originale: Hello, World!
Maiuscola: HELLO, WORLD!
```

### Attenzione ai Puntatori Pendenti (Dangling Pointers)

Quando si restituisce un puntatore da una funzione, bisogna fare attenzione a non restituire un puntatore a una variabile locale, che verrebbe distrutta alla fine della funzione:

```cpp
#include <iostream>

// PERICOLOSO: restituisce un puntatore a una variabile locale
int* funzionePericolosa() {
    int variabileLocale = 42;
    return &variabileLocale;  // ERRORE: variabileLocale verrà distrutta
}

// SICURO: restituisce un puntatore a memoria allocata dinamicamente
int* funzioneSicura() {
    int* puntatore = new int(42);
    return puntatore;  // OK: la memoria allocata con new persiste
}

int main() {
    // Puntatore pendente: punta a memoria non più valida
    // int* pericoloso = funzionePericolosa();
    // std::cout << *pericoloso << std::endl;  // Comportamento non definito
    
    // Puntatore valido: punta a memoria allocata dinamicamente
    int* sicuro = funzioneSicura();
    std::cout << *sicuro << std::endl;  // OK
    
    // Importante: deallocare la memoria
    delete sicuro;
    
    return 0;
}
```

Output:
```
42
```

## Puntatori Costanti come Parametri

I puntatori costanti sono utili quando si vuole impedire alla funzione di modificare i dati originali:

```cpp
#include <iostream>

// La funzione non può modificare i dati puntati
void stampaArray(const int* array, int dimensione) {
    for (int i = 0; i < dimensione; i++) {
        std::cout << array[i] << " ";
    }
    std::cout << std::endl;
    
    // array[0] = 100;  // Errore: non può modificare i dati puntati
}

int main() {
    int numeri[] = {10, 20, 30, 40, 50};
    int dimensione = sizeof(numeri) / sizeof(numeri[0]);
    
    stampaArray(numeri, dimensione);
    
    return 0;
}
```

Output:
```
10 20 30 40 50
```

## Puntatori Smart come Parametri e Valori di Ritorno

I puntatori smart (introdotti in C++11) offrono un'alternativa più sicura ai puntatori raw per la gestione della memoria:

```cpp
#include <iostream>
#include <memory>

class Risorsa {
public:
    Risorsa(int valore) : valore_(valore) {
        std::cout << "Risorsa " << valore_ << " creata" << std::endl;
    }
    
    ~Risorsa() {
        std::cout << "Risorsa " << valore_ << " distrutta" << std::endl;
    }
    
    int getValore() const {
        return valore_;
    }
    
    void setValore(int valore) {
        valore_ = valore;
    }
    
private:
    int valore_;
};

// Funzione che accetta uno shared_ptr
void processoRisorsa(std::shared_ptr<Risorsa> risorsa) {
    std::cout << "Processo risorsa con valore: " << risorsa->getValore() << std::endl;
    risorsa->setValore(risorsa->getValore() * 2);
}

// Funzione che restituisce uno unique_ptr
std::unique_ptr<Risorsa> creaRisorsa(int valore) {
    return std::make_unique<Risorsa>(valore);
}

int main() {
    // Utilizzo di shared_ptr
    auto risorsaCondivisa = std::make_shared<Risorsa>(42);
    std::cout << "Valore iniziale: " << risorsaCondivisa->getValore() << std::endl;
    
    processoRisorsa(risorsaCondivisa);
    
    std::cout << "Valore dopo il processo: " << risorsaCondivisa->getValore() << std::endl;
    
    // Utilizzo di unique_ptr
    auto risorsaUnica = creaRisorsa(100);
    std::cout << "Valore della risorsa unica: " << risorsaUnica->getValore() << std::endl;
    
    // La memoria viene deallocata automaticamente quando i puntatori smart escono dallo scope
    return 0;
}
```

Output:
```
Risorsa 42 creata
Valore iniziale: 42
Processo risorsa con valore: 42
Valore dopo il processo: 84
Risorsa 100 creata
Valore della risorsa unica: 100
Risorsa 100 distrutta
Risorsa 42 distrutta
```

## Conclusione

I puntatori sono uno strumento potente quando utilizzati con le funzioni in C++. Permettono di modificare i valori originali, passare strutture dati grandi in modo efficiente, implementare callback e gestire la memoria in modo dinamico.

Tuttavia, è importante utilizzare i puntatori con cautela per evitare errori comuni come i puntatori pendenti, i memory leak e gli accessi a memoria non valida. I puntatori smart introdotti in C++11 offrono un'alternativa più sicura per molti casi d'uso.

Nel prossimo capitolo, esploreremo le best practices nell'uso dei puntatori e come evitare i problemi più comuni.