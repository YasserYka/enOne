const open = require('open');

/**
 * @param {string} filename is HTML file to be opened in the browser
 */
const lanuch = filename => {

    (async() => {

        console.log('\nYour browser will be launched shortly..');
        await open(filename);
    })();

}

module.exports = {
    lanuch: lanuch
};