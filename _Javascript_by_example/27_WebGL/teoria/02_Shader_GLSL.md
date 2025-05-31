# Shader e GLSL in WebGL

## Cos'è un Shader

Gli shader sono programmi che vengono eseguiti direttamente sulla GPU (Graphics Processing Unit) e sono fondamentali per il rendering in WebGL. Questi programmi determinano come vengono elaborati i vertici e come vengono colorati i pixel sullo schermo.

In WebGL, esistono due tipi principali di shader:

- **Vertex Shader**: Elabora i dati dei vertici, come posizione, colore e coordinate delle texture. Il suo compito principale è calcolare la posizione finale di ogni vertice nello spazio di visualizzazione.

- **Fragment Shader** (o Pixel Shader): Determina il colore di ogni pixel all'interno delle primitive geometriche. Viene eseguito per ogni frammento (potenziale pixel) che sarà visualizzato sullo schermo.

## GLSL: Il linguaggio degli Shader

GLSL (OpenGL Shading Language) è il linguaggio di programmazione utilizzato per scrivere gli shader in WebGL. È un linguaggio di tipo C con funzionalità specifiche per la grafica.

Caratteristiche principali di GLSL:

- **Tipi di dati vettoriali**: `vec2`, `vec3`, `vec4` per vettori a 2, 3 e 4 componenti
- **Tipi di dati matriciali**: `mat2`, `mat3`, `mat4` per matrici 2x2, 3x3 e 4x4
- **Funzioni matematiche integrate**: sin, cos, normalize, dot, cross, mix, ecc.
- **Variabili predefinite**: per accedere a informazioni come la posizione del vertice o le coordinate delle texture

## Esempio di Vertex Shader

```glsl
// Vertex shader di base
attribute vec3 aVertexPosition; // Posizione del vertice
uniform mat4 uModelViewMatrix; // Matrice di trasformazione
uniform mat4 uProjectionMatrix; // Matrice di proiezione

void main(void) {
    // Calcola la posizione finale del vertice
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
}
```

## Esempio di Fragment Shader

```glsl
// Fragment shader di base
precision mediump float; // Precisione per i numeri in virgola mobile

void main(void) {
    // Imposta il colore del frammento (rosso)
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // RGBA
}
```

## Compilazione e Collegamento degli Shader

Per utilizzare gli shader in WebGL, è necessario seguire questi passaggi:

1. **Creazione degli shader**
2. **Compilazione degli shader**
3. **Creazione di un programma shader**
4. **Collegamento degli shader al programma**
5. **Utilizzo del programma**

Ecco un esempio di codice JavaScript che mostra questo processo:

```javascript
// Funzione per inizializzare gli shader
function initShaders(gl) {
    // Codice sorgente degli shader
    const vsSource = `
        attribute vec3 aVertexPosition;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        
        void main(void) {
            gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
        }
    `;
    
    const fsSource = `
        precision mediump float;
        
        void main(void) {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `;
    
    // Crea gli shader
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    
    // Crea il programma shader
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    
    // Verifica se la creazione del programma è riuscita
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Impossibile inizializzare il programma shader: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }
    
    return shaderProgram;
}

// Funzione di supporto per compilare uno shader
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    
    // Invia il codice sorgente allo shader
    gl.shaderSource(shader, source);
    
    // Compila lo shader
    gl.compileShader(shader);
    
    // Verifica se la compilazione è riuscita
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('Errore durante la compilazione dello shader: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    
    return shader;
}
```

## Passaggio di Dati agli Shader

Per passare dati agli shader, WebGL utilizza diversi tipi di variabili:

- **Attributes**: Dati che variano per vertice (posizioni, colori, coordinate texture)
- **Uniforms**: Dati costanti per tutti i vertici (matrici di trasformazione, luci)
- **Varyings**: Dati interpolati dal vertex shader al fragment shader

Ecco un esempio di come passare dati agli shader:

```javascript
// Ottieni le posizioni degli attributi e delle uniform
const programInfo = {
    program: shaderProgram,
    attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
};

// Imposta gli attributi e le uniform
gl.useProgram(programInfo.program);

// Imposta le matrici di trasformazione
gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix);
gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix);

// Collega il buffer dei vertici all'attributo
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    3,          // Numero di componenti per vertice
    gl.FLOAT,   // Tipo di dati
    false,      // Normalizzazione
    0,          // Stride
    0);         // Offset
gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
```

## Tecniche Avanzate con gli Shader

### Illuminazione

Gli shader possono implementare modelli di illuminazione come Phong o Lambert:

```glsl
// Vertex shader con illuminazione
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;
uniform vec3 uLightPosition;

varying vec3 vNormal;
varying vec3 vLightRay;

void main(void) {
    // Calcola la posizione finale del vertice
    vec4 vertex = uModelViewMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = uProjectionMatrix * vertex;
    
    // Passa la normale e il vettore luce al fragment shader
    vNormal = vec3(uNormalMatrix * vec4(aVertexNormal, 1.0));
    vLightRay = uLightPosition - vertex.xyz;
}
```

```glsl
// Fragment shader con illuminazione
precision mediump float;

varying vec3 vNormal;
varying vec3 vLightRay;

uniform vec4 uMaterialColor;

void main(void) {
    // Normalizza i vettori
    vec3 normal = normalize(vNormal);
    vec3 lightRay = normalize(vLightRay);
    
    // Calcola l'illuminazione diffusa
    float diffuse = max(dot(normal, lightRay), 0.0);
    
    // Calcola il colore finale
    gl_FragColor = vec4(uMaterialColor.rgb * diffuse, uMaterialColor.a);
}
```

### Texture

Gli shader possono applicare texture agli oggetti:

```glsl
// Vertex shader con texture
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec2 vTextureCoord;

void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord;
}
```

```glsl
// Fragment shader con texture
precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void) {
    gl_FragColor = texture2D(uSampler, vTextureCoord);
}
```

## Risorse per l'Apprendimento di GLSL

- [The Book of Shaders](https://thebookofshaders.com/) - Una guida interattiva per imparare GLSL
- [GLSL Sandbox](http://glslsandbox.com/) - Un ambiente online per sperimentare con i fragment shader
- [Shadertoy](https://www.shadertoy.com/) - Una comunità per condividere e esplorare shader creativi
- [WebGL Fundamentals: Shaders](https://webglfundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html) - Tutorial dettagliato su shader e GLSL

---

[Indice](../README.md) | [Precedente: Introduzione a WebGL](./01_Introduzione_WebGL.md) | [Avanti: Geometria e Buffer](./03_Geometria_Buffer.md)