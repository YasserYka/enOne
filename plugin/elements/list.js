"use strict";

const Conatiner = require('./containers/container');
const CardClass = require('../style/cardclass');

module.exports = class List extends Conatiner {

    constructor() {
        
        super();
    }

    // check the type of child because some objects can't be nested
    safeType(child) {

        return child.constructor.name === 'ListItem';
    }

    toString() {

        return {[this.constructor.name]: {'children': this.childrenToString()}};
    }

    toHtml() {

        return `
            <ul class="${CardClass[this.constructor.name]}">
                ${this.childrenToHtml()}
            </ul>
        `;
    }

}