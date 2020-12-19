"use strict";

const Conatiner = require('./containers/container');
const CardClass = require('../style/cardclass');

module.exports = class Table extends Conatiner {

    constructor() {
        
        super();
        // TODO: set instead of append
        this.addTypes(['TableItem']);
    }

    // check the type of child because some objects can't be nested
    safeType(child) {

        return this.safeType(child);
    }

    toHtml() {

        return `
            <div class="table-responsive">
            <table class="${CardClass[this.constructor.name]}">
                <thead>
                    <tr>
                        ${this.children[0].getHead()}
                    </tr>
                </thead>
                <tbody>
                    ${this.childrenToHtml()}
                </tbody>
            </table>
            </div>
        `;
    }

}