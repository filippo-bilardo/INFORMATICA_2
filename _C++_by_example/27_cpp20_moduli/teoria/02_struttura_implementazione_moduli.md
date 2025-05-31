# Struttura e Implementazione dei Moduli in C++20

## Struttura di un Modulo

I moduli in C++20 possono essere organizzati in diverse unità logiche che collaborano tra loro. Comprendere questa struttura è fondamentale per sfruttare appieno il potenziale dei moduli.

### Unità di Interfaccia del Modulo

L'unità di interfaccia del modulo (Module Interface Unit o MIU) definisce l'interfaccia pubblica del modulo, ovvero ciò che viene esportato e reso disponibile agli utenti del modulo. Convenzionalmente, questi file hanno estensione `.ixx`, `.cppm` o `.mpp`, anche se lo standard C++20 non impone alcuna convenzione specifica.

```cpp
// matematica.ixx - Unità di interfaccia del modulo
export module matematica;

// Dichiarazioni esportate
export double quadrato(double x);
export double cubo(double x);
```

### Unità di Implementazione del Modulo

L'unità di implementazione del modulo (Module Implementation Unit o MIU) contiene l'implementazione delle funzionalità dichiarate nell'interfaccia. Queste unità non esportano nulla direttamente, ma contribuiscono alla definizione complessiva del modulo.

```cpp
// matematica_impl.cpp - Unità di implementazione del modulo
module matematica;

// Implementazione delle funzioni dichiarate nell'interfaccia
double quadrato(double x) {
    return x * x;
}

double cubo(double x) {
    return x * x * x;
}
```

### Unità di Partizione del Modulo

Per moduli più complessi, è possibile suddividere il codice in partizioni. Ogni partizione è parte del modulo principale ma può essere sviluppata e compilata separatamente.

```cpp
// matematica-base.ixx - Partizione del modulo
export module matematica:base;

export {
    double somma(double a, double b) {
        return a + b;
    }
    
    double sottrazione(double a, double b) {
        return a - b;
    }
}
```

```cpp
// matematica-avanzata.ixx - Un'altra partizione
export module matematica:avanzata;

export {
    double potenza(double base, int esponente) {
        double risultato = 1.0;
        for (int i = 0; i < esponente; ++i) {
            risultato *= base;
        }
        return risultato;
    }
}
```

```cpp
// matematica.ixx - Interfaccia principale che aggrega le partizioni
export module matematica;

export import :base;        // Importa ed esporta la partizione base
export import :avanzata;    // Importa ed esporta la partizione avanzata
```

## Implementazione Pratica dei Moduli

### Separazione di Interfaccia e Implementazione

Una delle pratiche consigliate è separare l'interfaccia dall'implementazione, simile al pattern header/source tradizionale ma con i vantaggi dei moduli.

**Interfaccia (geometria.ixx):**

```cpp
export module geometria;

export namespace geometria {
    class Cerchio {
    private:
        double raggio;
        
    public:
        Cerchio(double r);
        double area() const;
        double circonferenza() const;
    };
}
```

**Implementazione (geometria.cpp):**

```cpp
module geometria;

#include <cmath>

namespace geometria {
    Cerchio::Cerchio(double r) : raggio(r) {}
    
    double Cerchio::area() const {
        return M_PI * raggio * raggio;
    }
    
    double Cerchio::circonferenza() const {
        return 2 * M_PI * raggio;
    }
}
```

### Importazione di Librerie Standard

C++20 permette di importare anche le librerie standard come moduli, migliorando ulteriormente i tempi di compilazione:

```cpp
import <iostream>;  // Importa la libreria iostream come modulo
import <vector>;    // Importa la libreria vector come modulo
import <algorithm>; // Importa la libreria algorithm come modulo

int main() {
    std::vector<int> v = {5, 2, 8, 1, 3};
    std::sort(v.begin(), v.end());
    
    for (int n : v) {
        std::cout << n << " ";
    }
    
    return 0;
}
```

### Moduli e Visibilità

I moduli offrono un controllo preciso sulla visibilità dei simboli:

```cpp
export module mio_modulo;

// Visibile solo all'interno del modulo
namespace dettagli {
    void funzione_interna() {
        // implementazione...
    }
}

// Esportata e visibile agli utenti del modulo
export void funzione_pubblica() {
    // Può utilizzare funzionalità interne
    dettagli::funzione_interna();
    // Resto dell'implementazione...
}
```

## Compilazione e Linking dei Moduli

La compilazione dei moduli richiede un supporto specifico da parte del compilatore e del sistema di build. Ecco un esempio di come potrebbe essere compilato un programma basato su moduli con GCC o Clang:

```bash
# Compila l'interfaccia del modulo
g++ -std=c++20 -c -xc++-module matematica.ixx -o matematica.pcm

# Compila l'implementazione del modulo
g++ -std=c++20 -c matematica_impl.cpp -fmodule-file=matematica.pcm -o matematica_impl.o

# Compila il programma principale
g++ -std=c++20 -c main.cpp -fmodule-file=matematica.pcm -o main.o

# Link finale
g++ matematica_impl.o main.o -o programma
```

I dettagli esatti possono variare a seconda del compilatore e della versione utilizzata.

## Interoperabilità con Codice Tradizionale

I moduli C++20 sono progettati per coesistere con il codice C++ tradizionale basato su header. È possibile:

1. **Importare header tradizionali in un modulo**:

```cpp
export module mio_modulo;

// Importa un header tradizionale
#include <vector>

export {
    std::vector<int> crea_sequenza(int n);
}
```

2. **Creare moduli che incapsulano librerie basate su header**:

```cpp
// wrapper_boost.ixx
export module boost_wrapper;

#include <boost/algorithm/string.hpp>

export namespace boost_wrapper {
    using namespace boost::algorithm;
    
    // Esporta funzionalità selezionate di Boost
    export std::string to_upper(const std::string& s) {
        std::string result = s;
        to_upper(result);
        return result;
    }
}
```

## Domande di Autovalutazione

1. Quali sono le differenti unità che possono comporre un modulo C++20?
2. Come si implementa la separazione tra interfaccia e implementazione nei moduli?
3. Come funzionano le partizioni dei moduli e quando è utile utilizzarle?
4. Come si possono importare le librerie standard come moduli?
5. Come si gestisce l'interoperabilità tra moduli e codice basato su header tradizionali?

## Esercizi Proposti

1. Crea un modulo con interfaccia e implementazione separate per una classe `Vettore3D` che rappresenta un vettore tridimensionale.
2. Implementa un modulo complesso utilizzando le partizioni per separare diverse funzionalità (ad esempio, un modulo di utilità con partizioni per operazioni su stringhe, operazioni matematiche, ecc.).
3. Crea un modulo wrapper che incapsula una libreria esterna basata su header tradizionali.
4. Implementa un programma che utilizza sia moduli C++20 che header tradizionali, dimostrando l'interoperabilità tra i due approcci.
5. Modifica un progetto esistente per utilizzare i moduli della libreria standard invece degli header tradizionali, e confronta i tempi di compilazione.