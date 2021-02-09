const loader = require('./plugin/loader');

module.exports = class PluginManager {

    static load(){

        this.plugins = loader.loadAllPlugins();
    }

    static initiateAll(){

    }

    static initiate(plugin){

    }

    static stop(plugin){

    }

    static remove(pluginName){

    }

    static add(pluginName){

    }

}