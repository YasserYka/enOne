"use strict";

const Container = require("./container/container");
const CardClass = require('../stylie/cardclass');

module.exports = class Card extends Container {

    constructor() {
        
        super();
        this.addTypes(['Title', 'Header', 'Footer', 'Body', 'Image']);
    }

    toHtml() {
        
        return `
            <div class="${CardClass[this.constructor.name]}" style="margin: 0 auto;">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}