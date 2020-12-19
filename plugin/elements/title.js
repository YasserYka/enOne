"use strict";

const Container = require("./containers/container");
const CardClass = require('../style/styleclass');

module.exports = class Title extends Container {

    constructor(child) {
        super();
        // TODO: set instead of append
        this.addTypes(['Anchor']);

        this.child = child;
    }

    toHtml() {

        return `
            <h5 class="${CardClass[this.constructor.name]}">
                ${this.child.constructor.name === 'Anchor' ? this.child.toHtml() : this.child}
            </h5>
        `;
    }

}