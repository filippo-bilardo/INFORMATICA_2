# Eventi Touch e Mobile

Con la crescente diffusione dei dispositivi mobili, è fondamentale comprendere e implementare correttamente gli eventi touch per creare applicazioni web responsive e user-friendly. Questo capitolo esplora gli eventi touch in JavaScript, le loro caratteristiche e le best practices per sviluppare interfacce ottimizzate per dispositivi mobili.

## Introduzione agli Eventi Touch

Gli eventi touch sono stati introdotti per gestire le interazioni su dispositivi con schermo tattile. A differenza degli eventi del mouse, gli eventi touch supportano interazioni multi-touch e offrono informazioni aggiuntive come la pressione e le dimensioni dell'area di contatto.

### Tipi di Eventi Touch

- **`touchstart`**: Si attiva quando un dito tocca lo schermo
- **`touchmove`**: Si attiva quando un dito si muove sullo schermo
- **`touchend`**: Si attiva quando un dito viene sollevato dallo schermo
- **`touchcancel`**: Si attiva quando un touch viene interrotto (ad esempio, dal sistema operativo)

## Gestione Base degli Eventi Touch

```javascript
const elemento = document.getElementById('area-touch');

elemento.addEventListener('touchstart', function(evento) {
  console.log('Touch iniziato');
  // Previene comportamenti predefiniti come lo zoom su doppio tap
  evento.preventDefault();
});

elemento.addEventListener('touchmove', function(evento) {
  console.log('Touch in movimento');
  // Accesso al primo punto di contatto
  const touch = evento.touches[0];
  console.log('Coordinate:', touch.clientX, touch.clientY);
});

elemento.addEventListener('touchend', function(evento) {
  console.log('Touch terminato');
});

elemento.addEventListener('touchcancel', function(evento) {
  console.log('Touch annullato');
});
```

## L'Oggetto TouchEvent

Gli eventi touch forniscono diverse liste di oggetti Touch, ciascuno rappresentante un punto di contatto:

- **`touches`**: Tutti i punti di contatto attualmente sullo schermo
- **`targetTouches`**: Tutti i punti di contatto sull'elemento target dell'evento
- **`changedTouches`**: I punti di contatto coinvolti nell'evento corrente (quelli che sono cambiati)

```javascript
elemento.addEventListener('touchstart', function(evento) {
  // Numero totale di touch attivi
  console.log('Numero di touch:', evento.touches.length);
  
  // Informazioni sul primo touch
  if (evento.touches.length > 0) {
    const primoTouch = evento.touches[0];
    console.log('ID touch:', primoTouch.identifier);
    console.log('Target:', primoTouch.target);
    console.log('Coordinate:', primoTouch.clientX, primoTouch.clientY);
    console.log('Coordinate relative alla pagina:', primoTouch.pageX, primoTouch.pageY);
    console.log('Coordinate relative allo schermo:', primoTouch.screenX, primoTouch.screenY);
    
    // Proprietà avanzate (non supportate da tutti i browser)
    if ('radiusX' in primoTouch) {
      console.log('Raggio X:', primoTouch.radiusX);
      console.log('Raggio Y:', primoTouch.radiusY);
      console.log('Rotazione:', primoTouch.rotationAngle);
      console.log('Forza:', primoTouch.force);
    }
  }
});
```

## Gestione del Multi-touch

Una delle caratteristiche principali degli eventi touch è la capacità di gestire più punti di contatto simultaneamente:

```javascript
let initialDistance = 0;

// Funzione per calcolare la distanza tra due touch
function getDistance(touch1, touch2) {
  const dx = touch1.clientX - touch2.clientX;
  const dy = touch1.clientY - touch2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

elemento.addEventListener('touchstart', function(evento) {
  // Verifica se ci sono almeno due touch (per pinch/zoom)
  if (evento.touches.length === 2) {
    initialDistance = getDistance(evento.touches[0], evento.touches[1]);
    console.log('Distanza iniziale:', initialDistance);
  }
});

elemento.addEventListener('touchmove', function(evento) {
  if (evento.touches.length === 2) {
    // Calcola la nuova distanza
    const currentDistance = getDistance(evento.touches[0], evento.touches[1]);
    
    // Calcola il fattore di scala
    const scale = currentDistance / initialDistance;
    
    console.log('Fattore di scala:', scale);
    // Implementa zoom o altre trasformazioni basate sulla scala
    elemento.style.transform = `scale(${scale})`;
    
    evento.preventDefault(); // Previene lo zoom predefinito del browser
  }
});
```

