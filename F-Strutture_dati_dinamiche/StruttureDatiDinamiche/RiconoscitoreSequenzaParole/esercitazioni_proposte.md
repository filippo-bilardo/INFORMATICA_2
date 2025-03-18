# Esercitazioni Proposte - Riconoscitore di Sequenza di Parole

Questo documento contiene una serie di esercitazioni e progetti proposti per estendere e migliorare il sistema di riconoscimento di sequenze di parole. Le attività sono organizzate per livello di difficoltà e area di interesse.

## Livello Base

### 1. Personalizzazione della Sequenza
**Obiettivo**: Modificare il programma per riconoscere una sequenza di parole diversa.

**Attività**:
- Cambiare la sequenza predefinita `apri sesamo ora` con una sequenza personalizzata
- Adattare la lunghezza della sequenza modificando la costante `LUNGHEZZA_SEQUENZA`
- Testare il sistema con la nuova sequenza

**Suggerimenti**:
```cpp
// Modificare queste righe nel codice
const int LUNGHEZZA_SEQUENZA = 4;          // Esempio: aumentare a 4 parole
const char* sequenzaCorretta[] = {"nuova", "sequenza", "da", "riconoscere"};
```

### 2. Miglioramento del Feedback
**Obiettivo**: Migliorare il feedback visivo del sistema.

**Attività**:
- Aggiungere un terzo LED (ad esempio giallo) che si accende quando l'utente ha inserito parte della sequenza corretta
- Implementare pattern di lampeggio diversi per indicare stati diversi
- Migliorare i messaggi sulla porta seriale per fornire più informazioni all'utente

**Suggerimenti**:
- Creare una funzione che verifichi se le parole inserite finora corrispondono all'inizio della sequenza corretta
- Utilizzare un nuovo pin per il LED aggiuntivo

### 3. Contatore di Tentativi
**Obiettivo**: Implementare un contatore che tenga traccia dei tentativi effettuati.

**Attività**:
- Aggiungere un contatore che si incrementa ogni volta che viene inserita una sequenza completa
- Visualizzare il numero di tentativi sulla porta seriale
- Implementare un limite massimo di tentativi falliti prima di bloccare il sistema

## Livello Intermedio

### 4. Multiple Sequenze di Attivazione
**Obiettivo**: Estendere il sistema per riconoscere più sequenze diverse.

**Attività**:
- Implementare il riconoscimento di almeno due sequenze diverse
- Associare azioni diverse a ciascuna sequenza (ad esempio, una sequenza attiva l'allarme, un'altra lo disattiva)
- Modificare la classe `ListaParole` per supportare il confronto con più sequenze

**Suggerimenti**:
```cpp
// Esempio di struttura per gestire più sequenze
struct SequenzaRiconoscibile {
  const char** parole;
  int lunghezza;
  void (*azione)();  // Puntatore a funzione da eseguire quando la sequenza è riconosciuta
};

// Definizione delle sequenze
const char* sequenzaAttivazione[] = {"attiva", "sistema", "ora"};
const char* sequenzaDisattivazione[] = {"disattiva", "sistema", "ora"};

SequenzaRiconoscibile sequenze[] = {
  {sequenzaAttivazione, 3, &attivaAllarme},
  {sequenzaDisattivazione, 3, &disattivaAllarme}
};
```

### 5. Implementazione di una Coda Circolare
**Obiettivo**: Sostituire la lista concatenata con una coda circolare.

**Attività**:
- Implementare una struttura dati di coda circolare per memorizzare le parole
- Confrontare l'efficienza di memoria e prestazioni rispetto alla lista concatenata
- Documentare i vantaggi e gli svantaggi di ciascun approccio

**Suggerimenti**:
```cpp
// Esempio di struttura per una coda circolare
class CodaCircolare {
private:
  char parole[LUNGHEZZA_SEQUENZA][MAX_LUNGHEZZA_PAROLA];
  int testa;
  int lunghezza;

public:
  CodaCircolare() : testa(0), lunghezza(0) {}
  
  void aggiungi(const char* parola) {
    // Implementare l'aggiunta di una parola alla coda
  }
  
  bool confrontaConSequenza(const char* sequenza[], int lunghezzaSequenza) {
    // Implementare il confronto con una sequenza
  }
};
```

### 6. Sistema di Autenticazione
**Obiettivo**: Trasformare il riconoscitore in un sistema di autenticazione.

**Attività**:
- Implementare un sistema che richieda l'inserimento della sequenza corretta per "sbloccare" funzionalità
- Aggiungere un timeout dopo un certo numero di tentativi falliti
- Implementare un sistema di log che registri i tentativi di accesso

## Livello Avanzato

### 7. Memorizzazione in EEPROM
**Obiettivo**: Utilizzare la memoria EEPROM di Arduino per memorizzare sequenze personalizzabili.

