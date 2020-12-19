"use strict";

const Container = require('./containers/container');
const CardClass = require('../style/cardclass');

module.exports = class Card extends Container {

    constructor() {
        
        super();
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

    toString() {

        return {[this.constructor.name]: {'children': this.childrenToString()}};
    }

    toHtml() {
        
        return `
            <div class="${CardClass[this.constructor.name]}" style="margin: 0 auto;">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}