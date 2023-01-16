// File Potenziometro.h
#ifndef POTENZIOMETRO_H
#define POTENZIOMETRO_H

class Potenziometro {
 public:
  Potenziometro(int pin);
  int leggiValore();
 private:
  int pin_;
};

#endif
