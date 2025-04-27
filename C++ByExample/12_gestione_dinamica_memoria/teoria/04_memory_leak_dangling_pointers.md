# Memory Leak e Dangling Pointers

In questa guida, esploreremo due problemi comuni nella gestione della memoria dinamica: i memory leak e i dangling pointers.

## Memory Leak (Perdita di Memoria)

Un memory leak si verifica quando un programma alloca memoria dinamicamente ma non la dealloca quando non è più necessaria. Questo porta a un consumo progressivo di memoria che può eventualmente esaurire le risorse disponibili.

### Cause Comuni di Memory Leak

1. **Dimenticare di chiamare `delete`/`delete[]`**:

```cpp
void funzione() {
    int* p = new int(10);  // Allocazione di memoria
    // Manca delete p; prima della fine della funzione
}  // Memory leak: la memoria allocata non viene mai deallocata
```

2. **Perdere il riferimento alla memoria allocata**:

```cpp
int* p = new int(10);
p = new int(20);  // Si perde il riferimento alla prima allocazione
// Non è più possibile deallocare la prima allocazione
delete p;  // Dealloca solo la seconda allocazione
```

3. **Eccezioni non gestite**:

```cpp
void funzione() {
    int* p = new int(10);
    // Se qui viene lanciata un'eccezione e non viene catturata
    // il codice sotto non viene eseguito
    delete p;  // Questa riga potrebbe non essere mai raggiunta
}
```

### Conseguenze dei Memory Leak

- Aumento progressivo dell'utilizzo di memoria
- Degradazione delle prestazioni
- Possibile crash del programma quando la memoria si esaurisce
- Nei sistemi embedded o a lunga esecuzione, può causare problemi gravi

### Rilevamento dei Memory Leak

1. **Strumenti di analisi della memoria**:
   - Valgrind (Linux/macOS)
   - Visual Leak Detector (Windows)
   - AddressSanitizer (compilatori moderni)

2. **Monitoraggio dell'utilizzo della memoria**:
   - Task Manager (Windows)
   - top/htop (Linux/macOS)

## Dangling Pointers (Puntatori Pendenti)

Un dangling pointer è un puntatore che fa riferimento a una locazione di memoria che è stata deallocata o che non è più valida.

### Cause Comuni di Dangling Pointers

1. **Deallocazione prematura**:

```cpp
int* p = new int(10);
delete p;  // p ora è un dangling pointer
*p = 20;   // ERRORE: accesso a memoria deallocata
```

2. **Ritorno di puntatori a variabili locali**:

```cpp
int* funzione() {
    int x = 10;
    return &x;  // ERRORE: ritorna l'indirizzo di una variabile locale
}  // x viene distrutta alla fine della funzione

int* p = funzione();  // p è un dangling pointer
*p = 20;  // ERRORE: comportamento indefinito
```

3. **Deallocazione multipla**:

```cpp
int* p1 = new int(10);
int* p2 = p1;  // p2 punta alla stessa memoria di p1
delete p1;     // La memoria viene deallocata
// p1 e p2 sono ora dangling pointers
delete p2;     // ERRORE: doppia deallocazione
```

### Conseguenze dei Dangling Pointers

- Comportamento indefinito (crash, corruzione dei dati, risultati errati)
- Difficili da diagnosticare (i problemi possono manifestarsi in modo imprevedibile)
- Vulnerabilità di sicurezza (possibile accesso a dati sensibili)

### Prevenzione dei Dangling Pointers

1. **Assegnare `nullptr` dopo `delete`**:

```cpp
int* p = new int(10);
delete p;
p = nullptr;  // p non è più un dangling pointer

// Ora è possibile controllare se p è valido
if (p != nullptr) {
    *p = 20;  // Questo codice non verrà eseguito
}
```

2. **Utilizzare smart pointers** (C++11 e versioni successive):

```cpp
#include <memory>

std::unique_ptr<int> p = std::make_unique<int>(10);  // C++14
// Non è necessario chiamare delete
// La memoria viene deallocata automaticamente quando p esce dallo scope
```

3. **Evitare di restituire puntatori a variabili locali**:

```cpp
// Invece di restituire un puntatore a una variabile locale
int funzione() {
    int x = 10;
    return x;  // Restituisce il valore, non l'indirizzo
}
```

## Esempio Completo

```cpp
#include <iostream>
#include <memory>  // Per smart pointers (C++11)

// Funzione che dimostra un memory leak
void memoryLeakExample() {
    int* leak = new int(42);
    // Manca delete leak;
    std::cout << "Memory leak creato" << std::endl;
}

// Funzione che dimostra un dangling pointer
void danglingPointerExample() {
    int* p = new int(10);
    std::cout << "Valore iniziale: " << *p << std::endl;
    
    delete p;  // p ora è un dangling pointer
    // p = nullptr;  // Questo eviterebbe il problema
    
    // Accesso a memoria deallocata (comportamento indefinito)
    // *p = 20;  // Questo potrebbe causare problemi
    // std::cout << "Nuovo valore: " << *p << std::endl;  // Comportamento indefinito
}

// Funzione che utilizza smart pointers per evitare problemi
void smartPointerExample() {
    // unique_ptr si occupa automaticamente della deallocazione
    std::unique_ptr<int> p(new int(10));
    // Alternativa in C++14: auto p = std::make_unique<int>(10);
    
    std::cout << "Smart pointer value: " << *p << std::endl;
    
    // Non è necessario chiamare delete
}  // La memoria viene deallocata automaticamente quando p esce dallo scope

int main() {
    std::cout << "Esempio di memory leak:" << std::endl;
    memoryLeakExample();
    
    std::cout << "\nEsempio di dangling pointer:" << std::endl;
    danglingPointerExample();
    
    std::cout << "\nEsempio di smart pointer:" << std::endl;
    smartPointerExample();
    
    return 0;
}
```

## Domande di Autovalutazione

1. Cosa è un memory leak e quali sono le sue conseguenze?
2. Come si può rilevare un memory leak in un programma C++?
3. Cosa è un dangling pointer e perché è pericoloso?
4. Quali sono le strategie per prevenire dangling pointers?
5. In che modo gli smart pointers aiutano a prevenire memory leak e dangling pointers?

## Esercizi Proposti

1. Scrivi un programma che dimostra un memory leak e poi modificalo per correggerlo.
2. Crea un programma che mostra come un dangling pointer può causare problemi e come evitarli.
3. Riscrivi un programma che utilizza `new`/`delete` per gestire la memoria dinamica, utilizzando invece smart pointers.

## Prossimo Argomento

Nel prossimo argomento, esploreremo le best practices nella gestione della memoria dinamica in C++.