var vm = require('vm');

const run = code => {

    return vm.runInThisContext(code);
}

module.exports = {
    run: run
};