"use strict";

const Container = require("./container/container");
const CardClass = require('../style/styleclass');

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