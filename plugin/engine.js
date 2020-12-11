const generatefile = require('./generatefile');
const boilerplate = require('./html/boilerplate');
const browser = require('./browser');
const environment = require('./environment');
const fs = require('fs');
const preprocessor = require('./release/preprocessor');

const engine = (plugin, env) => {

    environment.RELEASE == env ? release(): test(plugin);
}

const test = plugin => {
    generatefile.generate(boilerplate.get(plugin.toHtml()), environment.TESTING);

    browser.lanuch(generatefile.getPath(environment.TESTING));
}

const release = () => {

    fs.readFile(module.parent.filename, 'utf8', (err, file) => {
        if (err) console.error(err)

        generatefile.generate(preprocessor.preprocess(file), environment.RELEASE);
    });

}

module.exports = {
    engine: engine
};