"use strict";

const Container = require('./containers/container');
const CardClass = require('../style/cardclass');

// holds title, text, paragraph and achor
module.exports = class Body extends Container {

    constructor() {
        
        super();
    }

    safeType(child) {

        return child.constructor.name == 'Paragraph' ||
            child.constructor.name == 'Anchor' ||
            child.constructor.name == 'Text' ||
            child.constructor.name == 'Title' ||
            child.constructor.name == 'List' || 
            child.constructor.name == 'Table';
    }

    toHtml() {

        return `
            <div class="${CardClass[this.constructor.name]}">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}