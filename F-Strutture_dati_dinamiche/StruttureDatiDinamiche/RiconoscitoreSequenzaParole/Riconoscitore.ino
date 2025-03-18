/**
 * Riconoscitore di Sequenza di Parole
 *
 * Questo programma implementa un sistema di riconoscimento di sequenza di parole utilizzando Arduino.
 * L'utente inserisce una sequenza di parole tramite la linea seriale.
 * Le parole vengono memorizzate in una lista concatenata e quando la sequenza corrisponde a una
 * sequenza predefinita, un LED verde lampeggia e rimane acceso, indicando che l'allarme è attivato.
 * Se la sequenza viene reinserita, un LED rosso lampeggia e rimane acceso, indicando
 * che l'allarme è disattivato, e così via.
 *
 * https://wokwi.com/projects/425709756229035009
 *
 * @author Filippo Bilardo
 * @version 1.0 17/03/25 - Versione iniziale
 */
#include <Arduino.h>

const int PIN_LED_VERDE = 8;               // Pin per il LED verde
const int PIN_LED_ROSSO = 13;              // Pin per il LED rosso
const int LUNGHEZZA_SEQUENZA = 3;          // Numero di parole nella sequenza da riconoscere
const int MAX_LUNGHEZZA_PAROLA = 20;       // Lunghezza massima di una parola
bool allarmeAttivo = false;                // Stato dell'allarme (attivo/disattivo)

// Parole della sequenza corretta
const char* sequenzaCorretta[] = {"apri", "sesamo", "ora"};

// Struttura per il nodo della lista concatenata
struct Nodo {
  char parola[MAX_LUNGHEZZA_PAROLA];
  Nodo* prossimo;
  
  // Costruttore per facilitare la creazione di nodi
  Nodo(const char* _parola) {
    strncpy(parola, _parola, MAX_LUNGHEZZA_PAROLA);
    parola[MAX_LUNGHEZZA_PAROLA - 1] = '\0';  // Assicura la terminazione
    prossimo = nullptr;
  }
};

// Classe per gestire la lista concatenata
class ListaParole {
private:
  Nodo* testa;
  Nodo* coda;
  int lunghezza;

public:
  // Costruttore
  ListaParole() : testa(nullptr), coda(nullptr), lunghezza(0) {}
  
  // Distruttore
  ~ListaParole() {
    svuota();
  }
  
  // Aggiunge una parola alla fine della lista
  void aggiungi(const char* parola) {
    Nodo* nuovoNodo = new Nodo(parola);
    
    if (testa == nullptr) {
      // Lista vuota
      testa = nuovoNodo;
      coda = nuovoNodo;
    } else {
      // Aggiunge in coda
      coda->prossimo = nuovoNodo;
      coda = nuovoNodo;
    }
    
    lunghezza++;
    
    // Se la lista supera la lunghezza massima, rimuove il primo elemento
    if (lunghezza > LUNGHEZZA_SEQUENZA) {
      rimuoviPrimo();
    }
  }
  
  // Rimuove il primo elemento della lista
  void rimuoviPrimo() {
    if (testa == nullptr) return;
    
    Nodo* temp = testa;
    testa = testa->prossimo;
    delete temp;
    
    lunghezza--;
    
    // Se la lista è vuota, aggiorna anche la coda
    if (testa == nullptr) {
      coda = nullptr;
    }
  }
  
  // Svuota completamente la lista
  void svuota() {
    while (testa != nullptr) {
      rimuoviPrimo();
    }
  }
  
  // Confronta la lista con la sequenza corretta
  bool confrontaConSequenza(const char* sequenza[], int lunghezzaSequenza) {
    if (lunghezza != lunghezzaSequenza) return false;
    
    Nodo* corrente = testa;
    for (int i = 0; i < lunghezzaSequenza; i++) {
      if (corrente == nullptr || strcmp(corrente->parola, sequenza[i]) != 0) {
        return false;
      }
      corrente = corrente->prossimo;
    }
    return true;
  }
  
  // Stampa il contenuto della lista
  void stampa() {
    Serial.print("Sequenza attuale: ");
    
    Nodo* corrente = testa;
    while (corrente != nullptr) {
      Serial.print(corrente->parola);
      Serial.print(" ");
      corrente = corrente->prossimo;
    }
    Serial.println();
  }
  
  // Restituisce la lunghezza attuale della lista
  int getLunghezza() const {
    return lunghezza;
  }
};

// Oggetto lista globale
ListaParole listaParole;

// Buffer per la parola corrente
char parolaCorrente[MAX_LUNGHEZZA_PAROLA];
int indiceParola = 0;

// Prototipi delle funzioni
void LedVerdeConfigura();
void LedVerdeAccendi();
void LedVerdeSpegni();
void LedVerdeLampeggia(int volte, int ritardoMs);
void LedRossoConfigura();
void LedRossoAccendi();
void LedRossoSpegni();
void LedRossoLampeggia(int volte, int ritardoMs);
void SerialeMostraRicezione(const char* parola);
void AllarmeMostraStato();
void AllarmeImpostaStato(bool attivo);
void elaboraParola(const char* parola);
void aggiungiCarattere(char c);
void verificaSequenza();

