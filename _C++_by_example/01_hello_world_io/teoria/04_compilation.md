# Compilazione ed Esecuzione

In questa guida, esploreremo il processo di compilazione ed esecuzione di programmi C++, un passaggio fondamentale per trasformare il codice sorgente in un programma eseguibile.

## Il Processo di Compilazione

La compilazione in C++ è un processo che converte il codice sorgente in un file eseguibile attraverso diverse fasi:

### 1. Preprocessore

Il preprocessore elabora le direttive che iniziano con `#` (come `#include`, `#define`, `#ifdef`, ecc.) prima della compilazione vera e propria:

- Espande i file inclusi con `#include`
- Sostituisce le macro definite con `#define`
- Rimuove il codice condizionale non applicabile (`#ifdef`, `#ifndef`, ecc.)

### 2. Compilazione

Il compilatore traduce il codice sorgente preprocessato in codice oggetto (linguaggio macchina):

- Analizza la sintassi del codice
- Verifica i tipi e altre regole semantiche
- Genera file oggetto (`.o` o `.obj`)

### 3. Linking

Il linker combina i file oggetto con le librerie necessarie per creare l'eseguibile finale:

- Risolve i riferimenti tra diversi file oggetto
- Collega le librerie esterne
- Crea il file eseguibile (`.exe` su Windows, senza estensione su Linux/macOS)

## Compilatori C++ Comuni

### GCC (GNU Compiler Collection)

Un compilatore open source disponibile su molte piattaforme:

```bash
# Compilazione base
g++ mioprogramma.cpp -o mioprogramma

# Con ottimizzazioni e standard C++ moderno
g++ -O2 -std=c++17 mioprogramma.cpp -o mioprogramma
```

### Clang

Un compilatore moderno basato su LLVM:

```bash
# Compilazione base
clang++ mioprogramma.cpp -o mioprogramma

# Con ottimizzazioni e standard C++ moderno
clang++ -O2 -std=c++17 mioprogramma.cpp -o mioprogramma
```

### Microsoft Visual C++ (MSVC)

Il compilatore di Microsoft, parte di Visual Studio:

```bash
# Da riga di comando (Developer Command Prompt)
cl mioprogramma.cpp /Fe:mioprogramma.exe
```

## Opzioni di Compilazione Comuni

- **-o**: Specifica il nome del file di output
- **-Wall**: Abilita tutti i warning comuni
- **-Werror**: Tratta i warning come errori
- **-std=c++XX**: Specifica lo standard C++ da utilizzare (es. c++11, c++14, c++17, c++20)
- **-O0, -O1, -O2, -O3**: Livelli di ottimizzazione (0 = nessuna, 3 = massima)
- **-g**: Aggiunge informazioni di debug

## Compilazione di Progetti Multi-File

Per progetti con più file sorgente, ci sono diverse opzioni:

### Compilazione Manuale

```bash
# Compila ogni file in un file oggetto
g++ -c file1.cpp
g++ -c file2.cpp

# Collega i file oggetto in un eseguibile
g++ file1.o file2.o -o mioprogramma
```

### Compilazione in un Unico Comando

```bash
g++ file1.cpp file2.cpp -o mioprogramma
```

### Utilizzo di Make

Per progetti più grandi, è comune utilizzare `make` con un `Makefile`:

```makefile
# Esempio di Makefile semplice
CXX = g++
CXXFLAGS = -Wall -std=c++17

mioprogramma: file1.o file2.o
	$(CXX) file1.o file2.o -o mioprogramma

file1.o: file1.cpp
	$(CXX) $(CXXFLAGS) -c file1.cpp

file2.o: file2.cpp
	$(CXX) $(CXXFLAGS) -c file2.cpp

clean:
	rm -f *.o mioprogramma
```

### Sistemi di Build Moderni

Per progetti complessi, si possono utilizzare sistemi come CMake:

```cmake
# Esempio di CMakeLists.txt
cmake_minimum_required(VERSION 3.10)
project(MioProgetto)

set(CMAKE_CXX_STANDARD 17)

add_executable(mioprogramma file1.cpp file2.cpp)
```

## Esecuzione del Programma

Dopo la compilazione, è possibile eseguire il programma:

### Su Windows

```bash
# Da Command Prompt o PowerShell
mioprogramma.exe

# O semplicemente
mioprogramma
```

### Su Linux/macOS

```bash
# Se il programma è nella directory corrente
./mioprogramma
```

## Errori Comuni di Compilazione

1. **Errori di Sintassi**: Punti e virgola mancanti, parentesi non bilanciate, ecc.
2. **Errori di Tipo**: Assegnazione di tipi incompatibili, conversioni non valide, ecc.
3. **Errori di Linking**: Funzioni dichiarate ma non definite, simboli mancanti, ecc.
4. **Errori di Preprocessore**: File header non trovati, macro mal definite, ecc.

## Best Practices

1. **Compilazione Incrementale**: Compila spesso durante lo sviluppo per individuare errori precocemente.
2. **Usa Warning Elevati**: Abilita `-Wall` e `-Wextra` per individuare potenziali problemi.
3. **Organizza il Codice**: Dividi progetti grandi in moduli logici con propri file sorgente e header.
4. **Usa Sistemi di Build**: Per progetti non banali, utilizza make, CMake o altri sistemi di build.
5. **Controlla la Compatibilità**: Specifica lo standard C++ richiesto con l'opzione `-std`.

## Domande di Autovalutazione

1. Quali sono le tre fasi principali del processo di compilazione in C++?
2. Qual è la differenza tra compilazione e linking?
3. Cosa fa l'opzione `-Wall` e perché è utile?
4. Come si compila un programma C++ con più file sorgente?

## Esercizi Proposti

1. Compila ed esegui un semplice programma "Hello, World!" usando la riga di comando.
2. Crea un progetto con due file sorgente e compilalo manualmente.
3. Scrivi un Makefile semplice per un progetto con tre file sorgente.
4. Sperimenta con diverse opzioni di compilazione e osserva come influenzano il processo di compilazione e l'eseguibile risultante.