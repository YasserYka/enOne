const fs = require('fs');
const Widget = require('./widget');

// loads compiled file of widget and config file from enOne-widgets folder
const loadWidget = (widgetsDirectory, widgetDirectoryName) => {
 
    const widgetPath = `${widgetsDirectory}/${widgetDirectoryName}`;
    const configPath = widgetPath + "/config.json";

    if (!fs.existsSync(configPath))
        return new FileNotFound(configPath);

    const config = require(configPath);
        
    const compiledWidgetPath = widgetPath + '/compiled.js';
    const indexWidgetPath = widgetPath + '/index.js';

    if (!fs.existsSync(compiledWidgetPath) && fs.existsSync(indexWidgetPath))
        return new WidgetNotCompiled(widgetDirectoryName);

    const widgetInstance = new (require(compiledWidgetPath));  

    return new Widget(widgetDirectoryName, widgetInstance, config);
}

const getWidgetsInformation = () => {

    return fs.readdirSync(widgetsDirectory).map(directoryName => ({
        directoryName: directoryName,
        disabled: true,
        dependeicesInstalled: false
    }));
}

module.exports = {
    getWidgetsInformation: getWidgetsInformation,
    loadWidget: loadWidget,
};