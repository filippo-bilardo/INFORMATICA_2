# Istruzioni switch-case in C++

In questa guida, esploreremo l'istruzione `switch-case` in C++, un costrutto di controllo del flusso che offre un'alternativa alle catene di istruzioni `if-else if` quando si devono confrontare una variabile con più valori costanti.

## Cos'è l'Istruzione switch-case?

L'istruzione `switch-case` è un costrutto di controllo del flusso che permette di selezionare uno tra molti blocchi di codice da eseguire in base al valore di un'espressione. È particolarmente utile quando si deve confrontare una singola variabile con diversi valori costanti.

## Sintassi

```cpp
switch (espressione) {
    case costante1:
        // Codice da eseguire se espressione == costante1
        break;
    case costante2:
        // Codice da eseguire se espressione == costante2
        break;
    case costante3:
        // Codice da eseguire se espressione == costante3
        break;
    // ... altri casi ...
    default:
        // Codice da eseguire se nessun caso corrisponde
        break;
}
```

Dove:
- `espressione` è la variabile o l'espressione da valutare
- `costante1`, `costante2`, ecc. sono i valori costanti da confrontare con l'espressione
- `default` è un caso opzionale che viene eseguito se nessun altro caso corrisponde
- `break` è un'istruzione che termina l'esecuzione dello switch

## Esempio Base

```cpp
#include <iostream>
using namespace std;

int main() {
    int giorno = 3;
    
    switch (giorno) {
        case 1:
            cout << "Lunedì" << endl;
            break;
        case 2:
            cout << "Martedì" << endl;
            break;
        case 3:
            cout << "Mercoledì" << endl;
            break;
        case 4:
            cout << "Giovedì" << endl;
            break;
        case 5:
            cout << "Venerdì" << endl;
            break;
        case 6:
            cout << "Sabato" << endl;
            break;
        case 7:
            cout << "Domenica" << endl;
            break;
        default:
            cout << "Giorno non valido" << endl;
            break;
    }
    
    return 0;
}
```

In questo esempio, poiché `giorno` è 3, verrà stampato "Mercoledì".

## Caratteristiche Importanti

### L'Istruzione break

L'istruzione `break` è cruciale in uno `switch`. Essa termina l'esecuzione dello `switch` e fa continuare il programma con l'istruzione successiva allo `switch`. Se omessa, l'esecuzione "cade" (fall-through) nel caso successivo.

```cpp
#include <iostream>
using namespace std;

int main() {
    int opzione = 2;
    
    switch (opzione) {
        case 1:
            cout << "Opzione 1 selezionata" << endl;
            // Manca il break, quindi l'esecuzione continua nel caso 2
        case 2:
            cout << "Opzione 2 selezionata" << endl;
            break;
        case 3:
            cout << "Opzione 3 selezionata" << endl;
            break;
    }
    
    return 0;
}
```

In questo esempio, verrà stampato solo "Opzione 2 selezionata" perché c'è un `break` dopo il caso 2.

### Fall-Through Intenzionale

A volte, il fall-through può essere utilizzato intenzionalmente quando si desidera che più casi eseguano lo stesso codice:

```cpp
#include <iostream>
using namespace std;

int main() {
    char voto = 'B';
    
    switch (voto) {
        case 'A':
        case 'B':
        case 'C':
            cout << "Promosso!" << endl;
            break;
        case 'D':
        case 'F':
            cout << "Bocciato!" << endl;
            break;
        default:
            cout << "Voto non valido" << endl;
            break;
    }
    
    return 0;
}
```

In questo esempio, i casi 'A', 'B' e 'C' eseguono tutti lo stesso codice grazie al fall-through intenzionale.

### Il Caso default

Il caso `default` è opzionale e viene eseguito quando nessun altro caso corrisponde al valore dell'espressione. È una buona pratica includerlo per gestire valori imprevisti.

```cpp
#include <iostream>
using namespace std;

int main() {
    int scelta = 5;
    
    switch (scelta) {
        case 1:
            cout << "Hai scelto l'opzione 1" << endl;
            break;
        case 2:
            cout << "Hai scelto l'opzione 2" << endl;
            break;
        case 3:
            cout << "Hai scelto l'opzione 3" << endl;
            break;
        default:
            cout << "Scelta non valida. Scegli un numero tra 1 e 3." << endl;
            break;
    }
    
    return 0;
}
```

## Tipi di Dati Supportati

In C++, l'espressione in uno `switch` deve essere di tipo integrale (int, char, enum) o di una classe con un operatore di conversione a un tipo integrale. I tipi a virgola mobile (float, double) e le stringhe non possono essere utilizzati direttamente.

```cpp
#include <iostream>
using namespace std;

enum Colore { ROSSO, VERDE, BLU };

int main() {
    Colore colore = VERDE;
    
    switch (colore) {
        case ROSSO:
            cout << "Hai scelto il rosso" << endl;
            break;
        case VERDE:
            cout << "Hai scelto il verde" << endl;
            break;
        case BLU:
            cout << "Hai scelto il blu" << endl;
            break;
    }
    
    return 0;
}
```

## Confronto con if-else if

