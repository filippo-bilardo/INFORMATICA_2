# Parametri e Valori di Ritorno

In questa guida, esploreremo in dettaglio i parametri e i valori di ritorno delle funzioni in C++, elementi fondamentali per la comunicazione tra diverse parti di un programma.

## Parametri di Funzione

I parametri sono variabili che ricevono valori quando una funzione viene chiamata. Permettono di passare informazioni alla funzione, rendendola più flessibile e riutilizzabile.

### Tipi di Parametri

In C++, esistono diversi modi per passare parametri a una funzione:

#### 1. Passaggio per Valore

Quando un parametro viene passato per valore, la funzione riceve una copia del valore originale. Qualsiasi modifica al parametro all'interno della funzione non influisce sul valore originale.

```cpp
void incrementa(int numero) {
    numero++;  // Modifica solo la copia locale
    std::cout << "Dentro la funzione: " << numero << std::endl;
}

int main() {
    int x = 5;
    incrementa(x);
    std::cout << "Dopo la chiamata: " << x << std::endl;  // Stampa ancora 5
    return 0;
}
```

**Vantaggi**:
- Sicurezza: il valore originale non può essere modificato accidentalmente
- Semplicità: non richiede sintassi speciale

**Svantaggi**:
- Inefficienza per tipi di dati grandi (viene creata una copia)
- Impossibilità di modificare il valore originale

#### 2. Passaggio per Riferimento

Quando un parametro viene passato per riferimento, la funzione riceve un riferimento al valore originale. Qualsiasi modifica al parametro all'interno della funzione influisce sul valore originale.

```cpp
void incrementa(int& numero) {
    numero++;  // Modifica il valore originale
    std::cout << "Dentro la funzione: " << numero << std::endl;
}

int main() {
    int x = 5;
    incrementa(x);
    std::cout << "Dopo la chiamata: " << x << std::endl;  // Stampa 6
    return 0;
}
```

**Vantaggi**:
- Efficienza: non viene creata alcuna copia
- Possibilità di modificare il valore originale

**Svantaggi**:
- Rischio di modifiche accidentali al valore originale
- Meno chiaro a prima vista che il valore può essere modificato

#### 3. Passaggio per Riferimento Costante

Quando un parametro viene passato per riferimento costante, la funzione riceve un riferimento al valore originale, ma non può modificarlo.

```cpp
void stampaInfo(const std::string& testo) {
    // testo += " modificato";  // Errore di compilazione!
    std::cout << "Testo: " << testo << std::endl;
}

int main() {
    std::string messaggio = "Hello";
    stampaInfo(messaggio);
    return 0;
}
```

**Vantaggi**:
- Efficienza: non viene creata alcuna copia
- Sicurezza: il valore originale non può essere modificato

**Svantaggi**:
- Sintassi leggermente più complessa

#### 4. Passaggio per Puntatore

Quando un parametro viene passato per puntatore, la funzione riceve l'indirizzo di memoria del valore originale. La funzione può accedere e modificare il valore originale attraverso il puntatore.

```cpp
void incrementa(int* numero) {
    (*numero)++;  // Modifica il valore originale
    std::cout << "Dentro la funzione: " << *numero << std::endl;
}

int main() {
    int x = 5;
    incrementa(&x);
    std::cout << "Dopo la chiamata: " << x << std::endl;  // Stampa 6
    return 0;
}
```

**Vantaggi**:
- Possibilità di rappresentare l'assenza di valore (nullptr)
- Chiaro a prima vista che il valore può essere modificato

**Svantaggi**:
- Sintassi più complessa
- Rischio di errori di dereferenziazione

### Linee Guida per la Scelta del Tipo di Parametro

1. **Usa il passaggio per valore** per tipi primitivi (int, char, bool, ecc.) e oggetti piccoli.
2. **Usa il passaggio per riferimento costante** (`const &`) per oggetti grandi che non devono essere modificati.
3. **Usa il passaggio per riferimento** (`&`) quando la funzione deve modificare il parametro.
4. **Usa il passaggio per puntatore** (`*`) quando il parametro potrebbe essere nullptr o quando è necessario evidenziare che il parametro verrà modificato.

## Valori di Ritorno

Il valore di ritorno è il risultato che una funzione restituisce al chiamante. Permette alla funzione di comunicare un risultato o uno stato al resto del programma.

### Tipi di Valori di Ritorno

#### 1. Tipi Primitivi

Le funzioni possono restituire tipi primitivi come int, float, bool, ecc.

```cpp
int somma(int a, int b) {
    return a + b;
}

int main() {
    int risultato = somma(5, 3);
    std::cout << "Risultato: " << risultato << std::endl;  // Stampa 8
    return 0;
}
```

#### 2. Oggetti

Le funzioni possono restituire oggetti complessi come stringhe, vettori, classi personalizzate, ecc.

```cpp
#include <string>

std::string saluta(const std::string& nome) {
    return "Ciao, " + nome + "!";
}

int main() {
    std::string messaggio = saluta("Mario");
    std::cout << messaggio << std::endl;  // Stampa "Ciao, Mario!"
    return 0;
}
```

#### 3. Riferimenti

Le funzioni possono restituire riferimenti, ma è necessario prestare attenzione a non restituire riferimenti a variabili locali.

