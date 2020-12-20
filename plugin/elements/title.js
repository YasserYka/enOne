"use strict";

const Container = require("./container");
const CardClass = require('../style/styleclass');

module.exports = class Title extends Container {

    constructor(child) {
        super();
        this.setTypes(['String', 'Bold']);

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