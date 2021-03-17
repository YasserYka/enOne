const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const window = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      zoomFactor: 0.8,
    },
    darkTheme: true,
    show: false
  });

  const splash = new BrowserWindow({width: 810, height: 610, transparent: true, frame: false, alwaysOnTop: true});

  splash.loadFile('../frontend/splash.html');

  window.setMenuBarVisibility(false);
  window.loadFile('../frontend/index.html');

  window.once('ready-to-show', () => {

    setTimeout(() => { 
      splash.destroy();
      window.show();  
    }, 5000);
  });
}

if(process.platform === "linux") {
  app.commandLine.appendSwitch('enable-transparent-visuals');
  app.disableHardwareAcceleration();
}

app.on('ready', () => setTimeout(createWindow, 400));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()

})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0)
    createWindow();

})