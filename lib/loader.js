const fs = require('fs');
const { color } = require('./util');
const Plugin = require('./widget');
const { resolve } = require('path');
const { transform } = require('./compile');

const PLUGINS_SUBMODULE_DIRECTORY = resolve(__dirname + "/../enOne-plugins/plugins");
const COMPILED_PLUGINS_DIRECTORU = resolve(__dirname + "/../output/compiled");

const load = pluginName => {

    const configPath = `${PLUGINS_SUBMODULE_DIRECTORY}/${pluginName}/config.json`; 

    if (!fs.existsSync(configPath))
        return new Error(color.red("Couldn't find plugin's config file for plugin " + pluginName + " at " + configPath));

    const config = require(configPath);
        
    const pluginPath = `${COMPILED_PLUGINS_DIRECTORU}/${pluginName}.js`;

    if (!fs.existsSync(pluginPath)){
        
        const rawWidgetPath = `${PLUGINS_SUBMODULE_DIRECTORY}/${pluginName}/config.json`;

        if (!fs.existsSync(rawWidgetPath))
            return new Error(color.red("Couldn't find plugin's main file in " + pluginPath + " please make sure to have identical folder and main name of plugin"));

        transform(rawWidgetPath, widgetName);
    }

    const pluginInstance = new (require(pluginPath));  

    return new Plugin(pluginName, pluginInstance, config);
}

module.exports = {
    loadWidget: load,
};