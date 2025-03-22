from PyQt5.QWidgets import *
hello=QApplication([])
finestra=QMainWindow()
label=QLabel('Hello World!')
finestra.setCentralWidget(label)
finestra.show()
hello.exec_()