```cpp
// PERICOLOSO: restituisce un riferimento a una variabile locale
int& funzioneErrata() {
    int x = 10;
    return x;  // ERRORE: x verrà distrutta alla fine della funzione
}

// CORRETTO: restituisce un riferimento a una variabile statica
int& contatore() {
    static int count = 0;
    return count;  // OK: count esiste per tutta la durata del programma
}

int main() {
    contatore() = 5;  // Assegna 5 alla variabile statica count
    std::cout << contatore() << std::endl;  // Stampa 5
    contatore()++;
    std::cout << contatore() << std::endl;  // Stampa 6
    return 0;
}
```

#### 4. Puntatori

Le funzioni possono restituire puntatori, ma è necessario prestare attenzione a non restituire puntatori a variabili locali.

```cpp
// PERICOLOSO: restituisce un puntatore a una variabile locale
int* funzioneErrata() {
    int x = 10;
    return &x;  // ERRORE: x verrà distrutta alla fine della funzione
}

// CORRETTO: restituisce un puntatore a memoria allocata dinamicamente
int* creaArray(int dimensione) {
    return new int[dimensione];  // OK: la memoria allocata con new esiste fino a delete
}

int main() {
    int* array = creaArray(5);
    for (int i = 0; i < 5; i++) {
        array[i] = i * 2;
    }
    for (int i = 0; i < 5; i++) {
        std::cout << array[i] << " ";
    }
    delete[] array;  // Importante: liberare la memoria allocata
    return 0;
}
```

#### 5. void (Nessun Valore di Ritorno)

Le funzioni possono non restituire alcun valore, in tal caso il tipo di ritorno è `void`.

```cpp
void stampaMessaggio(const std::string& messaggio) {
    std::cout << messaggio << std::endl;
    // Nessun return necessario
}

int main() {
    stampaMessaggio("Hello, World!");
    return 0;
}
```

### Ottimizzazione del Ritorno (Return Value Optimization)

Moderni compilatori C++ implementano tecniche di ottimizzazione come la Return Value Optimization (RVO) e la Named Return Value Optimization (NRVO) per evitare copie inutili quando si restituiscono oggetti grandi.

```cpp
std::vector<int> creaVettore(int dimensione) {
    std::vector<int> risultato;
    for (int i = 0; i < dimensione; i++) {
        risultato.push_back(i);
    }
    return risultato;  // Il compilatore può evitare la copia
}
```

### Valori di Ritorno Multipli

In C++, ci sono diversi modi per restituire più valori da una funzione:

#### 1. Utilizzando una Struttura o una Classe

```cpp
struct Risultato {
    int somma;
    int prodotto;
};

Risultato calcolaSommaProdotto(int a, int b) {
    Risultato r;
    r.somma = a + b;
    r.prodotto = a * b;
    return r;
}

int main() {
    Risultato r = calcolaSommaProdotto(5, 3);
    std::cout << "Somma: " << r.somma << ", Prodotto: " << r.prodotto << std::endl;
    return 0;
}
```

#### 2. Utilizzando `std::pair` o `std::tuple`

```cpp
#include <tuple>

std::pair<int, int> calcolaSommaProdotto(int a, int b) {
    return {a + b, a * b};
}

std::tuple<int, int, double> calcolaSommaProdottoMedia(int a, int b) {
    return {a + b, a * b, (a + b) / 2.0};
}

int main() {
    auto [somma, prodotto] = calcolaSommaProdotto(5, 3);
    std::cout << "Somma: " << somma << ", Prodotto: " << prodotto << std::endl;
    
    auto [somma2, prodotto2, media] = calcolaSommaProdottoMedia(5, 3);
    std::cout << "Somma: " << somma2 << ", Prodotto: " << prodotto2 << ", Media: " << media << std::endl;
    
    return 0;
}
```

#### 3. Utilizzando Parametri di Output

```cpp
void calcolaSommaProdotto(int a, int b, int& somma, int& prodotto) {
    somma = a + b;
    prodotto = a * b;
}

int main() {
    int somma, prodotto;
    calcolaSommaProdotto(5, 3, somma, prodotto);
    std::cout << "Somma: " << somma << ", Prodotto: " << prodotto << std::endl;
    return 0;
}
```

## Best Practices

1. **Preferisci i parametri per riferimento costante** per oggetti grandi che non devono essere modificati.
2. **Usa nomi descrittivi** per i parametri e documenta il loro scopo.
3. **Limita il numero di parametri** (idealmente non più di 3-4) per migliorare la leggibilità e la manutenibilità.
4. **Evita di restituire riferimenti o puntatori a variabili locali**.
5. **Considera l'uso di strutture o tuple** per restituire più valori.
6. **Documenta chiaramente il significato del valore di ritorno**.
7. **Gestisci i casi di errore** in modo appropriato (eccezioni, codici di errore, ecc.).

## Conclusione

I parametri e i valori di ritorno sono strumenti potenti per la comunicazione tra diverse parti di un programma C++. La scelta del tipo di parametro e del valore di ritorno appropriato può migliorare significativamente l'efficienza, la sicurezza e la leggibilità del codice. Nei prossimi capitoli, esploreremo concetti più avanzati come i prototipi di funzione e i parametri di default.