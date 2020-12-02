"use strict";

const Conatiner = require('./containers/container');

module.exports = class TableItem extends Conatiner {

    constructor(item) {
        super();

        this.item = item;
    }
    
    // item can be an anchor or string
    safeType(item) {

        return typeof item === 'object';
    }

    getHead(){

        return Object.keys(this.item).map(key => `<th scope="col">${key}</th>`);
    }

    toHtml() {

        return Object.values(obj).map(value => `<td>${value}</td>`);
    }

}