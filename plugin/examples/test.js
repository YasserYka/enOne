var fs = require('fs');

console.log(require("@babel/core").transform(fs.readFileSync(__dirname + '/note.js'), {
    plugins: ["@babel/plugin-transform-react-jsx"],
  }).code);