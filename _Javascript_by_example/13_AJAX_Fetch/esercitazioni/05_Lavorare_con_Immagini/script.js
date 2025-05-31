document.addEventListener('DOMContentLoaded', () => {
    const loadImageButton = document.getElementById('load-image');
    const imageContainer = document.getElementById('image-container');
    const messageArea = document.getElementById('message-area');
    let currentObjectUrl = null; // Per tenere traccia dell'URL oggetto corrente

    loadImageButton.addEventListener('click', () => {
        // Pulisci l'area messaggi e il contenitore dell'immagine
        messageArea.textContent = 'Caricamento immagine...';
        imageContainer.innerHTML = '';

        // Revoca l'Object URL precedente se esiste
        if (currentObjectUrl) {
            URL.revokeObjectURL(currentObjectUrl);
            currentObjectUrl = null;
        }

        const imageUrl = 'https://picsum.photos/400/300';

        fetch(imageUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Errore HTTP: ${response.status} ${response.statusText}`);
                }
                return response.blob(); // Ottieni i dati come Blob
            })
            .then(imageBlob => {
                console.log('Blob ricevuto:', imageBlob);
                // Crea un Object URL dal Blob
                currentObjectUrl = URL.createObjectURL(imageBlob);

                // Crea l'elemento immagine
                const imgElement = document.createElement('img');

                // Gestisci il caricamento riuscito dell'immagine
                imgElement.onload = () => {
                    console.log('Immagine caricata con successo nel tag img.');
                    // Aggiungi l'immagine al contenitore
                    imageContainer.appendChild(imgElement);
                    // Rimuovi il messaggio di caricamento
                    messageArea.textContent = '';
                    // Nota: Non revocare l'URL qui, altrimenti l'immagine scompare!
                    // La revoca viene fatta prima del caricamento successivo.
                };

                // Gestisci errori nel caricamento dell'immagine dal Blob/Object URL
                imgElement.onerror = () => {
                    console.error('Errore durante il caricamento dell\'immagine dall\'Object URL.');
                    messageArea.textContent = 'Errore nel visualizzare l\'immagine.';
                    // Revoca l'URL anche in caso di errore
                    if (currentObjectUrl) {
                        URL.revokeObjectURL(currentObjectUrl);
                        currentObjectUrl = null;
                    }
                };

                // Imposta la sorgente dell'immagine all'Object URL
                imgElement.src = currentObjectUrl;
                imgElement.alt = 'Immagine Casuale';

            })
            .catch(error => {
                console.error('Errore durante il fetch:', error);
                messageArea.textContent = `Errore durante il caricamento: ${error.message}`;
            })
            .finally(() => {
                // Assicurati che il messaggio di caricamento venga rimosso se non gestito altrove
                // Questo è utile se l'errore avviene prima dell'onload/onerror dell'img
                if (messageArea.textContent === 'Caricamento immagine...') {
                   // Potrebbe essere già stato gestito da .catch o img.onerror
                   // Lasciamo che siano loro a pulire in caso di errore specifico
                   // Se invece il fetch ha successo ma l'img non carica, l'onerror gestirà
                   // Se tutto va bene, l'onload gestirà
                }
            });
    });
});