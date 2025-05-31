# Pattern Avanzati di Gestione degli Eventi in JavaScript

La gestione degli eventi in JavaScript può diventare complessa in applicazioni di grandi dimensioni. In questa guida, esploreremo pattern avanzati che aiutano a organizzare, ottimizzare e scalare il codice di gestione degli eventi.

## Pub/Sub (Publisher/Subscriber)

Il pattern Pub/Sub è un pattern di progettazione che disaccoppia i componenti di un'applicazione permettendo loro di comunicare senza dipendere direttamente l'uno dall'altro. I componenti possono pubblicare eventi (publisher) o iscriversi ad essi (subscriber).

### Implementazione Base

```javascript
class EventBus {
  constructor() {
    this.subscribers = {};
  }
  
  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
    
    // Restituisce una funzione per annullare l'iscrizione
    return () => {
      this.subscribers[event] = this.subscribers[event].filter(
        cb => cb !== callback
      );
    };
  }
  
  publish(event, data) {
    if (!this.subscribers[event]) {
      return;
    }
    
    this.subscribers[event].forEach(callback => {
      callback(data);
    });
  }
}

// Utilizzo
const eventBus = new EventBus();

// Subscriber
const unsubscribe = eventBus.subscribe('userLoggedIn', user => {
  console.log(`L'utente ${user.name} ha effettuato l'accesso`);
  updateUI(user);
});

// Un altro subscriber
eventBus.subscribe('userLoggedIn', user => {
  saveUserToLocalStorage(user);
});

// Publisher
function login(username, password) {
  // Logica di autenticazione
  authenticateUser(username, password)
    .then(user => {
      // Pubblica l'evento con i dati dell'utente
      eventBus.publish('userLoggedIn', user);
    })
    .catch(error => {
      eventBus.publish('loginError', error);
    });
}

// Annullare l'iscrizione quando non è più necessaria
unsubscribe();
```

### Vantaggi del Pattern Pub/Sub

1. **Disaccoppiamento**: I publisher non hanno bisogno di conoscere i subscriber e viceversa
2. **Scalabilità**: Facile aggiungere nuovi subscriber senza modificare il publisher
3. **Flessibilità**: I componenti possono essere sviluppati e testati indipendentemente
4. **Manutenibilità**: Codice più organizzato e modulare

## Event Delegation Avanzata

Abbiamo già visto la delegazione degli eventi di base, ma possiamo implementare pattern più avanzati per gestire interfacce complesse.

### Delegazione con Selettori Multipli

```javascript
function delegateEvent(element, eventType, selector, handler) {
  element.addEventListener(eventType, function(event) {
    const targetElement = event.target.closest(selector);
    
    if (targetElement && element.contains(targetElement)) {
      handler.call(targetElement, event, targetElement);
    }
  });
}

// Utilizzo
const container = document.querySelector('.container');

// Delega per pulsanti
delegateEvent(container, 'click', 'button.edit', function(event) {
  const itemId = this.dataset.id;
  editItem(itemId);
});

// Delega per link
delegateEvent(container, 'click', 'a.view', function(event) {
  event.preventDefault();
  const itemId = this.dataset.id;
  viewItem(itemId);
});

// Delega per checkbox
delegateEvent(container, 'change', 'input[type="checkbox"]', function(event) {
  const itemId = this.dataset.id;
  updateItemStatus(itemId, this.checked);
});
```

### Delegazione con Attributi Data

Utilizzare attributi `data-*` per creare un sistema di gestione degli eventi basato su azioni:

```javascript
document.addEventListener('click', function(event) {
  let target = event.target;
  
  // Cerca l'elemento più vicino con un attributo data-action
  while (target && target !== document) {
    if (target.hasAttribute('data-action')) {
      const action = target.getAttribute('data-action');
      const id = target.getAttribute('data-id');
      
      // Esegui l'azione appropriata
      handleAction(action, id, target, event);
      break;
    }
    target = target.parentNode;
  }
});

function handleAction(action, id, element, event) {
  switch (action) {
    case 'edit':
      editItem(id);
      break;
    case 'delete':
      if (confirm('Sei sicuro di voler eliminare questo elemento?')) {
        deleteItem(id);
      }
      break;
    case 'view':
      event.preventDefault();
      viewItem(id);
      break;
    // Altre azioni...
  }
}
```

