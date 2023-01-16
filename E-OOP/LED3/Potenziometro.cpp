// File Potenziometro.cpp
#include "Potenziometro.h"

Potenziometro::Potenziometro(int pin) {
  pin_ = pin;
  pinMode(pin_, INPUT);
}

int Potenziometro::leggiValore() {
  return analogRead(pin_);
}
