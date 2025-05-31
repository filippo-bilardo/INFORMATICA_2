# Texture e Materiali in WebGL

## Introduzione alle Texture

Le texture in WebGL sono immagini che vengono applicate alle superfici degli oggetti 3D per aggiungere dettagli visivi senza aumentare la complessità geometrica. Possono rappresentare colori, rugosità, riflessi, rilievi e molte altre proprietà superficiali.

## Tipi di Texture

WebGL supporta diversi tipi di texture:

- **Texture 2D**: Le più comuni, sono immagini bidimensionali applicate su superfici
- **Cubemap**: Sei immagini disposte come le facce di un cubo, utilizzate per skybox e riflessioni ambientali
- **Texture 3D**: Volumi di dati tridimensionali (disponibili in WebGL 2.0)
- **Texture Array**: Collezioni di texture della stessa dimensione (disponibili in WebGL 2.0)

## Caricamento e Utilizzo delle Texture

Ecco i passaggi per caricare e utilizzare una texture in WebGL:

```javascript
// Funzione per caricare una texture
function loadTexture(gl, url) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    
    // Carica un'immagine temporanea di un singolo pixel finché l'immagine non è caricata
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([255, 0, 255, 255]);  // Pixel magenta
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  width, height, border, srcFormat, srcType,
                  pixel);
    
    // Carica l'immagine
    const image = new Image();
    image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                      srcFormat, srcType, image);
        
        // Verifica se l'immagine ha dimensioni potenza di 2
        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
            // Genera mipmaps
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            // Imposta parametri per texture non potenza di 2
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
    };
    image.src = url;
    
    return texture;
}

// Funzione di supporto per verificare se un numero è potenza di 2
function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
}
```

## Coordinate delle Texture (UV Mapping)

Per applicare correttamente una texture a un oggetto 3D, è necessario definire le coordinate di texture (spesso chiamate coordinate UV) per ogni vertice:

```javascript
// Crea un buffer per le coordinate di texture
function createTextureCoordBuffer(gl) {
    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    
    // Coordinate di texture per un quadrato
    const textureCoordinates = [
        0.0, 0.0,  // Vertice in basso a sinistra
        1.0, 0.0,  // Vertice in basso a destra
        1.0, 1.0,  // Vertice in alto a destra
        0.0, 1.0,  // Vertice in alto a sinistra
    ];
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
    
    return textureCoordBuffer;
}
```

## Parametri delle Texture

WebGL offre diversi parametri per controllare il comportamento delle texture:

### Filtri

I filtri determinano come viene campionata la texture quando viene ingrandita o rimpicciolita:

```javascript
// Filtri per l'ingrandimento e il rimpicciolimento
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
```

Opzioni comuni:
- `gl.NEAREST`: Campionamento del pixel più vicino (aspetto pixelato)
- `gl.LINEAR`: Interpolazione lineare (aspetto più morbido)
- `gl.NEAREST_MIPMAP_NEAREST`, `gl.LINEAR_MIPMAP_LINEAR`, ecc.: Varie combinazioni di filtri per mipmapping

### Wrapping

Il wrapping definisce cosa succede quando le coordinate di texture sono al di fuori dell'intervallo [0,1]:

```javascript
// Modalità di wrapping
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
```

Opzioni comuni:
- `gl.REPEAT`: Ripete la texture
- `gl.MIRRORED_REPEAT`: Ripete la texture ma la riflette ad ogni ripetizione
- `gl.CLAMP_TO_EDGE`: Estende il colore del bordo

## Mipmapping

Il mipmapping è una tecnica che precalcola versioni ridimensionate della texture per migliorare la qualità e le performance quando gli oggetti sono lontani dalla camera:

```javascript
// Genera mipmaps
gl.generateMipmap(gl.TEXTURE_2D);
```

## Utilizzo delle Texture negli Shader

Per utilizzare le texture negli shader, è necessario passare le coordinate di texture dal vertex shader al fragment shader e campionare la texture nel fragment shader:

### Vertex Shader

```glsl
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

### Fragment Shader

```glsl
precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void) {
    gl_FragColor = texture2D(uSampler, vTextureCoord);
}
```

## Materiali in WebGL

I materiali in WebGL sono una combinazione di texture e proprietà che definiscono l'aspetto di un oggetto. Non esiste un sistema di materiali integrato in WebGL, ma è possibile implementarlo utilizzando shader e uniform.

### Implementazione di un Materiale Phong

Il modello di illuminazione Phong è composto da tre componenti: ambientale, diffusa e speculare. Ecco come implementarlo:

```glsl
// Fragment shader con modello di illuminazione Phong
precision mediump float;

varying vec3 vNormal;
varying vec3 vPosition;

uniform vec3 uLightPosition;
uniform vec3 uCameraPosition;

// Proprietà del materiale
uniform vec3 uAmbientColor;
uniform vec3 uDiffuseColor;
uniform vec3 uSpecularColor;
uniform float uShininess;

