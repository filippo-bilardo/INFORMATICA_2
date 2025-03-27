# Quiz di Autovalutazione

Testa le tue conoscenze sul Canvas HTML5 con questi quiz interattivi.

## Quiz 1: Fondamenti di Canvas

1. **Quale metodo utilizzi per ottenere il contesto di disegno di un elemento canvas?**
   - a) `canvas.createContext('2d')`
   - b) `canvas.getContext('2d')`
   - c) `canvas.makeContext('2d')`
   - d) `canvas.setContext('2d')`

2. **Quale proprietà determina il colore di riempimento nel contesto Canvas?**
   - a) `fillColor`
   - b) `fillStyle`
   - c) `strokeColor`
   - d) `background`

3. **Come si disegna un rettangolo pieno in Canvas?**
   - a) `ctx.drawRect(x, y, width, height)`
   - b) `ctx.fillRect(x, y, width, height)`
   - c) `ctx.rect(x, y, width, height)`
   - d) `ctx.strokeRect(x, y, width, height)`

[Risposte: 1-b, 2-b, 3-b]

## Quiz 2: Tracciati e Forme

1. **Quale metodo inizia un nuovo tracciato in Canvas?**
   - a) `ctx.startPath()`
   - b) `ctx.newPath()`
   - c) `ctx.beginPath()`
   - d) `ctx.createPath()`

2. **Quale metodo aggiunge un arco al tracciato corrente?**
   - a) `ctx.arc(x, y, radius, startAngle, endAngle)`
   - b) `ctx.circle(x, y, radius)`
   - c) `ctx.drawArc(x, y, radius, startAngle, endAngle)`
   - d) `ctx.createArc(x, y, radius, startAngle, endAngle)`

3. **Come si chiude un tracciato in Canvas?**
   - a) `ctx.end()`
   - b) `ctx.closePath()`
   - c) `ctx.finishPath()`
   - d) `ctx.complete()`

[Risposte: 1-c, 2-a, 3-b]

## Quiz 3: Animazioni e Interattività

1. **Qual è il metodo consigliato per creare animazioni fluide in Canvas?**
   - a) `setInterval()`
   - b) `setTimeout()`
   - c) `requestAnimationFrame()`
   - d) `animateCanvas()`

2. **Come si rileva un click su un elemento specifico disegnato in Canvas?**
   - a) `canvas.addEventListener('click', handler)`
   - b) `element.addEventListener('click', handler)`
   - c) `Utilizzando il listener sul canvas e calcolando manualmente se le coordinate del click intersecano l'elemento`
   - d) `ctx.addEventListener('click', handler)`

3. **Come si cancella completamente un canvas per il frame successivo di un'animazione?**
   - a) `ctx.erase()`
   - b) `ctx.clearRect(0, 0, canvas.width, canvas.height)`
   - c) `canvas.clear()`
   - d) `ctx.reset()`

[Risposte: 1-c, 2-c, 3-b]

## Quiz 4: Ottimizzazione e Tecniche Avanzate

1. **Quale tecnica è utile per migliorare le prestazioni quando si disegnano molti elementi statici?**
   - a) `Aumentare la dimensione del canvas`
   - b) `Disegnare gli elementi più lentamente`
   - c) `Usare canvas multipli in layering`
   - d) `Pre-rendering su un canvas offscreen`

2. **Come si gestisce correttamente un canvas su schermi ad alta densità di pixel (HiDPI/Retina)?**
   - a) `Aumentare la risoluzione e scalare con CSS`
   - b) `Ignorare il problema, i browser lo gestiscono automaticamente`
   - c) `Usare una libreria esterna`
   - d) `Disabilitare il canvas su dispositivi HiDPI`

3. **Quale approccio è migliore per animazioni complesse con molti oggetti?**
   - a) `Utilizzare SVG invece di Canvas`
   - b) `Aggiornare solo le parti del canvas che cambiano`
   - c) `Ridurre il framerate a 30 fps`
   - d) `Tutte le precedenti possono essere valide a seconda del caso d'uso`

[Risposte: 1-d, 2-a, 3-d]
