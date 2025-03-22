#!/usr/bin/env python3

from threading import Thread, Event
from urllib.request import urlopen
from tkinter import Tk, Button
from tkinter.ttk import Progressbar

class DownloadThread(Thread):
    def __init__(self):
        super().__init__()
        self.read_percentage = 0
        self.event = Event()

    def stop(self):
        self.event.set()

    def run(self):
        with urlopen("https://wordpress.org/latest.tar.gz") as request:
            with open('latest.tar.gz', 'wb') as tarball:
                tarball_size = int(request.getheader('Content-Length'))
                chunk_size = 1024
                readed_chunks = 0

                while True:
                    chunk = request.read(chunk_size)
                    if not chunk or self.event.is_set():
                        break


                    readed_chunks += 1
                    self.read_percentage = 100 * chunk_size * readed_chunks / tarball_size

                    tarball.write(chunk)


class WordPressDownloader(Tk):
    def __init__(self, download_thread, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.download_thread = download_thread

        self.title('Wordpress Downloader')
        self.geometry("300x50")
        self.resizable(False, False)

        # The progressbar widget
        self.progressbar = Progressbar(self)
        self.progressbar.pack(fill='x', padx=10)

        # The button widget
        self.button = Button(self, text='Download', command=self.handle_download)
        self.button.pack(padx=10, pady=3, anchor='e')

        self.download_thread = download_thread
        self.protocol('WM_DELETE_WINDOW', self.on_window_delete)

    def update_progress_bar(self):
        if self.download_thread.is_alive():
            self.progressbar.config(value=self.download_thread.read_percentage)
            self.after(100, self.update_progress_bar)

    def handle_download(self):
      self.download_thread.start()
      self.update_progress_bar()

    def on_window_delete(self):
        if self.download_thread.is_alive():
            self.download_thread.stop()
            self.download_thread.join()

        self.destroy()


if __name__ == '__main__':
    download_thread = DownloadThread()
    app = WordPressDownloader(download_thread)
    app.mainloop()
