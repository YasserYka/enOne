const fs = jest.createMockFromModule('fs');
const { resolve } = require('path');

let mockedFiles;

const __setMockedFiles = (files) => {
    
    mockedFiles = Object.assign({}, ...Object.keys(files).map(key => 
        ({[resolve(key)]: files[key]})
    ));
}

const existsSync = (filepath) => {

    return resolve(filepath) in mockedFiles;
}

const readdirSync = (filepath) => {

    return mockedFiles[resolve(filepath)] || [];
}

fs.__setMockedFiles = __setMockedFiles;
fs.readdirSync = readdirSync;
fs.existsSync = existsSync;

module.exports = fs;