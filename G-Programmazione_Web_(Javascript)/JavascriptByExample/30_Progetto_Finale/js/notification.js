// notification.js - Modulo per la gestione delle notifiche

class NotificationManager {
    constructor() {
        this.notificationContainer = document.createElement('div');
        this.notificationContainer.className = 'notification-container';
        document.body.appendChild(this.notificationContainer);
        
        // Richiedi il permesso per le notifiche push
        this.requestNotificationPermission();
    }
    
    /**
     * Richiede il permesso per le notifiche push
     */
    requestNotificationPermission() {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Permesso per le notifiche concesso');
                    this.setupServiceWorker();
                }
            });
        }
    }
    
    /**
     * Configura il service worker per le notifiche push
     */
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                console.log('Service Worker pronto per le notifiche');
            });
        }
    }
    
    /**
     * Mostra una notifica nell'interfaccia utente
     * @param {string} message - Messaggio da mostrare
     * @param {string} type - Tipo di notifica (success, error, warning, info)
     * @param {number} duration - Durata in millisecondi
     */
    show(message, type = 'info', duration = 3000) {
        // Crea l'elemento notifica
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        // Aggiungi l'icona in base al tipo
        let icon;
        switch (type) {
            case 'success':
                icon = 'fa-check-circle';
                break;
            case 'error':
                icon = 'fa-exclamation-circle';
                break;
            case 'warning':
                icon = 'fa-exclamation-triangle';
                break;
            default:
                icon = 'fa-info-circle';
        }
        
        // Imposta il contenuto della notifica
        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
            <button class="close-notification">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Aggiungi la notifica al container
        this.notificationContainer.appendChild(notification);
        
        // Aggiungi l'event listener per chiudere la notifica
        const closeButton = notification.querySelector('.close-notification');
        closeButton.addEventListener('click', () => {
            this.notificationContainer.removeChild(notification);
        });
        
        // Rimuovi la notifica dopo la durata specificata
        setTimeout(() => {
            if (notification.parentNode === this.notificationContainer) {
                this.notificationContainer.removeChild(notification);
            }
        }, duration);
    }
    
    /**
     * Invia una notifica push
     * @param {string} title - Titolo della notifica
     * @param {Object} options - Opzioni della notifica
     */
    sendPushNotification(title, options = {}) {
        if (!('Notification' in window)) {
            console.warn('Questo browser non supporta le notifiche desktop');
            return;
        }
        
        if (Notification.permission === 'granted') {
            // Usa il service worker per mostrare la notifica se disponibile
            if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                navigator.serviceWorker.ready.then(registration => {
                    registration.showNotification(title, {
                        body: options.body || '',
                        icon: options.icon || 'assets/icons/icon-192.png',
                        badge: options.badge || 'assets/icons/favicon.png',
                        vibrate: options.vibrate || [100, 50, 100],
                        data: options.data || {},
                        actions: options.actions || [
                            { action: 'open', title: 'Apri' },
                            { action: 'close', title: 'Chiudi' }
                        ]
                    });
                });
            } else {
                // Fallback a notifiche native
                new Notification(title, {
                    body: options.body || '',
                    icon: options.icon || 'assets/icons/icon-192.png'
                });
            }
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.sendPushNotification(title, options);
                }
            });
        }
    }
    
    /**
     * Notifica per i task in scadenza
     * @param {Array} tasks - Array di task in scadenza
     */
    notifyDueTasks(tasks) {
        if (tasks.length === 0) return;
        
        if (tasks.length === 1) {
            this.sendPushNotification('Task in scadenza oggi', {
                body: `"${tasks[0].title}" scade oggi!`,
                data: { url: './' }
            });
        } else {
            this.sendPushNotification('Task in scadenza oggi', {
                body: `Hai ${tasks.length} task in scadenza oggi!`,
                data: { url: './' }
            });
        }
    }
}

export default NotificationManager;