
// when babel transform jsx into js it generate 'h' object which generate html element
const h = require('vhtml');

function changebackground(src) {

    document.body.style.backgroundImage = "url('" + src + "')";
}
