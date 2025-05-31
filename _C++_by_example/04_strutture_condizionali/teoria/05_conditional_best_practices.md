# Best Practices per le Strutture Condizionali in C++

In questa guida, esploreremo le migliori pratiche per l'utilizzo delle strutture condizionali in C++. Scrivere codice condizionale chiaro, efficiente e manutenibile è fondamentale per creare software di qualità.

## Principi Generali

### 1. Chiarezza Prima di Tutto

La chiarezza del codice dovrebbe sempre avere la precedenza sull'ottimizzazione prematura o sulla brevità. Un codice condizionale chiaro è più facile da comprendere, debuggare e mantenere.

```cpp
// Evita questo (troppo compatto e difficile da leggere)
if(a>b&&c<d||e==f&&!g)doSomething();

// Preferisci questo
if ((a > b && c < d) || (e == f && !g)) {
    doSomething();
}

// O ancora meglio, usa variabili intermedie per espressioni complesse
bool condizione1 = (a > b && c < d);
bool condizione2 = (e == f && !g);
if (condizione1 || condizione2) {
    doSomething();
}
```

### 2. Usa Sempre le Parentesi Graffe

Anche per blocchi di una sola istruzione, è consigliabile utilizzare sempre le parentesi graffe. Questo previene errori quando si aggiungono altre istruzioni in seguito.

```cpp
// Evita questo
if (condizione)
    doSomething();

// Preferisci questo
if (condizione) {
    doSomething();
}
```

### 3. Evita la Negazione Quando Possibile

Le condizioni positive sono generalmente più facili da comprendere rispetto a quelle negative.

```cpp
// Evita questo
if (!isInvalid) {
    // Codice
}

// Preferisci questo
if (isValid) {
    // Codice
}
```

### 4. Gestisci Sempre i Casi Limite

Assicurati di gestire tutti i possibili casi, inclusi quelli limite o imprevisti.

```cpp
// Esempio: divisione sicura
if (divisore != 0) {
    risultato = numeratore / divisore;
} else {
    // Gestione del caso limite (divisione per zero)
    handleError("Divisione per zero");
}
```

## Best Practices per if-else

### 1. Ordina le Condizioni in Modo Logico

Organizza le condizioni in un ordine logico, ad esempio dal caso più comune al meno comune, o in ordine di complessità crescente.

```cpp
// Ordina dal caso più comune al meno comune
if (status == STATUS_OK) {
    // Caso più comune
} else if (status == STATUS_WARNING) {
    // Meno comune
} else if (status == STATUS_ERROR) {
    // Ancora meno comune
} else {
    // Caso di fallback
}
```

### 2. Considera l'Early Return per Ridurre l'Annidamento

L'uso di return anticipati può ridurre il livello di annidamento e rendere il codice più leggibile.

```cpp
// Evita l'annidamento eccessivo
bool processRequest(Request request) {
    if (!isValidRequest(request)) {
        return false; // Early return
    }
    
    if (!hasPermission(request.user)) {
        return false; // Early return
    }
    
    // Processa la richiesta valida
    // ...
    
    return true;
}
```

### 3. Limita il Livello di Annidamento

Troppi livelli di annidamento rendono il codice difficile da seguire. Cerca di limitare l'annidamento a 2-3 livelli.

```cpp
// Evita questo (troppi livelli di annidamento)
if (condizione1) {
    if (condizione2) {
        if (condizione3) {
            if (condizione4) {
                // Codice
            }
        }
    }
}

// Preferisci questo (usando condizioni combinate o early returns)
if (!condizione1 || !condizione2 || !condizione3 || !condizione4) {
    return; // Early return
}
// Codice
```

## Best Practices per switch-case

### 1. Usa Default con Attenzione

Includere sempre un caso `default` nel tuo `switch`, anche se pensi che tutti i casi siano coperti. Questo aiuta a catturare valori imprevisti e rende il codice più robusto.

```cpp
switch (valore) {
    case VALORE1:
        // Codice
        break;
    case VALORE2:
        // Codice
        break;
    default:
        // Gestione di valori imprevisti
        assert(false && "Valore non gestito"); // In modalità debug
        break;
}
```

