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

        this.indexFile = `${this.widgetDirectory}/${INDEX_FILE}`;

        if(!fs.existsSync(this.indexFile))
            this.errors.push(new FileNotFound(this.indexFile));

        this.compiledFilePath = `${this.widgetDirectoryPath}/${COMPILED_FILE}`;
        this.compiled = false;
        this.instance = null;

        if (fs.existsSync(this.compiledFilePath)){
            
            this.instance = new (require(this.compiledFilePath));
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

        return this.instance;
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

    get widgetDirectoryPath() {

        return this.widgetDirectoryPath;
    }
}