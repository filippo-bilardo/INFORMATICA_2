const int potentiometerPin = A0;  
// potentiometer is connected to analog pin A0
const int ledPin = 3;             
// LED is connected to digital pin 3

void setup() {
  pinMode(ledPin, OUTPUT);        
  // set the LED pin as an output
}

void loop() {
  // read the value of the potentiometer
  int potentiometerValue = analogRead(potentiometerPin);
  
  // map the potentiometer value to a range suitable for the LED
  int ledBrightness = map(potentiometerValue, 0, 1023, 0, 255);
  
  // set the brightness of the LED
  analogWrite(ledPin, ledBrightness);
}