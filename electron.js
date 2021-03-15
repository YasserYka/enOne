const { app, BrowserWindow } = require('electron')
const config = require(__dirname + '/config.json');
const got = require('got');

global.__root = __dirname;

function createWindow () {
  const window = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      zoomFactor: 0.8
    },
    darkTheme: true,
  });

  window.setMenuBarVisibility(false);
  window.loadFile('./frontend/index.html');

  if (config.environment === 'dev')
    window.webContents.openDevTools();
}

function updateCheck (currentVersion) {

  got('https://raw.githubusercontent.com/YasserYka/enOne/master/config.json?token=ALEO7DGKQ5QIJIJDZPWSXYLAGVSVU', { json: true }).then(response => {
      const remoteVersion = response.body.version;

      if (currentVersion < remoteVersion)
        console.log("\n\x1b[33mA new version is avaliable, your current version is " + currentVersion + " lates version is " + remoteVersion + "\x1b[0m\n");
      
  }).catch(error => {
    console.log(error.response.body);
  });
}

const currentVersion = config.version;

console.log("\n\x1b[32mVersion " + currentVersion + "\x1b[0m\n");

updateCheck(currentVersion);

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()

})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0)
    createWindow();

})