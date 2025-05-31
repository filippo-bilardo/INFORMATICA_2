// ui.js - Modulo per l'interfaccia utente

class UI {
    constructor(taskManager, notificationManager) {
        this.taskManager = taskManager;
        this.notificationManager = notificationManager;
        this.tasksList = document.getElementById('tasks-list');
        this.taskCounter = document.getElementById('task-counter');
        this.taskTemplate = document.getElementById('task-template');
        this.modal = document.getElementById('edit-modal');
        
        // Inizializza il drag and drop
        this.initDragAndDrop();
    }

    /**
     * Carica e visualizza tutti i task
     */
    loadTasks() {
        const tasks = this.taskManager.getAllTasks();
        this.renderTasks(tasks);
    }

    /**
     * Renderizza i task nella lista
     * @param {Array} tasks - Array di task da visualizzare
     */
    renderTasks(tasks) {
        // Pulisci la lista dei task
        this.tasksList.innerHTML = '';
        
        // Aggiorna il contatore dei task
        this.taskCounter.textContent = `(${tasks.length})`;
        
        // Se non ci sono task, mostra lo stato vuoto
        if (tasks.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <i class="fas fa-clipboard-list"></i>
                <p>Non hai ancora nessun task. Aggiungine uno per iniziare!</p>
            `;
            this.tasksList.appendChild(emptyState);
            return;
        }
        
        // Renderizza ogni task
        tasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            this.tasksList.appendChild(taskElement);
        });
    }

    /**
     * Crea un elemento DOM per un task
     * @param {Object} task - Dati del task
     * @returns {HTMLElement} Elemento DOM del task
     */
    createTaskElement(task) {
        // Clona il template
        const taskElement = document.importNode(this.taskTemplate.content, true).querySelector('.task-item');
        
        // Imposta l'ID del task come attributo data
        taskElement.dataset.id = task.id;
        
        // Imposta il titolo del task
        taskElement.querySelector('.task-title').textContent = task.title;
        
        // Imposta la descrizione del task
        const descriptionElement = taskElement.querySelector('.task-description');
        if (task.description) {
            descriptionElement.textContent = task.description;
        } else {
            descriptionElement.style.display = 'none';
        }
        
        // Imposta la priorità del task
        const priorityElement = taskElement.querySelector('.task-priority');
        priorityElement.textContent = this.getPriorityText(task.priority);
        priorityElement.classList.add(`priority-${task.priority}`);
        
        // Imposta la data di scadenza
        const dateElement = taskElement.querySelector('.date-text');
        if (task.dueDate) {
            const formattedDate = new Date(task.dueDate).toLocaleDateString('it-IT', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
            dateElement.textContent = formattedDate;
        } else {
            taskElement.querySelector('.task-date').style.display = 'none';
        }
        
        // Imposta lo stato di completamento
        if (task.completed) {
            taskElement.classList.add('completed');
            taskElement.querySelector('.btn-complete i').className = 'fas fa-undo';
        }
        
        // Aggiungi gli event listener per le azioni
        this.addTaskEventListeners(taskElement, task);
        
        return taskElement;
    }

    /**
     * Aggiunge gli event listener a un elemento task
     * @param {HTMLElement} taskElement - Elemento DOM del task
     * @param {Object} task - Dati del task
     */
    addTaskEventListeners(taskElement, task) {
        // Pulsante per completare/ripristinare il task
        const completeButton = taskElement.querySelector('.btn-complete');
        completeButton.addEventListener('click', () => {
            this.toggleTaskCompletion(task.id);
        });
        
        // Pulsante per modificare il task
        const editButton = taskElement.querySelector('.btn-edit');
        editButton.addEventListener('click', () => {
            this.showEditModal(task);
        });
        
        // Pulsante per eliminare il task
        const deleteButton = taskElement.querySelector('.btn-delete');
        deleteButton.addEventListener('click', () => {
            this.deleteTask(task.id);
        });
    }

    /**
     * Aggiunge un nuovo task
     */
    addTask() {
        // Ottieni i valori dal form
        const titleInput = document.getElementById('task-title');
        const descriptionInput = document.getElementById('task-description');
        const dueDateInput = document.getElementById('task-due-date');
        const priorityInput = document.getElementById('task-priority');
        
        // Validazione del titolo
        if (!titleInput.value.trim()) {
            this.notificationManager.show('Inserisci un titolo per il task', 'error');
            return;
        }
        
        // Crea il nuovo task
        const newTask = this.taskManager.addTask({
            title: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            dueDate: dueDateInput.value,
            priority: priorityInput.value
        });
        
        // Aggiungi il task alla lista
        const taskElement = this.createTaskElement(newTask);
        
        // Rimuovi lo stato vuoto se presente
        const emptyState = this.tasksList.querySelector('.empty-state');
        if (emptyState) {
            this.tasksList.removeChild(emptyState);
        }
        
        this.tasksList.appendChild(taskElement);
        
        // Aggiorna il contatore
        const tasks = this.taskManager.getAllTasks();
        this.taskCounter.textContent = `(${tasks.length})`;
        
        // Resetta il form
        document.getElementById('task-form').reset();
        
        // Mostra una notifica
        this.notificationManager.show('Task aggiunto con successo', 'success');
    }

    /**
     * Elimina un task
     * @param {string} id - ID del task da eliminare
     */
    deleteTask(id) {
        // Chiedi conferma all'utente
        if (!confirm('Sei sicuro di voler eliminare questo task?')) return;
        
        // Elimina il task dal gestore
        const success = this.taskManager.deleteTask(id);
        
        if (success) {
            // Rimuovi l'elemento dalla lista
            const taskElement = this.tasksList.querySelector(`[data-id="${id}"]`);
            if (taskElement) {
                this.tasksList.removeChild(taskElement);
            }
            
            // Aggiorna il contatore
            const tasks = this.taskManager.getAllTasks();
            this.taskCounter.textContent = `(${tasks.length})`;
            
            // Se non ci sono più task, mostra lo stato vuoto
            if (tasks.length === 0) {
                this.loadTasks();
            }
            
            // Mostra una notifica
            this.notificationManager.show('Task eliminato con successo', 'success');
        } else {
            this.notificationManager.show('Impossibile eliminare il task', 'error');
        }
    }

    /**
     * Cambia lo stato di completamento di un task
     * @param {string} id - ID del task
     */
    toggleTaskCompletion(id) {
        const task = this.taskManager.getTaskById(id);
        if (!task) return;
        
        const updatedTask = this.taskManager.toggleTaskCompletion(id, !task.completed);
        
        if (updatedTask) {
            // Aggiorna l'interfaccia
            const taskElement = this.tasksList.querySelector(`[data-id="${id}"]`);
            if (taskElement) {
                if (updatedTask.completed) {
                    taskElement.classList.add('completed');
                    taskElement.querySelector('.btn-complete i').className = 'fas fa-undo';
                } else {
                    taskElement.classList.remove('completed');
                    taskElement.querySelector('.btn-complete i').className = 'fas fa-check';
                }
            }
            
            // Mostra una notifica
            const message = updatedTask.completed ? 'Task completato' : 'Task ripristinato';
            this.notificationManager.show(message, 'success');
        }
    }

    /**
     * Mostra il modal per modificare un task
     * @param {Object} task - Task da modificare
     */
    showEditModal(task) {
        // Popola il form con i dati del task
        document.getElementById('edit-id').value = task.id;
        document.getElementById('edit-title').value = task.title;
        document.getElementById('edit-description').value = task.description;
        document.getElementById('edit-due-date').value = task.dueDate;
        document.getElementById('edit-priority').value = task.priority;
        
        // Mostra il modal
        this.modal.style.display = 'block';
    }

    /**
     * Aggiorna un task esistente
     */
    updateTask() {
        // Ottieni i valori dal form
        const idInput = document.getElementById('edit-id');
        const titleInput = document.getElementById('edit-title');
        const descriptionInput = document.getElementById('edit-description');
        const dueDateInput = document.getElementById('edit-due-date');
        const priorityInput = document.getElementById('edit-priority');
        
        // Validazione del titolo
        if (!titleInput.value.trim()) {
            this.notificationManager.show('Inserisci un titolo per il task', 'error');
            return;
        }
        
        // Aggiorna il task
        const updatedTask = this.taskManager.updateTask(idInput.value, {
            title: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            dueDate: dueDateInput.value,
            priority: priorityInput.value
        });
        
        if (updatedTask) {
            // Aggiorna l'elemento nella lista
            const taskElement = this.tasksList.querySelector(`[data-id="${updatedTask.id}"]`);
            if (taskElement) {
                const newTaskElement = this.createTaskElement(updatedTask);
                this.tasksList.replaceChild(newTaskElement, taskElement);
            }
            
            // Chiudi il modal
            this.modal.style.display = 'none';
            
            // Mostra una notifica
            this.notificationManager.show('Task aggiornato con successo', 'success');
        } else {
            this.notificationManager.show('Impossibile aggiornare il task', 'error');
        }
    }

    /**
     * Filtra i task in base ai criteri di ricerca e filtro
     */
    filterTasks() {
        const searchText = document.getElementById('search-tasks').value.trim();
        const priority = document.getElementById('filter-priority').value;
        const status = document.getElementById('filter-status').value;
        
        const filteredTasks = this.taskManager.filterTasks({ searchText, priority, status });
        this.renderTasks(filteredTasks);
    }

    /**
     * Ottiene il testo della priorità
     * @param {string} priority - Priorità del task
     * @returns {string} Testo della priorità
     */
    getPriorityText(priority) {
        switch (priority) {
            case 'high': return 'Alta';
            case 'medium': return 'Media';
            case 'low': return 'Bassa';
            default: return 'Media';
        }
    }

    /**
     * Inizializza il drag and drop per riordinare i task
     */
    initDragAndDrop() {
        this.tasksList.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('task-item')) {
                e.dataTransfer.setData('text/plain', e.target.dataset.id);
                e.target.classList.add('dragging');
            }
        });
        
        this.tasksList.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('task-item')) {
                e.target.classList.remove('dragging');
                document.querySelectorAll('.drop-zone').forEach(el => el.classList.remove('drop-zone'));
            }
        });
        
        this.tasksList.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingElement = document.querySelector('.dragging');
            if (!draggingElement) return;
            
            const taskItem = e.target.closest('.task-item');
            if (taskItem && taskItem !== draggingElement) {
                taskItem.classList.add('drop-zone');
            }
        });
        
        this.tasksList.addEventListener('dragleave', (e) => {
            const taskItem = e.target.closest('.task-item');
            if (taskItem) {
                taskItem.classList.remove('drop-zone');
            }
        });
        
        this.tasksList.addEventListener('drop', (e) => {
            e.preventDefault();
            const sourceId = e.dataTransfer.getData('text/plain');
            const targetElement = e.target.closest('.task-item');
            
            if (targetElement && targetElement.dataset.id !== sourceId) {
                const targetId = targetElement.dataset.id;
                const success = this.taskManager.reorderTasks(sourceId, targetId);
                
                if (success) {
                    this.loadTasks();
                }
            }
            
            document.querySelectorAll('.drop-zone').forEach(el => el.classList.remove('drop-zone'));
        });
    }
}

export default UI;