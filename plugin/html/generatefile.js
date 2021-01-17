import fs from 'fs';
const HTML_FILE_PATH = '../development.js';
const GENERATED_HTML_FILENAME = "outputcard.html";


/**
 * @param {string} htmlfile is html content as string 
 */
const generatefile = htmlfile => {

    writefile(`${HTML_FILE_PATH}${GENERATED_HTML_FILENAME}`, htmlfile);
}

/**
 * @param {string} filepath of the file 
 * @param {string} data to write
 */
const writefile = (filepath, data) => {

    fs.writeFileSync(filepath, data, (err) => {
        if (err)
            throw new Error(err);

        console.log(`HTML file generated successfully ${filepath}`);
    });

}

const getPath = () => {

    return `${HTML_FILE_PATH}${GENERATED_HTML_FILENAME}`;
}

export default {
    generate: generatefile,
    getPath: getPath
};