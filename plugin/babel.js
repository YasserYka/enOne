const babel = require("@babel/core");

const TRANSFORM_OPTIONS = {plugins: ["@babel/plugin-transform-react-jsx"]};

const compile = code => {
    
    return babel.transform(code, TRANSFORM_OPTIONS).code;
}

module.exports = {
    compile: compile,
};