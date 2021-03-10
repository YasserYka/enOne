const fs = jest.createMockFromModule('fs');
const { resolve, dirname } = require('path');

let mockedFiles;

const __setMockedFiles = (files) => {
    
    mockedFiles = Object.assign({}, ...Object.keys(files).map(key => 
        ({[resolve(key)]: files[key]})
    ));
}

const __clearMockedFiles = (files) => {
    
    mockedFiles = {};
}

const existsSync = (filepath) => {

    for (file in mockedFiles)
        if (file.startsWith(filepath))
            return true;
    
    return false;
}

const readdirSync = (filepath) => {

    let dirNames = [];

    console.log(filepath, mockedFiles)

    for (file in mockedFiles)
        if (file.startsWith(filepath))
            dirNames.push(dirname(file).split('/').pop());
    
    return dirNames;
}

const readFile = (filepath) => {

    return mockedFiles[resolve(filepath)] || [];
}

fs.__setMockedFiles = __setMockedFiles;
fs.__clearMockedFiles = __clearMockedFiles;

fs.readdirSync = readdirSync;
fs.existsSync = existsSync;
fs.readFile = readFile;

module.exports = fs;