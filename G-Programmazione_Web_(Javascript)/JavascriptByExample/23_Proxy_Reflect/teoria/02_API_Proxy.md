# API Proxy in JavaScript

L'API Proxy, introdotta in ES6, fornisce un meccanismo per creare un wrapper attorno a un oggetto che può intercettare e ridefinire operazioni fondamentali come l'accesso alle proprietà, l'assegnazione, l'enumerazione, l'invocazione di funzioni e altro ancora.

## Sintassi di Base

```javascript
const proxy = new Proxy(target, handler);
```

Dove:
- `target`: l'oggetto originale che viene virtualizzato dal proxy
- `handler`: un oggetto che definisce quali operazioni saranno intercettate e come ridefinire queste operazioni

## Trappole (Traps)

Le "trappole" sono i metodi che è possibile definire nell'oggetto handler per intercettare diverse operazioni. Ecco le trappole più comuni:

### get

Intercetta l'accesso alle proprietà.

```javascript
const oggetto = { messaggio: "Ciao Mondo" };

const proxy = new Proxy(oggetto, {
  get(target, proprietà, receiver) {
    console.log(`Accesso alla proprietà: ${proprietà}`);
    return target[proprietà];
  }
});

console.log(proxy.messaggio); // Accesso alla proprietà: messaggio, Ciao Mondo
```

### set

Intercetta l'assegnazione di valori alle proprietà.

```javascript
const oggetto = { contatore: 0 };

const proxy = new Proxy(oggetto, {
  set(target, proprietà, valore, receiver) {
    console.log(`Impostazione di ${proprietà} a ${valore}`);
    target[proprietà] = valore;
    return true; // Indica successo (necessario in strict mode)
  }
});

proxy.contatore = 1; // Impostazione di contatore a 1
```

### has

Intercetta l'operatore `in`.

```javascript
const oggetto = { visibile: true, nascosto: false };

const proxy = new Proxy(oggetto, {
  has(target, proprietà) {
    if (proprietà === 'nascosto') {
      return false; // Nascondi la proprietà 'nascosto' dall'operatore in
    }
    return proprietà in target;
  }
});

console.log('visibile' in proxy); // true
console.log('nascosto' in proxy); // false (anche se esiste nell'oggetto target)
```

### deleteProperty

Intercetta l'operatore `delete`.

```javascript
const oggetto = { eliminabile: true, protetto: false };

const proxy = new Proxy(oggetto, {
  deleteProperty(target, proprietà) {
    if (proprietà === 'protetto') {
      console.log('Questa proprietà non può essere eliminata');
      return false;
    }
    delete target[proprietà];
    return true;
  }
});

delete proxy.eliminabile; // true
delete proxy.protetto; // Questa proprietà non può essere eliminata, false
```

### apply

Intercetta le chiamate di funzione.

```javascript
function saluta(nome) {
  return `Ciao, ${nome}`;
}

const proxyFunzione = new Proxy(saluta, {
  apply(target, thisArg, argArray) {
    console.log(`Chiamata della funzione con argomenti: ${argArray}`);
    return target.apply(thisArg, argArray);
  }
});

console.log(proxyFunzione('Mario')); // Chiamata della funzione con argomenti: Mario, Ciao, Mario
```

### construct

Intercetta l'operatore `new`.

```javascript
class Persona {
  constructor(nome) {
    this.nome = nome;
  }
}

const ProxyPersona = new Proxy(Persona, {
  construct(target, argArray, newTarget) {
    console.log(`Creazione di una nuova istanza con argomenti: ${argArray}`);
    return new target(...argArray);
  }
});

const persona = new ProxyPersona('Luigi'); // Creazione di una nuova istanza con argomenti: Luigi
```

## Altre Trappole Disponibili

- `getPrototypeOf`: intercetta `Object.getPrototypeOf()`
- `setPrototypeOf`: intercetta `Object.setPrototypeOf()`
- `isExtensible`: intercetta `Object.isExtensible()`
- `preventExtensions`: intercetta `Object.preventExtensions()`
- `getOwnPropertyDescriptor`: intercetta `Object.getOwnPropertyDescriptor()`
- `defineProperty`: intercetta `Object.defineProperty()`
- `ownKeys`: intercetta `Object.getOwnPropertyNames()` e `Object.getOwnPropertySymbols()`

## Pattern Comuni con Proxy

