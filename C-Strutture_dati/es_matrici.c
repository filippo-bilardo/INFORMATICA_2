/**
 * Scopo: Esercizi su matrici di interi (argomento 3° anno).
 * Scrivere funzioni "caricaRandom, caricaTastiera, stampa, ordina, ricercaConSentinella" con parametri: vettore e sua dimensione, eventuali altri parametri.
 * Chiamare le funzioni carica e stampa per gestire tutta la matrice per righe; le funzioni ordina e ricerca su una riga indicata dall'utente
 * Scrivere le funzioni "caricaCol, stampaCol, ricercaCol" con parametri matrice, dimensioni (R e C), indice di colonna e eventuali altri parametri.
 * Chiamare le funzioni carica e stampa per gestire tutta la matrice per colonne; la funzione ricerca su una colonna indicata dall'utente
 * Scrivere la funzione "cercaMassimo e cercaMinimo" con parametri matrice e dimensioni
 * 
 */

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define R 3
#define C 4

void caricaRandom(int matrice[R][C]);
void caricaTastiera(int matrice[R][C]);
void stampa(int matrice[R][C]);
void ordina(int matrice[R][C], int riga);
void ricercaConSentinella(int matrice[R][C], int riga, int valore);
void caricaCol(int matrice[R][C], int colonna);
void stampaCol(int matrice[R][C], int colonna);
void ricercaCol(int matrice[R][C], int colonna, int valore);
void cercaMassimo(int matrice[R][C]);
void cercaMinimo(int matrice[R][C]);

