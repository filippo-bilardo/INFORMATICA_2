// utils.js - Modulo per funzioni di utilità

const Utils = {
    /**
     * Formatta una data nel formato locale
     * @param {string} dateString - Data in formato ISO
     * @param {Object} options - Opzioni di formattazione
     * @returns {string} Data formattata
     */
    formatDate(dateString, options = {}) {
        if (!dateString) return '';
        
        const defaultOptions = {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        };
        
        const mergedOptions = { ...defaultOptions, ...options };
        return new Date(dateString).toLocaleDateString('it-IT', mergedOptions);
    },
    
    /**
     * Calcola il tempo rimanente fino a una data
     * @param {string} dateString - Data di scadenza
     * @returns {Object} Oggetto con giorni, ore, minuti rimanenti e stato
     */
    getTimeRemaining(dateString) {
        if (!dateString) {
            return { days: 0, hours: 0, minutes: 0, status: 'no-date' };
        }
        
        const now = new Date();
        const dueDate = new Date(dateString);
        const timeDiff = dueDate - now;
        
        // Se la data è passata
        if (timeDiff < 0) {
            return { days: 0, hours: 0, minutes: 0, status: 'overdue' };
        }
        
        // Calcola giorni, ore e minuti rimanenti
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        
        let status = 'normal';
        if (days === 0 && hours < 24) {
            status = 'soon';
        }
        if (days === 0 && hours < 6) {
            status = 'urgent';
        }
        
        return { days, hours, minutes, status };
    },
    
    /**
     * Genera un messaggio relativo al tempo rimanente
     * @param {string} dateString - Data di scadenza
     * @returns {string} Messaggio formattato
     */
    getTimeRemainingMessage(dateString) {
        const { days, hours, minutes, status } = this.getTimeRemaining(dateString);
        
        if (status === 'no-date') {
            return '';
        }
        
        if (status === 'overdue') {
            return 'Scaduto';
        }
        
        if (days > 0) {
            return `${days} ${days === 1 ? 'giorno' : 'giorni'} rimanenti`;
        }
        
        if (hours > 0) {
            return `${hours} ${hours === 1 ? 'ora' : 'ore'} rimanenti`;
        }
        
        return `${minutes} ${minutes === 1 ? 'minuto' : 'minuti'} rimanenti`;
    },
    
    /**
     * Debounce una funzione
     * @param {Function} func - Funzione da eseguire
     * @param {number} wait - Tempo di attesa in ms
     * @returns {Function} Funzione con debounce
     */
    debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * Genera un colore casuale in formato esadecimale
     * @returns {string} Colore esadecimale
     */
    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    
    /**
     * Controlla se il dispositivo è mobile
     * @returns {boolean} True se è un dispositivo mobile
     */
    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    /**
     * Controlla se l'app è in modalità offline
     * @returns {boolean} True se l'app è offline
     */
    isOffline() {
        return !navigator.onLine;
    },
    
    /**
     * Registra gli event listener per lo stato online/offline
     * @param {Function} onlineCallback - Callback per quando si va online
     * @param {Function} offlineCallback - Callback per quando si va offline
     */
    registerConnectivityListeners(onlineCallback, offlineCallback) {
        window.addEventListener('online', onlineCallback);
        window.addEventListener('offline', offlineCallback);
    }
};

export default Utils;