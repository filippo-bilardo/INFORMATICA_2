# API Reflect in JavaScript

L'API Reflect, introdotta in ES6 insieme a Proxy, fornisce metodi per operazioni JavaScript intercettabili. Mentre Proxy permette di intercettare queste operazioni, Reflect offre un modo standardizzato per eseguirle.

## Introduzione a Reflect

L'oggetto globale `Reflect` non è un oggetto funzione e non può essere istanziato con `new`. Tutte le sue proprietà e metodi sono statici, simili a quelli dell'oggetto `Math`.

Reflect è stato progettato per:

1. Fornire metodi che corrispondono esattamente alle trappole di Proxy
2. Ridurre la necessità di operatori e costrutti speciali
3. Fornire un modo più affidabile per eseguire operazioni riflessive

## Metodi Principali di Reflect

### Reflect.get(target, propertyKey[, receiver])

Recupera il valore di una proprietà da un oggetto.

```javascript
const oggetto = { messaggio: "Ciao Mondo" };

console.log(Reflect.get(oggetto, "messaggio")); // "Ciao Mondo"

// Equivalente a:
console.log(oggetto["messaggio"]);
```

### Reflect.set(target, propertyKey, value[, receiver])

Imposta il valore di una proprietà su un oggetto.

```javascript
const oggetto = { contatore: 0 };

Reflect.set(oggetto, "contatore", 1);
console.log(oggetto.contatore); // 1

// Equivalente a:
oggetto["contatore"] = 1;
```

### Reflect.has(target, propertyKey)

Verifica se un oggetto ha una determinata proprietà.

```javascript
const oggetto = { proprietà: 42 };

console.log(Reflect.has(oggetto, "proprietà")); // true
console.log(Reflect.has(oggetto, "metodo")); // false

// Equivalente a:
console.log("proprietà" in oggetto);
```

### Reflect.deleteProperty(target, propertyKey)

Elimina una proprietà da un oggetto.

```javascript
const oggetto = { eliminabile: true };

console.log(Reflect.deleteProperty(oggetto, "eliminabile")); // true
console.log(oggetto.eliminabile); // undefined

// Equivalente a:
delete oggetto.eliminabile;
```

### Reflect.apply(target, thisArgument, argumentsList)

Chiama una funzione con argomenti specificati.

```javascript
function saluta(nome) {
  return `Ciao, ${nome}! Sono ${this.ruolo}.`;
}

const contesto = { ruolo: "amministratore" };

console.log(Reflect.apply(saluta, contesto, ["Mario"])); 
// "Ciao, Mario! Sono amministratore."

// Equivalente a:
console.log(saluta.apply(contesto, ["Mario"]));
```

### Reflect.construct(target, argumentsList[, newTarget])

Funziona come l'operatore `new`.

```javascript
class Persona {
  constructor(nome, età) {
    this.nome = nome;
    this.età = età;
  }
}

const persona = Reflect.construct(Persona, ["Mario", 30]);
console.log(persona.nome); // "Mario"
console.log(persona.età); // 30

// Equivalente a:
const persona2 = new Persona("Mario", 30);
```

### Reflect.defineProperty(target, propertyKey, attributes)

Definisce una nuova proprietà su un oggetto.

```javascript
const oggetto = {};

Reflect.defineProperty(oggetto, "proprietà", {
  value: 42,
  writable: true,
  enumerable: true,
  configurable: true
});

console.log(oggetto.proprietà); // 42

// Equivalente a:
Object.defineProperty(oggetto, "proprietà", { value: 42, ... });
```

### Reflect.getOwnPropertyDescriptor(target, propertyKey)

Ottiene il descrittore di una proprietà.

```javascript
const oggetto = { proprietà: 42 };

const descrittore = Reflect.getOwnPropertyDescriptor(oggetto, "proprietà");
console.log(descrittore);
// { value: 42, writable: true, enumerable: true, configurable: true }

// Equivalente a:
Object.getOwnPropertyDescriptor(oggetto, "proprietà");
```

### Reflect.getPrototypeOf(target)

Ottiene il prototipo di un oggetto.

```javascript
class Animale {}
class Cane extends Animale {}

const fido = new Cane();

console.log(Reflect.getPrototypeOf(fido) === Cane.prototype); // true

// Equivalente a:
Object.getPrototypeOf(fido);
```

### Reflect.setPrototypeOf(target, prototype)

Imposta il prototipo di un oggetto.

```javascript
const oggetto = {};
const prototipo = { metodo() { return "dal prototipo"; } };

Reflect.setPrototypeOf(oggetto, prototipo);
console.log(oggetto.metodo()); // "dal prototipo"

// Equivalente a:
Object.setPrototypeOf(oggetto, prototipo);
```

### Reflect.isExtensible(target)

Verifica se un oggetto può avere nuove proprietà aggiunte.

```javascript
const oggetto = {};

console.log(Reflect.isExtensible(oggetto)); // true

Object.preventExtensions(oggetto);
console.log(Reflect.isExtensible(oggetto)); // false

// Equivalente a:
Object.isExtensible(oggetto);
```

### Reflect.preventExtensions(target)

Impedisce l'aggiunta di nuove proprietà a un oggetto.

```javascript
const oggetto = {};

Reflect.preventExtensions(oggetto);
oggetto.nuovaProp = 42; // Non ha effetto in strict mode
console.log(oggetto.nuovaProp); // undefined

// Equivalente a:
Object.preventExtensions(oggetto);
```

### Reflect.ownKeys(target)

