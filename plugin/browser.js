const { open: openbrowser } = require('open');

/**
 * @param {string} filename is HTML file to be opened in the browser
 */
const open = filename => {

    (async() => {
        await openbrowser(filename, { "wait": true });
    })();

}

module.exports = {
    open
};