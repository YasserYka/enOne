"use strict";

const Container = require('./containers/container');
const cardcolor = require('../stylie/cardcolor');

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

    toHtml() {
        
        return `
            <div class="card mt-2 shadow bg-dark text-center" style="margin: 0 auto;">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}