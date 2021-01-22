const fs = require('fs');
const babel = require("@babel/core");

const BABEL_TRANSFORM_OPTIONS = {plugins: ["@babel/plugin-transform-react-jsx"]};

const compile = code => {
    
}

module.exports = {
    compile: compile,
};