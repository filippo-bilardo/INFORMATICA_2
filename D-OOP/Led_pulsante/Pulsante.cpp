#include "Arduino.h"
#include "Pulsante.h"

Pulsante::Pulsante(int pin) {
  _pin = pin;
  pinMode(_pin, INPUT_PULLUP);
}

bool Pulsante::press() {
  return !digitalRead(_pin);
}

bool Pulsante::click() {
  if(press()) {
    while(press()) {;}
    return 1;
  } else {
    return 0;
  }
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
    default:
      Serial.println("Test non valido");
      break;
  }
}
