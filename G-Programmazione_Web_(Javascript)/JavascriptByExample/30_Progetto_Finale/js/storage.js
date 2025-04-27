// storage.js - Modulo per la persistenza dei dati

class Storage {
    constructor() {
        this.storageKey = 'taskManager_tasks';
    }

    /**
     * Ottiene tutti i task dal localStorage
     * @returns {Array} Array di task
     */
    getTasks() {
        const tasksJSON = localStorage.getItem(this.storageKey);
        return tasksJSON ? JSON.parse(tasksJSON) : [];
    }

    /**
     * Salva i task nel localStorage
     * @param {Array} tasks - Array di task da salvare
     */
    saveTasks(tasks) {
        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }

    /**
     * Elimina tutti i task dal localStorage
     */
    clearTasks() {
        localStorage.removeItem(this.storageKey);
    }

    /**
     * Esporta i task in formato JSON
     * @returns {string} Stringa JSON dei task
     */
    exportTasks() {
        return localStorage.getItem(this.storageKey) || '[]';
    }

    /**
     * Importa i task da una stringa JSON
     * @param {string} jsonData - Stringa JSON dei task
     * @returns {boolean} True se l'importazione è avvenuta con successo
     */
    importTasks(jsonData) {
        try {
            const tasks = JSON.parse(jsonData);
            if (!Array.isArray(tasks)) return false;
            
            this.saveTasks(tasks);
            return true;
        } catch (error) {
            console.error('Errore durante l\'importazione dei task:', error);
            return false;
        }
    }

    /**
     * Salva le preferenze dell'utente
     * @param {string} key - Chiave della preferenza
     * @param {*} value - Valore della preferenza
     */
    savePreference(key, value) {
        localStorage.setItem(`taskManager_${key}`, JSON.stringify(value));
    }

    /**
     * Ottiene una preferenza dell'utente
     * @param {string} key - Chiave della preferenza
     * @param {*} defaultValue - Valore predefinito se la preferenza non esiste
     * @returns {*} Valore della preferenza
     */
    getPreference(key, defaultValue = null) {
        const value = localStorage.getItem(`taskManager_${key}`);
        return value !== null ? JSON.parse(value) : defaultValue;
    }
}

export default Storage;