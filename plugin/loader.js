const fs = require('fs');

const PLUGINS_FOLDER = __dirname + '/compiled';

const loadAndInstantiatePlugins = () => {
    
    // get filesname of plugin files
    const filenames = fs.readdirSync(PLUGINS_FOLDER);

    // map file name into object
    const plugins = filenames.map(filename => require(`${PLUGINS_FOLDER}/${filename}`));

    // instantiate each plugin
    return plugins.map(Plugin => new Plugin());
}

module.exports = {
    load: loadAndInstantiatePlugins
};