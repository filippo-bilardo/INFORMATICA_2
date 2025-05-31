# Geometria e Buffer in WebGL

## Concetti Fondamentali

In WebGL, la geometria degli oggetti 3D è definita attraverso vertici, che vengono organizzati in primitive geometriche come triangoli, linee o punti. Per gestire questi dati in modo efficiente, WebGL utilizza i buffer, che sono aree di memoria sulla GPU dove vengono memorizzati i dati dei vertici.

## Primitive Geometriche

WebGL supporta diverse primitive geometriche:

- **Punti** (`gl.POINTS`): Singoli punti nello spazio
- **Linee** (`gl.LINES`): Coppie di vertici che formano segmenti di linea
- **Line Strip** (`gl.LINE_STRIP`): Sequenza di vertici connessi da linee
- **Line Loop** (`gl.LINE_LOOP`): Come Line Strip, ma con una linea aggiuntiva che collega l'ultimo vertice al primo
- **Triangoli** (`gl.TRIANGLES`): Gruppi di tre vertici che formano triangoli
- **Triangle Strip** (`gl.TRIANGLE_STRIP`): Sequenza di triangoli connessi
- **Triangle Fan** (`gl.TRIANGLE_FAN`): Triangoli che condividono un vertice centrale

## Buffer di Vertici

I buffer di vertici (Vertex Buffer Objects o VBO) sono utilizzati per memorizzare i dati dei vertici come posizioni, colori, normali e coordinate delle texture. Ecco come creare e utilizzare un buffer di vertici:

```javascript
// Crea un buffer per le posizioni dei vertici
function initBuffers(gl) {
    // Crea un buffer
    const positionBuffer = gl.createBuffer();
    
    // Seleziona il buffer come target corrente
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
    // Definisci le posizioni dei vertici per un quadrato
    const positions = [
        -1.0,  1.0, 0.0,  // Vertice in alto a sinistra
         1.0,  1.0, 0.0,  // Vertice in alto a destra
         1.0, -1.0, 0.0,  // Vertice in basso a destra
        -1.0, -1.0, 0.0,  // Vertice in basso a sinistra
    ];
    
    // Passa i dati al buffer
    gl.bufferData(
        gl.ARRAY_BUFFER,           // Target del buffer
        new Float32Array(positions), // Dati convertiti in Float32Array
        gl.STATIC_DRAW              // Suggerimento sull'utilizzo (statico)
    );
    
    return {
        position: positionBuffer,
        count: positions.length / 3  // Numero di vertici
    };
}
```

## Buffer di Indici

I buffer di indici (Index Buffer Objects o IBO) permettono di riutilizzare i vertici, specificando l'ordine in cui devono essere disegnati. Questo riduce la quantità di dati da trasferire alla GPU:

```javascript
// Crea un buffer per gli indici
function createIndexBuffer(gl) {
    // Crea un buffer
    const indexBuffer = gl.createBuffer();
    
    // Seleziona il buffer come target corrente
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    
    // Definisci gli indici per disegnare un quadrato usando due triangoli
    const indices = [
        0, 1, 2,  // Primo triangolo
        0, 2, 3   // Secondo triangolo
    ];
    
    // Passa i dati al buffer
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,  // Target del buffer
        new Uint16Array(indices),  // Dati convertiti in Uint16Array
        gl.STATIC_DRAW             // Suggerimento sull'utilizzo (statico)
    );
    
    return {
        buffer: indexBuffer,
        count: indices.length  // Numero di indici
    };
}
```

## Attributi dei Vertici

Oltre alle posizioni, i vertici possono avere altri attributi come colori, normali e coordinate delle texture. Ecco come definire e utilizzare questi attributi:

```javascript
// Crea buffer per posizioni e colori
function initBuffers(gl) {
    // Buffer per le posizioni
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0, -1.0, 0.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
    // Buffer per i colori
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    const colors = [
        1.0, 0.0, 0.0, 1.0,  // Rosso
        0.0, 1.0, 0.0, 1.0,  // Verde
        0.0, 0.0, 1.0, 1.0,  // Blu
        1.0, 1.0, 0.0, 1.0,  // Giallo
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    
    return {
        position: positionBuffer,
        color: colorBuffer,
        vertexCount: positions.length / 3
    };
}
```

## Disegno delle Primitive

Una volta definiti i buffer, è possibile disegnare le primitive geometriche:

```javascript
// Funzione per disegnare la scena
function drawScene(gl, programInfo, buffers) {
    // Pulisci il canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    // Usa il programma shader
    gl.useProgram(programInfo.program);
    
    // Imposta l'attributo della posizione
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        3,          // 3 componenti per vertice (x, y, z)
        gl.FLOAT,   // Tipo di dati
        false,      // Non normalizzare
        0,          // Stride (0 = usa il tipo e numComponents)
        0           // Offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    
    // Imposta l'attributo del colore
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        4,          // 4 componenti per colore (r, g, b, a)
        gl.FLOAT,   // Tipo di dati
        false,      // Non normalizzare
        0,          // Stride
        0           // Offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
    
    // Disegna i triangoli
    gl.drawArrays(
        gl.TRIANGLE_STRIP,  // Tipo di primitiva
        0,                  // Indice di partenza
        4                   // Numero di vertici
    );
}
```

## Utilizzo dei Buffer di Indici

Per disegnare utilizzando un buffer di indici:

