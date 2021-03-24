const { Notyf } = require('notyf');

const notyf = new Notyf({
    duration: 15000, 
    position: {x: 'right', y: 'down',},
    types: [{ type: 'warning', background: 'orange'}]
});

const toast = {
    error: (message) => notyf.error({message: message, dismissible: true, icon: false}),
    success: (message) => notyf.success({message: message, dismissible: true, icon: false}),
    warn: (message) => notyf.open({type: 'warning', message: message, dismissible: true, icon: false})
}

module.exports = {
    toast: toast
}