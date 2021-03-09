const fs = jest.createMockFromModule('fs');
const path = require('path');

let mockedFiles=  Object.create(null);

__addMockedFiles = (files) => {
    
    files.forEach(file => {
        const dirname = path.dirname(file);

        if (!mockedFiles[dirname])
            mockedFiles[dirname] = [];

        mockedFiles[dirname].push(path.basename(file));
    });

}

readdirSync = (path) => {

  return mockedFiles[path] || [];
}

fs.__setMockFiles = __addMockedFiles;
fs.readdirSync = readdirSync;

module.exports = fs;