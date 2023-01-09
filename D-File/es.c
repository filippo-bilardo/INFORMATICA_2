//Intestazione
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define NOME_FILE "record.bin"
#define DIM_COGNOME 30
#define NUM_VOTI 8

// Struttura per i record del file
typedef struct {
	char cognome[DIM_COGNOME];
	int giorno;
	int mese;
	int anno;
	int voti[NUM_VOTI];
} Record;

// Funzione per inserire n record in coda al file
void inserisciRecord(char fileName[], int numRecord) {
	FILE* fp;

	// Apre il file in modalità append
	fp = fopen(fileName, "ab");
	if (fp == NULL) {
		printf("Errore nell'apertura del file\n");
		exit(1);
	}

	// Inserisce i record richiesti
	for (int i = 0; i < numRecord; i++) {
		Record record;
		printf("Inserisci il cognome: ");
		scanf("%s", record.cognome);

		printf("Inserisci il giorno di nascita: ");
		scanf("%d", &record.giorno);

		printf("Inserisci il mese di nascita: ");
		scanf("%d", &record.mese);

		printf("Inserisci l'anno di nascita: ");
		scanf("%d", &record.anno);

		printf("Inserisci i voti (8): ");
		for (int j = 0; j < NUM_VOTI; j++) {
			scanf("%d", &record.voti[j]);
		}

		// Scrive il record nel file
		fwrite(&record, sizeof(Record), 1, fp);
	}

	fclose(fp);
}

// Funzione per stampare tutte le informazioni contenute nel file
void stampaFile(char fileName[]) {
	FILE* fp;

	// Apre il file in modalità lettura
	fp = fopen(fileName, "rb");
	if (fp == NULL) {
		printf("Errore nell'apertura del file\n");
		exit(1);
	}

	// Legge tutti i record presenti nel file e li stampa
	while (1) {
		Record record;
		int num_letti = fread(&record, sizeof(Record), 1, fp);
		if (num_letti != 1) break;

		printf("Cognome: %s\n", record.cognome);
		printf("Data di nascita: %d/%d/%d\n", record.giorno, record.mese, record.anno);
		printf("Voti: ");
		for (int i = 0; i < NUM_VOTI; i++) {
			printf("%d ", record.voti[i]);
		}
		printf("\n");
	}

	fclose(fp);
}

// Funzione per visualizzare e correggere le informazioni di un record
int correggiRecord(char fileName[], int posizione) {
	FILE* fp;

	// Apre il file in modalità lettura/scrittura
	fp = fopen(fileName, "r+b");
	if (fp == NULL) {
		printf("Errore nell'apertura del file\n");
		return -1;
	}

	// Si posiziona alla posizione del record
	fseek(fp, posizione * sizeof(Record), SEEK_SET);

	// Legge il record e lo stampa
	Record record;
	int num_letti = fread(&record, sizeof(Record), 1, fp);
	if (num_letti != 1) {
		printf("Errore nella lettura del record\n");
		return -1;
	}
	printf("Cognome: %s\n", record.cognome);
	printf("Data di nascita: %d/%d/%d\n", record.giorno, record.mese, record.anno);
	printf("Voti: ");
	for (int i = 0; i < NUM_VOTI; i++) {
		printf("%d ", record.voti[i]);
	}
	printf("\n");

	// Chiede all'utente di inserire i nuovi dati
	printf("Inserisci il nuovo cognome: ");
	scanf("%s", record.cognome);

	printf("Inserisci il nuovo giorno di nascita: ");
	scanf("%d", &record.giorno);

	printf("Inserisci il nuovo mese di nascita: ");
	scanf("%d", &record.mese);

	printf("Inserisci il nuovo anno di nascita: ");
	scanf("%d", &record.anno);

	printf("Inserisci i nuovi voti (8): ");
	for (int i = 0; i < NUM_VOTI; i++) {
		scanf("%d", &record.voti[i]);
	}

	// Si posiziona nuovamente alla posizione del record e lo scrive nel file
	fseek(fp, posizione * sizeof(Record), SEEK_SET);
	fwrite(&record, sizeof(Record), 1, fp);

	fclose(fp);
	return 0;
}

// Funzione per contare il numero di record presenti nel file
int numeroRecord(char fileName[]) {
	FILE* fp;

	// Apre il file in modalità lettura
	fp = fopen(fileName, "rb");
	if (fp == NULL) {
		printf("Errore nell'apertura del file\n");
		return -1;
	}

	// Conta il numero di record presenti nel file
	int num_record = 0;
	while (1) {
		Record record;
		int num_letti = fread(&record, sizeof(Record), 1, fp);
		if (num_letti != 1) {
			break;
		}
		num_record++;
	}

	fclose(fp);
	return num_record;
}

int main() {
	// Nome del file di record
	char fileName[] = NOME_FILE;

	int scelta;
	do {
		// Mostra il menu all'utente
		printf("Menu:\n");
		printf("1. Inserisci nuovo record\n");
		printf("2. Stampa tutti i record\n");
		printf("3. Ricerca record per cognome\n");
		printf("4. Stampa record in posizione specifica\n");
		printf("5. Correggi record in posizione specifica\n");
		printf("6. Conta il numero di record\n");
		printf("7. Esci\n");
		printf("Scelta: ");
		scanf("%d", &scelta);

		switch (scelta) {
		case 1: {
			// Inserisci nuovo record
			int numRecord;
			printf("Inserisci il numero di record da inserire: ");
			scanf("%d", &numRecord);
			inserisciRecord(fileName, numRecord);
			break;
		}
		case 2: {
			// Stampa tutti i record
			stampaFile(fileName);
			break;
		}
		case 3: {
			// Ricerca record per cognome
			char cognome[DIM_COGNOME];
			printf("Inserisci il cognome da cercare: ");
			scanf("%s", cognome);
			int posizione = ricercaRecord(fileName, cognome);
			if (posizione == -1) {
			printf("Record non trovato\n");
			}
			break;
		}
		case 4: {
			// Stampa record in posizione specifica
			int posizione;
			printf("Inserisci la posizione del record da stampare: ");
			scanf("%d", &posizione);
			int esito = stampaRecord(fileName, posizione);
			if (esito == -1) {
			printf("Record non trovato\n");
			}
			break;
		}
		case 5: {
			// Correggi record in posizione specifica
			int posizione;
			printf("Inserisci la posizione del record da correggere: ");
			scanf("%d", &posizione);
			int esito = correggiRecord(fileName, posizione);
			if (esito == -1) {
			printf("Record non trovato\n");
			}
			break;
		}
		case 6: {
			// Conta il numero di record
			int num_record = numeroRecord(fileName);
			printf("Numero di record presenti nel file: %d\n", num_record);
			break;
		}
		case 7: {
			// Esci
			break;
		}
		default: default: {
			printf("Scelta non valida\n");
			break;
		}
	}
}