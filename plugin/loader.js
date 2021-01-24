const fs = require('fs');

const PLUGINS_FOLDER = __dirname + '/examples';

const load = () => {

    const plugins = getPlugins();


}

const loadPlugin = filename => {

    return require(`${PLUGINS_FOLDER}/${filename}`);
}

const getPlugins = () => {

    let plugins = getFilenamesIn(PLUGINS_FOLDER).map(filename => loadPlugin(filename));

    console.log(plugins);
}


const getFilenamesIn = dir => {

    return fs.readdirSync(PLUGINS_FOLDER);
}

const initPlugins = plugins => {

    plugins.forEach(plugin => plugin.init());
}

getPlugins();