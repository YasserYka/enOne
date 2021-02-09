const loader = require("./plugin/loader");

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

  static stop(plugin) {}

  static remove(pluginName) {}

  static add(pluginName) {}
};
