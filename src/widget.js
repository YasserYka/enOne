const fs = require('fs');

const FileNotFound = require('./errors/FileNotFound');
const WidgetNotCompiled = require('./errors/WidgetNotCompiled');

const WIDGETS_DIRECTORY = __dirname + "/../enOne-widgets/widgets";
const CONFIG_FILE = 'config.json';
const COMPILED_FILE = 'compiled.js';
const INDEX_FILE = 'index.js';

module.exports = class Widget {

    constructor(widgetName){

        this.errors = [];
        this.widgetName = widgetName;
        this.widgetDirectoryPath = `${WIDGETS_DIRECTORY}/${this.widgetName}`;
        this.configPath = `${this.widgetDirectoryPath}/${CONFIG_FILE}`;

        if (!fs.existsSync(this.configPath))
            this.errors.push(new FileNotFound(this.configPath));

        this.indexFilePath = `${this.widgetDirectory}/${INDEX_FILE}`;

        if(!fs.existsSync(this.indexFilePath))
            this.errors.push(new FileNotFound(this.indexFilePath));

        this.compiledFilePath = `${this.widgetDirectoryPath}/${COMPILED_FILE}`;
        this.compiled = false;
        this.object = null;

        if (fs.existsSync(this.compiledFilePath)){
            
            this.object = new (require(this.compiledFilePath));
            this.compiled = true;
        }
    }

    get isValid() {
        
        return this.errors.length == 0;
    }

    get name() {

        return this.widgetName;
    }

    get instance() {

        return this.object;
    }

    get config() {

        return require(this.configPath);
    }

    get isCompiled() {

        return this.compiled;
    }

    get error() {

        return this.errors.join();
    }

    get widgetDirectory() {

        return this.widgetDirectoryPath;
    }

}