const fs = require('fs');

const PLUGINS_FOLDER = __dirname + '/../output';

const loadAndInstantiateAllPlugins = () => {
    
    const filenames = fs.readdirSync(PLUGINS_FOLDER);

    const plugins = filenames.map(filename => loadAndInstantiatePlugin(filename));

    return plugins;
}

const loadAndInstantiatePlugin = filename => {

    const Plugin = require(`${PLUGINS_FOLDER}/${filename}/${filename}.js`);
    const config = require(`${PLUGINS_FOLDER}/${filename}/config.json`);

    return {
        object: new Plugin(),
        config: config,
        name: filename
    };
}

const loadAndInstantiateDevelopmentPlugin = filename => {

    const Plugin = require(`${__dirname}/../output/compiled/${filename}.js`);
    const config = require(`${PLUGINS_FOLDER}/${filename}/config.json`);

    return {
        object: new Plugin(),
        config: config,
        name: filename
    };
}

module.exports = {
    loadAllPlugins: loadAndInstantiateAllPlugins,
    loadPlugin: loadAndInstantiatePlugin,
    loadDevelopmentPlugin: loadAndInstantiateDevelopmentPlugin
};