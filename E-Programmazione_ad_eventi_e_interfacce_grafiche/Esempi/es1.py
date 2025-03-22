import tkinter as tk

root = tk.Tk()
toolbar = tk.Frame(root)
open_button = tk.Button(toolbar, text="Apri")
save_button = tk.Button(toolbar, text="Salva")
open_button.pack(side="left")
save_button.pack(side="left")
toolbar.pack(side="top", fill="x")
root.mainloop()


