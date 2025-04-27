// taskManager.js - Modulo per la gestione delle attività

class TaskManager {
    constructor(storage) {
        this.storage = storage;
        this.tasks = this.storage.getTasks();
    }

    /**
     * Genera un ID univoco per un nuovo task
     * @returns {string} ID univoco
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }

    /**
     * Aggiunge un nuovo task
     * @param {Object} taskData - Dati del task da aggiungere
     * @returns {Object} Il task aggiunto
     */
    addTask(taskData) {
        const task = {
            id: this.generateId(),
            title: taskData.title,
            description: taskData.description || '',
            dueDate: taskData.dueDate || '',
            priority: taskData.priority || 'medium',
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.storage.saveTasks(this.tasks);
        return task;
    }

    /**
     * Ottiene tutti i task
     * @returns {Array} Array di task
     */
    getAllTasks() {
        return this.tasks;
    }

    /**
     * Ottiene un task specifico tramite ID
     * @param {string} id - ID del task da trovare
     * @returns {Object|null} Il task trovato o null
     */
    getTaskById(id) {
        return this.tasks.find(task => task.id === id) || null;
    }

    /**
     * Aggiorna un task esistente
     * @param {string} id - ID del task da aggiornare
     * @param {Object} updatedData - Nuovi dati per il task
     * @returns {Object|null} Il task aggiornato o null
     */
    updateTask(id, updatedData) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index === -1) return null;

        const updatedTask = {
            ...this.tasks[index],
            ...updatedData,
            updatedAt: new Date().toISOString()
        };

        this.tasks[index] = updatedTask;
        this.storage.saveTasks(this.tasks);
        return updatedTask;
    }

    /**
     * Elimina un task
     * @param {string} id - ID del task da eliminare
     * @returns {boolean} True se l'eliminazione è avvenuta con successo
     */
    deleteTask(id) {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== id);
        
        if (initialLength !== this.tasks.length) {
            this.storage.saveTasks(this.tasks);
            return true;
        }
        return false;
    }

    /**
     * Segna un task come completato o non completato
     * @param {string} id - ID del task
     * @param {boolean} completed - Stato di completamento
     * @returns {Object|null} Il task aggiornato o null
     */
    toggleTaskCompletion(id, completed) {
        return this.updateTask(id, { completed });
    }

    /**
     * Filtra i task in base a criteri specifici
     * @param {Object} filters - Criteri di filtro
     * @returns {Array} Array di task filtrati
     */
    filterTasks(filters = {}) {
        return this.tasks.filter(task => {
            // Filtro per testo di ricerca
            if (filters.searchText && !task.title.toLowerCase().includes(filters.searchText.toLowerCase()) && 
                !task.description.toLowerCase().includes(filters.searchText.toLowerCase())) {
                return false;
            }
            
            // Filtro per priorità
            if (filters.priority && filters.priority !== 'all' && task.priority !== filters.priority) {
                return false;
            }
            
            // Filtro per stato di completamento
            if (filters.status === 'completed' && !task.completed) {
                return false;
            }
            if (filters.status === 'pending' && task.completed) {
                return false;
            }
            
            return true;
        });
    }

    /**
     * Riordina i task
     * @param {string} sourceId - ID del task da spostare
     * @param {string} targetId - ID del task prima del quale inserire
     * @returns {boolean} True se il riordinamento è avvenuto con successo
     */
    reorderTasks(sourceId, targetId) {
        if (sourceId === targetId) return false;
        
        const sourceIndex = this.tasks.findIndex(task => task.id === sourceId);
        const targetIndex = this.tasks.findIndex(task => task.id === targetId);
        
        if (sourceIndex === -1 || targetIndex === -1) return false;
        
        // Rimuovi il task dalla posizione originale
        const [movedTask] = this.tasks.splice(sourceIndex, 1);
        
        // Inserisci il task nella nuova posizione
        this.tasks.splice(targetIndex, 0, movedTask);
        
        this.storage.saveTasks(this.tasks);
        return true;
    }

    /**
     * Controlla i task in scadenza e restituisce quelli che scadono oggi
     * @returns {Array} Array di task in scadenza oggi
     */
    checkDueTasks() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return this.tasks.filter(task => {
            if (!task.dueDate || task.completed) return false;
            
            const dueDate = new Date(task.dueDate);
            dueDate.setHours(0, 0, 0, 0);
            
            return dueDate.getTime() === today.getTime();
        });
    }
}

export default TaskManager;