## Gestione dei Gesti (Gestures)

I gesti sono pattern di interazione touch come swipe, pinch, rotate, ecc. Ecco come implementare alcuni gesti comuni:

### Swipe

```javascript
let startX, startY, endX, endY;
const minSwipeDistance = 50; // Distanza minima per considerare un movimento come swipe

elemento.addEventListener('touchstart', function(evento) {
  const touch = evento.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
});

elemento.addEventListener('touchend', function(evento) {
  const touch = evento.changedTouches[0];
  endX = touch.clientX;
  endY = touch.clientY;
  
  // Calcola distanze
  const diffX = endX - startX;
  const diffY = endY - startY;
  
  // Determina la direzione dello swipe
  if (Math.abs(diffX) > Math.abs(diffY)) {
    // Swipe orizzontale
    if (Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        console.log('Swipe verso destra');
        // Azione per swipe verso destra
      } else {
        console.log('Swipe verso sinistra');
        // Azione per swipe verso sinistra
      }
    }
  } else {
    // Swipe verticale
    if (Math.abs(diffY) > minSwipeDistance) {
      if (diffY > 0) {
        console.log('Swipe verso il basso');
        // Azione per swipe verso il basso
      } else {
        console.log('Swipe verso l'alto');
        // Azione per swipe verso l'alto
      }
    }
  }
});
```

### Tap e Long Press

```javascript
let touchStartTime;
let touchTimer;
const longPressDuration = 500; // Durata in ms per considerare un touch come long press

elemento.addEventListener('touchstart', function(evento) {
  touchStartTime = new Date().getTime();
  
  // Imposta un timer per il long press
  touchTimer = setTimeout(function() {
    console.log('Long press rilevato');
    // Azione per long press
  }, longPressDuration);
});

elemento.addEventListener('touchend', function(evento) {
  // Annulla il timer del long press
  clearTimeout(touchTimer);
  
  // Calcola la durata del touch
  const touchDuration = new Date().getTime() - touchStartTime;
  
  // Se la durata è breve, è un tap
  if (touchDuration < longPressDuration) {
    console.log('Tap rilevato');
    // Azione per tap
  }
});

// Annulla il long press se l'utente muove il dito
elemento.addEventListener('touchmove', function(evento) {
  clearTimeout(touchTimer);
});
```

## Compatibilità tra Eventi Touch e Mouse

Per creare interfacce che funzionino sia su dispositivi touch che con mouse, è necessario gestire entrambi i tipi di eventi. Tuttavia, su dispositivi touch, gli eventi del mouse vengono generati automaticamente dopo gli eventi touch, causando potenziali duplicazioni.

### Approccio 1: Rilevamento del Tipo di Dispositivo

```javascript
// Rileva se il dispositivo supporta il touch
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouchDevice) {
  elemento.addEventListener('touchstart', gestoreTouch);
  elemento.addEventListener('touchmove', gestoreTouch);
  elemento.addEventListener('touchend', gestoreTouch);
} else {
  elemento.addEventListener('mousedown', gestoreMouse);
  elemento.addEventListener('mousemove', gestoreMouse);
  elemento.addEventListener('mouseup', gestoreMouse);
}
```

### Approccio 2: Prevenzione degli Eventi Duplicati

```javascript
let touchHappened = false;
let touchTimer;

elemento.addEventListener('touchstart', function(evento) {
  touchHappened = true;
  // Resetta il flag dopo un breve periodo
  clearTimeout(touchTimer);
  touchTimer = setTimeout(function() {
    touchHappened = false;
  }, 500);
  
  gestoreInterazione(evento);
});

elemento.addEventListener('mousedown', function(evento) {
  // Ignora l'evento mouse se è stato generato da un touch
  if (touchHappened) return;
  
  gestoreInterazione(evento);
});

function gestoreInterazione(evento) {
  // Logica comune per touch e mouse
  console.log('Interazione rilevata');
}
```

