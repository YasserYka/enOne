const fs = require('fs');
const HTML_FILE_PATH = '../';
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

module.exports = {
    generate: generatefile
};