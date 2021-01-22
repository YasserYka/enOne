const fs = require('fs');

const PLUGINS_FOLDER = __dirname + '/examples';

const load = () => {

    const plugins = getPlugins();


}

const loadPlugin = filename => {

    return require(filename);
}

const getPlugins = () => {

    return fs.readdirSync(PLUGINS_FOLDER);
}

const initPlugins = plugins => {

    plugins.forEach(plugin => plugin.init());
}