const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const { resolve } = require('path');
const { transform } = require('../src/compile');

const createWindow = () => {

    const window = new BrowserWindow({
        width: 1200,
        height: 1000,
        webPreferences: {
            nodeIntegration: true,
            additionalArguments: [WIDGET_NAME]
        },
        darkTheme: true,
    });

    window.setMenuBarVisibility(false);

    window.loadFile(HTML_DEVELOPMENT_PATH);

    window.webContents.openDevTools();

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

const setupWatcher = (window)  => {

    transform(WIDGET_DIRECTORY_PATH + '/index.js', COMPILED_WIDGET_PATH, () =>  { 

        window.loadFile(HTML_DEVELOPMENT_PATH);
    });

    fs.watch(WIDGET_DIRECTORY_PATH + '/index.js').on('change', () => {

        transform(WIDGET_DIRECTORY_PATH + '/index.js', COMPILED_WIDGET_PATH, () => { 

            window.loadFile(HTML_DEVELOPMENT_PATH);
        });

    });
}

const HTML_DEVELOPMENT_PATH = __dirname + '/development.html';

const args = process.argv.slice(2);

if (args == 0)
    throw new Error("Please enter widget name as argument")

const WIDGET_NAME = args[0];

const WIDGET_DIRECTORY_PATH = resolve(`${__dirname}/../enOne-widgets/widgets-dev/${WIDGET_NAME}`);
const COMPILED_WIDGET_PATH = WIDGET_DIRECTORY_PATH + '/compiled.js';

if (!fs.existsSync(WIDGET_DIRECTORY_PATH))
    throw new Error(`Widget name ${WIDGET_NAME} does not exists in ${WIDGET_DIRECTORY_PATH}`)

setupWindow(); 
