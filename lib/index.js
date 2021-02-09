
// when babel transform jsx into js it generate 'h' object which generate html element
const createElement = h = require('vhtml');

function changebackground(src) {

    document.body.style.backgroundImage = "url('" + src + "')";
}