Lo `switch-case` è spesso più leggibile e potenzialmente più efficiente di una lunga catena di `if-else if` quando si confronta una singola variabile con molti valori costanti.

### Esempio con switch-case

```cpp
switch (mese) {
    case 1: cout << "Gennaio" << endl; break;
    case 2: cout << "Febbraio" << endl; break;
    case 3: cout << "Marzo" << endl; break;
    // ... altri mesi ...
    default: cout << "Mese non valido" << endl; break;
}
```

### Equivalente con if-else if

```cpp
if (mese == 1) {
    cout << "Gennaio" << endl;
} else if (mese == 2) {
    cout << "Febbraio" << endl;
} else if (mese == 3) {
    cout << "Marzo" << endl;
}
// ... altri mesi ...
else {
    cout << "Mese non valido" << endl;
}
```

## Limitazioni dello switch-case

1. **Tipi di dati limitati**: Come menzionato, lo `switch` supporta solo tipi integrali.
2. **Solo confronti di uguaglianza**: Non è possibile utilizzare operatori di confronto come `<`, `>`, `<=`, `>=`.
3. **Solo costanti nei casi**: I valori nei `case` devono essere costanti note a tempo di compilazione.

## Best Practices

1. **Usa sempre break**: A meno che non si intenda utilizzare il fall-through intenzionalmente, includi sempre un'istruzione `break` alla fine di ogni caso.
2. **Includi un caso default**: È una buona pratica includere sempre un caso `default` per gestire valori imprevisti.
3. **Considera le alternative**: Per confronti complessi o non di uguaglianza, usa `if-else if` invece di `switch`.
4. **Commenta i fall-through intenzionali**: Se utilizzi il fall-through intenzionalmente, commentalo per chiarire che non è un errore.

## Esempi Pratici

### Esempio 1: Calcolatrice Semplice

```cpp
#include <iostream>
using namespace std;

int main() {
    double num1, num2;
    char operatore;
    
    cout << "Inserisci due numeri: ";
    cin >> num1 >> num2;
    
    cout << "Inserisci un operatore (+, -, *, /): ";
    cin >> operatore;
    
    switch (operatore) {
        case '+':
            cout << num1 << " + " << num2 << " = " << num1 + num2 << endl;
            break;
        case '-':
            cout << num1 << " - " << num2 << " = " << num1 - num2 << endl;
            break;
        case '*':
            cout << num1 << " * " << num2 << " = " << num1 * num2 << endl;
            break;
        case '/':
            if (num2 != 0) {
                cout << num1 << " / " << num2 << " = " << num1 / num2 << endl;
            } else {
                cout << "Errore: Divisione per zero!" << endl;
            }
            break;
        default:
            cout << "Operatore non valido" << endl;
            break;
    }
    
    return 0;
}
```

### Esempio 2: Menu di un Programma

```cpp
#include <iostream>
using namespace std;

int main() {
    int scelta;
    bool esci = false;
    
    while (!esci) {
        cout << "\nMenu:\n";
        cout << "1. Visualizza dati\n";
        cout << "2. Aggiungi nuovo elemento\n";
        cout << "3. Modifica elemento esistente\n";
        cout << "4. Elimina elemento\n";
        cout << "5. Esci\n";
        cout << "Inserisci la tua scelta: ";
        cin >> scelta;
        
        switch (scelta) {
            case 1:
                cout << "Visualizzazione dati..." << endl;
                break;
            case 2:
                cout << "Aggiunta nuovo elemento..." << endl;
                break;
            case 3:
                cout << "Modifica elemento esistente..." << endl;
                break;
            case 4:
                cout << "Eliminazione elemento..." << endl;
                break;
            case 5:
                cout << "Uscita dal programma..." << endl;
                esci = true;
                break;
            default:
                cout << "Scelta non valida. Riprova." << endl;
                break;
        }
    }
    
    return 0;
}
```

## Domande di Autovalutazione

1. Quali tipi di dati possono essere utilizzati nell'espressione di uno `switch` in C++?
2. Qual è lo scopo dell'istruzione `break` in uno `switch-case`? Cosa succede se viene omessa?
3. Quando è preferibile utilizzare uno `switch-case` rispetto a una catena di `if-else if`?
4. Cosa fa il caso `default` in uno `switch` e perché è importante includerlo?
5. Quali sono le limitazioni principali dello `switch-case` in C++?

## Esercizi Proposti

1. Scrivi un programma che utilizzi uno `switch-case` per convertire un numero da 1 a 7 nel corrispondente giorno della settimana.
2. Implementa una calcolatrice che utilizzi uno `switch-case` per eseguire operazioni aritmetiche di base (+, -, *, /) su due numeri inseriti dall'utente.
3. Crea un programma che utilizzi uno `switch-case` per determinare il numero di giorni in un mese, considerando anche gli anni bisestili per febbraio.
4. Scrivi un programma che utilizzi uno `switch-case` con fall-through intenzionale per classificare i voti (A, B, C, D, F) in categorie (eccellente, buono, sufficiente, insufficiente).
5. Implementa un menu interattivo per un'applicazione utilizzando uno `switch-case` che permetta all'utente di selezionare diverse opzioni e di uscire dal programma.