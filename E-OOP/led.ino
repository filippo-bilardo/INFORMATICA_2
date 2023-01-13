/* 

https://wokwi.com/projects/353734384434905089

ESP32 HTTP IoT Server Example for Wokwi.com

  https://wokwi.com/arduino/projects/320964045035274834

  To test, you need the Wokwi IoT Gateway, as explained here:

  https://docs.wokwi.com/guides/esp32-wifi#the-private-gateway

  Then start the simulation, and open http://localhost:9080
  in another browser tab.

  Note that the IoT Gateway requires a Wokwi Club subscription.
*/
#include "LED.h"

//const int LED1 = 26;
const int LED2 = 27;
bool led1State = false;
bool led2State = false;

LED led(26); // creiamo un'istanza della classe LED su pin 7

void setup(void) {
  Serial.begin(115200);
  //pinMode(LED1, OUTPUT);
  led.accendi();
  pinMode(LED2, OUTPUT);

  //led.ledTest(1); // esegue il test 1
}

void loop(void) {
  led.inverti();
  digitalWrite(LED2, HIGH);
  delay(300);
  led.inverti();
  digitalWrite(LED2, LOW);
  delay(300);
}
