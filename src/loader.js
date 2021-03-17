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

    const widgetsDirectory = __dirname + "/../enOne-widgets/widgets";

    if (!fs.existsSync(widgetsDirectory))
        throw new Error("Couldn't find widget directory: " + widgetsDirectory);
    
    const widgetsInfo = [];

    fs.readdirSync(widgetsDirectory).forEach(directoryName => {

        const configPath = `${widgetsDirectory}/${directoryName}/config.json`;

        if (!fs.existsSync(configPath))
            console.error("Widget's config file dose not exists for " + directoryName);
        else {
            const config = require(configPath);

            widgetsInfo.push({
                directoryName: directoryName,
                disabled: true
            });
        }
    });

    return widgetsInfo;
}

module.exports = {
    getWidgetsInformation: getWidgetsInformation,
    loadWidget: loadWidget,
};