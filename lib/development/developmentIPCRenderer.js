const { ipcRenderer } = require('electron');
const { loadPlugin } = require('../loader');

console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, filename) => {

  const plugin = loadPlugin(filename);
})