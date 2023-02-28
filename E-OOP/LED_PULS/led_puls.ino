/** ****************************************************************************************
* @file pulsanti.c
* @brief 202021_TPS2_A_ES04 - Collegamento e gestione di pulsanti con i microcontrollori
* 
* @author Filippo Bilardo - http://fb-labs.blogspot.com/
* @date <data> 
* @version 1.0 12/12/20 Versione iniziale
* @version 1.1 21/11/21 
*/
//https://www.tinkercad.com/things/gj1P9k4Na9u?sharecode=OT7bgV1jrDuAOeFmiUYXAwnJJ-CyykULMH6EAkahIOI

// Classe LED
class LED {
  private:
    int pin; // Pin del LED
    int stato;
  	int luminosita; //0-255 0-spento, 255-max luminosità

  public:
    // Costruttore: imposta la modalità del pin del LED come output
    LED(int p) {
      pin = p;
      pinMode(pin, OUTPUT);
    }

    // Metodo per accendere il LED
    void accendi() {
      digitalWrite(pin, HIGH);
      stato = true;
    }

    // Metodo per spegnere il LED
    void spegni() {
      digitalWrite(pin, LOW);
      stato = false;
    }
    void inverti() {
      if (stato) {
        spegni();
      } else {
        accendi();
      }
    }
  
    void setLuminosita(int lum) {
      int luminosita = lum;
      analogWrite(pin, luminosita);
    }
  
    void test(int num) {
      if(num==0) {
        int ritardo=200, step=8;
        accendi(); delay(ritardo);
        for(int i=0; i<=255; i+=step) {
          setLuminosita(i); delay(ritardo);  
        }
        for(int i=255; i>0; i-=step) {
          setLuminosita(i); delay(ritardo);  
        }
        accendi(); delay(ritardo);
        spegni();
      }
    }
};
    /*
      if (press() && (millis() - ultimoClick_ > 50)) {
        ultimoClick_ = millis();
        return true;
      }
      return false;
      */

class Pulsante {
  private:
    int pin; // Pin di collegamento
    unsigned long ultimoClick_;
    int pressed;

  public:
    // Costruttore: imposta la modalità del pin del pulsante come input_pullup
    Pulsante(int p) {
      pin = p;
      pressed=0;
      ultimoClick_=0;
      pinMode(pin, INPUT_PULLUP);
    }
  	int press() {
      if(digitalRead(pin)==0) return 1;
      return 0;
    }
    /**
    * @brief Metodo click
    * @return true se il pulsante è stato cliccato, false altrimenti
    *
    * Utilizza il metodo press() per verificare se il pulsante è stato premuto
    */
    bool click() {
      if(press()) {
        if(pressed==0) pressed=1;
        return 0;
      } else { 
        if(pressed==1) {
          pressed=0;
          return 1;
        } else {
          return 0;	
        }
      }
    } 
/**
 * @brief Metodo doppioClick
 * @return true se il pulsante è stato cliccato due volte in successione, false altrimenti
 *
 * Utilizza il metodo press() per verificare se il pulsante è stato premuto e controlla se sia trascorso un tempo sufficientemente breve dall'ultimo click.
 * Aggiorna l'ultimo click.
 */
  bool doppioClick() {
    if(press()) {
        if(pressed==0) {
            if(ultimoClick_ + 500 > millis()) {
                ultimoClick_ = 0;
                return true;
            } else {
                pressed=1;
                ultimoClick_ = millis();
                return false;
            }
        }
        return false;
    } else {
        if(pressed==1) {
            pressed=0;
            return false;
        } else {
            return false;	
        }
    }
  } 
};


// Crea un oggetto LED sulla porta 13
LED ledGreen(12);
LED ledBlu(13);
Pulsante p1(2);
Pulsante p2(3);

void setup() {
  //ledGreen.test(0);
  //ledBlu.test(0);
}

void loop() {
  if(p1.click()) {
    ledGreen.inverti();
  }
  
  if(p2.doppioClick()) {
    ledBlu.inverti();
  }
  
  //if(p2.press()) {
  //  ledBlu.accendi();
  //} else {
  //  ledBlu.spegni();
  //}
}

