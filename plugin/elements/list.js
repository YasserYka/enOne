"use strict";

const Conatiner = require('./containers/container');
const CardClass = require('../style/cardclass');

module.exports = class List extends Conatiner {

    constructor() {
        
        super();
        this.addTypes(['ListItem']);
    }

    safeType(child) {

        return this.safeType(child);
    }

    toHtml() {

        return `
            <ul class="${CardClass[this.constructor.name]}">
                ${this.childrenToHtml()}
            </ul>
        `;
    }

}