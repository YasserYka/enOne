"use strict";

const Conatiner = require('./containers/container');

module.exports = class Table extends Conatiner {

    constructor() {
        
        super();
    }

    // check the type of child because some objects can't be nested
    safeType(child) {

        return child.constructor.name === 'TableItem';
    }

    toHtml() {

        return `
            <table class="table table-borderless">
                <thead>
                    <tr>
                        ${this.children[0].getHead()}
                    </tr>
                </thead>
                <tbody>
                    ${this.childrenToHtml()}
                </tbody>
            </table>
        `;
    }

}