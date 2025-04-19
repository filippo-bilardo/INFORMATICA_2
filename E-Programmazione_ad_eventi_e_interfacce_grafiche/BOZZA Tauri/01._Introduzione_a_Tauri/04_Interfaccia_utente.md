# Interfaccia utente in Tauri

## Indice dei contenuti
- [Framework frontend supportati](#framework-frontend-supportati)
- [Styling delle applicazioni Tauri](#styling-delle-applicazioni-tauri)
- [Gestione delle finestre multiple](#gestione-delle-finestre-multiple)
- [Personalizzazione della barra del titolo](#personalizzazione-della-barra-del-titolo)
- [Responsive design per applicazioni desktop](#responsive-design-per-applicazioni-desktop)
- [Accessibilità nelle applicazioni Tauri](#accessibilità-nelle-applicazioni-tauri)

## Framework frontend supportati

Uno dei maggiori vantaggi di Tauri è la libertà di utilizzare qualsiasi framework frontend per costruire l'interfaccia utente. Vediamo le opzioni più popolari e le loro caratteristiche.

### React

React è uno dei framework più diffusi per lo sviluppo di interfacce utente web e si integra perfettamente con Tauri.

**Vantaggi:**
- Vasto ecosistema di librerie e componenti
- Virtual DOM per prestazioni ottimizzate
- Supporto TypeScript eccellente
- Ampia comunità e documentazione

**Configurazione con Tauri:**

```bash
# Creazione di un nuovo progetto React + Tauri
npm create tauri-app -- --template react-ts
```

Esempio di componente React che utilizza le API Tauri:

```jsx
import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

function App() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  async function handleGreet() {
    const response = await invoke('greet', { name });
    setMessage(response);
  }

  return (
    <div className="container">
      <h1>Benvenuto nell'app Tauri + React</h1>
      <div className="row">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Inserisci il tuo nome..."
        />
        <button onClick={handleGreet}>Saluta</button>
      </div>
      {message && <p className="result">{message}</p>}
    </div>
  );
}

export default App;
```

### Vue.js

Vue.js è apprezzato per la sua semplicità e la curva di apprendimento graduale, rendendolo una scelta eccellente per progetti Tauri.

**Vantaggi:**
- Sistema di reattività intuitivo
- Sintassi template familiare
- Ottima documentazione in italiano
- Dimensioni ridotte del bundle

**Configurazione con Tauri:**

```bash
# Creazione di un nuovo progetto Vue + Tauri
npm create tauri-app -- --template vue-ts
```

Esempio di componente Vue che utilizza le API Tauri:

```vue
<script setup>
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/tauri';

const name = ref('');
const message = ref('');

async function handleGreet() {
  message.value = await invoke('greet', { name: name.value });
}
</script>

<template>
  <div class="container">
    <h1>Benvenuto nell'app Tauri + Vue</h1>
    <div class="row">
      <input
        v-model="name"
        type="text"
        placeholder="Inserisci il tuo nome..."
      />
      <button @click="handleGreet">Saluta</button>
    </div>
    <p v-if="message" class="result">{{ message }}</p>
  </div>
</template>
```

### Svelte

Svelte è un framework innovativo che compila il codice in JavaScript vanilla, risultando in bundle più piccoli e prestazioni migliori.

**Vantaggi:**
- Nessun Virtual DOM, prestazioni eccellenti
- Sintassi semplice e intuitiva
- Meno codice boilerplate
- Bundle finali più piccoli

**Configurazione con Tauri:**

```bash
# Creazione di un nuovo progetto Svelte + Tauri
npm create tauri-app -- --template svelte-ts
```

Esempio di componente Svelte che utilizza le API Tauri:

```svelte
<script>
  import { invoke } from '@tauri-apps/api/tauri';
  
  let name = '';
  let message = '';
  
  async function handleGreet() {
    message = await invoke('greet', { name });
  }
</script>

<div class="container">
  <h1>Benvenuto nell'app Tauri + Svelte</h1>
  <div class="row">
    <input
      bind:value={name}
      type="text"
      placeholder="Inserisci il tuo nome..."
    />
    <button on:click={handleGreet}>Saluta</button>
  </div>
  {#if message}
    <p class="result">{message}</p>
  {/if}
</div>
```

### Vanilla JavaScript

È possibile utilizzare JavaScript puro senza framework, ideale per applicazioni semplici o per chi preferisce evitare dipendenze esterne.

**Vantaggi:**
- Nessuna dipendenza aggiuntiva
- Controllo completo sul codice
- Bundle più leggeri
- Curva di apprendimento minima

**Configurazione con Tauri:**

```bash
# Creazione di un nuovo progetto Vanilla JS + Tauri
npm create tauri-app -- --template vanilla
```

## Styling delle applicazioni Tauri

Le applicazioni Tauri utilizzano CSS standard per lo styling, con diverse opzioni disponibili.

### CSS nativo

È possibile utilizzare CSS puro con file separati o stili inline:

```css
/* styles.css */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  color: #333;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

/* Stili per temi chiari/scuri */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #222;
    color: #f5f5f5;
  }
}
```

### Preprocessori CSS

Tauri supporta preprocessori come SASS, LESS o Stylus tramite i tool di build del frontend:

```scss
// styles.scss
$primary-color: #0078e7;
$secondary-color: #f5f5f5;

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
  padding: 0;
  background-color: $secondary-color;
  
  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: $secondary-color;
  }
}

.button {
  background-color: $primary-color;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  
  &:hover {
    background-color: darken($primary-color, 10%);
  }
}
```

### CSS-in-JS

Librerie come styled-components o emotion sono popolari con React:

```jsx
import styled from 'styled-components';

const Button = styled.button`
  background-color: #0078e7;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  
  &:hover {
    background-color: #0056b3;
  }
`;

function App() {
  return (
    <div>
      <Button>Clicca qui</Button>
    </div>
  );
}
```

### Librerie UI

È possibile utilizzare librerie di componenti UI come:

- **React**: Material-UI, Chakra UI, Ant Design
- **Vue**: Vuetify, Element Plus, Quasar
- **Svelte**: Svelte Material UI, Carbon Components Svelte

Esempio con Material-UI in React:

```jsx
import { Button, TextField, Typography, Box } from '@mui/material';
import { invoke } from '@tauri-apps/api/tauri';
import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  async function handleGreet() {
    const response = await invoke('greet', { name });
    setMessage(response);
  }

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Benvenuto nell'app Tauri + Material-UI
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, my: 3 }}>
        <TextField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button 
          variant="contained" 
          onClick={handleGreet}
        >
          Saluta
        </Button>
      </Box>
      
      {message && (
        <Typography variant="body1">{message}</Typography>
      )}
    </Box>
  );
}
```

## Gestione delle finestre multiple

Tauri supporta applicazioni con più finestre, una funzionalità potente per interfacce complesse.

### Configurazione di base

Nel file `tauri.conf.json`, è possibile definire più finestre:

```json
{
  "tauri": {
    "windows": [
      {
        "title": "Finestra principale",
        "width": 800,
        "height": 600,
        "resizable": true,
        "fullscreen": false,
        "url": "index.html"
      },
      {
        "title": "Finestra secondaria",
        "width": 400,
        "height": 300,
        "resizable": true,
        "url": "pages/secondary.html",
        "visible": false
      }
    ]
  }
}
```

### Gestione dinamica delle finestre

È possibile creare e gestire finestre dinamicamente dal frontend:

```javascript
import { WebviewWindow, getCurrent } from '@tauri-apps/api/window';

// Ottieni la finestra corrente
const mainWindow = getCurrent();

// Crea una nuova finestra
function openNewWindow() {
  const webview = new WebviewWindow('secondaryWindow', {
    url: 'pages/secondary.html',
    title: 'Finestra secondaria',
    width: 400,
    height: 300,
    resizable: true,
  });
  
  // Gestione eventi
  webview.once('tauri://created', () => {
    console.log('Finestra creata!');
  });
  
  webview.once('tauri://error', (e) => {
    console.error('Errore nella creazione della finestra:', e);
  });
}

// Chiudi la finestra corrente
function closeCurrentWindow() {
  mainWindow.close();
}

// Minimizza la finestra corrente
function minimizeWindow() {
  mainWindow.minimize();
}

// Massimizza o ripristina la finestra
async function toggleMaximize() {
  const isMaximized = await mainWindow.isMaximized();
  if (isMaximized) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
}
```

### Comunicazione tra finestre

Le finestre possono comunicare tra loro utilizzando gli eventi Tauri:

```javascript
// In una finestra
import { emit } from '@tauri-apps/api/event';

function sendDataToOtherWindow() {
  emit('data-update', { value: 'Nuovi dati disponibili' });
}

// In un'altra finestra
import { listen } from '@tauri-apps/api/event';

function listenForUpdates() {
  const unlisten = listen('data-update', (event) => {
    console.log('Dati ricevuti:', event.payload);
    // Aggiorna l'interfaccia con i nuovi dati
  });
  
  // Quando non è più necessario ascoltare
  // unlisten();
}
```

## Personalizzazione della barra del titolo

Tauri permette di personalizzare o sostituire completamente la barra del titolo nativa.

### Barra del titolo nativa con controlli personalizzati

È possibile mantenere la barra del titolo nativa ma aggiungere controlli personalizzati:

```json
// tauri.conf.json
{
  "tauri": {
    "windows": [{
      "decorations": true,
      "title": "La mia app"
    }]
  }
}
```

### Barra del titolo completamente personalizzata

Per una personalizzazione completa, è possibile disabilitare la barra del titolo nativa e implementarne una personalizzata:

```json
// tauri.conf.json
{
  "tauri": {
    "windows": [{
      "decorations": false,
      "transparent": true
    }]
  }
}
```

Implementazione HTML/CSS/JS:

```html
<div class="titlebar">
  <div class="titlebar-title">La mia app</div>
  <div class="titlebar-controls">
    <button id="minimize-button" class="titlebar-button">
      <svg><!-- Icona minimizza --></svg>
    </button>
    <button id="maximize-button" class="titlebar-button">
      <svg><!-- Icona massimizza --></svg>
    </button>
    <button id="close-button" class="titlebar-button">
      <svg><!-- Icona chiudi --></svg>
    </button>
  </div>
</div>

<div class="content">
  <!-- Contenuto dell'applicazione -->
</div>
```

```css
.titlebar {
  height: 30px;
  background: #2b2b2b;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  -webkit-app-region: drag; /* Rende l'area trascinabile */
}

.titlebar-title {
  color: white;
  font-size: 14px;
}

.titlebar-controls {
  display: flex;
  -webkit-app-region: no-drag; /* I pulsanti non devono essere trascinabili */
}

.titlebar-button {
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.titlebar-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

#close-button:hover {
  background: #e81123;
}

.content {
  height: calc(100vh - 30px);
  overflow: auto;
}
```

```javascript
import { appWindow } from '@tauri-apps/api/window';

// Gestione dei pulsanti della barra del titolo
document.getElementById('minimize-button').addEventListener('click', () => {
  appWindow.minimize();
});

document.getElementById('maximize-button').addEventListener('click', async () => {
  const isMaximized = await appWindow.isMaximized();
  if (isMaximized) {
    appWindow.unmaximize();
  } else {
    appWindow.maximize();
  }
});

document.getElementById('close-button').addEventListener('click', () => {
  appWindow.close();
});
```

## Responsive design per applicazioni desktop

Anche se le applicazioni desktop hanno dimensioni più prevedibili rispetto al web, il responsive design rimane importante.

### Principi di responsive design per desktop

1. **Layout flessibile**: Utilizzare unità relative (%, em, rem) e flexbox/grid
2. **Breakpoint strategici**: Definire breakpoint per adattarsi a diverse dimensioni di finestra
3. **Densità di contenuto**: Adattare la densità di informazioni in base allo spazio disponibile
4. **Interfaccia adattiva**: Mostrare/nascondere elementi in base alle dimensioni

### Esempio di CSS responsive

```css
/* Base styles */
.app-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #f0f0f0;
  transition: width 0.3s ease;
}

.content {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    max-height: 200px;
  }
  
  .content {
    padding: 10px;
  }
}

/* Compact mode for small windows */
@media (max-height: 500px) {
  .sidebar {
    max-height: 100px;
  }
  
  .content {
    padding: 5px;
  }
}
```

### Gestione del ridimensionamento delle finestre

```javascript
import { appWindow } from '@tauri-apps/api/window';

// Rileva cambiamenti nelle dimensioni della finestra
appWindow.onResized(({ payload: { width, height } }) => {
  console.log(`Finestra ridimensionata a ${width}x${height}`);
  
  // Adatta l'interfaccia in base alle nuove dimensioni
  if (width < 600) {
    document.body.classList.add('compact-mode');
  } else {
    document.body.classList.remove('compact-mode');
  }
});
```

## Accessibilità nelle applicazioni Tauri

L'accessibilità è fondamentale per garantire che le applicazioni siano utilizzabili da tutti gli utenti, inclusi quelli con disabilità.

### Linee guida di accessibilità

1. **Semantica HTML**: Utilizzare elementi HTML semantici appropriati
2. **Contrasto dei colori**: Garantire un contrasto sufficiente tra testo e sfondo
3. **Navigazione da tastiera**: Assicurarsi che tutte le funzionalità siano accessibili tramite tastiera
4. **ARIA**: Utilizzare attributi ARIA quando necessario
5. **Focus visibile**: Rendere visibile l'elemento attualmente focalizzato

### Esempio di implementazione accessibile

```html
<nav aria-label="Menu principale">
  <ul>
    <li><a href="#home" aria-current="page">Home</a></li>
    <li><a href="#settings">Impostazioni</a></li>
    <li><a href="#help">Aiuto</a></li>
  </ul>
</nav>

<main>
  <h1>Dashboard</h1>
  
  <section aria-labelledby="stats-heading">
    <h2 id="stats-heading">Statistiche</h2>
    <div role="region" aria-live="polite">
      <!-- Contenuto che può aggiornarsi dinamicamente -->
      <p>Dati caricati: <span id="data-count">42</span> elementi</p>
    </div>
  </section>
  
  <form>
    <div>
      <label for="username">Nome utente</label>
      <input 
        type="text" 
        id="username" 
        name="username" 
        aria-required="true"
      />
    </div>
    
    <div>
      <label for="theme">Tema</label>
      <select id="theme" name="theme">
        <option value="light">Chiaro</option>
        <option value="dark">Scuro</option>
        <option value="system">Sistema</option>
      </select>
    </div>
    
    <button type="submit">Salva impostazioni</button>
  </form>
</main>
```

```css
/* Stili per focus visibile */
:focus {
  outline: 2px solid #0078e7;
  outline-offset: 2px;
}

/* Stili per skip link (per saltare al contenuto principale) */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #0078e7;
  color: white;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}

/* Assicurarsi che il contrasto sia sufficiente */
body {
  color: #333;
  background-color: #fff;
}

@media (prefers-color-scheme: dark) {
  body {
    color: #f0f0f0;
    background-color: #222;
  }
}
```

```javascript
// Gestione della modalità ad alto contrasto
function checkHighContrastMode() {
  const isHighContrast = window.matchMedia('(forced-colors: active)').matches;
  document.body.classList.toggle('high-contrast-mode', isHighContrast);
}

checkHighContrastMode();
window.matchMedia('(forced-colors: active)').addEventListener('change', checkHighContrastMode);

// Annunci per screen reader
function announceToScreenReader(message) {
  const announcer = document.getElementById('screen-reader-announcer');
  announcer.textContent = message;
}

// Esempio: annuncio dopo un'operazione completata
async function saveSettings() {
  await invoke('save_settings', { /* ... */ });
  announceToScreenReader('Impostazioni salvate con successo');
}
```

## Domande di autovalutazione

1. Quale dei seguenti NON è un framework frontend supportato da Tauri?
   - A) React
   - B) Vue.js
   - C) Angular
   - D) Svelte

2. Come si può implementare una barra del titolo personalizzata in Tauri?
   - A) Non è possibile, si deve usare sempre la barra del titolo nativa
   - B) Impostando `decorations: false` nel file di configurazione
   - C) Utilizzando solo CSS per modificare l'aspetto della barra nativa
   - D) Creando un plugin Tauri personalizzato

