// modulo2.js
// Esempio di modulo con export default e named exports

// Named exports (esportazioni con nome)
export const versione = "1.0.0";

export function metodoSecondario() {
  return "Questo è un metodo secondario";
}

// Classe che sarà esportata come default
class ModuloPrincipale {
  constructor(nome) {
    this.nome = nome;
  }
  
  inizializza() {
    console.log(`Modulo ${this.nome} inizializzato con successo!`);
    return true;
  }
  
  elabora(dati) {
    return `Dati elaborati: ${dati.toUpperCase()}`;
  }
}

// Export default - esporta la classe come export principale del modulo
export default ModuloPrincipale;