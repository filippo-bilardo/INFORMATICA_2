//Esempio con forEach su un Array:
const numeri = [1, 2, 3, 4, 5];
numeri.forEach(function(numero) {
    console.log(numero);
});

//Esempio con forEach su una Map:
const mappa = new Map();
mappa.set('a', 1); mappa.set('b', 2);
mappa.forEach(function(valore, chiave) {
    console.log(chiave, valore);
});

//Esempio con forEach su una NodeList:
const nodi = document.querySelectorAll('p');
nodi.forEach(function(nodo) {
    console.log(nodo.textContent);
});
