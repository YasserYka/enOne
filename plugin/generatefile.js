const fs = require('fs');
const environment = require('./environment.js');
const { dirname } = require('path');
const { fileURLToPath } = require('url');

const FILE_PATH = dirname(fileURLToPath(import.meta.url)) + '/development/';
const GENERATED_HTML_FILENAME = "outputcard.html";
const GENERATED_JS_FILENAME = "outputcard.js";

const generatefile = (file, env) => {

    writefile(`${FILE_PATH}${getFilenameFor(env)}`, file);
}

const writefile = (filepath, data) => {

    if (!fs.existsSync(FILE_PATH))
        fs.mkdirSync(FILE_PATH);

    fs.writeFileSync(filepath, data, (err) => {
        if (err)
            throw new Error(err);
    });

    console.log(`\nYour file was generated successfully ${filepath}`);
}

const getFilenameFor = (env) => {

    return env == environment.TESTING ? GENERATED_HTML_FILENAME : GENERATED_JS_FILENAME;
}

const getPath = (env) => {

    return `${FILE_PATH}${getFilenameFor(env)}`;
}

export default {
    generate: generatefile,
    getPath: getPath
};