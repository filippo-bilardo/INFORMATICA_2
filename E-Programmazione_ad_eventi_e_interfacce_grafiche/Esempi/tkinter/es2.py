### crea una finestra con un'etichetta che mostra il testo "Hello World!",
#  e l'etichetta viene posizionata nella finestra utilizzando 
# il metodo pack(). 
# Infine, si avvia il ciclo di attesa degli eventi con root.mainloop()

import tkinter

# Creare la finestra principale
root = tkinter.Tk()

# Creare una etichetta
label = tkinter.Label(root, text="Hello World!")
# posizionare l'etichetta nella finestra
label.pack()

# Avviare il ciclo di attesa degli eventi
root.mainloop()