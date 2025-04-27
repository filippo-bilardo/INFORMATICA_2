# Animazioni 3D in WebGL

## Introduzione alle Animazioni 3D

Le animazioni 3D in WebGL permettono di creare scene dinamiche e interattive, aggiungendo movimento e vita agli oggetti tridimensionali. In questo capitolo esploreremo le tecniche fondamentali per implementare animazioni fluide ed efficienti in WebGL.

## Loop di Rendering

Il cuore di qualsiasi animazione WebGL è il loop di rendering, che aggiorna e disegna continuamente la scena. Ecco un esempio di implementazione utilizzando `requestAnimationFrame`:

```javascript
// Variabili globali per tenere traccia del tempo
let then = 0;

// Funzione principale del loop di rendering
function render(now) {
    // Converti il tempo in secondi
    now *= 0.001;
    const deltaTime = now - then;
    then = now;
    
    // Aggiorna lo stato dell'animazione
    update(deltaTime);
    
    // Disegna la scena
    drawScene();
    
    // Richiedi il prossimo frame
    requestAnimationFrame(render);
}

// Avvia il loop di rendering
requestAnimationFrame(render);
```

L'uso di `requestAnimationFrame` è preferibile rispetto a `setInterval` o `setTimeout` perché:

- Si sincronizza con il refresh del display
- Si interrompe automaticamente quando la scheda non è attiva
- Fornisce un timestamp preciso per calcolare il deltaTime

## Trasformazioni e Animazioni di Base

### Rotazione

Una delle animazioni più comuni è la rotazione di un oggetto:

```javascript
// Stato dell'animazione
let rotation = 0;

// Funzione di aggiornamento
function update(deltaTime) {
    // Ruota di 90 gradi al secondo
    rotation += 90 * deltaTime * Math.PI / 180;
}

// Funzione di disegno
function drawScene() {
    // ... codice precedente ...
    
    // Crea una matrice di rotazione
    const modelViewMatrix = mat4.create();
    mat4.rotate(modelViewMatrix, modelViewMatrix, rotation, [0, 1, 0]);
    
    // Passa la matrice allo shader
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);
    
    // ... resto del codice di disegno ...
}
```

### Traslazione

Per animare il movimento di un oggetto nello spazio:

```javascript
// Stato dell'animazione
let position = [0, 0, 0];
let direction = 1;

// Funzione di aggiornamento
function update(deltaTime) {
    // Muovi l'oggetto avanti e indietro lungo l'asse X
    position[0] += direction * deltaTime;
    
    // Cambia direzione ai bordi
    if (position[0] > 5 || position[0] < -5) {
        direction *= -1;
    }
}

// Funzione di disegno
function drawScene() {
    // ... codice precedente ...
    
    // Crea una matrice di traslazione
    const modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, position);
    
    // ... resto del codice di disegno ...
}
```

### Scalatura

Per animare la dimensione di un oggetto:

```javascript
// Stato dell'animazione
let scale = 1;
let scaleDirection = 1;

// Funzione di aggiornamento
function update(deltaTime) {
    // Scala l'oggetto tra 0.5 e 1.5
    scale += scaleDirection * deltaTime;
    
    // Cambia direzione ai limiti
    if (scale > 1.5 || scale < 0.5) {
        scaleDirection *= -1;
    }
}

// Funzione di disegno
function drawScene() {
    // ... codice precedente ...
    
    // Crea una matrice di scalatura
    const modelViewMatrix = mat4.create();
    mat4.scale(modelViewMatrix, modelViewMatrix, [scale, scale, scale]);
    
    // ... resto del codice di disegno ...
}
```

## Interpolazione

L'interpolazione è una tecnica fondamentale per creare transizioni fluide tra stati. Le funzioni di interpolazione più comuni sono:

### Interpolazione Lineare (LERP)

