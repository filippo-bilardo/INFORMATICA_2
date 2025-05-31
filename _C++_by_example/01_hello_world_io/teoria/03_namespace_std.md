# Namespace `std`

In questa guida, esploreremo il concetto di namespace in C++ con particolare attenzione al namespace `std`, che è fondamentale per l'utilizzo della libreria standard.

## Cosa sono i Namespace

I namespace sono contenitori che permettono di raggruppare entità come classi, oggetti e funzioni sotto un nome. Servono principalmente a:

- Evitare conflitti di nomi (collisioni) tra diverse parti di codice
- Organizzare il codice in modo logico e modulare
- Rendere il codice più leggibile e manutenibile

## Il Namespace `std`

Il namespace `std` (abbreviazione di "standard") contiene tutte le entità della libreria standard di C++. Questo include:

- Oggetti di I/O come `cout`, `cin`, `cerr`
- Contenitori come `vector`, `map`, `list`
- Algoritmi come `sort`, `find`, `count`
- Classi di utilità come `string`, `pair`, `tuple`

## Accesso agli Elementi di un Namespace

Esistono tre modi principali per accedere agli elementi di un namespace:

### 1. Qualificazione Esplicita

Si utilizza l'operatore di risoluzione di scope `::` per specificare il namespace:

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```

Questo approccio è considerato il più sicuro perché rende esplicito da dove proviene ogni identificatore.

### 2. Dichiarazione `using`

Si può dichiarare l'utilizzo di specifici elementi di un namespace:

```cpp
#include <iostream>
using std::cout;
using std::endl;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
```

Questo approccio è un compromesso che evita la qualificazione ripetitiva ma limita il rischio di collisioni.

### 3. Direttiva `using namespace`

Si può importare l'intero namespace:

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
```

Questo approccio è il più conveniente ma aumenta il rischio di collisioni di nomi, specialmente in progetti grandi.

## Vantaggi e Svantaggi dei Diversi Approcci

### Qualificazione Esplicita (`std::`)

**Vantaggi:**
- Massima chiarezza su quale namespace viene utilizzato
- Nessun rischio di collisioni di nomi
- Codice più manutenibile a lungo termine

**Svantaggi:**
- Codice più verboso
- Può rendere le linee di codice più lunghe

### Dichiarazione `using` (per elementi specifici)

**Vantaggi:**
- Riduce la verbosità per gli elementi utilizzati frequentemente
- Rischio limitato di collisioni (solo per gli elementi dichiarati)

**Svantaggi:**
- Può causare confusione se non è chiaro da dove proviene un identificatore
- Richiede una dichiarazione per ogni elemento

### Direttiva `using namespace`

**Vantaggi:**
- Massima convenienza e codice più conciso
- Utile per script brevi o esempi didattici

**Svantaggi:**
- Alto rischio di collisioni di nomi
- Può rendere difficile capire da dove proviene un identificatore
- Sconsigliato in progetti grandi o in header files

## Best Practices

1. **In File Header (.h)**: Evita sempre `using namespace` per prevenire effetti collaterali quando il file viene incluso.
2. **In File di Implementazione (.cpp)**: Usa la qualificazione esplicita o dichiarazioni `using` limitate.
3. **In Funzioni Locali**: Puoi usare `using namespace` all'interno di funzioni per limitarne lo scope.
4. **In Progetti Grandi**: Preferisci la qualificazione esplicita o dichiarazioni `using` mirate.
5. **In Esempi Didattici**: `using namespace std` è accettabile per brevità.

## Creazione di Namespace Personalizzati

Puoi creare i tuoi namespace per organizzare il codice:

```cpp
namespace MioProgetto {
    void funzione() {
        std::cout << "Funzione nel namespace MioProgetto" << std::endl;
    }
    
    namespace Utilita {
        void altraFunzione() {
            std::cout << "Funzione nel namespace annidato" << std::endl;
        }
    }
}

// Utilizzo
MioProgetto::funzione();
MioProgetto::Utilita::altraFunzione();
```

## Domande di Autovalutazione

1. Qual è lo scopo principale dei namespace in C++?
2. Quali sono i tre modi principali per accedere agli elementi di un namespace?
3. Perché è sconsigliato usare `using namespace std` in file header?
4. In quali situazioni è accettabile usare `using namespace std`?

## Esercizi Proposti

1. Scrivi un programma che utilizzi elementi del namespace `std` con i tre diversi approcci di accesso.
2. Crea un namespace personalizzato con alcune funzioni e utilizzalo in un programma.
3. Modifica un programma esistente che usa `using namespace std` per utilizzare invece la qualificazione esplicita.
4. Scrivi un programma che dimostri una collisione di nomi e risolvi il problema usando i namespace.