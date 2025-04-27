# Esercitazione 08: Funzioni - Definizione e Chiamata

## Obiettivo

L'obiettivo di questa esercitazione è comprendere il concetto di funzioni in C++, imparare a definirle, dichiararle e chiamarle correttamente. Le funzioni sono blocchi di codice riutilizzabili che eseguono operazioni specifiche e sono fondamentali per organizzare il codice in modo modulare.

## Descrizione

Scrivi un programma C++ che:
1. Definisce almeno tre funzioni diverse:
   - Una funzione che non accetta parametri e non restituisce valori
   - Una funzione che accetta parametri ma non restituisce valori
   - Una funzione che accetta parametri e restituisce un valore
2. Chiama ciascuna funzione dal `main()`
3. Dimostra l'uso di prototipi di funzione
4. Utilizza funzioni con parametri di default

## Argomenti Teorici Correlati

Per completare questa esercitazione, è utile comprendere i seguenti concetti:

1. [Introduzione alle Funzioni](teoria/01_introduzione_funzioni.md)
2. [Definizione e Dichiarazione di Funzioni](teoria/02_definizione_dichiarazione.md)
3. [Parametri e Valori di Ritorno](teoria/03_parametri_valori_ritorno.md)
4. [Prototipi di Funzione](teoria/04_prototipi.md)
5. [Parametri di Default](teoria/05_parametri_default.md)

## Codice Soluzione (Esempio)

```cpp
#include <iostream>
#include <string>

// Prototipi di funzione
void saluta();
void salutaPersona(const std::string& nome);
int somma(int a, int b);
void stampaInfo(std::string nome, int età = 0, std::string città = "Non specificata");

int main() {
    // Chiamata a funzione senza parametri e senza valore di ritorno
    saluta();
    
    // Chiamata a funzione con parametri ma senza valore di ritorno
    salutaPersona("Mario");
    
    // Chiamata a funzione con parametri e con valore di ritorno
    int risultato = somma(5, 3);
    std::cout << "La somma è: " << risultato << std::endl;
    
    // Chiamata a funzione con parametri di default
    stampaInfo("Luigi");  // Usa i valori di default per età e città
    stampaInfo("Maria", 25);  // Usa il valore di default per città
    stampaInfo("Giovanni", 30, "Roma");  // Non usa valori di default
    
    return 0;
}

// Definizione delle funzioni

// Funzione senza parametri e senza valore di ritorno
void saluta() {
    std::cout << "Ciao a tutti!" << std::endl;
}

// Funzione con parametri ma senza valore di ritorno
void salutaPersona(const std::string& nome) {
    std::cout << "Ciao, " << nome << "!" << std::endl;
}

// Funzione con parametri e con valore di ritorno
int somma(int a, int b) {
    return a + b;
}

// Funzione con parametri di default
void stampaInfo(std::string nome, int età, std::string città) {
    std::cout << "\nInformazioni:" << std::endl;
    std::cout << "Nome: " << nome << std::endl;
    
    if (età > 0) {
        std::cout << "Età: " << età << std::endl;
    } else {
        std::cout << "Età: Non specificata" << std::endl;
    }
    
    std::cout << "Città: " << città << std::endl;
}
```

## Esercizi Proposti

1. **Calcolatrice di Base**: Crea un programma che definisce funzioni separate per addizione, sottrazione, moltiplicazione e divisione. Il programma dovrebbe chiedere all'utente due numeri e l'operazione da eseguire, quindi chiamare la funzione appropriata.

2. **Convertitore di Temperature**: Scrivi funzioni per convertire temperature tra Celsius e Fahrenheit, e viceversa. Il programma dovrebbe permettere all'utente di scegliere la direzione della conversione.

3. **Generatore di Sequenze**: Crea funzioni che generano e stampano diverse sequenze numeriche (es. numeri pari, dispari, primi, Fibonacci) fino a un limite specificato dall'utente.

4. **Validatore di Input**: Scrivi una funzione che verifica se l'input dell'utente è un numero valido. Usa questa funzione in un programma che continua a chiedere input finché non riceve un numero valido.

## Domande di Auto-valutazione

1. Qual è la differenza tra la dichiarazione e la definizione di una funzione?
2. Perché è utile utilizzare i prototipi di funzione?
3. Come funzionano i parametri di default e quali sono le loro limitazioni?
4. Cosa succede se si definiscono due funzioni con lo stesso nome ma parametri diversi?
5. Quali sono i vantaggi dell'uso delle funzioni nella programmazione?

## Best Practices

- Dai alle funzioni nomi descrittivi che riflettono chiaramente il loro scopo
- Mantieni le funzioni brevi e focalizzate su un singolo compito
- Usa i commenti per documentare lo scopo della funzione, i parametri e il valore di ritorno
- Preferisci i parametri di tipo riferimento costante (`const &`) per gli oggetti grandi
- Organizza le funzioni correlate in file separati o in classi quando appropriato
- Evita effetti collaterali inaspettati nelle funzioni
- Verifica sempre i casi limite e gestisci le eccezioni quando necessario