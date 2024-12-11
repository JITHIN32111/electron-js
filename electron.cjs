const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: true
    }
  })

  win.loadFile(path.join(__dirname, 'dist', 'index.html'))

  // Open DevTools
  win.webContents.openDevTools()

  // Handle the autofill error by disabling autofill or suppressing it
  win.webContents.session.setPreloads([path.join(__dirname, 'disableAutofill.js')])
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
