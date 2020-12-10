"use strict";

const TextualConatiner = require("./containers/textualcontainer");

module.exports = class Title extends TextualConatiner {

    constructor(child) {
        super();

        if (!this.safeType(child))
            throw new Error(`The text can't be of type ${typeof text}`);

        this.child = child;
    }

    // TODO: work around this please?
    safeType(child) {

        return typeof child === 'string' || child.constructor.name == 'Anchor';        ;
    }

    toHtml() {

        return `
            <h5 class="card-title">
                ${this.child.constructor.name === 'Anchor' ? this.child.toHtml() : this.child}
            </h5>
        `;
    }

}