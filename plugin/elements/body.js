"use strict";

const Container = require("./container.js");
const CardClass = require("../stylie/cardclass.js");

// holds title, text, paragraph and achor
module.exports = class Body extends Container {

    constructor() {
        
        super();
        this.addTypes(['Title', 'List', 'Table', 'Text', 'Bold']);
    }

    toHtml() {

        return `
            <div class="${CardClass[this.constructor.name]}">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}