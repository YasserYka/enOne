const { Notyf } = require('notyf');

const notyf = new Notyf({duration: 15000});

const toast = {
    error: (message) => notyf.error({message: message, dismissible: true, icon: false}),
    success: (message) => notyf.success({message: message, dismissible: true, icon: false})
}

module.exports = {
    toast: toast
}