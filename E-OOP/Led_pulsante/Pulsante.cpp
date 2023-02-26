#include "Arduino.h"
#include "Pulsante.h"

/**
* @brief Costruttore della classe Pulsante
* @param pin Pin del pulsante su Arduino
*
* Inizializza il pin del pulsante come input con pull-up e 
* inizializza i membri dati statoPrecedente_, statoAttuale_, ultimoClick_ e ultimoDoppioClick_ 
*/
Pulsante::Pulsante(int pin) {
  pin_ = pin;
  statoPrecedente_ = LOW;
  statoAttuale_ = LOW;
  ultimoClick_ = 0;
  ultimoDoppioClick_ = 0;
  pinMode(pin_, INPUT_PULLUP);
}

/**
* @brief Metodo press
* @return true se il pulsante è stato premuto, false altrimenti
*
* Legge lo stato attuale del pin del pulsante e confronta con lo stato precedente.
* Se lo stato attuale è LOW e quello precedente è HIGH, il pulsante è stato premuto.
* Aggiorna lo stato precedente con quello attuale.
*/
bool Pulsante::press() {
  statoAttuale_ = digitalRead(pin_);
  if (statoAttuale_ == LOW && statoPrecedente_ == HIGH) {
    statoPrecedente_ = statoAttuale_;
    return true;
  }
  statoPrecedente_ = statoAttuale_;
  return false;
}

/**
* @brief Metodo click
* @return true se il pulsante è stato cliccato, false altrimenti
*
* Utilizza il metodo press() per verificare se il pulsante è stato premuto e controlla che sia trascorso un tempo sufficientemente lungo dall'ultimo click.
* Aggiorna l'ultimo click.
*/
bool Pulsante::click() {
  if (press() && (millis() - ultimoClick_ > 50)) {
    ultimoClick_ = millis();
    return true;
  }
  return false;
}

/**
* @brief Metodo doppio_click
* @return true se il pulsante è stato cliccato due volte in rapida successione, false altrimenti
*
* Utilizza il metodo click() per verificare se il pulsante è stato cliccato e controlla che sia trascorso un tempo sufficientemente breve dall'ultimo doppio click.
* Aggiorna l'ultimo doppio click.
*/
bool Pulsante::doppio_click() {
  if (click() && (millis() - ultimoDoppioClick_ < 500)) {
    ultimoDoppioClick_ = millis();
    return true;
  }
  ultimoDoppioClick_ = millis();
  return false;
}

/**
* @brief Metodo test
* @param numero_test numero del test da eseguire (1-3)
*
* Esegue i test del pulsante in base al numero passato come parametro.
* 1: test press()
* 2: test click()
* 3: test doppio_click()
* Qualsiasi altro valore mostra un messaggio di errore
*/
void Pulsante::test(int numero_test) {
  switch (numero_test) {
    case 1: 
      // Test press
      if(press()){
        Serial.println("Pulsante premuto");
      }
      break;
    case 2:
      // Test click
      if(click()){
        Serial.println("Click");
      }
      break;
    case 3:
      // Test doppio_click
      if(doppio_click()){
        Serial.println("Doppio click");
      }
      break;
    default:
      Serial.println("Test non valido");
      break;
  }
}
