# Funzioni Pure e Immutabilità in C++

## Introduzione

Nella programmazione funzionale, due concetti fondamentali sono le funzioni pure e l'immutabilità. Questi principi aiutano a creare codice più prevedibile, testabile e manutenibile. In questa lezione, esploreremo come implementare questi concetti in C++.

## Funzioni Pure

### Definizione

Una funzione pura è una funzione che:

1. Dato lo stesso input, restituisce sempre lo stesso output (determinismo)
2. Non ha effetti collaterali (side effects)
3. Non modifica lo stato globale o variabili esterne

### Esempi di Funzioni Pure

```cpp
// Funzione pura: restituisce sempre lo stesso risultato per lo stesso input
// e non ha effetti collaterali
int somma(int a, int b) {
    return a + b;
}

// Funzione pura: calcola il quadrato di un numero
int quadrato(int n) {
    return n * n;
}
```

### Esempi di Funzioni Non Pure

```cpp
// Variabile globale
int contatore = 0;

// Funzione non pura: modifica una variabile globale (effetto collaterale)
int incrementaContatore() {
    return ++contatore; // Modifica lo stato globale
}

// Funzione non pura: dipende da uno stato esterno che può cambiare
int getRandomNumber() {
    return rand(); // Dipende dallo stato del generatore di numeri casuali
}

// Funzione non pura: modifica il parametro di input
void raddoppia(int& n) {
    n *= 2; // Modifica il parametro passato per riferimento
}
```

## Vantaggi delle Funzioni Pure

1. **Testabilità**: Le funzioni pure sono facili da testare perché il loro comportamento dipende solo dagli input.
2. **Manutenibilità**: Il codice è più facile da comprendere e modificare.
3. **Parallelizzazione**: Le funzioni pure possono essere eseguite in parallelo senza rischi di race condition.
4. **Memoization**: I risultati possono essere memorizzati nella cache per migliorare le prestazioni.
5. **Ragionamento**: È più facile ragionare sul comportamento del codice.

## Immutabilità

### Definizione

L'immutabilità è il principio secondo cui, una volta creato, un oggetto o un valore non può essere modificato. Invece di modificare i dati esistenti, si creano nuove copie con le modifiche desiderate.

### Implementazione dell'Immutabilità in C++

#### Utilizzo di `const`

```cpp
// Dichiarazione di variabili immutabili
const int x = 5;
const std::string nome = "Mario";

// Parametri di funzione immutabili
void stampaInfo(const std::string& nome, const int età) {
    // nome ed età non possono essere modificati all'interno della funzione
    std::cout << "Nome: " << nome << ", Età: " << età << std::endl;
}

// Metodi che non modificano lo stato dell'oggetto
class Persona {
private:
    std::string nome;
    int età;

public:
    Persona(std::string n, int e) : nome(n), età(e) {}
    
    // Metodo const: garantisce che non modificherà lo stato dell'oggetto
    std::string getNome() const {
        return nome;
    }
    
    int getEtà() const {
        return età;
    }
};
```

#### Creazione di Nuovi Oggetti Invece di Modificare Quelli Esistenti

```cpp
// Approccio immutabile: restituisce un nuovo oggetto con la modifica
Persona festeggiaBirthday(const Persona& p) {
    // Crea una nuova Persona con età incrementata
    return Persona(p.getNome(), p.getEtà() + 1);
}

// Utilizzo
Persona mario("Mario", 30);
Persona marioDopoCompleanno = festeggiaBirthday(mario);
// mario rimane invariato, marioDopoCompleanno ha età = 31
```

#### Utilizzo di Strutture Dati Immutabili

C++ non fornisce strutture dati immutabili integrate come altri linguaggi funzionali, ma possiamo crearle o utilizzare librerie esterne.

```cpp
// Esempio di classe immutabile per una lista
template<typename T>
class ImmutableList {
private:
    std::shared_ptr<const std::vector<T>> data;

public:
    ImmutableList() : data(std::make_shared<const std::vector<T>>()) {}
    
    explicit ImmutableList(std::shared_ptr<const std::vector<T>> d) : data(d) {}
    
    // Aggiunge un elemento restituendo una nuova lista
    ImmutableList<T> aggiungi(const T& valore) const {
        auto nuovoData = std::make_shared<std::vector<T>>(*data);
        nuovoData->push_back(valore);
        return ImmutableList<T>(std::const_pointer_cast<const std::vector<T>>(nuovoData));
    }
    
    // Accesso in sola lettura agli elementi
    const T& at(size_t indice) const {
        return data->at(indice);
    }
    
    size_t size() const {
        return data->size();
    }
};

// Utilizzo
ImmutableList<int> lista;
ImmutableList<int> nuovaLista = lista.aggiungi(1).aggiungi(2).aggiungi(3);
// lista rimane vuota, nuovaLista contiene [1, 2, 3]
```

