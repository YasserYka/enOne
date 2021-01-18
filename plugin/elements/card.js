"use strict";

const Container = require("./container.js");
const CardClass = require("../stylie/cardclass.js");

module.exports = class Card extends Container {

    constructor() {
        
        super();
        this.addTypes(['Title', 'Header', 'Footer', 'Body', 'Image', 'Input', 'IFrame']);
    }

    toHtml() {
        
        return `
            <div class="${CardClass[this.constructor.name]}" style="margin: 0 auto;">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}