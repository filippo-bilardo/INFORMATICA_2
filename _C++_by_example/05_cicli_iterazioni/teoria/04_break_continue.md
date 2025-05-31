# Istruzioni break e continue in C++

In questa guida, esploreremo le istruzioni `break` e `continue` in C++, strumenti fondamentali per controllare il flusso di esecuzione all'interno dei cicli.

## Istruzione break

L'istruzione `break` viene utilizzata per terminare immediatamente un ciclo (`for`, `while`, `do-while`) o un'istruzione `switch`, trasferendo il controllo all'istruzione che segue il ciclo o lo switch.

### Sintassi

```cpp
break;
```

### Utilizzo nei Cicli

```cpp
#include <iostream>

int main() {
    for (int i = 1; i <= 10; i++) {
        if (i == 6) {
            std::cout << "Interruzione del ciclo a i = " << i << std::endl;
            break; // Esce dal ciclo quando i è 6
        }
        std::cout << "i = " << i << std::endl;
    }
    
    std::cout << "Ciclo terminato!" << std::endl;
    return 0;
}
```

Output:
```
i = 1
i = 2
i = 3
i = 4
i = 5
Interruzione del ciclo a i = 6
Ciclo terminato!
```

### Utilizzo in Cicli Annidati

L'istruzione `break` interrompe solo il ciclo più interno in cui si trova:

```cpp
#include <iostream>

int main() {
    for (int i = 1; i <= 3; i++) {
        std::cout << "Ciclo esterno: i = " << i << std::endl;
        
        for (int j = 1; j <= 3; j++) {
            if (j == 2) {
                std::cout << "  Break del ciclo interno a j = " << j << std::endl;
                break; // Esce solo dal ciclo interno
            }
            std::cout << "  Ciclo interno: j = " << j << std::endl;
        }
    }
    
    return 0;
}
```

Output:
```
Ciclo esterno: i = 1
  Ciclo interno: j = 1
  Break del ciclo interno a j = 2
Ciclo esterno: i = 2
  Ciclo interno: j = 1
  Break del ciclo interno a j = 2
Ciclo esterno: i = 3
  Ciclo interno: j = 1
  Break del ciclo interno a j = 2
```

### Utilizzo in switch

```cpp
#include <iostream>

int main() {
    int scelta = 2;
    
    switch (scelta) {
        case 1:
            std::cout << "Hai selezionato l'opzione 1" << std::endl;
            break;
        case 2:
            std::cout << "Hai selezionato l'opzione 2" << std::endl;
            break; // Senza questo break, l'esecuzione continuerebbe al case 3
        case 3:
            std::cout << "Hai selezionato l'opzione 3" << std::endl;
            break;
        default:
            std::cout << "Opzione non valida" << std::endl;
    }
    
    return 0;
}
```

## Istruzione continue

L'istruzione `continue` salta il resto del corpo del ciclo per l'iterazione corrente e passa direttamente alla prossima iterazione.

### Sintassi

```cpp
continue;
```

### Utilizzo nei Cicli

```cpp
#include <iostream>

int main() {
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) {
            continue; // Salta il resto del ciclo per i numeri pari
        }
        std::cout << "Numero dispari: " << i << std::endl;
    }
    
    return 0;
}
```

Output:
```
Numero dispari: 1
Numero dispari: 3
Numero dispari: 5
Numero dispari: 7
Numero dispari: 9
```

### Comportamento in Diversi Tipi di Cicli

- In un ciclo `for`, l'istruzione `continue` salta al passaggio di aggiornamento del ciclo.
- In un ciclo `while` o `do-while`, l'istruzione `continue` salta direttamente alla valutazione della condizione.

Esempio con ciclo `while`:

```cpp
#include <iostream>

int main() {
    int i = 0;
    
    while (i < 10) {
        i++;
        
        if (i % 2 == 0) {
            continue; // Salta il resto del ciclo per i numeri pari
        }
        
        std::cout << "Numero dispari: " << i << std::endl;
    }
    
    return 0;
}
```

## Differenze tra break e continue

| Istruzione | Effetto |
|------------|--------|
| `break`    | Termina completamente il ciclo e passa all'istruzione successiva al ciclo |
| `continue` | Salta il resto dell'iterazione corrente e passa alla prossima iterazione |

## Esempi Pratici

### Esempio 1: Ricerca in un array

