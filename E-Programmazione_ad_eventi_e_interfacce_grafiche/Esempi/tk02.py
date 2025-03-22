import tkinter as tk
import tkinter.font as tkFont

class App:
    def __init__(self, root):
        #setting title
        root.title("undefined")
        #setting window size
        width=600
        height=500
        screenwidth = root.winfo_screenwidth()
        screenheight = root.winfo_screenheight()
        alignstr = '%dx%d+%d+%d' % (width, height, (screenwidth - width) / 2, (screenheight - height) / 2)
        root.geometry(alignstr)
        root.resizable(width=False, height=False)

        GButton_690=tk.Button(root)
        GButton_690["bg"] = "#f0f0f0"
        ft = tkFont.Font(family='Times',size=10)
        GButton_690["font"] = ft
        GButton_690["fg"] = "#000000"
        GButton_690["justify"] = "center"
        GButton_690["text"] = "Button"
        GButton_690.place(x=360,y=130,width=70,height=25)
        GButton_690["command"] = self.GButton_690_command

        GCheckBox_775=tk.Checkbutton(root)
        ft = tkFont.Font(family='Times',size=10)
        GCheckBox_775["font"] = ft
        GCheckBox_775["fg"] = "#333333"
        GCheckBox_775["justify"] = "center"
        GCheckBox_775["text"] = "CheckBox"
        GCheckBox_775.place(x=360,y=160,width=70,height=25)
        GCheckBox_775["offvalue"] = "0"
        GCheckBox_775["onvalue"] = "1"
        GCheckBox_775["command"] = self.GCheckBox_775_command

        GMessage_855=tk.Message(root)
        ft = tkFont.Font(family='Times',size=10)
        GMessage_855["font"] = ft
        GMessage_855["fg"] = "#333333"
        GMessage_855["justify"] = "center"
        GMessage_855["text"] = "Message"
        GMessage_855.place(x=130,y=120,width=80,height=25)

    def GButton_690_command(self):
        print("command")


    def GCheckBox_775_command(self):
        print("command")

if __name__ == "__main__":
    root = tk.Tk()
    app = App(root)
    root.mainloop()
