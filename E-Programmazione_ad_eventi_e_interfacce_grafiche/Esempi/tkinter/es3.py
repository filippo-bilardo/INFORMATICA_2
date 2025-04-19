import tkinter as tk

root = tk.Tk()
toolbar = tk.Frame(root)
open_button = tk.Button(toolbar, text="Open")
save_button = tk.Button(toolbar, text="Save")
open_button.pack(side="left")
save_button.pack(side="left")
toolbar.pack(side="top", fill="x")
root.mainloop()