Restituisce un array di tutte le chiavi di proprietà possedute.

```javascript
const oggetto = {
  a: 1,
  b: 2,
  [Symbol("c")]: 3
};

console.log(Reflect.ownKeys(oggetto));
// ["a", "b", Symbol(c)]

// Equivalente a:
Object.getOwnPropertyNames(oggetto).concat(Object.getOwnPropertySymbols(oggetto));
```

## Reflect con Proxy

Una delle combinazioni più potenti è l'uso di Reflect insieme a Proxy. Questo permette di intercettare operazioni e poi inoltrarle all'oggetto target in modo standardizzato:

```javascript
const target = {
  messaggio: "originale",
  get saluta() {
    return `Ciao, ${this.messaggio}`;
  }
};

const handler = {
  get(target, prop, receiver) {
    console.log(`Accesso alla proprietà: ${prop}`);
    return Reflect.get(target, prop, receiver);
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.messaggio); // Accesso alla proprietà: messaggio, originale
console.log(proxy.saluta); // Accesso alla proprietà: saluta, Ciao, originale
```

L'uso di `Reflect.get` con il parametro `receiver` è particolarmente importante quando si lavora con getter, poiché preserva il corretto valore di `this`.

## Vantaggi di Reflect rispetto agli Operatori Tradizionali

### 1. Gestione degli Errori più Coerente

I metodi di Reflect restituiscono valori booleani per le operazioni che potrebbero fallire, invece di lanciare eccezioni:

```javascript
// Approccio tradizionale
try {
  Object.defineProperty(obj, "prop", { value: 42 });
  // Successo
} catch (e) {
  // Fallimento
}

// Approccio con Reflect
if (Reflect.defineProperty(obj, "prop", { value: 42 })) {
  // Successo
} else {
  // Fallimento
}
```

### 2. Operazioni Funzionali invece che Operatori

Reflect trasforma operatori in funzioni, rendendo più facile passarli come callback o usarli in contesti funzionali:

```javascript
// Invece di:
delete obj.prop;

// Possiamo usare:
Reflect.deleteProperty(obj, "prop");

// Utile in contesti funzionali
const props = ["prop1", "prop2", "prop3"];
props.forEach(prop => Reflect.deleteProperty(obj, prop));
```

### 3. Corrispondenza con le Trappole di Proxy

Ogni metodo in Reflect corrisponde esattamente a una trappola in Proxy, rendendo più facile e coerente l'inoltro delle operazioni:

```javascript
const handler = {
  // Per ogni trappola in Proxy, esiste un metodo corrispondente in Reflect
  get(target, prop, receiver) {
    // Logica personalizzata...
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    // Logica personalizzata...
    return Reflect.set(target, prop, value, receiver);
  }
  // E così via per tutte le altre trappole
};
```

## Casi d'Uso Pratici

### Estensione di Oggetti con Logging

```javascript
function creaOggettoConLogging(target) {
  return new Proxy(target, {
    get(target, prop, receiver) {
      console.log(`GET: ${prop}`);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      console.log(`SET: ${prop} = ${value}`);
      return Reflect.set(target, prop, value, receiver);
    },
    apply(target, thisArg, args) {
      console.log(`CALL: ${target.name}(${args})`);
      return Reflect.apply(target, thisArg, args);
    }
  });
}

const utente = creaOggettoConLogging({ nome: "Mario" });
utente.nome; // GET: nome
utente.nome = "Luigi"; // SET: nome = Luigi

const saluta = creaOggettoConLogging(function saluta(nome) {
  return `Ciao, ${nome}`;
});

saluta("Mondo"); // CALL: saluta(Mondo), Ciao, Mondo
```

### Implementazione di Proprietà Calcolate

```javascript
function creaOggettoReattivo(target) {
  const dipendenze = new Map();
  const calcolate = new Map();
  
  return new Proxy(target, {
    get(target, prop, receiver) {
      // Se è una proprietà calcolata, esegui la funzione
      if (calcolate.has(prop)) {
        const calcFunc = calcolate.get(prop);
        return calcFunc.call(receiver);
      }
      
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      const risultato = Reflect.set(target, prop, value, receiver);
      
      // Notifica le dipendenze
      if (dipendenze.has(prop)) {
        const propsInfluenzate = dipendenze.get(prop);
        propsInfluenzate.forEach(propCalc => {
          // Trigger di ricalcolo se necessario
          if (typeof receiver[propCalc] === 'function') {
            receiver[propCalc]();
          }
        });
      }
      
      return risultato;
    },
    defineProperty(target, prop, desc) {
      // Registra proprietà calcolate
      if (desc.get) {
        calcolate.set(prop, desc.get);
      }
      
      return Reflect.defineProperty(target, prop, desc);
    }
  });
}

const rettangolo = creaOggettoReattivo({
  larghezza: 10,
  altezza: 5
});

Object.defineProperty(rettangolo, 'area', {
  get() { return this.larghezza * this.altezza; }
});

console.log(rettangolo.area); // 50
rettangolo.larghezza = 20;
console.log(rettangolo.area); // 100
```

## Conclusione

L'API Reflect offre un modo standardizzato e funzionale per eseguire operazioni riflessive in JavaScript. Quando combinata con Proxy, fornisce un potente strumento per la metaprogrammazione, permettendo di creare API più espressive, implementare pattern avanzati e costruire sistemi reattivi.

Nel prossimo capitolo, esploreremo pattern e casi d'uso pratici che combinano Proxy e Reflect per risolvere problemi reali.