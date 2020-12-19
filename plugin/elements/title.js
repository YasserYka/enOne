"use strict";

const Container = require("./containers/container");
const CardClass = require('../style/cardclass');

module.exports = class Title extends Container {

    constructor(child) {
        super();

        if (!this.safeType(child))
            throw new Error(`The text can't be of type ${typeof text}`);

        this.child = child;
    }

    toString() {

        return {[this.constructor.name]: {'children': this.childrenToString()}};
    }

    // TODO: work around this please?
    safeType(child) {

        return typeof child === 'string' || child.constructor.name == 'Anchor';        ;
    }

    toHtml() {

        return `
            <h5 class="${CardClass[this.constructor.name]}">
                ${this.child.constructor.name === 'Anchor' ? this.child.toHtml() : this.child}
            </h5>
        `;
    }

}