### Approccio 3: Libreria Pointer Events

I Pointer Events sono un'API più moderna che unifica gli eventi touch, mouse e penna:

```javascript
elemento.addEventListener('pointerdown', gestorePointer);
elemento.addEventListener('pointermove', gestorePointer);
elemento.addEventListener('pointerup', gestorePointer);

function gestorePointer(evento) {
  console.log('Tipo di puntatore:', evento.pointerType); // 'mouse', 'touch', 'pen'
  console.log('Coordinate:', evento.clientX, evento.clientY);
  
  // Logica comune per tutti i tipi di input
}
```

## Ottimizzazione delle Prestazioni per Eventi Touch

### 1. Utilizzo di Passive Event Listeners

```javascript
elemento.addEventListener('touchstart', gestoreTouch, { passive: true });
elemento.addEventListener('touchmove', gestoreTouch, { passive: true });
```

L'opzione `passive: true` informa il browser che il gestore non chiamerà `preventDefault()`, consentendo al browser di iniziare immediatamente lo scorrimento senza attendere l'esecuzione del JavaScript.

### 2. Throttling e Debouncing

Come per gli eventi del mouse, applica throttling agli eventi `touchmove` che possono attivarsi molto frequentemente:

```javascript
function throttle(callback, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback.apply(this, args);
    }
  };
}

const gestoreTouchMoveThrottled = throttle(function(evento) {
  // Logica per touchmove
  console.log('Touch move throttled');
}, 16); // Circa 60fps

elemento.addEventListener('touchmove', gestoreTouchMoveThrottled);
```

### 3. Utilizzo di requestAnimationFrame

```javascript
let ticking = false;
let lastTouchEvent = null;

elemento.addEventListener('touchmove', function(evento) {
  lastTouchEvent = evento;
  
  if (!ticking) {
    window.requestAnimationFrame(function() {
      // Processa l'ultimo evento touch
      processaTouchMove(lastTouchEvent);
      ticking = false;
    });
    
    ticking = true;
  }
});

function processaTouchMove(evento) {
  // Logica per touchmove sincronizzata con il refresh del browser
  console.log('Processing touch move');
}
```

## Considerazioni per l'Accessibilità

### 1. Fornire Alternative per Interazioni Touch

Assicurati che tutte le funzionalità accessibili tramite touch siano disponibili anche tramite tastiera o altri metodi di input:

```javascript
// Gestione touch per swipe in un carousel
elemento.addEventListener('touchstart', iniziaSwipe);
elemento.addEventListener('touchend', completaSwipe);

// Alternative accessibili
document.getElementById('btn-prev').addEventListener('click', mostraPrecedente);
document.getElementById('btn-next').addEventListener('click', mostraSuccessivo);

// Supporto per tastiera
document.addEventListener('keydown', function(evento) {
  if (evento.key === 'ArrowLeft') mostraPrecedente();
  if (evento.key === 'ArrowRight') mostraSuccessivo();
});
```

### 2. Dimensioni Adeguate per Target Touch

Assicurati che gli elementi interattivi siano sufficientemente grandi per essere facilmente toccabili:

```css
/* Dimensioni minime raccomandate per elementi touch */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  padding: 12px;
}

/* Spazio adeguato tra elementi touch */
.touch-target + .touch-target {
  margin-left: 8px;
}
```

## Esempi Pratici

### Esempio 1: Slider Touch

