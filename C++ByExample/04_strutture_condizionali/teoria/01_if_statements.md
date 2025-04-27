# Istruzioni if, if-else e if-else if in C++

In questa guida, esploreremo le istruzioni condizionali `if`, `if-else` e `if-else if` in C++, che sono fondamentali per controllare il flusso di esecuzione di un programma in base a determinate condizioni.

## L'Istruzione if

L'istruzione `if` è la forma più semplice di controllo condizionale. Essa valuta un'espressione booleana e, se questa risulta vera (`true`), esegue un blocco di codice.

### Sintassi

```cpp
if (condizione) {
    // Codice da eseguire se la condizione è vera
}
```

### Esempio

```cpp
#include <iostream>
using namespace std;

int main() {
    int numero = 10;
    
    if (numero > 0) {
        cout << "Il numero è positivo." << endl;
    }
    
    return 0;
}
```

In questo esempio, il messaggio "Il numero è positivo" viene stampato perché la condizione `numero > 0` è vera.

## L'Istruzione if-else

L'istruzione `if-else` estende l'istruzione `if` aggiungendo un blocco di codice alternativo da eseguire quando la condizione è falsa.

### Sintassi

```cpp
if (condizione) {
    // Codice da eseguire se la condizione è vera
} else {
    // Codice da eseguire se la condizione è falsa
}
```

### Esempio

```cpp
#include <iostream>
using namespace std;

int main() {
    int numero = -5;
    
    if (numero >= 0) {
        cout << "Il numero è positivo o zero." << endl;
    } else {
        cout << "Il numero è negativo." << endl;
    }
    
    return 0;
}
```

In questo esempio, poiché `numero` è -5, la condizione `numero >= 0` è falsa, quindi viene eseguito il blocco `else` e viene stampato "Il numero è negativo".

## L'Istruzione if-else if-else

L'istruzione `if-else if-else` permette di verificare multiple condizioni in sequenza.

### Sintassi

```cpp
if (condizione1) {
    // Codice da eseguire se condizione1 è vera
} else if (condizione2) {
    // Codice da eseguire se condizione1 è falsa e condizione2 è vera
} else if (condizione3) {
    // Codice da eseguire se condizione1 e condizione2 sono false e condizione3 è vera
} else {
    // Codice da eseguire se tutte le condizioni precedenti sono false
}
```

### Esempio

```cpp
#include <iostream>
using namespace std;

int main() {
    int voto = 85;
    
    if (voto >= 90) {
        cout << "Eccellente!" << endl;
    } else if (voto >= 80) {
        cout << "Molto buono!" << endl;
    } else if (voto >= 70) {
        cout << "Buono!" << endl;
    } else if (voto >= 60) {
        cout << "Sufficiente!" << endl;
    } else {
        cout << "Insufficiente!" << endl;
    }
    
    return 0;
}
```

In questo esempio, poiché `voto` è 85, viene stampato "Molto buono!" perché la condizione `voto >= 80` è la prima condizione vera incontrata.

## Istruzioni if Annidate

È possibile annidare istruzioni `if` all'interno di altre istruzioni `if` o `else`.

### Esempio

```cpp
#include <iostream>
using namespace std;

int main() {
    int numero = 10;
    bool isEven = (numero % 2 == 0);
    
    if (numero > 0) {
        cout << "Il numero è positivo." << endl;
        
        if (isEven) {
            cout << "Il numero è anche pari." << endl;
        } else {
            cout << "Il numero è dispari." << endl;
        }
    } else {
        cout << "Il numero è negativo o zero." << endl;
    }
    
    return 0;
}
```

In questo esempio, vengono stampati entrambi i messaggi "Il numero è positivo" e "Il numero è anche pari" perché entrambe le condizioni sono vere.

## Istruzioni if Senza Blocchi

Se un'istruzione `if` o `else` contiene una sola istruzione, le parentesi graffe possono essere omesse (anche se è generalmente consigliato includerle per chiarezza e per evitare errori).

### Esempio

```cpp
#include <iostream>
using namespace std;

int main() {
    int numero = 5;
    
    if (numero > 0)
        cout << "Il numero è positivo." << endl;
    else
        cout << "Il numero è negativo o zero." << endl;
    
    return 0;
}
```

