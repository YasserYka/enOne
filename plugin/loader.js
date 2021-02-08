const fs = require('fs');

const PLUGINS_FOLDER = __dirname + '/compiled';

const loadAndInstantiatePlugins = () => {
    
    const filenames = fs.readdirSync(PLUGINS_FOLDER);

    const plugins = filenames.map(filename => loadPlugin(filename));

    return plugins;
}

const loadPlugin = filename => {

    return {
        object: new require(`${PLUGINS_FOLDER}/${filename}/${filename}.js`),
        config: require(`${PLUGINS_FOLDER}/${filename}/config.json`),
        name: filename
    };
}

module.exports = {
    loadAllPlugins: loadAndInstantiatePlugins,
    loadPlugin: loadPlugin
};