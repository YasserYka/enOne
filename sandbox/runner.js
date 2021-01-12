import vm from 'vm';
import plugin from '../plugin/plugin';

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

// replace config.variables hardcoded string into variable
const injectConfig = (config, code) => {

    return code.replace(/config\.([a-zA-Z0-9_]+)/g, (_,g)=> config[g]);
}

export default {
    run: run
};