## Espressioni Condizionali Complesse

Le condizioni nelle istruzioni `if` possono essere espressioni booleane complesse che utilizzano operatori logici come `&&` (AND), `||` (OR) e `!` (NOT).

### Esempio

```cpp
#include <iostream>
using namespace std;

int main() {
    int eta = 25;
    bool haPatente = true;
    
    if (eta >= 18 && haPatente) {
        cout << "Puoi guidare." << endl;
    } else {
        cout << "Non puoi guidare." << endl;
    }
    
    return 0;
}
```

In questo esempio, il messaggio "Puoi guidare" viene stampato perché entrambe le condizioni `eta >= 18` e `haPatente` sono vere.

## Else pendente
## TODO aggiungere spiegazione ed esempi

## TODO aggiungere if con condizioni multiple e prestare attenzione ai possibili errori

## Best Practices

1. **Usa sempre le parentesi graffe**: Anche per blocchi di una sola istruzione, le parentesi graffe rendono il codice più chiaro e prevengono errori quando si aggiungono altre istruzioni in seguito.

2. **Mantieni le condizioni semplici**: Se una condizione diventa troppo complessa, considera di suddividerla in parti più piccole o di utilizzare variabili booleane intermedie per migliorare la leggibilità.

3. **Evita if-else if-else eccessivamente lunghi**: Se hai molte condizioni, considera l'uso di una struttura `switch-case` o di un design pattern più appropriato.

4. **Attenzione agli errori di confronto**: Assicurati di utilizzare l'operatore di confronto `==` invece dell'operatore di assegnazione `=` nelle condizioni.

5. **Considera l'ordine delle condizioni**: Nelle catene `if-else if`, metti le condizioni più probabili o più semplici da valutare prima, per migliorare l'efficienza.

## Casi Particolari e Insidie

### Confronto con Zero

Quando si verifica se una variabile è zero, è possibile utilizzare direttamente la variabile come condizione (se è un tipo numerico):

```cpp
int numero = 0;

// Entrambe le seguenti condizioni sono equivalenti
if (numero == 0) { /* ... */ }
if (!numero) { /* ... */ }
```

### Confronto con Valori Booleani

Quando si confronta una variabile booleana con `true` o `false`, è più idiomatico utilizzare direttamente la variabile:

```cpp
bool condizione = true;

// Preferisci questo
if (condizione) { /* ... */ }

// Invece di questo
if (condizione == true) { /* ... */ }
```

### Errore Comune: Assegnazione invece di Confronto

Un errore comune è utilizzare l'operatore di assegnazione `=` invece dell'operatore di confronto `==` in una condizione:

```cpp
int x = 5;

// ERRORE: Assegna 10 a x e poi valuta x come condizione (sempre vera se x non è 0)
if (x = 10) {
    cout << "Questa condizione è sempre vera!" << endl;
}

// CORRETTO: Confronta x con 10
if (x == 10) {
    cout << "x è uguale a 10" << endl;
}
```

## Domande di Autovalutazione

1. Qual è la differenza tra un'istruzione `if` e un'istruzione `if-else`?
2. Come funziona una catena di istruzioni `if-else if-else` e in quale ordine vengono valutate le condizioni?
3. Quando è appropriato omettere le parentesi graffe in un'istruzione `if`?
4. Come si possono combinare più condizioni in un'unica istruzione `if` utilizzando operatori logici?
5. Quali sono alcuni errori comuni da evitare quando si utilizzano istruzioni condizionali?

## Esercizi Proposti

1. Scrivi un programma che chieda all'utente di inserire un numero e determini se è positivo, negativo o zero.
2. Implementa un programma che calcoli il massimo tra tre numeri inseriti dall'utente.
3. Crea un semplice calcolatore che accetti due numeri e un operatore (+, -, *, /) e restituisca il risultato dell'operazione corrispondente.
4. Scrivi un programma che determini se un anno inserito dall'utente è bisestile o meno. (Un anno è bisestile se è divisibile per 4, ma non per 100, a meno che non sia anche divisibile per 400).
5. Implementa un programma che converta un voto numerico (0-100) in un voto letterale (A, B, C, D, F) secondo criteri specificati.