```cpp
#include <iostream>

int main() {
    int numeri[] = {10, 25, 33, 47, 52, 68, 71};
    int dimensione = sizeof(numeri) / sizeof(numeri[0]);
    int target = 47;
    bool trovato = false;
    
    for (int i = 0; i < dimensione; i++) {
        if (numeri[i] == target) {
            std::cout << "Numero " << target << " trovato all'indice " << i << std::endl;
            trovato = true;
            break; // Termina la ricerca una volta trovato il numero
        }
    }
    
    if (!trovato) {
        std::cout << "Numero " << target << " non trovato nell'array" << std::endl;
    }
    
    return 0;
}
```

### Esempio 2: Filtraggio di numeri

```cpp
#include <iostream>

int main() {
    std::cout << "Numeri da 1 a 20 divisibili per 3:" << std::endl;
    
    for (int i = 1; i <= 20; i++) {
        if (i % 3 != 0) {
            continue; // Salta i numeri non divisibili per 3
        }
        std::cout << i << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### Esempio 3: Elaborazione con condizioni di uscita

```cpp
#include <iostream>

int main() {
    int somma = 0;
    int numero;
    
    std::cout << "Inserisci numeri positivi (numero negativo per terminare):" << std::endl;
    
    while (true) { // Ciclo infinito
        std::cin >> numero;
        
        if (numero < 0) {
            break; // Esce dal ciclo se il numero è negativo
        }
        
        if (numero == 0) {
            std::cout << "Lo zero non viene conteggiato" << std::endl;
            continue; // Salta l'elaborazione per lo zero
        }
        
        somma += numero;
        std::cout << "Somma parziale: " << somma << std::endl;
    }
    
    std::cout << "Somma finale: " << somma << std::endl;
    return 0;
}
```

## Considerazioni Importanti

1. **Leggibilità del Codice**: L'uso eccessivo di `break` e `continue` può rendere il codice difficile da seguire. Usali con moderazione.

2. **Cicli Annidati**: L'istruzione `break` interrompe solo il ciclo più interno in cui si trova. Per uscire da cicli annidati, potresti aver bisogno di flag o approcci alternativi.

3. **Manutenzione del Codice**: In alcuni casi, ristrutturare la logica del ciclo può essere preferibile all'uso di `break` o `continue`.

4. **Prestazioni**: In cicli molto grandi, l'uso strategico di `break` può migliorare le prestazioni evitando iterazioni non necessarie.

## Best Practices

1. **Usa break per Uscite Anticipate**: Utilizza `break` quando hai trovato ciò che stavi cercando e non c'è bisogno di continuare il ciclo.

2. **Usa continue per Filtraggio**: Utilizza `continue` per saltare elementi che non soddisfano determinati criteri.

3. **Evita Cicli Infiniti con break**: Se usi un ciclo infinito (`while(true)`), assicurati di avere una condizione chiara per l'istruzione `break`.

4. **Commenta il Codice**: Quando usi `break` o `continue` in situazioni complesse, aggiungi commenti per spiegare la logica.

5. **Considera Alternative**: In alcuni casi, una condizione più chiara nel ciclo stesso può essere preferibile all'uso di `break` o `continue`.

## Domande di Autovalutazione

1. Qual è la differenza principale tra `break` e `continue`?
2. Cosa succede quando un'istruzione `break` viene eseguita in un ciclo annidato?
3. Come si comporta l'istruzione `continue` in un ciclo `for` rispetto a un ciclo `while`?
4. In quali situazioni è preferibile utilizzare `break` invece di modificare la condizione del ciclo?
5. Come si può uscire da cicli annidati multipli con una singola istruzione?

## Esercizi Proposti

1. Scrivi un programma che utilizzi l'istruzione `break` per trovare il primo numero primo maggiore di un valore inserito dall'utente.

2. Implementa un programma che utilizzi l'istruzione `continue` per stampare tutti i numeri da 1 a 100 che non sono divisibili né per 2 né per 3.

3. Crea un programma che simuli un semplice menu interattivo, utilizzando un ciclo infinito con `break` per uscire quando l'utente seleziona l'opzione di uscita.

4. Scrivi un programma che utilizzi cicli annidati e l'istruzione `break` per trovare tutte le coppie di numeri interi positivi (a, b) tali che a < b ≤ 20 e a² + b² è un numero primo.

5. Implementa un programma che legga una sequenza di numeri dall'utente e utilizzi sia `break` che `continue` per calcolare la somma di tutti i numeri positivi fino a quando viene inserito un numero negativo o la somma supera 100.