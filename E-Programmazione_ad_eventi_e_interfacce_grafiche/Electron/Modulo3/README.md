# Modulo 3: Interfaccia utente e componenti visuali

## Obiettivi di apprendimento
- Creare interfacce utente responsive utilizzando HTML, CSS e framework UI
- Implementare la gestione degli eventi DOM in applicazioni Electron
- Configurare menu, finestre di dialogo e notifiche native
- Sviluppare un'applicazione con interfaccia multi-finestra e interazioni utente avanzate

## 3.1 Creazione di interfacce responsive con HTML, CSS e framework UI

### HTML e CSS in Electron
In Electron, le interfacce utente vengono create utilizzando HTML e CSS standard, proprio come nel web development. Tuttavia, ci sono alcune considerazioni specifiche per le applicazioni desktop.

```html
<!-- index.html - Esempio di struttura base -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Applicazione Electron</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <header>
    <h1>La mia applicazione Electron</h1>
  </header>
  
  <main>
    <section class="content">
      <h2>Contenuto principale</h2>
      <p>Questa è un'applicazione desktop creata con Electron.</p>
      <button id="action-button" class="btn primary">Azione</button>
    </section>
    
    <aside class="sidebar">
      <h3>Menu laterale</h3>
      <ul>
        <li><a href="#" data-section="home">Home</a></li>
        <li><a href="#" data-section="settings">Impostazioni</a></li>
        <li><a href="#" data-section="about">Informazioni</a></li>
      </ul>
    </aside>
  </main>
  
  <footer>
    <p>&copy; 2023 - Applicazione Electron</p>
  </footer>
  
  <script src="./renderer.js"></script>
</body>
</html>
```

```css
/* styles.css - Stili responsive di base */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #333;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
}

main {
  display: flex;
  flex: 1;
  padding: 1rem;
}

.content {
  flex: 3;
  padding: 1rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sidebar {
  flex: 1;
  padding: 1rem;
  margin-left: 1rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

footer {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn.primary {
  background-color: #3498db;
  color: white;
}

.btn.primary:hover {
  background-color: #2980b9;
}

/* Media queries per il responsive design */
@media (max-width: 768px) {
  main {
    flex-direction: column;
  }
  
  .sidebar {
    margin-left: 0;
    margin-top: 1rem;
  }
}
```

### Framework UI per Electron
Per accelerare lo sviluppo e garantire un'interfaccia coerente, è possibile utilizzare framework UI. Ecco alcuni dei più popolari:

#### 1. Electron-specific frameworks
- **Photon**: Un framework UI ispirato a macOS
- **Electron-UI**: Componenti UI specifici per Electron

#### 2. Framework web generici
- **Bootstrap**: Framework CSS responsive e mobile-first
- **Material-UI**: Implementazione di Material Design per React
- **Tailwind CSS**: Framework utility-first CSS

Esempio di integrazione di Bootstrap in un'applicazione Electron:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Electron con Bootstrap</title>
  <!-- Importazione di Bootstrap CSS -->
  <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 bg-light sidebar">
        <div class="sidebar-sticky">
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link active" href="#">
                <span data-feather="home"></span>
                Dashboard
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <span data-feather="settings"></span>
                Impostazioni
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <main role="main" class="col-md-9 ml-sm-auto col-lg-9 px-4">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Dashboard</h1>
        </div>
        
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Benvenuto nell'applicazione</h5>
            <p class="card-text">Questa è un'applicazione Electron con Bootstrap.</p>
            <button id="action-button" class="btn btn-primary">Azione</button>
          </div>
        </div>
      </main>
    </div>
  </div>
  
  <!-- Importazione di Bootstrap JS e dipendenze -->
  <script src="../node_modules/jquery/dist/jquery.slim.min.js"></script>
  <script src="../node_modules/popper.js/dist/umd/popper.min.js"></script>
  <script src="../node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
  <script src="./renderer.js"></script>
