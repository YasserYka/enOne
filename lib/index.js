
// when babel transform jsx into js it generate 'h' object which generate html element
const jsxDom = require('jsx-dom');
const createElement = jsxDom.h;

function changebackground(src) {

    document.body.style.backgroundImage = "url('" + src + "')";
}