void main(void) {
    // Normalizza la normale
    vec3 normal = normalize(vNormal);
    
    // Calcola il vettore dalla posizione del frammento alla luce
    vec3 lightDirection = normalize(uLightPosition - vPosition);
    
    // Calcola il vettore dalla posizione del frammento alla camera
    vec3 viewDirection = normalize(uCameraPosition - vPosition);
    
    // Calcola il vettore di riflessione
    vec3 reflectionDirection = reflect(-lightDirection, normal);
    
    // Calcola la componente ambientale
    vec3 ambient = uAmbientColor;
    
    // Calcola la componente diffusa
    float diffuseFactor = max(dot(normal, lightDirection), 0.0);
    vec3 diffuse = uDiffuseColor * diffuseFactor;
    
    // Calcola la componente speculare
    float specularFactor = pow(max(dot(viewDirection, reflectionDirection), 0.0), uShininess);
    vec3 specular = uSpecularColor * specularFactor;
    
    // Combina le componenti
    vec3 finalColor = ambient + diffuse + specular;
    
    gl_FragColor = vec4(finalColor, 1.0);
}
```

## Combinazione di Texture e Materiali

È possibile combinare texture e proprietà dei materiali per creare effetti più complessi:

```glsl
// Fragment shader con texture e illuminazione
precision mediump float;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vTextureCoord;

uniform vec3 uLightPosition;
uniform vec3 uCameraPosition;

// Texture
uniform sampler2D uDiffuseMap;
uniform sampler2D uSpecularMap;
uniform sampler2D uNormalMap;

// Proprietà del materiale
uniform vec3 uAmbientColor;
uniform float uShininess;

void main(void) {
    // Campiona le texture
    vec4 diffuseColor = texture2D(uDiffuseMap, vTextureCoord);
    vec4 specularColor = texture2D(uSpecularMap, vTextureCoord);
    vec3 normalFromMap = texture2D(uNormalMap, vTextureCoord).rgb * 2.0 - 1.0;
    
    // Calcola la normale perturbata
    // (Questo è un esempio semplificato, una vera implementazione richiederebbe una matrice TBN)
    vec3 normal = normalize(vNormal + normalFromMap);
    
    // Calcoli di illuminazione come prima...
    vec3 lightDirection = normalize(uLightPosition - vPosition);
    vec3 viewDirection = normalize(uCameraPosition - vPosition);
    vec3 reflectionDirection = reflect(-lightDirection, normal);
    
    vec3 ambient = uAmbientColor * diffuseColor.rgb;
    float diffuseFactor = max(dot(normal, lightDirection), 0.0);
    vec3 diffuse = diffuseColor.rgb * diffuseFactor;
    float specularFactor = pow(max(dot(viewDirection, reflectionDirection), 0.0), uShininess);
    vec3 specular = specularColor.rgb * specularFactor;
    
    vec3 finalColor = ambient + diffuse + specular;
    
    gl_FragColor = vec4(finalColor, diffuseColor.a);
}
```

## Tecniche Avanzate

### Normal Mapping

Il normal mapping è una tecnica che utilizza una texture per modificare le normali di superficie, creando l'illusione di dettagli geometrici senza aumentare il numero di poligoni:

```javascript
// Carica una normal map
const normalMap = loadTexture(gl, 'normal_map.png');

// Nel vertex shader, passa le coordinate tangenti
// (Questo richiede il calcolo di vettori tangenti e bitangenti)
```

### Environment Mapping

L'environment mapping utilizza cubemap per simulare riflessioni ambientali:

```javascript
// Carica una cubemap
function loadCubeMap(gl, urls) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    
    const faces = [
        gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
        gl.TEXTURE_CUBE_MAP_POSITIVE_Y, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
        gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
    ];
    
    // Carica un'immagine temporanea per ogni faccia
    for (let i = 0; i < faces.length; i++) {
        const face = faces[i];
        gl.texImage2D(face, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                      new Uint8Array([255, 0, 255, 255]));
        
        // Carica l'immagine effettiva
        const image = new Image();
        image.onload = function() {
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
            gl.texImage2D(face, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        };
        image.src = urls[i];
    }
    
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    
    return texture;
}
```

### Bump Mapping e Displacement Mapping

Il bump mapping e il displacement mapping sono tecniche che utilizzano texture per simulare rilievi sulla superficie:

- **Bump Mapping**: Modifica le normali di superficie senza alterare la geometria
- **Displacement Mapping**: Modifica effettivamente la posizione dei vertici (richiede una suddivisione sufficiente della mesh)

## Ottimizzazione delle Texture

Per ottimizzare l'uso delle texture in WebGL:

1. **Usa dimensioni potenza di 2** per le texture (256x256, 512x512, ecc.)
2. **Comprimi le texture** quando possibile
3. **Utilizza il mipmapping** per migliorare le performance e la qualità
4. **Combina più texture** in atlanti di texture per ridurre i cambi di stato
5. **Precarica le texture** prima di iniziare il rendering

## Risorse Utili

- [WebGL Fundamentals: Textures](https://webglfundamentals.org/webgl/lessons/webgl-3d-textures.html) - Tutorial dettagliato sulle texture in WebGL
- [Learn WebGL: Materials](http://learnwebgl.brown37.net/model_data/model_materials.html) - Guida ai materiali in WebGL
- [MDN: Using textures in WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL) - Documentazione ufficiale sull'uso delle texture

---

[Indice](../README.md) | [Precedente: Geometria e Buffer](./03_Geometria_Buffer.md) | [Avanti: Animazioni 3D](./05_Animazioni_3D.md)