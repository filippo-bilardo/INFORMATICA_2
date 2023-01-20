/**
Ecco un esempio di come l'operatore ++ e -- potrebbero essere sovraccaricati per aumentare o diminuire la luminosità di un LED connesso ad Arduino:
*/

class LED {
    public:
        LED(int pin) : pin_(pin), brightness_(0) { pinMode(pin, OUTPUT); } //costruttore
        int getBrightness() const { return brightness_; } // metodo per leggere la luminosità del LED
        void setBrightness(int brightness) { analogWrite(pin_, brightness); brightness_ = brightness;} // metodo per impostare la luminosità del LED

        // Overloading dell'operatore di incremento
        LED& operator++() {
            if (brightness_ < 255) {
                ++brightness_;
                analogWrite(pin_, brightness_);
            }
            return *this;
        }
        // Overloading dell'operatore di decremento
        LED& operator--() {
            if (brightness_ > 0) {
                --brightness_;
                analogWrite(pin_, brightness_);
            }
            return *this;
        }
    private:
        int pin_;
        int brightness_;
};

LED led(7); // creiamo un'istanza della classe LED su pin 7

void setup(void) {
  led.setBrightness(127);
  led.accendi();
  delay(1000);
}
for (int i = 0; i <= 255; i++) {
    led++;
    delay(10);
}

for (int i = 255; i >= 0; i--) {
    led--;
    delay(10);
}

void loop(void) {}
