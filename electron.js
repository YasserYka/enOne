const { app, BrowserWindow } = require('electron')
const config = require(__dirname + '/config.json');

function createWindow () {
  const window = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      nodeIntegration: true
    },
    darkTheme: true,
  });

  window.setMenuBarVisibility(false);
  window.loadFile('./dashboard/index.html');

  if (config.environment === 'dev')
    window.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()

})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0)
    createWindow();

})