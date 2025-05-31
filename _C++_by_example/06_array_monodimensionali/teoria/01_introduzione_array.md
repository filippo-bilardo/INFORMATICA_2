# Introduzione agli Array

In questa guida, esploreremo il concetto di array in C++ e la loro importanza nella programmazione.

## Cos'è un Array?

Un array è una struttura dati che permette di memorizzare una collezione di elementi dello stesso tipo sotto un unico nome. Possiamo immaginare un array come una fila di cassetti numerati, dove ogni cassetto può contenere un valore.

## Caratteristiche Principali degli Array

1. **Omogeneità**: Tutti gli elementi di un array devono essere dello stesso tipo di dati (tutti interi, tutti caratteri, ecc.).
2. **Dimensione Fissa**: In C++, gli array tradizionali hanno una dimensione fissa che deve essere specificata al momento della dichiarazione e non può essere modificata durante l'esecuzione.
3. **Accesso Diretto**: Gli elementi dell'array sono memorizzati in posizioni di memoria contigue e possono essere acceduti direttamente tramite il loro indice.
4. **Indici Base Zero**: In C++, il primo elemento di un array ha indice 0, il secondo ha indice 1, e così via.

## Perché Usare gli Array?

Gli array sono fondamentali nella programmazione per diversi motivi:

1. **Gestione di Collezioni di Dati**: Permettono di gestire facilmente collezioni di dati correlati (es. temperature giornaliere, punteggi di un gioco, ecc.).
2. **Efficienza**: Offrono un accesso efficiente agli elementi tramite indice, con complessità temporale O(1).
3. **Elaborazione di Dati**: Facilitano operazioni come la ricerca, l'ordinamento e la manipolazione di dati correlati.
4. **Base per Strutture Dati Più Complesse**: Sono alla base di molte strutture dati più complesse come matrici, liste, pile e code.

## Tipi di Array in C++

In C++, esistono principalmente due tipi di array:

1. **Array Statici**: Hanno dimensione fissa definita al momento della compilazione.
   ```cpp
   int numeri[5]; // Array statico di 5 interi
   ```

2. **Array Dinamici**: Hanno dimensione determinata durante l'esecuzione del programma.
   ```cpp
   int* numeri = new int[dimensione]; // Array dinamico di 'dimensione' interi
   ```

## Limitazioni degli Array in C++

Gli array tradizionali in C++ presentano alcune limitazioni:

1. **Dimensione Fissa**: Una volta dichiarato, un array statico non può cambiare dimensione.
2. **Nessun Controllo dei Limiti**: C++ non verifica automaticamente se si accede a un indice valido dell'array.
3. **Nessuna Informazione sulla Dimensione**: Gli array non memorizzano la propria dimensione, quindi è responsabilità del programmatore tenerne traccia.

## Alternative Moderne agli Array

Per superare le limitazioni degli array tradizionali, C++ offre alternative moderne:

1. **`std::vector`**: Un contenitore dinamico che può cambiare dimensione durante l'esecuzione.
   ```cpp
   #include <vector>
   std::vector<int> numeri = {1, 2, 3, 4, 5};
   numeri.push_back(6); // Aggiunge un elemento
   ```

2. **`std::array`**: Un wrapper per gli array con dimensione fissa che offre funzionalità aggiuntive.
   ```cpp
   #include <array>
   std::array<int, 5> numeri = {1, 2, 3, 4, 5};
   ```

## Conclusione

Gli array sono uno strumento fondamentale nella programmazione C++, offrendo un modo efficiente per gestire collezioni di dati. Sebbene presentino alcune limitazioni, costituiscono la base per comprendere strutture dati più avanzate e sono essenziali per qualsiasi programmatore C++.

Nelle prossime guide, esploreremo in dettaglio come dichiarare, inizializzare e manipolare gli array in C++.