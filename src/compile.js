const babel = require("@babel/core");
const fs = require('fs');

const BABEL_OPTIONS = { plugins: [["@babel/plugin-transform-react-jsx", { pragma: "h" }]], comments: false };

// transform JSX to intermediate function
const transform = (filepath, outputpath, callback) => {

  babel.transformFile(filepath, BABEL_OPTIONS, (err, result) => {
    if (err) throw err;

    fs.writeFile(outputpath, result.code, (err) => {

        if (err) throw err;
        
        callback();
    });
  });

};

module.exports = {
  transform: transform,
};
