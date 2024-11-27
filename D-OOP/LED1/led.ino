//https://www.tinkercad.com/things/gj1P9k4Na9u?sharecode=OT7bgV1jrDuAOeFmiUYXAwnJJ-CyykULMH6EAkahIOI
//https://wokwi.com/projects/353735869255332865

// Classe LED
class LED {
  private:
    int pin; // Pin del LED

  public:
    // Costruttore: imposta la modalità del pin del LED come output
    LED(int p) {
      pin = p;
      pinMode(pin, OUTPUT);
    }

    // Metodo per accendere il LED
    void accendi() {
      digitalWrite(pin, HIGH);
    }

    // Metodo per spegnere il LED
    void spegni() {
      digitalWrite(pin, LOW);
    }
};

// Crea un oggetto LED sulla porta 13
LED led(11);

void setup() {
  // Non c'è nulla da fare qui
}

void loop() {
  // Accendi il LED
  led.accendi();
  // Aspetta per un secondo
  delay(1000);
  // Spegni il LED
  led.spegni();
  // Aspetta per un secondo
  delay(1000);
}