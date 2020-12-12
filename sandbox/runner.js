const vm = require('vm');
const plugin = require('../plugin/plugin');

const context = vm.createContext({require:require, plugin: plugin});

const run = code => {

    return vm.runInContext(wrapper(code), context, {displayErrors: true, timeout: 30000});
}

// to wrap code in private scope
const wrapper = code => {

    return `(() => {
        "use strict";
        ${code}
    })()`;
}

module.exports = {
    run: run
};
