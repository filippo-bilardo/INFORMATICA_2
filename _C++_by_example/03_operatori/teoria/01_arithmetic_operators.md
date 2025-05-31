# Operatori Aritmetici in C++

In questa guida, esploreremo gli operatori aritmetici disponibili in C++ e come utilizzarli per eseguire calcoli matematici.

## Operatori Aritmetici di Base

C++ fornisce i seguenti operatori aritmetici di base:

| Operatore | Descrizione | Esempio |
|-----------|-------------|--------|
| `+` | Addizione | `a + b` |
| `-` | Sottrazione | `a - b` |
| `*` | Moltiplicazione | `a * b` |
| `/` | Divisione | `a / b` |
| `%` | Modulo (resto della divisione) | `a % b` |

### Esempi di Utilizzo

```cpp
int a = 10;
int b = 3;

int somma = a + b;      // 13
int differenza = a - b;  // 7
int prodotto = a * b;    // 30
int quoziente = a / b;   // 3 (divisione intera)
int resto = a % b;       // 1 (resto della divisione)
```

## Divisione tra Interi e in Virgola Mobile

È importante notare che la divisione tra due numeri interi produce un risultato intero, troncando la parte decimale:

```cpp
int x = 10;
int y = 3;
int risultato = x / y;  // 3, non 3.33...

// Per ottenere un risultato in virgola mobile, almeno uno degli operandi deve essere in virgola mobile
double risultatoEsatto = x / 3.0;  // 3.33...
// oppure
double risultatoEsatto2 = static_cast<double>(x) / y;  // 3.33...
```

## Operatore Modulo

L'operatore modulo (`%`) restituisce il resto della divisione intera tra due numeri. Funziona solo con operandi interi.

```cpp
int a = 17;
int b = 5;
int resto = a % b;  // 2 (17 = 5 * 3 + 2)
```

Casi particolari:

```cpp
int x = 10 % 2;  // 0 (10 è divisibile per 2)
int y = 10 % 3;  // 1 (10 = 3 * 3 + 1)
```

L'operatore modulo è utile per:
- Verificare se un numero è pari o dispari: `n % 2 == 0` (pari)
- Implementare operazioni cicliche (come un orologio)
- Limitare un valore a un intervallo specifico

## Operatori di Incremento e Decremento

C++ fornisce operatori speciali per incrementare o decrementare una variabile di 1:

| Operatore | Descrizione | Esempio |
|-----------|-------------|--------|
| `++` | Incremento | `++a` o `a++` |
| `--` | Decremento | `--a` o `a--` |

Questi operatori possono essere utilizzati in forma prefissa o postfissa:

### Forma Prefissa

L'operatore viene applicato prima che il valore della variabile venga utilizzato nell'espressione:

```cpp
int a = 5;
int b = ++a;  // a viene incrementato a 6, poi b diventa 6
// Ora a = 6, b = 6
```

### Forma Postfissa

L'operatore viene applicato dopo che il valore della variabile è stato utilizzato nell'espressione:

```cpp
int a = 5;
int b = a++;  // b diventa 5, poi a viene incrementato a 6
// Ora a = 6, b = 5
```

## Operatori Aritmetici Composti

C++ offre operatori composti che combinano un'operazione aritmetica con un'assegnazione:

| Operatore | Equivalente a | Esempio |
|-----------|---------------|--------|
| `+=` | `a = a + b` | `a += b` |
| `-=` | `a = a - b` | `a -= b` |
| `*=` | `a = a * b` | `a *= b` |
| `/=` | `a = a / b` | `a /= b` |
| `%=` | `a = a % b` | `a %= b` |

Esempi:

```cpp
int x = 10;
x += 5;  // x = 15
x -= 3;  // x = 12
x *= 2;  // x = 24
x /= 4;  // x = 6
x %= 4;  // x = 2
```

## Overflow e Underflow

Quando si eseguono operazioni aritmetiche, è importante considerare i limiti dei tipi di dati. Se un risultato supera il range rappresentabile, si verifica un overflow o underflow:

```cpp
#include <iostream>
#include <limits>

int main() {
    int max_int = std::numeric_limits<int>::max();  // Valore massimo per int
    std::cout << "Valore massimo per int: " << max_int << std::endl;
    
    int overflow = max_int + 1;  // Overflow!
    std::cout << "Dopo overflow: " << overflow << std::endl;  // Risultato negativo
    
    return 0;
}
```

## Best Practices

1. **Attenzione alla Divisione per Zero**: La divisione per zero causa un errore a runtime. Verifica sempre che il divisore non sia zero.

2. **Considera i Tipi di Dati**: Assicurati di utilizzare tipi di dati appropriati per i tuoi calcoli, considerando range e precisione.

3. **Usa Parentesi per Chiarezza**: Anche se conosci le regole di precedenza, usa le parentesi per rendere le espressioni complesse più leggibili.

4. **Attenzione agli Overflow**: Verifica che i risultati delle operazioni rientrino nei limiti del tipo di dato utilizzato.

5. **Preferisci la Forma Prefissa**: Per gli operatori di incremento/decremento, la forma prefissa è generalmente più efficiente quando il valore di ritorno non è utilizzato.

## Domande di Autovalutazione

1. Qual è il risultato di `7 / 3` e `7.0 / 3` in C++? Perché sono diversi?
2. Come si può verificare se un numero è divisibile per un altro utilizzando l'operatore modulo?
3. Qual è la differenza tra `++i` e `i++` in un'espressione come `j = ++i` vs `j = i++`?
4. Cosa succede quando si verifica un overflow in un'operazione aritmetica con interi?
5. Come si può evitare la perdita di precisione nella divisione tra interi?

## Esercizi Proposti

1. Scrivi un programma che calcoli il resto della divisione tra due numeri inseriti dall'utente e utilizzi questo risultato per determinare se il primo numero è divisibile per il secondo.
2. Implementa una funzione che utilizzi gli operatori di incremento/decremento per generare una sequenza di numeri con un pattern specifico.
3. Crea un programma che dimostri l'overflow di un tipo intero e come evitarlo utilizzando un tipo di dato più grande.
4. Scrivi una funzione che calcoli la media di un insieme di numeri, assicurandoti di mantenere la precisione decimale nel risultato.