### Validazione delle Proprietà

```javascript
function creaOggettoConValidazione(validazioni) {
  return new Proxy({}, {
    set(target, proprietà, valore) {
      if (validazioni[proprietà]) {
        const valido = validazioni[proprietà](valore);
        if (!valido) {
          throw new Error(`Valore non valido per la proprietà ${proprietà}`);
        }
      }
      target[proprietà] = valore;
      return true;
    }
  });
}

const persona = creaOggettoConValidazione({
  età: valore => Number.isInteger(valore) && valore >= 0 && valore <= 120,
  nome: valore => typeof valore === 'string' && valore.length > 0
});

persona.nome = 'Mario'; // OK
persona.età = 30; // OK
// persona.età = -5; // Errore: Valore non valido per la proprietà età
// persona.nome = ''; // Errore: Valore non valido per la proprietà nome
```

### Proprietà Virtuali

```javascript
const rettangolo = {
  larghezza: 10,
  altezza: 5
};

const rettangoloProxy = new Proxy(rettangolo, {
  get(target, proprietà) {
    if (proprietà === 'area') {
      return target.larghezza * target.altezza;
    }
    if (proprietà === 'perimetro') {
      return 2 * (target.larghezza + target.altezza);
    }
    return target[proprietà];
  }
});

console.log(rettangoloProxy.area); // 50
console.log(rettangoloProxy.perimetro); // 30
```

### Logging Automatico

```javascript
function creaOggettoConLogging(oggetto, nome = 'oggetto') {
  return new Proxy(oggetto, {
    get(target, proprietà) {
      const valore = target[proprietà];
      console.log(`GET: ${nome}.${proprietà} => ${valore}`);
      return valore;
    },
    set(target, proprietà, valore) {
      console.log(`SET: ${nome}.${proprietà} = ${valore}`);
      target[proprietà] = valore;
      return true;
    }
  });
}

const utente = creaOggettoConLogging({ nome: 'Alice', ruolo: 'Admin' }, 'utente');
utente.nome; // GET: utente.nome => Alice
utente.ruolo = 'Utente'; // SET: utente.ruolo = Utente
```

### Controllo degli Accessi

```javascript
function creaOggettoProtetto(oggetto, proprietàProtette) {
  return new Proxy(oggetto, {
    get(target, proprietà) {
      if (proprietàProtette.includes(proprietà)) {
        throw new Error(`Accesso negato alla proprietà ${proprietà}`);
      }
      return target[proprietà];
    },
    set(target, proprietà, valore) {
      if (proprietàProtette.includes(proprietà)) {
        throw new Error(`Modifica negata alla proprietà ${proprietà}`);
      }
      target[proprietà] = valore;
      return true;
    },
    deleteProperty(target, proprietà) {
      if (proprietàProtette.includes(proprietà)) {
        throw new Error(`Eliminazione negata della proprietà ${proprietà}`);
      }
      delete target[proprietà];
      return true;
    }
  });
}

const datiUtente = creaOggettoProtetto(
  { id: 1234, nome: 'Mario', password: 'secreto123' },
  ['id', 'password']
);

console.log(datiUtente.nome); // Mario
// console.log(datiUtente.password); // Errore: Accesso negato alla proprietà password
datiUtente.nome = 'Luigi'; // OK
// datiUtente.id = 5678; // Errore: Modifica negata alla proprietà id
```

## Limitazioni e Considerazioni

### Performance

L'uso di Proxy introduce un overhead di performance. Per operazioni critiche che vengono eseguite frequentemente, potrebbe essere necessario considerare approcci alternativi.

### Compatibilità

I Proxy non possono essere polyfilled per browser più vecchi, poiché il loro comportamento non può essere replicato con altre funzionalità JavaScript.

### Proxy Revocabili

È possibile creare proxy che possono essere revocati, disabilitando tutte le trappole:

```javascript
const { proxy, revoke } = Proxy.revocable({}, {
  get(target, proprietà) {
    return 'valore intercettato';
  }
});

console.log(proxy.qualsiasi); // 'valore intercettato'

// Revoca il proxy
revoke();

// console.log(proxy.qualsiasi); // TypeError: Cannot perform 'get' on a proxy that has been revoked
```

Nel prossimo capitolo, esploreremo l'API Reflect e come può essere utilizzata insieme a Proxy per implementare pattern ancora più potenti.