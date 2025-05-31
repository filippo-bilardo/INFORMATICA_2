# Conversioni tra Tipi (Casting) in C++

In questa guida, esploreremo le diverse tecniche di conversione tra tipi di dati (casting) disponibili in C++ e quando utilizzarle.

## Cos'è il Casting?

Il casting è il processo di conversione di un valore da un tipo di dato a un altro. In C++, esistono diverse tecniche di casting, ciascuna con le proprie caratteristiche e casi d'uso.

## Conversioni Implicite

Le conversioni implicite avvengono automaticamente quando un valore di un tipo viene utilizzato in un contesto che richiede un altro tipo, senza bisogno di sintassi speciale.

```cpp
int intero = 42;
double decimale = intero;  // Conversione implicita da int a double (42.0)
```

Le conversioni implicite seguono regole precise:

1. **Promozioni Intere**: I tipi interi più piccoli vengono convertiti in tipi più grandi (es. `char` → `int` → `long`).
2. **Conversioni Numeriche Standard**: I tipi interi vengono convertiti in tipi in virgola mobile (es. `int` → `float` → `double`).

Attenzione: Le conversioni implicite possono causare perdita di dati quando si passa da un tipo più grande a uno più piccolo o da un tipo in virgola mobile a un tipo intero.

```cpp
double pi = 3.14159;
int approssimazione = pi;  // Conversione implicita con perdita di dati (approssimazione = 3)
```

## Conversioni Esplicite (Casting)

Quando si desidera una conversione che potrebbe causare perdita di dati o quando si vuole rendere esplicita l'intenzione, si utilizzano le tecniche di casting.

### 1. Cast in Stile C (Cast Tradizionale)

```cpp
double valore = 3.14159;
int parte_intera = (int)valore;  // Cast in stile C
```

Questo è il metodo più semplice, ma anche il meno sicuro, poiché non effettua controlli di tipo e può portare a comportamenti imprevedibili.

### 2. Cast in Stile Funzionale

```cpp
double valore = 3.14159;
int parte_intera = int(valore);  // Cast in stile funzionale
```

Sintatticamente diverso dal cast in stile C, ma funzionalmente equivalente.

### 3. Cast Moderni (C++11)

C++ moderno offre quattro operatori di cast che forniscono un controllo più preciso e sicuro:

#### a. `static_cast<tipo>(espressione)`

Utilizzato per conversioni ben definite e non polimorfe.

```cpp
double valore = 3.14159;
int parte_intera = static_cast<int>(valore);  // Conversione esplicita da double a int
```

#### b. `dynamic_cast<tipo>(espressione)`

Utilizzato principalmente per le conversioni polimorfe in gerarchie di classi. Esegue controlli di tipo a runtime.

```cpp
Base* ptrBase = new Derivata();
Derivata* ptrDerivata = dynamic_cast<Derivata*>(ptrBase);  // Sicuro solo se ptrBase punta effettivamente a un oggetto Derivata

if (ptrDerivata) {
    // Conversione riuscita
} else {
    // Conversione fallita
}
```

#### c. `const_cast<tipo>(espressione)`

Utilizzato per aggiungere o rimuovere il qualificatore `const` o `volatile`.

```cpp
const int valore = 42;
int* ptr = const_cast<int*>(&valore);  // Rimuove il const (potenzialmente pericoloso)
```

#### d. `reinterpret_cast<tipo>(espressione)`

Utilizzato per conversioni a basso livello, come da puntatore a intero o viceversa. È il più pericoloso e dovrebbe essere usato con estrema cautela.

```cpp
int* ptr = new int(42);
long indirizzo = reinterpret_cast<long>(ptr);  // Converte un puntatore in un intero
```

## Conversioni Numeriche

### Da Intero a Virgola Mobile

```cpp
int intero = 42;
double decimale = static_cast<double>(intero);  // 42.0
```

Questa conversione è sempre sicura, poiché un tipo in virgola mobile può rappresentare qualsiasi valore intero nel suo range.

### Da Virgola Mobile a Intero

```cpp
double decimale = 3.14159;
int intero = static_cast<int>(decimale);  // 3 (la parte frazionaria viene troncata)
```

Questa conversione causa la perdita della parte frazionaria e può causare overflow se il valore è troppo grande.

## Conversioni tra Tipi Booleani e Numerici

### Da Numerico a Booleano

```cpp
int valore = 42;
bool flag = static_cast<bool>(valore);  // true (qualsiasi valore diverso da 0 diventa true)
```

### Da Booleano a Numerico

```cpp
bool flag = true;
int valore = static_cast<int>(flag);  // 1 (true diventa 1, false diventa 0)
```

## Best Practices

1. **Preferisci i Cast Moderni**: Usa `static_cast`, `dynamic_cast`, `const_cast` e `reinterpret_cast` invece dei cast in stile C, poiché offrono maggiore sicurezza e chiarezza.

2. **Evita `reinterpret_cast` quando Possibile**: Questo tipo di cast è il più pericoloso e dovrebbe essere utilizzato solo quando assolutamente necessario.

3. **Verifica i Risultati di `dynamic_cast`**: Controlla sempre se un `dynamic_cast` ha avuto successo prima di utilizzare il risultato.

4. **Documenta le Conversioni Complesse**: Quando utilizzi conversioni non ovvie, aggiungi commenti che spiegano il motivo e le implicazioni.

5. **Considera Funzioni di Conversione Esplicite**: Per conversioni complesse, considera la creazione di funzioni dedicate che rendano chiaro lo scopo e gestiscano i casi limite.

## Domande di Autovalutazione

1. Qual è la differenza tra conversioni implicite ed esplicite?
2. Quando è appropriato utilizzare `static_cast` rispetto a un cast in stile C?
3. Qual è lo scopo principale di `dynamic_cast` e quando dovrebbe essere utilizzato?
4. Quali sono i potenziali pericoli di `reinterpret_cast`?
5. Cosa succede quando si converte un valore in virgola mobile in un tipo intero?

## Esercizi Proposti

1. Scrivi un programma che dimostri la perdita di precisione quando si converte da `double` a `float` e da `float` a `int`.
2. Crea una gerarchia di classi e utilizza `dynamic_cast` per convertire in modo sicuro tra tipi di puntatori.
3. Implementa una funzione di conversione personalizzata che gestisca in modo sicuro la conversione da stringa a numero.
4. Scrivi un programma che mostri i diversi comportamenti dei quattro operatori di cast moderni su uno stesso valore.