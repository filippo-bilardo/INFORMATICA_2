/** ****************************************************************************************
* \mainpage 
*
* @brief Classe led e pulsanti
* https://wokwi.com/projects/357356804480899073
* <specifiche del collaudo>
* 

https://github.com/JChristensen/JC_Button/blob/master/src/JC_Button.cpp
wasPressed() and wasReleased() check the button state to see if it changed between the last two reads and return false (0) or           *
true (!=0) accordingly. These functions do not cause the button to be read.
pressedFor(ms) and releasedFor(ms) check to see if the button is pressed (or released), and has been in that state for
the specified time in milliseconds.



* @author Filippo Bilardo
* @date 26/02/23
* @version 1.0 26/02/23 Versione iniziale
*/
//------------------------------------------------------------------------------------------
//=== INCLUDES =============================================================================
//------------------------------------------------------------------------------------------
#include "LED.h"
#include "Pulsante.h"

#define LED1_PIN 27
#define LED2_PIN 26

LED led1(LED1_PIN); // creiamo un'istanza della classe LED su pin 27
LED led2(LED2_PIN); // creiamo un'istanza della classe LED su pin 26
Pulsante P1(25);
Pulsante P2(33);

void setup(void) {
  Serial.begin(115200); // Inizializza la comunicazione seriale
  led1.accendi();
  led2.test(0);
  led1.spegni();
}

void loop(void) {
  P1.test(1); // Esegue il test per verificare se è stato effettuata una pressiones
  P2.test(2); // Esegue il test per verificare se è stato effettuato un click
}
