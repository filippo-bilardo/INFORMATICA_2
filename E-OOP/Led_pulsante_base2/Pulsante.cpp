#include "Arduino.h"
#include "Pulsante.h"

Pulsante::Pulsante(int pin) {
  _pin = pin;
  pinMode(_pin, INPUT_PULLUP);
}

#define T1_DBOUNCE 50
#define T2_LPRESS_TIMEOUT 2000
#define T3_CLICK_TIMEOUT 200

void Pulsante::task() {
  static unsigned long startPressTime=0;
  static unsigned long startReleaseTime=0;
  static unsigned long startClickTime=0;
  static unsigned long startLPressTime=0;
  static int stato=0; //S0=START_UP, 1=DWN, 2=PRESS_DWN, 3=COUNT_UP, 4=LP_DWN, 5=LPREL_UP

  //if(startTime == 0) {startTime = now; return false;}
  unsigned long now = millis();
  unsigned long releaseTime = (now - startReleaseTime);
  unsigned long pressTime = (now - startPressTime);
  unsigned long lPressTime = (now - startLPressTime);
  unsigned long clickTime = (now - startClickTime);
  int pulsLevel = press();

  //------ S0 = START_UP ------
  if(stato==0) {
    isPressed=false;
    isLPressed=false;
    isPressedStart=false;
    isPressedStop=false;
    isClicked=false;
    isDClicked=false;
    nClick=0;
    if(press()) {
      startPressTime=now;
      startLPressTime=now;
      stato=1;
    }
  //------ S1 = DWN ------
  } else if(stato==1) {
    //Pressione per un tempo minimo dobounce_time
    if(pressTime<T1_DBOUNCE) {
      //attendo il debounce
    } else if(press()) {
      startPressTime=now;
      isPressed=true;
      isPressedStart=true;
      stato=2;
    } else { //if(!press())
      //jitter
      stato=0;
    }

    if(lPressTime>T2_LPRESS_TIMEOUT) {
      isLPressed=true;
      stato=4;
    }
  //------ S2 = PRESS_DWN ------
  } else if(stato==2) {
    //controllo il tempo minimo dobounce_time
    if(pressTime<T1_DBOUNCE) {
      //attendo il debounce
    } else if(press()) {
      //jitter
      startPressTime=now;
      nClick=0;
      stato=1;
    } else { //if(!press())
      nClick++;
      startPressTime=now;
      startClickTime=now;
      isPressedStop=true;
      stato=3;
    } 
  //------ S3 = COUNT_UP ------
  } else if(stato==3) {
    //controllo il tempo minimo dobounce_time
    if(pressTime<T1_DBOUNCE) {
      //attendo il debounce
    } else if(press()) {
      //jitter
      startPressTime=now;
      nClick--;
      stato=2;
    } else if(clickTime>T3_CLICK_TIMEOUT) {
      if(nClick==1) isClicked=true;
      if(nClick==2) isDClicked=true;
      stato=0;
    } else { //if(!press())
      nClick++;
      startPressTime=now;
      stato=1;
    } 
  }
}

bool Pulsante::press() {
  return !digitalRead(_pin);
}
bool Pulsante::pressedStart() {
  bool val = isPressedStart;
  isPressedStart = false;
  return val;
}
bool Pulsante::pressedStop() {
  return isPressedStop;
}
bool Pulsante::pressed() {
  return isPressed;
}
bool Pulsante::longPress() {
  return isLPressed;
}
bool Pulsante::click() {
  return isClicked;
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
    case 4:
      if(isPressedStart) Serial.println("isPressedStart");
      if(isPressedStop) Serial.println("isPressedStop");
      if(isPressed) Serial.println("isPressed");
      if(isLPressed) Serial.println("isLPressed");
      if(isClicked) Serial.println("isClicked");
      if(isDClicked) Serial.println("isDClicked");
      break;
    default:
      Serial.println("Test non valido");
      break;
  }
}