**Attività**:
- Implementare funzioni per salvare e caricare sequenze dalla memoria EEPROM
- Creare un'interfaccia per permettere all'utente di cambiare la sequenza riconosciuta
- Assicurarsi che la sequenza persista anche dopo il riavvio del sistema

**Suggerimenti**:
```cpp
#include <EEPROM.h>

// Funzione per salvare una sequenza in EEPROM
void salvaSequenzaInEEPROM(const char* sequenza[], int lunghezza) {
  // Implementare il salvataggio in EEPROM
}

// Funzione per caricare una sequenza da EEPROM
void caricaSequenzaDaEEPROM(char* sequenza[], int& lunghezza) {
  // Implementare il caricamento da EEPROM
}
```

### 8. Implementazione con Albero di Prefissi (Trie)
**Obiettivo**: Utilizzare una struttura dati ad albero per riconoscere più sequenze in modo efficiente.

**Attività**:
- Implementare un albero di prefissi (Trie) per memorizzare e riconoscere multiple sequenze
- Confrontare l'efficienza di questo approccio rispetto alla lista concatenata
- Implementare il riconoscimento di sequenze di lunghezza variabile

**Suggerimenti**:
```cpp
// Struttura per un nodo dell'albero di prefissi
struct NodoTrie {
  bool èFinale;  // Indica se questo nodo rappresenta la fine di una sequenza valida
  void (*azione)();  // Azione da eseguire se la sequenza è riconosciuta
  NodoTrie* figli[DIMENSIONE_VOCABOLARIO];  // Puntatori ai nodi figli
  
  NodoTrie() : èFinale(false), azione(nullptr) {
    for (int i = 0; i < DIMENSIONE_VOCABOLARIO; i++) {
      figli[i] = nullptr;
    }
  }
};
```

### 9. Integrazione con Display LCD
**Obiettivo**: Aggiungere un'interfaccia utente tramite display LCD.

**Attività**:
- Integrare un display LCD per mostrare lo stato del sistema e i messaggi all'utente
- Implementare un menu di configurazione accessibile tramite pulsanti
- Visualizzare in tempo reale le parole inserite e lo stato del riconoscimento

**Suggerimenti**:
```cpp
#include <LiquidCrystal.h>

// Inizializzazione del display LCD
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

// Funzione per aggiornare il display
void aggiornaDisplay(const char* messaggio, int riga) {
  lcd.setCursor(0, riga);
  lcd.print("                ");  // Cancella la riga
  lcd.setCursor(0, riga);
  lcd.print(messaggio);
}
```

## Progetti Completi

### 10. Sistema di Controllo Accessi
**Obiettivo**: Sviluppare un sistema completo di controllo accessi basato sul riconoscimento di sequenze.

**Attività**:
- Implementare un sistema che permetta a più utenti di avere sequenze diverse
- Aggiungere un attuatore (ad esempio un servo motore) che simula lo sblocco di una porta
- Implementare livelli di accesso diversi (amministratore, utente standard, ecc.)
- Aggiungere un log degli accessi con timestamp

### 11. Assistente Vocale Semplificato
**Obiettivo**: Simulare un assistente vocale che risponde a comandi specifici.

**Attività**:
- Implementare il riconoscimento di diverse sequenze di comando (ad esempio "accendi luce", "spegni luce")
- Collegare diversi attuatori (LED, buzzer, servo) che rispondono ai comandi
- Implementare un sistema di feedback che conferma l'esecuzione dei comandi
- Aggiungere la possibilità di definire nuovi comandi a runtime

### 12. Gioco di Memoria
**Obiettivo**: Trasformare il sistema in un gioco di memoria.

**Attività**:
- Implementare un gioco in cui il sistema mostra una sequenza (tramite LED o display) e l'utente deve ripeterla
- Aumentare progressivamente la difficoltà (lunghezza della sequenza)
- Implementare un sistema di punteggio e record
- Aggiungere effetti sonori e visivi per rendere il gioco più coinvolgente

## Suggerimenti per l'Implementazione

1. **Gestione della Memoria**: Prestare sempre attenzione alla gestione della memoria, specialmente quando si utilizzano strutture dati dinamiche su Arduino.

2. **Modularità**: Organizzare il codice in moduli ben definiti per facilitare le modifiche e le estensioni.

3. **Documentazione**: Documentare adeguatamente il codice con commenti e una descrizione generale del funzionamento.

4. **Test**: Testare accuratamente ogni modifica per assicurarsi che il sistema funzioni correttamente in tutte le condizioni.

5. **Ottimizzazione**: Considerare le limitazioni hardware di Arduino e ottimizzare il codice di conseguenza.

---

[Torna all'indice](../README.md)