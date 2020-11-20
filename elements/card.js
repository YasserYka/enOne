"use strict";

const Container = require('./containers/container');
const COLORS = require('./color');

module.exports = class Card extends Container {

    constructor() {
        
        super();
    }

    setColor(color) {

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
            child.constructor.name == 'Image';
    }

    toHtml() {
        console.log()
        return `
            <div class="card ${this.color || COLORS.DEFAULT}" style="width: 18rem;margin: 0 auto;">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}