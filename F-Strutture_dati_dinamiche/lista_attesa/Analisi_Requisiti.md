# Analisi dei Requisiti - Sistema di Gestione Lista d'Attesa

## 1. Introduzione

### 1.1 Scopo del Documento
Questo documento ha lo scopo di definire i requisiti per il sistema di gestione della lista d'attesa implementato in C. Il documento descrive le funzionalità richieste, i vincoli tecnici e le specifiche di implementazione del sistema.

### 1.2 Descrizione Generale del Sistema
Il sistema gestisce una lista d'attesa per due sportelli di servizio, permettendo di aggiungere nuovi clienti alla coda, servire i clienti in ordine di arrivo e visualizzare informazioni sullo stato corrente del sistema, inclusi i tempi di attesa stimati.

## 2. Requisiti Funzionali

### 2.1 Gestione della Lista d'Attesa
- **RF1.1**: Il sistema deve permettere l'aggiunta di nuovi clienti alla lista d'attesa
- **RF1.2**: Ad ogni cliente deve essere assegnato un numero progressivo univoco
- **RF1.3**: Il sistema deve registrare l'orario di arrivo di ciascun cliente
- **RF1.4**: I clienti devono essere serviti secondo l'ordine di arrivo (FIFO - First In, First Out)

### 2.2 Gestione degli Sportelli
- **RF2.1**: Il sistema deve gestire due sportelli indipendenti
- **RF2.2**: Ogni sportello deve poter servire un cliente alla volta
- **RF2.3**: Il sistema deve tenere traccia del cliente attualmente servito da ciascuno sportello
- **RF2.4**: Il sistema deve registrare l'orario di inizio servizio per ogni cliente

### 2.3 Calcolo e Visualizzazione dei Tempi
- **RF3.1**: Il sistema deve calcolare il tempo di attesa effettivo per ogni cliente servito
- **RF3.2**: Il sistema deve stimare il tempo medio di attesa per i clienti ancora in coda
- **RF3.3**: Il sistema deve visualizzare il tempo di attesa quando un cliente viene servito

### 2.4 Interfaccia Utente
- **RF4.1**: Il sistema deve fornire un menu interattivo con le seguenti opzioni:
  - Servire il prossimo cliente allo Sportello 1
  - Servire il prossimo cliente allo Sportello 2
  - Aggiungere un nuovo cliente alla lista d'attesa
  - Uscire dal programma
- **RF4.2**: Il sistema deve visualizzare lo stato corrente, inclusi:
  - Stato di ciascuno sportello (attivo/inattivo)
  - Numero del cliente attualmente servito da ciascuno sportello
  - Numero di clienti in attesa
  - Tempo medio di attesa stimato
  - Prossimo numero da servire

## 3. Requisiti Non Funzionali

### 3.1 Usabilità
- **RNF1.1**: L'interfaccia utente deve utilizzare colori diversi per migliorare la leggibilità
- **RNF1.2**: I messaggi di stato devono essere chiari e informativi
- **RNF1.3**: Il sistema deve pulire lo schermo tra un'operazione e l'altra per mantenere l'interfaccia ordinata

### 3.2 Performance
- **RNF2.1**: Le operazioni di aggiunta e rimozione dalla lista d'attesa devono essere efficienti (tempo costante O(1))
- **RNF2.2**: Il calcolo del tempo medio di attesa deve essere basato su stime realistiche

### 3.3 Affidabilità
- **RNF3.1**: Il sistema deve gestire correttamente i casi limite (lista vuota, memoria esaurita)
- **RNF3.2**: Il sistema deve liberare correttamente la memoria allocata prima di terminare

## 4. Vincoli Tecnici

### 4.1 Implementazione
- **VT1.1**: Il sistema deve essere implementato in linguaggio C
- **VT1.2**: La lista d'attesa deve essere implementata utilizzando liste concatenate
- **VT1.3**: Il sistema deve utilizzare allocazione dinamica della memoria per gestire i clienti

### 4.2 Ambiente Operativo
- **VT2.1**: Il sistema deve funzionare su ambiente Windows con supporto per i codici ANSI
- **VT2.2**: Il sistema deve utilizzare la libreria standard C per la gestione del tempo e dell'I/O

## 5. Modello dei Dati

### 5.1 Strutture Dati Principali

#### 5.1.1 Cliente
- Numero assegnato (intero)
- Orario di arrivo (timestamp)
- Riferimento al prossimo cliente

#### 5.1.2 Sportello
- Numero dello sportello (intero)
- Numero del cliente corrente (intero)
- Orario di inizio servizio (timestamp)
- Stato di attività (booleano)

#### 5.1.3 Lista d'Attesa
- Riferimento al primo cliente (testa)
- Riferimento all'ultimo cliente (coda)
- Prossimo numero da assegnare (intero)
- Contatore dei clienti in attesa (intero)

## 6. Casi d'Uso

### 6.1 Aggiunta di un Nuovo Cliente
1. L'utente seleziona l'opzione "Aggiungi nuovo cliente"
2. Il sistema crea un nuovo nodo cliente
3. Il sistema assegna un numero progressivo al cliente
4. Il sistema registra l'orario di arrivo
5. Il sistema aggiunge il cliente alla fine della lista d'attesa
6. Il sistema incrementa il contatore dei clienti in attesa
7. Il sistema visualizza un messaggio di conferma

### 6.2 Servizio di un Cliente allo Sportello
1. L'utente seleziona l'opzione per servire un cliente a uno degli sportelli
2. Il sistema verifica se ci sono clienti in attesa
3. Se ci sono clienti, il sistema rimuove il primo cliente dalla lista
4. Il sistema aggiorna lo stato dello sportello selezionato
5. Il sistema calcola e visualizza il tempo di attesa del cliente
6. Il sistema decrementa il contatore dei clienti in attesa
7. Il sistema libera la memoria allocata per il cliente servito

### 6.3 Visualizzazione dello Stato del Sistema
1. Il sistema pulisce lo schermo
2. Il sistema visualizza il titolo e le informazioni sugli sportelli
3. Il sistema visualizza il numero di clienti in attesa
4. Se ci sono clienti in attesa, il sistema calcola e visualizza il tempo medio di attesa stimato
5. Il sistema visualizza il prossimo numero da servire (se applicabile)
6. Il sistema visualizza il menu delle opzioni disponibili

## 7. Conclusioni

Questo documento di analisi dei requisiti fornisce una base solida per l'implementazione del sistema di gestione della lista d'attesa. Il sistema, già implementato in C utilizzando liste concatenate, soddisfa i requisiti funzionali e non funzionali descritti, offrendo una soluzione efficiente e user-friendly per la gestione delle code di attesa presso due sportelli di servizio.