```javascript
function drawScene(gl, programInfo, buffers, indices) {
    // ... (codice precedente) ...
    
    // Collega il buffer degli indici
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices.buffer);
    
    // Disegna gli elementi
    gl.drawElements(
        gl.TRIANGLES,        // Tipo di primitiva
        indices.count,       // Numero di indici
        gl.UNSIGNED_SHORT,   // Tipo di indici
        0                    // Offset
    );
}
```

## Vertex Array Objects (VAO)

I Vertex Array Objects (VAO) permettono di memorizzare la configurazione degli attributi dei vertici, semplificando il codice quando si disegnano più oggetti:

```javascript
// Nota: VAO sono disponibili in WebGL 2.0 o tramite estensione in WebGL 1.0
function initVAO(gl, programInfo, buffers) {
    // Crea e collega il VAO
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    
    // Configura l'attributo della posizione
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    
    // Configura l'attributo del colore
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
    
    // Scollega il VAO
    gl.bindVertexArray(null);
    
    return vao;
}

// Utilizzo del VAO durante il disegno
function drawScene(gl, programInfo, vao, count) {
    // ... (codice precedente) ...
    
    // Collega il VAO
    gl.bindVertexArray(vao);
    
    // Disegna
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, count);
    
    // Scollega il VAO
    gl.bindVertexArray(null);
}
```

## Creazione di Forme Comuni

### Cubo

```javascript
function createCube(gl) {
    // Posizioni dei vertici
    const positions = [
        // Faccia frontale
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        
        // Faccia posteriore
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,
        
        // Faccia superiore
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,
        
        // Faccia inferiore
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,
        
        // Faccia destra
         1.0, -1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0,  1.0,  1.0,
         1.0, -1.0,  1.0,
        
        // Faccia sinistra
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
    ];
    
    // Indici per disegnare le facce come triangoli
    const indices = [
        0,  1,  2,    0,  2,  3,  // Faccia frontale
        4,  5,  6,    4,  6,  7,  // Faccia posteriore
        8,  9,  10,   8,  10, 11, // Faccia superiore
        12, 13, 14,   12, 14, 15, // Faccia inferiore
        16, 17, 18,   16, 18, 19, // Faccia destra
        20, 21, 22,   20, 22, 23, // Faccia sinistra
    ];
    
    // Crea e popola i buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    
    return {
        position: positionBuffer,
        indices: indexBuffer,
        vertexCount: positions.length / 3,
        indexCount: indices.length
    };
}
```

### Sfera

```javascript
function createSphere(gl, radius, latitudeBands, longitudeBands) {
    const positions = [];
    const normals = [];
    const textureCoords = [];
    const indices = [];
    
    // Genera vertici
    for (let lat = 0; lat <= latitudeBands; lat++) {
        const theta = lat * Math.PI / latitudeBands;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        
        for (let lon = 0; lon <= longitudeBands; lon++) {
            const phi = lon * 2 * Math.PI / longitudeBands;
            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);
            
            const x = cosPhi * sinTheta;
            const y = cosTheta;
            const z = sinPhi * sinTheta;
            const u = 1 - (lon / longitudeBands);
            const v = 1 - (lat / latitudeBands);
            
            positions.push(radius * x, radius * y, radius * z);
            normals.push(x, y, z);
            textureCoords.push(u, v);
        }
    }
    
    // Genera indici
    for (let lat = 0; lat < latitudeBands; lat++) {
        for (let lon = 0; lon < longitudeBands; lon++) {
            const first = (lat * (longitudeBands + 1)) + lon;
            const second = first + longitudeBands + 1;
            
            indices.push(first, second, first + 1);
            indices.push(second, second + 1, first + 1);
        }
    }
    
    // Crea e popola i buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    
    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    
    return {
        position: positionBuffer,
        normal: normalBuffer,
        textureCoord: textureCoordBuffer,
        indices: indexBuffer,
        indexCount: indices.length
    };
}
```

## Ottimizzazione delle Performance

Per ottimizzare le performance quando si lavora con buffer e geometria in WebGL:

1. **Riutilizza i vertici** usando buffer di indici
2. **Minimizza i cambi di stato** raggruppando oggetti con materiali simili
3. **Usa Vertex Array Objects** per ridurre le chiamate API
4. **Considera l'utilizzo di istanziazione** per oggetti ripetuti (disponibile in WebGL 2.0)
5. **Usa il suggerimento corretto** quando crei i buffer:
   - `gl.STATIC_DRAW`: per dati che non cambiano
   - `gl.DYNAMIC_DRAW`: per dati che cambiano occasionalmente
   - `gl.STREAM_DRAW`: per dati che cambiano ad ogni frame

## Risorse Utili

- [WebGL Fundamentals: Buffers](https://webglfundamentals.org/webgl/lessons/webgl-how-it-works.html) - Spiegazione dettagliata su come funzionano i buffer in WebGL
- [Learn WebGL: Geometry](http://learnwebgl.brown37.net/model_data/model_creation.html) - Tutorial sulla creazione di geometria in WebGL
- [MDN: WebGL Model View Projection](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_model_view_projection) - Guida alla trasformazione della geometria

---

[Indice](../README.md) | [Precedente: Shader e GLSL](./02_Shader_GLSL.md) | [Avanti: Texture e Materiali](./04_Texture_Materiali.md)