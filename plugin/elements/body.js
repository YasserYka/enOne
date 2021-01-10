"use strict";

const Container = require("./container/container");
const CardClass = require('../stylie/cardclass');

// holds title, text, paragraph and achor
module.exports = class Body extends Container {

    constructor() {
        
        super();
        this.addTypes(['Title', 'List', 'Table']);
    }

    toHtml() {

        return `
            <div class="${CardClass[this.constructor.name]}">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}