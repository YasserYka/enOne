const fs = require('fs');

const OUTPUT_DIRECTORY_PATH = __dirname + "../../output/";

(() => {
    const args = process.argv.slice(2);

    if (args == 0)
        throw new Error("Please enter filename as argument")

    const filename = args[0];
    const filepath = resolve(OUTPUT_DIRECTORY_PATH + filename);

    if (!fs.existsSync(filepath))
        throw new Error(`File name ${filename} dose not exists in ${filepath}`)

    setupWindow(filepath); 

})();

const setupWatcher = (window, filepath) => {

    fs.watch(filepath).on('change', () => {

        exec("babel", (err, stdout, stderr) => {
            
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