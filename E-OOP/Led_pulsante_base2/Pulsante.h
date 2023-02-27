/** ****************************************************************************************
* @file Pulsante.H
* @brief Versione base 2 aggiunto anti bounce per la pressione e implementato il task 
* per la lettura dello stato (tolto il codice bloccante)
* 
* https://wokwi.com/projects/357736086306366465
*
* @author Filippo Bilardo
* @date 26/02/23
* @version 1.0 26/02/23 Versione iniziale
*/
#ifndef PULSANTE_H
#define PULSANTE_H

class Pulsante {
  public:
    /**
    * @brief Costruttore della classe Pulsante
    * @param pin Pin del pulsante su Arduino
    *
    * Inizializza il pin del pulsante come input con pull-up e gli altri membri della classe 
    */
    Pulsante(int pin);

    /**
    * @brief Controllo dello stato
    * @version 1.0 26/02/23 Versione iniziale
    */
    void task();  

    /**
    * @brief Metodo per verificare se il pulsante è stato premuto
    * @return true se il pulsante è stato premuto, false altrimenti
    *
    * Legge lo stato attuale del pin del pulsante e confronta con lo stato precedente.
    * Se lo stato attuale è LOW e quello precedente è HIGH, il pulsante è stato premuto.
    */
    bool press();
    bool pressedStart();
    bool pressedStop();
    bool pressed();
    bool longPress();
    /**
    * @brief Metodo per verificare se è stato effettuato un click
    * @return true se il pulsante è stato cliccato, false altrimenti
    *
    * Utilizza il metodo press() per verificare se il pulsante è stato premuto
    */
    bool click();
  
    /**
    * @brief Metodo per testare le funzionalità della classe
    * @param numero_test numero del test da eseguire (1-3)
    *
    * Esegue i test del pulsante in base al numero passato come parametro.
    * 1: test press()
    * 2: test click()
    * Qualsiasi altro valore mostra un messaggio di errore
    */
    void test(int numero_test);

  private:
    int _pin;
    unsigned long _pressStartTime;
    bool isPressedStart;
    bool isPressed;
    bool isPressedStop;
    bool isLPressed;
    bool isClicked;
    bool isDClicked;
    int nClick;
};

#endif