```javascript
function lerp(a, b, t) {
    return a + t * (b - a);
}

// Esempio di utilizzo
let startPosition = [0, 0, 0];
let endPosition = [5, 2, 0];
let progress = 0;

function update(deltaTime) {
    progress += deltaTime * 0.5; // Completa in 2 secondi
    progress = Math.min(progress, 1.0); // Limita a 1
    
    // Interpola la posizione
    position[0] = lerp(startPosition[0], endPosition[0], progress);
    position[1] = lerp(startPosition[1], endPosition[1], progress);
    position[2] = lerp(startPosition[2], endPosition[2], progress);
}
```

### Interpolazione Sferica (SLERP)

Per interpolare rotazioni, è preferibile utilizzare l'interpolazione sferica con quaternioni:

```javascript
// Utilizzando una libreria come glMatrix
let startRotation = quat.create(); // Quaternione identità
let endRotation = quat.create();
quat.rotateY(endRotation, endRotation, Math.PI); // Rotazione di 180° attorno all'asse Y

let progress = 0;
let currentRotation = quat.create();

function update(deltaTime) {
    progress += deltaTime * 0.5;
    progress = Math.min(progress, 1.0);
    
    // Interpola la rotazione
    quat.slerp(currentRotation, startRotation, endRotation, progress);
}

function drawScene() {
    // ... codice precedente ...
    
    // Crea una matrice di rotazione dal quaternione
    const modelViewMatrix = mat4.create();
    mat4.fromQuat(modelViewMatrix, currentRotation);
    
    // ... resto del codice di disegno ...
}
```

## Curve di Easing

Le curve di easing modificano la velocità di un'animazione per renderla più naturale. Ecco alcune funzioni di easing comuni:

```javascript
// Funzioni di easing
const Easing = {
    // Accelerazione all'inizio
    easeInQuad: function(t) {
        return t * t;
    },
    
    // Decelerazione alla fine
    easeOutQuad: function(t) {
        return t * (2 - t);
    },
    
    // Accelerazione all'inizio e decelerazione alla fine
    easeInOutQuad: function(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    
    // Rimbalzo alla fine
    easeOutBounce: function(t) {
        if (t < (1/2.75)) {
            return 7.5625 * t * t;
        } else if (t < (2/2.75)) {
            return 7.5625 * (t -= (1.5/2.75)) * t + 0.75;
        } else if (t < (2.5/2.75)) {
            return 7.5625 * (t -= (2.25/2.75)) * t + 0.9375;
        } else {
            return 7.5625 * (t -= (2.625/2.75)) * t + 0.984375;
        }
    }
};

// Esempio di utilizzo
function update(deltaTime) {
    progress += deltaTime * 0.5;
    progress = Math.min(progress, 1.0);
    
    // Applica una funzione di easing
    const easedProgress = Easing.easeInOutQuad(progress);
    
    // Usa easedProgress per l'interpolazione
    position[0] = lerp(startPosition[0], endPosition[0], easedProgress);
    // ...
}
```

## Animazione di Fotocamere

L'animazione della fotocamera è essenziale per creare scene dinamiche:

```javascript
// Stato della fotocamera
const camera = {
    position: [0, 0, 5],
    target: [0, 0, 0],
    up: [0, 1, 0],
    fov: 45 * Math.PI / 180,
    aspect: gl.canvas.clientWidth / gl.canvas.clientHeight,
    near: 0.1,
    far: 100.0
};

// Animazione della fotocamera
function updateCamera(deltaTime) {
    // Orbita intorno all'origine
    const angle = Date.now() * 0.001 * 0.5; // Mezzo giro al secondo
    camera.position[0] = Math.sin(angle) * 5;
    camera.position[2] = Math.cos(angle) * 5;
    
    // Aggiorna le matrici di vista e proiezione
    const viewMatrix = mat4.create();
    mat4.lookAt(viewMatrix, camera.position, camera.target, camera.up);
    
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, camera.fov, camera.aspect, camera.near, camera.far);
    
    // Passa le matrici agli shader
    gl.uniformMatrix4fv(programInfo.uniformLocations.viewMatrix, false, viewMatrix);
    gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
}
```

