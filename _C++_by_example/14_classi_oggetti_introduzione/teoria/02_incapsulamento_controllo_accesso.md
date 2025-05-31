# Incapsulamento e Controllo degli Accessi in C++

In questa guida, esploreremo il concetto di incapsulamento e i meccanismi di controllo degli accessi nelle classi C++.

## Cos'è l'Incapsulamento?

L'incapsulamento è uno dei principi fondamentali della programmazione orientata agli oggetti. Consiste nel:

1. **Nascondere i dettagli implementativi** di una classe
2. **Esporre solo le funzionalità necessarie** attraverso un'interfaccia ben definita
3. **Proteggere i dati** da accessi non autorizzati o modifiche improprie

L'incapsulamento migliora la sicurezza del codice, riduce la complessità e facilita la manutenzione.

## Specificatori di Accesso in C++

C++ fornisce tre specificatori di accesso per implementare l'incapsulamento:

1. **private**: i membri sono accessibili solo all'interno della classe
2. **protected**: i membri sono accessibili all'interno della classe e nelle classi derivate
3. **public**: i membri sono accessibili da qualsiasi parte del programma

### Esempio di Base

```cpp
class Persona {
private:  // Accessibile solo all'interno della classe
    std::string nome;
    int età;
    
protected:  // Accessibile nella classe e nelle classi derivate
    std::string indirizzo;
    
public:  // Accessibile da qualsiasi parte del programma
    void setNome(std::string n) {
        nome = n;
    }
    
    std::string getNome() {
        return nome;
    }
    
    void setEtà(int e) {
        if (e >= 0 && e <= 120) {  // Validazione dei dati
            età = e;
        }
    }
    
    int getEtà() {
        return età;
    }
};
```

## Getter e Setter

I metodi getter e setter sono funzioni che permettono di accedere e modificare i membri privati di una classe in modo controllato:

- **Getter**: metodi che restituiscono il valore di un membro privato
- **Setter**: metodi che modificano il valore di un membro privato, spesso con validazione

### Vantaggi dei Getter e Setter

1. **Validazione dei dati**: i setter possono verificare che i valori siano validi prima di assegnarli
2. **Controllo delle modifiche**: è possibile implementare logiche aggiuntive quando un valore viene modificato
3. **Flessibilità**: l'implementazione interna può cambiare senza modificare il codice client
4. **Debugging**: è più facile inserire breakpoint o logging in un metodo che in un accesso diretto

### Esempio di Getter e Setter

```cpp
class ContoBancario {
private:
    double saldo;
    std::string numeroConto;
    
public:
    // Costruttore
    ContoBancario(std::string numero, double saldoIniziale) {
        numeroConto = numero;
        if (saldoIniziale >= 0) {
            saldo = saldoIniziale;
        } else {
            saldo = 0;
            std::cout << "Saldo iniziale non valido. Impostato a 0." << std::endl;
        }
    }
    
    // Getter
    double getSaldo() {
        return saldo;
    }
    
    std::string getNumeroConto() {
        return numeroConto;
    }
    
    // Setter con validazione
    void deposita(double importo) {
        if (importo > 0) {
            saldo += importo;
        } else {
            std::cout << "Importo non valido per il deposito." << std::endl;
        }
    }
    
    bool preleva(double importo) {
        if (importo > 0 && importo <= saldo) {
            saldo -= importo;
            return true;
        } else {
            std::cout << "Prelievo non valido o fondi insufficienti." << std::endl;
            return false;
        }
    }
};
```

## Membri e Funzioni Friend

In C++, è possibile concedere accesso ai membri privati e protetti di una classe ad altre funzioni o classi utilizzando la parola chiave `friend`.

### Funzioni Friend

```cpp
class Cerchio {
private:
    double raggio;
    
public:
    Cerchio(double r) : raggio(r) {}
    
    double getRaggio() { return raggio; }
    
    // Dichiarazione di una funzione friend
    friend double calcolaArea(const Cerchio& c);
};

// Definizione della funzione friend
double calcolaArea(const Cerchio& c) {
    // Può accedere direttamente al membro privato raggio
    return 3.14159 * c.raggio * c.raggio;
}
```

### Classi Friend

