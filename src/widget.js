const fs = require('fs');
const WIDGETS_DIRECTORY = __dirname + "/../enOne-widgets/widgets";
const CONFIG_FILE = 'config.json';
const COMPILED_FILE = 'compiled.js';
const INDEX_FILE = 'index.js'
const FileNotFound = require('./errors/FileNotFound');
const WidgetNotCompiled = require('./errors/WidgetNotCompiled');

module.exports = class Widget {

    constructor(widgetDirectoryName){
        this.name = widgetDirectoryName;
        this.widgetDirectory = `${WIDGETS_DIRECTORY}/${widgetDirectoryName}`;
        this.configPath = `${this.widgetDirectory}/${CONFIG_FILE}`;
        this.compiledFile = `${this.widgetDirectory}/${COMPILED_FILE}`;
        this.indexFile = `${this.widgetDirectory}/${INDEX_FILE}`;
        this.compiled = true;
        this.error = null;
    }

    get IsValid() {
        if (!fs.existsSync(this.configPath)) {
            this.error = new FileNotFound(this.configPath);
            return false;
        }

        if(!fs.existsSync(this.indexFile)) {
            this.error = new FileNotFound(this.indexFile);
            return false;
        }

        if (!fs.existsSync(this.compiledFile)) {
            this.error = new WidgetNotCompiled(this.name);
            this.compiled = false;
        }


        return true;
    }

    get Name() {
        return this.name;
    }

    get Instance() {
        return new (require(this.compiledFile));
    }

    get Config() {
        return require(this.configPath);
    }

    get IsCompiled() {
        return this.compiled;
    }

    get Error() {
        return this.error;
    }

    get WidgetDirectory() {
        console.log(this.widgetDirectory);
        return this.widgetDirectory;
    }
}