HTML corrispondente:

```html
<div class="item-list">
  <div class="item">
    <span class="item-title">Elemento 1</span>
    <a href="/items/1" data-action="view" data-id="1">Visualizza</a>
    <button data-action="edit" data-id="1">Modifica</button>
    <button data-action="delete" data-id="1">Elimina</button>
  </div>
  <!-- Altri elementi... -->
</div>
```

## Event Throttling e Debouncing

Questi pattern sono essenziali per ottimizzare le prestazioni quando si gestiscono eventi che possono attivarsi frequentemente, come `scroll`, `resize` o `mousemove`.

### Throttling

Il throttling limita la frequenza con cui una funzione può essere eseguita. È utile quando si desidera che una funzione venga eseguita regolarmente, ma non troppo frequentemente.

```javascript
function throttle(func, limit) {
  let inThrottle;
  
  return function(...args) {
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Utilizzo
const throttledScroll = throttle(function() {
  console.log('Evento scroll throttled', window.scrollY);
  updateHeader();
}, 300); // Esegue al massimo una volta ogni 300ms

window.addEventListener('scroll', throttledScroll);
```

### Debouncing

Il debouncing ritarda l'esecuzione di una funzione fino a quando non è trascorso un certo periodo di tempo dall'ultima invocazione. È utile quando si desidera eseguire una funzione solo dopo che l'utente ha smesso di generare eventi.

```javascript
function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    const context = this;
    
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

// Utilizzo
const debouncedResize = debounce(function() {
  console.log('Evento resize debounced', window.innerWidth, window.innerHeight);
  recalculateLayout();
}, 500); // Esegue 500ms dopo l'ultimo evento resize

window.addEventListener('resize', debouncedResize);
```

### Quando Usare Throttling vs Debouncing

- **Throttling**: Quando si desidera eseguire una funzione a intervalli regolari durante un evento continuo (es. aggiornare la posizione durante lo scroll)
- **Debouncing**: Quando si desidera eseguire una funzione solo dopo che l'evento è terminato (es. ricerca mentre l'utente digita)

## Eventi Personalizzati Avanzati

Gli eventi personalizzati possono essere utilizzati per creare API più pulite e modulari.

### Eventi Personalizzati con Dati Complessi

```javascript
class ShoppingCart extends EventTarget {
  constructor() {
    super();
    this.items = [];
  }
  
  addItem(item) {
    this.items.push(item);
    
    // Crea un evento personalizzato con dati
    const event = new CustomEvent('itemadded', {
      detail: {
        item: item,
        timestamp: new Date(),
        cartSize: this.items.length
      },
      bubbles: true, // L'evento si propaga verso l'alto
      cancelable: true // L'evento può essere annullato
    });
    
    // Dispatch dell'evento
    this.dispatchEvent(event);
    
    return !event.defaultPrevented; // Restituisce false se l'evento è stato annullato
  }
  
  removeItem(itemId) {
    const index = this.items.findIndex(item => item.id === itemId);
    if (index !== -1) {
      const removedItem = this.items.splice(index, 1)[0];
      
      this.dispatchEvent(new CustomEvent('itemremoved', {
        detail: {
          item: removedItem,
          timestamp: new Date(),
          cartSize: this.items.length
        }
      }));
      
      return true;
    }
    return false;
  }
}

// Utilizzo
const cart = new ShoppingCart();

cart.addEventListener('itemadded', function(event) {
  console.log('Elemento aggiunto:', event.detail.item);
  updateCartUI(event.detail.cartSize);
});

cart.addEventListener('itemremoved', function(event) {
  console.log('Elemento rimosso:', event.detail.item);
  updateCartUI(event.detail.cartSize);
});

// Aggiunta di un elemento
cart.addItem({ id: 1, name: 'Prodotto 1', price: 29.99 });
```

