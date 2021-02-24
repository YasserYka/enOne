const fs = require('fs');
const { color } = require('./util');
const { Plugin } = require('./plugin');

const PLUGINS_SUBMODULE_DIRECTORY = __root + "/enOne-plugins/plugins"

const loadAll = () => {
    
    if (!fs.existsSync(PLUGINS_SUBMODULE_DIRECTORY))
        return new Error(color.red("Couldn't find plugin directory: " + PLUGINS_SUBMODULE_DIRECTORY));
    
    const folderNames = fs.readdirSync(PLUGINS_SUBMODULE_DIRECTORY);

    let plugins = folderNames.map(pluginName => load(pluginName));

    // remove undefined values caused by above's map statement
    plugins = plugins.filter(plugin => plugin);

    return plugins;
}

const load = pluginName => {

    const configPath = `${PLUGINS_SUBMODULE_DIRECTORY}${pluginName}/config.json`; 

    if (!fs.existsSync(configPath))
        return new Error(color.red("Couldn't find plugin's config file for plugin " + pluginName));

    const config = require(configPath);
        
    const pluginPath = `${PLUGINS_SUBMODULE_DIRECTORY}${pluginName}${pluginName}.js`;

    if (!fs.existsSync(pluginPath))
        return new Error(color.red("Couldn't find plugin's main file in " + pluginPath + " please make sure to have identical folder and main name of plugin"));

    const pluginInstance = new (require(pluginPath));  

    return new Plugin(pluginName, pluginInstance, config);
}

module.exports = {
    loadAllPlugins: loadAll,
    loadPlugin: load,
};