// app.js - Punto di ingresso dell'applicazione Task Manager

// Importazione dei moduli
import TaskManager from './taskManager.js';
import Storage from './storage.js';
import UI from './ui.js';
import NotificationManager from './notification.js';

// Inizializzazione dell'applicazione quando il DOM è completamente caricato
document.addEventListener('DOMContentLoaded', () => {
    // Inizializzazione dei moduli
    const storage = new Storage();
    const notificationManager = new NotificationManager();
    const taskManager = new TaskManager(storage);
    const ui = new UI(taskManager, notificationManager);

    // Caricamento iniziale dei task
    ui.loadTasks();

    // Gestione del tema (chiaro/scuro)
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('darkTheme', isDarkTheme);
        
        // Aggiorna l'icona del tema
        const themeIcon = themeToggle.querySelector('i');
        themeIcon.className = isDarkTheme ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Carica il tema salvato
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
        const themeIcon = themeToggle.querySelector('i');
        themeIcon.className = 'fas fa-sun';
    }

    // Gestione del form per l'aggiunta di nuovi task
    const taskForm = document.getElementById('task-form');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        ui.addTask();
    });

    // Gestione del form per la modifica dei task
    const editForm = document.getElementById('edit-form');
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        ui.updateTask();
    });

    // Gestione della ricerca e dei filtri
    const searchInput = document.getElementById('search-tasks');
    searchInput.addEventListener('input', () => ui.filterTasks());

    const filterPriority = document.getElementById('filter-priority');
    filterPriority.addEventListener('change', () => ui.filterTasks());

    const filterStatus = document.getElementById('filter-status');
    filterStatus.addEventListener('change', () => ui.filterTasks());

    // Gestione della chiusura del modal
    const closeModal = document.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        document.getElementById('edit-modal').style.display = 'none';
    });

    // Chiusura del modal cliccando fuori dal contenuto
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('edit-modal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Gestione delle notifiche per i task in scadenza
    setInterval(() => {
        taskManager.checkDueTasks();
    }, 60000); // Controlla ogni minuto

    // Richiedi il permesso per le notifiche
    if ('Notification' in window) {
        Notification.requestPermission();
    }

    console.log('Task Manager App inizializzata con successo!');
});