"use strict";

const Conatiner = require('./containers/container');

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
            <ul class="list-group list-group-flush">
                ${this.childrenToHtml()}
            </ul>
        `;
    }

}