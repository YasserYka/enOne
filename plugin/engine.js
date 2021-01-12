import generatefile from './generatefile.js';
import boilerplate from './html/boilerplate.js';
import browser from './browser.js';
import environment from './environment.js';
import  fs from 'fs';
import preprocessor from './release/preprocessor.js';

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

export default {
    engine: engine
};