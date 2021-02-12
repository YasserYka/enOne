const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const { exec } = require('child_process');
const { resolve } = require('path');
const { transform } = require('../babel');
const babel = require('../babel');

const OUTPUT_DIRECTORY_PATH = __dirname + "/../../output";
const HTML_DEVELOPMENT_PATH = __dirname + '/development.html';

const createWindow = filePath => {

    const window = new BrowserWindow({
        width: 1200,
        height: 1000,
        webPreferences: {
            nodeIntegration: true
        },
        darkTheme: true,
    });

    window.setMenuBarVisibility(false);

    window.loadFile(HTML_DEVELOPMENT_PATH);

    window.webContents.openDevTools();

    window.webContents.once('did-finish-load', () => {

        setupWatcher(window, filePath);
    });
}

const setupWindow = (filePath) => {
    
    app.whenReady().then(() => 
        createWindow(filePath)
    );

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin')
            app.quit()
    });
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow(filePath);
    });
}

const setupWatcher = (window, filePath) => {

    transform(filePath, OUTPUT_DIRECTORY_PATH, loadHtmlAndSendIPCEvent);

    fs.watch(filePath).on('change', () => {

        transform(filePath, OUTPUT_DIRECTORY_PATH, loadHtmlAndSendIPCEvent);

    });
}

loadHtmlAndSendIPCEvent = (window, pluginName) => {

    window.loadFile(HTML_DEVELOPMENT_PATH);
    window.webContents.send('watcher-triggered', pluginName);
}

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
