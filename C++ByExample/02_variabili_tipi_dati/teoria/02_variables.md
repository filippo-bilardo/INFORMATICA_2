# Dichiarazione e Inizializzazione di Variabili in C++

In questa guida, esploreremo come dichiarare e inizializzare variabili in C++, un concetto fondamentale per qualsiasi programma.

## Cos'è una Variabile?

Una variabile è un'area di memoria che ha un nome e può contenere un valore di un determinato tipo. Le variabili permettono di memorizzare e manipolare dati all'interno di un programma.

## Dichiarazione di Variabili

Per dichiarare una variabile in C++, è necessario specificare il tipo di dato seguito dal nome della variabile:

```cpp
tipo nome_variabile;
```

Esempi:

```cpp
int eta;           // Dichiara una variabile intera chiamata 'eta'
double temperatura; // Dichiara una variabile in virgola mobile chiamata 'temperatura'
char iniziale;     // Dichiara una variabile carattere chiamata 'iniziale'
bool isAttivo;     // Dichiara una variabile booleana chiamata 'isAttivo'
```

## Inizializzazione di Variabili

L'inizializzazione è il processo di assegnazione di un valore iniziale a una variabile. In C++ ci sono diversi modi per inizializzare una variabile:

### 1. Inizializzazione con Assegnazione

```cpp
tipo nome_variabile = valore;
```

Esempi:

```cpp
int eta = 25;                // Inizializza 'eta' con il valore 25
double temperatura = 36.6;    // Inizializza 'temperatura' con il valore 36.6
char iniziale = 'A';          // Inizializza 'iniziale' con il carattere 'A'
bool isAttivo = true;         // Inizializza 'isAttivo' con il valore true
```

### 2. Inizializzazione Uniforme (C++11 e successivi)

```cpp
tipo nome_variabile{valore};
```

Esempi:

```cpp
int eta{25};                // Inizializza 'eta' con il valore 25
double temperatura{36.6};    // Inizializza 'temperatura' con il valore 36.6
char iniziale{'A'};          // Inizializza 'iniziale' con il carattere 'A'
bool isAttivo{true};         // Inizializza 'isAttivo' con il valore true
```

L'inizializzazione uniforme offre maggiore sicurezza contro conversioni implicite potenzialmente pericolose:

```cpp
int x = 3.14;   // Consentito, ma c'è perdita di dati (x = 3)
int y{3.14};    // Errore di compilazione: narrowing conversion
```

### 3. Inizializzazione Diretta

```cpp
tipo nome_variabile(valore);
```

Esempi:

```cpp
int eta(25);                // Inizializza 'eta' con il valore 25
double temperatura(36.6);    // Inizializza 'temperatura' con il valore 36.6
char iniziale('A');          // Inizializza 'iniziale' con il carattere 'A'
bool isAttivo(true);         // Inizializza 'isAttivo' con il valore true
```

## Dichiarazione e Inizializzazione di Più Variabili

È possibile dichiarare e inizializzare più variabili dello stesso tipo in un'unica istruzione:

```cpp
int a = 5, b = 10, c = 15;  // Dichiara e inizializza tre variabili intere
double x{1.1}, y{2.2}, z;    // Dichiara e inizializza due variabili double e ne dichiara una terza
```

## Variabili Non Inizializzate

In C++, le variabili locali (dichiarate all'interno di funzioni) non vengono inizializzate automaticamente. Utilizzare una variabile non inizializzata può portare a comportamenti imprevedibili:

```cpp
int numero;          // Variabile non inizializzata
std::cout << numero; // Comportamento imprevedibile: il valore potrebbe essere qualsiasi cosa
```

Le variabili globali e statiche vengono invece inizializzate automaticamente a zero:

```cpp
int variabileGlobale; // Inizializzata automaticamente a 0

int main() {
    static int variabileStatica; // Inizializzata automaticamente a 0
    // ...
}
```

## Best Practices

1. **Inizializza Sempre le Variabili**: Inizializza sempre le variabili al momento della dichiarazione per evitare comportamenti imprevedibili.

2. **Usa Nomi Significativi**: Scegli nomi che descrivano chiaramente lo scopo della variabile.

3. **Preferisci l'Inizializzazione Uniforme**: Quando possibile, usa l'inizializzazione uniforme `{}` per evitare conversioni implicite pericolose.

4. **Limita lo Scope delle Variabili**: Dichiara le variabili nel contesto più ristretto possibile, preferibilmente vicino al loro primo utilizzo.

5. **Usa `const` quando Appropriato**: Se una variabile non deve cambiare valore dopo l'inizializzazione, dichiarala come `const`.

```cpp
const double PI = 3.14159265359; // PI è una costante e non può essere modificata
```

## Domande di Autovalutazione

1. Qual è la differenza tra dichiarazione e inizializzazione di una variabile?
2. Quali sono i tre modi principali per inizializzare una variabile in C++?
3. Cosa succede se si utilizza una variabile locale non inizializzata?
4. Perché l'inizializzazione uniforme è considerata più sicura?
5. Quando è appropriato utilizzare il modificatore `const` per una variabile?

## Esercizi Proposti

1. Scrivi un programma che dichiari e inizializzi variabili di diversi tipi utilizzando i tre metodi di inizializzazione.
2. Crea un programma che mostri cosa succede quando si tenta di assegnare un valore di un tipo a una variabile di un altro tipo.
3. Implementa un semplice calcolatore che utilizzi variabili per memorizzare input, risultati intermedi e output finali.
4. Scrivi un programma che dimostri la differenza tra variabili locali, globali e statiche in termini di inizializzazione automatica.