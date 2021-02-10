const loader = require("./loader");

module.exports = class PluginManager {
  static load() {
    this.plugins = loader.loadAllPlugins();
  }

  static initiateAll() {

    Promise.all(this.plugins.map( async plugin => {

        this.initiate(plugin);
    }));

  }

  static initiate(plugin) {

    plugin.object.initialize({}).then(() => {

        plugin.object.render().then((renderedPlugin) => {

          plugin.object.script().then(() => {

            let wrappedElement = muuriAdd(renderedPlugin);

            observeElement(wrappedElement);

            console.log("Finished executing " + plugin.object.constructor.name);
          });

        });

    });
  }

  static stop(pluginName) {

  }

  static remove(pluginName) {

    const element = document.getElementById(pluginName);

    this.stop(pluginName);
    muuriRemove(element);
  }

  static add(pluginName) {

    const plugin = loader.loadPlugin(pluginName);

    this.plugins.push(plugin);

    this.initiate(plugin);
  }
};
