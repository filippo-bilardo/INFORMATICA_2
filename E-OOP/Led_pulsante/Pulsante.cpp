#include "Arduino.h"
#include "Pulsante.h"

Pulsante::Pulsante(int pin) {
  pin_ = pin;
  statoPrecedente_ = LOW;
  statoAttuale_ = LOW;
  ultimoClick_ = 0;
  ultimoDoppioClick_ = 0;
  pinMode(pin_, INPUT_PULLUP);
}

bool Pulsante::press() {
  statoAttuale_ = !digitalRead(pin_);
  if (statoAttuale_ == LOW && statoPrecedente_ == HIGH) {
    statoPrecedente_ = statoAttuale_;
    return true;
  }
  statoPrecedente_ = statoAttuale_;
  return false;
}

bool Pulsante::click() {
  if (press() && (millis() - ultimoClick_ > 50)) {
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
