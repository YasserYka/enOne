const PluginManager = require('./pluginManager');

(() => {
   
    PluginManager.load();

    PluginManager.initiateAll();

})();
