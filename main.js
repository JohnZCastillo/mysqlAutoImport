const { app, BrowserWindow, ipcMain} = require('electron')
const Excel = require('./excel')

let win;

function createWindow () {
    win = new BrowserWindow({
      resizable: false,
      center: true,
      width: 416,
      height: 565,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
   })
  win.removeMenu(true)
   win.loadFile('index.html')
 }


 
 ipcMain.on('data',(e,item)=>{
   let status = Excel.render(item).then(data => {
    win.webContents.send('asynchronous-message', data);
   }).catch(err => {
    win.webContents.send('asynchronous-message', err);
   })
  
})

 app.whenReady().then(() => {
   createWindow()
 })