void setup() {
  Serial.begin(9600);           // Inizializza la comunicazione seriale
  LedVerdeConfigura();          // Configura il pin del LED verde
  LedRossoConfigura();          // Configura il pin del LED rosso
  
  // Messaggio iniziale
  Serial.println("Sistema di riconoscimento sequenza di parole avviato");
  Serial.println("Inserisci parole terminate da un punto (.)");
  Serial.println("Sequenza corretta: \"apri sesamo ora\"");
}

void loop() {
  if (Serial.available() > 0) {
    char carattereInput = Serial.read();
    
    // Gestione dei caratteri speciali
    if (carattereInput == '.' || carattereInput == '\n' || carattereInput == ' ') {
      // Termina la parola corrente e la elabora
      if (indiceParola > 0) {
        parolaCorrente[indiceParola] = '\0';  // Termina la stringa
        elaboraParola(parolaCorrente);
        indiceParola = 0;  // Resetta l'indice per la prossima parola
      }
    } else {
      // Aggiungi il carattere alla parola corrente
      aggiungiCarattere(carattereInput);
    }
  }
}

/**
 * Aggiunge un carattere alla parola corrente
 */
void aggiungiCarattere(char c) {
  if (indiceParola < MAX_LUNGHEZZA_PAROLA - 1) {
    parolaCorrente[indiceParola++] = c;
  }
}

/**
 * Elabora una parola completa
 */
void elaboraParola(const char* parola) {
  SerialeMostraRicezione(parola);
  
  // Aggiunge la parola alla lista
  listaParole.aggiungi(parola);
  
  // Stampa la sequenza corrente
  listaParole.stampa();
  
  // Verifica se la sequenza corrisponde a quella corretta
  verificaSequenza();
}

/**
 * Verifica se la sequenza corrente corrisponde a quella corretta
 */
void verificaSequenza() {
  if (listaParole.confrontaConSequenza(sequenzaCorretta, LUNGHEZZA_SEQUENZA)) {
    Serial.println("Sequenza riconosciuta!");
    
    // Cambia lo stato dell'allarme (attiva/disattiva)
    AllarmeImpostaStato(!allarmeAttivo);
  }
}

/**
 * Configura il pin del LED verde
 */
void LedVerdeConfigura() {
  pinMode(PIN_LED_VERDE, OUTPUT);
  LedVerdeSpegni();
}

/**
 * Accende il LED verde
 */
void LedVerdeAccendi() {
  digitalWrite(PIN_LED_VERDE, HIGH);
}

/**
 * Spegne il LED verde
 */
void LedVerdeSpegni() {
  digitalWrite(PIN_LED_VERDE, LOW);
}

/**
 * Fa lampeggiare il LED verde per un determinato numero di volte
 * @param volte Il numero di volte che il LED deve lampeggiare
 * @param ritardoMs Il tempo di attesa tra un lampeggio e l'altro in millisecondi
 */
void LedVerdeLampeggia(int volte, int ritardoMs) {
  for (int i = 0; i < volte; i++) {
    LedVerdeAccendi();
    delay(ritardoMs);
    LedVerdeSpegni();
    delay(ritardoMs);
  }
}

/**
 * Configura il pin del LED rosso
 */
void LedRossoConfigura() {
  pinMode(PIN_LED_ROSSO, OUTPUT);
  LedRossoSpegni();
}

/**
 * Accende il LED rosso
 */
void LedRossoAccendi() {
  digitalWrite(PIN_LED_ROSSO, HIGH);
}

/**
 * Spegne il LED rosso
 */
void LedRossoSpegni() {
  digitalWrite(PIN_LED_ROSSO, LOW);
}

/**
 * Fa lampeggiare il LED rosso per un determinato numero di volte
 * @param volte Il numero di volte che il LED deve lampeggiare
 * @param ritardoMs Il tempo di attesa tra un lampeggio e l'altro in millisecondi
 */
void LedRossoLampeggia(int volte, int ritardoMs) {
  for (int i = 0; i < volte; i++) {
    LedRossoAccendi();
    delay(ritardoMs);
    LedRossoSpegni();
    delay(ritardoMs);
  }
}

/**
 * Indica la ricezione di una parola
 * @param parola La parola ricevuta
 */
void SerialeMostraRicezione(const char* parola) {
  LedVerdeAccendi();
  LedRossoAccendi();
  Serial.print("Ricevuto: ");
  Serial.println(parola);
  delay(50);
  
  // Mostra lo stato dell'allarme
  AllarmeMostraStato();
}

/**
 * Mostra lo stato dell'allarme (attivo/disattivo)
 */
void AllarmeMostraStato() {
  if (allarmeAttivo) {
    LedVerdeAccendi();
    LedRossoSpegni();
  } else {
    LedVerdeSpegni();
    LedRossoAccendi();
  }
}

/**
 * Imposta lo stato dell'allarme (attivo/disattivo)
 * @param attivo true per attivare l'allarme, false per disattivarlo
 */
void AllarmeImpostaStato(bool attivo) {
  allarmeAttivo = attivo;
  
  if (attivo) {
    // Attiva l'allarme
    Serial.println("Allarme attivato");
    LedVerdeLampeggia(3, 200);
    LedVerdeAccendi();
    LedRossoSpegni();
  } else {
    // Disattiva l'allarme
    Serial.println("Allarme disattivato");
    LedRossoLampeggia(3, 200);
    LedRossoAccendi();
    LedVerdeSpegni();
  }
}