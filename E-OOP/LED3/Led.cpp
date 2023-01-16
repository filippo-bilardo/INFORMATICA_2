// File Led.cpp
#include "Led.h"

Led::Led(int pin) {
  pin_ = pin;
  pinMode(pin_, OUTPUT);
}

void Led::impostaLuminosita(int luminosita) {
  int ledBrightness = map(luminosita, 0, 1023, 0, 255);
  analogWrite(pin_, ledBrightness);
}
