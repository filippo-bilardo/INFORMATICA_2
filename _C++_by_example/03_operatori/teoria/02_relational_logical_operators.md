# Operatori Relazionali e Logici in C++

In questa guida, esploreremo gli operatori relazionali e logici disponibili in C++ e come utilizzarli per creare espressioni condizionali.

## Operatori Relazionali

Gli operatori relazionali confrontano due valori e restituiscono un valore booleano (`true` o `false`) in base al risultato del confronto.

| Operatore | Descrizione | Esempio |
|-----------|-------------|--------|
| `==` | Uguale a | `a == b` |
| `!=` | Diverso da | `a != b` |
| `>` | Maggiore di | `a > b` |
| `<` | Minore di | `a < b` |
| `>=` | Maggiore o uguale a | `a >= b` |
| `<=` | Minore o uguale a | `a <= b` |

### Esempi di Utilizzo

```cpp
int a = 10;
int b = 5;

bool uguali = (a == b);      // false
bool diversi = (a != b);      // true
bool maggiore = (a > b);      // true
bool minore = (a < b);        // false
bool maggioreUguale = (a >= b); // true
bool minoreUguale = (a <= b);   // false
```

## Operatori Logici

Gli operatori logici combinano espressioni booleane e restituiscono un valore booleano in base al risultato dell'operazione logica.

| Operatore | Descrizione | Esempio |
|-----------|-------------|--------|
| `&&` | AND logico | `a && b` |
| `\|\|` | OR logico | `a \|\| b` |
| `!` | NOT logico | `!a` |

### Esempi di Utilizzo

```cpp
bool condizione1 = true;
bool condizione2 = false;

bool risultatoAnd = (condizione1 && condizione2);  // false (entrambe devono essere true)
bool risultatoOr = (condizione1 || condizione2);   // true (almeno una deve essere true)
bool risultatoNot = !condizione1;                 // false (inverte il valore)
```

## Tabelle di Verità

### Operatore AND (`&&`)

| A | B | A && B |
|---|---|--------|
| false | false | false |
| false | true | false |
| true | false | false |
| true | true | true |

### Operatore OR (`||`)

| A | B | A \|\| B |
|---|---|--------|
| false | false | false |
| false | true | true |
| true | false | true |
| true | true | true |

### Operatore NOT (`!`)

| A | !A |
|---|----|
| false | true |
| true | false |

## Cortocircuito degli Operatori Logici

Gli operatori `&&` e `||` utilizzano la valutazione a cortocircuito, il che significa che il secondo operando viene valutato solo se necessario:

- Per `&&`: se il primo operando è `false`, il risultato sarà sempre `false` indipendentemente dal secondo operando, quindi il secondo operando non viene valutato.
- Per `||`: se il primo operando è `true`, il risultato sarà sempre `true` indipendentemente dal secondo operando, quindi il secondo operando non viene valutato.

```cpp
int x = 5;
int y = 0;

// Il secondo operando non viene valutato perché il primo è false
if (y != 0 && x / y > 2) {
    // Questo codice non causa una divisione per zero
    std::cout << "x / y > 2" << std::endl;
}

// Il secondo operando non viene valutato perché il primo è true
if (x > 0 || ++y > 0) {
    // y rimane 0 perché ++y non viene eseguito
    std::cout << "Condizione vera, y = " << y << std::endl;  // Output: y = 0
}
```

## Operatore Ternario

L'operatore ternario (`? :`) è un operatore condizionale che può essere utilizzato come forma compatta di un'istruzione if-else:

```cpp
espressione_condizionale ? espressione_se_vera : espressione_se_falsa
```

Esempio:

```cpp
int a = 10;
int b = 5;

// Assegna il valore maggiore a max
int max = (a > b) ? a : b;  // max = 10

// Equivalente a:
// int max;
// if (a > b) {
//     max = a;
// } else {
//     max = b;
// }
```

## Combinazione di Operatori

Gli operatori relazionali e logici possono essere combinati per creare espressioni condizionali complesse:

```cpp
int eta = 25;
int stipendio = 30000;
bool haPatente = true;

// Verifica se una persona è idonea per un prestito
bool idoneoPerPrestito = (eta >= 18 && stipendio > 20000) || (eta >= 25 && haPatente);
```

## Precedenza degli Operatori

La precedenza degli operatori determina l'ordine in cui vengono valutate le espressioni. In generale:

1. Gli operatori relazionali (`>`, `<`, `>=`, `<=`) hanno precedenza più alta rispetto agli operatori di uguaglianza (`==`, `!=`).
2. Gli operatori di uguaglianza hanno precedenza più alta rispetto all'operatore AND logico (`&&`).
3. L'operatore AND logico ha precedenza più alta rispetto all'operatore OR logico (`||`).

È sempre consigliabile utilizzare parentesi per rendere chiaro l'ordine di valutazione:

```cpp
// Senza parentesi (potenzialmente confuso)
bool risultato = a > b && c < d || e == f;

// Con parentesi (chiaro)
bool risultato = ((a > b) && (c < d)) || (e == f);
```

## Best Practices

1. **Usa Parentesi per Chiarezza**: Anche se conosci le regole di precedenza, usa le parentesi per rendere le espressioni complesse più leggibili.

2. **Sfrutta il Cortocircuito**: Posiziona le condizioni più probabili o meno costose da valutare come primo operando in espressioni `&&` e `||`.

3. **Attenzione ai Confronti con Virgola Mobile**: A causa degli errori di arrotondamento, evita di confrontare direttamente numeri in virgola mobile con `==`.

4. **Usa l'Operatore Ternario con Moderazione**: L'operatore ternario è utile per assegnazioni condizionali semplici, ma può rendere il codice difficile da leggere se annidato o complesso.

5. **Evita Effetti Collaterali nelle Condizioni**: A causa della valutazione a cortocircuito, evita di inserire operazioni con effetti collaterali (come incrementi o chiamate di funzione con effetti) nelle condizioni.

## Domande di Autovalutazione

1. Qual è la differenza tra gli operatori `==` e `=` in C++?
2. Come funziona la valutazione a cortocircuito e perché è utile?
3. Qual è il risultato di `!(a && b)` in termini di `a` e `b` (legge di De Morgan)?
4. In quali situazioni è preferibile utilizzare l'operatore ternario invece di un'istruzione if-else?
5. Come si dovrebbero confrontare correttamente i numeri in virgola mobile?

## Esercizi Proposti

1. Scrivi un programma che utilizzi operatori relazionali e logici per determinare se un anno è bisestile (divisibile per 4, ma non per 100 a meno che non sia anche divisibile per 400).
2. Implementa una funzione che utilizzi l'operatore ternario per restituire il valore assoluto di un numero.
3. Crea un programma che utilizzi operatori logici con valutazione a cortocircuito per evitare operazioni potenzialmente pericolose (come divisioni per zero).
4. Scrivi una funzione che verifichi se un numero è compreso in un intervallo utilizzando una singola espressione con operatori logici.