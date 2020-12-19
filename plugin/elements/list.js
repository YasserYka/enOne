"use strict";

const Conatiner = require('./containers/container');
const CardClass = require('../style/styleclass');

module.exports = class List extends Conatiner {

    constructor() {
        
        super();
        this.addTypes(['ListItem']);
    }

    toHtml() {

        return `
            <ul class="${CardClass[this.constructor.name]}">
                ${this.childrenToHtml()}
            </ul>
        `;
    }

}