## Animazione Basata su Keyframe

L'animazione basata su keyframe definisce stati chiave e interpola tra di essi:

```javascript
// Definizione dei keyframe
const keyframes = [
    { time: 0, position: [0, 0, 0], rotation: [0, 0, 0, 1] },
    { time: 2, position: [5, 0, 0], rotation: [0, 0.7071, 0, 0.7071] }, // 90° Y
    { time: 4, position: [5, 5, 0], rotation: [0, 1, 0, 0] },            // 180° Y
    { time: 6, position: [0, 5, 0], rotation: [0, -0.7071, 0, 0.7071] },  // 270° Y
    { time: 8, position: [0, 0, 0], rotation: [0, 0, 0, 1] }             // 360° Y
];

// Stato dell'animazione
let animationTime = 0;

function update(deltaTime) {
    // Aggiorna il tempo dell'animazione
    animationTime += deltaTime;
    if (animationTime > keyframes[keyframes.length - 1].time) {
        animationTime = 0; // Riavvia l'animazione
    }
    
    // Trova i keyframe correnti
    let startFrame, endFrame;
    for (let i = 0; i < keyframes.length - 1; i++) {
        if (animationTime >= keyframes[i].time && animationTime < keyframes[i + 1].time) {
            startFrame = keyframes[i];
            endFrame = keyframes[i + 1];
            break;
        }
    }
    
    // Calcola il progresso tra i due keyframe
    const frameDuration = endFrame.time - startFrame.time;
    const frameProgress = (animationTime - startFrame.time) / frameDuration;
    
    // Interpola posizione e rotazione
    const position = [
        lerp(startFrame.position[0], endFrame.position[0], frameProgress),
        lerp(startFrame.position[1], endFrame.position[1], frameProgress),
        lerp(startFrame.position[2], endFrame.position[2], frameProgress)
    ];
    
    const rotation = quat.create();
    quat.slerp(rotation, startFrame.rotation, endFrame.rotation, frameProgress);
    
    // Applica trasformazioni
    const modelMatrix = mat4.create();
    mat4.fromRotationTranslation(modelMatrix, rotation, position);
    
    // ... resto del codice di disegno ...
}
```

## Animazione di Scheletri (Skeletal Animation)

L'animazione scheletrica è una tecnica avanzata che utilizza uno scheletro di ossa per deformare una mesh:

```javascript
// Definizione semplificata di uno scheletro
const skeleton = {
    bones: [
        { name: 'root', parent: -1, position: [0, 0, 0], rotation: [0, 0, 0, 1] },
        { name: 'spine', parent: 0, position: [0, 1, 0], rotation: [0, 0, 0, 1] },
        { name: 'leftArm', parent: 1, position: [-0.5, 0.8, 0], rotation: [0, 0, 0, 1] },
        { name: 'rightArm', parent: 1, position: [0.5, 0.8, 0], rotation: [0, 0, 0, 1] }
    ],
    animations: {
        'wave': [
            // Keyframes per ogni osso...
        ]
    }
};

// Nel vertex shader, applica le trasformazioni delle ossa
// (Questo è un esempio semplificato, una vera implementazione richiederebbe più codice)
```

## Fisica e Simulazioni

Per animazioni più realistiche, è possibile integrare simulazioni fisiche:

### Simulazione di Particelle

