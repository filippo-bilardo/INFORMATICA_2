# Introduzione a WebGL

## Cos'è WebGL

WebGL (Web Graphics Library) è un'API JavaScript che consente di renderizzare grafica 3D e 2D accelerata via hardware all'interno di qualsiasi browser web compatibile senza l'uso di plugin. WebGL è basata su OpenGL ES, una versione di OpenGL progettata per dispositivi mobili e sistemi embedded.

Le caratteristiche principali di WebGL includono:

- **Rendering 3D nel browser**: Permette di creare scene tridimensionali complesse direttamente nel browser
- **Accelerazione hardware**: Sfrutta la GPU per calcoli grafici veloci ed efficienti
- **Integrazione con JavaScript**: Si integra perfettamente con l'ecosistema web e JavaScript
- **Cross-platform**: Funziona su diversi sistemi operativi e dispositivi

## Configurazione del contesto WebGL

Per iniziare a utilizzare WebGL, è necessario ottenere un contesto WebGL da un elemento canvas HTML. Ecco i passaggi fondamentali:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Il mio primo progetto WebGL</title>
    <style>
        body { margin: 0; overflow: hidden; }
        canvas { width: 100%; height: 100%; display: block; }
    </style>
</head>
<body>
    <canvas id="glCanvas"></canvas>
    <script>
        // Inizializzazione di WebGL
        function initWebGL() {
            const canvas = document.getElementById("glCanvas");
            
            // Ottieni il contesto WebGL
            const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            
            // Verifica se WebGL è supportato
            if (!gl) {
                alert("Impossibile inizializzare WebGL. Il tuo browser potrebbe non supportarlo.");
                return null;
            }
            
            // Imposta le dimensioni del canvas
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
            
            // Imposta il colore di sfondo e pulisci il canvas
            gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Nero
            gl.clear(gl.COLOR_BUFFER_BIT);
            
            return gl;
        }
        
        // Chiama la funzione di inizializzazione quando la pagina è caricata
        window.onload = initWebGL;
    </script>
</body>
</html>
```

## Differenze tra WebGL 1.0 e 2.0

WebGL ha due versioni principali con differenze significative:

### WebGL 1.0
- Basato su OpenGL ES 2.0
- Supporto più ampio nei browser
- Funzionalità di base per il rendering 3D
- Rilasciato nel 2011

### WebGL 2.0
- Basato su OpenGL ES 3.0
- Nuove funzionalità avanzate:
  - Texture 3D
  - Trasform feedback
  - Istanziazione
  - Supporto per multiple render targets
  - Texture di profondità
  - Query di occlusione
- Miglioramenti GLSL (linguaggio degli shader)
- Rilasciato nel 2017

Per verificare quale versione di WebGL è supportata dal browser, è possibile utilizzare il seguente codice:

```javascript
function checkWebGLVersion() {
    const canvas = document.createElement('canvas');
    
    // Verifica WebGL 2.0
    const gl2 = canvas.getContext('webgl2');
    if (gl2) {
        return "WebGL 2.0";
    }
    
    // Verifica WebGL 1.0
    const gl1 = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl1) {
        return "WebGL 1.0";
    }
    
    return "WebGL non supportato";
}

console.log("Versione WebGL supportata: " + checkWebGLVersion());
```

## Compatibilità con i browser

La compatibilità di WebGL varia tra i diversi browser e dispositivi:

| Browser | WebGL 1.0 | WebGL 2.0 |
|---------|-----------|----------|
| Chrome | Completo | Completo |
| Firefox | Completo | Completo |
| Safari | Completo | Supporto parziale |
| Edge | Completo | Completo |
| Opera | Completo | Completo |
| Internet Explorer | Supporto limitato | Non supportato |
| Browser mobili | Supporto variabile | Supporto limitato |

Per garantire la massima compatibilità, è consigliabile:

1. Implementare un sistema di fallback per browser che non supportano WebGL
2. Utilizzare librerie come Three.js che gestiscono automaticamente le differenze di compatibilità
3. Testare l'applicazione su diversi browser e dispositivi
4. Considerare l'uso di WebGL 1.0 per progetti che richiedono ampia compatibilità

## Risorse utili per iniziare

- [WebGL Fundamentals](https://webglfundamentals.org/) - Tutorial completi sui fondamenti di WebGL
- [MDN Web Docs: WebGL API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) - Documentazione ufficiale
- [Khronos WebGL Wiki](https://www.khronos.org/webgl/wiki/) - Wiki ufficiale del gruppo Khronos
- [WebGL Report](https://webglreport.com/) - Strumento per verificare le capacità WebGL del tuo browser

---

[Indice](../README.md) | [Avanti: Shader e GLSL](./02_Shader_GLSL.md)