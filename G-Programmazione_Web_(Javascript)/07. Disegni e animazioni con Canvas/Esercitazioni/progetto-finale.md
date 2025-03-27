# Progetto Finale: Mini Game Engine Canvas

## Obiettivo
Creare un mini game engine in Canvas che integri tutte le conoscenze acquisite durante il modulo. Questo progetto ti permetterà di dimostrare la padronanza dei concetti di Canvas dalla grafica all'animazione, dall'interattività all'ottimizzazione.

## Requisiti di Base

1. **Sistema di Rendering**
   - Gestione di sprite e animazioni
   - Supporto per livelli multipli (background, gameplay, UI)
   - Gestione di camera/viewport

2. **Sistema di Input**
   - Supporto per tastiera
   - Supporto per mouse
   - Supporto per touch (mobile)

3. **Fisica Semplice**
   - Rilevamento collisioni (AABB o Circle)
   - Movimento con accelerazione/gravità
   - Rimbalzi

4. **Gestione del Game Loop**
   - Update logic
   - Render
   - Timing control

5. **Audio**
   - Effetti sonori
   - Musica di sottofondo
   - Controlli volume

## Architettura Suggerita

```javascript
class GameEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.entities = [];
        this.lastTime = 0;
        this.input = new InputManager();
        this.audio = new AudioManager();
        this.isRunning = false;
    }
    
    start() {
        this.isRunning = true;
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    
    gameLoop(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        this.update(deltaTime / 1000); // Convert to seconds
        this.render();
        
        if (this.isRunning) {
            requestAnimationFrame(this.gameLoop.bind(this));
        }
    }
    
    update(dt) {
        this.entities.forEach(entity => entity.update(dt));
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.entities.forEach(entity => entity.render(this.ctx));
    }
    
    addEntity(entity) {
        this.entities.push(entity);
    }
    
    removeEntity(entity) {
        const index = this.entities.indexOf(entity);
        if (index !== -1) {
            this.entities.splice(index, 1);
        }
    }
}

class Entity {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocityX = 0;
        this.velocityY = 0;
    }
    
    update(dt) {
        this.x += this.velocityX * dt;
        this.y += this.velocityY * dt;
    }
    
    render(ctx) {
        // Override in subclasses
    }
    
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
    
    collidesWith(other) {
        const a = this.getBounds();
        const b = other.getBounds();
        
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    }
}
```

## Fasi di Sviluppo

1. **Fase 1: Setup di Base**
   - Creare l'HTML e il canvas
   - Implementare il game loop di base
   - Gestire il ridimensionamento del canvas

2. **Fase 2: Implementazione delle Entità**
   - Creare la classe Entity base
   - Implementare sottoclassi (Player, Enemy, etc.)
   - Aggiungere rendering di base

3. **Fase 3: Input e Controlli**
   - Implementare il sistema di input
   - Collegare l'input al movimento del giocatore
   - Gestire eventi touch per dispositivi mobili

4. **Fase 4: Fisica e Collisioni**
   - Aggiungere proprietà fisiche (gravità, attrito)
   - Implementare il rilevamento delle collisioni
   - Gestire la risposta alle collisioni

5. **Fase 5: Audio e Effetti**
   - Aggiungere sistema audio
   - Implementare effetti sonori per azioni
   - Aggiungere musica di sottofondo

6. **Fase 6: Ottimizzazione**
   - Implementare object pooling
   - Ottimizzare il rendering
   - Aggiungere supporto per dispositivi HiDPI

7. **Fase 7: Completamento del Gioco Demo**
   - Aggiungere un sistema di punteggio
   - Implementare schermate di menu/game over
   - Finalizzare la grafica e gli asset

## Estensioni Opzionali

- Sistema di particelle
- Supporto per tiled maps
- Animazioni sprite avanzate
- Salvataggio del punteggio con localStorage
- Integrazione con WebGL per rendering avanzato

## Consegna

Il progetto finale dovrebbe includere:

1. Codice sorgente commentato
2. Demo giocabile
3. Documentazione sulla struttura del codice
4. Riflessione su sfide affrontate e soluzioni implementate

## Risorse Utili

- [Sprite sheets gratuite](https://www.gameart2d.com/freebies.html)
- [Effetti sonori gratuiti](https://freesound.org/)
- [Generatore di musica procedurale](https://www.bfxr.net/)
- [Tutorial completo su game loop](https://gameprogrammingpatterns.com/game-loop.html)
