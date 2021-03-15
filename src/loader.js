const fs = require('fs');
const Widget = require('./widget');
const { resolve } = require('path');
const { transform } = require('./compile');

const WIDGETS_SUBMODULE_DIRECTORY = resolve(__dirname + "/../enOne-widgets/widgets");
const COMPILED_WIDGETS_DIRECTORU = resolve(__dirname + "/../output");

const load = widgetName => {

    const configPath = `${WIDGETS_SUBMODULE_DIRECTORY}/${widgetName}/config.json`; 

    if (!fs.existsSync(configPath))
        return new Error("Couldn't find widget's config file for widget " + widgetName + " at " + configPath);

    const config = require(configPath);
        
    const widgetPath = `${COMPILED_WIDGETS_DIRECTORU}/${widgetName}.js`;

    if (!fs.existsSync(widgetPath))
        return new Error("Couldn't find compiled widget file");

    const widgetInstance = new (require(widgetPath));  

    return new Widget(widgetName, widgetInstance, config);
}

const listLocal = () => {

    if (!fs.existsSync(WIDGETS_SUBMODULE_DIRECTORY))
        return new Error("Couldn't find widget directory: " + WIDGETS_SUBMODULE_DIRECTORY);
    
    const widgetNames = fs.readdirSync(WIDGETS_SUBMODULE_DIRECTORY);

    return widgetNames;
}

module.exports = {
    listLocal: listLocal,
    loadWidgetByName: load
};