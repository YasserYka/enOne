"use strict";

const Container = require("./containers/container");
const CardClass = require('../style/cardclass');

module.exports = class Title extends Container {

    constructor(child) {
        super();
        // TODO: set instead of append
        this.addTypes(['Anchor']);

        if (!this.safeType(child))
            throw new Error(`The child of Container can't be of type ${child.constructor.name}`);

        this.child = child;
    }

    safeType(child) {

        return this.safeType(child);
    }

    toHtml() {

        return `
            <h5 class="${CardClass[this.constructor.name]}">
                ${this.child.constructor.name === 'Anchor' ? this.child.toHtml() : this.child}
            </h5>
        `;
    }

}