# 4.1 Diagrammi UML e grafici di chiamata

Doxygen non è solo uno strumento per la generazione di documentazione testuale, ma offre anche funzionalità avanzate per rappresentare visivamente il funzionamento e la struttura del codice. Tra queste, la possibilità di creare diagrammi UML e grafici di chiamata è particolarmente utile per comprendere e analizzare il flusso del programma e le relazioni tra i vari componenti del progetto.

## Diagrammi UML

I diagrammi UML (Unified Modeling Language) aiutano a rappresentare visivamente le classi, le loro relazioni e l'interazione tra di esse. Doxygen può generare diagrammi UML in automatico utilizzando strumenti come `dot`, parte del pacchetto Graphviz.

### Attivazione dei diagrammi UML
Per abilitare i diagrammi UML:
1. Assicurati di avere Graphviz installato sul tuo sistema.
2. Modifica il file di configurazione `Doxyfile` e imposta i seguenti parametri:
   ```
   HAVE_DOT = YES
   CLASS_DIAGRAMS = YES
   UML_LOOK = YES
   ```
3. Rigenera la documentazione utilizzando il comando `doxygen`.

### Esempi di diagrammi UML generati
- **Diagrammi delle classi**: mostrano le classi, i loro membri, le relazioni di ereditarietà e di composizione.
- **Diagrammi delle gerarchie**: rappresentano la struttura gerarchica delle classi e delle interfacce.

#### Nota:
I diagrammi UML generati da Doxygen sono utili per progetti orientati agli oggetti (C++). Nei progetti C, questi diagrammi possono essere limitati alle relazioni funzionali.

---

## Grafici di chiamata

I grafici di chiamata sono rappresentazioni visive che mostrano come le funzioni si chiamano tra loro. Doxygen genera due tipi principali di grafici:

### 1. **Call Graph** (Grafico delle chiamate in uscita)
Mostra tutte le funzioni chiamate da una funzione specifica. Questo aiuta a comprendere l'impatto di una funzione all'interno del codice e il flusso delle chiamate.

### 2. **Caller Graph** (Grafico delle chiamate in entrata)
Mostra tutte le funzioni che chiamano una determinata funzione. È utile per identificare i punti di ingresso e verificare l'utilizzo delle funzioni.

### Configurazione dei grafici di chiamata
Per abilitare i grafici di chiamata:
1. Modifica il file `Doxyfile` e imposta i seguenti parametri:
   ```
   HAVE_DOT = YES
   CALL_GRAPH = YES
   CALLER_GRAPH = YES
   ```
2. Assicurati che il pacchetto Graphviz sia correttamente installato.

### Visualizzazione dei grafici
I grafici di chiamata sono inclusi nella documentazione HTML generata da Doxygen. Ogni funzione documentata avrà i grafici corrispondenti, visibili come immagini interattive.

---

## Best practice per diagrammi e grafici
- Usa i grafici di chiamata per identificare e ottimizzare le dipendenze tra le funzioni.
- Mantieni il codice ben organizzato e documentato per generare diagrammi UML chiari e informativi.
- Integra i diagrammi UML nei report per facilitare la comunicazione con il team di sviluppo.

Con queste funzionalità avanzate, Doxygen non solo migliora la leggibilità del codice, ma fornisce strumenti visivi potenti per l'analisi e la progettazione del software.

