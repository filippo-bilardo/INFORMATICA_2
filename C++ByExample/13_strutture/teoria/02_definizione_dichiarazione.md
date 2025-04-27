# Definizione e Dichiarazione di Strutture

In questa guida, esploreremo in dettaglio come definire e dichiarare strutture in C++, incluse le diverse sintassi di inizializzazione.

## Definizione di una Struttura

La definizione di una struttura specifica il layout della struttura, inclusi i nomi e i tipi dei suoi membri.

### Sintassi Base

```cpp
struct NomeStruttura {
    tipo1 membro1;
    tipo2 membro2;
    // ...
    tipoN membroN;
};
```

Esempio:

```cpp
struct Persona {
    std::string nome;
    std::string cognome;
    int eta;
    double altezza;  // in metri
    double peso;     // in kg
};
```

### Definizione con Tag

In C e C++, è possibile definire una struttura utilizzando un "tag" (nome della struttura) senza dichiarare variabili:

```cpp
struct Punto {
    double x;
    double y;
};

// Utilizzo successivo
Punto p1, p2;
```

### Definizione con Dichiarazione Simultanea

È possibile definire una struttura e dichiarare variabili contemporaneamente:

```cpp
struct Rettangolo {
    double lunghezza;
    double larghezza;
} rett1, rett2;
```

In questo caso, `rett1` e `rett2` sono variabili di tipo `Rettangolo`.

### Strutture Anonime

È possibile definire strutture senza nome (anonime) se vengono utilizzate solo per dichiarare variabili immediate:

```cpp
struct {
    double x;
    double y;
} punto1, punto2;
```

Tuttavia, questa pratica è sconsigliata in C++ moderno perché limita la riutilizzabilità del tipo.

## Dichiarazione di Variabili Struttura

Dopo aver definito una struttura, è possibile dichiarare variabili di quel tipo:

```cpp
Persona persona1;  // Dichiarazione di una variabile di tipo Persona
Persona studenti[10];  // Array di 10 strutture Persona
Persona* ptrPersona;  // Puntatore a una struttura Persona
```

## Inizializzazione di Strutture

Esistono diversi modi per inizializzare una struttura in C++.

### Inizializzazione Membro per Membro

```cpp
Persona p1;
p1.nome = "Mario";
p1.cognome = "Rossi";
p1.eta = 30;
p1.altezza = 1.75;
p1.peso = 70.5;
```

### Inizializzazione con Lista di Inizializzatori (C++98)

```cpp
Persona p1 = {"Mario", "Rossi", 30, 1.75, 70.5};
```

I valori vengono assegnati ai membri nell'ordine in cui sono definiti nella struttura.

### Inizializzazione Uniforme (C++11)

```cpp
Persona p1 = {"Mario", "Rossi", 30, 1.75, 70.5};  // C++98 e C++11
Persona p2{"Luigi", "Verdi", 25, 1.80, 75.0};    // Solo C++11
```

### Inizializzazione con Designatori (C++20)

A partire da C++20, è possibile utilizzare i designatori per inizializzare membri specifici:

```cpp
Persona p1 = {
    .nome = "Mario",
    .cognome = "Rossi",
    .eta = 30,
    .altezza = 1.75,
    .peso = 70.5
};
```

Questo permette di inizializzare i membri in qualsiasi ordine e di omettere alcuni membri (che verranno inizializzati al loro valore predefinito).

## Typedef e Alias di Tipo

È possibile creare alias per i tipi di struttura per semplificare la dichiarazione:

### Utilizzo di `typedef` (C e C++)

```cpp
typedef struct {
    double x;
    double y;
} Punto;

// Ora è possibile dichiarare variabili direttamente
Punto p1, p2;
```

### Utilizzo di `using` (C++11)

```cpp
struct Coordinate {
    double x;
    double y;
};

using Punto = Coordinate;  // Alias di tipo

Punto p1, p2;  // p1 e p2 sono di tipo Coordinate
```

## Strutture e Funzioni

### Passaggio di Strutture a Funzioni

Le strutture possono essere passate a funzioni per valore, per riferimento o tramite puntatore:

```cpp
// Per valore (crea una copia)
void stampaPersona(Persona p) {
    std::cout << p.nome << " " << p.cognome << ", " << p.eta << " anni" << std::endl;
}

// Per riferimento (nessuna copia, può modificare l'originale)
void invecchia(Persona& p, int anni) {
    p.eta += anni;
}

// Tramite puntatore (nessuna copia, può modificare l'originale)
void modificaPeso(Persona* p, double nuovoPeso) {
    p->peso = nuovoPeso;
}
```

### Ritorno di Strutture da Funzioni

Le funzioni possono restituire strutture:

```cpp
Persona creaPersona(const std::string& nome, const std::string& cognome, int eta) {
    Persona p;
    p.nome = nome;
    p.cognome = cognome;
    p.eta = eta;
    p.altezza = 0.0;  // Valore predefinito
    p.peso = 0.0;     // Valore predefinito
    return p;
}

// Utilizzo
Persona p1 = creaPersona("Mario", "Rossi", 30);
```

In C++ moderno, il compilatore può ottimizzare il ritorno di strutture per evitare copie non necessarie (Return Value Optimization).

## Esempio Completo

```cpp
#include <iostream>
#include <string>
#include <cmath>  // Per sqrt

// Definizione della struttura Punto
struct Punto {
    double x;
    double y;
};

// Funzione che calcola la distanza tra due punti
double distanza(const Punto& p1, const Punto& p2) {
    double dx = p2.x - p1.x;
    double dy = p2.y - p1.y;
    return std::sqrt(dx*dx + dy*dy);
}

// Funzione che crea un punto
Punto creaPunto(double x, double y) {
    Punto p = {x, y};
    return p;
}

int main() {
    // Dichiarazione e inizializzazione di punti
    Punto origine = {0.0, 0.0};
    Punto p1{3.0, 4.0};  // Inizializzazione uniforme (C++11)
    
    // Utilizzo della funzione creaPunto
    Punto p2 = creaPunto(1.0, 1.0);
    
    // Calcolo e stampa della distanza
    std::cout << "Distanza dall'origine a p1: " << distanza(origine, p1) << std::endl;
    std::cout << "Distanza da p1 a p2: " << distanza(p1, p2) << std::endl;
    
    return 0;
}
```

## Domande di Autovalutazione

1. Quali sono i diversi modi per inizializzare una struttura in C++?
2. Qual è la differenza tra passare una struttura per valore e per riferimento a una funzione?
3. Come si può creare un alias per un tipo di struttura in C++?
4. Cosa sono i designatori e quando sono stati introdotti in C++?
5. Perché è generalmente sconsigliato utilizzare strutture anonime in C++ moderno?

## Esercizi Proposti

1. Definisci una struttura `Cerchio` con campi per il centro (un `Punto`) e il raggio. Scrivi funzioni per calcolare l'area e la circonferenza del cerchio.

2. Crea una struttura `Prodotto` con campi per nome, prezzo e quantità. Scrivi una funzione che calcola il valore totale di un prodotto (prezzo × quantità).

3. Definisci una struttura `Frazione` con campi per numeratore e denominatore. Scrivi funzioni per sommare, sottrarre, moltiplicare e dividere frazioni.

## Prossimo Argomento

Nel prossimo argomento, esploreremo in dettaglio come accedere ai membri di una struttura, incluso l'accesso tramite puntatori e riferimenti.