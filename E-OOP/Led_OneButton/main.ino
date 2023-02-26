/** ****************************************************************************************
* \mainpage 
*
* @brief Classi_LED_OneButton
* https://wokwi.com/projects/357743994318702593
*
* @author Filippo Bilardo
* @date 26/02/23
* @version 1.0 26/02/23 Versione iniziale
*/
//------------------------------------------------------------------------------------------
//=== INCLUDES =============================================================================
//------------------------------------------------------------------------------------------
#include "LED.h"
#include "OneButton.h"

#define LED1_PIN 27
#define LED2_PIN 26

LED led1(LED1_PIN); // creiamo un'istanza della classe LED su pin 27
LED led2(LED2_PIN); // creiamo un'istanza della classe LED su pin 26
OneButton btn1(25, true, true);
OneButton btn2(33, true, true);

void setup(void) {
  Serial.begin(115200); // Inizializza la comunicazione seriale
  led1.accendi();
  led2.test(0);
  led1.spegni();

  btn2.attachClick(btn2Click);
  btn2.attachDoubleClick(btn2DoubleClick);
  //btn2.setDebounceTicks(80); // Debouncing time. Default is 50 msec.

  btn1.setPressTicks(1000); // that is the time when LongPressStart is called
  btn1.attachClick(btn1Click);
  btn1.attachLongPressStart(btn1LongPressStart);
  btn1.attachDuringLongPress(btn1LongPress);
  btn1.attachLongPressStop(btn1LongPressStop);
}

void loop(void) {
  btn1.tick();
  btn2.tick();

  // You can implement other code in here or just wait a while 
  delay(10);
}

void btn1Click() {
  Serial.println("btn1Click detected.");
  led1.lampeggia(3,200);
}
void btn1LongPressStart() {
  Serial.println("btn1LongPressStart detected.");
  led1.accendi();
}
void btn1LongPress() {
  Serial.println("btn1LongPress...");
} 
void btn1LongPressStop() {
  Serial.println("btn1LongPressStop detected.");
  led1.spegni();
}

void btn2Click() {
  Serial.println("btn2Click detected.");
  led1.inverti();
}
void btn2DoubleClick() {
  Serial.println("btn2DoubleClick detected.");
  led2.inverti();
}
