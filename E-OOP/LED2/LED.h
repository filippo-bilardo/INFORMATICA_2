#ifndef LED_H
#define LED_H

/**
 * @class LED
 * @brief classe per la gestione di un led
 */
class LED {
 public:
    /**
    * @brief Costruttore della classe
    * @param pin numero del pin a cui è connesso il led
    */
    LED(int pin);
    /**
    * @brief Accendere il led
    */
    void accendi();
    /**
    * @brief Spegnere il led
    */
    void spegni();
    void inverti();
    bool statoLed;
    //void ledTest(int numeroTest);

 private:
  int pin_;
};

#endif