```javascript
const slider = document.getElementById('touch-slider');
const sliderContent = slider.querySelector('.slider-content');
let startX;
let scrollLeft;

slider.addEventListener('touchstart', function(evento) {
  startX = evento.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  
  // Aggiunge classe per disabilitare transizioni durante il drag
  sliderContent.classList.add('dragging');
});

slider.addEventListener('touchmove', function(evento) {
  if (!startX) return;
  
  const x = evento.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; // Moltiplicatore per velocizzare lo scorrimento
  slider.scrollLeft = scrollLeft - walk;
});

slider.addEventListener('touchend', function() {
  startX = null;
  sliderContent.classList.remove('dragging');
  
  // Snap allo slide più vicino
  const slideWidth = slider.querySelector('.slide').offsetWidth;
  const index = Math.round(slider.scrollLeft / slideWidth);
  slider.scrollTo({
    left: index * slideWidth,
    behavior: 'smooth'
  });
});
```

### Esempio 2: Area di Disegno Touch

```javascript
const canvas = document.getElementById('touch-canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

// Imposta dimensioni del canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 100; // Spazio per altri elementi
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Funzione di disegno
function draw(evento) {
  if (!isDrawing) return;
  
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#000';
  
  // Gestisci tutti i touch attivi
  for (let i = 0; i < evento.touches.length; i++) {
    const touch = evento.touches[i];
    const x = touch.clientX - canvas.offsetLeft;
    const y = touch.clientY - canvas.offsetTop;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 0.1, y + 0.1); // Piccolo movimento per disegnare un punto
    ctx.stroke();
  }
}

canvas.addEventListener('touchstart', function(evento) {
  isDrawing = true;
  draw(evento);
});

canvas.addEventListener('touchmove', function(evento) {
  evento.preventDefault(); // Previene lo scorrimento durante il disegno
  draw(evento);
});

canvas.addEventListener('touchend', function() {
  isDrawing = false;
});

canvas.addEventListener('touchcancel', function() {
  isDrawing = false;
});
```

## Best Practices per Eventi Touch

1. **Usa `preventDefault()` con cautela**: Evita di chiamare `preventDefault()` su eventi touch a meno che non sia necessario, poiché può disabilitare comportamenti utili come lo scorrimento.

2. **Implementa feedback visivi**: Fornisci feedback visivi immediati per le interazioni touch, come cambiamenti di stato o animazioni.

3. **Testa su dispositivi reali**: Le emulazioni touch nei browser desktop non catturano tutte le sfumature dei dispositivi touch reali.

4. **Considera le diverse dimensioni dello schermo**: Assicurati che le tue interfacce touch funzionino bene su una varietà di dimensioni di schermo.

5. **Ottimizza per le prestazioni**: Gli eventi touch possono attivarsi molto frequentemente; usa tecniche come throttling e `requestAnimationFrame` per mantenere l'interfaccia reattiva.

6. **Fornisci alternative accessibili**: Assicurati che tutte le funzionalità touch siano accessibili anche tramite tastiera o altri metodi di input.

7. **Usa target sufficientemente grandi**: Elementi interattivi troppo piccoli sono difficili da toccare con precisione.

8. **Gestisci correttamente il multi-touch**: Se la tua applicazione supporta gesti multi-touch, testa accuratamente questi scenari.

9. **Considera l'uso di librerie specializzate**: Per applicazioni complesse, considera l'uso di librerie come Hammer.js che forniscono un'API unificata per la gestione dei gesti.

10. **Usa Pointer Events quando possibile**: I Pointer Events offrono un'API unificata per mouse, touch e penna, semplificando lo sviluppo di interfacce multi-input.

## Conclusione

Gli eventi touch sono fondamentali per creare esperienze utente ottimali su dispositivi mobili. Comprendendo le caratteristiche uniche degli eventi touch e implementando le best practices descritte in questo capitolo, è possibile sviluppare interfacce reattive, performanti e accessibili che funzionano bene su una vasta gamma di dispositivi.

Ricorda che l'obiettivo principale è creare un'esperienza utente fluida e intuitiva, indipendentemente dal dispositivo o dal metodo di input utilizzato dall'utente.

[Torna all'indice](../README.md) | [Argomento precedente: Ottimizzazione delle Prestazioni](./03_Ottimizzazione_Prestazioni.md) | [Prossimo argomento: Pattern Avanzati](./05_Pattern_Avanzati.md)