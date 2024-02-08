#include <NewPing.h>
#include <Servo.h>

const int trigPinLeft = 2;
const int echoPinLeft = 3;
const int trigPinCentre = 4;
const int echoPinCentre = 5;
const int trigPinRight = 6;
const int echoPinRight = 7;
int last_turn; // 1 = dx, 2 = sx

#define MAX_DISTANCE 400
#define secondo 1000
#define ruotaStopValore 90
#define kp 1.7

NewPing sonar_c(trigPinCentre, echoPinCentre, MAX_DISTANCE);
NewPing sonar_dx(trigPinRight, echoPinRight, MAX_DISTANCE);
NewPing sonar_sx(trigPinLeft, echoPinLeft, MAX_DISTANCE);

Servo motoredx;
Servo motoresx;

void setup()
{
  Serial.begin(9600);
  motoredx.attach(9);
  motoresx.attach(8);
}

void loop()
{

  bool logica2 = true;

  while (sonar_c.ping_cm() >= 10)
  { // funzione per andare avanti al centro della corsia
    int Left = sonar_sx.ping_cm();
    int Right = sonar_dx.ping_cm();
    int err = (Left - Right) * kp;
    String p1 = " ; ";
    Serial.println(Left + p1 + Right + p1 + err);
    TurnLeft(30, err);
    delay(10);
  }
  ferma();
  if (sonar_dx.ping_cm() > 25 && logica2)
  {
    avanti(0, 180);
    delay(250);
    destra();
    delay(500);
    avanti(0, 180);
    delay(900);
  }
  else if (sonar_sx.ping_cm() > 25 && logica2)
  {
    avanti(0, 180);
    delay(250);
    sinistra();
    delay(500);
    avanti(0, 180);
    delay(900);
  }
  else if (derivata_distanza() && logica2)
  {
    destra();
    destra();
    ferma();
    avanti(180, 0);
    logica2 = false;
  }
  else if (!logica2)
  {
    if (last_turn == '1')
    {
      avanti(0, 180);
      delay(250);
      destra();
      delay(500);
      avanti(0, 180);
      delay(1000);
    }
    else if (last_turn == '2')
    {
      avanti(0, 180);
      delay(250);
      sinistra();
      delay(500);
      avanti(0, 180);
      delay(1000);
    }

    logica2 = true;
  }
}

void avanti(int vdx, int vsx)
{
  motoredx.write(vdx);
  motoresx.write(vsx);
}

void ferma()
{
  motoredx.write(90);
  motoresx.write(90);
}

void destra()
{
  motoredx.write(180);
  motoresx.write(180);
  delay(270);
  ferma();
  last_turn = 1;
}

void sinistra()
{
  motoredx.write(0);
  motoresx.write(0);
  delay(270);
  ferma();
  last_turn = 2;
}

bool derivata_distanza()
{
  int s1 = sonar_sx.ping_cm();
  int c1 = sonar_c.ping_cm();
  int d1 = sonar_dx.ping_cm();
  delay(4 * secondo);
  int s2 = sonar_sx.ping_cm();
  int c2 = sonar_c.ping_cm();
  int d2 = sonar_dx.ping_cm();
  if (((s1 - s2) <= 0.5) && ((c1 - c2) <= 0.5) && ((d1 - d2) <= 0, 5))
  {
    return true;
  }
  else
    return false;
}

void TurnLeft(int vel, int gira)
{
  motoresx.write(Limita(ruotaStopValore + vel - gira));
  motoredx.write(Limita(ruotaStopValore - vel - gira));
}
int Limita(int value)
{
  if (value > 180)
    return 180;
  if (value < 0)
    return 0;

  return value;
}