"use strict";

const TextualConatiner = require('./containers/textualcontainer');

module.exports = class TableItem extends TextualConatiner {

    constructor(item) {
        super();

        this.item = item;
    }
    
    // item can be an anchor or string
    safeType(item) {

        return typeof item === 'object';
    }

    toString(){

        return {[this.constructor.name]: {'item': this.item}};
    }

    getHead(){

        return Object.keys(this.item).map(key => `<th scope="col">${key}</th>`).join(' ');
    }

    toHtml() {

        return `<tr>${Object.values(this.item).map(value => `<td>${value}</td>`).join(' ')}</tr>`;
    }

}