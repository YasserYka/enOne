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

    safeType(child) {

        return child.constructor.name == 'Paragraph' ||
            child.constructor.name == 'Anchor' ||
            child.constructor.name == 'Text' ||
            child.constructor.name == 'Title';
    }

    toHtml() {

        return `
            <div class="card ${this.color || COLORS.DEFAULT}">
                ${this.childrenToHtml()}
            </div>
        `;
    }

}