### 2. Non Dimenticare il break

Assicurati di includere un'istruzione `break` alla fine di ogni caso, a meno che non intenda utilizzare il fall-through intenzionalmente.

```cpp
switch (valore) {
    case 1:
        // Codice per caso 1
        break; // Non dimenticare il break!
    case 2:
        // Codice per caso 2
        break;
    // ...
}
```

### 3. Commenta i Fall-Through Intenzionali

Se utilizzi il fall-through intenzionalmente, commentalo per chiarire che non è un errore.

```cpp
switch (valore) {
    case 1:
        // Codice per caso 1
        // Fall-through intenzionale
    case 2:
        // Codice per caso 1 e 2
        break;
    // ...
}
```

### 4. Considera Enum Class per Switch

Utilizza `enum class` per i valori dello switch quando possibile, per avere un controllo più rigoroso sui tipi e una migliore leggibilità.

```cpp
enum class Colore { Rosso, Verde, Blu };

Colore colore = Colore::Verde;

switch (colore) {
    case Colore::Rosso:
        // Codice
        break;
    case Colore::Verde:
        // Codice
        break;
    case Colore::Blu:
        // Codice
        break;
    default:
        // Questo caso potrebbe non essere necessario con enum class
        // ma è comunque una buona pratica includerlo
        break;
}
```

## Best Practices per l'Operatore Ternario

### 1. Usa l'Operatore Ternario per Casi Semplici

L'operatore ternario è ideale per assegnazioni condizionali semplici, ma diventa difficile da leggere in casi complessi.

```cpp
// Buon uso dell'operatore ternario
string stato = (temperatura > 30) ? "Caldo" : "Freddo";

// Evita usi complessi o annidati
// Questo è difficile da leggere
string messaggio = (x > 10) ? 
                  ((y > 20) ? "A" : "B") : 
                  ((z > 30) ? "C" : "D");
```

### 2. Mantieni la Leggibilità

Se l'espressione diventa troppo lunga o complessa, considera l'uso di un'istruzione `if-else` tradizionale.

```cpp
// Invece di questo
string risultato = (condizione1 && condizione2 || condizione3 && !condizione4) ? 
                  "Risultato1" : "Risultato2";

// Preferisci questo
string risultato;
if (condizione1 && condizione2 || condizione3 && !condizione4) {
    risultato = "Risultato1";
} else {
    risultato = "Risultato2";
}
```

## Evitare goto

### 1. Preferisci Strutture di Controllo Moderne

Evita l'uso di `goto` quando possibile. Utilizza strutture di controllo moderne come cicli, condizionali e gestione delle eccezioni.

```cpp
// Evita questo
if (errore) goto gestione_errore;
// Codice
goto fine;
gestione_errore:
// Gestione errore
fine:

// Preferisci questo
try {
    if (errore) throw std::runtime_error("Errore");
    // Codice
} catch (const std::exception& e) {
    // Gestione errore
}
```

### 2. Casi Accettabili per goto

Se devi usare `goto`, limitalo a casi specifici come l'uscita da cicli annidati o la gestione degli errori in contesti limitati.

```cpp
// Uso accettabile di goto per uscire da cicli annidati
for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        if (matrice[i][j] == target) {
            // Trovato l'elemento
            goto elemento_trovato;
        }
    }
}
// Non trovato
// ...

elemento_trovato:
// Codice da eseguire quando l'elemento è trovato
```

## Ottimizzazione delle Condizioni

### 1. Short-Circuit Evaluation

Sfrutta la valutazione a cortocircuito degli operatori logici (`&&` e `||`) per ottimizzare le condizioni.

```cpp
// La seconda condizione viene valutata solo se la prima è vera
if (puntatore != nullptr && puntatore->valore > 0) {
    // Codice sicuro
}

// La seconda condizione viene valutata solo se la prima è falsa
if (cache.contains(key) || loadFromDatabase(key)) {
    // Usa il valore (dalla cache o dal database)
}
```

