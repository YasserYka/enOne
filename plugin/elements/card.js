"use strict";

const Container = require('./containers/container');
const CardClass = require('../style/cardclass');

module.exports = class Card extends Container {

    constructor() {
        
        super();
        this.addTypes(['Title', 'Header', 'Footer', 'Body', 'Image']);
    }

    safeType(child) {

        return this.safeType(child);
    }

    toHtml() {
        
        return `
            <div class="${CardClass[this.constructor.name]}" style="margin: 0 auto;">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}