#ifndef LED_H
#define LED_H

/**
 * @class LED
 * @brief classe per la gestione di un led
 */
class LED {

   public:
      /**
      * @brief Costruttore per impostare il pin su cui è connesso il LED.
      * @param pin il pin su cui è connesso il LED.
      * @version 1.0 26/02/23 Versione iniziale
      */
      LED(int pin);
      /**
      * @brief Accende il LED
      * @version 1.0 26/02/23 Versione iniziale
      */
      void accendi();
      /**
      * @brief Spegne il LED
      * @version 1.0 26/02/23 Versione iniziale
      */
      void spegni();
      /**
      * @brief Inverte lo stato del LED
      * @version 1.0 26/02/23 Versione iniziale
      */      
      void inverti();
      /**
      * @brief esegue nr lampeggi
      * @version 1.0 26/02/23 Versione iniziale
      */
      void lampeggia(int nr);
      void lampeggia(int nr, int ritardo);
      /** ****************************************************************************************
      * @todo Da testare
      * @version 1.0 26/02/23 Versione iniziale
      */
      void setLuminosita(int luminosita);
      /** ****************************************************************************************
      * @brief Test dei metodi della classe
      * @param  test da eseguire
      * @retval nessuno
      *
      * @author Filippo Bilardo
      * @version 1.0 26/02/23 Versione iniziale
      */
      void test(int nr);

   private:
      int _pin;
      bool _stato;
      int _luminosita;
   
};

#endif