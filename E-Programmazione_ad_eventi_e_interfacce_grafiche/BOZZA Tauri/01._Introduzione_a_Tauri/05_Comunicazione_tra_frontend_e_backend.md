# Comunicazione tra frontend e backend in Tauri

## Indice dei contenuti
- [API di Tauri per la comunicazione](#api-di-tauri-per-la-comunicazione)
- [Invocazione di funzioni Rust dal frontend](#invocazione-di-funzioni-rust-dal-frontend)
- [Eventi e listener](#eventi-e-listener)
- [Gestione degli stati condivisi](#gestione-degli-stati-condivisi)
- [Pattern di comunicazione asincrona](#pattern-di-comunicazione-asincrona)
- [Esempi pratici di integrazione frontend-backend](#esempi-pratici-di-integrazione-frontend-backend)
- [Best practices](#best-practices)
- [Domande di autovalutazione](#domande-di-autovalutazione)
- [Esercizi proposti](#esercizi-proposti)
- [Risposte alle domande di autovalutazione](#risposte-alle-domande-di-autovalutazione)

## API di Tauri per la comunicazione

Tauri fornisce un sistema di comunicazione bidirezionale tra il frontend (JavaScript) e il backend (Rust). Questo ponte di comunicazione è fondamentale per sfruttare appieno le potenzialità del framework.

### Panoramica delle API di comunicazione

Le principali API per la comunicazione in Tauri sono:

1. **Comandi**: Funzioni Rust che possono essere chiamate dal frontend
2. **Eventi**: Sistema di messaggistica per comunicazioni bidirezionali
3. **Stato**: Meccanismo per condividere dati tra frontend e backend

### Importazione delle API nel frontend

```javascript
// Importazione delle API di comunicazione
import { invoke } from '@tauri-apps/api/tauri'; // Per chiamare comandi Rust
import { emit, listen } from '@tauri-apps/api/event'; // Per eventi
import { getClient, Body } from '@tauri-apps/api/http'; // Per richieste HTTP
import { appWindow } from '@tauri-apps/api/window'; // Per eventi della finestra
```

## Invocazione di funzioni Rust dal frontend

I comandi Tauri permettono di chiamare funzioni Rust dal codice JavaScript.

### Definizione di comandi in Rust

```rust
// src-tauri/src/main.rs
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};

// Struttura per i dati di risposta
#[derive(Serialize)]
struct Response {
    message: String,
    code: u32,
}

// Struttura per i parametri di input
#[derive(Deserialize)]
struct GreetParams {
    name: String,
    enthusiasm: Option<u32>,
}

// Comando semplice con parametri primitivi
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Ciao, {}! Benvenuto nell'app Tauri.", name)
}

// Comando con struttura come parametro e risposta
#[tauri::command]
fn greet_complex(params: GreetParams) -> Response {
    let enthusiasm = params.enthusiasm.unwrap_or(1);
    let exclamations = "!".repeat(enthusiasm as usize);
    
    Response {
        message: format!("Ciao, {}{}", params.name, exclamations),
        code: 200,
    }
}

// Comando che può generare errori
#[tauri::command]
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("Impossibile dividere per zero".into())
    } else {
        Ok(a / b)
    }
}

fn main() {
    tauri::Builder::default()
        // Registra i comandi
        .invoke_handler(tauri::generate_handler![
            greet,
            greet_complex,
            divide
        ])
        .run(tauri::generate_context!())
        .expect("errore durante l'esecuzione dell'applicazione");
}
```

### Chiamata dei comandi dal frontend

```javascript
import { invoke } from '@tauri-apps/api/tauri';

// Chiamata di un comando semplice
async function simpleGreet() {
  try {
    const message = await invoke('greet', { name: 'Mario' });
    console.log(message); // Output: "Ciao, Mario! Benvenuto nell'app Tauri."
  } catch (error) {
    console.error('Errore durante la chiamata:', error);
  }
}

// Chiamata di un comando con parametri complessi
async function complexGreet() {
  try {
    const response = await invoke('greet_complex', { 
      params: {
        name: 'Luigi',
        enthusiasm: 3
      }
    });
    console.log(response.message); // Output: "Ciao, Luigi!!!"
    console.log(response.code);    // Output: 200
  } catch (error) {
    console.error('Errore durante la chiamata:', error);
  }
}

// Gestione degli errori
async function performDivision() {
  try {
    const result = await invoke('divide', { a: 10, b: 0 });
    console.log('Risultato:', result);
  } catch (error) {
    console.error('Errore di divisione:', error); // Output: "Impossibile dividere per zero"
  }
}
```

## Eventi e listener

Il sistema di eventi di Tauri permette una comunicazione bidirezionale tra frontend e backend.

### Emissione e ascolto di eventi dal backend (Rust)

```rust
// Importazioni necessarie
use tauri::Manager;

// Comando che emette un evento
#[tauri::command]
fn start_process(window: tauri::Window) {
    // Avvia un processo in background
    std::thread::spawn(move || {
        // Simula un processo lungo
        for i in 1..=10 {
            std::thread::sleep(std::time::Duration::from_secs(1));
            
            // Emette un evento di progresso
            window.emit("process-progress", i * 10).unwrap();
        }
        
        // Emette un evento di completamento
        window.emit("process-completed", "Processo completato con successo!").unwrap();
    });
}

// Nel main, registra il comando
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![start_process])
        .run(tauri::generate_context!())
        .expect("errore durante l'esecuzione dell'applicazione");
}
```

### Emissione e ascolto di eventi dal frontend (JavaScript)

```javascript
import { invoke } from '@tauri-apps/api/tauri';
import { emit, listen } from '@tauri-apps/api/event';

// Ascolto di eventi dal backend
async function setupListeners() {
  // Ascolta gli aggiornamenti di progresso
  const unlistenProgress = await listen('process-progress', (event) => {
    console.log(`Progresso: ${event.payload}%`);
    updateProgressBar(event.payload);
  });
  
  // Ascolta il completamento del processo
  const unlistenCompleted = await listen('process-completed', (event) => {
    console.log('Messaggio finale:', event.payload);
    showCompletionMessage(event.payload);
  });
  
  // Funzione per rimuovere i listener quando non servono più
  return () => {
    unlistenProgress();
    unlistenCompleted();
  };
}

// Avvia il processo e configura i listener
async function startProcess() {
  const cleanup = await setupListeners();
  
  try {
    // Chiama il comando Rust che avvierà il processo
    await invoke('start_process');
  } catch (error) {
    console.error('Errore nell\'avvio del processo:', error);
    cleanup(); // Rimuovi i listener in caso di errore
  }
}

// Emissione di un evento dal frontend al backend
function sendDataToBackend(data) {
  emit('frontend-data', { 
    timestamp: Date.now(),
    content: data
  });
}
```

### Ascolto di eventi dal frontend nel backend (Rust)

```rust
// Nel main.rs
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![/* ... */])
        // Configura un listener per gli eventi dal frontend
        .setup(|app| {
            let app_handle = app.handle();
            app.listen_global("frontend-data", move |event| {
                println!("Ricevuti dati dal frontend: {:?}", event.payload());
                
                // Puoi deserializzare il payload in una struttura
                if let Some(payload) = event.payload() {
                    let data: serde_json::Value = serde_json::from_str(payload).unwrap();
                    println!("Timestamp: {}", data["timestamp"]);
                    println!("Contenuto: {}", data["content"]);
                    
                    // Elabora i dati...
                    
                    // Eventualmente, rispondi al frontend
                    app_handle.emit_all("data-processed", "Dati elaborati con successo").unwrap();
                }
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("errore durante l'esecuzione dell'applicazione");
}
```

## Gestione degli stati condivisi

Tauri permette di condividere stati tra diverse parti dell'applicazione.

### Stato gestito dal backend (Rust)

```rust
use std::sync::Mutex;
use tauri::State;

// Definizione dello stato dell'applicazione
struct AppState {
    counter: Mutex<i32>,
    user_name: Mutex<String>,
}

// Comando per incrementare il contatore
#[tauri::command]
fn increment_counter(state: State<'_, AppState>) -> i32 {
    let mut counter = state.counter.lock().unwrap();
    *counter += 1;
    *counter
}

// Comando per ottenere il valore attuale
#[tauri::command]
fn get_counter(state: State<'_, AppState>) -> i32 {
    *state.counter.lock().unwrap()
}

// Comando per impostare il nome utente
#[tauri::command]
fn set_user_name(name: String, state: State<'_, AppState>) {
    let mut user_name = state.user_name.lock().unwrap();
    *user_name = name;
}

// Comando per ottenere il nome utente
#[tauri::command]
fn get_user_name(state: State<'_, AppState>) -> String {
    state.user_name.lock().unwrap().clone()
}

fn main() {
    tauri::Builder::default()
        // Inizializza lo stato dell'applicazione
        .manage(AppState {
            counter: Mutex::new(0),
            user_name: Mutex::new(String::from("Ospite")),
        })
        .invoke_handler(tauri::generate_handler![
            increment_counter,
            get_counter,
            set_user_name,
            get_user_name
        ])
        .run(tauri::generate_context!())
        .expect("errore durante l'esecuzione dell'applicazione");
}
```

### Utilizzo dello stato dal frontend

```javascript
import { invoke } from '@tauri-apps/api/tauri';

// Componente React che utilizza lo stato condiviso
function CounterComponent() {
  const [counter, setCounter] = useState(0);
  const [userName, setUserName] = useState('');
  const [newName, setNewName] = useState('');
  
  // Carica i valori iniziali
  useEffect(() => {
    async function loadInitialState() {
      const initialCounter = await invoke('get_counter');
      const initialName = await invoke('get_user_name');
      
      setCounter(initialCounter);
      setUserName(initialName);
    }
    
    loadInitialState();
  }, []);
  
  // Incrementa il contatore
  async function handleIncrement() {
    const newValue = await invoke('increment_counter');
    setCounter(newValue);
  }
  
  // Aggiorna il nome utente
  async function handleUpdateName() {
    await invoke('set_user_name', { name: newName });
    setUserName(newName);
    setNewName('');
  }
  
  return (
    <div>
      <h2>Contatore: {counter}</h2>
      <button onClick={handleIncrement}>Incrementa</button>
      
      <h2>Utente: {userName}</h2>
      <input 
        type="text" 
        value={newName} 
        onChange={(e) => setNewName(e.target.value)} 
        placeholder="Nuovo nome"
      />
      <button onClick={handleUpdateName}>Aggiorna nome</button>
    </div>
  );
}
```

## Pattern di comunicazione asincrona

La comunicazione tra frontend e backend in Tauri è intrinsecamente asincrona. Ecco alcuni pattern comuni per gestirla efficacemente.

### Pattern Promise/async-await

```javascript
import { invoke } from '@tauri-apps/api/tauri';

// Utilizzo di async/await
async function fetchData() {
  try {
    const result = await invoke('get_data', { id: 123 });
    return result;
  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
    throw error;
  }
}

// Utilizzo di Promise
function processUser(userId) {
  return invoke('get_user', { id: userId })
    .then(user => {
      return invoke('get_permissions', { role: user.role });
    })
    .then(permissions => {
      console.log('Permessi utente:', permissions);
      return permissions;
    })
    .catch(error => {
      console.error('Errore nella catena di elaborazione:', error);
      throw error;
    });
}
```

### Pattern di polling

```javascript
import { invoke } from '@tauri-apps/api/tauri';

// Polling per operazioni lunghe
async function checkOperationStatus(operationId) {
  let completed = false;
  let result = null;
  
  while (!completed) {
    try {
      const status = await invoke('check_operation', { id: operationId });
      
      if (status.completed) {
        completed = true;
        result = status.result;
      } else {
        // Attendi prima del prossimo controllo
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Errore nel controllo dello stato:', error);
      throw error;
    }
  }
  
  return result;
}
```

### Pattern di callback con eventi

```javascript
import { invoke } from '@tauri-apps/api/tauri';
import { listen } from '@tauri-apps/api/event';

// Avvia un'operazione e ricevi aggiornamenti tramite eventi
async function startLongOperation(data) {
  // Genera un ID univoco per questa operazione
  const operationId = Date.now().toString();
  
  // Configura i listener per gli eventi di questa operazione
  const unlistenProgress = await listen(`operation-progress-${operationId}`, (event) => {
    console.log(`Progresso: ${event.payload.percentage}%`);
    updateUI(event.payload);
  });
  
  const unlistenCompleted = await listen(`operation-completed-${operationId}`, (event) => {
    console.log('Operazione completata:', event.payload);
    showResult(event.payload);
    
    // Rimuovi i listener
    unlistenProgress();
    unlistenCompleted();
  });
  
  // Avvia l'operazione nel backend
  try {
    await invoke('start_long_operation', { 
      operationId, 
      data 
    });
  } catch (error) {
    // Rimuovi i listener in caso di errore
    unlistenProgress();
    unlistenCompleted();
    console.error('Errore nell\'avvio dell\'operazione:', error);
    throw error;
  }
  
  return operationId;
}
```

## Esempi pratici di integrazione frontend-backend

Vediamo alcuni esempi concreti di integrazione tra frontend e backend in applicazioni Tauri.

### Esempio 1: Gestore di file

```rust
// Backend (Rust)
use std::fs;
use serde::{Deserialize, Serialize};

#[derive(Serialize)]
struct FileInfo {
    name: String,
    size: u64,
    is_dir: bool,
    last_modified: String,
}

#[tauri::command]
async fn list_directory(path: String) -> Result<Vec<FileInfo>, String> {
    let mut files = Vec::new();
    
    match fs::read_dir(&path) {
        Ok(entries) => {
            for entry in entries {
                if let Ok(entry) = entry {
                    let metadata = match entry.metadata() {
                        Ok(meta) => meta,
                        Err(_) => continue,
                    };
                    
                    let last_modified = metadata.modified()
                        .ok()
                        .and_then(|time| time.duration_since(std::time::UNIX_EPOCH).ok())
                        .map(|duration| duration.as_secs().to_string())
                        .unwrap_or_else(|| String::from("Sconosciuto"));
                    
                    files.push(FileInfo {
                        name: entry.file_name().to_string_lossy().to_string(),
                        size: metadata.len(),
                        is_dir: metadata.is_dir(),
                        last_modified,
                    });
                }
            }
            Ok(files)
        },
        Err(e) => Err(format!("Errore nella lettura della directory: {}", e)),
    }
}

#[tauri::command]
async fn read_text_file(path: String) -> Result<String, String> {
    match fs::read_to_string(&path) {
        Ok(content) => Ok(content),
        Err(e) => Err(format!("Errore nella lettura del file: {}", e)),
    }
}

#[tauri::command]
async fn save_text_file(path: String, content: String) -> Result<(), String> {
    match fs::write(&path, content) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Errore nel salvataggio del file: {}", e)),
    }
}
```

```javascript
// Frontend (React)
import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { open } from '@tauri-apps/api/dialog';

function FileExplorer() {
  const [currentPath, setCurrentPath] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Carica i file della directory corrente
  useEffect(() => {
    if (currentPath) {
      loadFiles(currentPath);
    }
  }, [currentPath]);
  
  async function loadFiles(path) {
    try {
      const fileList = await invoke('list_directory', { path });
      setFiles(fileList);
    } catch (error) {
      console.error('Errore nel caricamento dei file:', error);
      alert(`Errore: ${error}`);
    }
  }
  
  async function selectDirectory() {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
      });
      
      if (selected) {
        setCurrentPath(selected);
      }
    } catch (error) {
      console.error('Errore nella selezione della directory:', error);
    }
  }
  
  async function openFile(file) {
    if (file.is_dir) {
      setCurrentPath(`${currentPath}/${file.name}`.replace(/\/\/+/g, '/'));
    } else {
      try {
        const content = await invoke('read_text_file', { 
          path: `${currentPath}/${file.name}`.replace(/\/\/+/g, '/') 
        });
        
        setSelectedFile(file);
        setFileContent(content);
        setIsEditing(false);
      } catch (error) {
        console.error('Errore nell\'apertura del file:', error);
        alert(`Errore: ${error}`);
      }
    }
  }
  
  async function saveFile() {
    if (!selectedFile || !currentPath) return;
    
    try {
      await invoke('save_text_file', { 
        path: `${currentPath}/${selectedFile.name}`.replace(/\/\/+/g, '/'),
        content: fileContent
      });
      
      setIsEditing(false);
      alert('File salvato con successo!');
    } catch (error) {
      console.error('Errore nel salvataggio del file:', error);
      alert(`Errore: ${error}`);
    }
  }
  
  return (
    <div className="file-explorer">
      <div className="toolbar">
        <button onClick={selectDirectory}>Seleziona directory</button>
        {isEditing && <button onClick={saveFile}>Salva file</button>}
      </div>
      
      <div className="path-display">
        {currentPath || 'Nessuna directory selezionata'}
      </div>
      
      <div className="explorer-container">
        <div className="file-list">
          {files.map((file) => (
            <div 
              key={file.name} 
              className={`file-item ${file.is_dir ? 'directory' : 'file'}`}
              onClick={() => openFile(file)}
            >
              {file.is_dir ? '📁' : '📄'} {file.name}
            </div>
          ))}
        </div>
        
        {selectedFile && (
          <div className="file-content">
            <h3>{selectedFile.name}</h3>
            {isEditing ? (
              <textarea
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
                rows={20}
              />
            ) : (
              <>
                <pre>{fileContent}</pre>
                <button onClick={() => setIsEditing(true)}>Modifica</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

### Esempio 2: Monitor di sistema

```rust
// Backend (Rust)
use serde::Serialize;
use std::thread;
use std::time::Duration;
use tauri::Window;

#[derive(Serialize)]
struct SystemStats {
    cpu_usage: f32,
    memory_usage: f32,
    uptime: u64,
    processes: u32,
}

#[tauri::command]
fn start_monitoring(window: Window) {
    // Avvia un thread separato per il monitoraggio
    thread::spawn(move || {
        loop {
            // In un'applicazione reale, qui si utilizzerebbero librerie come
            // sysinfo per ottenere dati reali sul sistema
            let stats = SystemStats {
                cpu_usage: rand::random::<f32>() * 100.0,
                memory_usage: rand::random::<f32>() * 16.0, // GB
                uptime: rand::random::<u64>() % 86400, // secondi
                processes: rand::random::<u32>() % 200 + 50,
            };
            
            // Invia i dati al frontend
            window.emit("system-stats", stats).unwrap();
            
            // Attendi prima del prossimo aggiornamento
            thread::sleep(Duration::from_secs(1));
        }
    });
}
```

```javascript
// Frontend (Vue)
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { invoke } from '@tauri-apps/api/tauri';
import { listen } from '@tauri-apps/api/event';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// Dati del sistema
const cpuUsage = ref(0);
const memoryUsage = ref(0);
const uptime = ref(0);
const processes = ref(0);

// Dati per i grafici
const cpuData = ref([]);
const memoryData = ref([]);
const timeLabels = ref([]);

// Riferimenti ai canvas dei grafici
const cpuChartRef = ref(null);
const memoryChartRef = ref(null);

// Istanze dei grafici
let cpuChart = null;
let memoryChart = null;

// Funzione per formattare il tempo di uptime
function formatUptime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}h ${minutes}m ${secs}s`;
}

// Inizializza i grafici
function initCharts() {
  const commonOptions = {
    responsive: true,
    animation: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  
  // Grafico CPU
  cpuChart = new Chart(cpuChartRef.value, {
    type: 'line',
    data: {
      labels: timeLabels.value,
      datasets: [{
        label: 'CPU Usage (%)',
        data: cpuData.value,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
      ...commonOptions,
      scales: {
        y: {
          max: 100
        }
      }
    }
  });
  
  // Grafico memoria
  memoryChart = new Chart(memoryChartRef.value, {
    type: 'line',
    data: {
      labels: timeLabels.value,
      datasets: [{
        label: 'Memory Usage (GB)',
        data: memoryData.value,
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1
      }]
    },
    options: commonOptions
  });
}

// Aggiorna i grafici con nuovi dati
function updateCharts(stats) {
  const now = new Date();
  const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  
  // Limita i dati a 60 punti (1 minuto)
  if (timeLabels.value.length > 60) {
    timeLabels.value.shift();
    cpuData.value.shift();
    memoryData.value.shift();
  }
  
  // Aggiungi nuovi dati
  timeLabels.value.push(timeStr);
  cpuData.value.push(stats.cpu_usage);
  memoryData.value.push(stats.memory_usage);
  
  // Aggiorna i grafici
  cpuChart.update();
  memoryChart.update();
}

// Configura il listener per gli aggiornamenti dal backend
let unlistenStats = null;

onMounted(async () => {
  // Inizializza i grafici
  initCharts();
  
  // Configura il listener per gli aggiornamenti
  unlistenStats = await