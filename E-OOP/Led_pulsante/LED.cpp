#include "Arduino.h"
#include "LED.h"

LED::LED(int pin) {
  _pin = pin;
  _stato = false;
  pinMode(_pin, OUTPUT);
}

void LED::accendi() {
  digitalWrite(_pin, HIGH);
  _stato = true;
}

void LED::spegni() {
  digitalWrite(_pin, LOW);
  _stato = false;
}

void LED::inverti() {
  if (_stato) {
    spegni();
  } else {
    accendi();
  }
}

void LED::lampeggia(int nr) {
  for(int i=0; i<nr; i++) {
    accendi();
    delay(500);
    spegni();
    delay(500);
  }
}
void LED::lampeggia(int nr, int ritardo) {
  for(int i=0; i<nr; i++) {
    accendi();
    delay(ritardo);
    spegni();
    delay(ritardo);
  }
}

void LED::setLuminosita(int luminosita) {
  _luminosita = luminosita > 255 ? 255 : luminosita;
  _luminosita = luminosita < 0 ? 0 : luminosita;
  analogWrite(_pin, _luminosita);
}

void LED::test(int nr) {
  if(nr==1) {
    accendi();
    delay(500);
    inverti();
  } else if(nr==2) {
    lampeggia(3);
  } else if(nr==3) {
    lampeggia(3,100);
    for(int lum=0; lum<1023; lum+=64) {
      setLuminosita(lum);
      delay(300);
    }
    lampeggia(3,100);
  } else {
    lampeggia(4,100);
  }
}