const fs = require('fs');

const PLUGINS_FOLDER = __dirname + '/compiled';

const loadAndInstantiatePlugins = () => {
    
    const filenames = fs.readdirSync(PLUGINS_FOLDER);

    const plugins = filenames.map(filename => loadPlugin(filename));

    return plugins;
}

const loadPlugin = filename => {

    const Plugin = require(`${PLUGINS_FOLDER}/${filename}`);
    const config = require(`${PLUGINS_FOLDER}/${filename}`);

    return {
        object: new Plugin(),
        config: config,
        name: filename
    };
}

module.exports = {
    loadAllPlugins: loadAndInstantiatePlugins,
    loadPlugin: loadPlugin
};