</body>
</html>
```

### Considerazioni sul design per applicazioni desktop

1. **Densità di informazioni**: Le applicazioni desktop possono mostrare più informazioni rispetto alle app mobili
2. **Interazioni con mouse e tastiera**: Supportare scorciatoie da tastiera e interazioni con il mouse
3. **Coerenza con il sistema operativo**: Adattare l'aspetto all'OS dell'utente
4. **Performance**: Ottimizzare il rendering per evitare lag e flickering

## 3.2 Gestione degli input utente e eventi DOM

### Eventi DOM in Electron
La gestione degli eventi in Electron è simile a quella del web, ma con alcune considerazioni specifiche per le applicazioni desktop.

```javascript
// renderer.js - Gestione eventi base
document.addEventListener('DOMContentLoaded', () => {
  // Riferimenti agli elementi DOM
  const actionButton = document.getElementById('action-button');
  const navLinks = document.querySelectorAll('.sidebar a');
  const contentSections = document.querySelectorAll('.content-section');
  
  // Gestione click sul pulsante
  actionButton.addEventListener('click', () => {
    console.log('Pulsante cliccato!');
    // Esempio di comunicazione con il processo main tramite contextBridge
    window.electronAPI.performAction('button-clicked');
  });
  
  // Gestione della navigazione
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = e.target.getAttribute('data-section');
      
      // Aggiorna stato attivo nei link
      navLinks.forEach(l => l.classList.remove('active'));
      e.target.classList.add('active');
      
      // Mostra la sezione corrispondente
      contentSections.forEach(s => {
        s.style.display = s.id === section ? 'block' : 'none';
      });
      
      console.log(`Navigazione a: ${section}`);
    });
  });
  
  // Gestione eventi da tastiera
  document.addEventListener('keydown', (e) => {
    // Esempio: Ctrl+S per salvare
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault(); // Previene il comportamento predefinito del browser
      console.log('Scorciatoia da tastiera: Salva');
      window.electronAPI.performAction('save-action');
    }
  });
});
```

### Drag and Drop
Implementare funzionalità di drag and drop nelle applicazioni Electron:

```javascript
// renderer.js - Implementazione drag and drop
document.addEventListener('DOMContentLoaded', () => {
  const dropZone = document.getElementById('drop-zone');
  
  // Previeni comportamento predefinito per garantire il funzionamento del drop
  document.addEventListener('dragover', (e) => e.preventDefault());
  document.addEventListener('drop', (e) => e.preventDefault());
  
  // Gestione eventi di drag and drop
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });
  
  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
  });
  
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    
    const files = Array.from(e.dataTransfer.files);
    console.log('File ricevuti:', files.map(f => f.path));
    
    // Invia i percorsi dei file al processo main
    window.electronAPI.handleFileDrop(files.map(f => f.path));
  });
});
```

### Formulari e validazione
Gestione dei form e validazione degli input:

```javascript
// renderer.js - Gestione form
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('settings-form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Raccolta dati dal form
    const formData = new FormData(form);
    const settings = {};
    
    for (const [key, value] of formData.entries()) {
      settings[key] = value;
    }
    
    // Validazione
    let isValid = true;
    let errorMessage = '';
    
    if (!settings.username || settings.username.length < 3) {
      isValid = false;
      errorMessage = 'Il nome utente deve contenere almeno 3 caratteri';
    }
    
    if (!isValid) {
      // Mostra errore
      const errorElement = document.getElementById('form-error');
      errorElement.textContent = errorMessage;
      errorElement.style.display = 'block';
    } else {
      // Invia dati al processo main
      window.electronAPI.saveSettings(settings);
      
      // Feedback all'utente
      const successElement = document.getElementById('form-success');
      successElement.textContent = 'Impostazioni salvate con successo!';
      successElement.style.display = 'block';
      
      // Nascondi il messaggio dopo 3 secondi
      setTimeout(() => {
        successElement.style.display = 'none';
      }, 3000);
    }
  });
});
```

## 3.3 Menu, finestre di dialogo e notifiche

### Menu dell'applicazione
Creare menu personalizzati per l'applicazione Electron:

```javascript
// main.js - Creazione menu applicazione
const { app, BrowserWindow, Menu, shell } = require('electron');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  
  mainWindow.loadFile('index.html');
  
  // Creazione del menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Nuovo',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            console.log('Nuovo file');
            mainWindow.webContents.send('menu-action', 'new-file');
          }
        },
        {
          label: 'Apri',
          accelerator: 'CmdOrCtrl+O',
          click: async () => {
            const { dialog } = require('electron');
            const { filePaths } = await dialog.showOpenDialog({
              properties: ['openFile']
            });
            
            if (filePaths && filePaths.length > 0