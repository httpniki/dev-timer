import { app, BrowserWindow } from 'electron'
import path from 'path'

const createWindow = () => {
   const win = new BrowserWindow({
      width: 300,
      height: 300,
      useContentSize: true,
      resizable: false,
      autoHideMenuBar: true,
   })

   win.loadFile(path.join('index.html'))
   win.webContents.openDevTools({ mode: 'detach' })
}

app.whenReady().then(createWindow)
