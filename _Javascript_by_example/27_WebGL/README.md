# WebGL in JavaScript

Benvenuti all'esercitazione su WebGL in JavaScript. WebGL è una potente API per il rendering 3D nel browser, che permette di creare visualizzazioni tridimensionali, giochi, simulazioni e applicazioni grafiche avanzate direttamente nel browser senza plugin esterni.

## Contenuti dell'esercitazione

1. **Introduzione a WebGL**
   - Cos'è WebGL
   - Configurazione del contesto WebGL
   - Differenze tra WebGL 1.0 e 2.0
   - Compatibilità con i browser

2. **Shader e GLSL**
   - Vertex Shader
   - Fragment Shader
   - Linguaggio GLSL
   - Compilazione e linking degli shader

3. **Geometria e Vertici**
   - Buffer di vertici
   - Attributi e variabili uniformi
   - Indici e primitive
   - Trasformazioni 3D

4. **Texture e Materiali**
   - Caricamento e applicazione di texture
   - Coordinate UV
   - Filtri e mipmapping
   - Materiali e illuminazione

5. **Animazioni e Interattività**
   - Animazione di oggetti 3D
   - Interazione con il mouse
   - Controlli della camera
   - Tecniche di ottimizzazione

## Esempi pratici

In questa esercitazione troverai diversi esempi pratici che illustrano l'uso di WebGL:

- **01_Cubo_Rotante**: Un cubo 3D che ruota nello spazio, dimostrando le trasformazioni di base
- **02_Texture_Mapping**: Applicazione di texture su oggetti 3D
- **03_Illuminazione**: Implementazione di modelli di illuminazione in WebGL

Per visualizzare gli esempi, apri i file HTML nella cartella `esempi` con un browser web. Gli esempi sono interattivi e mostrano le potenzialità di WebGL.

## Materiale Teorico

La cartella `teoria` contiene guide dettagliate sui vari aspetti di WebGL:

1. **[01_Introduzione_WebGL.md](./teoria/01_Introduzione_WebGL.md)** - Introduzione a WebGL, configurazione del contesto e differenze tra WebGL 1.0 e 2.0
2. **[02_Shader_GLSL.md](./teoria/02_Shader_GLSL.md)** - Spiegazione degli shader e del linguaggio GLSL per la programmazione GPU
3. **[03_Geometria_Buffer.md](./teoria/03_Geometria_Buffer.md)** - Gestione della geometria 3D attraverso buffer e primitive
4. **[04_Texture_Materiali.md](./teoria/04_Texture_Materiali.md)** - Applicazione di texture e materiali agli oggetti 3D
5. **[05_Animazioni_3D.md](./teoria/05_Animazioni_3D.md)** - Tecniche per creare animazioni fluide ed efficienti in WebGL

## Risorse aggiuntive

- [MDN Web Docs: WebGL API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [Learn WebGL](http://learnwebgl.brown37.net/)
- [The Book of Shaders](https://thebookofshaders.com/)

## Librerie e Framework

Sebbene questa esercitazione si concentri su WebGL puro, esistono diverse librerie che semplificano lo sviluppo:

- [Three.js](https://threejs.org/) - La libreria 3D più popolare per WebGL
- [Babylon.js](https://www.babylonjs.com/) - Un potente framework per giochi e applicazioni 3D
- [PlayCanvas](https://playcanvas.com/) - Un motore di gioco WebGL con editor visuale

## Compatibilità

WebGL è supportato da tutti i browser moderni. WebGL 1.0 ha un'ampia compatibilità, mentre WebGL 2.0 potrebbe non essere supportato su browser più datati o su alcuni dispositivi mobili. È consigliabile implementare un fallback per garantire la compatibilità con tutti gli utenti.

Buon divertimento con WebGL!