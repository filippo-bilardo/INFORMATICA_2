#include "Arduino.h"
#include "Pulsante.h"

Pulsante::Pulsante(int pin) {
  _pin = pin;
  pinMode(_pin, INPUT_PULLUP);
}

void Pulsante::task() {
  static unsigned long startTime=0;
  static stato=0; //0=iniziale, 1=DWN, 2=UP

  unsigned long now = millis(); // current (relative) time in msecs.
  //if(startTime == 0) {startTime = now; return false;}
  unsigned long waitTime = (now - startTime);
  int pulsLevel = press();

  //Se inattività torno allo stato 0
  if(waitTime>5000) {
    stato=0;
    startTime=now;
  }


  if(stato==0) {
    if(press()) {
      stato=1;
      startTime=now;
    }
  } if(stato==1) {
    //dobounce_time
    if(press()) {
      //la pressione continua
    } else if(press() && (waitTime>50)) {
      //debounce superato
      isPressedStart = true;
    } else if(!press()) {
      //pressione non valida, tempo troppo breve
      isPressedStart = false;
    } else {
      isPressedStart = true;
    } 
  } if(stato==2) {
  }
}

bool Pulsante::isPressedStart() {
  bool val = isPressedStart;
  isPressedStart = false;
  return val;
}

bool Pulsante::press() {
  return !digitalRead(_pin);
}
bool Pulsante::longPress() {

  
  if(stato==0) {

  }
  if(press()) {
    if(waitTime >= LONG_PRESS_THRESHOLD_MS) {
      startTime = now;
      return true;
    }
  }
  startTime = now;
  return false;
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
    case 3:
      // Test long press
      if(longPress()) {
        Serial.println("Long press");
      }
      break;
    default:
      Serial.println("Test non valido");
      break;
  }
}
