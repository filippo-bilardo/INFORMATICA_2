# La Libreria `iostream` e l'Input/Output

La libreria `iostream` è una parte fondamentale della Standard Library di C++ che fornisce funzionalità per l'input e l'output (I/O) dei dati.

## Introduzione a `iostream`

La libreria `iostream` definisce diversi oggetti stream che permettono di leggere dati in input e scrivere dati in output:

- `cin`: Stream di input standard (tastiera)
- `cout`: Stream di output standard (console)
- `cerr`: Stream di output standard per errori (non bufferizzato)
- `clog`: Stream di output standard per log (bufferizzato)

Per utilizzare questi oggetti, è necessario includere la libreria all'inizio del programma:

```cpp
#include <iostream>
```

## Output con `cout`

`cout` (Console OUTput) è l'oggetto utilizzato per inviare dati alla console. Si utilizza con l'operatore di inserimento `<<`:

```cpp
std::cout << "Hello, World!" << std::endl;
```

È possibile concatenare più operazioni di output in una singola istruzione:

```cpp
std::cout << "Il valore è: " << 42 << std::endl;
```

### Manipolatori di Output

I manipolatori sono funzioni speciali che modificano il comportamento dello stream. Alcuni esempi comuni:

- `std::endl`: Inserisce un carattere di nuova linea e svuota il buffer
- `std::setw(n)`: Imposta la larghezza del campo (richiede `<iomanip>`)
- `std::setprecision(n)`: Imposta la precisione per i numeri in virgola mobile (richiede `<iomanip>`)

```cpp
#include <iostream>
#include <iomanip>

int main() {
    double pi = 3.14159265358979;
    std::cout << "Pi con 2 decimali: " << std::fixed << std::setprecision(2) << pi << std::endl;
    return 0;
}
```

## Input con `cin`

`cin` (Console INput) è l'oggetto utilizzato per leggere dati dalla tastiera. Si utilizza con l'operatore di estrazione `>>`:

```cpp
int numero;
std::cout << "Inserisci un numero: ";
std::cin >> numero;
std::cout << "Hai inserito: " << numero << std::endl;
```

### Lettura di Diversi Tipi di Dati

`cin` può leggere diversi tipi di dati in sequenza:

```cpp
int a;
double b;
char c;

std::cout << "Inserisci un intero, un numero decimale e un carattere: ";
std::cin >> a >> b >> c;
```

### Gestione degli Errori di Input

Quando `cin` non riesce a convertire l'input nel tipo richiesto, entra in uno stato di errore. È possibile verificare e gestire questo stato:

```cpp
int numero;
std::cout << "Inserisci un numero: ";
std::cin >> numero;

if (std::cin.fail()) {
    std::cout << "Input non valido!" << std::endl;
    std::cin.clear();  // Resetta lo stato di errore
    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');  // Svuota il buffer
}
```

## Lettura di Stringhe e Linee

Per leggere una singola parola:

```cpp
std::string parola;
std::cin >> parola;  // Legge fino al primo spazio
```

Per leggere un'intera linea (inclusi gli spazi):

```cpp
std::string linea;
std::getline(std::cin, linea);  // Legge fino al carattere di nuova linea
```

## Best Practices

1. **Controllo degli Errori**: Verifica sempre lo stato di `cin` dopo le operazioni di input.
2. **Pulizia del Buffer**: Dopo un errore di input, pulisci sempre il buffer con `cin.clear()` e `cin.ignore()`.
3. **Prompt Chiari**: Fornisci sempre istruzioni chiare all'utente su cosa inserire.
4. **Validazione dell'Input**: Verifica sempre che l'input dell'utente sia valido prima di utilizzarlo.

## Domande di Autovalutazione

1. Qual è la differenza tra `cout` e `cerr`?
2. Come si legge un'intera linea di testo con gli spazi in C++?
3. Cosa succede quando `cin` non riesce a convertire l'input nel tipo richiesto?
4. Come si può formattare l'output di numeri in virgola mobile con una precisione specifica?

## Esercizi Proposti

1. Scrivi un programma che chieda all'utente di inserire il suo nome e cognome e poi li stampi in ordine inverso.
2. Crea un programma che legga tre numeri dall'utente e calcoli la loro media, gestendo correttamente eventuali input non validi.
3. Implementa un semplice calcolatore che chieda all'utente due numeri e un'operazione (+, -, *, /) e mostri il risultato.
4. Scrivi un programma che formatti e stampi una tabella di valori con larghezze di colonna fisse.