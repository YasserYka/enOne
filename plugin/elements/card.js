"use strict";

const Container = require('./containers/container');
const cardcolor = require('../stylie/cardcolor');

module.exports = class Card extends Container {

    constructor() {
        
        super();
    }

    color(color) {

        this.color = color;
    }

    // TODO: work around this please?
    safeType(child) {

        return child.constructor.name == 'Paragraph' ||
            child.constructor.name == 'Anchor' ||
            child.constructor.name == 'Text' ||
            child.constructor.name == 'Title' ||
            child.constructor.name == 'Header' || 
            child.constructor.name == 'Footer' || 
            child.constructor.name == 'Body' ||
            child.constructor.name == 'Image'
        }

    toHtml() {
        
        return `
            <div class="card shadow ${this.color || cardcolor.COLOR.DEFAULT} text-center" style="width: 18rem;margin: 0 auto;">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}