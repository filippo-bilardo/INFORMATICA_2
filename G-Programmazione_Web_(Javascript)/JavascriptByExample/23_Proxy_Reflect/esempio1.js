// Proxy e Reflect in JavaScript - Esempio 1: Proxy di base e trappole fondamentali

/**
 * Questo esempio mostra l'utilizzo base dei Proxy in JavaScript
 * e le trappole fondamentali come get, set, has e deleteProperty.
 */

console.log('=== PROXY DI BASE E TRAPPOLE FONDAMENTALI ===');

// Oggetto target che verrà virtualizzato dal proxy
const persona = {
  nome: 'Mario',
  cognome: 'Rossi',
  età: 30
};

// Creazione di un proxy con trappole fondamentali
const personaProxy = new Proxy(persona, {
  // Trappola per intercettare l'accesso alle proprietà
  get(target, proprietà, receiver) {
    console.log(`Accesso alla proprietà: ${proprietà}`);
    
    // Utilizziamo Reflect per eseguire l'operazione predefinita
    return Reflect.get(target, proprietà, receiver);
  },
  
  // Trappola per intercettare l'assegnazione di valori
  set(target, proprietà, valore, receiver) {
    console.log(`Impostazione della proprietà ${proprietà} al valore: ${valore}`);
    
    // Utilizziamo Reflect per eseguire l'operazione predefinita
    return Reflect.set(target, proprietà, valore, receiver);
  },
  
  // Trappola per intercettare l'operatore 'in'
  has(target, proprietà) {
    console.log(`Verifica se esiste la proprietà: ${proprietà}`);
    return Reflect.has(target, proprietà);
  },
  
  // Trappola per intercettare l'operatore 'delete'
  deleteProperty(target, proprietà) {
    console.log(`Eliminazione della proprietà: ${proprietà}`);
    return Reflect.deleteProperty(target, proprietà);
  }
});

// Esempi di utilizzo
console.log('\n--- Accesso alle proprietà ---');
console.log(`Nome: ${personaProxy.nome}`);
console.log(`Cognome: ${personaProxy.cognome}`);

console.log('\n--- Modifica delle proprietà ---');
personaProxy.età = 31;
console.log(`Nuova età: ${personaProxy.età}`);

console.log('\n--- Aggiunta di nuove proprietà ---');
personaProxy.professione = 'Sviluppatore';
console.log(`Professione: ${personaProxy.professione}`);

console.log('\n--- Verifica dell\'esistenza di proprietà ---');
console.log(`'nome' in personaProxy: ${'nome' in personaProxy}`);
console.log(`'indirizzo' in personaProxy: ${'indirizzo' in personaProxy}`);

console.log('\n--- Eliminazione di proprietà ---');
delete personaProxy.professione;
console.log(`'professione' in personaProxy dopo l'eliminazione: ${'professione' in personaProxy}`);

// Confronto con l'oggetto originale
console.log('\n--- Confronto con l\'oggetto originale ---');
console.log('Oggetto originale:', persona);
console.log('Proxy:', personaProxy);

/**
 * Nota: Il proxy è una "vista virtuale" sull'oggetto originale.
 * Qualsiasi modifica fatta attraverso il proxy si riflette sull'oggetto originale
 * e viceversa, a meno che non si implementi una logica personalizzata nelle trappole.
 */