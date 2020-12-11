/*
    TODO: Replace hardcoded words in regex with variables 
*/

// makes user's code ready for plugin runner
const preprocess = file => {

    return cleanEmptyLines(addReturnStatmen(cleanImports(file)));
}

// remove duplicate newlinens 
const cleanEmptyLines = file => {

    return file.replace(/\n\s*\n/g, '\n');
}

// because all plugins will have the same plugin, engine and environment imports, I add these imports inside plugin runner
const cleanImports = file => {

    // match 'const *word* = require("*word*");'
    return file.replace(/const[\s\r\n]+\w+[\s\r\n]=[\s\r\n]require\(['"].*\/(plugin|engine|environment)['"]\);*/g, '')       
}

// replace engine statement to return the result of plugin instead
const addReturnStatmen = file => {

    // match 'engine.engine(plugin.environment.*word*);'
    return file.replace(/engine.engine\(plugin,[\s\r\n]environment\.\w+\);*/g, 'return plugin.toString();');
}

module.exports = {
    preprocess: preprocess
};
