# Web App Manifest

Il Web App Manifest è un componente fondamentale delle Progressive Web Apps (PWA) che consente di controllare come l'applicazione viene visualizzata e si comporta quando viene "installata" sul dispositivo dell'utente.

## Cos'è un Web App Manifest?

Un Web App Manifest è un semplice file JSON che fornisce informazioni sulla tua applicazione web, come il nome, le icone, i colori del tema e altre impostazioni. Questo file permette ai browser di trattare la tua applicazione web come un'app nativa, consentendo agli utenti di installarla sulla schermata home dei loro dispositivi.

## Come implementare un Web App Manifest

### 1. Creare il file manifest.json

Il primo passo è creare un file `manifest.json` nella root del tuo progetto web:

```json
{
  "name": "La Mia Applicazione PWA",
  "short_name": "MiaPWA",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2196f3",
  "description": "Una fantastica Progressive Web App di esempio",
  "icons": [
    {
      "src": "/images/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/images/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "orientation": "portrait",
  "lang": "it-IT",
  "dir": "ltr",
  "categories": ["education", "productivity"]
}
```

### 2. Collegare il manifest alla tua pagina HTML

Una volta creato il file manifest, devi collegarlo alle tue pagine HTML aggiungendo un tag `<link>` nell'elemento `<head>`:

```html
<link rel="manifest" href="/manifest.json">
```

È anche consigliabile aggiungere meta tag per migliorare l'esperienza su iOS e altri sistemi:

```html
<!-- Meta tag per il colore del tema -->
<meta name="theme-color" content="#2196f3">

<!-- Meta tag per iOS -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="MiaPWA">
<link rel="apple-touch-icon" href="/images/icon-192.png">
```

## Proprietà principali del manifest

### Proprietà essenziali

- **name**: Il nome completo dell'applicazione.
- **short_name**: Una versione breve del nome, usata quando lo spazio è limitato (ad esempio sulla schermata home).
- **start_url**: L'URL che viene caricato quando l'utente avvia l'app dalla schermata home.
- **display**: Modalità di visualizzazione dell'app. Valori possibili:
  - `fullscreen`: Occupa tutto lo schermo
  - `standalone`: Aspetto simile a un'app nativa (senza UI del browser)
  - `minimal-ui`: Aspetto simile a un'app con minima UI del browser
  - `browser`: Visualizzazione standard del browser
- **icons**: Array di oggetti che definiscono le icone dell'app per diverse dimensioni.

### Proprietà aggiuntive

- **background_color**: Colore di sfondo usato durante il caricamento dell'app.
- **theme_color**: Colore principale dell'applicazione, influisce sulla UI del browser.
- **description**: Descrizione dell'applicazione.
- **orientation**: Orientamento preferito (portrait, landscape).
- **scope**: Definisce il perimetro di navigazione che appartiene all'app.
- **lang**: Lingua principale dell'app.
- **dir**: Direzione del testo (ltr, rtl).
- **categories**: Categorie dell'app per gli app store.
- **screenshots**: Array di screenshot per gli app store.
- **shortcuts**: Scorciatoie per azioni rapide (supportate in Android).

## Icone e immagini

Le icone sono un elemento cruciale del manifest. È importante fornire icone di diverse dimensioni per garantire una visualizzazione ottimale su tutti i dispositivi:

- **192x192px**: Dimensione minima raccomandata per Android.
- **512x512px**: Necessaria per la schermata splash su Android.
- **Maskable icons**: Icone che supportano il formato "maskable" di Android, che consente di adattarsi a diverse forme di icone.

Per le maskable icons, aggiungi `"purpose": "any maskable"` alla definizione dell'icona nel manifest.

## Test e debug del manifest

Puoi verificare la corretta implementazione del manifest utilizzando:

1. **Chrome DevTools**: Nella scheda "Application" > "Manifest".
2. **Lighthouse**: Esegui un audit PWA per verificare il manifest.
3. **Web App Manifest Validator**: Strumenti online per validare il tuo manifest.

## Esempio completo di implementazione

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>La Mia PWA</title>
  
  <!-- Web App Manifest -->
  <link rel="manifest" href="/manifest.json">
  
  <!-- Theme color -->
  <meta name="theme-color" content="#2196f3">
  
  <!-- iOS support -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="MiaPWA">
  <link rel="apple-touch-icon" href="/images/icon-192.png">
  
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>La Mia Progressive Web App</h1>
  <p>Questa è una PWA di esempio con Web App Manifest.</p>
  
  <script src="app.js"></script>
</body>
</html>
```

## Considerazioni importanti

- **Icone adattive**: Utilizza il formato "maskable" per le icone su Android.
- **Compatibilità iOS**: iOS non supporta completamente il Web App Manifest, quindi è necessario aggiungere meta tag specifici.
- **Testing su dispositivi reali**: Testa sempre l'installazione su dispositivi reali, non solo in emulatori.
- **HTTPS**: Ricorda che le PWA richiedono HTTPS per funzionare correttamente.

## Conclusione

Il Web App Manifest è un elemento essenziale per trasformare un sito web in una Progressive Web App installabile. Implementando correttamente il manifest, puoi offrire agli utenti un'esperienza simile a quella delle app native, aumentando l'engagement e la fidelizzazione.