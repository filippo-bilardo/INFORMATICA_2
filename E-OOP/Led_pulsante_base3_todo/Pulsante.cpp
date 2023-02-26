#include "Arduino.h"
#include "Pulsante.h"

Pulsante::Pulsante(int pin) {
  Pulsante(pin, true);
}
Pulsante::Pulsante(int pin, bool activeLow) {
  _pin = pin;
  statoPrecedente_ = LOW;
  statoAttuale_ = LOW;
  ultimoPress_ = 0;
  ultimoClick_ = 0;
  _activeLow = activeLow;
  _pressState = false;
  pinMode(_pin, activeLow ? INPUT_PULLUP : INPUT);
  activeLow ? Serial.print("INPUT_PULLUP") : Serial.print("INPUT");
}

bool Pulsante::press() {
  statoAttuale_ = !digitalRead(pin_);
  if (statoAttuale_ && (millis() - ultimoPress_ < 5)) {
    ultimoPress_ = millis();
    return false;
  }
  statoPrecedente_ = true;
  return true;
}
bool Pulsante::onePress() {
  statoAttuale_ = press();
  if (statoAttuale_ == HIGH && statoPrecedente_ == LOW) {
    statoPrecedente_ = statoAttuale_;
    Serial.print(statoAttuale_);
    return true;
  }
  statoPrecedente_ = statoAttuale_;
  return false;
}

bool Pulsante::click() {
  //se il task non è in esecuzione usare il codice bloccante 
  if (onePress() && (millis() - ultimoClick_ > 50)) {
    ultimoClick_ = millis();
    return true;
  }
  return false;
}

bool Pulsante::doppio_click() {
  if (click() && (millis() - ultimoDoppioClick_ < 500)) {
    ultimoDoppioClick_ = millis();
    return true;
  }
  ultimoDoppioClick_ = millis();
  return false;
}

void Pulsante::test(int numero_test) {
  switch (numero_test) {
    case 1: 
      // Test press
      if(onePress()){
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