```javascript
// Sistema di particelle semplificato
const particles = [];

// Inizializza le particelle
function initParticles(count) {
    for (let i = 0; i < count; i++) {
        particles.push({
            position: [0, 0, 0],
            velocity: [
                (Math.random() - 0.5) * 2,  // Velocità X casuale
                Math.random() * 2,           // Velocità Y positiva
                (Math.random() - 0.5) * 2    // Velocità Z casuale
            ],
            color: [Math.random(), Math.random(), Math.random(), 1.0],
            size: Math.random() * 0.5 + 0.5,
            life: Math.random() * 2 + 1      // Durata tra 1 e 3 secondi
        });
    }
}

// Aggiorna le particelle
function updateParticles(deltaTime) {
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Aggiorna la posizione
        p.position[0] += p.velocity[0] * deltaTime;
        p.position[1] += p.velocity[1] * deltaTime;
        p.position[2] += p.velocity[2] * deltaTime;
        
        // Applica la gravità
        p.velocity[1] -= 9.8 * deltaTime;
        
        // Aggiorna la vita
        p.life -= deltaTime;
        
        // Rimuovi le particelle morte
        if (p.life <= 0) {
            // Resetta la particella
            p.position = [0, 0, 0];
            p.velocity = [
                (Math.random() - 0.5) * 2,
                Math.random() * 2,
                (Math.random() - 0.5) * 2
            ];
            p.life = Math.random() * 2 + 1;
        }
    }
}
```

## Ottimizzazione delle Animazioni

Per garantire animazioni fluide ed efficienti:

1. **Usa deltaTime** per animazioni indipendenti dal frame rate
2. **Limita gli aggiornamenti** per oggetti lontani o non visibili
3. **Precalcola** dati di animazione complessi
4. **Utilizza tecniche di instancing** per oggetti simili (disponibile in WebGL 2.0)
5. **Implementa il frustum culling** per non renderizzare oggetti fuori dalla vista

```javascript
// Esempio di limitazione del frame rate
let lastFrameTime = 0;
const minFrameTime = 1000 / 60; // Limita a 60 FPS

function render(now) {
    const elapsed = now - lastFrameTime;
    
    if (elapsed > minFrameTime) {
        lastFrameTime = now;
        
        // Aggiorna e disegna la scena
        update(elapsed / 1000);
        drawScene();
    }
    
    requestAnimationFrame(render);
}
```

## Interazione con l'Utente

Le animazioni possono rispondere all'input dell'utente:

```javascript
// Stato dell'input
const input = {
    mouseX: 0,
    mouseY: 0,
    keys: {}
};

// Gestori di eventi
function setupInputHandlers() {
    // Mouse move
    document.addEventListener('mousemove', (event) => {
        input.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        input.mouseY = -((event.clientY / window.innerHeight) * 2 - 1);
    });
    
    // Keyboard
    document.addEventListener('keydown', (event) => {
        input.keys[event.code] = true;
    });
    
    document.addEventListener('keyup', (event) => {
        input.keys[event.code] = false;
    });
}

// Utilizzo nell'animazione
function update(deltaTime) {
    // Ruota l'oggetto in base alla posizione del mouse
    rotation[0] = input.mouseY * Math.PI;
    rotation[1] = input.mouseX * Math.PI;
    
    // Muovi l'oggetto con i tasti WASD
    if (input.keys['KeyW']) position[2] -= deltaTime;
    if (input.keys['KeyS']) position[2] += deltaTime;
    if (input.keys['KeyA']) position[0] -= deltaTime;
    if (input.keys['KeyD']) position[0] += deltaTime;
}
```

## Risorse Utili

- [WebGL Fundamentals: Animation](https://webglfundamentals.org/webgl/lessons/webgl-animation.html) - Tutorial dettagliato sull'animazione in WebGL
- [Learn WebGL: Animation](http://learnwebgl.brown37.net/animation/animation_introduction.html) - Guida all'animazione in WebGL
- [MDN: Animating objects with WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Animating_objects_with_WebGL) - Documentazione ufficiale sull'animazione
- [Easing Functions Cheat Sheet](https://easings.net/) - Raccolta di funzioni di easing con visualizzazioni

---

[Indice](../README.md) | [Precedente: Texture e Materiali](./04_Texture_Materiali.md)