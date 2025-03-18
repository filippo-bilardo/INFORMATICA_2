# Riconoscitore di Sequenza di Parole

## Panoramica del Progetto
Questo progetto implementa un sistema di riconoscimento di sequenze di parole utilizzando Arduino. Il sistema è in grado di riconoscere una sequenza predefinita di parole inserite dall'utente tramite la comunicazione seriale e attivare/disattivare un "allarme" virtuale in base al riconoscimento della sequenza corretta.

## Simulazione Online
È possibile provare il progetto online utilizzando il simulatore Wokwi:
[Simulazione Wokwi](https://wokwi.com/projects/425709756229035009)

## Analisi dei Requisiti

### Requisiti Funzionali
1. **Riconoscimento di Sequenza**: Il sistema deve riconoscere una sequenza predefinita di parole ("apri sesamo ora").
2. **Interfaccia Utente**: L'utente deve poter inserire parole tramite la comunicazione seriale.
3. **Feedback Visivo**: Il sistema deve fornire feedback visivo tramite LED per indicare lo stato dell'allarme.
4. **Gestione dello Stato**: Il sistema deve alternare tra stato di allarme attivo e disattivo quando la sequenza corretta viene riconosciuta.
5. **Memorizzazione Dinamica**: Le parole inserite devono essere memorizzate in una struttura dati dinamica (lista concatenata).

### Requisiti Non Funzionali
1. **Efficienza di Memoria**: Il sistema deve gestire efficacemente la memoria limitata di Arduino.
2. **Robustezza**: Il sistema deve essere in grado di gestire input non validi o incompleti.
3. **Reattività**: Il sistema deve rispondere in tempo reale agli input dell'utente.
4. **Manutenibilità**: Il codice deve essere ben strutturato e documentato per facilitare future modifiche.

### Specifiche Hardware/Software
- **Hardware**: Arduino (qualsiasi modello compatibile con la libreria Arduino.h)
- **Componenti**: Due LED (verde e rosso) collegati rispettivamente ai pin 8 e 13
- **Software**: Arduino IDE o ambiente compatibile
- **Librerie**: Arduino.h (standard)

## Struttura del Progetto
- **Riconoscitore.ino**: File principale contenente il codice sorgente del progetto
- **Introduzione_Teorica.md**: Documento che spiega i concetti teorici alla base del progetto
- **diagram.json**: File di configurazione per la simulazione Wokwi
- **README.md**: Questo file di documentazione

## Implementazione

### Strutture Dati
Il progetto utilizza una lista concatenata per memorizzare la sequenza di parole inserite dall'utente. La lista è implementata tramite:

1. **Struttura Nodo**: Contiene una parola e un puntatore al nodo successivo
   ```cpp
   struct Nodo {
     char parola[MAX_LUNGHEZZA_PAROLA];
     Nodo* prossimo;
     // ...
   };
   ```

2. **Classe ListaParole**: Gestisce la lista concatenata con operazioni come aggiunta, rimozione e confronto
   ```cpp
   class ListaParole {
     private:
       Nodo* testa;
       Nodo* coda;
       int lunghezza;
     public:
       // Metodi per gestire la lista
       // ...
   };
   ```

### Algoritmo di Riconoscimento
Il sistema utilizza un algoritmo di confronto sequenziale per verificare se la sequenza di parole inserite corrisponde alla sequenza predefinita. Quando viene riconosciuta la sequenza corretta, lo stato dell'allarme viene invertito.

### Gestione della Memoria
Il progetto implementa una gestione efficiente della memoria attraverso:
- Allocazione dinamica dei nodi della lista
- Rimozione automatica dei nodi più vecchi quando la lista supera la lunghezza massima
- Liberazione della memoria quando i nodi non sono più necessari

## Istruzioni per l'Uso
1. Caricare il codice su una scheda Arduino
2. Aprire il monitor seriale (9600 baud)
3. Inserire parole seguite da spazio, punto o invio
4. Osservare i LED per il feedback visivo:
   - LED verde lampeggiante e acceso: allarme attivato
   - LED rosso lampeggiante e acceso: allarme disattivato

## Estensioni Possibili
- Aggiungere più sequenze riconoscibili
- Implementare un sistema di autenticazione basato su password
- Aggiungere un'interfaccia hardware (LCD, tastiera, ecc.)
- Integrare con altri sistemi tramite comunicazione wireless

## Autore
Filippo Bilardo

## Versione
1.0 - 17/03/2025 - Versione iniziale

---

[Torna all'indice](../README.md)