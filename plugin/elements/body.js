"use strict";

const Container = require('./containers/container');
const CardClass = require('../style/cardclass');

// holds title, text, paragraph and achor
module.exports = class Body extends Container {

    constructor() {
        
        super();
        this.addTypes(['Title', 'List', 'Table']);
    }

    safeType(child) {

        return this.safeType(child);
    }

    toHtml() {

        return `
            <div class="${CardClass[this.constructor.name]}">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}