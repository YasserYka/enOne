const {NodeVM} = require('vm2');
var util = require('util');

console.log(process.cwd())

const vm = new NodeVM({
    sandbox: {},
    require: {
        external: true,
        builtin: ['*'],
        root: process.cwd()
    }
});

vm.run("var request = require('plugin');", `${process.cwd()}/plugin/plugin`);