## Vantaggi dell'Immutabilità

1. **Sicurezza**: Riduce gli errori dovuti a modifiche indesiderate dei dati.
2. **Concorrenza**: Facilita la programmazione concorrente eliminando i problemi di race condition.
3. **Debugging**: Semplifica il debug poiché lo stato non cambia in modo imprevisto.
4. **Ragionamento**: Rende più facile ragionare sul comportamento del codice.

## Sfide nell'Implementazione

1. **Prestazioni**: La creazione di nuovi oggetti invece di modificare quelli esistenti può avere un impatto sulle prestazioni.
2. **Overhead di memoria**: L'immutabilità può richiedere più memoria per memorizzare copie multiple di oggetti simili.
3. **Compatibilità**: Alcune librerie e framework C++ sono progettati con un approccio mutabile in mente.

## Tecniche per Migliorare l'Efficienza

1. **Copy-on-Write**: Condividere i dati immutabili fino a quando non è necessaria una modifica.
2. **Strutture Dati Persistenti**: Utilizzare strutture dati che condividono parti non modificate.
3. **Move Semantics**: Utilizzare la semantica di spostamento di C++11 per ridurre le copie.

```cpp
// Esempio di move semantics per migliorare l'efficienza
ImmutableList<T> aggiungi(T&& valore) const {
    auto nuovoData = std::make_shared<std::vector<T>>(*data);
    nuovoData->push_back(std::forward<T>(valore));
    return ImmutableList<T>(std::const_pointer_cast<const std::vector<T>>(nuovoData));
}
```

## Combinare Funzioni Pure e Immutabilità

La combinazione di funzioni pure e immutabilità è particolarmente potente:

```cpp
// Funzione pura che opera su dati immutabili
ImmutableList<int> filtraPari(const ImmutableList<int>& lista) {
    ImmutableList<int> risultato;
    
    for (size_t i = 0; i < lista.size(); ++i) {
        if (lista.at(i) % 2 == 0) {
            risultato = risultato.aggiungi(lista.at(i));
        }
    }
    
    return risultato;
}

// Utilizzo
ImmutableList<int> numeri = ImmutableList<int>().aggiungi(1).aggiungi(2).aggiungi(3).aggiungi(4);
ImmutableList<int> numeriPari = filtraPari(numeri);
// numeri rimane [1, 2, 3, 4], numeriPari contiene [2, 4]
```

## Esercizi Proposti

1. Implementa una funzione pura `sommaQuadrati` che calcola la somma dei quadrati di una lista di numeri.
2. Crea una classe immutabile `Punto2D` con coordinate x e y, e metodi per spostare il punto in una nuova posizione.
3. Implementa una funzione pura `filtra` che accetta una lista immutabile e una funzione di predicato, restituendo una nuova lista con gli elementi che soddisfano il predicato.
4. Scrivi una classe `ImmutableStack<T>` con operazioni `push` e `pop` che restituiscono nuove istanze dello stack.
5. Converti una funzione non pura in una funzione pura e spiega i cambiamenti necessari.

## Domande di Autovalutazione

1. Quali sono le caratteristiche di una funzione pura?
2. Perché l'immutabilità è importante nella programmazione funzionale?
3. Come può C++ supportare l'immutabilità nonostante sia un linguaggio che permette la mutabilità?
4. Quali sono i compromessi tra immutabilità e prestazioni?
5. Come possono le funzioni pure e l'immutabilità migliorare la qualità del codice in un'applicazione C++ reale?

## Conclusione

Le funzioni pure e l'immutabilità sono concetti potenti della programmazione funzionale che possono essere applicati in C++ per migliorare la qualità del codice. Sebbene C++ non sia un linguaggio funzionale puro, offre strumenti come `const`, reference semantics e smart pointers che permettono di implementare questi principi. Adottando questi concetti, è possibile scrivere codice più robusto, testabile e manutenibile, anche in un contesto di programmazione orientata agli oggetti o procedurale.

Nella prossima lezione, esploreremo i funzionali nella Standard Template Library (STL) e come possono essere utilizzati per scrivere codice più espressivo e funzionale.