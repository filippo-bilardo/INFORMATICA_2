/**************************************************************************************************************
* @brief GESTIONE DEI FILE BINARI                                                                             *
* <specifiche del progetto>                                                                                   *
* <specifiche del collaudo>                                                                                   *
* @author SIMONE ACCONCIA 4^H                                                                                 *
* @date 19/01/2023	                                                                                          *
*/

#include <iostream>	
#include <math.h>		
using namespace std;

class Rettangolo
{
	private:
	double base;
	double altezza;
	
	public: 
	
	//metodi costruttori
	
	Rettangolo()	//inizializza gli attributi privati ad uno
	{
		base=1;
		altezza=1;
	}
	
	Rettangolo(double b ,double a)
	{
		base=b;
		altezza=a;
	}
	
	//metodi get e setter
	
	void SetAltezza(double a)
	{
		altezza =a;
	}
	
	void SetBase(double b)
	{
		base = b;
	}
	
	
	double GetAltezza ()
	{
		return altezza;
	}
	
	double GetBase ()
	{
		return base; 
	}
	
	//metodi per calcolare area,perimetro,diagonale
	
	double CalcolaPerimetro() //USO GLI ATTRIBUTI E NON PARAMETRI  perchè lavoro sugli oggetti
	{
		return (altezza)*2+(base)*2;
	}
	
	double CalcolaArea()
	{
		return (base*altezza);
	}
	
	double calcolaDiagonale()
	{
		return sqrt(base*base+altezza*altezza);
	}
	
};


int main()
{
	Rettangolo r1;
	//Rettangolo r2;
	//double r;
	
	r1.SetAltezza(5);
	r1.SetBase(12);

	cout<<"base del primo rettangolo:"<<r1.GetBase()<<endl;
	cout<<"altezza del primo rettangolo:"<<r1.GetAltezza()<<endl;
	cout<<"inserisci base:"<<endl;
	cin>>b;
	cout<<"inserisci altezza"<<endl;
	cin>>a;
	Rettangolo r2(b,a);
	cout<<"base del secondo  rettangolo:"<<r2.GetBase()<<endl;
	cout<<"altezza del secondo rettangolo:"<<r2.GetAltezza()<endl;
}
