const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const { exec } = require('child_process');

const OUTPUT_DIRECTORY_PATH = __dirname + "../../output/";

(() => {
    const args = process.argv.slice(2);

    if (args == 0)
        throw new Error("Please enter plugin name as argument")

    const pluginName = args[0];
    const fileName = pluginName + '.js';

    const filePath = resolve(`${OUTPUT_DIRECTORY_PATH}/${pluginName}/${fileName}`);
    
    if (!fs.existsSync(filePath))
        throw new Error(`Plugin name ${pluginName} dose not exists in ${filePath}`)

    setupWindow(filePath); 

})();

const setupWatcher = (window, filepath) => {

    fs.watch(filepath).on('change', () => {

        exec(`npx babel ${filepath} ${OUTPUT_DIRECTORY_PATH}`, (err, stdout, stderr) => {
            
            console.log(`stdout ${stdout}\nstderr ${stderr}\nerror ${err}`);
        }).on('exit', code => {
              console.log('final exit code is', code);

              window.win.webContents.send('watcher-triggered', null);
        });

        
    });
}

const setupWindow = (filepath) => {
    app.whenReady().then(createWindow, filepath);

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin')
            app.quit()
    });
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow(filepath);
    });
}

const createWindow = filepath => {

    const window = new BrowserWindow({
        width: 1200,
        height: 1000,
        webPreferences: {
            nodeIntegration: true
        },
        darkTheme: true,
    });

    window.setMenuBarVisibility(false);
    window.loadFile(filepath);

    window.webContents.openDevTools();

    window.once('did-finish-load', () => {

        setupWatcher(window, filepath);
    });
}