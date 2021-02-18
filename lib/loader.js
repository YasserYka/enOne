const fs = require('fs');
const { color } = require('./util');

const PLUGINS_SUBMODULE_DIRECTORY = __root + "/enOne-plugins/plugins"

const loadAll = () => {
    
    if (!fs.existsSync(PLUGINS_SUBMODULE_DIRECTORY))
        console.error(color.red("Couldn't find plugin directory: " + PLUGINS_SUBMODULE_DIRECTORY));
    else {

        const folderNames = fs.readdirSync(PLUGINS_SUBMODULE_DIRECTORY);

        let plugins = folderNames.map(pluginName => {
         
            const pluginPath = `${PLUGINS_SUBMODULE_DIRECTORY}${pluginName}${pluginName}.js`;

            if (!fs.existsSync(pluginPath))
                console.error(color.red("Couldn't find plugin's main file in " + pluginPath + " please make sure to have identical folder and main name of plugin"));
            else {
                const configPath = `${PLUGINS_SUBMODULE_DIRECTORY}${pluginName}/config.json`; 

                if (!fs.existsSync(configPath))
                    console.error(color.red("Couldn't find plugin's config file for plugin " + pluginName));
                else
                    return loadPlugin(filename)
            }
        });

        // remove undefined values caused by above's map statement
        plugins = plugins.filter(plugin => plugin);

        return plugins;
    }
}

const loadPlugin = filename => {

    if(!fs.existsSync())
    const Plugin = require(`${PLUGINS_FOLDER}/${filename}/${filename}.js`);
    const config = require(`${PLUGINS_FOLDER}/${filename}/config.json`);

    return {
        object: new Plugin(),
        config: config,
        name: filename
    };
}

const loadDevelopmentPlugin = filename => {

    const Plugin = require(`${__dirname}/../output/compiled/${filename}.js`);
    const config = require(`${PLUGINS_FOLDER}/${filename}/config.json`);

    return {
        object: new Plugin(),
        config: config,
        name: filename
    };
}

module.exports = {
    loadAll: loadAll,
    loadPlugin: loadAndInstantiatePlugin,
    loadDevelopmentPlugin: loadAndInstantiateDevelopmentPlugin
};