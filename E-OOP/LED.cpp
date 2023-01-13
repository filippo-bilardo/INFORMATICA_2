#include "Arduino.h"
#include "LED.h"

/**
 * @brief Costruttore per impostare il pin su cui è connesso il LED.
 * @param pin il pin su cui è connesso il LED.
 */
LED::LED(int pin) {
  pin_ = pin;
  statoLed = false;
  pinMode(pin_, OUTPUT);
}

/**
 * @brief Accende il LED
 */
void LED::accendi() {
  if(!statoLed){
    digitalWrite(pin_, HIGH);
    statoLed = true;
  }
}

/**
 * @brief Spegne il LED
 */
void LED::spegni() {
  if(statoLed){
    digitalWrite(pin_, LOW);
    statoLed = false;
  }
}

/**
 * @brief Inverte lo stato del LED
 */
void LED::inverti() {
  if (statoLed) {
    spegni();
  } else {
    accendi();
  }

}