### 2. Ordina le Condizioni per Efficienza

Metti le condizioni più veloci da valutare o più probabili prima delle altre.

```cpp
// Metti le condizioni più veloci o più probabili prima
if (x == 0 || complessa_funzione(x) > threshold) {
    // Codice
}
```

### 3. Evita Calcoli Ripetuti

Se una stessa espressione viene utilizzata in più punti di una struttura condizionale, calcola il risultato una sola volta.

```cpp
// Evita questo
if (calcolo_costoso() > 10) {
    // Codice
} else if (calcolo_costoso() <= 5) {
    // Altro codice
}

// Preferisci questo
int risultato = calcolo_costoso();
if (risultato > 10) {
    // Codice
} else if (risultato <= 5) {
    // Altro codice
}
```

## Gestione degli Errori

### 1. Usa Asserzioni per Invarianti

Utilizza le asserzioni per verificare invarianti e precondizioni che non dovrebbero mai essere violate in un programma corretto.

```cpp
#include <cassert>

void funzione(int* puntatore) {
    assert(puntatore != nullptr && "Il puntatore non può essere nullptr");
    // Codice che usa il puntatore
}
```

### 2. Gestisci Errori Recuperabili con Eccezioni o Codici di Errore

Per errori recuperabili, utilizza eccezioni o codici di errore a seconda del contesto.

```cpp
// Usando eccezioni
try {
    if (!file.open(filename)) {
        throw std::runtime_error("Impossibile aprire il file");
    }
    // Usa il file
} catch (const std::exception& e) {
    // Gestione dell'errore
    std::cerr << "Errore: " << e.what() << std::endl;
}

// Usando codici di errore
ErrorCode result = openFile(filename);
if (result != ErrorCode::Success) {
    // Gestione dell'errore
    handleError(result);
    return;
}
// Usa il file
```

## Testing e Debugging

### 1. Testa Tutti i Rami Condizionali

Assicurati di testare tutti i possibili rami delle tue strutture condizionali, inclusi i casi limite.

```cpp
// Esempio di test per una funzione con condizionali
void testDivisioneSicura() {
    // Test caso normale
    assert(divisioneSicura(10, 2) == 5);
    
    // Test caso limite (divisione per zero)
    try {
        divisioneSicura(10, 0);
        assert(false && "Dovrebbe lanciare un'eccezione");
    } catch (const std::exception&) {
        // Eccezione attesa
    }
}
```

### 2. Usa Logging per Debugging

Inserisci istruzioni di logging nei rami condizionali per facilitare il debugging.

```cpp
if (condizione) {
    log("Ramo 1 eseguito con valore: " + std::to_string(valore));
    // Codice
} else {
    log("Ramo 2 eseguito con valore: " + std::to_string(valore));
    // Codice
}
```

## Domande di Autovalutazione

1. Perché è importante utilizzare sempre le parentesi graffe nelle strutture condizionali, anche per blocchi di una sola istruzione?
2. Quali sono i vantaggi dell'early return per ridurre l'annidamento del codice?
3. Quando è appropriato utilizzare l'operatore ternario e quando è meglio evitarlo?
4. Come può la valutazione a cortocircuito degli operatori logici migliorare l'efficienza del codice?
5. Quali sono le best practices per gestire gli errori nelle strutture condizionali?

## Esercizi Proposti

1. Prendi un esempio di codice con strutture condizionali complesse e riscrivilo seguendo le best practices discusse in questa guida.
2. Scrivi una funzione che implementi un algoritmo di ricerca binaria, applicando le best practices per le strutture condizionali.
3. Refactoring di un codice che utilizza `goto` per implementare una macchina a stati, sostituendolo con approcci più moderni.
4. Implementa una funzione di validazione per un form di registrazione utente, applicando le best practices per la gestione degli errori e l'organizzazione delle condizioni.
5. Scrivi un programma che utilizzi strutture condizionali per implementare un semplice sistema di raccomandazione basato su preferenze utente, seguendo le best practices per l'ottimizzazione delle condizioni.