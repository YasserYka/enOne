const fs = require('fs');
const Widget = require('./widget');

// loads compiled file of widget and config file from enOne-widgets folder
const loadWidget = (widgetsDirectory, widgetDirectoryName) => {

    const configPath = `${widgetsDirectory}/${widgetDirectoryName}/config.json`; 

    if (!fs.existsSync(configPath))
        return new Error("Widget's config file dose not exists for " + widgetDirectoryName + " at " + configPath);

    const config = require(configPath);
        
    const widgetPath = `${widgetsDirectory}/compiled.js`;

    if (!fs.existsSync(widgetPath))
        return new Error("Couldn't find compiled widget file for " + widgetDirectoryName + " at " + widgetPath);

    const widgetInstance = new (require(widgetPath));  

    return new Widget(widgetName, widgetInstance, config);
}

const getWidgetsInformation = () => {

    const widgetsDirectory = resolve(__dirname + "/../enOne-widgets/widgets");

    if (!fs.existsSync(widgetsDirectory))
        return new Error("Couldn't find widget directory: " + widgetsDirectory);
    
    const widgetNames = fs.readdirSync(widgetsDirectory);

    return widgetNames;
}

module.exports = {
    getWidgetsInformation: getWidgetsInformation,
    loadWidget: loadWidget,
};