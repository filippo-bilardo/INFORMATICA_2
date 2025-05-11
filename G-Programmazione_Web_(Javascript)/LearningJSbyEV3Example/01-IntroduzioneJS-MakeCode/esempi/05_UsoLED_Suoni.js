// Esempio 05: Uso dei LED e dei Suoni
// Questo esempio mostra come controllare i LED del brick EV3 e come riprodurre suoni.

// Accendi il LED del brick con un colore verde fisso
brick.setLedPattern(LedPattern.Green);
brick.showString("LED Verde Acceso", 1);
pause(2000); // Mantieni il LED verde per 2 secondi

// Fai lampeggiare il LED di arancione
brick.setLedPattern(LedPattern.OrangeFlash);
brick.showString("LED Arancione Lampeggiante", 2);
pause(3000); // Lascia lampeggiare per 3 secondi

// Spegni il LED
brick.setLedPattern(LedPattern.Off);
brick.showString("LED Spento", 3);
pause(1000);

// Riproduci un suono predefinito (Boing)
brick.showString("Suono: Boing", 4);
brick.sound(Sound.PlayBoing);
pause(1000); // Pausa per sentire il suono

// Riproduci una nota musicale specifica (Do centrale per 500ms)
// La frequenza del Do centrale (C4) è circa 261.63 Hz
brick.showString("Suono: Nota Do", 5);
brick.sound(Sound.PlayTone(262, 500));
pause(1000);

// Mostra un'icona e riproduci un suono contemporaneamente
brick.showString("Icona + Suono", 6);
brick.showIcon(IconName.Happy);
brick.sound(Sound.PlayFanfare);

pause(3000);

// Pulisci lo schermo e termina
brick.clearScreen();
brick.setLedPattern(LedPattern.Off);
brick.showString("Esempio Completato!", 8);