### Eventi Personalizzati per la Comunicazione tra Componenti

```javascript
class Component extends EventTarget {
  constructor(name) {
    super();
    this.name = name;
  }
  
  communicate(eventName, data) {
    const event = new CustomEvent(eventName, {
      detail: data,
      bubbles: true
    });
    
    this.dispatchEvent(event);
  }
}

// Componente padre
class App extends Component {
  constructor() {
    super('App');
    this.header = new Header();
    this.sidebar = new Sidebar();
    this.content = new Content();
    
    // Aggiungi i componenti al DOM
    document.body.appendChild(this.header.element);
    document.body.appendChild(this.sidebar.element);
    document.body.appendChild(this.content.element);
    
    // Ascolta eventi dai componenti figli
    document.body.addEventListener('navigation', this.handleNavigation.bind(this));
  }
  
  handleNavigation(event) {
    console.log(`Navigazione a: ${event.detail.route}`);
    this.content.loadContent(event.detail.route);
  }
}

// Componente figlio
class Sidebar extends Component {
  constructor() {
    super('Sidebar');
    this.element = document.createElement('div');
    this.element.className = 'sidebar';
    
    // Crea link di navigazione
    const links = ['home', 'about', 'contact'];
    links.forEach(link => {
      const a = document.createElement('a');
      a.href = `#${link}`;
      a.textContent = link.charAt(0).toUpperCase() + link.slice(1);
      a.addEventListener('click', this.handleClick.bind(this, link));
      this.element.appendChild(a);
    });
  }
  
  handleClick(route, event) {
    event.preventDefault();
    this.communicate('navigation', { route });
  }
}

// Altri componenti...
class Header extends Component { /* ... */ }
class Content extends Component { /* ... */ }

// Inizializzazione
const app = new App();
```

## Gestione degli Eventi con Promises e Async/Await

Le Promises e async/await possono essere utilizzati per gestire eventi in modo più pulito e leggibile, specialmente quando si tratta di operazioni asincrone.

### Eventi come Promises

```javascript
function waitForEvent(element, eventName) {
  return new Promise(resolve => {
    const handler = event => {
      element.removeEventListener(eventName, handler);
      resolve(event);
    };
    element.addEventListener(eventName, handler);
  });
}

// Utilizzo
async function handleFormSubmission() {
  const submitButton = document.querySelector('button[type="submit"]');
  submitButton.textContent = 'Caricamento...';
  submitButton.disabled = true;
  
  try {
    // Attendi che il form venga inviato
    const submitEvent = await waitForEvent(form, 'submit');
    submitEvent.preventDefault(); // Previeni l'invio tradizionale
    
    // Raccogli i dati del form
    const formData = new FormData(submitEvent.target);
    
    // Invia i dati al server
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) throw new Error('Errore durante l\'invio');
    
    const result = await response.json();
    showSuccessMessage(result.message);
  } catch (error) {
    showErrorMessage(error.message);
  } finally {
    submitButton.textContent = 'Invia';
    submitButton.disabled = false;
  }
}

// Avvia il gestore
handleFormSubmission();
```

### Combinare Eventi Multipli con Promise.all

```javascript
async function waitForAllResources() {
  const images = Array.from(document.querySelectorAll('img'));
  const videos = Array.from(document.querySelectorAll('video'));
  
  // Crea una Promise per ogni immagine e video
  const imagePromises = images.map(img => {
    // Se l'immagine è già caricata, restituisci una Promise risolta
    if (img.complete) return Promise.resolve();
    // Altrimenti, attendi l'evento load o error
    return Promise.race([
      waitForEvent(img, 'load'),
      waitForEvent(img, 'error')
    ]);
  });
  
  const videoPromises = videos.map(video => {
    if (video.readyState >= 2) return Promise.resolve();
    return Promise.race([
      waitForEvent(video, 'canplay'),
      waitForEvent(video, 'error')
    ]);
  });
  
  // Attendi che tutte le risorse siano caricate
  await Promise.all([...imagePromises, ...videoPromises]);
  console.log('Tutte le risorse sono state caricate');
  
  // Nascondi l'indicatore di caricamento
  document.querySelector('.loading-indicator').style.display = 'none';
}

