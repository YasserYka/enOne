"use strict";

const Conatiner = require('./containers/container');

module.exports = class Table extends Conatiner {

    constructor() {
        
        super();
    }

    // check the type of child because some objects can't be nested
    safeType(child) {

        return child.constructor.name === 'ListItem';
    }

    toHtml() {

        return `
            <ul class="table">
                ${this.childrenToHtml()}
            </ul>
        `;
    }

}