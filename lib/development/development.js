const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const { exec } = require('child_process');
const { resolve } = require('path');
const { transform } = require('../babel');
const babel = require('../babel');

const OUTPUT_DIRECTORY_PATH = __dirname + "/../../output";
const HTML_DEVELOPMENT_PATH = __dirname + '/development.html';
const COMPILED_PLUGINS_PATH = OUTPUT_DIRECTORY_PATH + '/compiled';
let PLUGIN_NAME;
let PLUGIN_DIRECTORY_PATH;

const createWindow = () => {

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

        setupWatcher(window);
    });
}

const setupWindow = () => {
    
    app.whenReady().then(() => 
        createWindow()
    );

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin')
            app.quit()
    });
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
}

const setupWatcher = (window) => {

    transform(PLUGIN_DIRECTORY_PATH + PLUGIN_NAME + '.js', COMPILED_PLUGINS_PATH, loadHtmlAndSendIPCEvent, window);

    fs.watch(PLUGIN_DIRECTORY_PATH + PLUGIN_NAME + '.js').on('change', () => {

        transform(PLUGIN_DIRECTORY_PATH + PLUGIN_NAME + '.js', COMPILED_PLUGINS_PATH, loadHtmlAndSendIPCEvent, window);
    });
}

loadHtmlAndSendIPCEvent = (window) => {

    window.loadFile(HTML_DEVELOPMENT_PATH);
    window.webContents.send('watcher-triggered', PLUGIN_NAME);
}

(() => {
    const args = process.argv.slice(2);

    if (args == 0)
        throw new Error("Please enter plugin name as argument")

    PLUGIN_NAME = args[0];
    PLUGIN_DIRECTORY_PATH = resolve(`${OUTPUT_DIRECTORY_PATH}/${PLUGIN_NAME}`);
    
    if (!fs.existsSync(PLUGIN_DIRECTORY_PATH))
        throw new Error(`Plugin name ${PLUGIN_NAME} dose not exists in ${PLUGIN_DIRECTORY_PATH}`)

    setupWindow(); 

})();