3. Quale proprietà CSS è utilizzata per rendere trascinabile un'area della finestra con barra del titolo personalizzata?
   - A) `window-drag: enable`
   - B) `-webkit-app-region: drag`
   - C) `draggable: true`
   - D) `window-draggable: active`

4. Come si può creare dinamicamente una nuova finestra in un'applicazione Tauri?
   - A) Utilizzando `window.open()` standard di JavaScript
   - B) Utilizzando `new WebviewWindow()` dall'API Tauri
   - C) Chiamando una funzione Rust dal backend
   - D) Modificando il file `tauri.conf.json` a runtime

5. Quale delle seguenti NON è una buona pratica per l'accessibilità nelle applicazioni Tauri?
   - A) Utilizzare elementi HTML semantici
   - B) Garantire un buon contrasto di colori
   - C) Disabilitare la navigazione da tastiera per semplificare l'interfaccia
   - D) Utilizzare attributi ARIA quando necessario

## Esercizi proposti

1. Crea un'applicazione Tauri con React che implementi un tema chiaro/scuro con cambio automatico in base alle preferenze di sistema e un pulsante per l'override manuale.

2. Implementa una barra del titolo personalizzata con pulsanti di controllo della finestra e un menu a discesa per le opzioni dell'applicazione.

3. Sviluppa un'interfaccia responsive che si adatti a diverse dimensioni della finestra, con un layout a colonne che diventa a righe quando lo spazio è ridotto.

4. Crea un'applicazione con più finestre che possono comunicare tra loro tramite eventi, ad esempio un editor principale e una finestra di anteprima.

5. Implementa un'interfaccia completamente accessibile con supporto per la navigazione da tastiera, etichette ARIA appropriate e annunci per screen reader.

## Risposte alle domande di autovalutazione

1. C) Angular (anche se è possibile usarlo, non è supportato ufficialmente nei template)
2. B) Impostando `decorations: false` nel file di configurazione
3. B) `-webkit-app-region: drag`
4. B) Utilizzando `new WebviewWindow()` dall'API Tauri
5. C) Disabilitare la navigazione da tastiera per semplificare l'interfaccia

---
- [⬅️ Prima applicazione con Tauri](<03_Prima_applicazione_con_Tauri.md>)
- [📑 Indice](<../README.md>)
- [➡️ Comunicazione tra frontend e backend](<05_Comunicazione_tra_frontend_e_backend.md>)