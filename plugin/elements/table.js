"use strict";

const Container = require("./container/container");
const CardClass = require('../stylie/cardclass');

module.exports = class Table extends Container {

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