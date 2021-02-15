const loader = require("./loader");

class Manager {

  initiate(plugin) {

    plugin.object.initialize(plugin.config).then(() => {

        plugin.object.render().then((renderedPlugin) => {

          plugin.object.script().then(() => {

            let wrappedElement = muuriAdd(renderedPlugin);

            observeElement(wrappedElement);

            console.log("Finished executing " + plugin.object.constructor.name);
          });

        });

    });
  }

};

module.exports = new Manager();