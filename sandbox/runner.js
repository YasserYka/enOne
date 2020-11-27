var vm = require('vm');

// to add code in private scope
const wrapper = code => {

    return `(() => {
        "use strict";
        ${code}
    })()`;
}

module.exports = {
    run: run
};