```cpp
class Motore;

class Auto {
private:
    std::string modello;
    Motore* motore;
    
public:
    Auto(std::string m) : modello(m), motore(nullptr) {}
    
    // Dichiarazione di una classe friend
    friend class Meccanico;
};

class Meccanico {
public:
    void ripara(Auto& a) {
        // Può accedere ai membri privati di Auto
        std::cout << "Riparazione dell'auto modello: " << a.modello << std::endl;
    }
};
```

## Best Practices per l'Incapsulamento

1. **Mantieni i dati privati**: i membri dati dovrebbero essere quasi sempre privati
2. **Usa getter e setter quando necessario**: non per tutti i membri, solo quando serve controllo
3. **Valida i dati nei setter**: assicurati che i dati siano validi prima di assegnarli
4. **Usa friend con parsimonia**: l'uso eccessivo di friend può compromettere l'incapsulamento
5. **Progetta interfacce chiare**: l'interfaccia pubblica dovrebbe essere intuitiva e completa

## Esempio Completo

```cpp
#include <iostream>
#include <string>

class Prodotto {
private:
    std::string nome;
    double prezzo;
    int quantità;
    
public:
    // Costruttore
    Prodotto(std::string n, double p, int q) {
        nome = n;
        setPrezzo(p);
        setQuantità(q);
    }
    
    // Getter
    std::string getNome() const {
        return nome;
    }
    
    double getPrezzo() const {
        return prezzo;
    }
    
    int getQuantità() const {
        return quantità;
    }
    
    // Setter con validazione
    void setNome(std::string n) {
        nome = n;
    }
    
    void setPrezzo(double p) {
        if (p >= 0) {
            prezzo = p;
        } else {
            std::cout << "Prezzo non valido. Deve essere >= 0." << std::endl;
            prezzo = 0;
        }
    }
    
    void setQuantità(int q) {
        if (q >= 0) {
            quantità = q;
        } else {
            std::cout << "Quantità non valida. Deve essere >= 0." << std::endl;
            quantità = 0;
        }
    }
    
    // Altri metodi
    double getValoreTotale() const {
        return prezzo * quantità;
    }
    
    void stampaInfo() const {
        std::cout << "Prodotto: " << nome << std::endl;
        std::cout << "Prezzo: €" << prezzo << std::endl;
        std::cout << "Quantità: " << quantità << std::endl;
        std::cout << "Valore totale: €" << getValoreTotale() << std::endl;
    }
};

int main() {
    // Creazione di un prodotto
    Prodotto p1("Laptop", 899.99, 5);
    
    // Utilizzo dei getter
    std::cout << "Nome: " << p1.getNome() << std::endl;
    
    // Utilizzo dei setter
    p1.setPrezzo(999.99);
    p1.setQuantità(3);
    
    // Visualizzazione delle informazioni
    p1.stampaInfo();
    
    // Test della validazione
    p1.setPrezzo(-100);  // Dovrebbe mostrare un messaggio di errore
    
    return 0;
}
```

## Domande di Autovalutazione

1. Cos'è l'incapsulamento e perché è importante nella programmazione orientata agli oggetti?
2. Quali sono i tre specificatori di accesso in C++ e come differiscono tra loro?
3. Qual è lo scopo dei metodi getter e setter? Perché non rendere semplicemente pubblici i membri dati?
4. Cosa sono le funzioni e le classi friend? Quando è appropriato utilizzarle?
5. Come può l'incapsulamento migliorare la manutenibilità del codice?

## Esercizi Proposti

1. Crea una classe `Temperatura` che memorizzi una temperatura in gradi Celsius ma fornisca metodi per ottenere il valore in Fahrenheit e Kelvin.
2. Implementa una classe `Password` che memorizzi una password in modo sicuro e fornisca un metodo per verificare se una password inserita corrisponde a quella memorizzata.
3. Crea una classe `Dipendente` con attributi privati come stipendio, ruolo e anni di servizio, e metodi appropriati per accedere e modificare questi dati in modo sicuro.
4. Implementa una classe `Veicolo` con attributi privati e una classe friend `Officina` che possa accedere direttamente a questi attributi per la manutenzione.

## Prossimo Argomento

Nel prossimo argomento, esploreremo l'ereditarietà in C++, un altro principio fondamentale della programmazione orientata agli oggetti.