// Avvia il caricamento
waitForAllResources().catch(error => {
  console.error('Errore durante il caricamento delle risorse:', error);
});
```

## Pattern di Gestione dello Stato con Eventi

Gli eventi possono essere utilizzati per implementare un pattern di gestione dello stato simile a quello utilizzato in framework come Redux.

```javascript
class Store extends EventTarget {
  constructor(reducer, initialState = {}) {
    super();
    this.reducer = reducer;
    this.state = initialState;
  }
  
  getState() {
    return this.state;
  }
  
  dispatch(action) {
    // Applica il reducer per ottenere il nuovo stato
    const newState = this.reducer(this.state, action);
    
    // Se lo stato è cambiato, aggiorna e notifica
    if (newState !== this.state) {
      const oldState = this.state;
      this.state = newState;
      
      // Dispatch dell'evento di cambio stato
      this.dispatchEvent(new CustomEvent('statechange', {
        detail: {
          oldState,
          newState,
          action
        }
      }));
    }
    
    return action;
  }
  
  subscribe(callback) {
    const handler = event => callback(event.detail.newState, event.detail.oldState, event.detail.action);
    this.addEventListener('statechange', handler);
    
    // Restituisce una funzione per annullare l'iscrizione
    return () => this.removeEventListener('statechange', handler);
  }
}

// Esempio di utilizzo

// Reducer
function todoReducer(state = { todos: [] }, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
}

// Creazione dello store
const store = new Store(todoReducer, { todos: [] });

// Iscrizione ai cambiamenti
store.subscribe((newState, oldState, action) => {
  console.log('Azione:', action.type);
  console.log('Nuovo stato:', newState);
  renderTodos(newState.todos);
});

// Dispatch di azioni
function addTodo(text) {
  store.dispatch({ type: 'ADD_TODO', payload: text });
}

function toggleTodo(id) {
  store.dispatch({ type: 'TOGGLE_TODO', payload: id });
}

function removeTodo(id) {
  store.dispatch({ type: 'REMOVE_TODO', payload: id });
}

// Rendering dell'UI
function renderTodos(todos) {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';
  
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    li.style.textDecoration = todo.completed ? 'line-through' : 'none';
    li.addEventListener('click', () => toggleTodo(todo.id));
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation();
      removeTodo(todo.id);
    });
    
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}

// Gestione del form
document.getElementById('todo-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const input = this.querySelector('input');
  const text = input.value.trim();
  
  if (text) {
    addTodo(text);
    input.value = '';
  }
});
```

## Conclusione

I pattern avanzati di gestione degli eventi in JavaScript offrono potenti strumenti per creare applicazioni web scalabili, manutenibili e performanti. Dall'implementazione di sistemi Pub/Sub alla gestione dello stato basata su eventi, questi pattern aiutano a organizzare il codice e a gestire la complessità delle interazioni utente.

La scelta del pattern giusto dipende dalle specifiche esigenze dell'applicazione, ma una buona comprensione di questi pattern fornisce un solido toolkit per affrontare sfide di programmazione complesse.

Ricorda che, indipendentemente dal pattern scelto, è importante mantenere il codice pulito, ben documentato e testabile, e considerare sempre le implicazioni in termini di prestazioni e manutenibilità.

[Torna all'indice](../README.md) | [Argomento precedente: Eventi del Browser](./04_Eventi_Browser.md)