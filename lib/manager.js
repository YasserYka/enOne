const loader = require("./loader");
const got = require("got");
const { exec } = require('child_process');
const { color } = require("./util");
const { transform } = require("./babel");

const PLUGINS_SUBMODULE_DIRECTORY = __root + "/enOne-plugins"

class Manager {

  load() {

    const folderNames = this.listLocal();

    this.plugins = loader.loadAllPlugins(folderNames);
  }

  compileAll() {

    const folderNames = this.listLocal();

    folderNames.forEach(pluginName => {

      const pluginPath = `${PLUGINS_SUBMODULE_DIRECTORY}/${pluginName}/${pluginName}.js`;

      if (!fs.existsSync(pluginPath))
        console.error(color.red("Couldn't find plugin's main file in " + pluginPath + " please make sure to have identical folder and main name of plugin"));
      else {

        transform(pluginPath, __root + "/output/compiled", ()=>console.log(color.blue("Plugin " + pluginName + " was successfully compiled!")))
      }
        
    })
  }

  initiateAll() {

    this.plugins.forEach(plugin => this.initiate(plugin));
  }

  initiate(plugin) {

    plugin.object.initialize(plugin.config).then(() => {

        plugin.object.render().then((renderedPlugin) => {

          plugin.object.script().then(() => {

            let wrappedElement = muuriAdd(renderedPlugin);

            observeElement(wrappedElement);

            console.log(color.green("Finished executing " + plugin.object.constructor.name));
          });

        });

    });
  }

  listLocal() {

    if (!fs.existsSync(PLUGINS_SUBMODULE_DIRECTORY))
      return new Error(color.red("Couldn't find plugin directory: " + PLUGINS_SUBMODULE_DIRECTORY));

    const pluginNames = fs.readdirSync(PLUGINS_SUBMODULE_DIRECTORY);

    return pluginNames;
  }

  // Fetches list of file names via Github API from plugins repository
  listRemote() {
    return got("https://api.github.com/repos/YasserYka/enOne/enOne-plugins/contents/").then(response => {

      if (response.statusCode == 200){

        const contents = JSON.parse(response.body);

        if (!Array.isArray(contents) || files.length == 0)
          return new Error("Github API returned non-valid value");

        const files = contents.map(content => ({
          name: content.name,
          path: content.path
        }));

        return files;
      }
      else
        return new Error("Github API returned non-200 status code");
    }).catch(error => {

      console.error(colors.red(error));
    });
  }

  // pulls latest master version of plugin repository
  pull() {

    exec('git pull',  {
      cwd: PLUGINS_SUBMODULE_DIRECTORY
    }, (err, stdout, stderr) => {
      if (err)
        throw Error(stderr);

      console.log(color.green("Plugins pulled successfully!"));
    }).catch(err => {

      console.error(color.red(err));
    });
  }

  // adds a plugin at runtime
  add(pluginName){ 

    if (this.plugins.some(plugin => pluginName === plugin.name))
      console.log(color.blue("Plugin name " + pluginName + " was already added!"));
    else {

      const plugin = loader.load(pluginName);
      
      if (plugin instanceof Error)
        console.error(color.red("Couldn't instantiate plugin: " + pluginName + "\n" + plugin))
      else {

        this.initiate(plugin);
        this.plugins.push(plugin);

        console.log(color.green("Plugin name " + pluginName + " was added successfully!"));
      }
    }
  }

  // removes a plugin at runtime
  remove(pluginName){ 

    const pluginIndex = this.plugins.findIndex(plugin => plugin.name === pluginName);

    if(pluginIndex === -1)
      console.error(color.red("Couldn't find plugin named " + pluginName));
    else {
      
      // TODO: setInterval might be still running find a workaround

      this.plugins.splice(pluginIndex, 1);
      muuriRemove(pluginName);

      console.log(color.green("Plugin name " + pluginName + " was removed successfully!"));
    }
  }

};

module.exports = new Manager();