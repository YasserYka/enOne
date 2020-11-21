
const generatefile = require('./html/generatefile');
const boilerplate = require('./html/boilerplate');
const browser = require('./browser');

/**
 * @param {plugin} plugin object
 */
const engine = plugin => {
    
    generatefile.generate(boilerplate.get(plugin._card.toHtml(), plugin._textcolor));

    browser.lanuch(generatefile.getPath());
}

module.exports = {
    engine: engine
};