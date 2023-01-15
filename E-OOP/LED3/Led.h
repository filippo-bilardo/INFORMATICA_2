// File Led.h
#ifndef LED_H
#define LED_H

class Led {
 public:
  Led(int pin);
  void impostaLuminosita(int luminosita);
 private:
  int pin_;
};

#endif
