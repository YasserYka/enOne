"use strict";

const Conatiner = require('./containers/container');
const CardClass = require('../style/styleclass');

module.exports = class Table extends Conatiner {

    constructor() {
        
        super();
        this.setTypes(['TableItem']);
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