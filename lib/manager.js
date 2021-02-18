const loader = require("./loader");
const got = require("got");
const { exec } = require('child_process');
const { color } = require("./util");

const PLUGINS_SUBMODULE_DIRECTORY = __root + "/enOne-plugins"

class Manager {

  load() {

    this.plugins = loader.loadAll();
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

  // Fetches list of file names via Github API from plugins repository
  list() {
    return got("https://api.github.com/repos/YasserYka/enOne/enOne-plugins/contents/").then(response => {

      if (response.statusCode == 200){

        const contents = JSON.parse(response.body);

        if (!Array.isArray(contents) || files.length == 0)
          throw Error("Github API returned non-valid value");

        const files = contents.map(content => ({
          name: content.name,
          path: content.path
        }));

        return files;
      }
      else
        throw Error("Github API returned non-200 status code");
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
      
      if (!plugin)
        console.error(color.red("Couldn't find plugin named " + pluginName));
      else {

        this.initiate(plugin);
        this.plugins.push(plugin);

        console.log(color.green("Plugin name " + pluginName + " was added successfully!"));
      }
    }
  }

};

module.exports = new Manager();