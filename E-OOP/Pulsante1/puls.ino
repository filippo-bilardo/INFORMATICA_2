#include "Pulsante.h"

Pulsante pulsante(2); // Pin 2 come parametro del costruttore

void setup() {
  Serial.begin(9600); // Inizializza la comunicazione seriale
}

void loop() {
  pulsante.test(2); // Esegue il test per verificare se è stato effettuato un click
}
