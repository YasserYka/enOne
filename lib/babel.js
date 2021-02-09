const babel = require("@babel/core");

const TRANSFORM_OPTIONS = {plugins: ["babel-plugin-syntax-jsx"]};

const transform = code => {
    
    return babel.transform(code, TRANSFORM_OPTIONS).code;
}

module.exports = {
    transform: transform,
};