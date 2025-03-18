# Introduzione Teorica al Riconoscitore di Sequenza di Parole

## Strutture Dati Dinamiche: Liste Concatenate

### Concetti Fondamentali
Le liste concatenate sono strutture dati dinamiche che consentono di memorizzare una sequenza di elementi in posizioni di memoria non contigue. A differenza degli array, che richiedono una allocazione di memoria contigua, le liste concatenate permettono una gestione più flessibile della memoria.

Una lista concatenata è composta da nodi, dove ogni nodo contiene:
1. **Dati**: Le informazioni che vogliamo memorizzare (nel nostro caso, una parola)
2. **Puntatore**: Un riferimento al nodo successivo nella lista

### Vantaggi delle Liste Concatenate
- **Dimensione Dinamica**: Possono crescere o ridursi durante l'esecuzione del programma
- **Inserimento/Rimozione Efficienti**: Operazioni di inserimento e rimozione possono essere eseguite in tempo costante O(1) se si conosce la posizione
- **Utilizzo Efficiente della Memoria**: Allocano memoria solo quando necessario

### Svantaggi delle Liste Concatenate
- **Accesso Sequenziale**: Non supportano l'accesso diretto agli elementi (a differenza degli array)
- **Overhead di Memoria**: Ogni nodo richiede spazio aggiuntivo per il puntatore
- **Complessità di Implementazione**: Più complesse da implementare rispetto agli array

## Gestione della Memoria Dinamica in C++

### Allocazione e Deallocazione
In C++, la memoria dinamica viene gestita attraverso gli operatori `new` e `delete`:

```cpp
// Allocazione di un nuovo nodo
Nodo* nuovoNodo = new Nodo(parola);

// Deallocazione di un nodo
delete nodo;
```

### Prevenzione dei Memory Leak
Un aspetto critico della gestione della memoria dinamica è prevenire i "memory leak" (perdite di memoria). Nel nostro progetto, questo viene gestito attraverso:

1. **Distruttore della Classe**: Libera tutta la memoria allocata quando l'oggetto viene distrutto
   ```cpp
   ~ListaParole() {
     svuota();
   }
   ```

2. **Metodo di Pulizia**: Libera esplicitamente la memoria quando non è più necessaria
   ```cpp
   void svuota() {
     while (testa != nullptr) {
       rimuoviPrimo();
     }
   }
   ```

3. **Gestione Automatica della Dimensione**: Rimuove automaticamente i nodi più vecchi quando la lista supera una certa dimensione
   ```cpp
   if (lunghezza > LUNGHEZZA_SEQUENZA) {
     rimuoviPrimo();
   }
   ```

## Algoritmo di Riconoscimento di Sequenze

### Approccio Implementato
Il nostro sistema utilizza un algoritmo di confronto sequenziale per verificare se la sequenza di parole inserite corrisponde alla sequenza predefinita:

1. **Memorizzazione delle Parole**: Ogni parola inserita viene aggiunta alla lista concatenata
2. **Mantenimento della Lunghezza**: La lista mantiene solo le ultime N parole (dove N è la lunghezza della sequenza da riconoscere)
3. **Confronto Sequenziale**: Quando viene inserita una nuova parola, la sequenza attuale viene confrontata con quella predefinita

### Pseudocodice dell'Algoritmo di Confronto
```
funzione confrontaConSequenza(sequenzaCorretta, lunghezzaSequenza):
    se lunghezza_attuale != lunghezzaSequenza allora
        restituisci falso
    fine se
    
    nodoCorrente = testa della lista
    per i da 0 a lunghezzaSequenza-1 fai
        se nodoCorrente è nullo o nodoCorrente.parola != sequenzaCorretta[i] allora
            restituisci falso
        fine se
        nodoCorrente = nodoCorrente.prossimo
    fine per
    
    restituisci vero
fine funzione
```

## Implementazione in Arduino

### Adattamento per Sistemi Embedded
L'implementazione su Arduino richiede alcune considerazioni specifiche:

1. **Memoria Limitata**: Arduino ha risorse di memoria limitate, quindi è importante gestire efficacemente la memoria
2. **Semplicità di Interfaccia**: L'interfaccia utente è limitata alla comunicazione seriale e ai LED
3. **Gestione degli Input**: Gli input vengono ricevuti carattere per carattere attraverso la porta seriale

### Gestione degli Input Seriali
Il sistema gestisce l'input seriale carattere per carattere, assemblando le parole e processandole quando viene rilevato un delimitatore (spazio, punto o invio):

```cpp
void loop() {
  if (Serial.available() > 0) {
    char carattereInput = Serial.read();
    
    if (carattereInput == '.' || carattereInput == '\n' || carattereInput == ' ') {
      if (indiceParola > 0) {
        parolaCorrente[indiceParola] = '\0';  // Termina la stringa
        elaboraParola(parolaCorrente);
        indiceParola = 0;  // Resetta l'indice per la prossima parola
      }
    } else {
      aggiungiCarattere(carattereInput);
    }
  }
}
```

## Applicazioni Pratiche

Questo tipo di sistema di riconoscimento di sequenze può essere applicato in vari contesti:

1. **Sistemi di Sicurezza**: Riconoscimento di password o frasi chiave
2. **Interfacce Vocali**: Riconoscimento di comandi vocali (dopo la conversione in testo)
3. **Automazione Domestica**: Attivazione/disattivazione di dispositivi tramite comandi specifici
4. **Sistemi di Controllo Accessi**: Autenticazione basata su sequenze di parole

## Conclusioni

Il Riconoscitore di Sequenza di Parole dimostra l'applicazione pratica di concetti fondamentali di programmazione e strutture dati:

1. **Strutture Dati Dinamiche**: Utilizzo di liste concatenate per memorizzare sequenze di lunghezza variabile
2. **Gestione della Memoria**: Allocazione e deallocazione dinamica della memoria
3. **Algoritmi di Confronto**: Implementazione di algoritmi per il riconoscimento di pattern
4. **Programmazione per Sistemi Embedded**: Adattamento di concetti software per piattaforme con risorse limitate

Questi concetti sono fondamentali nella programmazione moderna e trovano applicazione in numerosi contesti, dai sistemi embedded ai software complessi.

---

[Torna all'indice](../README.md)