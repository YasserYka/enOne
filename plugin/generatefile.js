const fs = require('fs');
const environment = require('./environment');

const FILE_PATH = __dirname + '../development/';
const GENERATED_HTML_FILENAME = "outputcard.html";
const GENERATED_JS_FILENAME = "outputcard.js";

const generatefile = (file, env) => {
    const filename = env == environment.TESTING ? GENERATED_HTML_FILENAME : GENERATED_JS_FILENAME;

    writefile(`${FILE_PATH}${filename}`, file);
}

const writefile = (filepath, data) => {

    fs.writeFileSync(filepath, data, (err) => {
        if (err)
            throw new Error(err);

        console.log(`Your file was generated successfully ${filepath}`);
    });

}

const getPath = (env) => {

    return `${env == environment.TESTING ? GENERATED_HTML_FILENAME : GENERATED_JS_FILENAME}${GENERATED_HTML_FILENAME}`;
}

module.exports = {
    generate: generatefile,
    getPath: getPath
};