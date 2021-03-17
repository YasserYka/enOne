const fs = require('fs');
const Widget = require('./widget');

// loads compiled file of widget and config file from enOne-widgets folder
const loadWidget = (widgetsDirectory, widgetDirectoryName) => {
 
    const widgetPath = `${widgetsDirectory}/${widgetDirectoryName}`;
    
    const config = require(`${widgetPath}/config.json`);
        
    const compiledWidgetPath = widgetPath + '/compiled.js';

    if (!fs.existsSync(compiledWidgetPath))
        return new Error('Couldn\'t find compiled widget file for ' + widgetDirectoryName + ' at ' + widgetPath);

    const widgetInstance = new (require(compiledWidgetPath));  

    return new Widget(widgetName, widgetInstance, config);
}

const getWidgetsInformation = () => {

    const widgetsDirectory = __dirname + '/../enOne-widgets/widgets';

    if (!fs.existsSync(widgetsDirectory))
        throw new Error('Couldn\'t find widget directory: ' + widgetsDirectory);
    
    const widgetsInfo = [];

    fs.readdirSync(widgetsDirectory).forEach(directoryName => {

        const widgetPath = `${widgetsDirectory}/${directoryName}`;
        const packageJSONPath = widgetPath + '/package.json';

        if (!fs.existsSync(widgetPath + '/config.json'))
            console.error('Widget\'s config.json file dose not exists for ' + directoryName);
        else if (!fs.existsSync(widgetPath + '/index.js'))
            console.error('Widget\'s index.js file dose not exists for ' + directoryName);
        else if (!fs.existsSync(packageJSONPath))
            console.error('Widget\'s package.json file dose not exists for ' + directoryName);
        else 
            widgetsInfo.push({
                directoryName: directoryName,
                disabled: true,
                version: require(packageJSONPath).version
            });

    });

    return widgetsInfo;
}

module.exports = {
    getWidgetsInformation: getWidgetsInformation,
    loadWidget: loadWidget,
};